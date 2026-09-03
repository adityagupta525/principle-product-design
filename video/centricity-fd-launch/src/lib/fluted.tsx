import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CINE } from "./tokens";

/**
 * ══════════════════════════════════════════════════════════════════════════
 *  REFRACTED / FLUTED GLASS FIELD
 *
 *  Light seen through ribbed glass. Not an image — the whole thing is two
 *  gradients per rib, which is all the effect actually is:
 *
 *   • ACROSS the rib: a cylinder-lens profile. Each flute is a half-round of
 *     glass, so it is dark at both edges, brightest a little left of centre
 *     (where the light source is), with a hard specular line at that point.
 *     This is what makes it read as glass rather than as stripes.
 *
 *   • DOWN the rib: a single band of light with the void closing over it top
 *     and bottom. Each rib's band sits at a slightly different height, and
 *     that vertical stagger is the whole illusion — parallel ribs of glass
 *     refract a light source to different heights, and the eye reads the
 *     resulting ragged edge as caustics.
 *
 *  Rib brightness comes from a light field: two soft sources across the frame
 *  with a trough between them, so the field has structure instead of being an
 *  even wall of stripes.
 *
 *  Everything is seeded, so it is identical on every render, and drifts slowly
 *  rather than animating — a background that moves competes with the type.
 * ══════════════════════════════════════════════════════════════════════════
 */

/** Deterministic hash → [0,1). No Math.random: a background must not flicker. */
const rnd = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const gauss = (x: number, mu: number, sigma: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));

type Rib = { x: number; w: number; lum: number; phase: number; spec: number; spread: number };

const buildRibs = (width: number, seed: number): Rib[] => {
  const ribs: Rib[] = [];
  let x = -40;
  let i = 0;
  while (x < width + 40) {
    // Widths vary a lot — even ribs read as corrugated metal, not glass.
    const w = 18 + Math.pow(rnd(i, seed), 1.6) * 86;
    // The light field: two sources, a trough between them, dark at the edges.
    const u = (x + w / 2) / width;
    const field =
      0.95 * gauss(u, 0.16, 0.17) +
      1.05 * gauss(u, 0.62, 0.23) +
      0.50 * gauss(u, 0.91, 0.13) +
      0.20;
    // Per-rib jitter, so neighbouring ribs differ even inside one source.
    // Cubed jitter: most ribs sit dark and a few are properly hot. An even
    // spread of brightness is what made the first pass read as velvet.
    const lum = Math.min(1, field * (0.34 + Math.pow(rnd(i, seed + 7), 1.25) * 1.45));
    ribs.push({
      x,
      w,
      lum,
      // where this rib's band of light sits, as a % down the frame
      phase: 30 + rnd(i, seed + 13) * 30,
      // how tight the specular line is on this rib
      spec: 0.25 + rnd(i, seed + 29) * 0.75,
      // how far the band reaches. Short ribs are glints, long ribs are shafts;
      // the ragged edge that makes across the frame is the caustic.
      spread: 20 + Math.pow(rnd(i, seed + 41), 1.7) * 46,
      });
    x += w + 2 + rnd(i, seed + 3) * 7;
    i++;
  }
  return ribs;
};

/** Mix two hex colours. */
const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  const c = (u: number, v: number) => Math.round(u + (v - u) * t);
  return `rgb(${c(r1, r2)},${c(g1, g2)},${c(b1, b2)})`;
};

export const FlutedGlass: React.FC<{
  width?: number;
  height?: number;
  seed?: number;
  /** Overall intensity, 0 → the field is off and the frame is void. */
  gain?: number;
  /** Slow vertical breathing of the caustics. 0 for a still frame. */
  drift?: number;
}> = ({ width = 1920, height = 1080, seed = 4, gain = 1, drift = 1 }) => {
  const frame = useCurrentFrame();
  const ribs = React.useMemo(() => buildRibs(width, seed), [width, seed]);

  // The deepest shadow between ribs, the body colour, and the hot core.
  const VOID = CINE.void;
  const BODY = "#7A5636";
  const HOT = "#E9BE92";
  const CORE = "#FFF1DE";

  return (
    <AbsoluteFill style={{ background: VOID, overflow: "hidden" }}>
      {ribs.map((r, i) => {
        const L = r.lum * gain;
        if (L < 0.02) return null;
        // Cylinder profile across the rib. The specular sits at 42%, left of
        // centre, which fixes the light source; it is a hard, narrow line
        // rather than a soft middle, because that is the whole tell of glass.
        const edge = mix(VOID, BODY, 0.16 * L);
        const body = mix(BODY, HOT, 0.30 * L);
        const hot = mix(HOT, CORE, Math.max(0, L - 0.5) * 1.9);
        // NOTE: mix() takes hex in and returns rgb() out, so it must never be
        // fed its own result — the parse fails silently, and one bad colour
        // voids the whole gradient declaration rather than just that stop.
        const core = mix(HOT, CORE, Math.min(1, 0.3 + 0.7 * L));
        const specW = 1.2 + r.spec * 3.4;

        // The band of light down the rib, breathing very slowly.
        const ph = r.phase + Math.sin(frame / 260 + i * 0.5) * 3.2 * drift;
        const up = Math.max(2, ph - r.spread);
        const dn = Math.min(99, ph + r.spread * 0.62);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x,
              width: r.w,
              top: 0,
              height,
              background: `linear-gradient(90deg,
                ${VOID} 0%,
                ${edge} 16%,
                ${body} 34%,
                ${hot} ${42 - specW}%,
                ${core} 42%,
                ${hot} ${42 + specW}%,
                ${body} 60%,
                ${edge} 82%,
                ${VOID} 100%)`,
            }}
          >
            {/* the void closing over the band, top and bottom */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg,
                  ${VOID} 0%,
                  rgba(10,10,12,0.94) ${up}%,
                  rgba(10,10,12,0.06) ${ph}%,
                  rgba(10,10,12,0.80) ${dn}%,
                  ${VOID} ${Math.min(100, dn + 16)}%)`,
              }}
            />
          </div>
        );
      })}

      {/* the source itself, blooming through the glass */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(58% 44% at 62% 46%, ${CINE.keyHot}22 0%, transparent 68%)`,
          mixBlendMode: "screen",
          opacity: gain,
        }}
      />
      {/* the floor. Light through standing glass dies before it reaches the
          bottom of the frame, and without this the field reads as a curtain. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg,
            rgba(10,10,12,0.34) 0%, rgba(10,10,12,0) 26%, rgba(10,10,12,0) 52%,
            rgba(10,10,12,0.30) 74%, rgba(10,10,12,0.80) 93%, ${VOID} 100%)`,
        }}
      />
      {/* the frame closes to void at the edges so type has somewhere to sit */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 88% 80% at 50% 48%, transparent 42%, rgba(10,10,12,0.26) 76%, rgba(10,10,12,0.72) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
