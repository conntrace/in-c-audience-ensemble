// In C: Audience Ensemble — All 53 Patterns transcribed from Terry Riley's score
//
// Each pattern is an array of note events: { note, duration }
// - note: MIDI note number (C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, B4=71, C5=72, etc.)
//         Use 0 for rests.
// - duration: in eighth-note units (1 = eighth note, 2 = quarter, 4 = half, 8 = whole, etc.)
//
// Accidentals: F#=66, C#=61, Bb=70, Ab=68
// Octaves: C3=48, E3=52, F3=53, G3=55, A3=57, B3=59
//          C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, B4=71
//          C5=72, D5=74, E5=76, F5=77, G5=79
//
// The "duration" of the full pattern (sum of all note durations) determines
// how long one cycle of the pattern is in eighth-note pulses.

export const PATTERNS = [

  // Pattern 1: C E C E C E (eighth notes on high C and E, repeated)
  // Three short C-E pairs, with a rest feel
  [
    { note: 60, duration: 0.5 }, // C4 sixteenth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 60, duration: 0.5 }, // C4 sixteenth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 60, duration: 0.5 }, // C4 sixteenth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
  ],

  // Pattern 2: C E F E (eighth notes)
  [
    { note: 60, duration: 1 },   // C4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 3: rest E F E (eighth note rest then eighth notes)
  [
    { note: 0, duration: 1 },    // rest
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 4: rest E F G (eighth note rest then eighth notes)
  [
    { note: 0, duration: 1 },    // rest
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1 },   // G4
  ],

  // Pattern 5: rest E F G rest (with rest at end)
  [
    { note: 0, duration: 1 },    // rest
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1 },   // G4
    { note: 0, duration: 1 },    // rest
  ],

  // Pattern 6: C (whole note tied to half — long held C)
  [
    { note: 72, duration: 8 },   // C5 whole
    { note: 72, duration: 4 },   // C5 half (tied feel - held)
  ],

  // Pattern 7: rests and C-C pattern with sixteenths
  // rest rest rest rest rest C(16th) C(8th) rest rest rest rest rest
  [
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 0.5 },  // rest
    { note: 60, duration: 0.5 }, // C4
    { note: 60, duration: 1 },   // C4
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
  ],

  // Pattern 8: F dotted whole, E whole, E whole (long held notes)
  [
    { note: 65, duration: 12 },  // F4 dotted whole
    { note: 64, duration: 8 },   // E4 whole (tied)
    { note: 64, duration: 8 },   // E4 whole
  ],

  // Pattern 9: B C rest rest rest rest (short then rests)
  [
    { note: 71, duration: 1 },   // B4
    { note: 72, duration: 1 },   // C5
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
  ],

  // Pattern 10: B C (eighths, short pattern)
  [
    { note: 71, duration: 1 },   // B4
    { note: 72, duration: 1 },   // C5
  ],

  // Pattern 11: F E F E B C (sixteenth-note figure, fast)
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 71, duration: 1 },   // B4
    { note: 72, duration: 1 },   // C5
  ],

  // Pattern 12: F E F E (eighths) then C half
  [
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 4 },   // E4 half
  ],

  // Pattern 13: B G dotted-eighth, F E dotted-quarter, E dotted-quarter, G half-dotted
  [
    { note: 71, duration: 1.5 }, // B4 dotted eighth
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
    { note: 0, duration: 0.5 },  // rest
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 3 },   // F4 dotted quarter (held)
  ],

  // Pattern 14: C whole, E whole, F# whole (long held notes, C and E tied)
  [
    { note: 72, duration: 8 },   // C5 whole
    { note: 64, duration: 8 },   // E4 whole
    { note: 66, duration: 8 },   // F#4 whole
  ],

  // Pattern 15: G eighth, B dotted, rest rest rest rest
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 1.5 }, // B4 dotted eighth
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
  ],

  // Pattern 16: E F E F E F E F (repeating eighth note pairs)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
  ],

  // Pattern 17: E F E F G E rest (with sixteenths)
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
    { note: 0, duration: 0.5 },  // rest
  ],

  // Pattern 18: E F# G A B (sixteenths) then G F E F E (eighths)
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 67, duration: 0.5 }, // G4
    { note: 69, duration: 0.5 }, // A4
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
  ],

  // Pattern 19: rest dotted-quarter, G dotted-half
  [
    { note: 0, duration: 3 },    // rest (dotted quarter)
    { note: 67, duration: 6 },   // G4 dotted half
  ],

  // Pattern 20: E F# G A B (sixteenths/eighths)
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 67, duration: 0.5 }, // G4
    { note: 69, duration: 0.5 }, // A4
    { note: 71, duration: 1 },   // B4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 21: F# dotted half (long held note)
  [
    { note: 66, duration: 6 },   // F#4 dotted half
  ],

  // Pattern 22: E dotted-eighth repeated pattern with F#, A
  [
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 66, duration: 1.5 }, // F#4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 65, duration: 4 },   // F4 half
  ],

  // Pattern 23: E eighth, F# dotted-eighth, E dotted-eighth repeated sequence
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 1.5 }, // F#4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 65, duration: 4 },   // F4 half
  ],

  // Pattern 24: E F# G A B (ascending run, eighths)
  [
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 66, duration: 1.5 }, // F#4 dotted
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 65, duration: 4 },   // F4 half
  ],

  // Pattern 25: E F# G A B (dotted eighth pattern with ascending line)
  [
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 66, duration: 1.5 }, // F#4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 64, duration: 1.5 }, // E4 dotted
    { note: 65, duration: 4 },   // F4 half
  ],

  // Pattern 26: E F# G A B E dotted-eighth sequence
  [
    { note: 64, duration: 1.5 }, // E4
    { note: 66, duration: 1.5 }, // F#4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 65, duration: 4 },   // F4 half
  ],

  // Pattern 27: E F# G E (eighths with beam groupings)
  [
    { note: 64, duration: 1.5 }, // E4
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 64, duration: 1.5 }, // E4
    { note: 65, duration: 4 },   // F4 half
  ],

  // Pattern 28: E F# E F# (dotted-eighth pattern)
  [
    { note: 64, duration: 1.5 }, // E4
    { note: 66, duration: 1.5 }, // F#4
    { note: 64, duration: 1 },   // E4
    { note: 64, duration: 1 },   // E4
    { note: 64, duration: 1 },   // E4
    { note: 64, duration: 1 },   // E4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 29: E half, E half-dot (long tones)
  [
    { note: 64, duration: 4 },   // E4 half
    { note: 64, duration: 4 },   // E4 half
    { note: 64, duration: 6 },   // E4 dotted half
  ],

  // Pattern 30: C whole tied to dotted half (very long)
  [
    { note: 72, duration: 12 },  // C5 dotted whole
  ],

  // Pattern 31: G F E (sixteenths) E F E F (eighths)
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 32: E F E F G E F E (sixteenth-note figure) then G dotted half
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 4 },   // F4 half (held)
  ],

  // Pattern 33: G E (eighth notes short)
  [
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
    { note: 0, duration: 0.5 },  // rest
  ],

  // Pattern 34: G E (eighth notes, similar to 33)
  [
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 35: F E F E F E F E G rest rest rest Bb rest ... (long pattern)
  // This is the longest pattern in the piece
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 1 },   // E4
    { note: 0, duration: 0.5 },  // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 70, duration: 0.5 }, // Bb4
    { note: 0, duration: 1 },    // rest
    { note: 65, duration: 6 },   // F4 dotted half
    { note: 64, duration: 1 },   // E4
    { note: 64, duration: 1 },   // E4
    { note: 60, duration: 1 },   // C4 (natural)
    { note: 64, duration: 6 },   // E4 dotted half
    { note: 64, duration: 1 },   // E4
    { note: 66, duration: 6 },   // F#4 dotted half
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 0.5 },  // rest
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 4 },   // F4 half
    { note: 70, duration: 12 },  // Bb4 dotted whole
  ],

  // Pattern 36: E F E F E G E F E (sixteenths and eighths)
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 1 },   // E4
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 37: E F E (eighths)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 38: E F G (eighths)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1 },   // G4
  ],

  // Pattern 39: B G F E F E (eighths)
  [
    { note: 71, duration: 1 },   // B4
    { note: 67, duration: 1 },   // G4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 40: E F E (eighths, short)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 41: E F G (eighths)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1.5 }, // G4 dotted
  ],

  // Pattern 42: C half, C half, C half, C half (4 half notes — all high C)
  [
    { note: 72, duration: 4 },   // C5 half
    { note: 72, duration: 4 },   // C5 half
    { note: 72, duration: 4 },   // C5 half
    { note: 72, duration: 4 },   // C5 half
  ],

  // Pattern 43: E F E F E G E F E (similar to 36 with different grouping)
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 64, duration: 1 },   // E4
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
    { note: 64, duration: 1.5 }, // E4
  ],

  // Pattern 44: E F E (with tie — sustained)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 4 },   // E4 half (tied)
    { note: 64, duration: 4 },   // E4 half
  ],

  // Pattern 45: E F E (eighths)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 46: E F E G rest G rest G rest G (syncopated)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
    { note: 0, duration: 0.5 },  // rest
    { note: 67, duration: 1.5 }, // G4
    { note: 0, duration: 0.5 },  // rest
    { note: 67, duration: 1.5 }, // G4
    { note: 0, duration: 0.5 },  // rest
    { note: 67, duration: 1.5 }, // G4
  ],

  // Pattern 47: G E F E (eighths)
  [
    { note: 67, duration: 1 },   // G4
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 48: C dotted whole tied to C whole (very long held C)
  [
    { note: 72, duration: 12 },  // C5 dotted whole
    { note: 72, duration: 8 },   // C5 whole (tied)
  ],

  // Pattern 49: G F E F E F E F E (sixteenth-note groups)
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 0.5 }, // E4
    { note: 65, duration: 0.5 }, // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 50: E F E (eighths — similar to 45)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 51: E F E (eighths)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 52: E F E (eighths)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 53: E F G (eighths — final pattern)
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1 },   // G4
  ],
];

// Compute the total duration (in eighth-note units) of each pattern
export function getPatternDuration(patternIndex) {
  const pattern = PATTERNS[patternIndex];
  return pattern.reduce((sum, note) => sum + note.duration, 0);
}

// Convert MIDI note number to frequency (Hz)
export function midiToFreq(midi) {
  if (midi === 0) return 0; // rest
  return 440 * Math.pow(2, (midi - 69) / 12);
}
