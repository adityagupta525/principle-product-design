import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { C, TYPE } from "../lib/tokens";
import { at, useCountUp, useEnter } from "../lib/motion";
import { Vignette, Glow, Eyebrow, WipeLine, LogoCorner } from "../lib/atoms";

/**
 * 16s. Fey-style data-glow moment, amber substituted for Fey's teal per the
 * colour law. The number is the hero; it holds well past its count-up.
 */
export const FeatureThree: React.FC = () => {
  const frame = useCurrentFrame();
  const rate = useCountUp(COPY.featureThree.rate, 72);
  const rateOpacity = at(frame, [66, 96], [0, 1]) * at(frame, [432, 448], [1, 0]);
  const principal = useEnter(186, 432);
  const maturity = useEnter(210, 432);
  const foot = useEnter(258, 432);

  const Stat: React.FC<{ label: string; value: string; style: React.CSSProperties }> = ({
    label,
    value,
    style,
  }) => (
    <div style={{ ...style, textAlign: "center" }}>
      <div style={{ ...TYPE.label, fontSize: 16, color: C.silverMuted, opacity: 0.75 }}>{label}</div>
      <div style={{ ...TYPE.dataMid, color: C.platinumText, marginTop: 12 }}>{value}</div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: C.voidBase, justifyContent: "center", alignItems: "center" }}>
      <Glow tone="amber" size={980} delay={54} />
      <Vignette />
      <LogoCorner text={COPY.reveal.wordmark} />

      <Eyebrow text={COPY.featureThree.eyebrow} delay={36} exitAt={432} />
      <WipeLine
        text={COPY.featureThree.label}
        delay={48}
        exitAt={432}
        style={{ marginTop: 18, fontSize: 18, letterSpacing: "0.18em" }}
      />

      <div
        style={{
          ...TYPE.dataHero,
          fontSize: 148,
          color: C.dataAmber,
          opacity: rateOpacity,
          marginTop: 26,
          lineHeight: 1,
        }}
      >
        {rate.toFixed(2)}
        {COPY.featureThree.rateSuffix}
      </div>

      <div style={{ display: "flex", gap: 120, marginTop: 64 }}>
        <Stat label={COPY.featureThree.principalLabel} value={COPY.featureThree.principal} style={principal} />
        <div style={{ width: 1, background: C.borderLine, ...principal }} />
        <Stat label={COPY.featureThree.maturityLabel} value={COPY.featureThree.maturity} style={maturity} />
      </div>

      <div
        style={{ ...TYPE.sub, fontSize: 20, color: C.silverMuted, marginTop: 56, ...foot, opacity: foot.opacity * 0.7 }}
      >
        {COPY.featureThree.footnote}
      </div>
    </AbsoluteFill>
  );
};
