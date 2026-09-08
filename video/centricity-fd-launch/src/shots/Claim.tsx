import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, TypeCard, Kicker } from "../lib/cinema";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 3 · 265–330 · 65f / 2.17s · CLAIM — the positioning, given the frame.
 *
 * The film's only card with no product in it. Ignite is the device waking;
 * this is the sentence that says what the thing which just woke up IS, and it
 * gets the whole frame to say it, because that is what a category claim is
 * for. It sat in three places before this and worked in none of them: an 18px
 * label above the end-card lockup, then a line beside the handset in Ignite.
 * Review's note was "cant see India's first assisted platform its too small,
 * starting me kahi reveal karo" — the ask is a scene, so this is a scene.
 *
 * Structure, in 65 frames:
 *   0–22   the claim resolves word by word, on the film's own TypeCard —
 *          same mask reveal, same 2-frame stagger, same accent pulling
 *          500→800. Nothing new is invented for a brand moment.
 *   24–40  the method lands under it. DIY reads as the opposite of ASSISTED
 *          in one sentence, so it is never in the same sentence: the claim
 *          is the category, the method is how the booking actually happens.
 *   0–65   one slow push, and the ghost word drifting the other way behind —
 *          the second depth plane that stops a type card being a slide.
 *
 * It costs Curve a bar. tools/framecheck.py measured Curve at 57.5% frozen
 * frames — 104 of 194, twice the next shot — so that is where the film had
 * time it was not using.
 */
export const Claim: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.claim);

  // One slow push, still running at the cut — the film never parks a camera.
  const cam = useCamera(len, { z: [1.0, 1.09], x: [0.12, -0.12] });

  // The room comes up under the type rather than being lit already, so the
  // card arrives rather than cutting to a lit set.
  const lift = at(frame, [0, 16], [0.42, 1], EASE.outQuart);

  // The far plane, drifting against the push.
  const ghost = at(frame, [0, len], [60, -46], EASE.inOut);
  const ghostIn = at(frame, [2, 26], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room offset={70} variant="shaft" keyX="52%" keyY="46%" lift={lift} drift={0.5} />
      <Composite grain={0.07}>
        {/* the ghost word — the accent of the claim, at architectural scale */}
        <Plane depth={0.04} cam={cam}>
          <div
            style={{
              ...TYPE.ghost,
              lineHeight: 0.8,
              whiteSpace: "nowrap",
              color: "rgba(236,231,225,0.06)",
              transform: `translate(${ghost - 420}px, 30px)`,
              opacity: ghostIn,
            }}
          >
            ASSISTED
          </div>
        </Plane>

        <Plane depth={0.2} cam={cam} style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: 1180, textAlign: "center" }}>
            <TypeCard
              caption={COPY.ignite.claim}
              delay={2}
              size={TYPE.statement.fontSize}
              align="center"
              style={{ width: 1180, marginLeft: "auto", marginRight: "auto" }}
            />
            <Kicker
              text={COPY.ignite.method}
              delay={24}
              style={{ marginTop: 34, fontSize: 24, letterSpacing: "0.26em" }}
            />
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
