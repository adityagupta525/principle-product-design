import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CINE, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, LitPanel } from "../lib/cinema";
import { AskChatScreen } from "../screens/AppScreens";
import { shotLen, SHOT, BEAT } from "../lib/beat";

/**
 * Shot 1 · frames 0–135 · 4.5s
 *
 * The film opens inside the client's chat, and it is the same thread the
 * shared card lands in at frame 1167 — so the film closes a loop it opened.
 *
 * She types, sends, types again. Three questions on three beats. The partner's
 * input bar sits there with a blinking cursor and nothing in it: the silence is
 * the setup, and it is what the product is about to end.
 */
export const Ask: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.ask);
  const cam = useCamera(len, { z: [1.0, 1.26], y: [-0.5, 0.45] });

  // One question per beat, so the typing lands with the track.
  const beats = [Math.round(BEAT * 0.4), Math.round(BEAT * 2.2), Math.round(BEAT * 4.0)];

  const enter = at(frame, [0, 16], [0, 1], EASE.outQuint);
  const rise = at(frame, [0, 20], [26, 0], EASE.outQuint);
  // The last beat defocuses everything — the run-up to the ignition cut.
  const pull = at(frame, [len - 22, len], [0, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room offset={0} variant="shaft" keyX="52%" keyY="44%" lift={0.72} drift={0.7} />
      <Composite grain={0.07}>
        <Plane depth={0.12} cam={cam}>
          <div
            style={{
              opacity: enter * (1 - pull * 0.5),
              transform: `translateY(${rise}px)`,
              filter: `blur(${pull * 10}px)`,
            }}
          >
            <LitPanel scale={0.88} bloom={0.75}>
              <AskChatScreen beats={beats} />
            </LitPanel>
          </div>
        </Plane>

        {/* The one line the film says out loud before the product exists. */}
        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "center", paddingRight: 128 }}>
          <div style={{ width: 520, opacity: (1 - pull) }}>
            {["Every day.", "Same question.", "No answer."].map((line, i) => {
              const d = 34 + i * 7;
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
