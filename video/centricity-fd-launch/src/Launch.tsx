import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C, sec } from "./lib/tokens";
import { Compare } from "./scenes/Compare";
import { Calculate } from "./scenes/Calculate";
import { Share } from "./scenes/Share";
import { Book } from "./scenes/Book";
import { EndCard } from "./scenes/EndCard";

/** ── TIMING SHEET (frames @30fps) — see docs/TIMING_SHEET.md ──────────── */
export const SCENE_FRAMES = {
  compare: sec(11),
  calculate: sec(9),
  share: sec(10),
  book: sec(10),
  end: sec(7),
};
/** 400ms crossfade — the reel cuts fast; a 600ms brand-film dissolve drags. */
export const TRANSITION_FRAMES = 12;
const TRANSITION_COUNT = 4;

export const LAUNCH_DURATION =
  Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * TRANSITION_COUNT;

/**
 * TransitionSeries validates children by component identity, so the crossfade
 * is inlined as an element — a wrapper component is rejected.
 */
const cross = (
  <TransitionSeries.Transition
    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
    presentation={fade()}
  />
);

export const Launch: React.FC = () => (
  <AbsoluteFill style={{ background: C.canvas }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.compare}>
        <Compare />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.calculate}>
        <Calculate />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.share}>
        <Share />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.book}>
        <Book />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.end}>
        <EndCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
