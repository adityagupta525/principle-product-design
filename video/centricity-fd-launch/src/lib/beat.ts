/**
 * The grid, measured off public/audio/bed.wav — not assumed.
 * See docs/TREATMENT.html §07 and public/audio/README.md.
 *
 *   111.1 BPM · beat 16.202 frames · bar 64.81 frames
 *   first downbeat at frame 7.6 · exactly 25 bars · 1620 frames
 */
export const BPM = 111.1;
export const BEAT = 16.202;
export const BAR = BEAT * 4;
export const PHASE = 7.6;
export const BARS = 25;
export const DURATION = 1620;

/** Frame of beat n (0-indexed) — where the ear expects the hit. */
export const beat = (n: number) => PHASE + n * BEAT;

/** Frame of bar n (1-indexed), the way the treatment counts them. */
export const bar = (n: number) => PHASE + (n - 1) * BAR;

/**
 * Where a cut goes. Two frames early on purpose: the eye should take the new
 * frame just before the ear takes the downbeat, which makes the hit land
 * harder than a simultaneous cut.
 */
export const CUT_LEAD = 2;
export const cutAtBar = (n: number) => Math.round(bar(n) - CUT_LEAD);
export const cutAtBeat = (n: number) => Math.round(beat(n) - CUT_LEAD);

/** Shot boundaries, from the treatment's shot list. Every value is a cut. */
export const SHOT = {
  ask:        [0, cutAtBar(3)],
  ignite:     [cutAtBar(3), cutAtBar(5)],
  /**
   * The positioning, given the whole frame for one bar.
   *
   * It was a line beside the device in Ignite and before that an 18px label on
   * the end card; review asked for it as its own scene. A 25-bar film locked to
   * a 54.01s bed cannot grow, so the bar is taken from CURVE — the only shot
   * with measured slack. tools/framecheck.py put Curve at 57.5% frozen frames
   * (104 of 194), the highest in the film by a factor of two, with single holds
   * of 1.03s and 0.90s. It loses a bar and re-times to 130 frames; every other
   * shot keeps its exact length and simply starts one bar later.
   */
  claim:      [cutAtBar(5), cutAtBar(6)],
  /**
   * ONE take, bars 5-9. Was three cuts — Rows, Rate, Table — each of which
   * front-loaded its animation and then sat: Rate measured 95% still frames.
   * A keynote film says few things slowly; ours was saying thirteen things in
   * 54 seconds at a 1.7s cut rate, which is a social motion reel's cadence,
   * not a keynote's. Merging them buys the beat room to move continuously.
   */
  compare:    [cutAtBar(6), cutAtBar(10)],
  calculate:  [cutAtBar(10), cutAtBar(12)],
  /* ── the light act: bars 12–16 ───────────────────────────────────── */
  /**
   * Two bars, not three. Compare and Calculate keep their exact lengths and
   * simply start one bar later; the bar the claim needed comes from here. See
   * the note on `claim` above for the measurement that chose this shot.
   */
  curve:      [cutAtBar(12), cutAtBar(14)],
  assemble:   [cutAtBar(14), cutAtBar(16)],
  /* ── back to the dark room ───────────────────────────────────────── */
  detach:     [cutAtBar(16), cutAtBar(17)],
  flight:     [cutAtBar(17), cutAtBar(18)],
  land:       [cutAtBar(18), cutAtBar(19)],
  book:       [cutAtBar(19), cutAtBar(23)],
  resolve:    [cutAtBar(23), DURATION],
} as const;

export const shotLen = (s: readonly [number, number]) => s[1] - s[0];
