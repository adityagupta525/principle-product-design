import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel, Kicker } from "../lib/cinema";
import { CompareScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 2 · frames 135–265 · 4.3s
 * Ignition. The first bright thing in the film, and it arrives fully formed —
 * no build, no assembly. A white panel in a dark room is a light source.
 * Type sets in the void beside it, never on it.
 */
export const Ignite: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ignite);
  const cam = useCamera(len, { z: [1.02, 1.1], x: [0.5, -0.5] });

  // The panel does not fade in. It switches on.
  const on = at(frame, [0, 4], [0, 1], EASE.outQuart);
  const bloom = at(frame, [0, 22], [2.4, 1], EASE.outQuart);
  const settle = at(frame, [0, 30], [0.965, 1], EASE.outQuint);

  return (
    <AbsoluteFill>
      <Room offset={40} keyX="34%" keyY="50%" lift={at(frame, [0, 10], [0.3, 1], EASE.outQuart)} />
      <Composite>
        <Plane depth={0.05} cam={cam}>
          <div style={{ width: 1400, height: 700, borderRadius: 400,
            background: `radial-gradient(closest-side, ${CINE.key}18, transparent 70%)`,
            filter: "blur(70px)", opacity: on }} />
        </Plane>

        <Plane depth={0.12} cam={cam} style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 110, transform: "translateX(-40px)" }}>
            <div style={{ opacity: on, transform: `scale(${settle})` }}>
              <LitPanel scale={0.88} bloom={bloom}>
                <CompareScreen delay={-200} />
              </LitPanel>
            </div>

            <div style={{ width: 620 }}>
              <Kicker text={COPY.ignite.kicker} delay={20} />
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 82,
                  fontWeight: 700,
                  letterSpacing: "-0.045em",
                  lineHeight: 0.98,
                  color: CINE.type,
                  marginTop: 20,
                }}
              >
                {COPY.ignite.title.split(" ").map((w, i) => {
                  const d = 26 + i * 5;
                  return (
                    <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em" }}>
                      <span style={{ display: "inline-block", transform: `translateY(${at(frame, [d, d + 15], [105, 0], EASE.outExpo)}%)`,
                        color: i === 1 ? CINE.keyHot : undefined }}>
                        {w}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
