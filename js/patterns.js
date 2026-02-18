// In C: Audience Ensemble — All 53 Patterns transcribed from Terry Riley's score
//
// Each pattern is an array of note events: { note, duration }
// - note: MIDI note number (C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, Bb4=70, B4=71, C5=72, etc.)
//         Use 0 for rests. Use -1 for grace notes (very short, nearly zero duration).
// - duration: in eighth-note units (1 = eighth note, 2 = quarter, 4 = half, 6 = dotted half,
//             8 = whole, 12 = dotted whole, etc.)
//   Grace notes have duration 0 (they are crushed into the next note).
//
// Reference: Cross-verified against Terry Riley's original score, teropa/in-c,
//            and simondemeule/InChrome implementations.
//
// Note mapping:
//   C4=60, D4=62, E4=64, F4=65, F#4=66, G4=67, A4=69, Bb4=70, B4=71
//   C5=72, D5=74, E5=76, F5=77, G5=79
//   G3=55

export const PATTERNS = [

  // Pattern 1: grace-note C4 into E4 quarter, repeated 3 times
  [
    { note: 60, duration: 0 },   // C4 grace note
    { note: 64, duration: 2 },   // E4 quarter
    { note: 60, duration: 0 },   // C4 grace note
    { note: 64, duration: 2 },   // E4 quarter
    { note: 60, duration: 0 },   // C4 grace note
    { note: 64, duration: 2 },   // E4 quarter
  ],

  // Pattern 2: grace-note C4, E4 eighth, F4 eighth, E4 quarter
  [
    { note: 60, duration: 0 },   // C4 grace note
    { note: 64, duration: 1 },   // E4 eighth
    { note: 65, duration: 1 },   // F4 eighth
    { note: 64, duration: 2 },   // E4 quarter
  ],

  // Pattern 3: eighth rest, E4 eighth, F4 eighth, E4 eighth
  [
    { note: 0, duration: 1 },    // rest
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 64, duration: 1 },   // E4
  ],

  // Pattern 4: eighth rest, E4 eighth, F4 eighth, G4 eighth
  [
    { note: 0, duration: 1 },    // rest
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1 },   // G4
  ],

  // Pattern 5: E4 eighth, F4 eighth, G4 eighth, eighth rest
  [
    { note: 64, duration: 1 },   // E4
    { note: 65, duration: 1 },   // F4
    { note: 67, duration: 1 },   // G4
    { note: 0, duration: 1 },    // rest
  ],

  // Pattern 6: C5 very long (whole tied to whole = 16 eighth notes)
  [
    { note: 72, duration: 16 },  // C5 (whole + whole tied)
  ],

  // Pattern 7: rests, then short C4 figures, then rests
  [
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 1 },    // rest (eighth)
    { note: 60, duration: 0.5 }, // C4 sixteenth
    { note: 60, duration: 0.5 }, // C4 sixteenth
    { note: 60, duration: 1 },   // C4 eighth
    { note: 0, duration: 1 },    // rest (eighth)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
  ],

  // Pattern 8: G4 dotted whole, F4 whole tied to F4 whole
  [
    { note: 67, duration: 12 },  // G4 dotted whole
    { note: 65, duration: 8 },   // F4 whole (tied)
    { note: 65, duration: 8 },   // F4 whole
  ],

  // Pattern 9: B4 sixteenth, G4 sixteenth, then long rest
  [
    { note: 71, duration: 0.5 }, // B4 sixteenth
    { note: 67, duration: 0.5 }, // G4 sixteenth
    { note: 0, duration: 1 },    // rest
    { note: 0, duration: 2 },    // rest
    { note: 0, duration: 2 },    // rest
    { note: 0, duration: 2 },    // rest
  ],

  // Pattern 10: B4 sixteenth, G4 sixteenth
  [
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 11: F4 G4 B4 G4 B4 G4 (all sixteenths)
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 12: F4 eighth, G4 eighth, B4 whole, C5 quarter
  [
    { note: 65, duration: 1 },   // F4 eighth
    { note: 67, duration: 1 },   // G4 eighth
    { note: 71, duration: 8 },   // B4 whole
    { note: 72, duration: 2 },   // C5 quarter
  ],

  // Pattern 13: B4 sixteenth, G4 dotted-eighth, G4 sixteenth, F4 sixteenth,
  //             G4 eighth, rest dotted-eighth, G4 sixteenth, G4 dotted-half
  [
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 1.5 }, // G4 dotted eighth
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 1 },   // G4
    { note: 0, duration: 1.5 },  // rest
    { note: 67, duration: 0.5 }, // G4
    { note: 67, duration: 6 },   // G4 dotted half
  ],

  // Pattern 14: C5 whole, B4 whole, G4 whole, F#4 whole
  [
    { note: 72, duration: 8 },   // C5 whole
    { note: 71, duration: 8 },   // B4 whole
    { note: 67, duration: 8 },   // G4 whole
    { note: 66, duration: 8 },   // F#4 whole
  ],

  // Pattern 15: G4 sixteenth, then long rest
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 0, duration: 1.5 },  // rest
    { note: 0, duration: 2 },    // rest
    { note: 0, duration: 2 },    // rest
    { note: 0, duration: 2 },    // rest
  ],

  // Pattern 16: G4 B4 C5 B4 (sixteenths)
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 72, duration: 0.5 }, // C5
    { note: 71, duration: 0.5 }, // B4
  ],

  // Pattern 17: B4 C5 B4 C5 B4 rest (sixteenths)
  [
    { note: 71, duration: 0.5 }, // B4
    { note: 72, duration: 0.5 }, // C5
    { note: 71, duration: 0.5 }, // B4
    { note: 72, duration: 0.5 }, // C5
    { note: 71, duration: 0.5 }, // B4
    { note: 0, duration: 0.5 },  // rest
  ],

  // Pattern 18: E4 F#4 E4 F#4 (sixteenths), E4 dotted-eighth, E4 sixteenth
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 0.5 }, // E4 sixteenth
  ],

  // Pattern 19: dotted-quarter rest, G5 dotted-quarter
  [
    { note: 0, duration: 3 },    // rest (dotted quarter)
    { note: 79, duration: 3 },   // G5 dotted quarter
  ],

  // Pattern 20: E4 F#4 E4 F#4 (sixteenths), G3 dotted-eighth, E4 sixteenth,
  //             F#4 E4 F#4 E4 (sixteenths)
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 55, duration: 1.5 }, // G3 dotted eighth
    { note: 64, duration: 0.5 }, // E4 sixteenth
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
  ],

  // Pattern 21: F#4 dotted half
  [
    { note: 66, duration: 6 },   // F#4 dotted half
  ],

  // Pattern 22: E4 dotted-quarter x5, F#4 dotted-quarter, G4 dotted-quarter,
  //             A4 dotted-quarter, B4 eighth
  // (ascending scale pattern — each note gets 3 eighth-note beats except final)
  [
    { note: 64, duration: 3 },   // E4 dotted quarter
    { note: 64, duration: 3 },   // E4 dotted quarter
    { note: 64, duration: 3 },   // E4 dotted quarter
    { note: 64, duration: 3 },   // E4 dotted quarter
    { note: 64, duration: 3 },   // E4 dotted quarter
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 71, duration: 1 },   // B4 eighth
  ],

  // Pattern 23: E4 eighth, F#4 dotted-quarter x5, G4 dotted-quarter,
  //             A4 dotted-quarter, B4 quarter
  [
    { note: 64, duration: 1 },   // E4 eighth
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 71, duration: 2 },   // B4 quarter
  ],

  // Pattern 24: E4 eighth, F#4 eighth, G4 dotted-quarter x5,
  //             A4 dotted-quarter, B4 eighth
  [
    { note: 64, duration: 1 },   // E4 eighth
    { note: 66, duration: 1 },   // F#4 eighth
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 67, duration: 3 },   // G4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 71, duration: 1 },   // B4 eighth
  ],

  // Pattern 25: E4 eighth, F#4 eighth, G4 eighth, A4 dotted-quarter x5,
  //             B4 dotted-quarter
  [
    { note: 64, duration: 1 },   // E4 eighth
    { note: 66, duration: 1 },   // F#4 eighth
    { note: 67, duration: 1 },   // G4 eighth
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 71, duration: 3 },   // B4 dotted quarter
  ],

  // Pattern 26: E4 eighth, F#4 eighth, G4 eighth, A4 eighth,
  //             B4 dotted-quarter x5
  [
    { note: 64, duration: 1 },   // E4 eighth
    { note: 66, duration: 1 },   // F#4 eighth
    { note: 67, duration: 1 },   // G4 eighth
    { note: 69, duration: 1 },   // A4 eighth
    { note: 71, duration: 3 },   // B4 dotted quarter
    { note: 71, duration: 3 },   // B4 dotted quarter
    { note: 71, duration: 3 },   // B4 dotted quarter
    { note: 71, duration: 3 },   // B4 dotted quarter
    { note: 71, duration: 3 },   // B4 dotted quarter
  ],

  // Pattern 27: E4 F#4 E4 F#4 (sixteenths), G4 eighth, E4 sixteenth,
  //             G4 sixteenth, F#4 sixteenth, E4 sixteenth, F#4 sixteenth, E4 sixteenth
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 67, duration: 1 },   // G4 eighth
    { note: 64, duration: 0.5 }, // E4
    { note: 67, duration: 0.5 }, // G4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
  ],

  // Pattern 28: E4 F#4 E4 F#4 (sixteenths), E4 dotted-eighth, E4 sixteenth
  [
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 0.5 }, // E4
    { note: 66, duration: 0.5 }, // F#4
    { note: 64, duration: 1.5 }, // E4 dotted eighth
    { note: 64, duration: 0.5 }, // E4 sixteenth
  ],

  // Pattern 29: E4 dotted-half, G4 dotted-half, C5 dotted-half
  [
    { note: 64, duration: 6 },   // E4 dotted half
    { note: 67, duration: 6 },   // G4 dotted half
    { note: 72, duration: 6 },   // C5 dotted half
  ],

  // Pattern 30: C5 dotted whole (very long)
  [
    { note: 72, duration: 12 },  // C5 dotted whole
  ],

  // Pattern 31: G4 F4 G4 B4 G4 B4 (sixteenths)
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
  ],

  // Pattern 32: F4 G4 F4 G4 B4 (sixteenths), F4 sixteenth then held,
  //             F4 dotted-half, G4 dotted-quarter
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 65, duration: 0.5 }, // F4
    { note: 65, duration: 6 },   // F4 dotted half
    { note: 67, duration: 3 },   // G4 dotted quarter
  ],

  // Pattern 33: G4 sixteenth, F4 sixteenth, eighth rest
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 0, duration: 1 },    // rest
  ],

  // Pattern 34: G4 sixteenth, F4 sixteenth
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
  ],

  // Pattern 35: The longest pattern in the piece
  // F4 G4 B4 G4 B4 G4 B4 G4 B4 G4 (sixteenths), rests,
  // Bb4, G5 dotted-half, A5 eighth, G5 eighth, G5 eighth, B5 eighth,
  // A5 dotted-quarter, G5 eighth, E5 dotted-half, G5 eighth,
  // F#5 eighth, F#5 dotted-half, rests, E5 eighth, E5 half, F5 dotted-whole
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 0, duration: 1 },    // rest (eighth)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 0, duration: 2 },    // rest (quarter)
    { note: 70, duration: 2 },   // Bb4 quarter
    { note: 79, duration: 6 },   // G5 dotted half
    { note: 81, duration: 1 },   // A5 eighth
    { note: 79, duration: 1 },   // G5 eighth
    { note: 79, duration: 1 },   // G5 eighth
    { note: 83, duration: 1 },   // B5 eighth
    { note: 81, duration: 3 },   // A5 dotted quarter
    { note: 79, duration: 1 },   // G5 eighth
    { note: 76, duration: 6 },   // E5 dotted half
    { note: 79, duration: 1 },   // G5 eighth
    { note: 78, duration: 1 },   // F#5 eighth
    { note: 78, duration: 6 },   // F#5 dotted half
    { note: 0, duration: 2 },    // rest
    { note: 0, duration: 2 },    // rest
    { note: 0, duration: 1 },    // rest
    { note: 76, duration: 1 },   // E5 eighth
    { note: 76, duration: 4 },   // E5 half
    { note: 77, duration: 12 },  // F5 dotted whole
  ],

  // Pattern 36: F4 G4 B4 G4 B4 G4 (sixteenths)
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 37: F4 sixteenth, G4 sixteenth
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 38: F4 G4 B4 F4 G4 B4 (sixteenths)
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
  ],

  // Pattern 39: B4 G4 F4 G4 B4 C5 (sixteenths)
  [
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 71, duration: 0.5 }, // B4
    { note: 72, duration: 0.5 }, // C5
  ],

  // Pattern 40: B4 sixteenth, F4 sixteenth
  [
    { note: 71, duration: 0.5 }, // B4
    { note: 65, duration: 0.5 }, // F4
  ],

  // Pattern 41: B4 sixteenth, G4 sixteenth
  [
    { note: 71, duration: 0.5 }, // B4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 42: C5 whole, B4 whole, A4 whole, C5 whole
  [
    { note: 72, duration: 8 },   // C5 whole
    { note: 71, duration: 8 },   // B4 whole
    { note: 69, duration: 8 },   // A4 whole
    { note: 72, duration: 8 },   // C5 whole
  ],

  // Pattern 43: F5 E5 F5 E5 (sixteenths), E5 eighth, E5 eighth, E5 eighth,
  //             F5 sixteenth, E5 sixteenth
  [
    { note: 77, duration: 0.5 }, // F5
    { note: 76, duration: 0.5 }, // E5
    { note: 77, duration: 0.5 }, // F5
    { note: 76, duration: 0.5 }, // E5
    { note: 76, duration: 1 },   // E5 eighth
    { note: 76, duration: 1 },   // E5 eighth
    { note: 76, duration: 1 },   // E5 eighth
    { note: 77, duration: 0.5 }, // F5
    { note: 76, duration: 0.5 }, // E5
  ],

  // Pattern 44: F5 eighth, E5 eighth, E5 eighth, E5 eighth, C5 quarter
  [
    { note: 77, duration: 1 },   // F5 eighth
    { note: 76, duration: 1 },   // E5 eighth
    { note: 76, duration: 1 },   // E5 eighth
    { note: 76, duration: 1 },   // E5 eighth
    { note: 72, duration: 2 },   // C5 quarter
  ],

  // Pattern 45: D5 quarter, D5 quarter, G4 quarter
  [
    { note: 74, duration: 2 },   // D5 quarter
    { note: 74, duration: 2 },   // D5 quarter
    { note: 67, duration: 2 },   // G4 quarter
  ],

  // Pattern 46: G4 D5 E5 D5 (sixteenths), rest eighth, G4 eighth, rest eighth,
  //             G4 eighth, rest eighth, G4 eighth, G4 D5 E5 D5 (sixteenths)
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 74, duration: 0.5 }, // D5
    { note: 76, duration: 0.5 }, // E5
    { note: 74, duration: 0.5 }, // D5
    { note: 0, duration: 1 },    // rest
    { note: 67, duration: 1 },   // G4
    { note: 0, duration: 1 },    // rest
    { note: 67, duration: 1 },   // G4
    { note: 0, duration: 1 },    // rest
    { note: 67, duration: 1 },   // G4
    { note: 67, duration: 0.5 }, // G4
    { note: 74, duration: 0.5 }, // D5
    { note: 76, duration: 0.5 }, // E5
    { note: 74, duration: 0.5 }, // D5
  ],

  // Pattern 47: D5 sixteenth, E5 sixteenth, D5 eighth
  [
    { note: 74, duration: 0.5 }, // D5
    { note: 76, duration: 0.5 }, // E5
    { note: 74, duration: 1 },   // D5 eighth
  ],

  // Pattern 48: G4 dotted-whole, G4 whole, F4 whole, F4 quarter
  [
    { note: 67, duration: 12 },  // G4 dotted whole
    { note: 67, duration: 8 },   // G4 whole
    { note: 65, duration: 8 },   // F4 whole
    { note: 65, duration: 2 },   // F4 quarter
  ],

  // Pattern 49: F4 G4 Bb4 G4 Bb4 G4 (sixteenths)
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 70, duration: 0.5 }, // Bb4
    { note: 67, duration: 0.5 }, // G4
    { note: 70, duration: 0.5 }, // Bb4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 50: F4 sixteenth, G4 sixteenth
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
  ],

  // Pattern 51: F4 G4 Bb4 F4 G4 Bb4 (sixteenths)
  [
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 70, duration: 0.5 }, // Bb4
    { note: 65, duration: 0.5 }, // F4
    { note: 67, duration: 0.5 }, // G4
    { note: 70, duration: 0.5 }, // Bb4
  ],

  // Pattern 52: G4 sixteenth, Bb4 sixteenth
  [
    { note: 67, duration: 0.5 }, // G4
    { note: 70, duration: 0.5 }, // Bb4
  ],

  // Pattern 53: Bb4 sixteenth, G4 sixteenth (final pattern)
  [
    { note: 70, duration: 0.5 }, // Bb4
    { note: 67, duration: 0.5 }, // G4
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
