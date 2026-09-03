import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, DevicePlate, Kicker, Smear } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 2 · frames 135–265 · 4.3s
 * Ignition, on a real device.
 *
 * The plate is a photographed phone with the screen off (public/env/
 * device-flat.jpg). For the first eight frames that is all it is — an object in
 * a dark room. Then the glass switches on, the product is inside it, and the
 * screen throws light back into the room. The film's first bright thing is
 * therefore a lit screen rather than a floating rectangle, which is the whole
 * difference between a product film and a mockup reel.
 *
 * Type sets in the void beside it, at display scale and stacked one word per
 * line — the reference language: one idea, enormous, in a lot of air.
 */
export const Ignite: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ignite);
  const cam = useCamera(len, { z: [1.03, 1.11], x: [0.6, -0.6] });

  // The screen does not fade in. It switches on — 3 frames, with an overshoot.
  const on = at(frame, [8, 11], [0, 1], EASE.outQuart);
  const surge = at(frame, [8, 26], [1.9, 1], EASE.outQuart);
  const words = COPY.ignite.title.split(" ");

  return (
    <AbsoluteFill>
      <Room offset={40} keyX="34%" keyY="52%" lift={at(frame, [0, 12], [0.34, 1], EASE.outQuart)} />
      <Composite>
        <Plane depth={0.12} cam={cam}>
          <div style={{ transform: "translate(-330px, 6px)" }}>
            <DevicePlate scale={2.9} on={on} spill={surge}>
              <CompareScreen delay={-200} />
            </DevicePlate>
          </div>
        </Plane>

        <Plane depth={0.2} cam={cam}>
          <div style={{ width: 640, transform: "translateX(500px)" }}>
            <Kicker text={COPY.ignite.kicker} delay={20} />
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 118,
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
                color: CINE.type,
                marginTop: 28,
              }}
            >
              {words.map((w, i) => {
                const d = 26 + i * 4;
                const riseAt = (f: number) => at(f, [d, d + 14], [104, 0], EASE.out);
                const vy = (riseAt(frame) - riseAt(frame - 1)) * 1.3;
                return (
                  <div key={i} style={{ overflow: "hidden" }}>
                    <Smear vy={vy} gain={0.9} max={22}>
                      <div
                        style={{
                          transform: `translateY(${riseAt(frame)}%)`,
                          color: i === words.length - 1 ? CINE.keyHot : undefined,
                        }}
                      >
                        {w}
                      </div>
                    </Smear>
                  </div>
                );
              })}
            </div>
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
