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

  // Called when this musician's pattern loop completes (per-musician timing)
  onLoopComplete() {
    if (this.offline) return { advanced: false };

    // If cooldown was active (from a previous advance), clear it now
    // that we've completed one full play of the new pattern
    if (this.cooldownActive && !this.advanceQueued) {
      this.cooldownActive = false;
      return { advanced: false };
    }

    // If advance is queued, process it
    if (this.advanceQueued) {
      this.advanceQueued = false;
      this._advanceUnit();
      this.cooldownActive = true;
      return { advanced: true, newUnit: this.currentUnit };
    }

    return { advanced: false };
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
