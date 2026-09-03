import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, DevicePlate, TypeCard, DeviceProp } from "../lib/cinema";
import { BookScreen, AskChatScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 12 · 1431–1620 · 6.3s
 * Pull back, and hand the film back to its own first frame. A loop that
 * resolves into black reads as broken, so the panel dims, the lockup fades —
 * never scales — and the next client's message is already arriving as the loop
 * turns over. The seam is the idea, not a defect.
 */
export const Resolve: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.resolve);
  const cam = useCamera(len, { z: [1.1, 0.94] });

  const dim = at(frame, [0, 62], [1, 0.05], EASE.outQuart);
  const lock = at(frame, [26, 56], [0, 1], EASE.outExpo);
  const kick = at(frame, [70, 92], [0, 1], EASE.outQuart);
  // The hand-back: everything goes, and the first bubble of the next pass fades up.
  const out = at(frame, [len - 46, len - 12], [1, 0], EASE.outQuart);
  const nextAsk = at(frame, [len - 30, len - 2], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room offset={20} keyX="50%" keyY="50%" lift={at(frame, [0, len], [1, 0.35], EASE.outQuart)} />
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
                fontFamily: FONT.brand,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.22em",
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
              size={82}
              align="center"
              style={{ marginTop: 40, marginLeft: "auto", marginRight: "auto" }}
            />

            <div
              style={{
                marginTop: 34,
                fontFamily: FONT.display,
                fontSize: 15,
                letterSpacing: "0.26em",
                color: CINE.key,
                opacity: kick,
              }}
            >
              {COPY.end.tagline}
            </div>
          </div>
        </AbsoluteFill>

        {/* the loop turning over — the next client, same thread */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: nextAsk, transform: `scale(0.84)` }}>
            <DevicePlate scale={2.3} spill={0.5} spillRadius={520}>
              <AskChatScreen beats={[-999, 9999, 9999]} />
            </DevicePlate>
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
