# CLAUDE.md — Centricity Product Screens · Session Governance

This file is the **first thing to read every session**. It fixes the current state, the
authority pointers, the reading discipline, the session protocol, and the workspace rule.
Read it before any other document and before touching Figma.

---

## (a) CURRENT STATE

> **⚑ ACTIVE PHASING — DEMO-FIRST (manager demo, supersedes the batch plan).**
> The auth work (Batches 1–3: A01–A04, A16–A17) is **committed and PAUSED** — good, kept, not
> reopened. Batch 4 (device/session) is **stopped mid-flight** and returns later. The live
> sequence is now **manager-demo driven, HAPPY FLOWS ONLY**:
> **D1 Portfolio → D2 Investing → D3 Home (existing user).**
> - **3–4 frames per screen MAX** — `default`, `filled/interacting`, `success`. **Zero
>   error/edge/offline/restricted states for now** (they return in a later hardening pass).
> - Every demo screen obeys **§(g) PRODUCT VISUAL LANGUAGE** from frame one.
> - **Retroactive auth migration** (re-skinning A01–A17 to §(g)) is **deferred** — do not touch
>   the paused auth frames during the demo push.
> - Cadence per screen: Mobbin fintech pull → build → screenshot → **pause for review** before
>   the next demo module.

**Centricity DS v1.5 — PUBLISHED.** The design system library is live and is the single
source of truth for every component, variable, token, and text style used in the screens
phase.

What v1.5 shipped on top of v1.4:

- **Icon Swap System** + **Exposure Pass 2** (previously-internal components exposed to the
  published library surface).
- **Auth-gap components** — closing the Phase 1 Library Gap list (G1–G13 in
  `PHASE_0_AUDIT_REPORT.md` §4.2 are now **RESOLVED**):
  - **MaskedSensitiveInput** — full `state × visibility` matrix (mask/reveal policy with
    step-up).
  - **OTP** — extended with **resend-timer**, **expired**, and **locked** states (on top of
    empty/typing/filled/error).
  - **RecoveryStatusCard** — request state, wait timer, next step, support path.
  - **ALI (Action-List Item)** — trailing slot supports **chip**.
- **Audit-hardened / canonicalized APIs** (use these exact names — do not introduce a second
  naming system):
  - **Button** — variant/size values are **lowercase**; icon props are **`leadingIcon`** /
    **`trailingIcon`**.
  - **BankAccountCard** — carries a **`status`** prop.
  - **Chrome** components — **semantic props** (no raw/positional props).

**Governance of the DS file:** the DS library file is **READ-ONLY from the product side**. It
is never edited from the screens work. The DS evolves only through **version sprints**
(v1.4 → v1.5 → …); any new need is a version-sprint request, never a local edit.

**Where the screens phase runs:** the Figma product file **"Centricity App — Product Screens"**.
Rules for that file:
- **Library-linked** to Centricity DS v1.5.
- **Instances only** — zero local components, zero local variables, zero local styles.
- Anything the library lacks goes to the **Library Gap list** (a DS version-sprint input) —
  it is **never hand-drawn, recreated, or forked locally**.

**Staging model (amends "instances only") + BLOCKING exit criterion:** when a required
component is genuinely absent from the published library, do not block the phase and do not
wait for a DS publish. Instead: (a) build it on a **`_staging`** page as a local component at
**full DS quality** (all system laws — Layout Laws, Typography v2, Iconography ladder + stroke
matrix, copper-only, every value variable/style-bound to subscribed library tokens, props 1:1,
states complete); (b) log it on the **Cover Library Gap list** with a gap ID (`LG-01…`) + a
**PROMOTE TO DS** tag; (c) consume it in screens as **instances of the staged component**.
**HARD RULE — a phase's quality gate CANNOT pass until every Library Gap item is promoted into
the DS file, published in a version sprint, and swapped into the screens as published-library
instances.** Staged local components are a temporary bridge, never a phase end-state.

---

## (b) POINTERS (authority map)

- **This repo's 5 execution docs govern all work** (source-of-truth order per
  `00_README.md` / `10_CLAUDE_EXECUTION_OS.md`):
  1. `00_README.md` — repository authority + source-of-truth hierarchy
  2. `01_CLAUDE_PROJECT_CONTEXT.md` — product/design mindset
  3. `05_IMPLEMENTATION_SEQUENCE.md` — binding phase order, gates, closeout
  4. `07_COMPONENT_REQUIREMENT_MATRIX.md` — component requirement IDs
  5. `10_CLAUDE_EXECUTION_OS.md` — binding execution rules + authority order
- **Module specs live in `outputs/`** — one authoritative spec per module, loaded per-phase
  only (see Reading Rule). The **Cross-Module Lifecycle & Entitlement Contract**
  (`outputs/NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`) is authoritative and read in
  full at each phase start alongside that phase's spec.
- **DS code export** — `github.com/adityagupta525/centricity-design-system` — **reference
  only** (never the build surface). Specifically:
  - **`content/copy.js`** — the **approved voice/copy tokens**. **All screen copy comes from
    there. Copy is never invented.**
  - The **README's code-sync backlog** — where design supersedes code (design wins); no action
    in the screens file, tracked for the DS/code teams.

---

## (c) READING RULE

Read **only the current phase's spec + the Lifecycle & Entitlement Contract** — **never all 23
output documents**. Loading specs for phases you are not building is out of discipline. Later
phases' component IDs and specs are mapped at their own phase start.

---

## (d) SESSION PROTOCOL

Every session, in order:
1. **Read `CLAUDE.md` first** (this file).
2. Then read **the current phase of `05_IMPLEMENTATION_SEQUENCE.md`**, and from it, the
   current phase's spec in `outputs/` + the Lifecycle & Entitlement Contract (Reading Rule).
3. Only then proceed to the phase's gated work (audit → plan → build → screenshot).

---

## (e) WORKSPACE RULE

**All screens work happens in web Claude Code sessions on this repo.** There is **no
local-machine state to assume** — the container is fresh each session, the Figma product file
is the live workspace, and everything durable must be committed to this repo or already live
in the published DS library. Re-verify Figma page context and re-load fonts (Figtree) at every
session start; never assume prior in-file state persists beyond what the file itself shows.

---

## (f) TASTE & MATERIALS (applies from Batch 2 onward)

**Materials law (Anti-Drift #1 — flat fills on elevated surfaces are forbidden).** Every
hand-composed elevated container carries the full Centricity material recipe, not just a solid
fill: elevation **surface** (`surface/raised|card|sheet`) + the **4% grain overlay** (the DS
grain image, `blend=OVERLAY, opacity 0.04, TILE` — reuse the DS grain image hash) + the correct
**shadow effect style** (`elevation/raised|card|sheet`) + a 1px **hairline top highlight** where
the glass/elevated recipe applies. Sheets use the real BottomSheet recipe (sheet surface + grain
+ grabber + `elevation/sheet`). Bake materials in from the first frame of every screen.

**Chrome & structure.** Every screen frame includes the **StatusBar** instance (full-bleed, top
safe area) and respects safe areas (bottom home-indicator inset on the action bar). **No spacer
rectangles/frames** — all spacing via auto-layout `itemSpacing`/padding bound to `space/*`;
bottom-pin CTAs via a `Content` region (`layoutGrow=1`) + a pinned `ActionBar`.

**Reference discipline (Mobbin).** Before speccing each batch, use the **Mobbin** connector to
pull **2–3 shipped-app reference patterns** for that batch's flows, searching **by app name**
(security/auth: **Revolut, Wise, N26, CRED, Monzo**) and note adopted/adapted patterns in the
batch plan. **References must be fintech/banking unless explicitly approved otherwise** — if a
named app doesn't surface, SAY SO and list fintech alternatives; never silently substitute
non-fintech. References inform **LAYOUT PATTERNS ONLY** — visual identity stays **100% Centricity**.

**Type & presence rules (permanent, checkable).**
- **Type drama:** every screen opens at **title/24-bold minimum** (A01-class landing screens may
  use **32/40**); **one support line max** under the headline — deeper nuance moves into field
  helper lines, never a paragraph.
- **Meta/counters** (step counters, timers-as-labels, section eyebrows) are always **mono
  datalabel uppercase** (Tabular, letter-spaced, `text/meta`).
- **One stated focal anchor per screen** (A02 = the OTP row, visibly active first box + caret;
  A01 = the headline block) — everything else one step quieter. Raycast single-glow discipline:
  at most one rim-glow/hero.
- **Empty space is premium** — never fill it; but content that exists must have presence
  (scale + contrast). Sparse-and-weak reads unfinished; sparse-and-confident reads premium.
- **Brand header:** landing screens open with the **Wordmark** instance (~20px, left) + ghost
  copper `Help`, hairline divider under the header row. Sub-screens use the back+title
  PageHeader composition.
- **Rhythm:** vertical gaps only from the section scale (**16/24/32/40**); headline-group →
  first field = 32; label → field = 8; field → helper = 8.
- **Density diet:** max **5 visual blocks** between header and CTA; legal footer = single
  caption line in `text/tertiary`; secondary exits are ghost copper links, no underline.
- **Depth check at 1x:** before a batch closes, render key frames at full res — the hairline
  top highlight must be visible on every raised field and the CTA; an elevated surface that
  reads flat at 1x has an incomplete material recipe.

A **copper-blueprint** illustration style (technical copper line-art on obsidian, dotted grid)
is approved for future empty-state / onboarding art — **taste note only; no illustrations in
Phase 1.**

---

## (g) PRODUCT VISUAL LANGUAGE — NORTH STAR (supreme composition truth)

Extracted from the hi-fi designs on the **`_reference — North Star`** page (the *Existing_User*
home + activation homes are the composition/density truth). **These laws apply to ALL demo
screens from frame one.** They sit *on top of* the DS material/type/chrome laws in §(f) — never
in place of them: every surface still carries the full Centricity material recipe, every value is
still token-bound, every component is still a published-library instance. The North Star governs
**composition, generosity, and hero treatment**; the DS governs **materials and tokens**.

1. **SPLIT FOOTER.** Sub-screen action bars are a **square raised back-IconButton** (56×56,
   `radius/lg`) on the **left** + a **metal CTA filling the remaining width**, gap `space/3`.
   (Replaces the stacked primary-over-ghost auth footer on demo screens.) The back-IconButton
   uses the raised material recipe; the CTA is the metal/copper-gradient button.
2. **TWO-TONE HEADLINE.** Screen headlines are **display/34 Bold**, leading words in **cream**,
   the **final word in `text/tertiary`** (quieted) — e.g. "Your **portfolio**" with *portfolio*
   dropped to tertiary. One headline per screen; still one support line max (§f type drama).
3. **PROGRESS RAIL (where used).** Step rails are **6px, `radius/full` segments**; the filled
   segment is the **metal gradient + a faint copper glow**; unfilled segments are quiet
   hairline/`surface` tracks. (Meta counter above stays mono datalabel uppercase.)
4. **RADIUS & BREATHING.** Fields/cards **`radius/lg` minimum**; **selection cards `radius/xl`**;
   **field height 56**; **card padding 16–20**. Nothing important sits at a tight radius.
5. **SUCCESS MOMENTS = RICH PANEL.** A success state is a **composed panel** — tinted panel +
   **check tile** + **detail rows** (datalabel key · Tabular value) — **never a bare Alert line**.
   (The DS `ConfirmationSuccess` recipe is the reference; routine confirmations still use Toast.)
6. **REFERENCE DENSITY / GENEROSITY.** Match the **Existing_User home card rhythm**: sectioned
   blocks with a **section header + ghost-copper `See all →`**, a mix of **full-bleed hero cards**
   and **horizontal card rows**, generous 16/24/32 vertical rhythm. **The DS components carry the
   materials; the composition must carry the reference's generosity** — sparse-and-confident, hero
   first, never a thin wireframe.

**Portfolio-specific presence (D1), from the hero value card in the reference:**
- **Hero value card** (one per Overview, the single rim-glow anchor): `TOTAL PORTFOLIO VALUE`
  datalabel eyebrow → **huge Tabular ₹ value, Indian digit grouping** (₹3,42,18,650) → **delta
  line** (absolute + %) → **Invested / Today's G-L** stat columns → **privacy eye** toggle. Copper
  accents on obsidian; the ONE rim-glow/hero on the screen.
- **Numerals:** every monetary/percentage value is **Tabular** with **Indian grouping**
  (lakh/crore comma placement), tagged to the DS `numeral/*` styles.
- **One metal CTA per screen** (single-glow discipline); period/segment controls are the DS
  `ButtonGroup`/segmented control; chips are `Tag`; rows are `ActionListItem`.
- **Bottom nav** (existing-user context): Home · Portfolio · Invest · Taxation with the center
  copper FAB — use the DS App Shell / bottom-nav instance, never hand-drawn.

**Retroactive note:** the paused auth screens (A01–A17) predate §(g) and are **not** migrated
during the demo push; a later pass re-skins them (split footer, two-tone headline, rich success).
