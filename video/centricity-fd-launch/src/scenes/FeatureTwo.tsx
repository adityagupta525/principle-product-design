import React from "react";
import { AbsoluteFill } from "remotion";
import { COPY } from "../copy";
import { C } from "../lib/tokens";
import { useDevice } from "../lib/motion";
import { Vignette, Glow, Headline, WipeLine, Eyebrow, PhoneFrame, LogoCorner } from "../lib/atoms";
import { FdCompareScreen } from "../screens/FdScreens";

/** 17s. Mirrored composition — copy left, device right. Density is the message. */
export const FeatureTwo: React.FC = () => {
  const device = useDevice(24);
  return (
    <AbsoluteFill style={{ background: C.voidBase, flexDirection: "row", alignItems: "center" }}>
      <Glow tone="ice" size={820} x="70%" y="50%" delay={10} />
      <Vignette />
      <LogoCorner text={COPY.reveal.wordmark} />

      <div style={{ flex: 1, paddingLeft: 140 }}>
        <Eyebrow text={COPY.featureTwo.eyebrow} delay={66} exitAt={468} />
        <Headline
          text={COPY.featureTwo.headline}
          delay={78}
          exitAt={468}
          style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 20 }}
        />
        <WipeLine text={COPY.featureTwo.sub} delay={126} exitAt={468} style={{ marginTop: 24, maxWidth: 560 }} />
      </div>

      <div style={{ flex: "0 0 44%", display: "flex", justifyContent: "center" }}>
        <div style={device}>
          <PhoneFrame width={400}>
            <FdCompareScreen delay={40} />
          </PhoneFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};
