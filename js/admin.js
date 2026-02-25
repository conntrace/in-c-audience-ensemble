// In C — Admin Page Logic
// Manages musician configuration: add/remove, color, instrument, octave offset.
// Supports both SoundFont and Tone.js audio sources.

import { CONFIG, INSTRUMENT_BANK } from './config.js';
import {
  TONEJS_INSTRUMENT_BANK,
  mapInstrumentToSource,
  loadToneJSInstrument,
  loadSoundfontInstrument,
  initToneContext,
} from './instrument-sources.js';
import { PIECES, setActivePiece } from './patterns.js';

class AdminPage {
  constructor() {
    this.audioCtx = null;
    this.previewInstrumentCache = {};
    this._init();
  }

  _init() {
    // Load saved config
    CONFIG.load();

    // Apply saved piece selection
    const piece = PIECES[CONFIG.piece];
    if (piece) {
      setActivePiece(CONFIG.piece);
      CONFIG.totalUnits = piece.totalUnits;
    }

    // Populate settings inputs from CONFIG
    this._syncSettingsUI();

    // Render initial state
    this._renderAll();
    this._updateCount();

    // Wire settings inputs
    document.getElementById('setting-bpm').addEventListener('change', (e) => {
      CONFIG.bpm = Math.max(40, Math.min(300, parseInt(e.target.value) || 120));
      e.target.value = CONFIG.bpm;
    });
    document.getElementById('setting-spread').addEventListener('change', (e) => {
      CONFIG.maxSpread = Math.max(1, Math.min(30, parseInt(e.target.value) || 5));
      e.target.value = CONFIG.maxSpread;
    });
    document.getElementById('setting-end').addEventListener('change', (e) => {
      CONFIG.endBehavior = e.target.value;
    });

    // Piece selector
    document.getElementById('setting-piece').addEventListener('change', (e) => {
      const pieceId = e.target.value;
      const piece = PIECES[pieceId];
      if (!piece) return;
      setActivePiece(pieceId);
      CONFIG.piece = pieceId;
      CONFIG.totalUnits = piece.totalUnits;
      CONFIG.bpm = piece.defaultBpm;
      document.getElementById('setting-bpm').value = CONFIG.bpm;
    });

    // Audio source selector
    document.getElementById('setting-audio-source').addEventListener('change', (e) => {
      const newSource = e.target.value;

      // Remap all musician instruments to the new source
      for (const m of CONFIG.musicians) {
        m.instrument = mapInstrumentToSource(m.instrument, newSource);
      }
      CONFIG.audioSource = newSource;

      // Clear preview cache (instruments are source-specific)
      this.previewInstrumentCache = {};

      // Re-render rows (instrument dropdowns change)
      this._renderAll();
    });

    // Wire buttons
    document.getElementById('btn-add-musician').addEventListener('click', () => {
      CONFIG.addMusician();
      this._renderAll();
      this._updateCount();
    });

    document.getElementById('btn-save').addEventListener('click', () => {
      CONFIG.save();
      window.location.href = 'index.html';
    });

    document.getElementById('btn-reset-defaults').addEventListener('click', () => {
      if (confirm('Reset all settings and musicians to defaults? This cannot be undone.')) {
        CONFIG.resetToDefaults();
        this._syncSettingsUI();
        this._renderAll();
        this._updateCount();
      }
    });
  }

  _syncSettingsUI() {
    document.getElementById('setting-bpm').value = CONFIG.bpm;
    document.getElementById('setting-spread').value = CONFIG.maxSpread;
    document.getElementById('setting-end').value = CONFIG.endBehavior;
    document.getElementById('setting-audio-source').value = CONFIG.audioSource;
    document.getElementById('setting-piece').value = CONFIG.piece;
  }

  _renderAll() {
    const list = document.getElementById('musician-list');
    list.innerHTML = '';

    // Header row
    const header = document.createElement('div');
    header.className = 'row-header';
    header.innerHTML = `
      <span>#</span>
      <span>Label</span>
      <span>Color</span>
      <span>Instrument</span>
      <span>Octave</span>
      <span></span>
      <span></span>
    `;
    list.appendChild(header);

    // Musician rows
    for (let i = 0; i < CONFIG.musicians.length; i++) {
      list.appendChild(this._createRow(i));
    }
  }

  _createRow(index) {
    const m = CONFIG.musicians[index];
    const row = document.createElement('div');
    row.className = 'musician-row';

    // Row number
    const num = document.createElement('span');
    num.className = 'row-number';
    num.textContent = index + 1;

    // Label input
    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.className = 'label-input';
    labelInput.value = m.label;
    labelInput.maxLength = 3;
    labelInput.addEventListener('change', () => {
      CONFIG.musicians[index].label = labelInput.value || String.fromCharCode(65 + index);
    });

    // Color picker
    const colorWrapper = document.createElement('div');
    colorWrapper.className = 'color-picker-wrapper';
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'color-picker';
    colorInput.value = m.color;
    colorInput.addEventListener('input', () => {
      CONFIG.musicians[index].color = colorInput.value;
      labelInput.style.color = colorInput.value;
    });
    labelInput.style.color = m.color;
    colorWrapper.appendChild(colorInput);

    // Instrument select — dynamic based on audio source
    const instrumentSelect = document.createElement('select');
    instrumentSelect.className = 'instrument-select';
    const bank = CONFIG.audioSource === 'tonejs' ? TONEJS_INSTRUMENT_BANK : INSTRUMENT_BANK;
    for (const [category, instruments] of Object.entries(bank)) {
      const group = document.createElement('optgroup');
      group.label = category;
      for (const inst of instruments) {
        const opt = document.createElement('option');
        opt.value = inst;
        opt.textContent = this._formatInstrumentName(inst);
        if (inst === m.instrument) opt.selected = true;
        group.appendChild(opt);
      }
      instrumentSelect.appendChild(group);
    }
    instrumentSelect.addEventListener('change', () => {
      CONFIG.musicians[index].instrument = instrumentSelect.value;
    });

    // Octave offset select
    const octaveSelect = document.createElement('select');
    octaveSelect.className = 'octave-select';
    const offsets = [
      { value: -24, label: '-2 oct' },
      { value: -12, label: '-1 oct' },
      { value: 0,   label: 'As written' },
      { value: 12,  label: '+1 oct' },
      { value: 24,  label: '+2 oct' },
    ];
    for (const o of offsets) {
      const opt = document.createElement('option');
      opt.value = o.value;
      opt.textContent = o.label;
      if (o.value === m.octaveOffset) opt.selected = true;
      octaveSelect.appendChild(opt);
    }
    octaveSelect.addEventListener('change', () => {
      CONFIG.musicians[index].octaveOffset = parseInt(octaveSelect.value);
    });

    // Preview button
    const previewBtn = document.createElement('button');
    previewBtn.className = 'btn preview-btn';
    previewBtn.textContent = '\u25B6'; // play triangle
    previewBtn.title = 'Preview sound';
    previewBtn.addEventListener('click', () => {
      this._preview(instrumentSelect.value, parseInt(octaveSelect.value));
    });

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn danger small';
    removeBtn.textContent = '\u2715'; // ✕
    removeBtn.title = 'Remove musician';
    removeBtn.addEventListener('click', () => {
      if (CONFIG.musicians.length <= 1) {
        alert('Cannot remove the last musician.');
        return;
      }
      CONFIG.removeMusician(index);
      this._renderAll();
      this._updateCount();
    });

    row.appendChild(num);
    row.appendChild(labelInput);
    row.appendChild(colorWrapper);
    row.appendChild(instrumentSelect);
    row.appendChild(octaveSelect);
    row.appendChild(previewBtn);
    row.appendChild(removeBtn);

    return row;
  }

  async _preview(instrumentName, octaveOffset) {
    // Lazy-init AudioContext on first preview (needs user gesture)
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    // Cache key includes source to avoid cross-source collisions
    const cacheKey = `${CONFIG.audioSource}:${instrumentName}`;

    // Load instrument if not cached
    if (!this.previewInstrumentCache[cacheKey]) {
      try {
        if (CONFIG.audioSource === 'tonejs') {
          if (window.Tone) {
            initToneContext(this.audioCtx);
          }
          this.previewInstrumentCache[cacheKey] = await loadToneJSInstrument(instrumentName);
        } else {
          this.previewInstrumentCache[cacheKey] = await loadSoundfontInstrument(
            this.audioCtx, instrumentName
          );
        }
      } catch (e) {
        console.error('Failed to load preview instrument:', e);
        return;
      }
    }

    const inst = this.previewInstrumentCache[cacheKey];

    // Play a short C major arpeggio — works for both sources via adapter
    const baseNotes = [60, 64, 67, 72]; // C4, E4, G4, C5
    const now = this.audioCtx.currentTime;
    for (let i = 0; i < baseNotes.length; i++) {
      const midi = baseNotes[i] + octaveOffset;
      const names = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
      const oct = Math.floor(midi / 12) - 1;
      const noteName = `${names[midi % 12]}${oct}`;
      inst.play(noteName, now + i * 0.2, { duration: 0.4, gain: 1.0 });
    }
  }

  _formatInstrumentName(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  _updateCount() {
    document.getElementById('musician-count').textContent =
      `${CONFIG.musicians.length} musician${CONFIG.musicians.length !== 1 ? 's' : ''}`;
  }
}

// Boot
new AdminPage();
