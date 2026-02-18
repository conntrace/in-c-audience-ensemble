// In C: Audience Ensemble — Demo Mode
// Auto-triggers random valid button presses for hands-free demonstration.

import { CONFIG } from './config.js';

export class DemoMode {
  constructor(ensemble) {
    this.ensemble = ensemble;
    this.active = false;
    this._intervalId = null;
    this._onPress = null; // callback when demo triggers a press
  }

  onPress(callback) {
    this._onPress = callback;
  }

  toggle() {
    if (this.active) {
      this.stop();
    } else {
      this.start();
    }
    return this.active;
  }

  start() {
    if (this.active) return;
    this.active = true;
    this._intervalId = setInterval(() => this._tick(), CONFIG.demoIntervalMs);
  }

  stop() {
    this.active = false;
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  _tick() {
    const eligible = this.ensemble.getEligible();
    if (eligible.length === 0) return;

    // Pick a random eligible musician
    const idx = Math.floor(Math.random() * eligible.length);
    const musicianId = eligible[idx];

    const success = this.ensemble.tryAdvance(musicianId);
    if (success && this._onPress) {
      this._onPress(musicianId);
    }
  }
}
