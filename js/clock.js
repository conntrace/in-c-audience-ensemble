// In C: Audience Ensemble — Global Tempo Clock
// Uses AudioContext for sample-accurate timing. Fires boundary events at unit transitions.

import { CONFIG } from './config.js';

export class Clock extends EventTarget {
  constructor(audioContext) {
    super();
    this.ctx = audioContext;
    this.running = false;
    this.boundaryCount = 0;
    this._timerId = null;
    this._startTime = 0;
    this._nextBoundaryTime = 0;
  }

  get unitDuration() {
    return CONFIG.unitDurationSec;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.boundaryCount = 0;
    this._startTime = this.ctx.currentTime;
    this._nextBoundaryTime = this._startTime + this.unitDuration;
    this._scheduleTick();
    this.dispatchEvent(new CustomEvent('start'));
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    if (this._timerId !== null) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
    this.dispatchEvent(new CustomEvent('pause'));
  }

  resume() {
    if (this.running) return;
    this.running = true;
    // Recalculate next boundary from now
    this._nextBoundaryTime = this.ctx.currentTime + this.unitDuration;
    this._scheduleTick();
    this.dispatchEvent(new CustomEvent('resume'));
  }

  reset() {
    this.pause();
    this.boundaryCount = 0;
    this._startTime = 0;
    this._nextBoundaryTime = 0;
    this.dispatchEvent(new CustomEvent('reset'));
  }

  // Recalculate timing when BPM changes
  updateTempo() {
    if (this.running) {
      this._nextBoundaryTime = this.ctx.currentTime + this.unitDuration;
      // Reschedule
      if (this._timerId !== null) {
        clearTimeout(this._timerId);
      }
      this._scheduleTick();
    }
  }

  _scheduleTick() {
    if (!this.running) return;

    const now = this.ctx.currentTime;
    const delay = Math.max(0, (this._nextBoundaryTime - now) * 1000);

    this._timerId = setTimeout(() => {
      if (!this.running) return;

      this.boundaryCount++;
      this._nextBoundaryTime += this.unitDuration;

      this.dispatchEvent(new CustomEvent('boundary', {
        detail: {
          count: this.boundaryCount,
          time: this.ctx.currentTime,
        }
      }));

      this._scheduleTick();
    }, delay);
  }

  // Returns progress through current unit (0..1)
  getUnitProgress() {
    if (!this.running) return 0;
    const now = this.ctx.currentTime;
    const elapsed = now - (this._nextBoundaryTime - this.unitDuration);
    return Math.max(0, Math.min(1, elapsed / this.unitDuration));
  }
}
