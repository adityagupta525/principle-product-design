import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT } from "../../lib/beat";
import { Calculate } from "../Calculate";

/**
 * CALCULATE PROOF — the computation shot rendered on its own, for review in
 * isolation. It reproduces the film's context: the music bed sliced to the
 * shot's start, which is what the three taps are timed against. Calculate
 * carries no SFX cue of its own and none was added — the taps land on the
 * bed's own beats. Not part of the film; Film.tsx assembles the real timeline.
 *
 *   render:  npx remotion render src/index.ts CalculateProof out/calculate.mp4
 */
export const CalculateProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.calculate[0]} />
    <Calculate />
  </AbsoluteFill>
);
