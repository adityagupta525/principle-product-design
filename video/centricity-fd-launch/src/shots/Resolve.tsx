import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Composite, useCamera, Plane, LitPanel, Smear } from "../lib/cinema";
import { FlutedGlass } from "../lib/fluted";
import { BookScreen, AskChatScreen } from "../screens/AppScreens";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 13 · the end card, and the hand-back.
 *
 * The room gives way to a field of refracted glass — light through ribbed
 * glass, built from two gradients per rib rather than from an image, so it is
 * ours and it is resolution-independent. It arrives as the booked panel dims,
 * which reads as the light behind the product coming up rather than as a
 * background being swapped in.
 *
 * Type is set the way the reference sets it: a small collection line at the
 * top, two big lines centred with a great deal of air, one quiet line beneath.
 * Each line carries a horizontal gradient from cream into copper — the same
 * two-tone law the product screens follow, drawn as a graduation instead of a
 * hard switch, so the second half of every line falls into the accent.
 *
 * A loop that resolves into black reads as broken, so the lockup never scales
 * on the way out, and the next client's message is already arriving as the
 * loop turns over. The seam is the idea, not a defect.
 */

const HEAD = [COPY.end.line.lead, COPY.end.line.accent];

export const Resolve: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.resolve);
  const cam = useCamera(len, { z: [1.1, 0.94] });

  const dim = at(frame, [0, 62], [1, 0.05], EASE.outQuart);
  // The glass comes up as the panel goes down — one exchange, not two events.
  const glass = at(frame, [6, 58], [0, 1], EASE.outQuart);
  const kicker = at(frame, [30, 48], [0, 1], EASE.outQuart);
  const sub = at(frame, [74, 96], [0, 1], EASE.outQuart);

  const out = at(frame, [len - 46, len - 12], [1, 0], EASE.outQuart);
  const nextAsk = at(frame, [len - 30, len - 2], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill style={{ background: CINE.void }}>
      <FlutedGlass gain={glass * out} drift={1} />

      <Composite grain={0.06}>
        <Plane depth={0.1} cam={cam}>
          <div style={{ opacity: dim * out, filter: `blur(${at(frame, [0, 70], [0, 16], EASE.outQuart)}px)` }}>
            <LitPanel scale={0.92} bloom={dim}>
              <BookScreen tapAt={-400} doneAt={-300} />
            </LitPanel>
          </div>
        </Plane>

        {/* A scrim, only where the type sits. The reference gets away with no
            scrim because white and blue on blue is a big contrast step; cream
            and copper on copper light is not, and the speculars would otherwise
            cut straight through the letterforms. */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 44% 30% at 50% 42%, rgba(10,10,12,0.62) 0%, rgba(10,10,12,0.30) 52%, transparent 100%)",
            opacity: glass * out,
          }}
        />

        <AbsoluteFill style={{ alignItems: "center", opacity: out }}>
          {/* the collection line, top of frame */}
          <div
            style={{
              marginTop: 112,
              fontFamily: FONT.brand,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.20em",
              color: "rgba(236,231,225,0.62)",
              opacity: kicker,
            }}
          >
            CENTRICITY <span style={{ opacity: 0.5 }}>×</span> {COPY.end.coBrand}
          </div>

          {/* the headline — two lines, each graduating cream into copper */}
          <div style={{ marginTop: 152, textAlign: "center" }}>
            {HEAD.map((line, i) => {
              const d = 40 + i * 6;
              const riseAt = (f: number) => at(f, [d, d + 18], [104, 0], EASE.outExpo);
              const vy = (riseAt(frame) - riseAt(frame - 1)) * 1.25;
              return (
                <div key={i} style={{ overflow: "hidden", padding: "0 4px" }}>
                  <Smear vy={vy} gain={0.85} max={24}>
                    <div
                      style={{
                        transform: `translateY(${riseAt(frame)}%)`,
                        fontFamily: FONT.display,
                        fontSize: 116,
                        fontWeight: 500,
                        letterSpacing: "-0.035em",
                        lineHeight: 1.1,
                        backgroundImage: `linear-gradient(96deg, #F4EDE4 6%, ${CINE.keyHot} 62%, #C08E5F 100%)`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {line}
                    </div>
                  </Smear>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 58,
              fontFamily: FONT.display,
              fontSize: 27,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "rgba(236,231,225,0.80)",
              opacity: sub,
            }}
          >
            {COPY.end.tagline}
          </div>
        </AbsoluteFill>

        {/* the loop turning over — the next client, same thread */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: nextAsk, transform: `scale(0.84)` }}>
            <LitPanel scale={0.84} bloom={0.5}>
              <AskChatScreen beats={[-999, 9999, 9999]} />
            </LitPanel>
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};
