// In C: Audience Ensemble — Button Controller
// Handles keyboard input (keys 1-0), renders visual button states.

import { CONFIG } from './config.js';

export class ButtonController {
  constructor(ensemble) {
    this.ensemble = ensemble;
    this.buttons = []; // DOM elements
    this._onPress = null; // callback
    this._init();
  }

  _init() {
    const row = document.getElementById('button-row');
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const station = document.createElement('div');
      station.className = 'station';

      const btn = document.createElement('div');
      btn.className = 'station-button ineligible';
      btn.style.setProperty('--station-color', CONFIG.musicianColors[i]);
      btn.dataset.musicianId = i;

      const label = document.createElement('div');
      label.className = 'station-label';
      label.style.setProperty('--station-color', CONFIG.musicianColors[i]);
      label.textContent = CONFIG.musicianLabels[i];

      const key = document.createElement('div');
      key.className = 'station-key';
      const keyLabels = CONFIG.keyLabels;
      key.textContent = i < keyLabels.length ? `Key: ${keyLabels[i]}` : '';

      station.appendChild(btn);
      station.appendChild(label);
      station.appendChild(key);
      row.appendChild(station);

      this.buttons.push(btn);

      // Click support
      btn.addEventListener('click', () => this._handlePress(i));
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      const musicianId = CONFIG.keyMap[e.code];
      if (musicianId !== undefined) {
        e.preventDefault();
        this._handlePress(musicianId);
      }
    });
  }

  _handlePress(musicianId) {
    const success = this.ensemble.tryAdvance(musicianId);
    if (success) {
      // Flash animation
      const btn = this.buttons[musicianId];
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 200);

      if (this._onPress) this._onPress(musicianId);
    }
  }

  onPress(callback) {
    this._onPress = callback;
  }

  // Update visual state of all buttons based on ensemble state
  updateStates() {
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const m = this.ensemble.musicians[i];
      const btn = this.buttons[i];

      btn.classList.remove('eligible', 'queued', 'cooldown', 'ineligible');

      if (m.offline) {
        btn.classList.add('ineligible');
      } else if (m.advanceQueued) {
        btn.classList.add('queued');
      } else if (m.cooldownActive) {
        btn.classList.add('cooldown');
      } else if (this.ensemble.isEligible(i)) {
        btn.classList.add('eligible');
      } else {
        btn.classList.add('ineligible');
      }
    }
  }
}
