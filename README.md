# In C: The Audience Ensemble

An interactive web installation reimagining Terry Riley's *In C* for a room full of participants.

Audience members do not trigger notes directly. Instead, each person controls one musician in an ensemble. Pressing a station button queues that musician to advance to the next pattern the next time their current loop completes. The piece unfolds as a shared system: people make local decisions, and the ensemble logic shapes the global form.

Live site: [conntrace.github.io/in-c-audience-ensemble](https://conntrace.github.io/in-c-audience-ensemble/)

## What It Does

- Runs a 10+ musician browser-based ensemble using Web Audio.
- Includes Terry Riley's *In C* plus original companion pieces, **The Glade** and **Lanterns**.
- Lets participants advance musicians by keyboard or on-screen station buttons.
- Enforces ensemble rules like opening-gate synchronization, max spread, and deadlock recovery.
- Projects the score state as a live canvas visualization.
- Supports configurable instrumentation, transposition, piece selection, and audio source.
- Stores configuration in `localStorage` so the setup survives reloads on the same machine.

## Experience

The performance page has three main layers:

- A start overlay for manual start or demo-mode start.
- A score projection that shows where each musician currently is in the piece.
- A row of audience stations, one per musician.

There is also an operator panel for live control and an admin page for deeper reconfiguration.

## Controls

### Performance

- `Space`: start or pause
- `D`: toggle demo mode
- `Escape`: open or close the operator panel
- `1`-`0`: advance musicians 1 through 10
- `Q`-`P`: advance musicians 11 through 20

### Operator Panel

- Start, pause, and reset transport
- Switch between **In C**, **The Glade**, and **Lanterns**
- Adjust BPM
- Adjust max ensemble spread
- Choose end behavior
- Switch between SoundFont and Tone.js playback

### Admin Page

Open `admin.html` or click **Admin** from the performance view to:

- Add or remove musicians
- Rename musicians
- Change station colors
- Choose instruments
- Transpose each musician by octave
- Preview instrument assignments

## Musical Model

This project is designed around the logic of *In C*, not just its notes.

- Each musician has their own loop and advances independently.
- Advances are queued by the audience and only take effect at loop boundaries.
- Early in the piece, everyone must reach the first sounding pattern before anyone can move beyond it.
- The ensemble cannot spread wider than the configured max distance unless deadlock recovery temporarily relaxes the rule.
- Most-behind musicians are always allowed to catch up.

That means the system stays legible and musical even when the audience behaves unpredictably.

## Audio

Two playback engines are available:

- **SoundFont** via `soundfont-player` and the MusyngKite bank for broad General MIDI coverage
- **Tone.js** via `Tone.Sampler` and the `tonejs-instruments` sample set for a smaller high-quality palette

Playback uses natural pattern durations instead of forcing every pattern into a fixed time window. Short patterns loop quickly, long patterns take longer, and the ensemble gradually drifts into richer composite textures.

## Project Structure

```text
index.html               Main performance interface
admin.html               Musician and settings editor
css/styles.css           Performance-page styling
css/admin.css            Admin-page styling
js/app.js                Main app wiring and lifecycle
js/ensemble.js           Ensemble rules and eligibility logic
js/musician.js           Per-musician state machine
js/audio-engine.js       Playback engine and musician voices
js/patterns.js           Piece registry and In C patterns
js/glade-patterns.js     Original companion piece
js/lanterns-patterns.js  Original companion piece
js/score-display.js      Canvas score projection
js/button-controller.js  Audience station UI and keyboard input
js/operator-panel.js     Live operator controls
js/admin.js              Admin-page behavior
js/config.js             Persistent configuration and instrument banks
js/instrument-sources.js Audio-source abstraction and mappings
js/demo-mode.js          Auto-play behavior
js/clock.js              Elapsed-time tracking for UI
DEVLOG.md                Long-form development history
```

## Running Locally

This is a static web app. There is no build step.

1. Clone the repository.
2. Serve the folder with any simple static server.
3. Open the served `index.html` in a modern browser.

Example:

```bash
git clone https://github.com/conntrace/in-c-audience-ensemble.git
cd in-c-audience-ensemble
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- Browsers require a user gesture before audio can begin, so the piece starts from the overlay or a manual key press.
- Configuration is saved per browser via `localStorage`.
- The project is intentionally framework-free: plain HTML, CSS, and ES modules.

## Background

*In C* is Terry Riley's 1964 modular composition built from short patterns that performers repeat freely while staying in loose relation to one another. This project adapts that idea into an audience-operated installation where form emerges from many small public decisions instead of a traditional ensemble conductor.
