import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, EdgeFalloff } from "../lib/cinema";
import { ChatScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 10 · 1107–1172 · 2.2s
 * It lands. Macro push onto the partner's own name on the card — this is the
 * film's whole argument, so it is the only thing in focus and it is held.
 */
export const Land: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.land);
  const cam = useCamera(len, { z: [1.0, 1.13] });
  const nameGlow = at(frame, [22, 44], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room keyX="44%" keyY="50%" />
      <Composite>
        <Plane depth={0.12} cam={cam} style={{ justifyContent: "flex-start" }}>
          <div style={{ marginLeft: -420 }}>
            <Macro zoom={4.0} fx={230} fy={300}>
              <LitPanel bare>
                <ChatScreen delay={-30} landAt={0} />
              </LitPanel>
            </Macro>
          </div>
        </Plane>

        <EdgeFalloff side="right" at={52} />

        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 120 }}>
          <div style={{ width: 500 }}>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 22,
                letterSpacing: "0.2em",
                color: CINE.typeDim,
                opacity: at(frame, [10, 24], [0, 1]),
              }}
            >
              {COPY.share.sentByLabel.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: CINE.keyHot,
                marginTop: 12,
                textShadow: `0 0 ${nameGlow * 46}px ${CINE.key}88`,
                opacity: at(frame, [18, 34], [0, 1], EASE.outExpo),
                transform: `translateY(${at(frame, [18, 34], [26, 0], EASE.outExpo)}px)`,
              }}
            >
              {COPY.share.partnerName}
            </div>
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
