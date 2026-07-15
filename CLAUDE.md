# CLAUDE.md — Centricity Screens Phase Workspace

**Audience:** Claude Code (every session, before anything else)
**Repo role:** Execution workspace for building Centricity's product screens in Figma.

## 1. CURRENT STATE

- **Centricity Design System v1.4 is BUILT and PUBLISHED** as a Figma library:
  - 78 component sets, ~344 variants.
  - 34 text styles in 5 role groups.
  - 116+ variables.
  - Layout Laws + binding discipline + Typography v2 + Iconography laws enforced end-to-end.
  - Dark-first, copper-only, 375px.
- **The DS file is READ-ONLY.** Do not edit, extend, or publish to the Design System file.
- **The screens phase now begins** in the product file **"Centricity App — Product Screens"**:
  - Library-linked to Centricity Design System v1.4.
  - **Instances only; zero local components.**
  - Anything missing from the library goes to a **"Library Gap" list** — never hand-drawn, never recreated locally.

## 2. POINTERS

- **This repo's 5 execution docs govern all work:**
  1. `00_README.md` — repository authority, source-of-truth hierarchy, product context.
  2. `01_CLAUDE_PROJECT_CONTEXT.md` — product/design mindset (how to think).
  3. `05_IMPLEMENTATION_SEQUENCE.md` — binding phase order (Phase 0 → Phase 10), gates, closeout.
  4. `07_COMPONENT_REQUIREMENT_MATRIX.md` — component requirement IDs (F/N/FR/FB/CA/DD/FI/CO/SE/RD/SP).
  5. `10_CLAUDE_EXECUTION_OS.md` — binding execution rules, incl. the authority order in section 2.
- **Module specs live in `outputs/`** (10 locked module specs + architecture/context docs).
- **DS code export:** github.com/adityagupta525/centricity-design-system — **reference only** for:
  - `content/copy.js` (approved voice/copy tokens), and
  - the README's code-sync backlog.
  - Do **NOT** clone it into context.

## 3. READING RULE

- Module specs are **60–136K each**. Read **ONLY**:
  - the current phase's module spec, plus
  - `outputs/NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`.
- **Never bulk-load all 23 output documents.**

## 4. SESSION PROTOCOL

Every new session starts by:
1. Reading this `CLAUDE.md`.
2. Reading the **current phase section** of `05_IMPLEMENTATION_SEQUENCE.md`.
