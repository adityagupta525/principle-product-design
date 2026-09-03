import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY, ISSUERS } from "../copy";
import { C, CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard, Smear } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Bars 5-9 · 8.6s · ONE TAKE.
 *
 * Was three shots — Rows, Rate, Table — and the audit found Rate 95% still,
 * Rows 72%. Each front-loaded its animation and then sat there. Three ideas
 * that were really one idea cut into thirds.
 *
 * Now it is one idea, stated once, with room: SIX ISSUERS, ONE SCREEN, ONE
 * WINNER. The camera travels down the list as the rows arrive, so the move and
 * the content are coupled rather than competing — each row lands near frame
 * centre as the frame reaches it. When it gets to the best rate, the figure
 * lifts out of the screen and holds in front of it at ten times its size,
 * which is ref1's move at 15.6-16.8s: the device stops being a container and
 * becomes a stage.
 *
 * Nothing here stops. The rows arrive on the beat, the camera never rests, and
 * the lifted figure keeps drifting after it lands.
 */

const BEST = ISSUERS.find((i) => i.name === "Utkarsh SF Bank")!;

export const Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.compare);
  const cam = useCamera(len, { z: [1.0, 1.2], x: [0.5, -0.5] });

  // Rows deal in one per beat; the frame travels to meet each one.
  const ROW_STEP = Math.round(BEAT);
  const lastRow = 4 + ROW_STEP * (ISSUERS.length - 1);

  // The travel is coupled to the deal, then keeps easing after it.
  const fy = at(frame, [4, lastRow + 20], [300, 545], EASE.inOut) + at(frame, [lastRow + 20, len], [0, 26], EASE.inOut);

  // The lift: the winning rate leaves the screen and comes forward.
  const LIFT = lastRow + 26;
  const lift = at(frame, [LIFT, LIFT + 26], [0, 1], EASE.outExpo);
  const zoom = at(frame, [0, len], [4.5, 3.4], EASE.outQuart) * (1 - lift * 0.34);

  const liftDrift = at(frame, [LIFT, len], [0, -46], EASE.inOut);
  // the figure keeps opening after it lands, so the hold is never a stop
  const settle = at(frame, [LIFT + 26, len], [0, 0.12], EASE.inOut);
  const vy = (at(frame, [LIFT, LIFT + 26], [0, 1], EASE.outExpo) -
              at(frame - 1, [LIFT, LIFT + 26], [0, 1], EASE.outExpo)) * 260;

  return (
    <AbsoluteFill>
      <Room offset={80} keyX="40%" keyY="48%" />
      <Composite>
        {/* the device, softening as the figure comes forward */}
        <Plane depth={0.12} cam={cam} blur={lift * 11}>
          <div style={{ opacity: 1 - lift * 0.66, transform: `translateX(${lift * 360 + settle * 620}px)` }}>
            <Macro zoom={zoom} fx={187} fy={fy}>
              <LitPanel bare>
                <CompareScreen delay={4} step={ROW_STEP} focusAt={LIFT - 8} />
              </LitPanel>
            </Macro>
          </div>
        </Plane>

        {/* a ground for the lifted figure — the panel behind it is white and
            fills the frame, and cream type on white is not type */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(96deg, rgba(10,10,12,0.94) 0%, rgba(10,10,12,0.88) 26%, rgba(10,10,12,0.55) 52%, rgba(10,10,12,0.16) 76%, transparent 100%)",
            opacity: lift,
          }}
        />

        {/* the winning rate, lifted out and held at ten times its size */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: lift }}>
          <Smear vy={vy} gain={0.5} max={26}>
            <div
              style={{
                transform: `translate(-470px, ${liftDrift}px) scale(${0.82 + lift * 0.18 + settle})`,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.data,
                  fontSize: 210,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                  color: C.gain,
                  fontVariantNumeric: "tabular-nums",
                  textShadow: `0 0 90px ${C.gain}55`,
                }}
              >
                {BEST.rate}
              </div>
              <div
                style={{
                  fontFamily: FONT.app,
                  fontSize: 27,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: CINE.type,
                  marginTop: 14,
                }}
              >
                {BEST.short} <span style={{ color: CINE.typeDim }}>· {BEST.tenure}</span>
              </div>
            </div>
          </Smear>
        </AbsoluteFill>

        <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", paddingLeft: 160 }}>
          <div style={{ marginTop: 430 }}>
            <TypeCard caption={COPY.compare.caption} delay={LIFT + 16} size={50} align="left" style={{ width: 420 }} />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
