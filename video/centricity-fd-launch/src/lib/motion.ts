import { Easing, interpolate, useCurrentFrame } from "remotion";

/** Motion law — "expensive things don't bounce". No springs on the brand layer. */
export const EASE = {
  outExpo:  Easing.bezier(0.16, 1, 0.3, 1),
  outQuint: Easing.bezier(0.22, 1, 0.36, 1),
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const at = (
  frame: number,
  range: [number, number],
  out: [number, number],
  easing = EASE.outExpo
) => interpolate(frame, range, out, { ...clamp, easing });

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
