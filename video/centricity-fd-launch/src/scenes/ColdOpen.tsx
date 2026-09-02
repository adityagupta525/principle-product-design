import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { C, TYPE } from "../lib/tokens";
import { at } from "../lib/motion";
import { Vignette, Headline } from "../lib/atoms";

/** 8s. Statement only. No logo, no device — the void earns the attention. */
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  // 0.5s of true black before anything moves.
  const rule = at(frame, [96, 132], [0, 220]);
  return (
    <AbsoluteFill style={{ background: C.voidBase, justifyContent: "center", alignItems: "center" }}>
      <Vignette />
      <Headline text={COPY.coldOpen.line} delay={15} exitAt={200} style={{ ...TYPE.hero, textAlign: "center" }} />
      <div
        style={{
          marginTop: 44,
          width: rule,
          height: 1,
          background: C.borderLine,
          opacity: at(frame, [200, 212], [1, 0]),
        }}
      />
    </AbsoluteFill>
  );
};
