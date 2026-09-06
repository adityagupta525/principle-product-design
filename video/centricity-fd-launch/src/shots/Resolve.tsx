import React from "react";
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { hasLogo, logoSrc } from "../lib/logos";
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

  /**
   * The My FDs handset holds SHARP for 25 frames before it starts to go.
   *
   * It was dimming and defocusing from frame 0, which meant the one shot in
   * the film that shows the booked FD sitting in a real device never showed it
   * legibly — it existed only as a soft shape behind the lockup, and review
   * read that as the mockup being absent. 25 frames is 0.83s: long enough to
   * register the phone and the ACTIVE row, short enough that the end card
   * still gets 100 of its 115 frames.
   */
  const HOLD = 25;
  const dim = at(frame, [HOLD, HOLD + 55], [1, 0.05], EASE.outQuart);
  const lock = at(frame, [40, 70], [0, 1], EASE.outExpo);
  const kick = at(frame, [84, 106], [0, 1], EASE.outQuart);
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
          <div style={{ opacity: dim * out, filter: `blur(${at(frame, [HOLD, HOLD + 60], [0, 16], EASE.outQuart)}px)` }}>
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
            <DeviceProp scale={2.6} blur={22} opacity={at(frame, [44, 88], [0, 0.42], EASE.outQuart) * out} />
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
              {/* Real marks the moment they exist in public/logos; until then
                  the wordmarks the film has always carried. Heights are set,
                  widths follow the artwork, so neither mark is distorted. */}
              {hasLogo("centricity") ? (
                <Img src={logoSrc("centricity")} style={{ height: 30, display: "block" }} />
              ) : (
                <span>CENTRICITY</span>
              )}
              <span style={{ width: 1, height: 30, background: "rgba(236,231,225,0.32)" }} />
              {hasLogo("blostem") ? (
                <Img src={logoSrc("blostem")} style={{ height: 26, display: "block" }} />
              ) : (
                <span>{COPY.end.coBrand}</span>
              )}
            </div>

            <TypeCard
              caption={COPY.end.line}
              delay={58}
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
