// The Glade — 45 Patterns (v2)
//
// An original composition for the Audience Ensemble engine.
// Key of D major, 100 BPM, 45 patterns.
//
// Arc: Dark Forest → Light Breaking Through → Forest Fully Lit → The Glade
//
// Chromatic visitors beyond D major (D E F# G A B C#):
//   C natural (♭7) — Mixolydian darkness, woven throughout sections 1–3
//   C# (leading tone) — shimmer/resolution in sections 2, 4
//   B♭ (♭6) — single dramatic shadow in section 3
//
// Each pattern is an array of note events: { note, duration }
// - note: MIDI note number (0 = rest)
// - duration: in eighth-note units (1 = eighth, 2 = quarter, 4 = half, 8 = whole)
//   Grace notes have duration 0.
//
// MIDI note mapping:
//   D2=38, E2=40, F#2=42, G2=43, A2=45, B2=47
//   C3=48, C#3=49, D3=50, E3=52, F#3=54, G3=55, A3=57, B3=59
//   C4=60, C#4=61, D4=62, E4=64, F#4=66, G4=67, A4=69, Bb4=70, B4=71
//   C5=72, D5=74, E5=76, F#5=78

export const GLADE_PATTERNS = [

  // ===== Pattern 0: Silence =====
  [
    { note: 0, duration: 8 },     // whole rest — stillness before the forest
  ],

  // =========================================================================
  // SECTION 1: DARK FOREST (Patterns 1–12)
  // Low register, sparse, slow. Deep shadows. Drones, single tones, space.
  // C natural (♭7) establishes Mixolydian darkness from the start.
  // Pattern lengths vary wildly (1 to 16 eighth notes) for maximum phasing.
  // =========================================================================

  // Pattern 1: The forest call — grace-note D2 into held A2, twice
  // Signature gesture (like In C's C-E grace note). The percussive attack
  // on the low D gives each loop a rhythmic impulse.
  [
    { note: 38, duration: 0 },    // D2 grace note
    { note: 45, duration: 6 },    // A2 dotted half
    { note: 38, duration: 0 },    // D2 grace note
    { note: 45, duration: 6 },    // A2 dotted half
  ],

  // Pattern 2: Mixolydian drone — D3 whole, C3 whole
  // The C natural immediately darkens the harmony. When this loops against
  // Pattern 1's D-A fifth, the C3 creates tension on every other pass.
  [
    { note: 50, duration: 8 },    // D3 whole
    { note: 48, duration: 8 },    // C3 whole
  ],

  // Pattern 3: Branch snap — G2 sixteenth, then vast silence
  // Mostly rest. When looped, the single note appears at unpredictable
  // moments against other patterns, like sounds emerging from darkness.
  [
    { note: 43, duration: 0.5 },  // G2 sixteenth
    { note: 0, duration: 1.5 },   // rest
    { note: 0, duration: 2 },     // rest
    { note: 0, duration: 2 },     // rest
    { note: 0, duration: 2 },     // rest
  ],

  // Pattern 4: Asymmetric open-fifth drone — syncopated D2-A2
  // The dotted rhythm against Pattern 1's even rhythm creates phasing.
  [
    { note: 38, duration: 3 },    // D2 dotted quarter
    { note: 45, duration: 1 },    // A2 eighth
    { note: 38, duration: 2 },    // D2 quarter
    { note: 45, duration: 4 },    // A2 half
  ],

  // Pattern 5: Chromatic whisper — A2 through C3 to D3
  // Five eighth-note length (prime number) ensures maximum phase variety.
  [
    { note: 45, duration: 1 },    // A2 eighth
    { note: 48, duration: 1 },    // C3 eighth
    { note: 50, duration: 3 },    // D3 dotted quarter
  ],

  // Pattern 6: Deep pedal — A2 double whole
  // Like In C's Pattern 6 (long C5). Provides a bass anchor that every
  // other pattern plays against.
  [
    { note: 45, duration: 16 },   // A2 double whole
  ],

  // Pattern 7: Ornamental figure — dotted rhythm with stepwise motion
  // The irregular grouping (1.5 + 0.5 + 2 + 1 + 2 = 7 eighths) creates
  // a limping, haunting quality. Seven eighths means it never aligns
  // with patterns in 4 or 8.
  [
    { note: 50, duration: 1.5 },  // D3 dotted eighth
    { note: 52, duration: 0.5 },  // E3 sixteenth
    { note: 54, duration: 2 },    // F#3 quarter
    { note: 52, duration: 1 },    // E3 eighth
    { note: 50, duration: 2 },    // D3 quarter
  ],

  // Pattern 8: Dark shimmer — C3-D3 rapid oscillation
  // Extremely short (1 eighth note total). When looped, creates a tremolo
  // that other patterns float over. The C natural hums beneath everything.
  [
    { note: 48, duration: 0.5 },  // C3 sixteenth
    { note: 50, duration: 0.5 },  // D3 sixteenth
  ],

  // Pattern 9: Spacious descent — B3 half, silence, then A3-G3
  // The rest in the middle creates a catch-breath effect.
  [
    { note: 59, duration: 4 },    // B3 half
    { note: 0, duration: 2 },     // rest quarter
    { note: 57, duration: 3 },    // A3 dotted quarter
    { note: 55, duration: 1 },    // G3 eighth
  ],

  // Pattern 10: Bird call — grace-note D3 leaping to expanding intervals
  // Each call reaches higher: third, fifth, sixth. Creates a widening arc.
  [
    { note: 50, duration: 0 },    // D3 grace
    { note: 54, duration: 2 },    // F#3 quarter
    { note: 50, duration: 0 },    // D3 grace
    { note: 57, duration: 2 },    // A3 quarter
    { note: 50, duration: 0 },    // D3 grace
    { note: 59, duration: 2 },    // B3 quarter
  ],

  // Pattern 11: Chromatic rise — C3-D3-E3 with trailing rest
  // The C natural grounds this in darkness even as it rises.
  [
    { note: 48, duration: 1 },    // C3 eighth
    { note: 50, duration: 1 },    // D3 eighth
    { note: 52, duration: 2 },    // E3 quarter
    { note: 0, duration: 2 },     // rest quarter
  ],

  // Pattern 12: Rising arpeggio bridge — first arrival at D4
  // D major arpeggio across two octaves. The gateway out of darkness.
  [
    { note: 50, duration: 2 },    // D3 quarter
    { note: 54, duration: 2 },    // F#3 quarter
    { note: 57, duration: 2 },    // A3 quarter
    { note: 62, duration: 2 },    // D4 quarter
  ],

  // =========================================================================
  // SECTION 2: LIGHT BREAKING THROUGH (Patterns 13–24)
  // Mid-register. Melodies emerge. Short ostinatos, syncopation, hooks.
  // C# (leading tone) appears for shimmer. One epic multi-section pattern.
  // Pattern lengths: 1, 3, 4, 9, 10, 11, 12, 14, 34 eighths.
  // =========================================================================

  // Pattern 13: D4-C#4 shimmer — leading-tone flicker, light through leaves
  // The C#-D half-step oscillation is bright and warm, contrasting
  // section 1's dark C-natural-D oscillation (pattern 8).
  [
    { note: 62, duration: 0.5 },  // D4 sixteenth
    { note: 61, duration: 0.5 },  // C#4 sixteenth
    { note: 62, duration: 0.5 },  // D4 sixteenth
    { note: 0, duration: 0.5 },   // rest sixteenth
    { note: 62, duration: 0.5 },  // D4 sixteenth
    { note: 61, duration: 0.5 },  // C#4 sixteenth
    { note: 62, duration: 1 },    // D4 eighth
  ],

  // Pattern 14: Bouncing fifth — A3-D4 energetic ostinato
  // Three eighth notes long — rapid loop, rhythmic engine.
  [
    { note: 57, duration: 1 },    // A3 eighth
    { note: 62, duration: 1 },    // D4 eighth
    { note: 57, duration: 0.5 },  // A3 sixteenth
    { note: 62, duration: 0.5 },  // D4 sixteenth
  ],

  // Pattern 15: First real melody — lyrical, with internal rest
  // A proper tune: arch shape, breathing room, arrival on F#4.
  [
    { note: 66, duration: 3 },    // F#4 dotted quarter
    { note: 64, duration: 1 },    // E4 eighth
    { note: 62, duration: 2 },    // D4 quarter
    { note: 57, duration: 2 },    // A3 quarter
    { note: 0, duration: 2 },     // rest quarter
    { note: 59, duration: 1 },    // B3 eighth
    { note: 62, duration: 1 },    // D4 eighth
    { note: 66, duration: 2 },    // F#4 quarter
  ],

  // Pattern 16: Tiny flicker — just two sixteenths
  // Like In C patterns 34, 37, 40. When looped: a rapid trill.
  [
    { note: 64, duration: 0.5 },  // E4 sixteenth
    { note: 66, duration: 0.5 },  // F#4 sixteenth
  ],

  // Pattern 17: Syncopated entry — offbeat F#4 melody
  // The rest at the start means this always enters "late," creating
  // rhythmic tension against patterns that start on the beat.
  [
    { note: 0, duration: 1 },     // rest eighth
    { note: 66, duration: 3 },    // F#4 dotted quarter
    { note: 64, duration: 1 },    // E4 eighth
    { note: 62, duration: 4 },    // D4 half
  ],

  // Pattern 18: Ascending run into held A4 — light reaching up
  // Quick scalar motion blooming into a sustained high note.
  [
    { note: 62, duration: 1 },    // D4 eighth
    { note: 64, duration: 1 },    // E4 eighth
    { note: 66, duration: 1 },    // F#4 eighth
    { note: 67, duration: 1 },    // G4 eighth
    { note: 69, duration: 6 },    // A4 dotted half
  ],

  // Pattern 19: Burst from silence — sudden fast figure in a sea of rests
  // Like In C pattern 7. The rests before and after mean overlapping
  // musicians' bursts land at different moments.
  [
    { note: 0, duration: 2 },     // rest quarter
    { note: 0, duration: 2 },     // rest quarter
    { note: 0, duration: 1 },     // rest eighth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 67, duration: 0.5 },  // G4 sixteenth
    { note: 66, duration: 1 },    // F#4 eighth
    { note: 0, duration: 2 },     // rest quarter
    { note: 0, duration: 2 },     // rest quarter
  ],

  // Pattern 20: Lilting arpeggio — dotted rhythm rising
  // The dotted-eighth/sixteenth gives it a lilting, dancing quality.
  [
    { note: 59, duration: 1.5 },  // B3 dotted eighth
    { note: 62, duration: 0.5 },  // D4 sixteenth
    { note: 66, duration: 1.5 },  // F#4 dotted eighth
    { note: 69, duration: 0.5 },  // A4 sixteenth
  ],

  // Pattern 21: The Light Theme — the main melodic hook
  // This should be hummable. A4-F#4-G4-A4 with the dotted rhythm
  // gives it a folk-song quality.
  [
    { note: 69, duration: 2 },    // A4 quarter
    { note: 66, duration: 1 },    // F#4 eighth
    { note: 67, duration: 1 },    // G4 eighth
    { note: 69, duration: 3 },    // A4 dotted quarter
    { note: 71, duration: 1 },    // B4 eighth
    { note: 69, duration: 4 },    // A4 half
  ],

  // Pattern 22: C5-B4 high shimmer — shadow across the light
  // C natural returns at the top of the range, adding momentary darkness
  // to the brightening texture.
  [
    { note: 72, duration: 0.5 },  // C5 sixteenth
    { note: 71, duration: 0.5 },  // B4 sixteenth
    { note: 72, duration: 0.5 },  // C5 sixteenth
    { note: 71, duration: 0.5 },  // B4 sixteenth
    { note: 69, duration: 2 },    // A4 quarter
    { note: 0, duration: 2 },     // rest quarter
  ],

  // Pattern 23: Ornamented ascent — grace notes add sparkle
  // Echo of Pattern 10's bird call, but higher and brighter.
  [
    { note: 66, duration: 0 },    // F#4 grace
    { note: 67, duration: 2 },    // G4 quarter
    { note: 69, duration: 0 },    // A4 grace
    { note: 71, duration: 2 },    // B4 quarter
    { note: 69, duration: 1 },    // A4 eighth
    { note: 67, duration: 1 },    // G4 eighth
  ],

  // Pattern 24: The big journey — multi-section epic
  // Like In C pattern 35. Three phrases: ascending melody, breathing space
  // with low register echo, then high C-natural return and resolution.
  [
    { note: 62, duration: 2 },    // D4 quarter
    { note: 64, duration: 1 },    // E4 eighth
    { note: 66, duration: 1 },    // F#4 eighth
    { note: 69, duration: 3 },    // A4 dotted quarter
    { note: 67, duration: 1 },    // G4 eighth
    { note: 66, duration: 2 },    // F#4 quarter
    { note: 64, duration: 1 },    // E4 eighth
    { note: 62, duration: 1 },    // D4 eighth
    { note: 0, duration: 2 },     // rest quarter
    { note: 57, duration: 2 },    // A3 quarter
    { note: 59, duration: 1 },    // B3 eighth
    { note: 62, duration: 1 },    // D4 eighth
    { note: 66, duration: 6 },    // F#4 dotted half
    { note: 0, duration: 2 },     // rest quarter
    { note: 72, duration: 2 },    // C5 quarter (!)
    { note: 71, duration: 2 },    // B4 quarter
    { note: 69, duration: 4 },    // A4 half
  ],

  // =========================================================================
  // SECTION 3: FOREST FULLY LIT (Patterns 25–36)
  // The peak. Highest register, maximum movement, most complex patterns.
  // The Accumulating Descent (28–31) is a structural device inspired by
  // In C patterns 22–26: each pattern adds one note to a cascading scale.
  // B♭ (♭6) makes a single dramatic appearance.
  // =========================================================================

  // Pattern 25: D5 arrival — long held peak note
  // Like In C pattern 6. A pedal point at the summit for other
  // patterns to play against.
  [
    { note: 74, duration: 12 },   // D5 dotted whole
  ],

  // Pattern 26: Rapid high arpeggiation — shimmering light
  // Fast looping sixteenths. Against Pattern 25's held D5, this
  // creates a halo of broken chord beneath.
  [
    { note: 66, duration: 0.5 },  // F#4 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 74, duration: 0.5 },  // D5 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 66, duration: 0.5 },  // F#4 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 74, duration: 0.5 },  // D5 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
  ],

  // Pattern 27: Wide singing melody — the "Lit Forest" theme
  // Lyrical, with a wide range (G4 to D5). The held G4 at the end
  // creates warmth when overlapping with other patterns.
  [
    { note: 71, duration: 3 },    // B4 dotted quarter
    { note: 69, duration: 1 },    // A4 eighth
    { note: 74, duration: 2 },    // D5 quarter
    { note: 71, duration: 1 },    // B4 eighth
    { note: 69, duration: 1 },    // A4 eighth
    { note: 67, duration: 4 },    // G4 half
  ],

  // -- The Accumulating Descent (Patterns 28–31) --
  // Each adds one more note to a cascading scale from D5 down.
  // When musicians on different patterns overlap, the staggered
  // cascades create a waterfall texture.

  // Pattern 28: D5-B4 — two-note descent
  [
    { note: 74, duration: 3 },    // D5 dotted quarter
    { note: 71, duration: 3 },    // B4 dotted quarter
  ],

  // Pattern 29: D5-B4-A4 — three notes
  [
    { note: 74, duration: 3 },    // D5 dotted quarter
    { note: 71, duration: 3 },    // B4 dotted quarter
    { note: 69, duration: 3 },    // A4 dotted quarter
  ],

  // Pattern 30: D5-B4-A4-G4 — four notes
  [
    { note: 74, duration: 3 },    // D5 dotted quarter
    { note: 71, duration: 3 },    // B4 dotted quarter
    { note: 69, duration: 3 },    // A4 dotted quarter
    { note: 67, duration: 3 },    // G4 dotted quarter
  ],

  // Pattern 31: D5-B4-A4-G4-F#4 — the full cascade
  [
    { note: 74, duration: 3 },    // D5 dotted quarter
    { note: 71, duration: 3 },    // B4 dotted quarter
    { note: 69, duration: 3 },    // A4 dotted quarter
    { note: 67, duration: 3 },    // G4 dotted quarter
    { note: 66, duration: 3 },    // F#4 dotted quarter
  ],

  // Pattern 32: Syncopated dance — offbeat accents at the peak
  [
    { note: 0, duration: 1 },     // rest eighth
    { note: 69, duration: 1 },    // A4 eighth
    { note: 71, duration: 3 },    // B4 dotted quarter
    { note: 0, duration: 1 },     // rest eighth
    { note: 74, duration: 1 },    // D5 eighth
    { note: 71, duration: 2 },    // B4 quarter
  ],

  // Pattern 33: B♭ intrusion — a single dramatic shadow
  // The only appearance of the flattened 6th. A cloud passing across
  // the fully lit forest. Brief and unsettling.
  [
    { note: 69, duration: 2 },    // A4 quarter
    { note: 70, duration: 2 },    // Bb4 quarter
    { note: 69, duration: 2 },    // A4 quarter
    { note: 0, duration: 2 },     // rest quarter
  ],

  // Pattern 34: Grand peak statement — the longest pattern
  // Three sections: dramatic opening with rests, sustained high passage
  // with C natural return, resolution. Like In C's pattern 35.
  [
    { note: 74, duration: 2 },    // D5 quarter
    { note: 0, duration: 1 },     // rest eighth
    { note: 71, duration: 0.5 },  // B4 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 67, duration: 3 },    // G4 dotted quarter
    { note: 66, duration: 1 },    // F#4 eighth
    { note: 69, duration: 4 },    // A4 half
    { note: 0, duration: 2 },     // rest quarter
    { note: 74, duration: 6 },    // D5 dotted half
    { note: 72, duration: 2 },    // C5 quarter (C natural returns)
    { note: 71, duration: 2 },    // B4 quarter
    { note: 69, duration: 4 },    // A4 half
  ],

  // Pattern 35: Quick sparkle — bouncing high arpeggio
  // Short and rapid. Creates glittering texture when looped.
  [
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 74, duration: 0.5 },  // D5 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 66, duration: 0.5 },  // F#4 sixteenth
    { note: 69, duration: 0.5 },  // A4 sixteenth
    { note: 74, duration: 0.5 },  // D5 sixteenth
  ],

  // Pattern 36: Settling scale — descent into transition
  // The held D4 at the end signals the beginning of the end.
  [
    { note: 69, duration: 1 },    // A4 eighth
    { note: 67, duration: 1 },    // G4 eighth
    { note: 66, duration: 1 },    // F#4 eighth
    { note: 64, duration: 1 },    // E4 eighth
    { note: 62, duration: 4 },    // D4 half
  ],

  // =========================================================================
  // SECTION 4: THE GLADE (Patterns 37–45)
  // Everything calms. Register descends. Patterns simplify but retain
  // rhythmic interest. Converges to a single held D.
  // =========================================================================

  // Pattern 37: Echo of the Light Theme — simplified, warm
  [
    { note: 69, duration: 2 },    // A4 quarter
    { note: 66, duration: 2 },    // F#4 quarter
    { note: 62, duration: 4 },    // D4 half
  ],

  // Pattern 38: Leading-tone sigh — D4-C#4-D4 resolution
  // The C# resolving to D is a warm, sighing gesture.
  [
    { note: 62, duration: 3 },    // D4 dotted quarter
    { note: 61, duration: 1 },    // C#4 eighth
    { note: 62, duration: 4 },    // D4 half
  ],

  // Pattern 39: Open fifth breathing — A3-D4
  [
    { note: 57, duration: 4 },    // A3 half
    { note: 62, duration: 4 },    // D4 half
  ],

  // Pattern 40: Heartbeat slowing — D4 quarter, rest, D4 quarter, rest
  [
    { note: 62, duration: 2 },    // D4 quarter
    { note: 0, duration: 2 },     // rest quarter
    { note: 62, duration: 2 },    // D4 quarter
    { note: 0, duration: 2 },     // rest quarter
  ],

  // Pattern 41: Gentle rocking — A3-D4-A3
  [
    { note: 57, duration: 2 },    // A3 quarter
    { note: 62, duration: 4 },    // D4 half
    { note: 57, duration: 2 },    // A3 quarter
  ],

  // Pattern 42: D4 whole — single tone
  [
    { note: 62, duration: 8 },    // D4 whole
  ],

  // Pattern 43: D3-D4 octave — thinning to the fundamental
  [
    { note: 50, duration: 4 },    // D3 half
    { note: 62, duration: 4 },    // D4 half
  ],

  // Pattern 44: D3 whole — low, warm
  [
    { note: 50, duration: 8 },    // D3 whole
  ],

  // Pattern 45: D3 double whole — the final convergence, long fade
  [
    { note: 50, duration: 16 },   // D3 double whole
  ],
];
