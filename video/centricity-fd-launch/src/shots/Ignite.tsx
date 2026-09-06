import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, TYPE } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, DevicePlate, DEVICE_FLAT, Kicker, Smear, TypeCard } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 2 · IGNITE — "an intelligent financial product wakes up."
 *
 * The hero is the real photographed device (env/device-flat.jpg) carrying the
 * LIVE compare UI behind its measured glass. R3F was inspected and rejected: a
 * synthesised body would compete with — and lose to — the photograph, and WebGL
 * cannot texture the live DOM UI without baking it. So the "wake" is built
 * causally on the existing photographic pipeline, on the grid, in four acts:
 *
 *   REVEAL     0–2    the object sits in the near-black room, screen off,
 *                     read only by its rim. The camera is already pushing in.
 *   FOCUS      2–14   THE SWITCH — the causal event, landed on the existing
 *                     "product switching on" SFX tick at bar(3) ≈ in-shot f2.
 *                     A readiness glow on the top bezel resolves INTO the screen
 *                     igniting (brightness, never a scale-from-0), a specular
 *                     sweep travels across the glass, the warm spill overshoots
 *                     then settles — the physical light response of a power-on.
 *   TRANSFORM 14–90   the interface is alive; the camera keeps moving toward the
 *                     rate column; the headline rises beside it in the dark.
 *   RESOLVE   90–130  the meaningful UI state — the winning rate goes active
 *                     (its row emphasises, the rest dim back) via the screen's
 *                     own focus mechanic. Information becomes active.
 *
 * Everything below is at()/EASE/beat-locked; typography is the authoritative
 * TYPE roles; the ghost word gives the frame its second depth plane.
 */
export const Ignite: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ignite);

  // ONE motivated camera move — establish the object, push toward the product,
  // still running at the cut. No orbit. (Plane depth turns this into parallax.)
  const cam = useCamera(len, { z: [1.02, 1.15], x: [0.55, -0.4], y: [0.05, -0.05] });

  // ── THE SWITCH — causal activation, anchored to the SFX tick (in-shot f≈2) ──
  // The screen wakes as BRIGHTNESS, not a scale-from-0: nothing in the room pops
  // into existence, the surface already there lights up.
  const on = at(frame, [2, 13], [0, 1], EASE.outExpo);
  // A brief readiness glow on the top bezel that the ignition then consumes —
  // the "intent" before the surface answers.
  const rim = at(frame, [0, 3], [0, 0.6], EASE.out) * (1 - at(frame, [7, 19], [0, 1], EASE.out));
  // The screen's own light sweeping across the glass as it comes alive.
  const sweepP = at(frame, [2, 24], [0, 1], EASE.outQuint);
  const sweepO = at(frame, [2, 9], [0, 0.55], EASE.out) - at(frame, [11, 26], [0, 0.55], EASE.inOut);
  // Warm spill thrown back into the room — overshoots on the strike, then settles
  // to a steady glow. The physical bloom of a screen powering on.
  const spill = at(frame, [2, 9], [0, 1.3], EASE.outExpo) - at(frame, [9, 28], [0, 0.3], EASE.inOut);

  // ── MICRO PHYSICAL RESPONSE — the switch *causing* the system to wake ──
  // A tiny damped impact on the strike: the device presses ~5px and recovers,
  // and the camera gains a hair of push-in energy for ~half a second. One damped
  // inflection, not a shake — the frame flexing to the power-on, not vibrating.
  const impact = at(frame, [2, 4], [0, 5], EASE.out) * (1 - at(frame, [4, 16], [0, 1], EASE.outQuint));
  const camKick = at(frame, [2, 4], [0, 0.008], EASE.out) * (1 - at(frame, [4, 18], [0, 1], EASE.outQuint));
  // Extremely subtle optical aberration on the impulse ONLY — the screen edge
  // splits for a few frames as the panel strikes, then resolves. Ignite-local;
  // the global finish is untouched.
  const aberr = at(frame, [2, 5], [0, 0.14], EASE.out) - at(frame, [6, 12], [0, 0.14], EASE.inOut);
  // The camera with its activation micro-inflection folded in, for every plane.
  const camA = { ...cam, z: cam.z + camKick };

  // Device stays whole-shot in motion (the stillness cure): a slow rise and a
  // counter-drift against the ghost, so the two planes separate as we watch.
  const lift = at(frame, [0, len], [30, -10], EASE.outQuart);
  const drift = at(frame, [0, len], [-14, 16], EASE.outQuart);

  // The ghost word — the far plane, cropped by the frame, drifting the other way.
  const ghost = at(frame, [4, len], [70, -30], EASE.outQuart);
  const ghostIn = at(frame, [4, 30], [0, 1], EASE.outQuart);

  // RESOLVE: the winning rate becomes the active state, on the screen's own
  // focus mechanic (best row emphasises, the rest blur/dim back).
  const focusAt = 90;

  const words = COPY.ignite.title.split(" ");

  // Glass rectangle in the plate's local space (measured), for the Ignite-only
  // light overlays on the screen surface. DevicePlate itself is untouched.
  const S = 4.6;
  const P = DEVICE_FLAT.plate;
  const G = DEVICE_FLAT.glass;
  const gx = G.x * S;
  const gy = G.y * S;
  const gw = G.w * S;
  const gh = G.h * S;

  return (
    <AbsoluteFill>
      <Room offset={40} keyX="30%" keyY="54%" lift={at(frame, [0, 12], [0.34, 1], EASE.outQuart)} />
      <Composite>
        {/* the ghost word — the far plane, cropped by the frame */}
        <Plane depth={0.04} cam={camA}>
          <div
            style={{
              ...TYPE.ghost,
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

        <Plane depth={0.13} cam={camA}>
          {/* relative wrapper so the Ignite-only light overlays share the plate's
              coordinate origin; the plate div is P.w×P.h at scale S from here. */}
          <div
            style={{
              position: "relative",
              width: P.w * S,
              height: P.h * S,
              transform: `translate(${-445 + drift}px, ${lift + 168 + impact}px)`,
            }}
          >
            <DevicePlate scale={S} on={on} spill={spill} spillRadius={620}>
              <CompareScreen delay={-200} focusAt={focusAt} />
            </DevicePlate>

            {/* the screen's light sweeping across the glass as it ignites */}
            <div
              style={{
                position: "absolute",
                left: gx,
                top: gy,
                width: gw,
                height: gh,
                borderRadius: 9 * S,
                overflow: "hidden",
                mixBlendMode: "screen",
                opacity: sweepO,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-20%",
                  background: `linear-gradient(112deg, transparent ${sweepP * 150 - 46}%, ${CINE.keyHot}88 ${
                    sweepP * 150 - 24
                  }%, transparent ${sweepP * 150 - 4}%)`,
                }}
              />
            </div>

            {/* readiness glow on the top bezel — the intent before the surface answers */}
            <div
              style={{
                position: "absolute",
                left: gx,
                top: gy - 4 * S,
                width: gw,
                height: 12 * S,
                borderRadius: 9 * S,
                mixBlendMode: "screen",
                opacity: rim,
                background: `linear-gradient(180deg, ${CINE.keyHot} 0%, transparent 100%)`,
                filter: `blur(${2 * S}px)`,
                pointerEvents: "none",
              }}
            />

            {/* activation aberration — the screen edge splits red/blue for a few
                frames on the strike, then resolves. Impulse only, extremely subtle. */}
            <div
              style={{
                position: "absolute",
                left: gx,
                top: gy,
                width: gw,
                height: gh,
                borderRadius: 9 * S,
                mixBlendMode: "screen",
                opacity: aberr,
                boxShadow: `inset ${2.4 * S}px 0 ${2 * S}px rgba(255,42,42,0.55), inset ${-2.4 * S}px 0 ${
                  2 * S
                }px rgba(46,120,255,0.55)`,
                pointerEvents: "none",
              }}
            />
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

        <Plane depth={0.22} cam={camA}>
          <div style={{ width: 660, transform: "translateX(510px)" }}>
            <Kicker text={COPY.ignite.kicker} delay={20} />
            <div
              style={{
                ...TYPE.hero,
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

            {/* THE POSITIONING, at the reveal.
                The hero title is fully set by f44 and the type block then sat
                unchanged for the remaining 86 frames of the shot — so this
                costs the film nothing it was using. Claim first at caption
                scale, method under it as a label: the two need different
                weights, because "assisted" and "DIY" only stop contradicting
                each other once one is the category and the other is the
                mechanism. */}
            <div style={{ marginTop: 36 }}>
              {/* 480, not the column's 660: on one line this measures ~760px
                  in local space, and the camera pushes the block right through
                  the shot, so the last word left the frame. Wrapped to two
                  lines it stays inside the safe area for the whole push. */}
              <TypeCard
                caption={COPY.ignite.claim}
                delay={56}
                size={TYPE.caption.fontSize}
                align="left"
                style={{ width: 480 }}
              />
              <Kicker
                text={COPY.ignite.method}
                delay={74}
                style={{ marginTop: 20, fontSize: 22, letterSpacing: "0.2em" }}
              />
            </div>
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
