import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, Plane, DevicePlate } from "../lib/cinema";
import { ChatScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 10 · 1107-1172 · 65f / 2.17s · LAND — "it reaches the person."
 *
 * The shortest shot in the film, and deliberately so: Detach is the card
 * leaving and Flight is the card travelling, so Land is only the last act of
 * that arc — the arrival and its confirmation. Everything it has to say has to
 * happen in one bar.
 *
 * What arrives is not a generic message. It is the SAME ShareCard the film has
 * been building — brand block, four issuers, and "Sent by: Ashish Gupta" — now
 * inside a WhatsApp bubble in Sneha Patel's thread, the same client the FD is
 * booked for in Book. The decision has become communication, and the artefact
 * is the evidence that it is the same decision.
 *
 *   RECIPIENT   0     the thread is already there — her name, "online", the
 *                     compose bar. The context exists before the message does.
 *   SEND        2     the card lifts out of the compose bar, on the existing
 *                     `send` cue, which Sfx() fires at SHOT.land[0] + 2.
 *   TRAVEL      2-20  it rises and settles into the thread, carrying a smear
 *                     proportional to its own velocity and going crisp on
 *                     arrival. Origin is the compose bar's send corner; the
 *                     destination is the thread. Nothing teleports.
 *   LAND        22-36 her line follows the card, as a real send does.
 *   RESOLVE     32/42/52  sent -> delivered -> read, and the camera has already
 *                     stopped, so the confirmation is read on a still frame.
 *
 * Fixed here: the visual send launched at frame 6 while the send cue fires at
 * frame 2 — the sound preceded the picture by four frames. The chat screen also
 * faded up across frames 0-18 while the bubble was already flying, so the
 * recipient never existed before the message did: the thread, the client's name
 * and the message all materialised at once. And the camera pushed and trucked
 * for all 65 frames, so the read confirmation never landed on a still frame.
 */

/** The send lands on the cue Sfx() already fires at SHOT.land[0] + 2. */
const SEND = 2;
/** The camera's one gesture is done by here; the resolve is still. */
const CAM_REST = 40;

export const Land: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.land);

  /* ONE motivated gesture: a gentle push in with the arriving card, which stops
     before the ticks resolve. The confirmation is the thing the shot exists to
     show, and it is read on a frame that is not moving. */
  const cam = {
    z: at(frame, [0, CAM_REST], [1.04, 1.13], EASE.outQuart),
    x: at(frame, [0, CAM_REST], [0.25, -0.1], EASE.outQuart),
    y: 0,
  };

  return (
    <AbsoluteFill>
      <Room offset={60} keyX="42%" keyY="50%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <div style={{ transform: "translateX(-300px)" }}>
            <DevicePlate scale={3.0} spillRadius={620}>
              {/* The thread is already open at frame 0 — a hard cut into an
                  existing conversation, not a screen assembling itself. Only
                  the message moves, because only the message changed. */}
              <ChatScreen delay={-30} landAt={SEND} />
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
