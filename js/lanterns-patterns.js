// Lanterns — 42 Patterns
//
// An original composition for the Audience Ensemble engine.
// Mode: A Dorian (A B C D E F# G), 108 BPM, 42 patterns.
//
// Arc: Signal -> Drift -> Lift -> Blaze -> Afterglow
//
// Design goals:
// - A limited modal pitch world so adjacent patterns overlap gracefully
// - Short and long loop lengths for phasing
// - A clear signature gesture, like In C's grace-note hook
// - A gradual registral rise and a spacious landing
//
// Each pattern is an array of note events: { note, duration }
// - note: MIDI note number (0 = rest)
// - duration: in eighth-note units (1 = eighth, 2 = quarter, 4 = half, 8 = whole)
//   Grace notes have duration 0.
//
// MIDI note mapping:
//   A2=45, B2=47, C3=48, D3=50, E3=52, F#3=54, G3=55
//   A3=57, B3=59, C4=60, D4=62, E4=64, F#4=66, G4=67
//   A4=69, B4=71, C5=72, D5=74, E5=76

export const LANTERNS_PATTERNS = [

  // ===== Pattern 0: Silence =====
  [
    { note: 0, duration: 8 },
  ],

  // =========================================================================
  // SECTION 1: SIGNAL (Patterns 1-8)
  // The piece begins with a call: grace-note A into a bright E.
  // Open fifths, short sparks, and a low drone establish the modal field.
  // =========================================================================

  // Pattern 1: signature call
  [
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
  ],

  // Pattern 2: signature with dorian lift
  [
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
    { note: 66, duration: 2 },
    { note: 64, duration: 2 },
  ],

  // Pattern 3: first stepwise motion
  [
    { note: 0, duration: 1 },
    { note: 64, duration: 1 },
    { note: 66, duration: 1 },
    { note: 67, duration: 1 },
  ],

  // Pattern 4: five-eighth crest
  [
    { note: 64, duration: 1 },
    { note: 66, duration: 1 },
    { note: 69, duration: 1 },
    { note: 67, duration: 1 },
    { note: 64, duration: 1 },
  ],

  // Pattern 5: low open drone
  [
    { note: 45, duration: 8 },
    { note: 52, duration: 8 },
  ],

  // Pattern 6: tiny spark
  [
    { note: 60, duration: 0.5 },
    { note: 62, duration: 0.5 },
  ],

  // Pattern 7: dorian turn
  [
    { note: 62, duration: 1.5 },
    { note: 64, duration: 0.5 },
    { note: 66, duration: 2 },
    { note: 64, duration: 1 },
    { note: 62, duration: 2 },
  ],

  // Pattern 8: open-triad bridge
  [
    { note: 57, duration: 2 },
    { note: 60, duration: 2 },
    { note: 64, duration: 2 },
    { note: 69, duration: 2 },
  ],

  // =========================================================================
  // SECTION 2: DRIFT (Patterns 9-16)
  // Mid-register motion arrives. The melody starts to breathe and lean
  // forward, but the harmony stays anchored to the same mode.
  // =========================================================================

  // Pattern 9: sideward drift
  [
    { note: 55, duration: 4 },
    { note: 57, duration: 2 },
    { note: 60, duration: 2 },
  ],

  // Pattern 10: late-entry melody
  [
    { note: 0, duration: 1 },
    { note: 64, duration: 2 },
    { note: 62, duration: 1 },
    { note: 60, duration: 2 },
    { note: 57, duration: 2 },
  ],

  // Pattern 11: bright flicker
  [
    { note: 66, duration: 0.5 },
    { note: 67, duration: 0.5 },
    { note: 66, duration: 0.5 },
    { note: 64, duration: 0.5 },
  ],

  // Pattern 12: rising answer
  [
    { note: 60, duration: 1 },
    { note: 62, duration: 1 },
    { note: 64, duration: 2 },
    { note: 62, duration: 2 },
  ],

  // Pattern 13: pedal with a lift at the end
  [
    { note: 57, duration: 8 },
    { note: 59, duration: 1 },
    { note: 60, duration: 1 },
  ],

  // Pattern 14: tall call
  [
    { note: 0, duration: 1 },
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
    { note: 69, duration: 2 },
    { note: 67, duration: 2 },
  ],

  // Pattern 15: stacked thirds
  [
    { note: 62, duration: 3 },
    { note: 66, duration: 3 },
    { note: 64, duration: 2 },
  ],

  // Pattern 16: first real climb
  [
    { note: 64, duration: 1 },
    { note: 66, duration: 1 },
    { note: 67, duration: 1 },
    { note: 69, duration: 1 },
    { note: 71, duration: 4 },
  ],

  // =========================================================================
  // SECTION 3: LIFT (Patterns 17-26)
  // The material rises in range and momentum. Short bursts alternate with
  // broader, more melodic cells so the audience can shape the ascent.
  // =========================================================================

  // Pattern 17: falling spark
  [
    { note: 69, duration: 0.5 },
    { note: 67, duration: 0.5 },
    { note: 64, duration: 1 },
    { note: 62, duration: 2 },
    { note: 60, duration: 2 },
    { note: 62, duration: 2 },
  ],

  // Pattern 18: arching arpeggio
  [
    { note: 57, duration: 2 },
    { note: 64, duration: 2 },
    { note: 66, duration: 2 },
    { note: 69, duration: 2 },
    { note: 71, duration: 2 },
  ],

  // Pattern 19: burst from rest
  [
    { note: 0, duration: 2 },
    { note: 0, duration: 1 },
    { note: 69, duration: 0.5 },
    { note: 71, duration: 0.5 },
    { note: 72, duration: 1 },
    { note: 71, duration: 1 },
    { note: 69, duration: 2 },
  ],

  // Pattern 20: wide dorian melody
  [
    { note: 60, duration: 1 },
    { note: 64, duration: 1 },
    { note: 69, duration: 3 },
    { note: 67, duration: 1 },
    { note: 64, duration: 2 },
  ],

  // Pattern 21: ladder to the ridge
  [
    { note: 62, duration: 2 },
    { note: 64, duration: 2 },
    { note: 66, duration: 2 },
    { note: 67, duration: 2 },
    { note: 69, duration: 4 },
  ],

  // Pattern 22: quick hook
  [
    { note: 59, duration: 1 },
    { note: 60, duration: 1 },
    { note: 62, duration: 1 },
    { note: 60, duration: 1 },
    { note: 57, duration: 1 },
  ],

  // Pattern 23: bright refrain
  [
    { note: 69, duration: 2 },
    { note: 66, duration: 1 },
    { note: 67, duration: 1 },
    { note: 69, duration: 2 },
    { note: 72, duration: 2 },
    { note: 71, duration: 2 },
  ],

  // Pattern 24: long upper light
  [
    { note: 76, duration: 8 },
  ],

  // Pattern 25: answer from above
  [
    { note: 74, duration: 1 },
    { note: 72, duration: 1 },
    { note: 69, duration: 2 },
    { note: 67, duration: 2 },
    { note: 64, duration: 2 },
  ],

  // Pattern 26: signature in the sky
  [
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
    { note: 69, duration: 2 },
    { note: 72, duration: 2 },
    { note: 71, duration: 2 },
  ],

  // =========================================================================
  // SECTION 4: BLAZE (Patterns 27-34)
  // The piece reaches its brightest and busiest point. Fast loops and
  // registral contrast create the thickest interlocking texture.
  // =========================================================================

  // Pattern 27: running ascent and return
  [
    { note: 69, duration: 1 },
    { note: 71, duration: 1 },
    { note: 72, duration: 1 },
    { note: 74, duration: 1 },
    { note: 76, duration: 1 },
    { note: 74, duration: 1 },
    { note: 72, duration: 1 },
    { note: 71, duration: 1 },
  ],

  // Pattern 28: tiny wheel
  [
    { note: 66, duration: 0.5 },
    { note: 67, duration: 0.5 },
    { note: 69, duration: 0.5 },
    { note: 67, duration: 0.5 },
    { note: 66, duration: 0.5 },
    { note: 64, duration: 0.5 },
    { note: 62, duration: 0.5 },
    { note: 64, duration: 0.5 },
  ],

  // Pattern 29: high beacon
  [
    { note: 69, duration: 2 },
    { note: 76, duration: 2 },
    { note: 74, duration: 2 },
    { note: 72, duration: 2 },
    { note: 69, duration: 2 },
  ],

  // Pattern 30: delayed cascade
  [
    { note: 0, duration: 1 },
    { note: 76, duration: 1 },
    { note: 74, duration: 1 },
    { note: 72, duration: 1 },
    { note: 69, duration: 2 },
    { note: 67, duration: 2 },
  ],

  // Pattern 31: orbiting chord tones
  [
    { note: 72, duration: 4 },
    { note: 71, duration: 4 },
    { note: 69, duration: 8 },
  ],

  // Pattern 32: two-note flare
  [
    { note: 69, duration: 0.5 },
    { note: 76, duration: 0.5 },
  ],

  // Pattern 33: turning wreath
  [
    { note: 66, duration: 2 },
    { note: 69, duration: 2 },
    { note: 71, duration: 2 },
    { note: 69, duration: 2 },
    { note: 67, duration: 2 },
    { note: 64, duration: 2 },
  ],

  // Pattern 34: crest melody
  [
    { note: 74, duration: 3 },
    { note: 72, duration: 1 },
    { note: 71, duration: 2 },
    { note: 69, duration: 2 },
    { note: 67, duration: 2 },
  ],

  // =========================================================================
  // SECTION 5: AFTERGLOW (Patterns 35-42)
  // The motion opens back out. The closing pages keep the same modal center
  // but trade density for resonance and memory.
  // =========================================================================

  // Pattern 35: suspended glow
  [
    { note: 69, duration: 4 },
    { note: 64, duration: 4 },
    { note: 62, duration: 4 },
  ],

  // Pattern 36: soft restart
  [
    { note: 0, duration: 2 },
    { note: 60, duration: 2 },
    { note: 62, duration: 2 },
    { note: 64, duration: 2 },
    { note: 69, duration: 2 },
  ],

  // Pattern 37: stepping down
  [
    { note: 59, duration: 1 },
    { note: 60, duration: 1 },
    { note: 62, duration: 1 },
    { note: 64, duration: 1 },
    { note: 60, duration: 2 },
    { note: 57, duration: 2 },
  ],

  // Pattern 38: ground note
  [
    { note: 45, duration: 16 },
  ],

  // Pattern 39: fading answer
  [
    { note: 67, duration: 2 },
    { note: 64, duration: 2 },
    { note: 62, duration: 2 },
    { note: 60, duration: 2 },
    { note: 57, duration: 4 },
  ],

  // Pattern 40: last flicker
  [
    { note: 60, duration: 0.5 },
    { note: 57, duration: 0.5 },
  ],

  // Pattern 41: closing signal
  [
    { note: 57, duration: 0 },
    { note: 64, duration: 2 },
    { note: 69, duration: 2 },
    { note: 64, duration: 2 },
    { note: 62, duration: 2 },
  ],

  // Pattern 42: final horizon
  [
    { note: 45, duration: 8 },
    { note: 52, duration: 8 },
    { note: 57, duration: 8 },
  ],
];
