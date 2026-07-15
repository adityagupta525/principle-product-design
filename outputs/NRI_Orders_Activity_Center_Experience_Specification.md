# NRI WealthTech Platform
## Orders & Activity Center Experience

**Document type:** Product experience and implementation specification
**Role:** Founding Product Leadership Team
**Status:** Extension of locked Authentication, Onboarding, Activation, Home, Portfolio, Fund Discovery, Investment Journey, and Cross-Module Lifecycle & Entitlement Contract
**Scope:** Monitoring, investigation, recovery, evidence, and download of financial activity after an instruction or related operational event exists
**Constraint:** No visual UI, colours, typography, pixel measurements, or final screen styling are defined here.

## 0. Contract Alignment

This module consumes the locked state machines and does not redefine them. It is a projection and investigation layer over:

- Identity, Authentication, Session, and Device Trust
- Onboarding and Compliance
- Activation and Investor Eligibility
- Portfolio Data
- Order, Payment, Refund, Mandate, Document, Consent, Report, Notification, and Support Case states
- Investment Journey instruction and capability contracts

### The Activity Center owns

- Activity aggregation and user-safe projection.
- Cross-entity activity grouping and correlation.
- Search, filtering, sorting, status views, and timeline navigation.
- Activity detail and evidence access.
- Download generation, history, and artifact status.
- Recovery handoff to the owning domain.

### The Activity Center does not own

- Order, payment, settlement, refund, portfolio, tax, compliance, or notification truth.
- Permission decisions or financial calculations.
- Final receipt issuance unless the owning service confirms the artifact.
- Manual overrides, reconciliations, or compliance decisions.

## 1. Product Definition

Orders & Activity Center is the user’s financial activity operating center. It answers:

1. What happened?
2. What is happening now?
3. What requires attention?
4. Which transactions are complete, pending, failed, reversed, refunded, or uncertain?
5. Where is the authoritative proof?

It is not a chronological list of clicks. It is a correlated, state-aware view of instructions, payments, orders, executions, settlements, refunds, mandates, reports, documents, and material account events.

## 2. Minimum Screen Architecture

| ID | Screen | Responsibility |
|---|---|---|
| O01 | Activity Center | Aggregate activity, search, filters, sorting, status views, attention items, and timeline entry points |
| O02 | Activity Detail | Authoritative activity investigation with order, payment, settlement, refund, and recovery context |
| O03 | Receipt & Proof | View and access confirmed receipts, statements, confirmations, and evidence artifacts |
| O04 | Download Centre | Generate, monitor, retrieve, expire, and audit downloadable proof and reports |

### Why four screens

- O01 is the operating inbox and discovery workspace.
- O02 is the detailed investigation surface and carries recovery variants.
- O03 separates proof consumption from live operational status.
- O04 manages artifact generation, history, expiry, and secure downloads.

Search, filters, status views, payment timelines, settlement timelines, refund tracking, notification deep links, and recovery are variants within these screens. Separate screens would duplicate state behavior and create inconsistent explanations.

## 3. Activity Domains

### User-created activity

- Lumpsum purchase
- Additional purchase
- SIP setup, installment, pause, change, and cancellation
- Redemption
- Switch
- STP setup and legs
- SWP setup and legs
- Future instrument instructions

### Financial activity

- Payment initiation, authorization, success, failure, timeout, reversal, and refund
- Order submission, acceptance, rejection, expiry, cancellation, partial execution, and settlement
- Portfolio update, source refresh, correction, and reconciliation
- Mandate creation, approval, rejection, expiry, bounce, and cancellation

### Evidence and service activity

- Receipt generation and amendment
- Tax/report generation and amendment
- Document upload/approval/expiry where activity-linked
- Notification delivery
- Support, Finance, Operations, Compliance, and reconciliation case events
- Corporate actions and future instrument lifecycle events

## 4. Activity Correlation Model

The Activity Center MUST preserve relationships without flattening domain truth.

`instruction_id -> order_id -> payment_id -> execution_id -> transaction_id -> settlement_id -> portfolio_snapshot_id`

Related records MAY also include:

`refund_id`, `mandate_id`, `report_id`, `receipt_id`, `case_id`, `notification_id`, `document_version_id`, and `corporate_action_id`.

Every activity record MUST expose a stable activity ID, domain type, correlation ID, owning source, scope, current state, last updated time, and allowed actions.

## 5. State Projection Rules

### Activity summary state

The summary state is a safe projection, not a replacement for underlying states.

| Projection | Meaning |
|---|---|
| `ACTION_REQUIRED` | User can correct, confirm, upload, retry, or contact a team |
| `IN_PROGRESS` | A known process is active within expected timing |
| `DELAYED` | Expected operational window exceeded |
| `COMPLETED` | Specific activity outcome is authoritative and final enough for the domain |
| `FAILED` | Requested operation failed with a known outcome |
| `REJECTED` | Authoritative policy/provider/business rejection |
| `CANCELLED` | Activity ended through approved cancellation |
| `PARTIAL` | Some legs or components completed while others remain unresolved |
| `REFUNDING` | Return of funds is in progress |
| `REFUNDED` | Refund is reconciled as complete |
| `UNKNOWN_OUTCOME` | Side effect may have occurred and is under reconciliation |
| `RESTRICTED` | View or action is limited by policy, role, consent, or scope |
| `SUSPENDED` | Active security, compliance, legal, or operational hold |
| `DATA_UNAVAILABLE` | Required source cannot currently be read safely |

### Precedence

Security, legal scope, consent, compliance, policy/eligibility, account, owning financial state, data quality, notification, and engagement. A notification cannot make an order complete. A receipt cannot override a pending ledger. A portfolio snapshot cannot erase an order rejection.

## 6. Operating Principles

1. Current state is more important than chronological novelty.
2. Financial certainty is more important than visual simplicity.
3. Correlate activity but preserve domain-specific truth.
4. Show what the user must do before passive history.
5. Make status, source, freshness, and finality visible.
6. Never require the user to infer whether money moved.
7. Never offer an unsafe retry when an external side effect may exist.
8. Make proof accessible without confusing a generated artifact with settlement.
9. Preserve search/filter context when opening details and returning.
10. Keep historical records visible even when the user can no longer act.
11. Do not use promotional content to compete with financial attention items.
12. Every blocked state must have a safe next step, a reason category, or a clear “no action required.”

## 7. Information Hierarchy

1. Security, legal, compliance, or account hold.
2. Action required and financial uncertainty.
3. Current activity state and whether money may have moved.
4. Activity identity, amount, account, product, and ownership scope.
5. Payment, execution, settlement, refund, and portfolio timelines.
6. Proof, receipts, reports, and source metadata.
7. Historical context, filters, and optional explanation.

## 8. Trust Principles

- “Payment successful,” “order accepted,” “settled,” and “invested” are never interchangeable.
- Unknown outcomes are visible and block duplicate action.
- Timeline entries identify source and timestamp category.
- Corrections and amendments preserve history rather than rewriting it.
- Receipts identify whether they are provisional, final, amended, or refund evidence.
- Download links are secure, scoped, expiring, and auditable.
- A user can understand why a status differs between Order, Payment, Portfolio, and Report.
- Support handoff includes a safe reference and known context.

## 9. Accessibility Principles

- All activity states have text, not colour-only meaning.
- Activity feeds have a semantic list alternative and stable reading order.
- Timelines announce current state and new events without repeating the entire history.
- Filters, sorting, search, tabs, and status views are keyboard and screen-reader accessible.
- Amounts expose currency, sign, units, period, and certainty.
- Partial, stale, unknown, amended, and refunded states are explicit to assistive technology.
- Downloads have meaningful filenames, accessible document structure, and secure error handling.
- Focus is preserved after refresh, filter application, deep link, and recovery action.

## 9A. Future Scalability

The Activity Center is intentionally built around a generic activity and evidence model rather than a mutual-fund-only history model.

### Mutual funds

Support scheme, plan, option, folio, NAV, SIP, switch legs, STP, SWP, RTA settlement, IDCW, TDS, and capital-gains events as extensions of shared instruction, payment, order, settlement, refund, and proof concepts.

### ETFs

Add exchange venue, order type, bid/ask, market hours, brokerage, partial fills, exchange settlement, and corporate-action events. Do not label exchange acceptance as settlement.

### Bonds

Add face value, coupon, yield, maturity, accrued interest, allocation, payment schedule, issuer events, and maturity/redemption proof.

### NPS

Add PRAN, contribution, allocation, lock-in, withdrawal, transaction acknowledgement, and CRA statement events while preserving account/consent/receipt patterns.

### PMS and AIF

Add accredited/suitability eligibility, capital calls, drawdowns, lock-in, valuation frequency, manager reporting, and restricted document access. These products require stronger permission and reporting boundaries.

### Global investments

Add market, local custodian, FX, foreign tax, local settlement cycle, time zone, and cross-border data policy metadata. Native currency and converted currency must remain distinct.

### Insurance-linked investments

Add policy, premium, illustration, allocation, surrender, protection, claim, and policy-document events. Do not collapse insurance protection state into investment performance.

### Architectural rule

Future products MUST declare an activity capability schema, source authority, lifecycle states, proof artifacts, permissions, tax context, and recovery paths before being added to O01-O04. Product-specific events may extend the model but cannot remove financial certainty, scope, audit, or source metadata.

# O01 - Activity Center

## 1. Purpose

Provide one operating workspace for all financial activity, attention items, status views, search, filters, sorting, and entry to detailed investigation.

## 2. User Goal

Find what happened, identify what needs attention, and open the correct activity without searching multiple modules.

## 3. Business Goal

Reduce support volume, duplicate actions, and abandonment by making activity state and recovery discoverable.

## 4. Entry Conditions

Authenticated session; entry from primary navigation, Home, Portfolio, notification deep link, receipt, support, or order completion. Scope may be investor, account, folio, household, or a notification-specific activity.

## 5. Exit Conditions

O02 detail, O03 proof, O04 downloads, Portfolio, Reports, Support, recovery action, or return to originating module with filter context preserved.

## 6. Layout Structure

Top to bottom: scope/context and freshness; attention/status summary; search; status views; active filters and sort; activity feed/list; load/empty/error state; download/proof entry; support/help.

## 7. Information Hierarchy

Security/compliance/action-required items first; then pending/unknown/recovery activity; then recent completed activity; then historical records and optional categories. Status and amount precede decorative metadata.

## 8. Components

Existing: App Shell, Page Header, Search Field, Tabs, Filter/Sort Controls, Activity List, Badge, Card, Alert, Loading, Empty, Error, Link, Button.

New: Activity Summary Row, Activity Feed Item, Attention Queue, Activity Scope Selector, Correlation Marker, Activity Freshness Row, Status View Counter.

## 9. States

First visit, returning user, no activity, attention required, pending, delayed, completed, failed, rejected, cancelled, partial, refunding, refunded, unknown outcome, loading, pagination loading, offline, stale, source unavailable, restricted scope, suspended, and notification deep-link context.

## 10. Validation

Scope, filters, sort fields, pagination cursors, search terms, and status views are validated server-side. Restricted records are not revealed through counts, timing, or search behavior. Date and amount filters use explicit timezone/currency.

## 11. Error Handling

Distinguish no activity, no matching activity, source unavailable, stale data, restricted scope, and network failure. Preserve search/filter state for retry. Never replace unknown activity with an empty list.

## 12. Recovery

Refresh, clear filters, retry source query, open O02, start safe recovery, open O03/O04 proof, or create a support case. Unsafe financial actions are not offered in the feed.

## 13. Accessibility

Feed is a semantic list with stable item names. Status counters announce changes. Filters and sort have labelled state, current selection, clear action, and predictable focus. No activity is conveyed by colour alone.

## 14. Analytics

`o01_viewed`, `activity_scope_changed`, `activity_status_viewed`, `activity_search_submitted`, `activity_filter_applied`, `activity_sort_changed`, `activity_item_opened`, `activity_attention_opened`, `activity_feed_refreshed`, `activity_empty_viewed`, `activity_restriction_viewed`.

## 15. Engineering Notes

O01 consumes an activity projection service backed by correlated domain events. The API returns source freshness, scope, current projection state, underlying state references, allowed actions, and next cursor. It must support deep-link filtering without exposing unauthorized records.

## 16. Acceptance Criteria

- User can distinguish complete, pending, failed, rejected, refunded, partial, and unknown activity.
- Action-required items are discoverable above passive history.
- Search/filter/sort never bypass entitlements.
- Empty, offline, stale, restricted, and source-unavailable states are distinct.
- Notification deep links open the correct scoped activity or a safe explanation.

# O02 - Activity Detail

## 1. Purpose

Provide the authoritative investigation surface for one correlated activity and its payment, order, execution, settlement, refund, mandate, portfolio, support, and audit-safe context.

## 2. User Goal

Understand the full lifecycle, what is final or uncertain, and what action is safe now.

## 3. Business Goal

Reduce duplicate actions and enable self-service resolution of complex asynchronous outcomes.

## 4. Entry Conditions

Activity ID from O01, notification, Home, Portfolio, receipt, report, or support. Viewer must have resource-scoped access.

## 5. Exit Conditions

O03 proof, O04 download, Portfolio/Reports, recovery action, cancellation if allowed, support, or return to O01.

## 6. Layout Structure

Top to bottom: current state/certainty; product/action/amount/account; attention or restriction notice; activity timeline; payment timeline; settlement/portfolio timeline; refund/mandate/composite leg detail; available actions; proof/support.

## 7. Information Hierarchy

Current state and money certainty first. Account, product, amount, and ownership second. Domain timelines and dependencies third. Internal references and audit-safe metadata last.

## 8. Components

Existing: Page Header, Badge, Card, Timeline, Table, Alert, Button, Link, Loading, Error, Dialog.

New: Money Certainty Block, Correlated Activity Header, Payment Timeline, Settlement Timeline, Refund Tracking Card, Composite Leg Group, Recovery Decision Panel, Activity Source Metadata.

## 9. States

Loading, complete, pending, delayed, failed, rejected, cancelled, partial, refund pending, refunded, unknown outcome, reconciliation required, stale, restricted, suspended, amended, source conflict, and offline last-known view.

## 10. Validation

Activity detail is resolved by stable ID and current scope. Timeline events require source, timestamp, state, and correlation. Actions are evaluated against current entitlement, not historical action availability.

## 11. Error Handling

If one domain source fails, show the available domains and identify the missing source. If correlation conflicts exist, show reconciliation required rather than merging incompatible records.

## 12. Recovery

Refresh, wait, cancel if permitted, safe retry, track refund, download proof, or open support/Finance/Operations case. No action may be enabled if side-effect uncertainty remains.

## 13. Accessibility

Timelines are semantic lists with current-event announcements, source/time labels, and linear alternatives. Composite legs expose parent/child relationships. Action consequences and disabled reasons are accessible.

## 14. Analytics

`o02_viewed`, `activity_timeline_opened`, `payment_timeline_opened`, `settlement_timeline_opened`, `refund_tracking_opened`, `activity_source_viewed`, `activity_recovery_started`, `activity_cancel_started`, `activity_support_selected`, `activity_proof_opened`.

## 15. Engineering Notes

O02 is a projection over source ledgers. It must expose source/version/freshness metadata, preserve late callback lineage, and use optimistic concurrency for cancellation or recovery actions.

## 16. Acceptance Criteria

- Payment, order, execution, settlement, refund, and Portfolio states remain distinct.
- Unknown outcome explicitly prevents duplicate action.
- Composite instructions show leg-level outcomes.
- Timeline corrections preserve history.
- User can always identify the safe next action or that no action is required.

# O03 - Receipt & Proof

## 1. Purpose

Provide confirmed receipts, statements, transaction confirmations, refund proof, mandate evidence, and other authoritative artifacts linked to an activity.

## 2. User Goal

View, verify, download, or share proof of a completed or appropriately documented financial event.

## 3. Business Goal

Reduce proof-related support, strengthen auditability, and provide durable customer evidence without overstating finality.

## 4. Entry Conditions

Artifact exists or generation is requested from O02, O01, notification, Portfolio, Reports, or Download Centre. Viewer has resource and export permission.

## 5. Exit Conditions

Back to detail/activity, secure download, share where permitted, O04 generation history, Portfolio/Reports, or support.

## 6. Layout Structure

Top to bottom: artifact status/finality; activity identity; receipt content; source and generation metadata; amendment/version history; download/share controls; security/expiry notice; support.

## 7. Information Hierarchy

Artifact type and finality first; underlying activity and financial result second; source/version/date third; download/share controls fourth.

## 8. Components

Existing: Document Viewer, Card, Badge, Table, Button, Link, Alert, Secure Download.

New: Proof Type Badge, Artifact Finality Block, Version Lineage, Secure Share/Download Status, Receipt Metadata Block.

## 9. States

Final receipt, provisional receipt, amended receipt, generated, generating, unavailable, expired link, restricted download, offline cached artifact, corrupted artifact, revoked artifact, and source correction.

## 10. Validation

Artifact type must match authoritative outcome. Download and share require current entitlement, valid link, scope, audit record, and retention policy. A provisional receipt cannot be presented as final.

## 11. Error Handling

Separate artifact generation failure, expired link, permission restriction, source unavailable, and corrupted file. Preserve the underlying activity result even if document generation fails.

## 12. Recovery

Regenerate, request a new secure link, open O04, view web alternative, or contact support. Do not create a new financial activity to regenerate proof.

## 13. Accessibility

Document viewer and downloads have semantic headings, table structure, readable filenames, accessible status, keyboard controls, and web fallback where possible.

## 14. Analytics

`o03_viewed`, `proof_type_viewed`, `proof_version_viewed`, `proof_download_started`, `proof_download_completed`, `proof_share_started`, `proof_link_expired`, `proof_generation_requested`, `proof_support_selected`.

## 15. Engineering Notes

Artifacts are generated from immutable source snapshots, template/version metadata, policy versions, and hashes. Secure links expire independently of artifact retention. All access is audited.

## 16. Acceptance Criteria

- Proof type and finality are explicit.
- Artifact does not claim settlement when only order acceptance exists.
- Download/share is scoped, secure, expiring, and audited.
- Amended artifacts preserve lineage and previous references.

# O04 - Download Centre

## 1. Purpose

Manage generated, queued, failed, expired, downloaded, and revoked financial artifacts and reports.

## 2. User Goal

Find proof or reports, understand their generation/download state, and retrieve them securely.

## 3. Business Goal

Centralize artifact delivery, reduce repeated generation, and satisfy audit, privacy, retention, and secure-access requirements.

## 4. Entry Conditions

Authenticated user with permitted report/proof requests, from O01/O02/O03, Reports, Portfolio, notification, or support.

## 5. Exit Conditions

O03 artifact viewer, secure download, regenerate request, delete/request removal where legally allowed, or support.

## 6. Layout Structure

Top to bottom: scope and document filters; active generation jobs; ready artifacts; expired/failed/revoked history; search/sort; artifact metadata; secure actions; retention/help.

## 7. Information Hierarchy

Action-required generation/download states first; ready proof second; expired/failed history third; metadata and retention explanation fourth.

## 8. Components

Existing: Search, Filter, Sort, List, Badge, Card, Progress, Button, Link, Empty, Error, Dialog.

New: Download Job Row, Artifact Status Row, Expiry/Retention Notice, Secure Download Action, Generation Retry Control.

## 9. States

No artifacts, generating, queued, ready, downloaded, failed, expired, revoked, restricted, offline metadata-only, source unavailable, rate-limited, and suspended account.

## 10. Validation

Artifact requests require scope, report/proof type, period, source availability, consent/permission, and rate-limit validation. File generation is idempotent by request fingerprint.

## 11. Error Handling

Differentiate generation failure, source failure, link expiry, permission restriction, rate limit, and retention deletion. Do not imply the underlying activity was deleted when only the artifact expired.

## 12. Recovery

Retry generation, open web alternative, request a fresh link, narrow scope/period, wait for queued generation, or contact support.

## 13. Accessibility

Rows expose document name, type, scope, state, last updated, expiry, and action. Progress is announced. Download failures retain a keyboard-accessible retry and explanation.

## 14. Analytics

`o04_viewed`, `download_job_created`, `download_job_queued`, `download_job_ready`, `download_job_failed`, `download_started`, `download_completed`, `download_link_expired`, `download_regenerated`, `download_restricted`.

## 15. Engineering Notes

Use a secure artifact service with scoped URLs, expiry, encryption, malware scanning, retention/legal hold, rate limits, audit, and revocation. Large files are asynchronous jobs and must be resumable/retryable.

## 16. Acceptance Criteria

- User can distinguish generation, ready, downloaded, expired, failed, and revoked.
- Artifact expiry does not erase the underlying record.
- Duplicate generation is prevented where the same source/version already exists.
- Secure access, retention, and audit rules are enforced.

## 10. Orders UX Pattern Library

| Pattern | Purpose | Required behavior |
|---|---|---|
| Attention First | Surface items requiring action | Sort by urgency and financial uncertainty before passive history |
| State With Meaning | Explain current activity state | State, meaning, owner, next action, SLA, last updated |
| Money Certainty | Separate known, pending, and unknown | Confirmed, pending, unknown, reconciled, refunded |
| Correlated Activity | Connect order/payment/settlement records | Show relationships without flattening source truth |
| Timeline With Source | Explain asynchronous progression | Source, timestamp, event, state, correction marker |
| Safe Retry | Prevent duplicate money movement | Retry eligibility and idempotency status before action |
| Recovery Handoff | Route unresolved work | Case reference, owner, SLA, context, next update |
| Proof Near Outcome | Make authoritative evidence easy to find | Receipt type, finality, version, secure access |
| Scope Before History | Prevent family/account confusion | Investor/account/folio/household scope visible |
| Deep-Link Continuity | Preserve context from notification | Open precise activity, fallback safely if inaccessible |
| Filter Transparency | Make result set explainable | Active filter, count, clear/reset, timezone/currency |
| Correction Lineage | Preserve trustworthy history | Original, corrected/amended, effective time, source |

## 11. Timeline Design Principles

1. A timeline is a sequence of authoritative events, not a progress animation.
2. Event order uses event time and effective time where they differ.
3. Late callbacks and corrections are visible as events, not silent reorderings.
4. Each event identifies the domain source at a safe level.
5. A pending event states what is waiting and who owns the next decision.
6. A timeline never implies that later stages are complete because earlier stages are complete.
7. Composite instructions show parent and child legs.
8. Reversal, refund, cancellation, and amendment are linked to the event they changed.
9. Timestamps include timezone and locale rules.
10. Timelines support text/list alternatives, keyboard navigation, and incremental announcements.

## 12. Activity Feed Principles

- Activity feed is task-oriented before chronology-oriented.
- Status and financial certainty precede event recency.
- A single user action may be one grouped activity with multiple domain records.
- Grouping is reversible: users can inspect the underlying payment, order, execution, and settlement records.
- Grouping must never hide a partial, rejected, reversed, refund, or unknown leg.
- Completed history remains searchable after action availability expires.
- Notification deep links open the relevant group and state, not an unrelated generic list.
- Attention counts are scoped and explain what contributes to the count.

## 13. Transaction Component Inventory

Reusability score: 5 is platform-wide; 1 is Activity Center-specific.

| Component | Purpose | Existing or New | Variants | States | Dependencies | Reusability |
|---|---|---|---|---|---|---:|
| Activity Summary Row | Summarize one grouped activity | New | Order, payment, refund, mandate, report | Current, pending, partial, failed | Activity projection | 5 |
| Attention Queue | Surface action-required items | New | Payment, recovery, compliance, proof | Empty, active, delayed | Entitlement, support, state | 5 |
| Activity Scope Selector | Switch investor/account/folio/household scope | Existing pattern, extend | Investor, account, folio, household | Loading, selected, restricted | Permission, consent | 5 |
| Activity Status Badge | Show projection state | Existing, extend | Pending, completed, failed, unknown | Current, stale, restricted | State dictionary | 5 |
| Money Certainty Block | Explain whether money moved | New | Confirmed, pending, unknown, refunded | Known, unresolved, reconciled | Payment/order/refund | 5 |
| Correlation Marker | Link related records | New | Parent/child, source/derived | Linked, partial, conflict | Correlation service | 5 |
| Activity Timeline | Show material lifecycle events | Existing, extend | Order, payment, settlement, refund | Loading, current, corrected | Event projection | 5 |
| Payment Timeline | Show payment-specific states | New | One-time, mandate, installment | Pending, success, failure, refund | Payment ledger | 5 |
| Settlement Timeline | Show execution/settlement/Portfolio impact | New | Purchase, redemption, switch | Accepted, partial, settled, delayed | Execution, RTA, Portfolio | 5 |
| Refund Tracking Card | Show return-of-funds lifecycle | New | Payment, rejected order, partial | Pending, sent, completed, unknown | Finance/refund | 5 |
| Composite Leg Group | Show switch/STP/SWP parent-child outcomes | New | Source/target, recurring leg | Pending, partial, failed, complete | Order legs | 5 |
| Recovery Decision Panel | Offer safe next action | New | Retry, wait, cancel, support | Allowed, blocked, processing | Entitlement/reconciliation | 5 |
| Receipt Link | Open proof artifact | Existing, extend | Receipt, statement, refund proof | Ready, generating, expired | Document/artifact | 5 |
| Download Job Row | Track asynchronous artifact generation | New | Report, receipt, export | Queued, ready, failed, expired | Artifact service | 5 |
| Search Field | Find activity by permitted terms | Existing, extend | Fund, order, reference, case | Idle, searching, invalid | Activity index | 5 |
| Filter Panel | Narrow activity | Existing, extend | Status, type, date, amount, account | Applied, conflict, unavailable | Activity index, permissions | 5 |
| Sort Control | Change result order | Existing, extend | Recent, amount, attention, status | Selected, unavailable | Activity projection | 4 |
| Freshness Row | Show last updated/source quality | New | Feed, payment, report, artifact | Fresh, stale, unavailable | Data quality | 5 |
| Support Context Bundle | Create a safe case with context | Existing cross-module pattern | Payment, order, refund, download | Created, restricted, failed | Support, audit | 5 |
| Notification Deep-Link Resolver | Open scoped activity from notification | New | Order, payment, refund, report | Resolved, expired, restricted | Notification, session, entitlement | 5 |
| Audit-Safe Metadata Block | Show non-sensitive references | Existing, extend | Order, provider, report | Visible, restricted | Audit/reference service | 4 |

## 14. Receipt & Download Architecture

### Artifact classes

| Artifact | Finality | Source | Use |
|---|---|---|---|
| Order acknowledgement | Submitted/accepted, not settlement | Order service | Prove instruction receipt |
| Payment confirmation | Payment ledger | Payment service | Prove payment result |
| Settlement confirmation | Execution/RTA/ledger | Settlement service | Prove settled outcome |
| Redemption/payout proof | Finance/payout ledger | Finance service | Prove payout/refund result |
| Mandate confirmation | Mandate service | Mandate provider | Prove recurring debit authority |
| Tax/report artifact | Report/tax service | Versioned source snapshots | Provisional or final reporting |
| Amended artifact | Correction/amendment lineage | Owning service | Replace prior interpretation without deleting history |

### Artifact lifecycle

`REQUESTED -> QUEUED -> GENERATING -> READY_PROVISIONAL -> READY_FINAL -> DOWNLOADED -> EXPIRED`

Alternative terminal or corrective states: `FAILED`, `RESTRICTED`, `REVOKED`, `AMENDED`, `DELETED_PER_POLICY`.

### Download rules

- Secure links are scoped, expiring, encrypted, and audited.
- Artifact expiry does not mean underlying activity expiry.
- Regeneration uses source/version fingerprint and is idempotent.
- Large exports are asynchronous jobs.
- File scanning and content-type validation occur before release.
- Legal hold and retention rules override user deletion requests.
- Download and share permissions are stronger than view permissions.
- Filenames must identify type, scope, period, and version without exposing unnecessary PII.

## 15. Search, Filters, and Sorting Strategy

### Search

Search supports fund/issuer, activity type, order reference, payment reference, case reference, and permitted amount/date text. Raw bank credentials, PAN, OTP, and internal identifiers are never searchable by customers.

### Filters

Filters include activity type, status, action, account/folio, date range, amount range, currency, attention required, and proof availability. Filters are scoped to permission and current data availability.

### Sorting

Defaults prioritize attention and current activity, then recent effective activity. User-sortable fields include date, amount, status, and type. Sorting never changes the underlying state or hides exceptions.

### Status views

Recommended views: `Needs attention`, `In progress`, `Completed`, `Failed/Rejected`, `Refunds`, `Proof available`, and `All activity`. Counts are server-authoritative and scope-aware.

### Saved searches

Saved searches are optional and authenticated. They store filter taxonomy/version, scope, timezone, and last refresh. They do not guarantee that future matching activity remains visible or eligible.

### Recent searches

Recent searches are private, deletable, and not used as personalization without consent. Sensitive free-text search may be excluded from analytics.

## 16. Notification Deep-Link Strategy

1. Notification contains a non-sensitive activity reference and deep-link context.
2. Resolver checks authentication, session/device, resource scope, consent, and current entitlement.
3. If accessible, open O02 with the correct activity and state.
4. If expired or inaccessible, open a safe scoped explanation or O01 filtered view.
5. If the activity is deleted under retention policy, show a support-safe reference rather than a blank page.
6. Notification delivery or click never changes activity state.

## 17. Cross-Module Dependencies

| Need | Authoritative service | Required metadata |
|---|---|---|
| Activity grouping | Activity projection/event service | Correlation, source, state, scope, version |
| Order status | Order service | Order state, leg states, idempotency, current action |
| Payment status | Payment ledger | Payment state, provider ref, certainty, refund link |
| Settlement | Execution/RTA/settlement | Acceptance, settlement, partial, correction, source |
| Portfolio impact | Portfolio data service | Snapshot, freshness, reconciliation, scope |
| Eligibility/action | Entitlement service | Decision, policy version, expiry, required action |
| User scope | Identity/relationship/permission | Party, account, folio, household, consent |
| Proof | Artifact/report/document service | Type, finality, source snapshot, hash, expiry |
| Notifications | Notification service | Template, channel, delivery state, deep-link reference |
| Recovery | Support/Operations/Finance | Case, owner, SLA, safe context, resolution |
| Tax | Tax/report service | Estimate/final, rule version, source, amendment lineage |

## 18. Audit and Compliance Requirements

The system MUST audit:

- Activity view where required by sensitive-data policy.
- Scope switches and permission checks.
- Search/export/download/share actions.
- Status changes, late callbacks, corrections, reversals, refunds, and amendments.
- Recovery actions, retries, cancellations, and support handoffs.
- Human access, maker-checker, override, reconciliation, and case decisions.
- Artifact generation, release, expiry, revocation, and deletion under policy.
- Notification deep-link resolution and blocked access.
- Policy, consent, tax, and document versions used in a displayed result.

Customer-facing history may be a safe subset of regulator-facing audit. Audit access is itself audited.

## 19. Independent Principal Product Review

### Missing states

- `SOURCE_CONFLICT` when payment/order/RTA records disagree.
- `ACTIVITY_GROUP_PARTIAL` when correlated records cannot all be resolved.
- `PROOF_NOT_YET_AVAILABLE` after a completed activity.
- `RECEIPT_AMENDED` after source correction.
- `DEEP_LINK_EXPIRED` and `DEEP_LINK_SCOPE_CHANGED`.
- `ACCOUNT_SCOPE_CHANGED` after household/mandate/consent update.
- `HISTORICAL_ONLY` for records whose current action is unavailable.
- `RETENTION_RESTRICTED` for artifacts under legal hold or retention rules.
- `EXPORT_RATE_LIMITED` and `EXPORT_CANCELLED`.

### Missing financial events

- Fee/charge adjustment after initial order acknowledgement.
- Tax/TDS correction after receipt issuance.
- Late settlement callback.
- Reversal after apparent settlement.
- Partial refund or refund mismatch.
- Corporate-action adjustment to units or cost basis.
- Mandate bounce and reactivation.
- Payout bank rejection after redemption acceptance.
- Portfolio update delayed after settlement.
- Duplicate order/payment detected during reconciliation.

### Missing recovery flows

- User sees payment success but no order record.
- User sees order accepted but no portfolio update.
- User sees completed order but proof unavailable.
- User has two activity records with the same payment reference.
- Download generation fails after a report is otherwise ready.
- Notification deep link points to an activity the user no longer has permission to view.
- Activity is amended after the user downloaded an earlier receipt.

### Missing reusable components

`SourceConflictBanner`, `ActivityGroupPartialState`, `HistoricalOnlyBadge`, `ProofAvailabilityState`, `DeepLinkResolverState`, `ScopeChangeNotice`, `ArtifactLineage`, `ExportRateLimitNotice`, and `ReconciliationOwnerBlock` should be platform primitives.

### Missing compliance scenarios

- Export or download after a consent withdrawal.
- Household member accesses an activity after relationship revocation.
- Tax artifact generated under an expired or superseded tax policy.
- Redemption activity visible during death claim/legal hold.
- PEP/sanctions hold changes which activity details may be shown.
- Customer requests deletion while financial/audit retention applies.
- Cross-border data export and document access from an unsupported country.

### Missing audit requirements

- Record the exact filter/scope used for an export.
- Record artifact source snapshot and calculation version.
- Record notification deep-link authorization result.
- Record redaction/masking policy used in internal and customer views.
- Record source conflict resolution and correction lineage.

### Principal review decision

The four-screen architecture remains the minimum viable enterprise architecture. The material improvement is to make the Activity Center an event-correlated projection with explicit financial certainty, artifact lineage, scope, and source conflict states. No separate payment history, refund screen, settlement screen, or notification history screen is required.

## 20. Implementation Readiness Gates

Before high-fidelity design and engineering commitment:

- Freeze activity event schema and correlation keys.
- Define projection grouping and conflict resolution rules.
- Approve status vocabulary and customer-safe reason taxonomy.
- Validate source ownership and freshness/SLA for each domain.
- Define secure artifact, retention, legal hold, and export policy.
- Test notification deep links across logged-out, expired-session, revoked-device, and changed-scope cases.
- Build state fixtures for pending, unknown, partial, rejected, refunded, reversed, amended, and source-conflict states.
- Validate O01/O02 comprehension with NRI users and support/operations teams.
- Complete accessible timeline, filter, table, artifact, and focus behavior tests.

## 21. Architectural Decisions

1. Use four screens: Activity Center, Activity Detail, Receipt & Proof, and Download Centre.
2. Treat O01 as an operating center, not a chronological order-history list.
3. Group correlated activity while preserving payment, order, execution, settlement, refund, mandate, and Portfolio truth.
4. Use O02 for payment, settlement, refund, cancellation, and recovery timelines.
5. Make financial certainty and source freshness explicit.
6. Keep completed, pending, failed, rejected, partial, refunded, reversed, amended, and unknown states distinct.
7. Treat proof as versioned evidence with finality and lineage.
8. Make search, filters, sorting, status views, and notification deep links variants of the four screens.
9. Use resource-scoped entitlements for investor, joint holder, household, RM, Support, Finance, Tax, Operations, and Compliance roles.
10. Do not create new customer-facing modules for payment history, refund tracking, settlement tracking, or notification history.

## 22. Assumptions

- The locked Order, Payment, Refund, Portfolio Data, Report, Notification, Consent, and Entitlement state machines are available to the Activity projection.
- Domain services expose stable identifiers, event timestamps, source metadata, and replay/reconciliation support.
- Users may have multiple account, folio, household, and currency scopes.
- Download and export permissions are stronger than view permissions.
- Activity data may be partially available and must expose freshness/finality.
- Future asset classes will declare capability and activity schemas rather than inherit unsupported mutual-fund semantics.

## 23. Risks

- Incorrect grouping can make separate financial events appear to be one outcome.
- Stale or conflicting sources can create false completion or false failure.
- Broad household views can expose activity without correct consent.
- Download artifacts can leak sensitive financial and tax information.
- Excessive status detail can increase anxiety without improving actionability.
- Missing refund or reversal events can make the activity center financially misleading.
- Notification deep links can bypass scope/security checks if treated as trusted navigation.
- Large exports can create performance, privacy, and retention issues.
- Future product activity may not fit mutual-fund-centric labels.

## 24. Open Questions

- What is the canonical grouping rule for instruction, order, payment, transaction, and settlement?
- Which event source wins when RTA, execution, payment, and internal records conflict?
- Which activity states are visible to nominees, joint holders, RMs, Support, Finance, Tax, and Operations?
- What is the approved freshness threshold for each activity domain?
- Which artifacts are provisional versus final, and who owns finality?
- What are the retention and legal-hold rules for receipts, reports, exports, and customer search history?
- Are users allowed to export household activity, and how is each resource disclosed?
- What export formats, size limits, rate limits, and async generation SLAs are required?
- How are amended tax reports and corrected receipts communicated?
- What is the customer-safe reason taxonomy for rejection, suspension, refund delay, and reconciliation?
- Which notification deep-link states should fall back to O01 versus O02 or Support?
- What support SLA applies to unknown payment/order outcomes?

## 25. Recommendations for the Next Module

1. Define the first Orders implementation around the existing Investment Journey purchase flow and complete payment/order/reconciliation states.
2. Create a canonical activity event and correlation fixture library for QA, analytics, support, and Claude Code implementation.
3. Reuse `MoneyCertainty`, `OrderStatusTracker`, `PaymentTimeline`, `SettlementTimeline`, `RefundTracking`, `SafeRetry`, `ArtifactLineage`, and `SupportContextBundle` across future modules.
4. Run an operational simulation for gateway timeout, duplicate payment, late callback, refund delay, settlement delay, and source conflict.
5. Validate O02 and O04 with NRI users who need proof for tax, employer, family, or bank records.
6. Implement secure artifact and notification deep-link contracts before adding advanced asset-class activity.
