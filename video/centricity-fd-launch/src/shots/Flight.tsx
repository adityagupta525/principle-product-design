import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { at, EASE } from "../lib/motion";
import { CINE } from "../lib/tokens";
import { Room, Composite, useCamera, Plane, Smear } from "../lib/cinema";
import { ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 9 · 1043-1107 · 64f / 2.13s · FLIGHT — the transit.
 *
 * The middle of the three-shot send arc: Detach is the card leaving the panel,
 * this is it crossing the dark, Land is it arriving in the client's thread. Its
 * job is continuity, not spectacle — it must not compete with the beats either
 * side of it, and the only thing it has to prove is that the artefact which
 * left is the artefact which arrives.
 *
 * Kept: the arc rather than a line, the carried glow, the velocity Smear, the
 * gentle camera pull. Those all work and were left alone.
 *
 * Polished, against defects visible in the render:
 *  - ENTRY CLIPPED. At x=-600 with the plane scaled 1.13 the card's left edge
 *    sat 42px off-frame, cutting the Centricity brand block on the way in.
 *    Travel is now +/-530, which clears both edges (61px in, 258px out).
 *  - THE TRAIL WAS NOT A TRAIL. Lags of 5/10/15 frames at the peak 28px/frame
 *    put the ghosts 141, 281 and 422px behind the card — four separate cards
 *    strewn across the frame, reading as a doubling artefact rather than
 *    persistence. Lags are now 2 and 4 (56 and 113px): a tight echo.
 *  - +/-12 DEGREES ON A TABLE. Banking into travel is right, but at 12deg a
 *    four-row rate table shears far enough that each issuer's tenure and rate
 *    detach from its name, and the card lands into Land — where it sits dead
 *    level in the bubble — off-axis. 6deg keeps the tilt and the rows.
 *
 * (The old header claimed this was "the longest single shot in the film". At
 * 64 frames it is the shortest.)
 */
const TRAIL = [0, 2, 4];

export const Flight: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.flight);
  const cam = useCamera(len, { z: [1.06, 1.0] });

  const pose = (f: number) => {
    const p = at(f, [0, len], [0, 1], EASE.inOut); // even travel, camera-style
    return {
      x: -530 + p * 1060,
      y: -Math.sin(p * Math.PI) * 120,
      s: 1.42 - p * 0.5,
      r: -6 + p * 12,
      p,
    };
  };

  return (
    <AbsoluteFill>
      <Room offset={10} keyX="50%" keyY="46%" lift={1} />
      <Composite>
        {/* The card carries its own light across the dark. */}
        <Plane depth={0.26} cam={cam}>
          <div
            style={{
              position: "absolute",
              width: 900,
              height: 620,
              borderRadius: 500,
              transform: `translate(${pose(frame).x}px, ${pose(frame).y}px)`,
              background: `radial-gradient(closest-side, ${CINE.keyHot}30, transparent 72%)`,
              filter: "blur(60px)",
            }}
          />
          {TRAIL.map((lag, i) => {
            const q = pose(frame - lag);
            const prev = pose(frame - lag - 1);
            return (
              <div
                key={lag}
                style={{
                  position: "absolute",
                  transform: `translate(${q.x}px, ${q.y}px) scale(${q.s}) rotateZ(${q.r}deg)`,
                  opacity: i === 0 ? 1 : 0.16 * (1 - i / TRAIL.length),
                }}
              >
                {/* Smears along its own direction of travel — the reference
                    films never move anything this fast without it. */}
                <Smear
                  vx={q.x - prev.x}
                  vy={q.y - prev.y}
                  gain={0.42}
                  max={30}
                  style={{ filter: i === 0 ? `drop-shadow(0 0 42px ${CINE.key}66)` : "blur(4px)" }}
                >
                  <ShareCard delay={-140} width={340} />
                </Smear>
              </div>
            );
          })}
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
