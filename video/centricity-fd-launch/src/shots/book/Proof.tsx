import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CINE } from "../../lib/tokens";
import { SHOT, BEAT } from "../../lib/beat";
import { Book } from "../Book";

/**
 * BOOK PROOF — the action shot rendered on its own, for review in isolation.
 * It reproduces the film's context exactly: the music bed sliced to the shot's
 * start, and the SFX cues Sfx() already fires inside this shot — three ticks at
 * BEAT*2 * {2,3,4} and the confirmation chime at BEAT*2 * 5. Nothing here is
 * part of the film; Film.tsx assembles the real timeline.
 *
 *   render:  npx remotion render src/index.ts BookProof out/book.mp4
 */
const step = Math.round(BEAT * 2);

export const BookProof: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} volume={0.82} startFrom={SHOT.book[0]} />
    {[2, 3, 4].map((k) => (
      <Sequence key={k} from={step * k} durationInFrames={90}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.5} />
      </Sequence>
    ))}
    <Sequence from={step * 5} durationInFrames={90}>
      <Audio src={staticFile("sfx/chime.wav")} volume={0.42} />
    </Sequence>
    <Book />
  </AbsoluteFill>
);
