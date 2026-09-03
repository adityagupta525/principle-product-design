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
  CAGR + min SIP). Promote to a DS component.
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

## DS gap — `gain` green is unusable as text on the light canvas

Measured against `canvas` (#F7F2ED), the light ground the app itself uses:

| token | hex | ratio on canvas | verdict |
|---|---|---|---|
| `gain` | `#12B76A` | **2.36 : 1** | fails even the 3.0 large-text floor |
| `textMuted` | `#7A828A` | **3.50 : 1** | passes large text only; fails the 4.5 body floor |
| `textSecondary` | `#414141` | 9.18 : 1 | fine |
| `textHeading` | `#2B1E19` | 14.49 : 1 | fine |

`gain` is sized for small status text on `surface` (#FFFFFF), and it does not survive being used
as a figure on `canvas`. It surfaced in the launch film's growth-diagram beat, where the maturity
value was set in `gain` on the canvas ground and was genuinely hard to read; the film now sets
those figures in `textHeading` / `textSecondary` and keeps `gain` for the line, the endpoint dot
and the filled gap — where it is a graphic, not type.

**The gap:** there is no darker green for gain-coloured *text* on light grounds. A `gain/strong`
around 4.5:1 on `canvas` would close it. Not hand-forked anywhere — logged for a version sprint.
