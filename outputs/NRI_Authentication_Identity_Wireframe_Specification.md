# NRI Authentication & Identity
## Wireframe Specification

**Role:** Principal UX Design Lead  
**Status:** Ready for wireframe specification for this module only  
**Scope:** Authentication and Identity screens A01, A02, A03, A04, A16-A22  
**Constraint:** This is a behavioral and structural specification, not a visual design. It intentionally excludes colour, typography, pixel measurements, and visual wireframes.

## Canonical Screen Order

Use this order for wireframe planning and Figma page organization, regardless of the risk-priority order used in the detailed specification below:

1. A01 – NRI Welcome & Registration
2. A02 – Contact Verification
3. A03 – Login
4. A04 – PAN Verification
5. A16 – Forgot Email
6. A17 – Forgot Mobile
7. A18 – Device Recovery
8. A19 – Active Sessions
9. A20 – Trusted Devices
10. A21 – Account Recovery
11. A22 – Recovery Pending

## 0. Scope and Shared Rules

### Included screens

| ID | Screen | Primary responsibility |
|---|---|---|
| A01 | NRI Welcome & Registration | Establish NRI context and begin a provisional registration |
| A02 | Contact Verification | Verify email or mobile ownership |
| A03 | Login | Authenticate an existing investor |
| A04 | PAN Verification | Verify and link PAN after contact verification |
| A16 | Forgot Email | Recover access when the registered email is unknown |
| A17 | Forgot Mobile | Recover access when the registered mobile is unknown |
| A18 | Device Recovery | Recover access from an unrecognised or lost device |
| A19 | Active Sessions | Review and revoke authenticated sessions |
| A20 | Trusted Devices | Review and revoke trusted devices |
| A21 | Account Recovery | Submit a controlled identity-recovery request |
| A22 | Recovery Pending | Track an identity-recovery request and its next action |

### Non-goals

- Do not design KYC approval, FATCA, CRS, tax, investment, payment, or portfolio screens.
- A02 contact verification is proof of channel control, not proof of identity or KYC approval.
- A04 PAN verification is an identity-data check, not a promise that the user may invest.
- Do not introduce a new navigation model or a new product module.
- Do not expose account existence through error copy, timing, or field behavior.

### Shared behavior contract

- Every asynchronous action has an explicit loading, timeout, retry, failure, and completion behavior.
- Sensitive values are masked by default. Reveal behavior must be intentional, temporary, accessible, and analytics-tracked without storing the value.
- Every recovery, session revocation, device change, and identity decision is audit logged with actor, timestamp, device/session context, correlation ID, policy version, and outcome.
- All retry actions are idempotent. A retry must not create a second account, challenge, recovery case, session, or notification.
- Rate limits, cooldowns, attempt counts, and lockout reasons are server-authoritative.
- A user can leave and resume a safe provisional registration or recovery case without losing already verified evidence.
- Offline behavior must not imply that a server-side action succeeded.
- “Restricted” means the action is blocked by policy, eligibility, risk, or permission. “Suspended” means an account, session, device, or case is held by security or operations.
- Recovery outcomes must never imply that transactions were cancelled, reversed, or deleted.

### Shared design-system references

Existing components used throughout: App Shell, Page Header, Text Field, Masked Field, OTP Input, Country Selector, Button, Link, Progress Indicator, Step Indicator, Card, Alert/Banner, Inline Message, Dialog, Bottom Sheet, Modal, Toast/Snackbar, Tooltip, Empty State, Loading Skeleton, Error State, Timeline, Checkbox, Radio, Switch, Table/Data Table, Badge/Status Chip, Audit Metadata Block, Secure Link/Share.

New reusable components for this module: Verification Channel Selector, Provisional Registration Context Panel, Identity Recovery Context Panel, Security Challenge Summary, Session and Device Status Row, Recovery Evidence Checklist, Recovery SLA Summary, Contact Change Impact Notice. These are behavioral components; their visual treatment remains a design-system decision.

### Shared analytics conventions

Each event includes `screen_id`, `session_id`, `correlation_id`, `user_state`, `country_context`, `device_id_hash`, and `policy_version` where permitted. Never send PAN, OTP, full email, full mobile, recovery evidence, or raw device identifiers to analytics. Track reason codes, not sensitive values.

---

# B10 – Tax Residency

## 1. Screen Purpose
Capture the user’s tax-residency jurisdictions and required tax identifiers as structured regulatory data.

## 2. User Goal
Declare all applicable tax residencies accurately, understand required identifiers, and continue without confusing residence with tax residency.

## 3. Business Goal
Create complete tax-residency data for CRS/FATCA processing, identify inconsistencies early, and reduce manual compliance remediation.

## 4. Entry Conditions

- B08/B09 declarations have established the applicable tax-residency requirement.
- Country/account context and personal details are available.

## 5. Exit Conditions

- Valid residency data opens B11.
- Missing, inconsistent, or unverifiable data routes to B19 or a correction state.
- Save/exit preserves a draft and does not finalize a declaration.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Context explanation distinguishing country of residence from tax residency.
3. Tax Residency Matrix showing jurisdiction, identifier requirement, identifier field, and status.
4. Add jurisdiction action where policy permits.
5. Regulatory Consent Block for declaration/confirmation.
6. Primary CTA: Confirm and continue.
7. Secondary action: Save and exit.
8. Help/disclosure footer.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Country Selector, Select, Text Field/Masked Field, Table/Data Table, Checkbox, Button, Link, Alert/Banner.
- New: Tax Residency Matrix, required to support multiple jurisdictions and per-jurisdiction validation without creating a separate module.

## 8. Information Priority

1. Required jurisdictions and identifier status.
2. Add/remove/edit rules.
3. Declaration confirmation and next action.

## 9. Interaction Behaviour

- **Tap:** Add/select jurisdiction, enter identifier, remove only where policy permits, expand requirement, confirm, save/exit.
- **Scroll:** Matrix and disclosures may scroll; errors remain associated with the row.
- **Keyboard:** Table/matrix cells and add/remove actions are keyboard accessible.
- **Validation:** Jurisdiction uniqueness, identifier format, required/optional status, and cross-field consistency are server-authoritative.
- **Loading:** Policy requirements and validation show progress; prevent duplicate additions.
- **Disabled:** Confirm disabled when required jurisdictions/identifiers are incomplete.
- **Retry:** Retry row validation/save without duplicating a jurisdiction.
- **Timeout:** Preserve draft and show unknown final status.

## 10. All Screen States

- **Default:** Required residency matrix available.
- **Loading:** Residency requirements or validation loading.
- **Empty:** No residency entered; show required first action.
- **Success:** Tax-residency data recorded; route to B11.
- **Error:** Duplicate jurisdiction, invalid identifier, inconsistency, or service failure.
- **Offline:** Draft-only if approved; no final confirmation.
- **Restricted:** Required tax-residency path unavailable or edit restricted.
- **Suspended:** Data held for compliance review.

## 11. Validation Rules

- Do not infer tax residency from country of residence.
- Jurisdictions must be unique and selected from the approved taxonomy.
- Required identifiers and formats are jurisdiction/policy-driven.
- A user cannot remove a jurisdiction if a declaration or policy requires it without an approved correction path.

## 12. Error Behaviour

Show row-level errors and explain whether the user must correct, add an identifier, or await review. Do not provide tax advice.

## 13. Success Behaviour

Confirm that structured tax-residency information was recorded for regulatory processing.

## 14. Motion Recommendation

Use restrained row addition/removal feedback and stable validation updates. Do not shift focus unexpectedly when a jurisdiction is added.

## 15. Accessibility

- Matrix has semantic headers and row/field relationships.
- Add/remove actions have descriptive names and consequences.
- Errors are associated with the jurisdiction row and announced.
- Status is text-based, not colour-only.

## 16. Analytics Events

`b10_viewed`, `tax_residency_added`, `tax_residency_removed`, `tax_residency_identifier_started`, `tax_residency_identifier_completed`, `tax_residency_validation_failed`, `tax_residency_confirmed`, `tax_residency_saved`, `tax_residency_pending`.

## 17. Engineering Notes

- Jurisdiction taxonomy, identifier rules, treaty/dependency logic, and retention are UNKNOWN.
- Store structured rows with policy version and source.
- Changes must invalidate dependent declarations only according to server policy.

## 18. Acceptance Criteria

- Country of residence and tax residency are clearly distinct.
- Multiple jurisdictions are supported where policy requires.
- Required identifiers and review states are explicit.

## 19. UX Writing Guidance

Use precise jurisdiction terms and avoid suggesting that the platform determines tax residency for the user.

## 20. Design Notes

The matrix should make completeness visible without turning a regulated declaration into an unstructured questionnaire.

---

# B11 – Risk Profiling

## 1. Screen Purpose
Collect the approved risk-profile responses required to classify the user under the product’s suitability and regulatory policy.

## 2. User Goal
Answer honestly, understand the purpose of the questions, and know how the result affects permitted recommendations or review.

## 3. Business Goal
Establish an auditable risk profile, prevent unsuitable recommendations, and identify cases requiring explanation or human review.

## 4. Entry Conditions

- Regulatory identity, tax, and account context required by the risk policy are complete.
- The current question set and policy version are available.

## 5. Exit Conditions

- Complete valid responses calculate/store a profile and open B12.
- Inconsistent or incomplete responses remain for correction.
- Policy hold or suitability exception routes to B19/support.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Explanation of risk profiling, purpose, and non-advisory boundary.
3. Risk Response Group for each question with progress indicator.
4. Optional contextual help/disclosure for terms.
5. Result/review status only after authoritative calculation.
6. Primary CTA: Continue.
7. Secondary action: Save and exit.
8. Footer with disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Radio, Select, Card, Tooltip, Progress Indicator, Button, Link, Alert/Banner.
- New: Risk Response Group, required to enforce a consistent response scale and avoid ambiguous free-text risk answers.

## 8. Information Priority

1. Purpose and non-advisory meaning.
2. Current question and response options.
3. Progress, result meaning, and next action.

## 9. Interaction Behaviour

- **Tap:** Select one response, open term help, navigate permitted question progression, continue, save/exit.
- **Scroll:** Question explanation may scroll; selected response remains visible.
- **Keyboard:** Radio/response group supports arrow navigation and clear selection.
- **Validation:** Required response and cross-question consistency validated server-side.
- **Loading:** Question schema and profile calculation loading; prevent duplicate calculation.
- **Disabled:** Continue disabled until the current required response set is complete.
- **Retry:** Retry calculation without changing responses.
- **Timeout:** Preserve responses and show profile status unknown; require refresh before proceeding.

## 10. All Screen States

- **Default:** Question set available and unanswered/partially answered.
- **Loading:** Question set or result calculation loading.
- **Empty:** No question set available; block and show service issue.
- **Success:** Risk profile calculated and stored; route to B12.
- **Error:** Missing response, inconsistency, calculation, or service error.
- **Offline:** Safe draft only if approved; no calculation confirmation.
- **Restricted:** Risk profiling unavailable or user cannot proceed under policy.
- **Suspended:** Suitability/compliance review hold.

## 11. Validation Rules

- Use only the policy-approved question and response set.
- Do not preselect answers.
- Risk profile is calculated server-side and must be versioned.
- A user must be able to review/correct answers before final confirmation where policy permits.

## 12. Error Behaviour

Explain incomplete, inconsistent, or review-required responses without judging the user’s risk appetite. Provide correction or human-support routes.

## 13. Success Behaviour

Confirm that a risk profile was recorded for suitability processing. Do not present it as a recommendation or guarantee.

## 14. Motion Recommendation

Use subtle response selection and progress feedback. Avoid celebratory completion motion for a regulatory suitability checkpoint.

## 15. Accessibility

- Response groups have semantic labels and required states.
- Progress is announced.
- Help content is keyboard accessible and does not trap focus.
- Do not rely on colour or position to convey risk levels.

## 16. Analytics Events

`b11_viewed`, `risk_question_started`, `risk_response_selected`, `risk_question_validation_failed`, `risk_review_started`, `risk_profile_calculation_started`, `risk_profile_calculated`, `risk_profile_pending`, `risk_profile_restricted`, `b11_save_exit_selected`.

## 17. Engineering Notes

- Question set, scoring, profile bands, disclosures, and policy version are UNKNOWN.
- Do not calculate or display a profile client-side as authoritative.
- Store responses and scoring reference for audit; never send raw answers to analytics.

## 18. Acceptance Criteria

- No response is preselected.
- Risk profile is server-calculated and versioned.
- Pending/review/restricted states do not look like successful classification.
- No investment recommendation is implied.

## 19. UX Writing Guidance

Use neutral, non-judgmental language. Explain why the questions are required and what the result does and does not control.

## 20. Design Notes

Answer confidence matters more than speed. The wireframe should support comprehension and review, not pressure users toward a preferred profile.

---

# B12 – Investment Experience

## 1. Screen Purpose
Capture the user’s investment experience, knowledge, frequency, and relevant product exposure using the approved suitability question set.

## 2. User Goal
Describe experience accurately and understand how it informs suitability or education requirements.

## 3. Business Goal
Improve suitability decisions, identify inexperienced users requiring additional guidance, and retain an auditable investor-profile input.

## 4. Entry Conditions

- B11 risk profiling is complete or the policy permits this step before final risk calculation.
- The approved investment-experience question set is available.

## 5. Exit Conditions

- Valid responses open B13.
- Missing/contradictory responses remain for correction.
- Education/review condition routes to B19 or an approved guidance state.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Context explanation of why experience is asked.
3. Investment Experience response groups.
4. Conditional product/years/frequency fields.
5. Suitability/education notice where policy requires.
6. Primary CTA: Continue.
7. Secondary action: Save and exit.
8. Footer with disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Radio, Select, Text Field, Card, Alert/Banner, Button, Link.
- New: Reuse Risk Response Group where the response scale is shared; no new component is required.

## 8. Information Priority

1. Purpose and question response.
2. Conditional details.
3. Suitability effect and next action.

## 9. Interaction Behaviour

- **Tap:** Select experience, reveal conditional fields, review guidance, continue, save/exit.
- **Scroll:** Long explanation/conditional form may scroll.
- **Keyboard:** Response groups and fields have logical order.
- **Validation:** Required responses and consistency checks server-side.
- **Loading:** Question schema/save/profiling dependency loading.
- **Disabled:** Continue disabled until required responses complete.
- **Retry:** Retry save/validation idempotently.
- **Timeout:** Preserve draft and show unknown save state.

## 10. All Screen States

- **Default:** Experience questions available.
- **Loading:** Schema or dependency loading.
- **Empty:** No response supplied; show required first question.
- **Success:** Experience data recorded; route to B13.
- **Error:** Incomplete, inconsistent, invalid, or service error.
- **Offline:** Draft-only if approved.
- **Restricted:** Experience collection unavailable under policy.
- **Suspended:** Suitability/education review hold.

## 11. Validation Rules

- Use policy-approved response categories.
- Conditional fields appear only when required.
- Do not infer experience from transaction history unless the server explicitly supplies an approved source.
- User responses are versioned and auditable.

## 12. Error Behaviour

Identify the specific response needing correction and explain any review/education route without shaming the user.

## 13. Success Behaviour

Confirm that experience information was recorded for suitability processing.

## 14. Motion Recommendation

Use restrained conditional reveal and progress feedback; preserve response position.

## 15. Accessibility

- Response groups have semantic labels and required state.
- Conditional sections announce when revealed.
- Errors and review notices are announced and associated with controls.

## 16. Analytics Events

`b12_viewed`, `experience_response_selected`, `experience_conditional_opened`, `experience_validation_failed`, `experience_saved`, `experience_review_required`, `experience_education_required`, `b12_continued`, `b12_save_exit_selected`.

## 17. Engineering Notes

- Question schema, experience bands, and education rules are UNKNOWN.
- Store structured responses with policy version.
- Do not send raw responses to analytics.

## 18. Acceptance Criteria

- Experience is self-declared unless an approved server source is explicitly used.
- Conditional requirements are visible and validated.
- Review/education states are not presented as user failure.

## 19. UX Writing Guidance

Use neutral examples and avoid implying that more experience is better. Explain why accuracy matters.

## 20. Design Notes

Do not optimize for a “high experience” answer. The experience must support truthful self-assessment.

---

# B13 – Bank Account Verification

## 1. Screen Purpose
Capture or select the bank account required for onboarding and verify compatibility with the selected NRE/NRO context.

## 2. User Goal
Provide the correct bank account, understand the verification method and account-type compatibility, and recover safely from failures.

## 3. Business Goal
Prevent incorrect payouts/orders, reduce bank mismatch operations, and establish an auditable verified payment destination.

## 4. Entry Conditions

- B03 account type, B02 country, and required identity/tax context are complete.
- Bank verification method is available for the current policy.

## 5. Exit Conditions

- Verified compatible bank account opens B14.
- Add/verify failure remains on B13 with retry or alternate bank route.
- Unsupported bank, incompatible NRE/NRO type, or manual review routes to B19/support.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Account Compatibility Selector summary showing selected NRE/NRO context.
3. Bank account entry/selection fields using masked values.
4. Verification method and consent/explanation.
5. Policy Status Block for compatibility and verification result.
6. Primary CTA: Verify bank account.
7. Secondary actions: Add another bank, use another permitted method, save/exit.
8. Footer with privacy and bank-data disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Masked Field, Select, Card, Alert/Banner, Button, Link, Loading/Error State, Dialog for destructive/removal confirmation.
- New: Reuse Account Compatibility Selector and Policy Status Block; no new bank-specific component is required beyond the approved bank-management architecture.

## 8. Information Priority

1. Which account context is being verified.
2. Bank details and verification action.
3. Compatibility/result and recovery route.

## 9. Interaction Behaviour

- **Tap:** Select/add bank, enter details, verify, retry, choose alternate method, open compatibility explanation.
- **Scroll:** Bank explanation and disclosures may scroll.
- **Keyboard:** Correct account/IFSC input behavior; sensitive values masked and not autocompleted unsafely.
- **Validation:** Format, ownership, account status, NRE/NRO compatibility, duplicate, and provider checks server-side.
- **Loading:** Verification progress; disable duplicate requests.
- **Disabled:** Verify disabled until required fields are valid and policy context is resolved.
- **Retry:** Retry only when retryable; do not create duplicate bank links.
- **Timeout:** Show verification unknown and provide status refresh/reconciliation route.

## 10. All Screen States

- **Default:** Bank entry/selection available.
- **Loading:** Bank list, account lookup, or verification pending.
- **Empty:** No bank selected; show add-bank action.
- **Success:** Bank verified and compatible; route to B14.
- **Error:** Invalid details, ownership failure, provider failure, duplicate, or compatibility issue.
- **Offline:** Cached bank context may be shown stale; verification disabled.
- **Restricted:** Bank/method unsupported or not permitted.
- **Suspended:** Bank verification held for fraud/compliance/manual review.

## 11. Validation Rules

- Account type compatibility is server-authoritative.
- Bank/account details are masked and never sent raw to analytics.
- Duplicate and previously verified accounts must resolve to a defined state, not silently relink.
- Verification result must include freshness and policy version.

## 12. Error Behaviour

Distinguish invalid, ownership failed, unsupported bank, incompatible account type, provider unavailable, pending, and review-required states.

## 13. Success Behaviour

Confirm only that the bank account is verified and compatible for the current onboarding case.

## 14. Motion Recommendation

Use row/result feedback after server confirmation. Do not remove or replace a bank account optimistically.

## 15. Accessibility

- Masked bank fields have accessible labels and reveal controls where permitted.
- Compatibility status is text-based and announced.
- Errors are field- or account-row-associated.

## 16. Analytics Events

`b13_viewed`, `bank_selected`, `bank_add_started`, `bank_verification_started`, `bank_verification_succeeded`, `bank_verification_failed`, `bank_unsupported`, `bank_nre_nro_incompatible`, `bank_verification_pending`, `bank_manual_review_required`, `b13_save_exit_selected`.

## 17. Engineering Notes

- Provider, account-ownership method, verification SLA, and reconciliation behavior are UNKNOWN.
- Coordinate with bank-management states A23-A27 and payment/order systems without creating a new module.
- Bank changes must create audit and notification events according to policy.

## 18. Acceptance Criteria

- Incompatible NRE/NRO accounts cannot be confirmed.
- Timeout/pending is not treated as failure or success.
- Bank data is masked and excluded from analytics.
- Reverification and duplicate states are explicit.

## 19. UX Writing Guidance

Explain what is being verified, what account compatibility means at a high level, and what the user can do if their bank is unsupported.

## 20. Design Notes

Bank verification is both a trust and operational-risk checkpoint. Make the account context and verification result unambiguous.

---

# B14 – Nominee Details

## 1. Screen Purpose
Capture the nominee decision and required nominee details under the applicable policy.

## 2. User Goal
Understand whether nomination is required or optional, add accurate nominee information, or record a permitted decision not to nominate.

## 3. Business Goal
Meet applicable nominee requirements, reduce future servicing disputes, and preserve an auditable nomination choice.

## 4. Entry Conditions

- Identity, personal, account, and policy context is available.
- Nominee requirement/option is returned by the server.

## 5. Exit Conditions

- Valid nominee details or permitted no-nominee decision opens B15.
- Missing guardian/relationship/identity details remain for correction.
- Restricted or review-required nomination routes to B19/support.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Nominee explanation and requirement status.
3. Radio/selection: add nominee, update nominee, or permitted no-nominee decision.
4. Nominee detail form with relationship and conditional guardian information.
5. Consent/confirmation section.
6. Primary CTA: Continue.
7. Secondary action: Save and exit.
8. Footer with nomination disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Radio, Text Field, Select, Date Picker if required, Checkbox, Card, Alert/Banner, Button, Link.
- New: None required; use existing grouped form and consent patterns.

## 8. Information Priority

1. Requirement/choice.
2. Nominee details and conditional guardian fields.
3. Confirmation and next action.

## 9. Interaction Behaviour

- **Tap:** Choose nominee path, add/edit details, reveal guardian fields, continue, save/exit, help.
- **Scroll:** Form/disclosures may scroll.
- **Keyboard:** Logical order and accessible selection groups.
- **Validation:** Required fields, age/guardian, relationship, identity, and duplicate rules server-side.
- **Loading:** Requirement and save status loading.
- **Disabled:** Continue disabled until selected path is policy-valid.
- **Retry:** Retry save/validation idempotently.
- **Timeout:** Preserve draft and show unknown save status.

## 10. All Screen States

- **Default:** Nominee choice and form available.
- **Loading:** Requirement or save loading.
- **Empty:** No nominee details supplied; show permitted first action.
- **Success:** Nominee decision/details recorded; route to B15.
- **Error:** Missing/invalid/duplicate/guardian conflict or service error.
- **Offline:** Draft-only if approved; no final confirmation.
- **Restricted:** Nominee choice/edit unavailable under policy.
- **Suspended:** Nominee data held for review.

## 11. Validation Rules

- Nominee requirement and no-nominee availability are policy-driven.
- Nominee identity and relationship fields must meet current rules.
- Guardian details are required when the nominee is below the applicable age threshold; exact threshold is UNKNOWN.
- Do not silently replace an existing nominee.

## 12. Error Behaviour

Use field-level correction and clear policy messages for missing guardian/identity information. Do not imply the user is non-compliant when the policy requires review.

## 13. Success Behaviour

Confirm only that the nominee decision/details were recorded for the onboarding case.

## 14. Motion Recommendation

Use restrained conditional field reveal and save feedback. Preserve focus when guardian fields appear.

## 15. Accessibility

- Selection group labels and conditional relationships are semantic.
- Guardian fields announce why they appeared.
- Errors identify the exact nominee field.

## 16. Analytics Events

`b14_viewed`, `nominee_path_selected`, `nominee_started`, `nominee_field_completed`, `guardian_details_shown`, `nominee_validation_failed`, `nominee_saved`, `no_nominee_confirmed`, `b14_continued`, `b14_save_exit_selected`.

## 17. Engineering Notes

- Nominee rules, minimum fields, guardian threshold, and retention are UNKNOWN.
- Nominee changes require immutable audit history and policy version.
- Do not expose raw nominee PII to analytics.

## 18. Acceptance Criteria

- User can distinguish adding nominee from a permitted no-nominee decision.
- Conditional guardian requirements are explicit.
- No duplicate or silent replacement behavior.

## 19. UX Writing Guidance

Use neutral, plain language and explain the practical purpose of nomination without making legal promises.

## 20. Design Notes

This screen should support a deliberate decision, not push the user toward or away from nomination.

---

# B15 – Document Upload

## 1. Screen Purpose
Collect only the documents required by the current policy decision and provide clear evidence status, quality, and recovery behavior.

## 2. User Goal
Know which documents are required, upload acceptable evidence securely, and correct/retry rejected items without restarting onboarding.

## 3. Business Goal
Obtain complete, usable evidence, reduce operations rework, and preserve chain-of-custody/audit data.

## 4. Entry Conditions

- Prior regulatory declarations and policy decisions determine the required document set.
- Upload service and approved file rules are available.

## 5. Exit Conditions

- All required documents are accepted/verified or policy permits pending review: opens B16.
- Rejected/missing documents remain for correction.
- Provider/service failure routes to retry or B19 where human review is required.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Evidence Requirement Checklist showing required, optional, received, rejected, expired, and pending items.
3. Document upload controls per requirement with accepted type/size guidance.
4. Preview/replace/remove controls where policy permits.
5. Upload and verification status per document.
6. Primary CTA: Continue to review.
7. Secondary action: Save and exit.
8. Privacy, retention, and support footer.

## 7. Component Placement

- Existing: Page Header, Step Indicator, File Upload/Document Preview, Card, Badge/Status Chip, Progress Indicator, Alert/Banner, Button, Link, Loading/Error State.
- New: Evidence Requirement Checklist, required to express policy-driven document lifecycle and completeness.

## 8. Information Priority

1. What is required and why.
2. Each document’s status and next action.
3. Upload quality/format guidance.
4. Privacy and retention.

## 9. Interaction Behaviour

- **Tap:** Select file/camera source where supported, upload, preview, replace, remove, retry, continue, save/exit.
- **Scroll:** Checklist may scroll; failed/rejected items remain discoverable.
- **Keyboard:** Upload has a non-drag, keyboard-accessible path; preview has text alternative.
- **Validation:** Type, size, integrity, malware, legibility, expiry, duplicate, and policy checks server-side.
- **Loading:** Per-file upload/verification progress; prevent duplicate upload.
- **Disabled:** Continue disabled until required files reach accepted/pending-permitted state.
- **Retry:** Retry individual upload/verification without duplicating evidence.
- **Timeout:** Mark item status unknown and offer refresh; do not delete the file automatically.

## 10. All Screen States

- **Default:** Requirement checklist and upload actions available.
- **Loading:** Requirements, upload, scan, or verification loading.
- **Empty:** No documents supplied; show first required document.
- **Success:** Required evidence accepted; route to B16.
- **Error:** Invalid type/size, unreadable, expired, duplicate, scan failure, or service error.
- **Offline:** Preserve unsent local draft only if approved; no upload confirmation.
- **Restricted:** Upload type/source or document action not permitted.
- **Suspended:** Evidence held for fraud/compliance/manual review.

## 11. Validation Rules

- Required set is policy-driven and may change after earlier data changes.
- File constraints, scanning, integrity, and expiry are server-authoritative.
- Accepted evidence has a stable reference and audit record.
- Raw documents are never sent to analytics.

## 12. Error Behaviour

Show item-level reason categories and a direct remedy: replace, retry, provide another document, wait, or contact support.

## 13. Success Behaviour

Show document acceptance status and continue only when required evidence is accepted or an explicit pending-review state is allowed.

## 14. Motion Recommendation

Use per-document progress and stable state transitions. Do not remove rejected items or move the user’s focus unexpectedly.

## 15. Accessibility

- Upload controls support keyboard and assistive technology.
- Status is text-based and announced.
- Preview controls have labels and a document alternative.
- Error summary links to the affected item.

## 16. Analytics Events

`b15_viewed`, `document_requirement_opened`, `document_upload_started`, `document_upload_succeeded`, `document_upload_failed`, `document_scan_pending`, `document_rejected`, `document_expired`, `document_replaced`, `document_removed`, `b15_continued`, `b15_save_exit_selected`.

## 17. Engineering Notes

- Storage/scanning vendors, file limits, retention, and accepted document taxonomy are UNKNOWN.
- Use encrypted storage, malware scanning, immutable evidence references, and access controls.
- Upload/scan status must be idempotent and resumable.

## 18. Acceptance Criteria

- Checklist clearly distinguishes required, accepted, rejected, expired, and pending.
- No upload is shown as accepted before server confirmation.
- Individual recovery does not restart the document set.

## 19. UX Writing Guidance

Explain the document purpose, accepted formats, quality requirements, privacy, and the action after rejection without blaming the user.

## 20. Design Notes

Evidence status is the core of this screen. Optimize for confidence and recoverability, not upload volume.

---

# B16 – Review & Confirmation

## 1. Screen Purpose
Provide a complete, structured review of onboarding data, declarations, evidence, and unresolved policy states before final submission/eSign.

## 2. User Goal
Inspect, correct, and explicitly confirm the information and declarations that will be submitted.

## 3. Business Goal
Reduce post-submission corrections, create an auditable confirmation boundary, and ensure the user understands what is being finalized.

## 4. Entry Conditions

- All required onboarding sections have accepted or policy-permitted pending statuses.
- No blocking validation or restricted state remains unresolved.

## 5. Exit Conditions

- Confirmation opens B17 eSign.
- Edit action returns to the relevant screen without losing the review context.
- Blocking issue routes back to the affected screen.

## 6. Layout Structure

Top to bottom:

1. Header and final progress indicator.
2. Review Summary Block containing sections for identity, account type, tax/residency, risk/experience, bank, nominee, documents, declarations, and status.
3. Per-section edit links with clear data source/status.
4. Outstanding/pending/review warning block if policy allows continuation.
5. Final Regulatory Consent Block and confirmation checkbox.
6. Primary CTA: Confirm and continue to eSign.
7. Secondary action: Save and exit.
8. Footer with final declaration and privacy disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Accordion, Card, Badge/Status Chip, Link, Checkbox, Button, Alert/Banner, Timeline, Audit Metadata Block.
- New: Review Summary Block, required to establish a stable, sectioned confirmation boundary without duplicating every screen’s form layout.

## 8. Information Priority

1. Blocking issues and unresolved statuses.
2. Data/declaration summary.
3. Edit links.
4. Final confirmation and eSign transition.

## 9. Interaction Behaviour

- **Tap:** Expand section, edit, review declaration, accept confirmation, continue, save/exit.
- **Scroll:** Full review scrolls; primary action must not obscure the final confirmation.
- **Keyboard:** Accordions, edit links, checkbox, and confirmation are accessible in logical order.
- **Validation:** Revalidate the case and policy version before final confirmation.
- **Loading:** Refresh/revalidation and submit progress shown; prevent duplicate confirmation.
- **Disabled:** Continue disabled until all blocking issues are resolved and confirmation accepted.
- **Retry:** Retry revalidation without losing review state.
- **Timeout:** Show review stale; require refresh before confirmation.

## 10. All Screen States

- **Default:** Complete review available.
- **Loading:** Case refresh/revalidation loading.
- **Empty:** No reviewable onboarding data; route to B01/B02 safely.
- **Success:** Confirmation recorded; route to B17.
- **Error:** Missing section, stale data, policy conflict, or service failure.
- **Offline:** Cached review may be shown stale; confirmation disabled.
- **Restricted:** Final confirmation blocked by policy.
- **Suspended:** Review held for human/compliance decision.

## 11. Validation Rules

- All displayed data must reflect the current authoritative case version.
- Blocking errors and unresolved required documents/declarations must be visible.
- Final confirmation is explicit, versioned, timestamped, and bound to the case.
- Edit actions must invalidate/recalculate dependent sections according to policy.

## 12. Error Behaviour

Show a summary first, link to each affected section, and explain whether correction, refresh, or review is required. Never hide a blocking state below the fold without an accessible summary.

## 13. Success Behaviour

Confirm that the onboarding information was reviewed and confirmed, then hand off to eSign. Do not state onboarding completion yet.

## 14. Motion Recommendation

Use restrained accordion and validation transitions. Do not auto-collapse a section containing an error.

## 15. Accessibility

- Summary sections use semantic headings and expanded/collapsed states.
- Blocking issues are announced and linked to their source.
- Confirmation text is programmatically associated with the checkbox.
- Focus returns to the edited section after navigation back.

## 16. Analytics Events

`b16_viewed`, `review_section_opened`, `review_edit_selected`, `review_blocking_issue_shown`, `review_confirmation_viewed`, `review_confirmation_accepted`, `review_revalidation_started`, `review_revalidation_failed`, `review_confirmed`, `b16_save_exit_selected`.

## 17. Engineering Notes

- Review must use a versioned immutable snapshot/reference, not independently re-read mutable fields.
- Revalidation must identify changed dependencies and return affected section IDs.
- Final confirmation and declaration audit data must be retained under policy.

## 18. Acceptance Criteria

- All major onboarding sections are represented with current status and edit path.
- Blocking issues cannot be missed or bypassed.
- Confirmation is explicit and distinct from eSign and onboarding success.

## 19. UX Writing Guidance

Use “Review and confirm” rather than “Submit” until the final handoff is understood. Explain what becomes part of the record.

## 20. Design Notes

This is the final comprehension checkpoint. Information hierarchy should favor accuracy and consequences over visual density.

---

# B17 – eSign

## 1. Screen Purpose
Initiate and complete the approved electronic-signature process for the onboarding record.

## 2. User Goal
Understand what is being signed, complete the signature securely, and recover if the provider handoff is interrupted.

## 3. Business Goal
Obtain a valid, auditable signature and synchronize provider outcome with the onboarding case without duplicate requests.

## 4. Entry Conditions

- B16 review confirmation is recorded.
- eSign provider, document package, consent, and identity prerequisites are valid.

## 5. Exit Conditions

- Completed signature opens B18 or B19 based on authoritative processing status.
- Failure opens B20 or a retry state.
- User cancellation routes to a safe pending/return state without deleting the onboarding case.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. eSign Status Block explaining document package, signer identity, and provider handoff.
3. Consent/terms acknowledgement if required before initiation.
4. Primary CTA: Start eSign.
5. Provider return instructions and support path.
6. Persistent status after redirect/callback.
7. Footer with signature/privacy disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Checkbox, Button, Link, Alert/Banner, Loading/Error State, Secure Link/Share, Timeline.
- New: eSign Status Block, required to distinguish initiation, redirect, signing, callback, pending, and completion.

## 8. Information Priority

1. What will be signed.
2. Current eSign state and required action.
3. Return/recovery instructions.

## 9. Interaction Behaviour

- **Tap:** Review package, accept required consent, initiate eSign, return/refresh, support.
- **Scroll:** Document summary and legal disclosures may scroll.
- **Keyboard:** All controls and provider return actions accessible.
- **Validation:** Case, signer identity, document hash/version, and consent validated server-side.
- **Loading:** Initiation/callback processing shown; prevent duplicate requests.
- **Disabled:** Start disabled until package and consent are valid.
- **Retry:** Retry initiation only when the prior request is known not to have created an active signing request.
- **Timeout:** Show pending/unknown and status refresh; never create a second signing request blindly.

## 10. All Screen States

- **Default:** eSign package ready.
- **Loading:** Package preparation, initiation, callback, or processing pending.
- **Empty:** No signable package; block and route to B16/support.
- **Success:** Signature completed and accepted; route to B18/B19.
- **Error:** Consent, provider, identity, package, callback, or signature failure.
- **Offline:** No initiation or completion confirmation.
- **Restricted:** eSign unavailable for policy/provider/account state.
- **Suspended:** Signature or onboarding held for compliance/security review.

## 11. Validation Rules

- Package and content hash must match the reviewed snapshot.
- Signer identity must match the approved onboarding identity.
- eSign request is single-use/idempotent and time-limited.
- Provider callbacks are authenticated, replay-protected, and case-bound.

## 12. Error Behaviour

Distinguish user cancellation, provider failure, expired request, callback delay, identity mismatch, and policy hold. Give a safe resume or review route.

## 13. Success Behaviour

Confirm only when the authoritative eSign result is accepted. State whether onboarding is complete or still processing.

## 14. Motion Recommendation

Use clear handoff and processing feedback. Do not show a completion transition before callback verification.

## 15. Accessibility

- Document/signing purpose is textually available.
- Provider handoff and return instructions are accessible.
- Status changes are announced and focus is restored after return.

## 16. Analytics Events

`b17_viewed`, `esign_package_loaded`, `esign_consent_accepted`, `esign_initiation_started`, `esign_redirected`, `esign_returned`, `esign_callback_received`, `esign_completed`, `esign_cancelled`, `esign_failed`, `esign_pending`, `esign_retry_selected`.

## 17. Engineering Notes

- eSign provider, callback contract, document package, signature validity, and retention are UNKNOWN.
- Store provider reference, document hash, case ID, policy version, and outcome; never raw signature data in analytics.
- Reconciliation is required when provider and onboarding statuses disagree.

## 18. Acceptance Criteria

- No duplicate active eSign request is created by retry.
- Signed package matches the reviewed snapshot.
- Provider return, timeout, pending, cancellation, and failure are recoverable.

## 19. UX Writing Guidance

Explain the document scope and the difference between starting eSign, completing it, and onboarding approval.

## 20. Design Notes

eSign should feel like a controlled handoff, not an external dead end. The return state is as important as the initiation state.

---

# B18 – Onboarding Success

## 1. Screen Purpose
Confirm the authoritative completion outcome and present only the next actions permitted by the resulting account/compliance state.

## 2. User Goal
Know what completed, what reference to retain, and what they can do next.

## 3. Business Goal
Close the onboarding journey accurately, create confidence, and route the user to the correct next product state without overpromising.

## 4. Entry Conditions

- Server confirms onboarding/eSign/compliance completion according to the product’s defined success state.

## 5. Exit Conditions

- User returns to the approved destination, such as dashboard or next investment prerequisite.
- Documents/reference can be opened through approved secure links.
- If downstream processing remains pending, route to B19 rather than showing success.

## 6. Layout Structure

Top to bottom:

1. Header and completed-progress context.
2. Success Status Block stating the exact completed state.
3. Case/account reference and completion timestamp.
4. Next-action Card listing permitted next steps and any remaining limitations.
5. Secure document/reference actions.
6. Primary CTA: Continue to next permitted destination.
7. Secondary action: Contact support.
8. Footer with disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Button, Link, Secure Link/Share, Audit Metadata Block.
- New: None required; use existing status and reference patterns.

## 8. Information Priority

1. Exact completed state.
2. Reference and timestamp.
3. What can happen next and what remains restricted.

## 9. Interaction Behaviour

- **Tap:** Continue, open reference/document, support, return.
- **Scroll:** Supporting disclosures may scroll.
- **Keyboard:** All actions accessible.
- **Validation:** Destination and entitlements validated server-side before navigation.
- **Loading:** Reference/document retrieval may load independently.
- **Disabled:** Actions disabled while destination/entitlement status is unresolved.
- **Retry:** Retry reference retrieval or destination loading.
- **Timeout:** Preserve success state but mark dependent destination unknown; do not duplicate onboarding.

## 10. All Screen States

- **Default:** Authoritative success state and next actions available.
- **Loading:** Completion/reference status loading.
- **Empty:** No completion reference; show safe support/status route.
- **Success:** Exact onboarding completion confirmed.
- **Error:** Completion/reference retrieval conflict or service error.
- **Offline:** Show cached completion with timestamp; dependent actions may be disabled.
- **Restricted:** Completion exists but a downstream action is restricted.
- **Suspended:** Completion is superseded by a hold/review; route to B19.

## 11. Validation Rules

- Success is shown only from an authoritative onboarding state.
- Reference and timestamp are case-bound and non-sensitive.
- Do not represent eSign completion alone as onboarding success.

## 12. Error Behaviour

If services disagree, show the last authoritative state and route to B19/support. Never guess between success and pending.

## 13. Success Behaviour

State exactly what is complete, what is not, and the next permitted action.

## 14. Motion Recommendation

Use restrained completion feedback. Avoid celebratory motion that could obscure remaining restrictions or regulatory caveats.

## 15. Accessibility

- Completion state is announced as a heading/status.
- Reference and timestamp are readable and copyable where permitted.
- Next actions have descriptive accessible names.

## 16. Analytics Events

`b18_viewed`, `onboarding_completed`, `onboarding_reference_opened`, `onboarding_document_opened`, `onboarding_next_action_selected`, `onboarding_success_downstream_restricted`, `onboarding_support_selected`.

## 17. Engineering Notes

- Success state must be derived from the onboarding state machine, not client navigation.
- Completion reference, policy version, and final decision audit event are required.
- Entitlement propagation may be eventual; expose that as B19 if not complete.

## 18. Acceptance Criteria

- No pending case is displayed as success.
- Reference and exact completion state are available.
- Next actions respect current entitlement and compliance state.

## 19. UX Writing Guidance

Use exact state language and avoid “fully approved” unless that is the authoritative state. Tell users what they can do now.

## 20. Design Notes

Success is a regulatory outcome, not merely a celebratory moment. Clarity about remaining limitations is mandatory.

---

# B19 – Onboarding Pending

## 1. Screen Purpose
Show the authoritative pending, review, reconciliation, or delayed-processing state after onboarding cannot yet be completed.

## 2. User Goal
Know that the case exists, understand its current stage and next action, and avoid duplicate submissions.

## 3. Business Goal
Reduce duplicate cases and support contacts, expose operational ownership/SLA appropriately, and converge multi-service statuses into one trustworthy view.

## 4. Entry Conditions

- A required provider, compliance, operations, bank, document, or eSign process is pending.
- Notification/deep link or resumed case opens the status screen.

## 5. Exit Conditions

- Completed state opens B18.
- More information required routes to the affected onboarding screen with the same case.
- Failure routes to B20 only when the authoritative state is failed.
- Suspension/escalation remains pending with human ownership.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. Onboarding Status Timeline showing completed, pending, review, and next steps.
3. Case/reference and last-updated information.
4. Policy Status Block for the pending dependency and owner/channel where available.
5. Required-action section when additional information is requested.
6. Primary CTA: Refresh status or Continue required action.
7. Secondary action: Return to account/support.
8. Footer with privacy and review disclosures.

## 7. Component Placement

- Existing: Page Header, Badge/Status Chip, Timeline, Card, Button, Link, Alert/Banner, Loading Skeleton, Error State.
- New: Onboarding Status Timeline, required to unify provider and human-review progress without exposing internal workflow details.

## 8. Information Priority

1. Current pending state and case reference.
2. Required action, if any.
3. Last update, owner, and next update expectation.
4. Safe support/return actions.

## 9. Interaction Behaviour

- **Tap:** Refresh, continue required action, contact support, return to account.
- **Scroll:** Timeline and policy detail may scroll; current status remains discoverable.
- **Keyboard:** Timeline details and actions accessible.
- **Validation:** Refresh validates ownership and case version.
- **Loading:** Status refresh/polling progress and last-known timestamp shown.
- **Disabled:** Actions disabled when the state does not permit them.
- **Retry:** Refresh with backoff; no duplicate onboarding submission.
- **Timeout:** Show last-known status and stale timestamp; do not move to success/failure.

## 10. All Screen States

- **Default:** Pending case and timeline available.
- **Loading:** Case/status lookup pending.
- **Empty:** No case found; route safely to B01/support, never fabricate pending.
- **Success:** Case completed; route to B18.
- **Error:** Case unavailable, status conflict, or service failure.
- **Offline:** Last known status shown as stale; refresh disabled.
- **Restricted:** Case details/actions limited by authorization/policy.
- **Suspended:** Case/security/compliance hold shown with owner/status and no bypass.

## 11. Validation Rules

- Case access and status are server-authoritative.
- State transitions are versioned and monotonic except documented re-open/review paths.
- Required action appears only when permitted by the case state.

## 12. Error Behaviour

Distinguish stale, missing, unauthorized, service failure, provider delay, and policy hold. Show the last authoritative state when statuses conflict.

## 13. Success Behaviour

Route to B18 only when onboarding completion is authoritative. Do not auto-authenticate unless the approved contract permits it.

## 14. Motion Recommendation

Use restrained timeline updates and accessible refresh feedback. Avoid distracting polling motion.

## 15. Accessibility

- Timeline uses semantic headings and status text.
- Current state, last updated, and required action are announced.
- Refresh and support controls remain keyboard accessible.

## 16. Analytics Events

`b19_viewed`, `onboarding_status_loaded`, `onboarding_status_refreshed`, `onboarding_status_refresh_failed`, `onboarding_required_action_opened`, `onboarding_pending_owner_viewed`, `onboarding_case_completed`, `onboarding_case_failed`, `onboarding_case_suspended`, `onboarding_last_known_status_shown`.

## 17. Engineering Notes

- State machine must support provider pending, compliance review, operations review, reconciliation, more-information-required, completed, failed, expired, and suspended states where applicable.
- Polling, push, and deep-link updates must converge on one authoritative event stream.
- Human ownership/SLA data is policy- and operations-defined; currently UNKNOWN.

## 18. Acceptance Criteria

- No duplicate submission is possible from B19.
- Pending is not represented as success or failure.
- Stale/offline states are explicit.
- Required actions return to the same case.

## 19. UX Writing Guidance

Avoid vague “under review” language when last update, owner, or next action is available. Never promise an unconfirmed completion time.

## 20. Design Notes

B19 is the trust surface for operational delay. The user should understand what is happening without seeing internal reviewer notes or provider diagnostics.

---

# B20 – Onboarding Failed

## 1. Screen Purpose
Explain an authoritative onboarding failure, distinguish recoverable from final outcomes, and provide the approved correction, retry, appeal, or support path.

## 2. User Goal
Understand what failed at a safe level, know whether action is possible, and avoid restarting or resubmitting incorrectly.

## 3. Business Goal
Reduce repeat failures and operational load, preserve compliance controls, and provide a controlled recovery path for legitimate users.

## 4. Entry Conditions

- The onboarding state machine returns a final or actionable failure outcome.
- Failure reason category and permitted next action are available from the server.

## 5. Exit Conditions

- Correctable failure returns to the affected screen with the same case.
- Retryable provider failure returns to the controlled retry state.
- Review/appeal/support opens B19 or an approved support route.
- Final policy failure remains with a safe explanation and no bypass.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. Policy Status Block stating failure category and current case status.
3. Affected checkpoint summary without exposing sensitive provider/risk details.
4. Correction/retry/review instructions.
5. Primary CTA: Correct and continue or Retry, based on server action.
6. Secondary action: Contact support or return to account.
7. Case/reference and audit-safe support information.
8. Footer with privacy and regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Alert/Banner, Error State, Button, Link, Timeline, Audit Metadata Block.
- New: Reuse Policy Status Block and Onboarding Status Timeline; no additional component is required.

## 8. Information Priority

1. Exact safe failure category.
2. Whether the user can correct/retry or needs review.
3. Affected checkpoint and case reference.

## 9. Interaction Behaviour

- **Tap:** Correct, retry, review/status, support, return.
- **Scroll:** Explanation and disclosures may scroll.
- **Keyboard:** All recovery actions accessible.
- **Validation:** Retry/correction eligibility and case ownership server-side.
- **Loading:** Retry/status/case transition progress shown.
- **Disabled:** Actions disabled while state is loading or policy prohibits action.
- **Retry:** Only server-marked retryable actions; idempotent and rate-limited.
- **Timeout:** Preserve failure state and show unknown action status; do not create a new case.

## 10. All Screen States

- **Default:** Failure category and permitted actions available.
- **Loading:** Failure/action lookup pending.
- **Empty:** No failure case found; route to B01/B19/support safely.
- **Success:** Correction/retry accepted; route to the affected checkpoint or B19.
- **Error:** Failure detail unavailable or action failed.
- **Offline:** Show cached failure and disable server-dependent recovery.
- **Restricted:** No self-service action permitted; support/review only.
- **Suspended:** Failure/case held by compliance/security; no bypass.

## 11. Validation Rules

- Failure status must be authoritative and case-bound.
- User-visible reason is a safe category, not raw provider diagnostics.
- A new case cannot be created while an active failed case has an approved recovery path, unless policy permits it.
- Retry attempts are rate-limited and audited.

## 12. Error Behaviour

Distinguish correctable data issue, retryable service/provider issue, review-required issue, and final policy restriction. Give one clear next action and a support route.

## 13. Success Behaviour

Confirm only that the correction/retry/review request was accepted and state the next status surface. Do not claim onboarding success.

## 14. Motion Recommendation

Use restrained error-to-recovery transition. Do not use alarming or celebratory motion for regulatory outcomes.

## 15. Accessibility

- Failure state is announced as a status heading.
- Reason and next action are associated.
- Error details are text-based and do not rely on colour.
- Focus moves to the primary recovery action or error summary.

## 16. Analytics Events

`b20_viewed`, `onboarding_failure_shown`, `onboarding_failure_reason_viewed`, `onboarding_correction_selected`, `onboarding_retry_started`, `onboarding_retry_succeeded`, `onboarding_retry_failed`, `onboarding_review_selected`, `onboarding_support_selected`, `onboarding_final_restriction_shown`.

## 17. Engineering Notes

- Failure reason taxonomy, appeal/review behavior, retry limits, and retention are UNKNOWN.
- Use stable failure codes for QA/support while mapping to safe user copy.
- Reconciliation is required if providers report success after the onboarding case records failure.

## 18. Acceptance Criteria

- Failure is not shown for pending or unknown states.
- Correctable/retryable/review/final outcomes are distinct.
- Recovery does not create duplicate cases or bypass policy.
- Sensitive provider diagnostics are not exposed.

## 19. UX Writing Guidance

Be direct without blame. Say what happened at a safe level, what the user can do next, and when support or review is required.

## 20. Design Notes

The failure experience should preserve dignity and momentum while making compliance boundaries firm and understandable.

---

# Module-Level Handoff Rules

## Cross-screen consistency

- B01-B20 use one onboarding case ID, policy version, correlation ID, and state machine.
- B02 country and B03 account type are policy-driving inputs; changes must re-evaluate dependent declarations, bank compatibility, documents, and review status.
- B04 PAN reuses A04’s locked behavior and must not introduce a second PAN contract.
- B05 CKYC, B06 digital identity consent, B08 FATCA, B09 CRS, B10 tax residency, B11 risk, B12 experience, B13 bank, B14 nominee, B15 documents, B16 review, and B17 eSign each have distinct completion states.
- B18 success, B19 pending, and B20 failed are mutually exclusive authoritative outcomes for the current onboarding case at a given version.
- Back, save/exit, resume, notification, and support deep links preserve the same case and cannot bypass a blocking checkpoint.

## Required low-fidelity wireframe coverage

For every screen, the wireframe set must include the default structure plus representative state annotations for loading, empty, success, error, offline, restricted, and suspended. These are state variants, not new product screens.

## Required QA coverage

- First-time, returning, resume, deep-link, back-navigation, save/exit, refresh, duplicate-submit, stale-case, offline/online, timeout, provider callback, policy change, and accessibility navigation.
- Regulatory branching for country/account type, FATCA/CRS/tax residency, risk/experience, bank compatibility, nominee, document requirements, and review outcomes.
- Cross-service reconciliation between CKYC, identity provider, bank provider, document service, eSign provider, compliance review, and onboarding case state.
- PII redaction in analytics, logs, support tools, screenshots, and error reports.

## Required decisions before high-fidelity design

- Exact regulatory copy and consent versions: UNKNOWN.
- Provider/vendor contracts and callback states: UNKNOWN.
- Country/account eligibility and NRE/NRO rules: UNKNOWN.
- Question schemas/scoring for FATCA, CRS, risk, and investment experience: UNKNOWN.
- Tax identifier/jurisdiction rules: UNKNOWN.
- Bank verification, document, nominee, eSign, review, and SLA policies: UNKNOWN.

## Wireframe Readiness Checklist

- [x] Only B01-B20 are included.
- [x] Every screen uses the same 20-section structure as Authentication v1.0.
- [x] Authentication patterns are reused rather than redesigned.
- [x] B04 explicitly reuses the approved A04 PAN contract.
- [x] Regulatory consent, tax residency, risk response, evidence, review, eSign, and onboarding-status patterns are defined only where required.
- [x] Default, loading, empty, success, error, offline, restricted, and suspended states are defined for every screen.
- [x] Sensitive data, audit, analytics, retry, timeout, accessibility, and engineering behavior are specified.
- [ ] Regulatory wording, provider contracts, and policy decisions remain to be confirmed before implementation sign-off.

**Handoff decision:** Ready for low-fidelity wireframe implementation. High-fidelity design and implementation sign-off remain conditional on resolving the explicit regulatory, policy, vendor, and operational unknowns above.

# A21 – Account Recovery

## 1. Screen Purpose
Collect and submit the minimum evidence needed for human or policy-controlled recovery when normal login, contact, or device recovery is insufficient.

## 2. User Goal
Understand what evidence is needed, submit it securely, know what happens next, and avoid repeatedly restarting the case.

## 3. Business Goal
Recover legitimate users through a controlled process, prevent identity takeover, give operations/compliance a complete case, and make SLA ownership visible.

## 4. Entry Conditions

- A16, A17, A18, A03, or support escalation determines that self-service evidence is insufficient.
- The user has no active recovery case, or an existing case is resumable.

## 5. Exit Conditions

- Complete submission creates a recovery case and opens A22.
- Missing/invalid evidence remains on A21 with clear correction guidance.
- A duplicate active case routes to the existing A22 case rather than creating another case.
- A policy restriction or security hold routes to support without bypass.

## 6. Layout Structure

Top to bottom:

1. Header with safe back and help.
2. Identity Recovery Context Panel explaining why self-service recovery is insufficient.
3. Recovery Evidence Checklist showing required, optional, received, rejected, and pending evidence.
4. Evidence collection sections: verified channel, identity details, approved document/evidence upload only if defined by policy.
5. Consent, privacy, and contact-preference section.
6. Review/confirmation section summarizing what will be submitted and what remains unknown.
7. Primary CTA: Submit recovery request.
8. Secondary CTA: Save and return later, contact support.
9. Recovery SLA Summary explaining expected review ownership and next update without inventing a time.
10. Footer with privacy, retention, and security disclosures.

## 7. Component Placement

- Existing: Page Header, Step/Progress Indicator, Card, File Upload/Document Preview if approved, Checkbox, Text Field, Button, Alert/Banner, Timeline, Loading/Error State, Audit Metadata Block.
- New: Identity Recovery Context Panel, Recovery Evidence Checklist, Recovery SLA Summary, Contact Change Impact Notice where contact changes are requested.

## 8. Information Priority

1. Why recovery is needed and what assurance is required.
2. Evidence checklist and outstanding actions.
3. Privacy/consent and submission consequence.
4. SLA, ownership, and support route.

## 9. Interaction Behaviour

- **Tap:** Expand evidence requirement, upload or enter evidence, review, submit, save, or contact support.
- **Scroll:** Long evidence and legal sections scroll; persistent primary action must not obscure errors or required consent.
- **Keyboard:** All fields support keyboard navigation; uploads must have a non-drag alternative.
- **Validation:** Validate required fields, document type/size/content, consent, evidence freshness, and case ownership server-side.
- **Loading:** Show section-level upload/verification progress and page-level submission progress; prevent duplicate submission.
- **Disabled:** Submit disabled until required evidence, consent, and policy checks are complete.
- **Retry:** Retry failed evidence upload/verification without duplicating evidence; preserve successful items.
- **Timeout:** Mark the request unknown and allow status refresh; do not create another case until the server confirms no case exists.

## 10. All Screen States

- **Default:** Evidence checklist and required actions available.
- **Loading:** Existing-case lookup, evidence validation, upload, or submission pending.
- **Empty:** No evidence has been supplied; explain required first action rather than presenting a blank form.
- **Success:** Recovery case created; transition to A22 with case reference and next update state.
- **Error:** Field/evidence error, duplicate case, service failure, or policy rejection with correction or escalation.
- **Offline:** Preserve unsent safe draft only if approved; clearly mark that nothing was submitted and disable submission.
- **Restricted:** Recovery cannot proceed under current policy; show support and do not offer a bypass.
- **Suspended:** Account/case/security hold; show the owner/status route and prohibit repeated submissions.

## 11. Validation Rules

- Evidence requirements are server-defined, policy-versioned, and case-specific.
- Uploads are type, size, malware, integrity, and expiry checked before acceptance.
- Documents must be encrypted in transit and stored under approved retention rules.
- Required consent and purpose limitation are explicit.
- A user cannot create multiple active recovery cases for the same identity context.
- Any contact change is separated from recovery approval and requires A02 verification.

## 12. Error Behaviour

Show field-level errors for correctable input, item-level errors for evidence, and page-level errors for service/policy states. Explain whether the user should correct, retry, wait, or contact support.

## 13. Success Behaviour

Create one case, show the case reference and current status, explain the next update mechanism, and route to A22. Do not imply that recovery or KYC is approved.

## 14. Motion Recommendation

Use progressive disclosure for checklist sections and clear status transitions for evidence. Avoid auto-scrolling or focus jumps that could cause missed consent or error context.

## 15. Accessibility

- Checklist status is available as text, not colour alone.
- Upload controls support keyboard, assistive technology, and non-drag selection.
- Error summaries link to each affected evidence item.
- Consent and retention text are readable and programmatically associated.
- Progress and pending state announcements do not interrupt data entry.

## 16. Analytics Events

`a21_viewed`, `recovery_case_resumed`, `evidence_requirement_opened`, `evidence_started`, `evidence_uploaded`, `evidence_rejected`, `evidence_verified`, `consent_viewed`, `consent_accepted`, `recovery_review_started`, `recovery_submitted`, `recovery_case_created`, `recovery_duplicate_case_found`, `recovery_escalated`, `recovery_submission_failed`.

## 17. Engineering Notes

- Recovery is a state machine with immutable evidence and audit events, not a mutable form submission.
- Case ownership, SLA, policy version, reviewer actions, and evidence hashes must be available to operations/compliance.
- File scanning and storage vendors are UNKNOWN and must be selected before implementation.
- PII/document data must be access-controlled, encrypted, retained, and deleted according to approved policy.
- Submission must be idempotent and return a stable case ID.

## 18. Acceptance Criteria

- A21 cannot create duplicate active cases.
- All required evidence and consent rules are explicit and server-authoritative.
- Successful submission opens A22 with a stable case reference.
- Upload, validation, offline, timeout, restricted, suspended, and duplicate-case states are defined.
- No evidence or raw PII is sent to analytics.

## 19. UX Writing Guidance

Be transparent about review, evidence use, retention, and next updates. Never promise approval or an exact SLA unless supplied by the governing service.

## 20. Design Notes

This screen must reduce uncertainty without weakening controls. The evidence checklist and ownership/SLA summary are the primary trust mechanisms.

---

# A22 – Recovery Pending

## 1. Screen Purpose
Give the user a reliable, understandable status view after a recovery case is submitted and while the system or a human reviewer determines the outcome.

## 2. User Goal
Know that the request exists, understand its current status and next action, and avoid duplicate submissions or unsafe workarounds.

## 3. Business Goal
Reduce duplicate cases and support contacts, make ownership/SLA visible, and provide a single authoritative status surface for recovery.

## 4. Entry Conditions

- A21 successfully created a case.
- Recovery notification deep link, support link, or a resumed recovery case.

## 5. Exit Conditions

- Completed recovery routes to the approved next step, usually A03 or a controlled security confirmation.
- More information required routes back to A21 with the same case.
- Rejected or expired cases route to the approved support/new-case decision; do not silently restart.
- Suspended cases remain on the status view with human ownership.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit and help.
2. Status header showing recovery case state and non-sensitive case reference.
3. Recovery Status Timeline: submitted, verification, review, decision, next action.
4. Recovery SLA Summary with last updated time, expected next update only when authoritative, and owner/channel.
5. Required-action section if evidence or clarification is needed.
6. Safe actions: Continue required evidence, contact support, return to login, refresh status.
7. Notification preference/help section where policy permits.
8. Footer with privacy and security information.

## 7. Component Placement

- Existing: Page Header, Badge/Status Chip, Timeline, Card, Button, Link, Alert/Banner, Loading Skeleton, Error State, Empty State.
- New: Recovery SLA Summary, Recovery Status Timeline configuration, Human Ownership Block if a human reviewer owns the case.

## 8. Information Priority

1. Current recovery status and case reference.
2. Required action, if any.
3. Last update, owner, and next update expectation.
4. Support and safe return options.

## 9. Interaction Behaviour

- **Tap:** Refresh status, continue required evidence, contact support, return to login, or open notification/help detail.
- **Scroll:** Timeline and policy content scroll; current status and primary required action remain discoverable.
- **Keyboard:** All actions and timeline details are keyboard accessible.
- **Validation:** Required-action forms use A21 rules; refresh validates case ownership and authorization.
- **Loading:** Show status refresh/polling progress and last-known status.
- **Disabled:** Refresh is disabled during request; actions are disabled when case state does not permit them.
- **Retry:** Refresh may retry with backoff; failed notification delivery does not alter case status.
- **Timeout:** Show last updated time and “status could not be refreshed”; never move a case to success on timeout.

## 10. All Screen States

- **Default:** Active pending case with timeline and next update information.
- **Loading:** Case lookup or status refresh pending.
- **Empty:** No case is associated with the current authorized context; route to A21 or support, never show a fabricated pending state.
- **Success:** Recovery completed; show approved next action and whether a new login/device challenge is required.
- **Error:** Case unavailable, service failure, or status conflict with retry/support.
- **Offline:** Show last known status with timestamp; disable refresh-dependent actions and clearly state that it may be stale.
- **Restricted:** Case details/actions are hidden or limited by authorization; provide safe support route.
- **Suspended:** Case/account/security hold shown with owner/status and no bypass action.

## 11. Validation Rules

- Case access requires a valid authenticated/recovery token and ownership check.
- Status transitions are server-authoritative and monotonic except for explicitly documented re-open/review states.
- A completed case cannot be resubmitted from A22.
- “Required action” is only shown when the case state permits it.
- Case reference is non-sensitive and safe to share with support.

## 12. Error Behaviour

Distinguish stale status, missing case, unauthorized access, service failure, and policy hold. If a status conflict occurs, show the last authoritative state and route to support rather than guessing.

## 13. Success Behaviour

For completed recovery, explain exactly what access is restored and what security step remains. Do not automatically authenticate the user unless the approved security contract explicitly permits it.

## 14. Motion Recommendation

Use restrained timeline/status updates. Polling must not create distracting motion; announce updates accessibly and preserve the user’s reading position.

## 15. Accessibility

- Timeline is represented with semantic headings and status text.
- Current state and required action are announced.
- Last-updated information is programmatically associated with the status.
- Refresh and support controls have clear names and keyboard focus.

## 16. Analytics Events

`a22_viewed`, `recovery_status_loaded`, `recovery_status_refreshed`, `recovery_status_refresh_failed`, `recovery_required_action_opened`, `recovery_case_completed`, `recovery_case_rejected`, `recovery_case_expired`, `recovery_case_suspended`, `recovery_support_opened`, `recovery_last_known_status_shown`.

## 17. Engineering Notes

- Use a documented recovery state machine: Submitted, Verification, Review, More Information Required, Approved/Completed, Rejected, Expired, Suspended, and Escalated where applicable.
- Polling/backoff and push/deep-link updates must converge on the same event-sourced status.
- Status updates need optimistic-concurrency/version checks.
- Notify appropriate verified channels on material state changes; do not include sensitive evidence in notifications.

## 18. Acceptance Criteria

- A22 never fabricates a pending or completed state when no case exists.
- The screen is safe to revisit from notifications and support.
- Stale/offline status is clearly labeled.
- Required actions return to the same case and do not create duplicates.
- Completion does not imply KYC or investment approval.

## 19. UX Writing Guidance

Use explicit status labels and explain what the user should do now, if anything. Avoid vague “under review” language without last update, owner, or next action when those are available.

## 20. Design Notes

A22 is the trust surface for the entire recovery system. It should make waiting, escalation, and completion understandable without exposing internal review data.

---

# Module-Level Handoff Rules

## Cross-screen state consistency

- A01 registration context, A02 verified contact, A04 PAN result, A16/A17 recovery checkpoints, A18 device status, A19 sessions, A20 trust, and A21/A22 case state must use one shared identity/recovery status model.
- Screen copy may simplify a state, but it must not contradict the authoritative state or suggest a later checkpoint is complete.
- Route transitions must carry a non-sensitive correlation ID and originating screen ID for support and analytics.
- Back navigation must preserve a resumable case, but must not bypass a required security checkpoint.

## Required notification behavior

- Material contact, device, session, and recovery changes should notify appropriate verified channels according to policy.
- Notifications must be generic enough not to expose sensitive identity data on a lock screen or shared inbox.
- Notification delivery failure must not change the underlying account/recovery state.

## Required QA coverage

- First-time, returning, deep-link, refresh, back-navigation, duplicate-submit, timeout, offline/online recovery, expired challenge, rate limit, suspended account, restricted country/policy, accessibility navigation, and screen-reader announcement coverage.
- Cross-device email-link and recovery handoff testing.
- Event schema validation with PII redaction.
- Session/device revocation propagation testing across all clients.

## Required engineering decisions before high-fidelity design

- Exact login identifier and credential contract: UNKNOWN.
- Approved OTP/email-link vendors and delivery SLAs: UNKNOWN.
- PAN/identity provider and response taxonomy: UNKNOWN.
- Recovery evidence types, reviewer roles, SLA, and retention policy: UNKNOWN.
- Session/device data model and revocation propagation time: UNKNOWN.
- Notification channels and policy-approved content: UNKNOWN.

These unknowns must be resolved before final copy approval and before interactive prototypes are treated as implementation-ready.

## Wireframe Readiness Checklist

- [x] Screen IDs and scope are limited to the requested Authentication & Identity module.
- [x] Each screen specifies structure, behavior, states, validation, errors, success, analytics, engineering, accessibility, and acceptance criteria.
- [x] Recovery, device, session, and contact-change consequences are represented without adding a new module.
- [x] Sensitive identity data handling is defined at the UX and analytics boundary.
- [x] Offline, restricted, suspended, timeout, and duplicate-action behavior is defined.
- [ ] Vendor, SLA, evidence, retention, and exact policy contracts are confirmed by stakeholders.

**Handoff decision:** The module is ready for wireframe specification and Figma structure work, subject to resolving the explicit engineering/compliance unknowns above before implementation sign-off.

# A16 – Forgot Email

## 1. Screen Purpose
Provide a safe path for a user who cannot recall the registered email, without revealing whether an account exists.

## 2. User Goal
Use an already trusted contact or approved identity challenge to recover the registered email or continue to account recovery.

## 3. Business Goal
Recover legitimate users, reduce support load, prevent account enumeration, and avoid creating a duplicate account.

## 4. Entry Conditions

- A03 Forgot email link, A02 channel-change action, support deep link, or A21 recovery handoff.
- The user may be unauthenticated; a recovery correlation ID may already exist.

## 5. Exit Conditions

- Successful challenge returns a masked/revealed-safe email confirmation or continues to A03.
- Insufficient evidence routes to A21.
- Rate-limited, restricted, or suspicious activity routes to the safe support/recovery state.

## 6. Layout Structure

Top to bottom:

1. Public Header with back and help.
2. Recovery context section explaining that email recovery requires proof of control of another trusted factor.
3. Alternate verified channel input or selected channel summary.
4. Security challenge section using OTP or equivalent approved challenge.
5. Optional confirmation step for the new/recovered contact result; never show an unmasked email by default.
6. Primary CTA: Continue recovery/Verify.
7. Secondary actions: Use another method, Return to sign in.
8. Inline error/status region.
9. Footer with privacy and security support.

## 7. Component Placement

- Existing: Page Header, Masked Field, OTP Input, Button, Link, Alert/Banner, Inline Message, Loading/Error State.
- New: Identity Recovery Context Panel and Security Challenge Summary.

## 8. Information Priority

1. Why proof is required.
2. The alternate channel and challenge.
3. Safe result and next action.
4. Recovery/support alternatives.

## 9. Interaction Behaviour

- **Tap:** Submit alternate channel, enter challenge, choose another recovery method, or return to login.
- **Scroll:** Keep challenge and primary action available; secondary policy information may scroll.
- **Keyboard:** Correct input mode for alternate channel and OTP; support paste/autofill where secure.
- **Validation:** Local format plus server-side ownership and case checks.
- **Loading:** Lock the active action while challenge is sent or verified.
- **Disabled:** Continue disabled until required data is valid and challenge complete.
- **Retry:** Respect server cooldowns; retry does not create a new recovery case unless explicitly required.
- **Timeout:** Expire the challenge and offer resend or another method.

## 10. All Screen States

- **Default:** Alternate factor and challenge path available.
- **Loading:** Challenge or recovery lookup pending.
- **Empty:** No alternate factor is available; explain that A21 is required.
- **Success:** A safe masked email confirmation or authenticated continuation is available.
- **Error:** Invalid/expired challenge, provider failure, or insufficient evidence with next actions.
- **Offline:** No challenge submission or account result; retry after connectivity returns.
- **Restricted:** Recovery method unavailable under policy.
- **Suspended:** Recovery attempts held; route to support or A21 with no account detail.

## 11. Validation Rules

- Do not confirm whether the entered channel belongs to an account.
- Challenge must be bound to the current case/session and be single-use.
- Recovered email is masked unless policy explicitly permits a controlled reveal.
- A changed contact must not be used as an authentication factor until its verification completes.

## 12. Error Behaviour

Use generic failure language for unknown account/contact combinations. Provide distinct messages only for format, expiry, cooldown, offline, or service availability.

## 13. Success Behaviour

Confirm the recovery checkpoint without exposing unnecessary PII. If authentication is not yet complete, route to A03 or A21 rather than silently signing in.

## 14. Motion Recommendation

Use only challenge progress, cooldown, and state transitions. Avoid reveal animations for sensitive contact data.

## 15. Accessibility

- Make masked result and reveal controls accessible.
- Announce challenge expiry and cooldown.
- Associate errors with fields and keep focus in the recovery task.
- Provide a text alternative to any email-link or device handoff.

## 16. Analytics Events

`a16_viewed`, `forgot_email_started`, `alternate_channel_submitted`, `recovery_challenge_sent`, `recovery_challenge_verified`, `forgot_email_succeeded`, `forgot_email_failed`, `alternate_method_selected`, `forgot_email_rate_limited`, `forgot_email_suspended`.

## 17. Engineering Notes

- Use generic response timing and copy to limit enumeration.
- Notify existing trusted channels of sensitive recovery activity where policy permits.
- Do not return raw email in API payloads unless the presentation policy explicitly allows it.
- Create or reuse a recovery case with idempotency and audit logging.

## 18. Acceptance Criteria

- Account existence cannot be inferred.
- An unverified new contact cannot become a login factor.
- All challenge and recovery states are recoverable or clearly routed to A21.
- Sensitive values are masked and excluded from analytics.

## 19. UX Writing Guidance

Use “We’ll check the information you provide” rather than “We found your account.” Explain what the user can do if they no longer control the alternate channel.

## 20. Design Notes

Keep this path shorter than full account recovery when evidence is sufficient, but never weaken the evidence threshold to reduce friction.

---

# A17 – Forgot Mobile

## 1. Screen Purpose
Provide a safe path for a user who cannot recall or no longer has access to the registered mobile number.

## 2. User Goal
Verify control of an alternate trusted factor, recover the mobile context, or submit a controlled recovery request.

## 3. Business Goal
Recover legitimate users while preventing SIM-swap, contact takeover, enumeration, and duplicate-account creation.

## 4. Entry Conditions

- A03 Forgot mobile, A02 change-channel action, support deep link, or A21 recovery handoff.

## 5. Exit Conditions

- Successful alternate-factor verification returns to A03 or continues the approved recovery path.
- New mobile verification must use A02 before the number becomes trusted.
- Insufficient evidence routes to A21; suspicious or rate-limited activity remains restricted.

## 6. Layout Structure

Top to bottom:

1. Public Header with back/help.
2. Recovery context and reason for alternate proof.
3. Alternate trusted channel input or summary.
4. Security challenge section.
5. New mobile entry section only after policy allows it.
6. New mobile verification handoff to A02 where required.
7. Primary CTA and secondary recovery choices.
8. Inline status/error region.
9. Privacy/security footer.

## 7. Component Placement

- Existing: Page Header, Country Selector/phone country selector, Masked Field, OTP Input, Button, Link, Alert/Banner, Inline Message.
- New: Identity Recovery Context Panel, Contact Change Impact Notice, Security Challenge Summary.

## 8. Information Priority

1. The alternate proof required.
2. Whether the mobile is being recovered or changed.
3. Verification status and consequence of success.
4. Other recovery/support options.

## 9. Interaction Behaviour

- **Tap:** Choose country code, enter alternate factor, submit challenge, add new mobile only when enabled, or choose A21.
- **Scroll:** Keep active challenge usable; allow policy/help content to scroll.
- **Keyboard:** Phone keyboard and OTP autofill are supported; normalize country code server-side.
- **Validation:** Validate country, number format, ownership challenge, duplicate mobile, and change restrictions.
- **Loading:** Disable active action while challenge or uniqueness checks are pending.
- **Disabled:** New mobile fields remain unavailable until the recovery checkpoint is passed.
- **Retry:** Respect challenge and SIM-risk cooldowns; do not resend indefinitely.
- **Timeout:** Expire the challenge, preserve the case, and offer resend/alternate method.

## 10. All Screen States

- **Default:** Alternate proof path available.
- **Loading:** Challenge, number verification, or risk evaluation pending.
- **Empty:** No alternate factor; route to A21.
- **Success:** Alternate proof passed; new mobile verification can proceed or login can resume.
- **Error:** Invalid challenge, invalid mobile, duplicate number, provider failure, or insufficient evidence.
- **Offline:** No verification or contact change is confirmed.
- **Restricted:** Mobile change not permitted by policy or account state.
- **Suspended:** SIM/device-risk hold or repeated failures; show safe support path.

## 11. Validation Rules

- Country code and mobile format are server-compatible.
- New mobile must not be attached to another investor identity unless an approved resolution process exists.
- New mobile is not trusted until A02 succeeds.
- Contact change impact must be explicit: existing sessions/devices may be revoked and notifications sent.

## 12. Error Behaviour

Do not disclose whether a mobile is registered or belongs to another account. Use actionable categories for format, challenge, policy, cooldown, and service failure.

## 13. Success Behaviour

Confirm only the completed checkpoint. If the number changed, explain what security effects apply and require A02 before activation.

## 14. Motion Recommendation

Use feedback for challenge, cooldown, and contact-change status. Do not animate a new mobile into a trusted state before verification.

## 15. Accessibility

- Country code and mobile fields have distinct labels.
- OTP and phone autofill do not bypass accessible status announcements.
- Errors are text-based and field-associated.
- Recovery consequences are available before confirmation.

## 16. Analytics Events

`a17_viewed`, `forgot_mobile_started`, `alternate_channel_submitted`, `recovery_challenge_sent`, `recovery_challenge_verified`, `new_mobile_started`, `new_mobile_submitted`, `new_mobile_verification_required`, `forgot_mobile_succeeded`, `forgot_mobile_failed`, `contact_change_restricted`.

## 17. Engineering Notes

- Integrate phone verification and SIM/device-risk services as separate dependencies.
- Revoke or step-up sessions according to a versioned contact-change policy.
- Notify old and new channels where legally and operationally permitted.
- Preserve audit evidence for before/after contact state without exposing raw values in logs.

## 18. Acceptance Criteria

- No unverified new mobile becomes trusted.
- SIM-risk, duplicate, rate-limit, timeout, offline, restricted, and suspended states are covered.
- Contact-change consequences are visible before confirmation.
- Account enumeration is prevented.

## 19. UX Writing Guidance

Explain the difference between finding a forgotten number and changing a number. Use clear security language without creating panic.

## 20. Design Notes

The highest-risk moment is the transition from alternate proof to new mobile. The wireframe must make that boundary explicit.

---

# A18 – Device Recovery

## 1. Screen Purpose
Help a legitimate user recover access when the current device is unrecognised, lost, reset, or no longer trusted.

## 2. User Goal
Understand why additional verification is required, prove control through an approved factor, and regain access without weakening device security.

## 3. Business Goal
Prevent account takeover, provide a controlled recovery route, revoke risky sessions/devices, and reduce avoidable support escalations.

## 4. Entry Conditions

- A03 risk challenge, unrecognised-device alert, A20 device action, security notification, or support referral.

## 5. Exit Conditions

- Successful recovery establishes a new session/device state according to policy.
- Existing risky sessions/devices may be revoked with explicit confirmation.
- Insufficient evidence routes to A21; security hold routes to A22 if a case is created.

## 6. Layout Structure

Top to bottom:

1. Header with safe back and help behavior.
2. Security context section: current device status and why recovery is needed, without exposing risk-engine internals.
3. Last-known access/device summary using masked metadata.
4. Security Challenge Summary and approved verification method.
5. Recovery actions: verify, use another method, revoke risky device/session where allowed.
6. Human-support escalation section.
7. Primary CTA and secondary actions.
8. Inline status/timeline region.
9. Security footer.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, OTP Input or Text Field, Button, Dialog, Alert/Banner, Timeline, Loading/Error State.
- New: Security Challenge Summary, Session and Device Status Row, Identity Recovery Context Panel.

## 8. Information Priority

1. Current security state and required action.
2. Verification method and consequences.
3. Device/session actions.
4. Support and policy information.

## 9. Interaction Behaviour

- **Tap:** Start challenge, choose another method, revoke a device/session, confirm recovery, or contact support.
- **Scroll:** Device/session context may scroll; primary recovery action stays available.
- **Keyboard:** Follow the selected challenge input contract; support autofill where secure.
- **Validation:** Server validates device risk, challenge, session ownership, and policy.
- **Loading:** Lock security actions while evaluation or revocation is pending.
- **Disabled:** Revocation is disabled when policy requires human review or the target is the current essential session.
- **Retry:** Retry risk evaluation or challenge only when marked retryable.
- **Timeout:** Expire the recovery challenge and require a new challenge; do not create a trusted device from stale evidence.

## 10. All Screen States

- **Default:** Unrecognised/lost device context and approved recovery action shown.
- **Loading:** Risk evaluation, challenge, or revocation pending.
- **Empty:** No device metadata available; use generic security context and do not block safe recovery solely on missing display data.
- **Success:** New session/device recovery completed; show next security action.
- **Error:** Challenge, risk, revocation, or service failure with retry/escalation.
- **Offline:** No trust or revocation decision can complete; show cached context only as stale.
- **Restricted:** Device recovery method not permitted; route to A21.
- **Suspended:** Security hold; do not offer bypass; route to support/A22.

## 11. Validation Rules

- Recovery evidence must be bound to the case, session, and current device context.
- A device is not trusted until the server confirms recovery and policy evaluation.
- Revocation must be explicit, idempotent, and protected from accidental self-lockout.
- Do not disclose exact risk signals, device fingerprint, or security thresholds.

## 12. Error Behaviour

Explain whether the user can retry, use another method, or needs review. Do not provide attacker-useful detail about why a device failed risk evaluation.

## 13. Success Behaviour

Confirm recovery and state whether the device is trusted, provisional, or still subject to an additional challenge. Provide a route to A19/A20 for review.

## 14. Motion Recommendation

Use clear, non-urgent transitions for security status changes, revocation completion, and escalation. Avoid countdown motion except for challenge expiry.

## 15. Accessibility

- Device summaries have meaningful text labels, not icon-only identification.
- Status changes are announced.
- Confirmation dialogs state exactly which session/device is affected.
- Do not rely on visual device similarity to identify the current device.

## 16. Analytics Events

`a18_viewed`, `device_risk_shown`, `device_recovery_started`, `device_challenge_started`, `device_challenge_succeeded`, `device_challenge_failed`, `device_revocation_started`, `device_revocation_succeeded`, `alternate_recovery_selected`, `device_recovery_escalated`, `device_recovery_suspended`.

## 17. Engineering Notes

- Device identity must use privacy-preserving identifiers and a documented retention policy.
- Coordinate session revocation with A19 and trusted-device state with A20.
- Enforce server-side step-up, replay protection, rate limits, and secure storage.
- A failed device recovery must not silently create a second account.

## 18. Acceptance Criteria

- Unknown device cannot bypass the approved challenge.
- Current session cannot be accidentally revoked without a clear confirmation and safe fallback.
- Successful recovery produces a consistent session/device state in A19/A20.
- Security holds route to human review without exposing internal risk reasons.

## 19. UX Writing Guidance

Use calm, specific language: “We need to verify this device” rather than “This device is dangerous.” Explain the user’s next safe option.

## 20. Design Notes

Design this as a security checkpoint, not a generic error page. The user must understand both the recovery action and its security consequences.

---

# A19 – Active Sessions

## 1. Screen Purpose
Let an authenticated user inspect active sessions and revoke sessions they no longer recognize or need.

## 2. User Goal
Identify current and other sessions, understand last activity and device context, and revoke safely.

## 3. Business Goal
Increase account control and trust, reduce support cases, and create a reliable session-revocation control plane.

## 4. Entry Conditions

- Authenticated account/security settings, A18 device recovery, security alert, or a support-approved deep link.

## 5. Exit Conditions

- User returns to account/security settings or the originating security task.
- A selected session is revoked after confirmation and server completion.
- If the account is suspended, the screen becomes review-only or routes to support.

## 6. Layout Structure

Top to bottom:

1. Authenticated Header with back and security help.
2. Context/explanation of session control.
3. Current session Card, clearly marked and protected from accidental removal.
4. Other active sessions list using Session and Device Status Rows.
5. Per-session revoke actions and optional “revoke all other sessions” action.
6. Last-updated/status area.
7. Security/support footer.

## 7. Component Placement

- Existing: App Shell, Page Header, Card, Table/Data Table or list, Badge/Status Chip, Dialog, Button, Empty State, Loading Skeleton, Error State, Alert/Banner.
- New: Session and Device Status Row; use Audit Metadata Block for last activity/policy context where needed.

## 8. Information Priority

1. Current session and safety of the account.
2. Other sessions and their activity context.
3. Revoke action and consequence.
4. Help and security guidance.

## 9. Interaction Behaviour

- **Tap:** Open session details, revoke one, or revoke all others.
- **Scroll:** Session list scrolls; each action remains associated with its row.
- **Keyboard:** Rows and actions are keyboard navigable; focus returns to the affected row after revocation.
- **Validation:** Server confirms session ownership, current-session protection, and revocation status.
- **Loading:** Load list progressively if needed; show row-level action progress.
- **Disabled:** Revoke action disabled during request or where policy prohibits it.
- **Retry:** Retry list load or revocation without duplicating the action.
- **Timeout:** Refresh session data before destructive action if the list is stale.

## 10. All Screen States

- **Default:** Current and other sessions available.
- **Loading:** Session list or revocation request pending.
- **Empty:** No sessions beyond the current session; explain that this is a secure normal state.
- **Success:** Revocation completed and list refreshed with updated timestamp.
- **Error:** List or revocation failed; retain known data as stale and offer retry.
- **Offline:** Show cached list as stale and disable revocation.
- **Restricted:** User can view but cannot revoke due to permission/security policy.
- **Suspended:** Show security hold and support route; avoid presenting stale controls as active.

## 11. Validation Rules

- Current session must be clearly identified.
- Revoke-all excludes the current session unless an explicit logout-all policy exists and is separately confirmed.
- Revocation is idempotent; already-revoked sessions resolve to the final state.
- Session data has a freshness timestamp.

## 12. Error Behaviour

Use row-level errors for a single revoke and page-level errors for list failure. Explain if a session disappeared because it was already revoked or expired.

## 13. Success Behaviour

Update the affected row immediately only after server confirmation, then refresh the authoritative list. Provide a safe confirmation and correlation/reference in support context, not in a transient message only.

## 14. Motion Recommendation

Use subtle row status transition after server confirmation. Do not animate a row away before the revoke result is authoritative.

## 15. Accessibility

- Each session row has a complete accessible label including device/location/time only where safe.
- Revoke dialogs state the exact target and consequence.
- Dynamic list updates are announced.
- Avoid relying on device icons or colour to identify sessions.

## 16. Analytics Events

`a19_viewed`, `sessions_loaded`, `session_details_opened`, `session_revoke_started`, `session_revoke_succeeded`, `session_revoke_failed`, `revoke_all_started`, `revoke_all_succeeded`, `session_stale_shown`, `session_restricted_shown`.

## 17. Engineering Notes

- Session service must expose current-session identity, status, last activity, device label, and freshness.
- Revocation must propagate to token/session stores, web/mobile clients, notifications, and audit logs.
- Use eventual-consistency messaging if revocation propagation is not immediate.

## 18. Acceptance Criteria

- User can distinguish current session from other sessions.
- Revoke actions require confirmation and are idempotent.
- Offline/stale states never present revocation as complete.
- A19 and A20 reflect consistent session/device revocation outcomes.

## 19. UX Writing Guidance

Use “session” consistently; do not call every session a device. State last activity only when reliable and explain when data is approximate or stale.

## 20. Design Notes

This screen is a trust feature. Clarity of ownership and recency is more important than density of information.

---

# A20 – Trusted Devices

## 1. Screen Purpose
Let an authenticated user review devices allowed to reduce step-up friction and revoke device trust.

## 2. User Goal
Recognize trusted devices, understand their trust status and recency, and remove trust safely.

## 3. Business Goal
Reduce takeover risk, make device trust transparent, and lower support demand from lost or replaced devices.

## 4. Entry Conditions

- Authenticated security settings, A18 device recovery, security alert, or an approved support link.

## 5. Exit Conditions

- User returns to security settings or the originating task.
- Device trust is revoked after server confirmation.
- New trust is created only through the approved device-recovery or login challenge; A20 is not an unverified “add device” shortcut.

## 6. Layout Structure

Top to bottom:

1. Authenticated Header with security help.
2. Context explaining what trusted device means and what it does not mean.
3. Current device/trust status Card.
4. Trusted-device list using Session and Device Status Rows.
5. Revoke actions with confirmation.
6. Guidance for lost/replaced devices linking to A18.
7. Status/freshness and security footer.

## 7. Component Placement

- Existing: App Shell, Page Header, Card, list/table, Badge/Status Chip, Dialog, Button, Empty State, Loading Skeleton, Error State, Alert/Banner.
- New: Session and Device Status Row and Security Challenge Summary where a step-up is required before revocation.

## 8. Information Priority

1. Current device and trust state.
2. Other trusted devices and last-use context.
3. Revoke action and consequence.
4. Lost-device recovery guidance.

## 9. Interaction Behaviour

- **Tap:** Open device details, revoke trust, or open A18.
- **Scroll:** Device list scrolls; row action remains associated with the device.
- **Keyboard:** All rows/actions are keyboard accessible; focus returns to the changed row.
- **Validation:** Server validates trust ownership, current-device protection, and any required step-up.
- **Loading:** Show list/action progress; no optimistic trust changes.
- **Disabled:** Revoke disabled during request or when policy requires a higher assurance challenge.
- **Retry:** Retry list or revocation with idempotency.
- **Timeout:** Refresh before revoking if the trust record is stale.

## 10. All Screen States

- **Default:** Trusted devices list and current-device status available.
- **Loading:** Device list or revocation pending.
- **Empty:** No trusted devices beyond current/provisional device; explain the normal state and A18 path.
- **Success:** Trust revocation completed and list refreshed.
- **Error:** Device service/list/revocation failure with retry.
- **Offline:** Cached list is read-only and marked stale; revocation unavailable.
- **Restricted:** View or revoke is restricted by account/security policy.
- **Suspended:** Device trust management held; route to support/A21 if appropriate.

## 11. Validation Rules

- A device is trusted only after server-confirmed challenge and policy decision.
- Device trust is distinct from active session status; revoking one may or may not revoke the other according to policy and must be explained.
- Current-device protection prevents accidental lockout.
- Device records use privacy-preserving identifiers and bounded retention.

## 12. Error Behaviour

Distinguish stale record, already revoked, service unavailable, step-up required, and security hold. Do not expose device fingerprint or risk-engine details.

## 13. Success Behaviour

Confirm the trust state changed and explain any session effect. Refresh the authoritative list and make A18 available for a lost/replaced device.

## 14. Motion Recommendation

Use a restrained status update after confirmation. Do not visually imply trust removal before the server response.

## 15. Accessibility

- Device identity is described textually.
- Revoke confirmation names the device and consequence.
- List refresh and trust changes are announced.
- Status is not communicated by colour alone.

## 16. Analytics Events

`a20_viewed`, `trusted_devices_loaded`, `trusted_device_details_opened`, `trusted_device_revoke_started`, `trusted_device_revoke_succeeded`, `trusted_device_revoke_failed`, `step_up_required_for_device`, `device_recovery_selected`, `trusted_device_stale_shown`.

## 17. Engineering Notes

- Device trust and session services must expose a consistent relationship model and event propagation.
- Revoke events must invalidate trust caches, update login risk evaluation, notify appropriate channels, and write audit records.
- Do not allow client-only trust state.

## 18. Acceptance Criteria

- Trusted device is not conflated with active session.
- User can revoke trust safely and understand consequences.
- New trust cannot be created directly from this screen without the approved security checkpoint.
- Offline and stale states are read-only.

## 19. UX Writing Guidance

Define “trusted device” in plain language and explain that it reduces challenges but does not bypass account security.

## 20. Design Notes

The most important design decision is explicit separation of device trust, session activity, and account authentication.

---

# A01 – NRI Welcome & Registration

## 1. Screen Purpose
Explain the product’s NRI context, establish the minimum country and eligibility context needed to begin, and start a provisional registration without implying investment eligibility or KYC completion.

## 2. User Goal
Understand whether the service is relevant, choose the relevant country context, and begin registration or sign in if already registered.

## 3. Business Goal
Create qualified registration intent, preserve attribution, avoid unsupported-country onboarding, and route existing users to login rather than creating duplicate accounts.

## 4. Entry Conditions

- Public landing route, campaign/referral link, RM deep link, or a user-selected registration action.
- No authenticated session is required.
- If a valid resumable provisional registration exists, the screen must identify the resumable context without exposing sensitive data.

## 5. Exit Conditions

- Primary CTA creates a provisional registration session and opens A02.
- Existing-user action opens A03.
- Unsupported country routes to a safe restriction explanation and support path.
- Legal/help links open external or in-product content without discarding attribution or provisional context.

## 6. Layout Structure

Top to bottom:

1. App Shell and public Header with product identity and help access.
2. Hero/context section explaining who the service is for and what registration will establish.
3. Country/eligibility context section using a Country Selector; do not present a final eligibility decision here.
4. Optional resumable-registration Card when a server-confirmed provisional session exists.
5. Primary CTA: Start registration.
6. Secondary CTA: Sign in.
7. Contextual Alert/Banner for unsupported or unavailable country policy.
8. Footer with privacy, terms, disclosures, and support links.

## 7. Component Placement

- Existing: App Shell, Page Header, Country Selector, Card, Button, Link, Alert/Banner, legal links.
- New: Provisional Registration Context Panel and Eligibility Decision Block. The latter communicates “continue to verify” or “not currently supported,” never final investment eligibility.

## 8. Information Priority

1. What the product is and who it serves.
2. The action required to begin.
3. Country context and any immediate policy restriction.
4. Existing-user sign-in.
5. Legal and support information.

## 9. Interaction Behaviour

- **Tap:** Country selection updates policy context; Start registration submits only the minimum provisional data; Sign in opens A03.
- **Scroll:** Content may scroll; the primary action remains reachable after the context section, without hiding legal content.
- **Keyboard:** Country selector supports type-ahead and screen-reader selection; no sensitive keyboard is needed.
- **Validation:** Country is required only when policy evaluation needs it. Unknown country is not silently defaulted.
- **Loading:** Disable country changes and Start registration while policy or session creation is pending; show progress near the affected action.
- **Disabled:** Start registration is disabled until required country context and policy response are available.
- **Retry:** Retry policy retrieval or provisional-session creation with the same idempotency key.
- **Timeout:** Preserve selected country locally for the session, explain that service status is unknown, and offer retry without claiming success.

## 10. All Screen States

- **Default:** Context and country selection are available; primary and secondary actions are clear.
- **Loading:** Country policy or provisional session is being fetched/created; prevent duplicate submission.
- **Empty:** No country selected or no resumable registration exists; show the normal starting action, not an error.
- **Success:** Provisional registration session created; transition to A02 with a non-sensitive correlation context.
- **Error:** Policy or session creation failed; keep inputs, show reason category, retry, and support path.
- **Offline:** Public explanatory content remains available; registration creation and policy validation are unavailable.
- **Restricted:** Country or route is unsupported; explain the restriction without suggesting a workaround.
- **Suspended:** Registration start is held due to abuse/security controls; show safe support and retry-after guidance if server-provided.

## 11. Validation Rules

- Country must be selected from the server-provided supported-country taxonomy.
- No country is inferred from IP, device locale, or browser language as an authoritative value.
- A resumed provisional session must match the current session and policy version.
- Start registration must be idempotent.

## 12. Error Behaviour

Use actionable categories: country policy unavailable, service temporarily unavailable, session could not be started, or registration temporarily restricted. Do not reveal internal policy rules or create a false impression of eligibility.

## 13. Success Behaviour

Confirm only that registration has started and move to A02. Preserve country context, attribution, correlation ID, and resumable state.

## 14. Motion Recommendation

Use only state-change feedback: policy result, submission progress, and transition completion. Avoid decorative motion that delays the next action or obscures restriction messaging.

## 15. Accessibility

- Logical reading and focus order follows the hierarchy above.
- Country selection is fully keyboard and screen-reader operable.
- Status changes are announced without moving focus unexpectedly.
- Legal and support links have descriptive names.
- Error and restriction messages are associated with the affected control.

## 16. Analytics Events

`a01_viewed`, `country_selector_opened`, `country_selected`, `unsupported_country_shown`, `registration_started`, `registration_start_failed`, `registration_resume_selected`, `sign_in_selected`, `help_opened`, `legal_link_opened`, `a01_offline_shown`.

## 17. Engineering Notes

- Country policy must be server-authoritative and versioned.
- Persist only minimum provisional data and explicit consent/attribution.
- Use an idempotency key for session creation.
- Return a resumable registration identifier that cannot be used as an authentication credential.
- Do not create a durable investor account before the approved registration checkpoint.

## 18. Acceptance Criteria

- A user cannot proceed without required country context.
- Unsupported-country users receive a safe restricted state and support path.
- Existing users can reach A03 without entering registration.
- Double taps do not create duplicate registration sessions.
- No copy claims KYC, PAN verification, or investment eligibility is complete.
- Offline and timeout states do not claim registration success.

## 19. UX Writing Guidance

Use plain language, explain why country context is needed, distinguish “start registration” from “open an account,” and avoid tax or investment advice. State what happens next and what is not yet confirmed.

## 20. Design Notes

Keep this screen decision-light. It should orient and qualify the user, not front-load KYC, tax residency, nominee, bank, or investment decisions.

---

# A02 – Contact Verification

## 1. Screen Purpose
Verify control of an email address or mobile number using a server-generated challenge before progressing to identity verification or account access.

## 2. User Goal
Receive and complete the correct verification challenge, understand the channel being verified, and recover safely if the challenge does not arrive.

## 3. Business Goal
Establish a reliable contact channel, reduce duplicate accounts and fraud, and create an auditable checkpoint before PAN or account recovery actions.

## 4. Entry Conditions

- A01 provisional registration, a resumable verification session, or a recovery path requiring channel verification.
- A channel and challenge may already exist; the server response determines whether the user sees OTP, link, or a retry state.

## 5. Exit Conditions

- Successful verification opens A04 for registration or returns the user to the originating recovery action.
- Change-channel action returns to the allowed contact entry point without discarding the case.
- Expired or blocked challenge routes to retry, alternate channel, or A21 where policy requires human review.

## 6. Layout Structure

Top to bottom:

1. Header with back behavior that preserves the originating case.
2. Context and progress section stating the current verification checkpoint.
3. Verification Channel Selector or selected-channel summary.
4. Masked contact value and delivery explanation.
5. OTP Input or email-link waiting state.
6. Resend, change channel, and help actions.
7. Primary CTA: Verify.
8. Inline status/error area.
9. Footer with security and privacy guidance.

## 7. Component Placement

- Existing: Page Header, Step Indicator/Progress Indicator, Masked Field, OTP Input, Button, Link, Alert/Banner, Inline Message.
- New: Verification Channel Selector and Identity Recovery Context Panel when invoked from recovery.

## 8. Information Priority

1. Which channel is being verified and why.
2. What the user must do now.
3. Time remaining, attempt/resend guidance, and alternate actions.
4. Security/support explanation.

## 9. Interaction Behaviour

- **Tap:** Enter OTP; open email link; resend; change channel; request help.
- **Scroll:** Keep challenge and primary action within the usable content; legal/security content may scroll.
- **Keyboard:** OTP input accepts numeric entry where applicable, supports paste with sanitization, auto-advances only if accessible, and does not expose the code in analytics.
- **Validation:** Verify only complete, correctly shaped input; server remains authoritative.
- **Loading:** Disable verify/resend while the relevant request is pending; show challenge-specific progress.
- **Disabled:** Verify is disabled until required input is complete; resend is disabled during cooldown.
- **Retry:** Resend generates a new challenge or explicitly reuses one according to policy; old codes must be invalidated or handled by the provider contract.
- **Timeout:** Mark the challenge expired, preserve channel context, and offer resend or allowed alternate channel.

## 10. All Screen States

- **Default:** Active challenge with masked channel and available input.
- **Loading:** Challenge send or verification is pending; prevent duplicate requests.
- **Empty:** No active challenge exists; show a controlled “send verification” action rather than an empty form.
- **Success:** Channel verified; show checkpoint confirmation and continue to the correct next step.
- **Error:** Invalid, expired, or provider-failed challenge; preserve safe context and provide recovery actions.
- **Offline:** Do not submit or confirm verification; offer retry after connectivity returns.
- **Restricted:** Channel type, country, or recovery policy does not permit this method; offer only allowed alternatives.
- **Suspended:** Too many attempts or suspected abuse; show lockout/support guidance without exposing risk rules.

## 11. Validation Rules

- OTP length and character set come from the challenge contract.
- Email-link token is single-use, bound to case/session, time-limited, and replay-protected.
- Resend and verify attempts are rate-limited server-side.
- Channel changes require an explicit action and may require re-authentication or evidence.
- Verification success must be tied to the current registration/recovery case.

## 12. Error Behaviour

Distinguish invalid code, expired code, delivery delay, delivery failure, rate limit, and unavailable service. Never state that an account exists because a channel was recognized.

## 13. Success Behaviour

Confirm only “contact verified.” Continue to A04 for registration or to the originating recovery step. Do not label the user KYC-approved.

## 14. Motion Recommendation

Use restrained feedback for code acceptance, resend cooldown, expiry, and route transition. Do not auto-transition before the success state is announced to assistive technology.

## 15. Accessibility

- OTP fields have one accessible name and a predictable input model.
- Support paste and password-manager/autofill behavior without requiring visual cues.
- Announce resend cooldown and expiry.
- Keep focus on the invalid field or actionable error.
- Provide a non-visual alternative to email-link waiting.

## 16. Analytics Events

`a02_viewed`, `verification_channel_selected`, `challenge_requested`, `challenge_sent`, `otp_started`, `otp_submitted`, `email_link_opened`, `verification_succeeded`, `verification_failed`, `challenge_resent`, `channel_changed`, `challenge_expired`, `verification_rate_limited`, `verification_support_selected`.

## 17. Engineering Notes

- Challenge service must support email and mobile channels through a common contract with channel-specific provider status.
- Use correlation IDs and idempotency for send/resend/verify.
- Do not log raw OTP, email-link token, or contact data.
- Handle email-link opening on another device with a safe handoff or explicit continuation.

## 18. Acceptance Criteria

- Email and mobile variants use consistent structure but correct channel-specific instructions.
- Verification cannot be confirmed from client-side validation alone.
- Expired, invalid, rate-limited, offline, and suspended states are actionable.
- A verified channel is not represented as KYC or identity approval.
- Resend cooldown and attempt limits are server-authoritative.

## 19. UX Writing Guidance

Say exactly which masked channel is being verified, state expected delivery timing without guarantees, provide “didn’t receive it?” help, and avoid language that blames the user.

## 20. Design Notes

Treat A02 as a reusable checkpoint with a stable contract. The originating context must remain visible enough that a user knows whether they are registering or recovering access.

---

# A03 – Login

## 1. Screen Purpose
Authenticate an existing investor through the approved primary credential and any required step-up challenge, while preserving the intended destination.

## 2. User Goal
Sign in securely, understand any additional verification request, and recover access if the primary identifier or device is unavailable.

## 3. Business Goal
Provide low-friction secure access, prevent account enumeration and takeover, preserve deep-link intent, and produce reliable session and security telemetry.

## 4. Entry Conditions

- Public login action, protected-route deep link, session timeout, logout, or security re-authentication.
- Device, session, country context, and risk signals may be available to the server but must not be exposed unnecessarily.

## 5. Exit Conditions

- Successful authentication returns to the requested destination or the approved default home route.
- Forgot Email opens A16; Forgot Mobile opens A17; device/security recovery opens A18 or A21 according to policy.
- Rate-limited, suspended, or failed authentication remains on a safe recovery path.

## 6. Layout Structure

Top to bottom:

1. Public Header with help/security access.
2. Login context and any non-sensitive deep-link return notice.
3. Primary identity input: email/mobile according to supported login contract.
4. Credential or primary verification control.
5. Optional step-up/security challenge summary, shown only when required.
6. Primary CTA: Continue/Sign in.
7. Recovery links: Forgot email, forgot mobile, device recovery, account recovery.
8. Inline status/error area.
9. Footer with privacy, terms, and security support.

## 7. Component Placement

- Existing: Page Header, Text Field, Masked Field, OTP Input if step-up uses OTP, Button, Link, Alert/Banner, Loading/Error State.
- New: Security Challenge Summary and Identity Recovery Context Panel where applicable.

## 8. Information Priority

1. Sign-in task and identity input.
2. Required security challenge.
3. Recovery options.
4. Security, privacy, and support information.

## 9. Interaction Behaviour

- **Tap:** Submit credentials, choose a recovery path, request step-up, or open help.
- **Scroll:** Keep sign-in controls accessible; only secondary content scrolls.
- **Keyboard:** Correct keyboard/input mode for email, mobile, or password; support password-manager/autofill without making it mandatory.
- **Validation:** Validate format locally, identity and credentials server-side; normalize email and mobile according to policy.
- **Loading:** Disable all competing auth actions during authentication; show progress without revealing whether an account was found.
- **Disabled:** Continue disabled for invalid local format or unresolved risk challenge.
- **Retry:** Allow retry within server attempt limits; preserve user-entered non-secret identifier only when safe.
- **Timeout:** Expire the challenge/session, explain the next safe action, and never leave an apparently authenticated screen.

## 10. All Screen States

- **Default:** Credential entry is available.
- **Loading:** Authentication or step-up is pending; prevent duplicate submit.
- **Empty:** No credentials entered; show required-field guidance, not a generic failure.
- **Success:** Authenticated session established; route to the intended destination.
- **Error:** Invalid credentials, challenge failure, provider error, or service error with safe recovery.
- **Offline:** Auth cannot be confirmed; allow retry when online and do not use stale credentials as success.
- **Restricted:** Login or step-up is unavailable due to policy, country, app version, or security restriction.
- **Suspended:** Account/session/device is held; show support and recovery without exposing investigation details.

## 11. Validation Rules

- Identifier format is validated locally; credential acceptance is server-side.
- Do not reveal whether the identifier is registered.
- Step-up challenge is required when the risk policy demands it.
- Session tokens are rotated on successful login and invalidated on logout/revocation according to security policy.
- Login attempts, device risk, and lockout are server-authoritative.

## 12. Error Behaviour

Use a consistent generic authentication failure message for unknown identifier, wrong credential, and account mismatch. Provide distinct actionable messages only for expired challenge, rate limit, offline, or service outage.

## 13. Success Behaviour

Create the authenticated session, record device/session metadata, return to the requested safe destination, and expose session state through A19/A20. Never route to a stale or unauthorized deep link.

## 14. Motion Recommendation

Use state feedback for submit, step-up reveal, error recovery, and successful route transition. Avoid animated retries that can trigger duplicate submissions.

## 15. Accessibility

- Correct autocomplete and input labels; do not rely on placeholders.
- Password/secret visibility control has an accessible name and state.
- Errors are announced and associated with fields.
- Focus moves to the first actionable error, not to an unrelated header.
- Timeout warnings are announced early enough to act.

## 16. Analytics Events

`a03_viewed`, `login_started`, `login_submitted`, `login_succeeded`, `login_failed`, `step_up_required`, `step_up_started`, `step_up_succeeded`, `step_up_failed`, `forgot_email_selected`, `forgot_mobile_selected`, `device_recovery_selected`, `account_recovery_selected`, `login_rate_limited`, `login_suspended`, `login_offline_shown`.

## 17. Engineering Notes

- Preserve and validate return-to route server-side; never trust a client-provided external URL.
- Use secure session cookies/tokens, CSRF protection where applicable, device-risk evaluation, and server-side revocation.
- Redact credentials and secrets from logs, crash reports, analytics, and support tooling.
- Provide deterministic error codes for QA and support while keeping user copy generic.

## 18. Acceptance Criteria

- No account enumeration through copy, status, timing, or field behavior.
- Successful login preserves only authorized deep-link intent.
- Step-up, rate limit, timeout, offline, restricted, and suspended states are defined.
- Double submission cannot create duplicate sessions.
- Logout/revocation behavior is compatible with A19 and A20.

## 19. UX Writing Guidance

Use direct, calm language. Explain what the user can do next without exposing security signals. Separate “could not sign in” from “your access is temporarily held” only when policy permits that distinction.

## 20. Design Notes

Login should remain a focused task. Recovery links are important exits, but must not compete with the primary authentication action.

---

# A04 – PAN Verification

## 1. Screen Purpose
Collect and verify PAN against the approved identity and account context after contact verification, with explicit consent and clear distinction between data verification and investment permission.

## 2. User Goal
Submit accurate PAN information, understand the match result, and continue registration without guessing what the result means.

## 3. Business Goal
Link the correct tax identity, prevent duplicate or fraudulent accounts, establish an auditable verification checkpoint, and route mismatches safely.

## 4. Entry Conditions

- A02 completed successfully for registration, or a server-approved resume state.
- Required consent and provisional registration context are present.
- The user is not already linked to an incompatible account or held by a security policy.

## 5. Exit Conditions

- Successful PAN verification proceeds to the next approved onboarding checkpoint outside this document.
- Mismatch, duplicate, or provider failure remains on A04 with recovery/support or policy-driven escalation.
- A user may safely leave and resume without exposing PAN in the URL or local analytics.

## 6. Layout Structure

Top to bottom:

1. Authenticated/provisional Header with back and help.
2. Step Indicator showing PAN verification as the current checkpoint.
3. Context section explaining why PAN is needed and what this check does not confirm.
4. PAN input using a masked/sensitive field pattern.
5. Optional supporting identity fields only if required by the verification contract; never add unapproved fields.
6. Consent/privacy section with explicit required consent.
7. Primary CTA: Verify PAN.
8. Alternative/support section for mismatch or inability to proceed.
9. Inline result/status area.
10. Footer with privacy, terms, and disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Text Field/Masked Field, Checkbox, Button, Alert/Banner, Inline Message, Loading/Error State, Audit Metadata Block where appropriate.
- New: KYC Evidence Checklist may show the checkpoint but must not imply full KYC approval; Field-Level Masking Pattern is required.

## 8. Information Priority

1. What PAN verification is for and what it does not mean.
2. PAN entry and required consent.
3. Verification result and next action.
4. Support, privacy, and legal detail.

## 9. Interaction Behaviour

- **Tap:** Enter PAN, review consent, submit, open support, or go back.
- **Scroll:** Content may scroll; consent must be reachable and read before submission where policy requires.
- **Keyboard:** Use a text keyboard with controlled uppercase/character normalization; do not expose PAN in autocomplete or logs.
- **Validation:** Local format check, server-side provider/identity match, duplicate and account-compatibility checks.
- **Loading:** Disable input and submit while verification is pending; show a meaningful progress state without promising a time.
- **Disabled:** Submit disabled until format and required consent are valid.
- **Retry:** Allow retry only when the server marks the failure retryable; preserve masked input safely.
- **Timeout:** Mark result unknown, not failed; offer status refresh or retry without making a second identity decision.

## 10. All Screen States

- **Default:** PAN entry and consent are available.
- **Loading:** Provider or identity match is pending; prevent duplicate requests.
- **Empty:** No PAN entered; explain required format and purpose.
- **Success:** PAN verified and linked to the provisional registration; continue to next checkpoint.
- **Error:** Invalid format, mismatch, duplicate, provider failure, or data conflict with specific safe remediation.
- **Offline:** Do not submit or confirm; retain only safe in-session input behavior and offer retry.
- **Restricted:** PAN verification is unavailable for the account type, country, or policy context.
- **Suspended:** Verification is held due to security, duplicate identity, or compliance review; route to support/review status.

## 11. Validation Rules

- PAN must satisfy the current server-defined format and checksum rules where applicable.
- PAN must not be logged, included in analytics, displayed unmasked by default, or placed in URLs.
- Required identity match fields, if any, must be server-defined and clearly labeled.
- Consent must be explicit, versioned, and recorded before verification.
- A mismatch is not silently corrected or overwritten.
- A verified PAN cannot be relinked without the approved recovery/change process.

## 12. Error Behaviour

Distinguish format error, identity mismatch, PAN already linked, provider unavailable, and policy hold. Give the user an action: correct, retry later, continue review, or contact support. Do not provide sensitive provider diagnostics.

## 13. Success Behaviour

Confirm “PAN verification completed” only. State the next checkpoint and preserve the verification reference. Do not state that KYC, FATCA, CRS, tax treatment, or investment eligibility is complete.

## 14. Motion Recommendation

Use restrained loading and result-state transitions. If a result requires review, transition to a persistent status rather than using a transient toast alone.

## 15. Accessibility

- Masking control is keyboard and screen-reader accessible.
- Consent text is programmatically associated with its checkbox.
- Errors identify the exact field or decision and are announced.
- Do not require colour alone to distinguish match, mismatch, or pending.
- Keep focus stable while provider status updates.

## 16. Analytics Events

`a04_viewed`, `pan_entry_started`, `pan_validation_failed`, `pan_consent_viewed`, `pan_consent_accepted`, `pan_verification_submitted`, `pan_verification_succeeded`, `pan_mismatch`, `pan_duplicate_detected`, `pan_provider_failed`, `pan_verification_pending`, `pan_support_selected`.

## 17. Engineering Notes

- Integrate only approved PAN/KYC/identity providers; exact vendor is UNKNOWN until confirmed.
- Use encrypted transport and approved secret/PII handling.
- Store only the minimum PAN representation required for operations, audit, and downstream compliance.
- Use an idempotency key and immutable verification result reference.
- Separate PAN verification status from KYC, FATCA, CRS, and investment eligibility state machines.

## 18. Acceptance Criteria

- PAN cannot be submitted without valid format and required consent.
- No success state is shown on client-side validation alone.
- Match, mismatch, duplicate, pending, timeout, offline, restricted, and suspended outcomes are distinct.
- PAN is masked and absent from analytics/logs/URLs.
- The user can resume without re-entering data when policy permits.

## 19. UX Writing Guidance

Explain purpose, privacy, and result meaning in plain language. Avoid “approved” unless that exact state is returned by the relevant authority and is appropriate for this checkpoint.

## 20. Design Notes

This is a high-trust checkpoint. The wireframe must make the distinction between “data verified” and “account ready to invest” unambiguous.

---
