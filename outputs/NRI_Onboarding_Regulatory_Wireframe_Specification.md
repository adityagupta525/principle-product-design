# NRI Onboarding & Regulatory
## Wireframe Specification

**Role:** Principal UX Design Lead  
**Status:** Extension of Authentication Wireframe Specification v1.0  
**Scope:** Onboarding & Regulatory screens B01-B20 only  
**Specification contract:** This document preserves the approved Authentication v1.0 interaction philosophy, validation philosophy, accessibility principles, analytics conventions, acceptance-criteria style, writing style, and documentation structure.  
**Constraint:** This is a behavioral and structural specification, not a visual design. It intentionally excludes colour, typography, pixel measurements, and visual wireframes.

## 0. Scope and Shared Rules

### Included screens

| ID | Screen | Primary responsibility |
|---|---|---|
| B01 | Welcome to Onboarding | Explain the onboarding checkpoint and prepare the user to provide regulatory information |
| B02 | Country of Residence | Capture and confirm current country context |
| B03 | NRE / NRO Account Selection | Select the permitted account type for the user’s context |
| B04 | PAN Verification | Verify PAN as the onboarding identity checkpoint; reuse A04’s approved PAN contract |
| B05 | CKYC Status | Show CKYC lookup/result and the next permitted action |
| B06 | Aadhaar / DigiLocker Consent | Capture consent and initiate an approved digital identity route |
| B07 | Personal Details | Collect and verify required personal information |
| B08 | FATCA Declaration | Capture FATCA classification and declaration |
| B09 | CRS Declaration | Capture CRS self-certification and declaration |
| B10 | Tax Residency | Capture tax-residency jurisdictions and required identifiers |
| B11 | Risk Profiling | Determine risk profile through approved questions and responses |
| B12 | Investment Experience | Capture investment experience and knowledge context |
| B13 | Bank Account Verification | Add/select and verify the bank account compatible with onboarding context |
| B14 | Nominee Details | Capture nominee decision and nominee information |
| B15 | Document Upload | Collect only the documents required by the policy decision |
| B16 | Review & Confirmation | Let the user inspect and confirm the complete onboarding declaration |
| B17 | eSign | Complete the approved electronic-signature step |
| B18 | Onboarding Success | Confirm onboarding completion and the next permitted action |
| B19 | Onboarding Pending | Show the authoritative pending/review state and next action |
| B20 | Onboarding Failed | Explain a failed onboarding outcome and the approved recovery route |

### Non-goals

- Do not redesign Authentication A01-A04 or A16-A22. B04 reuses the approved A04 PAN pattern and only adds onboarding context.
- Do not infer, promise, or visually imply eligibility for a product, tax treatment, investment permission, or KYC approval unless the authoritative service returns that exact state.
- Do not offer tax, legal, or investment advice. Use disclosures and escalation routes where professional advice is needed.
- Do not introduce a new navigation model or new product module.
- Do not make regulatory declarations optional when the applicable policy requires them.
- Do not collect additional personal or tax data merely because a field could be useful later.

### Shared behavior contract inherited from Authentication v1.0

- Every asynchronous action has explicit loading, timeout, retry, failure, and completion behavior.
- Sensitive values are masked by default. PAN, tax identifiers, bank data, identity documents, and eSign evidence are never sent to analytics as raw values.
- Every regulatory decision, consent, declaration, upload, review confirmation, eSign attempt, and onboarding outcome is audit logged with actor, timestamp, session/device context, correlation ID, policy version, and outcome.
- All retry actions are idempotent. A retry must not create a duplicate declaration, document, bank link, eSign request, onboarding case, or notification.
- Rate limits, cooldowns, attempt counts, policy holds, and review outcomes are server-authoritative.
- A user can leave and resume a safe onboarding case without losing accepted evidence or consent, subject to policy expiry.
- Offline behavior must not imply that a server-side action succeeded.
- “Restricted” means blocked by policy, eligibility, jurisdiction, permission, or missing prerequisite. “Suspended” means held by compliance, operations, fraud, or security.
- A pending state is not a failure and a failure is not an approval. Copy and status labels must preserve that distinction.

### Shared design-system references

Existing components used throughout: App Shell, Page Header, Text Field, Masked Field, Country Selector, Button, Link, Progress Indicator, Step Indicator, Card, Alert/Banner, Inline Message, Dialog, Bottom Sheet, Modal, Toast/Snackbar, Tooltip, Empty State, Loading Skeleton, Error State, Timeline, Checkbox, Radio, Switch, Table/Data Table, Badge/Status Chip, File Upload/Document Preview, Secure Link/Share, Audit Metadata Block.

### New components introduced only where required

- **Onboarding Context Panel:** required to distinguish onboarding progress from authentication and KYC status without repeating large explanations on every screen.
- **Policy Status Block:** required to represent server-returned states such as CKYC found/not found, FATCA/CRS review, bank compatibility, and compliance hold without using generic success/error patterns.
- **Regulatory Consent Block:** required to associate declaration text, purpose, version, consent scope, and explicit user action.
- **Tax Residency Matrix:** required because a user may have multiple tax-residency jurisdictions and each may require a different identifier/status.
- **Risk Response Group:** required to capture an approved response scale and prevent ambiguous free-text risk answers.
- **Evidence Requirement Checklist:** required to show policy-driven required, received, rejected, expired, and pending documents.
- **Review Summary Block:** required to make the final declaration auditable and to separate editable data from immutable policy acknowledgements.
- **eSign Status Block:** required to distinguish redirect, consent, signing, callback, pending, failure, and completion states.
- **Onboarding Status Timeline:** required to explain multi-service and human-review progress without implying that every step is complete.

These components are behavioral contracts. Their visual treatment remains a design-system decision and must not be invented in this document.

### Shared analytics conventions

Each event includes `screen_id`, `session_id`, `correlation_id`, `user_state`, `country_context`, `device_id_hash`, and `policy_version` where permitted. Never send PAN, tax identifiers, bank account numbers, document contents, signatures, raw declarations, or full personal data to analytics. Track reason codes, field categories, response categories, and policy outcomes instead.

### Known unknowns requiring stakeholder confirmation

- Exact regulatory wording, consent versions, retention periods, and jurisdiction rules are UNKNOWN.
- Approved CKYC, DigiLocker, PAN, bank-verification, document, and eSign providers are UNKNOWN.
- Exact NRE/NRO eligibility and compatibility rules are UNKNOWN and must be server-defined.
- Exact supported document types, size limits, review SLAs, and human reviewer ownership are UNKNOWN.
- Whether nominee is mandatory, optional, or conditionally required is UNKNOWN.

---

# B01 – Welcome to Onboarding

## 1. Screen Purpose
Orient the user to the regulated onboarding process, explain what information will be required, and establish a resumable onboarding case without implying that approval is guaranteed.

## 2. User Goal
Understand the purpose, approximate stages, data responsibilities, and safe next action before starting onboarding.

## 3. Business Goal
Set accurate expectations, increase completion quality, reduce abandoned or invalid submissions, and create a single resumable onboarding case.

## 4. Entry Conditions

- A01 contact verification and any prerequisite PAN/account context permitted by policy are complete.
- The user has no active onboarding case, or a server-confirmed resumable case exists.
- An RM or approved deep link may open this screen with a scoped onboarding context.

## 5. Exit Conditions

- Primary CTA creates/resumes the onboarding case and opens B02.
- Resume action opens the first incomplete checkpoint.
- Exit returns to the authenticated/provisional context without deleting the case.
- A policy restriction opens a safe explanation and support path.

## 6. Layout Structure

Top to bottom:

1. Header with back, help, and safe exit behavior.
2. Onboarding Context Panel explaining the purpose and regulated nature of onboarding.
3. Progress overview listing major checkpoints without claiming completion.
4. Data and document preparation Card explaining that requirements depend on country, account type, and policy.
5. Primary CTA: Start onboarding or Continue onboarding.
6. Secondary action: Save and exit.
7. Support and disclosure links.
8. Footer with privacy, terms, and regulatory disclosures.

## 7. Component Placement

- Existing: Page Header, Step/Progress Indicator, Card, Button, Link, Alert/Banner.
- New: Onboarding Context Panel. It is required to separate “onboarding started” from “onboarding approved.”

## 8. Information Priority

1. What onboarding is and what it does not guarantee.
2. What the user should prepare.
3. Current/resumable progress.
4. Start, resume, save, exit, and support actions.

## 9. Interaction Behaviour

- **Tap:** Start, resume, save/exit, help, and disclosure links.
- **Scroll:** The preparation and regulatory explanation may scroll; the primary action remains discoverable.
- **Keyboard:** All links and actions are keyboard accessible.
- **Validation:** Confirm case eligibility and prerequisites server-side before starting/resuming.
- **Loading:** Disable start/resume while case lookup or creation is pending.
- **Disabled:** Primary action is disabled when prerequisites or policy context are unresolved.
- **Retry:** Retry case lookup/creation idempotently.
- **Timeout:** Show unknown status and offer retry; do not create a second case.

## 10. All Screen States

- **Default:** Onboarding explanation and start/resume action available.
- **Loading:** Prerequisite or case state loading.
- **Empty:** No resumable case; show the normal start action.
- **Success:** Case started/resumed; route to B02.
- **Error:** Case lookup/creation failed; preserve context and offer retry/support.
- **Offline:** Informational content remains available; case actions are disabled.
- **Restricted:** Onboarding unavailable for the policy/country/account context.
- **Suspended:** Case held by security/compliance/operations; show owner/status route without bypass.

## 11. Validation Rules

- Only server-confirmed prerequisites may unlock onboarding.
- Start/resume is idempotent and bound to the authenticated/provisional identity context.
- The progress overview reflects the current policy version and may not be hard-coded.

## 12. Error Behaviour

Use actionable categories: prerequisite missing, case unavailable, policy restriction, temporary service issue, or review hold. Avoid vague success language.

## 13. Success Behaviour

Confirm only that onboarding has started or resumed. Preserve case ID, policy version, country context, attribution, and last completed checkpoint.

## 14. Motion Recommendation

Use restrained feedback for case creation/resume and progress disclosure. Do not use motion to imply approval or completion.

## 15. Accessibility

- Progress is represented as text and semantic structure, not visual styling alone.
- Start/resume/save actions have descriptive accessible names.
- Status updates are announced without unexpected focus movement.
- Disclosure and privacy links are keyboard and screen-reader accessible.

## 16. Analytics Events

`b01_viewed`, `onboarding_started`, `onboarding_resumed`, `onboarding_save_exit_selected`, `onboarding_prerequisite_missing`, `onboarding_restricted_shown`, `onboarding_case_lookup_failed`, `onboarding_help_opened`, `onboarding_disclosure_opened`.

## 17. Engineering Notes

- Onboarding case creation must be idempotent and policy-versioned.
- Case state must support resume across sessions and approved devices.
- Do not persist sensitive data beyond the minimum necessary before the relevant checkpoint.
- Exact prerequisite service and case owner are UNKNOWN.

## 18. Acceptance Criteria

- The user can distinguish starting onboarding from completing/being approved.
- Start/resume does not create duplicate cases.
- Current policy-driven progress is shown without false completion.
- Offline, restricted, suspended, and timeout states are safe and actionable.

## 19. UX Writing Guidance

Set expectations honestly, explain that requirements vary by context, and avoid promising a completion time or approval outcome.

## 20. Design Notes

This is an orientation checkpoint. Keep it concise enough to begin, but sufficiently explicit to prevent users from treating regulated declarations as routine profile setup.

---

# B02 – Country of Residence

## 1. Screen Purpose
Capture and confirm the user’s current country of residence as a policy-driving regulatory input.

## 2. User Goal
Select the correct country, understand why it matters, and continue without guessing between residence, citizenship, and tax residency.

## 3. Business Goal
Drive correct jurisdiction rules, prevent unsupported onboarding, and avoid downstream rework caused by an incorrect country context.

## 4. Entry Conditions

- B01 onboarding case is active.
- Country context is missing, stale, or requires reconfirmation under policy.

## 5. Exit Conditions

- Valid country selection is saved and opens B03.
- Unsupported/restricted country routes to a safe policy message and support path.
- Back/save preserves the case without treating the country as confirmed.

## 6. Layout Structure

Top to bottom:

1. Header with back/help.
2. Step Indicator and Onboarding Context Panel.
3. Explanation distinguishing country of residence from citizenship and tax residency.
4. Country Selector input.
5. Inline policy status area after selection.
6. Primary CTA: Continue.
7. Secondary action: Save and exit.
8. Footer with privacy and jurisdiction disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Country Selector, Alert/Banner, Button, Link.
- New: Policy Status Block, required to represent supported, restricted, review-required, and unavailable policy responses.

## 8. Information Priority

1. What data is being requested.
2. Correct selection and its regulatory meaning.
3. Policy result and next action.

## 9. Interaction Behaviour

- **Tap:** Open/search country list, select one, continue, save/exit, help.
- **Scroll:** Country explanation and legal text may scroll.
- **Keyboard:** Type-ahead selection, predictable list navigation, screen-reader country names.
- **Validation:** Country must be selected from the server-controlled taxonomy.
- **Loading:** Policy evaluation appears after selection; prevent continue until resolved.
- **Disabled:** Continue disabled while no selection, policy is loading, or selection is invalid.
- **Retry:** Retry policy evaluation without changing the selected country.
- **Timeout:** Keep selection, mark policy status unknown, and offer retry.

## 10. All Screen States

- **Default:** No country selected or existing valid selection displayed.
- **Loading:** Country taxonomy or policy result loading.
- **Empty:** No selection; show required guidance.
- **Success:** Country confirmed; route to B03.
- **Error:** Taxonomy/policy service failed; preserve selection and retry.
- **Offline:** Selector may use cached taxonomy if approved, but confirmation is disabled.
- **Restricted:** Country is unsupported or onboarding is not permitted.
- **Suspended:** Country decision is held for compliance/manual review.

## 11. Validation Rules

- Do not infer country from IP, device locale, or browser language as authoritative.
- Country of residence cannot be substituted with citizenship or tax residency.
- A country change after dependent declarations requires server-defined invalidation/review of affected data.

## 12. Error Behaviour

Explain whether the user should correct the selection, wait, or contact support. Do not expose internal country-risk rules.

## 13. Success Behaviour

Confirm only that country context is recorded for onboarding policy evaluation.

## 14. Motion Recommendation

Use feedback for list selection and policy-result loading only. Do not animate a restricted country as a success state.

## 15. Accessibility

- Selector has a proper label and searchable list semantics.
- Policy result is announced and associated with the selector.
- Restricted state is available as text and an actionable support path.

## 16. Analytics Events

`b02_viewed`, `country_selector_opened`, `country_selected`, `country_policy_loaded`, `country_policy_restricted`, `country_policy_review_required`, `country_policy_failed`, `b02_continued`, `b02_save_exit_selected`.

## 17. Engineering Notes

- Country taxonomy, policy decision, and dependency invalidation must be server-authoritative.
- Store country code and policy version, not display text alone.
- Exact restriction/review rules are UNKNOWN.

## 18. Acceptance Criteria

- Country is not silently defaulted.
- User can distinguish residence from citizenship and tax residency.
- Continue cannot proceed on an unresolved policy response.
- Country changes correctly affect downstream requirements.

## 19. UX Writing Guidance

Use precise terms and a short explanation of why this country is needed now. Do not use “nationality” as a substitute.

## 20. Design Notes

This input has high downstream impact. Prefer clarity over speed and keep the selected value reviewable later.

---

# B03 – NRE / NRO Account Selection

## 1. Screen Purpose
Let the user choose the permitted NRE or NRO account context after country policy evaluation, with clear implications and no unsupported assumptions.

## 2. User Goal
Understand the available account types, select the correct one, and know what information or bank relationship will be required next.

## 3. Business Goal
Capture the account context needed for product, tax, bank, and regulatory rules while preventing incompatible downstream submissions.

## 4. Entry Conditions

- B02 country context is confirmed.
- Account-type options are returned by the server for the current identity and policy context.

## 5. Exit Conditions

- Valid selection opens B04.
- No permitted account type opens a restricted/support/review state.
- Changing an earlier country context invalidates or re-evaluates the selection.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Onboarding Context Panel with selected country context.
3. Account type option group using Radio controls or approved selection cards.
4. Policy Status Block describing the high-level difference and dependencies, not tax advice.
5. Primary CTA: Continue.
6. Secondary action: Save and exit.
7. Support and legal disclosure links.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Radio, Card, Alert/Banner, Button, Link.
- New: Account Type Compatibility Selector, required to keep the selection and server-returned compatibility state together.

## 8. Information Priority

1. Available choices and whether each is permitted.
2. Practical next-step implications.
3. Required selection and support path.

## 9. Interaction Behaviour

- **Tap:** Select one account type, expand policy explanation, continue, save/exit.
- **Scroll:** Option explanations and disclosures may scroll.
- **Keyboard:** Radio group supports arrow-key navigation and clear selection state.
- **Validation:** Exactly one server-permitted option must be selected.
- **Loading:** Options and compatibility are loading after B02; prevent selection until authoritative data arrives.
- **Disabled:** Continue disabled without a valid selection or while compatibility is unresolved.
- **Retry:** Refresh options when the policy service fails.
- **Timeout:** Keep no unconfirmed selection and offer retry.

## 10. All Screen States

- **Default:** Permitted NRE/NRO options available.
- **Loading:** Account compatibility options loading.
- **Empty:** No permitted option returned; explain and route to support/review.
- **Success:** Selection saved; route to B04.
- **Error:** Compatibility service failure or stale context.
- **Offline:** Display cached options only as stale; disable confirmation.
- **Restricted:** One or both account types are unavailable under policy.
- **Suspended:** Account-type decision held for compliance/operations review.

## 11. Validation Rules

- Account type must be selected from the server-permitted set.
- Do not infer NRE/NRO from country alone.
- Changing account type later must re-evaluate bank, tax, document, nominee, and declaration dependencies.

## 12. Error Behaviour

Explain incompatibility at a category level and provide support/review. Do not give tax advice or expose internal eligibility thresholds.

## 13. Success Behaviour

Confirm only that the selected account context is saved for the current onboarding case.

## 14. Motion Recommendation

Use restrained selection and loading feedback. Do not animate unavailable options as if they became available.

## 15. Accessibility

- Use a semantic radio group with an accessible group label.
- Selection and restrictions are announced in text.
- Do not use disabled styling alone to communicate ineligibility.

## 16. Analytics Events

`b03_viewed`, `account_type_options_loaded`, `account_type_selected`, `account_type_policy_restricted`, `account_type_compatibility_failed`, `b03_continued`, `b03_save_exit_selected`.

## 17. Engineering Notes

- Compatibility response must include options, reason codes, policy version, and dependent requirements.
- Store the selected account type as a versioned onboarding decision.
- Exact rules and dependent data model are UNKNOWN.

## 18. Acceptance Criteria

- The user cannot select an unsupported account type.
- NRE/NRO is not inferred from country or occupation.
- Downstream dependencies are re-evaluated after any change.
- No tax or investment recommendation is implied.

## 19. UX Writing Guidance

Describe account types neutrally and direct users to a qualified advisor where a decision requires legal or tax advice.

## 20. Design Notes

This is a consequential choice. Keep the options comparable, but avoid turning the screen into a tax-advice surface.

---

# B04 – PAN Verification

## 1. Screen Purpose
Verify PAN within the onboarding case using the same approved identity-check pattern as A04, while showing onboarding context and any server-returned prerequisite status.

## 2. User Goal
Submit accurate PAN data once, understand the result, and continue without confusing PAN verification with full KYC or onboarding approval.

## 3. Business Goal
Link the correct tax identity to the onboarding case, prevent duplicates/fraud, and establish a reusable audited identity checkpoint.

## 4. Entry Conditions

- B03 account type selection is valid.
- Contact verification and any required identity prerequisites are complete.

## 5. Exit Conditions

- Successful verification opens B05.
- Mismatch, duplicate, or provider failure remains on B04 with remediation or review route.
- A04 and B04 must share the same PAN validation, masking, consent, audit, and analytics contract.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Onboarding Context Panel with country/account context.
3. PAN explanation distinguishing this check from KYC/onboarding approval.
4. Masked PAN field.
5. Regulatory Consent Block if the provider requires explicit consent at this checkpoint.
6. Primary CTA: Verify PAN.
7. Support/mismatch route.
8. Footer with privacy and disclosure links.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Masked Field, Checkbox, Button, Alert/Banner, Inline Message.
- New: Onboarding Context Panel only if the shared context is not already provided by the authenticated shell. Reuse A04’s Field-Level Masking Pattern and validation contract.

## 8. Information Priority

1. Purpose and meaning of the PAN check.
2. PAN entry and consent.
3. Result and next action.

## 9. Interaction Behaviour

- **Tap:** Enter PAN, accept required consent, verify, open help, or go back.
- **Scroll:** Consent/disclosures may scroll; submission must remain reachable.
- **Keyboard:** Controlled text input with safe normalization; no autocomplete leakage.
- **Validation:** Local format plus server-side provider, duplicate, and identity match checks.
- **Loading:** Disable submission and show provider progress.
- **Disabled:** Verify disabled until format and required consent are valid.
- **Retry:** Retry only when response is retryable and idempotently.
- **Timeout:** Mark result unknown; offer refresh/retry without making a second decision.

## 10. All Screen States

- **Default:** PAN entry available.
- **Loading:** Verification pending.
- **Empty:** No PAN entered.
- **Success:** PAN verified for onboarding; route to B05.
- **Error:** Format, mismatch, duplicate, provider, or policy error.
- **Offline:** Submission and confirmation disabled.
- **Restricted:** PAN check unavailable under the current policy/account context.
- **Suspended:** Identity decision held for compliance/security review.

## 11. Validation Rules

- PAN format/checksum and provider match are server-authoritative.
- PAN is masked, absent from URLs/logs/analytics, and retained only as policy permits.
- Consent is versioned where required.
- A verified PAN cannot be silently replaced.

## 12. Error Behaviour

Use the same safe error taxonomy and non-enumerating behavior as A04: invalid, mismatch, duplicate, provider unavailable, pending, or policy hold.

## 13. Success Behaviour

Confirm only that PAN verification is complete for onboarding. Do not state that CKYC/KYC, tax declarations, or investment access is complete.

## 14. Motion Recommendation

Use the approved A04 loading/result behavior. Avoid transient-only success for a regulatory checkpoint.

## 15. Accessibility

Reuse A04 accessibility behavior: masked-field control, consent association, error announcement, focus stability, and text-based state communication.

## 16. Analytics Events

`b04_viewed`, `pan_entry_started`, `pan_consent_accepted`, `pan_verification_submitted`, `pan_verification_succeeded`, `pan_mismatch`, `pan_duplicate_detected`, `pan_verification_pending`, `pan_provider_failed`, `pan_support_selected`.

## 17. Engineering Notes

- B04 must use the same PAN service contract and PII handling as A04.
- Separate PAN verification status from CKYC, KYC, FATCA, CRS, and onboarding outcome state machines.
- Provider identity is UNKNOWN.

## 18. Acceptance Criteria

- B04 does not diverge from A04’s approved PAN behavior.
- PAN is not exposed in analytics, logs, or URLs.
- Every result is clearly distinguished from KYC/onboarding approval.

## 19. UX Writing Guidance

Use the approved A04 vocabulary and only add onboarding context where needed.

## 20. Design Notes

B04 is a reuse checkpoint, not a new PAN experience. Any divergence requires a formal change to Authentication v1.0.

---

# B05 – CKYC Status

## 1. Screen Purpose
Show the authoritative CKYC lookup status and guide the user to the next allowed action without presenting CKYC availability as full KYC approval.

## 2. User Goal
Understand whether CKYC information was found, whether it can be used, and what action is required next.

## 3. Business Goal
Reuse eligible evidence, reduce duplicate collection, and route missing, stale, mismatched, or review-held records correctly.

## 4. Entry Conditions

- B04 PAN verification succeeded.
- CKYC lookup is permitted for the current country/account/policy context.

## 5. Exit Conditions

- Found and usable record opens B06 or the next policy-defined checkpoint.
- Not found/stale/mismatch routes to B06 or required evidence collection.
- Review/hold routes to B19 without implying failure.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Onboarding Context Panel with the current identity checkpoint.
3. Policy Status Block showing CKYC result, last-updated/freshness information where available, and permitted next action.
4. Data-use/privacy explanation.
5. Primary CTA: Continue with available information or Continue verification.
6. Secondary support/review action.
7. Footer with privacy and disclosure links.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Card, Badge/Status Chip, Alert/Banner, Button, Link, Timeline if review is active.
- New: Policy Status Block, required to represent CKYC found, not found, stale, mismatch, pending, and restricted states.

## 8. Information Priority

1. Current CKYC status.
2. What the status means and does not mean.
3. Next required action.

## 9. Interaction Behaviour

- **Tap:** Continue, refresh lookup if allowed, open explanation/support.
- **Scroll:** Status explanation and privacy content may scroll.
- **Keyboard:** Actions and status details are accessible without pointer input.
- **Validation:** Freshness, identity match, and usability are server-defined.
- **Loading:** Show lookup progress and prevent duplicate lookups.
- **Disabled:** Continue disabled while the result is unresolved.
- **Retry:** Refresh only when the service marks the lookup retryable.
- **Timeout:** Show status unknown and offer refresh; do not treat timeout as not found.

## 10. All Screen States

- **Default:** CKYC result available.
- **Loading:** Lookup pending.
- **Empty:** No CKYC record found; explain the next collection path.
- **Success:** Record found and accepted for the next checkpoint.
- **Error:** Provider, match, freshness, or service error.
- **Offline:** Last known result may be shown as stale; no new decision can be confirmed.
- **Restricted:** Lookup unavailable or not permitted.
- **Suspended:** CKYC use held for compliance/manual review.

## 11. Validation Rules

- CKYC result must be linked to the verified identity and current policy version.
- Stale, partial, or mismatched data cannot be silently reused.
- User edits to prefilled CKYC data require an explicit policy path and audit event.

## 12. Error Behaviour

Explain found/not found/mismatch/stale/pending separately. Avoid implying that “not found” means the user failed compliance.

## 13. Success Behaviour

Confirm only that CKYC information is available for the next step, not that KYC is complete.

## 14. Motion Recommendation

Use a stable result transition and persistent status block. Do not replace a pending state with a success toast only.

## 15. Accessibility

- Status has a semantic label and text explanation.
- Any prefilled information is announced as imported or verified source data.
- Focus moves to the status/result only after the lookup completes and the announcement is actionable.

## 16. Analytics Events

`b05_viewed`, `ckyc_lookup_started`, `ckyc_found`, `ckyc_not_found`, `ckyc_stale`, `ckyc_mismatch`, `ckyc_pending`, `ckyc_lookup_failed`, `ckyc_continue_selected`, `ckyc_support_selected`.

## 17. Engineering Notes

- CKYC provider, freshness rules, and accepted fields are UNKNOWN.
- Cache only approved result metadata; never expose raw provider payloads.
- Results must be auditable and linked to PAN verification reference.

## 18. Acceptance Criteria

- CKYC availability is not represented as KYC approval.
- Timeout is not treated as not found.
- Stale/mismatch/pending states have distinct next actions.

## 19. UX Writing Guidance

Use “record found,” “record not found,” or “needs review,” not “approved” unless that exact authority state exists.

## 20. Design Notes

Users need confidence that the service is reusing evidence responsibly. Explain source, freshness, and next action without exposing technical payloads.

---

# B06 – Aadhaar / DigiLocker Consent

## 1. Screen Purpose
Capture explicit, scoped consent before initiating an approved Aadhaar/DigiLocker identity route.

## 2. User Goal
Understand what will be accessed, why, how it will be used, and choose whether to proceed through the permitted method.

## 3. Business Goal
Collect valid consent, enable compliant digital evidence retrieval, and provide an alternative or review path when consent or provider access is unavailable.

## 4. Entry Conditions

- CKYC is unavailable, insufficient, or policy requires digital evidence.
- The approved provider and eligibility policy permit this route.

## 5. Exit Conditions

- Consent accepted and provider initiation succeeds: proceed to provider handoff or B07.
- Consent declined: follow policy-defined alternative/review path.
- Provider failure/pending: remain on the state or route to B19.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Onboarding Context Panel describing the identity checkpoint.
3. Regulatory Consent Block with purpose, data categories, source, recipient, retention, and version.
4. Checkbox/explicit consent action and optional alternative method.
5. Provider handoff explanation and return expectations.
6. Primary CTA: Continue with DigiLocker/Aadhaar.
7. Secondary action: Use another permitted method or contact support.
8. Footer with privacy and regulatory links.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Card, Checkbox, Button, Link, Alert/Banner, Dialog if confirmation is required.
- New: Regulatory Consent Block, required to bind the user’s action to a precise consent scope and policy version.

## 8. Information Priority

1. What data will be accessed and why.
2. Consent action and alternative.
3. Provider handoff and recovery if interrupted.

## 9. Interaction Behaviour

- **Tap:** Expand consent detail, accept/decline, continue, choose alternative, help.
- **Scroll:** Full consent text must be accessible; the primary CTA cannot obscure required content.
- **Keyboard:** Checkbox and links are keyboard accessible; provider handoff has a non-pointer path.
- **Validation:** Explicit consent and policy eligibility required before initiation.
- **Loading:** Provider initiation pending; disable duplicate initiation.
- **Disabled:** Continue disabled until required consent is accepted.
- **Retry:** Retry provider initiation only with idempotency and clear return state.
- **Timeout:** Mark handoff unknown/pending and provide safe resume/refresh; do not record consent as successful unless the server recorded it.

## 10. All Screen States

- **Default:** Consent not yet accepted; permitted action available.
- **Loading:** Consent record or provider initiation pending.
- **Empty:** Required consent/data-scope text unavailable; block initiation and show service error.
- **Success:** Consent recorded and handoff initiated.
- **Error:** Consent save/provider initiation failed.
- **Offline:** Consent submission and provider handoff disabled.
- **Restricted:** Route not permitted for the policy/country/context.
- **Suspended:** Identity evidence collection held for review/security.

## 11. Validation Rules

- Consent must be explicit, purpose-specific, versioned, timestamped, and linked to the onboarding case.
- Declining consent must not be treated as fraud or failure; the permitted alternative must be shown.
- Provider callback must be bound to the same case and single-use.

## 12. Error Behaviour

Distinguish consent not accepted, provider unavailable, callback missing, consent expired, and policy restriction. Do not ask users to repeatedly consent without explaining why.

## 13. Success Behaviour

Confirm consent was recorded and state whether the user is being redirected or whether the evidence was received. Do not imply verification until the provider result is authoritative.

## 14. Motion Recommendation

Use restrained handoff and return-state feedback. Do not auto-advance before the user understands a provider redirect.

## 15. Accessibility

- Consent scope is programmatically associated with the control.
- Long text has semantic headings and a predictable reading order.
- Provider handoff and return instructions are available in text.
- Do not communicate consent state by colour alone.

## 16. Analytics Events

`b06_viewed`, `consent_details_opened`, `aadhaar_consent_accepted`, `aadhaar_consent_declined`, `digilocker_initiation_started`, `digilocker_redirected`, `digilocker_callback_received`, `digilocker_pending`, `digilocker_failed`, `alternative_identity_method_selected`.

## 17. Engineering Notes

- Provider, callback model, consent wording, retention, and exact legal basis are UNKNOWN.
- Never place provider tokens or identity data in analytics or untrusted URLs.
- Handle cross-device/return-from-provider interruptions with a resumable, single-use state.

## 18. Acceptance Criteria

- No provider initiation without valid explicit consent.
- Consent decline has an approved alternative or review path.
- Callback, timeout, offline, restricted, and suspended states are safe.

## 19. UX Writing Guidance

State purpose, data scope, source, recipient, retention, and user choice plainly. Never use consent language that bundles unrelated purposes.

## 20. Design Notes

This is a high-trust regulatory action. The consent contract must be readable before the user commits.

---

# B07 – Personal Details

## 1. Screen Purpose
Collect and confirm required personal details that are not already verified or safely reusable from earlier checkpoints.

## 2. User Goal
Provide accurate details, understand prefilled values and their source, correct permitted fields, and continue without losing progress.

## 3. Business Goal
Create complete, consistent investor data for downstream regulatory checks while minimizing duplicate entry and data-quality rework.

## 4. Entry Conditions

- Identity source/CKYC/DigiLocker result is available or the policy allows manual entry.
- B04 PAN and B02/B03 context are complete.

## 5. Exit Conditions

- Valid details save and open B08.
- Mismatch or non-editable verified data routes to review/support.
- Save and exit preserves draft status without marking the step complete.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Onboarding Context Panel explaining verified, imported, and user-entered data.
3. Personal detail sections grouped by policy-defined categories.
4. Field-level source/masking/helper information where applicable.
5. Inline validation and correction summary.
6. Primary CTA: Continue.
7. Secondary action: Save and exit.
8. Privacy/disclosure footer.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Text Field, Masked Field, Select, Date Picker if required, Alert/Banner, Button, Link.
- New: None unless imported-field provenance cannot be expressed by existing helper/readonly patterns; use the existing component pattern first.

## 8. Information Priority

1. Required fields and source status.
2. Errors and mismatches.
3. Save/continue and resume behavior.

## 9. Interaction Behaviour

- **Tap:** Enter/edit permitted fields, open date/country selectors, continue, save/exit, help.
- **Scroll:** Long forms scroll; error summary remains discoverable.
- **Keyboard:** Logical field order, correct input modes, accessible date/select controls.
- **Validation:** Field format locally; cross-field, identity, and policy validation server-side.
- **Loading:** Prefill and save progress are explicit; prevent duplicate save.
- **Disabled:** Verified/non-editable fields are read-only with explanation; Continue disabled when required data is invalid.
- **Retry:** Retry save/validation without duplicating the onboarding event.
- **Timeout:** Preserve draft, show unknown save status, and require refresh before continuing.

## 10. All Screen States

- **Default:** Fields available with clear source/editability.
- **Loading:** Prefill, policy, or save pending.
- **Empty:** Required information not yet supplied; show first actionable field.
- **Success:** Details saved and accepted; route to B08.
- **Error:** Field, cross-field, identity mismatch, or service error.
- **Offline:** Safe draft may be preserved if approved; submission disabled.
- **Restricted:** Certain fields/actions unavailable under policy.
- **Suspended:** Data change or identity mismatch held for review.

## 11. Validation Rules

- Required fields are policy-driven and explicitly labeled.
- Names, dates, addresses, and identity values must conform to provider/policy rules without silent destructive normalization.
- Imported verified fields cannot be edited through this screen unless policy permits.
- Cross-field inconsistencies are shown at the relevant fields and in a summary.

## 12. Error Behaviour

Use field-level errors for correctable inputs, summary errors for cross-field conflicts, and page-level errors for service/policy holds. Keep entered safe data when possible.

## 13. Success Behaviour

Confirm that personal details were saved for onboarding, not that the entire identity was approved.

## 14. Motion Recommendation

Use only save/progress feedback and error-summary reveal. Avoid disruptive transitions in long forms.

## 15. Accessibility

- Every field has a programmatic label and source/editability description.
- Error summary links to fields and is announced.
- Focus is retained after validation and restored after save.
- Date/select controls support keyboard and assistive technology.

## 16. Analytics Events

`b07_viewed`, `personal_field_started`, `personal_field_completed`, `personal_field_validation_failed`, `personal_prefill_viewed`, `personal_prefill_edited`, `personal_details_saved`, `personal_details_save_failed`, `b07_continued`, `b07_save_exit_selected`.

## 17. Engineering Notes

- Field provenance, editability, validation schema, and retention are server-defined.
- Do not send raw field values to analytics.
- Use schema/version IDs so the same case can resume consistently.

## 18. Acceptance Criteria

- User can distinguish imported/verified values from editable values.
- Required and conditional fields are policy-driven.
- Save/resume, offline, timeout, mismatch, and suspended states are safe.

## 19. UX Writing Guidance

Tell users where a value came from and why a field is locked. Use specific correction guidance, not generic “invalid details.”

## 20. Design Notes

Reduce repetitive entry, but never hide source provenance or silently overwrite a verified identity value.

---

# B08 – FATCA Declaration

## 1. Screen Purpose
Capture the user’s FATCA classification and required declaration using approved regulatory wording and explicit consent/confirmation.

## 2. User Goal
Answer accurately, understand the purpose of the declaration, and know what evidence or tax identifiers may be required next.

## 3. Business Goal
Collect valid FATCA self-certification, identify exceptions requiring review, and maintain an auditable policy-versioned declaration.

## 4. Entry Conditions

- B07 personal details are valid.
- Country/account context determines the applicable FATCA questions.

## 5. Exit Conditions

- Valid declaration opens B09.
- Missing identifier, inconsistency, or review condition routes to B10/B15/B19 according to policy.
- Save/exit preserves a draft without recording final declaration.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Regulatory Consent Block explaining FATCA purpose and scope.
3. FATCA classification question group using Radio/Select controls.
4. Conditional questions and tax identifier fields.
5. Declaration confirmation and policy-version reference.
6. Primary CTA: Confirm and continue.
7. Secondary action: Save and exit.
8. Help/disclosure footer.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Radio, Select, Text Field, Checkbox, Alert/Banner, Button, Link.
- New: Regulatory Consent Block only where existing disclosure/checkbox patterns cannot show scope and version together.

## 8. Information Priority

1. Purpose and declaration status.
2. Classification answers and conditional requirements.
3. Confirmation and next action.

## 9. Interaction Behaviour

- **Tap:** Select classification, reveal conditional questions, enter identifiers, open disclosures, confirm, save/exit.
- **Scroll:** Full regulatory explanation remains accessible.
- **Keyboard:** Radio groups and conditional sections have predictable focus order.
- **Validation:** Required answers and conditional identifiers validated server-side.
- **Loading:** Policy question set and save/submit progress shown.
- **Disabled:** Continue disabled while required conditions are incomplete or policy is loading.
- **Retry:** Retry declaration save/validation idempotently.
- **Timeout:** Preserve answers as draft and show unknown submission status.

## 10. All Screen States

- **Default:** Applicable FATCA questions available.
- **Loading:** Question schema or save result loading.
- **Empty:** No policy question set available; block and show service issue.
- **Success:** Declaration accepted for the case; route to B09.
- **Error:** Missing answer, inconsistent response, invalid identifier, or service failure.
- **Offline:** Draft-only if approved; no final declaration.
- **Restricted:** FATCA route unavailable or policy prevents continuation.
- **Suspended:** Declaration held for compliance review.

## 11. Validation Rules

- Question set and answer requirements are policy-versioned.
- Conditional fields appear only when the authoritative answer requires them.
- A declaration must include explicit confirmation and timestamp.
- No answer may be preselected unless the source and policy permit it.

## 12. Error Behaviour

Identify the question/identifier needing action and explain whether correction, evidence, or review is required. Do not provide tax advice.

## 13. Success Behaviour

Confirm only that the FATCA declaration was recorded for review/processing.

## 14. Motion Recommendation

Use restrained reveal of conditional questions and stable save/submit feedback. Do not animate regulatory status as a success badge without authority.

## 15. Accessibility

- Questions have semantic group labels and required state.
- Conditional content announces when revealed.
- Declaration text is associated with the confirmation control.
- Errors identify the exact question and preserve focus.

## 16. Analytics Events

`b08_viewed`, `fatca_question_answered`, `fatca_conditional_section_opened`, `fatca_identifier_started`, `fatca_validation_failed`, `fatca_declaration_confirmed`, `fatca_declaration_saved`, `fatca_declaration_pending`, `fatca_declaration_failed`, `b08_save_exit_selected`.

## 17. Engineering Notes

- Exact FATCA question schema, tax identifier rules, and legal copy are UNKNOWN.
- Store answers as structured policy-versioned data, not only rendered text.
- Changes after confirmation must create an amendment/audit event.

## 18. Acceptance Criteria

- No final declaration without required answers and explicit confirmation.
- Conditional questions are driven by policy, not client assumptions.
- FATCA declaration is not presented as tax advice or final approval.

## 19. UX Writing Guidance

Use approved legal wording, plain-language explanations alongside it, and a clear statement of what will happen after confirmation.

## 20. Design Notes

The wireframe should show the relationship between answers and conditional requirements without overwhelming the user with all possible regulatory branches.

---

# B09 – CRS Declaration

## 1. Screen Purpose
Capture the user’s CRS self-certification using the applicable policy question set and explicit declaration confirmation.

## 2. User Goal
Declare tax-residency-related CRS information accurately and understand what additional identifiers or review may be required.

## 3. Business Goal
Collect a complete, auditable CRS declaration and route inconsistencies or missing information to the correct next step.

## 4. Entry Conditions

- B08 FATCA declaration is complete or the policy permits parallel sequencing.
- Country/account context and personal details are available.

## 5. Exit Conditions

- Valid declaration opens B10.
- Missing/inconsistent data routes to B10 or B19 according to policy.
- Save/exit preserves draft state.

## 6. Layout Structure

Top to bottom:

1. Header and Step Indicator.
2. Regulatory Consent Block explaining CRS purpose and scope.
3. CRS classification/self-certification questions.
4. Conditional tax-residency prompts and identifiers.
5. Declaration confirmation and version/reference metadata.
6. Primary CTA: Confirm and continue.
7. Secondary action: Save and exit.
8. Help/disclosure footer.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Radio, Select, Text Field, Checkbox, Alert/Banner, Button, Link.
- New: Regulatory Consent Block if required to combine declaration, scope, version, and explicit confirmation.

## 8. Information Priority

1. What CRS declaration covers.
2. Answers and conditional identifiers.
3. Confirmation, review, and next action.

## 9. Interaction Behaviour

- **Tap:** Answer questions, reveal conditional sections, enter identifiers, review declaration, confirm, save/exit.
- **Scroll:** Regulatory explanation and declaration text may scroll.
- **Keyboard:** Group navigation, conditional focus, and field order are predictable.
- **Validation:** Required and cross-field rules are server-authoritative.
- **Loading:** Schema, validation, and save progress shown.
- **Disabled:** Confirm disabled until complete and policy-valid.
- **Retry:** Retry save/validation idempotently.
- **Timeout:** Preserve draft and mark final submission unknown.

## 10. All Screen States

- **Default:** CRS question set available.
- **Loading:** Schema or submission loading.
- **Empty:** No applicable schema returned; block and show service issue.
- **Success:** Declaration recorded; route to B10.
- **Error:** Incomplete, inconsistent, invalid identifier, or service error.
- **Offline:** Draft-only if approved; no final declaration.
- **Restricted:** CRS route unavailable under policy.
- **Suspended:** Declaration held for compliance review.

## 11. Validation Rules

- Responses and identifiers follow the current policy version.
- Multiple tax residencies must be supported where policy requires.
- Confirmation is explicit and auditable.
- Do not silently infer tax residency from country of residence.

## 12. Error Behaviour

Identify the affected declaration/identifier and provide correct, review, or support actions. Do not provide tax advice.

## 13. Success Behaviour

Confirm that the CRS declaration was recorded for processing, not that tax residency was approved.

## 14. Motion Recommendation

Use stable conditional reveal and submission feedback. Preserve reading position during updates.

## 15. Accessibility

- Group labels, required states, and conditional dependencies are semantic.
- Declaration confirmation is associated with the full approved text.
- Error summary links to each affected control.

## 16. Analytics Events

`b09_viewed`, `crs_question_answered`, `crs_conditional_section_opened`, `crs_identifier_started`, `crs_validation_failed`, `crs_declaration_confirmed`, `crs_declaration_saved`, `crs_declaration_pending`, `crs_declaration_failed`.

## 17. Engineering Notes

- Exact CRS schema, jurisdiction rules, identifier formats, and legal text are UNKNOWN.
- Store structured responses and policy version.
- Amendment behavior after confirmation must be auditable.

## 18. Acceptance Criteria

- CRS declaration cannot be finalized with missing required data.
- Multiple residencies and conditional identifiers are supported when required.
- The experience does not imply tax advice or approval.

## 19. UX Writing Guidance

Use approved regulatory wording with clear plain-language helper text and a neutral explanation of the next step.

## 20. Design Notes

Keep CRS and FATCA conceptually distinct while using the same approved interaction pattern.

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
- **Keyboard:** Matrix cells and add/remove actions are keyboard accessible.
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
- Do not infer experience from transaction history unless an approved source is explicitly used.
- User responses are versioned and auditable.

## 12. Error Behaviour

Identify the response needing correction and explain any review/education route without shaming the user.

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
- Duplicate and previously verified accounts resolve to a defined state, not silently relink.
- Verification result includes freshness and policy version.

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
- Coordinate with bank-management states A23-A27 without creating a new module.
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
- Guardian details are required when applicable; the exact age threshold is UNKNOWN.
- Do not silently replace an existing nominee.

## 12. Error Behaviour

Use field-level correction and clear policy messages for missing guardian/identity information. Do not imply the user is non-compliant when policy requires review.

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
Obtain complete, usable evidence, reduce operations rework, and preserve chain-of-custody and audit data.

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
- **Keyboard:** Upload has a non-drag, keyboard-accessible path; preview has a text alternative.
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
- Edit action returns to the relevant screen without losing review context.
- Blocking issue routes back to the affected screen.

## 6. Layout Structure

Top to bottom:

1. Header and final progress indicator.
2. Review Summary Block containing identity, account type, tax/residency, risk/experience, bank, nominee, documents, declarations, and status.
3. Per-section edit links with clear data source/status.
4. Outstanding/pending/review warning block if policy allows continuation.
5. Final Regulatory Consent Block and confirmation checkbox.
6. Primary CTA: Confirm and continue to eSign.
7. Secondary action: Save and exit.
8. Footer with final declaration and privacy disclosures.

## 7. Component Placement

- Existing: Page Header, Step Indicator, Accordion, Card, Badge/Status Chip, Link, Checkbox, Button, Alert/Banner, Timeline, Audit Metadata Block.
- New: Review Summary Block, required to establish a stable sectioned confirmation boundary without duplicating every form layout.

## 8. Information Priority

1. Blocking issues and unresolved statuses.
2. Data/declaration summary.
3. Edit links.
4. Final confirmation and eSign transition.

## 9. Interaction Behaviour

- **Tap:** Expand section, edit, review declaration, accept confirmation, continue, save/exit.
- **Scroll:** Full review scrolls; primary action must not obscure final confirmation.
- **Keyboard:** Accordions, edit links, checkbox, and confirmation are accessible in logical order.
- **Validation:** Revalidate the case and policy version before final confirmation.
- **Loading:** Refresh/revalidation and submit progress shown; prevent duplicate confirmation.
- **Disabled:** Continue disabled until blocking issues are resolved and confirmation accepted.
- **Retry:** Retry revalidation without losing review state.
- **Timeout:** Show review stale; require refresh before confirmation.

## 10. All Screen States

- **Default:** Complete review available.
- **Loading:** Case refresh/revalidation loading.
- **Empty:** No reviewable onboarding data; route safely to B01/B02.
- **Success:** Confirmation recorded; route to B17.
- **Error:** Missing section, stale data, policy conflict, or service failure.
- **Offline:** Cached review may be shown stale; confirmation disabled.
- **Restricted:** Final confirmation blocked by policy.
- **Suspended:** Review held for human/compliance decision.

## 11. Validation Rules

- Displayed data reflects the current authoritative case version.
- Blocking errors and unresolved required documents/declarations are visible.
- Final confirmation is explicit, versioned, timestamped, and case-bound.
- Edit actions invalidate/recalculate dependent sections according to policy.

## 12. Error Behaviour

Show a summary first, link to each affected section, and explain whether correction, refresh, or review is required.

## 13. Success Behaviour

Confirm that onboarding information was reviewed and confirmed, then hand off to eSign. Do not state onboarding completion yet.

## 14. Motion Recommendation

Use restrained accordion and validation transitions. Do not auto-collapse a section containing an error.

## 15. Accessibility

- Summary sections use semantic headings and expanded/collapsed states.
- Blocking issues are announced and linked to their source.
- Confirmation text is associated with the checkbox.
- Focus returns to the edited section after navigation back.

## 16. Analytics Events

`b16_viewed`, `review_section_opened`, `review_edit_selected`, `review_blocking_issue_shown`, `review_confirmation_viewed`, `review_confirmation_accepted`, `review_revalidation_started`, `review_revalidation_failed`, `review_confirmed`, `b16_save_exit_selected`.

## 17. Engineering Notes

- Review uses a versioned immutable snapshot/reference, not independently re-read mutable fields.
- Revalidation identifies changed dependencies and affected section IDs.
- Final confirmation and declaration audit data are retained under policy.

## 18. Acceptance Criteria

- All major onboarding sections are represented with current status and edit path.
- Blocking issues cannot be missed or bypassed.
- Confirmation is distinct from eSign and onboarding success.

## 19. UX Writing Guidance

Use “Review and confirm” rather than “Submit” until the final handoff is understood. Explain what becomes part of the record.

## 20. Design Notes

This is the final comprehension checkpoint. Favor accuracy and consequences over visual density.

---

# B17 – eSign

## 1. Screen Purpose
Initiate and complete the approved electronic-signature process for the onboarding record.

## 2. User Goal
Understand what is being signed, complete the signature securely, and recover if provider handoff is interrupted.

## 3. Business Goal
Obtain a valid, auditable signature and synchronize provider outcome with the onboarding case without duplicate requests.

## 4. Entry Conditions

- B16 review confirmation is recorded.
- eSign provider, document package, consent, and identity prerequisites are valid.

## 5. Exit Conditions

- Completed signature opens B18 or B19 based on authoritative processing status.
- Failure opens B20 or a controlled retry state.
- User cancellation returns safely without deleting the onboarding case.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. eSign Status Block explaining document package, signer identity, and provider handoff.
3. Consent/terms acknowledgement if required.
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

- **Tap:** Review package, accept consent, initiate eSign, return/refresh, support.
- **Scroll:** Document summary and legal disclosures may scroll.
- **Keyboard:** All controls and provider return actions accessible.
- **Validation:** Case, signer identity, document hash/version, and consent validated server-side.
- **Loading:** Initiation/callback processing shown; prevent duplicate requests.
- **Disabled:** Start disabled until package and consent are valid.
- **Retry:** Retry only when the prior request is known not to have created an active signing request.
- **Timeout:** Show pending/unknown and status refresh; never blindly create a second signing request.

## 10. All Screen States

- **Default:** eSign package ready.
- **Loading:** Package preparation, initiation, callback, or processing pending.
- **Empty:** No signable package; block and route to B16/support.
- **Success:** Signature completed and accepted; route to B18/B19.
- **Error:** Consent, provider, identity, package, callback, or signature failure.
- **Offline:** No initiation or completion confirmation.
- **Restricted:** eSign unavailable for policy/provider/account state.
- **Suspended:** Signature/onboarding held for compliance/security review.

## 11. Validation Rules

- Package/content hash must match the reviewed snapshot.
- Signer identity must match the approved onboarding identity.
- eSign request is single-use/idempotent and time-limited.
- Provider callbacks are authenticated, replay-protected, and case-bound.

## 12. Error Behaviour

Distinguish cancellation, provider failure, expired request, callback delay, identity mismatch, and policy hold. Provide a safe resume or review route.

## 13. Success Behaviour

Confirm only when the authoritative eSign result is accepted. State whether onboarding is complete or still processing.

## 14. Motion Recommendation

Use clear handoff and processing feedback. Do not show completion before callback verification.

## 15. Accessibility

- Document/signing purpose is textually available.
- Provider handoff and return instructions are accessible.
- Status changes are announced and focus is restored after return.

## 16. Analytics Events

`b17_viewed`, `esign_package_loaded`, `esign_consent_accepted`, `esign_initiation_started`, `esign_redirected`, `esign_returned`, `esign_callback_received`, `esign_completed`, `esign_cancelled`, `esign_failed`, `esign_pending`, `esign_retry_selected`.

## 17. Engineering Notes

- eSign provider, callback contract, document package, validity, and retention are UNKNOWN.
- Store provider reference, document hash, case ID, policy version, and outcome; never raw signature data in analytics.
- Reconciliation is required when provider and onboarding statuses disagree.

## 18. Acceptance Criteria

- No duplicate active eSign request is created by retry.
- Signed package matches the reviewed snapshot.
- Provider return, timeout, pending, cancellation, and failure are recoverable.

## 19. UX Writing Guidance

Explain document scope and the difference between starting eSign, completing it, and onboarding approval.

## 20. Design Notes

eSign should feel like a controlled handoff, not an external dead end. The return state is as important as initiation.

---

# B18 – Onboarding Success

## 1. Screen Purpose
Confirm the authoritative completion outcome and present only the next actions permitted by the resulting account/compliance state.

## 2. User Goal
Know what completed, what reference to retain, and what can happen next.

## 3. Business Goal
Close onboarding accurately, create confidence, and route the user to the correct next product state without overpromising.

## 4. Entry Conditions

- Server confirms onboarding/eSign/compliance completion according to the defined success state.

## 5. Exit Conditions

- User continues to the approved destination.
- Approved references/documents can be opened securely.
- If downstream processing remains pending, route to B19 rather than showing success.

## 6. Layout Structure

Top to bottom:

1. Header and completed-progress context.
2. Success status block stating the exact completed state.
3. Case/account reference and completion timestamp.
4. Next-action Card listing permitted next steps and remaining limitations.
5. Secure reference/document actions.
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
- **Timeout:** Preserve success state but mark dependent destination unknown; never duplicate onboarding.

## 10. All Screen States

- **Default:** Authoritative success state and next actions available.
- **Loading:** Completion/reference status loading.
- **Empty:** No completion reference; show safe support/status route.
- **Success:** Exact onboarding completion confirmed.
- **Error:** Completion/reference conflict or service error.
- **Offline:** Show cached completion with timestamp; dependent actions may be disabled.
- **Restricted:** Completion exists but downstream action is restricted.
- **Suspended:** Completion is superseded by a hold/review; route to B19.

## 11. Validation Rules

- Success is shown only from an authoritative onboarding state.
- Reference and timestamp are case-bound and non-sensitive.
- eSign completion alone is not onboarding success.

## 12. Error Behaviour

If services disagree, show the last authoritative state and route to B19/support. Never guess between success and pending.

## 13. Success Behaviour

State exactly what is complete, what is not, and the next permitted action.

## 14. Motion Recommendation

Use restrained completion feedback. Do not obscure remaining restrictions or caveats.

## 15. Accessibility

- Completion state is announced as a heading/status.
- Reference and timestamp are readable and copyable where permitted.
- Next actions have descriptive accessible names.

## 16. Analytics Events

`b18_viewed`, `onboarding_completed`, `onboarding_reference_opened`, `onboarding_document_opened`, `onboarding_next_action_selected`, `onboarding_success_downstream_restricted`, `onboarding_support_selected`.

## 17. Engineering Notes

- Success is derived from the onboarding state machine, not client navigation.
- Completion reference, policy version, and final decision audit event are required.
- Eventual entitlement propagation must route to B19 when not complete.

## 18. Acceptance Criteria

- No pending case is displayed as success.
- Reference and exact completion state are available.
- Next actions respect current entitlement and compliance state.

## 19. UX Writing Guidance

Use exact state language and avoid “fully approved” unless it is the authoritative state. Tell users what they can do now.

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
- A notification/deep link or resumed case opens the status screen.

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
5. Required-action section when information is requested.
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
- State transitions are versioned and monotonic except documented review paths.
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
- Retryable provider failure returns to a controlled retry state.
- Review/appeal/support opens B19 or an approved support route.
- Final policy failure remains with a safe explanation and no bypass.

## 6. Layout Structure

Top to bottom:

1. Header with safe exit/help.
2. Policy Status Block stating failure category and case status.
3. Affected checkpoint summary without sensitive provider/risk details.
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
- **Disabled:** Actions disabled while loading or when policy prohibits action.
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

- Failure status is authoritative and case-bound.
- User-visible reason is a safe category, not raw provider diagnostics.
- A new case cannot be created while an active failed case has an approved recovery path unless policy permits it.
- Retry attempts are rate-limited and audited.

## 12. Error Behaviour

Distinguish correctable data issue, retryable service/provider issue, review-required issue, and final policy restriction. Give one clear next action and a support route.

## 13. Success Behaviour

Confirm only that correction/retry/review was accepted and state the next status surface. Do not claim onboarding success.

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

- Failure taxonomy, appeal/review behavior, retry limits, and retention are UNKNOWN.
- Use stable failure codes for QA/support while mapping to safe user copy.
- Reconciliation is required if a provider reports success after the onboarding case records failure.

## 18. Acceptance Criteria

- Failure is not shown for pending or unknown states.
- Correctable, retryable, review, and final outcomes are distinct.
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
- B04 reuses A04’s locked behavior and must not introduce a second PAN contract.
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
