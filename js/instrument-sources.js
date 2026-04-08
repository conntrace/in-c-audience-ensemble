// In C: Audience Ensemble — Instrument Source Abstraction
// Supports two audio sources:
//   'soundfont' — 128 General MIDI instruments via soundfont-player (MusyngKite)
//   'tonejs'    — 20 high-quality sampled instruments via Tone.js + tonejs-instruments

// ─── Tone.js Instrument Bank ─────────────────────────────────────────────────

export const TONEJS_INSTRUMENT_BANK = {
  'Piano': ['piano'],
  'Strings': ['violin', 'cello', 'contrabass'],
  'Brass': ['french-horn', 'trumpet', 'trombone', 'tuba'],
  'Woodwinds': ['flute', 'clarinet', 'bassoon', 'saxophone'],
  'Guitar': ['guitar-acoustic', 'guitar-electric', 'guitar-nylon'],
  'Other Strings': ['harp'],
  'Keys': ['harmonium', 'organ'],
  'Bass': ['bass-electric'],
  'Percussion': ['xylophone'],
};

export const ALL_TONEJS_INSTRUMENTS = Object.values(TONEJS_INSTRUMENT_BANK).flat();

// ─── Tone.js Sample Maps ────────────────────────────────────────────────────
// Each instrument maps note names to filenames. Tone.Sampler interpolates
// between available samples automatically.
// Samples hosted at: https://nbrosowsky.github.io/tonejs-instruments/samples/

const TONEJS_BASE_URL = 'https://nbrosowsky.github.io/tonejs-instruments/samples/';

const TONEJS_SAMPLE_MAPS = {
  'bass-electric': {
    'A#1':'As1.mp3','A#2':'As2.mp3','A#3':'As3.mp3','A#4':'As4.mp3',
    'C#1':'Cs1.mp3','C#2':'Cs2.mp3','C#3':'Cs3.mp3','C#4':'Cs4.mp3',
    'E1':'E1.mp3','E2':'E2.mp3','E3':'E3.mp3','E4':'E4.mp3',
    'G1':'G1.mp3','G2':'G2.mp3','G3':'G3.mp3','G4':'G4.mp3',
  },
  'bassoon': {
    'A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3',
    'C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3',
    'E4':'E4.mp3','G2':'G2.mp3','G3':'G3.mp3','G4':'G4.mp3',
  },
  'cello': {
    'A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3',
    'A#2':'As2.mp3','A#3':'As3.mp3',
    'B2':'B2.mp3','B3':'B3.mp3','B4':'B4.mp3',
    'C2':'C2.mp3','C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3',
    'C#3':'Cs3.mp3','C#4':'Cs4.mp3',
    'D2':'D2.mp3','D3':'D3.mp3','D4':'D4.mp3',
    'D#2':'Ds2.mp3','D#3':'Ds3.mp3','D#4':'Ds4.mp3',
    'E2':'E2.mp3','E3':'E3.mp3','E4':'E4.mp3',
    'F2':'F2.mp3','F3':'F3.mp3','F4':'F4.mp3',
    'F#3':'Fs3.mp3','F#4':'Fs4.mp3',
    'G2':'G2.mp3','G3':'G3.mp3','G4':'G4.mp3',
    'G#2':'Gs2.mp3','G#3':'Gs3.mp3','G#4':'Gs4.mp3',
  },
  'clarinet': {
    'A#3':'As3.mp3','A#4':'As4.mp3','A#5':'As5.mp3',
    'D3':'D3.mp3','D4':'D4.mp3','D5':'D5.mp3','D6':'D6.mp3',
    'F3':'F3.mp3','F4':'F4.mp3','F5':'F5.mp3','F#6':'Fs6.mp3',
  },
  'contrabass': {
    'A2':'A2.mp3','A#1':'As1.mp3','B3':'B3.mp3',
    'C2':'C2.mp3','C#3':'Cs3.mp3','D2':'D2.mp3',
    'E2':'E2.mp3','E3':'E3.mp3',
    'F#1':'Fs1.mp3','F#2':'Fs2.mp3',
    'G1':'G1.mp3','G#2':'Gs2.mp3','G#3':'Gs3.mp3',
  },
  'flute': {
    'A4':'A4.mp3','A5':'A5.mp3','A6':'A6.mp3',
    'C4':'C4.mp3','C5':'C5.mp3','C6':'C6.mp3','C7':'C7.mp3',
    'E4':'E4.mp3','E5':'E5.mp3','E6':'E6.mp3',
  },
  'french-horn': {
    'A1':'A1.mp3','A3':'A3.mp3',
    'C2':'C2.mp3','C4':'C4.mp3',
    'D3':'D3.mp3','D5':'D5.mp3',
    'D#2':'Ds2.mp3',
    'F3':'F3.mp3','F5':'F5.mp3',
    'G2':'G2.mp3',
  },
  'guitar-acoustic': {
    'A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3',
    'A#2':'As2.mp3','A#3':'As3.mp3','A#4':'As4.mp3',
    'B2':'B2.mp3','B3':'B3.mp3','B4':'B4.mp3',
    'C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3',
    'C#3':'Cs3.mp3','C#4':'Cs4.mp3','C#5':'Cs5.mp3',
    'D2':'D2.mp3','D3':'D3.mp3','D4':'D4.mp3','D5':'D5.mp3',
    'D#2':'Ds2.mp3','D#3':'Ds3.mp3','D#4':'Ds4.mp3',
    'E2':'E2.mp3','E3':'E3.mp3','E4':'E4.mp3',
    'F2':'F2.mp3','F3':'F3.mp3','F4':'F4.mp3',
    'F#2':'Fs2.mp3','F#3':'Fs3.mp3','F#4':'Fs4.mp3',
    'G2':'G2.mp3','G3':'G3.mp3','G4':'G4.mp3',
    'G#2':'Gs2.mp3','G#3':'Gs3.mp3','G#4':'Gs4.mp3',
  },
  'guitar-electric': {
    'A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3','A5':'A5.mp3',
    'C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3','C6':'C6.mp3',
    'C#2':'Cs2.mp3',
    'D#3':'Ds3.mp3','D#4':'Ds4.mp3','D#5':'Ds5.mp3',
    'E2':'E2.mp3',
    'F#2':'Fs2.mp3','F#3':'Fs3.mp3','F#4':'Fs4.mp3','F#5':'Fs5.mp3',
  },
  'guitar-nylon': {
    'A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3','A5':'A5.mp3','A#5':'As5.mp3',
    'B1':'B1.mp3','B2':'B2.mp3','B3':'B3.mp3','B4':'B4.mp3',
    'C#3':'Cs3.mp3','C#4':'Cs4.mp3','C#5':'Cs5.mp3',
    'D2':'D2.mp3','D3':'D3.mp3','D5':'D5.mp3',
    'D#4':'Ds4.mp3',
    'E2':'E2.mp3','E3':'E3.mp3','E4':'E4.mp3','E5':'E5.mp3',
    'F#2':'Fs2.mp3','F#3':'Fs3.mp3','F#4':'Fs4.mp3','F#5':'Fs5.mp3',
    'G3':'G3.mp3','G5':'G5.mp3',
    'G#2':'Gs2.mp3','G#4':'Gs4.mp3','G#5':'Gs5.mp3',
  },
  'harmonium': {
    'A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3',
    'A#2':'As2.mp3','A#3':'As3.mp3','A#4':'As4.mp3',
    'C2':'C2.mp3','C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3',
    'C#2':'Cs2.mp3','C#3':'Cs3.mp3','C#4':'Cs4.mp3','C#5':'Cs5.mp3',
    'D2':'D2.mp3','D3':'D3.mp3','D4':'D4.mp3','D5':'D5.mp3',
    'D#2':'Ds2.mp3','D#3':'Ds3.mp3','D#4':'Ds4.mp3',
    'E2':'E2.mp3','E3':'E3.mp3','E4':'E4.mp3',
    'F2':'F2.mp3','F3':'F3.mp3','F4':'F4.mp3',
    'F#2':'Fs2.mp3','F#3':'Fs3.mp3',
    'G2':'G2.mp3','G3':'G3.mp3','G4':'G4.mp3',
    'G#2':'Gs2.mp3','G#3':'Gs3.mp3','G#4':'Gs4.mp3',
  },
  'harp': {
    'A2':'A2.mp3','A4':'A4.mp3','A6':'A6.mp3',
    'B1':'B1.mp3','B3':'B3.mp3','B5':'B5.mp3','B6':'B6.mp3',
    'C3':'C3.mp3','C5':'C5.mp3',
    'D2':'D2.mp3','D4':'D4.mp3','D6':'D6.mp3','D7':'D7.mp3',
    'E1':'E1.mp3','E3':'E3.mp3','E5':'E5.mp3',
    'F2':'F2.mp3','F4':'F4.mp3','F6':'F6.mp3','F7':'F7.mp3',
    'G1':'G1.mp3','G3':'G3.mp3','G5':'G5.mp3',
  },
  'organ': {
    'A1':'A1.mp3','A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3','A5':'A5.mp3',
    'C1':'C1.mp3','C2':'C2.mp3','C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3','C6':'C6.mp3',
    'D#1':'Ds1.mp3','D#2':'Ds2.mp3','D#3':'Ds3.mp3','D#4':'Ds4.mp3','D#5':'Ds5.mp3',
    'F#1':'Fs1.mp3','F#2':'Fs2.mp3','F#3':'Fs3.mp3','F#4':'Fs4.mp3','F#5':'Fs5.mp3',
  },
  'piano': {
    'A1':'A1.mp3','A2':'A2.mp3','A3':'A3.mp3','A4':'A4.mp3','A5':'A5.mp3','A6':'A6.mp3','A7':'A7.mp3',
    'B1':'B1.mp3','B2':'B2.mp3','B3':'B3.mp3','B4':'B4.mp3','B5':'B5.mp3','B6':'B6.mp3','B7':'B7.mp3',
    'C1':'C1.mp3','C2':'C2.mp3','C3':'C3.mp3','C4':'C4.mp3','C5':'C5.mp3','C6':'C6.mp3','C7':'C7.mp3',
    'C#1':'Cs1.mp3','C#2':'Cs2.mp3','C#3':'Cs3.mp3','C#4':'Cs4.mp3','C#5':'Cs5.mp3','C#6':'Cs6.mp3','C#7':'Cs7.mp3',
    'D1':'D1.mp3','D2':'D2.mp3','D3':'D3.mp3','D4':'D4.mp3','D5':'D5.mp3','D6':'D6.mp3','D7':'D7.mp3',
    'D#1':'Ds1.mp3','D#2':'Ds2.mp3','D#3':'Ds3.mp3','D#4':'Ds4.mp3','D#5':'Ds5.mp3','D#6':'Ds6.mp3','D#7':'Ds7.mp3',
    'E1':'E1.mp3','E2':'E2.mp3','E3':'E3.mp3','E4':'E4.mp3','E5':'E5.mp3','E6':'E6.mp3','E7':'E7.mp3',
    'F1':'F1.mp3','F2':'F2.mp3','F3':'F3.mp3','F4':'F4.mp3','F5':'F5.mp3','F6':'F6.mp3','F7':'F7.mp3',
    'F#1':'Fs1.mp3','F#2':'Fs2.mp3','F#3':'Fs3.mp3','F#4':'Fs4.mp3','F#5':'Fs5.mp3','F#6':'Fs6.mp3','F#7':'Fs7.mp3',
    'G1':'G1.mp3','G2':'G2.mp3','G3':'G3.mp3','G4':'G4.mp3','G5':'G5.mp3','G6':'G6.mp3','G7':'G7.mp3',
    'G#1':'Gs1.mp3','G#2':'Gs2.mp3','G#3':'Gs3.mp3','G#4':'Gs4.mp3','G#5':'Gs5.mp3','G#6':'Gs6.mp3','G#7':'Gs7.mp3',
  },
  'saxophone': {
    'A4':'A4.mp3','A5':'A5.mp3',
    'A#3':'As3.mp3','A#4':'As4.mp3',
    'B3':'B3.mp3','B4':'B4.mp3',
    'C4':'C4.mp3','C5':'C5.mp3',
    'C#3':'Cs3.mp3','C#4':'Cs4.mp3','C#5':'Cs5.mp3',
    'D3':'D3.mp3','D4':'D4.mp3','D5':'D5.mp3',
    'D#3':'Ds3.mp3','D#4':'Ds4.mp3','D#5':'Ds5.mp3',
    'E3':'E3.mp3','E4':'E4.mp3','E5':'E5.mp3',
    'F3':'F3.mp3','F4':'F4.mp3','F5':'F5.mp3',
    'F#3':'Fs3.mp3','F#4':'Fs4.mp3','F#5':'Fs5.mp3',
    'G3':'G3.mp3','G4':'G4.mp3','G5':'G5.mp3',
    'G#3':'Gs3.mp3','G#4':'Gs4.mp3','G#5':'Gs5.mp3',
  },
  'trombone': {
    'A#1':'As1.mp3','A#2':'As2.mp3','A#3':'As3.mp3',
    'C3':'C3.mp3','C4':'C4.mp3',
    'C#2':'Cs2.mp3','C#4':'Cs4.mp3',
    'D3':'D3.mp3','D4':'D4.mp3',
    'D#2':'Ds2.mp3','D#3':'Ds3.mp3','D#4':'Ds4.mp3',
    'F2':'F2.mp3','F3':'F3.mp3','F4':'F4.mp3',
    'G#2':'Gs2.mp3','G#3':'Gs3.mp3',
  },
  'trumpet': {
    'A3':'A3.mp3','A5':'A5.mp3',
    'A#4':'As4.mp3',
    'C4':'C4.mp3','C6':'C6.mp3',
    'D5':'D5.mp3','D#4':'Ds4.mp3',
    'F3':'F3.mp3','F4':'F4.mp3','F5':'F5.mp3',
    'G4':'G4.mp3',
  },
  'tuba': {
    'A#1':'As1.mp3','A#2':'As2.mp3','A#3':'As3.mp3',
    'D3':'D3.mp3','D4':'D4.mp3',
    'D#2':'Ds2.mp3',
    'F1':'F1.mp3','F2':'F2.mp3','F3':'F3.mp3',
  },
  'violin': {
    'A3':'A3.mp3','A4':'A4.mp3','A5':'A5.mp3','A6':'A6.mp3',
    'C4':'C4.mp3','C5':'C5.mp3','C6':'C6.mp3','C7':'C7.mp3',
    'E4':'E4.mp3','E5':'E5.mp3','E6':'E6.mp3',
    'G4':'G4.mp3','G5':'G5.mp3','G6':'G6.mp3',
  },
  'xylophone': {
    'C5':'C5.mp3','C6':'C6.mp3','C7':'C7.mp3','C8':'C8.mp3',
    'G4':'G4.mp3','G5':'G5.mp3','G6':'G6.mp3','G7':'G7.mp3',
  },
};

// ─── Name Mappings (SoundFont ↔ Tone.js) ────────────────────────────────────

export const SOUNDFONT_TO_TONEJS = {
  // Piano
  acoustic_grand_piano: 'piano',
  bright_acoustic_piano: 'piano',
  electric_grand_piano: 'piano',
  honkytonk_piano: 'piano',
  electric_piano_1: 'piano',
  electric_piano_2: 'piano',
  harpsichord: 'piano',
  clavinet: 'piano',
  // Chromatic Percussion
  celesta: 'xylophone',
  glockenspiel: 'xylophone',
  music_box: 'piano',
  vibraphone: 'xylophone',
  marimba: 'xylophone',
  xylophone: 'xylophone',
  tubular_bells: 'xylophone',
  dulcimer: 'piano',
  // Organ
  drawbar_organ: 'organ',
  percussive_organ: 'organ',
  rock_organ: 'organ',
  church_organ: 'organ',
  reed_organ: 'harmonium',
  accordion: 'harmonium',
  harmonica: 'harmonium',
  tango_accordion: 'harmonium',
  // Guitar
  acoustic_guitar_nylon: 'guitar-nylon',
  acoustic_guitar_steel: 'guitar-acoustic',
  electric_guitar_jazz: 'guitar-electric',
  electric_guitar_clean: 'guitar-electric',
  electric_guitar_muted: 'guitar-electric',
  overdriven_guitar: 'guitar-electric',
  distortion_guitar: 'guitar-electric',
  guitar_harmonics: 'guitar-acoustic',
  // Bass
  acoustic_bass: 'contrabass',
  electric_bass_finger: 'bass-electric',
  electric_bass_pick: 'bass-electric',
  fretless_bass: 'bass-electric',
  slap_bass_1: 'bass-electric',
  slap_bass_2: 'bass-electric',
  synth_bass_1: 'bass-electric',
  synth_bass_2: 'bass-electric',
  // Strings
  violin: 'violin',
  viola: 'violin',
  cello: 'cello',
  contrabass: 'contrabass',
  tremolo_strings: 'violin',
  pizzicato_strings: 'violin',
  orchestral_harp: 'harp',
  timpani: 'xylophone',
  // Ensemble
  string_ensemble_1: 'violin',
  string_ensemble_2: 'cello',
  synth_strings_1: 'violin',
  synth_strings_2: 'cello',
  choir_aahs: 'harmonium',
  voice_oohs: 'harmonium',
  synth_choir: 'harmonium',
  orchestra_hit: 'piano',
  // Brass
  trumpet: 'trumpet',
  trombone: 'trombone',
  tuba: 'tuba',
  muted_trumpet: 'trumpet',
  french_horn: 'french-horn',
  brass_section: 'trombone',
  synth_brass_1: 'trumpet',
  synth_brass_2: 'trombone',
  // Reed
  soprano_sax: 'saxophone',
  alto_sax: 'saxophone',
  tenor_sax: 'saxophone',
  baritone_sax: 'saxophone',
  // Pipe
  oboe: 'clarinet',
  english_horn: 'clarinet',
  bassoon: 'bassoon',
  clarinet: 'clarinet',
  piccolo: 'flute',
  flute: 'flute',
  recorder: 'flute',
  pan_flute: 'flute',
  blown_bottle: 'flute',
  shakuhachi: 'flute',
  whistle: 'flute',
  ocarina: 'flute',
  // Synth Lead
  lead_1_square: 'organ',
  lead_2_sawtooth: 'organ',
  lead_3_calliope: 'organ',
  lead_4_chiff: 'organ',
  lead_5_charang: 'guitar-electric',
  lead_6_voice: 'harmonium',
  lead_7_fifths: 'organ',
  lead_8_bass__lead: 'bass-electric',
  // Synth Pad
  pad_1_new_age: 'harmonium',
  pad_2_warm: 'harmonium',
  pad_3_polysynth: 'organ',
  pad_4_choir: 'harmonium',
  pad_5_bowed: 'cello',
  pad_6_metallic: 'xylophone',
  pad_7_halo: 'harmonium',
  pad_8_sweep: 'harmonium',
  // Synth Effects
  fx_1_rain: 'piano',
  fx_2_soundtrack: 'harmonium',
  fx_3_crystal: 'xylophone',
  fx_4_atmosphere: 'harmonium',
  fx_5_brightness: 'piano',
  fx_6_goblins: 'organ',
  fx_7_echoes: 'piano',
  fx_8_scifi: 'organ',
  // Ethnic
  sitar: 'guitar-nylon',
  banjo: 'guitar-acoustic',
  shamisen: 'guitar-nylon',
  koto: 'harp',
  kalimba: 'xylophone',
  bagpipe: 'harmonium',
  fiddle: 'violin',
  shanai: 'clarinet',
  // Percussive
  tinkle_bell: 'xylophone',
  agogo: 'xylophone',
  steel_drums: 'xylophone',
  woodblock: 'xylophone',
  taiko_drum: 'xylophone',
  melodic_tom: 'xylophone',
  synth_drum: 'xylophone',
  reverse_cymbal: 'xylophone',
  // Sound Effects
  guitar_fret_noise: 'guitar-acoustic',
  breath_noise: 'flute',
  seashore: 'piano',
  bird_tweet: 'flute',
  telephone_ring: 'xylophone',
  helicopter: 'piano',
  applause: 'piano',
  gunshot: 'piano',
};

export const TONEJS_TO_SOUNDFONT = {
  'piano': 'acoustic_grand_piano',
  'french-horn': 'french_horn',
  'trumpet': 'trumpet',
  'trombone': 'trombone',
  'tuba': 'tuba',
  'violin': 'violin',
  'cello': 'cello',
  'contrabass': 'contrabass',
  'flute': 'flute',
  'clarinet': 'clarinet',
  'bassoon': 'bassoon',
  'saxophone': 'alto_sax',
  'guitar-acoustic': 'acoustic_guitar_steel',
  'guitar-electric': 'electric_guitar_clean',
  'guitar-nylon': 'acoustic_guitar_nylon',
  'harp': 'orchestral_harp',
  'xylophone': 'xylophone',
  'organ': 'church_organ',
  'harmonium': 'accordion',
  'bass-electric': 'electric_bass_finger',
};

// ─── Tone.js Instrument Adapter ─────────────────────────────────────────────
// Wraps a Tone.Sampler to present the same interface as soundfont-player:
//   .play(noteName, when, {duration, gain}) => {stop()}

class ToneJSInstrumentAdapter {
  constructor(sampler) {
    this.sampler = sampler;
  }

  play(noteName, when, options = {}) {
    const { duration = 1, gain = 0.8 } = options;
    try {
      this.sampler.volume.value = this._gainToDb(gain);
      this.sampler.triggerAttackRelease(noteName, duration, when);
    } catch (e) {
      // Ignore out-of-range or scheduling errors
    }

    // Return a node-like object with .stop() for MusicianVoice.stopAll()
    const sampler = this.sampler;
    return {
      stop() {
        try { sampler.releaseAll(); } catch (_) {}
      }
    };
  }

  _gainToDb(gain) {
    if (gain <= 0) return -Infinity;
    return 20 * Math.log10(gain);
  }
}

// ─── Loader Functions ───────────────────────────────────────────────────────

export async function loadSoundfontInstrument(audioCtx, instrumentName, destination) {
  const Soundfont = window.Soundfont;
  if (!Soundfont) throw new Error('Soundfont library not loaded');
  return Soundfont.instrument(audioCtx, instrumentName, {
    soundfont: 'MusyngKite',
    destination,
  });
}

export async function loadToneJSInstrument(instrumentName, destination) {
  const Tone = window.Tone;
  if (!Tone) throw new Error('Tone.js library not loaded');

  const sampleMap = TONEJS_SAMPLE_MAPS[instrumentName];
  if (!sampleMap) throw new Error(`No sample map for Tone.js instrument: ${instrumentName}`);

  const baseUrl = `${TONEJS_BASE_URL}${instrumentName}/`;

  return new Promise((resolve, reject) => {
    try {
      const sampler = new Tone.Sampler({
        urls: sampleMap,
        baseUrl,
        onload: () => resolve(new ToneJSInstrumentAdapter(sampler)),
        onerror: (err) => reject(err),
      });
      // Connect to our masterGain node instead of Tone.Destination
      if (destination) {
        sampler.connect(destination);
      } else {
        sampler.toDestination();
      }
    } catch (err) {
      reject(err);
    }
  });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export function initToneContext(audioCtx) {
  const Tone = window.Tone;
  if (Tone) {
    Tone.setContext(audioCtx);
  }
}

export function mapInstrumentToSource(currentInstrument, targetSource) {
  if (targetSource === 'tonejs') {
    return SOUNDFONT_TO_TONEJS[currentInstrument] || 'piano';
  } else {
    return TONEJS_TO_SOUNDFONT[currentInstrument] || 'acoustic_grand_piano';
  }
}
