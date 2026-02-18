// In C: Audience Ensemble — Configuration

// Full General MIDI instrument bank (128 instruments), grouped by category
export const INSTRUMENT_BANK = {
  'Piano': [
    'acoustic_grand_piano', 'bright_acoustic_piano', 'electric_grand_piano',
    'honkytonk_piano', 'electric_piano_1', 'electric_piano_2', 'harpsichord', 'clavinet',
  ],
  'Chromatic Percussion': [
    'celesta', 'glockenspiel', 'music_box', 'vibraphone', 'marimba',
    'xylophone', 'tubular_bells', 'dulcimer',
  ],
  'Organ': [
    'drawbar_organ', 'percussive_organ', 'rock_organ', 'church_organ',
    'reed_organ', 'accordion', 'harmonica', 'tango_accordion',
  ],
  'Guitar': [
    'acoustic_guitar_nylon', 'acoustic_guitar_steel', 'electric_guitar_jazz',
    'electric_guitar_clean', 'electric_guitar_muted', 'overdriven_guitar',
    'distortion_guitar', 'guitar_harmonics',
  ],
  'Bass': [
    'acoustic_bass', 'electric_bass_finger', 'electric_bass_pick', 'fretless_bass',
    'slap_bass_1', 'slap_bass_2', 'synth_bass_1', 'synth_bass_2',
  ],
  'Strings': [
    'violin', 'viola', 'cello', 'contrabass', 'tremolo_strings',
    'pizzicato_strings', 'orchestral_harp', 'timpani',
  ],
  'Ensemble': [
    'string_ensemble_1', 'string_ensemble_2', 'synth_strings_1', 'synth_strings_2',
    'choir_aahs', 'voice_oohs', 'synth_choir', 'orchestra_hit',
  ],
  'Brass': [
    'trumpet', 'trombone', 'tuba', 'muted_trumpet', 'french_horn',
    'brass_section', 'synth_brass_1', 'synth_brass_2',
  ],
  'Reed': [
    'soprano_sax', 'alto_sax', 'tenor_sax', 'baritone_sax',
  ],
  'Pipe': [
    'oboe', 'english_horn', 'bassoon', 'clarinet', 'piccolo', 'flute',
    'recorder', 'pan_flute', 'blown_bottle', 'shakuhachi', 'whistle', 'ocarina',
  ],
  'Synth Lead': [
    'lead_1_square', 'lead_2_sawtooth', 'lead_3_calliope', 'lead_4_chiff',
    'lead_5_charang', 'lead_6_voice', 'lead_7_fifths', 'lead_8_bass__lead',
  ],
  'Synth Pad': [
    'pad_1_new_age', 'pad_2_warm', 'pad_3_polysynth', 'pad_4_choir',
    'pad_5_bowed', 'pad_6_metallic', 'pad_7_halo', 'pad_8_sweep',
  ],
  'Synth Effects': [
    'fx_1_rain', 'fx_2_soundtrack', 'fx_3_crystal', 'fx_4_atmosphere',
    'fx_5_brightness', 'fx_6_goblins', 'fx_7_echoes', 'fx_8_scifi',
  ],
  'Ethnic': [
    'sitar', 'banjo', 'shamisen', 'koto', 'kalimba', 'bagpipe', 'fiddle', 'shanai',
  ],
  'Percussive': [
    'tinkle_bell', 'agogo', 'steel_drums', 'woodblock', 'taiko_drum',
    'melodic_tom', 'synth_drum', 'reverse_cymbal',
  ],
  'Sound Effects': [
    'guitar_fret_noise', 'breath_noise', 'seashore', 'bird_tweet',
    'telephone_ring', 'helicopter', 'applause', 'gunshot',
  ],
};

// Flat list of all instrument names
export const ALL_INSTRUMENTS = Object.values(INSTRUMENT_BANK).flat();

// Default musician configurations
const DEFAULT_MUSICIANS = [
  { label: 'A', color: '#FF4136', instrument: 'french_horn',         octaveOffset: 0 },
  { label: 'B', color: '#FF851B', instrument: 'trombone',            octaveOffset: 0 },
  { label: 'C', color: '#FFDC00', instrument: 'trumpet',             octaveOffset: 0 },
  { label: 'D', color: '#2ECC40', instrument: 'tuba',                octaveOffset: -12 },
  { label: 'E', color: '#0074D9', instrument: 'contrabass',          octaveOffset: -12 },
  { label: 'F', color: '#B10DC9', instrument: 'contrabass',          octaveOffset: 0 },
  { label: 'G', color: '#F012BE', instrument: 'cello',               octaveOffset: 0 },
  { label: 'H', color: '#01FF70', instrument: 'viola',               octaveOffset: 0 },
  { label: 'I', color: '#7FDBFF', instrument: 'string_ensemble_1',   octaveOffset: 0 },
  { label: 'J', color: '#AAAAAA', instrument: 'string_ensemble_1',   octaveOffset: -12 },
];

// A pool of colors for when users add new musicians beyond the defaults
const EXTRA_COLORS = [
  '#E6194B', '#3CB44B', '#FFE119', '#4363D8', '#F58231',
  '#911EB4', '#42D4F4', '#F032E6', '#BFEF45', '#FABED4',
  '#469990', '#DCBEFF', '#9A6324', '#800000', '#AAFFC3',
  '#808000', '#FFD8B1', '#000075', '#A9A9A9', '#FFFFFF',
];

const STORAGE_KEY = 'inC_musicians';
const STORAGE_KEY_SETTINGS = 'inC_settings';

export const CONFIG = {
  // Tempo and timing
  bpm: 120,

  // Audio source: 'soundfont' (128 GM instruments) or 'tonejs' (20 sampled instruments)
  audioSource: 'soundfont',

  // Composition
  totalUnits: 54,  // 0 (silence) + 53 patterns
  endBehavior: 'wrap',

  // Ensemble rules
  maxSpread: 3,
  deadlockTimeoutMs: 10000,

  // Musicians array — the source of truth
  musicians: JSON.parse(JSON.stringify(DEFAULT_MUSICIANS)),

  // Derived properties
  get musicianCount() {
    return this.musicians.length;
  },
  get musicianLabels() {
    return this.musicians.map(m => m.label);
  },
  get musicianColors() {
    return this.musicians.map(m => m.color);
  },

  // Keyboard mapping — dynamically generated based on musician count
  get keyMap() {
    const keys = ['Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0',
                  'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP'];
    const map = {};
    for (let i = 0; i < Math.min(this.musicians.length, keys.length); i++) {
      map[keys[i]] = i;
    }
    return map;
  },

  // Key labels for display
  get keyLabels() {
    const labels = ['1','2','3','4','5','6','7','8','9','0',
                    'Q','W','E','R','T','Y','U','I','O','P'];
    return labels.slice(0, this.musicians.length);
  },

  // Demo mode
  demoIntervalMs: 2500,

  // Audio
  masterVolume: 0.5,

  // Derived timing — natural eighth-note duration based on BPM
  get eighthNoteSec() {
    return 60 / this.bpm / 2;
  },

  // Persistence
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.musicians));
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({
        bpm: this.bpm,
        maxSpread: this.maxSpread,
        endBehavior: this.endBehavior,
        audioSource: this.audioSource,
      }));
    } catch (e) {
      console.warn('Failed to save config:', e);
    }
  },

  load() {
    let loaded = false;
    try {
      const savedMusicians = localStorage.getItem(STORAGE_KEY);
      if (savedMusicians) {
        const parsed = JSON.parse(savedMusicians);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.musicians = parsed;
          loaded = true;
        }
      }
      const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (savedSettings) {
        const s = JSON.parse(savedSettings);
        if (s.bpm) this.bpm = s.bpm;
        if (s.maxSpread) this.maxSpread = s.maxSpread;
        if (s.endBehavior) this.endBehavior = s.endBehavior;
        if (s.audioSource) this.audioSource = s.audioSource;
        loaded = true;
      }
    } catch (e) {
      console.warn('Failed to load config:', e);
    }
    return loaded;
  },

  resetToDefaults() {
    this.musicians = JSON.parse(JSON.stringify(DEFAULT_MUSICIANS));
    this.bpm = 120;
    this.maxSpread = 3;
    this.endBehavior = 'wrap';
    this.audioSource = 'soundfont';
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
  },

  addMusician() {
    const idx = this.musicians.length;
    const label = idx < 26 ? String.fromCharCode(65 + idx) : `M${idx + 1}`;
    const color = EXTRA_COLORS[idx % EXTRA_COLORS.length];
    const defaultInstrument = this.audioSource === 'tonejs' ? 'piano' : 'acoustic_grand_piano';
    this.musicians.push({
      label,
      color,
      instrument: defaultInstrument,
      octaveOffset: 0,
    });
  },

  removeMusician(index) {
    if (this.musicians.length <= 1) return; // keep at least 1
    this.musicians.splice(index, 1);
  },
};
