# NRI DIY Mutual Fund Platform
## End-to-End Service Blueprint

**Role:** Principal Service Designer  
**Status:** Ecosystem blueprint for service, operations, technology and UX alignment  
**Constraint:** No UI or screen designs are included

## Blueprint Basis

This blueprint is derived from:

- [Product Discovery: BRD Reverse Engineering](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md)
- [Market Intelligence and Competitive Analysis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Market_Intelligence_Competitive_Analysis.md)
- [User Research Synthesis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_User_Research_Synthesis.md)
- [Product Strategy](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Strategy.md)
- The supplied BRD and technology notes

## Service Blueprint Conventions

- **Customer:** NRI investor, joint holder or family member.
- **Frontstage:** Anything the customer can see, receive, hear, act on or rely on.
- **Backstage:** Processes, controls and work invisible to the customer but required to deliver the promise.
- **Operations:** People, queues, ownership, decision rights and service recovery.
- **Systems:** Internal services, data stores, APIs and vendor integrations.
- **Evidence:** Source records, timestamps, rules, approvals and audit history.
- **State:** The current service truth for a case, order, document or request.
- **Exception:** A deviation from the expected service path, including a pending state that exceeds its SLA.

## Critical Assumptions and Gates

The blueprint does not assume unresolved BRD decisions are complete:

1. **Execution platform:** NSE MF is described as currently used in the notes, while other sections call for selection. Treat as unconfirmed until contract, API and operational SLA are signed.
2. **KYC vendor:** Digio is described as opted, but vendor selection is also listed as unresolved. Treat as candidate until compliance and technical validation.
3. **Tax and DTAA:** Treaty treatment, ITAT interpretation, rates, validity and AMC/RTA application require country-specific legal and tax approval.
4. **US and Canada:** PFIC/FAPI and scheme restrictions require a separate legal launch gate.
5. **Payment coverage:** NRE/NRO bank support, UPI and mandate behavior cannot be inferred from generic payment-gateway capability.
6. **Real-time status:** External systems may be asynchronous or delayed. The service should promise truthful freshness and recovery, not universal real-time execution.
7. **AI:** AI output affecting money, eligibility, tax, KYC or compliance remains decision support with human override and audit.

# 1. Customer Journey

## Journey stages

| Stage | Customer goal and action | Customer evidence or input | Visible outcome | Primary service risk |
|---|---|---|---|---|
| 0. Trigger and discovery | Decide to invest, redeem, start SIP, update documents or understand tax | Search, referral, bank/RM/CA advice, family event, remittance or tax event | Clear proposition and eligibility-oriented entry | Generic acquisition creates expectations the service cannot meet |
| 1. Registration | Create a secure identity and choose communication channels | Mobile/email, country, consent | Account created or clear reason for inability | OTP, country or duplicate-account failure |
| 2. Eligibility context | Understand whether the individual, country, account and product are supported | Country, tax residency, PAN, NRE/NRO context | Allowed, restricted, review-required or unavailable result | Late restriction or unsupported tax claim |
| 3. KYC and AML | Prove identity and tax status | Passport, PAN, overseas address, visa/OCI, FATCA/CRS, TIN/GIIN, video/IPV | Verification state, missing evidence, review or approval | Repeated documents, vendor failure, EDD delay |
| 4. Bank and account setup | Connect an eligible funding source and preserve account type | Bank, IFSC, account type, mandate consent | Verified NRE/NRO source and allowed funding relationship | Wrong account tagging or unsupported bank path |
| 5. Investment decision | Find an eligible MF and understand cost, risk, tax and timing | Scheme selection, amount, account, plan and option | Decision context and review-ready order | Fund discovery hides NRI restriction or regular-plan economics |
| 6. Payment and order | Authorize money movement and submit a valid order | Payment authentication, mandate or bank confirmation | Receipt, order ID, expected NAV/allotment and state | Payment success without order, duplicate submission or missed cut-off |
| 7. Waiting and settlement | Know what is happening without repeating the request | Order ID, timestamps, source status | Truthful event timeline and owner | RTA, exchange, bank or payment delay appears as loss |
| 8. Portfolio and reporting | Monitor holdings and obtain evidence | Holdings, transactions, tax year, account source | Current/freshness-labelled portfolio and reports | Incomplete RTA data or inconsistent calculations |
| 9. Tax and DTAA | Understand tax, submit evidence and preserve entitlement | TRC, Form 10F, tax residency, capital-gains data | Estimate, review status, approved application or professional handoff | Tax confidence exceeds legal evidence |
| 10. Repatriation or redemption | Move money or plan movement responsibly | NRE/NRO source, amount, FY ledger, tax and forms | Net estimate, threshold context, payout status and documentation | Wrong limit, tax or form guidance |
| 11. Lifecycle and continuity | Maintain documents, SIPs, nominees, joint access and country context | Passport/visa, new country, family/nominee, resident conversion | Reminders, re-KYC, role change or specialist support | Silent expiry or continuity failure |
| 12. Service recovery | Resolve an exception or complaint | Case details, evidence, authorization | Named owner, SLA, next update and resolution | Context lost across support, operations and vendors |
| 13. Re-engagement | Return for SIP, reports, tax, market or life event | Reminder, calendar event, statement or obligation | Relevant next action, not generic promotion | Notification fatigue or inappropriate nudging |

## Journey service promise

At every stage the customer should be able to answer:

- What is happening?
- Why is it happening?
- What do I need to do?
- What will happen next?
- When should I expect it?
- Who owns it if it fails?
- What evidence will I receive?

# 2. Frontstage

## Frontstage inventory

| Frontstage surface | Customer-visible service | Required truth |
|---|---|---|
| Acquisition content | NRI eligibility, product scope, regular-plan model, country limitations and service promise | No universal claims that conflict with legal or vendor limits |
| Registration | Account creation, consent and verification | Account state and next action |
| Eligibility response | Country/product/account result and explanation | Rule version, effective date and reason |
| KYC workspace | Required documents, video/IPV path, progress, rejection reason and retry | Current review owner or automated status |
| Bank setup | Supported bank/account path and account-type relationship | NRE/NRO lock and payment compatibility |
| Scheme information | NRI eligibility, risk, plan, costs, NAV timing, tax context and disclosure | Source date and no implied advice |
| Order review | Amount, account type, cut-off, expected timing, estimated tax where relevant | Estimate boundary and confirmation state |
| Payment feedback | Redirect, pending, success, failure, retry and duplicate protection | Payment source status, not just client callback |
| Order timeline | Received, submitted, accepted, allotted, rejected, refunded or escalated | Source system and timestamp |
| Portfolio | Holdings, source account, value, gains, freshness and data gaps | RTA/source lineage |
| Tax and reports | Reports, TDS, capital gains, DTAA status, downloads and disclaimers | Calculation version and tax-year context |
| Repatriation | FY ledger, NRO threshold context, required forms and specialist path | Guidance not a legal guarantee |
| Documents | Expiry, validity, renewal, access and consent | Ownership and retention policy |
| Family and access | Roles, authorization, nominee and continuity status | Least privilege and explicit consent |
| Notifications | Email, SMS, push, WhatsApp and in-app alerts | Purpose, severity, opt-in and quiet-hour policy |
| Support | Help, case creation, status, escalation and response | Case owner, SLA and preserved context |
| RM/CA contact | Consent-based handoff and human service | Role boundaries, EUIN/credentials where required |

## Frontstage design requirements before UX

- Use the same state vocabulary across product, support and operations.
- Never label an estimate as a final tax outcome.
- Show source and freshness for external data.
- Make missing or stale data explicit.
- Preserve the customer’s case identifier across every channel.
- Provide a human path for high-consequence ambiguity.
- Treat email, WhatsApp and support calls as part of the product, not external workarounds.

# 3. Backstage

## Backstage service capabilities

| Backstage capability | What must happen | Owner |
|---|---|---|
| Policy governance | Maintain country, AMC, scheme, account, tax and effective-date rules | Compliance + Product + Tax |
| Identity resolution | Prevent duplicate accounts and link PAN, customer, joint holder and folio safely | Product + Technology + Operations |
| KYC orchestration | Select fast-track or video path, manage callbacks, retries and review | Operations + Compliance |
| AML/EDD review | Screen sanctions, PEP and adverse media; document decision and escalation | Compliance |
| Bank/account validation | Confirm account identity, type, ownership and folio compatibility | Operations + Finance |
| Scheme master | Maintain eligibility, plan, option, risk, cut-off, fees and restriction fields | Operations + Product control |
| Order orchestration | Idempotency, order creation, vendor submission, callbacks and reconciliation | Technology + Operations |
| Payment reconciliation | Match payment, order, bank reference, refund and payout | Finance + Operations |
| RTA ingestion | Receive holdings, NAV, capital gains, CAS and TDS data; monitor freshness | Technology + Operations |
| Tax computation | Apply versioned tax rules, rates, surcharge, cess, FY logic and source | Tax + Technology |
| DTAA review | Validate TRC/Form 10F, country rule, validity and AMC/RTA application | Tax + Compliance |
| Repatriation control | Maintain FY movement ledger, source account and document requirement | Finance + Tax + Operations |
| Document management | Store, classify, encrypt, expire, renew, retain and delete by policy | Technology + Compliance |
| Exception management | Create case, assign owner, set SLA, communicate updates and close with reason | Operations + Support |
| Customer support knowledge | Maintain approved answers, escalation rules and change history | Support + Compliance + Product |
| RM/CA routing | Capture consent, package context, assign lead and track outcome | Business + RM/CA operations |
| Notifications | Template, preference, opt-in, localization, delivery and suppression management | Product + CRM/Support |
| Audit and controls | Log user, admin, rule, vendor, model, approval and override events | Compliance + Technology |
| Analytics governance | Define events, PII policy, metric ownership and data quality | Product Analytics + Privacy |
| Incident management | Detect, triage, communicate, resolve, review and prevent recurrence | Technology + Operations + Compliance |

# 4. Operations

## Operating model

| Team | Core responsibility | Decision rights | Handoff to |
|---|---|---|---|
| Product | Service promise, scope, outcomes and prioritization | Product policy and release decisions | All functions |
| Business / Distribution | Acquisition, commercial model and RM coverage | Channel and service proposition | RM, Finance, Product |
| Relationship Manager | Assisted discovery, client context, permitted initiation and follow-up | Client engagement within defined authority | Compliance, Support, CA |
| Compliance | KYC, AML, sanctions, PEP, EDD, country restrictions and overrides | Compliance approval/rejection | Operations, Legal |
| Tax / Legal | Tax language, DTAA, PFIC/FAPI, repatriation and legal change | Tax interpretation and country gate | Product, Compliance, CA |
| Operations | Orders, reconciliation, scheme masters, queues, vendor follow-up | Operational correction through maker-checker | Finance, Support |
| Support | Customer communication, case diagnosis and escalation | Service response within knowledge boundaries | Operations, Compliance, RM |
| Finance | Payment reconciliation, TDS, commissions, refunds and financial controls | Financial reconciliation and approval | Operations, Tax |
| Technology | APIs, services, integrations, security, reliability and recovery | Technical release and incident response | Vendors, Operations |
| Data / Analytics | Event quality, reporting, experimentation and KPI governance | Metric definitions and data access | Product, Business, Compliance |
| Privacy / Security | Access, consent, retention, breach and vendor controls | Privacy/security acceptance | Legal, Technology |
| Tax consultant | Specialist advice or service after consent and qualification | Professional advice within engagement | Customer, RM, Tax |

## Service ownership rule

Every externally visible pending or failed state must have:

- A named operational owner.
- A next action.
- A target response or resolution time.
- A source of truth.
- An escalation path.
- A customer communication trigger.
- A closure reason and evidence.

# 5. Technology, APIs, Vendors and Integrations

## Integration inventory

| Capability | API/data exchange | Candidate or named vendor from BRD | Status / gate |
|---|---|---|---|
| MF execution | Scheme catalogue, order submission, order status, NFO, switch and transaction callbacks | NSE MF noted as currently used; BSE Star MF / MFU also referenced | Contract and primary selection unresolved |
| RTA 1 | NAV, holdings, transaction, capital gains, CAS and TDS data | CAMS | API agreement and coverage validation required |
| RTA 2 | NAV, holdings, transaction, capital gains, CAS and TDS data | KFintech | API agreement and coverage validation required |
| KYC / OCR / liveness / video / CKYCR | Identity, documents, video session, IPV and KYC status | Digio currently opted; vendor RFP remains unresolved in notes | Compliance and technical acceptance required |
| PAN / tax identity | PAN validation and tax-related identity checks | Provider not specified | Vendor and data contract unknown |
| AML / sanctions / PEP / adverse media | Screening request, match, case and decision | Provider not specified; OFAC/UN/EU lists required | Vendor and refresh SLA unknown |
| Payment gateway | NRE/NRO net banking, payment confirmation, refunds | Razorpay, BillDesk, PayU, Cashfree, Paytm candidates | NRI bank coverage and callback behavior must be proven |
| Mandates | eNACH / NACHx / UPI AutoPay registration and status | NPCI NACHx; gateway/bank dependent | Coverage and support unresolved |
| Banks | Account ownership, penny drop, account type and payment authorization | Major banks listed: HDFC, ICICI, SBI, Kotak, Axis, YES, IndusInd, Federal | Bank-by-bank testing required |
| Account Aggregator | Consent, bank balance, MF holding and FIP data | Finvu, OneMoney, Saafe, NADL candidates | Not all NRE/NRO accounts are live; fallback needed |
| eSign | OTP/eSign for agreements and forms | Vendor not explicitly finalized | Legal and vendor gate |
| Communications SMS | OTP, transaction, expiry and service alerts | Twilio, MSG91, ValueFirst | Country delivery, sender rules and fallback |
| Communications email | Onboarding, reports, statements and service updates | AWS SES, SendGrid | Deliverability and archive requirements |
| Push | Order, SIP, document and service alerts | Firebase Cloud Messaging | Device consent and delivery monitoring |
| WhatsApp | Opt-in alerts, status, reminders and support | Gupshup, Interakt, Wati | Consent, template approval and data boundaries |
| CRM | Leads, RM assignment, consent, follow-up and conversion | Not specified | System of record unresolved |
| Helpdesk | Cases, SLA, macros, handoff and complaints | Not specified; Zendesk/Freshdesk referenced in BRD AI notes | Selection and data retention unresolved |
| Analytics | Product events, funnels, cohorts and quality | Not specified | Event schema and privacy gate |
| Data warehouse | Operational and analytical history | Not specified | Canonical model and ownership required |
| Cloud / storage | Application, encrypted documents, backups and key management | AWS S3/KMS or equivalent | Architecture and residency review |
| Security | VAPT, device fingerprinting, session controls and monitoring | Providers not specified | CERT-In empanelled VAPT requirement |
| Tax knowledge | Rates, treaty sources, forms and effective dates | Internal/qualified sources not finalized | Tax owner and update process required |

## Integration contract requirements

Every vendor contract must define:

- Authentication, encryption and PII boundaries.
- Request, response, callback and retry semantics.
- Idempotency and duplicate prevention.
- Data freshness, version and effective date.
- Error codes and human-readable reason.
- SLA, maintenance window and outage communication.
- Reconciliation and replay capability.
- Data retention, deletion and portability.
- Audit access and regulator response.
- Vendor exit and fallback strategy.

# 6. Data Flow

## Canonical data domains

| Data domain | Enters from | Canonical owner | Consumers | Sensitivity |
|---|---|---|---|---|
| Customer identity | Customer, KYC provider, PAN service | Identity service | KYC, AML, support, reports | Highly sensitive |
| Tax residency | Customer, FATCA/CRS documents, tax review | Compliance profile | Eligibility, tax, DTAA, reporting | Highly sensitive |
| Bank/account | Customer, bank verification, gateway | Account service | Payment, order, portfolio, repatriation | Highly sensitive |
| Joint holder / nominee | Customer, holder, KYC provider | Relationship service | Authorization, reports, claims | Highly sensitive |
| Document | Customer, KYC vendor, CA/RM | Document service | Compliance, tax, support, audit | Highly sensitive |
| Scheme master | AMC/execution/RTA/operations | Product master service | Eligibility, discovery, order, reports | Business-critical |
| Eligibility policy | Compliance, tax, AMC restrictions | Policy service | Onboarding, scheme, order, support | Business-critical |
| Order | Customer, product service | Order ledger | Payment, execution, RTA, notifications, support | Financial |
| Payment | Bank/gateway/mandate | Payment ledger | Order, finance, reconciliation, support | Financial |
| Holding / transaction | CAMS, KFintech, execution platform | Portfolio service | Portfolio, tax, reports, support | Financial |
| Tax calculation | Policy/rates, transaction and holding data | Tax computation service | Review, report, support, CA | Financial/legal |
| DTAA status | Customer documents, tax/compliance review, AMC/RTA response | DTAA service | Tax preview, report, notification | Legal/sensitive |
| Repatriation ledger | Redemption/payout/bank/form evidence | Repatriation service | Customer, tax, finance, CA | Financial |
| Support case | Customer, support, system events | Case service | Support, operations, RM, compliance | Personal/service |
| Consent | Customer, channel, specialist handoff | Consent service | Communication, access, privacy, audit | Highly sensitive |
| Audit event | All services, vendors, humans and models | Audit store | Compliance, security, operations, regulator | Immutable/control |
| Analytics event | Product and service interactions | Analytics pipeline | Product, business, operations | Pseudonymized where possible |

## Data movement rules

1. Capture data once, reuse through a governed canonical model.
2. Retain raw vendor responses for reconciliation and audit, but do not expose them directly to customers.
3. Every derived result must store inputs, rule/model version, timestamp, source and reviewer where applicable.
4. Every access to PII and financial data must be authorized and logged.
5. Separate operational truth from analytics copies.
6. Do not send PAN, account numbers or unnecessary portfolio details to third-party AI or analytics systems.
7. Apply retention, deletion, portability and legal hold by data type and geography.
8. Treat data freshness as part of the value: display or log when a source was last confirmed.

## High-level data flow

Customer / joint holder  
↓ identity, consent, residency, account and documents  
Identity and profile service  
↓ eligibility and KYC requests  
KYC, AML, policy and compliance services  
↓ approved account and product context  
Scheme, order and payment orchestration  
↓ orders, callbacks, holdings and transactions  
Execution platform, payment gateway, CAMS, KFintech and banks  
↓ normalized events  
Portfolio, tax, DTAA, repatriation, support and notification services  
↓ customer and internal views  
Audit, analytics, finance and regulatory reporting

# 7. System States

## State model

States must be explicit, timestamped, source-labelled and recoverable. The same underlying state must not receive different names in email, support or operations.

| State | Meaning | Entry trigger | Customer communication | Exit paths |
|---|---|---|---|---|
| Loading | Request has started; result not yet available | User or system request accepted locally | Usually in-product only unless prolonged | Verification, pending, completed or retry |
| Pending | External or human outcome is awaited within SLA | Vendor callback, queue or settlement wait | Confirmation with expected next update | Approved, rejected, expired, suspended, retry or escalated |
| Verification | Evidence or status is being checked | KYC, bank, document, DTAA, AML or mandate review | What is being checked and whether action is needed | Approved, rejected, retry or escalated |
| Approved | Required control or review passed | Human/system decision | Approved scope, validity and restrictions | Active, expired, suspended or completed |
| Rejected | Request cannot proceed under current evidence/rules | Rule, vendor, compliance or data decision | Reason, evidence gap and safe next step | Retry, appeal/review, corrected submission or closed |
| Expired | Prior approval, document, consent or mandate is no longer valid | Expiry date or rule change | Expiry impact and renewal action | Verification, approved or suspended |
| Suspended | Action or access paused due to risk, missing update, incident or review | Compliance, security, service or customer trigger | Reason category, impact and owner | Approved, rejected, retry or escalated |
| Retry | A safe repeat is available or underway | Recoverable technical/vendor failure | Retry action and duplicate protection | Pending, verification, completed or rejected |
| Escalated | Human/specialist or higher-risk review owns next decision | SLA breach, ambiguity, complaint, high-risk match | Named owner/team and next update time | Approved, rejected, suspended, completed or closed |
| Completed | Required outcome has been confirmed and recorded | Settlement, approval, report delivery or case resolution | Final outcome, evidence and future action | Reopened only through controlled correction |

## State governance

- State transitions must be event-driven, not inferred from a page refresh.
- A customer-visible “completed” state requires a defined source confirmation.
- “Pending” is not a substitute for missing monitoring.
- Every rejected state needs a reason category; sensitive AML details may require restricted wording.
- Every expired state needs impact analysis: what stops, what remains allowed and how to renew.
- Every suspended state needs a review owner and customer-safe explanation.
- Every retry must be idempotent or explicitly require new authorization.

# 8. Exception Flow

## Exception taxonomy

| Failure area | Examples | Detection | Customer impact | Initial owner |
|---|---|---|---|---|
| Registration | OTP not received, duplicate email/PAN, country unsupported | Auth and identity events | Cannot create account | Support / Technology |
| Eligibility | Country restriction, scheme master stale, missing tax context | Policy decision and master freshness | Cannot invest or receives late block | Compliance / Operations |
| KYC | OCR mismatch, liveness failure, video unavailable, document unreadable | KYC callback and quality score | Onboarding delay or abandonment | KYC Operations |
| AML/EDD | PEP/sanctions/adverse-media match, high-risk country | Screening event | Human review or suspension | Compliance |
| Tax residency | Missing TIN, multiple residency ambiguity, FATCA/CRS error | Validation and review | Account incomplete or restricted | Compliance / Tax |
| Bank | Unsupported bank, penny-drop failure, wrong account type, joint mismatch | Bank/gateway response | Funding blocked or wrong route | Operations / Finance |
| Mandate | eNACH/UPI approval pending, bank rejection, expired mandate | Mandate callback and scheduler | SIP not activated or debited | Operations |
| Payment | Gateway timeout, payment success without order, duplicate callback, refund delay | Gateway reconciliation | Money risk and high anxiety | Finance / Operations |
| Order | Cut-off mismatch, scheme rejected, duplicate order, partial acceptance | Execution platform callback | Wrong NAV expectation or failed action | Operations |
| RTA | Missing holding, stale NAV, unmatched folio, delayed allotment | Feed monitoring and reconciliation | Portfolio/report distrust | Operations / Technology |
| Tax report | Rate/version error, missing transaction, report generation failure | Calculation validation | Filing or CA delay | Tax / Technology |
| DTAA | TRC invalid/expired, Form 10F incomplete, AMC/RTA not applying | Review and external response | Expected benefit unavailable or refund path | Tax / Compliance |
| Repatriation | Limit mismatch, missing form, payout delay, NRO ledger gap | Ledger and finance review | Money movement delay | Finance / Tax |
| Document | Expiry, wrong version, inaccessible file, consent withdrawn | Lifecycle scheduler | Restricted activity or privacy concern | Compliance / Support |
| Notification | SMS/email/WhatsApp bounce, wrong channel, duplicate alert | Delivery receipt and suppression | Missed deadline or confusion | CRM / Support |
| Security | Suspicious device, session expiry, account takeover signal | Security monitoring | Access suspended or step-up auth | Security / Support |
| Privacy | Wrong recipient, overexposure, deletion/portability request | Privacy case and access log | Legal and trust exposure | Privacy / Compliance |
| Service | SLA breach, repeat contact, complaint, wrong answer | Case metrics and QA | Trust loss | Support / Operations |
| Vendor | API outage, schema change, certificate expiry, rate limit | Integration monitoring | Broad service degradation | Technology / Vendor manager |

## Exception severity

| Severity | Definition | Examples | Response |
|---|---|---|---|
| P0 | Money loss, regulatory breach, privacy breach, widespread duplicate or incorrect action | Payment/order mismatch, wrong tax application, data exposure | Incident command, immediate containment and direct communication |
| P1 | Individual money or compliance risk, SLA breach or blocked high-value action | KYC/EDD delay, wrong account tag, failed redemption | Named owner within 1 business hour, recovery plan |
| P2 | Material inconvenience or repeated contact with safe workaround | Report delay, notification failure, non-critical feed gap | Resolve within published service target |
| P3 | Low-impact defect or cosmetic inconsistency | Copy, sorting, non-critical preference issue | Queue and batch resolution |

# 9. Recovery Flow

## Universal recovery pattern

1. Detect and classify the exception.
2. Freeze unsafe side effects and prevent duplicate action.
3. Create a case with customer, transaction, source and evidence context.
4. Assign an owner and SLA based on severity.
5. Communicate what happened, what is safe, what is not yet known and when the next update will arrive.
6. Attempt the least-risk automated retry only when idempotency and authorization are confirmed.
7. Route to the correct human team when judgment, legal interpretation or customer reassurance is required.
8. Reconcile against the authoritative source.
9. Confirm resolution and provide evidence.
10. Record root cause, control gap, customer impact and prevention action.

## Recovery catalogue

| Exception | Immediate containment | Recovery action | Human intervention | Closure evidence |
|---|---|---|---|---|
| OTP failure | Throttle retries and protect account | Resend, alternate verified channel or support verification | Support for repeated failure | Verified event and access log |
| KYC document failure | Keep account in verification; do not silently reject | Explain evidence gap, re-upload or schedule video retry | KYC Operations; Compliance for ambiguity | Review decision, document version and timestamp |
| AML/EDD match | Restrict affected action and preserve evidence | Compliance review; do not expose sensitive match detail | Compliance / Legal | Decision reason, reviewer and policy version |
| Bank mismatch | Stop order/payment linkage | Correct account metadata or re-verify | Operations / Finance | Verified account and linkage record |
| Payment success, order missing | Prevent duplicate order and hold funds state | Reconcile gateway, execution and bank; refund or submit only after approval | Finance + Operations | Payment/order reconciliation |
| Order pending beyond SLA | Keep order immutable and identify source | Poll/replay callback, vendor escalation or controlled refund | Operations + Vendor manager | Final source confirmation |
| Duplicate callback/order | Idempotency lock | Collapse duplicate event; investigate funds movement | Technology + Finance | Event ledger and reconciliation |
| RTA missing holding | Do not present incomplete data as current | Re-fetch, reconcile with statement, show freshness gap | Operations | RTA confirmation or corrected report |
| Tax estimate discrepancy | Mark estimate and prevent false finality | Recalculate with rule version; tax review if material | Tax + Compliance | Calculation inputs, version and reviewer |
| DTAA document rejected | Keep standard treatment status explicit | Correct TRC/Form 10F or route refund/CA path | Tax consultant / Compliance | Approved evidence or documented alternative |
| Repatriation threshold issue | Stop unsafe instruction | Verify FY ledger, forms and bank route | Finance + Tax | Ledger, form and payout evidence |
| Document expiry | Restrict only affected capabilities | Renewal reminder, upload and review; preserve permitted access | Compliance / Support | New validity and decision |
| Notification delivery failure | Retry with channel policy and suppress duplicates | Alternate channel for critical alerts; verify consent | CRM / Support | Delivery receipt and contact preference |
| Privacy/security concern | Revoke session/token and preserve evidence | Investigate, notify as required, restore or reset access | Security + Privacy + Compliance | Incident and access audit |
| SLA breach | Escalate case priority and notify customer | Manager review, root-cause analysis and service recovery | Team lead / Operations | Resolution and breach reason |

# 10. Human Intervention Map

| Trigger | RM | Compliance | Support | Finance | Operations | Tax consultant | Decision authority |
|---|---|---|---|---|---|---|---|
| Standard self-service onboarding | Optional | Monitor | Assist | No | Monitor | No | System within approved rules |
| High-value assisted onboarding | Join with consent | Review required cases | Assist | No | Coordinate | Optional | Compliance for approval |
| KYC retry or IPV failure | May reassure premium client | If ambiguity/risk | Guide customer | No | KYC queue owns | No | Compliance if exception |
| PEP/sanctions/EDD match | No action beyond referral | Mandatory | Communicate safe status | No | Prepare evidence | No unless engaged | Compliance |
| Country/product restriction | Explain permitted scope | Own policy interpretation | Explain approved copy | No | Apply master | Optional | Compliance/product policy |
| Payment/order mismatch | Notify client if assigned | No unless suspicious | First communication | Reconcile funds | Investigate and correct | No | Finance/operations jointly |
| Redemption tax uncertainty | No advice beyond referral | Review policy | Explain estimate boundary | Validate proceeds | Execute approved path | Join for specialist advice | Tax/legal for interpretation |
| DTAA submission | May coordinate | Validate compliance | Track case | No | Apply status | Review/advice | Tax/compliance |
| Repatriation over threshold | No autonomous advice | Review required evidence | Explain case | Confirm ledger and payout | Process forms/status | Required for tax/form guidance | Finance/tax |
| Joint-holder disagreement | No unilateral action | Review authorization | Pause and explain | No | Hold transaction | Optional | Legal/compliance |
| Document expiry | Remind assigned client | Approve re-KYC | Guide renewal | No | Process update | No | Compliance |
| Complaint or repeat contact | Relationship recovery | Join regulatory issue | Own first response | Join money issue | Investigate | Join tax issue | Support lead with function owner |
| AI uncertain or low confidence | No | Review high-risk output | Escalate user-facing answer | Review financial impact | Correct record | Review tax content | Human owner, never AI alone |

## Human handoff package

Every handoff should include only consented, necessary context:

- Customer and case identifier.
- Stated intent and last customer question.
- Current system state and source.
- Timeline of events and timestamps.
- Relevant account, order, document or report identifiers.
- Missing evidence and actions already attempted.
- Risk/severity and SLA.
- Suggested next action, with confidence and owner.
- Consent and access scope.

# 11. Notification Matrix

## Notification policy

- Critical money, security, compliance and deadline alerts are sent through at least one reliable transactional channel, with fallback where legally permitted.
- Marketing and engagement messages require explicit opt-in and suppression controls.
- Notifications state the action, reason, impact, next step, source and contact path.
- Do not send sensitive financial detail to a channel or device without appropriate consent.
- Timezone, local date, IST cut-off and financial-year date must be unambiguous.

| Event | Email | SMS | Push | WhatsApp | In-app | Owner | Priority |
|---|---|---|---|---|---|---|---|
| Registration/OTP | Optional | Yes | No | Optional | Yes | Identity | Critical |
| KYC started | Yes | Optional | Yes | Opt-in | Yes | KYC Ops | High |
| KYC document missing/rejected | Yes | Optional | Yes | Opt-in | Yes | KYC Ops | High |
| Video KYC appointment | Yes | Yes | Optional | Opt-in | Yes | KYC vendor/Ops | High |
| KYC approved | Yes | Optional | Yes | Opt-in | Yes | Compliance | High |
| EDD review started | Yes, safe wording | Optional | Optional | No sensitive detail | Yes | Compliance | High |
| Bank verified/failed | Yes | Optional | Yes | Opt-in | Yes | Operations | High |
| Mandate pending/approved/rejected | Yes | Optional | Yes | Opt-in | Yes | Operations | High |
| Order submitted | Yes | Yes | Yes | Opt-in | Yes | Order service | Critical |
| Payment pending/success/failure | Yes | Yes | Yes | Opt-in | Yes | Finance/Ops | Critical |
| Order allotted/rejected/refund | Yes | Yes | Yes | Opt-in | Yes | Operations | Critical |
| Order pending beyond SLA | Yes | Optional | Yes | Opt-in | Yes | Operations/Support | High |
| SIP reminder/debit/failure | Yes | Optional | Yes | Opt-in | Yes | SIP Ops | High |
| Report ready | Yes | No | Optional | Opt-in | Yes | Reporting | Medium |
| Tax estimate/report | Yes | No | Optional | Opt-in | Yes | Tax/Reporting | High |
| DTAA document expiry | Yes | Optional | Yes | Opt-in | Yes | Tax/Compliance | High |
| DTAA approved/rejected | Yes | Optional | Yes | Opt-in | Yes | Tax/Compliance | High |
| NRO/repatriation threshold | Yes | Optional | Yes | Opt-in | Yes | Finance/Tax | Critical |
| Passport/visa/document expiry | Yes | Optional | Yes | Opt-in | Yes | Compliance | High |
| Country-change action | Yes | Optional | Yes | Opt-in | Yes | Compliance/Ops | High |
| Security/login/device event | Yes | Yes where appropriate | Yes | No | Yes | Security | Critical |
| Support case created | Yes | Optional | Push | Opt-in | Yes | Support | High |
| SLA breach/update | Yes | Optional | Push | Opt-in | Yes | Case owner | High |
| Consent changed | Yes | Optional | Optional | No | Yes | Privacy | High |
| Educational content | Yes if opted in | No | Optional | Opt-in | Optional | CRM | Low |

## Channel fallback

For critical transactional notifications:

1. In-app record is always created.
2. Push is attempted where consented and device is active.
3. Email is the durable evidence channel.
4. SMS is used for urgent authentication or money events where permitted.
5. WhatsApp is opt-in only and not the sole source of legal or transactional evidence.
6. Failed delivery creates a delivery event and may trigger support outreach for high-severity cases.

# 12. Audit Trail

## Mandatory audit events

| Domain | Events to log | Required fields |
|---|---|---|
| Identity | Signup, OTP, login, logout, device, 2FA, password/session change | User, device, IP, time, result, risk signal |
| Consent | Terms, privacy, channel, data share, specialist handoff, withdrawal | Consent version, scope, channel, timestamp |
| Profile | Country, tax residency, PAN, address, account and nominee changes | Before/after, actor, source, approval |
| KYC | CKYC fetch, document upload/view, OCR, liveness, video/IPV, reviewer decision | Vendor, score, document hash, model/version, reviewer |
| AML/EDD | Screening, match, decision, override, escalation | List/version, match category, reviewer, policy |
| Policy | Eligibility lookup, rule change, scheme master change, tax rate change | Rule/version, effective date, actor, maker-checker |
| Order | Create, review, confirm, submit, callback, amend, reject, cancel | Order ID, idempotency key, source, amount, state |
| Payment | Initiate, authenticate, success, timeout, refund, settlement | Gateway reference, bank, account type, amount, state |
| Portfolio | RTA fetch, reconciliation, correction, report generation | Source, freshness, record version, correction reason |
| Tax/DTAA | Estimate, report, TRC/Form 10F upload, review, approval, expiry | Inputs, rate/rule version, source, reviewer, disclaimer |
| Repatriation | Ledger update, threshold check, form status, payout | FY, source account, amount, evidence and approver |
| Support | Case create, assignment, view, reply, escalation, resolution, reopen | Actor, SLA, channel, state, disposition |
| Human action | RM, compliance, ops, finance, tax and support actions | Role, authority, reason, before/after |
| AI | Prompt context hash, source retrieval, output, confidence, model, override | No raw PII in third-party logs |
| Notification | Template, consent, delivery, bounce, retry, suppression | Channel, template version, provider ID |
| Admin/security | Role change, export, access, configuration, incident | Actor, privilege, object, reason, result |

## Audit principles

- Audit is append-only for material events.
- Corrections create a new event; they do not erase history.
- Customer-facing history and regulator-facing audit may have different field visibility.
- Retention must follow the approved legal matrix. The BRD references at least 5 years for SEBI-related data and 7 years for PMLA-related data; final policy must be signed.
- Audit access is itself audited.

# 13. Analytics Event Map

## Event taxonomy

| Domain | Events |
|---|---|
| Acquisition | landing_view, referral_source_seen, signup_start, signup_complete, campaign_consent |
| Identity | otp_requested, otp_verified, login_success, login_failed, device_added, device_blocked |
| Eligibility | country_selected, tax_residency_added, eligibility_checked, eligibility_allowed, eligibility_restricted, eligibility_review_required, eligibility_explanation_opened |
| KYC | kyc_started, ckcycr_fetched, document_uploaded, document_rejected, video_started, video_failed, video_completed, liveness_failed, kyc_submitted, kyc_approved, kyc_rejected, kyc_retried |
| AML/EDD | screening_started, screening_match, edd_created, edd_approved, edd_rejected, edd_sla_breached |
| Account | bank_added, bank_verified, bank_failed, account_type_selected, folio_linked, nominee_added, joint_holder_invited, joint_holder_verified |
| Scheme | scheme_viewed, scheme_eligibility_viewed, scheme_compare_started, tax_context_viewed, fee_disclosure_viewed, nfo_viewed |
| Order | order_started, order_reviewed, cut_off_acknowledged, order_confirmed, order_submitted, order_callback_received, order_accepted, order_rejected, order_cancelled, units_allotted |
| Payment | payment_started, payment_authenticated, payment_pending, payment_success, payment_failed, refund_started, refund_completed, payment_order_mismatch |
| SIP | sip_started, mandate_started, mandate_pending, mandate_approved, mandate_rejected, sip_activated, sip_debit_success, sip_debit_failed, sip_paused, sip_cancelled |
| Portfolio | portfolio_viewed, holding_refreshed, transaction_viewed, source_stale, reconciliation_exception |
| Tax | tax_report_requested, tax_report_generated, report_downloaded, capital_gains_viewed, tds_viewed, tax_estimate_viewed, tax_disclaimer_opened |
| DTAA | dtaa_started, trc_uploaded, form_10f_uploaded, dtaa_review_started, dtaa_approved, dtaa_rejected, dtaa_expiry_notified, dtaa_renewed |
| Repatriation | repatriation_viewed, fy_limit_viewed, repatriation_calculated, form_15ca_started, form_15cb_required, ca_handoff_started, payout_requested, payout_completed |
| Documents | expiry_detected, expiry_notified, rekyc_started, rekyc_submitted, rekyc_approved, rekyc_suspended |
| Support | help_opened, case_created, callback_requested, human_escalation, case_updated, case_resolved, case_reopened, repeat_contact |
| Handoff | rm_assigned, rm_contacted, ca_assigned, specialist_consent_granted, specialist_outcome_recorded |
| Notifications | notification_created, notification_sent, notification_delivered, notification_bounced, notification_retried, notification_suppressed, channel_opted_in, channel_opted_out |
| Trust | source_opened, rule_version_viewed, timeline_viewed, consent_viewed, audit_export_requested |
| Quality | user_error, state_confusion_reported, correction_required, complaint_created, incident_linked |

## Analytics requirements

- Every event has event name, timestamp, anonymous/user ID, country, tax-complexity segment, product context, state, source, correlation ID and schema version.
- Do not collect raw PAN, account numbers, document contents or unnecessary financial detail in analytics.
- Separate product analytics from immutable audit; analytics is not a substitute for evidence.
- Track denominators and quality outcomes, not only clicks.
- Instrument failure and recovery equally with success.

# 14. SLA Matrix

SLAs below are proposed service targets for validation. The BRD provides some targets, but definitions, business hours, exclusions and clock-start events remain to be signed.

| Department / service | Proposed target | Clock starts | Escalation | Customer update |
|---|---:|---|---|---|
| Technology critical incident | Acknowledge 15 min; containment 1 hour | Monitoring or incident declaration | Incident commander, CTO | Immediate and every defined interval |
| Payment/order mismatch | Triage 30 min; resolution plan 2 hours | First mismatch event | Finance + Operations lead | Immediate acknowledgement |
| Order pending within normal window | Status monitoring continuously; update when threshold reached | Order accepted | Operations | At submission and threshold |
| Reconciliation exception | Same business day target | Exception created | Operations manager + Finance | If customer impact exists |
| KYC standard review | Target 4 business hours | Complete submission | KYC lead | Submission, approval/rejection |
| KYC retry scheduling | Within 48 hours where vendor capacity allows | Failed video/IPV | KYC Ops | Retry option and appointment |
| EDD review | Target 72 hours | EDD case created | Compliance head | Safe pending update |
| Tax/DTAA review | Target 2 business days | Complete evidence submitted | Tax lead / Compliance | Submission and decision |
| Repatriation/form support | Initial response 1 business day; plan 2 business days | Case created | Finance/Tax lead | Case ownership and next step |
| Support L1 | First response within 24 hours, target >90% | Case creation | Support lead | Case ID and SLA |
| Critical support | First response within 1 hour | Money/security/regulatory case | Duty manager | Immediate |
| RM lead assignment | Same business day | Consent and qualified lead | Business lead | Assignment notice |
| RM first contact | 1 business day | Assignment | RM manager | Contact attempt status |
| CA lead assignment | 1 business day | Consent and service request | Tax services lead | Assignment and scope |
| Finance refund status | Daily monitoring; customer update at threshold | Refund initiated | Finance lead | Expected timeline |
| Document expiry reminder | 90/60/30-day policy to confirm | Expiry detected | Compliance | Channel and impact |
| Notification delivery | Transactional event emitted immediately; provider receipt monitored | Event creation | CRM/Technology | Fallback for critical event |
| Privacy request | Legal target to be confirmed by geography | Verified request | Privacy/DPO | Receipt, status and closure |
| Complaint/regulatory issue | Immediate triage and prescribed response | Complaint creation | Compliance/Legal | Acknowledgement and status |

## SLA governance

- Define whether clocks use IST, customer local time or 24×7 elapsed time.
- Define business days, holidays, vendor downtime and missing-customer-action pauses.
- Publish customer-facing targets conservatively.
- Measure breach rate, not only average time.
- Treat a pending state beyond SLA as an exception automatically.

# 15. Service Blueprint Diagram

## Conceptual blueprint

Customer

↓ intent, identity, money, documents, consent, questions

Frontstage

↓ eligibility, KYC status, order status, reports, notifications, support and handoff

Backstage

↓ policy, workflow, reconciliation, tax computation, document lifecycle, case ownership

Operations

↓ KYC, compliance, operations, finance, support, RM, tax and incident teams

Systems

↓ identity, policy, order, payment, portfolio, tax, document, case, notification and analytics services

People

↓ employees, relationship managers, tax consultants, compliance reviewers and vendor agents

Vendors

↓ execution, RTA, KYC, banks, payment, mandate, AA, communications, CRM, helpdesk and cloud providers

Audit

↓ event ledger, access log, approval, rule/model version, reconciliation and retention

Analytics

↓ funnel, quality, SLA, trust, operational cost, risk and retention measurement

## Blueprint reading rule

Any customer promise is incomplete until the team can identify:

- The backstage capability that enables it.
- The person who owns the exception.
- The system of record.
- The vendor dependency.
- The audit evidence.
- The metric that proves it worked.

# 16. Critical Failure Points

1. Wrong country or scheme eligibility shown as allowed.
2. KYC approved without correct evidence or rejected without recoverable explanation.
3. NRE/NRO account type not carried into folio, payment and order validation.
4. Payment succeeds while order status is lost, delayed or duplicated.
5. Order submitted after cut-off with a misleading NAV expectation.
6. RTA or execution data is stale but presented as current.
7. TDS, DTAA or capital-gains result is presented as final when it is an estimate.
8. DTAA approval is recorded internally but not applied by AMC/RTA.
9. Repatriation FY ledger is incomplete or double-counted.
10. Document expiry suspends activity without timely communication or recovery.
11. Joint-holder or nominee authority is unclear during a high-consequence action.
12. Support, RM, CA, finance and operations each hold a partial version of the truth.
13. Critical notification is not delivered and no fallback exists.
14. AI answer is confident, unsupported, unlogged or exposes PII.
15. Rule or scheme master changes without effective date, maker-checker or rollback.
16. Vendor outage near a NAV cut-off is handled as a generic incident rather than a money event.
17. Customer complaint is closed operationally without addressing the underlying trust failure.

# 17. Operational Risks

| Risk | Operational consequence | Control |
|---|---|---|
| Stale scheme/country master | Ineligible order or customer misinformation | Effective dates, freshness alerts, safe default restriction |
| RTA reconciliation gap | Incorrect portfolio/report and support surge | Daily reconciliation, discrepancy queue and source labels |
| Vendor callback loss | Orphaned payment/order/KYC cases | Durable event inbox, retries, replay and alerting |
| Manual queue overload | SLA breaches and inconsistent decisions | Capacity model, prioritization, maker-checker and queue aging |
| Unclear role boundaries | Unauthorized advice or action | Role-based permissions, scripts and audit |
| Poor bank coverage | Failed funding and abandoned activation | Bank certification matrix and launch allowlist |
| Tax rule change | Incorrect estimate/report | Tax owner, versioned rule release and regression suite |
| Channel consent error | Privacy breach or notification fatigue | Consent service, suppression and delivery QA |
| Human handoff loss | Repeat explanations and delayed resolution | Case package, shared ID and ownership SLA |
| AI drift | Increasing false positives/negative or hallucinations | Monitoring, review sample, rollback and kill switch |
| Peak market event | Cut-off congestion and incident amplification | Load test, queue controls, proactive communication |
| Staff turnover | Knowledge loss and inconsistent service | Playbooks, approved knowledge and dual control |
| Regulatory change | Non-compliant service language or process | Regulatory watch, impact assessment and controlled release |
| Data residency/retention mismatch | Legal exposure and blocked requests | Data inventory, DPA, retention matrix and DPO review |

# 18. Operational KPIs

## Customer service quality

- First response time and resolution time by severity.
- First-contact resolution.
- Repeat contact within 7 and 30 days.
- Cases per 1,000 qualifying actions.
- Customer state-comprehension score.
- Complaint rate and escalation rate.
- Notification delivery and critical-alert fallback rate.

## Transaction operations

- Order success rate, including allotment quality.
- Payment-to-order reconciliation rate.
- Orphaned transaction count and aging.
- Refund aging.
- RTA freshness and reconciliation accuracy.
- Duplicate prevention rate.
- Cut-off incident count.

## Compliance operations

- KYC approval, rejection and recovery rate.
- KYC review time and EDD time.
- False-positive and false-negative rate for screening.
- Country-rule accuracy.
- DTAA review time, renewal rate and correction rate.
- Document expiry completion.
- Audit completeness and overdue evidence.

## Finance and tax operations

- TDS/report discrepancy rate.
- Report generation success and time.
- Repatriation ledger reconciliation.
- Commission and payout reconciliation.
- Tax-review correction rate.

## Platform and vendor reliability

- API availability and callback success.
- Vendor SLA breach rate.
- Queue backlog and age.
- Retry success rate.
- Data freshness by source.
- Incident detection, containment and recovery time.
- Change failure rate and rollback time.

## Service economics

- Operations minutes per qualifying action.
- Support cost per case and per completed action.
- Vendor cost per KYC, order and report.
- RM/CA assisted conversion and service cost.
- Contribution margin by segment and service tier.

# 19. Service Design Principles

1. **Design the whole service, not the visible product.** A good frontstage cannot compensate for missing operational ownership.
2. **Make handoffs observable.** Every handoff should have a source, recipient, deadline, context package and acknowledgement.
3. **Build for the exception first.** In cross-border finance, pending and failed states are core service moments.
4. **One truth, many views.** Customer, support, operations and compliance may see different fields but must rely on the same event truth.
5. **Promise only what the ecosystem can deliver.** Vendor and regulatory constraints are part of product scope.
6. **Human help should be precise, not performative.** Escalation must transfer responsibility, not simply transfer a ticket.
7. **Use progressive responsibility.** Routine cases should be efficient; ambiguous or high-risk cases should receive more scrutiny.
8. **Make evidence reusable.** A report, document, approval or timeline should reduce future repetition.
9. **Respect privacy in shared households.** Family continuity requires explicit authorization, not informal access.
10. **Treat time as a design material.** Cut-offs, settlement, expiry, business days and time zones must be operationally coherent.
11. **Measure recovery and prevention.** A service that resolves many failures may still be poorly designed if it creates them.
12. **Separate commercial persuasion from regulated guidance.** Growth content cannot override eligibility, tax or suitability boundaries.
13. **AI must be bounded by service accountability.** A model cannot own a customer outcome; a named team must.

# 20. Recommendations Before UX Starts

## P0: Resolve the service system

1. Approve the launch country/product matrix, including US/Canada exclusion or restricted pilot.
2. Select and contract the execution, RTA, KYC, payment, communication and helpdesk vendors.
3. Define the canonical source-of-truth matrix for identity, account, scheme, eligibility, order, payment, portfolio, tax, document, consent and case data.
4. Define the state machine and transition ownership for onboarding, KYC, orders, payments, mandates, reports, DTAA, repatriation and support.
5. Establish the exception taxonomy, severity model, queue ownership and SLA definitions.
6. Secure legal/tax sign-off for TDS, DTAA, PFIC/FAPI, repatriation, regular-plan disclosure and country-specific language.
7. Define data retention, deletion, portability, residency, access and audit policies.
8. Create an integration contract pack covering callbacks, freshness, idempotency, replay, outage and reconciliation.
9. Name the service owner for every customer-visible pending, rejected, expired and suspended state.
10. Define the MVP operational staffing model, including time-zone coverage and escalation coverage.

## P1: Validate the service

1. Run service walkthroughs with NRI investors, support, KYC, operations, finance, compliance and tax consultants.
2. Reconstruct real recent payment, redemption, KYC and tax-report failures.
3. Test vendor sandbox behavior, including duplicate callbacks, timeouts, stale data and partial success.
4. Run a failure rehearsal before UX: payment success/order missing, KYC vendor outage, RTA delay, rule change and notification failure.
5. Design the customer communication policy for uncertainty, SLA breach, incident and recovery.
6. Establish event naming, correlation IDs, audit requirements and KPI owners before instrumentation.
7. Define human escalation scripts and evidence requirements without turning support into an unbounded advice channel.

## P2: Prepare for scale

1. Pilot DTAA and repatriation with qualified tax review and a narrow country set.
2. Add household continuity only after authorization and claims edge cases are tested.
3. Add AI assistive capabilities only with evaluation data, redaction, confidence thresholds, human review and rollback.
4. Expand countries only after source data, vendors, legal language, staffing and service economics are country-ready.
5. Review service blueprint quarterly against actual exceptions, complaints, vendor changes and regulatory updates.

## Final service design conclusion

The product is not delivered when an investor can open an account or submit an order. It is delivered when the ecosystem can safely explain eligibility, move money with traceability, maintain accurate portfolio and tax evidence, recover from external failures, and preserve responsibility across customers, teams, systems and vendors.

The most important service decision is therefore to launch a narrow, operationally owned experience where every critical state has a truthful explanation, a named human owner, a recoverable path, an audit record and a measurable outcome.

