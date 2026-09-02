import React from "react";
import { AbsoluteFill } from "remotion";
import { COPY } from "../copy";
import { C } from "../lib/tokens";
import { useDevice } from "../lib/motion";
import { Vignette, Glow, Headline, WipeLine, Eyebrow, PhoneFrame, LogoCorner } from "../lib/atoms";
import { FdBookScreen } from "../screens/FdScreens";

/**
 * 17s. Stripe-style left-device layout: device anchored left, copy right.
 * One camera move only — the entrance. Float begins after it lands.
 */
export const FeatureOne: React.FC = () => {
  const device = useDevice(24);
  return (
    <AbsoluteFill style={{ background: C.voidBase, flexDirection: "row", alignItems: "center" }}>
      <Glow tone="ice" size={820} x="30%" y="52%" delay={10} />
      <Vignette />
      <LogoCorner text={COPY.reveal.wordmark} />

      <div style={{ flex: "0 0 44%", display: "flex", justifyContent: "center" }}>
        <div style={device}>
          <PhoneFrame width={400}>
            <FdBookScreen delay={40} />
          </PhoneFrame>
        </div>
      </div>

      <div style={{ flex: 1, paddingRight: 140 }}>
        <Eyebrow text={COPY.featureOne.eyebrow} delay={66} exitAt={468} />
        <Headline
          text={COPY.featureOne.headline}
          delay={78}
          exitAt={468}
          style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 20 }}
        />
        <WipeLine text={COPY.featureOne.sub} delay={126} exitAt={468} style={{ marginTop: 24 }} />
      </div>
    </AbsoluteFill>
  );
};
