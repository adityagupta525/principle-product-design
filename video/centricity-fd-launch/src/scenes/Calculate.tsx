import React from "react";
import { AbsoluteFill } from "remotion";
import { COPY } from "../copy";
import { Ground, AccentCaption, Panel, Stage } from "../lib/atoms";
import { CalculatorScreen } from "../screens/AppScreens";

/** Beat 2 — 9s. The amount types itself in; six maturity figures resolve at once. */
export const Calculate: React.FC = () => (
  <AbsoluteFill>
    <Ground />
    <Stage caption={<AccentCaption caption={COPY.calculate.caption} delay={132} exitAt={244} tone="gain" />}>
      <Panel scale={1.0} delay={6} height={764}>
        <CalculatorScreen delay={34} />
      </Panel>
    </Stage>
  </AbsoluteFill>
);
