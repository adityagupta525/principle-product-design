import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard } from "../lib/cinema";
import { CalculatorScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 6 · the calculator, driven.
 *
 * ref1 @18.8-20.0 drags a control while the figure counts $218 -> $484 in
 * 0.2s steps, and the whole card scales up as the value rises: the push IS the
 * emphasis. Our product has no slider, so this uses the control it actually
 * has — the ₹1L / ₹5L / ₹10L / ₹25L quick chips off the real Figma screen
 * (node 208:787). A chip lights on every other beat, the amount rolls to it,
 * and all six maturity figures recompute against their own rate and tenure, so
 * the arithmetic is true at every step rather than four hand-written states.
 *
 * That is a better beat than a borrowed slider would have been: it is the
 * product doing the one thing this screen exists to do.
 */

/** The four steps, in rupees — the chips' own values. */
const STEPS = [100000, 500000, 1000000, 2500000];

export const Calculate: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.calculate);
  const cam = useCamera(len, { z: [1.0, 1.16], y: [0.55, -0.55] });

  // A step every other beat, so the taps land on the track rather than near it.
  const STEP = BEAT * 2;
  const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor((frame - 6) / STEP) + 1) - 1);
  const nextIdx = Math.min(STEPS.length - 1, idx + 1);
  const tapAt = 6 + idx * STEP;

  // The roll: 11 frames of digits catching up, then rest. Fast enough to read
  // as a response to the tap, slow enough that the figures are legible moving.
  const roll = at(frame, [tapAt, tapAt + 11], [0, 1], EASE.outQuart);
  const amount = idx === 0 && frame < 6 ? STEPS[0] : STEPS[Math.max(0, idx - 1)] + (STEPS[idx] - STEPS[Math.max(0, idx - 1)]) * roll;

  // The push tracks the money: each step closes the frame a little further.
  const growth = (idx + roll * 0) / (STEPS.length - 1);
  // Wide enough to hold the amount field, the chips and three rows at once —
  // the recompute is the shot, and a crop that shows one row at a time hides
  // exactly the thing the beat exists to prove.
  const zoom = at(frame, [0, len], [2.72, 3.02], EASE.outQuart) * (1 + growth * 0.03);
  const fy = at(frame, [10, len - 14], [228, 276], EASE.inOut);

  return (
    <AbsoluteFill>
      <Room offset={30} keyX="36%" keyY="46%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <Macro zoom={zoom} fx={187} fy={fy}>
            <LitPanel height={764} bare>
              <CalculatorScreen amount={amount} activeChip={frame < 6 ? -1 : idx} />
            </LitPanel>
          </Macro>
        </Plane>

        {/* Caption sits over the vignette at the foot, so nothing crops the row. */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            background: "linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.55) 18%, transparent 34%)",
          }}
        >
          <div style={{ padding: "0 0 74px 120px" }}>
            <TypeCard caption={COPY.calculate.caption} delay={96} exitAt={len - 26} size={58} style={{ width: 620 }} />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
