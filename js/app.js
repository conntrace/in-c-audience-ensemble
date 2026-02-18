// In C: Audience Ensemble — Main Application
// Wires all modules together.

import { CONFIG } from './config.js';
import { Clock } from './clock.js';
import { Ensemble } from './ensemble.js';
import { ButtonController } from './button-controller.js';
import { ScoreDisplay } from './score-display.js';
import { AudioEngine } from './audio-engine.js';
import { OperatorPanel } from './operator-panel.js';
import { DemoMode } from './demo-mode.js';

class App {
  constructor() {
    this.audioCtx = null;
    this.clock = null;
    this.ensemble = null;
    this.buttons = null;
    this.scoreDisplay = null;
    this.audioEngine = null;
    this.operatorPanel = null;
    this.demoMode = null;
    this.running = false;
    this._instrumentsLoaded = false;
  }

  init() {
    // Load saved musician config from localStorage
    CONFIG.load();

    // Create AudioContext (lazy — needs user gesture)
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Core systems
    this.clock = new Clock(this.audioCtx);
    this.ensemble = new Ensemble();
    this.audioEngine = new AudioEngine(this.audioCtx);

    // UI
    this.buttons = new ButtonController(this.ensemble);
    this.scoreDisplay = new ScoreDisplay(this.ensemble);
    this.demoMode = new DemoMode(this.ensemble);

    // Operator panel
    this.operatorPanel = new OperatorPanel({
      onStart: () => this.start(),
      onPause: () => this.pause(),
      onReset: () => this.reset(),
      onConfigChange: () => this._onConfigChange(),
      onDemoToggle: () => this._toggleDemo(),
    });

    // Wire events
    this.clock.addEventListener('boundary', (e) => this._onBoundary(e));
    this.ensemble.addEventListener('stateChange', () => this._updateUI());
    this.ensemble.addEventListener('queued', () => this._updateUI());

    // Demo mode press feedback
    this.demoMode.onPress((id) => {
      const btn = this.buttons.buttons[id];
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 200);
    });

    // D key toggles demo
    document.addEventListener('keydown', (e) => {
      if (e.key === 'd' || e.key === 'D') {
        if (!this.operatorPanel.visible) {
          this._toggleDemo();
        }
      }
      // Space to start/pause
      if (e.code === 'Space' && !this.operatorPanel.visible) {
        e.preventDefault();
        if (this.running) {
          this.pause();
        } else {
          this.start();
        }
      }
    });

    // Inline demo play button
    this._demoBtn = document.getElementById('btn-play-demo');
    if (this._demoBtn) {
      this._demoBtn.addEventListener('click', async () => {
        this._toggleDemo();
      });
    }

    // Sync operator panel with loaded config
    this.operatorPanel.syncFromConfig();

    // Initial UI state
    this._updateUI();
    this._updateStatus();

    console.log('In C: Audience Ensemble initialized');
    console.log('Press Space to start. Keys 1-0 to advance musicians. Escape for operator panel. D for demo mode.');
  }

  async start() {
    if (this.running) return;

    // Resume AudioContext if suspended (requires user gesture)
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    // Load instruments on first start (needs active AudioContext)
    if (!this._instrumentsLoaded) {
      this._setStatusMessage('Loading instruments...');
      await this.audioEngine.loadInstruments();
      this._instrumentsLoaded = true;
      this._setStatusMessage(null);
    }

    this.running = true;
    this.clock.start();
    this.audioEngine.start(this.ensemble.musicians);
    this._updateUI();
    this._updateStatus();
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    this.clock.pause();
    this.audioEngine.stop();
    this._updateUI();
    this._updateStatus();
  }

  reset() {
    this.pause();
    this.ensemble.reset();
    this.clock.reset();
    this.demoMode.stop();
    this.operatorPanel.updateDemoButton(false);
    this._updateUI();
    this._updateStatus();
  }

  _onBoundary(e) {
    const detail = e.detail;

    // Process ensemble state transitions
    this.ensemble.onBoundary(detail);

    // Schedule audio for the new unit state
    this.audioEngine.onBoundary(this.ensemble.musicians, this.audioCtx.currentTime);

    // Update UI
    this._updateUI();
    this._updateStatus();
  }

  _updateUI() {
    this.buttons.updateStates();
    this.scoreDisplay.update();
  }

  _updateStatus() {
    const spread = this.ensemble.getSpread();
    const minU = this.ensemble.getMinUnit();
    const maxU = this.ensemble.getMaxUnit();

    document.getElementById('status-bpm').textContent = CONFIG.bpm;
    document.getElementById('status-spread').textContent = `${spread} / ${CONFIG.maxSpread}`;
    document.getElementById('status-range').textContent = `${minU} - ${maxU}`;
    document.getElementById('status-mode').textContent = this.running
      ? (this.demoMode.active ? 'Demo' : 'Running')
      : 'Stopped';
    document.getElementById('status-beat').textContent = this.running
      ? this.clock.boundaryCount
      : '-';
  }

  _setStatusMessage(msg) {
    const modeEl = document.getElementById('status-mode');
    if (msg) {
      modeEl.textContent = msg;
      modeEl.style.color = '#ff6b35';
    } else {
      modeEl.style.color = '';
    }
  }

  _onConfigChange() {
    this.clock.updateTempo();
    this.scoreDisplay.update();
    this._updateUI();
    this._updateStatus();
  }

  _toggleDemo() {
    if (!this.running) this.start();
    const active = this.demoMode.toggle();
    this.operatorPanel.updateDemoButton(active);
    this._updateDemoBtn(active);
    this._updateStatus();
  }

  _updateDemoBtn(active) {
    if (!this._demoBtn) return;
    const playIcon = this._demoBtn.querySelector('.demo-icon-play');
    const pauseIcon = this._demoBtn.querySelector('.demo-icon-pause');
    const label = this._demoBtn.querySelector('.demo-label');
    if (active) {
      this._demoBtn.classList.add('active');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = '';
      if (label) label.textContent = 'Stop';
    } else {
      this._demoBtn.classList.remove('active');
      if (playIcon) playIcon.style.display = '';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (label) label.textContent = 'Demo';
    }
  }
}

// Boot
const app = new App();
app.init();
