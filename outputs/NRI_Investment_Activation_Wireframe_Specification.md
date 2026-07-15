# NRI Investment Activation
## Wireframe Specification

**Role:** Principal UX Design Lead  
**Status:** Extension of Authentication & Identity v1.0 and Onboarding & Regulatory v1.0  
**Scope:** Investment Activation screens C01-C12 only  
**Specification contract:** This document preserves the approved UX philosophy, interaction philosophy, validation philosophy, accessibility principles, analytics conventions, acceptance-criteria style, writing style, documentation structure, and shared behavior contract from the locked Authentication and Onboarding specifications.  
**Constraint:** This is a behavioral and structural specification, not a visual design. It intentionally excludes colour, typography, pixel measurements, and visual wireframes.

## 0. Scope and Shared Rules

### Included screens

| ID | Screen | Primary responsibility |
|---|---|---|
| C01 | Activation Overview | Explain the activation journey, current status, dependencies, and next action |
| C02 | KYC In Progress | Show that KYC is being processed and what the user should expect |
| C03 | KYC Approved | Confirm KYC approval and expose the next activation dependency |
| C04 | NSE/BSE Client Creation | Initiate or show exchange-client creation |
| C05 | NSE/BSE Pending | Show exchange-client creation pending state |
| C06 | NSE/BSE Failed | Explain exchange-client creation failure and recovery |
| C07 | Penny Drop Verification | Verify the selected bank account through the approved penny-drop method |
| C08 | Bank Verification Failed | Explain bank-verification failure and recovery |
| C09 | Investor Ready | Confirm the user is investment-ready and expose permitted next actions |
| C10 | Explore While We Activate | Let the user safely explore permitted information while activation is incomplete |
| C11 | Activation Delayed | Explain an activation delay that exceeds the expected operational window |
| C12 | Contact RM / Support | Provide human help with activation context and ownership |

### Non-goals

- Do not design fund discovery, fund details, compare, SIP, lumpsum, redemption, switch, STP, SWP, portfolio, or order screens.
- Do not represent “activation started” as “investor ready.”
- Do not treat KYC approval, exchange-client creation, bank verification, and investor readiness as one status.
- Do not expose internal provider diagnostics, fraud signals, reviewer notes, or exchange error payloads.
- Do not allow exploration to bypass an activation, suitability, bank, or compliance restriction.

### Shared behavior contract inherited from locked specifications

- Every asynchronous action has explicit loading, timeout, retry, failure, and completion behavior.
- Sensitive values are masked by default. Bank data, client identifiers, KYC evidence, and provider references are never sent to analytics as raw values.
- Every regulatory decision, activation dependency, bank verification, exchange-client action, user contact, and outcome is audit logged with actor, timestamp, session/device context, correlation ID, policy version, and outcome.
- All retry actions are idempotent. A retry must not create a duplicate KYC case, exchange client, bank verification, notification, support case, or activation record.
- Rate limits, cooldowns, attempt counts, lockouts, and operational SLAs are server-authoritative.
- Users can leave and resume an activation case without losing accepted evidence or status history, subject to policy expiry.
- Offline behavior must not imply that a server-side action succeeded.
- “Pending” means processing is still active or awaiting an external dependency. “Delayed” means the pending condition has exceeded the expected operational window. “Failed” means the authoritative process outcome is unsuccessful. “Approved” means only the specific dependency has completed successfully.
- A user must always know what is happening, why it is happening, whether action is required, and what the next expected step is.
- No screen may be a dead end. Every blocked or unresolved state has a safe return, retry, status, or human-support path.

### Existing design-system references

Existing components used throughout: App Shell, Page Header, Step Indicator, Progress Indicator, Card, Button, Link, Alert/Banner, Inline Message, Dialog, Bottom Sheet, Modal, Toast/Snackbar, Tooltip, Empty State, Loading Skeleton, Error State, Timeline, Badge/Status Chip, Masked Field, Select, Text Field, Secure Link/Share, Audit Metadata Block, Table/Data Table.

### New components introduced only where required

- **Activation Dependency Map:** Required to show multiple independent activation dependencies without collapsing them into one misleading progress bar.
- **Activation Status Block:** Required to state current status, reason, action required, and next expected step consistently across C01-C12.
- **Dependency Status Row:** Required to express each dependency’s independent state and deep link to its responsible screen.
- **Activation ETA/SLA Summary:** Required to distinguish a normal pending window from a delayed state without inventing a time.
- **Explore Guardrail Panel:** Required to explain which information is available while activation is incomplete and prevent bypass assumptions.
- **Human Ownership Block:** Required on delayed or support states to show assigned team/channel when authoritative.

These are behavioral components only. Their visual treatment remains a design-system decision.

### Shared analytics conventions

Each event includes `screen_id`, `session_id`, `correlation_id`, `user_state`, `country_context`, `device_id_hash`, and `policy_version` where permitted. Never send KYC evidence, bank account numbers, penny-drop values, exchange client IDs, raw failure payloads, or support conversation contents to analytics. Track dependency IDs, status categories, reason codes, and policy outcomes instead.

### Known unknowns requiring stakeholder confirmation

- KYC, exchange-client, bank-verification, and penny-drop vendors are UNKNOWN.
- Exact activation dependency ordering and parallelism are UNKNOWN.
- Exact normal processing windows, delayed thresholds, notification channels, and team SLAs are UNKNOWN.
- Whether users may explore all product information or only a restricted subset while activating is UNKNOWN.
- Exact investor-ready entitlement and exchange-client activation rules are UNKNOWN.

---

# C01 – Activation Overview

## 1. Screen Purpose
Orient a completed-onboarding user to the investment activation journey, show each independent dependency, and provide a reliable next action.

## 2. User Goal
Understand what is complete, what is still processing, why activation is needed, whether any action is required, and what happens next.

## 3. Business Goal
Reduce uncertainty and support contacts, prevent premature investment attempts, and provide one authoritative entry point for activation status.

## 4. Entry Conditions

- B18 onboarding success or B19 case state permits activation visibility.
- The user has an activation case or the server can create/resume one idempotently.

## 5. Exit Conditions

- Completed dependencies deep-link to their status/details.
- Pending KYC opens C02; approved KYC opens C03; exchange creation opens C04/C05/C06; bank verification opens C07/C08.
- Investor-ready state opens C09.
- Exploration opens C10 only if policy permits.
- Delay or uncertainty opens C11/C12.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit, help, and status refresh access.
2. Activation Status Block stating the current overall activation state.
3. Activation Dependency Map with independent Dependency Status Rows for KYC, exchange client, bank verification, and any other server-defined dependency.
4. Activation ETA/SLA Summary with last updated time and expected next step when authoritative.
5. Primary CTA for the current required action, if any.
6. Secondary actions: Explore while activating, refresh status, contact RM/support.
7. Reference/case information.
8. Footer with privacy and regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Timeline, Button, Link, Alert/Banner, Loading Skeleton, Error State, Audit Metadata Block.
- New: Activation Dependency Map, Activation Status Block, Dependency Status Row, Activation ETA/SLA Summary. These are required to prevent one aggregate status from hiding independent activation outcomes.

## 8. Information Priority

1. Overall status and required action.
2. Dependency-by-dependency status.
3. Why processing is required and next expected step.
4. Explore/support options.

## 9. Interaction Behaviour

- **Tap:** Open dependency status, required action, explore, refresh, support, or safe exit.
- **Scroll:** Dependency list and explanation may scroll; current status and primary action remain discoverable.
- **Keyboard:** Rows, status details, and actions are keyboard accessible.
- **Validation:** Activation case ownership and dependency status are server-authoritative.
- **Loading:** Case lookup and status refresh show progress; prevent duplicate activation creation.
- **Disabled:** Actions are disabled when the current state does not permit them.
- **Retry:** Refresh/case creation is idempotent.
- **Timeout:** Show last-known status with a stale timestamp and offer retry/support; never guess success.

## 10. All Screen States

- **Default:** Activation dependency map and current status available.
- **Loading:** Activation case or dependencies loading.
- **Empty:** No activation case found; offer safe case creation or support, never fabricate readiness.
- **Success:** Activation case created/resumed; show dependency statuses.
- **Error:** Case/status service failed; preserve last known state and retry.
- **Offline:** Cached status is read-only and marked stale; server actions disabled.
- **Restricted:** Activation or a dependency is not available under policy.
- **Suspended:** Activation held by compliance, operations, fraud, or security with human route.

## 11. Validation Rules

- Overall status is derived from independent server states, not client-side aggregation.
- A dependency may be approved while the overall activation remains pending.
- Investor Ready is shown only when every blocking dependency is approved.
- Deep links must preserve the same activation case.

## 12. Error Behaviour

Distinguish pending, delayed, failed, restricted, and unavailable states. Show a concrete next action or human route for each.

## 13. Success Behaviour

Confirm only the current activation state and route to the next permitted step. Do not label the user investor-ready prematurely.

## 14. Motion Recommendation

Use restrained dependency/status transitions. Do not animate an aggregate progress bar in a way that hides a blocked dependency.

## 15. Accessibility

- Dependency rows have semantic status, reason, action, and next-step labels.
- Overall status is announced on refresh.
- Status is text-based and not dependent on colour.
- Focus returns to the updated row after refresh.

## 16. Analytics Events

`c01_viewed`, `activation_case_loaded`, `activation_case_created`, `activation_dependency_opened`, `activation_status_refreshed`, `activation_status_refresh_failed`, `explore_selected`, `activation_support_selected`, `activation_delayed_shown`, `activation_restricted_shown`.

## 17. Engineering Notes

- Activation state must be a server-authoritative state machine with dependency-level statuses.
- Use correlation IDs across KYC, exchange, bank, operations, and support services.
- Status aggregation must be deterministic and versioned.

## 18. Acceptance Criteria

- User can see what is happening, why, whether action is required, and the next step.
- Pending, delayed, failed, and approved are distinct.
- No dead-end state exists.
- Investor-ready cannot be shown before all blocking dependencies are approved.

## 19. UX Writing Guidance

Use plain status language and name the next step. Avoid “almost done” unless the service can substantiate it.

## 20. Design Notes

C01 is the activation control center. It should reduce ambiguity rather than compress every dependency into one generic progress indicator.

---

# C02 – KYC In Progress

## 1. Screen Purpose
Explain that KYC processing is active, identify the current reason for waiting, and show what the user should do next, if anything.

## 2. User Goal
Know that KYC is being processed, understand whether additional input is required, and avoid duplicate submission.

## 3. Business Goal
Reduce duplicate KYC attempts and support contacts while maintaining an auditable, compliant review process.

## 4. Entry Conditions

- Activation requires KYC processing and the KYC service returns a pending/in-progress state.
- Required onboarding evidence has been submitted or is under review.

## 5. Exit Conditions

- Approved state opens C03.
- More information required returns to the specific onboarding/evidence checkpoint.
- Delay opens C11; final failure routes to C12 or the approved recovery path.

## 6. Layout Structure

Top to bottom:

1. Header with back, refresh, and help.
2. Activation Status Block: KYC in progress.
3. Onboarding/KYC Timeline showing submitted, validation, review, and next expected step.
4. Activation ETA/SLA Summary with last updated and expected next update when authoritative.
5. Required-action section if more information is requested.
6. Primary CTA: Refresh status or provide requested information.
7. Secondary action: Explore while activating or contact support.
8. Footer with privacy/review disclosures.

## 7. Component Placement

- Existing: Page Header, Badge/Status Chip, Timeline, Card, Button, Link, Alert/Banner, Loading Skeleton, Error State.
- New: Activation Status Block and Activation ETA/SLA Summary. Reuse Onboarding Status Timeline behavior where appropriate.

## 8. Information Priority

1. KYC current status.
2. Whether action is required.
3. Last update and next expected step.
4. Explore/support route.

## 9. Interaction Behaviour

- **Tap:** Refresh, provide requested information, explore, support, back.
- **Scroll:** Timeline/details may scroll; current status remains visible.
- **Keyboard:** All controls and timeline details accessible.
- **Validation:** Case ownership, status version, and required-action authorization server-side.
- **Loading:** Status refresh/polling visible; prevent repeated calls.
- **Disabled:** Required actions disabled when the case does not permit them.
- **Retry:** Refresh with backoff; no duplicate KYC request.
- **Timeout:** Show last-known status and stale timestamp.

## 10. All Screen States

- **Default:** KYC pending with timeline and next step.
- **Loading:** KYC status loading.
- **Empty:** No KYC case found; route to C01/support safely.
- **Success:** KYC approved; route to C03.
- **Error:** KYC status unavailable or conflicting.
- **Offline:** Last known status shown as stale; refresh disabled.
- **Restricted:** KYC details/action restricted by authorization or policy.
- **Suspended:** KYC held for compliance/security review.

## 11. Validation Rules

- Pending is returned by the KYC state machine; it is not inferred from missing data.
- More-information-required must identify the responsible checkpoint.
- Status refresh must use version/concurrency checks.

## 12. Error Behaviour

Distinguish normal pending, delayed, missing case, service error, and review hold. Do not call a delayed review a failure.

## 13. Success Behaviour

Confirm only KYC approval and route to C03. Do not claim overall investor readiness.

## 14. Motion Recommendation

Use restrained timeline updates and accessible refresh feedback. Avoid distracting polling animation.

## 15. Accessibility

- Timeline state and last update are announced.
- Required action is linked to the relevant control.
- Status and delay are not conveyed by colour alone.

## 16. Analytics Events

`c02_viewed`, `kyc_status_loaded`, `kyc_status_refreshed`, `kyc_status_refresh_failed`, `kyc_required_action_opened`, `kyc_approved`, `kyc_delayed`, `kyc_suspended`, `kyc_support_selected`.

## 17. Engineering Notes

- KYC provider, SLA, review states, and callback contract are UNKNOWN.
- KYC status must reconcile with onboarding and activation cases.
- Avoid polling without backoff or server-provided next-update guidance.

## 18. Acceptance Criteria

- User knows why KYC is pending, whether action is required, and the next step.
- KYC pending is never shown as failure or approval.
- No duplicate KYC submission is possible.

## 19. UX Writing Guidance

Use “KYC is being reviewed/processed” and provide the last update and next action when available. Avoid unsupported completion promises.

## 20. Design Notes

Waiting is the primary experience here. Status clarity and recoverability are more important than adding more information.

---

# C03 – KYC Approved

## 1. Screen Purpose
Confirm the KYC dependency is approved and explain which activation dependency is next.

## 2. User Goal
Understand what KYC approval means, what remains, and how to proceed.

## 3. Business Goal
Create confidence while preventing users from confusing KYC approval with investor readiness.

## 4. Entry Conditions

- KYC service returns an authoritative approved state for the current identity/case.

## 5. Exit Conditions

- Next dependency opens C04, C07, or C01 based on activation orchestration.
- User may open C10 if exploration is permitted.
- Status conflict routes to C01/C11 rather than showing contradictory success.

## 6. Layout Structure

Top to bottom:

1. Header and activation progress context.
2. Activation Status Block: KYC approved.
3. Explanation of what KYC approval confirms and does not confirm.
4. Dependency Status Row/Map showing remaining activation requirements.
5. Primary CTA: Continue activation.
6. Secondary actions: Explore while activating, refresh, contact support.
7. Reference/timestamp.
8. Footer with regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Button, Link, Audit Metadata Block.
- New: Activation Status Block and Dependency Status Row reused from C01.

## 8. Information Priority

1. KYC approval.
2. Remaining dependencies.
3. Next action and permitted exploration.

## 9. Interaction Behaviour

- **Tap:** Continue activation, open remaining dependency, explore, refresh, support.
- **Scroll:** Explanations/disclosures may scroll.
- **Keyboard:** All controls accessible.
- **Validation:** KYC approval and next dependency validated server-side.
- **Loading:** Next activation action may load independently.
- **Disabled:** Continue disabled if the next dependency is unresolved or activation case is stale.
- **Retry:** Refresh status idempotently.
- **Timeout:** Preserve KYC approval but mark next dependency unknown.

## 10. All Screen States

- **Default:** KYC approved and next dependency visible.
- **Loading:** KYC/activation status loading.
- **Empty:** No activation dependency state; route to C01/support.
- **Success:** KYC approval confirmed.
- **Error:** Status conflict or activation orchestration failure.
- **Offline:** Cached approval shown with timestamp; next action may be disabled.
- **Restricted:** KYC approved but activation continuation restricted.
- **Suspended:** Approval superseded by a later review/security hold.

## 11. Validation Rules

- KYC approval must be case-bound, current, and policy-versioned.
- Approval does not unlock investment unless all other blockers are approved.

## 12. Error Behaviour

If dependency status conflicts, show the last authoritative status and route to C01/C11/support.

## 13. Success Behaviour

Confirm only KYC approval and show the next activation dependency.

## 14. Motion Recommendation

Use restrained status confirmation and dependency reveal. Avoid a full journey-complete transition.

## 15. Accessibility

- Approval and remaining blockers are separately announced.
- Dependency rows have accessible action labels.

## 16. Analytics Events

`c03_viewed`, `kyc_approved_viewed`, `activation_next_dependency_opened`, `activation_continue_selected`, `activation_explore_selected`, `activation_status_conflict`, `c03_support_selected`.

## 17. Engineering Notes

- KYC approval event must propagate to the activation orchestrator idempotently.
- Do not grant investor-ready entitlement from the KYC event alone.

## 18. Acceptance Criteria

- KYC approval is distinct from investor readiness.
- Remaining dependencies and next action are visible.
- Status conflicts cannot produce a false success path.

## 19. UX Writing Guidance

Say “KYC approved” and explicitly state what still needs to happen before investing.

## 20. Design Notes

This is a milestone, not the finish line. The wireframe must preserve that mental model.

---

# C04 – NSE/BSE Client Creation

## 1. Screen Purpose
Explain and initiate the permitted exchange-client creation process after prerequisite activation checks are approved.

## 2. User Goal
Understand why an exchange client is needed, what is being created, and whether any action is required.

## 3. Business Goal
Create a valid exchange-client record without duplicates and provide a clear handoff to pending/failed/ready states.

## 4. Entry Conditions

- KYC and required onboarding prerequisites are approved.
- Exchange creation is permitted for the account/country/context.

## 5. Exit Conditions

- Creation initiated opens C05 or returns C01 with pending state.
- Existing client opens C09/C01 based on readiness.
- Failure opens C06; restriction/delay opens C11/C12.

## 6. Layout Structure

Top to bottom:

1. Header and activation context.
2. Activation Status Block explaining exchange-client creation.
3. Exchange dependency Card with NSE/BSE scope and non-advisory explanation.
4. Account/identity summary with masked identifiers.
5. Primary CTA: Create exchange client or Continue.
6. Secondary actions: Explore, save/exit, support.
7. Processing/next-step explanation.
8. Footer with exchange/regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Button, Link, Alert/Banner, Loading/Error State.
- New: Reuse Activation Status Block and Dependency Status Row; no exchange-specific component required.

## 8. Information Priority

1. What client creation means.
2. Current eligibility/prerequisites.
3. Primary creation action and expected next state.

## 9. Interaction Behaviour

- **Tap:** Start/continue creation, review details, explore, support.
- **Scroll:** Explanations/disclosures may scroll.
- **Keyboard:** All actions accessible.
- **Validation:** Prerequisites and existing-client check server-side.
- **Loading:** Creation request pending; disable duplicate action.
- **Disabled:** Start disabled if prerequisites or policy are unresolved.
- **Retry:** Retry only when no active creation request exists.
- **Timeout:** Show C05/pending or unknown status after reconciliation; never initiate blindly again.

## 10. All Screen States

- **Default:** Creation action available.
- **Loading:** Existing-client lookup or creation request loading.
- **Empty:** No client exists; show creation action.
- **Success:** Creation request accepted; route to C05.
- **Error:** Prerequisite, duplicate, provider, or request failure.
- **Offline:** Creation disabled; cached prerequisite state may be shown stale.
- **Restricted:** Exchange-client creation not permitted.
- **Suspended:** Creation held by compliance/operations.

## 11. Validation Rules

- No duplicate exchange client for the same identity/account context.
- Creation must use the reviewed identity/account snapshot.
- Exchange scope and client state are server-authoritative.

## 12. Error Behaviour

Distinguish existing client, request pending, retryable provider error, policy restriction, and review hold. Do not expose exchange payloads.

## 13. Success Behaviour

Confirm only that creation was initiated/accepted and route to C05.

## 14. Motion Recommendation

Use a clear handoff into pending. Do not show a ready state before exchange confirmation.

## 15. Accessibility

- Exchange scope and state have text labels.
- Creation consequences and status changes are announced.

## 16. Analytics Events

`c04_viewed`, `exchange_client_lookup_started`, `exchange_client_existing_found`, `exchange_client_creation_started`, `exchange_client_creation_accepted`, `exchange_client_creation_failed`, `exchange_client_restricted`, `c04_support_selected`.

## 17. Engineering Notes

- NSE/BSE integration, client creation API, idempotency, callback, and reconciliation rules are UNKNOWN.
- Client identifiers are sensitive and must be masked/excluded from analytics.

## 18. Acceptance Criteria

- Duplicate exchange-client creation is prevented.
- Initiated, pending, failed, delayed, and ready states are distinct.
- The user knows what happens next.

## 19. UX Writing Guidance

Explain the client record in plain language and avoid implying that creation itself enables investing.

## 20. Design Notes

Treat exchange-client creation as an operational dependency, not an invisible backend call.

---

# C05 – NSE/BSE Pending

## 1. Screen Purpose
Show that exchange-client creation is pending and provide a reliable status and recovery path.

## 2. User Goal
Know that the request exists, understand why it is pending, and know when/what to do next.

## 3. Business Goal
Prevent duplicate exchange requests and reduce avoidable support escalations.

## 4. Entry Conditions

- Exchange-client creation request exists but has not reached an authoritative completed or failed state.

## 5. Exit Conditions

- Approved/completed state routes to C09 or C01.
- Failure routes to C06.
- Delay routes to C11.
- Required action routes to C12 or the relevant dependency.

## 6. Layout Structure

Top to bottom:

1. Header with refresh/help.
2. Activation Status Block: exchange client pending.
3. Timeline for request submitted, exchange processing, reconciliation, next update.
4. Activation ETA/SLA Summary.
5. Primary CTA: Refresh status.
6. Secondary actions: Explore while activating, contact support.
7. Reference/timestamp.
8. Footer with disclosures.

## 7. Component Placement

- Existing: Page Header, Timeline, Card, Badge/Status Chip, Button, Link, Loading Skeleton, Error State.
- New: Activation Status Block and Activation ETA/SLA Summary reused from C01/C02.

## 8. Information Priority

1. Pending status and case reference.
2. Last update/next step.
3. Support/exploration route.

## 9. Interaction Behaviour

- **Tap:** Refresh, explore, support, back.
- **Scroll:** Timeline/details may scroll.
- **Keyboard:** All actions accessible.
- **Validation:** Request ownership/version server-side.
- **Loading:** Refresh/polling visible.
- **Disabled:** Refresh disabled during request.
- **Retry:** Backoff refresh; no duplicate creation.
- **Timeout:** Show stale last-known status.

## 10. All Screen States

- **Default:** Exchange request pending.
- **Loading:** Status loading.
- **Empty:** No request found; route to C04/C01/support safely.
- **Success:** Client creation completed; route to C09/C01.
- **Error:** Status unavailable/conflicting.
- **Offline:** Last known status read-only/stale.
- **Restricted:** Details/actions restricted.
- **Suspended:** Exchange creation held for review.

## 11. Validation Rules

- Pending is authoritative and not inferred from a missing callback.
- Status transitions use request version and reconciliation.

## 12. Error Behaviour

Distinguish pending, delayed, failed, missing request, and service error.

## 13. Success Behaviour

Route only after authoritative completion; do not show investor-ready unless all dependencies pass.

## 14. Motion Recommendation

Use restrained timeline updates and accessible refresh feedback.

## 15. Accessibility

- Timeline and last update are announced.
- Status is text-based and not colour-only.

## 16. Analytics Events

`c05_viewed`, `exchange_pending_loaded`, `exchange_status_refreshed`, `exchange_status_refresh_failed`, `exchange_delayed`, `exchange_completed`, `exchange_failed`, `exchange_support_selected`, `exchange_explore_selected`.

## 17. Engineering Notes

- Provider callback and reconciliation may be eventually consistent.
- Polling must use backoff and converge with push/deep-link status.

## 18. Acceptance Criteria

- Pending is distinct from delayed, failed, and approved.
- No duplicate creation action is available.
- User always has refresh, support, or safe exploration.

## 19. UX Writing Guidance

Say what is pending and why, give last updated/next update information when authoritative, and avoid promises.

## 20. Design Notes

The screen should make waiting feel controlled, not indefinite.

---

# C06 – NSE/BSE Failed

## 1. Screen Purpose
Explain an authoritative exchange-client creation failure and provide the approved correction, retry, review, or support route.

## 2. User Goal
Understand what failed at a safe level, know whether the issue is recoverable, and avoid duplicate requests.

## 3. Business Goal
Reduce repeat failures, protect exchange/compliance controls, and route recoverable cases to the right owner.

## 4. Entry Conditions

- Exchange service returns a final or actionable failure state.

## 5. Exit Conditions

- Retryable failure returns to C04 through a controlled retry.
- Data correction routes to the affected onboarding/identity screen.
- Review/delay routes to C11/C12.
- Final restriction remains with a safe explanation.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. Activation Status Block with failure category.
3. Affected dependency summary and safe reason.
4. Retry/correction/review instructions.
5. Primary CTA: Retry or Correct details, based on server action.
6. Secondary action: Contact support or explore if permitted.
7. Case/reference information.
8. Footer with disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Alert/Banner, Error State, Button, Link, Timeline, Audit Metadata Block.
- New: Reuse Activation Status Block; no additional component required.

## 8. Information Priority

1. Safe failure category.
2. Whether correction/retry/review is possible.
3. Affected dependency and case reference.

## 9. Interaction Behaviour

- **Tap:** Retry, correct, review/status, support, explore, return.
- **Scroll:** Explanation/disclosures may scroll.
- **Keyboard:** All actions accessible.
- **Validation:** Retry/correction eligibility and case ownership server-side.
- **Loading:** Retry/status transition progress shown.
- **Disabled:** Actions disabled during request or policy hold.
- **Retry:** Only server-marked retryable action; idempotent and rate-limited.
- **Timeout:** Preserve failed state and show unknown action status.

## 10. All Screen States

- **Default:** Failure category and permitted actions available.
- **Loading:** Failure/action lookup pending.
- **Empty:** No failure case found; route to C01/C05/support safely.
- **Success:** Retry/correction accepted; route to C05 or affected screen.
- **Error:** Failure detail/action unavailable.
- **Offline:** Cached failure shown; server recovery disabled.
- **Restricted:** No self-service recovery; support/review only.
- **Suspended:** Exchange failure/case held by compliance/operations.

## 11. Validation Rules

- Failure is authoritative and case-bound.
- User-visible reason is a safe category, not raw exchange diagnostics.
- New exchange client cannot be created while an active recovery path exists unless policy permits.

## 12. Error Behaviour

Distinguish correctable data, retryable provider, review-required, and final restriction outcomes.

## 13. Success Behaviour

Confirm only that the retry/correction/review request was accepted and show the next status surface.

## 14. Motion Recommendation

Use restrained error-to-recovery transition; do not use alarming motion.

## 15. Accessibility

- Failure status is announced as a heading.
- Reason and next action are associated.
- Focus moves to the recovery action or error summary.

## 16. Analytics Events

`c06_viewed`, `exchange_failure_shown`, `exchange_failure_reason_viewed`, `exchange_retry_started`, `exchange_retry_succeeded`, `exchange_retry_failed`, `exchange_correction_selected`, `exchange_review_selected`, `exchange_support_selected`.

## 17. Engineering Notes

- Stable failure codes are required for QA/support; raw provider errors remain internal.
- Reconciliation is required when exchange and activation systems disagree.

## 18. Acceptance Criteria

- Failure is not shown for pending/unknown states.
- Recovery does not create duplicates or bypass policy.
- User has a clear next action or human route.

## 19. UX Writing Guidance

Be direct without blame. State what happened safely and whether the user should retry, correct, wait, or contact support.

## 20. Design Notes

The failure screen should preserve momentum while making exchange and compliance boundaries clear.

---

# C07 – Penny Drop Verification

## 1. Screen Purpose
Verify ownership and validity of the selected bank account through the approved penny-drop method.

## 2. User Goal
Understand why verification is required, confirm the correct account, and know what happens after the verification result.

## 3. Business Goal
Validate the bank destination for investment operations, prevent misdirected funds, and create an auditable bank-ownership checkpoint.

## 4. Entry Conditions

- Bank account has been selected and is eligible for verification.
- Required onboarding/account context is approved.
- Penny-drop provider and method are available for the country/account type.

## 5. Exit Conditions

- Successful verification returns to C01 and marks bank dependency approved.
- Failure opens C08.
- Pending/timeout returns to C01/C11 with a status reference.
- Unsupported method routes to C12 or the approved alternate bank method.

## 6. Layout Structure

Top to bottom:

1. Header and activation context.
2. Activation Status Block explaining bank ownership verification.
3. Masked selected-bank summary.
4. Penny-drop explanation, expected result, and privacy/security notice.
5. Primary CTA: Start verification.
6. Status/result region after initiation.
7. Secondary actions: Change bank if permitted, contact support, return to activation.
8. Footer with bank-data disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Masked Field, Button, Link, Alert/Banner, Loading/Error State, Badge/Status Chip.
- New: Reuse Activation Status Block and Policy Status Block from approved architecture; no penny-drop-specific component required.

## 8. Information Priority

1. Which bank account is being verified.
2. Why penny drop is required.
3. Current result and next action.

## 9. Interaction Behaviour

- **Tap:** Start, refresh result, change bank where permitted, support, return.
- **Scroll:** Explanation/disclosures may scroll.
- **Keyboard:** All actions and masked bank context are accessible.
- **Validation:** Account eligibility, ownership case, provider request, and duplicate active request server-side.
- **Loading:** Initiation/result progress shown; prevent duplicate requests.
- **Disabled:** Start disabled when account or activation context is unresolved.
- **Retry:** Retry only when no active request exists or provider marks retryable.
- **Timeout:** Mark pending/unknown and offer status refresh; do not create a second penny-drop request.

## 10. All Screen States

- **Default:** Eligible bank account and start action available.
- **Loading:** Penny-drop request/result loading.
- **Empty:** No eligible bank account; route to bank management/support.
- **Success:** Bank ownership verified.
- **Error:** Invalid account, provider failure, ownership mismatch, or duplicate request.
- **Offline:** Verification disabled; cached bank context may be shown stale.
- **Restricted:** Method/account not permitted.
- **Suspended:** Bank verification held for fraud/compliance review.

## 11. Validation Rules

- Bank account values remain masked.
- Penny-drop request is idempotent, case-bound, and time-limited.
- Success requires authoritative provider and ownership confirmation.
- A pending result cannot be treated as failure or success.

## 12. Error Behaviour

Distinguish provider unavailable, account mismatch, unsupported bank, duplicate active request, pending, and policy hold.

## 13. Success Behaviour

Confirm only that bank ownership verification passed and return to activation dependency status.

## 14. Motion Recommendation

Use restrained request/result feedback. Do not visually imply money movement or investment execution.

## 15. Accessibility

- Bank summary is accessible with masked identifiers.
- Status changes are announced.
- Errors are associated with the bank verification action.

## 16. Analytics Events

`c07_viewed`, `penny_drop_started`, `penny_drop_pending`, `penny_drop_succeeded`, `penny_drop_failed`, `penny_drop_timeout`, `penny_drop_retry_selected`, `bank_change_selected`, `c07_support_selected`.

## 17. Engineering Notes

- Provider, transaction amount/handling, callback, reconciliation, and notification rules are UNKNOWN.
- Never expose provider tokens or raw bank data.
- Reconcile provider result with activation state before marking approved.

## 18. Acceptance Criteria

- User knows which account is being verified and why.
- No duplicate active penny-drop request is created.
- Pending, failed, delayed, and approved results are distinct.

## 19. UX Writing Guidance

Explain verification purpose without implying that the user is making an investment or payment.

## 20. Design Notes

The experience must make a small verification transaction feel controlled and trustworthy, not mysterious.

---

# C08 – Bank Verification Failed

## 1. Screen Purpose
Explain an authoritative bank-verification failure and provide the permitted retry, correction, alternate-bank, review, or support route.

## 2. User Goal
Understand what failed, know whether the account can be corrected or replaced, and avoid duplicate verification attempts.

## 3. Business Goal
Reduce failed payouts and operational rework while preserving ownership and anti-fraud controls.

## 4. Entry Conditions

- Penny-drop or another approved bank-verification service returns a final/actionable failure.

## 5. Exit Conditions

- Retryable failure returns to C07.
- Invalid/incompatible bank routes to bank-management correction.
- Review/delay routes to C11/C12.
- Final restriction remains with a safe explanation.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. Activation Status Block with bank-verification failure category.
3. Masked bank summary and affected dependency.
4. Safe reason and recovery instructions.
5. Primary CTA: Retry or Change bank, based on server action.
6. Secondary action: Contact support or return to activation.
7. Case/reference information.
8. Footer with bank-data disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Alert/Banner, Error State, Button, Link, Timeline, Audit Metadata Block.
- New: Reuse Activation Status Block; no additional component required.

## 8. Information Priority

1. Bank verification failure category.
2. Corrective/retry/review action.
3. Case context and support.

## 9. Interaction Behaviour

- **Tap:** Retry, change bank, review/status, support, return.
- **Scroll:** Explanation/disclosures may scroll.
- **Keyboard:** All recovery actions accessible.
- **Validation:** Retry eligibility, bank compatibility, and case ownership server-side.
- **Loading:** Retry/change/status progress shown.
- **Disabled:** Actions disabled during request or policy hold.
- **Retry:** Only server-marked retryable action; idempotent and rate-limited.
- **Timeout:** Preserve failure state and show unknown action status.

## 10. All Screen States

- **Default:** Failure category and permitted recovery action available.
- **Loading:** Failure/action lookup pending.
- **Empty:** No bank-failure case found; route to C01/C07/support safely.
- **Success:** Retry/change accepted; route to C07 or activation status.
- **Error:** Failure detail/action unavailable.
- **Offline:** Cached failure shown; server recovery disabled.
- **Restricted:** No self-service recovery; support/review only.
- **Suspended:** Bank failure held by fraud/compliance/operations.

## 11. Validation Rules

- Failure is case-bound and server-authoritative.
- Bank replacement cannot silently remove the prior verified record.
- New verification uses a new idempotency key and approved policy path.

## 12. Error Behaviour

Distinguish invalid details, ownership mismatch, unsupported bank, provider issue, pending, review, and final restriction.

## 13. Success Behaviour

Confirm only that a recovery action was accepted and provide the next status surface.

## 14. Motion Recommendation

Use restrained error-to-recovery transitions; do not expose provider diagnostics through motion or status labels.

## 15. Accessibility

- Failure status and reason are announced.
- Recovery action and consequence are associated.
- Focus moves to the primary recovery action or error summary.

## 16. Analytics Events

`c08_viewed`, `bank_failure_shown`, `bank_failure_reason_viewed`, `bank_retry_started`, `bank_retry_succeeded`, `bank_retry_failed`, `bank_change_selected`, `bank_review_selected`, `bank_support_selected`.

## 17. Engineering Notes

- Stable failure taxonomy is required for QA/support; raw bank-provider errors remain internal.
- Reconciliation is required if the provider later reports a different outcome.

## 18. Acceptance Criteria

- Failure is not shown for pending/unknown states.
- User has a clear corrective, retry, review, or support path.
- Bank replacement and retry cannot create inconsistent verification records.

## 19. UX Writing Guidance

Be direct, calm, and actionable. Avoid implying fraud or user fault unless policy requires a safe security hold message.

## 20. Design Notes

The screen should protect trust by explaining enough to act without exposing security-sensitive provider details.

---

# C09 – Investor Ready

## 1. Screen Purpose
Confirm that all blocking activation dependencies are approved and that the user is investment-ready under the current entitlement state.

## 2. User Goal
Know that activation is complete, understand any remaining limitations, and continue to permitted investment activity.

## 3. Business Goal
Convert activated users into safe product usage while ensuring readiness is granted only from authoritative entitlement state.

## 4. Entry Conditions

- KYC, exchange-client, bank verification, and all other blocking dependencies are approved.
- Entitlement service confirms investor-ready status.

## 5. Exit Conditions

- Primary CTA opens the approved investment entry point outside this module.
- User can view references/support.
- If a dependency regresses, route to C01/C11 rather than leaving stale success.

## 6. Layout Structure

Top to bottom:

1. Header and completed activation context.
2. Activation Status Block: investor ready.
3. Dependency summary showing each blocking dependency as approved.
4. Readiness explanation and any remaining limitations/disclosures.
5. Primary CTA: Start investing or Continue to approved destination.
6. Secondary actions: View activation details, contact support.
7. Reference/timestamp.
8. Footer with regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Button, Link, Audit Metadata Block.
- New: Reuse Activation Status Block and Dependency Status Rows; no new component required.

## 8. Information Priority

1. Investor-ready status.
2. Evidence that blocking dependencies are approved.
3. Permitted next action and limitations.

## 9. Interaction Behaviour

- **Tap:** Start investing/continue, open details, support.
- **Scroll:** Detail/disclosures may scroll.
- **Keyboard:** All actions accessible.
- **Validation:** Entitlement and destination validated server-side before navigation.
- **Loading:** Entitlement/destination resolution shown.
- **Disabled:** Primary action disabled if readiness is stale or destination unresolved.
- **Retry:** Refresh entitlement/status idempotently.
- **Timeout:** Preserve last-known ready status but mark destination unknown; do not start a transaction.

## 10. All Screen States

- **Default:** Investor-ready state and permitted CTA available.
- **Loading:** Entitlement/status loading.
- **Empty:** No readiness record; route to C01.
- **Success:** Investor-ready confirmed.
- **Error:** Entitlement conflict or service failure.
- **Offline:** Cached ready status shown with timestamp; transaction entry disabled.
- **Restricted:** Ready status exists but destination/action restricted.
- **Suspended:** Readiness revoked/held; route to C01/C11/support.

## 11. Validation Rules

- Investor-ready requires every blocking dependency approved.
- A stale readiness decision cannot authorize a transaction.
- C09 never creates or submits an investment order.

## 12. Error Behaviour

If readiness and dependency statuses conflict, show the last authoritative state and return to C01/status review.

## 13. Success Behaviour

Confirm investor-ready and state exactly what action is now permitted.

## 14. Motion Recommendation

Use restrained completion feedback; avoid implying a financial outcome or return.

## 15. Accessibility

- Readiness and each dependency status are announced.
- Primary action has a descriptive accessible name.
- Limitations are readable and not colour-dependent.

## 16. Analytics Events

`c09_viewed`, `investor_ready_confirmed`, `investment_entry_selected`, `activation_details_opened`, `investor_ready_restricted`, `investor_ready_regressed`, `c09_support_selected`.

## 17. Engineering Notes

- Investor-ready entitlement is server-authoritative and must be revocable.
- Propagate readiness to the investment module only after entitlement confirmation.
- Audit the decision and all dependency references.

## 18. Acceptance Criteria

- No readiness state before all blocking dependencies are approved.
- User knows what is enabled and what remains restricted.
- Offline/stale state cannot start a transaction.

## 19. UX Writing Guidance

Use “You’re ready to invest” only when entitlement is authoritative; state any remaining limits plainly.

## 20. Design Notes

This is the bridge into investing. It should be confident but precise, never conflating readiness with investment performance or approval of a specific product.

---

# C10 – Explore While We Activate

## 1. Screen Purpose
Allow safe, policy-permitted exploration of product information while activation remains incomplete, without creating a false impression that investing is enabled.

## 2. User Goal
Learn about permitted products, processes, and information while knowing exactly what actions remain unavailable.

## 3. Business Goal
Maintain engagement during activation wait time without enabling unsuitable, unauthorized, or premature transaction behavior.

## 4. Entry Conditions

- Activation is pending/delayed and policy permits exploration.
- The user has an authenticated/provisional context appropriate for the content.

## 5. Exit Conditions

- Information links open permitted read-only product/content surfaces outside this module.
- Activation status returns to C01.
- Attempted restricted action opens the Explore Guardrail Panel and C12/C01.

## 6. Layout Structure

Top to bottom:

1. Header with activation status access.
2. Explore Guardrail Panel explaining what can and cannot be done while activating.
3. Permitted information categories/cards.
4. Activation dependency summary and current status.
5. Primary CTA: Return to activation status.
6. Secondary links to permitted information/support.
7. Footer with non-advisory and regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Button, Link, Alert/Banner, Badge/Status Chip.
- New: Explore Guardrail Panel, required to prevent read-only exploration from being interpreted as transaction permission.

## 8. Information Priority

1. Activation limitation and available actions.
2. Read-only content categories.
3. Current status and return path.

## 9. Interaction Behaviour

- **Tap:** Open permitted information, return to activation, support.
- **Scroll:** Content cards and disclosures may scroll.
- **Keyboard:** All links accessible.
- **Validation:** Content entitlement and action permissions server-side.
- **Loading:** Content/permission loading shown.
- **Disabled:** Restricted actions visibly unavailable with explanation.
- **Retry:** Retry content/status loading.
- **Timeout:** Show cached/read-only content with stale status; no transaction action.

## 10. All Screen States

- **Default:** Permitted exploration available.
- **Loading:** Content/permissions loading.
- **Empty:** No permitted content; return to C01/support.
- **Success:** Content opened; activation remains unchanged.
- **Error:** Content or status service failure.
- **Offline:** Cached informational content may be shown; dynamic actions disabled.
- **Restricted:** Exploration or a category is not permitted.
- **Suspended:** Account/activation hold limits exploration; show support.

## 11. Validation Rules

- Exploration cannot authorize or submit any transaction.
- Product information must reflect current policy/entitlement state.
- Restricted actions must not be enabled through stale client state.

## 12. Error Behaviour

Explain whether content is unavailable or the action is restricted; provide return/support path rather than a dead end.

## 13. Success Behaviour

Open only permitted information and preserve activation status.

## 14. Motion Recommendation

Use restrained content loading and guardrail feedback. Avoid conversion-focused motion while activation is incomplete.

## 15. Accessibility

- Guardrail status and restrictions are textually available.
- Read-only content links have descriptive labels.
- Disabled/restricted actions are explained, not merely visually muted.

## 16. Analytics Events

`c10_viewed`, `explore_content_opened`, `explore_restricted_action_attempted`, `explore_guardrail_shown`, `activation_status_returned`, `c10_support_selected`.

## 17. Engineering Notes

- Content/action permissions must be server-authoritative.
- Avoid leaking unreleased or unsuitable product data to unauthorized states.
- Deep links must preserve activation context and return path.

## 18. Acceptance Criteria

- User can explore without believing they can transact.
- Every restricted action has an explanation and return/support route.
- Activation status remains accessible.

## 19. UX Writing Guidance

Use “You can explore while activation is in progress” and clearly separate learning from investing.

## 20. Design Notes

This is an engagement bridge, not a workaround for activation. Guardrails must be part of the core hierarchy.

---

# C11 – Activation Delayed

## 1. Screen Purpose
Explain that activation is still pending beyond the expected operational window, identify the current owner/status, and provide a reliable escalation path.

## 2. User Goal
Understand why activation is delayed, whether action is required, when the next update is expected, and who can help.

## 3. Business Goal
Manage service expectations, reduce repeated support contacts, expose operational ownership, and prevent users from abandoning or duplicating activation.

## 4. Entry Conditions

- An activation dependency remains pending beyond the server-defined normal threshold.
- The activation service provides a delay reason category or escalation state.

## 5. Exit Conditions

- Status refresh returns to C01/C02/C05/C07.
- Required action opens the responsible dependency.
- Human help opens C12.
- Completion opens C09; failure opens C06/C08/B20 as applicable.

## 6. Layout Structure

Top to bottom:

1. Header with refresh/help.
2. Activation Status Block: delayed.
3. Activation Dependency Map highlighting the delayed dependency without hiding other statuses.
4. Activation ETA/SLA Summary with last update, expected next update, and owner when authoritative.
5. Safe reason/explanation and required-action section.
6. Primary CTA: Refresh status or Continue required action.
7. Secondary CTA: Contact RM/support.
8. Explore option only if policy still permits it.
9. Footer with disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Timeline, Button, Link, Alert/Banner, Loading Skeleton.
- New: Activation Status Block, Activation Dependency Map, Activation ETA/SLA Summary, Human Ownership Block. These are required to make delay distinct from normal pending and to expose accountable next steps.

## 8. Information Priority

1. Delayed status and affected dependency.
2. Why it is delayed and whether action is required.
3. Next update/owner/SLA.
4. Human help and permitted exploration.

## 9. Interaction Behaviour

- **Tap:** Refresh, open affected dependency, contact support/RM, explore, return.
- **Scroll:** Timeline and explanation may scroll; delay status remains discoverable.
- **Keyboard:** All status details/actions accessible.
- **Validation:** Delay threshold, owner, case version, and action eligibility server-side.
- **Loading:** Refresh/escalation progress shown.
- **Disabled:** Actions disabled when no action is permitted or a request is active.
- **Retry:** Refresh with backoff; escalation creation idempotent.
- **Timeout:** Keep delayed state with stale timestamp; never convert to failure without authoritative state.

## 10. All Screen States

- **Default:** Delayed dependency and owner/next update visible.
- **Loading:** Delay/status lookup or escalation loading.
- **Empty:** No delayed case found; route to C01/support safely.
- **Success:** Delay resolved; route to C09 or the next dependency status.
- **Error:** Status/escalation service failure.
- **Offline:** Last known delayed status shown stale; refresh/escalation disabled.
- **Restricted:** Delay details/actions limited by authorization.
- **Suspended:** Activation held by compliance/security; human route only.

## 11. Validation Rules

- Delayed state is returned by the server after the defined threshold; it is not inferred from client time alone.
- Owner/SLA is shown only when authoritative.
- Escalation cannot create duplicate support/RM cases.

## 12. Error Behaviour

Distinguish normal pending, delayed, failed, missing case, and status conflict. If no ETA is authoritative, say so rather than inventing one.

## 13. Success Behaviour

Confirm only that the status changed and route to the authoritative next dependency/state.

## 14. Motion Recommendation

Use restrained escalation/status feedback. Avoid urgency animations that increase anxiety without providing action.

## 15. Accessibility

- Delayed state, reason, owner, and next update are announced.
- Timeline and dependency rows are navigable.
- Human-help action has a descriptive accessible name.

## 16. Analytics Events

`c11_viewed`, `activation_delay_shown`, `activation_delay_reason_viewed`, `activation_owner_viewed`, `activation_status_refreshed`, `activation_delay_escalation_started`, `activation_delay_escalation_created`, `activation_delay_support_selected`, `activation_delay_resolved`.

## 17. Engineering Notes

- Normal-to-delayed threshold and SLA policy are UNKNOWN.
- Delay state must be persisted, auditable, and reconciled with each dependency service.
- Escalation ownership and notifications must be idempotent.

## 18. Acceptance Criteria

- Delayed is visibly and behaviorally distinct from pending and failed.
- User knows why it is delayed, whether action is required, and the next update path.
- No duplicate escalation or onboarding case is created.

## 19. UX Writing Guidance

Use transparent language about delay and ownership. Never fabricate an ETA or blame a vendor/user without an approved explanation.

## 20. Design Notes

Delay handling is a trust test. The screen should replace uncertainty with ownership, recency, and a safe next action.

---

# C12 – Contact RM / Support

## 1. Screen Purpose
Connect the user to the correct RM or support team with sufficient activation context to avoid repeating the entire issue.

## 2. User Goal
Get help quickly, understand who owns the issue, and share only the information needed to resolve activation.

## 3. Business Goal
Route cases to the right owner, reduce handle time and duplicate tickets, and maintain secure support/audit boundaries.

## 4. Entry Conditions

- User selects support from an activation state, or a policy state requires human intervention.
- The activation case and permissible support context are available.

## 5. Exit Conditions

- Secure contact action opens the approved RM/support channel.
- Support case creation returns a case/reference and status.
- User can return to C01/C11 without losing activation state.

## 6. Layout Structure

Top to bottom:

1. Header with safe back and close/return behavior.
2. Human Ownership Block showing RM/support ownership when authoritative.
3. Activation Status Block summarizing current dependency and safe reason.
4. Support options: secure message, call/request callback, or approved channel.
5. Pre-filled non-sensitive case context with user review before sharing.
6. Primary CTA: Contact RM/Support or Create support case.
7. Secondary action: Return to activation status.
8. SLA/next-response summary when authoritative.
9. Footer with privacy/security guidance.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Text Field/Textarea if required, Button, Link, Alert/Banner, Timeline, Audit Metadata Block, Secure Link/Share.
- New: Human Ownership Block, required to distinguish accountable ownership from generic contact links. Reuse Activation Status Block.

## 8. Information Priority

1. Current activation issue and owner.
2. Contact method and expected response.
3. Shared case context and privacy boundary.

## 9. Interaction Behaviour

- **Tap:** Choose contact method, review/edit context, submit case/callback, return.
- **Scroll:** Support guidance and privacy terms may scroll.
- **Keyboard:** All contact methods and form fields accessible.
- **Validation:** Contact authorization, case ownership, message length, and channel eligibility server-side.
- **Loading:** Case creation/contact handoff progress shown; prevent duplicate case creation.
- **Disabled:** Submit disabled while required channel/context is unresolved.
- **Retry:** Retry case creation only with the same idempotency key.
- **Timeout:** Show unknown support-case status and provide refresh/reference route; do not create duplicates.

## 10. All Screen States

- **Default:** Owner/support methods and activation context available.
- **Loading:** Owner lookup or support case creation loading.
- **Empty:** No RM assigned; show general support route.
- **Success:** Contact request/case created with reference and next update.
- **Error:** Channel unavailable, case creation failed, or owner lookup failed.
- **Offline:** Show stored support channels but disable submission/handoff.
- **Restricted:** Some support details/channels unavailable under policy.
- **Suspended:** Security/compliance case requires controlled support route.

## 11. Validation Rules

- Only non-sensitive, policy-approved context is prefilled.
- User reviews what will be shared before submission.
- Support/RM case creation is idempotent.
- Raw KYC, bank, exchange, or document data is not placed in a free-text message automatically.

## 12. Error Behaviour

Distinguish owner unavailable, channel unavailable, duplicate case, service failure, and secure-contact restriction. Always provide a safe alternate route.

## 13. Success Behaviour

Show the support/RM case reference, current ownership, and next response expectation when authoritative. Return to C01/C11 remains available.

## 14. Motion Recommendation

Use restrained handoff and case-creation feedback. Do not imply human response before the service confirms the case.

## 15. Accessibility

- Owner/status and contact methods have semantic labels.
- Prefilled context is readable and editable only where permitted.
- Case-creation confirmation is announced and persistent.
- Telephone, secure message, and callback actions have descriptive names.

## 16. Analytics Events

`c12_viewed`, `activation_owner_loaded`, `support_channel_selected`, `rm_contact_selected`, `support_context_reviewed`, `support_case_started`, `support_case_created`, `support_case_creation_failed`, `support_duplicate_case_found`, `support_return_to_activation`.

## 17. Engineering Notes

- RM assignment, support platform, channel SLAs, and notification contracts are UNKNOWN.
- Use secure case references and access-controlled context sharing.
- Support tooling must receive correlation ID and dependency reason code, not raw PII unless explicitly authorized.

## 18. Acceptance Criteria

- User can contact the correct owner or a safe general support route.
- Context sharing is transparent and minimal.
- Duplicate support cases are prevented.
- Contact failure never leaves the user without a return/status path.

## 19. UX Writing Guidance

Explain who will help, what information will be shared, and what happens next. Avoid promising response times that are not authoritative.

## 20. Design Notes

Human support is part of the activation service, not an exception hidden behind a generic help link. Preserve user context while protecting sensitive data.

---

# Module-Level Handoff Rules

## Cross-screen consistency

- C01-C12 use one activation case ID, policy version, correlation ID, and dependency state model.
- KYC approval, exchange-client creation, bank verification, penny-drop verification, and investor readiness remain separate statuses.
- Pending, delayed, failed, approved, restricted, suspended, and unknown states must never be collapsed into one generic status.
- C09 Investor Ready is available only from authoritative entitlement state after all blocking dependencies are approved.
- C10 exploration cannot authorize transactions or bypass activation.
- C11 and C12 are always available when a user is delayed, failed, restricted, or unable to identify the next action.
- All deep links, notifications, refreshes, and support routes preserve the same activation case and do not create duplicates.

## Required low-fidelity wireframe coverage

For each C01-C12 screen, the wireframe set must include the default structure plus representative state annotations for loading, empty, success, error, offline, restricted, and suspended. These are state variants, not additional product screens.

## Required QA coverage

- First-time activation, resume, deep-link, refresh, back-navigation, duplicate-submit, stale state, offline/online, timeout, provider callback, reconciliation, delayed threshold, manual review, and accessibility navigation.
- Independent dependency combinations: KYC pending with bank approved, exchange failed with KYC approved, bank pending with exchange approved, delayed activation with explore allowed, and regression from approved dependency to suspended/review.
- Investor-ready entitlement must not be granted by a single dependency event.
- PII redaction in analytics, logs, support tools, screenshots, and error reports.

## Required decisions before high-fidelity design

- Activation dependency graph and ordering: UNKNOWN.
- KYC, NSE/BSE, bank, penny-drop, entitlement, RM, and support providers: UNKNOWN.
- Normal pending windows, delayed thresholds, SLAs, ownership, and notification channels: UNKNOWN.
- Explore permissions while activation is incomplete: UNKNOWN.
- Exact investor-ready entitlement and regression rules: UNKNOWN.

## Wireframe Readiness Checklist

- [x] Only C01-C12 are included.
- [x] Every screen uses the same 20-section structure as Authentication v1.0 and Onboarding v1.0.
- [x] Pending, failed, delayed, approved, restricted, suspended, and unknown behavior is explicitly separated.
- [x] Every backend dependency exposes a meaningful user state and next action.
- [x] No screen is a dead end.
- [x] C10 exploration is guarded and cannot bypass activation.
- [x] Sensitive data, audit, analytics, retry, timeout, accessibility, and engineering behavior are specified.
- [ ] Provider contracts, SLAs, entitlement rules, and operational ownership remain to be confirmed before implementation sign-off.

**Handoff decision:** Ready for low-fidelity wireframe implementation. High-fidelity design and implementation sign-off remain conditional on resolving the explicit activation, provider, entitlement, SLA, and operational unknowns above.
