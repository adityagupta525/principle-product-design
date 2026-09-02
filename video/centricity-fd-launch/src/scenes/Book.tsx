import React from "react";
import { AbsoluteFill } from "remotion";
import { COPY } from "../copy";
import { Ground, AccentCaption, Panel, Stage } from "../lib/atoms";
import { BookScreen } from "../screens/AppScreens";

/** Beat 4 — 10s. Client selected → Invest now → three ticks → FD Booked. */
export const Book: React.FC = () => (
  <AbsoluteFill>
    <Ground />
    <Stage caption={<AccentCaption caption={COPY.book.caption} delay={186} exitAt={266} tone="gain" />}>
      <Panel scale={1.0} delay={6} height={812}>
        <BookScreen tapAt={72} doneAt={150} />
      </Panel>
    </Stage>
  </AbsoluteFill>
);
