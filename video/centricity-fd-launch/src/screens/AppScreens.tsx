/**
 * The FD partner-app screens, rebuilt in code at the Figma file's own 375pt
 * width from the FINAL DESIGN board (node 196-7021): Compare, Calculator,
 * Download comparison, Select client, My FDs.
 *
 * Rebuilt rather than exported because figma.com is unreachable from this
 * session's network (egress policy) — the MCP bridge serves metadata and
 * screenshots, but not asset files. Consequently the ONE thing here that is
 * approximate is the issuer logos: flat colour tiles standing in for the real
 * marks. Drop the real PNGs into public/logos/ and swap <LogoTile> for <Img>.
 *
 * Everything else — copy, columns, rates, layout, chrome — matches the file.
 */
import React from "react";
import { useCurrentFrame } from "remotion";
import { COPY, ISSUERS } from "../copy";
import { C, FONT } from "../lib/tokens";
import { at, EASE } from "../lib/motion";
import { Pill } from "../lib/atoms";

const T = {
  h1: { fontFamily: FONT.display, fontSize: 17, fontWeight: 700, color: C.textPrimary },
  row: { fontFamily: FONT.display, fontSize: 13, fontWeight: 600, color: C.textPrimary },
  meta: { fontFamily: FONT.display, fontSize: 11, fontWeight: 500, color: C.textMuted },
  col: { fontFamily: FONT.display, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: C.textMuted },
  rate: { fontFamily: FONT.data, fontSize: 13, fontWeight: 700, color: C.gain, fontVariantNumeric: "tabular-nums" as const },
};

const StatusBar: React.FC<{ onInk?: boolean }> = ({ onInk = true }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 18px 0",
      fontFamily: FONT.display,
      fontSize: 12,
      fontWeight: 600,
      color: onInk ? "#FFF" : C.textPrimary,
    }}
  >
    <span>9:41</span>
    <span style={{ letterSpacing: 2 }}>▪▪▮</span>
  </div>
);

const Header: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ background: C.headerInk, paddingBottom: 16 }}>
    <StatusBar />
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px 0" }}>
      <span style={{ color: "#FFF", fontSize: 19 }}>←</span>
      <span style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 600, color: "#FFF" }}>{title}</span>
    </div>
  </div>
);

const LogoTile: React.FC<{ color: string; size?: number }> = ({ color, size = 34 }) => (
  <span style={{ width: size, height: size, borderRadius: 7, background: color, flex: "none" }} />
);

const TabBar: React.FC<{ active: string }> = ({ active }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      borderTop: `1px solid ${C.hairline}`,
      background: C.surface,
      padding: "9px 0 14px",
    }}
  >
    {["Compare", "Calculator", "Collaterals", "My FDs"].map((t) => (
      <div key={t} style={{ flex: 1, textAlign: "center" }}>
        <span
          style={{
            width: 17,
            height: 17,
            margin: "0 auto 5px",
            borderRadius: 4,
            border: `1.5px solid ${t === active ? C.accent : C.textMuted}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            padding: "0 3px",
          }}
        >
          <span style={{ height: 1.5, background: t === active ? C.accent : C.textMuted, borderRadius: 1 }} />
          <span style={{ height: 1.5, width: "62%", background: t === active ? C.accent : C.textMuted, borderRadius: 1 }} />
        </span>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 10,
            fontWeight: 600,
            color: t === active ? C.accent : C.textMuted,
          }}
        >
          {t}
        </span>
      </div>
    ))}
  </div>
);

const FilterChips: React.FC = () => (
  <div style={{ display: "flex", gap: 8, padding: "12px 16px 0", alignItems: "center" }}>
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: `1px solid ${C.hairline}`,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
        padding: "0 7px",
      }}
    >
      <span style={{ height: 1.5, background: C.textSecondary, borderRadius: 1 }} />
      <span style={{ height: 1.5, width: "60%", background: C.textSecondary, borderRadius: 1 }} />
      <span style={{ height: 1.5, width: "80%", background: C.textSecondary, borderRadius: 1 }} />
    </span>
    {COPY.compare.filters.map((f, i) => (
      <Pill
        key={f}
        bg={i === 0 ? C.headerInk : C.surface}
        color={i === 0 ? "#FFF" : C.textSecondary}
        style={{ padding: "7px 13px", fontSize: 11, border: i === 0 ? "none" : `1px solid ${C.hairline}`, whiteSpace: "nowrap" }}
      >
        {f}
      </Pill>
    ))}
  </div>
);

/**
 * Beat 1 — Compare. Rows populate one by one, then everything except the best
 * rate recedes behind a blur. The blur-pull is the reel's way of saying
 * "this one" without drawing an arrow.
 */
export const CompareScreen: React.FC<{ delay?: number; focusAt?: number }> = ({ delay = 0, focusAt }) => {
  const frame = useCurrentFrame();
  const c = COPY.compare;
  return (
    <div style={{ height: "100%", background: C.surface, position: "relative" }}>
      <Header title={c.screenTitle} />
      <FilterChips />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "20px 16px 0" }}>
        <span style={T.h1}>{c.tableTitle}</span>
        <span style={{ fontFamily: FONT.display, fontSize: 11, fontWeight: 600, color: C.accent }}>
          ‹› {c.payoutLink}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 16px 10px",
          marginTop: 10,
          background: C.surfaceSunk,
        }}
      >
        <span style={T.col}>{c.columns.issuer}</span>
        <span style={{ display: "flex", gap: 34 }}>
          <span style={T.col}>{c.columns.tenure}</span>
          <span style={T.col}>{c.columns.rate}</span>
        </span>
      </div>

      {ISSUERS.map((row, i) => {
        const d = delay + i * 7;
        const opacity = at(frame, [d, d + 15], [0, 1]);
        const x = at(frame, [d, d + 15], [-16, 0], EASE.outQuint);
        const check = at(frame, [d + 6, d + 16], [0, 1], EASE.outQuint);

        const pull = focusAt === undefined ? 0 : at(frame, [focusAt, focusAt + 22], [0, 1], EASE.outQuart);
        const isBest = "best" in row && row.best;
        const blur = isBest ? 0 : pull * 3.2;
        const dim = isBest ? 1 : 1 - pull * 0.6;
        const scale = isBest ? 1 + pull * 0.03 : 1;

        return (
          <div
            key={row.name}
            style={{
              opacity: opacity * dim,
              filter: `blur(${blur}px)`,
              transform: `translateX(${x}px) scale(${scale})`,
              display: "flex",
              alignItems: "center",
              gap: 11,
              padding: "13px 16px",
              borderBottom: `1px solid ${C.hairline}`,
            }}
          >
            <span
              style={{
                width: 17,
                height: 17,
                borderRadius: 999,
                flex: "none",
                background: check > 0.5 ? C.headerInk : C.surface,
                border: `1.5px solid ${check > 0.5 ? C.headerInk : C.hairline}`,
                color: "#FFF",
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {check > 0.5 ? "✓" : ""}
            </span>
            <LogoTile color={row.logo} />
            <span style={{ ...T.row, flex: 1 }}>{row.short}</span>
            <span style={{ ...T.meta, width: 42, textAlign: "right" }}>{row.tenure}</span>
            <span style={{ ...T.rate, width: 48, textAlign: "right" }}>{row.rate}</span>
            <span style={{ color: C.textMuted, fontSize: 13 }}>›</span>
          </div>
        );
      })}

      {/* The app's own "View more" affordance — also closes the dead space
          that six rows leave above the sticky bar. */}
      <div
        style={{
          textAlign: "center",
          padding: "14px 0",
          fontFamily: FONT.display,
          fontSize: 12,
          fontWeight: 600,
          color: C.textSecondary,
          opacity: at(frame, [delay + 46, delay + 62], [0, 1], EASE.outQuint),
        }}
      >
        View more FDs ⌄
      </div>

      {/* Sticky action bar */}
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 74,
          background: C.surface,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(60,42,28,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 12px 12px 18px",
          opacity: at(frame, [delay + 40, delay + 58], [0, 1], EASE.outQuint),
        }}
      >
        <span style={{ fontFamily: FONT.display, fontSize: 12, fontWeight: 600, color: C.textPrimary }}>
          {c.footerCount}
        </span>
        <span
          style={{
            background: C.headerInk,
            color: "#FFF",
            borderRadius: 12,
            padding: "11px 18px",
            fontFamily: FONT.display,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {c.footerAction}
        </span>
      </div>

      <TabBar active="Compare" />
    </div>
  );
};

/** Beat 2 — Calculator. Amount types in, then every maturity figure counts up. */
export const CalculatorScreen: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const c = COPY.calculate;
  const typed = Math.round(at(frame, [delay, delay + c.amount.length * 2], [0, c.amount.length]));
  const caret = frame % 20 < 10 && typed < c.amount.length ? 1 : 0;
  const listAt = delay + c.amount.length * 2 + 4;

  return (
    <div style={{ height: "100%", background: C.surface, position: "relative" }}>
      <Header title={c.screenTitle} />

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ border: `1px solid ${C.hairline}`, borderRadius: 12, padding: "12px 14px" }}>
          <div style={T.col}>{c.amountLabel}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
            <span style={{ fontFamily: FONT.data, fontSize: 21, fontWeight: 700, color: C.textPrimary, fontVariantNumeric: "tabular-nums" }}>
              {c.amount.slice(0, typed)}
            </span>
            <span style={{ opacity: caret, width: 2, height: 20, background: C.accent, marginLeft: 3 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {c.chips.map((chip) => (
            <Pill key={chip} bg={C.surface} style={{ padding: "6px 14px", border: `1px solid ${C.hairline}` }}>
              {chip}
            </Pill>
          ))}
        </div>
      </div>

      <FilterChips />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 16px 12px" }}>
        <span style={T.h1}>{c.listTitle}</span>
        <span style={{ fontFamily: FONT.display, fontSize: 11, fontWeight: 600, color: C.accent }}>
          ⇅ {c.sortLink}
        </span>
      </div>

      {ISSUERS.map((row, i) => {
        const d = listAt + i * 6;
        const opacity = at(frame, [d, d + 14], [0, 1]);
        const y = at(frame, [d, d + 14], [12, 0], EASE.outQuint);
        return (
          <div
            key={row.name}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              display: "flex",
              alignItems: "center",
              gap: 11,
              padding: "11px 16px",
              borderBottom: `1px solid ${C.hairline}`,
            }}
          >
            <span style={{ color: C.textMuted, fontSize: 15, flex: "none" }}>⊕</span>
            <LogoTile color={row.logo} size={32} />
            <span style={{ flex: 1 }}>
              <div style={T.row}>{row.short}</div>
              <div style={{ ...T.meta, marginTop: 2 }}>
                {row.tenure} · {row.rate.replace("%", "")}%
              </div>
            </span>
            <span style={{ textAlign: "right" }}>
              <div style={{ ...T.rate, fontSize: 14 }}>{row.maturity}</div>
              <div style={{ ...T.meta, marginTop: 2, fontFamily: FONT.data }}>{row.interest}</div>
            </span>
          </div>
        );
      })}

      <TabBar active="Calculator" />
    </div>
  );
};

/** The shareable comparison card — the artefact that leaves the app. */
export const ShareCard: React.FC<{ delay?: number; width?: number }> = ({ delay = 0, width = 320 }) => {
  const frame = useCurrentFrame();
  const s = COPY.share;
  const strip = (i: number) => {
    const d = delay + i * 6;
    return {
      opacity: at(frame, [d, d + 13], [0, 1]),
      transform: `translateY(${at(frame, [d, d + 13], [12, 0], EASE.outQuint)}px)`,
    };
  };
  return (
    <div style={{ width, borderRadius: 14, overflow: "hidden", background: C.surface, boxShadow: "0 20px 44px rgba(60,42,28,0.22)" }}>
      {/* Dark textured header — the card's brand block */}
      <div
        style={{
          ...strip(0),
          background: `linear-gradient(115deg, #17120E 0%, #2E2219 55%, #4A3career 100%)`.replace("4A3career", "4A3524"),
          padding: "16px 16px 18px",
        }}
      >
        <div style={{ fontFamily: FONT.brand, fontSize: 17, fontWeight: 600, color: "#FFF" }}>◍ Centricity</div>
        <div style={{ fontFamily: FONT.display, fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", color: "#FFF", marginTop: 14 }}>
          {s.cardTitle}
        </div>
        <div style={{ fontFamily: FONT.display, fontSize: 9, color: "rgba(255,255,255,0.72)", marginTop: 5 }}>
          {s.cardSub}
        </div>
      </div>

      <div style={{ ...strip(1), padding: "10px 12px 4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 6px 10px" }}>
          <span style={{ ...T.col, fontSize: 8 }}>{COPY.compare.columns.issuer}</span>
          <span style={{ display: "flex", gap: 22 }}>
            <span style={{ ...T.col, fontSize: 8 }}>{COPY.compare.columns.tenure}</span>
            <span style={{ ...T.col, fontSize: 8 }}>{COPY.compare.columns.rate}</span>
          </span>
        </div>
        {ISSUERS.slice(0, 4).map((row, i) => {
          const d = delay + 12 + i * 5;
          return (
            <div
              key={row.name}
              style={{
                opacity: at(frame, [d, d + 12], [0, 1]),
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 6px",
                borderTop: i === 0 ? "none" : `1px solid ${C.hairline}`,
              }}
            >
              <LogoTile color={row.logo} size={22} />
              <span style={{ ...T.row, fontSize: 10, flex: 1 }}>{row.short}</span>
              <span style={{ ...T.meta, fontSize: 9, width: 30, textAlign: "right" }}>{row.tenure}</span>
              <span style={{ ...T.rate, fontSize: 10, width: 34, textAlign: "right" }}>{row.rate}</span>
            </div>
          );
        })}
      </div>

      <div style={{ ...strip(3), background: C.surfaceSunk, padding: "10px 16px 12px" }}>
        <span style={{ fontFamily: FONT.display, fontSize: 9, color: C.textMuted }}>{s.sentByLabel} </span>
        <span style={{ fontFamily: FONT.display, fontSize: 10, fontWeight: 700, color: C.textPrimary }}>
          {s.partnerName}
        </span>
        <div style={{ fontFamily: FONT.display, fontSize: 8, color: C.textMuted, marginTop: 3 }}>
          {s.partnerContact}
        </div>
      </div>
    </div>
  );
};

/**
 * Beat 3's destination — the client's WhatsApp thread. The shared card lands
 * here as an image attachment, which is what actually happens when a partner
 * sends a comparison.
 */
export const ChatScreen: React.FC<{ delay?: number; landAt: number }> = ({ delay = 0, landAt }) => {
  const frame = useCurrentFrame();
  const s = COPY.share;
  const bubble = at(frame, [landAt, landAt + 14], [0, 1], EASE.outQuint);
  const text = at(frame, [landAt + 12, landAt + 26], [0, 1], EASE.outQuint);
  return (
    <div
      style={{
        height: "100%",
        background: "#ECE5DD",
        position: "relative",
        opacity: at(frame, [delay, delay + 18], [0, 1]),
      }}
    >
      <div style={{ background: "#075E54", paddingBottom: 12 }}>
        <StatusBar />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px 0" }}>
          <span style={{ color: "#FFF", fontSize: 18 }}>←</span>
          <span style={{ width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.28)" }} />
          <span style={{ fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: "#FFF" }}>{s.chatName}</span>
        </div>
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
        {/* The card, arrived — sized as a chat attachment */}
        <div
          style={{
            opacity: bubble,
            transform: `translateY(${at(frame, [landAt, landAt + 14], [12, 0], EASE.outQuint)}px)`,
            background: "#DCF8C6",
            borderRadius: "12px 12px 3px 12px",
            padding: 5,
            maxWidth: "86%",
          }}
        >
          <ShareCard delay={-60} width={228} />
          <div style={{ textAlign: "right", fontSize: 9, color: "#6B7A6B", padding: "4px 5px 1px" }}>
            {s.chatTime} ✓✓
          </div>
        </div>

        <div
          style={{
            opacity: text,
            background: "#DCF8C6",
            borderRadius: "12px 12px 3px 12px",
            padding: "8px 12px",
            fontFamily: FONT.display,
            fontSize: 13,
            color: "#111",
            maxWidth: "82%",
          }}
        >
          {s.chatMessage}
          <span style={{ fontSize: 9, color: "#6B7A6B", marginLeft: 8 }}>{s.chatTime}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Beat 3's origin — the app's "Download comparison" screen, with the card
 * sitting in its Image preview slot before it travels.
 */
export const DownloadScreen: React.FC<{ delay?: number; cardLeavesAt: number }> = ({
  delay = 0,
  cardLeavesAt,
}) => {
  const frame = useCurrentFrame();
  const s = COPY.share;
  const fields = [s.partnerName, "9876543210", "somesh@centricity.co.in"];
  // The scene flies a *copy* of the card to the chat. The original stays in the
  // preview — sharing does not empty the app — so the slot only dips briefly as
  // the copy lifts off.
  const slotDip = at(frame, [cardLeavesAt, cardLeavesAt + 10], [1, 0.34], EASE.outQuart) *
    at(frame, [cardLeavesAt + 10, cardLeavesAt + 34], [0.34, 1], EASE.outQuint);

  return (
    <div style={{ height: "100%", background: C.surface, position: "relative" }}>
      <Header title={s.screenTitle} />

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ ...T.h1, fontSize: 15 }}>Your details</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {fields.map((f, i) => (
            <div
              key={f}
              style={{
                border: `1px solid ${C.hairline}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontFamily: FONT.display,
                fontSize: 11,
                color: C.textPrimary,
                width: i === 2 ? "100%" : "calc(50% - 4px)",
                opacity: at(frame, [delay + i * 5, delay + 14 + i * 5], [0, 1]),
              }}
            >
              {f}
            </div>
          ))}
        </div>

        <div style={{ ...T.h1, fontSize: 15, marginTop: 18 }}>Image preview</div>
      </div>

      <div style={{ padding: "10px 16px 0", opacity: slotDip, display: "flex", justifyContent: "center" }}>
        <ShareCard delay={delay + 6} width={300} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 22,
          background: C.headerInk,
          color: "#FFF",
          borderRadius: 14,
          textAlign: "center",
          padding: "14px 0",
          fontFamily: FONT.display,
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        {s.action}
      </div>
    </div>
  );
};

/** Beat 4 — Select client → Invest now → progress → FD Booked. */
export const BookScreen: React.FC<{ tapAt: number; doneAt: number }> = ({ tapAt, doneAt }) => {
  const frame = useCurrentFrame();
  const b = COPY.book;
  const press = at(frame, [tapAt, tapAt + 5], [1, 0.97], EASE.outQuart);
  const sheetOut = at(frame, [doneAt - 12, doneAt], [1, 0], EASE.outQuart);
  const okIn = at(frame, [doneAt, doneAt + 18], [0, 1], EASE.outQuint);

  return (
    <div style={{ height: "100%", background: C.surface, position: "relative", overflow: "hidden" }}>
      {/* Dimmed Compare screen behind the sheet */}
      <div style={{ filter: "blur(2.5px)", opacity: 0.45 }}>
        <CompareScreen delay={-40} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,16,12,0.28)" }} />

      {/* Bottom sheet */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: C.surface,
          borderRadius: "22px 22px 0 0",
          padding: "20px 18px 26px",
          opacity: sheetOut,
          boxShadow: "0 -14px 40px rgba(60,42,28,0.22)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 17 }}>←</span>
          <span style={{ ...T.h1, fontSize: 18 }}>{b.sheetTitle}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <LogoTile color="#E0342C" size={44} />
          <span>
            <div style={{ ...T.row, fontSize: 15 }}>{b.issuer}</div>
            <div style={{ ...T.meta, fontSize: 9, letterSpacing: "0.06em", marginTop: 3 }}>{b.issuerMeta}</div>
            <div style={{ marginTop: 5 }}>
              <span style={{ ...T.rate, fontSize: 13 }}>{b.issuerTerms.split(" · ")[0]}</span>
              <span style={{ ...T.meta, fontSize: 10 }}> · {b.issuerTerms.split(" · ").slice(1).join(" · ")}</span>
            </div>
          </span>
        </div>

        <div
          style={{
            marginTop: 20,
            background: C.surfaceSunk,
            borderRadius: 12,
            padding: "13px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ ...T.row, fontSize: 13 }}>{b.clientName}</span>
          <span style={{ ...T.meta, fontFamily: FONT.data }}>{b.clientPhone}</span>
        </div>

        <div
          style={{
            marginTop: 20,
            background: C.headerInk,
            color: "#FFF",
            borderRadius: 14,
            textAlign: "center",
            padding: "14px 0",
            fontFamily: FONT.display,
            fontSize: 15,
            fontWeight: 600,
            transform: `scale(${press})`,
          }}
        >
          {b.action}
        </div>

        <div style={{ marginTop: 14 }}>
          {b.progress.map((step, i) => {
            const d = tapAt + 8 + i * 12;
            const on = at(frame, [d, d + 9], [0, 1]);
            return (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", opacity: 0.3 + on * 0.7 }}>
                <span
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 999,
                    background: on > 0.6 ? C.gain : "transparent",
                    border: `1.5px solid ${on > 0.6 ? C.gain : C.hairline}`,
                  }}
                />
                <span style={{ ...T.meta, fontSize: 12 }}>{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success lands the partner in My FDs — the beat sheet's "→ in My FDs".
          It carries the app's own chrome so it reads as a screen, not a card. */}
      <div style={{ position: "absolute", inset: 0, background: C.surface, opacity: okIn }}>
        <Header title={b.myFdsTitle} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 34 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 999,
              background: C.gain,
              color: "#FFF",
              fontSize: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${at(frame, [doneAt, doneAt + 20], [0.7, 1], EASE.outQuint)})`,
            }}
          >
            ✓
          </div>
          <div style={{ ...T.h1, fontSize: 22, marginTop: 16 }}>{b.successTitle}</div>
          <div style={{ ...T.meta, fontSize: 12, marginTop: 5 }}>{b.successSub}</div>
        </div>

        <div style={{ display: "flex", gap: 9, padding: "26px 16px 0" }}>
          {b.myFdsStats.map((st, i) => (
            <div
              key={st.label}
              style={{
                flex: 1,
                background: C.surfaceSunk,
                borderRadius: 12,
                padding: "12px 10px",
                textAlign: "center",
                opacity: at(frame, [doneAt + 14 + i * 5, doneAt + 28 + i * 5], [0, 1], EASE.outQuint),
              }}
            >
              <div style={{ fontFamily: FONT.data, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
                {st.value}
              </div>
              <div style={{ ...T.meta, fontSize: 9, marginTop: 3 }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* The FD that was just booked, now a row in the partner's book. */}
        <div style={{ padding: "16px 16px 0" }}>
          <div
            style={{
              border: `1px solid ${C.hairline}`,
              borderRadius: 14,
              padding: "14px 15px",
              opacity: at(frame, [doneAt + 32, doneAt + 48], [0, 1], EASE.outQuint),
              transform: `translateY(${at(frame, [doneAt + 32, doneAt + 48], [12, 0], EASE.outQuint)}px)`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...T.row, fontSize: 14 }}>{b.clientName}</span>
              <Pill bg="rgba(23,160,90,0.12)" color={C.gain} style={{ fontSize: 9 }}>
                ACTIVE
              </Pill>
            </div>
            <div style={{ ...T.meta, fontFamily: FONT.data, fontSize: 11, marginTop: 3 }}>
              +91 {b.clientPhone}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 12,
                borderTop: `1px solid ${C.hairline}`,
              }}
            >
              <span>
                <div style={{ ...T.row, fontSize: 13 }}>{b.issuer}</div>
                <div style={{ ...T.meta, fontSize: 10, marginTop: 3 }}>3Y 3M · Quarterly payout</div>
              </span>
              <span style={{ textAlign: "right" }}>
                <div style={{ ...T.rate, fontSize: 13, color: C.textPrimary }}>₹5,00,000</div>
                <div style={{ ...T.rate, fontSize: 11, marginTop: 3 }}>7.80%</div>
              </span>
            </div>
          </div>
        </div>

        {/* The book the partner already had — the new FD joins a list, it does
            not sit alone on an empty screen. */}
        <div style={{ padding: "10px 16px 0", opacity: at(frame, [doneAt + 42, doneAt + 58], [0, 0.72], EASE.outQuint) }}>
          <div style={{ border: `1px solid ${C.hairline}`, borderRadius: 14, padding: "14px 15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...T.row, fontSize: 14 }}>Rajesh Kumar</span>
              <Pill bg="rgba(201,162,39,0.14)" color={C.gold} style={{ fontSize: 9 }}>
                MATURING IN 7 DAYS
              </Pill>
            </div>
            <div style={{ ...T.meta, fontFamily: FONT.data, fontSize: 11, marginTop: 3 }}>+91 9876543210</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 12,
                borderTop: `1px solid ${C.hairline}`,
              }}
            >
              <span>
                <div style={{ ...T.row, fontSize: 13 }}>Suryoday Small Finance Bank</div>
                <div style={{ ...T.meta, fontSize: 10, marginTop: 3 }}>3Y 3M · Cumulative payout</div>
              </span>
              <span style={{ textAlign: "right" }}>
                <div style={{ ...T.rate, fontSize: 13, color: C.textPrimary }}>₹1,00,000</div>
                <div style={{ ...T.rate, fontSize: 11, marginTop: 3 }}>7.50%</div>
              </span>
            </div>
          </div>
        </div>

        <TabBar active="My FDs" />
      </div>
    </div>
  );
};