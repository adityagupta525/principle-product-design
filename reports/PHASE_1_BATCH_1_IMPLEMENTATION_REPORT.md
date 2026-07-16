# Phase 1 — Batch 1 Implementation Report

**Module:** Authentication & Identity (Phase 1, per `05_IMPLEMENTATION_SEQUENCE.md`)
**Batch:** 1 · Entry & Verification spine — **A02 Contact Verification** + **A01 NRI Welcome & Registration**
**Product file:** Figma "Centricity App — Product Screens" (`lONlOopWl7kSMJJVopppg8`)
**Date:** 2026-07-16
**Status:** Screens built and screenshot-validated. **Batch gate NOT closed** — blocked on LG-01 promotion (see §5).

---

## 1. Step 0 — Pre-build key-verification (completed before any pixels)

Verified by importing each component by key and reading its variant/property API (not relevance-capped search):

| Target | Verdict |
|---|---|
| **OTPInput** | ✅ In DS. `state` = `empty · typing · filled · error · resend-timer · expired · locked` (all v1.5 extended states) + `helperIcon`. Key `00dfc4f3…` |
| **ActionListItem `trailing=chip`** | ✅ In DS. `trailing` = `chevron · value · none · chip`; `state` = `default · pressed`; `destructive`. Per its contract, ALI covers **SE02 Session Row, SE03 Trusted Device Row, SE04 Security Activity Row** as compositions — no bespoke row component. Key `d61626…` |
| **PageHeader** | ✅ **Composition verdict** (no new component). DS "Header" is greeting-only; sub-screen header = IconButton (`icon/stroke/caret-left`) + title text (+ optional trailing action) |
| **CountrySelector** | ⚠️ **Genuine gap → staged as LG-01** (only `PhoneInput` exists, in the *unsubscribed* "NRI figma design" org library) |
| Toast / MaskedSensitiveInput / RecoveryStatusCard | ✅ All confirmed live (Toast resolves Phase-0 gap G13) |

## 2. Staging — LG-01 CountrySelector (per approved staging model)

Built on the `_staging` page at full DS quality, token/variable-bound throughout:
- **Trigger field** — component set `CountrySelector` with `state` variants `default · focus · error · disabled`; 1:1 text props `label · country · dialCode · helperText` wired across all 4 variants. Flag slot, Tabular dial code, `icon/fill/caret-down`.
- **Picker** — searchable **BottomSheet** (modal-replacement law): grabber, "Select country" title, search affordance, **Frequently used** (UAE +971 selected w/ copper check, Singapore +65) + **All countries** rows with right-aligned Tabular dial codes and flag slots.
- **Consumed** by A01 as instances of the staged component.
- **Follow-up at promotion:** set the picker search placeholder to "Search countries" (currently shows the reused FundSearchBar default).
- Logged on the **Cover Library Gap list** with a **PROMOTE TO DS** tag.

## 3. Screens built

**A02 · Contact Verification (10 frames):** Default (OTP + live resend countdown) · Loading · Error (`error.otp`) · Offline (`error.network`) · Suspended (OTP locked) · Restricted (email fallback) · Success (positive, explicitly *not* KYC) · Empty (Send code) · Expired · Email-link waiting.
Components: IconButton+caret (PageHeader), ProgressStepper (caption overridden to "Step 2 of 3 · Verify contact"), OTPInput, Button, Alert, ghost link.

**A01 · NRI Welcome & Registration (9 frames):** Default · Loading · Empty (no country) · Success (started → verify contact) · Error (`error.generic`) · Offline (`error.network`) · Restricted (unsupported country) · Suspended · Resumable.
Components: wordmark + Help ghost (top bar), hero, **staged CountrySelector instance**, Button (primary/ghost), Alert, terms footer.

Each screen carries the spec §10 8-state baseline; frames named `screen ID / state`; wrapped in titled Sections.

## 4. Copy provenance (copy never invented)

- Verbatim `content/copy.js` voice tokens where they exist: `error.otp`, `error.network`, `error.generic`.
- Screen-specific microcopy from each screen's **approved §19 UX Writing Guidance** in the spec (also approved text).
- **Guardrail honored:** `success.kycVerified` deliberately NOT reused — A02/A04 success must not imply KYC (spec non-goal). A02 success reads "Contact verified … this isn't KYC yet".

## 5. Gate status & next

- **State Gate / Component Gate / Token Gate:** on track — all values variable/style-bound; reuse-before-create honored; only one true gap (LG-01), staged not forked.
- **⛔ Blocking exit criterion (recorded in CLAUDE.md + Cover):** Phase 1 gate cannot pass until **LG-01 is promoted into the DS file, published, and swapped** into A01/A17 as published-library instances.
- **Next:** Batch 2 — A03 Login + A04 PAN Verification.
