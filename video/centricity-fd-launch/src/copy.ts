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

/**
 * Issuer rows — name, tenure and rate exactly as the Figma Compare screen
 * carries them. `logo` is the tile colour standing in for the real mark
 * (see the asset note in the README).
 */
export const ISSUERS = [
  { slug: "icici", name: "ICICI Home Finance",   short: "ICICI Home Finance",   tenure: "2Y",    rate: "7.50%", logo: "#E0532B", maturity: "₹1,15,114", interest: "+₹15,114" },
  { slug: "suryoday", name: "Suryoday Small Fin…",  short: "Suryoday Small Fin...", tenure: "3Y 3M", rate: "7.50%", logo: "#2B3A8F", maturity: "₹1,22,440", interest: "+₹22,500" },
  { slug: "unity", name: "Unity Small Financ…",  short: "Unity Small Financ...", tenure: "1Y",    rate: "7.50%", logo: "#FDC937", maturity: "₹1,35,500", interest: "+₹35,040" },
  { slug: "utkarsh", name: "Utkarsh SF Bank",      short: "Utkarsh SF Bank",      tenure: "3Y",    rate: "8.25%", logo: "#5B2A86", maturity: "₹87,000",   interest: "+₹6,800", best: true },
  { slug: "shriram", name: "Shriram Finance",      short: "Shriram Finance",      tenure: "3Y 6M", rate: "7.50%", logo: "#F2C230", maturity: "₹2,10,000", interest: "+₹61,478" },
  { slug: "mahindra", name: "Mahindra Finance",     short: "Mahindra Finance",     tenure: "2Y",    rate: "7.50%", logo: "#E81536", maturity: "₹1,50,000", interest: "+₹50,220" },
] as const;

export const COPY = {
  /**
   * Shot 1 — the question, arriving three times and going unanswered. This is
   * the film's whole setup: for years this question was where the partner's
   * conversation ended.
   */
  ask: {
    q1: "FD ka rate kya chal raha hai?",
    q2: "Bank se acha kuch hai?",
    q3: "Aap bhej sakte ho?",
  },

  /** Shot 2 — ignition. Two words; the second carries the accent. */
  ignite: {
    kicker: "CENTRICITY × BLOSTEM",
    title: "Fixed Deposits",

    /**
     * The positioning, stated at the reveal rather than the sign-off.
     *
     * It first shipped as an 18px label above the end-card lockup and the
     * stakeholder could not read it: "cant see India's first assisted
     * platform its too small, starting me kahi reveal karo". Both halves of
     * that are right. 18px on a 1080 frame is a footnote, and a category
     * claim that arrives in the last six seconds arrives after the audience
     * has already decided what the film is about. It now lands here, at
     * caption scale, on the frame where the product turns on.
     *
     * DIY and ASSISTED read as opposites, which is why the method sits on its
     * own line: the PLATFORM is assisted — a distributor advising a client —
     * and the BOOKING is DIY, meaning no ops desk and no back-and-forth, the
     * partner does it themselves. Said as one sentence the two words cancel
     * out; said as claim and method they are the actual proposition.
     *
     * ⚠️  "India's first" is still an unsubstantiated superlative, and it is
     *     now in the film's most prominent slot rather than its quietest.
     *     This needs clearing before any public showing.
     */
    claim: { lead: "India's first", accent: "assisted", tail: "FD platform." } as Caption,
    method: "DIY FD BOOKING",
  },

  /** Beat 1 — Compare. */
  compare: {
    hook: ["Six issuers.", "Six tabs.", "Every single time."],
    caption: { lead: "Six issuers,", accent: "one screen.", tail: "" } as Caption,
    screenTitle: "Fixed Deposit",
    tableTitle: "Compare FD rates",
    payoutLink: "Half-yearly",
    columns: { issuer: "ISSUER", tenure: "TENURE", rate: "RATE" },
    filters: ["All", "Short (≤ 2 Y)", "Medium (2-3 Y)", "Long (3-5 Y)"],
    viewMore: "View more FDs",
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
    partnerName: "Ashish Gupta",
    partnerPhone: "9876543210",
    partnerEmail: "ashish@centricity.co.in",
    partnerContact: "+91 9876543210 · ashish@centricity.co.in",
    action: "Download",
    chatName: "Sneha Patel",
    chatMessage: "Ye comparison dekh lijiye.",
    chatTime: "9:41 AM",

    /**
     * Annotation labels for the card-at-scale beat. Each one names a part of
     * the artefact, in four words or fewer, and each one is a *partner*
     * benefit — not a feature list. Order runs top-down with the card.
     */
    notes: [
      "Live rates, not a screenshot",
      "Four issuers, one view",
      "Your name on it",
    ],
  },

  /**
   * Beat 3b — Detach. The audience, named at the one moment the film shows
   * the artefact leaving the partner's hands for the client's. Detach and
   * Flight were the only shots in the film carrying no words at all; this
   * takes the first of them, and Flight stays silent because its job is
   * continuity, not spectacle.
   */
  detach: {
    caption: { lead: "Built for", accent: "wealth distributors.", tail: "" } as Caption,
  },

  /** Beat 4 — Book. */
  book: {
    caption: { lead: "Booked in", accent: "under 3 minutes.", tail: "" } as Caption,
    sheetTitle: "Select client",
    issuer: "Utkarsh SF Bank",
    issuerMeta: "BANK · SENIOR CITIZEN · WOMEN",
    issuerTerms: "8.25% · 3Y · QUARTERLY",
    clientName: "Sneha Patel",
    clientPhone: "9876543210",
    action: "Invest now",
    progress: ["Verifying client", "Placing with issuer", "Confirming"],
    successTitle: "FD Booked",
    successSub: "Now in My FDs",
    /**
     * The lifecycle, named. The My FDs list already CARRIES the stages — the
     * booked FD arrives as ACTIVE, Rajesh Kumar's reads MATURING IN 7 DAYS,
     * and the stat row counts Active against Maturing Soon. None of that was
     * ever named, so the beat read as "here is a list" rather than "here is
     * every FD you hold, at the stage it is at".
     *
     * This started as a 28px label in the last 39 frames and came back from
     * review as "My FD tracking part is missing" — that is a label doing a
     * statement's job at the tail of the film's longest shot, which is the
     * same failure the claim had at 18px. It is now a full caption, and the
     * booking statement clears earlier to give it 57 frames of its own.
     *
     * KNOWN EXCEPTION to the one-caption-per-beat rule at the top of this
     * file: Book now carries two, in sequence, never together. The rule is
     * there so a beat says one thing at a time, and it still does — but the
     * exception is real and is written down rather than quietly taken.
     */
    track: { lead: "Every FD you hold,", accent: "tracked to maturity.", tail: "" } as Caption,
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
    tagline: "TOGETHER FORWARD",
  },
} as const;
