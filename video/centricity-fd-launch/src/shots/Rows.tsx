import React from "react";
import { AbsoluteFill } from "remotion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 3 · 265–394 · 4.3s
 * Macro. Rows deal in one per beat with elastic overshoot. We are close enough
 * that only part of the list is in frame — the whole point of a macro insert is
 * that you never see the whole screen.
 */
export const Rows: React.FC = () => {
  const len = shotLen(SHOT.rows);
  const cam = useCamera(len, { z: [1.0, 1.07], y: [0.45, -0.45] });
  return (
    <AbsoluteFill>
      <Room offset={80} keyX="42%" keyY="48%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <Macro zoom={5.3} fx={187} fy={352}>
            <LitPanel bare>
              <CompareScreen delay={4} step={BEAT} />
            </LitPanel>
          </Macro>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
