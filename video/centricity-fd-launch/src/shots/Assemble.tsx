import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, atScale, EASE } from "../lib/motion";
import { DayRoom, Composite, Plane, Annotate } from "../lib/cinema";
import { ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 7 · 848-978 · 130f / 4.33s · ASSEMBLE — "everything comes together."
 *
 * Inspection first, because the brief for this shot assumed a screen that does
 * not exist: there is no AssembleScreen. What Assemble actually holds is ONE
 * artefact — the ShareCard — enlarged past life size on the cream ground, with
 * three labels tethered to it by hairline leaders. So the synthesis is not
 * "cards flying together"; it is already the right idea, badly staged.
 *
 * The card IS the system. It carries the output of every beat before it:
 *   the brand block     — Centricity, the system's name on the artefact
 *   the rate table      — four issuers, tenure and rate: the COMPARE output
 *   the sent-by footer  — Ashish Gupta's name and contact: the partner, ACT
 * and COPY.share.notes names exactly those three zones, one each, top-down.
 * The connectors already exist and are already causal: Annotate anchors a dot
 * ON the component and draws its leader out to the label.
 *
 * Staged as four acts on the measured grid:
 *
 *   REVEAL     0-34   the artefact assembles — brand block, then the four
 *                     issuer rows, then the sent-by strip. Three separate
 *                     pieces, and then a held beat so they read as separate.
 *   CONNECT    35/43/51  the three leaders draw out in a half-beat cascade,
 *                     each tethered to the zone it names. Information
 *                     architecture becoming visible, not a network graphic.
 *   (held)     71-80  all three connected, nothing moving. The system readable.
 *   SYNTHESIZE 80-96  the labels leave TOGETHER — they resolve into the thing
 *                     they were describing — while the card gathers toward
 *                     centre and takes the shot's one perceptual-scale
 *                     emphasis. Parts become subordinate to the whole.
 *   RESOLVE    96-123 the artefact alone, centred, whole, still.
 *
 * Fixed here: the card was carrying a continuous rotateY(+4.5 -> -4.5) — a flat
 * UI card faked into 3D, which is the exact tell the film's language forbids.
 * The camera also trucked and pushed for the whole shot, so nothing was ever
 * still. And the old header said 783-978 / 6.5s; the shot is 848-978 / 4.33s.
 */

/** The synthesis lands on the bar-15 half: labels out, artefact up. */
const CONNECTS = [35, 43, 51];
const LABELS_OUT = 80;
const SYNTH = 84;
const SYNTH_END = 96;

export const Assemble: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.assemble);

  /* ONE camera gesture: a quiet settle-in over the reveal, and then it stops.
     Everything after frame 40 is the artefact's own behaviour, so the frame is
     genuinely still while the system is being read. Plane depth 0.24 turns
     cam.z into scale 1 + (z-1)*2 and cam.x into a 24px translate. */
  const cam = {
    z: at(frame, [0, 40], [1.0, 1.06], EASE.outQuart),
    x: at(frame, [0, 40], [-0.45, -0.25], EASE.outQuart),
    y: 0,
  };

  // Focus travels from soft to sharp as the artefact assembles.
  const rack = at(frame, [8, 36], [0, 1], EASE.outQuart);

  /* The card drifts while it is being read, then settles and stops at the
     synthesis — the resolve is genuinely still, not a slow crawl. */
  const drift = at(frame, [0, SYNTH], [-14, 6], EASE.inOut);
  // It gathers toward centre as the labels leave: the composition resolving.
  const gather = at(frame, [SYNTH, SYNTH_END], [0, 136], EASE.outQuart);
  /* The shot's ONE scale emphasis, and the only place it is warranted: the
     whole artefact gains authority as its parts stop being called out. */
  const cardScale = atScale(frame, [SYNTH, SYNTH_END], [2.24, 2.52], EASE.outQuart);

  /* The last frames fall back to the dark room, so the cut into Detach lands on
     black rather than flashing from cream to void on the beat. */
  const fall = at(frame, [len - 7, len - 1], [1, 0], EASE.inOut);

  /* The tether dots ride the card's own drift, so each one stays anchored to
     the zone it names instead of floating a fixed distance off the edge. */
  const anchorX = 1046 + drift;

  return (
    <AbsoluteFill>
      <DayRoom fall={fall} drift={0.8} />
      <Composite light>
        {/* No panel behind it. On a cream ground a second plane is just a pale
            smudge; the depth here is the cast shadow and the empty half of the
            frame. The card stays flat — it is a flat artefact, and rotating it
            in Y would only announce that it is not. */}
        <Plane depth={0.24} cam={cam} blur={(1 - rack) * 6}>
          <div style={{ transform: `translateX(${-286 + drift + gather}px) scale(${cardScale})` }}>
            <ShareCard delay={0} width={340} />
          </div>
        </Plane>

        {/* The annotation layer sits in frame space, not card space, so the
            leaders stay horizontal while the card drifts. All three exit on the
            same frame: they are not dismissed one by one, they resolve at once
            into the artefact they were describing. */}
        <AbsoluteFill style={{ opacity: at(frame, [30, 38], [0, 1], EASE.out) * fall }}>
          <Annotate x={anchorX} y={262} run={120} light text={COPY.share.notes[0]} delay={CONNECTS[0]} exitAt={LABELS_OUT} />
          <Annotate x={anchorX} y={580} run={188} light text={COPY.share.notes[1]} delay={CONNECTS[1]} exitAt={LABELS_OUT} />
          <Annotate x={anchorX} y={858} run={148} light text={COPY.share.notes[2]} delay={CONNECTS[2]} exitAt={LABELS_OUT} />
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
