import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT } from "../../lib/beat";
import { Curve } from "../Curve";

/**
 * CURVE PROOF — the light-act diagram rendered on its own, so the pacing of its
 * three comparison landings can be judged against the bed it is cut to. Curve
 * carries no SFX cue of its own and none was added. Not part of the film;
 * Film.tsx assembles the real timeline.
 *
 *   render:  npx remotion render src/index.ts CurveProof out/curve.mp4
 */
export const CurveProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.curve[0]} />
    <Curve />
  </AbsoluteFill>
);
