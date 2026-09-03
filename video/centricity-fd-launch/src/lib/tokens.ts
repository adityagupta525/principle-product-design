import brand from "../../brands/centricity.json";

export const C = brand.colors;

/**
 * The film's room. The app screens stay exactly as the design system defines
 * them — white, warm-accented — and the film puts them in the dark, where a
 * white panel reads as a light source. Nothing here overrides a product token.
 */
export const CINE = {
  void: "#0A0A0C",
  deep: "#141417",
  key: "#B69377",        // the DS accent, used as a key light
  keyHot: "#D9A87E",     // its bloom
  type: "#ECE7E1",       // never pure white
  typeDim: "#8C857E",
};

/**
 * THE LIGHT ACT.
 *
 * ref1 does not hold one tone for its whole runtime — it opens light, drops to
 * a dark act, and comes back up for its payoff. Ours is a loop, so it cannot
 * end on a different tone than it starts (the seam would flash white on a booth
 * screen every 54 seconds). It therefore goes dark → light → dark, and the
 * light act carries the argument: the growth curve and the annotated card.
 *
 * Every value here is a product token. The ground is the app's own canvas.
 */
export const LIT = {
  ground: C.canvas,        // #F7F2ED — the app's canvas, warm not clinical
  ink: C.textHeading,      // #2B1E19
  dim: C.textMuted,        // #7A828A
  accent: C.tabActive,     // #6B4B41 — copper that holds up on cream
  hairline: "rgba(43,30,25,0.10)",
  hairlineFaint: "rgba(43,30,25,0.06)",
};

/**
 * Urbanist is the primary face (the product owner's call).
 * Montserrat is the file's own `--cen-family-brand`, reserved for the brand
 * lockup and the shareable card's header — the places the app uses it.
 * Numerals stay in Urbanist with tabular figures: this design system has no
 * mono face, and importing one would be inventing a token.
 */
export const FONT = {
  /** The film's voice — captions, hook, end card. The owner's primary. */
  display: "Urbanist",
  /** The product's voice. Every app screen is Montserrat, per the Figma file. */
  app: "Montserrat",
  brand: "Montserrat",
  data: "Urbanist",
};

const TABULAR = { fontVariantNumeric: "tabular-nums" as const };

/**
 * THE TYPE RAMP — authoritative. Every film-voice size comes from here; a shot
 * overrides a single property (a colour, a wider eyebrow track) only with intent.
 * The vocabulary is ROLES, not sizes. Mirrors the ramp in VIDEO_DNA §3.
 *
 * Scope: this ramp owns the FILM VOICE (Urbanist / `display`) and the DATA MARK.
 * The PRODUCT VOICE (`app` / Montserrat — app-UI mimicry inside a device, the
 * in-product ₹ callouts) keeps its native DS scale and is not routed here, per
 * VIDEO_DNA's "UI (inside device): native product scale, per DS".
 *
 * Sizes are set to the film's existing intentional values, so routing a site to
 * its role is visually neutral — this makes the scale authoritative without
 * redesigning it.
 */
export const TYPE = {
  // FILM VOICE — Urbanist, set in the void beside the product, never on it.
  /** Shot headline / the central claim. Two-tone, one copper word. */
  hero:      { fontSize: 122, fontWeight: 700, letterSpacing: "-0.05em",  fontFamily: FONT.display },
  /** One-line payoff / end statement. */
  statement: { fontSize: 82,  fontWeight: 700, letterSpacing: "-0.035em", fontFamily: FONT.display },
  /** The personal payoff — a recipient / partner name reveal. */
  payoff:    { fontSize: 68,  fontWeight: 700, letterSpacing: "-0.04em",  fontFamily: FONT.display },
  /** Cinematic caption (the accent word pulls to 700 inside TypeCard). */
  caption:   { fontSize: 46,  fontWeight: 500, letterSpacing: "-0.03em",  fontFamily: FONT.display },
  /** Secondary line under a caption or lockup. */
  sub:       { fontSize: 26,  fontWeight: 400, letterSpacing: "-0.005em", fontFamily: FONT.display },
  /** Eyebrow / kicker over a headline. */
  label:     { fontSize: 18,  fontWeight: 700, letterSpacing: "0.14em",   fontFamily: FONT.display,
               textTransform: "uppercase" as const },
  /** Axis ticks, taglines, the smallest labels. */
  micro:     { fontSize: 15,  fontWeight: 600, letterSpacing: "0.16em",   fontFamily: FONT.display,
               textTransform: "uppercase" as const },

  // DATA MARK — Urbanist tabular, Indian grouping, one accent. Size sits with
  // its chart or device, so the tiers are named rather than forced to one value.
  /** The winning rate, lifted out and held ~10× (Compare). */
  dataMax:  { fontSize: 210, fontWeight: 800, letterSpacing: "-0.05em", fontFamily: FONT.data, ...TABULAR },
  /** Hero number on a device / panel. */
  dataHero: { fontSize: 84,  fontWeight: 700, letterSpacing: "-0.03em", fontFamily: FONT.data, ...TABULAR },
  /** A mid data mark. */
  dataMid:  { fontSize: 40,  fontWeight: 700, letterSpacing: "-0.02em", fontFamily: FONT.data, ...TABULAR },

  // BRAND — Montserrat, where the *product* speaks: the co-brand lockup, card header.
  /** The card / brand header. */
  brand:    { fontSize: 40,  fontWeight: 600, letterSpacing: "0.02em",  fontFamily: FONT.brand },
  /** The end-card co-brand lockup, letter-spaced wide. */
  lockup:   { fontSize: 26,  fontWeight: 700, letterSpacing: "0.22em",  fontFamily: FONT.brand },

  // FAR-PLANE TEXTURE — the giant cropped ghost word behind the device (Ignite).
  // Not read as type; named so it stays authoritative rather than free-floating.
  ghost:    { fontSize: 300, fontWeight: 800, letterSpacing: "-0.06em", fontFamily: FONT.display },
};

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** Phone screens in the Figma file are 375pt wide; panels render at this scale. */
export const PHONE_W = 375;
