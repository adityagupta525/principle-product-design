import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, Smear } from "../lib/cinema";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 1 · the question, told in the chat itself.
 *
 * The opening used to bury the three questions in a phone screen at 13px — the
 * whole setup of the film, unreadable at booth distance. Now the chat IS the
 * shot: the client's messages type out as large 3D bubbles in the dark room,
 * one per beat, each preceded by her typing. A compact contact header carries
 * the WhatsApp identity (avatar · Sneha Patel · "typing…"), so it still reads
 * as a real thread — just staged at the scale the story needs.
 *
 * Three questions land and sit unanswered. That silence is the setup, and the
 * product is what ends it.
 */

const MSGS = [
  { text: COPY.ask.q1, time: "9:40" },
  { text: COPY.ask.q2, time: "9:41" },
  { text: COPY.ask.q3, time: "9:42" },
];

export const Ask: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ask);
  const cam = useCamera(len, { z: [1.0, 1.1], x: [0.35, -0.35], y: [-0.12, 0.12] });

  // One question per beat. typingAt → dots, sendAt → the bubble resolves in.
  const beats = [Math.round(BEAT * 0.5), Math.round(BEAT * 2.3), Math.round(BEAT * 4.1)];
  const sendAt = beats.map((b) => b + 15);

  // Someone is typing whenever a beat has started its dots but not yet sent.
  const isTyping = beats.some((b, i) => frame >= b && frame < sendAt[i]);
  const enter = at(frame, [0, 16], [0, 1], EASE.outQuint);
  const pull = at(frame, [len - 20, len], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room offset={0} variant="shaft" keyX="54%" keyY="42%" lift={0.72} drift={0.7} />
      <Composite grain={0.07}>
        <Plane depth={0.14} cam={cam} style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              width: 1180,
              marginLeft: 40,
              marginTop: -70,
              opacity: enter * (1 - pull * 0.6),
              filter: `blur(${pull * 12}px)`,
              perspective: 1800,
            }}
          >
            {/* the 3D chat stack */}
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateY(-13deg) rotateX(6deg)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 22,
              }}
            >
              {/* contact header — the WhatsApp identity, at scale */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  transform: "translateZ(10px)",
                  opacity: at(frame, [6, 20], [0, 1], EASE.out),
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    background: "linear-gradient(150deg, #2A7D6B, #0B4A3F)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                />
                <div>
                  <div style={{ fontFamily: FONT.app, fontSize: 30, fontWeight: 700, color: CINE.type, letterSpacing: "-0.01em" }}>
                    {COPY.share.chatName}
                  </div>
                  <div style={{ fontFamily: FONT.app, fontSize: 18, fontWeight: 500, color: isTyping ? "#25D366" : CINE.typeDim, marginTop: 3 }}>
                    {isTyping ? "typing…" : "online"}
                  </div>
                </div>
              </div>

              {MSGS.map((m, i) => {
                const tAt = beats[i];
                const sAt = sendAt[i];
                const typing = at(frame, [tAt, tAt + 8], [0, 1], EASE.out) * (1 - at(frame, [sAt - 3, sAt], [0, 1]));
                const shown = frame >= tAt;
                if (!shown) return null;

                const inAt = (f: number) => at(f, [sAt, sAt + 16], [0, 1], EASE.outQuint);
                const send = inAt(frame);
                const riseAt = (f: number) => at(f, [sAt, sAt + 16], [46, 0], EASE.outQuint);
                const vy = (riseAt(frame) - riseAt(frame - 1)) * 0.9;
                // later bubbles sit a touch forward, so the stack has real depth
                const z = i * 26;

                return (
                  <div key={i} style={{ transform: `translateZ(${z}px)` }}>
                    {/* typing dots, then the message resolves in its place */}
                    {typing > 0.02 ? (
                      <Bubble typing tint>
                        <div style={{ display: "flex", gap: 9, alignItems: "center", padding: "6px 4px" }}>
                          {[0, 1, 2].map((d) => {
                            const t = ((frame - tAt) / 8 + d * 0.33) % 1;
                            const up = Math.max(0, Math.sin(t * Math.PI));
                            return (
                              <span key={d} style={{ width: 13, height: 13, borderRadius: 999, background: "#8C9A93", opacity: 0.4 + 0.6 * up, transform: `translateY(${-5 * up}px)` }} />
                            );
                          })}
                        </div>
                      </Bubble>
                    ) : (
                      <div style={{ opacity: send, transform: `translateY(${riseAt(frame)}px)` }}>
                        <Smear vy={vy} gain={0.5} max={22}>
                          <Bubble>
                            <span style={{ fontFamily: FONT.app, fontSize: 40, fontWeight: 600, lineHeight: 1.18, letterSpacing: "-0.02em", color: "#0B141A" }}>
                              {m.text}
                            </span>
                            <span style={{ fontFamily: FONT.app, fontSize: 17, color: "#93A0A6", marginLeft: 16, whiteSpace: "nowrap" }}>{m.time}</span>
                          </Bubble>
                        </Smear>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Plane>

        {/* the thesis, in the negative space to the right */}
        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 118 }}>
          <div style={{ width: 430, opacity: 1 - pull }}>
            {["Every day.", "Same question.", "No answer."].map((line, i) => {
              const d = 30 + i * 8;
              return (
                <div key={line} style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 46,
                      fontWeight: i === 2 ? 700 : 500,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.24,
                      color: i === 2 ? CINE.keyHot : CINE.typeDim,
                      transform: `translateY(${at(frame, [d, d + 12], [110, 0], EASE.out)}%)`,
                    }}
                  >
                    {line}
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Composite>
    </AbsoluteFill>
  );
};

/** An incoming chat bubble as a lit 3D UI component — white, tail bottom-left. */
const Bubble: React.FC<{ children: React.ReactNode; typing?: boolean; tint?: boolean }> = ({ children }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "baseline",
      background: "#FFFFFF",
      borderRadius: "26px 26px 26px 7px",
      padding: "22px 30px",
      maxWidth: 860,
      boxShadow: "0 2px 0 rgba(255,255,255,0.6) inset, 0 26px 60px -18px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.35)",
      border: "1px solid rgba(255,255,255,0.55)",
    }}
  >
    {children}
  </div>
);
