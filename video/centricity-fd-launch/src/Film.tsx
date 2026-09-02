import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CINE } from "./lib/tokens";
import { SHOT, shotLen, DURATION } from "./lib/beat";
import { Ask } from "./shots/Ask";
import { Ignite } from "./shots/Ignite";
import { Rows } from "./shots/Rows";
import { Rate } from "./shots/Rate";
import { Table } from "./shots/Table";
import { Calculate } from "./shots/Calculate";
import { Assemble } from "./shots/Assemble";
import { Detach } from "./shots/Detach";
import { Flight } from "./shots/Flight";
import { Land } from "./shots/Land";
import { Book } from "./shots/Book";
import { Resolve } from "./shots/Resolve";

/**
 * Hard cuts, on the grid measured off the track — no dissolves. The cut
 * boundaries live in lib/beat.ts and sit two frames ahead of each downbeat, so
 * the eye takes the new frame just before the ear takes the beat.
 */
const SHOTS = [
  [SHOT.ask, Ask],
  [SHOT.ignite, Ignite],
  [SHOT.rows, Rows],
  [SHOT.rate, Rate],
  [SHOT.table, Table],
  [SHOT.calculate, Calculate],
  [SHOT.assemble, Assemble],
  [SHOT.detach, Detach],
  [SHOT.flight, Flight],
  [SHOT.land, Land],
  [SHOT.book, Book],
  [SHOT.resolve, Resolve],
] as const;

export const Film: React.FC = () => (
  <AbsoluteFill style={{ background: CINE.void }}>
    <Audio src={staticFile("audio/bed.wav")} />
    {SHOTS.map(([range, Shot], i) => (
      <Sequence key={i} from={range[0]} durationInFrames={shotLen(range)}>
        <Shot />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export { DURATION };
