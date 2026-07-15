# NRI WealthTech Platform
## Independent Principal-Level Product Architecture Review

**Role:** Cross-functional Principal Design Review Board
**Status:** Independent review before further specification or visual execution
**Date:** 15 July 2026
**Scope:** Product Discovery, Service Blueprint, Information Architecture, UX Flow Architecture, Authentication & Identity, Onboarding & Regulatory, Investment Activation, Home Experience, and Portfolio Experience

## Executive Verdict

The product direction is strong and unusually thoughtful about NRI-specific trust, compliance, operational states, and assisted self-service. The screen-level specifications are substantially more complete than the underlying product contracts.

The architecture is **not yet ready for production handoff or high-fidelity execution across the platform**. The main issue is not missing screens. It is the absence of one authoritative cross-module model for:

- investor lifecycle and entitlements;
- financial data provenance, freshness, and reconciliation;
- policy versions and effective dates;
- legal ownership, household scope, consent, and role authority;
- ongoing eligibility after activation;
- document integrity and release governance.

These gaps can create contradictory Home, Activation, Portfolio, tax, support, and operations behavior even when each individual screen is well specified.

**Recommended decision:** Keep the approved modules, navigation, and screen IDs stable. Add the cross-module contracts listed in this review before high-fidelity design, API freeze, analytics implementation, or regulated money movement.

## Readiness Score

| Dimension | Score | Assessment |
|---|---:|---|
| Product intent and user value | 82 | Clear NRI problem, trust thesis, and lifecycle-aware direction |
| Screen-level UX specification | 82 | Strong state, recovery, accessibility, and acceptance-criteria coverage |
| Cross-module architecture | 58 | No single canonical lifecycle, entitlement, or data-projection contract |
| Financial and transaction safety | 63 | Good principles; critical settlement, reversal, and data-authority contracts remain unresolved |
| Compliance readiness | 55 | Broad coverage; launch-country, tax-policy, ongoing-review, and regulatory-change controls remain open |
| Engineering readiness | 61 | Good integration inventory; schemas, event ordering, ownership, and SLOs are not frozen |
| Operational readiness | 62 | Queues and human handoffs are defined conceptually; staffing, capacity, and escalation runbooks are incomplete |
| Accessibility and localization | 65 | Principles are present; test scope, language, locale, and document accessibility are not operationalized |
| **Overall** | **66 / 100** | Strong design foundation; not yet safe for full implementation commitment |

## Review Principles

1. Do not add a screen when a state, policy, or reusable component solves the problem.
2. Never let a customer-facing summary become a second financial source of truth.
3. Separate customer state, system state, permission, and entitlement. They are related but not interchangeable.
4. Treat tax, eligibility, and financial values as versioned decisions with evidence, not static content.
5. Preserve the approved module boundaries unless a change materially reduces risk or contradiction.

## P0 Findings: Must Resolve Before High-Fidelity or Production Handoff

### P0-01: The approved document set has a release-governance defect

**Finding:** The Authentication specification declares Authentication screens A01-A04 and A16-A22, but the file contains onboarding sections beginning with B10 at line 75 before the Authentication detail. This is an artifact-integrity failure, not a UX opinion. See [Authentication specification](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Authentication_Identity_Wireframe_Specification.md:73).

**Why it matters:** A designer, engineer, QA analyst, or analytics implementer can treat B10-B20 as part of Authentication, miss the actual A01-A04 sections, or create duplicate/incorrect screen mappings.

**Recommendation:** Restore one canonical document per module and add a lightweight validation check that verifies:

- allowed screen IDs per file;
- one heading per screen ID;
- canonical screen order;
- required sections 1-20 for every screen;
- no cross-module heading leakage;
- unique analytics event ownership.

**Alternatives:**

- **A. Manual review only:** Fast, but will fail again as documents grow.
- **B. Automated document linting:** Small implementation cost and prevents ID drift.
- **Recommended:** B, with a human review for regulated copy and business rules.

**Architecture change:** Documentation governance only; no product screen or navigation change.

### P0-02: There is no canonical cross-module lifecycle and entitlement model

**Finding:** Authentication, Onboarding, Activation, Home, and Portfolio each describe valid states, but no single contract determines which state wins when they conflict. The IA state matrix is a shared vocabulary, not a complete lifecycle model. See [IA state matrix](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Information_and_Navigation_Architecture.md:990) and [Activation shared contract](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Investment_Activation_Wireframe_Specification.md:37).

**Missing scenarios:** KYC approved but bank expired; investor-ready account later suspended; tax residency changed; one household account ready while another is pending; portfolio data available while transaction permission is restricted; re-KYC required after activation.

**Recommendation:** Add one platform contract with:

- `IdentityState`;
- `OnboardingState`;
- `ActivationState`;
- `EligibilityState`;
- `AccountState`;
- `PortfolioDataState`;
- `SupportCaseState`;
- `EntitlementSet`;
- state precedence and conflict-resolution rules.

Use a composite lifecycle projection for Home. Do not collapse all sub-states into one status.

**Strongest alternative:** A single `InvestorStatus` enum is simpler but loses independent dependency truth and causes misleading messages. Separate sub-state machines with one projection are safer and still manageable.

**Architecture change:** Add a shared lifecycle/entitlement contract; do not add screens.

### P0-03: Investor Ready is modeled too much like a terminal state

**Finding:** C09 correctly says that individual dependencies can be approved, but the overall architecture does not explicitly define post-activation regression. “Investor ready” cannot be permanent for a regulated account.

**Missing lifecycle states:** `Ready`, `ReadyWithRestrictions`, `ReverificationRequired`, `EligibilityExpired`, `BankExpired`, `TaxSelfCertificationExpired`, `Suspended`, `Frozen`, `Closed`, `DeceasedOrClaimHold`, and `DataUnderReview`.

**Why it matters:** A user can be ready today and become unable to transact tomorrow because of document expiry, country change, sanctions review, account closure, mandate expiry, AMC restriction changes, or regulatory policy changes.

**Recommendation:** Treat readiness as a time-bounded entitlement computed from current evidence, policy, account, and vendor status. Keep C09 as the customer-facing approval state, but define ongoing readiness separately.

**Architecture change:** Add a readiness/entitlement service contract, not a new module.

### P0-04: Portfolio and Home lack a formal financial read-model contract

**Finding:** Home is a summary and Portfolio is authoritative, but the contract does not specify how Home consumes Portfolio data, which fields are allowed, or how staleness and partial failure propagate. See [Home responsibility](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Home_Experience_Wireframe_Specification.md:79) and [Portfolio behavior contract](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Portfolio_Experience_Wireframe_Specification.md:48).

**Missing business rules:** What happens if one RTA feed is fresh and another is stale; if value is current but cost basis is unavailable; if currency conversion is unavailable; if the portfolio is reconciled but a pending order is not; if Home and Portfolio timestamps differ.

**Recommendation:** Define a shared financial read model with:

- value scope and legal ownership;
- source and source priority;
- as-of timestamp and freshness threshold;
- calculation period and method;
- currency and FX source/date;
- completeness status;
- reconciliation status;
- estimate/finality flag;
- correction/incident reference.

Home consumes a restricted projection of this model. Portfolio displays the full model. Neither screen calculates independently.

### P0-05: Financial transaction truth is not yet explicit enough for reversals and unknown outcomes

**Finding:** The architecture correctly requires idempotency and reconciliation, but money-moving journeys still need a formal distinction between request, authorization, gateway result, execution acceptance, settlement, reversal, refund, and unknown outcome.

**Missing financial cases:** Payment success/order pending; order accepted/payment not matched; partial execution; reversal after apparent success; late callback; duplicate callback; chargeback; refund initiated but not received; redemption settled but payout failed; tax amount corrected after final statement; corporate action changing units or cost basis.

**Recommendation:** Use separate immutable ledgers for payment, order, execution, settlement, and refund, linked by correlation and idempotency keys. Expose a reconciliation state when the system cannot safely determine the outcome. Never map “timeout” directly to “failed.”

**Architecture change:** Add a transaction truth contract and reconciliation state machine; preserve the existing screens and recovery flows.

### P0-06: Regulatory policy and country support are not launch-gated

**Finding:** Discovery explicitly marks launch countries, country eligibility, PFIC/FAPI, DTAA, tax language, and vendor decisions as unresolved. The later UX specifications use those rules as if they are ready for implementation. See [Discovery unknowns](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md:174).

**Missing compliance controls:** Effective-dated policy versions, policy-owner approval, change impact analysis, customer re-consent rules, retroactive decision handling, evidence retention, appeal path, and fail-closed behavior when policy data is stale.

**Recommendation:** Establish a country/policy registry before screen lock. Every eligibility, tax, disclosure, and activation decision must retain policy version, effective date, source, approver, evidence, and customer-facing explanation. Stale policy data must fail closed for new money movement.

**Architecture change:** Policy governance and versioning only; no new customer module.

### P0-07: Legal ownership, account scope, and household access are not fully resolved

**Finding:** The domain model includes Investor, Joint Holder, Nominee, Household, Folio, Portfolio, and Bank Account, but the permission matrix still uses broad role permissions. It does not define holder mandate types, beneficial ownership, account-level versus folio-level consent, or what a nominee can see before and after a legal trigger.

**Missing scenarios:** Joint holders with different mandates; one holder revokes consent; family aggregation with mixed NRE/NRO accounts; nominee claim; deceased investor hold; minor/guardian relationship; tax consultant access to one year only; RM access after reassignment.

**Recommendation:** Model `Party`, `Identity`, `InvestorProfile`, `InvestmentAccount`, `Folio`, `Household`, and `Relationship` separately. Authorize by resource scope, purpose, consent, time window, and action risk. Add maker-checker and step-up requirements for exports, redemptions, bank changes, and access grants.

**Architecture change:** Domain and authorization contract; no new navigation.

### P0-08: Compliance coverage stops too close to onboarding

**Finding:** FATCA/CRS, KYC, AML, and EDD are specified strongly during onboarding, but the ongoing lifecycle is not equally defined.

**Missing compliance scenarios:** Annual or event-driven re-KYC; change in country or tax residency; self-certification change; sanctions rescreening; adverse-media re-review; source-of-funds refresh; document expiry; resident conversion; suspicious activity hold; account closure and record retention; withdrawal of consent; cross-border data-transfer restriction.

**Recommendation:** Treat compliance as a continuous control plane. Define triggers, customer-visible impact, safe status language, review ownership, deadlines, escalation, and transaction restrictions for each event.

### P0-09: The approved architecture has no explicit regulated-advice boundary for personalization and AI

**Finding:** Home and Portfolio allow personalization and future AI opportunities, while the discovery document contains recommendations, tax Q&A, and smart KYC ambitions. The boundary between education, suitability, guidance, and regulated advice is not defined as a product contract.

**Recommendation:** Introduce an AI and personalization policy:

- classify output as education, explanation, eligibility, suitability, recommendation, or execution;
- define which classes are allowed at launch;
- require deterministic calculations for money and tax;
- show source, date, rule/model version, confidence, and limitations;
- require human review for high-risk decisions;
- log prompts/outputs safely and provide correction/escalation;
- disable unsupported-country or stale-data answers.

**Architecture change:** Governance and capability gating; no AI-led screen expansion.

## P1 Findings: Should Resolve Before Wireframe Specification Is Locked

### P1-01: Missing user and business scenarios

Add these scenarios to the shared scenario catalogue and test matrix:

- Existing investor with historical holdings but no current holdings.
- User with multiple folios, duplicate folios, or incomplete RTA mapping.
- User returning after a long absence with expired documents or changed country.
- User logged in on two devices while a bank, contact, or recovery change occurs.
- User with a pending order and a simultaneous portfolio refresh.
- User receiving a critical status notification while logged out.
- User who wants to dispute a portfolio value, tax calculation, or transaction.
- User whose scheme is merged, closed, suspended, or renamed.
- User whose redemption is blocked by lien, pledge, freeze, death claim, or compliance hold.
- Family member with view-only access and mixed consent scopes.
- Operations/vendor incident affecting only one AMC, RTA, bank, or country.
- Mass policy change requiring re-consent or customer communication.

### P1-02: Missing financial edge-case taxonomy

The portfolio and order architecture should explicitly cover:

- zero or negative return and zero-value holdings;
- missing NAV, stale NAV, holiday NAV, and corrected NAV;
- FX unavailable, FX stale, and FX date mismatch;
- quantity/amount rounding and fractional units;
- pending settlement versus settled holding;
- tax lots with missing or estimated cost basis;
- dividend/IDCW, split, merger, consolidation, and scheme renaming;
- partial order/execution and partial redemption;
- cancelled, expired, rejected, reversed, and duplicate orders;
- transaction history without a current holding;
- current holding without a complete transaction history;
- held-away data with user confirmation and later reconciliation;
- export/report generated from a previous data version.

### P1-03: Accessibility is principled but not testable yet

The documents reference WCAG 2.1 AA, but do not define a platform test contract. Add:

- supported screen readers, browsers, OS versions, and zoom range;
- 200% zoom and reflow acceptance;
- keyboard order and focus behavior for all async states;
- live-region rules for status changes without duplicate announcements;
- accessible chart alternative with data table and text summary;
- localized date, time, number, currency, and negative-value semantics;
- accessible PDFs, tax reports, statements, and exported tables;
- reduced-motion behavior;
- touch target and error-recovery acceptance criteria;
- non-Latin and long-string localization testing;
- security behavior for masking, reveal, screenshots, and screen recording where applicable.

### P1-04: Offline and cached financial data needs a privacy contract

“Offline” is present in the state model, but the product does not specify cache TTL, encryption, invalidation, sensitive-data masking, shared-device behavior, or whether cached data can be exported.

Recommended rules:

- cache only the minimum safe data;
- label every cached financial value with its as-of time;
- never cache pending authorization secrets or raw KYC evidence;
- encrypt at rest and clear on logout, device revoke, and account suspension;
- prevent unsafe actions while offline;
- refresh after policy or permission changes;
- show a clear conflict state if local draft data differs from server state.

### P1-05: Notification and preference architecture is incomplete

The service blueprint has a strong channel fallback policy, but it needs a preference and suppression model. Add criticality, legal basis, consent scope, channel eligibility, quiet hours, locale, time zone, deduplication, rate limits, and delivery evidence.

Critical transactional and security notifications must not be suppressed merely because marketing notifications are disabled. WhatsApp must never be the sole legal or transactional evidence channel.

### P1-06: Operations and SLA capacity are not yet product requirements

An SLA without queue capacity, staffing, holiday calendars, vendor dependencies, escalation ownership, and breach handling is only a promise. Before launch, define:

- expected case/order volume by country and peak period;
- staffing and language coverage;
- queue priority and aging rules;
- vendor outage ownership;
- customer communication on breach;
- manual override limits;
- incident and reconciliation runbooks;
- audit evidence for every human decision.

### P1-07: Analytics need a semantic contract, not only event names

The shared event conventions are directionally correct, but the platform needs an event registry with event owner, schema version, required properties, privacy classification, retention, consent basis, deduplication, and source-of-truth status. Analytics must distinguish:

- viewed status versus refreshed status;
- user intent versus completed business action;
- client validation versus authoritative success;
- estimated value versus final value;
- notification sent versus delivered versus read.

### P1-08: Tax and report finality is not explicit enough

Tax screens should distinguish estimate, provisional statement, source-confirmed statement, amended statement, and final report. Cost basis, TDS, DTAA application, and capital gains may change after reconciliation or source correction. Users need an explanation of what can change, when, and who owns disputes.

## P2 Findings: Valuable but Not Required for MVP Safety

- Add a policy-driven content registry so country-specific disclosures and help copy are not hard-coded in screens.
- Add a shared status shell for Activation, onboarding review, report generation, and support cases.
- Add a common financial number component with currency, precision, sign, unit, as-of time, and estimate/finality state.
- Add an accessible data-table pattern as the canonical alternative to charts and dense portfolio cards.
- Add a document/evidence component that supports version, validity, source, reviewer, and expiry without inventing new screens.
- Add a support context bundle pattern for safe handoff across Home, Activation, Portfolio, Tax, and Orders.
- Add configuration-driven Home and Portfolio content slots with server-side eligibility and experiment guardrails.
- Add migration/versioning rules for future global assets, multiple advisors, and additional family relationships.

## Conflicting Requirements and Recommended Resolutions

| Conflict | Why it matters | Alternatives | Recommendation |
|---|---|---|---|
| Authentication file contains B10-B20 content | Causes implementation and QA scope drift | Manually ignore; split/rebuild; lint | Rebuild the file boundary and add linting. No product change. |
| A04 PAN Verification and B04 PAN Verification both exist | Same capability may be implemented twice with different rules | Keep two independent patterns; one shared capability with contextual entry | Retain IDs for module ownership, but define one PAN Verification contract and one reusable component. |
| Home summarizes financial data while Portfolio is authoritative | Multiple calculations can disagree | Home owns a lightweight calculation; Home consumes Portfolio read model | Portfolio owns the financial read model; Home consumes a projection. |
| Activation has KYC, exchange, bank, and readiness screens | A linear progress model would misrepresent parallel dependencies | Linear flow; independent dependency graph; one generic status screen | Keep the dependency map and add dependency ordering/precedence as server configuration. |
| “Investor Ready” versus ongoing account eligibility | A terminal state becomes unsafe after changes | Treat ready as permanent; re-run checks only on next transaction; continuous entitlement | Continuous entitlement with explicit re-verification and restriction states. |
| Offline cache versus financial privacy | Cached data improves resilience but increases exposure | No cache; broad cache; minimum safe encrypted cache | Minimum safe encrypted cache with TTL, masking, invalidation, and no money movement. |
| Personalization versus regulated advice | Relevant prompts can look like recommendations | No personalization; unrestricted AI/personalization | Allow explainable, policy-bounded education and next actions; gate recommendations separately. |
| Broad role matrix versus real-world authority | Role names do not capture resource scope or mandate | Role-only authorization; resource/consent/purpose authorization | Use role plus scope, consent, purpose, time window, and step-up risk. |
| 20-section specification per screen versus maintainability | Repetition causes drift | Keep all text duplicated; shared contract only; hybrid | Keep screen specs for design, move shared rules to versioned contracts referenced by screens. |

## Missing Requirements by Review Dimension

### User scenarios

- Changed country or tax residency after onboarding.
- Re-KYC or document refresh for an existing investor.
- Account with no current holdings but historic statements.
- Mixed NRE/NRO ownership, multiple folios, and multiple currencies.
- Family/household access with revocation and role changes.
- Disputed portfolio, transaction, tax, or payout result.
- User returning after a long inactive period.
- User who is restricted or suspended but still needs records and support.

### Business scenarios

- Vendor outage, feed correction, AMC merger, scheme closure, and policy update.
- High-volume cut-off event and queue saturation.
- Reconciliation incident that affects only one source or one country.
- Manual-review backlog and SLA breach.
- Account closure, transfer-out, death claim, and legal hold.
- Privacy request, consent withdrawal, and data-retention exception.
- RM reassignment and assisted-service capacity limits.

### Lifecycle states

Add to the platform state catalogue, with domain-specific meanings:

`Draft`, `Submitted`, `Verification`, `Review`, `More Information Required`, `Approved`, `Ready`, `Ready With Restrictions`, `Pending`, `Delayed`, `Failed`, `Rejected`, `Expired`, `Reverification Required`, `Suspended`, `Frozen`, `Closed`, `Reversed`, `Partially Completed`, `Unknown Outcome`, `Reconciled`, `Corrected`, `Escalated`, `Completed`.

Do not apply every state to every domain. A state must be valid for the relevant domain and have an allowed transition.

### Financial edge cases

The order/payment/portfolio contracts must treat unknown outcomes and corrections as first-class states, not error copy. The UI should never force a user to repeat a money action while reconciliation is unresolved.

### Compliance considerations

- Country launch and scheme eligibility matrix.
- FATCA/CRS self-certification refresh and change-in-circumstances triggers.
- PAN/KYC/CKYC evidence ownership, expiry, correction, and retention.
- AML, sanctions, PEP, adverse-media, EDD, source of funds, and suspicious activity holds.
- NRE/NRO/FCNR account and repatriation restrictions.
- DTAA evidence validity, treaty version, Form 10F/TRC handling, and customer wording.
- PFIC/FAPI country-specific restrictions and qualified-counsel approval.
- Consent, cross-border processing, data residency, deletion, legal hold, and DSR handling.
- eSign validity, audit evidence, and document accessibility.
- Ongoing monitoring after activation.

### Trust opportunities

- One consistent “what this means / why / next step / last updated” status block.
- Data provenance on every financial summary.
- Clear distinction between estimate, pending, final, corrected, and unavailable.
- Named human ownership after escalation, with safe case reference and next update time.
- Visible source documents and calculation versions for tax and portfolio outputs.
- A correction/dispute path that does not require the user to prove the platform is wrong before opening a case.
- Security center showing active sessions, trusted devices, recent material changes, and recovery status.

### Accessibility considerations

- Status must be conveyed by text and structure, not colour.
- Async state changes require predictable focus and live-region behavior.
- Charts require equivalent tables and text summaries.
- Negative values, zero values, estimates, and currency conversions must be spoken clearly.
- Long country names, translated legal terms, and large-number formatting must reflow.
- Reports and downloadable records must be accessible, searchable, and keyboard navigable.

### Scalability opportunities

- Versioned domain contracts and backward-compatible API schemas.
- Event-driven status updates with replay and idempotent consumers.
- BFF/read-model layer for Home and Portfolio.
- Policy engine with effective-dated country and product rules.
- Canonical money, quantity, currency, time, and freshness types.
- Resource-scoped authorization and consent service.
- Config-driven content and status projections.
- Data-quality and reconciliation service shared by Portfolio, Tax, Support, and Operations.
- Localization-ready taxonomy and content from launch.

## Reusable UX Patterns and Components

### Patterns to standardize

1. **Status explanation pattern:** State, meaning, cause, action required, next step, owner, SLA, last updated.
2. **Financial provenance pattern:** Value, scope, currency, as-of time, source, calculation method, freshness, finality.
3. **Safe retry pattern:** Retry eligibility, idempotency protection, cooldown, result uncertainty, and support fallback.
4. **Policy restriction pattern:** What is restricted, why at a safe level, effective date, alternative, appeal/support path.
5. **Human handoff pattern:** Consent, context summary, case reference, owner, SLA, next update, and data shared.
6. **Review-and-confirm pattern:** Summary, differences, legal meaning, required consent, final authority, and audit confirmation.
7. **Financial correction pattern:** Original value, corrected value, reason, effective time, source, and impact.
8. **Scope switch pattern:** Legal owner, account/folio/household scope, permissions, currency, and data freshness.

### Components that should become shared platform primitives

- `LifecycleStatusBlock`
- `DependencyStatusRow`
- `FinancialValue`
- `DataFreshnessBadge`
- `CalculationProvenance`
- `PolicyDisclosure`
- `ConsentRecord`
- `HumanOwnershipBlock`
- `ReconciliationNotice`
- `SafeRetryAction`
- `ScopedAccessBanner`
- `DocumentValidityRow`
- `AuditMetadataBlock`
- `AccessibleFinancialTable`
- `SupportContextBundle`

These should be defined once and reused across Authentication, Onboarding, Activation, Home, Portfolio, Tax, Orders, and Support. They should be stateful components with explicit semantic contracts, not merely visual components.

## Simplification Recommendations

### 1. Keep six Portfolio screens and six Home screens

Do not split screens for every lifecycle state. Use state variants and server-configured content. The existing merge strategy is sound.

### 2. Keep the approved module boundaries

Do not introduce a separate “compliance center,” “data quality center,” or “AI center” for MVP. These are cross-cutting services and patterns, not new navigation destinations.

### 3. Consolidate shared rules outside screen documents

The repeated 20-section format is useful for designers but creates drift. Maintain:

- one versioned shared behavior contract;
- one state catalogue;
- one analytics registry;
- one component contract;
- screen-specific deltas.

The screen documents can continue to render the full structure for handoff.

### 4. Use one status shell with domain variants

Activation, KYC, report generation, support, and recovery all need the same semantic structure. A shared status shell reduces inconsistent copy and accessibility behavior without flattening their business meaning.

### 5. Make policy configuration the expansion mechanism

Country eligibility, disclosure, tax, and Home content differences should be policy/configuration-driven where safe. Avoid country-specific screen forks.

## Recommended Architecture Changes

### Change A: Add a Cross-Module Product Contract

This should define lifecycle sub-states, entitlements, state precedence, and deep-link behavior. It is the most important missing artifact.

### Change B: Add a Financial Truth and Data Quality Contract

This should define source hierarchy, freshness, reconciliation, estimates, corrections, currency, cost basis, and unknown outcomes.

### Change C: Add a Policy and Compliance Change-Control Contract

This should define effective-dated rules, approval, evidence, customer impact, re-consent, and fail-closed behavior.

### Change D: Add a Resource-Scoped Authorization Contract

This should define party, account, folio, household, mandate, consent, purpose, time window, step-up, and export controls.

### Change E: Repair and Validate the Specification Corpus

This should include ID linting, duplicate-reference checks, analytics-event ownership, and a canonical screen registry.

## Decision Log

| Decision | Rationale | Status |
|---|---|---|
| Preserve approved modules and navigation | The main risk is cross-module inconsistency, not missing top-level destinations | Approved for continuation |
| Preserve Home/Portfolio separation | Orientation and authoritative financial analysis have different jobs | Confirmed |
| Preserve Activation dependency map | Parallel and independent dependencies are more truthful than a linear progress bar | Confirmed, needs canonical dependency rules |
| Treat investor readiness as revocable entitlement | Regulatory and account conditions change after first approval | Required P0 change |
| Use policy-bounded personalization | Relevance is valuable; ungoverned advice is unsafe | Required P0 change |
| Use a shared state/status component family | Repeated status behavior is a major consistency and accessibility risk | Required P1/P2 change |
| Do not add new MVP screens for the findings above | Most issues are model, data, permission, or component problems | Confirmed |

## Recommended Next Steps

1. Repair the Authentication specification and create a canonical screen registry.
2. Produce the Cross-Module Product Contract for lifecycle, entitlements, and state precedence.
3. Produce the Financial Truth and Data Quality Contract with payment/order/settlement/reconciliation states.
4. Freeze launch countries, supported account types, fund eligibility, tax language, and compliance interpretations.
5. Define resource-scoped permissions and consent for investor, joint holder, nominee, RM, support, tax, and operations roles.
6. Define ongoing monitoring and re-verification triggers after activation.
7. Convert accessibility, localization, analytics, offline, and notification principles into testable acceptance criteria.
8. Run scenario-based review with Product, Compliance, Operations, Finance/Tax, Engineering, QA, Support, and Legal.
9. Only then proceed to high-fidelity design and regulated engineering implementation.

## Final Recommendation

**Can low-fidelity exploration continue?** Yes, for stable structural patterns and already-approved module boundaries.

**Can the platform move to high-fidelity execution and production API commitment?** No, not until P0-01 through P0-09 are resolved and signed off.

**Should the architecture be redesigned?** No. The strongest path is a controlled hardening of the current architecture: preserve the module boundaries and navigation, add the missing cross-module contracts, and simplify repeated screen specifications through shared behavioral primitives.
