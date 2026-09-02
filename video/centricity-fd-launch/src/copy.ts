/**
 * ══════════════════════════════════════════════════════════════════════════
 *  COPY — every word in the film. Scenes hold no literals.
 *
 *  Sources
 *   • Beats and captions: the PM's "GFF Creatives for FD" sheet.
 *   • Screen content, issuers, rates, names: read from the Figma file
 *     (Centricity FD — Partner App, node 196-7021), so what the film shows is
 *     what the product shows.
 *
 *  CONTENT LAW (why there is so little text here):
 *   • One caption per beat. Five words or fewer.
 *   • One accent word per caption — the only coloured word on screen.
 *   • The UI does the explaining. A caption never narrates what the screen
 *     already shows; it names the benefit the screen just proved.
 *   • The audience is the PARTNER (MFD/distributor), not the end investor —
 *     hence "your client's chat", not "your money".
 *
 *  ⚠️  Rates carried over from the Figma mockups are design placeholders.
 *      Before release each on-screen rate needs a compliance-approved value
 *      and its "as on <date>" qualifier.
 * ══════════════════════════════════════════════════════════════════════════
 */

/** A caption is split so exactly one phrase can carry the accent colour. */
export type Caption = { lead: string; accent: string; tail?: string };

/** Issuer rows, as they appear in the app's Compare tab. */
export const ISSUERS = [
  { name: "ICICI Home Finance", short: "ICICI Home Fin.", tenure: "2Y",    rate: "7.50%", logo: "#E0532B", maturity: "₹1,15,114", interest: "+₹15,114" },
  { name: "Suryoday Small Fin.", short: "Suryoday SFB",   tenure: "3Y 3M", rate: "7.50%", logo: "#1E3A8A", maturity: "₹1,22,440", interest: "+₹22,500" },
  { name: "Unity Small Financ…", short: "Unity SFB",      tenure: "1Y",    rate: "7.30%", logo: "#F2C230", maturity: "₹1,35,500", interest: "+₹35,040" },
  { name: "Utkarsh SF Bank",     short: "Utkarsh SFB",    tenure: "3Y",    rate: "8.25%", logo: "#5B2A86", maturity: "₹87,000",   interest: "+₹6,800",  best: true },
  { name: "Mahindra Finance",    short: "Mahindra Fin.",  tenure: "2Y 3M", rate: "8.10%", logo: "#E0342C", maturity: "₹1,50,000", interest: "+₹50,220" },
  { name: "Shriram Finance",     short: "Shriram Fin.",   tenure: "3Y 6M", rate: "7.10%", logo: "#F2C230", maturity: "₹2,10,000", interest: "+₹61,478" },
] as const;

export const COPY = {
  /** Beat 1 — Compare. The hook and the first caption are one thought. */
  compare: {
    hook: ["Six issuers.", "Six tabs.", "Every single time."],
    caption: { lead: "Six issuers,", accent: "one screen.", tail: "" } as Caption,
    screenTitle: "Fixed Deposit",
    tableTitle: "Compare FD rates",
    payoutLink: "Half-yearly",
    columns: { issuer: "ISSUER", tenure: "TENURE", rate: "RATE" },
    filters: ["All", "Short (≤ 2 Y)", "Medium (2-3 Y)", "Long"],
    footerCount: "4 of 4 added",
    footerAction: "Download Comparison",
  },

  /** Beat 2 — Calculator. */
  calculate: {
    caption: { lead: "Exact returns,", accent: "instantly.", tail: "" } as Caption,
    screenTitle: "Calculate FD Returns",
    amountLabel: "INVESTMENT AMOUNT",
    amount: "₹ 5,00,000",
    chips: ["₹1L", "₹5L", "₹10L", "₹25L"],
    listTitle: "Top 6 FDs",
    sortLink: "Tenure: Low to high",
  },

  /** Beat 3 — Share. Centricity-branded, sent under the partner's name. */
  share: {
    caption: { lead: "Your brand, in your", accent: "client's chat.", tail: "" } as Caption,
    screenTitle: "Download comparison",
    cardTitle: "FD RATE COMPARISON",
    cardSub: "Half-yearly payout · Senior citizen · Woman",
    sentByLabel: "Sent by:",
    partnerName: "Somesh Nayak",
    partnerContact: "+918869808079 · somesh@centricity.co.in",
    action: "Download",
    chatName: "Utkarsh Verma",
    chatMessage: "Sir, ye comparison dekh lijiye.",
    chatTime: "9:41 AM",
  },

  /** Beat 4 — Book. */
  book: {
    caption: { lead: "Booked in", accent: "under 3 minutes.", tail: "" } as Caption,
    sheetTitle: "Select client",
    issuer: "Mahindra Finance",
    issuerMeta: "BANK · SENIOR CITIZEN · WOMEN",
    issuerTerms: "7.80% · 3Y 3M · QUARTERLY",
    clientName: "Utkarsh Verma",
    clientPhone: "9876543210",
    action: "Invest now",
    progress: ["Verifying client", "Placing with issuer", "Confirming"],
    successTitle: "FD Booked",
    successSub: "Now in My FDs",
    myFdsTitle: "My FDs",
    myFdsStats: [
      { value: "₹18.5L", label: "AUM" },
      { value: "12", label: "Active FDs" },
      { value: "2", label: "Maturing Soon" },
    ],
  },

  /** Beat 5 — End card. */
  end: {
    coBrand: "BLOSTEM",
    line: { lead: "Fixed Deposits,", accent: "reimagined.", tail: "" } as Caption,
  },
} as const;
