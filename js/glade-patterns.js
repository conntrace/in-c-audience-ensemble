// The Glade — 45 Patterns
//
// An original composition for the Audience Ensemble engine.
// Key of D major, 100 BPM, ~45 patterns.
//
// Arc: Dark Forest → Light Breaking Through → Forest Fully Lit → The Glade → Fade
//
// Each pattern is an array of note events: { note, duration }
// - note: MIDI note number (0 = rest)
// - duration: in eighth-note units (1 = eighth, 2 = quarter, 4 = half, 8 = whole)
//
// D major note mapping:
//   D2=38, E2=40, F#2=42, G2=43, A2=45, B2=47
//   D3=50, E3=52, F#3=54, G3=55, A3=57, B3=59
//   D4=62, E4=64, F#4=66, G4=67, A4=69, B4=71
//   D5=74, E5=76, F#5=78, G5=79, A5=81

export const GLADE_PATTERNS = [

  // ===== Pattern 0: Silence =====
  [
    { note: 0, duration: 8 },   // whole rest — stillness before the forest
  ],

  // =========================================================================
  // SECTION 1: DARK FOREST (Patterns 1-12)
  // Low register, sparse, slow. Deep shadows. Drones and single tones.
  // =========================================================================

  // Pattern 1: D3 whole note — a low hum from the forest floor
  [
    { note: 50, duration: 8 },
  ],

  // Pattern 2: D3, A2 — open fifth oscillation, the fundamental drone
  [
    { note: 50, duration: 4 },   // D3 half
    { note: 45, duration: 4 },   // A2 half
  ],

  // Pattern 3: A2 dotted half, D3 quarter — asymmetric pull
  [
    { note: 45, duration: 6 },   // A2 dotted half
    { note: 50, duration: 2 },   // D3 quarter
  ],

  // Pattern 4: D3-E3 alternating quarters — something stirs
  [
    { note: 50, duration: 2 },   // D3
    { note: 52, duration: 2 },   // E3
    { note: 50, duration: 2 },   // D3
    { note: 52, duration: 2 },   // E3
  ],

  // Pattern 5: G2-A2-D3 ascending — rising from the depths
  [
    { note: 43, duration: 4 },   // G2 half
    { note: 45, duration: 4 },   // A2 half
    { note: 50, duration: 4 },   // D3 half
  ],

  // Pattern 6: D3-F#3 half notes — first hint of major warmth
  [
    { note: 50, duration: 4 },   // D3 half
    { note: 54, duration: 4 },   // F#3 half
  ],

  // Pattern 7: A2 whole note — deep anchor
  [
    { note: 45, duration: 8 },   // A2 whole
  ],

  // Pattern 8: D3-E3-F#3-E3 quarters — gentle stepwise neighbor tone
  [
    { note: 50, duration: 2 },   // D3
    { note: 52, duration: 2 },   // E3
    { note: 54, duration: 2 },   // F#3
    { note: 52, duration: 2 },   // E3
  ],

  // Pattern 9: F#3-A3 half notes — third rising to fifth
  [
    { note: 54, duration: 4 },   // F#3 half
    { note: 57, duration: 4 },   // A3 half
  ],

  // Pattern 10: D3-A3-G3-F#3 quarters — leap up, stepwise descent
  [
    { note: 50, duration: 2 },   // D3
    { note: 57, duration: 2 },   // A3
    { note: 55, duration: 2 },   // G3
    { note: 54, duration: 2 },   // F#3
  ],

  // Pattern 11: A3 dotted half, rest quarter — held tone with space to breathe
  [
    { note: 57, duration: 6 },   // A3 dotted half
    { note: 0, duration: 2 },    // rest quarter
  ],

  // Pattern 12: G3-A3-B3-A3 quarters — upper neighbor ornament, transition
  [
    { note: 55, duration: 2 },   // G3
    { note: 57, duration: 2 },   // A3
    { note: 59, duration: 2 },   // B3
    { note: 57, duration: 2 },   // A3
  ],

  // =========================================================================
  // SECTION 2: LIGHT BREAKING THROUGH (Patterns 13-24)
  // Middle register enters. Small melodies like beams of light.
  // =========================================================================

  // Pattern 13: D4-A3 alternating eighths — light flickering
  [
    { note: 62, duration: 1 },   // D4
    { note: 57, duration: 1 },   // A3
    { note: 62, duration: 1 },   // D4
    { note: 57, duration: 1 },   // A3
  ],

  // Pattern 14: A3-B3-D4 — ascending to first mid-register arrival
  [
    { note: 57, duration: 2 },   // A3 quarter
    { note: 59, duration: 2 },   // B3 quarter
    { note: 62, duration: 4 },   // D4 half
  ],

  // Pattern 15: F#3-A3-D4-F#4 ascending quarters — D major arpeggio, a clear beam
  [
    { note: 54, duration: 2 },   // F#3
    { note: 57, duration: 2 },   // A3
    { note: 62, duration: 2 },   // D4
    { note: 66, duration: 2 },   // F#4
  ],

  // Pattern 16: E4 dotted quarter, D4 eighth, B3 half — gentle settling descent
  [
    { note: 64, duration: 3 },   // E4 dotted quarter
    { note: 62, duration: 1 },   // D4 eighth
    { note: 59, duration: 4 },   // B3 half
  ],

  // Pattern 17: D4-E4-F#4-E4-D4 arch — quick ornamental figure
  [
    { note: 62, duration: 2 },   // D4 quarter
    { note: 64, duration: 1 },   // E4 eighth
    { note: 66, duration: 2 },   // F#4 quarter
    { note: 64, duration: 1 },   // E4 eighth
    { note: 62, duration: 2 },   // D4 quarter
  ],

  // Pattern 18: A3-D4-F#4 — arpeggio with held top note
  [
    { note: 57, duration: 2 },   // A3 quarter
    { note: 62, duration: 2 },   // D4 quarter
    { note: 66, duration: 4 },   // F#4 half (light resting at height)
  ],

  // Pattern 19: G3-A3-B3-D4-E4 ascending scale — opening up
  [
    { note: 55, duration: 2 },   // G3
    { note: 57, duration: 2 },   // A3
    { note: 59, duration: 2 },   // B3
    { note: 62, duration: 2 },   // D4
    { note: 64, duration: 2 },   // E4
  ],

  // Pattern 20: F#4-E4-D4 quarters + rest — light filtering down
  [
    { note: 66, duration: 2 },   // F#4
    { note: 64, duration: 2 },   // E4
    { note: 62, duration: 2 },   // D4
    { note: 0, duration: 2 },    // rest
  ],

  // Pattern 21: B3-D4-F#4-A4 ascending quarters — reaching high, first A4
  [
    { note: 59, duration: 2 },   // B3
    { note: 62, duration: 2 },   // D4
    { note: 66, duration: 2 },   // F#4
    { note: 69, duration: 2 },   // A4
  ],

  // Pattern 22: D4-E4-F#4-G4-A4 scale run to held A4
  [
    { note: 62, duration: 1 },   // D4 eighth
    { note: 64, duration: 1 },   // E4 eighth
    { note: 66, duration: 1 },   // F#4 eighth
    { note: 67, duration: 1 },   // G4 eighth
    { note: 69, duration: 4 },   // A4 half (held)
  ],

  // Pattern 23: A4-F#4-D4 cascading dotted rhythm
  [
    { note: 69, duration: 3 },   // A4 dotted quarter
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 62, duration: 2 },   // D4 quarter
  ],

  // Pattern 24: G4-A4-B4-A4 quarters — ornament around A4, first B4
  [
    { note: 67, duration: 2 },   // G4
    { note: 69, duration: 2 },   // A4
    { note: 71, duration: 2 },   // B4
    { note: 69, duration: 2 },   // A4
  ],

  // =========================================================================
  // SECTION 3: FOREST FULLY LIT (Patterns 25-36)
  // The peak. Fullest melodies, highest register, most movement. Luminous.
  // =========================================================================

  // Pattern 25: D5-B4-A4-F#4 descending quarters — cascading from heights
  [
    { note: 74, duration: 2 },   // D5
    { note: 71, duration: 2 },   // B4
    { note: 69, duration: 2 },   // A4
    { note: 66, duration: 2 },   // F#4
  ],

  // Pattern 26: A4-B4-D5-E5 ascending — reaching the highest point
  [
    { note: 69, duration: 2 },   // A4
    { note: 71, duration: 2 },   // B4
    { note: 74, duration: 2 },   // D5
    { note: 76, duration: 2 },   // E5
  ],

  // Pattern 27: F#4-G4-A4-B4-A4-G4-F#4 flowing arch
  [
    { note: 66, duration: 1 },   // F#4
    { note: 67, duration: 1 },   // G4
    { note: 69, duration: 1 },   // A4
    { note: 71, duration: 1 },   // B4
    { note: 69, duration: 1 },   // A4
    { note: 67, duration: 1 },   // G4
    { note: 66, duration: 2 },   // F#4 quarter
  ],

  // Pattern 28: D5-B4-A4-G4-F#4-E4-D4 long descending scale — light pouring down
  [
    { note: 74, duration: 1 },   // D5
    { note: 71, duration: 1 },   // B4
    { note: 69, duration: 1 },   // A4
    { note: 67, duration: 1 },   // G4
    { note: 66, duration: 1 },   // F#4
    { note: 64, duration: 1 },   // E4
    { note: 62, duration: 2 },   // D4 quarter
  ],

  // Pattern 29: E4-F#4-A4-D5 leaping upward
  [
    { note: 64, duration: 2 },   // E4
    { note: 66, duration: 2 },   // F#4
    { note: 69, duration: 2 },   // A4
    { note: 74, duration: 2 },   // D5
  ],

  // Pattern 30: B4-A4-G4-F#4 repeated descending eighths — shimmering
  [
    { note: 71, duration: 1 },   // B4
    { note: 69, duration: 1 },   // A4
    { note: 67, duration: 1 },   // G4
    { note: 66, duration: 1 },   // F#4
    { note: 71, duration: 1 },   // B4
    { note: 69, duration: 1 },   // A4
    { note: 67, duration: 1 },   // G4
    { note: 66, duration: 1 },   // F#4
  ],

  // Pattern 31: D5-A4-D5-E5-D5 ornamented high D
  [
    { note: 74, duration: 2 },   // D5 quarter
    { note: 69, duration: 1 },   // A4 eighth
    { note: 74, duration: 2 },   // D5 quarter
    { note: 76, duration: 1 },   // E5 eighth
    { note: 74, duration: 2 },   // D5 quarter
  ],

  // Pattern 32: G4-A4-B4-D5-B4-A4 flowing melody
  [
    { note: 67, duration: 1 },   // G4
    { note: 69, duration: 1 },   // A4
    { note: 71, duration: 1 },   // B4
    { note: 74, duration: 1 },   // D5
    { note: 71, duration: 1 },   // B4
    { note: 69, duration: 1 },   // A4
  ],

  // Pattern 33: A4-B4-A4-F#4-E4-F#4 gentle undulation
  [
    { note: 69, duration: 1 },   // A4
    { note: 71, duration: 1 },   // B4
    { note: 69, duration: 1 },   // A4
    { note: 66, duration: 1 },   // F#4
    { note: 64, duration: 1 },   // E4
    { note: 66, duration: 1 },   // F#4
  ],

  // Pattern 34: F#5-E5-D5 — highest point, brief touch and descent
  [
    { note: 78, duration: 2 },   // F#5 quarter
    { note: 76, duration: 2 },   // E5 quarter
    { note: 74, duration: 4 },   // D5 half
  ],

  // Pattern 35: D5-B4-G4-D4 full arpeggio cascade down
  [
    { note: 74, duration: 2 },   // D5
    { note: 71, duration: 2 },   // B4
    { note: 67, duration: 2 },   // G4
    { note: 62, duration: 2 },   // D4
  ],

  // Pattern 36: A4-G4-F#4-E4-D4 scale down to held D4 — settling
  [
    { note: 69, duration: 1 },   // A4
    { note: 67, duration: 1 },   // G4
    { note: 66, duration: 1 },   // F#4
    { note: 64, duration: 1 },   // E4
    { note: 62, duration: 4 },   // D4 half (held)
  ],

  // =========================================================================
  // SECTION 4: THE GLADE (Patterns 37-45)
  // Everything calms. Patterns simplify. Register descends.
  // Converges to a single D that fades.
  // =========================================================================

  // Pattern 37: D4 half, A4 quarter, D4 quarter — open, spacious
  [
    { note: 62, duration: 4 },   // D4 half
    { note: 69, duration: 2 },   // A4 quarter
    { note: 62, duration: 2 },   // D4 quarter
  ],

  // Pattern 38: F#4-E4-D4 gentle descent
  [
    { note: 66, duration: 3 },   // F#4 dotted quarter
    { note: 64, duration: 1 },   // E4 eighth
    { note: 62, duration: 4 },   // D4 half
  ],

  // Pattern 39: A3-D4 two half notes — just two notes, wide calm interval
  [
    { note: 57, duration: 4 },   // A3 half
    { note: 62, duration: 4 },   // D4 half
  ],

  // Pattern 40: D4-E4-D4 — tiny neighbor ornament, settling on D
  [
    { note: 62, duration: 2 },   // D4 quarter
    { note: 64, duration: 2 },   // E4 quarter
    { note: 62, duration: 4 },   // D4 half
  ],

  // Pattern 41: A3-D4-A3 — rocking fifth, gentle breathing
  [
    { note: 57, duration: 2 },   // A3 quarter
    { note: 62, duration: 4 },   // D4 half
    { note: 57, duration: 2 },   // A3 quarter
  ],

  // Pattern 42: D4 whole note — simplifying to a single tone
  [
    { note: 62, duration: 8 },   // D4 whole
  ],

  // Pattern 43: D3-D4 octave — thinning to the fundamental
  [
    { note: 50, duration: 4 },   // D3 half
    { note: 62, duration: 4 },   // D4 half
  ],

  // Pattern 44: D3 whole note — single low D
  [
    { note: 50, duration: 8 },   // D3 whole
  ],

  // Pattern 45: D3 double whole — the final convergence tone, long fade
  [
    { note: 50, duration: 16 },  // D3 double whole
  ],
];
