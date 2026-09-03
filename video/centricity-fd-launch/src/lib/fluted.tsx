import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CINE } from "./tokens";

/**
 * ══════════════════════════════════════════════════════════════════════════
 *  REFRACTED GLASS — light source behind, fluted glass in front.
 *
 *  Measured off the reference plate (1200×675), not guessed:
 *
 *   VERTICAL   Brightest at the top and flat across 0-20%, a steady decline
 *              to ~40% of peak by 60%, then a cliff — 60→65% drops the mean
 *              from 28 to 11 — and effectively black below 70%. Not a band in
 *              the middle: a wash from the top that dies two thirds down.
 *
 *   SOURCE     Blurred colour blobs sit BEHIND the glass. The reference has
 *              bright cores near x=17% and x=67-83% with a dark trough between
 *              at x=42-58%. This is what the ribs refract, and it is the whole
 *              reason the plate reads as glass rather than as stripes: each rib
 *              shows a magnified slice of a real light field, so neighbouring
 *              ribs disagree with each other the way lenses do.
 *
 *   COLOUR     A single hue ramped by intensity, saturated in the shadows and
 *              clipping to white at the specular:
 *                (8,48,120) → (32,105,210) → (135,172,228) → (248,253,254)
 *              The dominant channel carries it and the other two stay low
 *              until the very top. Ours is the same ramp on the copper axis.
 *
 *   RIBS       Period ~67px on 1200 → ~107px at 1920.
 *
 *  CONSTRUCTION
 *   1. The blob field — large blurred radial sources, painted once.
 *   2. One div per rib, clipping its own copy of that field, scaled about the
 *      rib's centre line. A vertical cylinder lens magnifies horizontally and
 *      passes vertical detail through, so scaleX IS the refraction — not an
 *      effect standing in for one.
 *   3. Cylinder shading over each rib in `overlay`, so it shades the colour
 *      underneath instead of replacing it: dark at the edges, a hard specular
 *      left of centre.
 *   4. The vertical wash, with the measured knee at 60%.
 * ══════════════════════════════════════════════════════════════════════════
 */

const rnd = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * The copper axis of the reference's blue ramp — same shape, our hue. Deep and
 * saturated where the light is weak, clipping to white where it is strongest.
 */
const RAMP = {
  deep: "#221A12",
  mid: "#63482A",
  warm: "#AC8052",
  light: "#E8C79B",
  core: "#FFF6EC",
};

type Rib = { x: number; w: number; mag: number; shift: number; spec: number };

const buildRibs = (width: number, seed: number): Rib[] => {
  const ribs: Rib[] = [];
  let x = -60;
  let i = 0;
  // ~107px period at 1920, measured off the plate.
  const period = (width / 1920) * 107;
  while (x < width + 60) {
    const w = period * (0.42 + Math.pow(rnd(i, seed), 1.3) * 1.15);
    ribs.push({
      x,
      w,
      // How hard this flute magnifies. Higher = a narrower slice stretched
      // wider = a more smeared, more abstract rib.
      mag: 2.4 + rnd(i, seed + 7) * 5.5,
      // Lateral displacement. Real flutes are not perfectly registered, and
      // this is what breaks the ribs out of lockstep with the blobs.
      shift: (rnd(i, seed + 19) - 0.5) * period * 1.6,
      spec: 0.3 + rnd(i, seed + 29) * 0.7,
    });
    x += w + period * 0.06;
    i++;
  }
  return ribs;
};

export const FlutedGlass: React.FC<{
  width?: number;
  height?: number;
  seed?: number;
  gain?: number;
  drift?: number;
}> = ({ width = 1920, height = 1080, seed = 9, gain = 1, drift = 1 }) => {
  const frame = useCurrentFrame();
  const ribs = React.useMemo(() => buildRibs(width, seed), [width, seed]);

  // Slow lateral breathing of the sources behind the glass. The glass is
  // fixed; only the light moves, which is what makes it feel like a room.
  const d1 = Math.sin(frame / 300) * 2.2 * drift;
  const d2 = Math.cos(frame / 380) * 2.8 * drift;

  /** The light behind the glass. Cores where the plate has them. */
  const blobs = `
    radial-gradient(46% 62% at ${17 + d1}% 20%, ${RAMP.core} 0%, ${RAMP.light} 16%, ${RAMP.warm} 34%, rgba(34,26,18,0) 72%),
    radial-gradient(38% 54% at ${67 + d2}% 14%, ${RAMP.light} 0%, ${RAMP.warm} 30%, rgba(34,26,18,0) 74%),
    radial-gradient(30% 46% at ${83 - d1}% 26%, ${RAMP.warm} 0%, rgba(34,26,18,0) 70%),
    radial-gradient(30% 40% at 50% 2%, ${RAMP.mid} 0%, rgba(34,26,18,0) 78%),
    linear-gradient(180deg, ${RAMP.deep} 0%, #140F0A 52%, ${CINE.void} 78%)`;

  return (
    <AbsoluteFill style={{ background: CINE.void, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: gain }}>
        {ribs.map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x,
              top: 0,
              width: r.w,
              height,
              overflow: "hidden",
            }}
          >
            {/* the light field, seen through this flute */}
            <div
              style={{
                position: "absolute",
                left: -r.x + r.shift,
                top: 0,
                width,
                height,
                backgroundImage: blobs,
                transform: `scaleX(${r.mag})`,
                transformOrigin: `${r.x + r.w / 2 - r.shift}px 50%`,
              }}
            />
            {/* cylinder shading — shades the light rather than replacing it */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                mixBlendMode: "overlay",
                background: `linear-gradient(90deg,
                  #050506 0%,
                  #24242A 13%,
                  #74747A 31%,
                  #F4F4F6 ${40 + r.spec}%,
                  #8E8E96 ${50 + r.spec * 2}%,
                  #3A3A42 72%,
                  #08080A 100%)`,
              }}
            />
            {/* the seam where two flutes meet is always the darkest line */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0) 9%,
                  rgba(10,10,12,0) 91%, rgba(10,10,12,0.92) 100%)`,
              }}
            />
          </div>
        ))}
      </AbsoluteFill>

      {/* THE VERTICAL WASH — flat to 20%, decline to 60%, cliff, then black.
          Every stop below is the measured row profile of the plate. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg,
            rgba(10,10,12,0.00) 0%,
            rgba(10,10,12,0.00) 20%,
            rgba(10,10,12,0.14) 30%,
            rgba(10,10,12,0.34) 40%,
            rgba(10,10,12,0.52) 50%,
            rgba(10,10,12,0.58) 58%,
            rgba(10,10,12,0.84) 64%,
            rgba(10,10,12,0.91) 70%,
            rgba(10,10,12,0.95) 80%,
            ${CINE.void} 100%)`,
        }}
      />

      {/* edges close to void so type has somewhere to sit */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 92% 96% at 50% 30%, transparent 46%, rgba(10,10,12,0.30) 78%, rgba(10,10,12,0.72) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
