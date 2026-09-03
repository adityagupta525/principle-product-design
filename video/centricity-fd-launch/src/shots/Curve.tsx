import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CINE, C, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane } from "../lib/cinema";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * The diagram beat — the one drawn moment in the film.
 *
 * Both references make a graphic the hero at least once, and it is the thing
 * this film had none of: everything was a screen or a word. Here the argument
 * stops being a table and becomes a shape you can read in one second — the
 * same ₹5,00,000, two rates, three years, and the gap between them growing.
 *
 * Drawn the way the references draw: faint grid, one accent stroke revealed by
 * stroke-dashoffset, endpoint dots that land last, annotation set beside the
 * line rather than on it, and an enormous amount of empty frame.
 */
const W = 900;
const H = 420;
const PAD = 8;

/** ₹5,00,000 compounded — the shape is the point, the numbers are real. */
const curve = (rate: number, n = 40) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (i / n) * 3; // years
    const v = 500000 * Math.pow(1 + rate / 100, t);
    return { t, v };
  });

const LOW = curve(3.0);   // a savings account — the money's actual alternative
const HIGH = curve(8.25); // the winner from the compare beat

const MIN = 500000;
const MAX = 500000 * Math.pow(1.0825, 3);

const path = (pts: { t: number; v: number }[]) =>
  pts
    .map((p, i) => {
      const x = PAD + (p.t / 3) * (W - PAD * 2);
      const y = H - PAD - ((p.v - MIN) / (MAX - MIN)) * (H - PAD * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

const endOf = (pts: { t: number; v: number }[]) => {
  const p = pts[pts.length - 1];
  return {
    x: PAD + (p.t / 3) * (W - PAD * 2),
    y: H - PAD - ((p.v - MIN) / (MAX - MIN)) * (H - PAD * 2),
    v: p.v,
  };
};

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export const Curve: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.curve);
  const cam = useCamera(len, { z: [1.0, 1.07] });

  const grid = at(frame, [4, 22], [0, 1], EASE.out);
  // Each line draws over one beat, the accent one starting a beat later.
  const drawLow = at(frame, [10, 10 + BEAT * 1.6], [0, 1], EASE.inOut);
  const drawHigh = at(frame, [10 + BEAT, 10 + BEAT * 2.6], [0, 1], EASE.inOut);
  const dots = at(frame, [10 + BEAT * 2.6, 10 + BEAT * 3], [0, 1], EASE.out);
  const gap = at(frame, [10 + BEAT * 3, 10 + BEAT * 3.8], [0, 1], EASE.out);

  const lo = endOf(LOW);
  const hi = endOf(HIGH);
  const LEN = 1400; // generous dash length; exact value is irrelevant once clamped

  return (
    <AbsoluteFill>
      <Room offset={170} variant="pool" keyX="50%" keyY="46%" lift={0.5} drift={0.6} />
      <Composite>
        <Plane depth={0.1} cam={cam}>
          <div style={{ position: "relative", width: W, height: H }}>
            <svg width={W} height={H} style={{ overflow: "visible" }}>
              {/* faint grid — structure, not decoration */}
              <g opacity={grid * 0.5}>
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={`v${i}`}
                    x1={PAD + (i / 3) * (W - PAD * 2)}
                    y1={0}
                    x2={PAD + (i / 3) * (W - PAD * 2)}
                    y2={H}
                    stroke="rgba(236,231,225,0.13)"
                    strokeWidth={1}
                  />
                ))}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`h${i}`}
                    x1={0}
                    y1={(i / 4) * H}
                    x2={W}
                    y2={(i / 4) * H}
                    stroke="rgba(236,231,225,0.09)"
                    strokeWidth={1}
                  />
                ))}
              </g>

              {/* the gap, filled, once both lines exist */}
              <path
                d={`${path(HIGH)} L${lo.x},${lo.y} ${path([...LOW].reverse())
                  .replace(/^M/, "L")} Z`}
                fill={CINE.keyHot}
                opacity={gap * 0.1}
              />

              <path
                d={path(LOW)}
                fill="none"
                stroke="rgba(236,231,225,0.34)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray={LEN}
                strokeDashoffset={LEN * (1 - drawLow)}
              />
              <path
                d={path(HIGH)}
                fill="none"
                stroke={C.gain}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeDasharray={LEN}
                strokeDashoffset={LEN * (1 - drawHigh)}
                style={{ filter: `drop-shadow(0 0 16px ${C.gain}88)` }}
              />

              <circle cx={lo.x} cy={lo.y} r={5 * dots} fill="rgba(236,231,225,0.5)" />
              <circle cx={hi.x} cy={hi.y} r={6.5 * dots} fill={C.gain} />
            </svg>

            {/* annotation, beside the line — never on it */}
            <div
              style={{
                position: "absolute",
                left: hi.x + 26,
                top: hi.y - 34,
                opacity: dots,
                transform: `translateX(${at(frame, [10 + BEAT * 2.6, 10 + BEAT * 3.2], [-12, 0], EASE.out)}px)`,
              }}
            >
              <div style={{ fontFamily: FONT.app, fontSize: 32, fontWeight: 700, color: C.gain, whiteSpace: "nowrap" }}>
                {inr(hi.v)}
              </div>
              <div style={{ fontFamily: FONT.display, fontSize: 14, letterSpacing: "0.14em", color: CINE.typeDim, marginTop: 4 }}>
                AT 8.25%
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: lo.x + 26,
                top: lo.y - 10,
                opacity: dots * 0.75,
              }}
            >
              <div style={{ fontFamily: FONT.app, fontSize: 22, fontWeight: 600, color: CINE.typeDim, whiteSpace: "nowrap" }}>
                {inr(lo.v)}
              </div>
              <div style={{ fontFamily: FONT.display, fontSize: 13, letterSpacing: "0.14em", color: CINE.typeDim, opacity: 0.7, marginTop: 3 }}>
                IN SAVINGS
              </div>
            </div>

            {/* the year axis, quiet */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: H + 18,
                display: "flex",
                justifyContent: "space-between",
                opacity: grid * 0.6,
                fontFamily: FONT.display,
                fontSize: 13,
                letterSpacing: "0.16em",
                color: CINE.typeDim,
              }}
            >
              <span>TODAY</span>
              <span>1 YEAR</span>
              <span>2 YEARS</span>
              <span>3 YEARS</span>
            </div>
          </div>
        </Plane>

        {/* One line, centred, with room around it — the reference way. */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 96 }}>
          <div
            style={{
              opacity: gap,
              fontFamily: FONT.display,
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: CINE.type,
              transform: `translateY(${at(frame, [10 + BEAT * 3, 10 + BEAT * 3.6], [14, 0], EASE.out)}px)`,
            }}
          >
            Same money.{" "}
            <span style={{ color: C.gain, fontWeight: 700 }}>{inr(hi.v - lo.v)} more.</span>
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
