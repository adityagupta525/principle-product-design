import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, DevicePlate } from "../lib/cinema";
import { ChatScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 10 · it sends.
 *
 * The card the film just built arrives where it was always going: the client's
 * WhatsApp. Shown in the real device so the send is unmistakable — the bubble
 * lifts out of the compose bar into the thread, and the tick evolves sent →
 * delivered → read while the camera pushes gently in. The whole argument of
 * the film is that last line on the card — "Sent by: Ashish Gupta" — so the
 * caption names it, but the WhatsApp send is the thing you watch happen.
 */
export const Land: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.land);
  const cam = useCamera(len, { z: [1.04, 1.14], x: [0.3, -0.3] });

  return (
    <AbsoluteFill>
      <Room offset={60} keyX="42%" keyY="50%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <div style={{ transform: "translateX(-300px)" }}>
            <DevicePlate scale={3.0} spillRadius={620}>
              {/* send launches at frame 6, ticks evolve through the shot */}
              <ChatScreen delay={0} landAt={6} />
            </DevicePlate>
          </div>
        </Plane>

        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 120 }}>
          <div style={{ width: 460 }}>
            <div
              style={{
                ...TYPE.label,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: CINE.typeDim,
                opacity: at(frame, [10, 24], [0, 1]),
              }}
            >
              {COPY.share.sentByLabel.toUpperCase()}
            </div>
            <div
              style={{
                ...TYPE.payoff,
                color: CINE.keyHot,
                lineHeight: 1.0,
                marginTop: 12,
                textShadow: `0 0 ${at(frame, [40, 60], [0, 1], EASE.outQuart) * 46}px ${CINE.key}88`,
                opacity: at(frame, [40, 54], [0, 1], EASE.outExpo),
                transform: `translateY(${at(frame, [40, 54], [24, 0], EASE.outExpo)}px)`,
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
