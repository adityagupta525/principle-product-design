import React from "react";
import { Composition } from "remotion";
import { loadFonts } from "./lib/fonts";
import { Film } from "./Film";
import { DURATION } from "./lib/beat";
import { FPS } from "./lib/tokens";

loadFonts();

export const RemotionRoot: React.FC = () => (
  <Composition id="Film" component={Film} width={1920} height={1080} fps={FPS} durationInFrames={DURATION} />
);
