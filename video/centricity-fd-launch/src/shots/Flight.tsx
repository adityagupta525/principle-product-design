import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { at, EASE } from "../lib/motion";
import { CINE } from "../lib/tokens";
import { Room, Composite, useCamera, Plane, Smear } from "../lib/cinema";
import { ShareCard } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 9 · 1043–1107 · 2.1s
 * The card crosses dark space alone. An arc, not a line; tilted into travel;
 * three ghosted trail frames behind it. The longest single shot in the film,
 * and the picture has to hold it on its own — this track keeps time here, it
 * does not drop away for us.
 */
const TRAIL = [0, 5, 10, 15];

export const Flight: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.flight);
  const cam = useCamera(len, { z: [1.06, 1.0] });

  const pose = (f: number) => {
    const p = at(f, [0, len], [0, 1], EASE.inOut); // even travel, camera-style
    return {
      x: -600 + p * 1200,
      y: -Math.sin(p * Math.PI) * 120,
      s: 1.42 - p * 0.5,
      r: -12 + p * 24,
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
