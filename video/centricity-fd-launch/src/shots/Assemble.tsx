import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Annotate } from "../lib/cinema";
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
  const cam = useCamera(len, { z: [1.0, 1.06], x: [-0.35, 0.35] });
  // Focus travels from the panel behind to the card in front.
  const rack = at(frame, [26, 70], [0, 1], EASE.outQuart);
  // Labels leave together, a beat before the cut, so the frame is clean on it.
  const off = len - 22;

  return (
    <AbsoluteFill>
      <Room offset={90} keyX="46%" keyY="46%" />
      <Composite>
        <Plane depth={0.07} cam={cam} blur={rack * 7}>
          <div style={{ transform: "translateX(690px) scale(0.70)", opacity: 1 - rack * 0.62 }}>
            <LitPanel bloom={0.6}>
              <DownloadScreen delay={-40} cardLeavesAt={9999} />
            </LitPanel>
          </div>
        </Plane>

        <Plane depth={0.3} cam={cam} blur={(1 - rack) * 7}>
          <div style={{ transform: "translateX(-300px) scale(1.9)" }}>
            <ShareCard delay={26} width={340} />
          </div>
        </Plane>

        {/* the annotation layer sits in frame space, not card space, so the
            leaders stay horizontal while the card plane drifts with the camera */}
        <AbsoluteFill style={{ opacity: at(frame, [72, 80], [0, 1], EASE.out) }}>
          <Annotate x={1004} y={245} run={120} text={COPY.share.notes[0]} delay={78} exitAt={off} />
          <Annotate x={1004} y={620} run={188} text={COPY.share.notes[1]} delay={92} exitAt={off + 3} />
          <Annotate x={1004} y={905} run={148} text={COPY.share.notes[2]} delay={106} exitAt={off + 6} />
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
