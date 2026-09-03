import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { LIT } from "../lib/tokens";
import { DayRoom, Composite, useCamera, Plane, LitPanel, Annotate } from "../lib/cinema";
import { DownloadScreen, ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 7 · 783–978 · 6.5s
 * The card, held at scale and annotated.
 *
 * This is the reference reel's load-bearing move and the one beat that has to
 * earn three bars: a component enlarged past life size, held still, while short
 * labels tick on beside it — each tethered by a hairline drawn out from the
 * part it names. It explains the product without a voice-over, and it is the
 * only place in the film where the audience is told what to look at.
 *
 * The panel behind stays in shot and stays soft, so the card reads as a thing
 * lifted out of the app rather than a slide about it.
 */
export const Assemble: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.assemble);
  const cam = useCamera(len, { z: [1.0, 1.17], x: [-0.75, 0.75] });
  // Focus travels from the panel behind to the card in front.
  const rack = at(frame, [14, 52], [0, 1], EASE.outQuart);
  // Labels leave together, a beat before the cut, so the frame is clean on it.
  const off = len - 20;
  // The last six frames fall back to the dark room, so the cut into Detach
  // lands on black rather than flashing from cream to void on the beat.
  const fall = at(frame, [len - 7, len - 1], [1, 0], EASE.inOut);

  return (
    <AbsoluteFill>
      <DayRoom fall={fall} drift={0.8} />
      <Composite light>
        {/* No panel behind it. In the dark room a second plane is what gives the
            frame depth; on a cream ground it is just a pale smudge, and the
            reference holds its components alone on the paper. The depth here
            comes from the cast shadow and the empty half of the frame. */}
        <Plane depth={0.24} cam={cam} blur={(1 - rack) * 6}>
          <div
            style={{
              perspective: 2400,
              transform: `translateX(${-286 + at(frame, [0, len], [-16, 16], EASE.inOut)}px) scale(1.92)`,
            }}
          >
            <div
              style={{
                transform: `rotateY(${at(frame, [0, len], [4.5, -4.5], EASE.inOut)}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <ShareCard delay={20} width={340} />
            </div>
          </div>
        </Plane>

        {/* the annotation layer sits in frame space, not card space, so the
            leaders stay horizontal while the card plane drifts with the camera */}
        <AbsoluteFill style={{ opacity: at(frame, [34, 42], [0, 1], EASE.out) * fall }}>
          <Annotate x={1004} y={245} run={120} light text={COPY.share.notes[0]} delay={38} exitAt={off} />
          <Annotate x={1004} y={620} run={188} light text={COPY.share.notes[1]} delay={52} exitAt={off + 3} />
          <Annotate x={1004} y={905} run={148} light text={COPY.share.notes[2]} delay={66} exitAt={off + 6} />
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
