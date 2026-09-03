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
import { Img, useCurrentFrame } from "remotion";
import { hasLogo, logoSrc } from "../lib/logos";
import { COPY, ISSUERS } from "../copy";
import { C, FONT } from "../lib/tokens";
import { at, atScale, EASE, TIME } from "../lib/motion";
import { Pill } from "../lib/atoms";
import { useSmear } from "../lib/cinema";

/**
 * Type ramp taken verbatim from the Figma layers. The app is Montserrat
 * throughout; sizes, weights, leading and tracking are the file's own.
 */
const T = {
  /** "Compare FD rates" — Montserrat SemiBold 14 / 20, -0.42px, #2B1E19 */
  h1: { fontFamily: FONT.app, fontSize: 14, fontWeight: 600, lineHeight: "20px", letterSpacing: "-0.42px", color: C.textHeading },
  /** Issuer name — Montserrat Bold 12 / 18, -0.12px, #212121 */
  row: { fontFamily: FONT.app, fontSize: 12, fontWeight: 700, lineHeight: "18px", letterSpacing: "-0.12px", color: C.textPrimary },
  /** Tenure — Montserrat SemiBold 12, #7A828A */
  meta: { fontFamily: FONT.app, fontSize: 12, fontWeight: 600, color: C.textMuted },
  /** Column headers — Montserrat SemiBold 12, 1px tracking, uppercase, #414141 */
  col: { fontFamily: FONT.app, fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: C.textSecondary, textTransform: "uppercase" as const },
  /** Rate — Montserrat SemiBold 12, #12B76A */
  rate: { fontFamily: FONT.app, fontSize: 12, fontWeight: 600, color: C.gain },
};

/* Phosphor icons, redrawn as inline SVG — the file references them by name
   (SquareHalf, Calculator, FileArrowDown, ShoppingBag) but the SVG files sit
   behind the blocked host, so these are hand-cut to the same silhouettes. */
const Ico: React.FC<{ d: React.ReactNode; size?: number; color: string }> = ({ d, size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7}
       strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const TAB_ICONS: Record<string, React.ReactNode> = {
  Compare: (<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M12 3v18" /><path d="M3 12h9" opacity="0" /><rect x="3" y="3" width="9" height="18" rx="3" fill="currentColor" stroke="none" opacity="0.28" /></>),
  Calculator: (<><rect x="4" y="2.5" width="16" height="19" rx="3" /><path d="M8 7h8" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" /></>),
  Collaterals: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M12 11v6" /><path d="M9.5 14.5 12 17l2.5-2.5" /></>),
  "My FDs": (<><path d="M4.5 8h15l-1 12a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></>),
};

const StatusBar: React.FC<{ onInk?: boolean }> = ({ onInk = true }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 18px 0",
      fontFamily: FONT.app,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "-0.24px",
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
      <span
        style={{
          fontFamily: FONT.app,
          fontSize: 16,
          fontWeight: 600,
          lineHeight: "18px",
          letterSpacing: "-0.24px",
          color: "#FFF",
        }}
      >
        {title}
      </span>
    </div>
  </div>
);

/**
 * Logo tile with its select badge. In the file the 40×40 tile (radius 3) sits
 * inside a 50px box at 10,10 and the 20px checkbox overlaps its top-left
 * corner at 2,2 — a badge on the logo, not a control in the row flow.
 */
/**
 * WhatsApp delivery tick. state 0 pending clock · 1 sent (one check) ·
 * 2 delivered (two checks) · 3 read (two checks, blue via `color`).
 */
const Tick: React.FC<{ state: number; color: string }> = ({ state, color }) => {
  if (state <= 0) {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A9A8A" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="11" viewBox="0 0 22 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 7.5l3.5 3.5L11 4" />
      {state >= 2 && <path d="M8 11l1.2 1.2M11.5 11L18 4" />}
    </svg>
  );
};

const LogoTile: React.FC<{
  color: string;
  /** Issuer slug — when public/logos/<slug>.png exists it replaces the tile. */
  slug?: string;
  size?: number;
  checked?: boolean;
  plain?: boolean;
}> = ({ color, slug, size = 40, checked, plain }) => (
  <span style={{ position: "relative", width: size + 10, height: size + 10, flex: "none" }}>
    <span
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        width: size,
        height: size,
        borderRadius: 3,
        background: color,
        overflow: "hidden",
      }}
    >
      {hasLogo(slug) && (
        <Img
          src={logoSrc(slug!)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
    </span>
    {/* The shared card is an output artefact, not a control surface — it
        carries no select badge. */}
    <span
      hidden={plain}
      style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 20,
        height: 20,
        borderRadius: 10,
        background: checked ? C.textPrimary : C.checkboxIdle,
        border: "1.5px solid #FFFFFF",
        display: plain ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontFamily: FONT.app,
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {checked ? "✓" : "+"}
    </span>
  </span>
);

const TabBar: React.FC<{ active: string }> = ({ active }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "flex-start",
      borderTop: `1px solid ${C.tabBorder}`,
      background: "rgba(255,255,255,0.95)",
      padding: "7px 8px 12px",
    }}
  >
    {["Compare", "Calculator", "Collaterals", "My FDs"].map((t) => {
      const on = t === active;
      const ink = on ? C.tabActive : C.tabIdle;
      return (
        <div key={t} style={{ flex: 1, position: "relative", paddingTop: 8, paddingBottom: 4, textAlign: "center" }}>
          {/* The active marker is a pill ABOVE the icon, not an underline. */}
          {on && (
            <span
              style={{
                position: "absolute",
                top: -7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 32,
                height: 2.5,
                borderRadius: 999,
                background: C.tabActive,
              }}
            />
          )}
          <span style={{ display: "block", height: 20, color: ink }}>
            <Ico d={TAB_ICONS[t]} color={ink} />
          </span>
          <span
            style={{
              display: "block",
              marginTop: 4,
              fontFamily: FONT.app,
              fontSize: 10,
              fontWeight: 500,
              lineHeight: "14px",
              letterSpacing: "-0.064px",
              color: ink,
            }}
          >
            {t}
          </span>
        </div>
      );
    })}
  </div>
);

const FilterChips: React.FC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", height: 36, overflow: "hidden" }}>
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: 50,
        border: `1px solid ${C.hairlineChip}`,
        background: C.surface,
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ico
        size={16}
        color={C.textPrimary}
        d={<><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>}
      />
    </span>
    {COPY.compare.filters.map((f, i) => (
      <span
        key={f}
        style={{
          height: i === 0 ? 32 : 36,
          display: "inline-flex",
          alignItems: "center",
          padding: i === 0 ? "0 12px" : "0 12px",
          borderRadius: 20,
          background: i === 0 ? C.textPrimary : C.surface,
          border: i === 0 ? "none" : `1px solid ${C.hairlineChip}`,
          color: i === 0 ? "#FFFFFF" : "#000000",
          fontFamily: FONT.app,
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: "nowrap",
          flex: "none",
        }}
      >
        {f}
      </span>
    ))}
  </div>
);

/**
 * Beat 1 — Compare. Rows populate one by one, then everything except the best
 * rate recedes behind a blur. The blur-pull is the reel's way of saying
 * "this one" without drawing an arrow.
 */
/**
 * Beat 1 — Compare, laid out at the Figma frame's own coordinates (375×812):
 * status 0–24, header 24–80, filter band 80–152, section title at 168, column
 * strip at 204, list at 231 (rows 72 + 8 gap), "View more" at 703, tab bar at
 * the foot. Absolute positioning rather than flow, so nothing drifts.
 *
 * Rows populate one by one, then everything except the best rate recedes
 * behind a blur — the reel's way of saying "this one" without an arrow.
 */
export const CompareScreen: React.FC<{ delay?: number; focusAt?: number; step?: number }> = ({
  delay = 0,
  focusAt,
  step = 7,
}) => {
  const frame = useCurrentFrame();
  const c = COPY.compare;
  return (
    <div style={{ height: "100%", background: C.surface, position: "relative", overflow: "hidden" }}>
      {/* Header block: black to 80 */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 80, background: C.headerInk }}>
        <StatusBar />
        <div style={{ display: "flex", alignItems: "center", gap: 15, padding: "19px 16px 0" }}>
          <Ico size={20} color="#FFF" d={<><path d="M19 12H5" /><path d="M12 5l-7 7 7 7" /></>} />
          <span
            style={{
              fontFamily: FONT.app,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "18px",
              letterSpacing: "-0.24px",
              color: "#FFF",
            }}
          >
            {c.screenTitle}
          </span>
        </div>
      </div>

      {/* Filter band */}
      <div style={{ position: "absolute", left: 0, top: 80, width: "100%", height: 72, background: C.surfaceBand }} />
      <div style={{ position: "absolute", left: 16, top: 98, width: 359, height: 36 }}>
        <FilterChips />
      </div>

      {/* Section title + payout link */}
      <div
        style={{
          position: "absolute",
          left: 16,
          top: 168,
          width: 343,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={T.h1}>{c.tableTitle}</span>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: 71 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Ico size={14} color={C.accent} d={<><path d="M8 9l-3 3 3 3" /><path d="M16 9l3 3-3 3" /></>} />
            <span
              style={{
                fontFamily: FONT.app,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "-0.3px",
                color: C.accent,
                whiteSpace: "nowrap",
              }}
            >
              {c.payoutLink}
            </span>
          </span>
          <span style={{ height: 1, width: "100%", background: C.accent, opacity: 0.55 }} />
        </span>
      </div>

      {/* Column strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 204,
          width: "100%",
          height: 27,
          background: C.surfaceSunk,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <span style={{ ...T.col, flex: 1 }}>{c.columns.issuer}</span>
        <span style={{ ...T.col, width: 58, textAlign: "right", paddingRight: 8, letterSpacing: "-0.096px" }}>
          {c.columns.tenure}
        </span>
        <span style={{ ...T.col, width: 63, textAlign: "right", paddingRight: 16, letterSpacing: "-0.096px" }}>
          {c.columns.rate}
        </span>
      </div>

      {/* Issuer list */}
      <div style={{ position: "absolute", left: 16, top: 231, width: 343 }}>
        {ISSUERS.map((row, i) => {
          const d = delay + i * step;
          const opacity = at(frame, [d, d + TIME.row], [0, 1], EASE.out);
          // Overshoot 3px past target and settle — a real row lands, it does not glide.
          const xAt = (f: number) =>
            at(f, [d, d + TIME.row], [-18, 3], EASE.out) +
            at(f, [d + TIME.row, d + TIME.row + 4], [0, -3], EASE.out);
          const x = xAt(frame);
          const smear = useSmear(xAt(frame) - xAt(frame - 1), 0, 0.5, 14);
          const check = at(frame, [d + 4, d + 4 + TIME.tick], [0, 1], EASE.out);

          const pull = focusAt === undefined ? 0 : at(frame, [focusAt, focusAt + 22], [0, 1], EASE.outQuart);
          const isBest = "best" in row && row.best;
          const blur = isBest ? 0 : pull * 3.2;
          const dim = isBest ? 1 : 1 - pull * 0.62;
          const scale = isBest ? 1 + pull * 0.03 : 1;

          return (
            <div
              key={row.name}
              style={{
                opacity: opacity * dim,
                transform: `translateX(${x}px) scale(${scale})`,
                filter: [blur ? `blur(${blur}px)` : "", smear.filter ?? ""].filter(Boolean).join(" ") || undefined,
                height: 72,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderBottom: `0.5px solid ${C.hairline}`,
              }}
            >
              {smear.defs}
              <LogoTile color={row.logo} slug={row.slug} checked={check > 0.5} />
              <span style={{ ...T.row, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden" }}>
                {row.short}
              </span>
              <span style={{ ...T.meta, width: 50, textAlign: "right", paddingRight: 8 }}>{row.tenure}</span>
              <span style={{ ...T.rate, width: 47, textAlign: "right" }}>{row.rate}</span>
              <Ico size={14} color={C.textMuted} d={<path d="M9 5l7 7-7 7" />} />
            </div>
          );
        })}
      </div>

      {/* Sticky action bar — an overlay in the app too */}
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 74,
          background: C.surface,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(60,42,28,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 12px 12px 18px",
          opacity: at(frame, [delay + 52, delay + 70], [0, 1], EASE.outQuint),
        }}
      >
        <span style={{ fontFamily: FONT.app, fontSize: 12, fontWeight: 600, color: C.textPrimary }}>
          {c.footerCount}
        </span>
        <span
          style={{
            background: C.textPrimary,
            color: "#FFF",
            borderRadius: 12,
            padding: "11px 18px",
            fontFamily: FONT.app,
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
/** "3Y 6M" -> 3.5. The screen states tenure this way; the maths needs years. */
const years = (t: string) => {
  const y = /(\d+)\s*Y/.exec(t);
  const m = /(\d+)\s*M/.exec(t);
  return (y ? +y[1] : 0) + (m ? +m[1] / 12 : 0);
};

/** Indian grouping, tabular — the product's own numeral law. */
export const rupees = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/**
 * The calculator, driven live.
 *
 * `amount` is the investment in rupees. Every maturity figure is computed from
 * it against that issuer's own rate and tenure, so when the amount moves the
 * whole list moves with it and the arithmetic stays true at every step. The
 * Figma screen's own maturity figures are placeholder values that do not
 * compute against its stated principal (Utkarsh shows a maturity BELOW the
 * ₹1,00,000 it is calculated on), so they are not carried across.
 */
export const CalculatorScreen: React.FC<{
  delay?: number;
  amount?: number;
  activeChip?: number;
}> = ({ delay = 0, amount, activeChip = -1 }) => {
  const frame = useCurrentFrame();
  const c = COPY.calculate;
  const live = amount !== undefined;
  const typed = live ? c.amount.length : Math.round(at(frame, [delay, delay + c.amount.length * 2], [0, c.amount.length]));
  const caret = !live && frame % 20 < 10 && typed < c.amount.length ? 1 : 0;
  const listAt = live ? -999 : delay + c.amount.length * 2 + 4;

  return (
    <div style={{ height: "100%", background: C.surface, position: "relative" }}>
      <Header title={c.screenTitle} />

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ border: `1px solid ${C.hairline}`, borderRadius: 12, padding: "12px 14px" }}>
          <div style={T.col}>{c.amountLabel}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
            <span style={{ fontFamily: FONT.app, fontSize: 21, fontWeight: 700, color: C.textPrimary, fontVariantNumeric: "tabular-nums" }}>
              {live ? "₹ " + Math.round(amount!).toLocaleString("en-IN") : c.amount.slice(0, typed)}
            </span>
            <span style={{ opacity: caret, width: 2, height: 20, background: C.accent, marginLeft: 3 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {c.chips.map((chip, i) => {
            const on = i === activeChip;
            return (
              <Pill
                key={chip}
                bg={on ? C.headerInk : C.surface}
                style={{
                  padding: "6px 14px",
                  border: `1px solid ${on ? C.headerInk : C.hairline}`,
                  color: on ? "#FFFFFF" : undefined,
                  transform: `scale(${on ? 1.06 : 1})`,
                }}
              >
                {chip}
              </Pill>
            );
          })}
        </div>
      </div>

      <FilterChips />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 16px 12px" }}>
        <span style={T.h1}>{c.listTitle}</span>
        <span style={{ fontFamily: FONT.app, fontSize: 11, fontWeight: 600, color: C.accent }}>
          ⇅ {c.sortLink}
        </span>
      </div>

      {ISSUERS.map((row, i) => {
        const d = listAt + i * 6;
        const opacity = live ? 1 : at(frame, [d, d + TIME.row], [0, 1], EASE.out);
        const y = live ? 0 : at(frame, [d, d + TIME.row], [14, 0], EASE.out);
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
            <LogoTile color={row.logo} slug={row.slug} size={32} />
            <span style={{ flex: 1 }}>
              <div style={T.row}>{row.short}</div>
              <div style={{ ...T.meta, marginTop: 2 }}>
                {row.tenure} · {row.rate.replace("%", "")}%
              </div>
            </span>
            <span style={{ textAlign: "right" }}>
              <div style={{ ...T.rate, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
                {live ? rupees(amount! * Math.pow(1 + parseFloat(row.rate) / 100, years(row.tenure))) : row.maturity}
              </div>
              <div style={{ ...T.meta, marginTop: 2, fontFamily: FONT.data, fontVariantNumeric: "tabular-nums" }}>
                {live
                  ? "+" + rupees(amount! * (Math.pow(1 + parseFloat(row.rate) / 100, years(row.tenure)) - 1))
                  : row.interest}
              </div>
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
    const d = delay + i * 3; // 3-frame stagger ~ 100ms
    return {
      opacity: at(frame, [d, d + TIME.row], [0, 1], EASE.out),
      transform: `translateY(${at(frame, [d, d + TIME.row], [14, 0], EASE.out)}px)`,
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
        {hasLogo("centricity") ? (
          <Img src={logoSrc("centricity")} style={{ height: 18, display: "block" }} />
        ) : (
          <div style={{ fontFamily: FONT.brand, fontSize: 17, fontWeight: 600, color: "#FFF" }}>◍ Centricity</div>
        )}
        <div style={{ fontFamily: FONT.app, fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", color: "#FFF", marginTop: 14 }}>
          {s.cardTitle}
        </div>
        <div style={{ fontFamily: FONT.app, fontSize: 9, color: "rgba(255,255,255,0.72)", marginTop: 5 }}>
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
                opacity: at(frame, [d, d + TIME.tick], [0, 1], EASE.out),
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 6px",
                borderTop: i === 0 ? "none" : `1px solid ${C.hairline}`,
              }}
            >
              <LogoTile color={row.logo} slug={row.slug} size={22} plain />
              <span style={{ ...T.row, fontSize: 10, flex: 1 }}>{row.short}</span>
              <span style={{ ...T.meta, fontSize: 9, width: 30, textAlign: "right" }}>{row.tenure}</span>
              <span style={{ ...T.rate, fontSize: 10, width: 34, textAlign: "right" }}>{row.rate}</span>
            </div>
          );
        })}
      </div>

      <div style={{ ...strip(3), background: C.surfaceSunk, padding: "10px 16px 12px" }}>
        <span style={{ fontFamily: FONT.app, fontSize: 9, color: C.textMuted }}>{s.sentByLabel} </span>
        <span style={{ fontFamily: FONT.app, fontSize: 10, fontWeight: 700, color: C.textPrimary }}>
          {s.partnerName}
        </span>
        <div style={{ fontFamily: FONT.app, fontSize: 8, color: C.textMuted, marginTop: 3 }}>
          {s.partnerContact}
        </div>
      </div>
    </div>
  );
};

/**
 * The opening thread — the same conversation the shared card lands in later.
 * The client types, sends, types again. The partner never answers, and that
 * silence is the film's setup: for years this question was where the
 * conversation ended.
 */
export const AskChatScreen: React.FC<{ beats: number[] }> = ({ beats }) => {
  const frame = useCurrentFrame();
  const s = COPY.ask;
  const msgs = [s.q1, s.q2, s.q3];

  return (
    <div style={{ height: "100%", background: "#ECE5DD", position: "relative", overflow: "hidden" }}>
      <div style={{ background: "#075E54", paddingBottom: 12 }}>
        <StatusBar />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px 0" }}>
          <span style={{ color: "#FFF", fontSize: 18 }}>←</span>
          <span style={{ width: 34, height: 34, borderRadius: 999, background: "rgba(255,255,255,0.3)" }} />
          <span>
            <div style={{ fontFamily: FONT.app, fontSize: 15, fontWeight: 600, color: "#FFF" }}>
              {COPY.share.chatName}
            </div>
            <div style={{ fontFamily: FONT.app, fontSize: 10.5, color: "rgba(255,255,255,0.7)", marginTop: 1 }}>
              online
            </div>
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 62,
          padding: "0 12px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          alignItems: "flex-start",
        }}
      >
        {msgs.map((m, i) => {
          const typingAt = beats[i];
          const sendAt = beats[i] + 22;
          // The typing indicator lives only between "started" and "sent".
          const typing = at(frame, [typingAt, typingAt + TIME.tick], [0, 1], EASE.out) *
            (1 - at(frame, [sendAt - 2, sendAt], [0, 1]));
          const sent = at(frame, [sendAt, sendAt + TIME.tick], [0, 1], EASE.out);
          // Never from scale(0) — nothing in the world appears out of nothing.
          const pop = at(frame, [sendAt, sendAt + TIME.row], [0.94, 1], EASE.out);

          return (
            <React.Fragment key={m}>
              {/* typing dots, in a bubble of their own */}
              <div
                style={{
                  opacity: typing,
                  transform: `scale(${0.9 + typing * 0.1})`,
                  transformOrigin: "left bottom",
                  height: typing > 0.02 ? undefined : 0,
                  overflow: "hidden",
                  background: "#FFFFFF",
                  borderRadius: "12px 12px 12px 3px",
                  padding: typing > 0.02 ? "11px 14px" : 0,
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                  boxShadow: "0 1px 1px rgba(0,0,0,0.12)",
                }}
              >
                {[0, 1, 2].map((d) => {
                  const t = ((frame - typingAt) / 7 + d * 0.33) % 1;
                  return (
                    <span
                      key={d}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "#8C9A93",
                        opacity: 0.4 + 0.6 * Math.max(0, Math.sin(t * Math.PI)),
                        transform: `translateY(${-2.5 * Math.max(0, Math.sin(t * Math.PI))}px)`,
                      }}
                    />
                  );
                })}
              </div>

              <div
                style={{
                  opacity: sent,
                  transform: `scale(${pop})`,
                  transformOrigin: "left bottom",
                  background: "#FFFFFF",
                  borderRadius: "12px 12px 12px 3px",
                  padding: "9px 13px 7px",
                  maxWidth: "84%",
                  fontFamily: FONT.app,
                  fontSize: 13.5,
                  lineHeight: "18px",
                  color: "#111B21",
                  boxShadow: "0 1px 1px rgba(0,0,0,0.12)",
                }}
              >
                {m}
                <span style={{ fontSize: 9.5, color: "#8C9A93", marginLeft: 9 }}>9:4{i}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* input bar — the partner's cursor, and nothing typed in it */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "8px 10px 14px",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            borderRadius: 999,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 1px 1px rgba(0,0,0,0.10)",
          }}
        >
          <span
            style={{
              width: 1.5,
              height: 15,
              background: "#25D366",
              opacity: frame % 34 < 17 ? 1 : 0,
            }}
          />
          <span style={{ fontFamily: FONT.app, fontSize: 13, color: "#B6BEBA" }}>Message</span>
        </div>
        <span style={{ width: 36, height: 36, borderRadius: 999, background: "#00A884", flex: "none" }} />
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

  // The send, read frame by frame off landAt:
  //   launch    the card lifts out of the compose bar
  //   +18       it has settled into the thread
  //   +30 → +54 the tick evolves: sent ✓ → delivered ✓✓ → read ✓✓ blue
  const flyY = at(frame, [landAt, landAt + 18], [230, 0], EASE.outQuint);
  const flyS = atScale(frame, [landAt, landAt + 18], [0.62, 1], EASE.outQuint);
  // The launch is fast (≈57px in the first frame, then decelerating), so the
  // rising card carries a vertical smear proportional to its own velocity and
  // goes crisp the instant it settles into the thread. FAST OBJECT → blur.
  const flyVy = flyY - at(frame - 1, [landAt, landAt + 18], [230, 0], EASE.outQuint);
  const flySmear = useSmear(0, flyVy, 0.5, 20);
  const bubble = at(frame, [landAt, landAt + 8], [0, 1], EASE.out);
  const text = at(frame, [landAt + 20, landAt + 34], [0, 1], EASE.outQuint);

  // Tick: 0 pending clock · 1 sent (one grey) · 2 delivered (two grey) · 3 read (two blue)
  const tick = frame < landAt + 30 ? 0 : frame < landAt + 40 ? 1 : frame < landAt + 50 ? 2 : 3;
  const tickColor = tick >= 3 ? "#34B7F1" : "#8A9A8A";

  return (
    <div
      style={{
        height: "100%",
        background: "#ECE5DD",
        position: "relative",
        overflow: "hidden",
        opacity: at(frame, [delay, delay + 18], [0, 1]),
      }}
    >
      <div style={{ background: "#075E54", paddingBottom: 12 }}>
        <StatusBar />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px 0" }}>
          <span style={{ color: "#FFF", fontSize: 18 }}>←</span>
          <span style={{ width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.28)" }} />
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: FONT.app, fontSize: 15, fontWeight: 600, color: "#FFF" }}>{s.chatName}</span>
            <span style={{ fontFamily: FONT.app, fontSize: 10, color: "rgba(255,255,255,0.7)" }}>online</span>
          </span>
        </div>
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
        {/* The card, sent — it rises out of the compose bar into the thread. */}
        {flySmear.defs}
        <div
          style={{
            opacity: bubble,
            transform: `translateY(${flyY}px) scale(${flyS})`,
            transformOrigin: "bottom right",
            filter: flySmear.filter,
            background: "#DCF8C6",
            borderRadius: "12px 12px 3px 12px",
            padding: 5,
            maxWidth: "86%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          <ShareCard delay={-60} width={228} />
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, fontSize: 9, color: "#6B7A6B", padding: "4px 5px 1px" }}>
            <span>{s.chatTime}</span>
            <Tick state={tick} color={tickColor} />
          </div>
        </div>

        <div
          style={{
            opacity: text,
            transform: `translateY(${at(frame, [landAt + 20, landAt + 34], [10, 0], EASE.outQuint)}px)`,
            background: "#DCF8C6",
            borderRadius: "12px 12px 3px 12px",
            padding: "8px 12px",
            fontFamily: FONT.app,
            fontSize: 13,
            color: "#111",
            maxWidth: "82%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {s.chatMessage}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9, color: "#6B7A6B", marginLeft: 8 }}>
            {s.chatTime} <Tick state={text > 0.6 ? Math.max(1, tick) : 0} color={tickColor} />
          </span>
        </div>
      </div>

      {/* Compose bar — the card lifts out of here, so the send has a source. */}
      <div
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 38,
            borderRadius: 999,
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            fontFamily: FONT.app,
            fontSize: 12,
            color: "#9AA0A6",
            boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
          }}
        >
          Message
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: "#075E54",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // the send button pulses on the launch frame
            transform: `scale(${1 - at(frame, [landAt - 3, landAt + 3], [0, 0.16], EASE.out) + at(frame, [landAt + 3, landAt + 12], [0, 0.16], EASE.out)})`,
          }}
        >
          <Ico size={18} color="#FFF" d={<path d="M3 11l18-8-8 18-2-7-8-3z" />} />
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
  const fields = [s.partnerName, s.partnerPhone, s.partnerEmail];
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
                fontFamily: FONT.app,
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
          fontFamily: FONT.app,
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
  // The booked row states the terms the recommendation actually offered. These
  // were hardcoded to "3Y 3M · Quarterly payout" and "7.80%" while the sheet
  // above them offered 8.25% · 3Y — the same shot contradicting itself. Both now
  // read from COPY.book.issuerTerms, which is the single source of truth.
  const [bookedRate, bookedTenure, bookedPayout] = b.issuerTerms.split(" · ");
  const press = at(frame, [tapAt, tapAt + TIME.press], [1, 0.97], EASE.out);
  const sheetOut = at(frame, [doneAt - TIME.exit, doneAt], [1, 0], EASE.out);
  const okIn = at(frame, [doneAt, doneAt + TIME.sheet], [0, 1], EASE.out);

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
          <LogoTile
            color={ISSUERS.find((r) => r.name === COPY.book.issuer)?.logo ?? C.accent}
            slug={ISSUERS.find((r) => r.name === COPY.book.issuer)?.slug}
            size={44}
          />
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
            fontFamily: FONT.app,
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
            const on = at(frame, [d, d + TIME.tick], [0, 1], EASE.out);
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
              transform: `scale(${at(frame, [doneAt, doneAt + TIME.sheet], [0.9, 1], EASE.out)})`,
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
                // Stagger 2 frames (~65ms) — long delays make an interface feel slow.
              opacity: at(frame, [doneAt + 12 + i * 2, doneAt + 12 + i * 2 + TIME.row], [0, 1], EASE.out),
              }}
            >
              <div style={{ fontFamily: FONT.app, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
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
              opacity: at(frame, [doneAt + 22, doneAt + 22 + TIME.row], [0, 1], EASE.out),
              transform: `translateY(${at(frame, [doneAt + 22, doneAt + 22 + TIME.row], [14, 0], EASE.out)}px)`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...T.row, fontSize: 14 }}>{b.clientName}</span>
              <Pill bg="rgba(23,160,90,0.12)" color={C.gain} style={{ fontSize: 9 }}>
                ACTIVE
              </Pill>
            </div>
            <div style={{ ...T.meta, fontFamily: FONT.app, fontSize: 11, marginTop: 3 }}>
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
                <div style={{ ...T.meta, fontSize: 10, marginTop: 3 }}>
                  {bookedTenure} · {bookedPayout.charAt(0) + bookedPayout.slice(1).toLowerCase()} payout
                </div>
              </span>
              <span style={{ textAlign: "right" }}>
                <div style={{ ...T.rate, fontSize: 13, color: C.textPrimary }}>₹5,00,000</div>
                <div style={{ ...T.rate, fontSize: 11, marginTop: 3 }}>{bookedRate}</div>
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
            <div style={{ ...T.meta, fontFamily: FONT.app, fontSize: 11, marginTop: 3 }}>+91 9876543210</div>
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