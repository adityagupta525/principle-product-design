import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CINE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, TypeCard } from "../lib/cinema";
import { DownloadScreen, ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";
import { COPY } from "../copy";
import { TYPE } from "../lib/tokens";

/**
 * Shot 8 · 978–1043 · 2.2s
 * The card lifts off the panel and turns. The key rakes across its face
 * through the move — that travelling highlight is what makes a rectangle
 * read as an object with a surface.
 *
 * The card travels LEFT of centre through the whole shot, so the right third
 * is the void this film always puts type into. It now carries the film's one
 * statement of who the product is for — placed here because this is the frame
 * where the artefact leaves the partner and goes to the client, which is the
 * distributor's job made visible. Flight, the next shot, stays wordless.
 */
export const Detach: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.detach);
  const cam = useCamera(len, { z: [1.0, 1.05] });
  const p = at(frame, [0, len], [0, 1], EASE.outQuint);

  return (
    <AbsoluteFill>
      <Room offset={130} keyX="50%" keyY="48%" />
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

        {/* Right void. Enters at 6 so it is fully set by 24 and holds a full
            second before the cut — the shot is only 65 frames. */}
        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 104 }}>
          <div style={{ width: 400, transform: "translateY(150px)" }}>
            <TypeCard
              caption={COPY.detach.caption}
              delay={6}
              size={TYPE.caption.fontSize}
              align="left"
            />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
