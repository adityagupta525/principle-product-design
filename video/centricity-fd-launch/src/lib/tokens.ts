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
 * Video type scale for 1920×1080. The reference reel sets captions mid-size and
 * lets motion carry the weight rather than filling the frame with type.
 */
export const TYPE = {
  hook:     { fontSize: 58, fontWeight: 600, letterSpacing: "-0.025em", fontFamily: FONT.display },
  caption:  { fontSize: 46, fontWeight: 500, letterSpacing: "-0.02em",  fontFamily: FONT.display },
  brand:    { fontSize: 40, fontWeight: 600, letterSpacing: "0.02em",   fontFamily: FONT.brand },
  sub:      { fontSize: 26, fontWeight: 400, letterSpacing: "0",        fontFamily: FONT.display },
  dataHero: { fontSize: 84, fontWeight: 700, letterSpacing: "-0.03em",  fontFamily: FONT.data, ...TABULAR },
  dataMid:  { fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em",  fontFamily: FONT.data, ...TABULAR },
  label:    { fontSize: 18, fontWeight: 600, letterSpacing: "0.10em",   fontFamily: FONT.display,
              textTransform: "uppercase" as const },
};

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** Phone screens in the Figma file are 375pt wide; panels render at this scale. */
export const PHONE_W = 375;
