# NRI DIY Mutual Fund Platform
## End-to-End UX Flow Architecture

**Role:** Principal UX Architect  
**Status:** Flow blueprint for wireframe and service-design preparation  
**Constraint:** No UI or visual screen designs are included

## Scope and Evidence

This document translates the following artifacts into end-to-end UX flow architecture:

- [Product Discovery: BRD Reverse Engineering](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md)
- [Market Intelligence and Competitive Analysis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Market_Intelligence_Competitive_Analysis.md)
- [User Research Synthesis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_User_Research_Synthesis.md)
- [Product Strategy](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Strategy.md)
- [Service Blueprint](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Service_Blueprint.md)
- [Information Architecture and Navigation Architecture](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Information_and_Navigation_Architecture.md)

## Flow conventions

- **Primary flow:** Expected path for an eligible, verified individual investor.
- **Alternate flow:** Valid path that changes sequence or actor without being an error.
- **Failure flow:** The requested outcome cannot safely proceed.
- **Recovery flow:** The customer or service returns to a safe, actionable state.
- **Edge cases:** Conditions requiring explicit product or policy decisions.
- **Permission flow:** Who can initiate, view, edit, approve or export.
- **State transitions:** Domain state, not a visual loading treatment.
- **Backend dependencies:** Systems, APIs, vendors or human queues required.
- **Regulatory checkpoint:** A point where legal/compliance evidence or approval is required.
- **AI opportunity:** Assistive use only unless a separate legal and governance gate approves more.

## Global flow rules

1. No flow may imply that payment, order, tax or compliance work completed without authoritative confirmation.
2. Every money-affecting action uses an idempotency key and a correlation ID.
3. Every external callback is treated as asynchronous and reconciled.
4. Every pending state has an owner, SLA, next update and recovery path.
5. Every estimate is labelled as an estimate with inputs, rule version and finality boundary.
6. Every role sees only consented and permitted data.
7. Every regulated decision records policy version, actor, evidence, timestamp and reason.
8. MVP scope is selected-country individual NRI MF execution; future or gated capabilities are labelled.

# 1. Registration

~~~mermaid
graph TD
  A[Registration intent] --> B[Enter mobile and email]
  B --> C[Verify contact channels]
  C --> D[Capture country and tax residency]
  D --> E[Duplicate and eligibility check]
  E -->|Eligible to continue| F[Create provisional investor]
  E -->|Review or restricted| G[Explain status and next step]
  E -->|Unsupported| H[Safe exit and interest capture]
  F --> I[Begin onboarding]
  C -->|Failure| J[Retry or support]
  J --> B
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Establish a secure, country-aware identity before collecting high-sensitivity documents or showing potentially unavailable products. |
| Business reasoning | Prevents ineligible acquisition from entering expensive KYC and support queues. |
| User reasoning | Gives the NRI an early answer about whether the product is relevant. |
| Compliance reasoning | Country, tax residency, consent and duplicate identity are prerequisites to responsible onboarding. |
| Primary flow | Customer submits mobile/email, verifies contact, selects country and tax residency, passes duplicate check and creates provisional investor. |
| Alternate flow | Existing CKYC/PAN identity is detected; customer is offered secure login or account recovery rather than a duplicate account. |
| Failure flow | OTP, duplicate, unsupported country or service error prevents account creation with a specific safe reason. |
| Recovery flow | Resend or alternate channel; support-assisted recovery; update country context; retry after service restoration. |
| Edge cases | Dual tax residency; country changes during onboarding; shared email/mobile; existing investor with changed contact; unsupported country with future-interest capture. |
| Permission flow | Investor creates and edits own data; joint holder has no access yet; Support can view masked identity; Admin configures controls but cannot approve the customer. |
| State transitions | Loading → Verification → Approved/provisional → Completed; Failure → Retry; Restricted → Escalated or closed. |
| Business rules | One identity per approved uniqueness policy; country and tax residency are effective-dated; unsupported country cannot continue to money movement. |
| Backend dependencies | Identity service, OTP provider, PAN/duplicate service, policy service, consent service, analytics and CRM. |
| Notifications | OTP by SMS/email; registration confirmation by email; restricted/review message in-app and email where permitted. |
| Analytics events | signup_start, otp_requested, otp_verified, country_selected, tax_residency_added, eligibility_checked, signup_complete, registration_failed. |
| Success criteria | Provisional account created with correct country context and no duplicate identity. |
| Failure criteria | Duplicate accounts, incorrect country context, unclear rejection or sensitive data collected before consent. |
| UX risks | Asking too much too early; false promise of eligibility; country selector interpreted as tax advice. |
| Trust signals | Secure identity language, reason for country questions, privacy scope, support identifier and clear next step. |
| Regulatory checkpoints | Privacy consent, FATCA/CRS applicability, country restrictions, duplicate KYC and data-retention policy. |
| Human intervention points | Support for identity recovery; Compliance for country ambiguity or high-risk jurisdiction. |
| AI opportunities | Duplicate-pattern assistance or language detection only; never autonomous identity approval. |

# 2. Login

~~~mermaid
graph TD
  A[Login request] --> B[Enter verified identifier]
  B --> C[Authenticate]
  C -->|Success| D[Device and risk check]
  D -->|Safe| E[Load context]
  D -->|Step-up needed| F[Additional verification]
  F --> E
  C -->|Failure| G[Retry limits]
  G -->|Within limit| B
  G -->|Locked or risky| H[Security hold and support]
  E --> I[Home]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Protects financial, identity and tax data while minimizing repeated friction for a returning NRI. |
| Business reasoning | Secure retention and lower support cost without weakening account protection. |
| User reasoning | Fast, predictable access with clear recovery when abroad or changing devices. |
| Compliance reasoning | Strong authentication, session control, device audit and suspicious-access response are required. |
| Primary flow | Verified identifier → OTP/approved factor → device risk check → authorized context → Home. |
| Alternate flow | Trusted device session; step-up authentication for sensitive action; recovery through verified email/mobile. |
| Failure flow | Incorrect factor, expired session, suspicious device or rate limit leads to safe hold, not indefinite retries. |
| Recovery flow | Wait period, resend, account recovery, device reset and Support/Security review. |
| Edge cases | Lost phone abroad, SIM change, dual-device use, shared device, timezone mismatch, compromised email. |
| Permission flow | Investor accesses own data; Joint Holder accesses only authorized shared context; internal roles never use customer credentials. |
| State transitions | Loading → Verification → Approved session; Failure → Retry; Suspended → Security review → Approved or Rejected. |
| Business rules | Session timeout; device revocation; step-up for money, profile, export and permission changes. |
| Backend dependencies | Identity, authentication/OTP, device fingerprint, session store, security monitoring and audit. |
| Notifications | New device/login alert by email and push; security hold by email/SMS where appropriate; no sensitive content in SMS. |
| Analytics events | login_started, login_success, login_failed, device_added, step_up_requested, session_locked, account_recovered. |
| Success criteria | Authorized customer reaches correct context with complete audit trail. |
| Failure criteria | Account takeover, brute-force exposure, ambiguous lockout or support cannot verify ownership. |
| UX risks | Security copy increases fear; OTP failure is common for international users; over-aggressive risk checks block legitimate customers. |
| Trust signals | Device name, last access, reason for step-up and visible security recovery path. |
| Regulatory checkpoints | Authentication, privacy, audit, suspicious access and account takeover incident policy. |
| Human intervention points | Support for recovery; Security for suspected compromise; Compliance if account activity is suspicious. |
| AI opportunities | Risk signal triage and support summarization; no autonomous lock without policy and appeal path. |

# 3. Email Verification

~~~mermaid
graph TD
  A[Email submitted] --> B[Send signed verification link]
  B --> C[Open link]
  C --> D{Valid and unexpired?}
  D -->|Yes| E[Verify email]
  D -->|No| F[Expired or invalid]
  F --> G[Request new link]
  G --> B
  E --> H[Update identity state]
  H --> I[Continue onboarding or return to session]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Confirms a durable channel for reports, security and service communication. |
| Business reasoning | Reduces failed communication, duplicate accounts and report-delivery cost. |
| User reasoning | Confirms the address used for important evidence and recovery. |
| Compliance reasoning | Communication consent and verified contact support privacy and audit obligations. |
| Primary flow | Submit email → receive signed link → validate expiry and token → mark verified → continue. |
| Alternate flow | Verify from a second device or use already verified email after re-authentication. |
| Failure flow | Link expired, wrong account, email bounce or token mismatch. |
| Recovery flow | Issue new link, update email through authenticated session or Support verification. |
| Edge cases | Link opened in an untrusted device; multiple links; changed email during pending verification; mailbox security scan pre-opens link. |
| Permission flow | Investor verifies own email; Support can resend but not mark verified without approved evidence; Admin manages template only. |
| State transitions | Loading → Pending → Verification → Completed; Expired → Retry; Suspended if abuse detected. |
| Business rules | One active token per channel; token expiration; replay prevention; email ownership cannot be inferred from delivery alone. |
| Backend dependencies | Email provider, identity service, token service, consent and audit. |
| Notifications | Verification email; resend rate-limit message; security alert if email changes. |
| Analytics events | email_verification_started, email_sent, email_opened, email_verified, email_expired, email_bounced, email_resend. |
| Success criteria | Verified address linked to correct investor and usable for approved communication. |
| Failure criteria | Wrong account verified, replayed token, silent bounce or unverified account treated as verified. |
| UX risks | Mail delays and link ambiguity; security scanners; customers using a shared family inbox. |
| Trust signals | Sender identity, secure link explanation, expiry and support path. |
| Regulatory checkpoints | Consent, communication preference and change audit. |
| Human intervention points | Support for email change and ownership recovery; Security for abuse. |
| AI opportunities | Bounce classification and support routing only. |

# 4. Mobile Verification

~~~mermaid
graph TD
  A[Mobile submitted] --> B[Send OTP]
  B --> C[Enter OTP]
  C -->|Valid| D[Verify mobile]
  C -->|Invalid| E[Retry counter]
  E -->|Allowed| C
  E -->|Exceeded| F[Temporary lock]
  B -->|Delivery failure| G[Resend or alternate verified channel]
  D --> H[Continue]
  F --> I[Support or timed recovery]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Establishes an authentication and transactional alert channel for an international customer. |
| Business reasoning | Enables secure onboarding and transaction communication without relying on a single channel. |
| User reasoning | Provides a familiar, fast verification path while abroad. |
| Compliance reasoning | Supports identity, OTP and communication controls; number ownership is not the same as identity proof. |
| Primary flow | Country code and mobile → OTP → validation → verified mobile → continue. |
| Alternate flow | Email verification first, then mobile retry; supported international number change after authentication. |
| Failure flow | Delivery failure, invalid OTP, rate limit or unsupported country code. |
| Recovery flow | Resend with cooldown, alternate verified channel, update number after step-up or Support review. |
| Edge cases | Roaming delay, recycled number, dual-SIM, WhatsApp-only number, number inaccessible during travel. |
| Permission flow | Investor owns mobile; Support can initiate but not bypass OTP; Admin manages provider policy. |
| State transitions | Pending → Verification → Completed; Failure → Retry; Retry limit → Suspended → Recovery. |
| Business rules | OTP expiry, attempt limit, resend cooldown, country-code validation and change audit. |
| Backend dependencies | SMS/OTP provider, identity, session, device risk, communication consent and audit. |
| Notifications | OTP SMS; security alert on number change; email fallback where permitted. |
| Analytics events | mobile_submitted, otp_sent, otp_verified, otp_failed, otp_resend, mobile_changed, mobile_locked. |
| Success criteria | Mobile verified without exposing OTP or creating a duplicate identity. |
| Failure criteria | OTP enumeration, repeated delivery failure with no alternate route or wrong number attached. |
| UX risks | International delivery latency; customers interpret OTP as account approval. |
| Trust signals | Masked number, expiry, attempt count, provider-neutral messaging and recovery path. |
| Regulatory checkpoints | Consent, authentication, audit and data minimization. |
| Human intervention points | Support for number-change verification; Security for suspicious attempts. |
| AI opportunities | Delivery anomaly detection and agent guidance only. |

# 5. PAN Verification

~~~mermaid
graph TD
  A[PAN submitted] --> B[Format and identity validation]
  B --> C[Duplicate investor check]
  C --> D{Match and eligible?}
  D -->|Yes| E[Link PAN to investor]
  D -->|Mismatch| F[Explain correction]
  D -->|Existing account| G[Secure recovery path]
  B -->|Provider error| H[Retry or manual review]
  E --> I[Continue KYC and tax context]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Links the investor to the correct Indian tax identity and prevents duplicate or mismatched accounts. |
| Business reasoning | Reduces downstream KYC, tax, folio and transaction reconciliation failures. |
| User reasoning | Avoids repeated data entry and gives confidence the portfolio belongs to the right identity. |
| Compliance reasoning | PAN identity, KYC uniqueness and tax reporting require verified relationships and audit. |
| Primary flow | Capture PAN → validate format/provider → compare identity → link to provisional investor. |
| Alternate flow | Existing compliant investor is routed to secure account recovery or existing-account login. |
| Failure flow | Invalid PAN, name/DOB mismatch, provider outage or duplicate account. |
| Recovery flow | Correct data, retry after provider recovery, upload evidence or Support/Compliance review. |
| Edge cases | Name changes, foreign passport, PAN not linked to Aadhaar, legacy folio mismatch, multiple tax residencies. |
| Permission flow | Investor enters own PAN; Support sees masked value; Compliance approves exception; Admin cannot alter without audit. |
| State transitions | Loading → Verification → Approved/Restricted; Failure → Retry; Mismatch → Escalated. |
| Business rules | PAN uniqueness; exact identity matching policy; no tax advice from validation result; no silent overwrite. |
| Backend dependencies | PAN validation, identity service, CKYC, KYC vendor, policy and audit. |
| Notifications | Correction request in-app/email; approval or review status; security alert on PAN change attempt. |
| Analytics events | pan_submitted, pan_validated, pan_mismatch, duplicate_detected, pan_linked, pan_reviewed. |
| Success criteria | Correct PAN linked to the correct investor with traceable evidence. |
| Failure criteria | Wrong PAN linkage, duplicate account creation or sensitive mismatch detail exposed. |
| UX risks | Government/provider latency; customer confusion between PAN validity and KYC approval. |
| Trust signals | Masked PAN, reason for match, no unnecessary reuse and clear support path. |
| Regulatory checkpoints | KYC, tax identity, privacy, audit and data-retention policy. |
| Human intervention points | Compliance for mismatch/exception; Support for account recovery. |
| AI opportunities | OCR or name-variant assistance with human review; no autonomous identity match approval. |

# 6. KYC

~~~mermaid
graph TD
  A[KYC start] --> B[CKYC lookup]
  B -->|Compliant record| C[Review and consent]
  B -->|No record or non-compliant| D[Collect documents]
  D --> E[OCR and quality check]
  E --> F[Liveness and video/IPV]
  C --> G[AML and tax declarations]
  F --> G
  G --> H{Review outcome}
  H -->|Approved| I[KYC completed]
  H -->|Missing or failed| J[Retry or correction]
  H -->|High risk| K[EDD escalation]
  K -->|Approved| I
  K -->|Rejected| L[Restricted or closed]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Provides legally acceptable identity evidence while minimizing unnecessary repetition through CKYC where valid. |
| Business reasoning | KYC is the activation gate; recovery quality directly affects conversion and support cost. |
| User reasoning | The customer needs to know what is required, why, how long review takes and what happens if evidence fails. |
| Compliance reasoning | CKYC, video KYC/IPV, AML, PEP, sanctions, FATCA/CRS and EDD require controlled evidence and decisions. |
| Primary flow | CKYC lookup → consent/review or document collection → OCR/liveness/video/IPV → AML/tax checks → approval. |
| Alternate flow | Existing KYC-compliant record fast-tracks; video failure schedules a retry; premium customer gets RM coordination without bypassing control. |
| Failure flow | Poor document, liveness failure, vendor outage, mismatch, AML hit or missing declaration. |
| Recovery flow | Specific evidence correction, re-upload, scheduled re-attempt, manual review or EDD; retain valid completed steps. |
| Edge cases | Passport expiry during review; multiple tax residencies; foreign passport/OCI; high-risk country; joint holder; accessibility limitation. |
| Permission flow | Investor uploads/views own evidence; Joint Holder owns own KYC; Operations prepares; Compliance approves/rejects; Support sees safe status; RM cannot approve. |
| State transitions | Loading → Verification → Pending review → Approved; Failure → Retry; High risk → Escalated/EDD → Approved or Rejected; Expired → Re-KYC. |
| Business rules | No investment until required KYC state; document validity; reviewer segregation; maker-checker; no sensitive AML reason to customer. |
| Backend dependencies | CKYC, KYC/video vendor, OCR, liveness, AML/sanctions, identity, document store, policy, case and audit. |
| Notifications | Required document, appointment, approval, rejection, review delay and expiry reminders by approved channels. |
| Analytics events | kyc_started, ckcycr_fetched, document_uploaded, document_rejected, video_started, video_failed, kyc_submitted, kyc_approved, kyc_rejected, kyc_retried. |
| Success criteria | Correct KYC decision with evidence, policy version, reviewer and recoverable status. |
| Failure criteria | KYC accepted without evidence, endless retry loop, unclear rejection, duplicate documents or manual bypass. |
| UX risks | Long, exposing and emotionally stressful; users may abandon when every problem says contact support. |
| Trust signals | Checklist, progress, reason, review SLA, data handling and named next owner. |
| Regulatory checkpoints | CKYC, IPV/video interpretation, PMLA, AML, FATCA/CRS, sanctions, retention and privacy. |
| Human intervention points | KYC Ops for evidence; Compliance for EDD, ambiguity and final decision; Support for navigation. |
| AI opportunities | Document classification/OCR and reviewer triage with confidence and human approval. |

# 7. FATCA

~~~mermaid
graph TD
  A[FATCA context detected] --> B[Explain applicability]
  B --> C[Collect declaration and tax identifiers]
  C --> D[Validate completeness]
  D -->|Complete| E[Compliance review]
  D -->|Incomplete| F[Correction]
  E -->|Approved| G[Record FATCA status]
  E -->|Review required| H[Escalate]
  E -->|Rejected| I[Restrict affected activity]
  F --> C
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Captures tax-residency and reporting declarations required for onboarding and ongoing compliance. |
| Business reasoning | Avoids delayed onboarding and regulatory remediation. |
| User reasoning | Explains why a foreign tax form is required and what information is being requested. |
| Compliance reasoning | FATCA status, TIN/GIIN where applicable, W-8BEN-equivalent declarations and annual recertification require evidence. |
| Primary flow | Determine applicability → explain → collect declaration/identifiers → validate → review → record status. |
| Alternate flow | Existing valid declaration is reused until expiry; multiple tax residencies trigger expanded capture. |
| Failure flow | Missing TIN, contradictory residency, incomplete declaration or review concern. |
| Recovery flow | Correct fields, add evidence, re-certify or route to Compliance; do not silently assume a status. |
| Edge cases | US person with restricted product access; dual residency; entity/individual confusion; expired declaration; country change. |
| Permission flow | Investor creates/edits own declaration; Compliance approves; Support guides; Tax Consultant views only with consent. |
| State transitions | Loading → Verification → Approved; Failure → Retry; Pending → Escalated; Expired → Re-certification; Suspended → Review. |
| Business rules | Effective date, expiry, required identifiers and country-specific product restrictions. |
| Backend dependencies | Profile, tax-residency, FATCA/CRS service, document store, policy, compliance queue and audit. |
| Notifications | Declaration incomplete, review, approval and renewal reminder. |
| Analytics events | fatca_started, fatca_applicability_viewed, declaration_submitted, tin_added, fatca_approved, fatca_rejected, fatca_renewal. |
| Success criteria | Correct declaration stored and linked to the effective tax-residency context. |
| Failure criteria | Incorrect self-certification, no expiry tracking or activity allowed despite unresolved status. |
| UX risks | Legal language is difficult; customers may mistake declaration for tax filing. |
| Trust signals | Plain-language explanation, purpose, data use, effective date and professional help boundary. |
| Regulatory checkpoints | FATCA/CRS rules, country restrictions, tax identifiers, reporting and annual recertification. |
| Human intervention points | Compliance for contradictory or high-risk declarations; Tax Consultant for advice with consent. |
| AI opportunities | Form completeness and contradiction detection; no autonomous legal interpretation. |

# 8. CRS

~~~mermaid
graph TD
  A[CRS context detected] --> B[Capture all tax residencies]
  B --> C[Collect TIN or reason unavailable]
  C --> D[Validate declarations]
  D -->|Valid| E[Store CRS status]
  D -->|Mismatch| F[Request correction]
  D -->|Ambiguous| G[Compliance review]
  F --> B
  G -->|Approved| E
  G -->|Restricted| H[Hold affected onboarding]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Supports accurate multi-country tax-residency self-certification. |
| Business reasoning | Reduces rework, reporting errors and country-change friction. |
| User reasoning | Gives a structured way to disclose more than one tax residency. |
| Compliance reasoning | CRS requires appropriate self-certification, TIN handling, reason codes and reporting controls. |
| Primary flow | Capture residencies → collect TIN/reason → validate → store effective status. |
| Alternate flow | Existing valid CRS declaration is re-used; country change triggers re-declaration. |
| Failure flow | Missing TIN, inconsistent address/country, incomplete declaration or review flag. |
| Recovery flow | Correct residency, supply evidence, provide permitted reason code or Compliance review. |
| Edge cases | Dual residency; no TIN issued by country; country not in supported taxonomy; address differs from residency. |
| Permission flow | Investor edits own data; Compliance approves ambiguity; Support cannot interpret tax law; Tax Consultant sees with consent. |
| State transitions | Loading → Verification → Approved; Failure → Retry; Ambiguous → Escalated; Expired → Re-certification. |
| Business rules | Multiple residency support, effective dates, required evidence and product restriction linkage. |
| Backend dependencies | Tax residency profile, CRS/FATCA engine, policy, document, compliance and audit. |
| Notifications | Missing information, review, approval and annual/country-change renewal. |
| Analytics events | crs_started, residency_added, tin_submitted, reason_added, crs_submitted, crs_approved, crs_reviewed. |
| Success criteria | All declared residencies and evidence are current and reportable. |
| Failure criteria | Silent single-residency overwrite or customer cannot understand why information is required. |
| UX risks | Users confuse citizenship, residence and tax residency. |
| Trust signals | Definitions, examples, purpose, privacy and ability to correct. |
| Regulatory checkpoints | CRS self-certification, reporting, privacy and change management. |
| Human intervention points | Compliance for ambiguous residency; Tax Consultant for professional advice. |
| AI opportunities | Terminology explanation and completeness checks only. |

# 9. Risk Profiling

~~~mermaid
graph TD
  A[Risk profile start] --> B[Explain purpose and limitations]
  B --> C[Answer questionnaire]
  C --> D[Calculate profile]
  D --> E[Show result and acknowledgement]
  E -->|Accept| F[Store effective profile]
  E -->|Question or mismatch| G[Review or support]
  F --> H[Use for suitability and disclosure]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Captures risk capacity and tolerance for suitability and disclosure without presenting a profile as personalized advice. |
| Business reasoning | Supports compliant distribution and reduces unsuitable product exposure. |
| User reasoning | Helps the customer understand risk language and why it matters. |
| Compliance reasoning | Risk profile, suitability documentation and disclosure must be auditable and not manipulated. |
| Primary flow | Explain scope → answer → calculate → show profile → acknowledge → store version. |
| Alternate flow | Customer pauses and resumes; assisted completion with RM where permitted and EUIN captured. |
| Failure flow | Incomplete, contradictory, expired or technically unavailable questionnaire. |
| Recovery flow | Resume, correct answers, re-profile or Compliance review; preserve previous profile history. |
| Edge cases | Customer disagrees with result; major life event; joint holder has separate profile; profile expired. |
| Permission flow | Investor completes own; RM may assist but cannot alter without trace; Compliance views/approves policy; Support cannot advise. |
| State transitions | Loading → Verification → Completed; Incomplete → Retry; Expired → Re-profile; Escalated → Reviewed. |
| Business rules | Versioned questionnaire, effective date, refresh trigger and suitability boundary. |
| Backend dependencies | Risk engine, profile, product policy, consent, CRM/EUIN and audit. |
| Notifications | Incomplete/resume, profile expiry, major event reminder and acknowledgement confirmation. |
| Analytics events | risk_started, question_answered, risk_completed, profile_shown, profile_acknowledged, risk_abandoned, risk_reprofiled. |
| Success criteria | Current profile stored with version, acknowledgement and no unsupported product implication. |
| Failure criteria | Profile presented as advice, assisted answers not attributed or expired profile silently used. |
| UX risks | Questionnaire fatigue; false precision; users optimize answers to access products. |
| Trust signals | Explain purpose, no guaranteed outcome, show inputs and ability to revisit. |
| Regulatory checkpoints | Suitability, risk disclosure, assisted transaction and EUIN rules. |
| Human intervention points | RM for assisted completion; Compliance for dispute or policy exception. |
| AI opportunities | Plain-language explanation and missing-answer detection; no profile manipulation. |

# 10. Bank Verification

~~~mermaid
graph TD
  A[Add bank account] --> B[Select NRE or NRO]
  B --> C[Enter bank details]
  C --> D[Ownership and account-type verification]
  D -->|Verified| E[Link account]
  D -->|Pending| F[Await bank/gateway]
  D -->|Failed| G[Correct or choose supported bank]
  F -->|Confirmed| E
  F -->|Timeout| G
  E --> H[Use only for compatible folio/order]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Prevents funding or payout from the wrong account type and preserves NRE/NRO context. |
| Business reasoning | Reduces payment failure, incorrect folio tagging, refunds and reconciliation cost. |
| User reasoning | Makes clear which bank source can be used for which investment. |
| Compliance reasoning | Account ownership, NRE/NRO segregation and no cross-account funding are mandatory controls. |
| Primary flow | Select account type → enter details → verify ownership/type → link account with compatibility rules. |
| Alternate flow | Existing verified bank reused; manual proof fallback if bank API unavailable; joint account verification. |
| Failure flow | Unsupported bank, penny-drop failure, mismatch, account closed or gateway callback missing. |
| Recovery flow | Correct details, re-verify, manual evidence, choose another supported account or Finance/Operations review. |
| Edge cases | Joint bank account, FCNR, account type changes, bank name mismatch, NRE/NRO conversion, no Indian mobile number. |
| Permission flow | Investor adds own account; Joint Holder adds own where mandate permits; Operations verifies; Finance reconciles; RM assists only. |
| State transitions | Loading → Verification → Approved/Linked; Failure → Retry; Pending → Approved or Escalated; Expired/Suspended when account invalid. |
| Business rules | Account type must match folio/order; no cross-account funding; ownership and mandate rules; bank allowlist. |
| Backend dependencies | Bank verification, payment gateway, account service, execution/folio, mandate and audit. |
| Notifications | Verification success/failure, pending callback, account suspension and mandate status. |
| Analytics events | bank_added, account_type_selected, bank_verification_started, bank_verified, bank_failed, bank_retry, bank_linked. |
| Success criteria | Account linked with verified ownership, type and allowed product relationships. |
| Failure criteria | Payment accepted against wrong folio/account or customer cannot tell which account will be used. |
| UX risks | NRE/NRO language is unfamiliar; bank redirects and international banking limitations create drop-off. |
| Trust signals | Masked details, account-type explanation, compatibility warning and verification source. |
| Regulatory checkpoints | FEMA/account segregation, KYC ownership, payment controls and audit. |
| Human intervention points | Operations for verification exception; Finance for payment/reconciliation; Support for bank redirect issues. |
| AI opportunities | Failure classification and support explanation; no autonomous account-type override. |

# 11. Nominee

~~~mermaid
graph TD
  A[Nominee management] --> B[Choose folio or account]
  B --> C[Add or edit nominee]
  C --> D[Capture identity and relationship]
  D --> E[Validate and consent]
  E -->|Valid| F[Submit and record]
  E -->|Invalid| G[Correct evidence]
  F --> H[Notify affected parties where required]
  G --> C
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Preserves family continuity and reduces future claims ambiguity. |
| Business reasoning | Increases retention and reduces operational burden during death claims or ownership change. |
| User reasoning | Allows the investor to keep family records current without a separate offline process. |
| Compliance reasoning | Nominee rules, identity evidence, consent, minor guardian and change audit must be controlled. |
| Primary flow | Select holding/account → add nominee → capture identity/relationship → validate → authorize → record. |
| Alternate flow | Edit existing nominee; add multiple nominees where permitted; add guardian for minor. |
| Failure flow | Invalid identity, duplicate, unsupported relationship, missing guardian or authorization conflict. |
| Recovery flow | Correct evidence, re-authorize, Compliance review or offline/legal process where digital change is not permitted. |
| Edge cases | Minor nominee, nominee death, joint-holder disagreement, percentage mismatch, resident conversion or death claim in progress. |
| Permission flow | Investor creates/edits; Joint Holder only by mandate; Nominee has limited visibility and no control by default; Compliance approves exceptions. |
| State transitions | Loading → Verification → Approved → Completed; Failure → Retry; Conflict → Escalated; Expired/invalid → Suspended. |
| Business rules | Allocation totals and relationship rules; joint-holder authority; no nominee access implied by nomination. |
| Backend dependencies | Relationship service, identity/KYC, document, folio/RTA, authorization, case and audit. |
| Notifications | Change confirmation, joint-holder notice where required, missing-evidence request and completion. |
| Analytics events | nominee_started, nominee_added, nominee_validated, guardian_added, nominee_rejected, nominee_completed. |
| Success criteria | Nominee record is legally and operationally accepted with audit evidence. |
| Failure criteria | Nominee changed without authority or future claim process lacks the recorded evidence. |
| UX risks | Users confuse nominee with joint owner or beneficiary control. |
| Trust signals | Clear role meaning, visibility boundary, change history and confirmation. |
| Regulatory checkpoints | Nominee rules, minor/guardian requirements, authorization and record retention. |
| Human intervention points | Operations for document processing; Compliance/Legal for conflict or claims. |
| AI opportunities | Missing-field detection and document classification only. |

# 12. NRE/NRO Selection

~~~mermaid
graph TD
  A[Account context required] --> B[Explain NRE and NRO distinction]
  B --> C[Select verified account]
  C --> D[Check folio and product compatibility]
  D -->|Compatible| E[Lock context for action]
  D -->|Incompatible| F[Explain restriction]
  F --> G[Choose another account or support]
  E --> H[Continue to order/report/repatriation]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Makes account source and repatriability part of every relevant financial decision. |
| Business reasoning | Prevents payment-order mismatches, incorrect folio tagging and support cost. |
| User reasoning | Helps the NRI understand which account will fund or receive the transaction. |
| Compliance reasoning | NRE/NRO segregation, account-specific folio treatment and repatriation rules must be enforced. |
| Primary flow | Explain context → choose verified NRE/NRO account → validate compatibility → lock to action. |
| Alternate flow | Only one verified account is available; customer adds another account; existing folio determines default with confirmation. |
| Failure flow | No verified account, account mismatch, cross-account funding attempt or stale account status. |
| Recovery flow | Add/verify account, select compatible folio, Operations review or safe cancellation before payment. |
| Edge cases | Joint account, NRO limit proximity, NRE/NRO conversion, FCNR, resident conversion, multiple folios. |
| Permission flow | Investor selects own account; Joint Holder by mandate; RM can assist; Operations/Finance validate; Tax views for reporting. |
| State transitions | Loading → Verification → Approved context; Restricted → alternate account; Suspended/Expired → re-verification. |
| Business rules | No cross-account funding; account type locked to allowed folio and order; repatriability is not inferred from label alone. |
| Backend dependencies | Account service, bank verification, folio/RTA, execution, payment, repatriation ledger and policy. |
| Notifications | Incompatibility explanation, account verification, limit/repatriation reminders and action confirmation. |
| Analytics events | account_context_opened, nre_selected, nro_selected, compatibility_checked, account_mismatch, context_confirmed. |
| Success criteria | Correct account context is visible and carried into the dependent action. |
| Failure criteria | Customer pays from or reports against the wrong account type. |
| UX risks | Over-simplification of legal/account rules; repeated explanations create fatigue. |
| Trust signals | Account masking, clear relationship to folio, source and consequence before action. |
| Regulatory checkpoints | FEMA, NRE/NRO segregation, tax and repatriation policy. |
| Human intervention points | Operations for folio/account mismatch; Finance for payout; Compliance for rule ambiguity. |
| AI opportunities | Plain-language explanation only; never choose account autonomously. |

# 13. DTAA

~~~mermaid
graph TD
  A[DTAA status] --> B[Check country and eligibility]
  B -->|Eligible| C[Explain evidence and limitation]
  B -->|Not eligible or unknown| D[Show standard treatment and specialist option]
  C --> E[Submit TRC and Form 10F]
  E --> F[Review documents]
  F -->|Approved| G[Record valid treaty status]
  F -->|Correction| H[Request evidence]
  F -->|Rejected| I[Explain alternative/refund path]
  G --> J[Apply only where AMC/RTA confirms]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Helps eligible NRIs manage treaty evidence before a relevant tax event. |
| Business reasoning | Core differentiation and potential retention value, but only if legal and operationally reliable. |
| User reasoning | Gives a clear path from country eligibility to evidence, review and renewal. |
| Compliance reasoning | Treaty treatment, TRC/Form 10F validity, AMC/RTA application and legal uncertainty must be explicit. |
| Primary flow | Country check → explain scope → submit TRC/Form 10F → review → record approved status → confirm application boundary. |
| Alternate flow | Existing valid evidence reused; customer chooses CA handoff; post-redemption refund/ITR path where applicable. |
| Failure flow | Country not eligible, invalid/expired TRC, incomplete Form 10F, review rejection or AMC/RTA not applying status. |
| Recovery flow | Correct/resubmit, renew evidence, use standard treatment, route to Tax Consultant or document refund path. |
| Edge cases | Treaty ruling changes, dual residency, evidence valid for different period, redemption before approval, multiple AMCs. |
| Permission flow | Investor submits; Compliance/Tax approves; Operations applies status where supported; CA accesses with consent; RM coordinates only. |
| State transitions | Loading → Verification → Pending → Approved/Rejected; Expired → Renewal; Application mismatch → Escalated/Suspended. |
| Business rules | Country-specific rule version; no guaranteed tax saving; approval does not equal AMC/RTA application; validity tracked. |
| Backend dependencies | Tax policy, document store, review queue, AMC/RTA/execution, report/tax engine, notifications and audit. |
| Notifications | Evidence missing, review started, approved/rejected, expiry reminder, application mismatch and refund-path update. |
| Analytics events | dtaa_started, country_eligibility_checked, trc_uploaded, form_10f_uploaded, dtaa_reviewed, dtaa_approved, dtaa_rejected, dtaa_expired. |
| Success criteria | Correct evidence is reviewed, status is versioned and application outcome is traceable. |
| Failure criteria | Product promises zero tax, applies an unapproved treaty rate or hides uncertainty. |
| UX risks | High legal complexity; “tax saved” language creates false certainty. |
| Trust signals | Source, effective date, evidence status, estimate boundary, reviewer and CA option. |
| Regulatory checkpoints | DTAA/tax legal sign-off, TRC/Form 10F, AMC/RTA feasibility, appeals/refunds and change monitoring. |
| Human intervention points | Tax/Compliance mandatory for review; CA for professional advice; Operations for application. |
| AI opportunities | Document completeness and source-grounded explanation; no treaty conclusion without approved rules. |

# 14. Dashboard

~~~mermaid
graph TD
  A[Authenticated investor] --> B[Load context]
  B --> C[Load required actions]
  C --> D[Load portfolio and service status]
  D --> E[Prioritize urgent and meaningful items]
  E --> F[Home context]
  F --> G[Choose action]
  G --> H[Invest]
  G --> I[Portfolio]
  G --> J[Tax]
  G --> K[Help]
  B -->|Partial data| L[Show freshness and safe gaps]
  B -->|Failure| M[Retry or support]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Provides orientation and next actions without becoming a feature-heavy dashboard. |
| Business reasoning | Connects onboarding, tax, reports, SIP and support to repeat value. |
| User reasoning | Answers what needs attention and what is safe to ignore. |
| Compliance reasoning | Must not hide restricted, stale, pending or expiring obligations behind performance content. |
| Primary flow | Authenticate → load context → load states → show prioritized actions → route to domain. |
| Alternate flow | New investor sees setup actions; data-stale investor sees source freshness; high-risk case sees support ownership. |
| Failure flow | Partial backend outage, stale portfolio or missing notification data. |
| Recovery flow | Show safe last-known data with freshness, retry individual domain, create support case if material. |
| Edge cases | No holdings, KYC pending, multiple portfolios, joint-holder context, expired documents, market event spike. |
| Permission flow | Investor sees own; Joint Holder sees permitted context; RM sees assigned customer summary; internal users use separate workspace. |
| State transitions | Loading → Success/Empty/Partial; Failure → Retry; Restricted/Suspended items remain visible with safe explanation. |
| Business rules | Prioritize risk/deadline/state over marketing; no unverified net-worth or tax value. |
| Backend dependencies | Profile, portfolio, orders, cases, documents, notifications, analytics and policy. |
| Notifications | Dashboard is a notification aggregation point; critical events also use approved external channels. |
| Analytics events | dashboard_viewed, action_card_opened, freshness_viewed, pending_item_opened, domain_navigation_started. |
| Success criteria | Customer understands next action and can reach the correct domain without context loss. |
| Failure criteria | Dashboard shows contradictory values, stale data as current or too many competing prompts. |
| UX risks | Card overload; urgent badges become noise; performance content distracts from obligations. |
| Trust signals | Last updated, source, pending owner, explanation and control over notification frequency. |
| Regulatory checkpoints | Suitability/disclosure, privacy, tax and communication content review. |
| Human intervention points | Support for missing state; Operations for data mismatch; RM for assigned high-value service. |
| AI opportunities | Prioritization and plain-language summary using known events; no opaque financial recommendation. |

# 15. Portfolio

~~~mermaid
graph TD
  A[Portfolio request] --> B[Fetch holdings and transactions]
  B --> C[Reconcile sources]
  C -->|Fresh| D[Show portfolio context]
  C -->|Stale or mismatch| E[Label gap and open refresh/case]
  D --> F[Select holding]
  F --> G[View transaction, tax or action context]
  E --> H[Retry or support]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Gives the customer a trusted view of ownership, source account, performance and action history. |
| Business reasoning | Portfolio and reports create repeat value beyond first investment. |
| User reasoning | Customers need confidence that holdings and transactions are complete and current. |
| Compliance reasoning | Financial data, source lineage and report calculations must be accurate and auditable. |
| Primary flow | Request → fetch RTA/execution data → reconcile → show freshness → drill into holding/transaction. |
| Alternate flow | One RTA is delayed; show available sources and gap; manual statement upload for held-away data. |
| Failure flow | RTA unavailable, unmatched folio, stale NAV or calculation discrepancy. |
| Recovery flow | Re-fetch, reconciliation queue, customer-provided evidence, corrected report and support update. |
| Edge cases | Zero holdings, duplicate folio, partial allotment, switch legs, NRE/NRO split, market holiday, correction event. |
| Permission flow | Investor/Joint Holder see permitted holdings; Nominee limited; RM/support restricted; Operations corrects with audit. |
| State transitions | Loading → Success/Empty; Stale → Retry/Verification; Mismatch → Escalated; corrected data → Completed. |
| Business rules | Source freshness, RTA precedence, no unverified value, tax lot and account relationship preservation. |
| Backend dependencies | CAMS, KFintech, execution, portfolio model, NAV, transaction ledger, reconciliation and audit. |
| Notifications | Holding/report correction, stale data materiality, allotment, transaction completion and case updates. |
| Analytics events | portfolio_viewed, holdings_loaded, source_stale, holding_opened, transaction_viewed, reconciliation_exception. |
| Success criteria | Customer can trace a holding to source account and underlying transactions. |
| Failure criteria | Missing or duplicate holdings presented without warning, or correction changes history silently. |
| UX risks | Complex performance/tax language; false precision during source delay. |
| Trust signals | Source, freshness, as-of date, transaction history and correction history. |
| Regulatory checkpoints | Statement accuracy, data retention, disclosure and complaint handling. |
| Human intervention points | Operations for reconciliation; Finance/Tax for material discrepancy; Support for explanation. |
| AI opportunities | Anomaly clustering and plain-language summary; no autonomous correction. |

# 16. Fund Discovery

~~~mermaid
graph TD
  A[Explore funds] --> B[Apply eligible universe]
  B --> C[Filter by category, risk, AMC or goal]
  C --> D[Review results]
  D --> E[Open details or compare]
  D -->|No result| F[Explain filters and alternatives]
  B -->|Policy unavailable| G[Restrict action and retry]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Helps NRIs discover only relevant, eligible regular-plan MF options. |
| Business reasoning | Supports acquisition and investment conversion without presenting unavailable products. |
| User reasoning | Customers want understandable comparison, not a generic catalogue. |
| Compliance reasoning | Country restriction, NRI eligibility, riskometer, disclosures and plan type must be enforced. |
| Primary flow | Enter Invest → apply eligible universe → filter → inspect result → details/compare. |
| Alternate flow | Browse by category or AMC; use goal/risk education; search exact scheme. |
| Failure flow | Catalogue unavailable, stale restrictions or no eligible results. |
| Recovery flow | Show safe cached catalogue with freshness, reset filters, explain restriction or support. |
| Edge cases | Scheme becomes restricted while open; NFO window closes; country change; plan unavailable. |
| Permission flow | Investor sees eligible products; RM may assist assigned investor; Operations controls masters; Compliance controls restriction. |
| State transitions | Loading → Success/Empty; Restricted when policy unavailable or ineligible; Retry after feed/policy recovery. |
| Business rules | Regular-plan scope in MVP; scheme and country allowlist; no unsuitable implication from filter. |
| Backend dependencies | Scheme master, AMC/execution/RTA, policy service, risk data, analytics and content CMS. |
| Notifications | Optional NFO/eligibility updates; no promotional message without consent. |
| Analytics events | fund_discovery_started, filter_applied, scheme_viewed, no_results, restriction_explained, compare_started. |
| Success criteria | Customer finds an eligible scheme with accurate plan, risk and source context. |
| Failure criteria | Restricted product appears investable or ranking implies advice without basis. |
| UX risks | Too many filters; performance bias; NRI restriction shown too late. |
| Trust signals | Eligibility label, source date, riskometer, plan/fee disclosure and explanation. |
| Regulatory checkpoints | AMFI/SEBI disclosures, suitability boundary, country restrictions and distribution disclosure. |
| Human intervention points | Support for catalogue confusion; Operations for master corrections; RM for permitted assisted context. |
| AI opportunities | Natural-language filtering and explanation grounded in approved metadata; no autonomous recommendation. |

# 17. Fund Details

~~~mermaid
graph TD
  A[Open scheme] --> B[Load approved scheme data]
  B --> C[Show eligibility, risk, cost, performance and tax context]
  C --> D{Customer intent}
  D -->|Invest| E[Choose transaction]
  D -->|Compare| F[Add to comparison]
  D -->|Learn| G[Open education/source]
  B -->|Stale or unavailable| H[Show freshness and retry]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Supports an informed decision before money movement. |
| Business reasoning | Improves qualified conversion while protecting against unsuitable or restricted transactions. |
| User reasoning | Provides one place to understand risk, cost, eligibility, tax and timing. |
| Compliance reasoning | Required scheme disclosures and non-advice boundaries must be visible and current. |
| Primary flow | Load scheme → verify metadata → show context → choose invest/compare/learn. |
| Alternate flow | Customer opens a deep link from a report, portfolio, search or RM handoff. |
| Failure flow | Source feed stale, scheme suspended or policy conflict. |
| Recovery flow | Show last known labelled data, prevent order, retry or support. |
| Edge cases | Plan changes, fee update, scheme merger, NFO-to-ongoing transition, country restriction changes. |
| Permission flow | Investor views eligible public data; internal users manage source metadata; RM may present assigned context. |
| State transitions | Loading → Success; Stale → Restricted action; Suspended → Escalated/Closed; Completed view event. |
| Business rules | Show regular-plan economics; performance is historical; no guarantee or suitability claim. |
| Backend dependencies | Scheme master, AMC/execution feed, NAV/performance, risk, policy, tax metadata and content. |
| Notifications | Optional alerts for selected scheme/NFO; status changes for existing holding. |
| Analytics events | fund_detail_viewed, eligibility_viewed, risk_viewed, fee_viewed, tax_context_viewed, invest_intent, compare_intent. |
| Success criteria | Customer can state what the product is, its risks/costs, eligibility and next action. |
| Failure criteria | Outdated, incomplete or misleading detail drives an order. |
| UX risks | Dense data overwhelms beginners; performance dominates risk and tax. |
| Trust signals | As-of dates, source, calculation labels, riskometer and explicit fee/plan disclosure. |
| Regulatory checkpoints | Scheme documents, risk disclosure, distribution disclosure and country eligibility. |
| Human intervention points | Support for clarification; RM for permitted assisted context; Compliance for content exception. |
| AI opportunities | Terminology explanation and document retrieval; no advice framing. |

# 18. Compare Funds

~~~mermaid
graph TD
  A[Select eligible schemes] --> B[Validate comparable attributes]
  B --> C[Show side-by-side context]
  C --> D[Review risk, cost, performance and tax]
  D --> E[Choose scheme detail]
  D --> F[Save or share comparison]
  B -->|Incompatible data| G[Explain comparison limitation]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Reduces fragmented research while preserving meaningful comparisons and limitations. |
| Business reasoning | Helps users make a confident decision without competing purely on promotion or returns. |
| User reasoning | Customers want to compare relevant options on more than performance. |
| Compliance reasoning | Comparisons must use comparable periods, sources, risk labels and disclaimers. |
| Primary flow | Select eligible schemes → validate fields → compare → inspect detail or save/share. |
| Alternate flow | Compare from search, portfolio or RM-assisted session; compare fewer schemes due to data availability. |
| Failure flow | Missing data, non-comparable category, stale values or scheme restriction. |
| Recovery flow | Remove unsupported metric, explain limitation, refresh or route to source detail. |
| Edge cases | Different inception dates, unequal risk categories, plan mismatch, tax treatment not comparable. |
| Permission flow | Investor compares own eligible list; RM may create assisted comparison; Support cannot recommend. |
| State transitions | Loading → Success/Partial; Failure → Retry; Restricted scheme removed with explanation. |
| Business rules | Same period definitions, source dates, no ranking as advice, regular-plan scope. |
| Backend dependencies | Scheme master, performance/risk/fee/tax data, policy and analytics. |
| Notifications | Optional saved-comparison changes; no unsolicited recommendation. |
| Analytics events | comparison_started, scheme_added, metric_viewed, comparison_shared, comparison_completed. |
| Success criteria | User understands differences and can continue to detail without losing context. |
| Failure criteria | Incomparable values are presented as equivalent or ranking implies suitability. |
| UX risks | False precision; comparison table overload; users optimize one metric. |
| Trust signals | Metric definitions, timeframes, source dates and limitation copy. |
| Regulatory checkpoints | Performance advertisement, risk and distribution disclosures. |
| Human intervention points | Support for data questions; Compliance for comparison content; RM only within role boundary. |
| AI opportunities | Explain differences from structured data; no fund ranking recommendation. |

# 19. SIP

~~~mermaid
graph TD
  A[SIP intent] --> B[Choose eligible scheme and amount]
  B --> C[Choose NRE/NRO account and date]
  C --> D[Create mandate]
  D --> E{Mandate result}
  E -->|Approved| F[Activate SIP]
  E -->|Pending| G[Track mandate]
  E -->|Rejected| H[Correct bank or retry]
  F --> I[First debit]
  I -->|Success| J[Continuation monitoring]
  I -->|Failure| K[Recovery and support]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Enables recurring investment with explicit account, mandate and failure context. |
| Business reasoning | SIP is a retention and AUM driver, but only if debit and continuation are reliable. |
| User reasoning | Customers need confidence that the right account will debit on the right date. |
| Compliance reasoning | Mandate consent, account compatibility, disclosure, cancellation and audit are required. |
| Primary flow | Scheme → amount/frequency/date → account → mandate → approval → activation → first debit. |
| Alternate flow | Existing mandate reused; quarterly frequency; assisted RM setup; pause/resume. |
| Failure flow | Mandate rejection, bank unsupported, debit failure, insufficient balance or scheme suspension. |
| Recovery flow | Re-register mandate, change account/date, retry safe debit, pause or contact support; never duplicate debit. |
| Edge cases | Time zone/date boundary, holiday, bank mandate expiry, country change, account conversion, multiple SIPs. |
| Permission flow | Investor creates/edits/cancels own; Joint Holder by mandate; RM assists; Operations monitors; Finance reconciles. |
| State transitions | Loading → Pending mandate → Approved → Active → Debit Pending/Completed/Failed; Failed → Retry/Paused/Cancelled. |
| Business rules | Mandate approval before activation; fixed account type; cut-off/calendar; cancellation rules; no hidden auto-increase. |
| Backend dependencies | SIP service, mandate/NACH/UPI, bank, execution, payment, calendar, notifications and audit. |
| Notifications | Mandate pending/approved/rejected, upcoming debit, debit success/failure, pause/cancel and expiry. |
| Analytics events | sip_started, mandate_started, mandate_approved, mandate_rejected, sip_activated, sip_debit_success, sip_debit_failed, sip_paused, sip_cancelled. |
| Success criteria | First debit succeeds and customer can manage future state. |
| Failure criteria | SIP appears active without mandate, duplicate debit or failure with no recovery owner. |
| UX risks | Mandate language; delayed bank callback; customers assume SIP guarantees returns. |
| Trust signals | Date/amount/account, mandate status, pause/cancel control and debit evidence. |
| Regulatory checkpoints | Mandate authorization, recurring communication, plan/risk disclosure and account segregation. |
| Human intervention points | Operations for mandate; Finance for debit/refund; Support for failure; Compliance for account/rule issue. |
| AI opportunities | Debit-failure prediction with consent and evidence; support explanation; no autonomous debit change. |

# 20. Lumpsum

~~~mermaid
graph TD
  A[Lumpsum intent] --> B[Select eligible scheme]
  B --> C[Choose amount and NRE/NRO account]
  C --> D[Show risk, cost, cut-off and disclosure]
  D --> E[Confirm order]
  E --> F[Authorize payment]
  F -->|Success| G[Submit order]
  F -->|Pending| H[Reconcile payment]
  F -->|Failure| I[Retry or change route]
  G --> J[Track allotment]
  J --> K[Portfolio update]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Provides the smallest money-moving path for MVP while preserving NRI account and eligibility controls. |
| Business reasoning | Core proof of compliant execution and activation. |
| User reasoning | Customer wants to know exact amount, source account, NAV timing and next confirmation. |
| Compliance reasoning | Eligibility, account segregation, risk, plan, cut-off, AML/KYC and audit must precede payment. |
| Primary flow | Scheme → amount/account → context/disclosure → confirm → payment → order submission → allotment. |
| Alternate flow | Post cut-off next-business-day confirmation; existing verified account; RM-assisted initiation. |
| Failure flow | Eligibility change, payment timeout, order rejection, duplicate callback, missed cut-off or refund. |
| Recovery flow | Hold duplicate action, reconcile, retry only safe step, refund or Operations escalation with timeline. |
| Edge cases | Partial allotment, market holiday, bank success/order missing, amount limit, scheme suspension after review. |
| Permission flow | Investor confirms; Joint Holder by mandate; RM can initiate but investor confirms; Operations reconciles; Finance refunds. |
| State transitions | Created → Review → Authorized → Payment Pending/Success → Submitted → Accepted/Allotted/Rejected/Refunded/Settled. |
| Business rules | Account/fund compatibility, cut-off, minimum amount, regular plan, no order without KYC and risk profile. |
| Backend dependencies | Policy, scheme, order, payment, bank, execution platform, RTA, portfolio, notification and audit. |
| Notifications | Order receipt, payment status, allotment, rejection, refund and pending SLA update. |
| Analytics events | order_started, order_reviewed, cut_off_acknowledged, order_confirmed, payment_started, payment_success, order_submitted, units_allotted, order_rejected. |
| Success criteria | Correct order reaches authoritative allotment or safe refund with evidence. |
| Failure criteria | Customer is charged without clear order state, or submits duplicate orders. |
| UX risks | Users misunderstand NAV and settlement; “success” may be mistaken for allotment. |
| Trust signals | Order ID, account source, cut-off/local time, expected dates, status timeline and source. |
| Regulatory checkpoints | KYC/AML, suitability, account segregation, risk and regular-plan disclosure. |
| Human intervention points | Operations for order/reconciliation; Finance for payment/refund; Support for communication. |
| AI opportunities | Exception classification and status explanation; no autonomous order submission. |

# 21. Redemption

~~~mermaid
graph TD
  A[Redemption intent] --> B[Select holding and amount/units]
  B --> C[Select payout account]
  C --> D[Calculate tax and repatriation context]
  D --> E[Show estimate, timing and forms]
  E --> F[Confirm and authorize]
  F --> G[Submit redemption]
  G --> H[Track settlement and payout]
  H --> I[Update holding, tax and ledger]
  D -->|Uncertain| J[Tax/Support review]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Makes a high-consequence action understandable before units are sold and tax/payout processing starts. |
| Business reasoning | Protects trust, reduces disputes and creates differentiated tax/repatriation value. |
| User reasoning | Customer needs net outcome, tax estimate, payout route, timing and evidence. |
| Compliance reasoning | TDS, DTAA, account source, repatriation limits, authorization and recordkeeping require controls. |
| Primary flow | Select holding/amount → payout account → tax/repatriation calculation → review → authorize → submit → settle. |
| Alternate flow | Partial/full redemption; DTAA already approved; CA handoff; standard treatment when evidence is not approved. |
| Failure flow | Tax calculation unavailable, holding mismatch, payout failure, order rejection, threshold issue or delayed settlement. |
| Recovery flow | Do not resubmit blindly; reconcile order/payout, correct evidence, escalate Finance/Tax, refund or confirm settlement. |
| Edge cases | NRO annual limit proximity, partial units, lien/lock, joint-holder authority, market holiday, DTAA approved after redemption. |
| Permission flow | Investor confirms; Joint Holder by mandate; RM may assist; Operations submits/monitors; Finance validates payout; Tax advises. |
| State transitions | Intent → Estimate → Authorized → Submitted → Pending Settlement → Settled/Paid/Rejected/Refunded/Escalated. |
| Business rules | Estimate not final; account/payout compatibility; cut-off; tax-year; DTAA validity; FY ledger. |
| Backend dependencies | Holdings/RTA, tax engine, DTAA, repatriation ledger, order, payment/bank, forms, finance and audit. |
| Notifications | Estimate/report ready, order submitted, settlement/payout, delay, tax/document issue and completion. |
| Analytics events | redemption_started, holding_selected, tax_estimate_viewed, repatriation_viewed, redemption_confirmed, redemption_submitted, payout_completed, redemption_failed. |
| Success criteria | Customer receives correct payout or a traceable owned exception without duplicate action. |
| Failure criteria | Net proceeds or tax misrepresented, payout goes to wrong account or state is ambiguous. |
| UX risks | Tax complexity and anxiety; false “tax saved” expectation; too much dense information at the decisive moment. |
| Trust signals | Input assumptions, source dates, estimate boundary, payout account, timeline and support owner. |
| Regulatory checkpoints | TDS, DTAA, FEMA/repatriation, KYC, authorization and tax/legal wording. |
| Human intervention points | Tax/Compliance for ambiguity; Finance for payout; Operations for execution; Support for status. |
| AI opportunities | Explain deterministic calculation and classify exceptions; no autonomous tax or redemption decision. |

# 22. Switch

~~~mermaid
graph TD
  A[Switch intent] --> B[Select source holding]
  B --> C[Select eligible target scheme]
  C --> D[Explain redemption plus purchase and tax]
  D --> E[Validate account and authority]
  E --> F[Confirm source and target]
  F --> G[Submit linked legs]
  G --> H[Track redemption leg]
  H --> I[Track purchase leg]
  I --> J[Update portfolio and tax]
  G -->|Failure| K[Hold, reconcile or escalate]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Represents switch as two linked financial legs rather than a single harmless change. |
| Business reasoning | Reduces incorrect tax and execution assumptions; advanced transaction is V1/V2 depending on scope. |
| User reasoning | Customer needs to understand what is sold, bought, taxed and when. |
| Compliance reasoning | NRI eligibility, account type, tax on redemption and target scheme restrictions apply. |
| Primary flow | Source holding → eligible target → explain two legs → validate → confirm → submit → reconcile both legs. |
| Alternate flow | Intra-AMC vs inter-AMC; full vs partial; RM-assisted initiation with customer confirmation. |
| Failure flow | Source unavailable, target restricted, redemption succeeds/purchase fails, purchase succeeds/redemption mismatch. |
| Recovery flow | Pause linked action, reconcile both legs, refund/repair through Operations; no unilateral retry. |
| Edge cases | Different account types, target becomes restricted, partial acceptance, tax lot selection, cut-off mismatch. |
| Permission flow | Investor confirms; Joint Holder by mandate; RM assists; Operations manages linked legs; Compliance policy controls. |
| State transitions | Draft → Validated → Authorized → Leg 1 Pending/Completed → Leg 2 Pending/Completed → Completed or Escalated. |
| Business rules | Tax disclaimer; same-account compatibility; target eligibility; linked-leg idempotency. |
| Backend dependencies | Holdings, scheme policy, order orchestration, execution, tax, RTA, payment if required and reconciliation. |
| Notifications | Both leg receipts, tax implications, partial failure and final portfolio update. |
| Analytics events | switch_started, source_selected, target_selected, tax_disclaimer_viewed, switch_confirmed, leg1_completed, leg2_completed, switch_exception. |
| Success criteria | Both legs and portfolio state reconcile with transparent tax treatment. |
| Failure criteria | One leg completed without customer-owned recovery or switch presented as tax-neutral. |
| UX risks | Composite transaction complexity; user cannot tell which leg is pending. |
| Trust signals | Leg-level status, tax explanation, source/target identifiers and owner. |
| Regulatory checkpoints | Suitability, account segregation, tax, scheme eligibility and disclosure. |
| Human intervention points | Operations and Finance for mismatch; Tax/Compliance for material tax ambiguity. |
| AI opportunities | Linked-leg anomaly detection and explanation only. |

# 23. STP

~~~mermaid
graph TD
  A[STP request] --> B[Confirm feature availability and eligibility]
  B -->|In scope and valid| C[Choose source, target, amount and schedule]
  B -->|Not in scope or restricted| D[Explain and offer manual alternative]
  C --> E[Show recurring redemption and purchase implications]
  E --> F[Authorize]
  F --> G[Create schedule]
  G --> H[Monitor each execution cycle]
  H --> I[Reconcile or escalate]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Supports a recurring transfer only when the platform can model it as scheduled linked legs. |
| Business reasoning | STP is not MVP; it adds recurring tax, scheduling and reconciliation complexity. |
| User reasoning | Customer needs certainty about source depletion, target purchase and recurring dates. |
| Compliance reasoning | Each redemption/purchase can have tax, eligibility and account constraints. |
| Primary flow | Validate availability → choose source/target/schedule → explain → authorize → create schedule → monitor cycles. |
| Alternate flow | Manual one-time switch or external instruction if STP is not supported. |
| Failure flow | Mandate/schedule error, source balance/holding issue, target restriction or one cycle partial failure. |
| Recovery flow | Pause schedule, correct parameters, reconcile cycle, contact Operations; never silently skip. |
| Edge cases | Holiday, source exhaustion, country change, target suspension, tax-year boundary, account conversion. |
| Permission flow | Investor creates/manages; Joint Holder by mandate; RM assists; Operations controls schedule; Compliance policy. |
| State transitions | Draft → Authorized → Scheduled → Cycle Pending → Cycle Completed/Failed → Paused/Cancelled. |
| Business rules | Future-version scope; schedule/calendar; account compatibility; each cycle has its own order/tax evidence. |
| Backend dependencies | Scheduler, order legs, holdings, execution, tax, RTA, notifications, reconciliation. |
| Notifications | Schedule created, upcoming cycle, success/failure, pause, cancellation and expiry. |
| Analytics events | stp_started, stp_validated, stp_authorized, stp_created, stp_cycle_success, stp_cycle_failed, stp_paused, stp_cancelled. |
| Success criteria | Every cycle is traceable and recoverable; customer understands cumulative effect. |
| Failure criteria | Schedule exists without valid source/target or a failed cycle disappears. |
| UX risks | Recurring tax and source depletion are easy to misunderstand. |
| Trust signals | Schedule summary, cycle-level history, pause/cancel and source/target context. |
| Regulatory checkpoints | Future-scope approval, tax, suitability, account and scheme eligibility. |
| Human intervention points | Operations for cycle exceptions; Tax/Compliance for rules; Support for status. |
| AI opportunities | Cycle anomaly prediction after sufficient data; no autonomous schedule modification. |

# 24. SWP

~~~mermaid
graph TD
  A[SWP request] --> B[Select holding and payout schedule]
  B --> C[Validate units, account and tax context]
  C --> D[Explain recurring redemption]
  D --> E[Authorize schedule]
  E --> F[Create schedule]
  F --> G[Execute each payout]
  G --> H[Reconcile payout and holding]
  H --> I[Continue, pause or cancel]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Supports recurring withdrawals only when payout, tax and holding depletion can be made visible. |
| Business reasoning | Future-version feature with high retention value but high operational and tax risk. |
| User reasoning | Customer needs to understand amount, dates, tax and how long the holding may last. |
| Compliance reasoning | Recurring redemption, TDS, payout account and authorization need audit and disclosures. |
| Primary flow | Holding → amount/frequency/payout → validate → explain → authorize → schedule → execute/reconcile. |
| Alternate flow | One-time redemption or external payout plan when SWP unavailable. |
| Failure flow | Insufficient units, payout failure, tax error, account change or schedule cycle failure. |
| Recovery flow | Pause, correct payout/account, reconcile, retry safe cycle or escalate Finance/Tax. |
| Edge cases | Zero balance, partial units, market holiday, NRO limit, country change, account closure, tax-year change. |
| Permission flow | Investor manages own; Joint Holder by mandate; RM assists; Finance validates payout; Operations runs schedule. |
| State transitions | Draft → Authorized → Scheduled → Cycle Pending → Paid/Failed → Paused/Cancelled/Completed. |
| Business rules | Future-version; minimum units; tax estimate; account/payout; cycle-level evidence. |
| Backend dependencies | Scheduler, holdings, order, tax, bank/payment, RTA, finance and notification. |
| Notifications | Schedule, upcoming payout, payout success/failure, limit warning, pause/cancel. |
| Analytics events | swp_started, swp_validated, swp_authorized, swp_created, swp_payout_success, swp_payout_failed, swp_paused, swp_cancelled. |
| Success criteria | Each payout and holding update is reconciled and understandable. |
| Failure criteria | Customer loses visibility into depletion, tax or payout failure. |
| UX risks | Customers may treat scheduled withdrawal as guaranteed income. |
| Trust signals | Amount, schedule, estimated tax, remaining context and lifecycle controls. |
| Regulatory checkpoints | Future scope, tax, suitability, payout authorization and account segregation. |
| Human intervention points | Finance/Operations for payout; Tax for tax ambiguity; Support for recovery. |
| AI opportunities | Explain schedule impact using deterministic data; no autonomous financial planning. |

# 25. Order Tracking

~~~mermaid
graph TD
  A[Open order] --> B[Load event history]
  B --> C[Normalize customer-safe states]
  C --> D[Show source, timestamp, owner and next update]
  D --> E{Current state}
  E -->|Completed| F[Evidence and portfolio link]
  E -->|Pending| G[Wait or support]
  E -->|Failed| H[Recovery path]
  E -->|Escalated| I[Case owner and SLA]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Converts asynchronous external execution into truthful, understandable service status. |
| Business reasoning | Reduces repeat contacts, duplicate orders and trust loss. |
| User reasoning | Customer wants to know whether to wait, act or contact someone. |
| Compliance reasoning | Status must not misstate settlement, allotment or payout. |
| Primary flow | Open order → read normalized timeline → understand current state → follow next action/evidence. |
| Alternate flow | Deep link from notification; support opens same timeline; linked switch shows leg-specific state. |
| Failure flow | Missing callback, stale state, mismatch, rejection, refund or incident. |
| Recovery flow | Poll/replay, reconciliation, owner escalation, controlled refund or correction; prevent resubmission. |
| Edge cases | Vendor disagreeing states, partial allotment, system outage near cut-off, multiple attempts, reopened correction. |
| Permission flow | Investor/Joint Holder own order; Support case view; Operations full; Finance payment portion; Compliance restricted. |
| State transitions | Created → Authorized → Submitted → Accepted → Allotted/Settled; Pending/Failed/Retry/Escalated/Refunded as controlled branches. |
| Business rules | Source-labelled timestamps; no completion without authoritative source; SLA threshold creates exception. |
| Backend dependencies | Order ledger, payment, execution, RTA, event bus, reconciliation, case and notification. |
| Notifications | State change, pending threshold, allotment, rejection, refund and case update. |
| Analytics events | order_viewed, timeline_viewed, state_explanation_opened, pending_threshold_reached, order_retry_started, case_created. |
| Success criteria | Customer makes the correct wait/retry/support decision without duplicate action. |
| Failure criteria | Status is contradictory, stale without label or exposes internal state with no next action. |
| UX risks | Too many vendor statuses; false confidence from client-side callback. |
| Trust signals | Event source, timestamp, owner, SLA and evidence. |
| Regulatory checkpoints | Transaction record, investor communication, complaint and audit policy. |
| Human intervention points | Operations owns reconciliation; Finance owns money mismatch; Support owns explanation. |
| AI opportunities | Status summarization and exception classification from structured events. |

# 26. Reports

~~~mermaid
graph TD
  A[Reports entry] --> B[Choose report type and tax year]
  B --> C[Validate data freshness and permission]
  C --> D[Generate report]
  D -->|Ready| E[View/download/share securely]
  D -->|Pending| F[Track generation]
  D -->|Failure| G[Retry or support]
  E --> H[Audit export event]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Makes verified evidence reusable for the investor, CA, tax filing and service recovery. |
| Business reasoning | Creates repeat value and reduces manual support/CA intake. |
| User reasoning | Customer needs reliable, downloadable evidence in the right period and format. |
| Compliance reasoning | Reports require correct source, tax year, calculation version, access and retention. |
| Primary flow | Select type/year → validate permission and freshness → generate → view/download securely → log export. |
| Alternate flow | Existing report reused; CA receives consented link; report generated from partial sources with visible gaps. |
| Failure flow | Missing data, stale source, generation error, permission failure or expired link. |
| Recovery flow | Refresh source, regenerate, correct data, request support or provide prior report with label. |
| Edge cases | Financial-year boundary, RTA delay, joint holder, report correction, large export, mobile vs desktop. |
| Permission flow | Investor/Joint Holder own reports; RM/Tax Consultant by consent; Support restricted; Compliance/Finance/Tax role-specific. |
| State transitions | Loading → Pending generation → Completed; Failure → Retry; Restricted → request access; Expired link → regenerate. |
| Business rules | Tax year, source freshness, report type, watermark/share expiry and correction history. |
| Backend dependencies | Portfolio, RTA, tax, report generator, document store, consent, notification and audit. |
| Notifications | Report ready, generation delay, correction, link expiry and consented specialist share. |
| Analytics events | reports_opened, report_type_selected, tax_year_selected, report_requested, report_generated, report_downloaded, report_shared. |
| Success criteria | Customer obtains an accurate report fit for stated purpose and can identify its source/version. |
| Failure criteria | Report generated from incomplete data without warning or shared beyond authorization. |
| UX risks | Dense formats; report names are ambiguous; customers cannot tell which report a CA needs. |
| Trust signals | As-of date, tax year, source, calculation version, correction note and secure share. |
| Regulatory checkpoints | Tax/reporting accuracy, privacy, retention, data portability and export audit. |
| Human intervention points | Reporting/Operations for data; Tax for calculation; Support for access/share. |
| AI opportunities | Report explanation and document classification; no calculation override. |

# 27. Capital Gains

~~~mermaid
graph TD
  A[Capital gains request] --> B[Select tax year and holdings]
  B --> C[Load transactions and cost lots]
  C --> D[Apply approved tax rules]
  D --> E[Show STCG/LTCG and assumptions]
  E --> F[Generate evidence/report]
  C -->|Missing data| G[Reconcile or manual evidence]
  D -->|Rule uncertainty| H[Tax review]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Turns transactions and cost basis into tax-relevant evidence without pretending to replace professional advice. |
| Business reasoning | Core report value and retention driver. |
| User reasoning | Customer needs to know what data was used and what the calculation means. |
| Compliance reasoning | Tax rules, FY, holding period, cost basis, TDS and source versions must be auditable. |
| Primary flow | Select tax year → gather transactions/lots → apply approved rules → show calculation context → report. |
| Alternate flow | Customer uploads missing statement; Tax Consultant reviews; corrected RTA data regenerates report. |
| Failure flow | Missing transaction, duplicate lot, stale NAV, rule version unavailable or calculation discrepancy. |
| Recovery flow | Reconcile source, mark incomplete, request evidence, tax review and issue corrected version. |
| Edge cases | Switch with redemption leg, partial units, dividend/IDCW, corporate action, resident conversion, folio merge. |
| Permission flow | Investor views/exports; Tax Consultant reviews with consent; Tax/Compliance owns rule; Finance owns TDS source. |
| State transitions | Loading → Verification → Calculating → Completed; Missing → Escalated; Correction → Regenerated. |
| Business rules | Rule version and tax year locked; no silent recalculation; estimate vs final boundary. |
| Backend dependencies | Transaction ledger, holdings/lots, RTA, tax engine, rule service, report and audit. |
| Notifications | Report ready, missing data, correction and tax-year availability. |
| Analytics events | capital_gains_started, tax_year_selected, source_loaded, lot_missing, gains_calculated, gains_reported, correction_requested. |
| Success criteria | Calculation is reproducible from recorded inputs and rules. |
| Failure criteria | Unsupported tax treatment presented as final or source gaps hidden. |
| UX risks | Users confuse capital gains with total return or tax payable. |
| Trust signals | Calculation inputs, lot detail, tax-year, rule version and professional advice boundary. |
| Regulatory checkpoints | Income-tax rules, TDS, DTAA, records and tax adviser language. |
| Human intervention points | Tax/Compliance for rules; Operations for source data; CA for advice. |
| AI opportunities | Explain terms and identify missing data; no tax amount generation outside deterministic engine. |

# 28. Tax Reports

~~~mermaid
graph TD
  A[Tax reports] --> B[Choose report purpose]
  B --> C[Select tax year and residency]
  C --> D[Assemble TDS, gains, transactions and DTAA status]
  D --> E[Validate completeness]
  E -->|Complete| F[Generate report]
  E -->|Incomplete| G[Explain missing source]
  F --> H[Download or consented CA share]
  G --> I[Refresh, upload evidence or support]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Provides a tax-ready evidence package rather than isolated statements. |
| Business reasoning | Increases repeat use and specialist leverage while reducing support effort. |
| User reasoning | Customer wants one coherent package for self, CA or filing preparation. |
| Compliance reasoning | Report must distinguish platform data from professional tax advice and show source/limitations. |
| Primary flow | Purpose/year/residency → assemble sources → validate → generate → secure download/share. |
| Alternate flow | Country-specific report; standard vs DTAA status; CA handoff for complex case. |
| Failure flow | Missing TDS, incomplete gains, source mismatch, expired share link or rule uncertainty. |
| Recovery flow | Refresh/reconcile, upload evidence, tax review, regenerate or provide exception report. |
| Edge cases | Multiple residences, USA/Canada gated users, report correction, joint holder, country change. |
| Permission flow | Investor owns; Joint Holder by mandate; CA with consent; Finance/Tax/Compliance role-specific; Support not raw export. |
| State transitions | Loading → Assembling → Verification → Completed; Incomplete → Pending/Escalated; link Expired → regenerate. |
| Business rules | Tax year/residency selection; source freshness; no universal tax filing claim; consented sharing. |
| Backend dependencies | Portfolio, TDS, gains, DTAA, repatriation, document, tax engine, report and consent. |
| Notifications | Report ready, missing data, tax-year open, correction and shared-link expiry. |
| Analytics events | tax_reports_opened, purpose_selected, tax_year_selected, report_assembled, tax_report_generated, tax_report_downloaded, tax_report_shared. |
| Success criteria | Customer or CA receives complete, traceable and purpose-labelled evidence. |
| Failure criteria | Report appears “tax-ready” while known source gaps or rule uncertainty exist. |
| UX risks | Overpromising filing readiness; complex country differences. |
| Trust signals | Purpose, source, freshness, limitations, calculation version and share audit. |
| Regulatory checkpoints | Tax law, privacy, retention, DTAA/PFIC/FAPI gating and adviser boundary. |
| Human intervention points | Tax/Compliance and CA for complex cases; Operations for data mismatch. |
| AI opportunities | Assemble and summarize known evidence; no autonomous tax filing or advice. |

# 29. Profile

~~~mermaid
graph TD
  A[Profile entry] --> B[Load editable and restricted attributes]
  B --> C[Choose attribute]
  C --> D[Edit and validate]
  D --> E[Review impact]
  E --> F[Confirm with step-up if required]
  F --> G[Save new version]
  G --> H[Trigger dependent rechecks]
  D -->|Invalid| I[Correct]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Provides one governed place for identity, country and tax context. |
| Business reasoning | Reduces inconsistent data across KYC, order, tax and support. |
| User reasoning | Customers need to update life/country information without restarting unrelated work. |
| Compliance reasoning | Material changes require re-KYC, FATCA/CRS, eligibility and audit. |
| Primary flow | Open profile → choose attribute → edit → validate impact → step-up → save version → trigger dependencies. |
| Alternate flow | Country change guided review; joint-holder update; Support-assisted correction. |
| Failure flow | Invalid data, conflict, document mismatch or save/API failure. |
| Recovery flow | Preserve prior verified value, explain needed evidence, retry or Compliance review. |
| Edge cases | Country change, resident conversion, legal name change, tax residency conflict, joint-holder dependency. |
| Permission flow | Investor edits allowed fields; Joint Holder own fields; RM/support assisted; Compliance approves material changes; Admin configures schema. |
| State transitions | Loading → Success/Verification → Completed; Failure → Retry; Material change → Pending/Re-KYC/Suspended. |
| Business rules | Version changes; effective dates; sensitive fields require step-up/evidence; no silent overwrite. |
| Backend dependencies | Identity/profile, policy, KYC, tax residency, consent, documents, audit and notifications. |
| Notifications | Profile change confirmation, re-KYC requirement, country impact and security alert. |
| Analytics events | profile_viewed, field_edit_started, profile_change_submitted, step_up_completed, rekyc_triggered, profile_change_completed. |
| Success criteria | Correct change recorded and all dependent services receive the appropriate trigger. |
| Failure criteria | Customer believes profile changed while policy/KYC still uses old value. |
| UX risks | Users do not understand impact of country/tax changes. |
| Trust signals | Before/after, effective date, impact explanation and confirmation. |
| Regulatory checkpoints | KYC, FATCA/CRS, country eligibility, privacy and audit. |
| Human intervention points | Compliance for material changes; Support for correction; Operations for dependent records. |
| AI opportunities | Explain impact from approved rules; no autonomous status change. |

# 30. Documents

~~~mermaid
graph TD
  A[Documents] --> B[Choose document requirement]
  B --> C[Upload or select existing version]
  C --> D[Quality and metadata validation]
  D --> E[Human or automated review]
  E -->|Accepted| F[Record validity and use]
  E -->|Correction| G[Explain evidence gap]
  E -->|Expired| H[Renewal]
  G --> C
  H --> C
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Makes identity, tax and compliance evidence reusable and lifecycle-managed. |
| Business reasoning | Reduces repeated collection and prevents expired-document disruptions. |
| User reasoning | Customers need to know which document, why, validity and next step. |
| Compliance reasoning | Document authenticity, retention, access, expiry, reviewer and purpose must be controlled. |
| Primary flow | Choose requirement → upload/select version → validate quality/metadata → review → accept and link to purpose. |
| Alternate flow | Reuse approved document; upload from desktop; support-assisted upload; replace before expiry. |
| Failure flow | Unreadable, wrong type, expired, mismatch, upload failure or unauthorized access. |
| Recovery flow | Specific correction, re-upload, retry, schedule review or escalate Compliance. |
| Edge cases | Passport/visa expiry, duplicate versions, document shared across purposes, deletion request, joint holder. |
| Permission flow | Investor owns documents; Joint Holder own; Support limited; Compliance reviews; Tax/CA consented; Admin cannot view content by default. |
| State transitions | Loading → Verification → Approved; Failure → Retry; Expired → Renewal; Suspended → Review; Completed link. |
| Business rules | Type, issuer, validity, purpose, retention and country; no document reuse across purposes without policy. |
| Backend dependencies | Encrypted storage, OCR, KYC/DTAA, consent, retention, review queue and audit. |
| Notifications | Upload received, correction, approved, expiry 90/60/30 days, access/share and deletion request. |
| Analytics events | document_viewed, upload_started, document_uploaded, quality_failed, document_reviewed, document_approved, document_rejected, document_expiry_notified. |
| Success criteria | Correct document is linked to the correct purpose with valid lifecycle. |
| Failure criteria | Unreadable evidence accepted, expired document used or unauthorized exposure. |
| UX risks | Document anxiety, large files, mobile capture and unclear terminology. |
| Trust signals | Purpose, access log, encryption statement, expiry, reviewer status and retention explanation. |
| Regulatory checkpoints | KYC/PMLA, tax evidence, GDPR/DPDP, retention and data portability. |
| Human intervention points | KYC/Compliance/Tax reviewers; Support for upload issues. |
| AI opportunities | OCR/classification and quality hints with human approval; no autonomous final rejection. |

# 31. Settings

~~~mermaid
graph TD
  A[Settings] --> B[Choose setting domain]
  B --> C[Change preference or security control]
  C --> D[Validate permission and impact]
  D --> E[Step-up if sensitive]
  E --> F[Save and audit]
  D -->|Invalid or restricted| G[Explain and support]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Gives customers control over security, communication, privacy and account preferences without mixing them with investments. |
| Business reasoning | Reduces support contacts and improves consent quality. |
| User reasoning | Users need predictable control over alerts, devices and data sharing. |
| Compliance reasoning | Consent, opt-out, access, data portability and security changes must be auditable. |
| Primary flow | Choose setting → edit → validate impact → step-up if needed → save and audit. |
| Alternate flow | Channel-specific preference; delegated access revoke; security device management. |
| Failure flow | Provider save failure, permission conflict, current consent invalid or security risk. |
| Recovery flow | Retry, preserve previous setting, Support/Security review or revoke affected channel. |
| Edge cases | Marketing opt-out but transactional alerts retained; joint holder shared preferences; GDPR/DPDP request. |
| Permission flow | Investor own settings; Joint Holder own; RM/support cannot change; Admin configures defaults with governance. |
| State transitions | Loading → Completed; Failure → Retry; Security risk → Suspended/Escalated. |
| Business rules | Transactional vs marketing separation; sensitive changes require step-up; revocation is logged. |
| Backend dependencies | Consent, notification, identity, security, privacy request, audit and CRM. |
| Notifications | Settings change confirmation and security alert; no alert to opted-out marketing channel. |
| Analytics events | settings_viewed, preference_changed, consent_granted, consent_revoked, device_revoked, data_request_started. |
| Success criteria | Setting changes are effective, scoped and reflected across systems. |
| Failure criteria | Opt-out does not propagate or sensitive security change lacks confirmation. |
| UX risks | Settings language can hide legal consequences; too many channel controls. |
| Trust signals | Current state, scope, effective time and change history. |
| Regulatory checkpoints | Privacy, consent, communication, security and data-subject requests. |
| Human intervention points | Privacy/DPO for requests; Security for compromise; Support for interpretation. |
| AI opportunities | Explain settings and classify requests; no hidden personalization change. |

# 32. Notifications

~~~mermaid
graph TD
  A[Service event] --> B[Classify severity and purpose]
  B --> C[Check consent and channel policy]
  C --> D[Render approved template]
  D --> E[Send through provider]
  E --> F[Receive delivery result]
  F -->|Delivered| G[Record evidence]
  F -->|Failed| H[Retry or fallback]
  H --> I[Create support task if critical]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Keeps customers informed across asynchronous and time-sensitive service states. |
| Business reasoning | Reduces repeat contacts and improves activation, retention and compliance renewal. |
| User reasoning | Customers need relevant, timely and understandable updates. |
| Compliance reasoning | Consent, channel rules, content sensitivity, opt-out and audit must be enforced. |
| Primary flow | Event → severity/purpose → consent/channel → approved template → delivery → evidence. |
| Alternate flow | Push/email/SMS/WhatsApp fallback; in-app record; quiet hours for non-critical messages. |
| Failure flow | Bounce, provider outage, wrong channel, duplicate or notification suppressed by consent. |
| Recovery flow | Retry idempotently, alternate channel where permitted, create critical support task, record delivery gap. |
| Edge cases | Shared device, number/email changed, expired deep link, country-specific delivery, duplicate callbacks. |
| Permission flow | Customer controls preferences; Product/Compliance owns templates; CRM sends; Admin configures providers. |
| State transitions | Created → Pending → Sent → Delivered/Failed → Retry/Suppressed/Completed. |
| Business rules | Transactional vs marketing; approved template; channel consent; no sensitive detail in insecure channel. |
| Backend dependencies | Event bus, notification service, CRM, SMS/email/push/WhatsApp vendors, consent and audit. |
| Notifications | This feature is itself the notification service; critical event fallback is required. |
| Analytics events | notification_created, notification_sent, notification_delivered, notification_bounced, notification_retried, notification_suppressed. |
| Success criteria | Relevant customer receives an accurate message through an authorized channel. |
| Failure criteria | Critical event is missed, duplicated, sent to wrong recipient or not recoverable. |
| UX risks | Fatigue, conflicting channels and messages that create urgency without action. |
| Trust signals | Purpose, source event, secure link, timestamp and contact route. |
| Regulatory checkpoints | Consent, privacy, communication rules, record retention and financial disclosure. |
| Human intervention points | CRM for delivery; Support for missed critical messages; Compliance for template approval. |
| AI opportunities | Delivery anomaly detection and relevance suppression; no AI-generated regulated copy without review. |

# 33. Help

~~~mermaid
graph TD
  A[Help intent] --> B[Search or browse approved guidance]
  B --> C[Open explanation]
  C --> D{Resolved?}
  D -->|Yes| E[Return to task]
  D -->|No| F[Create contextual support case]
  F --> G[Attach safe state and correlation ID]
  G --> H[Track owner and SLA]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Enables self-service for routine questions while preserving a safe escalation path. |
| Business reasoning | Reduces avoidable support cost and improves activation. |
| User reasoning | Customers want answers in context without repeating their history. |
| Compliance reasoning | Help content must be approved, current and bounded from tax/investment advice. |
| Primary flow | Search/browse → read approved answer → return to task or create contextual case. |
| Alternate flow | Search from a domain, deep link from notification, multilingual/accessible content where available. |
| Failure flow | No result, outdated content, contradictory answer or search unavailable. |
| Recovery flow | Escalate with context, record content gap, Support provides approved response and content owner updates article. |
| Edge cases | Country-specific question, US/Canada restriction, tax advice question, article expires during session. |
| Permission flow | Investor sees public/eligible help; internal authors/reviewers differ; Tax/Compliance approve regulated content. |
| State transitions | Loading → Success/Empty; content Expired → replacement/review; unresolved → Escalated case. |
| Business rules | Audience, country, effective date and escalation boundary on every article. |
| Backend dependencies | Content CMS, search index, policy metadata, case service, analytics and audit. |
| Notifications | Case creation and update; article change notification only when relevant and consented. |
| Analytics events | help_opened, search_started, query_submitted, article_viewed, article_helpful, no_result, case_from_help. |
| Success criteria | Routine question resolved or case created without context loss. |
| Failure criteria | Outdated answer, unsupported tax advice or dead-end contact path. |
| UX risks | Search results answer generic resident questions rather than NRI context. |
| Trust signals | Updated date, source owner, country context, limitations and escalation. |
| Regulatory checkpoints | Content approval, tax/legal boundaries, privacy and accessibility. |
| Human intervention points | Support owns case; Compliance/Tax owns regulated answer; Product owns gap closure. |
| AI opportunities | Retrieval-grounded search and answer summarization with source links and escalation. |

# 34. Support

~~~mermaid
graph TD
  A[Support intent] --> B[Capture issue and context]
  B --> C[Authenticate and classify]
  C --> D[Create case with state timeline]
  D --> E{Known routine issue?}
  E -->|Yes| F[Approved response and resolution]
  E -->|No| G[Assign Operations/Compliance/Finance/Tax]
  G --> H[Track SLA and customer updates]
  H --> I[Resolve and confirm]
  I -->|Not resolved| J[Reopen or escalate]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Owns service recovery when self-service, external systems or policy ambiguity fail. |
| Business reasoning | Support quality directly affects trust, cost, retention and complaint risk. |
| User reasoning | Customer needs one owner, no repeated explanation and a credible next update. |
| Compliance reasoning | Complaints, sensitive data, regulated answers and customer authentication require controlled handling. |
| Primary flow | Start support → authenticate → classify → create case → resolve or route → update → confirm closure. |
| Alternate flow | Contextual case from order/KYC/report; callback; RM/CA handoff; complaint escalation. |
| Failure flow | Wrong answer, no owner, SLA breach, repeat contact, vendor dependency or complaint. |
| Recovery flow | Reopen, correct answer, manager escalation, incident link, customer update and root-cause action. |
| Edge cases | High-value customer, joint-holder conflict, suspected fraud, vulnerable customer, legal threat, cross-timezone contact. |
| Permission flow | Customer sees own cases; Support manages assigned; specialist sees consented case; Compliance/Finance/Tax restricted; Admin audited. |
| State transitions | Created → Assigned → In Progress → Pending Customer/Vendor → Escalated → Resolved → Reopened/Completed. |
| Business rules | Authentication, severity, SLA, approved knowledge, no unauthorized advice/action, closure confirmation. |
| Backend dependencies | Case/helpdesk, identity, order/payment/KYC/portfolio/tax integrations, CRM, notification and audit. |
| Notifications | Case ID, owner, first response, SLA update, resolution and reopen. |
| Analytics events | case_created, case_classified, case_assigned, first_response, escalation, repeat_contact, case_resolved, case_reopened, complaint_created. |
| Success criteria | Resolution or correct specialist ownership within SLA with reduced repeat contact. |
| Failure criteria | Customer repeats history, receives contradictory advice or case closes without outcome evidence. |
| UX risks | Support becomes an unbounded substitute for missing product capability. |
| Trust signals | Case ID, owner, timeline, next update and transparent limitation. |
| Regulatory checkpoints | Complaints, privacy, authentication, tax/advice boundary and audit. |
| Human intervention points | Support owns first response; Operations/Compliance/Finance/Tax own domain decision. |
| AI opportunities | Agent assist, case summarization and retrieval-grounded draft response; human approval required. |

# 35. RM Connect

~~~mermaid
graph TD
  A[RM connect intent] --> B[Explain RM role and consent]
  B --> C[Choose reason and availability]
  C --> D[Create lead/case]
  D --> E[Assign eligible RM]
  E --> F[RM reviews context and contacts]
  F --> G[Record outcome and next action]
  G --> H[Return customer to self-service or specialist path]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Adds human help for high-value or high-complexity situations without turning assisted service into unlogged advice. |
| Business reasoning | Supports HNI acquisition, regular-plan value and specialist conversion. |
| User reasoning | Customers can ask for help without repeating their full context. |
| Compliance reasoning | Consent, EUIN, role boundary, suitability and assisted-action audit are required. |
| Primary flow | Explain role → consent → choose reason → create lead/case → assign RM → contact → record outcome. |
| Alternate flow | Existing assigned RM; scheduled callback; RM assists but customer independently confirms transaction. |
| Failure flow | No RM coverage, missed callback, unauthorized advice, stale context or lead routing failure. |
| Recovery flow | Reassign, escalate to RM manager/Support, preserve context, record non-contact and offer specialist path. |
| Edge cases | High-AUM threshold, country/timezone, joint holders, US/Canada legal gate, tax advice request, conflict of interest. |
| Permission flow | Investor grants scoped access; RM sees assigned/consented context; RM cannot approve Compliance or execute without customer confirmation. |
| State transitions | Intent → Consent → Lead Created → Assigned → Contacted → In Progress → Completed/Declined/Escalated. |
| Business rules | Lead SLA, EUIN for assisted transactions, permitted product scope, disclosure and data minimization. |
| Backend dependencies | CRM, consent, investor context, case, communication, order and audit. |
| Notifications | Consent, assignment, appointment, contact attempt, missed SLA and outcome. |
| Analytics events | rm_intent, rm_consent_granted, rm_lead_created, rm_assigned, rm_contacted, rm_converted, rm_declined. |
| Success criteria | Customer receives appropriate help with clear role boundary and no context repetition. |
| Failure criteria | RM gives unlogged advice, acts outside authority or lead is never owned. |
| UX risks | Customer cannot distinguish RM service from tax/legal advice; commercial pressure. |
| Trust signals | Credentials/role, consent scope, fee/plan disclosure, notes and customer confirmation. |
| Regulatory checkpoints | ARN/EUIN, distribution disclosure, suitability, privacy and country restrictions. |
| Human intervention points | RM owns relationship; Compliance/Tax reviews regulated or complex request; Support handles service breach. |
| AI opportunities | RM briefing and next-best-service prompt from approved data; no autonomous recommendation or client message. |

# 36. Logout

~~~mermaid
graph TD
  A[Logout request] --> B[Confirm session termination]
  B --> C[Revoke session and refresh tokens]
  C --> D[Clear local sensitive cache]
  D --> E[Record security event]
  E --> F[Signed-out state]
  C -->|Failure| G[Force server-side revocation and alert]
~~~

| Aspect | Architecture decision |
|---|---|
| Why this UX exists | Protects financial and identity data on shared or travelling devices. |
| Business reasoning | Reduces account-takeover and privacy risk. |
| User reasoning | Customer needs confidence that the session is actually closed. |
| Compliance reasoning | Session, device and security events must be logged and revocable. |
| Primary flow | Request logout → revoke tokens/session → clear sensitive local data → record event. |
| Alternate flow | Auto-timeout, remote logout from security settings or device revocation. |
| Failure flow | Client cannot reach server, token revoke failure or suspicious session. |
| Recovery flow | Server-side revocation, invalidate all sessions, Security alert and Support recovery. |
| Edge cases | Shared device, offline logout, multiple devices, active download or pending transaction. |
| Permission flow | Investor revokes own sessions; Admin/Security can revoke under incident policy; no business data changes. |
| State transitions | Active → Logging out → Completed; Failure → Suspended/security action. |
| Business rules | Pending transaction continues server-side; logout cannot cancel financial action; cache clearing policy. |
| Backend dependencies | Identity/session, device registry, security monitoring, local storage and audit. |
| Notifications | New-device/session revocation alert where security policy requires. |
| Analytics events | logout_started, logout_completed, session_timeout, device_revoked, logout_server_failure. |
| Success criteria | Session is invalidated and sensitive local state is cleared or bounded by policy. |
| Failure criteria | User appears logged out while token remains valid or sensitive cache persists. |
| UX risks | Customer assumes logout cancels orders; offline ambiguity. |
| Trust signals | Confirmation, security activity history and explanation of pending actions. |
| Regulatory checkpoints | Security, privacy, session retention and incident response. |
| Human intervention points | Security for compromise; Support for device/session recovery. |
| AI opportunities | None required; anomaly detection belongs to security operations. |

# Cross-Flow Architecture

## Shared flow dependencies

Every transaction flow depends on the following chain:

Investor context

→ identity and authentication  
→ country and tax residency  
→ KYC/AML/FATCA/CRS  
→ bank and NRE/NRO relationship  
→ scheme and transaction eligibility  
→ risk/disclosure  
→ order and payment  
→ execution and RTA  
→ portfolio, tax and reports  
→ notification, support and audit

## Shared analytics correlation

Every event should carry:

- Investor or anonymous subject ID.
- Session/device ID where relevant.
- Correlation ID.
- Entity ID: order, payment, case, document, report or profile.
- Country and tax-complexity segment.
- Current state and previous state.
- Source system and vendor.
- Rule/model/content version.
- Timestamp and timezone.
- Outcome and failure reason category.

## Shared success definition

A flow is complete only when:

1. The user’s intended outcome is confirmed.
2. The authoritative system has recorded the outcome.
3. The customer has received a truthful status and evidence.
4. All dependent records are reconciled.
5. Required notifications are delivered or recovery is initiated.
6. Audit and analytics events exist.
7. No unresolved critical exception remains.

## Shared failure definition

A flow is failed when:

- The requested outcome is rejected or cannot safely be confirmed.
- A dependency exceeds its SLA without an owner.
- State sources disagree and no reconciliation is active.
- Customer-facing content creates a materially incorrect interpretation.
- A permission, privacy or regulatory control is bypassed.

## UX architecture gates before wireframes

1. Approve the state machine for each money-affecting domain.
2. Define the exact MVP flows versus V1/V2/future flows.
3. Finalize source-of-truth and dependency contracts.
4. Confirm every role’s permission and field-level masking.
5. Complete legal review of all tax, DTAA, PFIC/FAPI and repatriation language.
6. Define notification content classification and consent rules.
7. Create failure and recovery test cases before designing happy paths.
8. Validate flow terminology with NRI users, Support, Operations, Compliance, Finance and Tax.
9. Confirm analytics event names and correlation strategy.
10. Confirm human capacity and SLA for every escalation branch.

## Final UX architecture recommendation

The wireframe phase should not begin by drawing screens. It should begin with the approved flow contracts in this document:

- What the customer is trying to achieve.
- What the service must verify.
- What the customer may see.
- What state the system is in.
- What can fail.
- Who recovers it.
- What evidence is produced.
- What notification is sent.
- What is measured.

This architecture is intended to make every future screen a projection of a governed service state, not a separate interpretation of the product.

