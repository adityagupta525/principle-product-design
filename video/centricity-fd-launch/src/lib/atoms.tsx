import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, TYPE } from "./tokens";
import { at, EASE, useEnter } from "./motion";

/** Layer 2 — radial vignette, 8% black at the edges. */
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

/** Layer 3 — ambient glow. One per scene. Amber for data, ice for feature/CTA. */
export const Glow: React.FC<{
  tone?: "amber" | "ice";
  size?: number;
  x?: string;
  y?: string;
  delay?: number;
}> = ({ tone = "amber", size = 760, x = "50%", y = "50%", delay = 0 }) => {
  const frame = useCurrentFrame();
  const hex = tone === "amber" ? C.dataAmber : C.accentIce;
  const pulse = 0.5 + 0.5 * Math.sin((frame / 120) * Math.PI);
  const fadeIn = at(frame, [delay, delay + 30], [0, 1], EASE.outQuart);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${hex}33 0%, transparent 70%)`,
        filter: "blur(90px)",
        opacity: (0.18 + pulse * 0.22) * fadeIn,
        transform: `translate(-50%, -50%) scale(${1 + pulse * 0.12})`,
      }}
    />
  );
};

/** Layer 10 — persistent corner wordmark. Fade only; brand marks never scale. */
export const LogoCorner: React.FC<{ text: string }> = ({ text }) => {
  const opacity = at(useCurrentFrame(), [0, 30], [0, 0.3]);
  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 64,
        opacity,
        color: C.platinumText,
        fontFamily: TYPE.label.fontFamily,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: "0.22em",
      }}
    >
      {text}
    </div>
  );
};

/**
 * Two-tone headline with word-stagger entrance.
 * Leading words in platinum, the final word in silver — the reference's law.
 */
export const Headline: React.FC<{
  text: string;
  delay?: number;
  exitAt?: number;
  style?: React.CSSProperties;
  twoTone?: boolean;
}> = ({ text, delay = 0, exitAt, style, twoTone = true }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const exitOpacity = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 12], [1, 0], EASE.outQuart);
  return (
    <div style={{ ...TYPE.hero, color: C.platinumText, lineHeight: 1.1, ...style }}>
      {words.map((word, i) => {
        const d = delay + i * 6;
        const opacity = at(frame, [d, d + 18], [0, 1]) * exitOpacity;
        const y = at(frame, [d, d + 18], [32, 0]);
        const isLast = i === words.length - 1;
        return (
          <span
            key={i}
            style={{
              opacity,
              display: "inline-block",
              transform: `translateY(${y}px)`,
              marginRight: "0.28em",
              color: twoTone && isLast ? C.silverMuted : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/** Line-wipe reveal — sub-text and data labels. */
export const WipeLine: React.FC<{
  text: string;
  delay?: number;
  exitAt?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, exitAt, style }) => {
  const frame = useCurrentFrame();
  const wipe = at(frame, [delay, delay + 24], [0, 100], EASE.outQuart);
  const exitOpacity = exitAt === undefined ? 1 : at(frame, [exitAt, exitAt + 12], [1, 0], EASE.outQuart);
  return (
    <div
      style={{
        ...TYPE.sub,
        color: C.silverMuted,
        clipPath: `inset(0 ${100 - wipe}% 0 0)`,
        opacity: exitOpacity,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/** Eyebrow label above a feature headline. */
export const Eyebrow: React.FC<{ text: string; delay?: number; exitAt?: number }> = ({
  text,
  delay = 0,
  exitAt,
}) => {
  const enter = useEnter(delay, exitAt);
  return (
    <div style={{ ...TYPE.label, color: C.silverMuted, ...enter, opacity: enter.opacity * 0.75 }}>
      {text}
    </div>
  );
};

/** Bordered badge chip — lifted surface, hairline border. */
export const Badge: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        ...TYPE.badge,
        display: "inline-block",
        color: C.platinumText,
        background: C.liftedSurface,
        border: `1px solid ${C.borderLine}`,
        borderRadius: 999,
        padding: "10px 20px",
        ...enter,
      }}
    >
      {text}
    </div>
  );
};

/**
 * Device frame — hand-rolled divs, no dependency.
 * Titanium rail, hairline inner bezel, Dynamic Island.
 */
export const PhoneFrame: React.FC<{ width?: number; children: React.ReactNode }> = ({
  width = 380,
  children,
}) => {
  const height = Math.round((width / 380) * 800);
  const radius = Math.round(width * 0.135);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        padding: width * 0.028,
        background: "linear-gradient(150deg, #3A4150 0%, #171B26 38%, #0E121B 62%, #2C3340 100%)",
        boxShadow: `0 60px 120px -20px rgba(0,0,0,0.85), 0 0 0 1px ${C.borderLine}`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius - width * 0.028,
          overflow: "hidden",
          background: C.voidBase,
          position: "relative",
        }}
      >
        {children}
        <div
          style={{
            position: "absolute",
            top: width * 0.032,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.26,
            height: width * 0.075,
            borderRadius: 999,
            background: "#000",
          }}
        />
      </div>
    </div>
  );
};
