# NRI WealthTech Platform
## Account & Service Hub Experience

**Document type:** Product experience and implementation specification
**Role:** Founding Product Leadership Team
**Status:** Extension of locked Authentication & Identity, Onboarding & Regulatory, Investment Activation, Home, Portfolio, Fund Discovery, Investment Journey, Orders & Activity Center, Reports & Tax Center, and Cross-Module Lifecycle & Entitlement Contract
**Scope:** Identity, financial profile, banking, security, documents, notifications, support, RM interaction, legal, consent, audit, and data requests
**Constraint:** No visual UI, colours, typography, pixel measurements, or final screen styling are defined here.

## 0. Contract Alignment

This module consumes the locked state machines for Identity, Authentication, Session, Device Trust, Consent, Compliance, Documents, Eligibility, Portfolio, Orders, Reports, Notifications, Support, and Entitlements. It MUST NOT redefine those truths.

### Account & Service Hub owns

- Safe navigation and status projection for account/service domains.
- User-initiated profile and preference changes.
- Banking and ownership-management entry points.
- Security control entry points and security-event explanation.
- Document, consent, legal, and data-request navigation.
- Notification preference management.
- Support, RM, callback, escalation, and complaint entry points.

### Account & Service Hub does not own

- KYC, AML, tax, DTAA, bank verification, order, payment, portfolio, report, or compliance approval truth.
- Direct deletion of regulated history.
- Silent changes to permissions, consent, security, or financial records.
- Final support resolution outside the owning service.

### Reuse decisions

- Authentication screens A16-A22, A19 Active Sessions, and A20 Trusted Devices remain the authoritative authentication/recovery surfaces.
- O04 Download Centre remains the artifact-management destination.
- R02-R05 remain the report/tax/document detail and delivery surfaces.
- O02 Activity Detail remains the authoritative financial activity timeline.
- S-series screens provide control, context, and entry points without duplicating those surfaces.

## 1. Minimum Screen Architecture

| ID | Screen | Responsibility |
|---|---|---|
| S01 | Account & Service Overview | Orient users to identity, financial profile, security, documents, notifications, and active service work |
| S02 | Profile, Residency & Preferences | Manage personal profile, contact context, residency, FATCA/tax residency, risk profile, and investment preferences |
| S03 | Banking & Ownership | Manage bank accounts, mandates, linked accounts, nominees, and bank-related service states |
| S04 | Security Center | Provide security posture, alerts, authentication entry points, trusted devices, sessions, and activity log |
| S05 | Documents, Consent & Legal | Manage KYC/tax/agreement documents, consent, privacy, terms, audit access, and data requests |
| S06 | Notifications & Communication | Manage push/email/SMS, marketing, transactional, regulatory, and delivery preferences |
| S07 | Support & RM | Access Help Center, tickets, chat, callback, RM, escalation, grievance, and complaint tracking |

Download Center, statements, reports, tax artifacts, and proof retrieval continue to use O04/R05. Authentication recovery continues to use A16-A22. These are deep-linked from the Hub, not duplicated.

## 2. Account Management Philosophy

The Hub is an operational control center, not a settings drawer. It must answer:

1. What is my current account and regulatory status?
2. What can I change myself?
3. What requires verification, consent, review, or human help?
4. Which security, document, notification, or service items require attention?
5. What evidence exists for a change or decision?

Account controls must be understandable without making regulated operations feel casual. The experience should reduce friction for safe changes and add friction only where identity, ownership, money, privacy, or compliance risk requires it.

## 3. Trust & Security Principles

1. Show current state, owner, last updated time, and next action.
2. Require step-up authentication for material identity, bank, security, consent, export, and access changes.
3. Explain the consequence before the user confirms a security or contact change.
4. Never expose raw identity, tax, bank, KYC, AML, or security data unnecessarily.
5. Security notifications do not depend on marketing consent.
6. User-visible activity log is a safe projection of audit, not the full regulator audit trail.
7. Revocation is explicit, idempotent, and confirmed by server state.
8. Offline mode is read-only for sensitive controls and never implies a change succeeded.
9. Suspended, restricted, expired, and pending states are distinct.
10. Every high-risk change has a recovery path if the user loses access to a channel or device.

## 4. Privacy Principles

- Collect only data necessary for the stated purpose.
- Separate required regulatory declarations from optional marketing consent.
- Make purpose, scope, recipient, duration, and withdrawal behavior visible.
- Treat household, RM, tax consultant, and support access as scoped relationships.
- Provide data access, correction, portability, deletion/request, and legal-hold explanations.
- Do not use sensitive profile or tax data for personalization without approved consent and legal basis.
- Audit every access, export, share, consent change, and data-request decision.
- Preserve regulated history when deletion is legally restricted, while explaining the boundary.

## 5. Regulatory Principles

1. Country, residence, tax residency, FATCA/CRS, DTAA, risk, and KYC are related but separate data domains.
2. Changes may trigger re-verification, re-consent, eligibility re-evaluation, or transaction restrictions.
3. Nominee and joint-holder changes are ownership/mandate operations, not ordinary profile edits.
4. Bank and payout changes require ownership verification and security controls.
5. Document validity and expiry are server-authoritative.
6. Regulatory notices remain deliverable under approved lawful basis even when marketing is disabled.
7. Support and RM cannot bypass compliance or security controls.
8. Legal and tax wording is country-specific, dated, and approved.

## 6. User Control Principles

- Let users see current values, proposed changes, consequences, and confirmation evidence.
- Separate edit, verify, submit, approve, and complete states.
- Allow safe save/resume for complex forms without treating drafts as approved.
- Provide undo only where the underlying action is safely reversible.
- Explain why a field cannot be changed in place and route to the correct process.
- Let users revoke optional sharing and communication consent.
- Do not bury security, document, or complaint actions under promotional content.

## 7. Information Hierarchy

1. Security, account hold, compliance, regulatory, or legal action required.
2. Identity/profile status and material changes.
3. Banking/ownership status and financial-action impact.
4. Documents, consent, and tax/compliance readiness.
5. Notification and communication preferences.
6. Support ownership, SLA, RM, and complaint status.
7. Optional education and convenience controls.

## 8. Accessibility Strategy

- Use semantic headings and a predictable control hierarchy.
- Every status, consent, restriction, expiry, and error is text-based and announced.
- Forms expose labels, required state, input purpose, format, and correction guidance.
- Sensitive reveal/mask controls have accessible names and do not expose values in announcements.
- Security events, sessions, devices, documents, and support cases use accessible tables/lists.
- Uploads, downloads, chat, callback, and complaint forms support keyboard, zoom, reflow, and screen readers.
- Live updates announce only the changed status and preserve focus.
- Support reduced motion, long legal text, translated strings, time zones, and non-Latin names.

## 9. Service Recovery Strategy

Every account/service change follows:

`VIEW -> EDIT/REQUEST -> VERIFY/CONSENT -> SUBMIT -> REVIEW/PROCESS -> AUTHORITATIVE RESULT -> EVIDENCE -> RECOVERY IF NEEDED`.

When a change fails:

1. Preserve prior authoritative state.
2. Explain whether the new state was not submitted, is pending, or may have taken effect.
3. Prevent duplicate submissions.
4. Provide safe retry, correction, re-verification, or support.
5. Notify verified channels for material changes.
6. Record audit and case references.

## 10. Support Strategy

Support is a coordinated service layer, not a generic contact form.

- The Hub carries safe context into support.
- Support sees only permitted, masked data.
- RM, Support, Operations, Finance, Tax, Compliance, and Security have distinct ownership and escalation paths.
- Every case has category, severity, owner, SLA, next update, evidence, and closure reason.
- Complaint/grievance journeys preserve regulatory escalation paths.
- Users can see what was shared with a specialist and revoke optional access where supported.

## 11. Future Scalability

The Hub is organized around capability domains, not a fixed settings taxonomy. Future asset classes, jurisdictions, family structures, advisors, tax services, and security methods can add capability descriptors and scoped controls without changing the top-level architecture.

Future additions may include passkeys, hardware security keys, multi-advisor permissions, legal entity accounts, corporate actions, global tax packs, family continuity, insurance policies, and data portability. Each must declare owner, permission, consent, audit, state, recovery, and accessibility behavior before exposure.

# S01 - Account & Service Overview

## 1. Screen Purpose

Orient users to account health, regulatory readiness, security posture, documents, communications, and active service work.

## 2. User Goal

Know what requires attention and where to manage identity, banking, security, documents, notifications, or support.

## 3. Business Goal

Reduce service friction and support contacts by making account actions and ownership visible.

## 4. Entry Conditions

Authenticated session from navigation, Home, notification, support, or deep link.

## 5. Exit Conditions

S02 profile, S03 banking, S04 security, S05 documents/legal, S06 notifications, S07 support, O04 downloads, Reports, or Authentication recovery.

## 6. Layout Structure

Top to bottom: security/account hold notice; profile/residency status; banking/ownership status; document/consent attention; notification status; open support/RM cases; security activity summary; grouped navigation; help.

## 7. Information Hierarchy

Security, compliance, identity, bank, document, and support action items precede optional preferences and education.

## 8. Components

Existing: App Shell, Page Header, Card, Badge, Alert, Status Panel, Button, Link, Loading, Empty, Error.

New: Account Health Card, Attention Summary, Service Domain Card, Active Case Summary, Security Posture Summary, Scoped Access Notice.

## 9. States

First visit, returning user, all current, action required, profile incomplete, bank pending, document expiry, consent renewal, security alert, support case pending, restricted, suspended, offline, partial, and error.

## 10. Validation

Overview cards derive from authoritative services and current entitlement. Counts and statuses are scope-aware. No card may imply completion from a draft or client cache.

## 11. Error Behaviour

Localize unavailable domains and preserve accessible domains. Distinguish no action, pending, restricted, suspended, stale, and service error.

## 12. Recovery Behaviour

Open owning module, retry, view last authoritative status, create support case, or return safely. Do not offer generic “fix everything” actions.

## 13. Accessibility

Cards have meaningful headings, status, and action labels. Attention updates are announced once. Domain navigation remains keyboard and screen-reader accessible.

## 14. Analytics

`s01_viewed`, `account_attention_opened`, `service_domain_opened`, `security_summary_opened`, `case_summary_opened`, `account_overview_retry`, `account_overview_support_selected`.

## 15. Engineering Notes

S01 is a projection over lifecycle, entitlement, compliance, bank, document, security, notification, and support services. It must include source/freshness and safe deep-link context.

## 16. Acceptance Criteria

- Users can identify active account/service work.
- Critical actions are above optional settings.
- Cards link to authoritative domains.
- Restricted/suspended/offline states are not represented as normal.

# S02 - Profile, Residency & Preferences

## 1. Screen Purpose

Manage personal profile, contact information, country/residency, FATCA/CRS context, tax residency, risk profile, and investment preferences through controlled sub-sections.

## 2. User Goal

Review and update profile information, understand downstream impact, and know when verification or review is required.

## 3. Business Goal

Maintain accurate regulatory and suitability data while minimizing avoidable manual correction.

## 4. Entry Conditions

Authenticated user with profile scope; field editability is returned by policy and current compliance state.

## 5. Exit Conditions

Saved draft, submitted change, verification/review state, compliance/onboarding route, security step-up, or support.

## 6. Layout Structure

Top to bottom: profile status; personal/contact information; residency and country; FATCA/CRS/tax residency; risk profile; investment preferences; impact notices; edit/save/review actions; audit/history.

## 7. Information Hierarchy

Current value and verification status first; required change and impact second; optional preference controls third.

## 8. Components

Existing: Form Fields, Masked Field, Country Selector, Select, Radio, Checkbox, Card, Alert, Button, Progress, Timeline.

New: Profile Status Row, Change Impact Notice, Regulatory Field Group, Risk Profile Summary, Preference Scope Notice, Reverification Prompt.

## 9. States

Current, draft, saving, saved pending verification, approved, more information required, restricted field, expired, compliance review, suspended, offline draft, error, and read-only.

## 10. Validation

Field rules, country taxonomy, tax residency uniqueness, required identifiers, contact verification, FATCA/CRS dependencies, risk-question version, and preference scope are server-authoritative.

## 11. Error Behaviour

Field errors remain editable. Policy/review restrictions explain why a field cannot change in place. Save timeout preserves draft but does not claim completion.

## 12. Recovery Behaviour

Resume draft, verify contact, complete regulatory step, submit evidence, re-run risk profile, or contact Compliance/Support. Prior authoritative values remain visible until replacement is approved.

## 13. Accessibility

Forms have explicit labels, required status, format examples, error summary, focus restoration, and accessible country/tax terminology. Sensitive fields are masked by default.

## 14. Analytics

`s02_viewed`, `profile_edit_started`, `contact_change_started`, `residency_changed`, `tax_residency_opened`, `fatca_crs_opened`, `risk_profile_opened`, `preference_changed`, `profile_save_submitted`, `profile_review_required`.

## 15. Engineering Notes

Profile, Compliance, Consent, Identity, Risk, and Policy services own separate subdomains. Changes create versioned events and invalidate only dependent entitlements.

## 16. Acceptance Criteria

- Residence, tax residency, and country are distinguishable.
- Required and optional fields are clear.
- Material changes state downstream impact before submission.
- No profile change is shown as complete without authoritative confirmation.

# S03 - Banking & Ownership

## 1. Screen Purpose

Manage bank accounts, mandates, linked accounts, nominees, joint-holder/ownership context, and related verification/restriction states.

## 2. User Goal

Know which accounts and ownership relationships are active, what they can be used for, and how to add, verify, change, or remove them safely.

## 3. Business Goal

Prevent cross-funding, payout errors, ownership disputes, nominee errors, and unsupported account changes.

## 4. Entry Conditions

Authenticated session with banking/relationship scope; bank, mandate, nominee, and account status data available.

## 5. Exit Conditions

Bank verification, mandate setup, nominee change, support/operations review, security step-up, or return to S01.

## 6. Layout Structure

Top to bottom: account/ownership scope; verified banks; pending/failed banks; mandates; linked accounts; nominees/joint holders; NRE/NRO/repatriability impact; add/change/remove actions; support.

## 7. Information Hierarchy

Ownership and account compatibility first; verification/status second; mandate and nominee consequences third; management actions fourth.

## 8. Components

Existing: Card, Masked Field, Badge, Radio, Button, Link, Alert, Timeline, Loading, Empty, Error, Dialog.

New: Bank Account Row, Account Compatibility Badge, Mandate Row, Nominee/Ownership Row, Reverification Impact Notice, Sensitive Change Confirmation.

## 9. States

No banks, verified, pending, failed, unsupported, expired, account-type mismatch, mandate active/pending/rejected/expired, nominee current/pending, relationship restricted, suspended, offline read-only, and error.

## 10. Validation

Ownership, account type, country, repatriability, bank support, mandate limits, nominee rules, joint-holder authority, and action scope are server-authoritative.

## 11. Error Behaviour

Distinguish bank verification failure, unsupported bank, ownership mismatch, security hold, policy restriction, and provider outage. Do not delete the prior verified account on failed replacement.

## 12. Recovery Behaviour

Retry verification safely, select alternate bank, upload evidence, renew mandate, correct nominee, open Finance/Operations/Support case, or wait for pending callback.

## 13. Accessibility

Rows expose masked identity, type, ownership, state, and consequence. Add/remove/revoke dialogs state exact target and impact. Tables are keyboard navigable.

## 14. Analytics

`s03_viewed`, `bank_row_opened`, `bank_add_started`, `bank_change_started`, `mandate_opened`, `nominee_opened`, `ownership_scope_changed`, `bank_reverification_started`, `bank_restricted_viewed`.

## 15. Engineering Notes

Bank, Mandate, Relationship, Consent, Account, and Entitlement services remain authoritative. Changes must use step-up, idempotency, audit, and propagation to payment/order systems.

## 16. Acceptance Criteria

- Funding versus payout use is clear.
- NRE/NRO and ownership incompatibilities are explicit.
- Failed replacement does not erase current valid state.
- Nominee and joint-holder permissions are scoped and auditable.

# S04 - Security Center

## 1. Screen Purpose

Provide security posture, login/authentication entry points, password/PIN/biometric controls, trusted devices, sessions, activity log, and security alerts.

## 2. User Goal

Know whether the account is safe, review access, revoke devices/sessions, and recover from suspicious or lost-device activity.

## 3. Business Goal

Reduce account takeover, unsafe recovery, security support load, and unreviewed device access.

## 4. Entry Conditions

Authenticated session or approved recovery context; current security risk may be normal, elevated, or suspended.

## 5. Exit Conditions

A03/A18/A19/A20 authentication surfaces, step-up, device/session action, recovery, alert review, support, or return to S01.

## 6. Layout Structure

Top to bottom: security posture/hold; recent alert; authentication methods; password/PIN/biometric; trusted devices; active sessions; activity log; recovery/help.

## 7. Information Hierarchy

Active hold or suspicious event first; current device/session trust second; controls third; historical access fourth.

## 8. Components

Existing: Badge, Alert, Card, List/Table, Switch, Button, Dialog, Timeline, Masked Field, Link.

New: Security Posture Block, Security Alert Row, Authentication Method Row, Device Trust Row, Session Row, Security Event Summary.

## 9. States

Secure, step-up required, new-device alert, trusted, provisional device, session active, session expired, device revoked, security hold, compromised suspected, offline read-only, and service error.

## 10. Validation

Changes require current authentication, step-up, device/session risk checks, cooldown, recovery policy, and server confirmation. Client cannot mark a device trusted or a session revoked.

## 11. Error Behaviour

Separate failed factor, expired challenge, propagation delay, unauthorized action, security hold, and provider outage. Do not reveal sensitive risk signals.

## 12. Recovery Behaviour

Use locked A16-A22 recovery, revoke sessions/devices, re-authenticate, wait for cooldown, or contact Security/Support. Notify verified channels after material changes.

## 13. Accessibility

Device/session rows have accessible labels and consequences. Timeout warnings, revocation results, and security alerts are announced. Sensitive reveals are temporary and non-persistent.

## 14. Analytics

`s04_viewed`, `security_alert_opened`, `auth_method_opened`, `credential_change_started`, `biometric_changed`, `device_opened`, `session_opened`, `session_revoked`, `security_recovery_selected`.

## 15. Engineering Notes

S04 is a navigation/projection surface over Authentication, Device Trust, Session, Audit, Notification, and Recovery services. Revocation must propagate to tokens, clients, and notifications.

## 16. Acceptance Criteria

- User can identify current security posture and active sessions/devices.
- Security changes require appropriate step-up and audit.
- Revocation and recovery are not client-only.
- A security hold has a safe support/recovery path.

# S05 - Documents, Consent & Legal

## 1. Screen Purpose

Manage KYC/tax/agreement documents, privacy, terms, consent, audit-safe history, data requests, and legal access while reusing R05/O04 for artifact detail and downloads.

## 2. User Goal

Know what documents and consents exist, what is expiring or required, how data is used, and how to request access/correction/deletion.

## 3. Business Goal

Improve compliance completion, privacy control, document retention, and legal defensibility.

## 4. Entry Conditions

Authenticated session with document, consent, privacy, or data-request scope.

## 5. Exit Conditions

Document upload/replacement, R04 compliance, R05 report/proof, O04 download, consent change, privacy/data request, support, or return to S01.

## 6. Layout Structure

Top to bottom: required/expiring documents; KYC and tax documents; agreements; consent categories; privacy/terms; audit history; data request controls; retention/legal-hold explanation; support.

## 7. Information Hierarchy

Required action and expiry first; document/consent status second; purpose and sharing third; legal history and request controls fourth.

## 8. Components

Existing: Document Row, Card, Badge, Upload, Checkbox, Button, Link, Alert, Timeline, Table, Dialog.

New: Consent Scope Row, Purpose/Recipient Panel, Data Request Form, Retention Boundary Notice, Audit Event Summary, Document Impact Notice.

## 9. States

No documents, current, uploaded, under review, more information required, approved, rejected, expired, superseded, revoked consent, re-consent required, data request pending, legal hold, restricted, offline, and error.

## 10. Validation

Document type, purpose, jurisdiction, validity, consent scope/version, request type, identity verification, and retention rules are server-authoritative.

## 11. Error Behaviour

Separate upload/scan/review failure, consent service outage, permission denial, legal hold, expired artifact, and data-request validation failure. Preserve prior valid records.

## 12. Recovery Behaviour

Replace document, re-consent, correct request, verify identity, open privacy/support case, or view the existing authoritative artifact. Deletion is never silently confirmed when legally restricted.

## 13. Accessibility

Legal and consent content is semantic, versioned, readable at zoom, and keyboard accessible. Upload status, expiry, and request progress are announced.

## 14. Analytics

`s05_viewed`, `document_category_opened`, `document_upload_started`, `consent_scope_opened`, `consent_changed`, `privacy_policy_opened`, `terms_opened`, `data_request_started`, `audit_history_opened`, `retention_notice_opened`.

## 15. Engineering Notes

Document, Consent, Privacy, Audit, Artifact, Identity, and Case services own truth. Every consent and data request stores purpose, scope, version, actor, time, legal basis, and propagation state.

## 16. Acceptance Criteria

- Required, expiring, current, rejected, and superseded documents are distinct.
- Marketing, regulatory, privacy, and specialist consent are separate.
- Data request, retention, legal hold, and deletion boundaries are explicit.
- Artifacts deep-link to R05/O04 without duplication.

# S06 - Notifications & Communication

## 1. Screen Purpose

Manage push, email, SMS, marketing, transactional, security, regulatory, and service communication preferences and delivery state.

## 2. User Goal

Control optional communications while understanding which critical messages remain required or protected.

## 3. Business Goal

Improve consent quality, delivery reliability, preference compliance, and relevant engagement.

## 4. Entry Conditions

Authenticated session with communication preference scope; channel verification and country rules available.

## 5. Exit Conditions

Preference saved, channel verification, notification history/deep link, consent/privacy, support, or return to S01.

## 6. Layout Structure

Top to bottom: critical/security notice; verified channels; transactional/regulatory preferences; marketing preferences; push/email/SMS controls; quiet hours/timezone; delivery issues; save/history/help.

## 7. Information Hierarchy

Security/regulatory communication boundary first; channel ownership/verification second; optional preferences third; delivery troubleshooting fourth.

## 8. Components

Existing: Switch, Checkbox, Card, Badge, Button, Link, Alert, Select, Timezone Selector, Loading, Error.

New: Communication Category Row, Channel Verification Row, Consent Basis Notice, Quiet Hours Control, Delivery Health Summary, Notification Scope Panel.

## 9. States

Default, channel unverified, opted in, opted out, mandatory, suppressed, delivery failed, provider unavailable, consent pending, policy restricted, offline draft, saved, and error.

## 10. Validation

Channel ownership, consent basis, category, locale, timezone, quiet hours, regulatory exceptions, and provider capability are server-authoritative.

## 11. Error Behaviour

Do not claim saved preference on timeout. Explain mandatory categories, channel failure, verification requirement, and provider outage separately.

## 12. Recovery Behaviour

Verify channel, retry save, choose permitted alternate channel, update contact in S02, inspect notification delivery, or contact Support.

## 13. Accessibility

Switches state their purpose and impact. Mandatory versus optional is text-based. Quiet hours and timezone controls are accessible and announced after save.

## 14. Analytics

`s06_viewed`, `channel_opened`, `channel_verification_started`, `notification_preference_changed`, `marketing_opt_out`, `regulatory_preference_viewed`, `quiet_hours_changed`, `delivery_issue_opened`.

## 15. Engineering Notes

Preference changes update Consent and Notification services with version, purpose, channel, legal basis, and propagation status. Critical security/regulatory events use separate lawful-basis rules.

## 16. Acceptance Criteria

- Mandatory, transactional, security, regulatory, service, and marketing communication are distinct.
- Preference save is authoritative and auditable.
- Delivery failure does not change underlying financial/account state.
- Channel verification and fallback behavior are clear.

# S07 - Support & RM

## 1. Screen Purpose

Provide Help Center, support tickets, chat, callback, RM contact, escalation, grievance, and complaint tracking with safe context and ownership.

## 2. User Goal

Find help, contact the right team, understand case status, and know when the next response is expected.

## 3. Business Goal

Improve self-service resolution, route cases correctly, satisfy grievance obligations, and reduce repeated explanation.

## 4. Entry Conditions

Authenticated session or approved public support path; originating context may be account, security, order, payment, report, tax, or compliance.

## 5. Exit Conditions

Help article, chat, callback request, new case, existing case, RM handoff, escalation, complaint/grievance, or return to S01.

## 6. Layout Structure

Top to bottom: urgent/security/compliance route; search Help Center; open cases; RM card; contact methods; callback; escalation/complaint tracking; shared context and privacy notice.

## 7. Information Hierarchy

Urgent safety/financial issue first; current case owner/SLA second; self-service and contact methods third; historical case evidence fourth.

## 8. Components

Existing: Search, Card, Badge, Button, Link, Chat, Form, Timeline, Alert, Empty, Loading, Error.

New: Support Context Bundle, Case Status Row, SLA/Owner Block, RM Assignment Card, Callback Request, Escalation Path, Complaint Tracker, Data Shared Notice.

## 9. States

No cases, draft case, open, triaged, assigned, waiting for customer, waiting for vendor/internal review, escalated, resolved, reopened, complaint pending, callback scheduled/failed, RM unavailable, restricted, offline draft, and error.

## 10. Validation

Case category, severity, safe context, contact channel, consent, callback timezone, complaint jurisdiction, and identity verification are validated. Sensitive case data is role-scoped.

## 11. Error Behaviour

Differentiate case creation failure, contact provider failure, queue delay, SLA breach, restricted case visibility, and outage. Preserve draft context.

## 12. Recovery Behaviour

Retry idempotently, resume draft, alternate channel, reopen within policy, escalate, submit complaint via approved route, or contact emergency/security support.

## 13. Accessibility

Chat has keyboard and screen-reader support, transcript access, live updates, and alternative callback/case route. Status and SLA are text-based and announced.

## 14. Analytics

`s07_viewed`, `help_search_submitted`, `article_opened`, `case_started`, `case_created`, `chat_started`, `callback_requested`, `rm_opened`, `escalation_started`, `complaint_started`, `case_reopened`.

## 15. Engineering Notes

Support Case service owns state, SLA, owner, escalation, and disposition. Context bundle is consented, masked, correlation-linked, and immutable after handoff except through append-only updates.

## 16. Acceptance Criteria

- User can identify the right support route and current owner.
- Case creation does not imply issue resolution.
- RM, Support, Compliance, Finance, Tax, Security, and Operations routes are distinct.
- Complaint/escalation paths preserve regulatory evidence and status.

## 13. Account UX Pattern Library

| Pattern | Purpose | Required behavior |
|---|---|---|
| Status Before Edit | Prevent editing stale or restricted data | Show current value, status, source, and editability |
| Impact Before Confirm | Explain downstream consequences | State re-verification, entitlement, notification, and session effects |
| Step-Up at Boundary | Protect material changes | Trigger before submit, not after side effect |
| Scoped Access | Prevent family/specialist overreach | Show resource, purpose, recipient, duration, and revocation |
| Evidence After Change | Build trust | Show reference, timestamp, new state, and next review |
| Safe Draft/Resume | Reduce friction safely | Persist draft without treating it as approved |
| Required Versus Optional | Separate regulation from marketing | Label legal basis and withdrawal behavior |
| Human Ownership | Make service accountable | Owner, SLA, next update, case ID, escalation path |
| Reverification Required | Explain policy-driven follow-up | State why, impact, evidence needed, and recovery |
| Secure Reveal | Protect sensitive data | Temporary reveal, accessible name, no analytics value |
| Correction Without Erasure | Preserve history | Append corrected version and show lineage |
| No Dead End | Keep every exception actionable | Retry, correct, wait, support, or safe return |

## 14. Security Component Inventory

| Component | Purpose | Existing or New | Dependencies | Variants | States | Reusability |
|---|---|---|---|---|---|---:|
| Security Posture Block | Current security state | New | Auth, device, session, risk | Secure, elevated, suspended | Current, stale, loading | 5 |
| Security Alert Row | Explain material event | Existing, extend | Notification, audit | Login, device, contact, bank | New, read, escalated | 5 |
| Authentication Method Row | Manage factor | Existing, extend | Auth, consent | OTP, password/PIN, biometric, passkey | Active, pending, failed, restricted | 5 |
| Device Trust Row | Review/revoke device | Existing, extend | Device Trust | Current, trusted, provisional | Trusted, expired, revoked, suspended | 5 |
| Session Row | Review/revoke session | Existing, extend | Session | Current, other device | Active, warning, expired, revoked | 5 |
| Security Event Summary | Safe activity log entry | New | Audit projection | Login, change, recovery | Confirmed, suspicious, restricted | 5 |
| Step-Up Prompt | Confirm sensitive action | Existing, extend | Auth, risk | OTP, biometric, passkey | Required, success, failed, expired | 5 |
| Recovery Impact Notice | Explain change consequences | Existing pattern, extend | Recovery, policy | Contact, device, bank, credential | Visible, acknowledged | 5 |
| Session Revocation Dialog | Confirm exact target | Existing, extend | Session, audit | One session, all sessions | Ready, processing, complete, failed | 5 |
| Security Recovery Panel | Route lost/compromised access | Existing, extend | A16-A22 | Device, email, mobile, account | Open, pending, escalated | 5 |

## 15. Settings Component Inventory

| Component | Purpose | Dependencies | Variants | States | Reusability |
|---|---|---|---|---|---:|
| Account Health Card | Summarize account actions | Lifecycle, compliance, docs | Identity, bank, tax, security | Current, action, restricted | 5 |
| Profile Field Group | Present editable profile data | Identity/profile | Personal, contact, residency | Current, draft, locked | 5 |
| Preference Row | Manage optional choice | Consent/preferences | Investment, display, marketing | On, off, pending, restricted | 5 |
| Regulatory Field Group | Capture regulated data | Compliance/policy | FATCA/CRS/tax residency | Required, review, expired | 5 |
| Change Impact Notice | Explain downstream effect | Policy/entitlement | Re-KYC, session revoke, eligibility | Visible, acknowledged | 5 |
| Scope Selector | Choose account/family context | Permission/consent | Investor, account, folio, household | Loading, selected, denied | 5 |
| Consent Scope Row | Show purpose/recipient/duration | Consent service | Marketing, RM, tax, analytics | Accepted, withdrawn, expired | 5 |
| Data Request Form | Request access/correction/deletion | Privacy/identity/case | Access, portability, correction, deletion | Draft, submitted, review, resolved | 5 |
| Document Validity Row | Show evidence state | Document service | KYC, tax, agreement, statement | Valid, expiring, expired, rejected | 5 |
| Support Context Bundle | Carry safe context | Support/audit | Account, security, financial, tax | Ready, sent, restricted | 5 |
| Delivery Preference Row | Manage channel/category | Notification/consent | Push, email, SMS, WhatsApp | Enabled, disabled, failed | 5 |
| Audit History Row | Show safe event history | Audit projection | Consent, profile, security, data | Current, redacted, restricted | 5 |

## 16. Document Management Strategy

### Document categories

KYC, tax, DTAA, FATCA/CRS, agreements, statements, receipts, reports, bank evidence, nominee/ownership evidence, support attachments, and future product documents.

### Document lifecycle

`NOT_SUBMITTED -> UPLOADING -> UPLOADED -> QUALITY_CHECK -> UNDER_REVIEW -> APPROVED -> EXPIRED/REPLACEMENT_REQUIRED -> SUPERSEDED/REVOKED`

### Rules

- Logical document identity is separate from file version.
- Approval is scoped to type, purpose, jurisdiction, issuer, and validity period.
- Every version stores hash, source, actor, timestamp, policy, reviewer, and retention state.
- Expired documents remain visible as historical evidence where allowed.
- Replacement does not erase prior versions.
- KYC/tax/compliance documents require secure storage, malware scanning, encryption, access audit, retention, and legal hold.
- Download and share permissions are stronger than view permissions.
- Document deletion is a policy-controlled request, not an immediate client action.

## 17. Notification Strategy

### Categories

- Security: mandatory under approved lawful basis.
- Regulatory/compliance: mandatory or policy-controlled.
- Transactional: order, payment, mandate, report, document, and case events.
- Service: SLA, outage, recovery, and maintenance.
- Marketing: optional, consent-based, frequency-controlled.

### Rules

- Notification preferences never alter underlying financial or compliance state.
- Channel ownership must be verified before sensitive messages.
- Critical events create durable in-app records.
- Push/email/SMS/WhatsApp fallback follows channel policy and consent.
- Quiet hours do not suppress legally required or urgent security notifications.
- Delivery failure creates a delivery event and may trigger support outreach.
- Templates, language, purpose, consent, and provider references are versioned.

## 18. Support & RM Interaction Framework

| Route | Best for | Owner | Required handoff |
|---|---|---|---|
| Help Center | General education and self-service | Content/Support | Article version and search context |
| Chat | Fast clarification and triage | Support | Safe context, transcript consent |
| Callback | Time-zone or complex explanation | Support/RM | Number/channel, timezone, case/SLA |
| RM | Assigned relationship and assisted DIY | RM | Assignment, consent, EUIN/authority, context |
| Support case | Operational issue | Support | Originating entity, safe metadata, SLA |
| Finance case | Payment/refund/reconciliation | Finance/Operations | Payment/order references, amount, source |
| Tax case | Tax complexity | Tax/CA | Tax scope, consent, period, documents |
| Compliance case | KYC/AML/DTAA/restriction | Compliance | Evidence, policy, reason category |
| Security recovery | Compromised/lost access | Security/Support | Device/session/recovery evidence |
| Complaint/grievance | Formal unresolved complaint | Grievance owner | Complaint category, history, escalation SLA |

The user must see owner, case reference, status, next update, and what information was shared.

## 19. Consent Management Framework

### Consent dimensions

Purpose, data, recipient, action, channel, scope, country, version, lawful basis, start time, expiry, withdrawal, and propagation status.

### Consent categories

- Regulatory declaration.
- Privacy/data processing.
- Communication channel.
- Marketing.
- RM/CA/tax consultant handoff.
- Portfolio/household sharing.
- Analytics/personalization.
- Document/report sharing.

### Rules

- View does not imply consent.
- One purpose cannot silently grant another.
- Withdrawal affects new processing according to propagation policy and does not erase required records.
- Re-consent is required after material purpose/scope/version change.
- Consent changes invalidate related sharing, schedules, and personalization entitlements where applicable.
- Every decision is versioned and auditable.

## 20. Cross-Module Dependencies

| Hub need | Authority | Required metadata |
|---|---|---|
| Identity/profile | Identity/Profile | Version, source, verification, effective date |
| Residency/tax | Compliance/Tax | Jurisdiction, tax year, rule, review, expiry |
| Risk/preferences | Risk/Consent/Profile | Question version, profile version, consent, expiry |
| Banks/mandates | Account/Bank/Mandate | Ownership, type, verification, compatibility, status |
| Security | Auth/Device/Session/Audit | Trust, session, risk, event, propagation |
| Documents | Document/Artifact | Version, validity, hash, retention, legal hold |
| Notifications | Consent/Preference/Notification | Category, channel, lawful basis, delivery |
| Support | Case/CRM/SLA | Owner, status, scope, case ID, next update |
| Reports/download | Report/Artifact/O04 | Finality, source, scope, expiry, audit |

## 21. Independent Principal Product Review

### Missing account scenarios

- User changes country of residence while tax residency remains unchanged.
- User has multiple tax residencies or conflicting declarations.
- Joint holder revokes consent while primary holder remains active.
- Nominee claim or deceased investor hold changes access.
- Household member loses access to one folio but retains another.
- RM reassignment while an assisted case is open.
- User changes contact details while logged in on multiple devices.
- User requests profile correction during a compliance hold.
- User is resident-converted and retains historical NRI reports.
- User closes an account while reports, mandates, downloads, or cases remain active.

### Missing security scenarios

- SIM swap or mobile number takeover.
- Email account compromise.
- Password/PIN reset during a security hold.
- New device after contact change.
- Biometric disabled by operating system or device replacement.
- Session revocation propagation delay.
- Security alert received after logout.
- Shared/family device with cached sensitive data.
- Support-assisted recovery with incomplete evidence.

### Missing compliance requirements

- Re-KYC triggers from profile, country, tax, risk, or document change.
- FATCA/CRS change-in-circumstance refresh.
- DTAA evidence expiry and treaty-version change.
- Sanctions/PEP/EDD review affecting account controls.
- Country-specific data residency and cross-border specialist access.
- Privacy deletion request versus financial/audit retention.
- Legal/death claim and nominee access.
- Consent withdrawal affecting scheduled reports, RM access, or portfolio sharing.

### Missing document workflows

- Document upload interruption and resumable upload.
- Malware/quarantine state.
- OCR mismatch and user correction.
- Replacement while prior document is still valid.
- Expiry reminder and overdue escalation.
- Artifact amendment and superseded report.
- Document access after permission revocation.
- Download link expiry versus underlying document retention.

### Missing support journeys

- Case created from a deep link with safe activity context.
- Case routed from Support to Finance/Tax/Compliance/Security.
- SLA breach and escalation.
- Customer response requested and reminder expiry.
- Complaint reopened after apparent resolution.
- RM unavailable or reassigned.
- Chat transcript consent and export.
- Callback failed or timezone mismatch.

### Missing accessibility considerations

- Full keyboard path for security revocation and consent changes.
- Accessible tables for sessions, devices, documents, and audit events.
- Screen-reader announcement for consent propagation and security changes.
- Accessible chat alternative and transcript.
- Long legal and translated content reflow.
- Reduced-motion behavior for security alerts and pending states.
- Meaningful filenames and accessible document metadata.

### Missing reusable components

`AccountHealthCard`, `ChangeImpactNotice`, `ScopedAccessNotice`, `SecurityPostureBlock`, `ConsentScopeRow`, `DocumentValidityRow`, `DataRequestForm`, `SupportContextBundle`, `HumanOwnershipBlock`, `PropagationStatus`, `RetentionBoundaryNotice`, `ReverificationPrompt`, and `SensitiveChangeConfirmation` should be platform primitives.

### Principal review decision

The seven-screen architecture is sufficient. The significant improvement is to treat the Hub as a control-plane projection with explicit ownership, consent, impact, propagation, and evidence behavior. No new customer-facing module is needed for audit, downloads, authentication recovery, or financial activity because those capabilities already have authoritative locked destinations.

## 22. Implementation Readiness Gates

Before high-fidelity design and engineering commitment:

- Approve field-level editability and re-verification rules.
- Define account/folio/household scope and joint-holder/nominee authority.
- Freeze security step-up, recovery, propagation, and alert policies.
- Approve document retention, legal hold, deletion, and cross-border access rules.
- Define consent taxonomy, legal basis, withdrawal, and re-consent triggers.
- Define Support/RM/Finance/Tax/Compliance/Security staffing and SLAs.
- Test S02-S05 with profile, bank, consent, document, and account-change scenarios.
- Validate accessibility of security tables, forms, consent, uploads, chat, and legal content.

## 23. Architectural Decisions

1. Use seven screens: Overview, Profile/Preferences, Banking/Ownership, Security, Documents/Consent/Legal, Notifications, and Support/RM.
2. Reuse Authentication recovery, Orders/Reports activity, and Download Centre rather than duplicating them.
3. Treat the Hub as an operational control plane, not a passive settings page.
4. Separate profile, tax residency, FATCA/CRS, risk, preference, consent, and compliance truth.
5. Protect material changes with step-up, impact notices, idempotency, audit, and propagation status.
6. Make resource scope, purpose, recipient, duration, and revocation visible for sharing and specialist access.
7. Preserve regulated history through correction, supersession, retention, and legal-hold states.
8. Keep Security, Banking, Documents, Support, and Consent as shared behavioral component families.
9. Do not expose internal AML, fraud, security, or reviewer rationale.
10. Do not create a new customer-facing screen for every state or service team.

## 24. Assumptions

- Locked authentication, lifecycle, entitlement, document, report, order, and support contracts are available.
- Users can hold multiple accounts, folios, currencies, household relationships, and tax residencies.
- Material profile, bank, security, consent, and document changes can trigger re-verification or restrictions.
- O04, R05, O02, and A16-A22 remain authoritative destinations for their domains.
- Support, RM, Compliance, Finance, Tax, Operations, and Security have distinct authority and queues.
- Exact country-specific rules, retention periods, SLAs, and legal language remain UNKNOWN until sign-off.

## 25. Risks

- Incorrect profile or residency change can invalidate tax, eligibility, or reporting decisions.
- Bank/nominee/household errors can create financial or legal ownership harm.
- Weak session/device propagation can leave compromised access active.
- Consent ambiguity can expose data or invalidate scheduled/shared services.
- Document retention/deletion conflicts can create privacy or regulatory exposure.
- Support context over-sharing can expose sensitive data to the wrong team.
- Notification preference mistakes can suppress critical regulatory/security communication.
- Hub complexity can recreate the settings sprawl it is intended to replace.
- Future global and family expansion can overload a single permission model if scope is not explicit.

## 26. Open Questions

- Which profile fields can users edit directly versus only through review?
- Which changes trigger full KYC, partial re-KYC, risk refresh, FATCA/CRS refresh, or eligibility re-evaluation?
- What joint-holder mandates and nominee legal triggers are supported at launch?
- Which banks, account types, currencies, and mandate rails are supported?
- What are security step-up thresholds and recovery SLAs by action risk?
- What is the user-visible activity-log retention and detail policy?
- Which documents can be deleted, redacted, replaced, or only archived?
- Which consent categories are required, optional, time-bound, or legally retained?
- What data-request types and response SLAs are required by country?
- What is the RM/support role boundary and assisted-action policy?
- What are complaint, grievance, and regulator escalation requirements?
- Which channels are supported for mandatory and optional communications?

## 27. Recommendations for Product Completion

1. Define the authoritative field-level permission and change-impact matrix before wireframing.
2. Build a state fixture library for contact, country, tax, risk, bank, nominee, security, consent, document, and support changes.
3. Reuse `ChangeImpactNotice`, `ScopedAccessNotice`, `PropagationStatus`, `SensitiveChangeConfirmation`, `ConsentScopeRow`, and `SupportContextBundle` across all future modules.
4. Run cross-functional testing with Compliance, Security, Operations, Support, Finance, Tax, and Accessibility teams.
5. Validate S02-S05 with NRI users, joint holders, users with expired documents, and users recovering from a lost device.
6. Do not add advanced family, advisor, global tax, or AI account-management features until scope, consent, audit, and revocation behavior is proven.
