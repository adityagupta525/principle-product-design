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
  rows:       [cutAtBar(5), cutAtBar(7)],
  rate:       [cutAtBar(7), cutAtBar(8)],
  table:      [cutAtBar(8), cutAtBar(9)],
  calculate:  [cutAtBar(9), cutAtBar(11)],
  curve:      [cutAtBar(11), cutAtBar(13)],
  assemble:   [cutAtBar(13), cutAtBar(16)],
  detach:     [cutAtBar(16), cutAtBar(17)],
  flight:     [cutAtBar(17), cutAtBar(18)],
  land:       [cutAtBar(18), cutAtBar(19)],
  book:       [cutAtBar(19), cutAtBar(23)],
  resolve:    [cutAtBar(23), DURATION],
} as const;

export const shotLen = (s: readonly [number, number]) => s[1] - s[0];
