// In C: Audience Ensemble — Audio Engine (SoundFont Edition)
// Uses soundfont-player to load real instrument samples.
// Reads instrument assignments from CONFIG.musicians[].
// Transitions happen only at unit boundaries.

import { CONFIG } from './config.js';
import { PATTERNS, getPatternDuration } from './patterns.js';

// Convert MIDI number to note name (e.g., 60 → "C4")
function midiToNoteName(midi) {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const note = names[midi % 12];
  return `${note}${octave}`;
}

class MusicianVoice {
  constructor(musicianId) {
    this.id = musicianId;
    this.instrument = null;
    this.currentUnit = 1;
    this._activeNodes = [];
    this._loaded = false;
  }

  get octaveOffset() {
    const m = CONFIG.musicians[this.id];
    return m ? m.octaveOffset : 0;
  }

  setInstrument(instrument) {
    this.instrument = instrument;
    this._loaded = true;
  }

  scheduleUnit(unit, startTime, unitDurationSec, audioCtxTime) {
    this.currentUnit = unit;
    this.stopAll();

    if (!this._loaded || !this.instrument) return;

    const patternIndex = unit - 1;
    if (patternIndex < 0 || patternIndex >= PATTERNS.length) return;

    const pattern = PATTERNS[patternIndex];
    const patternDurationEighths = getPatternDuration(patternIndex);
    const eighthNoteSec = unitDurationSec / patternDurationEighths;

    // Grace note duration: very short, steal time from next note
    const GRACE_NOTE_SEC = 0.06;

    let noteTime = startTime;
    for (let i = 0; i < pattern.length; i++) {
      const event = pattern[i];
      let noteDurSec;

      if (event.duration === 0) {
        // Grace note — play very short, don't advance time
        noteDurSec = GRACE_NOTE_SEC;
      } else {
        noteDurSec = event.duration * eighthNoteSec;
      }

      if (event.note !== 0 && event.note !== undefined) {
        const midi = event.note + this.octaveOffset;
        const noteName = midiToNoteName(midi);
        const when = noteTime;
        const dur = Math.max(noteDurSec * 0.95, 0.03);

        if (when >= audioCtxTime - 0.01) {
          try {
            const gain = event.duration === 0 ? 0.8 : 1.2; // grace notes slightly softer
            const node = this.instrument.play(noteName, when, { duration: dur, gain });
            if (node) this._activeNodes.push(node);
          } catch (e) {
            // Ignore scheduling errors
          }
        }
      }

      // Grace notes advance time by their short duration
      if (event.duration === 0) {
        noteTime += GRACE_NOTE_SEC;
      } else {
        noteTime += noteDurSec;
      }
    }
  }

  stopAll() {
    for (const node of this._activeNodes) {
      try { node.stop(); } catch (_) {}
    }
    this._activeNodes = [];
  }
}

export class AudioEngine {
  constructor(audioContext) {
    this.ctx = audioContext;

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = CONFIG.masterVolume;
    this.masterGain.connect(this.ctx.destination);

    // Voices created dynamically based on CONFIG
    this.voices = [];
    this._rebuildVoices();

    this._running = false;
    this._loaded = false;
    this._loading = false;
    this._loadedInstrumentCache = {}; // cache: instrumentName → instrument object
  }

  _rebuildVoices() {
    // Stop existing voices
    for (const v of this.voices) {
      v.stopAll();
    }
    this.voices = [];
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      this.voices.push(new MusicianVoice(i));
    }
  }

  // Load all instruments — call this before start
  async loadInstruments() {
    if (this._loading) return;
    this._loading = true;
    this._loaded = false;

    // Rebuild voices to match current config
    this._rebuildVoices();

    console.log('AudioEngine: Loading instruments...');
    const Soundfont = window.Soundfont;

    if (!Soundfont) {
      console.error('AudioEngine: Soundfont library not loaded!');
      this._loading = false;
      return;
    }

    // Determine unique instruments needed
    const uniqueInstruments = [...new Set(CONFIG.musicians.map(m => m.instrument))];

    // Load unique instruments (use cache when possible)
    for (const name of uniqueInstruments) {
      if (!this._loadedInstrumentCache[name]) {
        console.log(`  Loading ${name}...`);
        try {
          const inst = await Soundfont.instrument(this.ctx, name, {
            soundfont: 'MusyngKite',
            destination: this.masterGain,
          });
          this._loadedInstrumentCache[name] = inst;
          console.log(`  + ${name} loaded`);
        } catch (err) {
          console.error(`  x Failed to load ${name}:`, err);
        }
      }
    }

    // Assign cached instruments to voices
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const instrumentName = CONFIG.musicians[i].instrument;
      const inst = this._loadedInstrumentCache[instrumentName];
      if (inst) {
        this.voices[i].setInstrument(inst);
      }
    }

    this._loaded = true;
    this._loading = false;
    console.log('AudioEngine: All instruments loaded!');
  }

  // Schedule the current unit for all musicians at a boundary
  onBoundary(musicians, boundaryTime) {
    if (!this._running || !this._loaded) return;
    const duration = CONFIG.unitDurationSec;

    for (let i = 0; i < musicians.length; i++) {
      const m = musicians[i];
      if (!m.offline && this.voices[i]) {
        this.voices[i].scheduleUnit(m.currentUnit, boundaryTime, duration, this.ctx.currentTime);
      }
    }
  }

  start(musicians) {
    this._running = true;
    if (!this._loaded) {
      console.warn('AudioEngine: instruments not yet loaded');
      return;
    }
    const now = this.ctx.currentTime;
    const duration = CONFIG.unitDurationSec;
    for (let i = 0; i < musicians.length; i++) {
      if (!musicians[i].offline && this.voices[i]) {
        this.voices[i].scheduleUnit(musicians[i].currentUnit, now, duration, now);
      }
    }
  }

  stop() {
    this._running = false;
    for (const v of this.voices) {
      v.stopAll();
    }
  }

  setVolume(vol) {
    this.masterGain.gain.value = vol;
  }

  get isLoaded() {
    return this._loaded;
  }
}
