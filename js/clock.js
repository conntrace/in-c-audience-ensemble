// In C: Audience Ensemble — Lightweight Elapsed-Time Tracker
// Tracks running state and elapsed time for UI display.
// Per-musician timing is handled by AudioEngine voice loops.

import { CONFIG } from './config.js';

export class Clock extends EventTarget {
  constructor(audioContext) {
    super();
    this.ctx = audioContext;
    this.running = false;
    this._startTime = 0;
    this._pausedElapsed = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._startTime = this.ctx.currentTime - this._pausedElapsed;
    this.dispatchEvent(new CustomEvent('start'));
  }

  pause() {
    if (!this.running) return;
    this._pausedElapsed = this.ctx.currentTime - this._startTime;
    this.running = false;
    this.dispatchEvent(new CustomEvent('pause'));
  }

  reset() {
    this.running = false;
    this._startTime = 0;
    this._pausedElapsed = 0;
    this.dispatchEvent(new CustomEvent('reset'));
  }

  // Total elapsed performance time in seconds (pause-aware)
  getElapsedTime() {
    if (!this.running) return this._pausedElapsed;
    return this.ctx.currentTime - this._startTime;
  }

  // Elapsed eighth-note beats since start
  getElapsedBeats() {
    return Math.floor(this.getElapsedTime() / CONFIG.eighthNoteSec);
  }

  // BPM changes take effect naturally on next voice loop — no action needed
  updateTempo() {}
}
