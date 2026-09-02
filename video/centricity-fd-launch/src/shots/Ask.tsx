import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera } from "../lib/cinema";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 1 · frames 0–135 · 4.5s
 * A message arrives and nothing answers it. The film's quietest bars, and
 * deliberately short: on a loop nobody sees frame one, so the tension has to
 * register fast. Three bubbles stack, the last two already defocused.
 */
const Bubble: React.FC<{ text: string; delay: number; blur: number; dim: number; y: number }> = ({
  text, delay, blur, dim, y,
}) => {
  const frame = useCurrentFrame();
  const o = at(frame, [delay, delay + 14], [0, 1], EASE.outQuint);
  const rise = at(frame, [delay, delay + 16], [16, 0], EASE.outQuint);
  return (
    <div
      style={{
        opacity: o * dim,
        filter: `blur(${blur}px)`,
        transform: `translateY(${y + rise}px)`,
        maxWidth: 620,
        padding: "20px 26px",
        borderRadius: "20px 20px 20px 5px",
        background: "#2C2A27",
        boxShadow: `0 0 90px -10px ${CINE.key}3A, 0 24px 50px -20px #000`,
        fontFamily: FONT.app,
        fontSize: 25,
        color: "#EAE4DC",
      }}
    >
      {text}
    </div>
  );
};

export const Ask: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ask);
  const cam = useCamera(len, { z: [1.0, 1.06] });
  // The last beat defocuses everything — the setup for the ignition cut.
  const pull = at(frame, [len - 26, len], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room keyX="50%" keyY="52%" lift={0.85} />
      <Composite grain={0.075}>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${cam.z})`,
            filter: `blur(${pull * 9}px)`,
            opacity: 1 - pull * 0.55,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
            <Bubble text={COPY.ask.q1} delay={6} blur={0} dim={1} y={0} />
            <Bubble text={COPY.ask.q2} delay={44} blur={1.6} dim={0.62} y={0} />
            <Bubble text={COPY.ask.q3} delay={78} blur={3.4} dim={0.4} y={0} />
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
