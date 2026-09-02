import React from "react";
import { Composition } from "remotion";
import { loadFonts } from "./lib/fonts";
import { Launch, LAUNCH_DURATION } from "./Launch";
import { FPS } from "./lib/tokens";

loadFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Launch"
      component={Launch}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={LAUNCH_DURATION}
    />
  </>
);
