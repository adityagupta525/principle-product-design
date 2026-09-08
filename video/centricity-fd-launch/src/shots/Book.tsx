import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { TYPE } from "../lib/tokens";
import { at, atScale, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Macro, TypeCard, EdgeFalloff } from "../lib/cinema";
import { BookScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 11 · BOOK — "intelligence becomes action."
 *
 * Ignite was the product waking. This is the product ACTING, so it is a
 * different register entirely: no device treatment, no copper spill, no
 * aberration, no camera kick. We are inside the interface, on a lit panel in
 * the dark, and the only thing happening is a decision being executed.
 *
 * The shot was a montage of SEVEN equal 32-frame hard cuts, each re-mounting
 * the room and restarting the same canned push. Three faults followed from
 * that: the cadence was metronomic (equal cuts read as even, not composed);
 * causality was severed (the press lived in one cut, its consequence in the
 * next); and the seven beats covered only 0–225 of a 259-frame shot, so the
 * last 33 frames rendered flat near-black — 1.10s of measured dead air.
 *
 * It is now ONE CONTINUOUS TAKE. Nothing cuts. The camera makes a single
 * motivated arc — it tightens down THROUGH the action, then opens to receive
 * the result — and the interface does the rest, at its own timing:
 *
 *   RECOMMENDATION  0–64    the sheet, calm. Issuer, rate, client, the CTA.
 *                           Nothing animates; hierarchy does the talking.
 *   EXECUTE         64      the CTA presses, ON the existing tick (f64).
 *   PREPARE         72–96   the three checks resolve at the product's own
 *                           12-frame rhythm; the last lands on the tick at f96.
 *   CONFIRM         155–171 the sheet dismisses and the result arrives exactly
 *                           on the existing chime (f160). Everything else quiets.
 *   RESOLVE         171–258 the booked FD joins My FDs as an ACTIVE row, the
 *                           statement resolves AFTER the action, and the frame
 *                           holds — deliberate stillness, with content in it.
 *
 * One BookScreen mount for the whole take, so the press and its consequence
 * are the same continuous event rather than two shots that merely follow.
 */

/** The action lands on the existing SFX tick; the result on the existing chime. */
const PRESS = Math.round(BEAT * 2) * 2; // 64 — tick
const DONE = Math.round(BEAT * 2) * 5; // 160 — chime

export const Book: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.book);

  // A subtle depth breath under the move — one plane, felt not seen.
  const cam = useCamera(len, { z: [1.0, 1.04] });

  /**
   * ONE motivated arc, piecewise but continuous (each segment starts where the
   * last ended, and at() clamps): establish → move toward the action → release
   * onto the outcome. The release is a genuinely large scale change (2.46→1.52,
   * a 1.6× ratio), so it — and only it — runs on perceptual scale.
   */
  const zoom =
    frame < PRESS
      ? at(frame, [0, PRESS], [1.95, 2.28], EASE.inOut)
      : frame < 100
      ? at(frame, [PRESS, 100], [2.28, 2.52], EASE.out)
      : frame < 140
      ? at(frame, [100, 140], [2.52, 2.46], EASE.inOut)
      : frame < 190
      ? atScale(frame, [140, 190], [2.46, 1.62], EASE.inOut)
      : at(frame, [190, len], [1.62, 1.56], EASE.inOut);

  /**
   * Vertical travel, in 375x812 screen space: the recommendation block, down to
   * the CTA, down to the checklist, then up and open onto the result. The
   * success payload sits high — the tick lands at y112 and the booked FD row
   * ends at y440 — so the release resolves on y262, not on the sheet's old
   * position, or the tick crops off the top and the frame fills with empty.
   */
  const fy =
    frame < PRESS
      ? at(frame, [0, PRESS], [520, 585], EASE.inOut)
      : frame < 100
      ? at(frame, [PRESS, 100], [585, 690], EASE.out)
      : frame < 140
      ? at(frame, [100, 140], [690, 678], EASE.inOut)
      : frame < 162
      ? at(frame, [140, 162], [678, 560], EASE.inOut)
      : frame < 196
      ? at(frame, [162, 196], [560, 262], EASE.out)
      : at(frame, [196, len], [262, 274], EASE.inOut);

  const fx =
    frame < 100
      ? at(frame, [PRESS, 100], [187, 174], EASE.out)
      : frame < 190
      ? at(frame, [140, 190], [174, 187], EASE.inOut)
      : 187;

  return (
    <AbsoluteFill>
      {/* one room, for the whole take */}
      <Room offset={100} keyX="46%" keyY="48%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <Macro zoom={zoom} fx={fx} fy={fy}>
            {/* inside the screen — no device chrome belongs in this crop */}
            <LitPanel bare bloom={0.75}>
              <BookScreen tapAt={PRESS} doneAt={DONE} />
            </LitPanel>
          </Macro>
        </Plane>
        <EdgeFalloff side="both" at={34} />

        {/* The statement resolves AFTER the result has landed — it confirms the
            action rather than competing with it. It sits in the void beside the
            panel, never over it: a bottom-centred card lands on the success
            screen itself, where cream type on white is not type. Held at caption
            scale so the UI stays the hero of the confirmation. */}
        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 76 }}>
          <div style={{ width: 520 }}>
            <TypeCard
              caption={COPY.book.caption}
              delay={DONE + 16}
              exitAt={len - 53}
              size={TYPE.caption.fontSize}
              align="left"
              style={{ textShadow: "0 8px 40px rgba(0,0,0,0.9)" }}
            />
            {/* The lifecycle, at the same weight as the booking statement it
                follows. It shipped once as a 28px label and came back as "My
                FD tracking part is missing" — a label in an empty void reads
                as chrome, not as a claim. It now takes the statement's place
                at full caption scale, on the stretch where the My FDs list is
                open and both stage badges are legible. */}
            <TypeCard
              caption={COPY.book.track}
              delay={len - 57}
              size={TYPE.caption.fontSize}
              align="left"
              style={{ marginTop: 30, textShadow: "0 8px 40px rgba(0,0,0,0.9)" }}
            />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
