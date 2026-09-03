import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
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
 * The room — now a photographed environment, not a CSS gradient.
 *
 * The plates are Higgsfield renders (nano_banana_pro): a raking light shaft
 * with falling dust, a copper pool on a seamless cyclorama with a reflective
 * floor, and a haze/bokeh layer. A gradient can suggest darkness; only a plate
 * gives real falloff, a floor with a reflection, and grain that belongs to the
 * light rather than being laid over it.
 *
 * The plates are now moving footage (Kling 3.0, image-to-video off the stills):
 * the haze actually drifts and the dust actually falls, which no amount of CSS
 * transform can fake. They are 10s and the film is 54s, so each shot windows
 * into the clip at its own offset and the room never visibly repeats.
 *
 * `variant` picks the plate.
 */
export const Room: React.FC<{
  keyX?: string;
  keyY?: string;
  lift?: number;
  variant?: "shaft" | "pool";
  flip?: boolean;
  drift?: number;
  /** Frame to enter the 10s plate at, so shots never sit on the same air. */
  offset?: number;
}> = ({ keyX = "38%", keyY = "46%", lift = 1, variant = "pool", flip = false, drift = 1, offset = 0 }) => {
  const frame = useCurrentFrame();
  const kx = parseFloat(keyX);

  // Very slow push and sway, so the room breathes without ever reading as a move.
  const push = 1.06 + Math.sin(frame / 420) * 0.012 * drift;
  const sway = Math.sin(frame / 350) * 9 * drift;
  const hazeX = Math.sin(frame / 300) * 26 * drift;
  const hazeY = Math.cos(frame / 380) * 16 * drift;

  return (
    <AbsoluteFill style={{ background: CINE.void, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: lift }}>
        <OffthreadVideo
          src={staticFile(variant === "shaft" ? "env/room-shaft.mp4" : "env/room-pool.mp4")}
          startFrom={offset}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${push}) translateX(${sway}px) ${flip ? "scaleX(-1)" : ""}`,
          }}
        />
      </AbsoluteFill>

      {/* haze, drifting across the plate */}
      <AbsoluteFill style={{ opacity: 0.34 * lift, mixBlendMode: "screen" }}>
        <Img
          src={staticFile("env/haze.png")}
          style={{
            width: "112%",
            height: "112%",
            objectFit: "cover",
            transform: `translate(${hazeX - 60}px, ${hazeY - 40}px) scale(1.04)`,
          }}
        />
      </AbsoluteFill>

      {/* the key, tinted to wherever this shot wants its light */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(90% 80% at ${keyX} ${keyY}, ${CINE.keyHot}14 0%, transparent 62%)`,
          opacity: lift,
        }}
      />
      <AbsoluteFill style={{ background: CINE.void, opacity: (1 - lift) * 0.9 }} />
      {/* keep the reference to kx meaningful for callers tuning the key */}
      <div style={{ display: "none" }}>{kx}</div>
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
  const out = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 5], [1, 0], EASE.out);
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
        // 2-frame stagger (~65ms). Long delays read as slow, however grand the type.
        const d = delay + i * 2;
        const riseAt = (f: number) => at(f, [d, d + 12], [100, 0], EASE.out);
        const rise = riseAt(frame);
        // Velocity is in % of line height; scale it to px for the blur.
        const vy = (riseAt(frame) - riseAt(frame - 1)) * size * 0.011;
        const wt = p.a ? at(frame, [d + 5, d + 16], [500, 800], EASE.out) : 500;
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.26em" }}>
            <Smear vy={vy} gain={0.9} max={18}>
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
            </Smear>
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
    (exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 5], [1, 0], EASE.out));
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

/**
 * MOTION BLUR.
 *
 * The single biggest thing separating this film from the references. Nothing
 * in the previous cut smeared: type snapped into place perfectly sharp, rows
 * arrived sharp, the card crossed the frame sharp. Real footage — and every
 * good motion piece — smears in the direction of travel, and the eye reads its
 * absence instantly even when it cannot name it.
 *
 * Directional, via an SVG Gaussian with separate x and y deviations, so a
 * horizontal move smears horizontally instead of going soft in all directions.
 * Drive `vx`/`vy` from the element's own per-frame velocity: the blur then
 * appears only while the thing is moving and clears the moment it lands.
 */
let smearId = 0;

export const Smear: React.FC<{
  vx?: number;
  vy?: number;
  /** px of blur per px-per-frame of velocity */
  gain?: number;
  max?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ vx = 0, vy = 0, gain = 0.34, max = 26, children, style }) => {
  const id = React.useMemo(() => `smear${smearId++}`, []);
  const bx = Math.min(Math.abs(vx) * gain, max);
  const by = Math.min(Math.abs(vy) * gain, max);
  const on = bx > 0.35 || by > 0.35;

  return (
    <div style={{ ...style, filter: on ? `url(#${id})` : undefined, willChange: "filter" }}>
      {on && (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id={id} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${bx.toFixed(2)} ${by.toFixed(2)}`} />
          </filter>
        </svg>
      )}
      {children}
    </div>
  );
};

/**
 * Hook form, for elements that already own their transform and cannot take a
 * wrapper — a list row, say. Returns the filter string to spread into the
 * element's own style, plus the <defs> node to render beside it.
 */
export const useSmear = (vx: number, vy: number, gain = 0.34, max = 26) => {
  const id = React.useMemo(() => `smear${smearId++}`, []);
  const bx = Math.min(Math.abs(vx) * gain, max);
  const by = Math.min(Math.abs(vy) * gain, max);
  const on = bx > 0.35 || by > 0.35;
  return {
    filter: on ? `url(#${id})` : undefined,
    defs: on ? (
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={id} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={`${bx.toFixed(2)} ${by.toFixed(2)}`} />
        </filter>
      </svg>
    ) : null,
  };
};

/** Velocity of an interpolation, sampled across one frame. */
export const velocity = (fn: (f: number) => number, frame: number) => fn(frame) - fn(frame - 1);

/** Every shot is composited through this, so the finish is identical throughout. */
export const Composite: React.FC<{ children: React.ReactNode; grain?: number }> = ({ children, grain }) => (
  <>
    {children}
    <Vignette />
    <Aberration />
    <Grain amount={grain} />
  </>
);

/* ────────────────────────────────────────────────────────────────────────────
 *  REAL DEVICE PLATES
 *
 *  public/env/device-flat.jpg is a photographed phone on a lit surface, screen
 *  off. The screen rectangle was measured off the plate (dark-region scan, not
 *  eyeballed): the body spans y 40–290 of a 600×335 frame, the glass sits at
 *  x 243–345, y 46–281.
 *
 *  The plate is laid over the shot in `screen` blend mode, which is what makes
 *  this work with no mask: the plate's near-black background contributes
 *  nothing over our near-black room, its copper rim and floor pool add, and the
 *  black glass lets the live UI underneath show through. The device is soft
 *  (it is a 600px plate pushed to ~2.5×); the UI composited into it renders at
 *  native resolution and stays sharp. That is the right way round — it reads
 *  like a photograph of a screen, which is exactly what it is.
 * ──────────────────────────────────────────────────────────────────────────── */
const FEATHER =
  "radial-gradient(ellipse 44% 74% at 49% 50%, #000 0%, #000 44%, transparent 96%)";

export const DEVICE_FLAT = {
  plate: { w: 600, h: 335 },
  glass: { x: 243, y: 46, w: 102, h: 235 },
} as const;

export const DevicePlate: React.FC<{
  /** Plate scale. 2.4 puts the body at ~600px tall on a 1080 frame. */
  scale?: number;
  /** 0 → screen off (the plate as shot), 1 → screen at full brightness. */
  on?: number;
  /** Warm spill thrown back onto the room as the screen lights. */
  spill?: number;
  children: React.ReactNode;
}> = ({ scale = 2.4, on = 1, spill = 1, children }) => {
  const P = DEVICE_FLAT.plate;
  const G = DEVICE_FLAT.glass;
  // Fit the 375×812 app screen to the glass by height; the few px that fall
  // outside the glass width are clipped by the bezel, as they would be.
  const fit = (G.h * scale) / 812;

  return (
    <div style={{ position: "relative", width: P.w * scale, height: P.h * scale }}>
      {/* spill — the screen lighting the room back, behind everything */}
      <div
        style={{
          position: "absolute",
          left: (G.x + G.w / 2) * scale,
          top: (G.y + G.h / 2) * scale,
          width: 1100,
          height: 1100,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${CINE.keyHot}22, transparent 68%)`,
          filter: "blur(60px)",
          opacity: on * spill,
        }}
      />

      {/* the live screen, under the plate */}
      <div
        style={{
          position: "absolute",
          left: G.x * scale,
          top: G.y * scale,
          width: G.w * scale,
          height: G.h * scale,
          borderRadius: 8 * scale,
          overflow: "hidden",
          background: "#FFFFFF",
          opacity: on,
          boxShadow: `0 0 ${70 * on}px ${10 * on}px ${CINE.keyHot}44`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 375,
            height: 812,
            transform: `translateX(-50%) scale(${fit})`,
            transformOrigin: "top center",
          }}
        >
          {children}
        </div>
      </div>

      {/* the photograph itself, added over the top */}
      <Img
        src={staticFile("env/device-flat.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
          // the plate is upscaled; a hair of blur reads as focus, not as JPEG
          filter: "blur(0.7px) saturate(1.06)",
          // Feather the plate's own border. Screen blend lifts even its near-
          // black background, which would otherwise draw a visible rectangle
          // in the room; the falloff also reads as the light dying off.
          WebkitMaskImage: FEATHER,
          maskImage: FEATHER,
        }}
      />

      {/* glass reflection — a photographed phone with a live screen has one */}
      <div
        style={{
          position: "absolute",
          left: G.x * scale,
          top: G.y * scale,
          width: G.w * scale,
          height: G.h * scale,
          borderRadius: 8 * scale,
          background:
            "linear-gradient(146deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 26%, transparent 44%)",
          opacity: on,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/**
 * The angled plate, used as a prop rather than a screen carrier — its glass is
 * a perspective quad and faking a composite into it would look faked. It sits
 * far back, defocused, as a real object in the room.
 */
export const DeviceProp: React.FC<{ scale?: number; blur?: number; opacity?: number }> = ({
  scale = 2.2,
  blur = 14,
  opacity = 0.5,
}) => (
  <Img
    src={staticFile("env/device-angle.jpg")}
    style={{
      width: 600 * scale,
      height: 335 * scale,
      mixBlendMode: "screen",
      filter: `blur(${blur}px)`,
      opacity,
      WebkitMaskImage: FEATHER,
      maskImage: FEATHER,
    }}
  />
);

/**
 * ANNOTATION LABEL — the reference reel's signature move: a component held at
 * scale while short labels tick on beside it, each tethered by a hairline that
 * draws out from the part it names. The label is the film explaining the
 * product without a voice-over, and it is the reason a component shot holds for
 * two bars without going dead.
 */
export const Annotate: React.FC<{
  /** Anchor, in the coordinate space of the parent. */
  x: number;
  y: number;
  /** Leader length and direction. Negative runs left. */
  run?: number;
  text: string;
  delay?: number;
  exitAt?: number;
}> = ({ x, y, run = 150, text, delay = 0, exitAt }) => {
  const frame = useCurrentFrame();
  const draw = at(frame, [delay, delay + 12], [0, 1], EASE.outQuart);
  const dot = at(frame, [delay, delay + 8], [0, 1], EASE.outExpo);
  const type = at(frame, [delay + 8, delay + 20], [0, 1], EASE.outQuart);
  const lift = at(frame, [delay + 8, delay + 20], [10, 0], EASE.outQuart);
  const out = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 6], [1, 0], EASE.out);
  const left = run < 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: out,
        display: "flex",
        flexDirection: left ? "row-reverse" : "row",
        alignItems: "center",
        transform: left ? "translate(-100%, -50%)" : "translateY(-50%)",
      }}
    >
      {/* the tether point, on the component */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: CINE.keyHot,
          flexShrink: 0,
          transform: `scale(${dot})`,
          boxShadow: `0 0 14px ${CINE.keyHot}`,
        }}
      />
      {/* the leader */}
      <div
        style={{
          width: Math.abs(run) * draw,
          height: 1,
          background: `linear-gradient(${left ? 270 : 90}deg, ${CINE.keyHot}CC, ${CINE.keyHot}44)`,
        }}
      />
      <div
        style={{
          ...TYPE.label,
          fontSize: 19,
          fontWeight: 700,
          color: CINE.type,
          textShadow: "0 2px 18px rgba(0,0,0,0.9)",
          whiteSpace: "nowrap",
          opacity: type,
          transform: `translateY(${lift}px)`,
          margin: left ? "0 14px 0 0" : "0 0 0 14px",
        }}
      >
        {text}
      </div>
    </div>
  );
};
