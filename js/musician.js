// In C: Audience Ensemble — Musician State Machine

import { CONFIG } from './config.js';

export class Musician {
  constructor(id) {
    this.id = id;
    this.label = CONFIG.musicianLabels[id];
    this.color = CONFIG.musicianColors[id];
    this.currentUnit = 1;
    this.advanceQueued = false;
    this.cooldownActive = false;
    this.offline = false;
  }

  // Called at each unit boundary
  onBoundary() {
    if (this.offline) return;

    // Phase 1: Clear cooldown from previous advance
    // (cooldown lasts exactly one full unit after advancing)
    if (this.cooldownActive && !this.advanceQueued) {
      this.cooldownActive = false;
      return;
    }

    // Phase 2: Process queued advance
    if (this.advanceQueued) {
      this.advanceQueued = false;
      this._advanceUnit();
      this.cooldownActive = true;
    }
  }

  _advanceUnit() {
    if (CONFIG.endBehavior === 'wrap') {
      this.currentUnit = (this.currentUnit % CONFIG.totalUnits) + 1;
    } else if (CONFIG.endBehavior === 'hold') {
      if (this.currentUnit < CONFIG.totalUnits) {
        this.currentUnit++;
      }
    } else {
      // resetAll is handled at the ensemble level
      this.currentUnit++;
    }
  }

  queueAdvance() {
    if (this.canAdvance()) {
      this.advanceQueued = true;
      return true;
    }
    return false;
  }

  // Basic eligibility (without spread check — ensemble handles that)
  canAdvance() {
    return !this.advanceQueued && !this.cooldownActive && !this.offline;
  }

  reset() {
    this.currentUnit = 1;
    this.advanceQueued = false;
    this.cooldownActive = false;
  }
}
