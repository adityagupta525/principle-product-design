# NRI DIY Mutual Fund Platform
## Cross-Functional UX Flow Architecture Design Review

**Review body:** Principal Product Designer, Principal UX Architect, Product Manager, Staff Engineer, Compliance Head, QA Lead, Customer Support Lead, Growth Lead and CTO  
**Artifact reviewed:** [End-to-End UX Flow Architecture](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md)  
**Review status:** Board critique; no UX flows rewritten

## Review Scope

The reviewed artifact contains 36 Mermaid journeys and all 18 requested dimensions for each journey. This review evaluates whether those flows are sufficiently precise to become screen inventory and implementation contracts.

## Severity

- **P0:** Must fix before Screen Inventory or implementation planning.
- **P1:** Should improve before detailed interaction design or MVP build.
- **P2:** Nice to have after core service reliability is proven.

# Executive Board Decision

## Decision: NO, not yet ready for Screen Inventory

The document is strong as a flow catalogue and design-research bridge, but it is not yet a build-safe UX architecture. The main blockers are:

1. The global state model and individual transaction states do not fully align.
2. MVP, V1, V2 and future flows are named but not operationally separated.
3. Permission, field-level privacy and human decision boundaries remain too broad.
4. Compliance flows describe checkpoints but not approved decision logic or evidence requirements.
5. External API failure, reconciliation and partial-success behavior is not sufficiently specified.
6. Empty, loading and offline behavior is often mentioned conceptually rather than defined by data freshness and user action.
7. Analytics events are named but do not define outcome schema, error taxonomy, consent or quality measurement.
8. Accessibility is covered globally but not as acceptance criteria per flow.

## UX Architecture Readiness Score: 62 / 100

| Dimension | Score | Board assessment |
|---|---:|---|
| Coverage | 92 | All requested journeys and dimensions exist |
| Strategic coherence | 78 | Strong alignment to cross-border certainty and recovery |
| State completeness | 55 | States are present but domain-specific transitions are incomplete |
| Compliance readiness | 49 | Risks are identified, but approved decision rules are not operationalized |
| Engineering readiness | 52 | Dependencies are named, but contracts and source precedence are not defined |
| Permission architecture | 55 | Roles are acknowledged; field-level and action-level rules remain vague |
| UX consistency | 67 | Shared principles exist, but terminology and state presentation vary |
| QA testability | 48 | Test oracles, fixtures and acceptance conditions are missing |
| Support operability | 61 | Ownership and escalation exist; capacity and knowledge controls are weak |
| Growth readiness | 58 | Activation and CRM events exist; acquisition and lifecycle measurement is incomplete |
| Accessibility readiness | 54 | Principles exist; per-flow requirements and test coverage are absent |
| Scalability readiness | 55 | Future expansion is acknowledged; configuration and versioning need proof |

**Interpretation:** The document is ready for controlled architecture refinement and service validation. It is not ready to generate a comprehensive screen inventory because the screen inventory would hard-code unresolved states, permissions and regulatory decisions.

# P0 Board Findings

## P0-1: State models are not implementation-safe

The global rules define Loading, Pending, Verification, Approved, Rejected, Expired, Suspended, Retry, Escalated and Completed, but transaction flows introduce additional states such as Submitted, Accepted, Allotted, Settled, Paid, Refunded and Cancelled without a shared domain model ([NRI_End_to_End_UX_Flow_Architecture.md:32](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:32), [NRI_End_to_End_UX_Flow_Architecture.md:815](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:815)).

**Risk:** UX, backend, support and audit can use different meanings for “success,” causing duplicate action, incorrect customer messaging or unsafe reconciliation.

**Required fix:** Define separate state machines for identity, KYC, payment, order, mandate, portfolio, report, tax, DTAA and support. For each, define allowed transitions, terminal states, source of truth, retry semantics and customer-safe label.

## P0-2: MVP and future flows are not separated at artifact level

STP and SWP are explicitly future-version concepts, while SIP, DTAA, switch, reports and tax flows contain MVP/V1/V2 assumptions within the same architecture ([NRI_End_to_End_UX_Flow_Architecture.md:919](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:919), [NRI_End_to_End_UX_Flow_Architecture.md:1515](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1515)).

**Risk:** Screen inventory becomes a broad platform inventory, increasing delivery scope and creating navigation for capabilities that cannot launch.

**Required fix:** Add a mandatory scope tag to every flow: MVP, V1, V2, future, assisted-only, manual fallback or out of scope. Screen Inventory should begin only with the approved MVP tag set.

## P0-3: Compliance checkpoints are not decision contracts

Flows correctly reference FATCA, CRS, KYC, DTAA, PFIC/FAPI, tax and repatriation, but most checkpoints end at “review,” “approved” or “restricted” without defining required evidence, decision authority, approved language or appeal path ([NRI_End_to_End_UX_Flow_Architecture.md:523](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:523)).

**Risk:** Design and engineering may build a generic approval experience that is not legally usable in a specific country or tax scenario.

**Required fix:** Create a compliance decision register for each country and action with: rule, evidence, reviewer, effective date, customer-safe outcome, restricted wording, re-review trigger and audit record.

## P0-4: Money movement does not fully define partial success

Lumpsum, redemption, switch and recurring flows acknowledge payment/order mismatch, but do not define all combinations of payment success, order acceptance, allotment, refund, payout and RTA update ([NRI_End_to_End_UX_Flow_Architecture.md:838](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:838)).

**Risk:** A payment can succeed while order submission fails, one switch leg can complete while the other fails, or a payout can settle while the portfolio remains stale.

**Required fix:** Build a transaction outcome matrix for each money flow covering every partial-success combination, authoritative source, reconciliation owner, customer message, refund policy and duplicate-prevention rule.

## P0-5: Permission architecture is not field-level enough

The flow architecture identifies roles, but phrases such as “Support sees safe status,” “RM assists,” and “Tax Consultant with consent” do not define the exact fields, duration, purpose or export boundary ([NRI_End_to_End_UX_Flow_Architecture.md:244](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:244)).

**Risk:** Sensitive AML, tax, document, account or family data may be overexposed, especially through RM, CA, support and shared links.

**Required fix:** Add field-level access, purpose limitation, consent expiry, export watermarking, masking rules, joint-holder scope and emergency-access policy.

## P0-6: Customer-visible completion is not tied to one authoritative source

The flows state that completion requires authoritative confirmation, but do not define source precedence when gateway, execution platform, RTA, bank and internal ledgers disagree ([NRI_End_to_End_UX_Flow_Architecture.md:1459](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1459)).

**Risk:** Product displays “completed” from a client callback while Finance or RTA has a different state.

**Required fix:** Define a per-domain source-of-truth and conflict-resolution policy, including stale thresholds, reconciliation cadence and customer-safe wording.

# Journey-by-Journey Review

## Identity, access and onboarding

### 1. Registration

**Reference:** [flow lines 43–83](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:43)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Existing investor with same PAN but changed mobile; abandoned provisional account; shared household email; country changed between registration and KYC. | P1 |
| Business rules | Provisional-account expiry, reactivation, duplicate merge authority and future-interest consent are not defined. | P0 |
| UX consistency | “Eligible to continue” can be read as “eligible to invest.” Separate onboarding eligibility from product eligibility. | P0 |
| Trust | Explain why country and tax residency are requested before asking for PAN or documents. | P1 |
| Compliance | Consent purpose, marketing consent and regulatory onboarding consent need separation. | P0 |
| Loading/empty | No explicit empty state for unsupported country or no supported product universe; loading timeout is unspecified. | P1 |
| Failure/recovery | Recovery does not define a safe path when duplicate identity is unresolved for days. | P1 |
| Engineering/API | Identity and OTP callbacks need idempotency and provisional-user reconciliation. | P1 |
| Scalability | Country taxonomy and policy changes require configuration, not code release. | P1 |
| Accessibility | Country and tax-residency selection needs screen-reader labels, search and non-colour status. | P1 |
| Analytics | Add provisional-account expiry, duplicate-resolution time, consent conversion and country-level abandonment. | P1 |

### 2. Login

**Reference:** [flow lines 84–124](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:84)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Lost access to both channels, device clock mismatch, accessibility-assisted login, account takeover during active session. | P1 |
| Business rules | Lockout duration, account recovery evidence and step-up triggers are not enumerated. | P0 |
| UX consistency | “Approved session” is not a shared state and may be confused with KYC approval. | P1 |
| Trust | Security alerts need recognizable sender, masked device/location and safe response guidance. | P1 |
| Compliance | Security incident and suspicious-access retention/notification obligations need explicit owner. | P0 |
| Loading/empty | No defined state when profile context partially loads after authentication. | P1 |
| Failure/recovery | No fallback for OTP provider outage beyond generic recovery. | P1 |
| Engineering/API | Session revocation across devices and refresh-token invalidation require server authority. | P0 |
| Scalability | Risk checks may create false positives at country/timezone peaks. | P1 |
| Accessibility | OTP entry, lockout countdown and error recovery need keyboard, screen-reader and paste support. | P1 |
| Analytics | Track legitimate lockouts, false-positive recovery and authentication time by country/channel. | P1 |

### 3. Email Verification

**Reference:** [flow lines 125–164](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:125)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Mailbox link pre-opened by security scanner, multiple active links, link opened after email change. | P1 |
| Business rules | Whether verification is one-time or reusable for future communications is unclear. | P1 |
| UX consistency | “Completed” does not distinguish email verified from onboarding complete. | P1 |
| Trust | Verification link should show destination, expiry and account safety guidance. | P1 |
| Compliance | Marketing and transactional consent must not be inferred from verification. | P0 |
| Loading/empty | No state for email sent but delivery receipt unavailable. | P1 |
| Failure/recovery | Bounce handling and ownership verification for an email change are underspecified. | P1 |
| Engineering/API | Token replay, token invalidation and provider bounce webhooks need contract tests. | P1 |
| Scalability | Email template/version and deliverability monitoring are missing. | P2 |
| Accessibility | Link and expiry language must work with screen readers and email clients. | P2 |
| Analytics | Add open-to-verify conversion, bounce reason and verification after resend. | P1 |

### 4. Mobile Verification

**Reference:** [flow lines 165–204](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:165)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Roaming/SMS delay, recycled number, wrong country code, dual SIM and number inaccessible while abroad. | P1 |
| Business rules | Number-change cooldown, old-number notification and fraud review are not specified. | P0 |
| UX consistency | “Temporary lock” lacks visible duration and exact recovery route. | P1 |
| Trust | Never imply mobile verification proves identity or KYC. | P0 |
| Compliance | OTP, number change and communication consent must be separate records. | P0 |
| Loading/empty | No explicit OTP delivery-pending state or provider outage state. | P1 |
| Failure/recovery | Alternate channel depends on an already verified channel; first-time users may have none. | P1 |
| Engineering/API | SMS delivery status and resend idempotency need provider-level observability. | P1 |
| Scalability | International sender IDs and country delivery rules may differ. | P1 |
| Accessibility | OTP paste, non-visual timer and error association need testing. | P1 |
| Analytics | Track delivery latency, resend count, country/provider failure and lockout recovery. | P1 |

### 5. PAN Verification

**Reference:** [flow lines 205–243](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:205)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Name change, foreign passport, PAN mismatch with legacy folio, PAN already linked to an account. | P1 |
| Business rules | Exact match tolerance, manual override authority and PAN correction process are absent. | P0 |
| UX consistency | PAN valid, PAN linked, KYC compliant and account approved must be distinct states. | P0 |
| Trust | Explain what is verified and what remains unverified. | P1 |
| Compliance | PAN service source, data retention and correction audit need named controls. | P0 |
| Loading/empty | Provider downtime and no-result response need specific states. | P1 |
| Failure/recovery | Long-running duplicate review has no SLA or proactive update path. | P1 |
| Engineering/API | Identity matching and duplicate merge are high-risk, non-idempotent operations. | P0 |
| Scalability | Manual exception volume may grow with country and legacy portfolio expansion. | P1 |
| Accessibility | PAN entry must support errors without exposing the full value. | P2 |
| Analytics | Add mismatch reason taxonomy and conversion after manual review. | P1 |

### 6. KYC

**Reference:** [flow lines 244–287](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:244)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Vendor outage mid-video, document expiry during review, failed liveness with accessibility limitation, joint-holder dependency. | P0 |
| Business rules | Which fields can be reused from CKYC, when video is mandatory and when re-KYC blocks purchases versus redemptions need exact policy. | P0 |
| UX consistency | “Approved,” “KYC complete” and “AML clear” are not the same decision. | P0 |
| Trust | Show review SLA and evidence status without exposing sensitive AML details. | P1 |
| Compliance | EDD, sanctions, PEP, adverse media, biometric/video retention and reviewer segregation need operational sign-off. | P0 |
| Loading/empty | No state for CKYC unavailable, no records found or vendor queue unavailable. | P1 |
| Failure/recovery | Recovery retains completed steps conceptually, but the artifact does not specify which steps are reusable. | P0 |
| Engineering/API | Video, OCR, CKYC and screening callbacks require durable event handling and evidence hashes. | P0 |
| Scalability | Manual review capacity and 72-hour EDD demand model are not connected to volumes. | P0 |
| Accessibility | Video/IPV alternatives and accessible document capture need explicit acceptance criteria. | P1 |
| Analytics | Add funnel by failure reason, reviewer overturn, false positive and time-to-resolution. | P0 |

## Tax, residency and financial context

### 7. FATCA

**Reference:** [flow lines 288–327](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:288)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | US person, entity indicators, no TIN reason, declaration correction and annual recertification overlap. | P0 |
| Business rules | Applicability, reporting classification and product restriction matrix are not explicit. | P0 |
| UX consistency | FATCA declaration must not look like a general tax profile or KYC approval. | P1 |
| Trust | Explain purpose and consequences without suggesting the platform provides foreign tax advice. | P1 |
| Compliance | Legal form versions, W-8BEN-equivalent treatment, reporting owner and country rules require sign-off. | P0 |
| Loading/empty | No status for declaration saved but reporting confirmation pending. | P1 |
| Failure/recovery | Correction path does not specify whether prior declaration remains effective during review. | P0 |
| Engineering/API | Effective-dated declarations and immutable versions are required. | P0 |
| Scalability | Country-specific declaration variation should be configuration-driven. | P1 |
| Accessibility | Legal form fields and identifiers require descriptive labels and error recovery. | P1 |
| Analytics | Measure declaration completion, correction, expiry and restriction impact. | P1 |

### 8. CRS

**Reference:** [flow lines 328–367](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:328)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Country without TIN, multiple residencies with different effective dates, address/residency conflict. | P0 |
| Business rules | Permitted reason codes for unavailable TIN and reporting classification need a maintained taxonomy. | P0 |
| UX consistency | Distinguish citizenship, residence, tax residence and mailing address. | P0 |
| Trust | Definitions and examples must be validated with users and tax specialists. | P1 |
| Compliance | CRS reporting, correction, data sharing and country-change obligations need legal ownership. | P0 |
| Loading/empty | No explicit state for CRS saved but under compliance review. | P1 |
| Failure/recovery | Recovery does not define whether onboarding can proceed with an unresolved CRS discrepancy. | P0 |
| Engineering/API | Multi-residency effective dating must propagate to eligibility, tax and reports. | P0 |
| Scalability | Tax-residency taxonomy and translations will grow by country. | P1 |
| Accessibility | Long declarations need structured sections and resumability. | P1 |
| Analytics | Add abandonment by question, ambiguity rate and correction time. | P1 |

### 9. Risk Profiling

**Reference:** [flow lines 368–405](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:368)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Customer disputes result, profile expires during order, joint holders have different profiles, major life event. | P1 |
| Business rules | Suitability mapping, profile refresh triggers and treatment of unanswered/contradictory answers need definition. | P0 |
| UX consistency | “Risk profile” must not be used as a recommendation or guarantee label. | P0 |
| Trust | Show inputs and limitations without encouraging users to optimize answers. | P1 |
| Compliance | Assisted completion, EUIN, suitability evidence and reviewer responsibility require sign-off. | P0 |
| Loading/empty | No state for calculation unavailable or profile not yet accepted. | P1 |
| Failure/recovery | Disagreement path is only “review/support”; no documented re-profile or appeal SLA. | P1 |
| Engineering/API | Questionnaire version must be stored with answers and resulting decision. | P0 |
| Scalability | Rule changes need historical reproducibility across all existing profiles. | P1 |
| Accessibility | Long questionnaire needs keyboard, screen-reader and save/resume support. | P1 |
| Analytics | Add answer-change patterns, disagreement, expiry and assisted-vs-self-service outcomes. | P1 |

### 10. Bank Verification

**Reference:** [flow lines 406–445](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:406)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | FCNR, joint bank account, account conversion, bank maintenance and no Indian mobile banking. | P0 |
| Business rules | Ownership match tolerance, bank allowlist, penny-drop fallback and account closure need exact rules. | P0 |
| UX consistency | Bank verified does not mean payment method or folio compatibility is approved. | P0 |
| Trust | Explain whether verification confirms ownership, balance, account type or all three. | P1 |
| Compliance | NRE/NRO segregation and payment-source ownership need bank and execution sign-off. | P0 |
| Loading/empty | No explicit bank list unavailable or verification pending beyond SLA state. | P1 |
| Failure/recovery | Manual evidence and escalation path lacks timing and customer expectation. | P1 |
| Engineering/API | Bank/gateway capabilities vary by institution; callback and reconciliation risk is high. | P0 |
| Scalability | Bank-by-bank certification and ongoing regression need ownership. | P1 |
| Accessibility | Redirects to bank authentication need return-state and timeout accessibility. | P1 |
| Analytics | Track verification success by bank, method, country, fallback and payment conversion. | P0 |

### 11. Nominee

**Reference:** [flow lines 446–484](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:446)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Nominee death, nominee percentage changes, minor aging, joint-holder conflict and claim in progress. | P1 |
| Business rules | Multiple nominee allocation, validity, cancellation, guardian evidence and claim priority need exact rules. | P0 |
| UX consistency | Nominee, joint holder and beneficiary must be distinguished repeatedly, not just once. | P0 |
| Trust | Explain that nomination does not necessarily equal present ownership or transaction authority. | P0 |
| Compliance | Legal/AMC/RTA acceptance and claim-process evidence are not defined. | P0 |
| Loading/empty | No state for no nominee versus nominee data unavailable. | P1 |
| Failure/recovery | “Offline/legal process” needs a named route, SLA and status. | P1 |
| Engineering/API | Nominee changes may need folio-specific propagation and acknowledgement. | P1 |
| Scalability | Family/claims model will become complex across products and jurisdictions. | P1 |
| Accessibility | Relationship and percentage fields need clear error and non-visual validation. | P2 |
| Analytics | Add nominee completion, abandonment, correction, and renewal/claim readiness metrics. | P1 |

### 12. NRE/NRO Selection

**Reference:** [flow lines 485–522](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:485)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | NRE/NRO conversion, FCNR, multiple folios, NRO threshold proximity and payout account mismatch. | P0 |
| Business rules | Folio-level tagging, source-account lock and how historical holdings inherit account context are not fully defined. | P0 |
| UX consistency | Account selection is repeated across flows; one canonical context object is needed. | P0 |
| Trust | Avoid implying account type alone determines repatriability or tax. | P0 |
| Compliance | FEMA, bank, AMC/RTA and tax interpretation must be reconciled into one approved rule set. | P0 |
| Loading/empty | No state for account list not yet verified or no compatible account. | P1 |
| Failure/recovery | Recovery cannot simply select another account if the original action created a pending payment. | P0 |
| Engineering/API | Context must be immutable for an active order and propagated to all downstream systems. | P0 |
| Scalability | New account types and products will multiply compatibility rules. | P1 |
| Accessibility | Account labels must be plain language and not rely on colour badges. | P1 |
| Analytics | Add account-switch frequency, incompatibility reasons and action abandonment. | P1 |

### 13. DTAA

**Reference:** [flow lines 523–562](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:523)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Approval after redemption, AMC/RTA non-application, treaty ruling change, dual residency and evidence with different validity periods. | P0 |
| Business rules | “Approved” versus “applied” versus “refundable” must be distinct states. | P0 |
| UX consistency | A DTAA status cannot be treated as a single badge across tax estimate, redemption and report domains. | P0 |
| Trust | Avoid “tax saved” unless evidence, computation and legal position support the claim. | P0 |
| Compliance | Country-specific legal interpretation, ITAT uncertainty, AMC/RTA operational application and professional advice boundary. | P0 |
| Loading/empty | No state for evidence submitted but AMC/RTA application pending. | P0 |
| Failure/recovery | Refund/ITR path is named but not operationally owned or time-bound. | P0 |
| Engineering/API | Treaty status must be effective-dated, AMC-specific and auditable. | P0 |
| Scalability | Each country/AMC combination creates policy and workflow variation. | P1 |
| Accessibility | Long legal explanation needs summary, source and accessible full detail. | P1 |
| Analytics | Measure evidence approval, application success, correction, expiry and tax-dispute rate. | P0 |

## Discovery, portfolio and transaction flows

### 14. Dashboard

**Reference:** [flow lines 563–605](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:563)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | No holdings, pending KYC, stale source, multiple accounts, critical incident and conflicting actions. | P1 |
| Business rules | Priority ordering between compliance, transaction, tax and growth prompts is not defined. | P0 |
| UX consistency | Dashboard “required action” and notification “critical” need one severity taxonomy. | P1 |
| Trust | Partial data must not visually compete with verified totals. | P0 |
| Compliance | Dashboard content must not imply suitability, tax savings or portfolio completeness if sources are stale. | P0 |
| Loading/empty | Partial loading is mentioned but skeleton/empty semantics and timeout behavior are not defined. | P1 |
| Failure/recovery | Domain-level failure needs isolation; one failed service must not blank the entire dashboard. | P1 |
| Engineering/API | Fan-out loading creates latency and inconsistent snapshots. | P0 |
| Scalability | Dashboard aggregation becomes expensive across reports, cases, portfolios and notifications. | P1 |
| Accessibility | Priority and urgency need headings, semantic order and non-colour cues. | P1 |
| Analytics | Add action completion, prompt fatigue, stale-data exposure and dashboard-to-domain success. | P1 |

### 15. Portfolio

**Reference:** [flow lines 606–643](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:606)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Duplicate folio, partial allotment, correction event, zero holdings, RTA disagreement and stale NAV. | P0 |
| Business rules | Source precedence, valuation timestamp, cost-basis correction and account-level grouping need definition. | P0 |
| UX consistency | Portfolio value, holding value, report value and RTA value must use consistent as-of semantics. | P0 |
| Trust | “Fresh” requires a measurable freshness threshold per source. | P0 |
| Compliance | Report/statement accuracy, correction history and customer complaint handling need control. | P0 |
| Loading/empty | Empty portfolio must distinguish not invested, KYC incomplete, source unavailable and no data returned. | P1 |
| Failure/recovery | Manual statement fallback needs data validation and a non-authoritative label. | P1 |
| Engineering/API | CAMS/KFintech reconciliation, pagination and correction events are high complexity. | P0 |
| Scalability | Consolidated portfolio reads and report generation need read models and caching. | P1 |
| Accessibility | Dense financial tables need responsive/desktop patterns and screen-reader summaries. | P1 |
| Analytics | Add source freshness viewed, reconciliation correction, report-to-portfolio navigation and comprehension. | P1 |

### 16. Fund Discovery

**Reference:** [flow lines 644–680](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:644)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Eligibility changes during search, no eligible funds, stale scheme master, NFO expiry and country switch. | P0 |
| Business rules | Ranking, default filters, regular-plan disclosure and “eligible universe” must be explicit. | P0 |
| UX consistency | Discovery says no advice, but filters by goal/risk may be perceived as recommendation. | P1 |
| Trust | Results must explain why a product is excluded, not simply hide it. | P1 |
| Compliance | AMC/product restriction feed and effective dates require operational owner and safe fallback. | P0 |
| Loading/empty | Empty results need meaningful alternatives without steering to unsuitable products. | P1 |
| Failure/recovery | Catalogue outage should not permit action from stale content. | P0 |
| Engineering/API | Scheme master sync and policy freshness are critical dependencies. | P0 |
| Scalability | More countries and products make hard-coded filters unsafe. | P1 |
| Accessibility | Filter state, result count and risk labels need semantic announcement. | P1 |
| Analytics | Add search-to-detail-to-order conversion by country, filter and restriction reason. | P1 |

### 17. Fund Details

**Reference:** [flow lines 681–718](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:681)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Scheme merger, suspension, fee change, stale performance, plan change and NFO transition. | P1 |
| Business rules | Performance period, benchmark, riskometer and tax data source/version need explicit definitions. | P0 |
| UX consistency | “Current” scheme data and “historical” performance require different freshness semantics. | P1 |
| Trust | Historical performance must not dominate risk, cost and liquidity context. | P1 |
| Compliance | Scheme documents, risk, distribution and country eligibility need content approval. | P0 |
| Loading/empty | Missing data should be field-level and not make the entire detail page appear complete. | P1 |
| Failure/recovery | Suspended scheme needs a safe route to holdings/orders, not only retry. | P1 |
| Engineering/API | Multiple source feeds may disagree on NAV, AUM, expense ratio or risk fields. | P0 |
| Scalability | Content versioning and AMC updates need CMS governance. | P1 |
| Accessibility | Charts and performance comparisons need tabular/text alternatives. | P1 |
| Analytics | Add metric comprehension, disclosure views and detail-to-action conversion. | P1 |

### 18. Compare Funds

**Reference:** [flow lines 719–755](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:719)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Unequal inception, category mismatch, missing metrics, plan mismatch and restricted scheme after selection. | P1 |
| Business rules | Comparability rules and allowed number of schemes are absent. | P1 |
| UX consistency | “Side-by-side context” may imply ranked recommendation without a neutral comparison model. | P1 |
| Trust | Define why a metric is unavailable rather than silently removing it. | P1 |
| Compliance | Performance and comparison disclosures require approved methodology. | P1 |
| Loading/empty | No state for one scheme loaded and another unavailable. | P1 |
| Failure/recovery | Comparison should preserve selected items after refresh or source failure. | P2 |
| Engineering/API | Normalizing disparate data and time periods is non-trivial. | P1 |
| Scalability | Comparison dimensions grow with products and countries. | P2 |
| Accessibility | Wide tables require keyboard navigation and responsive alternative. | P1 |
| Analytics | Add metric use, comparison abandonment and action conversion without treating clicks as preference. | P1 |

### 19. SIP

**Reference:** [flow lines 756–796](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:756)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Mandate approval after selected date, debit on holiday, bank balance uncertainty, account conversion, mandate expiry. | P0 |
| Business rules | Cut-off/calendar, debit retry, pause/cancel timing, amount modification and mandate reauthorization need exact policy. | P0 |
| UX consistency | SIP active versus mandate approved versus first debit successful must be separate states. | P0 |
| Trust | Customers must not infer returns or guaranteed debits from “active.” | P1 |
| Compliance | Mandate consent, recurring transaction disclosures and account segregation need exact evidence. | P0 |
| Loading/empty | No state for no supported mandate method or bank coverage. | P1 |
| Failure/recovery | Insufficient balance recovery must avoid duplicate debit and define customer responsibility. | P0 |
| Engineering/API | Scheduler, bank mandate callbacks and duplicate debit prevention are high-risk. | P0 |
| Scalability | Monthly debit peaks and mandate status polling require queue design. | P1 |
| Accessibility | Date/frequency/amount controls need semantic labels and timezone clarity. | P1 |
| Analytics | Add first-debit cohort, bounce reason, pause/cancel reason and mandate recovery rate. | P0 |

### 20. Lumpsum

**Reference:** [flow lines 797–837](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:797)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Payment success/order missing, duplicate submit, partial allotment, cut-off race and scheme suspension. | P0 |
| Business rules | Order validity window, payment timeout, refund trigger and next-business-day behavior need exact rules. | P0 |
| UX consistency | Payment success and order success are correctly separated conceptually but not fully normalized in state labels. | P0 |
| Trust | Order ID and expected allotment must not be presented as confirmed investment. | P0 |
| Compliance | KYC, risk, account, regular-plan and disclosure gate must be hard dependencies. | P0 |
| Loading/empty | No explicit state for payment initiation waiting or no eligible payment route. | P1 |
| Failure/recovery | “Controlled refund” needs ownership, timeline and customer compensation policy. | P0 |
| Engineering/API | Exactly-once behavior is impossible; require at-least-once events plus idempotent business commands. | P0 |
| Scalability | Cut-off window concurrency and vendor rate limits require load tests. | P1 |
| Accessibility | Payment redirect return and confirmation must support interruption and screen readers. | P1 |
| Analytics | Add payment-to-order mismatch, duplicate prevention, cut-off abandonment and refund aging. | P0 |

### 21. Redemption

**Reference:** [flow lines 838–877](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:838)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Lien/lock, partial unit redemption, failed payout, DTAA approval after redemption and joint authorization. | P0 |
| Business rules | Tax-lot selection, payout account, limit calculation, cutoff, cancellation and correction rules are incomplete. | P0 |
| UX consistency | Estimated tax, TDS deducted, net payout and final tax liability need separate labels. | P0 |
| Trust | “Net estimate” can be interpreted as guaranteed proceeds. | P0 |
| Compliance | TDS/DTAA/FEMA/repatriation and professional advice boundaries require exact approved copy. | P0 |
| Loading/empty | No state for holding data unavailable or no redeemable units. | P1 |
| Failure/recovery | Payout failure and tax discrepancy recovery lack customer-level timeline and owner. | P0 |
| Engineering/API | Payout and RTA updates are asynchronous; ledger must prevent double counting. | P0 |
| Scalability | Tax computation and report generation under peak redemption periods need capacity plan. | P1 |
| Accessibility | Dense tax explanation requires progressive detail and accessible summary. | P1 |
| Analytics | Add redemption intent-to-confirm, tax comprehension, cancellation, payout delay and dispute rate. | P0 |

### 22. Switch

**Reference:** [flow lines 878–918](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:878)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Leg 1 succeeds/leg 2 fails, inter- versus intra-AMC restrictions, target suspension and tax-lot selection. | P0 |
| Business rules | Atomicity policy, compensation/refund, linked-leg retry and account-type rules are not defined. | P0 |
| UX consistency | “Completed” must mean both legs reconciled, not simply both submitted. | P0 |
| Trust | Show switch as redemption plus purchase in all consequential contexts. | P0 |
| Compliance | Tax, suitability, target eligibility and plan rules apply to both legs. | P0 |
| Loading/empty | No state for source holding visible but no eligible target. | P1 |
| Failure/recovery | Recovery says hold/reconcile but lacks customer decision when one leg is final. | P0 |
| Engineering/API | Composite transaction orchestration and idempotency are critical. | P0 |
| Scalability | Inter-AMC source/target combinations multiply test matrix. | P1 |
| Accessibility | Linked-leg timeline needs clear semantic grouping. | P1 |
| Analytics | Add leg-level outcomes, mismatch, correction, tax impact view and recovery duration. | P0 |

### 23. STP

**Reference:** [flow lines 919–957](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:919)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Source exhaustion, target suspension, schedule date holiday, country change and one-cycle partial failure. | P1 |
| Business rules | Cycle-level tax, schedule modification, pause/cancel, source depletion and account compatibility need definition. | P0 |
| UX consistency | Future feature is correctly labelled, but “manual alternative” has no defined service contract. | P1 |
| Trust | Explain that every cycle can create separate tax and execution outcomes. | P1 |
| Compliance | Suitability and recurring transaction evidence need future legal sign-off. | P1 |
| Loading/empty | No state for feature unavailable beyond generic restricted. | P1 |
| Failure/recovery | Failed cycle recovery and customer choice are underspecified. | P1 |
| Engineering/API | Scheduling, multiple order legs and calendar dependencies are high complexity. | P0 |
| Scalability | Large scheduled instruction volume requires scheduler partitioning. | P1 |
| Accessibility | Recurring schedule needs readable date/amount semantics. | P1 |
| Analytics | Add cycle success, source exhaustion, pause reason and support cost. | P2 |

### 24. SWP

**Reference:** [flow lines 958–996](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:958)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Holding depletion, payout failure, NRO limit, account closure, tax-year change and country conversion. | P1 |
| Business rules | Minimum holdings, payout guarantee language, pause/cancel timing and tax-lot rules are missing. | P0 |
| UX consistency | “Scheduled” must not imply guaranteed income or payout. | P0 |
| Trust | Show uncertainty and depletion impact without presenting financial planning advice. | P1 |
| Compliance | Suitability, tax, payout and recurring redemption rules require future approval. | P1 |
| Loading/empty | No state when holding has no eligible SWP amount. | P1 |
| Failure/recovery | Failed payout and schedule pause need customer-controlled recovery. | P1 |
| Engineering/API | Scheduler and payout reconciliation are high-risk. | P0 |
| Scalability | Cycle monitoring and customer-specific exceptions grow quickly. | P1 |
| Accessibility | Schedule and depletion information needs accessible alternative to charts. | P1 |
| Analytics | Add schedule creation, payout success, depletion warning, pause/cancel and repeat contact. | P2 |

## Orders, reporting and service

### 25. Order Tracking

**Reference:** [flow lines 997–1035](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:997)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Conflicting vendor states, stale callback, reopened correction, partial allocation and refund pending. | P0 |
| Business rules | State precedence and user-safe translation are not defined centrally. | P0 |
| UX consistency | Order Tracking must be the canonical projection used by Dashboard, Notifications and Support. | P0 |
| Trust | Source and timestamp are necessary but not sufficient without freshness threshold. | P1 |
| Compliance | Transaction record and communication retention need explicit evidence requirements. | P0 |
| Loading/empty | No order history versus order history unavailable needs distinction. | P1 |
| Failure/recovery | Recovery action must not encourage re-ordering before reconciliation. | P0 |
| Engineering/API | Event normalization, event ordering and replay are core. | P0 |
| Scalability | High concurrency around cutoffs and event volume require durable event processing. | P1 |
| Accessibility | Timelines need meaningful headings and state announcements. | P1 |
| Analytics | Add state dwell time, repeated refresh, duplicate intent and customer confusion. | P0 |

### 26. Reports

**Reference:** [flow lines 1036–1073](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1036)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Large report, source correction, report version, joint-holder access and expired share link. | P1 |
| Business rules | Purpose, report type, as-of date, tax year and correction rules need canonical definitions. | P0 |
| UX consistency | “Report ready” must not mean “tax-ready” for every report type. | P0 |
| Trust | Show source gaps and calculation version before download, not only in the PDF. | P1 |
| Compliance | Export authorization, watermarking, retention and data portability need approval. | P0 |
| Loading/empty | Report generation pending, no report for period and source unavailable need separate states. | P1 |
| Failure/recovery | Failed generation should preserve request and show support/refresh options. | P1 |
| Engineering/API | Asynchronous report jobs, large exports and secure links need bounded resource management. | P1 |
| Scalability | Tax season may create report-generation spikes. | P0 |
| Accessibility | PDF/Excel exports require accessible document testing. | P1 |
| Analytics | Add report purpose, successful external use, failed download and regeneration rate. | P1 |

### 27. Capital Gains

**Reference:** [flow lines 1074–1111](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1074)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Missing lots, switch legs, corporate actions, IDCW, folio merge and corrected source after report. | P0 |
| Business rules | Tax classification, lot selection, rule version and handling of incomplete source data are incomplete. | P0 |
| UX consistency | Capital gain, taxable gain, TDS and tax payable must not be conflated. | P0 |
| Trust | “Reproducible” requires visible inputs and a correction/version history. | P0 |
| Compliance | Tax engine ownership and country-specific tax boundary need formal sign-off. | P0 |
| Loading/empty | No tax-year data versus source not loaded needs distinction. | P1 |
| Failure/recovery | Manual evidence fallback requires validation and report correction process. | P0 |
| Engineering/API | Cost-lot computation and tax-rule versioning require deterministic golden tests. | P0 |
| Scalability | Large historical portfolios and tax-season jobs need batch processing. | P1 |
| Accessibility | Dense calculations need summaries and accessible tables. | P1 |
| Analytics | Add missing-lot rate, correction rate, report use and CA handoff conversion. | P1 |

### 28. Tax Reports

**Reference:** [flow lines 1112–1150](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1112)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | US/Canada gated user, multiple residencies, DTAA approval pending, incomplete source and report correction. | P0 |
| Business rules | “Tax-ready” definition and responsibility boundary with CA are not precise enough. | P0 |
| UX consistency | Purpose-labelled evidence and advice must be distinguished throughout. | P0 |
| Trust | A coherent package can still be incomplete; surface completeness status prominently. | P0 |
| Compliance | Data export, privacy, tax advice, retention and country-specific formats need approval. | P0 |
| Loading/empty | No report for year, incomplete package and generation pending need different states. | P1 |
| Failure/recovery | Rebuild after source correction and notify prior recipients is not defined. | P0 |
| Engineering/API | Report versioning and invalidation of shared links are required. | P1 |
| Scalability | Tax-season concurrency and specialist access may overwhelm support. | P0 |
| Accessibility | Reports and explanation content must work on desktop, mobile and assistive technology. | P1 |
| Analytics | Add package completeness, external share/use, correction and support rate. | P1 |

### 29. Profile

**Reference:** [flow lines 1151–1189](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1151)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Country change during order, legal name change, tax residency conflict, profile edit after approval. | P0 |
| Business rules | Which changes trigger re-KYC, FATCA/CRS, order suspension or report recalculation need a dependency matrix. | P0 |
| UX consistency | “Profile saved” must be separated from “dependent services updated.” | P0 |
| Trust | Show before/after, effective date and impact before confirmation. | P1 |
| Compliance | Material profile changes need evidence, reviewer, effective date and audit. | P0 |
| Loading/empty | No profile, incomplete profile and unavailable profile data need distinction. | P1 |
| Failure/recovery | If dependent rechecks fail, the customer needs a safe state and owner. | P0 |
| Engineering/API | Profile changes are distributed writes; event propagation and rollback are required. | P0 |
| Scalability | Country-change rules will become configuration-heavy. | P1 |
| Accessibility | Long profile forms need save/resume and field-specific errors. | P1 |
| Analytics | Add field-level abandonment, recheck outcome and change-to-support contact. | P1 |

### 30. Documents

**Reference:** [flow lines 1190–1229](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1190)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Document replacement, deletion request, document used by multiple purposes, version conflict and expiry during review. | P0 |
| Business rules | Reuse, retention, deletion, legal hold and purpose linkage are not sufficiently specific. | P0 |
| UX consistency | “Approved document” must identify approved purpose and validity, not global approval. | P0 |
| Trust | Show access history and retention without exposing reviewer-sensitive details. | P1 |
| Compliance | KYC/video/biometric/tax-document retention and cross-border storage need explicit policy. | P0 |
| Loading/empty | No documents versus document index unavailable versus no document required are different. | P1 |
| Failure/recovery | Re-upload should preserve prior valid version until replacement is approved. | P0 |
| Engineering/API | Large files, OCR, malware scan, storage lifecycle and access logging need contracts. | P0 |
| Scalability | Document volume and review queues grow with country/household expansion. | P1 |
| Accessibility | Capture/upload needs non-camera alternative and clear progress. | P1 |
| Analytics | Add document quality failure, retry, review duration, expiry completion and access anomalies. | P1 |

### 31. Settings

**Reference:** [flow lines 1230–1266](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1230)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Marketing opt-out vs transactional messages, consent revocation during case, device compromise and data-subject request. | P0 |
| Business rules | Propagation delay, effective time and precedence between individual and joint-holder preferences are missing. | P0 |
| UX consistency | Settings changes should show whether they affect product behavior immediately or after review. | P1 |
| Trust | Customers need a clear current state and scope of consent. | P1 |
| Compliance | DPDP/GDPR/UK GDPR requests, consent, erasure, portability and retention require DPO ownership. | P0 |
| Loading/empty | No setting yet versus settings service unavailable must be distinguished. | P1 |
| Failure/recovery | Partial propagation across CRM/notification providers is not defined. | P0 |
| Engineering/API | Consent is a distributed system; event ordering and revocation fan-out need testing. | P0 |
| Scalability | Country-specific channel rules and vendors increase policy complexity. | P1 |
| Accessibility | Settings labels need plain-language grouping and accessible current-state indicators. | P1 |
| Analytics | Add consent propagation success, notification after opt-out, request completion and privacy-contact rate. | P0 |

### 32. Notifications

**Reference:** [flow lines 1267–1305](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1267)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Duplicate event, wrong recipient, channel changed mid-send, provider outage, shared device and stale deep link. | P0 |
| Business rules | Severity, channel fallback, quiet hours, suppression and deduplication need a canonical policy. | P0 |
| UX consistency | Notification state and in-app state must use the same source and wording. | P0 |
| Trust | Email/SMS/WhatsApp must not carry more sensitive data than the channel permits. | P0 |
| Compliance | Consent, transactional/marketing separation, cross-border delivery and retention need approval. | P0 |
| Loading/empty | Notification feed loading, no notifications and delivery pending are not defined per channel. | P1 |
| Failure/recovery | Critical delivery failure needs a concrete support task threshold, not only “may trigger.” | P0 |
| Engineering/API | Provider delivery receipts are not authoritative proof that a user received/read a message. | P1 |
| Scalability | Campaign and transactional traffic can interfere; separate queues and rate limits are required. | P1 |
| Accessibility | Notification content and urgency must be perceivable without sound, colour or vibration. | P1 |
| Analytics | Add notification-to-action, opt-out after message, duplicate rate, delivery latency and missed-critical rate. | P0 |

### 33. Help

**Reference:** [flow lines 1306–1343](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1306)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | No-result search, country-specific answer, article expired, contradictory help and tax advice question. | P1 |
| Business rules | Article priority, jurisdiction, escalation boundary and content owner need formal governance. | P0 |
| UX consistency | Help answer, Support answer and Compliance answer must share one approved content source. | P0 |
| Trust | Source date and owner are necessary; users also need confidence that the answer applies to their country. | P1 |
| Compliance | Regulated content review and retirement must be auditable. | P0 |
| Loading/empty | Search index unavailable, no result and no relevant result need different paths. | P1 |
| Failure/recovery | Content gap must become a measurable backlog item with owner, not disappear into a case. | P1 |
| Engineering/API | Search indexing by policy version and country is required. | P1 |
| Scalability | Content variants multiply with countries and tax rules. | P1 |
| Accessibility | Search results and article headings need semantic navigation and readable legal detail. | P1 |
| Analytics | Add no-result rate, article resolution, escalation, repeat search and content-age metrics. | P0 |

### 34. Support

**Reference:** [flow lines 1344–1383](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1344)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Vulnerable customer, legal threat, suspected fraud, repeat failure, joint-holder conflict and language/timezone need. | P0 |
| Business rules | Case severity, ownership, closure confirmation, compensation and reopen policy require detail. | P0 |
| UX consistency | Support case state must match order/KYC/payment source state, not create a parallel truth. | P0 |
| Trust | “One owner” needs real staffing and escalation coverage, not only a case field. | P0 |
| Compliance | Authentication, complaint handling, sensitive AML/tax answers and call recording/retention need policy. | P0 |
| Loading/empty | Case creation pending, case history unavailable and no prior cases need distinct states. | P1 |
| Failure/recovery | Repeat contact should trigger root-cause and priority escalation automatically. | P0 |
| Engineering/API | Context package must be assembled consistently and access-controlled. | P0 |
| Scalability | Support cost and queue capacity are not tied to volume or country/timezone coverage. | P0 |
| Accessibility | Support channels must provide accessible alternatives and readable status updates. | P1 |
| Analytics | Add first-contact resolution, repeat contact, reopen, transfer, answer correction and cost per case. | P0 |

### 35. RM Connect

**Reference:** [flow lines 1384–1421](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1384)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | No RM available, failed contact, conflict of interest, customer declines, joint-holder consent and time-zone mismatch. | P1 |
| Business rules | RM scope, EUIN, advice boundary, lead ownership, response SLA and lead expiry need explicit rules. | P0 |
| UX consistency | RM Connect may be interpreted as a recommendation/advice channel while flows define assisted service. | P0 |
| Trust | Show role, credentials, commercial relationship and what the RM can/cannot do. | P0 |
| Compliance | ARN/EUIN, suitability, consent, recordkeeping and country restrictions must be enforced. | P0 |
| Loading/empty | No assigned RM and no available appointment need separate states. | P1 |
| Failure/recovery | Missed callback needs reassignment and customer-visible ownership. | P1 |
| Engineering/API | CRM-to-product context sync and consent revocation are high-risk. | P0 |
| Scalability | RM service tiers and high-AUM prioritization can create fairness and capacity issues. | P1 |
| Accessibility | Callback scheduling and alternate contact channels need accessible options. | P1 |
| Analytics | Add lead assignment latency, contact success, assisted conversion, complaint rate and cost-to-serve. | P0 |

### 36. Logout

**Reference:** [flow lines 1422–1460](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md:1422)

| Review area | Finding | Priority |
|---|---|---|
| Missing edge cases | Offline logout, active download, pending order, shared device and server revocation failure. | P1 |
| Business rules | Logout must not cancel server-side orders; local cache deletion and timeout policy need exact definition. | P0 |
| UX consistency | “Signed out” must not imply transaction cancellation or data deletion. | P0 |
| Trust | Explain pending actions and device/session status after logout. | P1 |
| Compliance | Session logs, device revocation, security alerts and incident response need ownership. | P0 |
| Loading/empty | No state for local logout complete but server revocation pending. | P1 |
| Failure/recovery | Server-side force revocation needs a visible security outcome and support path. | P1 |
| Engineering/API | Token revocation, cache invalidation and offline behavior require platform testing. | P0 |
| Scalability | Multi-device session management needs durable device registry. | P1 |
| Accessibility | Logout confirmation and security outcome need accessible status announcement. | P2 |
| Analytics | Add revocation latency, timeout logout, failed revocation and security recovery. | P1 |

# Cross-Functional Review

## Principal Product Designer

### Findings

- The architecture is unusually thorough in naming service concerns, but many flows still express “explain,” “show,” or “track” without defining the customer’s comprehension threshold.
- Several flow names imply a simple task while the domain is legally complex: DTAA, NRE/NRO, Capital Gains and Tax Reports.
- The same concepts appear in many locations: account context, tax status, eligibility, support and notifications. Without a canonical projection model, the experience will become inconsistent.

### Recommendation

Before screens, define for each high-consequence state:

- Customer-safe label.
- One-sentence meaning.
- What the customer can do.
- What the customer must not do.
- Source and timestamp.
- Next update.
- Owner.

## Principal UX Architect

### Findings

- The flows have a consistent template, but that template is not enough to guarantee consistent behavior.
- The flow diagrams are mostly happy-path sequences with branch labels; they do not model parallel processes, asynchronous callbacks, cross-flow return paths or state persistence.
- The artifact needs a cross-flow context map for investor, account, tax residency, order, case and consent.

### Recommendation

Create a flow contract for each domain with:

- Entry conditions.
- Exit conditions.
- Shared context.
- Allowed states.
- Transition authority.
- Cross-flow deep links.
- Version/scope.

## Product Manager

### Findings

- The architecture defines a broad future platform but does not give Screen Inventory a strict MVP boundary.
- STP, SWP, switch, DTAA and advanced tax flows may consume design and engineering capacity before core lumpsum, payment, KYC and reporting quality is proven.
- Business success criteria are not consistently linked to individual flow exit criteria.

### Recommendation

Screen Inventory only the smallest coherent MVP slice:

1. Registration and login.
2. Country/tax context.
3. KYC/AML/FATCA/CRS.
4. Bank and NRE/NRO context.
5. Fund discovery/details.
6. Lumpsum.
7. Order tracking.
8. Basic portfolio.
9. Basic reports.
10. Support and recovery.

## Staff Engineer

### Findings

- Asynchronous external systems are acknowledged, but transaction semantics are not defined deeply enough.
- “Idempotency” is present as a principle, but the artifact does not specify command keys, event IDs, replay, deduplication, ordering or conflict resolution.
- Distributed profile, consent and notification changes can produce stale permissions.
- Dashboard fan-out and tax-season report generation are likely scalability hotspots.

### Recommendation

Do not begin screen implementation until the following technical contracts exist:

- Domain IDs and correlation IDs.
- Command/event schemas.
- State transition tables.
- Idempotency and retry policy.
- Source precedence.
- Freshness and timeout thresholds.
- Dead-letter and manual replay process.
- Load targets and capacity model.

## Compliance Head

### Findings

- The document appropriately avoids claiming that the platform is a tax adviser, but several flows still risk customer interpretation as tax advice.
- DTAA “approved,” “applied” and “tax saved” are not separated enough.
- KYC, FATCA/CRS, nominee and document flows lack complete evidence/retention/appeal rules.
- US/Canada are called gated, but their presence in the full flow set could create accidental general-availability design.

### Recommendation

Add a hard compliance status to every flow:

- Country scope.
- Product scope.
- Legal interpretation version.
- Evidence required.
- Reviewer.
- Customer-safe wording.
- Expiry.
- Appeal or alternative.

## QA Lead

### Findings

- Each flow lists failure and recovery conceptually, but most lack testable acceptance conditions.
- No golden datasets exist for PAN/KYC matching, tax rules, DTAA, capital gains or partial transactions.
- Accessibility is stated globally but not tested as a flow-level requirement.

### Recommendation

Create test matrices for:

- Every state transition.
- Every API timeout and duplicate callback.
- Every partial-success transaction combination.
- Every country/account eligibility combination.
- Every tax-year and rule-version combination.
- Keyboard, screen-reader, zoom, mobile and desktop behavior.
- Notification delivery and consent changes.

## Customer Support Lead

### Findings

- Support is treated as a recovery endpoint but not as a capacity-constrained operational system.
- “One owner” is a strong promise, but queue staffing, timezone coverage, language coverage, callback SLA and escalation capacity are not proven.
- Support does not yet have a complete issue taxonomy that maps directly to analytics and product prevention.

### Recommendation

Define:

- Contact reason taxonomy.
- Authentication policy.
- Severity and transfer rules.
- First-response and resolution targets.
- Knowledge article source.
- Repeat-contact trigger.
- Customer compensation/recovery policy.
- Cost per case and capacity model.

## Growth Lead

### Findings

- Acquisition is present only as a registration trigger and RM connection.
- The architecture does not define channel attribution, referral identity, campaign consent, qualified activation or lifecycle experimentation.
- Growth messaging could overpromise DTAA, tax savings or availability if not tied to policy state.

### Recommendation

Add:

- Source and campaign attribution.
- Qualified activation definition.
- Country-level funnel.
- Referral and partner consent.
- Marketing versus transactional message separation.
- Content claim approval.
- Retention events tied to reports, documents, tax and SIP continuation.

## CTO

### Findings

- The architecture is ambitious enough to become a multi-year platform program.
- The cost and operational burden of CAMS/KFintech, KYC, payment, tax, support, reporting and country rules is not reflected in UX sequencing.
- The service must be resilient before it is broad.

### Recommendation

Authorize a thin-slice technical and service pilot before full UX production:

1. One or two launch countries.
2. Individual holders only.
3. One execution path.
4. One or two supported payment routes.
5. Lumpsum first.
6. Basic portfolio and reports.
7. Human-owned exception handling.
8. Measured end-to-end reconciliation.

# Cross-Cutting Findings by Requested Category

## Missing edge cases

- Country change during an active transaction.
- Joint-holder disagreement or inaccessible second holder.
- Partial success across payment, order, RTA and payout.
- Vendor callback lost or duplicated.
- Customer loses all verified communication channels.
- Tax rule or scheme restriction changes after intent but before execution.
- Document expires during review.
- Report is corrected after it was shared with a CA.
- Support or RM is unavailable during a critical SLA.
- Accessibility limitation prevents video/IPV or document capture.

## Missing business rules

- Provisional-account expiry and identity merge.
- Source precedence and freshness thresholds.
- Transaction atomicity and partial-success compensation.
- State-specific retry authorization.
- Tax estimate versus final liability.
- DTAA approved versus applied versus refundable.
- Data-sharing expiry and field-level masking.
- Joint-holder authority and nominee distinction.
- MVP/future scope tags.
- Support closure, reopen and compensation policy.

## UX inconsistencies

- Approved, verified, completed and active are used across different domains without a universal distinction.
- “Tax report,” “tax-ready report,” “capital gains,” “TDS” and “tax estimate” need strict content definitions.
- “RM Connect” can imply advice while the architecture says assisted service.
- “Dashboard,” “Home,” “Portfolio” and “Reports” have overlapping responsibilities.
- “Bank verified” and “NRE/NRO selected” may be interpreted as full funding approval.

## Trust issues

- Tax and DTAA language can create false certainty.
- Stale data is acknowledged but lacks measurable thresholds.
- Customer-visible owner may not mean actual decision owner.
- Notification delivery does not prove customer receipt.
- “Completed” may be shown before all dependent systems reconcile.
- Tax-ready evidence may still be incomplete for professional filing.

## Compliance gaps

- Country-specific decision register.
- Approved tax/DTAA language and change process.
- PFIC/FAPI product and disclosure gate.
- Evidence retention for KYC video, biometric/liveness and screening.
- Tax Consultant engagement and liability boundary.
- Cross-border data transfer and channel-specific privacy.
- Field-level role access and export controls.
- Complaint and regulatory escalation evidence.

## Missing loading states

- External vendor callback pending.
- Dashboard partial fan-out.
- CKYC unavailable.
- Payment authorization pending.
- RTA source refresh pending.
- Tax report batch generation.
- DTAA application pending with AMC/RTA.
- Consent propagation pending across CRM and notification providers.
- Server logout pending after local logout.

## Missing empty states

- No eligible product for current country.
- No holdings because the customer has not invested.
- No holdings because RTA data is unavailable.
- No report because the period has no data.
- No nominee versus nominee data unavailable.
- No support cases versus case service unavailable.
- No supported payment route.
- No RM available.

## Missing failure states

- Payment succeeded, order not received.
- One switch leg completed, other failed.
- Report shared, then corrected or invalidated.
- DTAA approved internally, not applied externally.
- Notification sent to a revoked channel.
- Profile change saved, dependent recheck failed.
- KYC vendor accepted, AML later escalated.
- Server revocation failed after logout.

## Missing recovery paths

- Long-running duplicate identity review.
- Customer with no verified channel.
- Partial transaction outcome.
- RTA correction after customer download.
- Tax report correction after specialist share.
- Critical notification failure.
- Support case with repeated transfers.
- Compliance decision appeal or alternative route.
- Manual fallback with explicit non-authoritative status.

## Engineering risks

- Distributed state without source precedence.
- Duplicate callbacks and non-idempotent retries.
- Composite transaction orchestration.
- Large tax-season report jobs.
- Dashboard fan-out latency.
- Consent propagation lag.
- Policy versioning and rollback.
- Secure link expiry and report invalidation.
- PII in logs, analytics and AI prompts.

## API dependency risks

- Execution platform selection unresolved.
- CAMS/KFintech coverage and freshness unverified.
- KYC vendor decision unresolved.
- Payment coverage differs by NRE/NRO bank.
- Mandate support varies by bank and gateway.
- AML/PAN providers unspecified.
- CRM/helpdesk/analytics system of record unresolved.
- Provider delivery receipts do not prove customer receipt.
- Vendor maintenance/outage behavior not reflected in user states.

## Scalability concerns

- Manual KYC/EDD and tax review queues.
- Month-end SIP and market-event order peaks.
- Tax-season report generation.
- Country-specific policy and content variants.
- Family and specialist permission combinations.
- RTA reconciliation volume.
- Support cost created by overly broad self-service promises.
- AI review and audit burden.

## Accessibility issues

- Video/IPV and biometric alternatives need explicit support.
- Timers and OTP flows need non-visual alternatives.
- Financial tables, tax reports and comparison data need semantic alternatives.
- Charts and performance data require text equivalents.
- Colour cannot carry state, risk or urgency alone.
- External bank redirects need interruption and return-state handling.
- PDF/Excel reports need accessibility testing.
- Tax and legal content needs plain-language summaries and full-detail access.

## Analytics gaps

- No formal schema for event outcome, error category, state dwell time and data quality.
- No customer comprehension measurement for tax, NRE/NRO, DTAA or order state.
- No vendor-level reliability and callback metrics in product analytics.
- No repeat-contact/root-cause linkage.
- No screen-reader/accessibility success metrics.
- No report correctness or correction-rate metric.
- No support cost per completed action.
- No qualified activation metric connected to growth.

# Recommended Board Actions Before Screen Inventory

## P0 gates

1. Approve the domain-specific state machines and source-of-truth matrix.
2. Mark each flow MVP, V1, V2, future, assisted-only or out of scope.
3. Create compliance decision registers for KYC, FATCA, CRS, DTAA, tax, repatriation and country eligibility.
4. Define transaction partial-success and reconciliation matrices.
5. Define field-level permissions, consent expiry and export controls.
6. Freeze canonical terminology: verified, approved, active, pending, completed, settled, tax estimate and tax-ready.
7. Confirm vendor/API contracts, fallback behavior and operational owners.

## P1 gates

1. Add explicit loading, empty, failure and recovery states to each MVP flow.
2. Create QA test matrices and golden data.
3. Define analytics schemas, source correlation and comprehension metrics.
4. Define support staffing, queue capacity, timezone coverage and repeat-contact prevention.
5. Add per-flow accessibility acceptance criteria.
6. Create notification content classification and consent propagation rules.

## P2 improvements

1. Add advanced personalization and AI once core state/data quality is stable.
2. Add future transaction flows only after MVP reconciliation is proven.
3. Expand localization, richer comparison and household scenarios after research validation.

# Final Answers

## 1. UX Architecture Readiness Score

**62 / 100**

The architecture demonstrates strong breadth, strategic intent and awareness of service complexity. The score is reduced by unresolved state semantics, compliance decisions, source precedence, permission precision, testability and operational readiness.

## 2. Can this move to Screen Inventory?

**NO.**

It can move to a **controlled UX architecture refinement sprint**, not directly to Screen Inventory.

Screen Inventory should begin only after the P0 gates are closed and the MVP flows are explicitly separated. Otherwise, the team will inventory screens for capabilities whose states, permissions, legal language and recovery behavior are still unresolved.

