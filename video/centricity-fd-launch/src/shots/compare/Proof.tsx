import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT } from "../../lib/beat";
import { Compare } from "../Compare";

/**
 * COMPARE PROOF — the intelligence shot rendered on its own, for review in
 * isolation. It reproduces the film's context: the music bed sliced to the
 * shot's start. Compare carries no SFX cue of its own — it rides the bed —
 * so nothing else is layered here. Not part of the film; Film.tsx assembles
 * the real timeline.
 *
 *   render:  npx remotion render src/index.ts CompareProof out/compare.mp4
 */
export const CompareProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.compare[0]} />
    <Compare />
  </AbsoluteFill>
);
