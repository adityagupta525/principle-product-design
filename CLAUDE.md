# CLAUDE.md — Centricity Product Screens · Session Governance

**Read this first, every session. Then load the `centricity-craft` skill before any Figma
work in this repo.** This file fixes standing governance; the skill carries the binding craft,
scope, and token rules (a)+(b)+(c) below — the two are kept in sync.

---

## 0. Standing facts (governance — unchanged)

- **Centricity DS v1.5 — PUBLISHED.** Single source of truth for every component, variable,
  token, and text style. The DS library file is **READ-ONLY from the product side**; it evolves
  only through version sprints. Genuine gaps go to **`BACKLOG.md`** — never hand-forked, never a
  local DS edit.
- **Screens run in the Figma product file "Centricity App — Product Screens"**, library-linked to
  DS v1.5. **Instances only** (zero local components/variables/styles except sanctioned
  `_staging` bridges logged as `LG-*`).
- **Authority docs** (source-of-truth order): `00_README.md`, `01_CLAUDE_PROJECT_CONTEXT.md`,
  `05_IMPLEMENTATION_SEQUENCE.md`, `07_COMPONENT_REQUIREMENT_MATRIX.md`,
  `10_CLAUDE_EXECUTION_OS.md`. Module specs in `outputs/` are loaded **per-phase only**, alongside
  the **Cross-Module Lifecycle & Entitlement Contract**. Approved copy tokens: the DS repo's
  `content/copy.js` — copy is never invented.
- **Workspace:** fresh container each session; re-verify Figma page context and reload fonts
  (Figtree) at session start. Nothing durable persists except what is committed here or published
  in the DS.
- **Paused work:** auth screens **A01–A17 are committed and PAUSED** — do not reopen or migrate
  them unprompted.

---

## (a) SCOPE AMENDMENT — product-owner override

- **HAPPY FLOWS ONLY.** Max **3 frames per screen**: `default`, `filled`, `success`. Every
  error / empty / offline / suspended / restricted state goes to the **`BACKLOG.md` "Hardening"
  list — NEVER to canvas.**
- **ONBOARDING SIMPLIFIED** to mandatory compliance fields only (NSE / AMFI / SEBI minimums), in
  this order:
  **mobile + OTP (floating keypad) → email → PAN → KYC auto-check via 3rd party
  (auto-fetched name / DOB / address — the user CONFIRMS prefilled data, never types it) →
  residency → bank NRE/NRO + account + IFSC (bank/branch auto-fetched) → FATCA (dropdown-led) →
  nominee (skippable, "Do it later") → Review & eSign.**
  - **Risk profiling is NOT in onboarding.**
  - **KYC-not-found = ONE handoff screen** to the 3rd-party KYC app **+ ONE return state**. The
    KYC flow itself is never designed.
- **COPY VOICE:** the app talks like a **warm, confident Indian friend** — short sentences, **zero
  legalese on canvas** (legal lives behind links), **max one support line per screen**. Less text
  is a feature.

---

## (b) PRODUCT VISUAL LANGUAGE — supreme truth = the `_reference — North Star` page

Match the reference's **COMPOSITION**, not just its tokens. The reference **Home** screen is the
richness / density bar — **Indian premium, patriotic warmth, never generic dark UI.** These sit on
top of the DS material/token laws; every surface still carries the full Centricity material recipe
and every value stays token-bound.

- **SPLIT FOOTER:** a **56px square back-IconButton** (radius-lg) + a **metal CTA filling the
  remaining width**, gap `space/3`.
- **TWO-TONE HEADLINE:** **display/34** headlines (the hero portfolio value is **display/40**),
  leading words in **cream**, the **final word in `text/tertiary`**.
- **PROGRESS RAIL:** metal-gradient **6px, radius-full** segments (filled = metal + faint copper
  glow); unfilled = quiet hairline.
- **RADIUS / BREATHING:** fields/cards **radius-lg min**, selection cards **radius-xl**, **56px
  field height**, **16–20 card padding**.
- **SELECTION RADIO-CARDS:** copper-gradient **selected border**.
- **SUCCESS = rich verified panel** (tinted panel + check tile + detail rows) — never a bare Alert
  line.
- **FLOATING NUMERIC KEYPAD** — stage as **LG-03**.
- **IMAGERY / 3D-ICON SLOTS** on hero cards, **sized per the reference — build the slots now**
  (placeholder, properly styled). Real assets land in `_staging` from the owner's pipeline.
- **BRAND MOMENT exception:** tricolor **"GROW WITH भारत" + textured sepia hero** — **pre-auth
  landing ONLY.**
- Numerals **Tabular + Indian grouping**; **mono datalabels stay but quieter than content**; one
  rim-glow and **one metal CTA per screen**.

---

## (c) TOKEN PROTOCOL — hard rules

- **Batches of MAX 2 screens.** **Screenshot ONLY at batch end.**
- **NEVER propose or run audits / passes / migrations unprompted** — log the idea to `BACKLOG.md`.
- **Reuse validated frames by cloning.**
- **Reports ≤10 lines.**
- **PLACEMENT LAW:** every new frame is created **inside a titled Section**, placed **adjacent to
  its module's existing sections** on the correct page — never at arbitrary/far coordinates. Keep a
  module's frames grouped under titled Sections (e.g. Overview · Holdings/Position · Transactions).
