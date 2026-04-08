// In C: Audience Ensemble — Ensemble Manager
// Manages 10 musicians, enforces MaxSpread, deadlock prevention.

import { CONFIG } from './config.js';
import { Musician } from './musician.js';

export class Ensemble extends EventTarget {
  constructor() {
    super();
    this.musicians = [];
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      this.musicians.push(new Musician(i));
    }
    this._deadlockTimer = null;
    this._spreadRelaxed = false;
  }

  // Check whether the opening gate is still active: all online musicians
  // must reach Pattern 1 (unit 2) before anyone can advance past it.
  _isOpeningGateActive() {
    const allOnline = this.musicians.filter(mu => !mu.offline);
    return !allOnline.every(mu => mu.currentUnit >= 2);
  }

  // Called when a specific musician's pattern loop completes (per-musician timing)
  onMusicianLoopComplete(musicianId) {
    const m = this.musicians[musicianId];

    // Enforce opening gate at advance time: if this musician is already at
    // unit 2+ and the gate is still active, cancel any queued advance so
    // they keep looping Pattern 1 until everyone catches up.
    if (m.currentUnit >= 2 && m.advanceQueued && this._isOpeningGateActive()) {
      m.advanceQueued = false;
    }

    const result = m.onLoopComplete();

    // Check resetAll end behavior
    if (result.advanced && CONFIG.endBehavior === 'resetAll') {
      const allAtEnd = this.musicians.every(m => m.currentUnit >= CONFIG.totalUnits);
      if (allAtEnd) {
        this.reset();
        this.dispatchEvent(new CustomEvent('resetAll'));
        return result;
      }
    }

    // Re-check deadlock after any state change
    this._checkDeadlock();

    this.dispatchEvent(new CustomEvent('stateChange', { detail: { musicianId } }));

    return result;
  }

  // Full eligibility check for a musician (includes spread)
  isEligible(musicianId) {
    const m = this.musicians[musicianId];
    if (!m.canAdvance()) return false;

    // Opening gate: all musicians must reach Pattern 1 (unit 2) — the first
    // measure with sound — before anyone can advance beyond it. Advancing
    // from silence (unit 1) to Pattern 1 (unit 2) is always allowed.
    if (m.currentUnit >= 2) {
      const allOnline = this.musicians.filter(mu => !mu.offline);
      const allPlayingSound = allOnline.every(mu => mu.currentUnit >= 2);
      if (!allPlayingSound) return false;
    }

    // Catch-up allowance: most-behind musicians are always eligible
    const minUnit = this.getMinUnit();
    if (m.currentUnit === minUnit) return true;

    // Spread check: would advancing violate MaxSpread?
    const hypotheticalUnit = m.currentUnit + 1;
    const currentMin = minUnit;
    const currentMax = this.getMaxUnit();
    const newMax = Math.max(currentMax, hypotheticalUnit);
    const spread = newMax - currentMin;

    const effectiveMaxSpread = this._spreadRelaxed
      ? CONFIG.maxSpread + 2
      : CONFIG.maxSpread;

    return spread <= effectiveMaxSpread;
  }

  // Get list of eligible musician IDs
  getEligible() {
    return this.musicians
      .map((_, i) => i)
      .filter(i => this.isEligible(i));
  }

  // Try to queue an advance for a musician
  tryAdvance(musicianId) {
    if (!this.isEligible(musicianId)) return false;
    const success = this.musicians[musicianId].queueAdvance();
    if (success) {
      this._resetDeadlockTimer();
      this.dispatchEvent(new CustomEvent('queued', { detail: { musicianId } }));
    }
    return success;
  }

  getSpread() {
    return this.getMaxUnit() - this.getMinUnit();
  }

  getMinUnit() {
    return Math.min(...this.musicians.filter(m => !m.offline).map(m => m.currentUnit));
  }

  getMaxUnit() {
    return Math.max(...this.musicians.filter(m => !m.offline).map(m => m.currentUnit));
  }

  reset() {
    for (const m of this.musicians) {
      m.reset();
    }
    this._spreadRelaxed = false;
    this._resetDeadlockTimer();
    this.dispatchEvent(new CustomEvent('stateChange'));
  }

  _checkDeadlock() {
    const eligible = this.getEligible();
    if (eligible.length === 0) {
      // Start deadlock timer if not already running
      if (!this._deadlockTimer) {
        this._deadlockTimer = setTimeout(() => {
          this._spreadRelaxed = true;
          this.dispatchEvent(new CustomEvent('spreadRelaxed'));
          this.dispatchEvent(new CustomEvent('stateChange'));
        }, CONFIG.deadlockTimeoutMs);
      }
    } else {
      this._resetDeadlockTimer();
      if (this._spreadRelaxed) {
        this._spreadRelaxed = false;
      }
    }
  }

  _resetDeadlockTimer() {
    if (this._deadlockTimer) {
      clearTimeout(this._deadlockTimer);
      this._deadlockTimer = null;
    }
  }
}
