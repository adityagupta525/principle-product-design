import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard } from "../lib/cinema";
import { CalculatorScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 6 · CALCULATE — "the system does the work."
 *
 * Compare proved the product understands. This proves it computes. The screen
 * already carries a real calculation — every row's maturity is
 * amount x (1 + rate)^tenure against that issuer's own rate and term — so the
 * shot's job is not to decorate arithmetic, it is to make the arithmetic
 * legible as a consequence:
 *
 *   REVEAL   0-18    the apparatus, at rest and already true: the investment
 *                    amount, the four quick-amount chips with the current one
 *                    lit, and the six FDs computed for it.
 *   INPUT    18/51/83  three taps, each landed ON a beat of the bed. A chip
 *                    lights — that is the whole input, and it is the product's
 *                    own control, not a borrowed slider.
 *   COMPUTE  +11f    the amount rolls to the new figure and all six maturities
 *                    and interests recompute against it, continuously. Nothing
 *                    spins, nothing loads: the numbers move because the input
 *                    moved, and they are arithmetically true at every frame.
 *   RESOLVE  94-129  the frame settles holding the INPUT and its OUTPUTS
 *                    together, so the last thing on screen is the reason the
 *                    figures are what they are.
 *
 * Fixed here: the previous index expression evaluated to -1 before frame 6, so
 * STEPS[-1] was undefined and the shot opened on "Rs NaN" with every row
 * reading NaN for six frames — visible in the shipped render.
 */

/** The four steps, in rupees — the chips' own values (Rs1L/5L/10L/25L). */
const STEPS = [100000, 500000, 1000000, 2500000];

/** Each tap lands on a beat of the measured grid, not near one. */
const TAPS = [18, 51, 83];
const ROLL = 11;
const SETTLED = TAPS[TAPS.length - 1] + ROLL; // 94

export const Calculate: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.calculate);
  const cam = useCamera(len, { z: [1.0, 1.16], y: [0.55, -0.55] });

  /* Which amount we are on, and how far the recompute has travelled. Step 0 is
     the resting state the shot opens in — already a real figure, never a gap. */
  let step = 0;
  for (let i = 0; i < TAPS.length; i++) if (frame >= TAPS[i]) step = i + 1;
  const from = STEPS[Math.max(0, step - 1)];
  const to = STEPS[step];
  const tapAt = step === 0 ? -999 : TAPS[step - 1];
  const roll = step === 0 ? 1 : at(frame, [tapAt, tapAt + ROLL], [0, 1], EASE.outQuart);
  const amount = from + (to - from) * roll;

  /* The screen answers the tap: a 3px dip that damps out over ~half a second.
     Felt, not seen — it is there so the input reads as a cause. */
  const lastTap = step === 0 ? -999 : TAPS[step - 1];
  const tapDip =
    at(frame, [lastTap, lastTap + 3], [0, 3], EASE.out) *
    (1 - at(frame, [lastTap + 3, lastTap + 14], [0, 1], EASE.outQuint));

  /* One restrained gesture, following the information: contextual wide while
     the apparatus is established, leaning in through the recomputes, then
     opening a touch to settle holding the input and its outputs together.
     No move is large enough for perceptual scale to be perceptible here
     (the widest ratio is 1.09x), so these stay linear — the result earns its
     authority from framing, hierarchy and hold, not from size. */
  const fy =
    frame < 18
      ? 236
      : frame < SETTLED
      ? at(frame, [18, SETTLED], [236, 286], EASE.inOut)
      : at(frame, [SETTLED, len], [286, 296], EASE.inOut);

  const zoom =
    frame < 18
      ? 2.62
      : frame < SETTLED
      ? at(frame, [18, SETTLED], [2.62, 2.86], EASE.inOut)
      : at(frame, [SETTLED, len], [2.86, 2.72], EASE.inOut);

  return (
    <AbsoluteFill>
      <Room offset={30} keyX="36%" keyY="46%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <div style={{ transform: `translateY(${tapDip}px)` }}>
            <Macro zoom={zoom} fx={187} fy={fy}>
              {/* Feather the panel's own vertical edges: at this framing they sit
                  inside the frame, and a bare LitPanel is a raw white rectangle
                  that would draw a hard step against the room. The mask lives in
                  panel space, so it holds at every zoom the shot passes through. */}
              <div
                style={{
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, #000 3.5%, #000 96.5%, transparent 100%)",
                  maskImage:
                    "linear-gradient(90deg, transparent 0%, #000 3.5%, #000 96.5%, transparent 100%)",
                }}
              >
                <LitPanel height={764} bare>
                  <CalculatorScreen amount={amount} activeChip={step} />
                </LitPanel>
              </div>
            </Macro>
          </div>
        </Plane>

        {/* Caption sits over the vignette at the foot, so nothing crops the row.
            It resolves only after the last recompute has settled — the statement
            confirms the computation, it does not narrate it. */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            background:
              "linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.55) 18%, transparent 34%)",
          }}
        >
          <div style={{ padding: "0 0 74px 120px" }}>
            <TypeCard
              caption={COPY.calculate.caption}
              delay={SETTLED + 2}
              size={TYPE.caption.fontSize}
              style={{ width: 620 }}
            />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
