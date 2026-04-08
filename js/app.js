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
import { mapInstrumentToSource } from './instrument-sources.js';
import { PIECES, setActivePiece } from './patterns.js';

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
    this.isOperatorRoute = document.body.classList.contains('operator-route');
    this._instrumentsLoaded = false;
    this._hasSavedDefaults = false;
    this._sessionDirty = false;
    this._audioLoadReport = null;
    this._statusMessage = null;
    this._noticeMessage = null;
    this._noticeTimerId = null;
    this._performanceMuteTimerId = null;
  }

  init() {
    // Load saved musician config from localStorage
    this._hasSavedDefaults = CONFIG.load();

    // Apply saved piece selection and clamp any persisted unit limit to the piece.
    const piece = PIECES[CONFIG.piece] || PIECES['in-c'];
    if (piece) {
      setActivePiece(CONFIG.piece);
      CONFIG.totalUnits = this._clampTotalUnits(CONFIG.totalUnits, piece.totalUnits);
    }

    // Create AudioContext (lazy — needs user gesture)
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Initialize Tone.js to use the same AudioContext for timing alignment
    if (window.Tone) {
      Tone.setContext(this.audioCtx);
    }

    // Core systems
    this.clock = new Clock(this.audioCtx);
    this.ensemble = new Ensemble();
    this.audioEngine = new AudioEngine(this.audioCtx, this.ensemble);

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
      onAudioSourceChange: (source) => this._onAudioSourceChange(source),
      onPieceChange: (pieceId) => this._onPieceChange(pieceId),
      onSaveDefaults: () => this._saveCurrentAsDefaults(),
      onRestoreDefaults: () => this._restoreSavedDefaults(),
    });

    // Wire events — musicians advance independently via audio engine loops
    this.ensemble.addEventListener('stateChange', () => this._updateUI());
    this.ensemble.addEventListener('queued', () => this._updateUI());
    this.ensemble.addEventListener('resetAll', () => this._handleResetAll());
    this.ensemble.addEventListener('spreadRelaxed', () => {
      this._flashNotice('Spread lock relaxed temporarily so the ensemble can move again.');
    });

    // Demo mode press feedback
    this.demoMode.onPress((id) => {
      const btn = this.buttons.buttons[id];
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 200);
    });

    // D key toggles demo
    document.addEventListener('keydown', (e) => {
      const tag = e.target?.tagName;
      const isTypingTarget =
        e.target?.isContentEditable ||
        tag === 'INPUT' ||
        tag === 'SELECT' ||
        tag === 'TEXTAREA';

      if (isTypingTarget) return;

      if ((e.key === 'd' || e.key === 'D') && this.operatorPanel.allowsGlobalShortcuts()) {
        this._toggleDemo();
      }

      // Space to start/pause
      if (e.code === 'Space' && this.operatorPanel.allowsGlobalShortcuts()) {
        e.preventDefault();
        // Dismiss start overlay if visible
        if (this._overlay && !this._overlay.classList.contains('hidden')) {
          this._overlay.classList.add('hidden');
        }
        if (this.running) {
          this.pause();
        } else {
          this.start();
        }
      }
    });

    // Start overlay — play/demo button
    const overlay = document.getElementById('start-overlay');
    const playBtn = document.getElementById('btn-play-demo');
    if (playBtn) {
      playBtn.addEventListener('click', async () => {
        overlay.classList.add('hidden');
        const started = await this.start();
        if (started && !this.demoMode.active) {
          this.demoMode.start();
          this.operatorPanel.updateDemoButton(true);
          this._updateStatus();
        }
      });
    }

    // Space also dismisses the overlay and starts manually (no demo)
    this._overlay = overlay;
    if (this.isOperatorRoute && this._overlay) {
      this._overlay.classList.add('hidden');
    }

    for (const eventName of ['pointerdown', 'touchstart', 'keydown']) {
      document.addEventListener(eventName, () => this._wakePerformanceChrome(), { passive: true });
    }

    // Sync operator panel with loaded config
    this.operatorPanel.syncFromConfig();
    this.operatorPanel.renderSessionStatus({
      dirty: false,
      hasSavedDefaults: this._hasSavedDefaults,
    });
    this.operatorPanel.renderAudioWarnings(this.audioEngine.loadReport);
    this._syncPieceMeta();

    // Periodic UI updater — replaces boundary-driven updates
    // Score display has its own rAF loop; this handles status bar
    this._uiIntervalId = setInterval(() => {
      if (this.running) {
        this._updateStatus();
      }
    }, 100);

    // Initial UI state
    this._updateUI();
    this._updateStatus();

    console.log('In C: Audience Ensemble initialized');
    console.log('Press Space to start. Keys 1-0 to advance musicians. Escape for operator panel. D for demo mode.');
  }

  async start() {
    if (this.running) return true;

    // Resume AudioContext if suspended (requires user gesture)
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    // Load instruments on first start (needs active AudioContext)
    if (!this._instrumentsLoaded) {
      this._setStatusMessage('Loading instruments...');
      const report = await this.audioEngine.loadInstruments();
      this._applyLoadReport(report);
      this._instrumentsLoaded = report.loadedVoiceCount > 0;
      this._setStatusMessage(null);

      if (!this._instrumentsLoaded) {
        this._flashNotice('No instruments loaded. Check the operator audio alerts before starting.', 5000);
        return false;
      }
    }

    this.running = true;
    this.clock.start();
    this.audioEngine.start(this.ensemble.musicians);
    this._updateUI();
    this._updateStatus();
    this._schedulePerformanceChromeMute();
    return true;
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    this.clock.pause();
    this.audioEngine.stop();
    this._updateUI();
    this._updateStatus();
    this._setPerformanceChromeMuted(false);
  }

  reset() {
    this.pause();
    this.ensemble.reset();
    this.clock.reset();
    this.demoMode.stop();
    this.operatorPanel.updateDemoButton(false);
    this._flashNotice('Ensemble reset to the opening silence.');
    this._updateUI();
    this._updateStatus();
    this._setPerformanceChromeMuted(false);
  }

  _updateUI() {
    this.buttons.updateStates();
    this.scoreDisplay.update();
  }

  _updateStatus() {
    const spread = this.ensemble.getSpread();
    const minU = this.ensemble.getMinUnit();
    const maxU = this.ensemble.getMaxUnit();
    const piece = PIECES[CONFIG.piece];
    const queuedCount = this.ensemble.musicians.filter(m => m.advanceQueued).length;
    const readyCount = this.ensemble.getEligible().length;
    const sourceLabel = this._getSourceLabel(CONFIG.audioSource);
    const modeLabel = this._statusMessage || (this.running
      ? (this.demoMode.active ? 'Demo' : 'Running')
      : 'Stopped');
    const audioSummary = this._getAudioAlertSummary();

    document.getElementById('status-bpm').textContent = CONFIG.bpm;
    document.getElementById('status-spread').textContent = `${spread} / ${CONFIG.maxSpread}`;
    document.getElementById('status-range').textContent = `${minU} - ${maxU}`;
    document.getElementById('status-piece').textContent = piece?.name || CONFIG.piece;
    document.getElementById('status-mode').textContent = modeLabel;
    document.getElementById('status-source').textContent = sourceLabel;
    document.getElementById('status-beat').textContent = this.running
      ? this.clock.getElapsedBeats()
      : '-';
    document.getElementById('hud-piece').textContent = piece?.name || 'Audience Ensemble';
    document.getElementById('hud-composer').textContent = piece?.composer || '';
    document.getElementById('hud-note').textContent = this._getHudMessage();
    document.getElementById('hud-detail').textContent =
      `${CONFIG.musicianCount} musicians • ${readyCount} ready • ${queuedCount} queued • ${sourceLabel}${audioSummary ? ` • ${audioSummary}` : ''}`;

    const audienceInstructions = document.getElementById('audience-instructions');
    if (audienceInstructions) {
      audienceInstructions.textContent = this._getAudienceMessage();
    }
  }

  _setStatusMessage(msg) {
    this._statusMessage = msg;
    this._updateStatus();
  }

  _onConfigChange() {
    this.clock.updateTempo();
    this.scoreDisplay.update();
    this._updateUI();
    this._updateStatus();
    this._markSessionDirty('Session settings changed. Save them if you want this setup next time.');
  }

  _handleResetAll() {
    if (!this.running) return;

    // Stop immediately so in-flight voice callbacks cannot schedule stale loops.
    this.audioEngine.stop();
    this.clock.reset();
    this._flashNotice('Everyone reached the end. Restarting from the opening silence.');
    this._updateUI();
    this._updateStatus();

    setTimeout(() => {
      if (!this.running) return;
      this.clock.start();
      this.audioEngine.start(this.ensemble.musicians);
      this._updateUI();
      this._updateStatus();
      this._schedulePerformanceChromeMute();
    }, 0);
  }

  async _onAudioSourceChange(source) {
    // Stop playback while switching
    const wasRunning = this.running;
    if (wasRunning) this.pause();

    // Remap all musician instruments to the new source
    for (const m of CONFIG.musicians) {
      m.instrument = mapInstrumentToSource(m.instrument, source);
    }
    CONFIG.audioSource = source;
    this._markSessionDirty(`Audio source switched to ${this._getSourceLabel(source)} for this session.`);

    // Reload instruments for the new source
    this._instrumentsLoaded = false;
    this._setStatusMessage('Switching audio source...');
    const report = await this.audioEngine.loadInstruments();
    this._applyLoadReport(report);
    this._instrumentsLoaded = report.loadedVoiceCount > 0;
    this._setStatusMessage(null);
    this._flashNotice(this._buildLoadNotice(report, `Audio source switched to ${this._getSourceLabel(source)}.`));

    // Resume if was running
    if (wasRunning && this._instrumentsLoaded) await this.start();
    this._updateStatus();
  }

  _onPieceChange(pieceId) {
    const piece = PIECES[pieceId];
    if (!piece) return;

    // Stop and reset
    this.pause();
    this.demoMode.stop();
    this.operatorPanel.updateDemoButton(false);

    // Switch piece
    setActivePiece(pieceId);
    CONFIG.piece = pieceId;
    CONFIG.totalUnits = piece.totalUnits;
    CONFIG.bpm = piece.defaultBpm;
    this._syncPieceMeta();
    this._markSessionDirty(`Loaded ${piece.name}. Save defaults if this should become the new startup piece.`);
    this._flashNotice(`Loaded ${piece.name}.`);

    // Reset ensemble to unit 1
    this.ensemble.reset();
    this.clock.reset();

    // Sync UI with new config values
    this.operatorPanel.syncFromConfig();
    this._updateUI();
    this._updateStatus();
  }

  async _toggleDemo() {
    if (!this.running) {
      const started = await this.start();
      if (!started) return false;
    }
    const active = this.demoMode.toggle();
    this.operatorPanel.updateDemoButton(active);
    this._flashNotice(active
      ? 'Demo mode is advancing eligible musicians automatically.'
      : 'Demo mode stopped. Manual audience control is active.');
    this._updateStatus();
    return active;
  }

  _syncPieceMeta() {
    const piece = PIECES[CONFIG.piece];
    if (!piece) return;

    document.title = this.isOperatorRoute
      ? `${piece.name}: Operator View`
      : `${piece.name}: The Audience Ensemble`;
    document.querySelector('.start-title').textContent = piece.name;
    document.getElementById('overlay-piece').textContent = piece.name;
    document.getElementById('overlay-composer').textContent = piece.composer;
    document.getElementById('overlay-secondary-hint').textContent =
      this.isOperatorRoute
        ? 'Operator view for transport, defaults, and audio monitoring.'
        : `${CONFIG.musicianCount} musicians share one evolving score.`;
  }

  _flashNotice(message, durationMs = 3200) {
    this._noticeMessage = message;
    this._wakePerformanceChrome();
    if (this._noticeTimerId) {
      clearTimeout(this._noticeTimerId);
    }
    this._noticeTimerId = setTimeout(() => {
      this._noticeMessage = null;
      this._noticeTimerId = null;
      this._updateStatus();
    }, durationMs);
    this._updateStatus();
  }

  _applyLoadReport(report) {
    this._audioLoadReport = report;
    this.operatorPanel?.renderAudioWarnings(report);
    this._updateStatus();
  }

  _saveCurrentAsDefaults() {
    CONFIG.save();
    this._hasSavedDefaults = true;
    this._sessionDirty = false;
    this.operatorPanel?.renderSessionStatus({
      dirty: false,
      hasSavedDefaults: true,
      message: 'Saved defaults updated. Future launches will start from this setup.',
    });
    this._flashNotice('Saved the current session as the new default setup.');
  }

  _restoreSavedDefaults() {
    if (!this._hasSavedDefaults) return;
    window.location.reload();
  }

  _markSessionDirty(message) {
    this._sessionDirty = true;
    this.operatorPanel?.renderSessionStatus({
      dirty: true,
      hasSavedDefaults: this._hasSavedDefaults,
      message,
    });
  }

  _getSourceLabel(source) {
    return source === 'tonejs' ? 'Tone.js' : 'SoundFont';
  }

  _getAudioAlertSummary() {
    const failures = this._audioLoadReport?.failures ?? [];
    if (failures.length === 0) return '';
    return `${failures.length} audio alert${failures.length === 1 ? '' : 's'}`;
  }

  _buildLoadNotice(report, prefix) {
    const failures = report?.failures ?? [];
    if (failures.length === 0) {
      return `${prefix} ${report.loadedVoiceCount} voices are ready.`;
    }
    return `${prefix} ${report.loadedVoiceCount} of ${report.totalVoiceCount} voices loaded; check audio alerts for ${failures.length} warning${failures.length === 1 ? '' : 's'}.`;
  }

  _clampTotalUnits(value, pieceMax) {
    const numericValue = Number.isFinite(value) ? value : pieceMax;
    return Math.max(5, Math.min(pieceMax, numericValue));
  }

  _setPerformanceChromeMuted(muted) {
    if (this._performanceMuteTimerId) {
      clearTimeout(this._performanceMuteTimerId);
      this._performanceMuteTimerId = null;
    }

    if (this.isOperatorRoute) return;
    document.body.classList.toggle('performance-muted', Boolean(muted) && this.running);
  }

  _schedulePerformanceChromeMute() {
    this._setPerformanceChromeMuted(false);
    if (!this.running || this.isOperatorRoute) return;
    this._performanceMuteTimerId = setTimeout(() => {
      if (this.running) {
        document.body.classList.add('performance-muted');
      }
    }, 6000);
  }

  _wakePerformanceChrome() {
    this._setPerformanceChromeMuted(false);
    this._schedulePerformanceChromeMute();
  }

  _getAudienceMessage() {
    if (!this.running) {
      return 'Press a lit station or matching number key after the piece starts to queue the next move.';
    }
    if (this.ensemble.isOpeningGateActive()) {
      return 'Opening gate: help every musician reach the first sounding pattern before the ensemble can spread out.';
    }
    if (this.ensemble.isSpreadRelaxed()) {
      return 'Spread lock is temporarily relaxed so the group can recover from a stall.';
    }
    const queuedCount = this.ensemble.musicians.filter(m => m.advanceQueued).length;
    if (queuedCount > 0) {
      return `${queuedCount} station${queuedCount === 1 ? '' : 's'} already queued. More lit stations can still join the next shift.`;
    }
    return 'Press any lit station to queue that musician’s next change at the loop boundary.';
  }

  _getHudMessage() {
    if (this._statusMessage) return this._statusMessage;
    if (this._noticeMessage) return this._noticeMessage;
    const failures = this._audioLoadReport?.failures ?? [];
    if (failures.length > 0) {
      return `${failures.length} voice load warning${failures.length === 1 ? '' : 's'} detected. The ensemble will still run with the voices that loaded successfully.`;
    }
    if (!this.running) {
      return 'Press Space for manual play or use the play button to launch demo mode.';
    }
    if (this.ensemble.isOpeningGateActive()) {
      return 'Opening gate active: everyone must reach the first sounding pattern before moving on.';
    }
    if (this.ensemble.isSpreadRelaxed()) {
      return 'Spread lock is temporarily relaxed so the ensemble can recover from a stall.';
    }
    if (this.demoMode.active) {
      return 'Demo mode is advancing whichever musicians are currently eligible.';
    }
    const queuedCount = this.ensemble.musicians.filter(m => m.advanceQueued).length;
    if (queuedCount > 0) {
      return `${queuedCount} queued advance${queuedCount === 1 ? '' : 's'} will trigger at the next loop boundary.`;
    }
    return 'Audience stations can queue advances whenever a musician becomes eligible.';
  }
}

// Boot
const app = new App();
app.init();
