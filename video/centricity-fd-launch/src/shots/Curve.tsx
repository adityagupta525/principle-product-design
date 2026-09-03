import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, LIT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { DayRoom, Composite, useCamera, Plane, LetterZoom } from "../lib/cinema";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * THE LIGHT ACT OPENS · the diagram beat.
 *
 * Both references make a graphic the hero at least once, and it is the thing
 * this film had none of: everything was a screen or a word. Here the argument
 * stops being a table and becomes a shape you can read in one second — the
 * same ₹5,00,000, two rates, three years, and the gap between them growing.
 *
 * Drawn the way the references draw: faint grid, one accent stroke revealed by
 * stroke-dashoffset, endpoint dots that land last, annotation set beside the
 * line rather than on it, and an enormous amount of empty frame.
 *
 * The cut into this shot is where the film changes tone. It arrives on an
 * overexposure that falls off in a third of a second, and lands on the app's
 * own canvas — the argument is made in daylight, and the product goes back to
 * doing its work in the dark room three bars later. The way in is ref2's
 * letterform pull-back: the frame opens inside a single glyph of the headline
 * and retreats until the whole line resolves.
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
  const cam = useCamera(len, { z: [1.0, 1.15], x: [0.55, -0.55] });

  /* ── bar 1: the way in ─────────────────────────────────────────────── */
  // Overexposure on the cut, gone in ten frames.
  const bloom = at(frame, [0, 10], [1, 0], EASE.outQuart);
  // The letterform retreats over 13 frames — ref2 does it in about four tenths.
  const zoom = at(frame, [2, 15], [0, 1], EASE.outExpo);
  // The headline holds a beat and a half, then leaves upward, fast.
  const headOut = at(frame, [BEAT * 2.6, BEAT * 3.1], [0, 1], EASE.inOut);

  /* ── bars 2–3: the diagram ─────────────────────────────────────────── */
  const D = Math.round(BEAT * 3);
  const grid = at(frame, [D, D + 18], [0, 1], EASE.out);
  // Each line draws over one beat, the accent one starting a beat later.
  const drawLow = at(frame, [D + 6, D + 6 + BEAT * 1.6], [0, 1], EASE.inOut);
  const drawHigh = at(frame, [D + 6 + BEAT, D + 6 + BEAT * 2.6], [0, 1], EASE.inOut);
  const dots = at(frame, [D + 6 + BEAT * 2.6, D + 6 + BEAT * 3], [0, 1], EASE.out);
  const gap = at(frame, [D + 6 + BEAT * 3, D + 6 + BEAT * 3.8], [0, 1], EASE.out);
  // Everything after the headline rises into place as one body.
  const bodyIn = at(frame, [BEAT * 2.8, BEAT * 3.4], [0, 1], EASE.outQuart);

  const lo = endOf(LOW);
  const hi = endOf(HIGH);
  const LEN = 1400; // generous dash length; exact value is irrelevant once clamped

  return (
    <AbsoluteFill>
      <DayRoom bloom={bloom} drift={0.7} />
      <Composite light>
        <Plane depth={0.1} cam={cam} style={{ paddingRight: 190 }}>
          <div
            style={{
              position: "relative",
              width: W,
              height: H,
              opacity: bodyIn,
              // The rise settles, then keeps travelling a few more pixels for
              // the rest of the shot. A diagram needs a hold to be read; it
              // does not need the frame to stop.
              transform: `translateY(${
                at(frame, [BEAT * 2.8, BEAT * 3.4], [26, 0], EASE.outQuart) +
                at(frame, [BEAT * 3.4, len], [0, -14], EASE.inOut)
              }px)`,
            }}
          >
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
                    stroke={LIT.hairline}
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
                    stroke={LIT.hairlineFaint}
                    strokeWidth={1}
                  />
                ))}
              </g>

              {/* the gap, filled, once both lines exist */}
              <path
                d={`${path(HIGH)} L${lo.x},${lo.y} ${path([...LOW].reverse())
                  .replace(/^M/, "L")} Z`}
                fill={C.gain}
                opacity={gap * 0.14}
              />

              <path
                d={path(LOW)}
                fill="none"
                stroke="rgba(43,30,25,0.30)"
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
                style={{ filter: `drop-shadow(0 3px 10px ${C.gain}44)` }}
              />

              {/* the sheen — a short bright segment running the accent line on a
                  loop, so the frame keeps moving after the diagram has landed */}
              <path
                d={path(HIGH)}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray="46 1354"
                strokeDashoffset={-((frame * 5.2) % 1400)}
                opacity={drawHigh * 0.55}
                style={{ mixBlendMode: "overlay" }}
              />

              <circle cx={lo.x} cy={lo.y} r={5 * dots} fill="rgba(43,30,25,0.45)" />
              <circle cx={hi.x} cy={hi.y} r={6.5 * dots} fill={C.gain} />
            </svg>

            {/* annotation, beside the line — never on it */}
            <div
              style={{
                position: "absolute",
                left: hi.x + 34,
                top: hi.y - 62,
                opacity: dots,
                transform: `translateX(${at(frame, [10 + BEAT * 2.6, 10 + BEAT * 3.2], [-12, 0], EASE.out)}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.app,
                  fontSize: 64,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: LIT.ink,
                  whiteSpace: "nowrap",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {inr(hi.v)}
              </div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: C.textSecondary,
                  marginTop: 8,
                }}
              >
                AT 8.25%
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: lo.x + 34,
                top: lo.y - 22,
                opacity: dots * 0.75,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.app,
                  fontSize: 42,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  color: C.textSecondary,
                  whiteSpace: "nowrap",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {inr(lo.v)}
              </div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: C.textSecondary,
                  marginTop: 5,
                }}
              >
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
                opacity: grid,
                fontFamily: FONT.display,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: C.textSecondary,
              }}
            >
              <span>TODAY</span>
              <span>1 YEAR</span>
              <span>2 YEARS</span>
              <span>3 YEARS</span>
            </div>
          </div>
        </Plane>

        {/* The way in, and the claim: the frame opens inside the rupee glyph of
            the number and retreats until the whole line resolves. It is the
            same line the beat ends on, so the shot states its conclusion first
            and then spends two bars proving it. */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: 1 - headOut,
            transform: `translateY(${-headOut * 190}px) scale(${1 - headOut * 0.06})`,
          }}
        >
          <LetterZoom
            text={`Same money. ${inr(hi.v - lo.v)} more.`}
            t={zoom}
            size={132}
            color={LIT.ink}
            accent={{ from: 12, color: C.gain }}
            focus={12}
          />
        </AbsoluteFill>

      </Composite>
    </AbsoluteFill>
  );
};
