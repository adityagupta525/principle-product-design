# Phase 0 Audit Report — Repository, Figma, and Design System Audit

**Date:** 2026-07-15
**Phase:** 0 (per `05_IMPLEMENTATION_SEQUENCE.md`)
**Status:** COMPLETE — no screens implemented (per Phase 0 rules)
**Next phase:** Phase 1 — Authentication & Identity

---

## 1. Repository Audit

### 1.1 Execution docs (root) — all located and readable

| Doc | Role | Status |
|---|---|---|
| `00_README.md` | Repository authority, source-of-truth hierarchy | ✅ Read in full |
| `01_CLAUDE_PROJECT_CONTEXT.md` | Product/design mindset | ✅ Read in full |
| `05_IMPLEMENTATION_SEQUENCE.md` | Binding phase order, gates, closeout | ✅ Read in full |
| `07_COMPONENT_REQUIREMENT_MATRIX.md` | Component requirement IDs (107 components) | ✅ Read in full |
| `10_CLAUDE_EXECUTION_OS.md` | Binding execution rules + authority order | ✅ Read in full |
| `CLAUDE.md` | Session protocol + current state | ✅ Created and committed this session |

### 1.2 Output documents — all 23 located and readable

All 10 locked module specs + 13 architecture/context docs verified present in `outputs/` (sizes 14K–136K). Per the repo Reading Rule, module specs are loaded per-phase only; none were bulk-loaded in Phase 0. The Cross-Module Lifecycle & Entitlement Contract (`79K`, version-stamped, authoritative) is located and readable; it will be read in full at Phase 1 start together with `NRI_Authentication_Identity_Wireframe_Specification.md` (136K).

### 1.3 Source-of-truth hierarchy (recorded)

1. `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
2. Approved module spec for the current phase
3. `07_COMPONENT_REQUIREMENT_MATRIX.md`
4. `10_CLAUDE_EXECUTION_OS.md`
5. Published Centricity DS v1.4 components, variables, tokens
6. Approved review findings / implementation notes
7. Visual judgment only where the above are silent

**Workspace overlay (from `CLAUDE.md`, governs the screens phase):** the DS file is READ-ONLY; the product file is instances-only with zero local components; anything missing from the library goes to the **Library Gap list** — never hand-drawn or recreated locally.

---

## 2. Figma Pipeline Verification (smoke test)

Product file: **"Centricity App — Product Screens"** (`LHpyz0RfZZA86jOt8K2uPA`)

| Check | Result | Evidence |
|---|---|---|
| (a) File readable | ✅ PASS | Pages enumerable; 1 page ("Page 1") |
| (b) Centricity DS library enabled + insertable | ✅ PASS | Library subscribed (`source: team`); `Button` component set imported by key and an instance created successfully |
| (c) Create + delete test frame | ✅ PASS | `_SMOKE_TEST_DELETE_ME` frame created, instance inserted, frame deleted; deletion verified (`getNodeByIdAsync → null`) |

Notes:
- The DS uses the **Figtree** font family; fonts must be loaded (`loadFontAsync`) before appending library instances — this is a build-time requirement for every screen session.
- One orphaned instance from an interrupted smoke-test run was found and removed. The product file is back to a clean baseline: **1 page, 0 children, 0 local components, 0 local variables, 0 local styles.**

---

## 3. Design System Library Inventory (evidence-based)

### 3.1 Variables — verified via `teamLibrary` API

| Collection | Count | Contents (verified names) |
|---|---:|---|
| **Semantic** | 35 | `surface/*` (canvas, card, raised, pressed, sheet, glass, glass-input, row), `text/*` (primary…disabled, hero-numeral, on-metal, on-copper), `border/*` (hairline, default, focus), `status/*` (verified, pending, processing, failed), `data/*` (positive, negative, warning, chart-*), `nav/*` (bar, active, inactive, border), `accent/primary` |
| **Typography** | 28 | `font-family/ui`, `font-family/numeral`, `font-size/8–34`, `font-weight/regular–extrabold`, `line-height/12–42`, `letter-spacing/none, micro` |
| **Primitives** | 60 | `copper/50–700 + shimmer`, `obsidian/700–void`, `grey/*`, `cream/*`, `ink/*`, `green|red|amber/base`, `space/0-5–16`, `radius/xs–full`, `icon-size/14–42`, `icon-stroke/*`, `layout/frame-width`, `layout/touch-min`, `hairline/*` |
| **Total** | **123** | Matches the "116+" claim in `CLAUDE.md` ✅ |

### 3.2 Text styles — verified via library search

Style tree `styles/text/…` confirmed with role groups: **display** (`display/34`, `display/34-tabular` hero-numeral), **body** (`body/16-semibold`, …), plus **datalabel** and **numeral-tagged** styles referenced across component documentation. Full 34-style enumeration to be captured incrementally as styles are consumed (search tool returns are relevance-capped; consumption-time verification is the reliable check).

### 3.3 Component inventory — 50 component sets/components confirmed by direct search evidence

**Core/actions:** Button (5 variants × 3 sizes × 4 states), IconButton (badge dot, glyph swap), ButtonGroup (segmented), Spinner, Tag, StatusChip
**Forms:** TextInput, PasswordInput (masked/visible + error), OTPInput + OTPInput/Box (6-digit, auto-advance, error), AmountInput (₹ hero numeral, lakh/crore grouping), Checkbox, RadioButton, Switch, DocUploadCard (empty/uploaded/error), BankAccountCard (NRE/NRO/FCNR + verified/pending/failed), NomineeCard
**Structure/nav:** Header (greeting), TabBar (glass pill bottom nav), Tabs (copper underline), Accordion, Carousel, Pagination (dots/counter), PDFViewerHeader, SettingsGroup (action-list rows), FundSearchBar
**Overlays:** BottomSheet (THE modal-replacement law), ShareSheet (hide-amounts law), ExitLoadWarningSheet, SortControl, FolioSelector, FundFilterSheet
**Feedback/states:** Alert (info/warning/negative/positive), Skeleton (4 presets + shimmer), EmptyState, NetworkErrorState, MaintenanceState, ConfirmationSuccess (one-celebration law), ProgressStepper (horizontal/vertical KYC rail), KYCProgressBanner, PermissionPrimer, BiometricPrompt (rim-glow hero), GoalProgressCard, AllocationBar, ComparisonView, WatchlistSwipeRow, LanguageSelector, ArticleCard
**Icons:** `Icon-glyph/*` set (e.g. chart-pie-slice)

Component descriptions are exceptionally rich (React-prop mirrors, layout laws, code-sync flags, haptics, voice tokens) — treat descriptions as the component contract during screen builds.

**Not directly evidenced in search:** `Toast` — referenced by ConfirmationSuccess's contract ("routine confirmations get a Toast") but never returned by search. Verify by key/import at Phase 1 build time before assuming it exists.

### 3.4 Naming conventions (recorded)

- **Components:** PascalCase (`TextInput`, `OTPInput`), nested sub-components via ` / ` (`OTPInput / Box`), icon namespace `Icon-glyph/<kebab-name>`.
- **Variables:** `group/token` slash paths, kebab-case (`surface/glass-input`, `space/0-5`, `radius/md`).
- **Text styles:** `role/size[-modifier]` (`display/34-tabular`, `body/16-semibold`).
- **Numerals:** all numeric text nodes tagged `numeral/*` and use `font-family/numeral` (tabular, Indian grouping).
- **Do not introduce a second naming system** (Execution OS §4).

### 3.5 Published vs local map

- Published: everything above lives in the Centricity DS v1.4 library (read-only).
- Local (product file): **zero** components, variables, styles. ✅ Baseline compliant with "instances only".
- Duplicates/deprecated found: none.

---

## 4. Phase 1 Dependency-Ready Component Backlog (KEY DELIVERABLE)

Cross-check of the Phase 1 (Authentication & Identity) requirement set from `05_IMPLEMENTATION_SEQUENCE.md` + `07_COMPONENT_REQUIREMENT_MATRIX.md` against verified library contents.

### 4.1 Matrix requires → library HAS (reuse as instances)

| Matrix ID | Requirement | Library evidence | Decision |
|---|---|---|---|
| F07 | Button | `Button` (primary/secondary/tertiary/ghost/destructive; loading via Spinner) | REUSE |
| N07 | Back / Close | `IconButton` (glyph swap, 44px touch-min) | REUSE |
| FR01 | Text Input | `TextInput` (label/help/error/necessity/disabled) | REUSE |
| FR02 | OTP Input | `OTPInput` + `OTPInput / Box` (6-digit, auto-advance, error) | REUSE (see gaps) |
| FR03 | Password/PIN Input | `PasswordInput` (masked/visible, error) | REUSE (see gaps) |
| FR05 | Select / Combobox | `BottomSheet` + `SortControl`/`FolioSelector` sheet-select pattern | REUSE pattern |
| FB01 | Alert / Banner | `Alert` (info/warning/negative/positive + action slot) | REUSE |
| FB03 | Confirmation Dialog | `BottomSheet` (modal-replacement law) + `ExitLoadWarningSheet` as destructive-confirm precedent | REUSE pattern |
| FB05 | Progress Indicator | `ProgressStepper` (KYC rail), `Spinner`, `GoalProgressCard` ring | REUSE |
| FB06 | Inline Validation | Built into `TextInput`/`PasswordInput`/`AmountInput` (errorText) | REUSE |
| SE01 | Step-Up Auth Prompt | `BiometricPrompt` (faceid/fingerprint + success/failed) + `OTPInput` + `PasswordInput` | REUSE composition |
| CA02 | Empty State Card | `EmptyState` | REUSE |
| CA03 | Error State Card | `NetworkErrorState`, `MaintenanceState` (full-screen); `Alert intent=negative` (inline) | REUSE |
| CA04 | Loading Skeleton | `Skeleton` (text-line/avatar/card/fund-card presets) | REUSE |
| CO06 | KYC / Verification Status | `KYCProgressBanner`, `StatusChip`, `ProgressStepper` | REUSE (partial) |
| — | Permissions pre-ask | `PermissionPrimer` (camera/notifications) | REUSE |
| — | Localization | `LanguageSelector` | REUSE |

### 4.2 Matrix requires → library LACKS → **LIBRARY GAP LIST (Phase 1)**

Per workspace law these are **never hand-drawn or recreated locally**. Each needs a DS-owner decision: add to a DS v1.5 release, or approve a screen-level composition from existing instances.

| # | Matrix ID | Gap | Severity for Phase 1 | Composition fallback from existing instances? |
|---|---|---|---|---|
| G1 | SE02 | Session List Row (device, last active, revoke) | HIGH — Active Sessions screen | Possible: `SettingsGroup` row pattern + `StatusChip` + `IconButton` (screen-level layout, not a local component) |
| G2 | SE03 | Trusted Device Row (trust state, expiry, revoke) | HIGH — Trusted Devices screen | Same as G1 |
| G3 | SE04 | Security Activity Row (event, time, response action) | HIGH — Security activity screen | Same as G1 |
| G4 | SE07 | Recovery Status Card (request state, wait timer, next step, support path) | HIGH — Account/device recovery flows | Partial: `KYCProgressBanner` + `Alert` + `ProgressStepper`; timer/state semantics missing |
| G5 | FR04 | Masked Sensitive Input (PAN/account mask + reveal policy) | HIGH — identity capture/display | Partial: `PasswordInput` visibility toggle; PAN mask pattern + step-up reveal missing |
| G6 | SE05 | Masked Sensitive Data Block (display-side masking + step-up reveal + auto-remask) | MEDIUM | Partial: `ShareSheet` hide-amounts law + `BankAccountCard` masked style exist as precedents; no generic block |
| G7 | FR15 | PAN Input (format, verify, duplicate/verified states) | MEDIUM (heavier in Phase 2) | `TextInput` + `StatusChip`; verification states missing |
| G8 | FB08 | Retry / Recovery Action Group (safe retry/wait/correct/support, idempotency-aware) | MEDIUM | Full-screen versions exist (`NetworkErrorState`, `MaintenanceState`); inline reusable group missing |
| G9 | F02 | Generic sub-screen Page Header (back + title + action) | MEDIUM — every nested auth screen | Compose: `IconButton` + `body/16-semibold`; `Header` (greeting) and `PDFViewerHeader` exist but are specialized |
| G10 | CA05 | Status Summary Card (lifecycle/readiness projection) | LOW in Phase 1 (peaks Phase 3) | `KYCProgressBanner` + `StatusChip` cover auth-level needs |
| G11 | FR02-ext | OTP states: expired / locked / resend-timer / success (matrix requires; library has empty/typing/filled/error) | MEDIUM | Timer/lockout copy via text + `Alert`; state variants missing |
| G12 | FR03-ext | PIN variant + strength/lockout states on PasswordInput | MEDIUM | — |
| G13 | FB02 | Toast (referenced in DS contracts but unverified in library) | LOW | Verify at build time; fall back to `Alert` if truly absent |

### 4.3 Governance conflict recorded (needs explicit decision before Phase 1 screens that hit gaps)

`10_CLAUDE_EXECUTION_OS.md` §2 authorizes creating/publishing components, and `05` Phase 1 lists SE02/SE03/SE04/SE07 as "Expected New Components" — but the workspace state in `CLAUDE.md` declares the DS file **read-only** and the product file **zero local components**. These cannot both hold for G1–G4.

**Recommended resolution (decision required):**
1. Screens whose gap has a faithful composition fallback (G1–G3, G9) proceed as **screen-level compositions of published instances** (allowed: "screen compositions may use library components and local layout composition" — matrix §Screen compositions), with each composition logged against its gap ID for later promotion into DS v1.5.
2. Gaps with state semantics that composition cannot faithfully express (G4, G5, G11 lockout/expiry) **block their specific screens** until the DS owner ships them in a v1.5 library release; all other Phase 1 screens proceed.

---

## 5. Engineering Considerations (recorded)

- Node naming for handoff: follow DS PascalCase + `numeral/*` tagging discipline; screens should carry spec screen IDs in frame names.
- Code Connect: DS descriptions embed React-prop mirrors (`components/core/*`, `components/forms/*`, `components/gap/*`) — mapping exists in the DS code export (`github.com/adityagupta525/centricity-design-system`, reference-only).
- Code-sync flags found in component contracts (design supersedes code): Button small height 40→44, ButtonGroup active styling, Pagination numbered PageBtns, BottomSheet scrim 50%→60%, DocUploadCard dash color, plus DESIGN ADDITION states (OTP error, BiometricPrompt success/failed, AmountInput error). These stay in the DS README backlog — no action in the screens file.
- Unresolved product decisions must not be guessed in Figma (README §11) — none were.
- File supports library import, Variables, and component properties (verified live). Publishing is N/A in the product file (instances only).

## 6. QA Gates (Phase 0)

| Gate | Status |
|---|---|
| Every approved document located and readable | ✅ PASS |
| Source-of-truth hierarchy recorded | ✅ PASS (§1.3) |
| Figma library inspected | ✅ PASS (§3) |
| Matrix mapped to Figma evidence | ✅ PASS for Phase 1 scope (§4); later-phase IDs mapped at their phase start per Reading Rule |
| Duplicates and local-only components identified | ✅ PASS — none exist |
| No implementation while critical authority conflict unresolved | ⚠️ PASS WITH NOTE — governance conflict §4.3 recorded; it blocks only gap-dependent screens, not Phase 1 start |

## 7. Known Issues / Blockers

1. **Git push blocked:** both `git push` (proxy 403) and the GitHub API (`403 Resource not accessible by integration`) reject writes to `adityagupta525/principle-product-design`. Commits exist locally on `claude/centricity-screens-setup-69axq6`. The GitHub App integration needs write (contents) permission on this repo.
2. **Library Gap list opened** (§4.2, G1–G13) — needs DS-owner triage before the Sessions/Devices/Recovery screens of Phase 1.
3. **Toast unverified** (G13) — check at build time.
4. Figma MCP connection dropped twice mid-session (recovered); expect to re-load fonts and re-verify page context at each session start.

## 8. Phase 0 Completion Criteria

- ✅ Audit report exists (this document).
- ✅ Reuse/extension/create decisions are evidence-based (§4.1/4.2, per-ID search evidence).
- ✅ Figma naming, Variables, Tokens, and library ownership recorded (§3.4, §3.5).
- ✅ Phase 1 has a dependency-ready component backlog (§4).

**Recommended next module:** Phase 1 — Authentication & Identity (read `NRI_Authentication_Identity_Wireframe_Specification.md` + the Lifecycle & Entitlement Contract in full at session start, per the Reading Rule).
