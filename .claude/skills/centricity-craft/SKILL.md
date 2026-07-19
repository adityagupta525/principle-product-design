---
name: centricity-craft
description: mandatory craft, scope, and token rules for all Centricity product-screen work — load before any Figma work in this repo
---

# Centricity Craft — scope, visual language, token protocol

Load before any Figma work on the Centricity product screens. Binding. Supersedes prior batch
plans. Kept in sync with `CLAUDE.md` (a)/(b)/(c).

**Reference truth:** the `_reference — North Star` Figma page (hi-fi owner designs). Match its
**composition**, not just tokens. **DS v1.5 is READ-ONLY** — genuine gaps go to `BACKLOG.md`,
never a local fork. Copy comes from the DS repo `content/copy.js`; never invented.

## (a) SCOPE AMENDMENT — product-owner override

- **HAPPY FLOWS ONLY.** Max **3 frames per screen** (`default`, `filled`, `success`). Every
  error / empty / offline / suspended / restricted state → `BACKLOG.md` "Hardening", **never on
  canvas**.
- **ONBOARDING SIMPLIFIED** to mandatory compliance fields only (NSE/AMFI/SEBI minimums), in order:
  **mobile + OTP (floating keypad) → email → PAN → KYC auto-check via 3rd party (auto-fetched
  name/DOB/address — user CONFIRMS prefilled data, never types it) → residency → bank NRE/NRO +
  account + IFSC (bank/branch auto-fetched) → FATCA (dropdown-led) → nominee (skippable, "Do it
  later") → Review & eSign.**
  - **Risk profiling is NOT in onboarding.**
  - **KYC-not-found = ONE handoff screen** to the 3rd-party KYC app **+ ONE return state**; the
    KYC flow itself is never designed.
- **COPY VOICE:** warm, confident Indian friend. Short sentences. **Zero legalese on canvas**
  (legal behind links). **Max one support line per screen.** Less text is a feature.

## (b) PRODUCT VISUAL LANGUAGE — match North Star composition

Indian premium, patriotic warmth, never generic dark UI. On top of the DS material recipe;
every value stays token-bound.

- **SPLIT FOOTER:** 56px square back-IconButton (radius-lg) + metal CTA filling remaining width,
  gap `space/3`.
- **TWO-TONE HEADLINE:** display/34 (hero value **display/40**), leading words cream + final word
  `text/tertiary`.
- **PROGRESS RAIL:** metal-gradient 6px radius-full segments (filled = metal + faint copper glow);
  unfilled quiet hairline.
- **RADIUS/BREATHING:** fields/cards radius-lg min, selection cards radius-xl, 56px field height,
  16–20 card padding.
- **SELECTION RADIO-CARDS:** copper-gradient selected border.
- **SUCCESS = rich verified panel** (tinted panel + check tile + detail rows) — never a bare Alert
  line.
- **FLOATING NUMERIC KEYPAD** — stage as **LG-03**.
- **IMAGERY / 3D-ICON SLOTS** on hero cards, sized per the reference — **build the slots now**
  (styled placeholder); real assets land in `_staging` from the owner's pipeline.
- **BRAND MOMENT exception:** tricolor "GROW WITH भारत" + textured sepia hero — **pre-auth landing
  ONLY.**
- Numerals **Tabular + Indian grouping**; **mono datalabels quieter than content**; one rim-glow +
  one metal CTA per screen.
- **PRIVACY / HIDE LAW:** when values are hidden, **EVERY rupee amount on the screen masks** (hero
  value, return cards, holding values, metric tiles) → `₹••••••` Tabular dots. Percentages may stay.
  **Layout must not shift.**
- **CHART PATTERN LAW:** a LineChart card **never renders its x-axis period-label row when a period
  ButtonGroup is present** — chips are the only period control. Applies everywhere.

## (a2) COPY LAW — execution-only voice

Centricity is **execution-only**. **No directive / advice / instructional language anywhere** on
canvas — no "stay the course", "hold on", "you should", "consider", "buy/sell now". State facts, not
counsel. Perspective lines are **factual only** (e.g. "+₹56,10,400 since you started"). This sits on
top of the warm-Indian-friend voice in (a).

## (c) TOKEN PROTOCOL — hard rules

- **Batches of MAX 2 screens.** **Screenshot ONLY at batch end.**
- **NEVER propose or run audits / passes / migrations unprompted** — log to `BACKLOG.md`.
- **Reuse validated frames by cloning.**
- **Reports ≤10 lines.**
- **PLACEMENT LAW:** every new frame is created **inside a titled Section**, placed **adjacent to
  its module's existing sections** on the correct page — never at arbitrary/far coordinates. Keep a
  module's frames grouped under titled Sections (e.g. Overview · Holdings/Position · Transactions).
