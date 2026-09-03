import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, DevicePlate, Macro, TypeCard, EdgeFalloff } from "../lib/cinema";
import { BookScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 11 · 1172–1431 · 8.6s
 * The montage, on the track's loudest bars. Fastest cutting in the film: one
 * frame per beat, each a macro on a different part of the same booking, so the
 * viewer assembles the flow rather than being walked through it.
 */
const Beat: React.FC<{ i: number; zoom: number; fx: number; fy: number; tap: number; done: number }> = ({
  i, zoom, fx, fy, tap, done,
}) => {
  const len = Math.round(BEAT * 2);
  const cam = useCamera(len, { z: [1.0, 1.08] });
  return (
    <AbsoluteFill>
      <Room offset={100} keyX={`${40 + (i % 3) * 6}%`} keyY="48%" />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          {zoom >= 2 ? (
            <Macro zoom={zoom} fx={fx} fy={fy}>
              {/* inside the screen — no chrome belongs in a 3x crop */}
              <LitPanel bare bloom={0.75}>
                <BookScreen tapAt={tap} doneAt={done} />
              </LitPanel>
            </Macro>
          ) : (
            /* stepped back far enough that the device belongs in frame */
            <DevicePlate scale={2.75} spillRadius={600}>
              <BookScreen tapAt={tap} doneAt={done} />
            </DevicePlate>
          )}
        </Plane>
        {zoom >= 2 && <EdgeFalloff side="both" at={34} />}
      </Composite>
    </AbsoluteFill>
  );
};

export const Book: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.book);
  const step = Math.round(BEAT * 2);

  /* Each cut re-mounts the sheet at a later point in its own timeline, so the
     booking advances across the montage while every shot stays a macro. */
  const beats: Array<[number, number, number, number, number]> = [
    // zoom, fx,  fy,  tapAt, doneAt   (tap/done are relative to that mount)
    [2.3, 187, 470, 999, 999],   // client selected
    [2.7, 187, 585, 2, 999],     // Invest now, pressed
    [3.0, 150, 660, -14, 999],   // first tick
    [3.0, 150, 690, -30, 999],   // second tick
    [3.0, 150, 720, -46, 999],   // third tick
    [1.55, 187, 330, -80, 4],    // FD Booked
    [1.35, 187, 420, -120, -30], // it joins My FDs
  ];

  return (
    <AbsoluteFill>
      {beats.map((b, i) => (
        <Sequence key={i} from={i * step} durationInFrames={step + 2}>
          <Beat i={i} zoom={b[0]} fx={b[1]} fy={b[2]} tap={b[3]} done={b[4]} />
        </Sequence>
      ))}

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 96 }}>
        <TypeCard
          caption={COPY.book.caption}
          delay={step * 5}
          exitAt={len - 22}
          size={62}
          align="center"
          style={{
            opacity: at(frame, [step * 5 - 4, step * 5], [0, 1]),
            textShadow: "0 8px 40px rgba(0,0,0,0.9)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
