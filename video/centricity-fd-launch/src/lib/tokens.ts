import brand from "../../brands/centricity.json";

export const C = brand.colors;

/**
 * Urbanist is the primary face (the product owner's call).
 * Montserrat is the file's own `--cen-family-brand`, reserved for the brand
 * lockup and the shareable card's header — the places the app uses it.
 * Numerals stay in Urbanist with tabular figures: this design system has no
 * mono face, and importing one would be inventing a token.
 */
export const FONT = {
  display: "Urbanist",
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
