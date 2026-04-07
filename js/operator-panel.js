// In C: Audience Ensemble — Operator Panel
// Start/pause/reset, config adjustments, toggled with Escape key.

import { CONFIG } from './config.js';
import { PIECES } from './patterns.js';

export class OperatorPanel {
  constructor(callbacks) {
    this.callbacks = callbacks; // { onStart, onPause, onReset, onConfigChange, onDemoToggle }
    this.panel = document.getElementById('operator-panel');
    this.content = document.getElementById('operator-content');
    this.toggleButton = document.getElementById('operator-toggle');
    this.visible = false;
    this._init();
  }

  _init() {
    this.toggleButton?.setAttribute('aria-expanded', 'false');
    this.toggleButton?.addEventListener('click', () => this.toggle());
    document.getElementById('op-close')?.addEventListener('click', () => this.hide());

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
      const rawValue = parseInt(e.target.value, 10);
      const maxUnits = this._getCurrentPieceMaxUnits();
      const minUnits = parseInt(e.target.min, 10) || 1;
      const fallbackUnits = Math.min(CONFIG.totalUnits, maxUnits);
      CONFIG.totalUnits = Math.max(
        minUnits,
        Math.min(maxUnits, Number.isFinite(rawValue) ? rawValue : fallbackUnits)
      );
      e.target.value = CONFIG.totalUnits;
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

    // Keyboard shortcuts: O toggles controls, Escape closes them.
    document.addEventListener('keydown', (e) => {
      const tag = e.target?.tagName;
      const isTypingTarget = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';

      if ((e.key === 'o' || e.key === 'O') && !isTypingTarget) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.visible) {
        e.preventDefault();
        this.hide();
      }
    });

    this.panel.addEventListener('click', (e) => {
      if (e.target === this.panel) {
        this.hide();
      }
    });
  }

  toggle() {
    this.visible = !this.visible;
    this.panel.classList.toggle('visible', this.visible);
    this.toggleButton?.classList.toggle('active', this.visible);
    this.toggleButton?.setAttribute('aria-expanded', this.visible ? 'true' : 'false');
  }

  hide() {
    this.visible = false;
    this.panel.classList.remove('visible');
    this.toggleButton?.classList.remove('active');
    this.toggleButton?.setAttribute('aria-expanded', 'false');
  }

  updateDemoButton(active) {
    const btn = document.getElementById('op-demo');
    btn.textContent = active ? 'On' : 'Off';
    btn.classList.toggle('primary', active);
  }

  // Sync config inputs with current CONFIG values
  syncFromConfig() {
    const unitsInput = document.getElementById('op-units');
    const maxUnits = this._getCurrentPieceMaxUnits();
    CONFIG.totalUnits = Math.min(CONFIG.totalUnits, maxUnits);
    unitsInput.max = maxUnits;
    document.getElementById('op-bpm').value = CONFIG.bpm;
    unitsInput.value = CONFIG.totalUnits;
    document.getElementById('op-spread').value = CONFIG.maxSpread;
    document.getElementById('op-end-behavior').value = CONFIG.endBehavior;
    document.getElementById('op-audio-source').value = CONFIG.audioSource;
    document.getElementById('op-piece').value = CONFIG.piece;
  }

  _getCurrentPieceMaxUnits() {
    return PIECES[CONFIG.piece]?.totalUnits ?? CONFIG.totalUnits;
  }
}
