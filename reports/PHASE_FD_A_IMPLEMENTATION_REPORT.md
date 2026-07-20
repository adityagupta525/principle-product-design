# Phase FD-A — Fund Discovery Implementation Report

**Module:** Fund Discovery · **Product file:** `lONlOopWl7kSMJJVopppg8`, page *Fund Discovery (demo)*, section *FD-A · Discover · Category · Detail*
**Status:** Built + screenshot-validated at 375px. PAUSED for review before FD-B.

1. **FD-00 layout fix — carousel:** replaced 4 overflowing 258px cards with ONE auto-layout hero rail ("Top rated", 3 cards @323px, intentional ~20px peek — clip impossible; frame clips past 375).
2. **FD-00 icons:** 6 category tiles now carry quiet line glyphs (chart-line-up/chart-bar/chart-pie-slice/chart-bar-fill/receipt/star), text-secondary tier, no fill block — FeatureIcon law.
3. **FD-00 reduction:** dropped the 2nd full carousel; "Most invested" is now a calm 2-row list; category grid reflowed up. Screen breathes.
4. **FD-04 Category Browse (new):** Equity funds, SEBI equity sub-taxonomy chips (All/Large/Mid/Small/Flexi cap), 412-count, 4 equity cards with NRI flags — cloned from FD-01.
5. **FD-02 Fund Detail:** NRI eligibility panel seated after header (eligibility-before-performance): Eligibility ✓NRE/NRO · Repatriable via NRE · USD **UNKNOWN** · Tax·DTAA **UNKNOWN** · source+freshness footnote.
6. **FD-01 search cards:** NRI eligibility flags added (✓ELIGIBLE / REPATRIABLE) to both default + filter-sheet frames.

Redlines: token-bound fills (surface-card/text tiers/status-verified/hairline), execution-only factual voice, UNKNOWN where not spec-backed, one metal CTA on FD-02.

---

## Addendum — FD data-consistency lock (pre-FD-B blocker)

Same fund was showing different 3Y CAGR across screens (Home hero/most-invested ≠ list/detail).

1. **Single source of truth:** `src/data/funds.fixtures.ts` — canonical record per fund (name, AMC, category, subCategory, nri, cagr3Y, nav, expense, aum, minSip, risk, crisil) + `FD_COLLECTIONS` mapping each screen→funds + formatters. Figma frames are hand-synced to it (no runtime binding yet — when FD is coded, import from this file; no inline numbers).
2. **Locked to list/detail values:** Parag Parikh **22.4** (was 24.6 on hero), HDFC **16.1** (was 18.2), ICICI **8.2** (was 7.4). FD-01/FD-02/FD-04 already matched — only FD-00 corrected.
3. **Most-invested rows:** NRI flag slot added to the compact-row variant (HDFC ✓ELIGIBLE, ICICI REPATRIABLE), inline on the category line.
4. **Verified:** FD-00 ↔ FD-01 now match on all 3 funds. Happy-flow only, no new frames.
