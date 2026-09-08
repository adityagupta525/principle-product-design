import React from "react";
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { COPY, ISSUERS } from "../copy";
import { CINE, TYPE } from "../lib/tokens";
import { at, atScale, EASE } from "../lib/motion";
import { Room, Composite, useCamera, Plane, TypeCard, Kicker, Smear } from "../lib/cinema";
import { hasLogo, logoSrc } from "../lib/logos";
import { shotLen, SHOT } from "../lib/beat";

/**
 * Shot 3 · 265–330 · 65f / 2.17s · ISSUERS — the shelf, before the shelf is used.
 *
 * A launch film has to answer "what have you actually got" before it argues
 * about anything, and the answer here is names the audience already trusts.
 * Compare shows those names inside a phone at 12px; this shows the MARKS, at
 * a size where an MFD recognises them across a booth.
 *
 * "& growing" is the load-bearing half of the line. Six is not a large number
 * on its own — six that is going to be more is a platform rather than a list —
 * so it carries the accent and lands last.
 *
 * The marks arrive on the beat, not together: a row that assembles reads as
 * a shelf being stocked, a row that fades in as one reads as a static logo
 * strip. STEP is 3 frames, which is a fifth of a beat — fast enough to feel
 * like one gesture, slow enough that six separate objects are legible.
 */

/** A fifth of a beat between marks — one gesture, six readable arrivals. */
const STEP = 3;

export const Issuers: React.FC = () => {
  const frame = useCurrentFrame();
  const len = shotLen(SHOT.issuers);

  const cam = useCamera(len, { z: [1.0, 1.07], y: [0.05, -0.05] });
  const lift = at(frame, [0, 14], [0.4, 1], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Room offset={90} keyX="50%" keyY="44%" lift={lift} drift={0.6} />
      <Composite grain={0.07}>
        <Plane depth={0.18} cam={cam} style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            {/* THE SHELF. Each mark rises into place two frames after the one
                before it, with the same Smear the rest of the film puts under
                anything that travels. Tiles are the product's own artwork, so
                the corner radius and the issuer's background come with them. */}
            <div style={{ display: "flex", gap: 30, justifyContent: "center", marginBottom: 54 }}>
              {ISSUERS.map((row, i) => {
                const d = 6 + i * STEP;
                const riseAt = (f: number) => at(f, [d, d + 15], [46, 0], EASE.outQuint);
                const rise = riseAt(frame);
                const vy = riseAt(frame) - riseAt(frame - 1);
                const o = at(frame, [d, d + 12], [0, 1], EASE.out);
                // Perceptual, so the tiles gain presence rather than area.
                const s = atScale(frame, [d, d + 16], [0.84, 1], EASE.outQuint);
                return (
                  <div
                    key={row.slug}
                    style={{ transform: `translateY(${rise}px) scale(${s})`, opacity: o }}
                  >
                    <Smear vy={vy} gain={0.7} max={20}>
                      <div
                        style={{
                          width: 132,
                          height: 132,
                          borderRadius: 12,
                          overflow: "hidden",
                          background: row.logo,
                          boxShadow: "0 26px 60px -18px rgba(0,0,0,0.8)",
                        }}
                      >
                        {hasLogo(row.slug) && (
                          <Img
                            src={logoSrc(row.slug)}
                            style={{ width: "100%", height: "100%", display: "block" }}
                          />
                        )}
                      </div>
                    </Smear>
                  </div>
                );
              })}
            </div>

            {/* The count resolves after the shelf it is counting. */}
            <TypeCard
              caption={COPY.issuers.line}
              delay={30}
              size={TYPE.statement.fontSize}
              align="center"
              style={{ width: 1180, marginLeft: "auto", marginRight: "auto" }}
            />
            <Kicker
              text={COPY.issuers.sub}
              delay={44}
              style={{ marginTop: 26, fontSize: 22, letterSpacing: "0.24em" }}
            />
          </div>
        </Plane>
      </Composite>
    </AbsoluteFill>
  );
};
