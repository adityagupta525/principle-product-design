import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY, ISSUERS } from "../copy";
import { C, CINE, FONT, TYPE } from "../lib/tokens";
import { at, atScale, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard, Smear } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 3 · COMPARE — "the product understands."
 *
 * The film's intelligence proof: many possibilities → one meaningful signal →
 * understanding. It is one take, and it is staged in four causal acts rather
 * than one simultaneous animation:
 *
 *   REVEAL     0–92    six issuers deal in, one per beat, and the frame travels
 *                      down the list to meet each one — ending centred on the
 *                      row that turns out to be the answer.
 *   FOCUS      99–121  RECOGNITION. The screen's own focus mechanic identifies
 *                      the winner: it stays sharp and gains a hair of scale
 *                      while every competing row blurs and dims back. The
 *                      camera is almost still here — this is the beat where the
 *                      product is understanding, and it needs room to read.
 *   (hold)     121–131 nothing new starts. Deliberate stillness before the act.
 *   TRANSFORM  131–157 THE LIFT-OUT, on the bar-7 downbeat. The winning rate
 *                      DETACHES FROM ITS OWN ROW: it starts at exactly the
 *                      position and size it occupies inside the screen, then
 *                      grows on perceptual scale into the frame's protagonist
 *                      while the list recedes behind it. It is extracted, not
 *                      faded in somewhere else — that is what makes the move
 *                      read as caused by understanding rather than decorated.
 *   RESOLVE    157–259 the conclusion holds, stable and readable, with only a
 *                      breath of drift. The caption arrives after the number.
 *
 * Nothing is invented: every figure is the screen's own data, and the lifted
 * number is literally the row's rate, continued.
 */

const BEST = ISSUERS.find((i) => i.name === "Utkarsh SF Bank")!;

/* Where the winning rate actually sits inside the 375x812 screen, measured off
   CompareScreen: the rows container starts at y231 with an 80px pitch, and the
   rate column's centre sits at x310. Utkarsh is row index 4. These are the
   anchor for the extraction — the lift begins on the pixel the rate occupies. */
const PANEL_FX = 187;
const RATE_X = 310;
const RATE_Y = 231 + 4 * 80 + 36;
const RATE_PX = 12; // T.rate fontSize, the product DS size of that figure

export const Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.compare);
  const cam = useCamera(len, { z: [1.0, 1.2], x: [0.5, -0.5] });

  // Rows deal one per beat; the frame travels to meet each one and comes to
  // rest on the winner, so the camera arrives at the answer before we do.
  const ROW_STEP = Math.round(BEAT);
  const fy =
    at(frame, [4, 96], [300, RATE_Y], EASE.inOut) + at(frame, [96, len], [0, 18], EASE.inOut);

  // RECOGNITION, then the act — the lift lands on the bar-7 downbeat (131).
  const FOCUS = 99;
  const LIFT = 131;
  const LIFT_LEN = 26;
  const p = at(frame, [LIFT, LIFT + LIFT_LEN], [0, 1], EASE.outExpo);
  const pPrev = at(frame - 1, [LIFT, LIFT + LIFT_LEN], [0, 1], EASE.outExpo);

  // One motivated gesture: the travel down the list, and the frame opening as
  // the number comes forward. No orbit, no sweep.
  const zoom = at(frame, [0, len], [4.5, 3.6], EASE.outQuart) * (1 - p * 0.26);

  /* The rate's LIVE position and size on canvas, derived from the same numbers
     the Macro uses, so the lift starts welded to the panel rather than near it.
       Macro:  scale(zoom) translate(187.5-fx, 406-fy)  →  (px-fx, py-fy)*zoom
       Plane:  translate(cam.x*12) scale(cam.z)          at depth 0.12          */
  const rateDX = (RATE_X - PANEL_FX) * zoom * cam.z + cam.x * 12;
  const rateDY = (RATE_Y - fy) * zoom * cam.z;
  const rateScale = (RATE_PX * zoom * cam.z) / TYPE.dataMax.fontSize;

  // Where the conclusion resolves: right of centre, on its own dark ground,
  // with the receded list still legible to its left as the context it came from.
  const HERO_DX = 250;
  const HERO_DY = -60;
  const hx = rateDX + (HERO_DX - rateDX) * p;
  const hy = rateDY + (HERO_DY - rateDY) * p + at(frame, [LIFT + LIFT_LEN, len], [0, -14], EASE.inOut);
  // Perceptual, not geometric: the figure gains authority, not just pixels.
  const heroScale = atScale(frame, [LIFT, LIFT + LIFT_LEN], [rateScale, 1], EASE.outExpo);

  // Smear only while it is genuinely moving; crisp the moment it lands.
  const dp = p - pPrev;
  const vx = dp * (HERO_DX - rateDX);
  const vy = dp * (HERO_DY - rateDY);

  return (
    <AbsoluteFill>
      <Room offset={80} keyX="40%" keyY="48%" />
      <Composite>
        {/* the list — context, which recedes in priority rather than leaving */}
        <Plane depth={0.12} cam={cam} blur={p * 8}>
          <div style={{ opacity: 1 - p * 0.56, transform: `translateX(${-p * 170}px)` }}>
            <Macro zoom={zoom} fx={PANEL_FX} fy={fy}>
              <LitPanel bare>
                <CompareScreen delay={4} step={ROW_STEP} focusAt={FOCUS} />
              </LitPanel>
            </Macro>
          </div>
        </Plane>

        {/* a ground for the conclusion — the panel behind is white, and cream
            type on white is not type. Darkens the side the figure resolves to. */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(276deg, rgba(10,10,12,0.94) 0%, rgba(10,10,12,0.88) 26%, rgba(10,10,12,0.55) 52%, rgba(10,10,12,0.16) 76%, transparent 100%)",
            opacity: p,
          }}
        />

        {/* THE LIFT-OUT — the row's own rate, continued */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: at(frame, [LIFT - 1, LIFT + 1], [0, 1]),
          }}
        >
          <Smear vx={vx} vy={vy} gain={0.4} max={20}>
            <div
              style={{
                transform: `translate(${hx}px, ${hy}px) scale(${heroScale})`,
                transformOrigin: "center center",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  ...TYPE.dataMax,
                  lineHeight: 0.9,
                  color: C.gain,
                  fontVariantNumeric: "tabular-nums",
                  // the glow arrives with the authority, not before it
                  textShadow: `0 0 ${90 * p}px ${C.gain}55`,
                }}
              >
                {BEST.rate}
              </div>
              {/* the issuer, in the product's own voice — held back until the
                  figure is clear of the row, so the detachment stays clean */}
              <div
                style={{
                  fontFamily: FONT.app,
                  fontSize: TYPE.sub.fontSize,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: CINE.type,
                  marginTop: 14,
                  opacity: at(frame, [LIFT + 14, LIFT + LIFT_LEN], [0, 1], EASE.out),
                }}
              >
                {BEST.short} <span style={{ color: CINE.typeDim }}>· {BEST.tenure}</span>
              </div>
            </div>
          </Smear>
        </AbsoluteFill>

        {/* the statement resolves after the number has landed */}
        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 96 }}>
          <div style={{ width: 430, transform: "translateY(210px)" }}>
            <TypeCard
              caption={COPY.compare.caption}
              delay={LIFT + 35}
              size={TYPE.caption.fontSize}
              align="left"
            />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
