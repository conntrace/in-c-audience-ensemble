# In C: The Audience Ensemble — Development Log

A living record of every major change to the project, from initial prototype to current state.

---

## Project Overview

**What:** An interactive web-based reimagining of Terry Riley's *In C* (1964) where audience members control an ensemble of 10+ configurable musicians through button presses.

**Stack:** Vanilla HTML/CSS/JS (ES modules), Web Audio API, soundfont-player (MusyngKite samples), GitHub Pages hosting.

**Repo:** https://github.com/conntrace/in-c-audience-ensemble
**Live:** https://conntrace.github.io/in-c-audience-ensemble/

---

## Architecture

```
index.html          — Main performance page
admin.html          — Musician/settings configuration page
css/styles.css      — Performance page styles
css/admin.css       — Admin page styles
js/app.js           — Main application, wires all modules together
js/config.js        — Global config, musician definitions, persistence (localStorage)
js/audio-engine.js  — SoundFont playback, per-musician voice loops
js/patterns.js      — All 54 patterns (0=silence, 1-53=music) transcribed from score
js/ensemble.js      — Ensemble state manager, MaxSpread enforcement, deadlock detection
js/musician.js      — Per-musician state machine (current unit, advance queue, cooldown)
js/clock.js         — Elapsed-time tracker for UI display
js/button-controller.js — Keyboard/click input, button station rendering
js/score-display.js — Canvas-based score projection with animated markers
js/operator-panel.js — Escape-key config overlay (BPM, spread, transport, demo)
js/demo-mode.js     — Auto-play mode, randomly advances eligible musicians
```

---

## Change Log

### v0.1.0 — Initial Prototype
**Commit:** `459d85e` | **Date:** 2026-02-17

Built the complete working prototype from scratch:

- 10 configurable musicians, each assigned a SoundFont instrument
- All 53 patterns from Terry Riley's score transcribed as MIDI note events
- Global clock system firing "boundary" events at fixed intervals
- All musicians advance simultaneously at each boundary
- Audio engine stretches/compresses patterns to fit fixed time window
- MaxSpread coherence rule prevents musicians from drifting too far apart
- Deadlock detection with automatic spread relaxation after timeout
- Queued advance system — button press queues, transition happens at next boundary
- Canvas-based score projection showing colored markers for each musician
- Operator panel (Escape key) for live BPM, spread, transport controls
- Admin page for musician configuration (instrument, color, octave offset)
- Full 128 General MIDI instrument bank with categorized dropdowns
- Demo mode for hands-free auto-play
- localStorage persistence for all settings
- Keyboard controls: 1-0 for musicians, Space for start/pause, D for demo, Escape for panel

---

### v0.2.0 — Pattern Corrections & Voicing
**Commit:** `f41d983` | **Date:** 2026-02-17

Discovered major transcription errors across patterns 9-53. Cross-verified every pattern against:
- Terry Riley's original score PDF
- [teropa/in-c](https://github.com/teropa/in-c) reference implementation (score.json)
- simondemeule/InChrome implementation

**Key corrections:**
- Patterns 9-10: B4-C5 changed to B4-G4
- Pattern 11: F4-E4 figures changed to F4-G4-B4 figures
- Pattern 14: Added missing B4 and G4 whole notes
- Patterns 16-17: E4-F4 changed to G4-B4-C5 range
- Pattern 19: G4 corrected to G5 (octave error)
- Patterns 22-26: Completely restructured as ascending scale patterns
- Pattern 29: E4 repeated changed to E4-G4-C5 arpeggiated
- Pattern 35: Fixed high-register notes (A5=MIDI 81, was incorrectly 69)
- Patterns 36-53: Nearly all rewritten with correct notes
- Pattern 1: Changed to grace notes (duration 0) matching original score

**Other changes:**
- Added grace note handling in audio engine (duration 0 = 60ms ornament)
- Changed default ensemble to somber string-heavy voicing (cellos, violas, contrabass, string ensemble, celesta, music box)
- Slowed default BPM from 120 to 80

---

### v0.3.0 — Humanization & Volume Balancing
**Commit:** `9a97138` | **Date:** 2026-02-17

The first few measures sounded harsh and choppy — all 10 musicians playing the same early patterns in perfect unison created a wall of sound. Added two layers of humanization:

- **Per-instrument gain scaling:** Heavier instruments sit back in the mix (contrabass 0.5, string ensemble 0.55, cello 0.7, viola 0.75) while lighter ones stay present (celesta 1.0, music box 0.9)
- **Fixed per-musician timing offset (±20ms):** Each musician gets a random but consistent drift so voices aren't phase-locked on startup
- **Per-note timing jitter (±15ms):** Small random offset on each note for natural feel

---

### v0.4.0 — Start Overlay
**Commit:** `8cc27bd` | **Date:** 2026-02-17

Added a full-screen start overlay so the page doesn't feel bare before performance begins:

- Large "IN C" title with "The Audience Ensemble" subtitle
- Play button (SVG circle + triangle) that starts performance in demo mode
- Space bar dismisses overlay and starts in manual mode (no demo)
- Smooth fade-out transition on start

---

### v0.4.1 — Silent Pattern 0
**Commit:** `42549cb` | **Date:** 2026-02-17

Added a moment of anticipation before music begins:

- New Pattern 0: a whole note of silence (8 eighth-note units)
- All musicians start on unit 1 (Pattern 0 = silence)
- totalUnits bumped from 53 to 54
- Creates a quiet opening — stillness before the first notes emerge

---

### v0.5.0 — Brass & Strings Ensemble
**Commit:** `23a11b0` | **Date:** 2026-02-17

Changed the default instrument palette from somber strings to a richer brass+strings combination:

- **Instruments:** French horn, trombone, trumpet, tuba, contrabass (x2), cello, viola, string ensemble (x2)
- **BPM:** Raised from 80 to 120
- **Max spread:** Tightened from 5 to 3
- Added brass instruments to volume balancing map (french horn 0.65, trombone 0.6, trumpet 0.7, tuba 0.5)
- Attempted inline demo button (reverted in next commit)

---

### v0.5.1 — Revert Demo Button
**Commit:** `a4bb498` | **Date:** 2026-02-17

Reverted the demo button from inline (with musician buttons) back to the full-screen overlay. The inline placement felt out of place with the minimal aesthetic.

---

### v1.0.0 — Per-Musician Natural-Duration Timing
**Commit:** `46393ff` | **Date:** 2026-02-17

**The biggest architectural change yet.** Redesigned the entire timing system to be faithful to Terry Riley's original piece.

**The problem:** A single global clock forced ALL patterns into the same 2-second window (at 120 BPM). Pattern 10 (1 eighth note = 0.25s natural) got stretched to 2s. Pattern 35 (63+ eighth notes = 15.75s natural) got compressed to 2s. This completely distorted the music.

**The solution:** Each musician now has their own independent loop timer. Patterns play at their natural BPM-derived tempo where one eighth note = `60/bpm/2` seconds. A pattern's duration flows naturally from its musical content.

**Files changed (9 total):**

| File | Change |
|------|--------|
| `config.js` | `beatsPerUnit`/`unitDurationSec` replaced with `eighthNoteSec` getter |
| `musician.js` | `onBoundary()` replaced with `onLoopComplete()` — returns advance result |
| `ensemble.js` | `onBoundary()` replaced with `onMusicianLoopComplete(musicianId)` |
| `audio-engine.js` | Complete redesign — `MusicianVoice` self-schedules via `setTimeout` + AudioContext timestamps |
| `clock.js` | Simplified to elapsed-time tracker (no boundary events) |
| `app.js` | Removed boundary wiring, added periodic UI ticker (100ms interval) |
| `score-display.js` | Reads musician positions every animation frame |
| `admin.html` | Removed "Beats per Unit" setting |
| `admin.js` | Removed beatsPerUnit references |

**How it works:**
1. Each `MusicianVoice` schedules one pattern playthrough at natural tempo
2. A `setTimeout` fires ~50ms before the loop ends
3. At loop end, the ensemble processes whether this musician should advance
4. The next loop is scheduled seamlessly at the exact AudioContext timestamp
5. Audio stays sample-accurate; only the decision logic uses approximate JS timers

**Key design decisions:**
- Cooldown = one full pattern playthrough (not one clock tick)
- BPM changes take effect naturally on next loop iteration
- Short patterns (Pattern 10 = 0.25s) loop very fast — this is correct
- Long patterns (Pattern 35 = 15.75s) take their natural time — also correct
- All musicians start on Pattern 0 (silence), loop together initially, then drift apart as they advance to patterns of different lengths

---

### v1.1.0 — Tone.js as Alternative Audio Source
**Commit:** `912ac21` | **Date:** 2026-02-18

Added Tone.js with the tonejs-instruments sample library as a selectable alternative to the existing soundfont-player. Users can now switch between two audio sources:

- **SoundFont (128 instruments):** The original MusyngKite General MIDI bank. Broad coverage, consistent quality.
- **Tone.js (20 instruments):** High-quality multi-sampled instruments from the tonejs-instruments library (piano, violin, cello, contrabass, french horn, trumpet, trombone, tuba, flute, clarinet, bassoon, saxophone, guitar-acoustic, guitar-electric, guitar-nylon, harp, harmonium, organ, bass-electric, xylophone).

**How it works:**

The integration uses an adapter pattern. Both soundfont-player and Tone.js present different APIs for playback:
- soundfont-player: `instrument.play(note, when, {duration, gain})` returns a node with `.stop()`
- Tone.js: `sampler.triggerAttackRelease(note, duration, when)` — no node returned

A `ToneJSInstrumentAdapter` class wraps `Tone.Sampler` to expose the exact same `.play()` interface. This means `MusicianVoice` doesn't need any changes — it can't tell which source it's using.

**New file:** `js/instrument-sources.js` — Contains:
- Tone.js instrument bank and sample URL maps for all 20 instruments
- `ToneJSInstrumentAdapter` class
- Source-specific loader functions
- Name mapping tables for switching between sources (e.g., `french_horn` ↔ `french-horn`)

**Where to switch:**
- Admin page → Performance Settings → Audio Source dropdown
- Operator panel (Escape) → Configuration → Audio Source dropdown

When switching sources, all musician instrument assignments are automatically remapped to the closest equivalent in the new source. The selection persists to localStorage.

---

## Current State

- **10 default musicians:** French horn, trombone, trumpet, tuba, contrabass (x2), cello, viola, string ensemble (x2)
- **54 patterns:** 0 (silence) + 53 music patterns, all verified against original score
- **120 BPM**, max spread 3, natural per-musician timing
- **Two audio sources:** SoundFont (128 instruments) or Tone.js (20 instruments), selectable
- **Hosted on GitHub Pages**
- **Admin page** for full musician/instrument/source configuration
- **Demo mode** for hands-free auto-play
- **Humanization:** Per-instrument volume balancing, per-musician timing offset, per-note jitter

---

*This log will be updated with all future changes to the project.*
