# NRI DIY Mutual Fund Platform
## UX Scenario and Screen Planning Document

**Role:** Principal UX Designer  
**Purpose:** Master planning blueprint before wireframing and Figma  
**Status:** Screen-planning artifact; no visual UI or wireframes included

## Planning Basis

This document is based on:

- [Product Discovery: BRD Reverse Engineering](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md)
- [Product Strategy](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Strategy.md)
- [Service Blueprint](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Service_Blueprint.md)
- [Information Architecture and Navigation Architecture](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Information_and_Navigation_Architecture.md)
- [End-to-End UX Flow Architecture](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md)
- [UX Flow Architecture Design Review](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Flow_Architecture_Design_Review.md)

## Scope Assumption

The user has marked the architecture as approved. Earlier review findings remain planning constraints and unresolved items are represented as **TBD**, **legal gate**, **vendor gate**, **manual fallback** or **future scope** rather than invented.

## Planning Rules

1. A screen is a stateful product surface, not only a URL or visual composition.
2. A screen is not considered complete until empty, loading, error, restricted, suspended, offline and success behavior is planned.
3. A dialog, bottom sheet, banner, toast or notification is planned as a reusable surface, not a one-off decoration.
4. Screen inventory is tagged by release priority and design effort.
5. P0 screens establish the smallest coherent MVP; P1 and P2 screens must not enter MVP wireframing without a scope decision.
6. Customer-facing language must distinguish estimate, pending, approved, applied, settled and completed.
7. No screen may bypass permission, eligibility, consent, compliance or state requirements.

# SECTION 1: Feature Scenario Matrix

## Scenario definitions

- **Primary:** Expected path for a verified, eligible user.
- **Alternate:** Valid path with a different actor, source or order of work.
- **Exceptional:** Unusual, high-risk or legally ambiguous path.
- **First-time:** First exposure, incomplete context or no prior history.
- **Returning:** Existing customer, saved context or prior transaction.
- **Empty:** No record, no eligible result or no history.
- **Loading:** Data or decision is being retrieved or calculated.
- **Error:** Request or dependency failed.
- **Offline:** Network, vendor or local connectivity unavailable.
- **Restricted:** Policy, eligibility or permission prevents action.
- **Suspended:** Existing capability is paused due to risk, expiry, incident or review.
- **Success:** Authoritative outcome is recorded and communicated.

## Scenario matrix

| Feature | Primary scenario | Alternate scenario | Exceptional scenario | First-time experience | Returning-user experience | Empty state | Loading state | Error state | Offline state | Restricted state | Suspended state | Success state |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Registration | Create account with verified mobile/email and country | Existing identity routes to login/recovery | Duplicate or unsupported country | Explain NRI scope and data purpose | Resume incomplete registration | No prior account | OTP and eligibility check | OTP/provider/duplicate failure | Save only safe local draft | Country unsupported | Provisional account on hold | Provisional account created |
| Login | Authenticate and load context | Trusted device or step-up | Suspicious login or lost channels | Explain secure access | Fast access with last context | No account routes to registration | Session/context load | Invalid factor or locked | Offline sign-out/return | Account restricted | Security hold | Authorized session |
| Email verification | Open valid link and verify | Resend or alternate device | Expired/replayed link | Explain why email matters | Change email with re-verification | Email not submitted | Delivery pending | Bounce/token error | No verification without network | Channel not permitted | Email change held | Verified channel |
| Mobile verification | Submit valid OTP | Email-first or resend | Roaming delay or rate lock | Country-code guidance | Change number with step-up | No mobile | OTP delivery pending | Invalid/expired OTP | No OTP submission | Country/provider unsupported | Temporary lock | Verified mobile |
| PAN verification | Validate PAN and identity match | Existing PAN routes to recovery | Legacy folio/name mismatch | Explain PAN vs KYC | Reuse verified identity | No PAN | Provider lookup | Mismatch or outage | No validation | Country/account cannot proceed | Manual review hold | PAN linked |
| KYC | CKYC or document/video path to approval | Fast-track or scheduled retry | EDD, sanctions or liveness ambiguity | Guided evidence checklist | Re-KYC only where required | No KYC record | CKYC/vendor review | Evidence/vendor failure | No upload/video | Country/product blocked | EDD/security hold | KYC approved |
| FATCA | Capture declaration and identifiers | Reuse valid declaration | US-person or contradictory data | Explain reporting purpose | Annual recertification | No declaration | Validation/review | Missing TIN or mismatch | No submission | Product/country restriction | Reporting hold | Status recorded |
| CRS | Capture all tax residencies | Reuse valid declaration | Dual residency or no TIN | Explain tax residency | Country-change update | No CRS data | Validation/review | Incomplete/mismatch | No submission | Residency not accepted | Compliance hold | CRS status recorded |
| Risk profiling | Complete questionnaire and acknowledge | Resume or RM-assisted | Disputed result or expired profile | Explain purpose and limits | Re-profile after trigger | No profile | Calculate result | Incomplete/calculation error | Resume later | Suitability unavailable | Profile suspended | Versioned profile |
| Bank verification | Verify NRE/NRO account | Manual evidence fallback | Joint/FCNR/conversion mismatch | Explain account type | Reuse verified account | No bank account | Bank/gateway verification | Ownership/type failure | No funding | Bank unsupported | Account suspended | Linked account |
| Nominee | Add/edit nominee with consent | Multiple nominee/guardian | Conflict, minor or claim in progress | Explain nominee vs owner | Review readiness | No nominee | Validation/review | Evidence/authority error | Save draft only | Role not authorized | Claim hold | Nominee recorded |
| NRE/NRO selection | Select compatible verified account | Only account auto-selected with confirmation | Account conversion or payout mismatch | Explain effect on action | Reuse locked context | No compatible account | Compatibility check | Mismatch | No account action | Account/folio restricted | Context suspended | Context locked |
| DTAA | Submit evidence and review | Reuse valid evidence or CA handoff | Treaty change or AMC/RTA non-application | Explain evidence and limitations | Renew before expiry | Not submitted | Review/application pending | Document/review rejection | No upload | Country not eligible | Benefit suspended | Status approved/applied separately |
| Dashboard | Load actions, portfolio and service status | New-user setup dashboard | Partial backend/data source failure | Setup guidance | Prioritize pending/tax/SIP items | No holdings/cases | Aggregated data loading | Domain-level failure | Safe cached summary | Action restricted | Critical item suspended | Current context displayed |
| Portfolio | View holdings and freshness | One RTA delayed/manual statement | Duplicate/missing/reconciled correction | Explain portfolio structure | Return to holding/order/report | No holdings | RTA/portfolio fetch | Feed/reconciliation error | Last-known labelled data | Holding visibility restricted | Source suspended | Verified snapshot |
| Fund discovery | Browse eligible fund universe | Search/category/AMC filters | No eligible results or stale master | Explain NRI filtering | Saved search/comparison | No eligible results | Catalogue loading | Feed/policy failure | Cached labelled catalogue | Product restricted | Scheme suspended | Eligible results |
| Fund details | Review risk, cost, eligibility and timing | Deep link from report/portfolio/RM | Scheme changed/suspended | Explain financial concepts | Compare or invest from context | Data field unavailable | Scheme data loading | Feed conflict | Last-known labelled data | Order restricted | Scheme suspended | Detail available |
| Compare funds | Compare eligible schemes | Partial comparison | Non-comparable periods/data | Explain comparison limits | Reopen saved comparison | No schemes selected | Metrics loading | Missing metric/source error | Saved data with freshness | One scheme restricted | Scheme suspended | Comparison completed |
| SIP | Configure scheme, mandate and first debit | Reuse mandate/RM-assisted | Mandate rejection, bounce or expiry | Explain recurring debit | Manage active SIP | No SIP | Mandate/debit pending | Bank/mandate/debit failure | No mandate change | Scheme/account restricted | SIP paused | First debit/active continuation |
| Lumpsum | Review and pay one-time investment | Post-cutoff or RM-assisted | Payment success/order missing | Explain order vs allotment | Repeat known scheme | No eligible order | Payment/execution pending | Gateway/order failure | No new money action | Product/account restricted | Order held | Allotment/settlement confirmed |
| Redemption | Preview tax/payout and submit | Partial/full/CA handoff | Payout failure, limit or DTAA issue | Explain consequence and estimate | Repeat with current context | No redeemable holdings | Tax/holding calculation | Payout/order/report failure | No redemption | Holding/account restricted | Payout suspended | Settled/payout evidence |
| Switch | Link redemption and purchase legs | Intra-AMC/inter-AMC | One leg succeeds, one fails | Explain switch tax treatment | Repeat source/target | No eligible source/target | Leg data loading | Composite execution failure | No new action | Target restricted | Linked order held | Both legs reconciled |
| STP | Configure recurring linked legs | Manual switch alternative | Source depletion or cycle failure | Future-version explanation | Manage scheduled STP | No eligible source | Schedule/cycle pending | Schedule/vendor failure | No new schedule | Feature unavailable | Schedule paused | Cycle completed |
| SWP | Configure recurring withdrawal | One-time redemption | Payout failure or depletion | Future-version explanation | Manage active schedule | No eligible holding | Schedule/payout pending | Payout/schedule failure | No new schedule | Feature unavailable | Schedule paused | Cycle/payout completed |
| Order tracking | View normalized event timeline | Deep link from alert/support | Conflicting vendor states | Explain order states | Review prior order history | No orders | Event history loading | Callback/reconciliation error | Cached status with timestamp | Order visibility restricted | Order held | Authoritative outcome |
| Reports | Choose report type/year and generate | Reuse or secure CA share | Source correction or link expiry | Explain report purpose | Repeat tax/portfolio task | No report period | Batch generation | Generation/download failure | Prior report labelled | Export restricted | Report generation held | Report issued |
| Capital gains | Calculate from lots and transactions | Upload missing evidence/CA review | Missing lots or rule change | Explain tax terms | Reuse tax year | No taxable data | Calculation loading | Source/rule error | Prior report only | Country report restricted | Tax calculation held | Reproducible calculation |
| Tax reports | Assemble TDS, gains, DTAA and transactions | Country/CA-specific package | Incomplete package or correction | Explain tax-ready boundary | Download/share current year | No tax activity | Package assembly | Source/report failure | Prior package labelled | Country format restricted | Report held | Purpose-labelled package |
| Profile | Edit identity/country/residency | Support-assisted change | Change triggers re-KYC/order hold | Explain impact before edit | Update only changed data | Incomplete profile | Save/dependency checks | Validation/save failure | Local draft only | Field restricted | Profile held | Versioned update |
| Documents | Upload, review and renew | Reuse approved version | Expiry, rejected evidence or deletion request | Explain purpose/retention | Renewal reminder | No documents | Upload/OCR/review | Quality/storage failure | No upload | Document access restricted | Document suspended | Purpose-linked valid document |
| Settings | Change security, consent and channels | Revoke device/share | Propagation or privacy request | Explain preference scope | Manage current settings | Default settings | Save/propagation pending | Provider/save failure | Local preference draft | Setting unavailable | Security hold | Effective setting |
| Notifications | Read and act on service alerts | Channel preference | Duplicate/wrong recipient/provider outage | Explain notification types | Review unread/pending | No notifications | Feed/delivery status | Send/provider failure | In-app record only | Channel not consented | Channel suspended | Delivery/evidence recorded |
| Help | Search approved guidance | Contextual article | No result/regulated question | Teach product vocabulary | Resume previous help topic | No result | Search/index loading | Search/index failure | Cached articles labelled | Article not applicable | Content review hold | Answer or case created |
| Support | Create case, track owner and recover | Callback/RM/CA escalation | Complaint, fraud or SLA breach | Explain case service | Return to case timeline | No cases | Case creation/loading | Assignment/notification failure | Draft case only | Case data restricted | Case on hold | Resolution confirmed |
| RM Connect | Consent, assignment, contact and outcome | Existing RM/scheduled callback | No RM/missed callback/conflict | Explain role and boundary | Reconnect to assigned RM | No assigned RM | Assignment/contact pending | CRM/availability failure | Request saved | Country/service restricted | RM access suspended | Outcome recorded |
| Logout | Revoke session and clear local state | Remote device logout/timeout | Server revocation failure | Explain effect on pending actions | Sign out all devices | No active session | Revocation pending | Token/cache failure | Local logout with server retry | Security policy hold | Sessions suspended | Signed-out state |

# SECTION 2: Complete Screen Inventory

## Screen inventory conventions

- **Role:** Primary role that can reach the screen.
- **Entry points:** Navigation, deep link, notification, contextual action or human handoff.
- **Exit points:** Next domain, recovery, support, back navigation or terminal state.
- **Trigger:** Event that creates the screen state.
- **Permissions:** Minimum role/action access.
- **Dependencies:** Required services or sources; unresolved vendor choices remain TBD.
- **Priority:** P0 MVP, P1 V1/important extension, P2 future or optimization.
- **Effort:** Small, Medium, Large or XL design effort based on state, permissions and compliance complexity.

## 2.1 Investor onboarding and identity screens

| ID | Screen name | Parent module | Role | Entry points | Exit points | Trigger | Primary goal | Business goal | Required permissions | Backend dependencies | Priority | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A01 | NRI Welcome and Registration Start | Identity | Investor | Public entry, referral, RM link | A02, A03, Help | Registration intent | Understand scope and begin | Qualified acquisition | Public view, create account | Content, identity, campaign attribution | P0 | Medium |
| A02 | Contact Verification | Identity | Investor | A01, resume link | A04, recovery | Mobile/email submitted | Verify channels | Reduce duplicate/insecure accounts | Create/verify own contact | OTP, email/SMS, identity, audit | P0 | Medium |
| A03 | Login | Identity | Investor, Joint Holder | Public entry, deep link | Home, recovery | Login intent | Securely authenticate | Retention and security | Authenticate own account | Identity, OTP, device risk | P0 | Medium |
| A04 | PAN and Identity Verification | Identity | Investor | A02, resume onboarding | A05, recovery | Contact verified | Link correct PAN | KYC activation | Edit own; system validates | PAN, identity, CKYC, audit | P0 | Large |
| A05 | Country and Tax Residency | Profile/Compliance | Investor | A01, A04, Profile | A06, A10, restriction | Country/residency required | Establish context | Country-qualified onboarding | Edit own; policy read | Policy, FATCA/CRS, profile | P0 | Large |
| A06 | KYC Method Selection | KYC | Investor | A05, re-KYC | A07, A08, status | KYC required | Choose valid KYC path | Increase completion | Own KYC initiation | CKYC, KYC vendor, policy | P0 | Medium |
| A07 | Document Capture and Upload | KYC/Documents | Investor, Joint Holder | A06, A11, C11 | A09, retry | Documents required | Submit evidence | Compliant activation | Upload own | Storage, OCR, malware scan, KYC | P0 | Large |
| A08 | Video KYC and IPV Session | KYC | Investor, Joint Holder | A06, retry | A09, retry, Support | Video required | Complete identity session | Regulatory onboarding | Own session | Video/IPV, liveness, scheduling | P0 | XL |
| A09 | KYC Review Status | KYC | Investor, Joint Holder | A07, A08, notification | A10, Home, Support | Submission/review | Understand status and next step | Reduce support/rework | View own safe status | KYC, AML, case, notification | P0 | Medium |
| A10 | FATCA and CRS Declaration | Compliance | Investor, Joint Holder | A05, A09, Profile | A11, review | Tax declaration required | Complete self-certification | Regulatory reporting | Create/edit own declaration | FATCA/CRS, profile, audit | P0 | Large |
| A11 | Risk Profile | Compliance/Invest | Investor, Joint Holder | A09, A10, profile trigger | B02, review | Profile required | Complete risk assessment | Suitability and disclosure | Create own; RM assist | Risk engine, product policy, audit | P0 | Large |
| A12 | Bank Account List | Accounts | Investor, Joint Holder | Home, A11, B05, C09 | A13, A14, add account | Funding/payout context | Select or add account | Payment success and compliance | View/create own | Bank verification, account, payment | P0 | Medium |
| A13 | Bank Verification Status | Accounts | Investor, Joint Holder | A12 | Home, A14, Support | Verification submitted | Understand bank state | Reduce payment failure | View own status | Bank/gateway, case, notifications | P0 | Medium |
| A14 | NRE/NRO Context Confirmation | Accounts | Investor, Joint Holder | A12, B05, B10, C09 | Action review, recovery | Account context required | Confirm source/payout relationship | Prevent account mismatch | View compatible accounts | Account, folio, policy, ledger | P0 | Large |
| A15 | Nominee and Continuity | Family/Compliance | Investor, Joint Holder | Profile, C01, A12 | Profile, verification | Nominee add/edit | Maintain continuity | Reduce claims risk | Create/edit own by authority | Relationship, KYC, folio, audit | P1 | Large |
| A16 | Forgot Email | Identity/Recovery | Investor, Joint Holder | A03, A02, Help | A21, Support | Email inaccessible | Recover verified email safely | Reduce account loss and support risk | Own account recovery | Identity, contact verification, audit | P0 | Large |
| A17 | Forgot Mobile | Identity/Recovery | Investor, Joint Holder | A03, A02, Help | A21, Support | Mobile inaccessible | Recover verified mobile safely | Reduce account loss and takeover risk | Own account recovery | Identity, OTP, device risk, audit | P0 | Large |
| A18 | Device Recovery | Identity/Security | Investor, Joint Holder | A03, C12, security alert | A19, A21, Support | Lost or untrusted device | Restore safe access | Protect account and reduce fraud | Own account with step-up | Identity, device risk, sessions, audit | P0 | Large |
| A19 | Active Sessions | Settings/Security | Investor, Joint Holder | C12, security alert | A20, A18, logout | Session management intent | Review active sessions | Reduce takeover risk | View own sessions | Identity, device registry, audit | P0 | Medium |
| A20 | Trusted Devices | Settings/Security | Investor, Joint Holder | C12, A19 | A18, logout | Device trust change | Review/revoke trusted devices | Secure retention | View/revoke own devices | Device risk, identity, audit | P0 | Medium |
| A21 | Account Recovery | Identity/Recovery | Investor, Joint Holder | A16-A18, A03, Support | A22, A03, Support | Recovery request | Prove account ownership and regain access | Recover legitimate users safely | Create own recovery request | Identity, verification, case, audit | P0 | XL |
| A22 | Recovery Pending | Identity/Recovery | Investor, Joint Holder | A21, notification | A03, Support, A21 | Manual/security review | Understand recovery status and SLA | Reduce repeated support | View own recovery status | Case, identity, security, notification | P0 | Large |
| A23 | Add Bank Account | Accounts | Investor, Joint Holder | A12, A14, C10 | A24, A25, Support | New funding/payout account | Enter account details and type | Expand supported funding | Create own account | Account, bank, policy, audit | P0 | Large |
| A24 | Verify Bank Account | Accounts | Investor, Joint Holder | A23 | A14, A25, Support | Verification submitted | Complete ownership/type verification | Prevent payment mismatch | View own verification | Bank/gateway, account, audit | P0 | Large |
| A25 | Bank Verification Failed | Accounts/Recovery | Investor, Joint Holder | A24, notification | A23, A26, Support | Verification failure | Correct or recover bank verification | Reduce funding abandonment | View own; resubmit own | Bank, account, case, audit | P0 | Medium |
| A26 | Unsupported Bank | Accounts | Investor, Joint Holder | A23, A25 | A12, Support | Bank not supported | Understand limitation and alternatives | Avoid invalid payment attempts | View supported-bank policy | Bank capability, policy, content | P0 | Medium |
| A27 | NRE/NRO Compatibility | Accounts/Compliance | Investor, Joint Holder | A12, A14, B05, B10, C09 | A14, recovery | Account/action compatibility check | Confirm allowed relationship | Prevent regulatory/order failure | View permitted context | Account, folio, policy, ledger | P0 | Large |

## 2.2 Investor home, discovery and transaction screens

| ID | Screen name | Parent module | Role | Entry points | Exit points | Trigger | Primary goal | Business goal | Required permissions | Backend dependencies | Priority | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B01 | Home Dashboard | Home | Investor, Joint Holder | Login, bottom navigation, notification | Invest, Portfolio, Tax, Help | Authenticated context load | Orient and prioritize | Retention and activation | View permitted context | Profile, portfolio, cases, notifications | P0 | Large |
| B02 | Fund Discovery | Invest | Investor, RM | B01, navigation, deep link | B03, B04 | Invest intent | Find eligible funds | Qualified conversion | View eligible products | Scheme master, policy, performance | P0 | Large |
| B03 | Fund Details | Invest | Investor, RM | B02, Portfolio, search | B04, B05, B08 | Scheme selected | Understand scheme | Informed order | View scheme details | AMC/execution/RTA feeds, policy | P0 | Large |
| B04 | Compare Funds | Invest | Investor, RM | B02/B03 | B03, B05 | Compare intent | Compare relevant options | Conversion and trust | View eligible schemes | Product, performance, risk, fees | P1 | Large |
| B05 | Investment Order Review | Invest/Execution | Investor, RM | B03, B01, quick action | B06, cancel/recovery | Lumpsum intent | Review before payment | Prevent invalid/duplicate orders | Create own; RM initiates only | Policy, risk, account, order | P0 | Large |
| B06 | Payment Authorization and Status | Execution | Investor | B05 | B07, recovery | Order confirmed | Authorize payment safely | Successful execution | Pay own order | Gateway, bank, mandate, order | P0 | Large |
| B07 | Order Tracking | Execution | Investor, Joint Holder, Support | B06, notifications, Portfolio | C01, Support, recovery | Order submitted | Understand outcome | Reduce repeat contact | View permitted order | Order, payment, execution, RTA | P0 | Large |
| B08 | SIP Setup | Execution | Investor, RM | B03, B01 | B09, B06, recovery | SIP intent | Set recurring investment | Retention and AUM | Create own; RM assist | Mandate, bank, SIP, policy | P0 | XL |
| B09 | SIP Management | Execution | Investor, Joint Holder | B01, C01, notification | B08, Support | Existing SIP | Pause/edit/cancel/monitor | Continuation | Edit own by mandate | SIP, mandate, bank, order | P1 | Large |
| B10 | Redemption Setup | Execution/Portfolio | Investor, RM | C01/C02 | B11, Support | Redemption intent | Select holdings and amount | Retain trust and compliance | Create own; RM assist | Holdings, tax, account, policy | P1 | XL |
| B11 | Redemption Review and Confirmation | Execution/Tax | Investor | B10 | B07, C09, recovery | Redemption review | Understand net estimate and payout | Safe redemption | Confirm own | Tax, DTAA, repatriation, order, bank | P1 | XL |
| B12 | Switch Setup | Execution | Investor, RM | C02 | B07, recovery | Switch intent | Configure linked legs | Advanced transaction value | Create own; RM assist | Holdings, policy, order, tax | P1 | XL |
| B13 | STP Setup | Execution | Investor, RM | C02 | B07, recovery | Future feature intent | Configure recurring linked legs | Future retention | Create own when enabled | Scheduler, order legs, tax | P2 | XL |
| B14 | SWP Setup | Execution | Investor, RM | C02 | B07, recovery | Future feature intent | Configure recurring payout | Future retention | Create own when enabled | Scheduler, payout, tax, bank | P2 | XL |
| B15 | Payment Pending | Execution/Recovery | Investor | B06, notification, B07 | B07, Support | Payment callback pending | Know whether to wait or act | Prevent duplicate payment | View own payment | Payment, gateway, order, case | P0 | Medium |
| B16 | Payment Failed | Execution/Recovery | Investor | B06, B07, notification | B06, Support, refund | Payment declined/failed | Correct or retry safely | Reduce payment abandonment | Retry own payment | Gateway, bank, payment ledger | P0 | Large |
| B17 | Gateway Timeout | Execution/Recovery | Investor | B06, B15 | B15, B21, Support | Gateway response timeout | Prevent repeated authorization | Contain financial uncertainty | View own payment | Gateway, payment ledger, monitoring | P0 | Medium |
| B18 | Duplicate Payment | Execution/Recovery | Investor | B06, B07, notification | B21, B22, Support | Duplicate payment detected | Explain hold and next action | Prevent double investment | View own duplicate case | Payment ledger, reconciliation, audit | P0 | Large |
| B19 | Order Created but Payment Failed | Execution/Recovery | Investor | B06, B07 | B16, B21, cancel/recovery | Order/payment mismatch | Resolve order without duplicate action | Protect order integrity | View own order/payment | Order, payment, execution, case | P0 | Large |
| B20 | Payment Success but Order Pending | Execution/Recovery | Investor | B06, B07, notification | B07, B21, Support | Payment confirmed, order not final | Reassure and track execution | Protect trust and reconciliation | View own order/payment | Payment, order, execution, RTA | P0 | Large |
| B21 | Order Reconciliation | Execution/Operations | Investor, Support, Operations, Finance | B18-B20, B07, E04 | B07, B22, completion | Source mismatch | Track investigation and owner | Reconcile financial truth | Role-based view; internal actions | Payment, order, execution, RTA, case | P0 | XL |
| B22 | Refund Pending | Finance/Recovery | Investor, Support, Finance | B18-B21, notification | B23, B07, Support | Refund initiated | Know refund owner and timing | Reduce complaints and repeat contact | View own refund | Finance, gateway, bank, case | P0 | Medium |
| B23 | Refund Completed | Finance/Recovery | Investor, Support, Finance | B22, notification | B07, C03 | Refund confirmed | Confirm returned funds and evidence | Close financial exception | View own; Finance confirms | Finance, bank, payment, audit | P0 | Medium |
| B24 | Order Rejected | Execution/Recovery | Investor, Support, Operations | B07, notification | B05, B21, refund | Execution rejection | Understand rejection and safe option | Prevent blind retry | View own rejection | Execution, policy, payment, case | P0 | Medium |
| B25 | Order Expired | Execution/Recovery | Investor, Support, Operations | B07, notification | B05, refund/support | Order validity ended | Explain expiry and next action | Prevent stale order action | View own order | Order, calendar, execution, notification | P0 | Medium |
| B26 | Cutoff Missed | Execution/Recovery | Investor | B05, B07 | B05, cancel | Cut-off passed | Confirm next business-day behavior | Avoid NAV disputes | Confirm own order | Calendar, execution, policy, audit | P0 | Medium |
| B27 | Duplicate Order | Execution/Recovery | Investor, Support, Operations | B05, B07, notification | B21, cancel, refund | Duplicate order detected | Prevent double investment | Protect customer funds | View own order | Order ledger, idempotency, reconciliation | P0 | Large |
| B28 | Cancelled Order | Execution/Recovery | Investor, Support, Operations | B07, notification | B05, B22, C03 | Customer/system cancellation | Confirm cancellation and funds state | Close order safely | View own; cancel where allowed | Order, payment, execution, finance | P0 | Medium |
| B29 | Partial Order | Execution/Recovery | Investor, Support, Operations | B07, notification | B21, B22, C03 | Partial acceptance/allotment | Understand completed and outstanding parts | Prevent false completion | View own partial outcome | Execution, RTA, payment, order ledger | P0 | Large |

## 2.3 Portfolio, tax and account screens

| ID | Screen name | Parent module | Role | Entry points | Exit points | Trigger | Primary goal | Business goal | Required permissions | Backend dependencies | Priority | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C01 | Portfolio Overview | Portfolio | Investor, Joint Holder, RM | B01, navigation | C02, C03, B10 | Portfolio intent | Understand holdings | Repeat engagement | View permitted holdings | CAMS/KFintech, portfolio, NAV | P0 | Large |
| C02 | Holding Details | Portfolio | Investor, Joint Holder, RM | C01 | B03, B10, B12, C03 | Holding selected | Inspect position | Action conversion | View holding | Holding, transactions, tax, policy | P0 | Large |
| C03 | Transaction History | Portfolio | Investor, Joint Holder, Support | C01/C02 | B07, C06, reports | Transaction detail | Trace activity | Evidence and support reduction | View permitted transactions | Order, payment, RTA, audit | P0 | Medium |
| C04 | Reports Hub | Tax/Reports | Investor, Joint Holder, RM, Tax Consultant | B01, C01 | C05-C08 | Report intent | Choose evidence | Retention and specialist value | View/request permitted reports | Reporting, portfolio, tax, consent | P0 | Medium |
| C05 | Report Request and Status | Tax/Reports | Investor, Joint Holder | C04 | C06/C07, C04 | Report generated/requested | Track generation | Reduce report support | Request own; view own | Report job, sources, notification | P0 | Medium |
| C06 | Capital Gains Report | Tax/Reports | Investor, Joint Holder, Tax Consultant | C04/C05, C03 | C05, Support | Capital gains intent | Understand gains and lots | Tax engagement | View/export by consent | Tax engine, lots, RTA, report | P0 | XL |
| C07 | Tax Report Package | Tax/Reports | Investor, Joint Holder, Tax Consultant | C04/C05, notification | C05, secure share | Tax report intent | Assemble evidence | Retention and CA leverage | View/export/share by consent | TDS, gains, DTAA, repatriation | P0 | XL |
| C08 | DTAA Status and Documents | Tax/Compliance | Investor, Tax Consultant, Compliance | C04, B11, Profile | C05, document review | DTAA intent | Manage treaty evidence | Differentiation | View/create own; specialist consent | Tax policy, documents, review, AMC/RTA | P1 | XL |
| C09 | Repatriation Overview | Tax/Finance | Investor, Joint Holder, RM, Tax Consultant | C01, B11, C04 | B11, C07, Support | Repatriation intent | Understand FY movement and forms | Differentiation and trust | View/create by authority | Ledger, payout, tax, forms | P1 | XL |
| C10 | Profile and Residency | Profile | Investor, Joint Holder | Drawer, B01 | A05, A10, A12, C11 | Profile edit | Maintain identity context | Data quality | Edit own permitted fields | Profile, policy, KYC, audit | P0 | Large |
| C11 | Documents and Expiry | Documents | Investor, Joint Holder | C10, B01, notification | A07, C08, Support | Document task | Upload/renew/manage evidence | Compliance continuity | Own documents | Storage, OCR, KYC, DTAA | P0 | Large |
| C12 | Settings and Consent | Settings | Investor, Joint Holder | Drawer | C13, security | Preference/security change | Manage channels and access | Consent quality and security | Edit own settings | Consent, identity, CRM, notifications | P1 | Large |
| C13 | Notifications Center | Notifications | Investor, Joint Holder | B01, push/deep link | Target entity, settings | Notification event | Read and act on status | Engagement and recovery | View own notifications | Notification, event, case | P1 | Medium |
| C14 | Family and Access | Family | Investor, Joint Holder, Nominee | Drawer, C10 | A15, support | Family/permission task | Manage continuity | Retention and claims readiness | View/edit by authority | Relationship, consent, KYC, audit | P1 | XL |

## 2.4 Help, support and internal screens

| ID | Screen name | Parent module | Role | Entry points | Exit points | Trigger | Primary goal | Business goal | Required permissions | Backend dependencies | Priority | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| D01 | Help Center and Search | Help | All customer roles | B01, any error, navigation | Target article, D02 | Help intent | Resolve routine question | Reduce support cost | View approved content | CMS, search, policy metadata | P0 | Large |
| D02 | Create Support Case | Support | Investor, Joint Holder | D01, B07, C05, errors | D03 | Unresolved issue | Request recovery | Protect trust | Create own case | Case, identity, context package | P0 | Large |
| D03 | Support Case Detail | Support | Investor, Joint Holder, Support, RM | D02, notification | Target entity, resolved | Case created/update | Track owner and SLA | Reduce repeat contact | View own; internal assigned | Case, timeline, notifications | P0 | Large |
| D04 | RM Connect | RM/Service | Investor, Joint Holder, RM | B01, Support, C09 | D03, B05 | Assisted-service request | Connect safely to RM | HNI conversion and service | Consent and assigned access | CRM, consent, calendar, audit | P1 | Large |
| E01 | Operations Work Queue | Internal Operations | Operations, Admin | Internal login | E03-E07 | Staff login/queue | Prioritize work | SLA and cost control | View/claim/assign queues | Case, order, KYC, SLA, audit | P0 | Large |
| E02 | KYC and EDD Review | Internal Compliance | Operations, Compliance | E01, case | E03, decision | Review assigned | Review evidence and decide | Compliance approval | View evidence; approve by authority | KYC, AML, docs, audit | P0 | XL |
| E03 | Customer and Case Context | Internal Customer Context | Support, Operations, Compliance, Finance, RM, Tax | E01, search, D03 | Domain workspaces | Case/customer lookup | See governed context | Faster resolution | Role-based view/export | Profile, orders, documents, cases | P0 | XL |
| E04 | Order and Reconciliation Workspace | Internal Operations | Operations, Finance, Admin | E01, E03 | E03, E07, incident | Mismatch/order issue | Reconcile and recover | Prevent financial loss | View/edit/approve by authority | Order, payment, execution, RTA | P0 | XL |
| E05 | Scheme and Policy Master | Internal Policy | Operations, Compliance, Product, Admin | Internal navigation | E04, audit | Rule/master update | Maintain effective rules | Prevent invalid actions | Edit/approve maker-checker | Scheme, policy, source feeds, audit | P0 | XL |
| E06 | Tax and DTAA Review | Internal Tax | Tax, Compliance, Operations | E01, E03, C08 | C08, C06, audit | Tax/DTAA case | Decide evidence and computation | Tax trust/compliance | View/edit/approve by authority | Tax engine, docs, policy, AMC/RTA | P0 | XL |
| E07 | Finance and Refund Reconciliation | Internal Finance | Finance, Operations, Admin | E01, E03, B07 | E03, case, audit | Payment/refund mismatch | Reconcile money | Financial control | View/edit/approve by authority | Gateway, bank, payment ledger, reports | P0 | XL |
| E08 | Support Operations Console | Internal Support | Support, Support Lead, Admin | E01, D03 | E03, case | Support queue | Resolve and communicate | Cost and trust | View/edit/assign assigned cases | Case, knowledge, notifications, CRM | P0 | Large |
| E09 | Audit and Risk Workspace | Internal Risk | Compliance, Security, Admin, Auditor | Internal navigation, incident | E03, policy, case | Audit/risk review | Investigate evidence | Regulatory control | View/export; approve by authority | Audit, access logs, model logs, incidents | P0 | XL |
| E10 | Analytics and Service Health | Internal Analytics | Product, Business, CTO, Admin | Internal navigation | E01-E09 | Metric/incident review | Monitor quality and outcomes | Growth, cost and reliability | View aggregate; export governed | Events, warehouse, observability, SLA | P1 | XL |

# SECTION 3: Screen-Level Interaction Surface Inventory

## Surface legend

- **Sheet:** Contextual, reversible surface for selection, explanation or lightweight action.
- **Dialog:** Focused confirmation, warning or decision.
- **Modal:** Larger blocking task or document review; use sparingly.
- **Toast:** Lightweight confirmation only; never sole evidence of money or compliance.
- **Snackbar:** Recoverable background/status message with action.
- **Tooltip:** Short contextual explanation; never the only legal or financial content.
- **Banner:** Persistent status, deadline, restriction or incident message.

| Screen IDs | Bottom sheets | Dialogs | Modals | Toasts/snackbars | Tooltips | Banners |
|---|---|---|---|---|---|---|
| A01-A05 | Country selector, contact method, recovery options | Duplicate identity, unsupported country, leave onboarding | Privacy/consent detail | Verification sent, draft saved | PAN, residency terms | Launch-country scope, service availability |
| A06-A11 | KYC method, document requirements, review detail | Delete/retry evidence, consent, exit | Video/IPV session, legal declaration | Upload received, answer saved | KYC, TIN, CRS/FATCA terms | Review SLA, missing evidence, EDD pending |
| A12-A15 | Bank selector, account type, nominee relationship, permission scope | Remove account, confirm nominee, revoke access | Bank redirect, document review | Account saved, nominee updated | NRE/NRO, nominee vs owner | Bank verification pending, document expiry |
| A16-A22 | Recovery channel, device/session detail, verification evidence | Revoke session/device, confirm recovery, leave recovery | Recovery evidence, security review | Recovery requested, device revoked | Security and ownership terms | Recovery pending, account security hold |
| A23-A27 | Bank selector, account type, verification evidence, compatibility detail | Remove account, retry verification, choose alternative | Bank redirect, ownership evidence | Account added, compatibility confirmed | NRE/NRO and verification terms | Verification pending, unsupported bank, compatibility restriction |
| B01-B04 | Filter, sort, compare selection, context explanation | Leave order, remove comparison, restriction detail | Scheme facts/legal disclosures | Saved comparison, filter applied | Riskometer, expense ratio, NAV timing | Stale data, market/maintenance state |
| B05-B09 | Account selection, payment method, SIP schedule | Order confirmation, cancel, pause/cancel SIP | Bank/payment redirect, mandate authorization | Order created, mandate request | Cut-off, plan, account compatibility | Payment/order pending, SIP debit warning |
| B10-B14 | Holding selection, tax detail, schedule controls | Redemption/switch confirmation, pause/cancel | Tax/repatriation review, mandate/schedule | Request submitted, schedule saved | Tax estimate, linked leg, payout | Review required, payout/order exception |
| B15-B23 | Payment state, mismatch evidence, refund status, reconciliation detail | Retry payment, cancel/reconcile, confirm refund | Bank/gateway reconciliation, refund evidence | Payment/refund status recorded | Payment/order relationship, do not retry guidance | Payment pending, timeout, duplicate, refund pending |
| B24-B29 | Order state, rejection reason, cutoff, partial outcome | Cancel order, retry, refund or reconcile | Order failure/reconciliation detail | Recovery action recorded | Order versus allotment terminology | Rejected, expired, cutoff, duplicate, partial |
| C01-C05 | Portfolio filters, report type/year, freshness explanation | Export/share, refresh, cancel generation | Secure report preview/share permission | Report requested, download ready | As-of date, data source | Source stale, report generation pending |
| C06-C09 | Lot detail, DTAA evidence, repatriation forms | Submit evidence, share report, specialist handoff | Tax calculation detail, form review | Report generated, evidence uploaded | Estimate/final, FY, TDS | Missing data, tax review, expiry |
| C10-C14 | Profile field editor, document type, channel preference, role scope | Sensitive edit, revoke consent/device, remove nominee | Data request, access review | Preference saved, document uploaded | Effective date, retention | Re-KYC required, security hold |
| D01-D04 | Search filters, case reason, callback slot | Submit case, cancel case, share context | Specialist consent, secure handoff | Case created, message sent | SLA, role boundary | Incident, SLA breach, support availability |
| E01-E03 | Queue filters, assignment, customer context tabs | Claim/reassign, restricted data access | Sensitive evidence review | Case claimed, task assigned | SLA age, masking, source | Queue overload, incident, policy change |
| E04-E07 | Reconciliation filters, evidence selection, correction reason | Approve correction, refund, override | Transaction comparison, tax review | Reconciled, refund initiated | Idempotency, source precedence | Cut-off incident, unmatched funds |
| E08-E10 | Case filters, report filters, metric dimensions | Close/reopen, export, alert acknowledgement | Audit evidence, incident review | Export ready, alert created | Metric definitions, retention | SLA breach, vendor outage, data-quality alert |

## Surface governance

1. Critical financial or compliance confirmation requires a dialog or blocking review, not a toast.
2. Toasts/snackbars are supplemental and must never be the only confirmation of money movement.
3. Banners must state impact, owner and next action.
4. Tooltips cannot contain the only explanation for tax, eligibility or legal restrictions.
5. Modals must have recovery, cancellation and accessibility behavior defined before implementation.

# SECTION 4: Component Planning

## Existing design-system components to reuse

These should be treated as existing or foundational components, subject to the actual design system audit:

- App shell and navigation
- Page header
- Tabs and segmented controls
- Buttons and links
- Text fields and masked fields
- OTP input
- Select, combobox and country selector
- Checkbox, radio and switch
- Date picker and calendar
- File upload and document preview
- Progress indicator
- Step indicator
- Card
- Table and responsive data table
- Badge and status chip
- Alert, banner and inline message
- Dialog and bottom sheet
- Modal
- Toast and snackbar
- Tooltip
- Accordion
- Search and filter controls
- Empty state
- Loading skeleton
- Error state
- Timeline
- Pagination
- Secure link/share control
- Permission/consent selector
- Audit metadata block

## New product-specific components needed

| Component | Screens | Why needed | Priority |
|---|---|---|---|
| NRI Context Header | A05, A14, B01, B05, B10, C01, C06-C09 | Persistent country, tax residency, account and freshness context | P0 |
| Eligibility Decision Block | A05, A14, A27, B02-B05, B08, B10-B14 | Explain allowed, restricted, review and source | P0 |
| KYC Evidence Checklist | A06-A09, C11 | Required, submitted, accepted, rejected and expiry evidence | P0 |
| Review Status Timeline | A09, B07, C05, D03, E02-E07 | Shared pending/owner/SLA/status language | P0 |
| Account Compatibility Selector | A12-A14, B05, B08, B10-B11, C09 | Link NRE/NRO source to permitted action | P0 |
| Tax Estimate Boundary | B11, C06-C09 | Separate estimate, TDS, finality and assumptions | P0 |
| Source Freshness Indicator | B01-B03, C01-C07 | Distinguish current, stale, partial and unavailable data | P0 |
| Leg-Level Transaction Timeline | B12-B14, B07, B21, B29, C03 | Show composite or recurring transaction outcomes | P0 |
| Reconciliation Exception Panel | B06-B07, E04, E07, D03 | Explain payment/order/source mismatch and owner | P0 |
| Consent Scope Control | A02, A10, A15, A16-A22, C07-C14, D04 | Select purpose, fields, recipient and expiry | P0 |
| Secure Report Share | C04-C07, D04 | Time-bound, permissioned, audited report sharing | P1 |
| DTAA Evidence Status | C08, B11, C06-C07, E06 | Distinguish submitted, approved, applied and expired | P0 |
| Repatriation Ledger Summary | C09, B11, C07 | Show FY amount, source, threshold and evidence | P1 |
| Support Context Package | D02-D03, E03, E08 | Preserve user intent, state, events and permissions | P0 |
| Field-Level Masking Pattern | A04, A10, A12, C10-C14, E03/E09 | Prevent sensitive data exposure by role | P0 |
| Human Ownership Block | A09, B07, C08-C09, D03-D04 | Name team/owner, SLA and next update | P0 |
| Policy Version Metadata | B02-B05, B11, C06-C09, E05-E06 | Show approved effective date and source to authorized users | P0 |
| Offline/Degraded Data Notice | B01, C01-C07, B07, D01-D03 | Explain safe cached data and unavailable actions | P1 |
| Internal Queue Aging Indicator | E01-E08 | Show SLA risk and prioritization | P0 |
| Audit Evidence Viewer | E03-E09 | Connect action, source, approval, version and timeline | P0 |
| Recovery Status Timeline | A21-A22, B15-B23, B24-B29 | Show owner, SLA, source and safe next action | P0 |
| Session and Device Control | A18-A20 | Review, trust and revoke devices/sessions | P0 |
| Bank Verification Result | A23-A27 | Separate verified, failed and unsupported outcomes | P0 |

## Component dependency rules

- Product-specific components must consume canonical state and permission tokens.
- A component cannot create a new state label without architecture approval.
- Tax, DTAA, eligibility and financial components require content/legal review.
- All new components require keyboard, screen-reader, responsive and degraded-data behavior.

# SECTION 5: Screen Behavior and Rules Matrix

## Behavior conventions

- **Validation:** Input and evidence checks before submission.
- **Business rule:** Product or regulatory constraint affecting behavior.
- **Error copy:** Safe, specific and recoverable.
- **Empty state:** No record or no result.
- **Success copy:** Confirmed outcome, not optimistic request acceptance.
- **Loading:** What is blocked, what remains usable and when escalation begins.

## Screen behavior matrix A01-A27

| ID | Validation rules | Business rules | Error messages | Empty state | Success message | Loading behavior |
|---|---|---|---|---|---|---|
| A01 | Valid country, consent and contact format | Only approved launch countries proceed | “We could not start your account. Check your details or contact support.” | “No account yet. Start with your country and contact details.” | “Your secure registration has started.” | Load country policy; timeout preserves safe draft |
| A02 | OTP format, expiry, attempt count | Verification is separate from KYC approval | “That code is invalid or expired. Request a new one.” | “No verified contact yet.” | “Your contact method is verified.” | Show delivery pending and resend cooldown |
| A03 | Factor valid, session/device risk | Step-up for sensitive actions | “We could not verify this sign-in.” | “No account found. Create an NRI account.” | “You are securely signed in.” | Load session and context separately |
| A04 | PAN format and identity match | No duplicate account or silent overwrite | “We could not match this PAN to your details.” | “PAN verification has not started.” | “Your PAN is linked for verification.” | Provider lookup; show source pending |
| A05 | Country, residency, TIN requirements | Country context affects eligibility | “We need more information about your tax residency.” | “Tax residency is not yet provided.” | “Your country and tax context are saved.” | Policy check with source date |
| A06 | Valid path available | CKYC fast-track only when eligible | “This verification method is temporarily unavailable.” | “No verification path is available yet.” | “Your verification path is ready.” | Fetch CKYC/vendor capability |
| A07 | File type, size, quality, expiry | Evidence remains pending until review | “This document could not be accepted. Check the required evidence.” | “No documents uploaded.” | “Your document was received for review.” | Upload progress; retain safe draft |
| A08 | Consent, liveness, session completion | Failed video does not imply rejected identity | “The verification session could not be completed.” | “No video session scheduled.” | “Your verification session was submitted.” | Schedule/session status with timeout |
| A09 | State source and safe reason | AML-sensitive details are restricted | “Your verification needs additional review.” | “No verification history yet.” | “Your verification is complete.” | Show owner, SLA and last update |
| A10 | Required fields, identifiers, declaration | FATCA/CRS status affects onboarding | “Please review the highlighted tax information.” | “No declaration submitted.” | “Your declaration was submitted for review.” | Validate and save version |
| A11 | All required answers, questionnaire version | Profile is not financial advice | “Please complete the remaining questions.” | “No risk profile yet.” | “Your risk profile was recorded.” | Calculate with version/status |
| A12 | Bank details and ownership | Supported bank/account type required | “We could not verify this bank account.” | “Add a verified bank account to continue.” | “Bank account added for verification.” | Poll verification; no payment action |
| A13 | Verification state only | Verified does not equal payment compatibility | “Verification is taking longer than expected.” | “No bank verification request yet.” | “Your bank account is verified.” | Show pending and next update |
| A14 | Compatible account/folio | NRE/NRO context locked to action | “This account cannot be used for this action.” | “No compatible account found.” | “Account context confirmed.” | Policy compatibility check |
| A15 | Identity, relationship, allocation, guardian | Nominee is not joint ownership | “We need more information before saving this nominee.” | “No nominee has been added.” | “Nominee details were recorded.” | Validate relationship and folio |
| A16 | Verified recovery channel and ownership evidence | Email recovery does not bypass identity verification | “We could not verify ownership of this account.” | “No email recovery request yet.” | “Your recovery request was submitted.” | Send recovery link/status; do not expose account details |
| A17 | Verified identity and new mobile factor | Number change requires step-up and old-channel handling | “We could not verify this mobile recovery request.” | “No mobile recovery request yet.” | “Your mobile recovery request was submitted.” | OTP/provider/review state |
| A18 | Device identity and step-up | Lost device must be revoked before trust is restored | “This device could not be verified.” | “No device recovery request.” | “Device recovery is in progress.” | Risk and identity checks load separately |
| A19 | Session authorization | View only own sessions; revoke is audited | “Active sessions could not be loaded.” | “No other active sessions.” | “Session was revoked.” | Load sessions with last-seen timestamps |
| A20 | Device ownership and revocation | Trusted status is not permanent identity approval | “This device could not be revoked.” | “No trusted devices.” | “Trusted-device status updated.” | Device registry loading |
| A21 | Ownership evidence, recovery factor, rate limit | Recovery cannot bypass KYC or security hold | “We need more information to recover your account.” | “No recovery request started.” | “Your account recovery request was received.” | Verification and case creation pending |
| A22 | Case ID and recovery permission | Do not reveal sensitive security reasons | “Recovery is taking longer than expected.” | “No recovery review yet.” | “Your account recovery is complete.” | Show owner/SLA and last update |
| A23 | Account number/type/bank selection | Only supported account types can be linked | “Check the account details and try again.” | “No account being added.” | “Bank details were submitted for verification.” | Validate fields and bank capability |
| A24 | Ownership, account type and evidence | Verified does not equal action compatibility | “We could not verify this bank account.” | “Verification has not started.” | “Bank verification is complete.” | Poll bank/gateway callback |
| A25 | Failure reason and resubmission eligibility | Preserve prior verified accounts and evidence | “This bank account could not be verified.” | “No failed verification.” | “A new verification request was submitted.” | Load failure reason and retry eligibility |
| A26 | Bank/country/account compatibility | Unsupported bank cannot be forced through payment | “This bank is not supported for this action.” | “No supported bank selected.” | “Choose a supported bank to continue.” | Load supported-bank policy |
| A27 | Account, folio, scheme and transaction compatibility | Context must be locked before money action | “This account cannot be used for this action.” | “No compatible account found.” | “Account compatibility is confirmed.” | Evaluate policy and source freshness |

## Screen behavior matrix B01-B29

| ID | Validation rules | Business rules | Error messages | Empty state | Success message | Loading behavior |
|---|---|---|---|---|---|---|
| B01 | Permission and context integrity | Prioritize risk/deadline over marketing | “Some information is temporarily unavailable.” | “Your account is ready. Complete setup to see your portfolio.” | “Your latest account updates are shown.” | Independent domain loading; show freshness |
| B02 | Eligible filters and search | Do not show ineligible product as actionable | “Fund information is temporarily unavailable.” | “No eligible funds match these criteria.” | “Eligible funds are ready to review.” | Catalogue and policy load separately |
| B03 | Source fields and as-of date | Historical performance is not a guarantee | “Some fund details are unavailable.” | “This information is not available yet.” | “Fund details are current as of [date].” | Field-level loading and stale labels |
| B04 | Comparable schemes/metrics | No false ranking or advice | “These funds cannot be compared on this measure.” | “Select eligible funds to compare.” | “Comparison is ready.” | Load metrics per scheme |
| B05 | Amount, account, disclosure, cut-off | Confirmation does not equal allotment | “This order could not be prepared.” | “No eligible investment context.” | “Review complete. Confirm to continue.” | Revalidate policy before confirmation |
| B06 | Payment authorization and return | Payment and order are separate states | “Payment status is still being confirmed.” | “No payment attempt yet.” | “Payment was received for reconciliation.” | Poll safely; prevent duplicate action |
| B07 | Order permission and state | Completed requires source confirmation | “We are still checking the order status.” | “No orders yet.” | “Your order outcome is confirmed.” | Timeline loads event-by-event |
| B08 | Amount/date/frequency/mandate | SIP active only after mandate approval | “Your mandate could not be approved.” | “No SIP set up yet.” | “Your SIP is set up for review/activation.” | Mandate status with expected timeline |
| B09 | Pause/edit/cancel timing | Existing debit may not be cancellable | “This change could not be applied to the next debit.” | “No active SIPs.” | “Your SIP change was recorded.” | Confirm effective cycle |
| B10 | Holding, amount/units, account | Redemption requires current holding | “We could not load redemption details.” | “No redeemable holdings.” | “Redemption details are ready to review.” | Load holding, tax and account separately |
| B11 | Tax/payout/context acknowledgment | Estimate is not final tax liability | “We need a tax or payout review before continuing.” | “No redemption review yet.” | “Your redemption request was submitted.” | Calculate inputs and show source freshness |
| B12 | Source/target/account/linked legs | Switch is redemption plus purchase | “This switch could not be prepared.” | “No eligible switch source.” | “Switch instructions were submitted.” | Load both legs and tax context |
| B13 | Schedule/source/target | Future scope; cycle-level state required | “Scheduled transfer is not available.” | “No STP schedules.” | “STP schedule created for review.” | Schedule validation |
| B14 | Schedule/holding/payout | Future scope; no income guarantee | “Scheduled withdrawal could not be created.” | “No SWP schedules.” | “Withdrawal schedule created for review.” | Payout and schedule validation |
| B15 | Payment reference and order linkage | Pending payment blocks duplicate authorization | “Payment is still being confirmed.” | “No pending payment.” | “Payment status was updated.” | Poll gateway/order state with SLA |
| B16 | Payment method and retry eligibility | Retry only when duplicate side effect is prevented | “Payment failed. Do not retry if your bank shows a debit.” | “No failed payment.” | “A new payment attempt was started.” | Gateway response and reconciliation loading |
| B17 | Request/correlation ID and timeout threshold | Timeout is not payment failure | “We could not confirm the gateway response yet.” | “No gateway timeout.” | “Gateway response received.” | Show pending and prevent repeat authorization |
| B18 | Duplicate reference and payment ownership | Do not submit another order while duplicate is investigated | “We found more than one payment attempt.” | “No duplicate payment detected.” | “Duplicate payment review was created.” | Reconciliation and case state |
| B19 | Order/payment relationship | Order may be cancelled or held until payment resolved | “Order was created but payment was not confirmed.” | “No unmatched order.” | “Order and payment states are reconciled.” | Load both ledgers independently |
| B20 | Payment reference and order status | Payment success does not equal order completion | “Payment was received; order status is pending.” | “No payment/order exception.” | “Order status was confirmed.” | Poll execution/RTA with owner/SLA |
| B21 | Payment/order/execution references | Only authorized operators can correct/reconcile | “Records remain unmatched and are under review.” | “No reconciliation item.” | “Reconciliation outcome was recorded.” | Compare sources and show evidence |
| B22 | Refund reference and expected route | Refund is not complete until bank/gateway confirmation | “Your refund is being processed.” | “No pending refund.” | “Refund was confirmed.” | Track gateway and bank confirmation |
| B23 | Refund reference and amount | Refund completion must be evidence-backed | “Refund completion could not be confirmed.” | “No completed refund.” | “Refund completed for [amount].” | Load financial evidence and receipt |
| B24 | Rejection reason and retry eligibility | Rejected order cannot be retried blindly | “Your order was rejected. Review the reason before trying again.” | “No rejected orders.” | “A corrected order was submitted.” | Load execution reason and alternatives |
| B25 | Order validity and cutoff/calendar | Expired order is not active or payable | “This order has expired.” | “No expired orders.” | “A new order can be prepared.” | Calendar and execution status |
| B26 | Cutoff timestamp and local time | Next-business-day NAV requires acknowledgement | “The cutoff has passed for this order.” | “No cutoff exception.” | “Your order was updated for the next eligible window.” | Load IST/local time and holiday calendar |
| B27 | Idempotency/order references | Duplicate order requires hold and reconciliation | “A similar order is already being processed.” | “No duplicate order detected.” | “Duplicate order review was recorded.” | Compare commands and source states |
| B28 | Cancellation eligibility and authorization | Cancellation cannot be offered after irreversible stage | “This order can no longer be cancelled.” | “No cancelled orders.” | “Order cancellation was recorded.” | Load order stage and refund state |
| B29 | Partial units/legs and payout state | Partial outcome must not be shown as full completion | “Part of this order is still being confirmed.” | “No partial orders.” | “Partial order outcome was recorded.” | Load leg/allotment/reconciliation data |

## Screen behavior matrix C01-C14

| ID | Validation rules | Business rules | Error messages | Empty state | Success message | Loading behavior |
|---|---|---|---|---|---|---|
| C01 | Holdings permission and source integrity | Stale data labelled, not hidden | “Portfolio data needs to be refreshed.” | “No holdings yet. Your investments will appear after allotment.” | “Portfolio updated as of [date].” | RTA sources load independently |
| C02 | Holding exists and is current enough | Action only if holding is actionable | “Holding details are temporarily unavailable.” | “No transaction history for this holding.” | “Holding details loaded.” | Load holding, tax and actions independently |
| C03 | Entity permission and date filters | Immutable financial history | “Transactions could not be loaded.” | “No transactions for this period.” | “Transaction history is ready.” | Paginated history with source status |
| C04 | Report type/year/purpose | Report name must match purpose | “We could not prepare this report.” | “No reports available for this period.” | “Choose a report to generate or download.” | Load report catalogue |
| C05 | Valid request and permission | Link/share expires and is audited | “Report generation is taking longer than expected.” | “No report request yet.” | “Your report is ready.” | Job status with cancel/retry where safe |
| C06 | Tax year/lots/source | Rule version locked | “Some transactions need reconciliation before calculation.” | “No capital gains data for this period.” | “Capital gains report generated.” | Batch calculation progress |
| C07 | Purpose/year/residency/data completeness | Tax-ready is not tax advice | “Your tax package is incomplete.” | “No tax package available yet.” | “Tax package generated for [purpose].” | Assemble sources with completeness status |
| C08 | Evidence type/validity/country | Approved, applied and expired separate | “Your evidence needs correction or review.” | “No DTAA evidence submitted.” | “Evidence status updated.” | Review and external application pending |
| C09 | FY/source/account/forms | Guidance not a legal guarantee | “Repatriation details need review.” | “No repatriation activity this FY.” | “Repatriation summary is ready.” | Ledger and payout data load separately |
| C10 | Field format and impact dependencies | Material change can trigger re-KYC | “We could not save this change.” | “Profile information is incomplete.” | “Profile change submitted.” | Save profile then show dependent checks |
| C11 | File/metadata/permission | Purpose-specific approval and retention | “This document could not be accepted.” | “No documents uploaded.” | “Document accepted for [purpose].” | Upload/OCR/review stages |
| C12 | Preference scope and step-up | Transactional alerts separate from marketing | “Settings could not be updated.” | “Default preferences are active.” | “Your preference is now effective.” | Show propagation status |
| C13 | Notification permission and deep link | Notification is not proof of receipt | “Notifications are temporarily unavailable.” | “You have no notifications.” | “Notification status is recorded.” | Feed and delivery state separate |
| C14 | Role scope and consent | Nominee, joint holder and delegated user differ | “This access change needs review.” | “No family access is configured.” | “Access change submitted.” | Invitation/consent pending |

## Screen behavior matrix D01-E10

| ID | Validation rules | Business rules | Error messages | Empty state | Success message | Loading behavior |
|---|---|---|---|---|---|---|
| D01 | Search query and content applicability | Approved content only | “Help search is temporarily unavailable.” | “No answer found. Contact support.” | “Here is guidance for your question.” | Search/index load |
| D02 | Authentication, category and context | Case must have owner/SLA | “We could not create your case.” | “No issue details provided yet.” | “Your case was created: [ID].” | Create case and context package |
| D03 | Case permission and message | Closure requires outcome/record | “Case status could not be loaded.” | “No support cases yet.” | “Your case was resolved.” | Timeline and owner load |
| D04 | Consent, reason, availability | RM does not equal tax/legal advice | “No RM is available right now.” | “No RM assigned.” | “Your RM request was submitted.” | Assignment/contact pending |
| E01 | Staff role and queue access | Queue actions audited | “Queue data is temporarily unavailable.” | “No work is assigned.” | “Task claimed.” | Queue refresh and SLA load |
| E02 | Evidence completeness and reviewer authority | Maker-checker and EDD policy | “This review cannot be completed yet.” | “No review assigned.” | “Review decision recorded.” | Evidence and screening load |
| E03 | Field-level access | Minimum necessary data | “Some customer data is restricted.” | “No matching customer or case.” | “Customer context loaded.” | Progressive data by permission |
| E04 | Reconciliation keys and authority | No silent financial correction | “Records could not be reconciled.” | “No mismatches found.” | “Reconciliation completed.” | Source comparison loading |
| E05 | Required fields and effective date | Maker-checker/versioning | “Policy change could not be saved.” | “No draft rule changes.” | “Policy version submitted for approval.” | Source/master load |
| E06 | Evidence, rule and reviewer authority | Tax decisions versioned and auditable | “Tax review requires more evidence.” | “No tax reviews assigned.” | “Tax decision recorded.” | Calculation/evidence load |
| E07 | Reference matching and approval authority | Finance cannot alter compliance state | “Payment records remain unmatched.” | “No reconciliation items.” | “Financial reconciliation completed.” | Gateway/bank/order comparison |
| E08 | Case access and response policy | Support cannot give unapproved advice | “Case action could not be completed.” | “No assigned cases.” | “Customer update sent.” | Case/timeline load |
| E09 | Audit query and export authorization | Access to audit is itself audited | “Audit results could not be loaded.” | “No events match this query.” | “Audit export created.” | Query/export progress |
| E10 | Metric filter and role scope | Analytics is not regulated audit evidence | “Service-health data is unavailable.” | “No data for selected period.” | “Service-health view updated.” | Metric/source freshness |

# SECTION 6: UX Copy Inventory

## Copy architecture

Every regulated or financial copy block should have:

- Copy ID.
- Audience and country scope.
- Owner.
- Effective date.
- Source/legal review.
- Version.
- Trigger.
- Fallback.

## 6.1 Global copy patterns

| Copy ID | Surface | Title | Description/helper | Primary CTA | Secondary CTA | Legal or trust text |
|---|---|---|---|---|---|---|
| CP-001 | Registration | Start your NRI investment account | “We’ll use your country and tax residency to show what applies to you.” | Continue | Sign in | “Eligibility is subject to verification and applicable rules.” |
| CP-002 | Verification | Verify your contact details | “This protects your account and helps us send important updates.” | Verify | Change details | “Verification does not complete KYC.” |
| CP-003 | KYC | Verify your identity | “Use the path available for your current KYC status.” | Start verification | Need help | “Your information is reviewed under applicable KYC and AML requirements.” |
| CP-004 | Review | Your request is under review | “We’ll update you when the review is complete.” | View status | Contact support | “Review times may depend on external providers or additional checks.” |
| CP-005 | Account | Choose the account for this action | “The account type affects how this investment is processed.” | Confirm account | Add account | “NRE/NRO treatment is subject to applicable rules and verified account data.” |
| CP-006 | Eligibility | This option is not available for your profile | “Your country, account or current verification status affects eligibility.” | View alternatives | Contact support | “Availability can change by country, scheme and regulation.” |
| CP-007 | Fund detail | Review before you invest | “Consider risk, costs, eligibility, timing and your own circumstances.” | Start investment | Compare funds | “Past performance is not indicative of future results.” |
| CP-008 | Payment | Confirm payment details | “Payment received does not necessarily mean units have been allotted.” | Authorize payment | Cancel | “The applicable NAV and settlement depend on cut-off and external processing.” |
| CP-009 | Pending | We’re checking your request | “Do not submit another request while this one is being confirmed.” | View status | Contact support | “Status may depend on bank, exchange or RTA confirmation.” |
| CP-010 | Tax estimate | Estimated tax and proceeds | “This is an estimate based on the information currently available.” | Review and continue | Get tax help | “This is not tax advice or a final tax liability.” |
| CP-011 | DTAA | Manage treaty evidence | “Submit the required evidence for review before relying on treaty treatment.” | Upload evidence | Learn more | “Treatment depends on applicable law, validity and operational application.” |
| CP-012 | Report | Choose a report purpose | “Select the report that matches what you need it for.” | Generate report | Learn about reports | “Report completeness depends on source data and selected period.” |
| CP-013 | Support | Tell us what happened | “We’ll attach the relevant context so you do not need to repeat it.” | Create case | Search help | “We may request additional verification before discussing account details.” |
| CP-014 | RM | Connect with an RM | “An RM can help with permitted assisted service; they do not replace tax or legal advice.” | Request contact | Continue yourself | “Any assisted transaction will be recorded with required disclosures.” |
| CP-015 | Logout | Sign out securely | “Signing out does not cancel pending transactions.” | Sign out | Stay signed in | “Pending actions continue according to their current status.” |

## 6.2 Validation and error copy

| Copy ID | Situation | Validation/error copy | Recovery CTA |
|---|---|---|---|
| CP-V01 | Required field | “Enter the required information to continue.” | Review field |
| CP-V02 | Invalid format | “Check the format and try again.” | Correct |
| CP-V03 | Mismatch | “These details do not match our verified records.” | Review details |
| CP-V04 | Expired evidence | “This document or consent has expired.” | Renew |
| CP-V05 | Provider unavailable | “This verification service is temporarily unavailable.” | Try again later |
| CP-V06 | Duplicate action | “This request is already being processed. Do not submit it again.” | View status |
| CP-V07 | Restricted | “This action is not available for your current country, account or status.” | View reason |
| CP-V08 | Suspended | “This action is temporarily paused while we complete a review.” | View status |
| CP-V09 | Offline | “You’re offline. Safe information remains available, but this action cannot be completed.” | Retry |
| CP-V10 | No results | “No eligible results match these details.” | Change criteria |
| CP-V11 | Incomplete source | “We need more information before this report can be completed.” | Review missing data |
| CP-V12 | Permission denied | “You do not have permission to view or change this information.” | Return |

## 6.3 Success copy

| Copy ID | Success message |
|---|---|
| CP-S01 | “Your contact details are verified.” |
| CP-S02 | “Your KYC submission was received for review.” |
| CP-S03 | “Your bank account is verified.” |
| CP-S04 | “Your investment order was submitted. Track its status here.” |
| CP-S05 | “Your payment was received and is being reconciled with the order.” |
| CP-S06 | “Your SIP mandate was approved. We’ll confirm the first debit.” |
| CP-S07 | “Your report is ready. It was generated for [purpose] and [tax year].” |
| CP-S08 | “Your document was accepted for [purpose] until [date].” |
| CP-S09 | “Your support case [ID] has been created. Your next update is due by [time].” |
| CP-S10 | “Your preference change is now effective.” |
| CP-S11 | “Your recovery request was received. We’ll update you by [time].” |
| CP-S12 | “Your bank account is ready for the selected action.” |
| CP-S13 | “Payment is still being confirmed. Do not submit it again.” |
| CP-S14 | “Your payment/order mismatch is under review.” |
| CP-S15 | “Your refund was completed for [amount].” |
| CP-S16 | “Your order was partially completed. Review the remaining status.” |

## 6.4 Recovery, bank and order copy

| Copy ID | Surface | Title | Description/helper | Primary CTA | Secondary CTA | Legal or trust text |
|---|---|---|---|---|---|---|
| CP-R01 | Forgot Email | Recover your email access | “We’ll verify that you own this account before changing a contact detail.” | Start recovery | Contact support | “Recovery does not change your investment or tax records.” |
| CP-R02 | Forgot Mobile | Recover your mobile access | “Use another verified method or request a security review.” | Continue | I need help | “A mobile change may require additional verification.” |
| CP-R03 | Device Recovery | Recover this device | “We’ll check the device and account before restoring trusted access.” | Verify device | Use another device | “Do not continue if you do not recognize this device.” |
| CP-R04 | Recovery Pending | Your recovery is under review | “Your request has an owner and next update time.” | View status | Contact support | “Security reviews may require additional verification.” |
| CP-R05 | Add Bank | Add a bank account | “Choose the account type and enter details exactly as held by your bank.” | Continue | Cancel | “Verification does not guarantee payment compatibility.” |
| CP-R06 | Unsupported Bank | This bank is not supported yet | “Choose another supported bank or contact support.” | View supported banks | Contact support | “Availability depends on bank and payment-provider capability.” |
| CP-R07 | Payment Pending | Payment status is being confirmed | “Do not submit another payment while we check this attempt.” | View order | Contact support | “A payment confirmation is not the same as unit allotment.” |
| CP-R08 | Payment Failed | Payment could not be completed | “If your bank shows a debit, do not retry. We’ll help reconcile it.” | View recovery | Try another method | “Your order will not be treated as completed until confirmed.” |
| CP-R09 | Duplicate Payment | We found more than one payment attempt | “We’re checking which payment, if any, is linked to the order.” | View reconciliation | Contact support | “Do not authorize another payment.” |
| CP-R10 | Order Pending | Payment received; order pending | “We are checking the execution status with the relevant provider.” | Track order | Contact support | “Payment receipt does not confirm allotment.” |
| CP-R11 | Refund Pending | Your refund is being processed | “We’ll update you when the refund is confirmed by the payment route.” | View refund status | Contact support | “Timing may depend on the bank or gateway.” |
| CP-R12 | Order Rejected | Your order was rejected | “Review the reason before preparing another order.” | View reason | Contact support | “A rejected order is not an investment confirmation.” |
| CP-R13 | Cutoff Missed | The cutoff has passed | “This order may receive the next eligible business-day treatment.” | Review next timing | Cancel | “Applicable NAV depends on processing rules.” |
| CP-R14 | Partial Order | Part of your order is complete | “Review completed, pending and any refund amounts separately.” | View details | Contact support | “This is not a full completion until all parts are confirmed.” |

# SECTION 7: Design Priority

## P0: MVP wireframing set

### Investor

A01 NRI Welcome and Registration Start; A02 Contact Verification; A03 Login; A04 PAN and Identity Verification; A05 Country and Tax Residency; A06 KYC Method Selection; A07 Document Capture and Upload; A08 Video KYC and IPV Session; A09 KYC Review Status; A10 FATCA and CRS Declaration; A11 Risk Profile; A12 Bank Account List; A13 Bank Verification Status; A14 NRE/NRO Context Confirmation; A16 Forgot Email; A17 Forgot Mobile; A18 Device Recovery; A19 Active Sessions; A20 Trusted Devices; A21 Account Recovery; A22 Recovery Pending; A23 Add Bank Account; A24 Verify Bank Account; A25 Bank Verification Failed; A26 Unsupported Bank; A27 NRE/NRO Compatibility; B01 Home Dashboard; B02 Fund Discovery; B03 Fund Details; B05 Investment Order Review; B06 Payment Authorization and Status; B07 Order Tracking; B08 SIP Setup, subject to mandate readiness; B15 Payment Pending; B16 Payment Failed; B17 Gateway Timeout; B18 Duplicate Payment; B19 Order Created but Payment Failed; B20 Payment Success but Order Pending; B21 Order Reconciliation; B22 Refund Pending; B23 Refund Completed; B24 Order Rejected; B25 Order Expired; B26 Cutoff Missed; B27 Duplicate Order; B28 Cancelled Order; B29 Partial Order; C01 Portfolio Overview; C02 Holding Details; C03 Transaction History; C04 Reports Hub; C05 Report Request and Status; C06 Capital Gains Report; C07 Tax Report Package; C10 Profile and Residency; C11 Documents and Expiry; D01 Help Center and Search; D02 Create Support Case; D03 Support Case Detail.

### Internal

E01 Operations Work Queue; E02 KYC and EDD Review; E03 Customer and Case Context; E04 Order and Reconciliation Workspace; E05 Scheme and Policy Master; E06 Tax and DTAA Review; E07 Finance and Refund Reconciliation; E08 Support Operations Console; E09 Audit and Risk Workspace.

## P1: V1 and important extension

B04 Compare Funds; B09 SIP Management; B10 Redemption Setup; B11 Redemption Review and Confirmation; B12 Switch Setup; C08 DTAA Status and Documents; C09 Repatriation Overview; C12 Settings and Consent; C13 Notifications Center; C14 Family and Access; D04 RM Connect; E10 Analytics and Service Health.

## P2: Future or gated

B13 STP Setup; B14 SWP Setup; country-specific US/Canada variants; full specialist/tax-service variants; advanced AI-assisted surfaces; broad household continuity; adjacent product modules.

# SECTION 8: Design Effort Estimation

## Effort definitions

- **Small:** One purpose, low dependency, few states, low regulatory complexity.
- **Medium:** Multiple states or dependencies; limited permissions and validation.
- **Large:** Multiple states, permissions, evidence, service recovery and cross-domain context.
- **XL:** Financial, tax, compliance, multi-party, asynchronous or high-consequence interaction.

## Effort by screen

| Effort | Screens |
|---|---|
| Small | C03 Transaction History; C13 Notifications Center; A13 Bank Verification Status; E01 queue filters; E10 metric filters |
| Medium | A01, A02, A03, A06, A09, A12, A13, A16, A17, A19, A20, A22, A25, A26, B02, B07, B15, B16, B17, B22, B23, B24, B25, B26, B28, C04, C05, C10, C11, D01, D02, D03, E08 |
| Large | A04, A05, A07, A10, A11, A14, A15, A18, A21, A23, A24, A27, B01, B03, B04, B05, B06, B09, B18, B19, B20, B27, B29, C01, C02, C12, C14, D04, E03, E05 |
| XL | A08, B08, B10, B11, B12, B13, B14, B21, C06, C07, C08, C09, E02, E04, E06, E07, E09 |

## Effort assumptions

Effort includes state planning, content, accessibility, permissions, error/recovery variants and cross-domain review. It excludes visual design-system creation, engineering implementation, vendor integration and legal approval time.

# SECTION 9: Recommended Wireframing Order

## Phase 0: Flow and state contract alignment

1. Confirm MVP screen tags and remove future flows from the first inventory.
2. Lock shared state vocabulary and customer-safe labels.
3. Lock NRI context, permission, source freshness and human ownership patterns.
4. Confirm approved copy boundaries for KYC, tax, DTAA, account context and regular plans.

**Why first:** Wireframes built before these foundations will encode inconsistent states and create rework across every domain.

## Phase 1: App shell and recovery foundation

1. A03 Login.
2. A01 NRI Welcome and Registration Start.
3. A02 Contact Verification.
4. B01 Home Dashboard.
5. D01 Help Center and Search.
6. D02 Create Support Case.
7. D03 Support Case Detail.

**Why:** These establish navigation, authentication, context, global recovery, help and the service ownership model used by every later screen.

## Phase 2: Compliance and activation

1. A05 Country and Tax Residency.
2. A04 PAN and Identity Verification.
3. A06 KYC Method Selection.
4. A07 Document Capture and Upload.
5. A08 Video KYC and IPV Session.
6. A09 KYC Review Status.
7. A10 FATCA and CRS Declaration.
8. A11 Risk Profile.
9. A12 Bank Account List.
10. A13 Bank Verification Status.
11. A14 NRE/NRO Context Confirmation.

**Why:** These screens determine whether a customer can safely access the investment product. They also establish the highest-risk forms, evidence, permissions, errors and pending states.

## Phase 3: Core investment

1. B02 Fund Discovery.
2. B03 Fund Details.
3. B05 Investment Order Review.
4. B06 Payment Authorization and Status.
5. B07 Order Tracking.
6. C01 Portfolio Overview.
7. C02 Holding Details.
8. C03 Transaction History.

**Why:** This sequence validates the core product promise: find an eligible product, understand it, act from the right account, track the outcome and see authoritative ownership.

## Phase 4: Reporting and evidence

1. C04 Reports Hub.
2. C05 Report Request and Status.
3. C06 Capital Gains Report.
4. C07 Tax Report Package.
5. C10 Profile and Residency.
6. C11 Documents and Expiry.

**Why:** Reporting and document continuity create repeat value and expose data freshness, tax language, export, permission and accessibility requirements before broader expansion.

## Phase 5: Retention and assisted service

1. B08 SIP Setup.
2. B09 SIP Management.
3. C12 Settings and Consent.
4. C13 Notifications Center.
5. C14 Family and Access.
6. D04 RM Connect.
7. E10 Analytics and Service Health.

**Why:** These depend on proven identity, consent, payment, support and service-state foundations. Designing them earlier would obscure the core activation problems.

## Phase 6: V1/V2 advanced flows

1. B10 Redemption Setup.
2. B11 Redemption Review and Confirmation.
3. C08 DTAA Status and Documents.
4. C09 Repatriation Overview.
5. B12 Switch Setup.
6. B13 STP Setup.
7. B14 SWP Setup.
8. Advanced country and specialist variants.

**Why:** These flows have the highest legal, tax, multi-leg, scheduling and service-recovery complexity. They should follow validated transaction, portfolio, report and support patterns.

## Wireframing quality gate

Before a screen enters Figma, confirm:

- Parent module and screen ID.
- Primary and alternate entry points.
- Permission and field-masking rules.
- All required states.
- Backend source and freshness.
- Business and regulatory rules.
- Error/recovery owner.
- Notification behavior.
- Analytics events.
- Approved copy.
- Accessibility requirements.
- P0/P1/P2 release scope.

## Final Planning Decision

The screen inventory is sufficiently defined for **P0 planning and controlled wireframing preparation**, provided the P0 state, compliance, source-of-truth and permission gates from the previous architecture review are treated as acceptance criteria. It is not a visual design specification and should not be used to infer layouts, styling or component placement.
