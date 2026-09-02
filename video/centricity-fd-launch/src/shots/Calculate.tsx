import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard } from "../lib/cinema";
import { CalculatorScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 6 · 524–783 · 8.6s
 * The amount types itself in, then the six maturity figures resolve together.
 * The camera pushes a few percent across the whole shot and never stops — a
 * static frame here would read as a screenshot.
 */
export const Calculate: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.calculate);
  const cam = useCamera(len, { z: [1.0, 1.14], y: [0.5, -0.5] });
  // Frame travels from the amount field down to the resolved list.
  const fy = at(frame, [30, len - 20], [215, 560], EASE.inOut);
  const zoom = at(frame, [0, len], [5.6, 5.2], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room keyX="36%" keyY="46%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <div>
            <Macro zoom={zoom} fx={187} fy={fy}>
              <LitPanel height={764} bare>
                <CalculatorScreen delay={6} />
              </LitPanel>
            </Macro>
          </div>
        </Plane>

        {/* Caption sits over the vignette at the foot, so nothing crops the row. */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            background: "linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.55) 18%, transparent 34%)",
          }}
        >
          <div style={{ padding: "0 0 74px 120px" }}>
            <TypeCard caption={COPY.calculate.caption} delay={96} exitAt={len - 26} size={58} style={{ width: 620 }} />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
