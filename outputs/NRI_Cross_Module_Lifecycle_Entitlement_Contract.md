# NRI WealthTech Platform
## Cross-Module Lifecycle & Entitlement Contract

**Document type:** Platform architecture contract
**Status:** Authoritative foundation for APIs, backend services, QA, analytics, AI, Design System, Figma, and implementation
**Scope:** Authentication, Onboarding, Investment Activation, Home, Portfolio, Orders, Reports, Notifications, Support, and future modules
**Version:** 1.0
**Date:** 15 July 2026

## 0. Contract Authority

This is the single authoritative source for cross-module state, state precedence, entitlement evaluation, conflict resolution, and transition semantics. Approved module specifications remain unchanged and consume this contract; they must not define competing lifecycle truth.

### Normative language

- **MUST:** Required for safety, compliance, integrity, or contract validity.
- **MUST NOT:** Prohibited behavior.
- **SHOULD:** Strong default unless an approved exception exists.
- **MAY:** Permitted but not required.
- **UNKNOWN:** Not defined by approved sources and must not be inferred by implementation.

### Consumers

Backend services, APIs, clients, Home and Portfolio read models, order/payment orchestration, reports and tax computation, notifications, support and operations, QA, analytics, AI agents, Design System components, Figma annotations, and future modules.

## 1. Architectural Position

The platform has three distinct layers:

1. **Domain state:** What has happened in one business domain.
2. **Entitlement:** What an actor may view or do given authority, consent, policy, risk, account, and data state.
3. **Module projection:** What a module summarizes for a particular actor and context.

These are not interchangeable. `KYC_APPROVED` does not imply investment permission. `PORTFOLIO_VISIBLE` does not imply order permission. `INVESTOR_READY` is not permanent. `PAYMENT_SUCCESS` does not imply settlement. `DOCUMENT_APPROVED` does not imply current consent.

## 2. Global Invariants

1. Every material state has an owning service, version, timestamp, source, reason code, and correlation ID.
2. State history is append-only. Corrections create new events.
3. Clients never authoritatively change regulated, financial, security, or permission state.
4. A timeout becomes `UNKNOWN_OUTCOME` or `PENDING` according to domain rules; it never becomes success by inference.
5. Retry is allowed only when idempotency and duplicate-side-effect protection are confirmed.
6. User-visible success requires authoritative confirmation from the owning service or an approved reconciled source.
7. Stale policy, identity, eligibility, bank, tax, or financial data cannot silently grant a money-moving entitlement.
8. A restriction may reduce actions without deleting legally required history or safe customer access.
9. Suspension overrides action entitlements immediately, subject to safe read access required by policy.
10. Sensitive reasons are disclosed at the minimum safe level; internal AML, fraud, vendor, and security signals are protected.
11. Every financial value includes scope, currency, as-of time, source, completeness, freshness, and finality.
12. Human approvals record actor, role, authority, reason, evidence, policy version, and timestamp.
13. Every entitlement evaluation records the policy version and material decision inputs.
14. Consent is scoped, purpose-bound, revocable, and time-bounded where required.
15. Notifications communicate state; they do not create state.
16. Analytics observe state and intent; analytics events never authorize actions.
17. AI operates only within its approved capability class and current entitlements.
18. A domain machine cannot invent a transition owned by another domain.

## 3. Canonical Identifiers and Common Types

| Identifier | Purpose |
|---|---|
| `party_id` | Legal person or organization identity |
| `investor_id` | Stable customer identity record |
| `account_id` | Investment/account ownership context |
| `folio_id` | AMC/RTA ownership record |
| `household_id` | Explicitly permissioned family grouping |
| `case_id` | Support, compliance, recovery, or review case |
| `order_id` | Customer instruction and order lifecycle |
| `payment_id` | Payment attempt/authorization ledger record |
| `transaction_id` | Financial transaction record |
| `report_id` | Generated report artifact |
| `document_id` | Logical document with versions |
| `document_version_id` | Specific submitted or issued document |
| `consent_id` | Purpose and scope-specific consent |
| `session_id` | Authenticated session |
| `device_id` | Device record; raw identifier remains protected |
| `correlation_id` | End-to-end request/event correlation |
| `idempotency_key` | Duplicate-side-effect prevention |
| `policy_version` | Effective business, regulatory, or calculation policy |

### Common state metadata

Every state record MUST contain `entity_id`, `domain`, `state`, `substate`, `version`, `prior_state`, `occurred_at`, `effective_at`, `source`, `actor_type`, `actor_id_or_hash`, `reason_code`, `policy_version`, `correlation_id`, `expires_at`, `next_review_at`, `owner_team`, and `customer_safe_summary`.

## 4. State Machine Contract

Each machine specifies purpose, allowed states, entry and exit conditions, transitions, invalid transitions, timeout rules, failure and recovery behavior, dependencies, analytics, accessibility, and engineering notes.

## 5. Identity State Machine

### Purpose

Represent existence, ownership, uniqueness, and legal identity relationship without implying authentication, KYC approval, eligibility, or investment permission.

### Allowed states

`UNREGISTERED`, `PROVISIONAL`, `CONTACT_VERIFIED`, `IDENTITY_CLAIMED`, `DUPLICATE_SUSPECTED`, `IDENTITY_CONFIRMED`, `IDENTITY_CORRECTION_REQUIRED`, `IDENTITY_RESTRICTED`, `IDENTITY_SUSPENDED`, `IDENTITY_CLOSED`, `IDENTITY_DECEASED_OR_CLAIM_HOLD`.

### Entry conditions

- `UNREGISTERED`: No platform identity exists under the approved uniqueness policy.
- `PROVISIONAL`: Minimum registration data and consent are stored.
- `CONTACT_VERIFIED`: Required email/mobile ownership is verified.
- `IDENTITY_CLAIMED`: Attributes are linked pending authoritative confirmation.
- `IDENTITY_CONFIRMED`: Evidence and uniqueness checks are approved.

### Exit conditions

Identity exits only through controlled correction, restriction, suspension, closure, or legal/death-claim processing.

### Allowed transitions

`UNREGISTERED -> PROVISIONAL`

`PROVISIONAL -> CONTACT_VERIFIED | IDENTITY_RESTRICTED | IDENTITY_SUSPENDED`

`CONTACT_VERIFIED -> IDENTITY_CLAIMED | DUPLICATE_SUSPECTED`

`IDENTITY_CLAIMED -> IDENTITY_CONFIRMED | IDENTITY_CORRECTION_REQUIRED | DUPLICATE_SUSPECTED | IDENTITY_RESTRICTED`

`DUPLICATE_SUSPECTED -> IDENTITY_CLAIMED | IDENTITY_RESTRICTED | IDENTITY_SUSPENDED`

`IDENTITY_CORRECTION_REQUIRED -> IDENTITY_CLAIMED | IDENTITY_RESTRICTED`

`IDENTITY_CONFIRMED -> IDENTITY_CORRECTION_REQUIRED | IDENTITY_RESTRICTED | IDENTITY_SUSPENDED | IDENTITY_DECEASED_OR_CLAIM_HOLD | IDENTITY_CLOSED`

### Invalid transitions

- Contact verification directly to confirmed identity without identity evidence.
- Suspended identity directly to confirmed identity by customer action.
- Closed identity directly to provisional without an approved new-relationship policy.
- Identity merge without an immutable merge decision and audit record.

### Timeout rules

Provisional identity and recovery evidence expire according to policy. Expiry preserves required evidence and audit history.

### Failure rules

Duplicate and mismatch outcomes are domain states, not generic technical failures.

### Recovery rules

Use verified-channel recovery, evidence submission, controlled merge review, or Support/Compliance escalation. Never reveal whether another account exists through timing or error copy.

### Dependencies

Identity, contact verification, PAN/tax identity, KYC/CKYC, duplicate detection, consent, fraud/security, audit, Support.

### Analytics events

`identity_provisional_created`, `identity_contact_verified`, `identity_claim_started`, `identity_confirmed`, `identity_duplicate_suspected`, `identity_correction_required`, `identity_restricted`, `identity_suspended`, `identity_closed`, `identity_recovery_started`.

### Accessibility considerations

State names, safe explanations, and next actions are text and programmatically announced. Masked identifiers have accessible labels without exposing raw values.

### Engineering notes

Do not use email or mobile as the stable primary key. Identity merge, correction, closure, and death-claim handling require maker-checker and immutable audit events.

## 6. Authentication State Machine

### Purpose

Represent whether an actor may establish or maintain an authenticated session.

### Allowed states

`AUTH_NOT_STARTED`, `CHALLENGE_ISSUED`, `CHALLENGE_PENDING`, `AUTHENTICATED`, `STEP_UP_REQUIRED`, `AUTH_FAILED`, `RATE_LIMITED`, `AUTH_SUSPENDED`, `SESSION_EXPIRED`, `RECOVERY_REQUIRED`, `AUTH_REVOKED`.

### Entry conditions

The request has a valid context, rate-limit evaluation, and an approved channel or factor policy.

### Exit conditions

Authentication exits to an authenticated session, failure, rate limit, suspension, recovery, or expiry.

### Allowed transitions

`AUTH_NOT_STARTED -> CHALLENGE_ISSUED`

`CHALLENGE_ISSUED -> CHALLENGE_PENDING | AUTH_FAILED | RATE_LIMITED`

`CHALLENGE_PENDING -> AUTHENTICATED | STEP_UP_REQUIRED | AUTH_FAILED | RATE_LIMITED`

`AUTHENTICATED -> STEP_UP_REQUIRED | SESSION_EXPIRED | AUTH_REVOKED | AUTH_SUSPENDED`

`STEP_UP_REQUIRED -> AUTHENTICATED | AUTH_FAILED | RATE_LIMITED | RECOVERY_REQUIRED`

`AUTH_FAILED -> CHALLENGE_ISSUED | RATE_LIMITED | RECOVERY_REQUIRED | AUTH_SUSPENDED`

`SESSION_EXPIRED -> AUTH_NOT_STARTED`

`RECOVERY_REQUIRED -> CHALLENGE_ISSUED | AUTH_SUSPENDED`

### Invalid transitions

- Client-side OTP acceptance to `AUTHENTICATED`.
- Failed authentication directly to authenticated without a new factor.
- Suspended authentication directly to authenticated without authorized release.
- Replay of an expired or used challenge.

### Timeout rules

Challenges expire server-side. Network uncertainty does not prove failure or success.

### Failure rules

Unknown identifiers use account-safe messaging. Expiry, rate limit, outage, and recovery requirement may be distinguished when actionable.

### Recovery rules

Resend, use an alternate verified factor, start device/account recovery, or wait for timed lockout. Security holds require authorized review.

### Dependencies

Identity, OTP/email-link provider, device risk, session service, security monitoring, consent, audit, notification.

### Analytics events

`auth_started`, `auth_challenge_issued`, `auth_succeeded`, `auth_failed`, `auth_step_up_required`, `auth_rate_limited`, `auth_suspended`, `auth_recovery_started`, `auth_session_created`.

### Accessibility considerations

OTP inputs support a coherent semantic group, paste where allowed, announced cooldowns, predictable focus, and non-colour error messaging.

### Engineering notes

Authentication and authorization are separate. Login creates a session but does not grant business entitlements.

## 7. Onboarding State Machine

### Purpose

Represent completion of required investor profile and regulatory setup before activation evaluation.

### Allowed states

`NOT_STARTED`, `IN_PROGRESS`, `DRAFT_SAVED`, `SUBMITTED`, `MORE_INFORMATION_REQUIRED`, `VALIDATING`, `COMPLETED`, `REJECTED`, `EXPIRED`, `SUSPENDED`, `ABANDONED`.

### Entry conditions

Identity is sufficiently established for provisional onboarding, required consent exists, and country/account policy is available.

### Exit conditions

Onboarding completes only after all required data, declarations, evidence, and signatures are authoritative. Completion does not imply KYC approval or investor readiness.

### Allowed transitions

`NOT_STARTED -> IN_PROGRESS`

`IN_PROGRESS -> DRAFT_SAVED | SUBMITTED | ABANDONED`

`DRAFT_SAVED -> IN_PROGRESS | EXPIRED | ABANDONED`

`SUBMITTED -> VALIDATING | MORE_INFORMATION_REQUIRED | REJECTED | SUSPENDED`

`VALIDATING -> COMPLETED | MORE_INFORMATION_REQUIRED | REJECTED | SUSPENDED | EXPIRED`

`MORE_INFORMATION_REQUIRED -> IN_PROGRESS | SUBMITTED | EXPIRED | SUSPENDED`

`COMPLETED -> EXPIRED | SUSPENDED | MORE_INFORMATION_REQUIRED`

### Invalid transitions

- In-progress directly to completed without server validation.
- Submitted directly to completed without required outcomes.
- Rejected directly to completed without a new approved submission.
- Expired directly to activation without renewal or an approved exception.

### Timeout rules

Draft expiry, external processing, and evidence validity use independent clocks.

### Failure rules

Field errors are correctable. Vendor failures become retry/pending or operations exceptions. Policy failures become restricted, rejected, or review states.

### Recovery rules

Resume draft, correct evidence, resubmit, renew expired data, or escalate with a case reference.

### Dependencies

Identity, country policy, PAN, personal profile, FATCA/CRS, tax residency, risk profile, bank, nominee, documents, eSign, KYC, AML/EDD, consent, audit.

### Analytics events

`onboarding_started`, `onboarding_draft_saved`, `onboarding_submitted`, `onboarding_validation_started`, `onboarding_more_info_required`, `onboarding_completed`, `onboarding_rejected`, `onboarding_expired`, `onboarding_suspended`.

### Accessibility considerations

Progress communicates completed, current, blocked, and optional steps in text. Required declarations and errors are programmatically associated with fields.

### Engineering notes

Onboarding is a workflow aggregate. Store step outcomes independently and compute the aggregate under policy.

## 8. Compliance State Machine

### Purpose

Represent current regulatory, AML, KYC, tax-certification, and enhanced-due-diligence posture.

### Allowed states

`NOT_STARTED`, `SCREENING`, `VERIFICATION`, `APPROVED`, `APPROVED_WITH_RESTRICTIONS`, `MORE_INFORMATION_REQUIRED`, `MANUAL_REVIEW`, `EDD_REQUIRED`, `REJECTED`, `EXPIRED`, `REVERIFICATION_REQUIRED`, `SUSPENDED`, `CLOSED`.

### Entry conditions

Required identity, country, account, declarations, and evidence exist under an approved policy version.

### Exit conditions

Compliance approval is domain-specific and may be time-bounded. It can regress without implying prior approval was incorrect.

### Allowed transitions

`NOT_STARTED -> SCREENING | VERIFICATION`

`SCREENING -> APPROVED | APPROVED_WITH_RESTRICTIONS | MANUAL_REVIEW | EDD_REQUIRED | REJECTED | SUSPENDED`

`VERIFICATION -> APPROVED | MORE_INFORMATION_REQUIRED | MANUAL_REVIEW | REJECTED | EXPIRED`

`MORE_INFORMATION_REQUIRED -> VERIFICATION | MANUAL_REVIEW | EXPIRED | SUSPENDED`

`MANUAL_REVIEW -> APPROVED | APPROVED_WITH_RESTRICTIONS | EDD_REQUIRED | REJECTED | SUSPENDED`

`EDD_REQUIRED -> VERIFICATION | MANUAL_REVIEW | REJECTED | SUSPENDED`

`APPROVED -> APPROVED_WITH_RESTRICTIONS | REVERIFICATION_REQUIRED | EXPIRED | SUSPENDED | CLOSED`

`APPROVED_WITH_RESTRICTIONS -> APPROVED | REVERIFICATION_REQUIRED | EXPIRED | SUSPENDED | CLOSED`

`REVERIFICATION_REQUIRED -> VERIFICATION | MANUAL_REVIEW | SUSPENDED | EXPIRED`

### Invalid transitions

- Approval by an unauthorized role.
- Rejected directly to approved without new evidence and a new decision event.
- Automatic clearance of sanctions, PEP, or EDD cases by client retry.
- Reuse of tax self-certification outside its approved scope.

### Timeout rules

Screening timeout becomes review/pending internal state and never approval. SLA breach creates escalation and customer-safe delay status.

### Failure rules

Technical failure, policy restriction, and compliance rejection remain distinct. Internal match reasons are protected.

### Recovery rules

Provide evidence, correct declarations, complete EDD, renew expired certification, or follow the approved review/appeal process.

### Dependencies

Identity, KYC/CKYC, AML/sanctions/PEP, country policy, FATCA/CRS, tax residency, documents, eSign, human review, audit, notification.

### Analytics events

`compliance_screening_started`, `compliance_review_started`, `compliance_more_info_required`, `compliance_edd_required`, `compliance_approved`, `compliance_restricted`, `compliance_rejected`, `compliance_reverification_required`, `compliance_expired`, `compliance_suspended`.

### Accessibility considerations

Sensitive match reasons are not exposed through colour or overly specific copy. Required actions and review states are announced in plain language.

### Engineering notes

Every decision stores source list/version, rule version, evidence references, reviewer authority, and effective/expiry timestamps. Compliance state is not equivalent to KYC state.

## 9. Activation State Machine

### Purpose

Represent completion of operational dependencies required before a specific investment account may perform a specific investment action.

### Allowed states

`NOT_STARTED`, `IN_PROGRESS`, `DEPENDENCY_PENDING`, `DEPENDENCY_APPROVED`, `DEPENDENCY_FAILED`, `DELAYED`, `READY`, `READY_WITH_RESTRICTIONS`, `REVERIFICATION_REQUIRED`, `SUSPENDED`, `CLOSED`.

### Entry conditions

Onboarding is complete or otherwise eligible for activation, and the activation dependency graph is available.

### Exit conditions

`READY` means the current dependency graph and policy allow defined actions. It is not permanent and does not imply portfolio ownership.

### Allowed transitions

`NOT_STARTED -> IN_PROGRESS`

`IN_PROGRESS -> DEPENDENCY_PENDING | DEPENDENCY_APPROVED | DEPENDENCY_FAILED | DELAYED | SUSPENDED`

`DEPENDENCY_PENDING -> DEPENDENCY_APPROVED | DEPENDENCY_FAILED | DELAYED | SUSPENDED`

`DEPENDENCY_APPROVED -> IN_PROGRESS | READY | READY_WITH_RESTRICTIONS | REVERIFICATION_REQUIRED`

`DEPENDENCY_FAILED -> IN_PROGRESS | DEPENDENCY_PENDING | SUSPENDED | CLOSED`

`DELAYED -> DEPENDENCY_PENDING | DEPENDENCY_FAILED | SUSPENDED | CLOSED`

`READY -> READY_WITH_RESTRICTIONS | REVERIFICATION_REQUIRED | SUSPENDED | CLOSED`

`READY_WITH_RESTRICTIONS -> READY | REVERIFICATION_REQUIRED | SUSPENDED | CLOSED`

### Invalid transitions

- Ready before all blocking dependencies and policy checks are satisfied.
- Dependency failure directly to ready without an authoritative new result.
- Client retry creating a second exchange client, bank verification, or activation record.
- Exploration being treated as activation approval.

### Timeout rules

Normal pending and delayed thresholds are effective-dated service configuration. Delayed status requires owner and next update time.

### Failure rules

Dependency failure remains scoped. Bank failure does not erase KYC approval; exchange failure does not imply identity failure.

### Recovery rules

Retry safe verification, select another supported bank, correct evidence, wait for operations, or contact Support/RM. Previous outcomes remain auditable.

### Dependencies

Onboarding, Compliance, bank verification/penny drop, exchange/client creation, account/folio setup, policy, payment capability, operations, audit.

### Analytics events

`activation_started`, `activation_dependency_pending`, `activation_dependency_approved`, `activation_dependency_failed`, `activation_delayed`, `activation_ready`, `activation_restricted`, `activation_reverification_required`, `activation_suspended`.

### Accessibility considerations

Dependency maps expose each dependency as a labelled status item with state, action required, and next update. Aggregate progress alone is not sufficient.

### Engineering notes

Activation is a dependency graph, not a linear checklist. The graph identifies blocking versus non-blocking dependencies and supports parallel execution.

## 10. Investor Eligibility State Machine

### Purpose

Determine whether a particular actor, account, country, scheme, transaction type, and time context is eligible for a specific action.

### Allowed states

`NOT_EVALUATED`, `EVALUATING`, `ELIGIBLE`, `ELIGIBLE_WITH_DISCLOSURE`, `RESTRICTED_BY_COUNTRY`, `RESTRICTED_BY_ACCOUNT`, `RESTRICTED_BY_RISK`, `RESTRICTED_BY_POLICY`, `REVIEW_REQUIRED`, `EXPIRED`, `INELIGIBLE`, `STALE_POLICY`, `SUSPENDED`.

### Entry conditions

The request includes actor, account, product, action, country, tax, risk, compliance, and effective-date context.

### Exit conditions

Eligibility is valid only for the evaluated scope, action, product, and policy version. It must be re-evaluated when any material input changes.

### Allowed transitions

`NOT_EVALUATED -> EVALUATING`

`EVALUATING -> ELIGIBLE | ELIGIBLE_WITH_DISCLOSURE | RESTRICTED_BY_COUNTRY | RESTRICTED_BY_ACCOUNT | RESTRICTED_BY_RISK | RESTRICTED_BY_POLICY | REVIEW_REQUIRED | INELIGIBLE | STALE_POLICY | SUSPENDED`

`ELIGIBLE -> EXPIRED | REVIEW_REQUIRED | RESTRICTED_BY_POLICY | SUSPENDED`

`ELIGIBLE_WITH_DISCLOSURE -> ELIGIBLE | EXPIRED | REVIEW_REQUIRED | RESTRICTED_BY_POLICY | SUSPENDED`

`REVIEW_REQUIRED -> ELIGIBLE | ELIGIBLE_WITH_DISCLOSURE | INELIGIBLE | SUSPENDED`

`STALE_POLICY -> EVALUATING | RESTRICTED_BY_POLICY`

### Invalid transitions

- Eligibility evaluated without a product and action scope.
- Eligibility reused after country, account, tax, risk, or policy change without re-evaluation.
- Client override of country or risk restriction.
- Eligibility approval used for a different account or folio.

### Timeout rules

An unavailable eligibility source produces `STALE_POLICY` or `REVIEW_REQUIRED`; money movement fails closed.

### Failure rules

Technical source failure is not ineligibility. Show safe unavailable status and preserve the last valid decision with its expiry/freshness only where policy permits.

### Recovery rules

Refresh policy, correct context, submit review evidence, or wait for operations/compliance.

### Dependencies

Country and scheme masters, account type, NRE/NRO rules, tax residency, compliance, risk profile, AML/EDD, product status, policy engine.

### Analytics events

`eligibility_evaluation_started`, `eligibility_granted`, `eligibility_granted_with_disclosure`, `eligibility_restricted`, `eligibility_review_required`, `eligibility_expired`, `eligibility_policy_stale`, `eligibility_suspended`.

### Accessibility considerations

The result states what was evaluated, what it means, and what action is available. Restrictions are not conveyed by colour alone.

### Engineering notes

Eligibility decisions are immutable facts tied to input hashes and policy versions. They are never a global boolean on the investor record.

## 11. Portfolio Data State Machine

### Purpose

Represent the integrity, freshness, completeness, and reconciliation status of portfolio data independently from whether the investor is allowed to transact.

### Allowed states

`NOT_AVAILABLE`, `REQUESTED`, `LOADING`, `FRESH`, `STALE`, `PARTIAL`, `ESTIMATED`, `RECONCILIATION_REQUIRED`, `CORRECTED`, `SOURCE_UNAVAILABLE`, `RESTRICTED_VIEW`, `SUSPENDED_SOURCE`, `ARCHIVED`.

### Entry conditions

Portfolio scope and source authority are known.

### Exit conditions

Data state changes when a source snapshot, reconciliation result, correction, permission, or source outage changes.

### Allowed transitions

`NOT_AVAILABLE -> REQUESTED`

`REQUESTED -> LOADING | SOURCE_UNAVAILABLE | RESTRICTED_VIEW`

`LOADING -> FRESH | STALE | PARTIAL | ESTIMATED | RECONCILIATION_REQUIRED | SOURCE_UNAVAILABLE`

`FRESH -> STALE | PARTIAL | RECONCILIATION_REQUIRED | CORRECTED | RESTRICTED_VIEW | SUSPENDED_SOURCE`

`STALE -> FRESH | PARTIAL | RECONCILIATION_REQUIRED | SOURCE_UNAVAILABLE`

`PARTIAL -> FRESH | STALE | RECONCILIATION_REQUIRED | SOURCE_UNAVAILABLE`

`ESTIMATED -> FRESH | PARTIAL | RECONCILIATION_REQUIRED`

`RECONCILIATION_REQUIRED -> CORRECTED | FRESH | PARTIAL | SOURCE_UNAVAILABLE`

### Invalid transitions

- `LOADING -> FRESH` without source response and completeness evaluation.
- `SOURCE_UNAVAILABLE -> FRESH` without a current source or approved fallback.
- Estimated data presented as final.
- Partial data presented as complete portfolio scope.

### Timeout rules

Refresh timeout preserves last known data with stale/unknown labeling. It must not update valuation time.

### Failure rules

Localize source failures to affected scope. A single RTA outage must not erase unaffected holdings.

### Recovery rules

Retry source fetch, reconcile with alternate source, create a correction case, or show the latest safe snapshot with a support path.

### Dependencies

RTA, execution platform, NAV source, FX source, transaction ledger, cost-basis/tax service, reconciliation engine, permissions.

### Analytics events

`portfolio_requested`, `portfolio_loaded`, `portfolio_fresh`, `portfolio_stale`, `portfolio_partial`, `portfolio_estimated`, `portfolio_reconciliation_required`, `portfolio_corrected`, `portfolio_source_unavailable`.

### Accessibility considerations

Every value includes text labels for scope, as-of time, currency, source quality, and finality. Charts have table and text alternatives.

### Engineering notes

Home consumes a restricted projection. Portfolio is the authoritative customer workspace but still exposes source/freshness metadata rather than claiming every number is final.

## 12. Order State Machine

### Purpose

Represent an investor instruction from creation through validation, execution, settlement, reversal, or unresolved reconciliation.

### Allowed states

`DRAFT`, `SUBMITTED`, `VALIDATING`, `PAYMENT_PENDING`, `PAYMENT_CONFIRMED`, `EXECUTION_PENDING`, `ACCEPTED`, `PARTIALLY_EXECUTED`, `SETTLED`, `REJECTED`, `EXPIRED`, `CANCEL_REQUESTED`, `CANCELLED`, `REVERSED`, `UNKNOWN_OUTCOME`, `RECONCILIATION_REQUIRED`, `REFUND_PENDING`, `REFUNDED`, `SUSPENDED`.

### Entry conditions

The actor, account, product, action, eligibility, risk, price/cutoff context, and idempotency key are valid.

### Exit conditions

An order is final only when settlement, rejection, cancellation, reversal, or refund outcome is authoritative and reconciled.

### Allowed transitions

`DRAFT -> SUBMITTED | EXPIRED`

`SUBMITTED -> VALIDATING | REJECTED | EXPIRED`

`VALIDATING -> PAYMENT_PENDING | EXECUTION_PENDING | REJECTED | SUSPENDED`

`PAYMENT_PENDING -> PAYMENT_CONFIRMED | REJECTED | UNKNOWN_OUTCOME | REFUND_PENDING`

`PAYMENT_CONFIRMED -> EXECUTION_PENDING | RECONCILIATION_REQUIRED`

`EXECUTION_PENDING -> ACCEPTED | PARTIALLY_EXECUTED | REJECTED | UNKNOWN_OUTCOME`

`ACCEPTED -> SETTLED | PARTIALLY_EXECUTED | REVERSED | RECONCILIATION_REQUIRED`

`PARTIALLY_EXECUTED -> SETTLED | REFUND_PENDING | RECONCILIATION_REQUIRED`

`RECONCILIATION_REQUIRED -> SETTLED | REJECTED | REVERSED | REFUND_PENDING | UNKNOWN_OUTCOME`

`CANCEL_REQUESTED -> CANCELLED | REJECTED | ACCEPTED | RECONCILIATION_REQUIRED`

`REFUND_PENDING -> REFUNDED | RECONCILIATION_REQUIRED | UNKNOWN_OUTCOME`

### Invalid transitions

- Timeout directly to rejected when payment or execution outcome is unknown.
- Duplicate order creation from retry.
- Settled order directly to cancelled without reversal/adjustment policy.
- Refund marked complete from gateway callback without bank/ledger reconciliation.
- Customer editing an order after the modification cutoff.

### Timeout rules

Timeout creates a pending or unknown-outcome state and starts reconciliation. The user must not be asked to repeat the order until duplicate risk is cleared.

### Failure rules

Payment failure, order rejection, cutoff expiry, account restriction, execution rejection, and reconciliation uncertainty are distinct.

### Recovery rules

Refresh status, wait for reconciliation, cancel where allowed, correct eligibility, retry only with a new idempotency key when safe, or contact Operations/Support.

### Dependencies

Eligibility, compliance, bank/account, payment, execution platform, RTA, NAV/cutoff calendar, transaction ledger, refund, notification, audit.

### Analytics events

`order_created`, `order_submitted`, `order_validating`, `order_payment_pending`, `order_payment_confirmed`, `order_execution_pending`, `order_accepted`, `order_partially_executed`, `order_settled`, `order_rejected`, `order_expired`, `order_cancelled`, `order_reversed`, `order_unknown_outcome`, `order_reconciliation_required`, `order_refund_completed`.

### Accessibility considerations

Order status, money amount, current outcome, uncertainty, and next action are announced. A pending/unknown result must not be represented as success.

### Engineering notes

Payment, order, execution, settlement, and refund are separate ledgers linked by correlation and idempotency keys. Callbacks are asynchronous and replayable.

## 13. Report Generation State Machine

### Purpose

Represent preparation, calculation, review, issuance, and expiry of financial, tax, compliance, and account reports.

### Allowed states

`NOT_REQUESTED`, `REQUESTED`, `QUEUED`, `GENERATING`, `SOURCE_REVIEW`, `READY_PROVISIONAL`, `READY_FINAL`, `FAILED`, `STALE`, `EXPIRED`, `RESTRICTED`, `CANCELLED`, `AMENDED`.

### Entry conditions

The actor has report permission, scope, period, source availability, and any required consent.

### Exit conditions

The report is final only when all declared sources, rules, and review requirements are satisfied.

### Allowed transitions

`NOT_REQUESTED -> REQUESTED`

`REQUESTED -> QUEUED | RESTRICTED | FAILED`

`QUEUED -> GENERATING | FAILED | CANCELLED`

`GENERATING -> SOURCE_REVIEW | READY_PROVISIONAL | FAILED | STALE`

`SOURCE_REVIEW -> READY_FINAL | READY_PROVISIONAL | FAILED | RESTRICTED`

`READY_PROVISIONAL -> READY_FINAL | AMENDED | STALE | EXPIRED`

`READY_FINAL -> AMENDED | STALE | EXPIRED`

`STALE -> GENERATING | AMENDED | EXPIRED`

### Invalid transitions

- Report marked final while required source data is stale or unreconciled.
- Expired download link treated as expired underlying report.
- A report generated for one scope exported as another scope.
- Tax estimate presented as final report.

### Timeout rules

Generation timeout remains queued/generating only when the job service confirms it; otherwise it becomes retryable unknown job status and must be reconciled.

### Failure rules

Source failure, calculation failure, permission restriction, and report expiry remain distinct.

### Recovery rules

Retry generation, refresh sources, correct scope, request support review, or download the latest valid artifact.

### Dependencies

Portfolio data, transaction ledger, tax engine, DTAA policy, source documents, permissions, report renderer, secure storage, notification.

### Analytics events

`report_requested`, `report_queued`, `report_generation_started`, `report_provisional_ready`, `report_final_ready`, `report_generation_failed`, `report_stale`, `report_expired`, `report_amended`, `report_downloaded`.

### Accessibility considerations

Reports and exports must have accessible table structure, document metadata, searchable text, meaningful headings, and a web alternative where feasible.

### Engineering notes

Store source snapshot IDs, calculation versions, policy versions, report hash, generation time, finality, and amendment lineage.

## 14. Support Case State Machine

### Purpose

Represent customer-reported issues, service requests, complaints, escalations, and human ownership.

### Allowed states

`NOT_CREATED`, `DRAFT`, `OPEN`, `TRIAGED`, `ASSIGNED`, `WAITING_FOR_CUSTOMER`, `WAITING_FOR_VENDOR`, `WAITING_FOR_INTERNAL_REVIEW`, `ESCALATED`, `RESOLVED`, `CLOSED`, `REOPENED`, `CANCELLED`, `RESTRICTED`.

### Entry conditions

A customer, system, or authorized employee creates a case with a valid scope and safe context bundle.

### Exit conditions

Closure requires resolution reason, evidence, owner, communication record, and reopening policy.

### Allowed transitions

`NOT_CREATED -> DRAFT | OPEN`

`DRAFT -> OPEN | CANCELLED`

`OPEN -> TRIAGED | RESTRICTED | CANCELLED`

`TRIAGED -> ASSIGNED | WAITING_FOR_CUSTOMER | WAITING_FOR_INTERNAL_REVIEW | ESCALATED`

`ASSIGNED -> WAITING_FOR_CUSTOMER | WAITING_FOR_VENDOR | WAITING_FOR_INTERNAL_REVIEW | RESOLVED | ESCALATED`

`WAITING_FOR_CUSTOMER -> ASSIGNED | CLOSED | ESCALATED`

`WAITING_FOR_VENDOR -> ASSIGNED | ESCALATED | RESOLVED`

`WAITING_FOR_INTERNAL_REVIEW -> ASSIGNED | ESCALATED | RESOLVED`

`ESCALATED -> ASSIGNED | RESOLVED | CLOSED`

`RESOLVED -> CLOSED | REOPENED`

`CLOSED -> REOPENED` only under approved reopen policy.

### Invalid transitions

- Closing without a disposition and customer-safe resolution.
- Support changing compliance, financial, or eligibility state outside authority.
- Exposing restricted evidence to a role without consent and scope.

### Timeout rules

SLA breach creates escalation, not silent closure. Waiting-for-customer timers require clear reminder and expiry policy.

### Failure rules

Case creation failure must not imply the underlying financial or regulatory issue is resolved.

### Recovery rules

Retry case creation idempotently, preserve draft context, reopen within policy, or route to a regulated grievance path.

### Dependencies

CRM/helpdesk, identity, permissions, originating domain, notifications, SLA calendar, audit, vendor incident management.

### Analytics events

`case_created`, `case_triaged`, `case_assigned`, `case_waiting_for_customer`, `case_waiting_for_vendor`, `case_escalated`, `case_resolved`, `case_closed`, `case_reopened`, `case_sla_breached`.

### Accessibility considerations

Conversation history, status, owner, due time, and required customer action must be keyboard and screen-reader accessible. Do not rely on colour for severity.

### Engineering notes

Every case must identify the originating entity and preserve a safe context bundle. Support may not become an unlogged shadow workflow.

## 15. Notification State Machine

### Purpose

Represent creation, authorization, delivery, suppression, and evidence of a notification without confusing delivery with business state.

### Allowed states

`NOT_CREATED`, `QUEUED`, `AUTHORIZED`, `SENDING`, `SENT`, `DELIVERED`, `READ`, `BOUNCED`, `FAILED`, `SUPPRESSED`, `EXPIRED`, `CANCELLED`, `RETRYING`.

### Entry conditions

A domain event or approved schedule creates a notification with channel, template, consent basis, criticality, and recipient scope.

### Exit conditions

Notification processing ends at delivered/read, failed/bounced, suppressed, expired, or cancelled. The underlying domain event remains independent.

### Allowed transitions

`NOT_CREATED -> QUEUED`

`QUEUED -> AUTHORIZED | SUPPRESSED | CANCELLED`

`AUTHORIZED -> SENDING | SUPPRESSED`

`SENDING -> SENT | FAILED | RETRYING`

`SENT -> DELIVERED | BOUNCED | FAILED`

`DELIVERED -> READ | EXPIRED`

`RETRYING -> SENDING | FAILED | SUPPRESSED`

### Invalid transitions

- Notification delivery changing order, payment, or compliance state.
- Marketing consent used to send a mandatory security notice without the correct lawful basis.
- WhatsApp treated as sole evidence for a legal/transactional communication.
- Repeated delivery without deduplication.

### Timeout rules

Delivery timeout creates retry/failure according to channel SLA. In-app record is created for critical events regardless of external channel outcome.

### Failure rules

Channel failure does not change the underlying state. Critical events use approved fallback channels.

### Recovery rules

Retry, fallback, support outreach, or durable in-app record. Never recreate the business event to resend a message.

### Dependencies

Domain event bus, consent, preference service, template registry, email/SMS/push/WhatsApp providers, audit, analytics.

### Analytics events

`notification_created`, `notification_authorized`, `notification_sent`, `notification_delivered`, `notification_read`, `notification_bounced`, `notification_failed`, `notification_suppressed`, `notification_retried`.

### Accessibility considerations

In-app notifications use accessible live-region rules, persistent history, meaningful titles, and no colour-only urgency.

### Engineering notes

Template, locale, policy, channel, consent, deduplication key, provider reference, and delivery evidence are mandatory.

## 16. Device Trust State Machine

### Purpose

Represent whether a device is known, trusted, provisional, revoked, or under security review.

### Allowed states

`UNKNOWN`, `CHALLENGE_REQUIRED`, `PROVISIONAL`, `TRUSTED`, `TRUST_EXPIRED`, `REVOKED`, `SUSPENDED`, `COMPROMISED_SUSPECTED`.

### Entry conditions

A device presents a protected session context and device-risk assessment.

### Exit conditions

Trust ends through expiry, user revocation, security revocation, or account closure.

### Allowed transitions

`UNKNOWN -> CHALLENGE_REQUIRED | PROVISIONAL | SUSPENDED`

`CHALLENGE_REQUIRED -> PROVISIONAL | SUSPENDED | REVOKED`

`PROVISIONAL -> TRUSTED | TRUST_EXPIRED | REVOKED | SUSPENDED`

`TRUSTED -> TRUST_EXPIRED | REVOKED | SUSPENDED | COMPROMISED_SUSPECTED`

`TRUST_EXPIRED -> CHALLENGE_REQUIRED | REVOKED`

`COMPROMISED_SUSPECTED -> SUSPENDED | REVOKED | TRUSTED` only after authorized review.

### Invalid transitions

- Device trusting itself client-side.
- Revoked device returning to trusted without a new challenge and policy decision.
- Trust transferred to another device.

### Timeout rules

Trust expiry is server-controlled and may be shortened after risk events.

### Failure rules

Risk or fingerprint failure produces challenge, suspension, or recovery; it does not erase current trusted-device history.

### Recovery rules

Step-up, device recovery, trusted-device revoke, session revoke, or Security review.

### Dependencies

Authentication, session service, device-risk, notifications, security monitoring, audit.

### Analytics events

`device_seen`, `device_challenge_required`, `device_provisional`, `device_trusted`, `device_trust_expired`, `device_revoked`, `device_suspended`, `device_compromise_suspected`.

### Accessibility considerations

Device labels, location/time summaries, and revocation consequences must be text-based and keyboard accessible.

### Engineering notes

Never store raw fingerprint identifiers in analytics. Revocation must propagate to token/session stores and active clients.

## 17. Session State Machine

### Purpose

Represent the lifetime and revocation status of an authenticated session.

### Allowed states

`CREATED`, `ACTIVE`, `IDLE_TIMEOUT_WARNING`, `EXPIRED`, `REVOKED_BY_USER`, `REVOKED_BY_SECURITY`, `SUSPENDED`, `LOGGED_OUT`.

### Entry conditions

Authentication succeeds and a session is created with device, actor, policy, and expiry metadata.

### Exit conditions

Session exits through logout, expiry, user revocation, security revocation, or suspension.

### Allowed transitions

`CREATED -> ACTIVE | SUSPENDED`

`ACTIVE -> IDLE_TIMEOUT_WARNING | EXPIRED | REVOKED_BY_USER | REVOKED_BY_SECURITY | SUSPENDED | LOGGED_OUT`

`IDLE_TIMEOUT_WARNING -> ACTIVE | EXPIRED | LOGGED_OUT`

`SUSPENDED -> REVOKED_BY_SECURITY | ACTIVE` only after authorized release.

### Invalid transitions

- Revoked session back to active without re-authentication.
- Logout interpreted as account closure.
- Client-only session expiry without server token invalidation.

### Timeout rules

Idle and absolute session limits are server-configured. Sensitive actions may have shorter step-up windows.

### Failure rules

Token-store, propagation, and revocation failures keep the session restricted until server authority is confirmed.

### Recovery rules

Re-authenticate, complete step-up, revoke all sessions, or contact Support/Security.

### Dependencies

Authentication, token/session store, device trust, risk, notifications, audit.

### Analytics events

`session_created`, `session_active`, `session_idle_warning`, `session_expired`, `session_logged_out`, `session_revoked_by_user`, `session_revoked_by_security`, `session_suspended`.

### Accessibility considerations

Timeout warnings must be announced, offer enough time to act, and never remove focus unexpectedly.

### Engineering notes

Session revocation is idempotent and must propagate across clients within an approved security SLA.

## 18. Consent State Machine

### Purpose

Represent whether a purpose-specific consent is available for data use, communication, sharing, specialist access, or regulated declaration.

### Allowed states

`NOT_REQUESTED`, `PRESENTED`, `ACCEPTED`, `DECLINED`, `WITHDRAWN`, `EXPIRED`, `SUPERSEDED`, `REQUIRED_RECONSENT`, `RESTRICTED`.

### Entry conditions

The platform identifies a lawful purpose, scope, version, actor, and disclosure.

### Exit conditions

Consent is valid only for the documented purpose, scope, version, and time window.

### Allowed transitions

`NOT_REQUESTED -> PRESENTED`

`PRESENTED -> ACCEPTED | DECLINED`

`ACCEPTED -> WITHDRAWN | EXPIRED | SUPERSEDED | REQUIRED_RECONSENT`

`REQUIRED_RECONSENT -> ACCEPTED | DECLINED | EXPIRED`

`DECLINED -> PRESENTED` only for a new request or materially changed purpose.

### Invalid transitions

- Consent inferred from page view or continued use.
- Consent broadened without a new presentation and decision.
- Withdrawn consent used for new processing.
- Required regulatory declaration treated as optional marketing consent.

### Timeout rules

Consent expiry and re-consent dates are explicit. Withdrawal takes effect according to documented operational propagation rules.

### Failure rules

Consent service failure fails closed for new sharing or optional processing. Existing legal retention may continue under its documented basis.

### Recovery rules

Present the correct version, obtain new consent, or route to privacy/support. Do not silently reinstate withdrawn consent.

### Dependencies

Privacy policy, channel preferences, tax/compliance declarations, RM/CA handoff, analytics/legal basis, audit.

### Analytics events

`consent_presented`, `consent_accepted`, `consent_declined`, `consent_withdrawn`, `consent_expired`, `consent_reconsent_required`, `consent_scope_changed`.

### Accessibility considerations

Consent content is readable, keyboard navigable, versioned, and not preselected. Material differences between versions are discoverable.

### Engineering notes

Store purpose, scope, version, text hash, actor, timestamp, source, legal basis, and withdrawal/expiry propagation.

## 19. Document Verification State Machine

### Purpose

Represent an evidence artifact from upload through quality, review, validity, expiry, and replacement.

### Allowed states

`NOT_SUBMITTED`, `UPLOADING`, `UPLOADED`, `QUALITY_CHECK`, `MORE_INFORMATION_REQUIRED`, `UNDER_REVIEW`, `APPROVED`, `APPROVED_WITH_RESTRICTIONS`, `REJECTED`, `EXPIRED`, `REPLACEMENT_REQUIRED`, `WITHDRAWN`, `QUARANTINED`, `DELETED_PER_POLICY`.

### Entry conditions

The actor has document permission, accepted purpose, supported document type, and secure upload context.

### Exit conditions

Document approval is valid only for its type, purpose, scope, issuer, version, and validity period.

### Allowed transitions

`NOT_SUBMITTED -> UPLOADING`

`UPLOADING -> UPLOADED | REJECTED`

`UPLOADED -> QUALITY_CHECK | QUARANTINED`

`QUALITY_CHECK -> UNDER_REVIEW | MORE_INFORMATION_REQUIRED | REJECTED`

`UNDER_REVIEW -> APPROVED | APPROVED_WITH_RESTRICTIONS | MORE_INFORMATION_REQUIRED | REJECTED | QUARANTINED`

`APPROVED -> EXPIRED | REPLACEMENT_REQUIRED | WITHDRAWN | SUPERSEDED` where the document lineage supports it.

`EXPIRED -> REPLACEMENT_REQUIRED | UNDER_REVIEW`

### Invalid transitions

- Upload treated as approval.
- Rejected document treated as current evidence.
- Expired document used for a new regulated action.
- Deletion before legal hold and retention checks.

### Timeout rules

Upload and review have independent timeouts. Review timeout becomes pending/escalated, not approved.

### Failure rules

Virus, OCR, quality, policy, and reviewer failures are distinct reason categories.

### Recovery rules

Re-upload, provide alternate evidence, correct metadata, request review, or contact Support/Compliance.

### Dependencies

Secure storage, file scanning, OCR, KYC/compliance, tax/DTAA, eSign, consent, retention, audit.

### Analytics events

`document_upload_started`, `document_uploaded`, `document_quality_failed`, `document_review_started`, `document_more_info_required`, `document_approved`, `document_rejected`, `document_expired`, `document_replacement_required`, `document_quarantined`.

### Accessibility considerations

Upload controls support keyboard and assistive technology. Requirements, rejection reasons, expiry, and replacement actions are text-readable.

### Engineering notes

Keep logical document lineage separate from file versions. Hash files, isolate quarantine storage, apply retention/legal hold, and prohibit raw evidence in analytics.

## 20. Cross-Module State Precedence

Precedence is evaluated per actor, account, action, resource, and time. It is not a single global status.

### Precedence order

1. **Security:** identity compromise, authentication, device, session, and security suspension.
2. **Legal ownership and authority:** party, account, holder mandate, nominee/legal claim, household scope.
3. **Consent and privacy:** purpose, data sharing, communication, specialist access, and re-consent.
4. **Compliance:** KYC, AML, sanctions, PEP, EDD, FATCA/CRS, tax certification, and regulatory holds.
5. **Country and policy:** jurisdiction, product eligibility, account type, effective-dated rule, and stale policy.
6. **Investor eligibility and suitability:** risk, experience, scheme, transaction type, disclosure, and limits.
7. **Activation:** bank, exchange/client creation, account/folio readiness, and operational dependencies.
8. **Financial account:** bank status, mandate, limits, available balance, and payout capability.
9. **Portfolio data:** source freshness, completeness, reconciliation, valuation, and cost basis.
10. **Orders and payments:** instruction, authorization, execution, settlement, reversal, refund, and unknown outcome.
11. **Reports and notifications:** derivations and delivery of authoritative upstream states.
12. **Engagement and personalization:** education, prompts, campaigns, and AI assistance.

### Why this order

Lower layers cannot grant an action that a higher layer forbids. Portfolio visibility can survive an order restriction. A report can describe a historical transaction after a suspension. A notification can report an order state but cannot make the order settled. Personalization can never override security, consent, compliance, eligibility, or financial truth.

### Precedence evaluation algorithm

For every requested action:

1. Resolve actor and legal resource scope.
2. Resolve active security/session/device state.
3. Resolve consent and data-purpose permission.
4. Resolve compliance and policy state.
5. Resolve action-specific eligibility and suitability.
6. Resolve activation and account prerequisites.
7. Resolve data freshness and financial availability.
8. Return `ALLOW`, `ALLOW_WITH_DISCLOSURE`, `READ_ONLY`, `PENDING`, `RESTRICTED`, `SUSPENDED`, or `DENY` with reason category and next action.

## 21. Entitlement Model

Entitlements are computed, scoped capabilities. They are never hard-coded only by role.

### 21.1 Entitlement tuple

`actor + role + resource_scope + action + purpose + consent + policy_version + risk_level + time_window + domain_state`.

### 21.2 Entitlement results

| Result | Meaning |
|---|---|
| `ALLOW` | Action may proceed under current conditions |
| `ALLOW_WITH_DISCLOSURE` | Action may proceed after approved disclosure/acknowledgement |
| `READ_ONLY` | View permitted; mutation or money movement blocked |
| `PENDING` | Action accepted or review started; outcome not final |
| `RESTRICTED` | Policy, country, account, risk, consent, or authority blocks action |
| `SUSPENDED` | Active security, compliance, legal, or operational hold |
| `DENY` | Actor or resource has no permission |
| `UNKNOWN` | Required authority or source cannot be safely resolved |

### 21.3 Investor entitlements

| Capability | Minimum conditions | Common blockers |
|---|---|---|
| View own profile | Authenticated session; identity scope | Session, identity, privacy hold |
| Edit profile | Authenticated, verified step-up, editable field policy | Compliance review, legal hold, restricted field |
| View activation | Authenticated; investor scope | Suspended session or no identity scope |
| Start investment | Compliance approved, eligible, activation ready, account valid | KYC, country, risk, bank, policy, suspension |
| Confirm order | Step-up where required, eligibility, payment/account validity | Cutoff, stale policy, unknown balance, risk hold |
| Redeem | Ownership, account, compliance, redemption entitlement, step-up | Freeze, lien, pending transfer, tax/consent issue |
| View portfolio | Authenticated, authorized resource scope | Data restriction, household consent, suspension policy |
| Export reports | Strong auth, resource scope, export policy, audit | Consent, role, legal hold, rate limit |
| Add bank | Authenticated, step-up, ownership and country policy | Account restriction, security hold, unsupported bank |
| Change nominee | Authenticated, step-up, legal/document rules | Joint mandate, pending claim, compliance hold |
| Manage SIP | Account, mandate, scheme, eligibility, payment capability | Mandate expiry, bank failure, scheme restriction |

### 21.4 Joint holder entitlements

Joint-holder access is determined by account mandate, consent, holder status, and action risk. A joint holder never inherits the primary holder’s unrestricted authority by default.

### 21.5 Nominee entitlements

Nominee access is normally no current-investment access. After a legal trigger, access is governed by claim verification, legal documents, compliance review, and approved claim scope.

### 21.6 RM entitlements

RM access is limited to assigned customers, approved purpose, current consent, and permitted assisted actions. RM may initiate or prepare; the investor must authorize money-affecting actions unless policy explicitly permits otherwise. RM cannot approve the investor’s own compliance exception.

### 21.7 Support entitlements

Support may view safe status and masked context needed to resolve a case. Support cannot view unrestricted AML rationale, raw KYC evidence, or change financial, compliance, or eligibility decisions outside role authority.

### 21.8 Operations entitlements

Operations may process queues, reconcile, correct permitted data, and execute maker-checker workflows. Operations cannot self-approve a material decision they initiated.

### 21.9 Compliance entitlements

Compliance may review and decide within delegated authority, record evidence, apply policy overrides with reason, and restrict actions. Every override requires maker-checker where policy specifies.

### 21.10 Finance and Tax Consultant entitlements

Finance may reconcile payments, refunds, TDS, commissions, and financial controls. Tax Consultants receive only consented scope and time-limited access. Neither role may alter identity or compliance decisions without explicit authority.

### 21.11 Admin entitlements

Admin may configure technical access and platform settings but cannot approve customer business, compliance, tax, or financial decisions merely because the role has technical access.

### 21.12 Temporary, regulatory, country, and risk restrictions

- **Temporary restriction:** Time-bound review, maintenance, cooldown, or operational condition.
- **Regulatory restriction:** Rule, legal status, AML/compliance, tax, or required evidence condition.
- **Country restriction:** Jurisdiction or scheme/account policy.
- **Risk restriction:** Security, fraud, suitability, transaction velocity, or high-value action control.

Each restriction MUST contain scope, reason category, effective time, expiry/review time, owner, allowed safe actions, and recovery path.

## 22. Conflict Resolution Rules

For each conflict, the winning state is the state that controls the requested action. The losing state remains true for its own domain and must not be erased.

| # | Conflict | Winning state | Losing state | User-visible result | Backend result | Required action |
|---:|---|---|---|---|---|---|
| 1 | KYC approved; bank expired | Bank/account restricted | KYC approved | View progress; funding blocked | `bank_expired`, entitlement recalculated | Re-verify bank |
| 2 | Investor ready; eligibility expired | Eligibility expired | Activation ready | Investment action blocked | New evaluation required | Refresh policy/context |
| 3 | Portfolio visible; investment blocked | Investment restricted | Portfolio visible | Read-only portfolio | `view_allow`, `invest_deny` | Resolve blocker |
| 4 | Activation complete; compliance hold | Compliance suspended | Activation ready | Safe status and support path | All money actions suspended | Compliance review |
| 5 | Redemption pending; account suspended | Account suspended for new actions | Redemption pending | Existing redemption status remains visible | Order continues or is held per policy | Operations/Compliance review |
| 6 | Document approved; consent withdrawn | Consent withdrawn | Document approved | Existing evidence retained; new sharing blocked | Sharing entitlement removed | Re-consent or stop purpose |
| 7 | Authenticated session; device revoked | Device revoked | Session authenticated | Session terminated or step-up required | Tokens revoked | Device recovery |
| 8 | Trusted device; account security hold | Security hold | Device trusted | Access restricted | Session/device suspension propagated | Security review |
| 9 | Onboarding complete; KYC pending | Compliance pending | Onboarding complete | Activation unavailable or pending | Activation dependency blocked | Await KYC |
| 10 | KYC approved; FATCA incomplete | Tax/compliance incomplete | KYC approved | Required declaration before activation | Account entitlement restricted | Complete FATCA |
| 11 | CRS complete; tax residency changed | Reverification required | CRS complete | Existing history visible; new actions paused | Re-run tax/compliance | Update residency |
| 12 | Risk profile approved; product risk exceeds limit | Risk restriction | Risk profile approved | Product unavailable or disclosure path | Eligibility denied/review | Select eligible product or review |
| 13 | Risk profile expired; activation ready | Risk expired | Activation ready | Investment actions blocked | Eligibility invalidated | Refresh risk profile |
| 14 | Country supported; scheme country-ineligible | Scheme country restriction | Platform country support | Scheme hidden/blocked with explanation | Scheme eligibility denied | Choose eligible scheme |
| 15 | NRE account verified; NRO order requested | Account-type mismatch | Bank verified | Order blocked | Eligibility/account rule fails | Use matching account |
| 16 | NRO limit available; limit reached | Repatriation restriction | Bank verified | Redemption/payout warning or block | Limit service denies payout action | Review ledger/forms |
| 17 | Bank ownership verified; mandate expired | Mandate expired | Bank verified | SIP debit blocked | Mandate entitlement removed | Renew mandate |
| 18 | Exchange client created; exchange permission suspended | Exchange restriction | Client creation approved | Investment action blocked | Activation becomes restricted | Operations/exchange review |
| 19 | Exchange pending; KYC rejected | Compliance rejected | Exchange pending | Activation blocked | Pending dependency cancelled/held | Resolve KYC |
| 20 | Bank verification failed; alternate bank supported | Alternate bank eligible | Failed bank attempt | Add/select another bank | New verification record created | Verify alternate bank |
| 21 | Payment success; order pending | Order pending/reconciliation | Payment success | Do not retry; show pending | Payment linked to unresolved order | Reconcile |
| 22 | Payment timeout; order unknown | Unknown outcome | Client timeout | Do not repeat payment/order | Reconciliation job opened | Wait or support |
| 23 | Order accepted; portfolio stale | Portfolio stale | Order accepted | Order status authoritative; holdings delayed | Portfolio refresh queued | Wait for source update |
| 24 | Order settled; RTA feed stale | Portfolio source stale | Order settled | Settlement confirmation plus stale holdings warning | RTA refresh/reconcile | Await RTA |
| 25 | Order rejected; payment success | Refund pending | Payment success | Order rejected; refund status visible | Refund ledger opened | Await refund |
| 26 | Refund completed; order still shown pending | Reconciliation required | Refund completed | Payment/refund status authoritative; order review | Repair order projection | Operations correction |
| 27 | Partial execution; order submitted | Partial execution | Submitted | Show filled/unfilled portions | Order split/linked transactions | Await remainder or cancel eligible leg |
| 28 | Cutoff missed; payment confirmed | Order expired | Payment confirmed | Next cutoff or refund explanation | Order not routed at old NAV | Reconfirm if allowed |
| 29 | Redemption requested; lien/freeze exists | Account/legal restriction | Redemption request | Redemption blocked or held | Order rejected/held | Resolve legal/finance hold |
| 30 | Redemption submitted; tax data stale | Tax/reconciliation review | Redemption pending | Provisional tax only; final pending | Tax event marked provisional | Await final source |
| 31 | Report requested; portfolio partial | Report source review | Request | Provisional/unavailable report | Generation waits or marks incomplete | Refresh/reconcile |
| 32 | Final report issued; source correction arrives | Amended report | Final report | Correction notice and new artifact | Lineage preserved | Review/download amended report |
| 33 | Report link expired; report still valid | Link expired | Report ready | Generate new secure link | Artifact remains unchanged | Reauthorize download |
| 34 | Portfolio value available; FX unavailable | FX unavailable | Portfolio value | Show native currency; no converted total | Conversion field unavailable | Retry FX or choose native currency |
| 35 | NAV stale; order confirmation requested | Price/valuation uncertainty | Order intent | Require explicit stale-price disclosure or block | Eligibility/order policy decides | Wait or confirm under policy |
| 36 | Scheme merged; holding present | Corporate-action transition | Holding current scheme | Show mapped successor and pending adjustment | Corporate-action event created | Review affected holding |
| 37 | Current holdings empty; historical transactions exist | Historical-only portfolio | No current holdings | Explain zero current holdings and show history | Portfolio scope remains valid | Discover/invest or review history |
| 38 | Portfolio data source suspended; support case open | Source suspended | Case open | Show known last state and case ownership | Data incident linked to case | Await incident resolution |
| 39 | RM consent expired; RM assigned | Consent expired | RM assignment | Self-service remains; RM access removed | CRM permission revoked | Renew consent if desired |
| 40 | RM reassigned; old RM session cached | New assignment | Cached old assignment | New owner shown after refresh | Scope token invalidated | Refresh/re-authenticate |
| 41 | Household view granted; one folio restricted | Resource restriction | Household permission | Show permitted subset and excluded scope | Partial projection returned | Request consent/authority |
| 42 | Joint holder consent revoked; primary holder active | Consent revoked | Primary holder active | Joint access removed; primary scope unchanged | Relationship entitlement recalculated | Reauthorize if permitted |
| 43 | Nominee registered; death claim opened | Claim hold | Nominee registration | Current control paused; claim status available | Legal workflow owns access | Submit claim evidence |
| 44 | Tax consultant consent active; document purpose changed | Purpose mismatch | Consultant access | Consultant cannot access new purpose | New consent required | Re-consent |
| 45 | Notification failed; order settled | Order settled | Notification failed | Order remains settled; retry/fallback notice | Notification retries; order unchanged | Check in-app record |
| 46 | Marketing opted out; security alert required | Security notification required | Marketing opt-out | Security alert still sent via lawful channel | Preference engine separates categories | No user action unless security prompt |
| 47 | Offline cached portfolio; account suspended online | Suspension | Cached portfolio | Cached values marked stale/restricted after reconnect | Cache invalidated | Reconnect/re-authenticate |
| 48 | Session active; consent withdrawn on another device | Consent withdrawn | Active session | Sensitive action blocked; session may remain for safe access | Entitlement cache invalidated | Re-authenticate/re-consent |
| 49 | Document upload complete; malware scan pending | Quarantine/scan pending | Upload complete | Document not usable yet | File isolated | Await scan/re-upload |
| 50 | KYC evidence approved; source policy changed | Reverification required | Evidence approved | New action requires updated evidence | Policy impact job opens | Reverify |
| 51 | Compliance approved; sanctions rescreen match | Compliance suspended | Prior approval | Safe account notice and support path | Action entitlements revoked | Compliance review |
| 52 | Bank verified; account holder name changed | Bank correction required | Bank verified | Funding blocked until re-verification | Account marked mismatch | Update bank/evidence |
| 53 | Order cancel requested; execution already accepted | Execution accepted | Cancel requested | Cancellation not guaranteed; status pending | Cancel race reconciled | Await final execution state |
| 54 | Refund marked sent; bank confirmation absent | Refund unknown outcome | Refund initiated | Do not claim completed refund | Finance reconciliation open | Await bank reconciliation |
| 55 | User logged in; identity correction pending | Identity correction required | Authenticated session | Safe access only; sensitive actions paused | Entitlements restricted | Complete correction/review |

### Conflict rule

The winning state controls the requested action only. The losing state remains available for history, explanation, reconciliation, reporting, and audit. No conflict resolution may delete, overwrite, or falsely complete the losing domain.

## 23. Lifecycle Decision Matrix

| Domain condition | View | New investment | Redemption | Export/report | Support action |
|---|---|---|---|---|---|
| Authenticated, compliant, eligible, ready | Allow | Allow | Allow if account/holding valid | Allow by scope | Allow |
| Authenticated, KYC pending | Safe status only | Block | Existing holdings only per policy | Historical records by scope | Allow case creation |
| Compliance approved with restrictions | Scope-dependent | Allow only permitted action | Allow only permitted action | Allow safe records | Allow |
| Eligibility restricted | Portfolio if owned | Block affected action | Unaffected actions only | Allow owned records | Allow review |
| Activation pending | Home/activation status | Block | Existing holdings per account state | Allow existing records | Allow |
| Activation ready, bank expired | Portfolio/status | Block funded action | Payout action may block | Allow owned records | Allow bank case |
| Portfolio data stale | Last safe snapshot | Block if current value required | Policy-dependent with disclosure | Use last valid artifact | Allow data case |
| Portfolio reconciliation required | Partial/labelled data | Block affected action | Block affected action if source needed | Provisional only | Allow escalation |
| Security suspended | Safe minimum only | Block | Block | Block sensitive export | Security recovery only |
| Session expired | None until re-auth | Block | Block | Block | Public support path |
| Consent withdrawn | Scope-limited | Block sharing-dependent action | Action-specific evaluation | Existing legal records only | Privacy case |
| Household partial permission | Permitted resources | Only permitted account | Only permitted account | Only permitted scope | Allow scoped case |

## 24. State Transition Matrix

The matrix below defines transition ownership. A service may request a transition in another domain, but only the owner may commit it.

| Trigger | Owning domain | Resulting transition | Downstream invalidations |
|---|---|---|---|
| Contact verified | Identity | Provisional to contact verified | Recompute onboarding entry |
| Identity evidence approved | Identity | Claimed to confirmed | Recompute compliance and onboarding |
| Login factor accepted | Authentication | Challenge pending to authenticated | Create session |
| Device revoked | Device trust | Trusted to revoked | Revoke related sessions |
| Session timeout | Session | Active to expired | Remove action tokens |
| Onboarding submitted | Onboarding | In progress to submitted | Start validation |
| Required evidence missing | Onboarding | Validating to more information required | Block activation start |
| KYC approved | Compliance | Verification to approved | Recompute activation and eligibility |
| Sanctions match | Compliance | Approved to suspended | Revoke action entitlements |
| Country policy changes | Eligibility/policy | Eligible to expired or restricted | Re-evaluate affected actions |
| Bank verification completed | Activation/account | Pending to approved | Recompute funding/payout entitlements |
| Exchange client created | Activation | Dependency pending to approved | Recompute investor readiness |
| All blocking dependencies approved | Activation | In progress to ready | Grant eligible actions only |
| Risk profile expires | Eligibility | Eligible to expired | Block new investments |
| RTA feed stale | Portfolio data | Fresh to stale | Mark summaries and reports |
| Reconciliation mismatch | Portfolio/order/payment | Current to reconciliation required | Block affected action |
| Payment callback success | Payment/order | Payment pending to confirmed | Continue order workflow |
| Payment callback absent at timeout | Payment/order | Pending to unknown outcome | Open reconciliation; suppress duplicate retry |
| Execution callback accepted | Order | Execution pending to accepted | Wait for settlement |
| Settlement confirmed | Order | Accepted to settled | Create/update transaction and portfolio |
| Source correction | Portfolio/report | Current to corrected or amended | Invalidate derived projections |
| Report generation complete | Report | Generating to provisional/final ready | Notify permitted recipients |
| Support SLA breach | Support | Assigned/waiting to escalated | Notify owner and customer-safe status |
| Consent withdrawal | Consent | Accepted to withdrawn | Revoke scoped sharing and access |
| Document expiry | Document | Approved to expired | Trigger re-verification and restriction policy |

## 25. Entitlement Matrix

Legend: `A` allow, `D` allow with disclosure, `R` read-only, `P` pending/no repeat action, `X` restricted, `S` suspended, `N` no access.

| Context | View profile | View portfolio | Invest | Redeem | Export | Manage bank | Manage nominee | RM/CA sharing |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Authenticated, compliant, ready | A | A | A | A | A | A | A | D |
| Authenticated, onboarding incomplete | A | N/R | X | X | N | X | X | D |
| KYC pending | A | R | X | R where policy allows | R | X | R | D |
| Compliance restricted | A | R | X | X or R by scope | R | X | X | X |
| Activation pending | A | R | X | R by account | A | P | R | D |
| Ready with restriction | A | A | D/X by action | D/X by action | A by scope | D/X | D/X | D |
| Bank expired | A | A | X for funding | X for affected payout | A | P | A | D |
| Policy stale | A | R | X | X if policy-dependent | R | X | R | D |
| Portfolio reconciliation required | A | R/partial | X affected | X affected | R/provisional | A if unrelated | A | D |
| Security suspended | R | R safe only | S | S | S | S | S | X |
| Session expired | N | N | N | N | N | N | N | N |
| Household scoped | A own scope | A permitted scope | A permitted account | A permitted account | A permitted scope | A permitted account | A permitted scope | D by consent |
| Joint holder | A own/mandate | A mandate scope | A mandate scope | A mandate scope | A mandate scope | A mandate scope | A mandate scope | D |
| Nominee before legal trigger | R limited | N | N | N | N | N | N | N |
| RM with current consent | R assigned | R assigned | D initiation | D initiation | R or D by policy | D assisted | D assisted | A within consent |
| Support | R masked | R safe status | N | N | N or case artifact | N | N | N |
| Tax Consultant | N except consent | R tax-relevant scope | N | N | A consented reports | N | N | N |
| Admin | Technical scope only | Technical scope only | N business approval | N business approval | A technical audit export | N business approval | N business approval | N business approval |

### Entitlement evaluation requirements

The authorization service MUST return the result, reason category, required action, expiry/review time, policy version, and audit reference. Clients MUST NOT reconstruct the result from multiple booleans.

## 26. Platform State Dictionary

| State | Canonical meaning | Customer-safe meaning | Default action behavior |
|---|---|---|---|
| `NOT_STARTED` | No workflow has begun | Not started | Start if eligible |
| `DRAFT_SAVED` | Partial user work persisted | Saved and resumable | Resume |
| `SUBMITTED` | User submitted for processing | Submitted | Wait for processing |
| `VALIDATING` | System or policy checks active | Checking information | Wait or leave safely |
| `PENDING` | External/human result awaited within SLA | In progress | View status; do not duplicate |
| `DELAYED` | Pending exceeded expected window | Taking longer than expected | Show owner/SLA/support |
| `MORE_INFORMATION_REQUIRED` | Required data/evidence missing | Action required | Correct and resubmit |
| `MANUAL_REVIEW` | Authorized human decision required | Under review | View next update |
| `APPROVED` | Specific domain checkpoint approved | Approved for that checkpoint | Continue dependent evaluation |
| `APPROVED_WITH_RESTRICTIONS` | Approved only within a defined scope | Approved with limits | Show limits |
| `READY` | Current action prerequisites satisfied | Ready for permitted actions | Allow eligible action |
| `RESTRICTED` | Policy, country, permission, or risk blocks action | Not available under current conditions | Show safe reason and alternative |
| `SUSPENDED` | Active hold blocks activity | Temporarily paused | Support/review |
| `EXPIRED` | Prior state/evidence no longer valid | Needs renewal | Renew/reverify |
| `REVERIFICATION_REQUIRED` | New evidence or policy check required | Verify again | Start required review |
| `FAILED` | Requested operation failed with known outcome | Could not complete | Retry/recover |
| `REJECTED` | Authoritative request/decision declined | Not approved | Review permitted alternative |
| `UNKNOWN_OUTCOME` | Side effect may have occurred but final result is unknown | Status is being confirmed | Do not repeat |
| `RECONCILIATION_REQUIRED` | Sources disagree or callback missing | We are confirming the result | Wait/support |
| `PARTIALLY_COMPLETED` | Some legs completed, others unresolved | Partly complete | Inspect affected legs |
| `STALE` | Data was valid but is outside freshness threshold | Last updated earlier | Refresh or use with label |
| `PARTIAL` | Only part of requested scope is available | Some information is unavailable | Inspect affected scope |
| `ESTIMATED` | Derived result is not final | Estimate | Show inputs and finality |
| `CORRECTED` | Prior result has an authoritative correction | Updated result | Show impact/history |
| `AMENDED` | Issued report/artifact changed | Updated report | Use latest artifact |
| `CANCELLED` | Workflow ended without completion | Cancelled | No further action unless restart allowed |
| `CLOSED` | Entity/workflow permanently closed under policy | Closed | Historical access only if allowed |

## 27. Module Projection Rules

### Home

Home consumes lifecycle, entitlement, support, notification, and restricted financial projections. It prioritizes security, required action, lifecycle state, and critical financial warnings. It never recalculates authoritative portfolio numbers.

### Portfolio

Portfolio consumes the full portfolio data model, ownership scope, financial truth, reconciliation state, and action entitlements. It may show data while actions are restricted.

### Investment Activation

Activation consumes onboarding, compliance, bank, exchange, policy, and activation dependency states. It does not infer readiness from one approved dependency.

### Orders and Payments

Orders consume action-specific eligibility, account, payment, execution, settlement, refund, and reconciliation state. They never treat notification delivery as transaction truth.

### Reports

Reports consume source snapshots, calculation versions, tax/DTAA policy, data completeness, and report entitlement. A report’s finality is explicit.

### Notifications

Notifications consume events and consent/preferences. They never mutate domain state.

### Support

Support consumes safe context bundles, ownership, SLA, and case state. It may coordinate recovery but cannot silently override owning domain state.

## 28. Contract APIs and Event Rules

### State query response

Every state query SHOULD return:

`domain`, `entity_id`, `state`, `substate`, `scope`, `effective_at`, `expires_at`, `next_review_at`, `source`, `freshness`, `policy_version`, `allowed_actions`, `blocked_actions`, `reason_category`, `required_action`, `owner_team`, `case_id`, and `version`.

### Event rules

- Events are versioned and schema-validated.
- Events are ordered per entity where ordering matters.
- Consumers are idempotent.
- Late callbacks are reconciled, not discarded.
- Event replay must produce the same current state.
- State projections expose their source event/version.
- PII and raw evidence are excluded from analytics payloads.

### Client contract

Clients render server-provided states and entitlements. They may perform local validation for usability but MUST never promote local validation to authoritative success.

## 29. Future Scalability Notes

### Global expansion

Country, tax, currency, date, time-zone, language, policy, and disclosure data must be configuration-driven and effective-dated. Country-specific screen forks are prohibited unless legally required.

### Additional asset classes

Use a generic holding/position, instrument, transaction, valuation, corporate-action, and entitlement model. Mutual-fund-specific fields remain extensions rather than the core identity of the portfolio model.

### Family and household growth

Separate legal owner, household grouping, mandate, consent, beneficiary, advisor, and view scope. Never model a family as a shared login.

### Multiple advisors and partners

Use time-bounded assignments, purpose-scoped consent, assigned-resource filters, conflict rules, and auditable handoffs. Advisor access is not a new ownership relationship.

### AI expansion

AI agents must consume the same lifecycle, entitlement, policy, provenance, and freshness APIs as the product. Agents cannot bypass authorization or call internal mutation APIs directly without an approved tool contract.

### Tax overlays

Tax calculations require source snapshots, effective-dated rules, jurisdiction, currency, lot-level inputs, finality, and amendment lineage. Tax explanations must disclose when professional advice is required.

### Corporate actions

Add event-driven corporate-action state without changing the holding identity. Preserve before/after units, cost basis, effective date, source, user election, and settlement outcome.

### Resilience

State services must support replay, dead-letter handling, reconciliation jobs, regional failover, incident mode, and safe degraded read-only behavior.

### Regulatory change

A policy change triggers impact analysis across current entitlements, pending orders, active mandates, reports, disclosures, notifications, and stored decisions. Historical decisions retain their prior policy versions.

## 30. Challenge of Key Assumptions

### Assumption: One investor equals one account

**Challenge:** NRIs may hold multiple accounts, folios, currencies, mandates, and family relationships.

**Recommendation:** Investor identity is a party-level identity; account, folio, and household are separate scopes.

### Assumption: Activation means ready forever

**Challenge:** Eligibility, KYC, bank, country, sanctions, and policy conditions change.

**Recommendation:** Readiness is a revocable, time-aware entitlement projection.

### Assumption: A successful payment means a successful order

**Challenge:** Gateway callbacks, execution, settlement, and reconciliation are independent.

**Recommendation:** Keep separate ledgers and expose unknown outcomes.

### Assumption: Portfolio visibility equals portfolio correctness

**Challenge:** RTA feeds, FX, cost basis, and transaction reconciliation may be delayed or incomplete.

**Recommendation:** Every value carries provenance, freshness, completeness, and finality.

### Assumption: Role names are sufficient for authorization

**Challenge:** Joint mandates, household scope, consent, purpose, resource, and time window change authority.

**Recommendation:** Use role plus resource-scoped policy and step-up risk.

### Assumption: More screens solve more states

**Challenge:** Screen proliferation creates duplicated behavior and inconsistent status language.

**Recommendation:** Use stateful projections and shared status/entitlement components.

## 31. Acceptance Criteria for This Contract

- Every approved module references this contract as its cross-module state authority.
- No screen or API uses an undocumented lifecycle state.
- Every state has one owning service and an allowed transition set.
- Invalid transitions are rejected server-side and logged.
- Every action entitlement is evaluated by scope, authority, consent, policy, risk, and domain state.
- Home and Portfolio use defined projections of the same financial truth.
- Orders distinguish payment, execution, settlement, reversal, refund, and unknown outcome.
- Regulatory, policy, tax, and document decisions are versioned and effective-dated.
- The 55 conflict scenarios have automated state/entitlement tests.
- Accessibility, analytics, notification, AI, and support behavior derive from the same state payload.
- State replay produces deterministic current projections.
- State changes cannot be authored by clients or analytics systems.

## 32. Final Product Architecture Decision

Adopt this contract as the platform-level source of truth. Do not add a new customer-facing module for lifecycle, entitlement, or reconciliation in the MVP. Implement these as shared backend services, read models, policy evaluation, audit, and reusable behavioral components consumed by the approved modules.

The approved product architecture remains stable. The significant improvement is the addition of one canonical contract that makes state, permission, compliance, financial truth, and module behavior consistent across the platform.
