import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CINE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel } from "../lib/cinema";
import { DownloadScreen, ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 8 · 978–1043 · 2.2s
 * The card lifts off the panel and turns. The key rakes across its face
 * through the move — that travelling highlight is what makes a rectangle
 * read as an object with a surface.
 */
export const Detach: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.detach);
  const cam = useCamera(len, { z: [1.0, 1.05] });
  const p = at(frame, [0, len], [0, 1], EASE.outQuint);

  return (
    <AbsoluteFill>
      <Room keyX="50%" keyY="48%" />
      <Composite>
        <Plane depth={0.06} cam={cam} blur={5}>
          <div style={{ transform: "translateX(120px) scale(0.9)", opacity: 0.5 }}>
            <LitPanel bloom={0.4}>
              <DownloadScreen delay={-90} cardLeavesAt={0} />
            </LitPanel>
          </div>
        </Plane>

        <Plane depth={0.3} cam={cam}>
          <div
            style={{
              transform: `translate(${-200 + p * 40}px, ${-p * 46}px) scale(${1.55 + p * 0.1}) rotateY(${p * -16}deg) rotateZ(${p * -3}deg)`,
              transformStyle: "preserve-3d",
              position: "relative",
            }}
          >
            <ShareCard delay={-120} width={340} />
            {/* the rake */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 14,
                background: `linear-gradient(${105 + p * 40}deg, transparent ${18 + p * 45}%, ${CINE.keyHot}55 ${34 + p * 45}%, transparent ${52 + p * 45}%)`,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
