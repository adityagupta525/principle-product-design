import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT, bar } from "../../lib/beat";
import { Ignite } from "../Ignite";

/**
 * IGNITE PROOF — the hero shot rendered on its own, so the wake can be reviewed
 * in isolation. It reproduces the film's context for this shot exactly: the
 * music bed sliced to the shot's start, and the "product switching on" SFX tick
 * that Sfx() fires at bar(3), placed at its in-shot frame. Nothing here is part
 * of the film — Film.tsx assembles the real timeline; this is a review harness.
 *
 *   render:  npx remotion render src/index.ts IgniteProof out/ignite.mp4
 */
export const IgniteProof: React.FC = () => {
  const tick = Math.round(bar(3) - SHOT.ignite[0]); // the switch-on cue, in-shot
  return (
    <AbsoluteFill style={{ background: CINE.void }}>
      <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.ignite[0]} />
      <Sequence from={tick} durationInFrames={90}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.3} />
      </Sequence>
      <Ignite />
    </AbsoluteFill>
  );
};
