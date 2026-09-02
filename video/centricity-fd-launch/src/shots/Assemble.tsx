import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel } from "../lib/cinema";
import { DownloadScreen, ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 7 · 783–978 · 6.5s
 * The panel recedes and the card builds in the foreground plane, strip by
 * strip. Two planes at different depths and different focus — this is where
 * the film's depth is most visible.
 */
export const Assemble: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.assemble);
  const cam = useCamera(len, { z: [1.0, 1.07], x: [-0.4, 0.4] });
  // Focus travels from the panel behind to the card in front.
  const rack = at(frame, [26, 70], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room keyX="46%" keyY="46%" />
      <Composite>
        <Plane depth={0.07} cam={cam} blur={rack * 6}>
          <div style={{ transform: "translateX(140px) scale(0.92)", opacity: 1 - rack * 0.35 }}>
            <LitPanel bloom={0.7}>
              <DownloadScreen delay={-40} cardLeavesAt={9999} />
            </LitPanel>
          </div>
        </Plane>

        <Plane depth={0.3} cam={cam} blur={(1 - rack) * 7}>
          <div style={{ transform: "translateX(-230px) scale(1.55)" }}>
            <ShareCard delay={30} width={340} />
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
