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

---

## 6. Polish pass (materials, chrome, structure)

Applied across all of Batch 1 + the staged component:

- **Materials** (the core fix): the DS material recipe now sits on every hand-composed elevated
  container — CountrySelector field (`surface/raised` + 4% grain image `2e0d44be…` + `elevation/raised`),
  the picker sheet (`surface/sheet` + grain + `elevation/sheet` + grabber), and the Cover cards
  (`surface/card` + grain + `elevation/card`). DS component instances already carried their own
  materials. Recorded as a law in CLAUDE.md §(f).
- **Spacers removed: 9** (all A01 states). Bottom-pinned CTAs now use `Content` (`layoutGrow=1`) +
  a pinned `ActionBar`; no filler frames. All spacing via `itemSpacing`/padding.
- **StatusBar + safe areas:** a local **StatusBar** component (time + signal/wifi/battery) is
  placed full-bleed at the top of all 19 screen frames; action bars carry the bottom home-indicator
  inset. Screens now read as real device screens.
- **Search placeholder:** picker → "Search countries" (fixed now, not at promotion).
- **Flags — environment-blocked (honest note):** real circular flag assets could not be embedded in
  this session — `createImageAsync` is unsupported in the sandbox, `fetch` is undefined, and the
  circle-flags raw/CDN URLs returned 404/403 via WebFetch. Flag slots are upgraded to proper **24px
  circular slots** (INSTANCE_SWAP-ready) and will take real circle-flags assets at promotion or in a
  fetch-capable session. No flags were faked.
- **Taste addendum** recorded in CLAUDE.md §(f): Mobbin reference discipline (Revolut/Wise/N26/CRED,
  layout-only) from Batch 2 onward; Linear/Raycast taste anchors; copper-blueprint illustration style
  approved for future (no illustrations in Phase 1).

---

## 7. Taste calibration — surgical redlines (applied to all Batch 1 frames)

- **R1** Brand header: `Wordmark` instance (~20px) + copper ghost Help + hairline divider on all 9 A01
  frames. **No wordmark asset exists in the DS** — a typographic Wordmark component was staged as
  **LG-02 · PROMOTE TO DS** (honest gap, not a faked brand asset).
- **R2** A01 headline → 32/40 Bold (2 lines); support → one line ("Start in minutes — first, confirm
  the country you invest from."); the KYC nuance moved into the CountrySelector helper line.
- **R3** A02 OTP as focal anchor: first box set to its real `active` variant (copper border + caret);
  headline 24/30 Bold; resend countdown already Tabular.
- **R4** Duplication killed: stepper caption → mono uppercase `STEP 2 OF 3` (Tabular, letter-spaced,
  `text/meta`); redundant screen-name text deleted. Stepper rail overridden from the 7-segment preset
  to 3 segments / 2 filled to match.
- **R5** Flag slots hidden (13 slots — trigger + picker) until real circle-flags assets land; absence
  reads intentional, empty grey squares read broken.
- **R6** Density diet verified: ≤5 blocks header→CTA; single-caption legal footer; ghost copper sign-in.
- **R7** Rhythm: content gaps 32; label→field and field→helper 8; hero/context internal 8.
- **R8** Depth check at 1x passed: hairline top highlight visible on raised fields
  (`hairline/top` strokeTop on CountrySelector default/disabled) and the metal CTA.
- **Rules made permanent** in CLAUDE.md §(f): type drama (24-bold min, 32 for landing), mono datalabel
  meta, one focal anchor, empty-space-premium, rhythm scale, density diet, 1x depth check, and the
  **fintech-only reference rule** (search by app name; never silently substitute non-fintech).
- **Mobbin correction:** A03 references re-pulled by app name — all five named fintech apps surfaced
  (Revolut, Wise, N26, CRED, Monzo); the earlier retail substitutes are discarded. A04 references
  (Chime/Ubank/Kit) stay — fintech.
