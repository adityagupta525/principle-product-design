import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 5 · 459–524 · 2.2s
 * The pull. Focus travels outward from the rate to the whole table — the one
 * shot in the film that shows a complete screen, which is what makes it read
 * as a reveal rather than a default.
 */
export const Table: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.table);
  const cam = useCamera(len, { z: [1.0, 1.04] });
  const zoom = at(frame, [0, len], [5.0, 1.02], EASE.outQuart);
  const fx = at(frame, [0, len], [286, 187], EASE.outQuart);
  const fy = at(frame, [0, len], [507, 406], EASE.outQuart);
  const blur = at(frame, [0, 22], [5, 0], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room keyX="40%" keyY="48%" />
      <Composite>
        <Plane depth={0.1} cam={cam}>
          {/* The pull crosses the boundary between being inside the screen and
              seeing the device, so the chrome fades in as the crop opens out. */}
          <div style={{ filter: `blur(${blur}px)`, position: "relative" }}>
            <Macro zoom={zoom} fx={fx} fy={fy}>
              <div style={{ position: "relative" }}>
                <div style={{ opacity: at(frame, [len * 0.45, len], [0, 1], EASE.outQuart) }}>
                  <LitPanel bloom={at(frame, [0, len], [0.3, 1.15], EASE.outQuart)}>
                    <CompareScreen delay={-300} focusAt={-40} />
                  </LitPanel>
                </div>
                <div style={{ position: "absolute", inset: 0, opacity: at(frame, [len * 0.45, len], [1, 0], EASE.outQuart) }}>
                  <LitPanel bare>
                    <CompareScreen delay={-300} focusAt={-40} />
                  </LitPanel>
                </div>
              </div>
            </Macro>
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
