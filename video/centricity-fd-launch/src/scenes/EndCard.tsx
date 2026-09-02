import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { C, FONT, TYPE } from "../lib/tokens";
import { at, EASE, useEnter } from "../lib/motion";
import { InkGround, TileField, AccentCaption, BrandMark } from "../lib/atoms";

/**
 * Beat 5 — 7s. The film's one dark frame, so the co-brand lands as a change of
 * light rather than another card. Brand marks fade; they never scale-bounce.
 */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const mark = at(frame, [10, 40], [0, 1], EASE.outExpo);
  const rule = at(frame, [46, 70], [0, 46], EASE.outQuint);
  const co = useEnter(58);
  const blackout = at(frame, [176, 204], [1, 0], EASE.outQuart);

  return (
    <AbsoluteFill style={{ opacity: blackout }}>
      <InkGround />
      <TileField count={7} opacity={0.5} onInk />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30, opacity: mark }}>
          <BrandMark onInk size={44} />
          <span style={{ width: 1, height: rule, background: "rgba(255,255,255,0.28)" }} />
          <span
            style={{
              ...TYPE.brand,
              fontFamily: FONT.brand,
              fontSize: 30,
              letterSpacing: "0.20em",
              color: "#FFFFFF",
              ...co,
            }}
          >
            {COPY.end.coBrand}
          </span>
        </div>

        <AccentCaption
          caption={COPY.end.line}
          delay={92}
          onInk
          style={{ marginTop: 56, fontSize: 52 }}
        />

        <div
          style={{
            marginTop: 34,
            fontFamily: FONT.display,
            fontSize: 15,
            letterSpacing: "0.14em",
            color: C.accent,
            ...useEnter(120),
          }}
        >
          GLOBAL FINTECH FEST
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
