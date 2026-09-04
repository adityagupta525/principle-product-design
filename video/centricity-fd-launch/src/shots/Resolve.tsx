import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, DevicePlate, TypeCard, DeviceProp } from "../lib/cinema";
import { BookScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 12 · 1431-1620 · 189f / 6.30s · RESOLVE — the conclusion, and the seam.
 *
 * This is a 54-second booth loop, so the last frame is not an end frame: it is
 * a hand-back to the first. The shot opens on the OUTCOME already complete —
 * the booked FD sitting in My FDs, Sneha Patel active at 8.25% — lets it dim
 * and defocus, brings up the co-brand lockup and the film's one statement, and
 * holds. Then the room returns to the state Ask opens in, and the loop turns.
 *
 * The hand-back was measured against the film's actual first frame and was
 * wrong. It brought the NEXT pass's chat up to full brightness with the
 * client's message already delivered — but frame 0 of the film is an empty,
 * dim room: Ask's phone is at opacity 0 until its own frames 0-16, and its
 * room is the "shaft" plate at lift 0.72. So the loop cut from a lit phone
 * (peak luma 255) to an empty room (peak luma 92) and measured 25.9 — the
 * order of a hard cut in this film, not a seam. Ask already stages its own
 * entrance; Resolve's job is only to give it the room to enter.
 *
 * So the phone is gone from the tail, the statement holds 67 frames instead of
 * 51, and the room lifts back toward Ask's opening level over the last third.
 */
export const Resolve: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.resolve);
  const cam = useCamera(len, { z: [1.1, 0.94] });

  const dim = at(frame, [0, 62], [1, 0.05], EASE.outQuart);
  const lock = at(frame, [26, 56], [0, 1], EASE.outExpo);
  const kick = at(frame, [70, 92], [0, 1], EASE.outQuart);
  /* The hand-back: the conclusion holds, then clears, and the last frames are
     the room alone — which is what Ask opens on and enters into. */
  const out = at(frame, [len - 30, len - 8], [1, 0], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room
        offset={20}
        keyX="50%"
        keyY="50%"
        /* Dim for the statement, then back up toward the 0.72 Ask opens on, so
           the loop turns over between two lit rooms rather than across a step. */
        lift={
          frame < 150
            ? at(frame, [0, 150], [1, 0.35], EASE.outQuart)
            : at(frame, [150, len], [0.35, 0.62], EASE.inOut)
        }
      />
      <Composite grain={0.07}>
        <Plane depth={0.1} cam={cam}>
          <div style={{ opacity: dim * out, filter: `blur(${at(frame, [0, 70], [0, 16], EASE.outQuart)}px)` }}>
            <DevicePlate scale={2.5} on={dim} spill={dim} spillRadius={560}>
              <BookScreen tapAt={-400} doneAt={-300} />
            </DevicePlate>
          </div>
        </Plane>

        {/* A real object in the room behind the lockup. The end card is the one
            place the film is allowed to be still, and a void with type in it is
            not a room — this gives the type something to sit in front of. */}
        <Plane depth={0.04} cam={cam}>
          <div style={{ transform: "translate(60px, 40px)" }}>
            <DeviceProp scale={2.6} blur={22} opacity={at(frame, [30, 74], [0, 0.42], EASE.outQuart) * out} />
          </div>
        </Plane>

        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: out, textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 26,
                opacity: lock,
                ...TYPE.lockup,
                color: CINE.type,
              }}
            >
              <span>CENTRICITY</span>
              <span style={{ width: 1, height: 30, background: "rgba(236,231,225,0.32)" }} />
              <span>{COPY.end.coBrand}</span>
            </div>

            <TypeCard
              caption={COPY.end.line}
              delay={44}
              size={TYPE.statement.fontSize}
              align="center"
              style={{ marginTop: 40, marginLeft: "auto", marginRight: "auto" }}
            />

            <div
              style={{
                marginTop: 34,
                ...TYPE.micro,
                letterSpacing: "0.26em",
                color: CINE.key,
                opacity: kick,
              }}
            >
              {COPY.end.tagline}
            </div>
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
