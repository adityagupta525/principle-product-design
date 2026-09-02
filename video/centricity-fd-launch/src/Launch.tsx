import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C, sec } from "./lib/tokens";
import { ColdOpen } from "./scenes/ColdOpen";
import { Reveal } from "./scenes/Reveal";
import { FeatureOne } from "./scenes/FeatureOne";
import { FeatureTwo } from "./scenes/FeatureTwo";
import { FeatureThree } from "./scenes/FeatureThree";
import { Trust } from "./scenes/Trust";
import { Cta } from "./scenes/Cta";

/** ── TIMING SHEET (frames @30fps) — see docs/TIMING_SHEET.md ──────────── */
export const SCENE_FRAMES = {
  coldOpen: sec(8),
  reveal: sec(10),
  featureOne: sec(17),
  featureTwo: sec(17),
  featureThree: sec(16),
  trust: sec(12),
  cta: sec(10),
};
export const TRANSITION_FRAMES = 18; // 600ms crossfade
const TRANSITION_COUNT = 6;

export const LAUNCH_DURATION =
  Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * TRANSITION_COUNT;

/**
 * TransitionSeries validates its children by component identity, so the
 * crossfade must be inlined as an element — a wrapper component is rejected.
 */
const cross = (
  <TransitionSeries.Transition
    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
    presentation={fade()}
  />
);

export const Launch: React.FC = () => (
  <AbsoluteFill style={{ background: C.voidBase }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.coldOpen}>
        <ColdOpen />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.reveal}>
        <Reveal />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.featureOne}>
        <FeatureOne />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.featureTwo}>
        <FeatureTwo />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.featureThree}>
        <FeatureThree />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.trust}>
        <Trust />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.cta}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

/**
 * Social cut — the four centre-stacked scenes only. The two feature scenes are
 * side-by-side compositions and do not survive a vertical crop, so they are
 * dropped rather than squeezed.
 */
export const SOCIAL_FRAMES = {
  coldOpen: sec(6),
  reveal: sec(8),
  featureThree: sec(14),
  cta: sec(8),
};
export const SOCIAL_DURATION =
  Object.values(SOCIAL_FRAMES).reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * 3;

export const LaunchSocial: React.FC = () => (
  <AbsoluteFill style={{ background: C.voidBase }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SOCIAL_FRAMES.coldOpen}>
        <ColdOpen />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SOCIAL_FRAMES.reveal}>
        <Reveal />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SOCIAL_FRAMES.featureThree}>
        <FeatureThree />
      </TransitionSeries.Sequence>
      {cross}
      <TransitionSeries.Sequence durationInFrames={SOCIAL_FRAMES.cta}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
