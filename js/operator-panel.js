// In C: Audience Ensemble — Operator Panel
// Start/pause/reset, config adjustments, toggled with Escape key.

import { CONFIG } from './config.js';

export class OperatorPanel {
  constructor(callbacks) {
    this.callbacks = callbacks; // { onStart, onPause, onReset, onConfigChange, onDemoToggle }
    this.panel = document.getElementById('operator-panel');
    this.visible = false;
    this._init();
  }

  _init() {
    // Transport buttons
    document.getElementById('op-start').addEventListener('click', () => {
      this.callbacks.onStart?.();
    });
    document.getElementById('op-pause').addEventListener('click', () => {
      this.callbacks.onPause?.();
    });
    document.getElementById('op-reset').addEventListener('click', () => {
      this.callbacks.onReset?.();
    });

    // Config inputs
    document.getElementById('op-bpm').addEventListener('change', (e) => {
      CONFIG.bpm = parseInt(e.target.value) || 120;
      this.callbacks.onConfigChange?.();
    });
    document.getElementById('op-units').addEventListener('change', (e) => {
      CONFIG.totalUnits = parseInt(e.target.value) || 35;
      this.callbacks.onConfigChange?.();
    });
    document.getElementById('op-spread').addEventListener('change', (e) => {
      CONFIG.maxSpread = parseInt(e.target.value) || 5;
      this.callbacks.onConfigChange?.();
    });
    document.getElementById('op-end-behavior').addEventListener('change', (e) => {
      CONFIG.endBehavior = e.target.value;
      this.callbacks.onConfigChange?.();
    });
    document.getElementById('op-audio-source').addEventListener('change', (e) => {
      this.callbacks.onAudioSourceChange?.(e.target.value);
    });
    document.getElementById('op-piece').addEventListener('change', (e) => {
      this.callbacks.onPieceChange?.(e.target.value);
    });

    // Demo toggle
    document.getElementById('op-demo').addEventListener('click', () => {
      this.callbacks.onDemoToggle?.();
    });

    // Escape key toggles panel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    this.visible = !this.visible;
    this.panel.classList.toggle('visible', this.visible);
  }

  hide() {
    this.visible = false;
    this.panel.classList.remove('visible');
  }

  updateDemoButton(active) {
    const btn = document.getElementById('op-demo');
    btn.textContent = active ? 'On' : 'Off';
    btn.classList.toggle('primary', active);
  }

  // Sync config inputs with current CONFIG values
  syncFromConfig() {
    document.getElementById('op-bpm').value = CONFIG.bpm;
    document.getElementById('op-units').value = CONFIG.totalUnits;
    document.getElementById('op-spread').value = CONFIG.maxSpread;
    document.getElementById('op-end-behavior').value = CONFIG.endBehavior;
    document.getElementById('op-audio-source').value = CONFIG.audioSource;
    document.getElementById('op-piece').value = CONFIG.piece;
  }
}
