import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT } from "../../lib/beat";
import { Flight } from "../Flight";

/**
 * FLIGHT PROOF — the transit shot rendered on its own, for review in isolation.
 * The music bed is sliced to the shot's start. Flight carries no SFX cue of its
 * own (the send cues sit in Detach and Land, either side of it) and none was
 * added. Not part of the film; Film.tsx assembles the real timeline.
 *
 *   render:  npx remotion render src/index.ts FlightProof out/flight.mp4
 */
export const FlightProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.flight[0]} />
    <Flight />
  </AbsoluteFill>
);
