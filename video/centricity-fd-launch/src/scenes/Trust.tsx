import React from "react";
import { AbsoluteFill } from "remotion";
import { COPY } from "../copy";
import { C, FONT, TYPE } from "../lib/tokens";
import { useEnter } from "../lib/motion";
import { Vignette, Headline, LogoCorner } from "../lib/atoms";

/** 12s. Institutional signal. No glow — restraint is the trust cue here. */
export const Trust: React.FC = () => {
  const row = useEnter(96, 312);
  return (
    <AbsoluteFill style={{ background: C.voidBase, justifyContent: "center", alignItems: "center" }}>
      <Vignette />
      <LogoCorner text={COPY.reveal.wordmark} />

      <Headline
        text={COPY.trust.headline}
        delay={24}
        exitAt={312}
        style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center" }}
      />

      <div style={{ display: "flex", gap: 0, marginTop: 88, ...row }}>
        {COPY.trust.stats.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <div style={{ width: 1, background: C.borderLine, margin: "0 72px" }} />}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  ...TYPE.dataMid,
                  fontFamily: s.mono ? FONT.data : FONT.display,
                  letterSpacing: s.mono ? "-0.01em" : "0.02em",
                  fontSize: 48,
                  color: C.platinumText,
                }}
              >
                {s.value}
              </div>
              <div style={{ ...TYPE.label, fontSize: 15, color: C.silverMuted, marginTop: 14, opacity: 0.8 }}>
                {s.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </AbsoluteFill>
  );
};
