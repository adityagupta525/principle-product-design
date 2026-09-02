/**
 * ══════════════════════════════════════════════════════════════════════
 *  COPY — SINGLE SOURCE OF TRUTH FOR EVERY WORD IN THE FILM
 *  Edit here only. No string is hard-coded in any scene component.
 *
 *  ⚠️  STATUS: PLACEHOLDER — awaiting the PM's approved FD content.
 *      Every value below is a structurally-correct stand-in written to the
 *      Obsidian Intelligence voice (numbers over adjectives, ≤6 words per
 *      beat). Swap the strings; the scenes do not change.
 *
 *  ⚠️  RATES AND MATURITY FIGURES ARE ILLUSTRATIVE, NOT QUOTED PRODUCT
 *      TERMS. They must be replaced with compliance-approved numbers, and
 *      any rate shown on screen needs its "as on <date>" qualifier.
 * ══════════════════════════════════════════════════════════════════════
 */

export const COPY = {
  coldOpen: {
    line: "Money parked abroad earns 0.5%.",
    // Final word renders in text/tertiary per the two-tone headline law.
  },

  reveal: {
    wordmark: "CENTRICITY",
    feature: "Fixed Deposits",
    kicker: "For NRIs",
  },

  featureOne: {
    eyebrow: "BOOK",
    headline: "Booked in 90 seconds.",
    sub: "NRE, NRO and FCNR. One place.",
  },

  featureTwo: {
    eyebrow: "COMPARE",
    headline: "Every bank. One screen.",
    sub: "Rate, tenure, premature penalty — side by side.",
  },

  featureThree: {
    eyebrow: "EARN",
    label: "NRE · 3 YEARS · PER ANNUM",
    rate: 7.25, // ← illustrative
    rateSuffix: "%",
    principalLabel: "YOU DEPOSIT",
    principal: "₹5,00,000",
    maturityLabel: "YOU RECEIVE",
    maturity: "₹6,16,800", // ← illustrative
    footnote: "Interest on NRE deposits is tax-free in India.",
  },

  trust: {
    headline: "Built on institutional ground.",
    // `mono` = JetBrains Mono. Numbers only — a word set in mono reads as a
    // ticker symbol, not an institution.
    stats: [
      { value: "₹40,000 Cr", label: "ASSETS ADVISED", mono: true },
      { value: "SEBI", label: "REGISTERED", mono: false },
      { value: "32 Mn", label: "NRIs WORLDWIDE", mono: true },
    ],
  },

  cta: {
    wordmark: "CENTRICITY",
    line: "Fixed Deposits. Live now.",
    action: "Open the app",
  },
} as const;
