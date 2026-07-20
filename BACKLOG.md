# BACKLOG — Centricity Product Screens

Deferred work. Nothing here is built on canvas until the product owner pulls it into a batch.
Per the Token Protocol, ideas for audits/passes/migrations are **logged here, never run
unprompted.**

## Hardening (all non-happy states — deferred from every screen)

Happy flows only ship now (`default` / `filled` / `success`). These states are captured here and
built in a later hardening pass, never on the demo canvas:

- **Error** — validation, service, region-level failures + retry.
- **Empty** — no data / no holdings / no activity / no trusted factor.
- **Offline** — cached/stale, actions disabled.
- **Suspended / Restricted** — account hold, policy blocks, step-up required.
- **Loading** — skeletons / region loading (only if a screen needs it for the happy demo).

## Library Gaps (stage at DS quality, tag PROMOTE TO DS)

- **LG-01** CountrySelector — staged (`_staging`).
- **LG-02** Wordmark — staged (`_staging`).
- **LG-03** Floating numeric keypad — to stage (onboarding mobile+OTP, per visual language).
- **Portfolio compositions** used in D1 (compose from published primitives now; promote later):
  Financial Snapshot (hero value card), Allocation Summary (donut + legend), Holding Row.

## Fund Discovery — composed gaps + deferred states

- **FundCard** — composed from primitives (AMC line-glyph tile + name/AMC + category Tags + 3Y
  CAGR + min SIP). Promote to a DS component. **FD-A:** FundCard now carries an NRI eligibility
  flag pill (✓ELIGIBLE / REPATRIABLE, green-tint radius-full) — fold the flag slot into the DS
  component.
- **NRICard** (FD-02 eligibility panel) — composed card: Eligibility / Repatriation / USD / Tax·DTAA
  rows + source-freshness footnote. USD + Tax show **UNKNOWN** (not spec-backed). Promote to DS once
  launch-country tax/DTAA wording is signed off.
- **FD-01 search cards dropped the "SIP FROM ₹X" microcopy** to seat the NRI flag in the (full) tag
  row. Restore via a taller card / r3 line if owner wants SIP-from back — **pass, needs owner OK.**
- **FD-00 "Most invested" = 2-row list** (reduction pass — one hero carousel + list + grid; a
  mini-card second rail was built then discarded as still too dense).
- **Category-tile glyphs use nearest available DS glyphs** (no coins/gold/scales glyph in the set):
  Debt=chart-bar, Gold&silver=star. Add coins/gold glyphs in a DS sprint for a truer mapping.
- **Fund data = `src/data/funds.fixtures.ts` (single source of truth).** Figma frames are
  hand-synced to it; when FD is coded, every screen imports fixtures — no inline numbers. NAV /
  expense / AUM / minSip for non-detail funds are representative (only Parag Parikh has a detail
  screen); fill real values when their detail screens are built.
- **"Most invested" secondary metric:** rows are ranked by investor count but show 3Y CAGR — add an
  investor-count metric to the compact row if the ranking basis should be visible (pass, needs owner OK).

## FD-03 Fund Detail (deep) — new composed assets → propose for DS promotion

Built on canvas as composed frames for FD-03; promote each to a DS component in a version sprint:

- **Dual-line chart** (copper fund line + muted off-white benchmark, copper area gradient, obsidian) —
  currently a generated SVG; DS component should take `series[]` + `benchmark[]` + period props.
- **What-if calculator block** — One-Time/SIP toggle + metal-gradient rail slider + result card
  (invested vs projected + illustrative disclaimer). Slider thumb/rail need real interaction in code.
- **Peer-comparison table + row** — quiet 3-col table (name·expense·returns) with a **rim-highlight
  "this fund" variant** (copper tint + stroke + glow). Promote table + both row variants.
- **Holdings row** — AMC logo-chip + name + weight% (tabular).
- **AMC logo-chip token** — desaturated/duotone container (copper@12% fill + copper@35% ring +
  monogram placeholder). Real AMC logos land in `_staging` from the owner pipeline; keep duotone,
  never full-colour.
- **Toolbar glyphs** — compare / watchlist / share as custom stroked SVGs (quiet-tier); fold into the
  DS Icon-glyph set. **info-tooltip glyph** proposed but not yet placed (add when a tooltip is needed).
- **Binding note:** metal-gradient + copper accents in the new modules use literal copper-500 values
  (not yet token-bound) — bind on DS promotion.
- **Invest sheet NOT built:** FD-03 "Invest now" routes to the existing Investment module (INV-01–04)
  to avoid duplicating the invest flow. Build a FD→INV in-context sheet only if the owner wants it.
- **RiskMeter:** SEBI copper-gauge compliance confirm still pending (see earlier entry) — now used at
  levelIndex=4 (High) on FD-03.
- **Period ButtonGroup / segmented control** — composed from Tag chips (period + filter rows).
  No DS segmented-control component exists; promote one.
- Present in DS + used: **FundSearchBar**, **RiskMeter** (SEBI), **LineChart**, **Accordion**,
  **BottomSheet**, **Tag**.
- **SEBI Riskometer compliance (confirm before ship):** the Riskometer is a *prescribed
  standardized graphic*. Compliance team to confirm whether the copper-toned custom gauge is
  permissible, or the mandated colour version is required. No design change made now.
- **Hardening (deferred, not on canvas):** Fund Discovery no-results / empty / offline / stale-data
  / restricted-eligibility states; Fund Detail unavailable-data + restricted-purchase states.
- Mobbin: **Groww/INDmoney/Revolut did not surface** — used fintech alternatives (Fidelity,
  Sucorinvest, KakaoBank, Acorns) for layout patterns only.

## DS code-sync (design supersedes code — for a version sprint)

- See `reports/DS_CODE_SYNC_BACKLOG.md` (CS-01 OTP filled-state quiet; CS-02 Alert border @20%).
- **font-size/40 token** — hero portfolio value is display/40; no 40 size token exists in DS
  Typography. Add `font-size/40` in a version sprint; hero value uses a raw 40 until then.
- **Holding Row → ALI trailing=value** — once the ALI value-text slot is exposed, swap composed
  holdings rows to `ActionListItem trailing=value`.
- **LineChart period labels** — chart carries its own faint period-label row; when a period
  segmented control sits below it, reconcile the duplication in the DS component.

## Descope candidates — LOGIN/ONBOARDING page (pending owner confirm before canvas removal)

Risk profiling is explicitly NOT in onboarding (scope amendment). Flagged out-of-scope on the
`LOGIN/ONBOARDING HAPPY FLOW` page — logged here, **not removed from canvas without owner OK**:

- **B11** — Risk profile ("Markets fall 20%…", Q4 of 5).
- **B12** — Investment experience (suitability).
- **Borderline (confirm keep/fold):** B09 CRS self-certification, B10 tax residency — real NRI
  compliance minimums but beyond the amendment's named "FATCA (dropdown-led)" step.
- **Gap:** A02 OTP floating numeric keypad — **DONE** (staged LG-03 `KeypadNumeric`, placed on A02).
- **Step renumber (needs owner OK — it's a pass):** onboarding rails still read "STEP X OF 16".
  After removing B11/B12 the flow is **14 steps** — renumber captions + rail fill-segments across
  B02–B17 (B13→step 10 … B17→step 14).

## Deferred flows / screens

- Auth A01–A17 re-skin to the North Star visual language (split footer, two-tone headline, rich
  success) — paused; do not touch unprompted.
- Batch 4 Device & Session (A18–A20), Batch 5 Account Recovery (A21–A22) — stopped; return later.
- Portfolio P02 Holdings, P03 Holding Detail, P05 Transactions — after the Overview is approved.

## Portfolio module — composed gaps + deferred states

- **Composed from primitives (promote to DS):** Holding Row (logo tile + name + units·NAV mono +
  value + return chip), asset-class **Group Card** (mono class label + subtotal + rows), **Portfolio
  Tabs** segmented control (Overview·Holdings·Transactions — no DS segmented-control exists),
  **Return chip** (sage/brick tinted pill), **Position hero** (from HeroValueCard), **SIP status
  card**, **Recent-activity row**, **NRE/NRO source tag**.
- **Overview needs the Portfolio Tabs control (pass — needs owner OK):** P01 Overview states
  (1–5) don't yet carry the Overview·Holdings·Transactions control that Holdings/Position use; add
  for demo consistency in a later pass. Not applied to approved screens unprompted.
- **Data note:** fund-holdings subtotal (₹3,35,70,900) sits below total portfolio (₹3,42,18,650)
  by design — gold + cash (10%) are non-fund allocation, so they don't appear as holding rows.
- **Hardening (deferred, not on canvas):** Holdings empty/one-fund, all-negative day, redeem-
  blocked/lock-in, SIP paused/failed, transaction failed-retry states.

## Investment module — composed gaps + deferred states

- **Composed from primitives:** invest-type radio-cards (copper-gradient selected border),
  quick-amount chips (Tag). AmountInput, LG-03 keypad, and a rich success panel used directly.
- **Payment handoff (INV-04) is a note/handoff screen only** — the 3rd-party UPI/netbanking
  payment flow itself is never designed (same rule as KYC handoff).
- **Hardening (deferred, not on canvas):** below-minimum amount error, payment failure/timeout/
  retry, insufficient-eligibility/cut-off block, order pending/reversed states.
- Mobbin: Groww/INDmoney/Revolut didn't surface → fintech alternatives (Wealthsimple, Public,
  Wealthfront, KakaoBank, Plum) for layout patterns only.
