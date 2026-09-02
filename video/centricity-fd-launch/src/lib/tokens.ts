import brand from "../../brands/centricity.json";

export const C = brand.colors;

export const FONT = {
  display: "Inter",
  editorial: "Playfair Display",
  data: "JetBrains Mono",
};

/** Video-optimised type scale for 1920×1080 (brand-system.md). */
export const TYPE = {
  hero:      { fontSize: 72, fontWeight: 700, letterSpacing: "-0.03em", fontFamily: FONT.display },
  serifHero: { fontSize: 76, fontWeight: 400, letterSpacing: "-0.01em", fontFamily: FONT.editorial },
  headline:  { fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", fontFamily: FONT.display },
  sub:       { fontSize: 28, fontWeight: 400, letterSpacing: "0",       fontFamily: FONT.display },
  dataHero:  { fontSize: 88, fontWeight: 600, letterSpacing: "-0.02em", fontFamily: FONT.data,
               fontVariantNumeric: "tabular-nums" as const },
  dataMid:   { fontSize: 44, fontWeight: 600, letterSpacing: "-0.01em", fontFamily: FONT.data,
               fontVariantNumeric: "tabular-nums" as const },
  label:     { fontSize: 20, fontWeight: 500, letterSpacing: "0.05em",  fontFamily: FONT.display,
               textTransform: "uppercase" as const },
  badge:     { fontSize: 18, fontWeight: 500, letterSpacing: "0.02em",  fontFamily: FONT.display },
};

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);
