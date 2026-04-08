// In C: Audience Ensemble — Audio Engine
// Supports SoundFont (128 GM instruments) and Tone.js (20 sampled instruments).
// Reads instrument assignments from CONFIG.musicians[].
// Each musician loops their pattern independently at natural BPM tempo.

import { CONFIG } from './config.js';
import { PATTERNS, getPatternDuration } from './patterns.js';
import {
  loadSoundfontInstrument,
  loadToneJSInstrument,
  initToneContext,
} from './instrument-sources.js';

// Convert MIDI number to note name (e.g., 60 → "C4")
function midiToNoteName(midi) {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const note = names[midi % 12];
  return `${note}${octave}`;
}

// Per-instrument volume scaling — heavier instruments sit further back in the mix
const INSTRUMENT_GAIN = {
  // Brass
  french_horn: 0.65,
  trombone: 0.6,
  trumpet: 0.7,
  tuba: 0.5,
  // Strings
  contrabass: 0.5,
  cello: 0.7,
  viola: 0.75,
  string_ensemble_1: 0.55,
  string_ensemble_2: 0.55,
  // Other
  celesta: 1.0,
  music_box: 0.9,
  // Tone.js names (hyphenated)
  'french-horn': 0.65,
  'bass-electric': 0.5,
  'guitar-acoustic': 0.8,
  'guitar-electric': 0.8,
  'guitar-nylon': 0.8,
};

// Grace note duration: very short ornament
const GRACE_NOTE_SEC = 0.06;

// How far ahead (in seconds) to fire the loop-end callback before audio finishes
const LOOKAHEAD_SEC = 0.05;

class MusicianVoice {
  constructor(musicianId, audioContext, ensemble) {
    this.id = musicianId;
    this.ctx = audioContext;
    this.ensemble = ensemble;
    this.instrument = null;
    this.instrumentName = '';
    this.currentUnit = 1;
    this._activeNodes = [];
    this._loaded = false;
    this._running = false;
    this._nextLoopTime = 0;
    this._loopTimerId = null;
    // Each musician gets a fixed random offset seed for humanization
    this._humanizeOffset = (Math.random() - 0.5) * 0.04; // ±20ms fixed drift
  }

  get octaveOffset() {
    const m = CONFIG.musicians[this.id];
    return m ? m.octaveOffset : 0;
  }

  get _baseGain() {
    return INSTRUMENT_GAIN[this.instrumentName] ?? 0.8;
  }

  setInstrument(instrument, name) {
    this.instrument = instrument;
    this.instrumentName = name || '';
    this._loaded = true;
  }

  // Start the self-scheduling pattern loop
  startLoop(startTime) {
    this._running = true;
    this._nextLoopTime = startTime;
    this._scheduleNextLoop();
  }

  // Stop the loop and all playing notes
  stopLoop() {
    this._running = false;
    if (this._loopTimerId !== null) {
      clearTimeout(this._loopTimerId);
      this._loopTimerId = null;
    }
    this.stopAll();
  }

  _scheduleNextLoop() {
    if (!this._running || !this._loaded) return;

    const unit = this.currentUnit;
    const patternIndex = unit - 1;
    if (patternIndex < 0 || patternIndex >= PATTERNS.length) return;

    const eighthNoteSec = CONFIG.eighthNoteSec; // Natural tempo from BPM
    const patternDurationEighths = getPatternDuration(patternIndex);

    // Calculate natural pattern duration (accounting for grace notes)
    const pattern = PATTERNS[patternIndex];
    let patternDurationSec = 0;
    for (const event of pattern) {
      if (event.duration === 0) {
        patternDurationSec += GRACE_NOTE_SEC;
      } else {
        patternDurationSec += event.duration * eighthNoteSec;
      }
    }

    // Safety: ensure minimum loop time to avoid runaway timers
    patternDurationSec = Math.max(patternDurationSec, 0.05);

    // Schedule all notes for this pattern playthrough
    this._schedulePatternNotes(patternIndex, this._nextLoopTime, eighthNoteSec);

    // Calculate when this loop ends (= when the next loop starts)
    const loopEndTime = this._nextLoopTime + patternDurationSec;

    // Schedule a callback slightly before the loop ends to prepare the next one
    const now = this.ctx.currentTime;
    const delayMs = Math.max(0, (loopEndTime - now - LOOKAHEAD_SEC) * 1000);

    this._loopTimerId = setTimeout(() => {
      if (!this._running) return;

      // Process loop completion through the ensemble
      const result = this.ensemble.onMusicianLoopComplete(this.id);

      if (result.advanced) {
        this.currentUnit = result.newUnit;
      }
      // else: currentUnit stays the same, we loop the same pattern

      this._nextLoopTime = loopEndTime;
      this._scheduleNextLoop();
    }, delayMs);
  }

  _schedulePatternNotes(patternIndex, startTime, eighthNoteSec) {
    // Stop any previously playing notes for this voice
    this.stopAll();

    const pattern = PATTERNS[patternIndex];
    if (!pattern) return;

    const baseOffset = this._humanizeOffset;
    let noteTime = startTime + baseOffset;

    for (let i = 0; i < pattern.length; i++) {
      const event = pattern[i];
      let noteDurSec;

      if (event.duration === 0) {
        // Grace note — play very short
        noteDurSec = GRACE_NOTE_SEC;
      } else {
        noteDurSec = event.duration * eighthNoteSec;
      }

      if (event.note !== 0 && event.note !== undefined) {
        const midi = event.note + this.octaveOffset;
        const noteName = midiToNoteName(midi);
        // Per-note jitter: small random offset
        const jitter = (Math.random() - 0.5) * 0.03; // ±15ms
        const when = Math.max(noteTime + jitter, this.ctx.currentTime);
        const dur = Math.max(noteDurSec * 0.95, 0.03);

        if (when >= this.ctx.currentTime - 0.01) {
          try {
            const baseVol = this._baseGain;
            const gain = event.duration === 0
              ? baseVol * 0.7   // grace notes softer
              : baseVol * 1.0;  // normal notes at instrument volume
            const node = this.instrument.play(noteName, when, { duration: dur, gain });
            if (node) this._activeNodes.push(node);
          } catch (e) {
            // Ignore scheduling errors
          }
        }
      }

      // Advance time
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
  constructor(audioContext, ensemble) {
    this.ctx = audioContext;
    this.ensemble = ensemble;

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
      v.stopLoop();
    }
    this.voices = [];
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      this.voices.push(new MusicianVoice(i, this.ctx, this.ensemble));
    }
  }

  // Load all instruments — call this before start
  async loadInstruments() {
    if (this._loading) return;
    this._loading = true;
    this._loaded = false;

    // Rebuild voices to match current config
    this._rebuildVoices();

    const source = CONFIG.audioSource;
    console.log(`AudioEngine: Loading instruments (source: ${source})...`);

    // Initialize Tone.js context if needed
    if (source === 'tonejs' && window.Tone) {
      initToneContext(this.ctx);
    }

    // Determine unique instruments needed
    const uniqueInstruments = [...new Set(CONFIG.musicians.map(m => m.instrument))];

    // Load unique instruments (use cache when possible)
    // Cache key is source:name to prevent cross-source collisions
    for (const name of uniqueInstruments) {
      const cacheKey = `${source}:${name}`;
      if (!this._loadedInstrumentCache[cacheKey]) {
        console.log(`  Loading ${name} (${source})...`);
        try {
          let inst;
          if (source === 'tonejs') {
            inst = await loadToneJSInstrument(name, this.masterGain);
          } else {
            inst = await loadSoundfontInstrument(this.ctx, name, this.masterGain);
          }
          this._loadedInstrumentCache[cacheKey] = inst;
          console.log(`  + ${name} loaded`);
        } catch (err) {
          console.error(`  x Failed to load ${name}:`, err);
        }
      }
    }

    // Assign cached instruments to voices
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const instrumentName = CONFIG.musicians[i].instrument;
      const cacheKey = `${source}:${instrumentName}`;
      const inst = this._loadedInstrumentCache[cacheKey];
      if (inst) {
        this.voices[i].setInstrument(inst, instrumentName);
      }
    }

    this._loaded = true;
    this._loading = false;
    console.log('AudioEngine: All instruments loaded!');
  }

  // Start all musician loops independently
  start(musicians) {
    this._running = true;
    if (!this._loaded) {
      console.warn('AudioEngine: instruments not yet loaded');
      return;
    }
    const now = this.ctx.currentTime;
    for (let i = 0; i < musicians.length; i++) {
      if (!musicians[i].offline && this.voices[i]) {
        this.voices[i].currentUnit = musicians[i].currentUnit;
        this.voices[i].startLoop(now);
      }
    }
  }

  // Stop all musician loops
  stop() {
    this._running = false;
    for (const v of this.voices) {
      v.stopLoop();
    }
  }

  setVolume(vol) {
    this.masterGain.gain.value = vol;
  }

  get isLoaded() {
    return this._loaded;
  }
}
