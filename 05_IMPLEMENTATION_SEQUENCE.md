# Figma Implementation Sequence

**Audience:** Claude Code only  
**Purpose:** Authoritative execution roadmap for implementing the approved product inside Figma.  
**Document type:** Enterprise implementation playbook  
**Status:** Binding execution sequence

## Operating Authority

This document defines **when and in what dependency order** Claude Code implements approved work. It does not replace, summarize, or reinterpret any approved UX architecture or specification.

Authority is resolved in this order:

1. `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
2. The approved specification for the phase being implemented
3. `07_COMPONENT_REQUIREMENT_MATRIX.md`
4. `10_CLAUDE_EXECUTION_OS.md`
5. Existing published Figma Design System components, variables, and tokens
6. Approved review findings and implementation notes
7. Visual judgment only where higher authorities are silent

If a lower-level implementation decision conflicts with a higher-level authority, stop and follow the conflict protocol in `10_CLAUDE_EXECUTION_OS.md`.

## Implementation Philosophy

### 1. Implement contracts before compositions

Claude must establish state, entitlement, accessibility, responsive, and component contracts before composing screens. A screen is a projection of approved behavior, not a place to resolve business ambiguity.

### 2. Build the smallest reusable system that can express the approved behavior

Start with primitives, extend before creating, and create new components only when reuse or extension cannot represent an approved requirement. Do not create screen-specific copies of components.

### 3. Implement one module at a time

No two module specifications may be implemented simultaneously. Complete the current phase, run all gates, publish and replace components, generate the report, then begin the next phase.

### 4. Preserve truth under uncertainty

Pending, unknown, delayed, failed, restricted, suspended, expired, reconciled, provisional, final, and amended states must remain distinct. Never visually convert an unresolved state into success.

### 5. Treat accessibility and engineering readiness as design work

Accessibility, Auto Layout, responsive reflow, focus behavior, state semantics, table/chart alternatives, sensitive-data masking, and prototype handoff are required parts of implementation, not post-processing.

### 6. Minimize design debt at the point of creation

Every local exception, hard-coded value, duplicate component, unresolved state, or untested deep link must be recorded immediately and removed before the phase closes.

## Design System First Principle

The Design System is implemented before domain-heavy screens. Claude must first establish or verify:

- Semantic Variables and Tokens.
- App Shell, layout, spacing, action, focus, and responsive foundations.
- Navigation patterns.
- Form and validation patterns.
- Loading, empty, error, offline, pending, restricted, and recovery patterns.
- Shared data display and status patterns.
- Financial formatting and provenance primitives before financial composites.

No later module may solve a shared system problem locally. If a missing pattern is discovered during a module, pause, update the shared component or create a governed component, publish it, then continue.

## Component Reuse Strategy

1. Map every screen requirement to an ID in `07_COMPONENT_REQUIREMENT_MATRIX.md`.
2. Search the published Figma library before creating anything.
3. Reuse an equivalent component when found.
4. Extend an existing component when its semantics are close but required states, variants, or accessibility behavior are missing.
5. Create a new component only after documenting why reuse and extension fail.
6. Publish approved components before using them broadly.
7. Replace temporary local components before phase completion.
8. Never copy a component to make a small screen-specific adjustment. Use variants, properties, slots, or a governed composite.

## Module Dependency Strategy

The sequence follows risk and dependency order:

```text
Repository and Figma audit
        ↓
Authentication and identity
        ↓
Onboarding and regulatory
        ↓
Investment activation
        ↓
Home orientation
        ↓
Portfolio truth
        ↓
Fund discovery
        ↓
Investment journey and money movement
        ↓
Orders and activity investigation
        ↓
Reports and tax intelligence
        ↓
Account and service control plane
```

- Authentication establishes session, identity, device, recovery, and sensitive-data patterns.
- Onboarding consumes identity and establishes regulatory form, consent, document, and verification patterns.
- Activation consumes compliance and creates readiness/eligibility status patterns.
- Home consumes lifecycle projections and becomes the first adaptive composition.
- Portfolio establishes authoritative financial metrics, scopes, tables, charts, freshness, and risk communication.
- Discovery consumes eligibility, risk, portfolio context, and product metadata.
- Investment Journey consumes discovery and portfolio context and introduces high-consequence action orchestration.
- Orders consumes order/payment/settlement/refund truth and becomes the activity evidence pattern.
- Reports consumes portfolio, order, tax, documents, artifacts, and finality.
- Account consumes identity, banking, security, documents, notification, consent, and support patterns from all earlier phases.

## Review Strategy

Every phase has four review layers:

1. **Component review:** naming, variants, states, Variables, Tokens, accessibility, Auto Layout, and responsive behavior.
2. **Screen review:** approved specification, hierarchy, state coverage, permissions, content, and acceptance criteria.
3. **Module review:** cross-screen consistency, prototype paths, deep links, lifecycle projections, and handoffs.
4. **Cross-module review:** no contradiction with the lifecycle contract, entitlement model, shared navigation, financial truth, security, compliance, or data-freshness rules.

No phase can be marked complete when a required gate is incomplete, even if the default state appears visually finished.

## Library Growth Strategy

- Publish primitives once and reuse them everywhere.
- Publish composites only after their dependency primitives and semantic states are stable.
- Keep screen compositions local to the module unless the same composition is demonstrably reused.
- Version components when a change can affect a locked module.
- Record all new Variables, Tokens, variants, and deprecations in the phase Implementation Report.
- Do not use visual similarity as a reason to merge semantically different states.

# Implementation Sequence

## Phase 0 - Repository, Figma, and Design System Audit

### Module Name

Repository and implementation foundation audit.

### Objective

Establish the implementation baseline, source-of-truth map, Figma file structure, published library inventory, Variable/Token inventory, component gaps, naming conventions, and dependency risks before any module screen is built.

### Required Input Documents

- `00_README.md`
- `05_IMPLEMENTATION_SEQUENCE.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- `10_CLAUDE_EXECUTION_OS.md`
- All documents listed in the repository reading order in `00_README.md`

### Required Approved Specifications

- Cross-Module Lifecycle & Entitlement Contract
- Information and Navigation Architecture
- Service Blueprint
- Approved module specifications for all ten customer modules

### Required Existing Components

- Existing Figma App Shell and page frame, if present.
- Existing published foundations, navigation, form, feedback, data, and typography components.
- Existing Figma Variables, Tokens, modes, and naming conventions.

### Expected New Components

- None before the audit is complete.
- Temporary audit markers may be created only if clearly labelled and removed before Phase 1.

### Expected Component Extensions

- None before library evidence is gathered.

### Expected Tokens

- Inventory existing surface, content, border, action, focus, status, financial, regulatory, security, and spacing tokens.
- Propose missing semantic families only; do not silently create unapproved visual values.

### Expected Variables

- Inventory spacing, sizing, typography roles, responsive modes, visibility, state, and interaction variables.

### Expected Library Updates

- Naming convention map.
- Component inventory and ownership map.
- Deprecated/duplicate component list.
- Published versus local component map.
- Gap register linked to matrix IDs.

### Expected Prototype Work

- Confirm Figma prototype entry point, page organization, device frames, and flow naming convention.
- No customer journey prototype is implemented in Phase 0.

### Engineering Considerations

- Identify node naming required for code handoff.
- Identify components requiring Code Connect or engineering mapping later.
- Identify unresolved product decisions that must not be guessed in Figma.
- Verify whether the Figma file supports library publishing, Variables, modes, and component properties.

### QA Gates

- Every approved document is located and readable.
- Source-of-truth hierarchy is recorded.
- Figma library is inspected.
- `07_COMPONENT_REQUIREMENT_MATRIX.md` is mapped to Figma evidence.
- Existing duplicates and local-only components are identified.
- No implementation begins while a critical authority conflict remains unresolved.

### Completion Criteria

- Audit report exists.
- Component reuse/extension/create decisions are evidence-based.
- Figma pages, naming, Variables, Tokens, and library ownership are agreed for implementation.
- Phase 1 has a dependency-ready component backlog.

## Phase 1 - Authentication & Identity

### Module Name

Authentication & Identity.

### Objective

Implement the secure entry, verification, identity recovery, device trust, session, and sensitive-data interaction foundation used by every later module.

### Required Input Documents

- `NRI_Authentication_Identity_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `NRI_Information_and_Navigation_Architecture.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 0 audit output

### Required Approved Specifications

- Authentication & Identity Wireframe Specification v1.0
- Identity, Authentication, Device Trust, Session, Consent, and Document Verification state machines

### Required Existing Components

- F01-F08
- N07
- FR01-FR05, FR15
- FB01, FB03, FB05-FB08
- SE01, SE05
- CA01-CA05

### Expected New Components

- SE02 Session List Row.
- SE03 Trusted Device Row.
- SE04 Security Activity Row.
- SE07 Recovery Status Card.
- Authentication-specific recovery composites only if the approved specification cannot be expressed by shared patterns.

### Expected Component Extensions

- FR02 OTP Input.
- FR03 Password/PIN Input.
- FR04 Masked Sensitive Input.
- FB03 Confirmation Dialog.
- FB08 Retry / Recovery Action Group.
- CO06 KYC/Verification Status only when the identity specification requires verification projection.

### Expected Tokens

- Focus, error, warning, success, security, restricted, disabled, and pending semantic states.
- Input, button, dialog, and recovery surface tokens.

### Expected Variables

- OTP cell count and spacing.
- Verification timer visibility.
- Mask/reveal state.
- Challenge method visibility.
- Session/device row action visibility.
- Responsive navigation and form widths.

### Expected Library Updates

- Publish the verified authentication primitives and security composites.
- Document masking, reveal, step-up, focus, error, and recovery behavior.
- Replace any local OTP, input, alert, or recovery components.

### Expected Prototype Work

- Welcome/registration.
- Contact verification.
- Login and step-up.
- Forgot email/mobile.
- Device and account recovery.
- Active sessions and trusted devices.
- Session expiry and safe return behavior.

### Engineering Considerations

- Never expose raw PAN, OTP, device identifiers, or sensitive analytics values.
- Preserve idempotency for resend/recovery actions.
- Represent unknown verification outcomes and lockout timers.
- Use deep links without bypassing session/device/entitlement checks.

### QA Gates

- All authentication states and recovery paths are present.
- Keyboard focus, paste, resend, timeout, lockout, and screen-reader behavior are tested.
- Masking and reveal policies are consistent.
- Security state is not represented by color alone.
- Prototype cannot bypass required verification.

### Completion Criteria

- Authentication screens pass specification acceptance criteria.
- Security components are published.
- No local-only reusable authentication component remains.
- Implementation Report is complete.

## Phase 2 - Onboarding & Regulatory

### Module Name

Onboarding & Regulatory.

### Objective

Implement the regulated profile, account, tax, consent, document, verification, risk, bank, nominee, review, eSign, and onboarding outcome patterns that consume authenticated identity.

### Required Input Documents

- `NRI_Onboarding_Regulatory_Wireframe_Specification.md`
- `NRI_Authentication_Identity_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `NRI_Service_Blueprint.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 1 Implementation Report

### Required Approved Specifications

- Onboarding & Regulatory Wireframe Specification v1.0
- Compliance, Consent, Document Verification, Eligibility, and Identity state contracts

### Required Existing Components

- Published Phase 1 library.
- F01-F08, N07.
- FR01, FR04-FR06, FR08-FR13, FR15.
- CO02-CO08.
- FB01, FB03, FB05-FB08.
- CA01-CA05.

### Expected New Components

- CO03 Consent Record Row.
- CO07 FATCA / CRS Declaration Summary.
- CO08 Tax Residency / DTAA Row.
- FR12 Consent / Legal Acknowledgement.
- FR14 Bank Account Input.
- Any onboarding-specific document/review composite not covered by published components.

### Expected Component Extensions

- FR06 Country Selector.
- FR09 Radio Group.
- FR10 Checkbox.
- FR13 File Upload.
- CO02 Regulatory Status Row.
- CO04 Document Row.
- CO06 KYC / Verification Status.
- FB05 Progress Indicator.

### Expected Tokens

- Legal, compliance, restricted, review, expiry, warning, and document states.
- Form step, validation, upload progress, and disclosure tokens.

### Expected Variables

- Step progress and current step.
- Conditional field visibility.
- Country/account/tax-dependent sections.
- Upload progress and file metadata visibility.
- Consent disclosure and acceptance state.

### Expected Library Updates

- Publish regulatory form, consent, document, verification, and country/tax composites.
- Update component documentation with legal-copy, version, timestamp, and audit requirements.
- Replace authentication-era temporary form patterns with shared instances.

### Expected Prototype Work

- Onboarding entry and resume.
- Country of residence.
- NRE/NRO selection.
- PAN/CKYC/Aadhaar/DigiLocker verification.
- Personal details, FATCA, CRS, tax residency, risk, experience.
- Bank, nominee, documents, review, eSign, success, pending, failed.

### Engineering Considerations

- Conditional fields must be policy-driven, not hard-coded to visual state.
- Document upload, consent, and eSign must preserve version and audit context.
- Do not infer DTAA applicability from residence alone.
- Pending, rejected, expired, replacement-required, and manual-review states must be explicit.

### QA Gates

- All regulated states, validation rules, and recovery paths are represented.
- Long legal copy reflows and remains accessible.
- Upload and verification states cannot be skipped in the prototype.
- Consent and eSign are distinct actions with explicit outcomes.
- Country/account/tax combinations do not expose unauthorized actions.

### Completion Criteria

- Onboarding screens use published shared components.
- Compliance and document components are library-ready.
- All phase-specific acceptance criteria pass.
- Implementation Report is complete and no critical legal/state gap remains.

## Phase 3 - Investment Activation

### Module Name

Investment Activation.

### Objective

Implement the post-onboarding activation state projection for KYC, exchange client creation, bank verification, readiness, delays, failure, and human recovery.

### Required Input Documents

- `NRI_Investment_Activation_Wireframe_Specification.md`
- `NRI_Onboarding_Regulatory_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `NRI_Service_Blueprint.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 2 Implementation Report

### Required Approved Specifications

- Investment Activation Wireframe Specification v1.0
- Activation, Eligibility, Bank, KYC, Consent, and Support state contracts

### Required Existing Components

- Published phases 1-2 library.
- CA05 Status Summary Card.
- CO01, CO02, CO06.
- FB01, FB05, FB07, FB08.
- SP03 RM / Contact Card.
- FR14 Bank Account Input where remediation is required.

### Expected New Components

- Activation-specific readiness projection only if CA05 cannot represent the approved contract.
- Penny-drop or exchange-client status composite only if required by the approved screen specification.

### Expected Component Extensions

- CA05 Status Summary Card.
- CO06 KYC / Verification Status.
- CO01 Eligibility / Restriction Notice.
- FB05 Progress Indicator.
- SP03 RM / Contact Card.

### Expected Tokens

- Activation pending, delayed, failed, approved, retry, manual-review, and investor-ready states.
- Expected-next-step and SLA/progress tokens.

### Expected Variables

- Activation step visibility.
- Status action visibility.
- Delay reason/ETA visibility.
- Support/RM intervention visibility.

### Expected Library Updates

- Publish shared activation status properties if they are reusable by Home, Orders, or Support.
- Add activation-state documentation to CA05, CO02, CO06, and FB08.

### Expected Prototype Work

- Activation overview.
- KYC in progress/approved.
- NSE/BSE client creation/pending/failed.
- Penny drop and bank failure.
- Investor ready.
- Explore while activation continues.
- Activation delayed.
- RM/support recovery.

### Engineering Considerations

- Backend process names must not be exposed as user-facing meaning without a safe explanation.
- Activation completion does not automatically imply every investment entitlement.
- Polling and refresh must preserve current status and avoid duplicate submissions.

### QA Gates

- Pending, failed, delayed, approved, suspended, and restricted states are distinct.
- Every failure has a safe retry, wait, correction, or human path.
- Activation status cannot grant investment actions before entitlement permits them.
- Handoff to Home is lifecycle-consistent.

### Completion Criteria

- Activation state projections are reusable in Home and Investment Journey.
- No dead-end status exists.
- Prototype demonstrates all approved activation branches.
- Implementation Report is complete.

## Phase 4 - Home Experience

### Module Name

Home Experience.

### Objective

Implement the adaptive first experience that orients users according to lifecycle, activation, portfolio, activity, data, and account state without becoming the authoritative financial workspace.

### Required Input Documents

- `NRI_Home_Experience_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `NRI_Information_and_Navigation_Architecture.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phases 1-3 Implementation Reports

### Required Approved Specifications

- Home Experience Wireframe Specification
- Lifecycle precedence and entitlement projection rules

### Required Existing Components

- Published phases 1-3 library.
- F01-F08, N01, N04, N06.
- CA01-CA06, CA08-CA09, CA11-CA12.
- FI01-F04, FI08, FI17.
- FB01, FB04, FB05, FB07, FB08.

### Expected New Components

- CA06 Action / Task Card if not already published.
- CA11 Attention / Task Card.
- CA12 Recommendation Card only when the approved Home specification requires it and it is not represented by CA06.

### Expected Component Extensions

- CA05 Status Summary Card.
- CA08 Holding Card.
- CA09 Report Card.
- FI01 Financial Metric.
- FI04 Performance Summary.
- FI17 Tax Readiness Card.
- CO01 Eligibility / Restriction Notice.

### Expected Tokens

- Orientation, attention, neutral, progress, stale, and personalized content states.
- Above-fold priority and card density tokens.

### Expected Variables

- Lifecycle-driven slot visibility.
- State-dependent action priority.
- Investor/profile/portfolio content visibility.
- Scope and freshness metadata visibility.

### Expected Library Updates

- Publish adaptive task, attention, and report/tax readiness composites where reusable.
- Document that Home cards are projections and link to authoritative modules.

### Expected Prototype Work

- First login/onboarding incomplete.
- Activation pending/delayed/failed.
- Investor ready/no investments.
- Existing investor.
- Dormant/inactive investor.
- Market closed, offline, error, restricted, suspended.

### Engineering Considerations

- Do not duplicate Portfolio calculations or Orders truth.
- Home personalization must be permission-aware and freshness-aware.
- All cards need authoritative destination links and safe empty/error behavior.

### QA Gates

- State precedence produces one coherent Home projection.
- Above-fold content is appropriate for each lifecycle state.
- No Home card presents stale or unknown values as current.
- Navigation to Portfolio, Discovery, Orders, Reports, Account, and Support preserves context.

### Completion Criteria

- Adaptive Home compositions are built from published components.
- No duplicate financial truth exists in Home.
- Prototype coverage includes all approved state variants.
- Implementation Report is complete.

## Phase 5 - Portfolio Experience

### Module Name

Portfolio Experience.

### Objective

Implement the authoritative financial workspace for value, holdings, allocation, performance, activity, scope, freshness, risk, and family/household views.

### Required Input Documents

- `NRI_Portfolio_Experience_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `NRI_Information_and_Navigation_Architecture.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 4 Implementation Report

### Required Approved Specifications

- Portfolio Experience Wireframe Specification
- Portfolio data state, entitlement, scope, provenance, and freshness rules

### Required Existing Components

- Published phases 1-4 library.
- F01-F08, N01-N05.
- CA01-CA05, CA08.
- DD01-DD10.
- FI01-F08, FI13-F15.
- CO01, FB01, FB04-FB08.

### Expected New Components

- FI04 Performance Summary.
- FI05 Allocation Breakdown.
- FI06 Holding Allocation Row.
- FI07 Holdings Table.
- FI08 Portfolio Scope Selector.
- FI13 Cash Flow Summary.
- FI15 Chart With Data Table.

### Expected Component Extensions

- FI01-FI03 financial primitives.
- DD02 Data Table.
- DD09 Filter Bar and DD10 Filter Sheet.
- CA08 Holding Card.
- CA03 Error State Card.
- FB07 Offline / Data Delay Banner.

### Expected Tokens

- Financial positive, negative, neutral, unknown, estimated, stale, restricted, and provisional semantics.
- Chart, table, period, scope, and density tokens.

### Expected Variables

- Portfolio scope.
- Metric visibility and precision.
- Chart/table mode.
- Time period and benchmark selection.
- Column visibility and table density.
- Data freshness state.

### Expected Library Updates

- Publish financial formatting, performance, allocation, holdings, scope, and accessible chart/table components.
- Establish the financial component contract for future assets.

### Expected Prototype Work

- No portfolio.
- Single investment.
- Diversified/multi-asset portfolio.
- Family/household scope.
- HNI data density.
- Market open/closed.
- Delayed, stale, offline, partial, error, restricted, and suspended data.

### Engineering Considerations

- Portfolio is authoritative for holdings and performance, not Home.
- Every metric needs scope, period, method, currency, source, freshness, and finality where applicable.
- Charts require accessible data tables and text summaries.
- Family views require resource-scoped entitlement, not UI-only filtering.

### QA Gates

- Financial numbers are not independently recalculated in Figma annotations or component logic.
- Unknown, stale, partial, and restricted values remain distinguishable.
- Tables and charts are accessible and responsive.
- Scope changes do not leak data across investor, account, folio, or household contexts.

### Completion Criteria

- Portfolio is the reusable financial truth foundation.
- All five core portfolio screens and required states meet acceptance criteria.
- Financial composites are published and mapped to engineering.
- Implementation Report is complete.

## Phase 6 - Fund Discovery Experience

### Module Name

Fund Discovery Experience.

### Objective

Implement eligible product discovery, search, filtering, recommendation explanation, fund comparison, saved context, and decision-support patterns.

### Required Input Documents

- `NRI_Fund_Discovery_Experience_Wireframe_Specification.md`
- `NRI_Portfolio_Experience_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 5 Implementation Report

### Required Approved Specifications

- Fund Discovery Experience Wireframe Specification
- Eligibility, recommendation, risk, country, portfolio-context, and product-data contracts

### Required Existing Components

- Published phases 1-5 library.
- F01-F08, N01-N08.
- CA01-CA07, CA12.
- DD01-DD10.
- FI01-F05, FI15.
- CO01, CO08.
- FB01, FB04-FB08.

### Expected New Components

- CA07 Product / Fund Card.
- Recommendation explanation composite only if the approved card contract cannot express it.
- Compare-specific composition only if DD02 and FI15 cannot express approved comparison behavior.

### Expected Component Extensions

- DD09 Filter Bar and DD10 Filter Sheet.
- DD08 Sort Control.
- FI15 Chart With Data Table.
- CO01 Eligibility / Restriction Notice.
- N06 Global Search Trigger.

### Expected Tokens

- Eligibility, suitability, risk, recommendation class, restriction, data quality, and saved-state tokens.
- Comparison and ranking disclosure tokens.

### Expected Variables

- Search query and result state.
- Filter/sort selections.
- Compare queue count.
- Saved/watchlist state.
- Recommendation class and explanation visibility.

### Expected Library Updates

- Publish Product/Fund Card and any reusable eligibility or recommendation explanation component.
- Add restrictions, data provenance, and personalization guardrails to documentation.

### Expected Prototype Work

- First visit and returning user.
- Search/results/no-results.
- Recommendations/trending/top rated/tax saving/SIP friendly.
- Recently viewed/invested.
- Compare queue, saved funds, watchlist.
- Loading/offline/error/restricted/country-specific restriction.

### Engineering Considerations

- Discovery does not become an opaque advice engine.
- Ranking and recommendation labels must be explained and permission-aware.
- Search, saved filters, watchlists, and compare state require retention and privacy rules.

### QA Gates

- Restricted products are not silently represented as eligible.
- Compare and chart components have accessible alternatives.
- Search/filter updates preserve focus and query context.
- Product discontinuation, stale data, and eligibility recheck states are represented.

### Completion Criteria

- Discovery supports decision confidence without inventing advice behavior.
- Product cards and search/filter patterns are reusable in future asset classes.
- Implementation Report is complete.

## Phase 7 - Investment Journey

### Module Name

Investment Journey Experience.

### Objective

Implement the shared instruction orchestration for lumpsum, SIP, additional purchase, redemption, switch, STP, SWP, cancellation, payment recovery, mandate setup, review, confirmation, status, receipt, and recovery.

### Required Input Documents

- `NRI_Investment_Journey_Experience_Specification.md`
- `NRI_Fund_Discovery_Experience_Wireframe_Specification.md`
- `NRI_Portfolio_Experience_Wireframe_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 6 Implementation Report

### Required Approved Specifications

- Investment Journey Experience Specification
- Order, payment, mandate, eligibility, consent, step-up, reconciliation, and support contracts

### Required Existing Components

- Published phases 1-6 library.
- F01-F08, N01-N08.
- FR01, FR03-FR05, FR07-FR12, FR14.
- CA01, CA03-CA06.
- DD03-DD06.
- FI01-FI03, FI09-FI12.
- CO01-CO03, CO06, CO08.
- SE01, SE05.
- FB01, FB03, FB05-FB08.

### Expected New Components

- FI09 Amount / Units Summary.
- FI10 Order Summary.
- FI11 Payment Summary.
- FI12 Fees / Tax Summary.
- Financial review/confirmation composition only if existing composites cannot meet the approved contract.

### Expected Component Extensions

- FR07 Currency / Amount Input.
- FR14 Bank Account Input.
- FR12 Consent / Legal Acknowledgement.
- SE01 Step-Up Authentication Prompt.
- FB08 Retry / Recovery Action Group.
- CO01 Eligibility / Restriction Notice.

### Expected Tokens

- Financial action, confirmation, high-risk, payment, mandate, refund, unknown-outcome, reconciliation, and recovery states.
- Destructive, irreversible, and consent emphasis tokens.

### Expected Variables

- Product action type.
- Amount/unit mode.
- Account/bank/mandate selection.
- Payment method and step-up method.
- Review sections and action entitlement.
- Idempotency/retry action visibility.

### Expected Library Updates

- Publish money movement primitives and order/payment/fees composites.
- Document safe retry, duplicate prevention, unknown outcome, and reconciliation behavior.

### Expected Prototype Work

- Each supported action variant through intent, setup, payment/mandate, review, confirmation, processing, receipt, and recovery.
- Failed payment, gateway timeout, duplicate payment, order pending, order rejection, refund, and reconciliation paths.

### Engineering Considerations

- Never collapse payment, order, execution, settlement, refund, and portfolio truth.
- Confirm actions require idempotency and explicit final terms.
- High-value, changed-bank, new-device, and unusual-velocity actions require step-up where policy says so.
- Prototype actions must not imply real transaction success without authoritative confirmation.

### QA Gates

- Duplicate submission prevention is visible.
- Unknown outcomes block unsafe retries.
- All order/payment/refund/reconciliation states are represented.
- Confirmation, consent, step-up, and receipt are distinct.
- Recovery paths preserve order references and support context.

### Completion Criteria

- Shared investment orchestration can support future asset capabilities without cloning flows.
- Order/payment components are published.
- Implementation Report is complete.

## Phase 8 - Orders & Activity Center

### Module Name

Orders & Activity Center.

### Objective

Implement the financial activity operating center for orders, transaction history, activity/payment/settlement/refund timelines, detail, receipts, downloads, search, filters, and recovery evidence.

### Required Input Documents

- `NRI_Orders_Activity_Center_Experience_Specification.md`
- `NRI_Investment_Journey_Experience_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 7 Implementation Report

### Required Approved Specifications

- Orders & Activity Center Experience Specification
- Order, payment, settlement, refund, reconciliation, notification, document, and audit state contracts

### Required Existing Components

- Published phases 1-7 library.
- F01-F08, N01-N08.
- CA01-CA05, CA09-CA10.
- DD01-DD10.
- FI10-FI14.
- RD01-RD03.
- SP02, SP04.
- FB01, FB03, FB05-FB08.

### Expected New Components

- FI14 Activity Timeline if existing timeline cannot express correlation and financial states.
- RD03 Download Job Row.
- SP02 Support Case Status if not already published.
- Order detail/receipt compositions only if the approved specification requires unique structure.

### Expected Component Extensions

- FI10 Order Summary.
- FI11 Payment Summary.
- DD09 Filter Bar.
- DD10 Filter Sheet.
- RD01 Document Viewer.
- RD02 Secure Download Action.
- FI14 timeline states and correlation metadata.

### Expected Tokens

- Activity, payment, settlement, refund, reconciliation, receipt, evidence, and attention states.
- Timeline density and event grouping tokens.

### Expected Variables

- Activity type, status, date, scope, and search filters.
- Timeline grouping and expansion.
- Download job progress.
- Notification deep-link return context.

### Expected Library Updates

- Publish the activity timeline, download job, receipt, and correlation patterns.
- Add evidence, reference, finality, and audit metadata guidance.

### Expected Prototype Work

- Activity center list.
- Detail with correlated timelines.
- Receipt/proof.
- Search/filter/sort and status views.
- Payment pending/failed/timeout/duplicate.
- Order pending/rejected/expired/cancelled/partial.
- Refund and reconciliation.
- Offline/error and notification deep links.

### Engineering Considerations

- Activity projections must retain authoritative references and timestamps.
- Search and filters cannot reveal restricted records.
- Receipts must be generated/downloaded only when the artifact is authoritative.
- Unknown and reconciliation states must provide safe support escalation.

### QA Gates

- Every supported investment action can be correlated through activity.
- Timeline ordering and event ownership are clear.
- Payment and order statuses are not merged.
- Download and receipt actions respect artifact state and entitlement.
- Deep links return to the correct activity context.

### Completion Criteria

- Activity Center is the authoritative investigation surface.
- Receipts/downloads and timelines are reusable by Reports and Support.
- Implementation Report is complete.

## Phase 9 - Reports & Tax Center

### Module Name

Reports & Tax Center.

### Objective

Implement the financial intelligence and compliance workspace for performance reports, holdings, transactions, gains, tax readiness, DTAA documents, statements, downloads, secure sharing, scheduled reports, data freshness, and audit visibility.

### Required Input Documents

- `NRI_Reports_Tax_Center_Experience_Specification.md`
- `NRI_Portfolio_Experience_Wireframe_Specification.md`
- `NRI_Orders_Activity_Center_Experience_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 8 Implementation Report

### Required Approved Specifications

- Reports & Tax Center Experience Specification
- Report, Tax, Document, Artifact, Consent, Entitlement, Freshness, Finality, and Audit contracts

### Required Existing Components

- Published phases 1-8 library.
- F01-F08, N01-N08.
- CA01-CA05, CA09.
- DD01-DD10.
- FI01-F08, FI13-F17.
- CO01-CO08.
- RD01-RD03.
- FB01, FB03-FB08.
- SP02, SP04.

### Expected New Components

- FI16 Capital Gains Table.
- FI17 Tax Readiness Card.
- RD04 Share Report Dialog.
- RD05 Schedule Report Form.
- RD06 Artifact Metadata / Lineage.
- RD08 Tax Finality Block.
- RD09 TDS Status Row.
- Report-specific readiness and compliance composites not already covered by CA09 or CO components.

### Expected Component Extensions

- CA09 Report Card.
- FI04 Performance Summary.
- FI05 Allocation Breakdown.
- FI15 Chart With Data Table.
- CO05 Document Validity / Expiry Row.
- CO08 Tax Residency / DTAA Row.
- RD01 Document Viewer.
- RD02 Secure Download Action.

### Expected Tokens

- Provisional, final, amended, superseded, revoked, stale, partial, missing-data, tax, legal, and compliance states.
- Report purpose, source, freshness, finality, and sharing-scope tokens.

### Expected Variables

- Report type, period, financial year, scope, currency, and source visibility.
- Finality/amendment metadata.
- Download/share/schedule action visibility.
- Tax readiness and missing-data state.

### Expected Library Updates

- Publish artifact lineage, report readiness, tax finality, TDS, secure sharing, and scheduling components.
- Add data provenance and audit metadata patterns to financial components.

### Expected Prototype Work

- Reports dashboard.
- Report explorer and filters.
- Gains and tax center.
- DTAA/compliance workspace.
- Report detail.
- Download, share, schedule, expired artifact, stale data, missing data, and tax limitation paths.

### Engineering Considerations

- Report values require scope, period, currency, source, freshness, finality, method, and amendment lineage.
- Tax communication must not imply personalized tax advice without approved professional scope.
- Sharing must be explicit, scoped, expiring, revocable where supported, and audited.
- Reports cannot silently override Portfolio or Orders truth.

### QA Gates

- Provisional, final, amended, unavailable, stale, and restricted reports are distinct.
- Tables/charts have accessible alternatives.
- Artifact download, share, schedule, and revoke behavior is explicit.
- DTAA and compliance documents expose validity and required action.
- Data-delay and missing-data explanations preserve trust.

### Completion Criteria

- Reports and Tax components are reusable for future asset classes.
- Document/artifact lineage is visible and engineering-ready.
- Implementation Report is complete.

## Phase 10 - Account & Service Hub

### Module Name

Account & Service Hub.

### Objective

Implement the operational control plane for profile, residency, tax, risk, banking, nominees, security, devices, sessions, documents, notifications, consent, legal, support, RM, complaints, and data requests.

### Required Input Documents

- `NRI_Account_Service_Hub_Experience_Specification.md`
- `NRI_Authentication_Identity_Wireframe_Specification.md`
- `NRI_Onboarding_Regulatory_Wireframe_Specification.md`
- `NRI_Reports_Tax_Center_Experience_Specification.md`
- `NRI_Cross_Module_Lifecycle_Entitlement_Contract.md`
- `07_COMPONENT_REQUIREMENT_MATRIX.md`
- Phase 9 Implementation Report

### Required Approved Specifications

- Account & Service Hub Experience Specification
- Identity, Security, Device, Session, Consent, Document, Support, Notification, Banking, and Data Request contracts

### Required Existing Components

- Published phases 1-9 library.
- F01-F08, N01-N08.
- FR01-F06, FR08-F14.
- CA01-CA05, CA09-CA10.
- DD01-DD06, DD09-DD10.
- CO02-CO08.
- SE01-SE07.
- RD01-RD06.
- SP01-SP07.
- FB01-FB08.

### Expected New Components

- Any account-specific composition not represented by published security, document, consent, notification, banking, or support composites.
- SP01 Support Case Timeline.
- SP06 Chat Composer.
- SP07 Callback Request Form.
- Account-level legal/data-request compositions only if required by the approved specification.

### Expected Component Extensions

- SE02 Session List Row.
- SE03 Trusted Device Row.
- SE04 Security Activity Row.
- SE06 Security Alert Banner.
- CO03 Consent Record Row.
- CO04 Document Row.
- CO05 Document Validity / Expiry Row.
- SP02 Support Case Status.
- SP03 RM / Contact Card.
- RD02 Secure Download Action.

### Expected Tokens

- Security, privacy, consent, legal, support, complaint, escalation, restricted, revocation, and data-request states.
- Account-control, destructive, step-up, and confirmation tokens.

### Expected Variables

- Section visibility by entitlement.
- Sensitive-data masking/reveal.
- Security action visibility.
- Notification channel preferences.
- Consent version/scope/withdrawal.
- Support case priority and SLA visibility.

### Expected Library Updates

- Publish support, session/device, consent, notification, document, callback, chat, and data-request composites.
- Record security and privacy constraints in component documentation.
- Replace all temporary components accumulated during earlier phases.

### Expected Prototype Work

- Account overview.
- Profile, residency, FATCA, tax, risk, preferences.
- Bank accounts, mandates, nominees, linked accounts.
- Security, password/PIN, biometric, sessions, devices, alerts.
- Documents, statements, tax artifacts, agreements, download center.
- Notification preferences and regulatory communications.
- Help, support, RM, tickets, chat, callback, escalation, complaint tracking.
- Privacy, consent, terms, audit history, and data requests.

### Engineering Considerations

- Account changes require step-up, consent, impact notices, idempotency, audit, and recovery.
- Support context must be scoped and must not expose raw financial or identity secrets.
- Notification preference changes must distinguish service-critical, regulatory, security, and marketing communications.
- Legal, retention, deletion, and data-request states must not be represented as ordinary settings toggles.

### QA Gates

- Permission and entitlement behavior is correct for every account section.
- Security actions require the correct step-up and recovery path.
- Consent withdrawal and document revocation produce correct cross-module projections.
- Support, complaint, escalation, and data-request paths are not dead ends.
- Sensitive data, keyboard navigation, zoom, focus, localization, and long-copy behavior pass review.

### Completion Criteria

- Account & Service Hub is the operational control plane without duplicating module ownership.
- All reusable components are published or explicitly blocked with approval.
- Cross-module prototype links and state handoffs pass QA.
- Final Implementation Report is complete.

# After Every Phase: Mandatory Closeout

Claude MUST perform the following sequence after Phase 0 and after every module phase:

1. Run Design QA.
2. Run Accessibility Review.
3. Update the Design System.
4. Publish new components.
5. Replace temporary components.
6. Update Variables.
7. Update Tokens.
8. Remove Design Debt.
9. Run cross-module consistency review.
10. Generate the phase Implementation Report.

## Design QA Closeout

- Compare every screen against its approved specification.
- Verify hierarchy, entry/exit behavior, states, permissions, and acceptance criteria.
- Verify component instances and variants are intentional.
- Verify no screen-specific duplicate is masquerading as a shared component.
- Verify all long content, errors, loading, empty, offline, restricted, suspended, pending, and success states.
- Verify prototype links, back behavior, deep links, and return context.

## Accessibility Review Closeout

- Confirm semantic headings, landmarks, labels, descriptions, and reading order.
- Confirm visible focus, keyboard navigation, target sizes, and modal focus management.
- Confirm color is not the only status signal.
- Confirm charts have data tables/text summaries.
- Confirm tables have headers, captions, totals, and mobile alternatives.
- Confirm masking, error, timeout, state changes, and dynamic announcements are accessible.
- Confirm zoom, reflow, localization, long legal copy, and large financial values.

## Design System Closeout

- Update component properties, variants, states, usage notes, anti-patterns, and engineering mappings.
- Publish approved new components and extensions.
- Replace local instances with library instances.
- Record any versioned breaking changes.
- Verify naming, Auto Layout, Variables, Tokens, and page organization.

## Design Debt Closeout

Claude must remove or escalate:

- Duplicate components.
- Local-only reusable components.
- Hard-coded values that should use Variables or Tokens.
- Unnamed or temporary nodes.
- Missing semantic state variants.
- Inconsistent spacing or responsive behavior.
- Unresolved text overflow.
- Missing accessibility annotations.
- Prototype links that bypass permission or lifecycle behavior.
- Untracked Figma components, Variables, Tokens, or library changes.

## Phase Implementation Report

After each phase, Claude must generate a report using the exact format required by `10_CLAUDE_EXECUTION_OS.md`:

```text
# Implementation Report

## Module
## Screens Implemented
## Components Reused
## Components Extended
## Components Created
## Variants Added
## Variables Added
## Tokens Added
## Library Updates
## Prototype Status
## Accessibility Status
## Responsive Status
## Engineering Readiness
## QA Status
## Known Issues
## Blockers
## Recommended Next Module
```

The report must use exact component names and matrix IDs, identify remaining temporary components, distinguish incomplete from blocked, and link to Figma nodes where available.

# Overall Component Build Order

## 1. Foundation and Layout

F01-F08: App Shell, Page Header, Section Header, Layout Container, Stack/Inline Layout, Divider, Button, Link.

## 2. Navigation

N01-N08: Bottom Navigation, Drawer, Breadcrumb, Tabs, Segmented Control, Search Trigger, Back/Close, Quick Action.

## 3. Forms and Validation

FR01-FR15: Inputs, OTP, password/PIN, masking, select, country, amount, dates, radio, checkbox, toggle, consent, upload, bank, PAN.

## 4. Feedback and Recovery

FB01-FB08 plus CA02-CA05: alerts, transient feedback, confirmation, modal/sheet, progress, inline validation, offline/delay, recovery actions, empty/error/loading/status cards.

## 5. Data Display

DD01-DD10: rows, tables, key-value, badges, tooltips, disclosures, pagination, sorting, filters, filter sheets.

## 6. Financial Primitives

FI01-FI04 and FI09-FI13: financial values, currency, gains, performance, amount/units, orders, payments, fees/tax, cash flow.

## 7. Compliance and Security

CO01-CO08 and SE01-SE07: restrictions, regulatory status, consent, documents, expiry, verification, FATCA/CRS, tax/DTAA, step-up, sessions, devices, security events, masking, recovery.

## 8. Financial Composites

FI05-FI08 and FI14-FI17: allocation, holding rows, holdings table, portfolio scope, activity timeline, charts/tables, capital gains, tax readiness.

## 9. Reports and Delivery

RD01-RD09: document viewer, secure download, jobs, sharing, schedules, lineage, readiness, tax finality, TDS.

## 10. Support and Human Service

SP01-SP07: case timeline, case status, RM/contact, support context, help article, chat, callback.

# Library Growth Timeline

| Stage | Library Growth Outcome | Must Not Happen |
|---|---|---|
| Phase 0 | Inventory, naming, ownership, and gap register | Creating components before library audit |
| Phase 1 | Foundations, navigation, identity, security primitives | Local OTP/input/security copies |
| Phase 2 | Regulatory, consent, document, verification composites | Hiding legal or pending states |
| Phase 3 | Activation and readiness state extensions | Treating activation as a single boolean |
| Phase 4 | Adaptive task and orientation composites | Duplicating Portfolio or Orders truth |
| Phase 5 | Financial, chart, table, scope, and freshness system | Financial values without source or freshness |
| Phase 6 | Product, comparison, eligibility, and discovery composites | Opaque ranking or advice-like UI |
| Phase 7 | Money movement, order, payment, fees, and recovery composites | Combining payment and order truth |
| Phase 8 | Activity, receipt, download, and correlation composites | Unauthoritative proof or unsafe retry |
| Phase 9 | Reports, tax, artifact lineage, sharing, and scheduling | Hiding provisional/final/amended distinctions |
| Phase 10 | Support, service, consent, notification, and account-control composites | Treating sensitive account control as ordinary preferences |

# Design Debt Prevention Rules

1. No implementation starts without a target matrix ID for every reusable requirement.
2. No permanent local component is allowed.
3. No component is published without all approved states, accessibility behavior, responsive behavior, and usage documentation.
4. No hard-coded spacing, sizing, color role, state, or visibility value where a Variable or Token is appropriate.
5. No screen composition may own business logic or redefine lifecycle state.
6. No financial value may be shown without its required label, period/scope context, and freshness/finality behavior.
7. No restricted, pending, unknown, failed, delayed, or suspended state may be represented as successful completion.
8. No prototype connection may bypass authentication, entitlement, consent, compliance, step-up, or recovery behavior.
9. No duplicated navigation pattern may be introduced without an architecture decision.
10. Every exception is recorded in the phase report on the same day it is created.
11. Every new component must include an owner, purpose, dependencies, variants, states, Variables, Tokens, accessibility, and engineering mapping.
12. Every phase must remove the temporary components introduced by the prior phase.
13. Component semantics must be reviewed before visual polish.
14. A visual improvement cannot justify a behavior or state deviation.
15. When a library component conflicts with an approved specification, stop; do not silently alter the screen or component.

# Quality Gates Before Moving to the Next Phase

The next phase may begin only when all applicable gates are `PASS` or an explicitly approved exception is recorded.

## Authority Gate

- Correct source-of-truth documents were read.
- No approved UX architecture, lifecycle state, entitlement, compliance behavior, or business rule was changed.
- All unknowns remain marked as unknown or are formally resolved.

## Component Gate

- Required matrix IDs are mapped.
- Reuse was attempted before extension.
- Extension was attempted before creation.
- New components are justified, reusable, named, documented, and published.
- No local-only reusable component remains.

## Variable and Token Gate

- Variables and Tokens are used consistently.
- New semantic values are documented.
- No token communicates an incorrect financial or regulatory meaning.
- Responsive and interaction values are not hard-coded unnecessarily.

## State Gate

- Default, loading, empty, success, error, offline, restricted, suspended, pending, delayed, expired, unknown, and recovery states are covered where required.
- State precedence is consistent with the lifecycle contract.
- State transitions do not imply unsupported business outcomes.

## Accessibility Gate

- Focus, keyboard, screen reader, semantic structure, target size, contrast, zoom, reflow, localization, and dynamic announcements are reviewed.
- Tables and charts have accessible equivalents.
- Sensitive information is masked and announced safely.

## Prototype Gate

- Primary, alternate, failure, recovery, permission, deep-link, timeout, and return-context paths are wired where approved.
- Prototype does not bypass a required checkpoint.
- Errors and recovery paths preserve user context.

## Engineering Gate

- Component names and properties are stable.
- Node names are meaningful.
- Data/state dependencies are annotated.
- No visual artifact implies an unsupported API or backend behavior.
- Engineering mapping and handoff notes are complete.

## Cross-Module Gate

- Navigation is consistent.
- Home remains orientation, Portfolio remains financial authority, Orders remains activity authority, Reports remains reporting/tax authority, and Account remains operational control.
- Financial, compliance, security, consent, document, support, notification, and entitlement projections are consistent.
- Deep links do not leak context or bypass authority.

## Report Gate

- The exact Implementation Report exists.
- Known issues and blockers are explicit.
- Temporary components, Variables, Tokens, and library changes are listed.
- The next phase is not recommended while a critical blocker remains unresolved.

# Final Product Completion Checklist

Claude may declare the full product implementation complete only when all answers are yes:

- All approved module specifications were implemented in the required phase order.
- Phase 0 audit evidence exists.
- Every phase has a completed Implementation Report.
- The lifecycle and entitlement contract is preserved across every module.
- The component matrix is fully mapped to Figma implementation decisions.
- All reusable components are published or have an approved documented exception.
- No duplicate or local-only reusable component remains.
- Variables and semantic Tokens are used across the file.
- Auto Layout and responsive behavior are implemented for all production frames.
- All required lifecycle, permission, compliance, security, financial, document, support, and recovery states are represented.
- All critical financial values expose their required context, freshness, provenance, and finality.
- All charts and tables have accessible alternatives.
- All sensitive information is masked according to approved security behavior.
- All primary, alternate, failure, recovery, permission, and deep-link prototype paths are tested.
- Home, Portfolio, Discovery, Investment, Orders, Reports, and Account boundaries remain intact.
- Engineering handoff notes and component mappings are complete.
- Design debt register is empty or explicitly approved.
- Accessibility review passes.
- Design QA passes.
- Cross-module review passes.
- The final Figma file is coherent, maintainable, scalable, and consistent with one experienced product team.

The product is not complete because every screen looks polished. It is complete when the approved architecture, reusable system, states, permissions, accessibility, prototype behavior, and engineering contract remain coherent across the entire file.

