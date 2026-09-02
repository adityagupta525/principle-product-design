/**
 * In-code reconstructions of the FD product screens, built from Obsidian
 * Intelligence tokens so the film renders end-to-end with no external assets.
 *
 * ⚠️  REPLACEMENT POINT — when the Figma FD designs land, export each screen
 *     at 3× and swap the component body for <Img src={staticFile(...)} />, or
 *     drop a screen recording in with <OffthreadVideo>. Nothing outside this
 *     file needs to change: the scenes only ever mount <FdBookScreen /> and
 *     <FdCompareScreen /> inside <PhoneFrame>.
 */
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";

const StatusBar: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "16px 26px 0",
      color: C.platinumText,
      fontFamily: FONT.data,
      fontSize: 13,
      opacity: 0.7,
    }}
  >
    <span>9:41</span>
    <span>▪ ▪ ▪</span>
  </div>
);

const ScreenShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: "100%", height: "100%", background: C.voidBase, color: C.platinumText }}>
    <StatusBar />
    <div style={{ padding: "34px 26px" }}>{children}</div>
  </div>
);

/** Screen A — tenure ladder + amount, the booking moment. */
export const FdBookScreen: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const rows = [
    { tenure: "1 year", rate: "6.80%" },
    { tenure: "2 years", rate: "7.05%" },
    { tenure: "3 years", rate: "7.25%", selected: true },
    { tenure: "5 years", rate: "7.10%" },
  ];
  return (
    <ScreenShell>
      <div style={{ fontFamily: FONT.display, fontSize: 13, letterSpacing: "0.14em", color: C.silverMuted }}>
        NRE FIXED DEPOSIT
      </div>
      <div style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 600, marginTop: 10 }}>
        Choose a tenure
      </div>

      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((r, i) => {
          const d = delay + 24 + i * 7;
          const opacity = at(frame, [d, d + 18], [0, 1]);
          const y = at(frame, [d, d + 18], [14, 0]);
          return (
            <div
              key={r.tenure}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 18px",
                borderRadius: 16,
                background: r.selected ? C.liftedSurface : C.obsidianSurface,
                border: `1px solid ${r.selected ? "#3A3220" : C.borderLine}`,
              }}
            >
              <span style={{ fontFamily: FONT.display, fontSize: 16 }}>{r.tenure}</span>
              <span
                style={{
                  fontFamily: FONT.data,
                  fontSize: 18,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: r.selected ? C.dataAmber : C.silverMuted,
                }}
              >
                {r.rate}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 30,
          padding: "18px 20px",
          borderRadius: 16,
          background: C.obsidianSurface,
          border: `1px solid ${C.borderLine}`,
        }}
      >
        <div style={{ fontFamily: FONT.display, fontSize: 11, letterSpacing: "0.12em", color: C.silverMuted }}>
          AMOUNT
        </div>
        <div
          style={{
            fontFamily: FONT.data,
            fontSize: 30,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            marginTop: 6,
          }}
        >
          ₹5,00,000
        </div>
      </div>

      {/* Muted CTA. A full-bleed ice fill out-shouts the amber rate — and the
          one-accent-per-scene law makes amber the accent here, not the button. */}
      <div
        style={{
          marginTop: 20,
          padding: "16px 0",
          borderRadius: 16,
          textAlign: "center",
          background: "rgba(59,111,212,0.14)",
          border: `1px solid rgba(59,111,212,0.38)`,
          color: C.accentIce,
          fontFamily: FONT.display,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        Book deposit
      </div>

      {/* Fills the lower screen and does real work: the payoff of the choice above. */}
      <div
        style={{
          marginTop: 26,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingTop: 18,
          borderTop: `1px solid ${C.borderLine}`,
        }}
      >
        <span style={{ fontFamily: FONT.display, fontSize: 11, letterSpacing: "0.12em", color: C.silverMuted }}>
          AT MATURITY
        </span>
        <span
          style={{
            fontFamily: FONT.data,
            fontSize: 20,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            color: C.platinumText,
          }}
        >
          ₹6,16,800
        </span>
      </div>
    </ScreenShell>
  );
};

/** Screen B — cross-bank comparison, the density moment. */
export const FdCompareScreen: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const banks = [
    { name: "Bank A", rate: "7.25%", best: true },
    { name: "Bank B", rate: "7.10%" },
    { name: "Bank C", rate: "6.95%" },
    { name: "Bank D", rate: "6.80%" },
    { name: "Bank E", rate: "6.65%" },
  ];
  return (
    <ScreenShell>
      <div style={{ fontFamily: FONT.display, fontSize: 13, letterSpacing: "0.14em", color: C.silverMuted }}>
        NRE · 3 YEARS · ₹5,00,000
      </div>
      <div style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 600, marginTop: 10 }}>
        Compare rates
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONT.display,
          fontSize: 11,
          letterSpacing: "0.12em",
          color: C.silverMuted,
          paddingBottom: 12,
          borderBottom: `1px solid ${C.borderLine}`,
        }}
      >
        <span>BANK</span>
        <span>P.A.</span>
      </div>

      {banks.map((b, i) => {
        const d = delay + 24 + i * 6;
        const opacity = at(frame, [d, d + 16], [0, 1]);
        const wipe = at(frame, [d, d + 22], [0, 100], EASE.outQuart);
        return (
          <div
            key={b.name}
            style={{
              opacity,
              clipPath: `inset(0 ${100 - wipe}% 0 0)`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "17px 0",
              borderBottom: `1px solid ${C.borderLine}`,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: C.liftedSurface,
                  border: `1px solid ${C.borderLine}`,
                }}
              />
              <span style={{ fontFamily: FONT.display, fontSize: 16 }}>{b.name}</span>
            </span>
            <span
              style={{
                fontFamily: FONT.data,
                fontSize: 18,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                color: b.best ? C.dataAmber : C.silverMuted,
              }}
            >
              {b.rate}
            </span>
          </div>
        );
      })}
    </ScreenShell>
  );
};
