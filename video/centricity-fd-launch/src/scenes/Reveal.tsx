import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { C, TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Vignette, Glow, WipeLine } from "../lib/atoms";

/** 10s. The wordmark fades in and sits still. Brand marks never scale. */
export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const mark = at(frame, [20, 50], [0, 1], EASE.outExpo);
  const exit = at(frame, [258, 275], [1, 0], EASE.outQuart);
  const feature = at(frame, [90, 120], [0, 1]);
  const featureY = at(frame, [90, 120], [22, 0]);

  return (
    <AbsoluteFill style={{ background: C.voidBase, justifyContent: "center", alignItems: "center" }}>
      <Glow tone="ice" size={900} delay={20} />
      <Vignette />

      <div
        style={{
          ...TYPE.label,
          fontSize: 26,
          letterSpacing: "0.42em",
          color: C.platinumText,
          opacity: mark * exit,
        }}
      >
        {COPY.reveal.wordmark}
      </div>

      <div style={{ width: 1, height: 40, background: C.borderLine, margin: "34px 0", opacity: mark * exit }} />

      <div
        style={{
          ...TYPE.serifHero,
          color: C.platinumText,
          opacity: feature * exit,
          transform: `translateY(${featureY}px)`,
        }}
      >
        {COPY.reveal.feature}
      </div>

      <WipeLine
        text={COPY.reveal.kicker}
        delay={140}
        exitAt={258}
        style={{ marginTop: 20, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 20 }}
      />
    </AbsoluteFill>
  );
};
