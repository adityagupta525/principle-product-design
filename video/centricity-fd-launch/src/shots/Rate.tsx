import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard, EdgeFalloff } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 4 · 394–459 · 2.2s
 * Extreme close on the winning rate. Everything else falls to blur, so the
 * green reads as a light source rather than a colour. Type sits in the void
 * to the right — never over the product.
 */
export const Rate: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.rate);
  const cam = useCamera(len, { z: [1.0, 1.34] });
  const glow = at(frame, [0, 14], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room offset={120} keyX="34%" keyY="50%" />
      <Composite>
        <Plane depth={0.12} cam={cam} style={{ justifyContent: "flex-start" }}>
          <div style={{ marginLeft: -420 }}>
            <Macro zoom={5.0} fx={250} fy={507}>
              <LitPanel bare>
                <CompareScreen delay={-300} focusAt={-40} />
              </LitPanel>
            </Macro>
          </div>
        </Plane>

        <EdgeFalloff side="right" at={54} />

        {/* The rate's own bloom, sitting in the room rather than on the panel. */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "50%",
              width: 330,
              height: 200,
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(closest-side, rgba(18,183,106,0.16), transparent 74%)",
              filter: "blur(52px)",
              opacity: glow,
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 130 }}>
          <TypeCard caption={COPY.compare.caption} delay={8} size={58} align="left" style={{ width: 470 }} />
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
