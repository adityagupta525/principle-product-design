import React from "react";
import { AbsoluteFill } from "remotion";
import { COPY } from "../copy";
import { TYPE } from "../lib/tokens";
import { useEnter } from "../lib/motion";
import { Ground, TileField, AccentCaption, Panel, Stage } from "../lib/atoms";
import { CompareScreen } from "../screens/AppScreens";

/**
 * Beat 1 — 11s. Opens on the reel's floating-tile field with the hook lines,
 * then the tiles clear and the Compare screen rises: rows populate, the best
 * rate stays sharp while the rest blur back.
 */
export const Compare: React.FC = () => {
  const l1 = useEnter(8, 60);
  const l2 = useEnter(22, 68);
  const l3 = useEnter(36, 76);

  return (
    <AbsoluteFill>
      <Ground />
      <TileField count={10} />

      {/* Hook — three short lines, then gone */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...TYPE.hook, textAlign: "center", lineHeight: 1.3 }}>
          <div style={l1}>{COPY.compare.hook[0]}</div>
          <div style={l2}>{COPY.compare.hook[1]}</div>
          <div style={l3}>{COPY.compare.hook[2]}</div>
        </div>
      </AbsoluteFill>

      {/* Product */}
      <Stage caption={<AccentCaption caption={COPY.compare.caption} delay={252} exitAt={318} />}>
        <Panel scale={1.0} delay={96} height={812}>
          <CompareScreen delay={124} focusAt={244} />
        </Panel>
      </Stage>
    </AbsoluteFill>
  );
};
