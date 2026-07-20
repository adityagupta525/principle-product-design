// =============================================================================
// funds.fixtures.ts — SINGLE SOURCE OF TRUTH for Fund Discovery demo data
// =============================================================================
// Every Fund Discovery screen renders these canonical records. No screen may
// hard-code a fund number inline — pull from here so the same fund shows the
// same value everywhere (FD-00 hero + most-invested, FD-01 list + filter sheet,
// FD-02 detail, FD-04 category browse).
//
// The Figma product frames ("Centricity App — Product Screens", page
// "Fund Discovery (demo)") are hand-synced to these values until a runtime
// binding exists. `cagr3Y` is LOCKED to the list/detail set — the mismatched
// Home numbers (24.6 / 18.2 / 7.4) were corrected to 22.4 / 16.1 / 8.2.
//
// Numbers are representative placeholder data (per the FD-00 canvas caption),
// not live market data.
// =============================================================================

export type FundCategory = 'Equity' | 'Debt' | 'Hybrid' | 'Index' | 'ELSS';

export type FundRisk =
  | 'Low'
  | 'Low–Mod'
  | 'Moderate'
  | 'Mod–High'
  | 'High'
  | 'Very High';

/** NRI eligibility — canonical, sourced from the policy service at order time. */
export interface FundNRI {
  eligible: boolean;
  repatriable: boolean;
  /** Primary badge shown on cards; REPATRIABLE implies eligible + NRE route. */
  flag: 'ELIGIBLE' | 'REPATRIABLE';
}

export interface Fund {
  id: string;
  name: string;
  amc: string;
  category: FundCategory;
  subCategory: string;
  nri: FundNRI;
  /** 3-year CAGR (%). CANONICAL — identical on every screen. */
  cagr3Y: number;
  nav: number; // ₹
  expense: number; // %
  aum: number; // ₹ Cr
  minSip: number; // ₹
  risk: FundRisk;
  crisil: number; // ★ 1–5
}

const ELIGIBLE = { eligible: true, repatriable: true, flag: 'ELIGIBLE' } as const;
const REPATRIABLE = { eligible: true, repatriable: true, flag: 'REPATRIABLE' } as const;

export const FUNDS = {
  paragParikhFlexiCap: {
    id: 'paragParikhFlexiCap',
    name: 'Parag Parikh Flexi Cap',
    amc: 'PPFAS Mutual Fund',
    category: 'Equity',
    subCategory: 'Flexi Cap',
    nri: ELIGIBLE,
    cagr3Y: 22.4, // LOCKED (was 24.6 on Home hero)
    nav: 78.42,
    expense: 0.63,
    aum: 62400,
    minSip: 1000,
    risk: 'Very High',
    crisil: 5,
  },
  nipponIndiaSmallCap: {
    id: 'nipponIndiaSmallCap',
    name: 'Nippon India Small Cap',
    amc: 'Nippon India MF',
    category: 'Equity',
    subCategory: 'Small Cap',
    nri: ELIGIBLE,
    cagr3Y: 32.1,
    nav: 178.9,
    expense: 0.75,
    aum: 42800,
    minSip: 500,
    risk: 'Very High',
    crisil: 4,
  },
  motilalOswalMidcap: {
    id: 'motilalOswalMidcap',
    name: 'Motilal Oswal Midcap',
    amc: 'Motilal Oswal MF',
    category: 'Equity',
    subCategory: 'Mid Cap',
    nri: ELIGIBLE,
    cagr3Y: 28.3,
    nav: 96.4,
    expense: 0.66,
    aum: 18200,
    minSip: 500,
    risk: 'Very High',
    crisil: 5,
  },
  hdfcBalancedAdvantage: {
    id: 'hdfcBalancedAdvantage',
    name: 'HDFC Balanced Advantage',
    amc: 'HDFC Mutual Fund',
    category: 'Hybrid',
    subCategory: 'Balanced Adv',
    nri: ELIGIBLE,
    cagr3Y: 16.1, // LOCKED (was 18.2 on Home most-invested)
    nav: 512.3,
    expense: 0.72,
    aum: 94100,
    minSip: 500,
    risk: 'Moderate',
    crisil: 4,
  },
  iciciPruCorporateBond: {
    id: 'iciciPruCorporateBond',
    name: 'ICICI Pru Corporate Bond',
    amc: 'ICICI Prudential',
    category: 'Debt',
    subCategory: 'Corporate Bond',
    nri: REPATRIABLE,
    cagr3Y: 8.2, // LOCKED (was 7.4 on Home most-invested)
    nav: 28.6,
    expense: 0.35,
    aum: 27400,
    minSip: 500,
    risk: 'Low–Mod',
    crisil: 4,
  },
  miraeELSSTaxSaver: {
    id: 'miraeELSSTaxSaver',
    name: 'Mirae ELSS Tax Saver',
    amc: 'Mirae Asset',
    category: 'ELSS',
    subCategory: 'ELSS',
    nri: ELIGIBLE,
    cagr3Y: 19.7,
    nav: 43.1,
    expense: 0.58,
    aum: 21600,
    minSip: 500,
    risk: 'Very High',
    crisil: 4,
  },
  miraeLargeCap: {
    id: 'miraeLargeCap',
    name: 'Mirae Large Cap',
    amc: 'Mirae Asset',
    category: 'Equity',
    subCategory: 'Large Cap',
    nri: ELIGIBLE,
    cagr3Y: 18.9,
    nav: 102.7,
    expense: 0.54,
    aum: 38900,
    minSip: 500,
    risk: 'Very High',
    crisil: 4,
  },
  axisMidcap: {
    id: 'axisMidcap',
    name: 'Axis Midcap',
    amc: 'Axis Mutual Fund',
    category: 'Equity',
    subCategory: 'Mid Cap',
    nri: ELIGIBLE,
    cagr3Y: 24.3,
    nav: 89.2,
    expense: 0.56,
    aum: 29300,
    minSip: 500,
    risk: 'Very High',
    crisil: 5,
  },
} satisfies Record<string, Fund>;

export type FundId = keyof typeof FUNDS;

// -----------------------------------------------------------------------------
// Screen collections — what each Fund Discovery surface renders, by fund id.
// These bindings are the contract the Figma frames are synced to.
// -----------------------------------------------------------------------------
export const FD_COLLECTIONS = {
  /** FD-00 · Discover Home — "Top rated" hero carousel */
  fd00TopRated: ['paragParikhFlexiCap', 'nipponIndiaSmallCap', 'motilalOswalMidcap'],
  /** FD-00 · Discover Home — "Most invested by Centricity users" */
  fd00MostInvested: ['hdfcBalancedAdvantage', 'iciciPruCorporateBond'],
  /** FD-01 · Fund Search — default list + filter-sheet results */
  fd01SearchResults: [
    'paragParikhFlexiCap',
    'hdfcBalancedAdvantage',
    'iciciPruCorporateBond',
    'miraeELSSTaxSaver',
  ],
  /** FD-02 · Fund Detail — canonical evaluation surface */
  fd02Detail: 'paragParikhFlexiCap',
  /** FD-04 · Category Browse — Equity (SEBI equity sub-taxonomy) */
  fd04EquityBrowse: ['paragParikhFlexiCap', 'nipponIndiaSmallCap', 'miraeLargeCap', 'axisMidcap'],
} satisfies {
  fd00TopRated: FundId[];
  fd00MostInvested: FundId[];
  fd01SearchResults: FundId[];
  fd02Detail: FundId;
  fd04EquityBrowse: FundId[];
};

// -----------------------------------------------------------------------------
// Formatters — the only approved way to render fixture numbers on a card.
// -----------------------------------------------------------------------------
export const fmtCagr = (f: Fund): string => `+${f.cagr3Y.toFixed(1)}%`;
export const fmtCategory = (f: Fund): string =>
  `${f.category.toUpperCase()} · ${f.subCategory.toUpperCase()}`;
export const fmtCrisil = (f: Fund): string => `CRISIL ${f.crisil}★`;
export const fmtRisk = (f: Fund): string => `Risk · ${f.risk}`;
export const fmtNav = (f: Fund): string =>
  `₹${f.nav.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const getFund = (id: FundId): Fund => FUNDS[id];
