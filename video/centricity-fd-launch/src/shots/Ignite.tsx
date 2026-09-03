import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, DevicePlate, Kicker, Smear } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 2 · ignition, on a real device.
 *
 * Rebuilt against a 0.2s teardown of the reference. Three things it was doing
 * wrong, all visible once the frames are laid side by side:
 *
 *  1 CONTRAST. The screen's spill reached the headline. Measured behind the
 *    word: a 7.3x luminance swing, with the bright part of the bloom reading
 *    BRIGHTER (L 0.416) than the glyphs sitting on it (L 0.394) — so the type
 *    dissolved into the light rather than sitting on it. That is a light
 *    placement fault, not a colour one, so the fix is to keep the spill on the
 *    device where it belongs and let the right of frame stay dark.
 *
 *  2 MOCKUP vs SCREEN. A whole dense compare list was shrunk into a 300px
 *    phone: the device said "look at me" and its content was illegible. The
 *    reference never does this — its devices carry either a simple hero state
 *    or a crop. The glass now magnifies into the rate column, so the mockup
 *    and the screen composition are about the same thing.
 *
 *  3 STILLNESS. Frames 5.6s through 8.8s of the last cut were near identical —
 *    four seconds of a still image. The reference changes something every
 *    0.2s. The device now rises and keeps rising, the ghost word drifts
 *    against it, and the key light travels across the whole shot.
 *
 * The ghost word behind the device is ref1's move at 16.0s and 20.4s: a huge
 * dim word, cropped by the frame, that gives the object something to stand in
 * front of and the frame a second depth plane.
 */
export const Ignite: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ignite);
  const cam = useCamera(len, { z: [1.03, 1.13], x: [0.7, -0.7] });

  const on = at(frame, [8, 11], [0, 1], EASE.outQuart);
  const surge = at(frame, [8, 26], [1.9, 1], EASE.outQuart);
  // NO CROP INSIDE THE GLASS. Magnifying the screen to make it readable cut
  // the left column off — the issuer logos fell outside the glass entirely.
  // The screen must sit whole inside the frame; readability comes from making
  // the DEVICE bigger, not from cropping its content. At 4.6x the glass is
  // 469px for 375pt (1.25px per point, so 10pt UI text renders at ~13px) and
  // the body is 1150px tall, which no longer fits 1080 — so the phone runs off
  // the bottom, which this beat was already doing on purpose.
  // The whole phone, the whole screen, and readable text do not fit together
  // in a 1080 frame; the crop is the thing that gives.
  const lift = at(frame, [0, len], [30, -10], EASE.outQuart);
  // No fake tilt. device-flat.jpg is lit dead-on: its rim highlight is
  // symmetric and its floor pool sits square under it. Rotate that in CSS and
  // the geometry says "angled" while the light still says "head-on", which is
  // the single most obvious tell of a faked mockup. The plate stays front-on
  // and the frame does the work instead — the device is pushed large and
  // cropped by the bottom edge, which is how ref1 handles every device it
  // shows (15.4-16.8s, 17.0-18.6s: never a whole phone, always a cropped one).
  const drift = at(frame, [0, len], [-14, 16], EASE.outQuart);
  // The ghost drifts the other way, so the two planes separate as we watch.
  const ghost = at(frame, [4, len], [70, -30], EASE.outQuart);
  const ghostIn = at(frame, [4, 30], [0, 1], EASE.outQuart);
  const words = COPY.ignite.title.split(" ");

  return (
    <AbsoluteFill>
      <Room offset={40} keyX="30%" keyY="54%" lift={at(frame, [0, 12], [0.34, 1], EASE.outQuart)} />
      <Composite>
        {/* the ghost word — the far plane, cropped by the frame */}
        <Plane depth={0.04} cam={cam}>
          <div
            style={{
              fontFamily: FONT.display,
              fontSize: 300,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
              color: "rgba(236,231,225,0.07)",
              transform: `translate(${ghost - 690}px, 40px)`,
              opacity: ghostIn,
            }}
          >
            COMPARE
          </div>
        </Plane>

        <Plane depth={0.13} cam={cam}>
          <div style={{ transform: `translate(${-445 + drift}px, ${lift + 168}px)` }}>
            <DevicePlate
              scale={4.6}
              on={on}
              spill={surge}
              spillRadius={620}
            >
              <CompareScreen delay={-200} />
            </DevicePlate>
          </div>
        </Plane>

        {/* The type side of the frame is held down so the headline always has a
            ground darker than itself. Without it the residual bloom peaks at
            L 0.37 against glyphs at L 0.39 — technically passing, but only just,
            and it reads as haze on a booth screen. */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 46% 60% at 74% 52%, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.46) 46%, rgba(10,10,12,0) 88%)",
          }}
        />

        <Plane depth={0.22} cam={cam}>
          <div style={{ width: 660, transform: "translateX(510px)" }}>
            <Kicker text={COPY.ignite.kicker} delay={20} />
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 122,
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
