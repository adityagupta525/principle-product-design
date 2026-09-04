import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT } from "../../lib/beat";
import { Assemble } from "../Assemble";

/**
 * ASSEMBLE PROOF — the synthesis shot rendered on its own, for review in
 * isolation. It reproduces the film's context: the music bed sliced to the
 * shot's start, which the connect cascade and the synthesis are timed against.
 * Assemble carries no SFX cue of its own and none was added. Not part of the
 * film; Film.tsx assembles the real timeline.
 *
 *   render:  npx remotion render src/index.ts AssembleProof out/assemble.mp4
 */
export const AssembleProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.assemble[0]} />
    <Assemble />
  </AbsoluteFill>
);
