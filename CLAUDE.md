# CLAUDE.md — Centricity Product Screens · Session Governance

This file is the **first thing to read every session**. It fixes the current state, the
authority pointers, the reading discipline, the session protocol, and the workspace rule.
Read it before any other document and before touching Figma.

---

## (a) CURRENT STATE

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
pull **2–3 shipped-app reference patterns** for that batch's flows (security/auth: **Revolut,
Wise, N26, CRED**) and note adopted/adapted patterns in the batch plan. References inform
**LAYOUT PATTERNS ONLY** — visual identity stays **100% Centricity**.

**Taste anchors.** Linear-grade restraint (typography-led, zero decoration); Raycast's
single-glow focal discipline (one rim-glow/hero per screen). A **copper-blueprint** illustration
style (technical copper line-art on obsidian, dotted grid) is approved for future empty-state /
onboarding art — **taste note only; no illustrations in Phase 1.**
