import { Easing, interpolate, useCurrentFrame } from "remotion";

/**
 * Motion law — "expensive things don't bounce". No springs on the brand layer.
 *
 * The built-in easings are too weak; these are the strong custom curves. Never
 * ease-in on anything entering: it delays the first movement, which is exactly
 * the moment the eye is watching, and reads as sluggish at any duration.
 */
export const EASE = {
  /** Strong ease-out. Everything that enters. */
  out:      Easing.bezier(0.23, 1, 0.32, 1),
  /** Strong ease-in-out. Things already on screen, moving. */
  inOut:    Easing.bezier(0.77, 0, 0.175, 1),
  /** The iOS drawer curve — sheets and panels. */
  drawer:   Easing.bezier(0.32, 0.72, 0, 1),

  outExpo:  Easing.bezier(0.16, 1, 0.3, 1),
  outQuint: Easing.bezier(0.22, 1, 0.36, 1),
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
};

/**
 * Timings, in frames at 30fps.
 *
 * Two clocks, deliberately far apart. Anything that is a piece of INTERFACE
 * moves at interface speed — a real row does not take half a second to arrive,
 * and when it does the whole thing reads as a mockup rather than a product.
 * Anything that is CAMERA or WORLD moves slowly, because that is how a rig
 * behaves. The gap between the two clocks is what sells the film.
 */
export const TIME = {
  press: 5,     // ~160ms — button feedback
  tick: 7,      // ~230ms — a check, a chip, a small state change
  row: 8,       // ~270ms — a list row arriving
  sheet: 11,    // ~370ms — a bottom sheet, a panel
  exit: 5,      // exits are always faster than entrances
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const at = (
  frame: number,
  range: [number, number],
  out: [number, number],
  easing = EASE.outExpo
) => interpolate(frame, range, out, { ...clamp, easing });

/**
 * Perceptual-scale interpolation. The eye reads scale geometrically, not
 * linearly (Weber–Fechner): 1→2 and 2→4 look like equal steps. A linear
 * interpolate on `scale()` decelerates too early on a large grow, so the object
 * looks like it "arrives" a beat before it settles. This walks the ratio —
 *   s(p) = from · (to / from) ^ p
 * — so equal progress is equal *perceived* size change. Timing and easing are
 * unchanged: `p` still comes from `at`, only the mapping of p→scale differs.
 *
 * Remotion 4.0.416 has no native `output:'perceptual-scale'` (InterpolateOptions
 * exposes only easing / extrapolate*), so the geometry is done here by hand; on
 * a version that ships it this is a one-line swap. Falls back to linear when an
 * endpoint is ≤0 (a ratio through zero is undefined) — nothing here scales from 0.
 */
export const atScale = (
  frame: number,
  range: [number, number],
  out: [number, number],
  easing = EASE.outExpo
) => {
  const [from, to] = out;
  const p = at(frame, range, [0, 1], easing);
  if (from <= 0 || to <= 0) return interpolate(p, [0, 1], out, clamp);
  return from * Math.pow(to / from, p);
};

/**
 * Standard entrance: opacity 0→1 with a 24px rise, 700ms (21f).
 * `exitAt` fades the layer out over 400ms with a −16px lift.
 */
export const useEnter = (delay = 0, exitAt?: number) => {
  const frame = useCurrentFrame();
  const opacityIn = at(frame, [delay, delay + 21], [0, 1]);
  const y = at(frame, [delay, delay + 21], [24, 0]);
  const opacityOut = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 12], [1, 0], EASE.outQuart);
  const yOut = exitAt === undefined ? 0 : at(frame, [exitAt, exitAt + 12], [0, -16], EASE.outQuart);
  return { opacity: opacityIn * opacityOut, transform: `translateY(${y + yOut}px)` };
};

/** Device entrance: 1100ms, scale 0.92→1, rise 48px. Float begins only after it lands. */
export const useDevice = (delay = 0) => {
  const frame = useCurrentFrame();
  const opacity = at(frame, [delay, delay + 33], [0, 1], EASE.outQuint);
  const scale = at(frame, [delay, delay + 33], [0.92, 1], EASE.outQuint);
  const rise = at(frame, [delay, delay + 33], [48, 0], EASE.outQuint);
  const float = frame > delay + 33 ? Math.sin(((frame - delay - 33) / 120) * Math.PI * 2) * 10 : 0;
  return { opacity, transform: `translateY(${rise + float}px) scale(${scale})` };
};

/** Count-up: 1400ms ease-out-quart, then holds. */
export const useCountUp = (to: number, delay = 0) =>
  at(useCurrentFrame(), [delay, delay + 42], [0, to], EASE.outQuart);
