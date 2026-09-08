import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { BEAT, SHOT, bar } from "./beat";

/**
 * Sound design, placed on frames rather than mixed by ear.
 *
 * Synthesised in tools/make-sfx.py for one reason: every hit has to land on a
 * frame we control. Taps run under the chat's typing indicator, the whoosh
 * lands the frame each bubble pops, ticks land with the green checks. Library
 * sounds would need trimming onto the grid; these are born on it.
 *
 * Everything sits well under the music — this makes the interface feel
 * physical, it does not compete with the track.
 */
const Hit: React.FC<{ at: number; src: string; volume?: number }> = ({ at, src, volume = 1 }) => (
  <Sequence from={Math.round(at)} durationInFrames={90}>
    <Audio src={staticFile(`sfx/${src}.wav`)} volume={volume} />
  </Sequence>
);

/** Keystrokes under a typing indicator — irregular, the way real typing is. */
const Typing: React.FC<{ from: number; to: number; seed?: number }> = ({ from, to, seed = 0 }) => {
  const taps: React.ReactNode[] = [];
  let t = from;
  let i = 0;
  while (t < to) {
    taps.push(
      <Hit key={`${from}-${i}`} at={t} src={`tap-${"abc"[(i + seed) % 3]}`} volume={0.5} />
    );
    t += 2.6 + ((i * 7 + seed * 3) % 5) * 0.8; // uneven, never metronomic
    i += 1;
  }
  return <>{taps}</>;
};

export const Sfx: React.FC = () => {
  const ask = SHOT.ask[0];
  // Same beats the chat screen types on — see shots/Ask.tsx.
  const msgBeats = [BEAT * 0.4, BEAT * 2.2, BEAT * 4.0].map((b) => ask + b);
  const book = SHOT.book[0];
  const step = Math.round(BEAT * 2);

  return (
    <>
      {msgBeats.map((b, i) => (
        <React.Fragment key={b}>
          <Typing from={b} to={b + 20} seed={i} />
          <Hit at={b + 22} src="send" volume={0.62} />
        </React.Fragment>
      ))}

      {/* the three booking steps, then the confirmation */}
      <Hit at={book + step * 2} src="tick" volume={0.5} />
      <Hit at={book + step * 3} src="tick" volume={0.5} />
      <Hit at={book + step * 4} src="tick" volume={0.5} />
      <Hit at={book + step * 5} src="chime" volume={0.42} />

      {/* the card leaving, and arriving */}
      <Hit at={SHOT.detach[0] + 6} src="send" volume={0.34} />
      <Hit at={SHOT.land[0] + 2} src="send" volume={0.5} />

      {/* the product switching on */}
      <Hit at={bar(3)} src="tick" volume={0.3} />
    </>
  );
};
