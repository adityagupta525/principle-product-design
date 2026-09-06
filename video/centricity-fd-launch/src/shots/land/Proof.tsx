import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT } from "../../lib/beat";
import { Land } from "../Land";

/**
 * LAND PROOF — the arrival shot rendered on its own, for review in isolation.
 * It reproduces the film's context exactly: the music bed sliced to the shot's
 * start, and the `send` cue Sfx() fires at SHOT.land[0] + 2, placed at its
 * in-shot frame so the send can be checked against its own sound. Not part of
 * the film; Film.tsx assembles the real timeline.
 *
 *   render:  npx remotion render src/index.ts LandProof out/land.mp4
 */
export const LandProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.land[0]} />
    <Sequence from={2} durationInFrames={60}>
      <Audio src={staticFile("sfx/send.wav")} volume={0.5} />
    </Sequence>
    <Land />
  </AbsoluteFill>
);
