import React from "react";
import { Composition } from "remotion";
import { loadFonts } from "./lib/fonts";
import { Film } from "./Film";
import { Sheet } from "./Sheet";
import { IgniteProof } from "./shots/ignite/Proof";
import { BookProof } from "./shots/book/Proof";
import { CompareProof } from "./shots/compare/Proof";
import { DURATION, SHOT, shotLen } from "./lib/beat";
import { FPS } from "./lib/tokens";

loadFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Film" component={Film} width={1920} height={1080} fps={FPS} durationInFrames={DURATION} />
    {/* Ignite hero, rendered in isolation for review — never part of the film. */}
    <Composition
      id="IgniteProof"
      component={IgniteProof}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={shotLen(SHOT.ignite)}
    />
    {/* Book hero, rendered in isolation for review — never part of the film. */}
    <Composition
      id="BookProof"
      component={BookProof}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={shotLen(SHOT.book)}
    />
    {/* Compare hero, rendered in isolation for review — never part of the film. */}
    <Composition
      id="CompareProof"
      component={CompareProof}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={shotLen(SHOT.compare)}
    />
    {/* Teardown contact sheets — analysis only, never part of the film. */}
    <Composition
      id="Sheet"
      component={Sheet}
      width={1920}
      height={1120}
      fps={1}
      durationInFrames={1}
      defaultProps={{ dir: "a", start: 0, count: 30, cols: 6, step: 0.2, label: "" }}
    />
  </>
);
