import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, TYPE } from "./tokens";
import { at, EASE } from "./motion";
import type { Caption } from "../copy";

/* ══════════════════════════════════════════════════════════════════════════
   REFERENCE GRAMMAR
   Motion patterns taken from the supplied reel (@vanshika.motion), re-coloured
   to the Centricity FD partner design system: mid-size kinetic captions with
   exactly one accent word, floating rounded-square tiles, product panels that
   rise under soft shadows, and rows that blur so one row can hold focus.
   ══════════════════════════════════════════════════════════════════════════ */

/** Warm paper ground with a soft radial lift — the reel's light scenes. */
export const Ground: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: C.canvas }}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 42%, #FFFFFF 0%, ${C.canvas} 58%, #EFE8E1 100%)`,
      }}
    />
    {children}
  </AbsoluteFill>
);

/** The dark counterpart — used once, for the end card, so it lands as a change. */
export const InkGround: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: C.headerInk }}>
    <AbsoluteFill
      style={{ background: `radial-gradient(ellipse at 50% 45%, #1E1A17 0%, ${C.headerInk} 70%)` }}
    />
    {children}
  </AbsoluteFill>
);

/**
 * The reel's signature caption: a short phrase, word-staggered, with exactly
 * one coloured word. The reel colours its accent word coral; here it takes the
 * brand warm, or green when the accent word *is* the money.
 */
export const AccentCaption: React.FC<{
  caption: Caption;
  delay?: number;
  exitAt?: number;
  tone?: "accent" | "gain";
  onInk?: boolean;
  style?: React.CSSProperties;
}> = ({ caption, delay = 0, exitAt, tone = "accent", onInk = false, style }) => {
  const frame = useCurrentFrame();
  const accentHex = tone === "gain" ? C.gain : C.accent;
  const baseInk = onInk ? "#FFFFFF" : C.textPrimary;
  const out = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 10], [1, 0], EASE.outQuart);

  const parts = [
    ...caption.lead.split(" ").filter(Boolean).map((word) => ({ word, accent: false })),
    ...caption.accent.split(" ").filter(Boolean).map((word) => ({ word, accent: true })),
    ...(caption.tail ?? "").split(" ").filter(Boolean).map((word) => ({ word, accent: false })),
  ];

  return (
    <div style={{ ...TYPE.caption, color: baseInk, textAlign: "center", lineHeight: 1.18, ...style }}>
      {parts.map((p, i) => {
        const d = delay + i * 4; // the reel cuts quick — 4f per word, not 6
        const opacity = at(frame, [d, d + 14], [0, 1]) * out;
        const y = at(frame, [d, d + 14], [22, 0]);
        return (
          <span
            key={i}
            style={{
              opacity,
              display: "inline-block",
              transform: `translateY(${y}px)`,
              marginRight: "0.26em",
              color: p.accent ? accentHex : undefined,
              fontWeight: p.accent ? 700 : undefined,
            }}
          >
            {p.word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Floating rounded-square tiles at mixed depths — the reel's opening motif.
 * Seeded rather than random, so any frame renders identically every time.
 */
export const TileField: React.FC<{ count?: number; opacity?: number; onInk?: boolean }> = ({
  count = 10,
  opacity = 1,
  onInk = false,
}) => {
  const frame = useCurrentFrame();
  const rgb = onInk ? [182, 147, 119] : [182, 147, 119];
  return (
    <AbsoluteFill style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => {
        const seed = (i * 2654435761) % 997;
        const x = 5 + ((seed * 7) % 90);
        const y = 8 + ((seed * 13) % 80);
        const size = 96 + ((seed * 3) % 150);
        const depth = 0.35 + ((seed % 60) / 100);
        const drift = Math.sin((frame / (160 + (seed % 90))) * Math.PI * 2) * 28 * depth;
        const enter = at(frame, [i * 3, i * 3 + 28], [0, 1], EASE.outQuint);
        const scale = at(frame, [i * 3, i * 3 + 28], [0.72, 1], EASE.outQuint);
        const a = onInk ? 0.16 : 0.22;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: size * 0.3,
              background: `linear-gradient(155deg, rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a * depth}) 0%, rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.02) 100%)`,
              transform: `translate(-50%, -50%) translateY(${drift}px) scale(${scale})`,
              opacity: enter * (0.4 + depth * 0.5),
              filter: `blur(${(1 - depth) * 4}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * A product screen presented as a floating panel — the reel shows UI this way
 * rather than inside a device frame. Screens are authored at 375pt and scaled.
 */
export const Panel: React.FC<{
  scale?: number;
  delay?: number;
  exitAt?: number;
  height?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ scale = 1.6, delay = 0, exitAt, height = 812, children, style }) => {
  const frame = useCurrentFrame();
  const opacity = at(frame, [delay, delay + 26], [0, 1], EASE.outQuint);
  const rise = at(frame, [delay, delay + 26], [46, 0], EASE.outQuint);
  const s = at(frame, [delay, delay + 26], [0.94, 1], EASE.outQuint);
  const out = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 12], [1, 0], EASE.outQuart);
  const float = frame > delay + 26 ? Math.sin(((frame - delay - 26) / 130) * Math.PI * 2) * 7 : 0;

  return (
    <div
      style={{
        width: 375,
        height,
        borderRadius: 30,
        background: C.surface,
        boxShadow: "0 40px 90px -24px rgba(60,42,28,0.30), 0 4px 14px rgba(60,42,28,0.06)",
        overflow: "hidden",
        opacity: opacity * out,
        transform: `translateY(${rise + float}px) scale(${s * scale})`,
        flex: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Small pill — status chips and filter chips, straight from the app. */
export const Pill: React.FC<{
  children: React.ReactNode;
  bg?: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, bg = C.surfaceSunk, color = C.textSecondary, style }) => (
  <span
    style={{
      display: "inline-block",
      padding: "5px 11px",
      borderRadius: 999,
      background: bg,
      color,
      fontFamily: FONT.display,
      fontSize: 11,
      fontWeight: 600,
      ...style,
    }}
  >
    {children}
  </span>
);

/** The Centricity brand lockup, in the file's own brand face. */
export const BrandMark: React.FC<{ onInk?: boolean; size?: number; style?: React.CSSProperties }> = ({
  onInk = false,
  size = 40,
  style,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.28,
      fontFamily: FONT.brand,
      fontSize: size,
      fontWeight: 600,
      letterSpacing: "0.01em",
      color: onInk ? "#FFFFFF" : C.textPrimary,
      ...style,
    }}
  >
    <span
      style={{
        width: size * 0.92,
        height: size * 0.92,
        borderRadius: 999,
        border: `${Math.max(2, size * 0.055)}px solid ${onInk ? "#FFFFFF" : C.textPrimary}`,
        display: "inline-block",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: Math.max(2, size * 0.055),
          height: "44%",
          background: onInk ? "#FFFFFF" : C.textPrimary,
          transform: "translateX(-50%)",
        }}
      />
    </span>
    Centricity
  </span>
);

/**
 * Stage — the layout contract every product beat uses: the panel lives in the
 * upper band, the caption gets a reserved strip underneath. Without this the
 * caption collides with the phone's own tab bar.
 */
export const CAPTION_BAND = 168;

export const Stage: React.FC<{ children: React.ReactNode; caption: React.ReactNode }> = ({
  children,
  caption,
}) => (
  <>
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingBottom: CAPTION_BAND,
      }}
    >
      {children}
    </AbsoluteFill>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 56 }}>
      {caption}
    </AbsoluteFill>
  </>
);
