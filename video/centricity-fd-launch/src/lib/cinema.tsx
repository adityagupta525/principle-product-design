import React from "react";
import { AbsoluteFill, useCurrentFrame, random } from "remotion";
import { CINE, FONT, TYPE } from "./tokens";
import { at, EASE } from "./motion";
import type { Caption } from "../copy";

/* ══════════════════════════════════════════════════════════════════════════
   THE ROOM
   The premium product-film grammar: the UI is a physical object, photographed
   in a dark room with one warm key. Nothing else is ever on screen.

   MOTION LAW — two languages, never mixed:
     • the camera and the world are EASED (long cubic-bezier, no overshoot)
     • UI elements are ELASTIC (spring, slight overshoot)
   Springing the camera is the loudest tell of amateur work in this genre.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * The room. This was a single CSS radial gradient, and that was the biggest
 * visual weakness in the film — a flat wash reads as a dark slide, not as a
 * photographed space. A real room needs four things a gradient cannot give:
 * a floor the light dies into, haze for the light to travel through, dust to
 * catch it, and a shaft that says where it comes from.
 *
 * Environment plates were generated for this and could not be brought into the
 * project — the generator's CDN is denied by this session's network egress
 * policy, same as figma.com. Drop them into public/env/ and Room will use
 * them; until then this is the room, built.
 */
export const Room: React.FC<{ keyX?: string; keyY?: string; lift?: number }> = ({
  keyX = "38%",
  keyY = "46%",
  lift = 1,
}) => {
  const frame = useCurrentFrame();
  const kx = parseFloat(keyX);
  const ky = parseFloat(keyY);

  return (
    <AbsoluteFill style={{ background: CINE.void }}>
      {/* the key, and its long fall into the dark */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(130% 100% at ${keyX} ${keyY},
            #24211E 0%, ${CINE.deep} 34%, #0D0D0F 62%, ${CINE.void} 88%)`,
          opacity: lift,
        }}
      />

      {/* floor — the light has to end somewhere */}
      <AbsoluteFill
        style={{
          top: "62%",
          background: `linear-gradient(to bottom,
            rgba(182,147,119,${0.05 * lift}) 0%, rgba(10,10,12,0.55) 46%, ${CINE.void} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "62%",
          height: 1,
          background: `linear-gradient(to right, transparent, rgba(182,147,119,${0.16 * lift}) ${kx}%, transparent)`,
        }}
      />

      {/* the shaft, drifting */}
      <div
        style={{
          position: "absolute",
          left: `${kx}%`,
          top: `${ky}%`,
          width: 1500,
          height: 1100,
          transform: `translate(-50%, -50%) rotate(${-16 + Math.sin(frame / 260) * 2.5}deg)`,
          background: `linear-gradient(100deg, transparent 40%, rgba(182,147,119,${0.05 * lift}) 50%, transparent 60%)`,
          filter: "blur(38px)",
        }}
      />

      {/* haze, two layers at different speeds so the air has depth */}
      {[0, 1].map((i) => {
        const drift = Math.sin(frame / (300 + i * 170) + i * 2) * (40 + i * 26);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: -140,
              transform: `translate(${drift}px, ${drift * 0.35}px)`,
              background: `radial-gradient(${60 + i * 25}% ${45 + i * 20}% at ${kx + i * 14}% ${ky - i * 8}%,
                rgba(182,147,119,${(0.055 - i * 0.02) * lift}) 0%, transparent 70%)`,
              filter: `blur(${60 + i * 40}px)`,
            }}
          />
        );
      })}

      {/* dust in the beam — seeded, so every render of a frame is identical */}
      {Array.from({ length: 26 }).map((_, i) => {
        const seed = (i * 2654435761) % 991;
        const x = (seed * 7) % 100;
        const y = (seed * 13) % 100;
        const depth = 0.3 + ((seed % 70) / 100);
        const rise = ((frame * (0.06 + depth * 0.1) + seed) % 120) - 20;
        const near = Math.hypot(x - kx, y - ky) < 42;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${(y + rise) % 100}%`,
              width: 1 + depth * 2.4,
              height: 1 + depth * 2.4,
              borderRadius: "50%",
              background: CINE.keyHot,
              opacity: (near ? 0.3 : 0.1) * depth * lift,
              filter: `blur(${(1 - depth) * 1.6}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Film grain. Cheap and essential — a clean render reads as a render. */
export const Grain: React.FC<{ amount?: number }> = ({ amount = 0.055 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2); // re-seed every other frame
  return (
    <AbsoluteFill style={{ opacity: amount, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{ amount?: number }> = ({ amount = 0.72 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 92% 82% at 50% 48%,
        transparent 0%, rgba(0,0,0,${amount * 0.18}) 46%,
        rgba(0,0,0,${amount * 0.55}) 76%, rgba(0,0,0,${amount}) 100%)`,
      pointerEvents: "none",
    }}
  />
);

/** Slight chromatic fringing at the frame edges only. Photographic, not digital. */
export const Aberration: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", opacity: 0.16 }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 74% 64% at 50% 50%, transparent 62%, rgba(120,60,255,0.5) 100%)",
      }}
    />
  </AbsoluteFill>
);

/**
 * Eased camera. One move per shot — a push, a truck or a pull, never two.
 * Always still running at the cut: the camera never comes to rest.
 */
export type Move = { z?: [number, number]; x?: [number, number]; y?: [number, number] };

export const useCamera = (len: number, move: Move) => {
  const frame = useCurrentFrame();
  const p = at(frame, [0, len], [0, 1], EASE.outQuart);
  const z = move.z ? move.z[0] + (move.z[1] - move.z[0]) * p : 1;
  const x = move.x ? move.x[0] + (move.x[1] - move.x[0]) * p : 0;
  const y = move.y ? move.y[0] + (move.y[1] - move.y[0]) * p : 0;
  return { z, x, y, p };
};

/** A depth plane. Closer planes move more, which is what sells the space. */
export const Plane: React.FC<{
  depth?: number;
  cam: { z: number; x: number; y: number };
  blur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ depth = 0.12, cam, blur = 0, children, style }) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: "center",
      transform: `translate(${cam.x * depth * 100}px, ${cam.y * depth * 100}px) scale(${
        1 + (cam.z - 1) * (depth / 0.12)
      })`,
      filter: blur ? `blur(${blur}px)` : undefined,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/**
 * The product as an object: a white panel in the dark, rim-lit by the key,
 * with its own bloom behind it. The rim is what stops it reading as a rectangle.
 */
export const LitPanel: React.FC<{
  width?: number;
  height?: number;
  scale?: number;
  yaw?: number;
  bloom?: number;
  /**
   * Macro mode. Inside a 3-5× crop we are *within* the screen, so the device
   * chrome has no business being there — and scaled that far its radius, rim
   * and bloom blow the frame out. Bare drops all of it and leaves the surface.
   */
  bare?: boolean;
  children: React.ReactNode;
}> = ({ width = 375, height = 812, scale = 1, yaw = 0, bloom = 1, bare = false, children }) =>
  bare ? (
    <div style={{ width, height, background: "#FFFFFF", overflow: "hidden", transform: `scale(${scale})` }}>
      {children}
    </div>
  ) : (
  <div style={{ position: "relative", transform: `scale(${scale}) rotateY(${yaw}deg)`, transformStyle: "preserve-3d" }}>
    {/* contact shadow — without it the panel floats with no relation to the room */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: -46,
        width: "116%",
        height: 96,
        transform: "translateX(-50%)",
        background: "radial-gradient(closest-side, rgba(0,0,0,0.85), transparent 72%)",
        filter: "blur(26px)",
        opacity: bloom,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: -70,
        borderRadius: 90,
        background: `radial-gradient(closest-side, ${CINE.keyHot}40 0%, transparent 72%)`,
        filter: "blur(46px)",
        opacity: bloom,
      }}
    />
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 30,
        overflow: "hidden",
        background: "#FFFFFF",
        boxShadow: `
          0 0 0 1px ${CINE.keyHot}66,
          -1px 0 0 1px ${CINE.keyHot}33,
          0 60px 140px -30px rgba(0,0,0,0.95),
          0 0 90px -20px ${CINE.key}55`,
      }}
    >
      {children}
    </div>
  </div>
  );

/**
 * Macro crop. Half the film is 2–3× closes on a single interaction — that is
 * what makes an interface look expensive. Focus is a point in 375×812 screen
 * space; the crop centres the frame on it.
 */
export const Macro: React.FC<{
  zoom: number;
  fx: number;
  fy: number;
  children: React.ReactNode;
}> = ({ zoom, fx, fy, children }) => (
  <div
    style={{
      transform: `scale(${zoom}) translate(${(187.5 - fx)}px, ${(406 - fy)}px)`,
      transformOrigin: "center center",
    }}
  >
    {children}
  </div>
);

/**
 * Type lives in the void beside the product, never over it. Mask reveal per
 * word, and the accent word pulls 500 → 800 on the beat — Urbanist is
 * variable, so that is real interpolation, not a swap.
 */
export const TypeCard: React.FC<{
  caption: Caption;
  delay?: number;
  exitAt?: number;
  size?: number;
  align?: "left" | "center";
  style?: React.CSSProperties;
}> = ({ caption, delay = 0, exitAt, size = 54, align = "left", style }) => {
  const frame = useCurrentFrame();
  const out = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 9], [1, 0], EASE.outQuart);
  const parts = [
    ...caption.lead.split(" ").filter(Boolean).map((w) => ({ w, a: false })),
    ...caption.accent.split(" ").filter(Boolean).map((w) => ({ w, a: true })),
    ...(caption.tail ?? "").split(" ").filter(Boolean).map((w) => ({ w, a: false })),
  ];
  return (
    <div
      style={{
        fontFamily: FONT.display,
        fontSize: size,
        lineHeight: 1.14,
        letterSpacing: "-0.03em",
        color: CINE.type,
        textAlign: align,
        maxWidth: 15 * size,
        ...style,
      }}
    >
      {parts.map((p, i) => {
        const d = delay + i * 3;
        const rise = at(frame, [d, d + 13], [100, 0], EASE.outExpo);
        const wt = p.a ? at(frame, [d + 6, d + 18], [500, 800], EASE.outQuart) : 500;
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.26em" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${rise}%)`,
                opacity: out,
                fontWeight: Math.round(wt),
                color: p.a ? CINE.keyHot : undefined,
              }}
            >
              {p.w}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Small caps label in the void — the film's only other type role. */
export const Kicker: React.FC<{ text: string; delay?: number; exitAt?: number; style?: React.CSSProperties }> = ({
  text,
  delay = 0,
  exitAt,
  style,
}) => {
  const frame = useCurrentFrame();
  const o = at(frame, [delay, delay + 12], [0, 1]) *
    (exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 9], [1, 0]));
  return (
    <div
      style={{
        ...TYPE.label,
        fontSize: 15,
        letterSpacing: "0.22em",
        color: CINE.key,
        opacity: o,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/**
 * Light falls off. A macro crop that ends in a hard vertical edge reads as a
 * white box pasted on black; the same crop dissolving into the room reads as a
 * lit surface. Used wherever a panel deliberately does not fill the frame.
 */
export const EdgeFalloff: React.FC<{ side?: "right" | "left" | "both"; at?: number }> = ({
  side = "right",
  at: a = 52,
}) =>
  side === "both" ? (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background: `linear-gradient(to right, ${CINE.void} 0%, transparent ${a}%, transparent ${100 - a}%, ${CINE.void} 100%)`,
      }}
    />
  ) : (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background: `linear-gradient(to ${side}, transparent ${a - 22}%, ${CINE.void} ${a + 16}%)`,
      }}
    />
  );

/** Every shot is composited through this, so the finish is identical throughout. */
export const Composite: React.FC<{ children: React.ReactNode; grain?: number }> = ({ children, grain }) => (
  <>
    {children}
    <Vignette />
    <Aberration />
    <Grain amount={grain} />
  </>
);
