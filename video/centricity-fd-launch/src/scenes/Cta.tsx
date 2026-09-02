import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { C, TYPE } from "../lib/tokens";
import { at, EASE, useEnter } from "../lib/motion";
import { Vignette, Glow } from "../lib/atoms";

/** 10s. Full void. Wordmark, one line, one accent. Then black. */
export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const mark = at(frame, [12, 42], [0, 1], EASE.outExpo);
  const line = useEnter(72);
  const button = useEnter(114);
  const blackout = at(frame, [258, 288], [1, 0], EASE.outQuart);

  return (
    <AbsoluteFill
      style={{
        background: C.voidBase,
        justifyContent: "center",
        alignItems: "center",
        opacity: blackout,
      }}
    >
      <Glow tone="ice" size={860} delay={12} />
      <Vignette />

      <div
        style={{
          ...TYPE.label,
          fontSize: 24,
          letterSpacing: "0.42em",
          color: C.platinumText,
          opacity: mark,
        }}
      >
        {COPY.cta.wordmark}
      </div>

      <div style={{ ...TYPE.headline, color: C.platinumText, marginTop: 40, ...line }}>
        {COPY.cta.line}
      </div>

      <div
        style={{
          ...TYPE.badge,
          fontSize: 18,
          marginTop: 48,
          padding: "16px 34px",
          borderRadius: 12,
          background: C.accentIce,
          color: "#0A0F1C",
          fontWeight: 600,
          ...button,
        }}
      >
        {COPY.cta.action}
      </div>
    </AbsoluteFill>
  );
};
