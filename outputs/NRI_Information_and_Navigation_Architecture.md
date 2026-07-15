# NRI DIY Mutual Fund Platform
## Information Architecture and Navigation Architecture

**Role:** Principal Information Architect and UX Architect  
**Status:** Foundation for UX architecture and future product requirements  
**Constraint:** No UI, screens, wireframes or user flows are defined

## Architecture Basis

This document synthesizes:

- [Product Discovery: BRD Reverse Engineering](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md)
- [Market Intelligence and Competitive Analysis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Market_Intelligence_Competitive_Analysis.md)
- [User Research Synthesis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_User_Research_Synthesis.md)
- [Product Strategy](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Strategy.md)
- [Service Blueprint](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Service_Blueprint.md)

## Architecture Position

The product has two related but distinct information architectures:

1. **Investor architecture:** Organized around recurring responsibilities: know what applies, invest, understand portfolio, prepare tax evidence, maintain continuity and get help.
2. **Internal architecture:** Organized around queues, cases, policy, reconciliation, controls, evidence and service-level responsibility.

Internal system complexity must not leak into investor navigation. Conversely, customer context, state history and evidence must not be lost when a case enters an internal workspace.

## Unresolved Architecture Gates

- Launch countries and country-specific product eligibility are not final.
- Execution, KYC, AML, eSign, payment, CRM, helpdesk and analytics vendors are not fully selected.
- Tax and DTAA rules require versioned legal approval.
- US and Canada require separate PFIC/FAPI and product-availability gates.
- Joint-holder, nominee and family authorization models require legal and research validation.
- The final retention, residency, deletion and data portability matrix is not yet signed.

# SECTION 1: Product Information Architecture

## 1.1 Application hierarchy

### A. Investor application

1. **Home**
   - Attention and required actions
   - Pending and recently completed activity
   - Portfolio snapshot
   - Upcoming documents, tax and SIP obligations
   - Service status and important alerts
   - Context: country, tax residency and active account

2. **Invest**
   - Explore eligible mutual funds
   - Browse by category
   - Browse by AMC
   - Compare eligible schemes
   - Scheme details
   - NFO discovery, when in scope
   - Investment intent
     - Lumpsum
     - SIP
     - Switch
     - STP
     - SWP
     - Redemption
   - Orders and order status

3. **Portfolio**
   - Total portfolio
   - NRE / NRO segmentation
   - Holdings
   - Scheme detail
   - Transactions
   - Performance and gains
   - External or held-away assets, when available
   - Portfolio data freshness
   - Repatriation context

4. **Tax and Reports**
   - Tax overview
   - TDS
   - Capital gains
   - Tax-year selector
   - DTAA status
   - Tax estimates
   - Repatriation ledger
   - Transaction report
   - Annual portfolio statement
   - Tax-ready export
   - CA or specialist handoff

5. **Documents and Profile**
   - Personal identity
   - Country and tax residency
   - PAN and tax identifiers
   - Overseas and Indian addresses
   - NRE / NRO bank accounts
   - KYC status
   - FATCA / CRS
   - Passport, visa or OCI
   - Document expiry
   - Communication preferences
   - Consent and data-sharing settings
   - Security and devices

6. **Family and Access**
   - Joint holders
   - Roles and permissions
   - Nominees
   - Guardians
   - Household context
   - Continuity readiness
   - Access history
   - Delegated specialist access

7. **Help and Service**
   - Searchable help
   - Contact support
   - Case history
   - Case status
   - Service timelines
   - RM contact, if assigned
   - Tax consultant or specialist contact, if consented
   - Complaints and escalation
   - Incident status

### B. Internal operations application

1. **Work Queue**
   - My assigned cases
   - Team queue
   - SLA at risk
   - SLA breached
   - P0 incidents
   - Unmatched transactions
   - Pending customer action

2. **Customer and Case Context**
   - Customer profile
   - Tax residency
   - Account and folio relationships
   - Documents and consent
   - Orders, payments and holdings
   - Timeline
   - Support history
   - Prior decisions
   - Related cases

3. **KYC and AML**
   - KYC review
   - CKYC results
   - Document verification
   - Video and IPV
   - PEP / sanctions / adverse media
   - EDD
   - Re-KYC
   - Resident conversion
   - Review history

4. **Orders and Reconciliation**
   - Order monitoring
   - Payment matching
   - Execution status
   - RTA status
   - Allotment
   - Refunds
   - Unmatched items
   - Duplicate detection
   - Cut-off incidents

5. **Scheme and Policy Masters**
   - AMC
   - Scheme
   - Plan and option
   - NRI country eligibility
   - Account-type eligibility
   - Risk and disclosure fields
   - NAV and cut-off
   - Tax applicability
   - Effective dates
   - Change history

6. **Tax and DTAA Operations**
   - Tax rules
   - Tax-year configuration
   - TDS configuration
   - TRC and Form 10F review
   - DTAA approval
   - Expiry and renewal
   - Tax report correction
   - CA handoff

7. **Finance Operations**
   - Payment reconciliation
   - Refunds
   - Payouts
   - TDS records
   - Commission and revenue
   - Partner settlement
   - Repatriation ledger
   - Financial export

8. **Support and CRM**
   - Cases
   - Contact reasons
   - Knowledge base
   - Templates
   - RM assignment
   - CA lead assignment
   - Consent
   - Service quality
   - Complaints

9. **Audit, Risk and Compliance**
   - Audit events
   - Access logs
   - Approvals and overrides
   - Rule changes
   - Model decisions
   - Regulatory reports
   - Privacy requests
   - Incidents

10. **Analytics and Service Health**
    - Funnel
    - Cohort
    - State conversion
    - Exception rate
    - SLA performance
    - Vendor performance
    - Customer effort
    - Trust and comprehension
    - Cost per completed action

### C. Specialist and partner workspace

1. Assigned customer or lead
2. Consent scope
3. Context package
4. Required documents
5. Open question
6. Service status
7. Secure communication
8. Outcome and disposition
9. Access expiry
10. Audit history

## 1.2 Feature grouping by responsibility

| Responsibility | Primary domain | Supporting domains |
|---|---|---|
| Know whether I can act | Invest / Profile | Eligibility, KYC, country policy, tax residency |
| Invest from the right source | Invest / Accounts | Bank, NRE/NRO, payment, mandate |
| Understand what happened | Home / Orders | Order, payment, RTA, notifications, support |
| Know what I own | Portfolio | Holdings, transactions, freshness, reconciliation |
| Prepare tax evidence | Tax and Reports | Tax, TDS, capital gains, DTAA, documents |
| Move money responsibly | Tax and Reports / Portfolio | Repatriation, redemption, finance, forms |
| Keep records current | Documents and Profile | KYC, consent, expiry, country change |
| Protect family continuity | Family and Access | Joint holder, nominee, guardian, permissions |
| Get the right help | Help and Service | Support, RM, CA, compliance and case context |
| Manage service reliability | Operations | Queues, reconciliation, vendor, incident, audit |

## 1.3 Module hierarchy

### Identity and access

Identity

→ Customer  
→ Login credential  
→ Device  
→ Session  
→ Authentication event  
→ Consent  
→ Communication preference

### Investor profile

Investor profile

→ Personal identity  
→ Country of residence  
→ Tax residency  
→ PAN and tax identifiers  
→ Overseas address  
→ Indian address  
→ NRE/NRO account relationship  
→ Risk profile  
→ KYC status

### Product and eligibility

Investment product

→ AMC  
→ Scheme  
→ Plan  
→ Option  
→ Asset category  
→ Risk classification  
→ Country eligibility  
→ Account-type eligibility  
→ Tax treatment  
→ Cut-off and calendar  
→ Fee and disclosure

### Execution

Investment instruction

→ Intent  
→ Order  
→ Order leg  
→ Payment instruction  
→ Mandate  
→ Execution submission  
→ Allotment  
→ Settlement  
→ Refund or correction

### Ownership and reporting

Portfolio

→ Folio  
→ Holding  
→ Unit lot  
→ Transaction  
→ Cost basis  
→ Gain  
→ Tax event  
→ Report

### Compliance and continuity

Compliance context

→ Document  
→ Document version  
→ KYC review  
→ AML screening  
→ EDD case  
→ DTAA case  
→ TRC  
→ Form 10F  
→ Nominee  
→ Joint-holder mandate  
→ Country-change case

### Service

Service case

→ Contact  
→ Issue  
→ Case  
→ Task  
→ Assignment  
→ SLA  
→ Escalation  
→ Resolution  
→ Complaint  
→ Customer satisfaction signal

## 1.4 Parent-child relationships

| Parent | Child | Relationship rule |
|---|---|---|
| Investor | Profile | One current profile with historical versions |
| Investor | Device | One-to-many, revocable |
| Investor | Tax residency | One-to-many with effective dates |
| Investor | Bank account | One-to-many with ownership and account type |
| Investor | Document | One-to-many with type, version and validity |
| Investor | Portfolio | One-to-many by account or folio relationship |
| Investor | Joint holder | Many-to-many through account relationship |
| Investor | Nominee | One-to-many by folio or account, subject to rules |
| AMC | Scheme | One-to-many |
| Scheme | Plan | One-to-many |
| Plan | Option | One-to-many |
| Investor | Order | One-to-many |
| Order | Payment | One-to-many attempts; one effective settlement relationship |
| Order | Execution submission | One-to-many attempts or vendor legs |
| Order | Allotment | Zero-to-many, including partial outcomes |
| Portfolio | Holding | One-to-many |
| Holding | Transaction | One-to-many |
| Transaction | Tax event | Zero-to-many depending on transaction and jurisdiction |
| Investor | Service case | One-to-many |
| Service case | Task | One-to-many |
| Service case | Notification | One-to-many |
| Service case | Audit event | One-to-many |
| Rule set | Rule version | One-to-many, never overwrite effective history |
| Rule version | Eligibility decision | One-to-many |

## 1.5 Taxonomy

### Investment taxonomy

- Asset type
  - Mutual fund
- Scheme category
  - Equity
  - Debt
  - Hybrid
  - Solution-oriented
  - Other approved category
- Plan
  - Regular
  - Direct, when supported
- Option
  - Growth
  - IDCW payout
  - IDCW reinvestment
- Transaction type
  - Lumpsum
  - SIP
  - Redemption
  - Switch
  - STP
  - SWP
  - NFO

### NRI context taxonomy

- Country of residence
- Tax residency
- Account source
  - NRE
  - NRO
  - Other approved source
- Repatriability
  - Repatriable
  - Non-repatriable
  - Review required
- Regulatory context
  - FATCA
  - CRS
  - PEP
  - Sanctions
  - EDD

### Service taxonomy

- Case type
  - Registration
  - KYC
  - Bank
  - Payment
  - Order
  - Portfolio
  - Tax
  - DTAA
  - Repatriation
  - Document
  - Family and nominee
  - Security
  - Complaint
- Severity
  - P0
  - P1
  - P2
  - P3
- State
  - Loading
  - Pending
  - Verification
  - Approved
  - Rejected
  - Expired
  - Suspended
  - Retry
  - Escalated
  - Completed

### Content taxonomy

- Guidance
  - NRI eligibility
  - NRE/NRO
  - Tax
  - DTAA
  - Repatriation
  - KYC
  - Investing education
- Transaction evidence
  - Order confirmation
  - Allotment
  - Refund
  - Payment
  - Statement
- Compliance evidence
  - KYC
  - FATCA/CRS
  - TRC
  - Form 10F
  - TDS
  - Capital gains
- Service content
  - Status
  - Explanation
  - Next action
  - SLA
  - Escalation

## 1.6 Content architecture

| Content type | Purpose | Owner | Versioning | Customer use |
|---|---|---|---|---|
| Rule explanation | Explain eligibility or restriction | Compliance + Product | Effective date and source | Understand before acting |
| Tax explanation | Explain estimate, rate or limitation | Tax + Legal | Rule version and review date | Interpret reports and actions |
| Scheme content | Describe product, risk, performance and costs | Product + AMC source | Source date | Compare eligible options |
| Transaction evidence | Prove what happened | Operations + Finance | Immutable event history | Download or share |
| Help article | Explain routine questions | Support + Compliance | Content approval and expiry | Self-service |
| Notification template | Trigger an action or status update | Product + Compliance | Template version | Receive consistent communication |
| Document | Prove identity, tax or authorization | Customer / reviewer | Document version and validity | Submit, review or renew |
| Case communication | Resolve a specific issue | Assigned team | Case history | Recover service |
| Report | Assemble verified financial evidence | Reporting + Tax | Calculation and source version | Self, CA or filing |

### Content architecture rules

1. Every rule explanation has source, effective date, owner and review date.
2. Every estimate distinguishes inputs, assumptions and finality.
3. Every report identifies tax year, data freshness and calculation version.
4. Every help article has a permitted audience and escalation boundary.
5. Every document has type, issuer, owner, validity and retention policy.
6. Customer content and internal policy may differ in detail but must not contradict.

# SECTION 2: Navigation Architecture

## 2.1 Navigation model recommendation

Use a **responsibility-led, context-aware navigation model**:

- Primary navigation contains stable investor responsibilities.
- Contextual navigation exposes the next relevant task within a domain.
- Global search finds entities, evidence and guidance.
- Quick actions expose high-frequency or urgent tasks without duplicating the full hierarchy.
- Internal navigation is queue-led, not feature-led.

This avoids two failures:

- A product-category navigation that makes NRI tax and account context invisible.
- A dashboard navigation that becomes a collection of unrelated cards and alerts.

## 2.2 Bottom navigation

### Recommended investor mobile bottom navigation

1. **Home**
2. **Invest**
3. **Portfolio**
4. **Tax**
5. **Help**

Profile, Documents, Family and Settings should be accessible through Home context and a persistent account area rather than occupy a permanent bottom-navigation slot.

### Why this pattern

- Five items is within a manageable mobile recognition range.
- Each item maps to a recurring job.
- Tax is first-class because it is a core NRI value proposition, not a buried report.
- Help is first-class because recovery is part of the service.
- Profile and settings are lower-frequency and should not compete with money tasks.

### Bottom-navigation rules

- Preserve position and meaning across signed-in states.
- Do not change labels by country.
- Show badges only for meaningful action or risk, not marketing.
- Do not use a badge as the only indication of a financial or compliance issue.
- Opening a deep link may temporarily emphasize a destination but must preserve back navigation.
- Internal users should not use the investor bottom navigation.

## 2.3 Top navigation

### Investor top-level context

The top area should consistently expose:

- Active country and tax-residency context.
- Active account or portfolio context where relevant.
- Notifications or required-action status.
- Help entry.
- Account/security access.

### Top-navigation rules

- Country and tax context is persistent context, not a transient filter.
- Context changes require explicit confirmation where they change eligibility or tax meaning.
- Top-level navigation must not imply that a country switch changes legal status automatically.
- Current state and last-updated time should be available for data-sensitive domains.

### Internal top navigation

Internal users require:

- Workspace and role.
- Current queue.
- Global search.
- SLA indicator.
- Incident or service-health indicator.
- User and access control.

## 2.4 Drawer / side menu

### Investor side menu

Use for lower-frequency account and continuity areas:

- Profile and tax residency
- Bank accounts
- Documents and KYC
- Family and access
- Nominees
- Communication preferences
- Security and devices
- Consents and data requests
- Legal and disclosures
- App/support information

### Internal side menu

Use for workspaces:

- Work Queue
- Customers and Cases
- KYC and AML
- Orders and Reconciliation
- Scheme and Policy Masters
- Tax and DTAA
- Finance
- Support and CRM
- Audit and Risk
- Analytics and Service Health
- Administration

### Why a drawer/side menu

- These destinations are important but not frequent enough for primary navigation.
- It separates maintenance and administration from investment action.
- Internal workspaces have more breadth and require a persistent information-dense navigation model.

## 2.5 Global search

### Investor search scope

Search should find:

- Scheme name, AMC and category.
- Help articles.
- Reports and statements.
- Orders and transactions.
- Support cases.
- Documents.

Search must respect eligibility, authorization and data freshness. It must not expose a restricted scheme merely because it matches text.

### Internal search scope

Search should find:

- Customer.
- PAN or approved masked identifier.
- Case.
- Order.
- Payment reference.
- Folio.
- Scheme.
- Document.
- Audit event.
- Rule version.

### Search principles

1. Search is not a bypass for permissions.
2. Search results expose the minimum data needed to identify the result.
3. Exact identifiers should be supported with masking and access logging.
4. Search results show entity type and state.
5. Stale or archived results are explicitly labelled.
6. Search should support recent history but not retain sensitive query text longer than policy allows.

## 2.6 Quick actions

### Investor quick actions

- Invest in an eligible scheme.
- Start or manage SIP.
- View pending action.
- View portfolio.
- Download tax report.
- Upload or renew document.
- Check DTAA status.
- Check repatriation context.
- Contact support.

### Contextual quick-action rules

- Quick actions are permission- and state-aware.
- A quick action must not skip eligibility, disclosure, confirmation or required evidence.
- The same action should not appear simultaneously as an acquisition prompt, dashboard prompt and notification without frequency control.
- High-consequence quick actions require relevant context before commitment.

### Internal quick actions

- Claim next case.
- Escalate case.
- Request missing evidence.
- Retry safe vendor request.
- Reconcile payment.
- Assign RM/CA.
- Approve or reject within authority.
- Open incident.
- Compare source records.

## 2.7 Deep links

Deep links should support:

- Notification to exact order, case, document, report or task.
- Email to KYC retry or document renewal.
- WhatsApp or SMS to a safe status destination.
- RM/CA handoff to the authorized case context.
- Shared report link with expiring access and audit.
- Support agent link to exact customer state.

### Deep-link rules

- Require authentication and step-up verification when necessary.
- Preserve intended destination after authentication.
- Verify current permission and state before displaying content.
- If the destination is expired, restricted or resolved, redirect to the current state with explanation.
- Never deep-link directly into an irreversible money action without context and confirmation.

## 2.8 Cross-navigation

Cross-navigation should connect entities and responsibilities:

- Scheme → eligibility explanation → order intent.
- Order → payment → portfolio transaction.
- Holding → transaction → tax event → report.
- Redemption → TDS estimate → DTAA → repatriation context.
- Document → KYC/DTAA case → affected capability.
- Support case → order/payment/document timeline.
- Customer → all authorized accounts, holdings, documents and cases.
- Rule version → affected schemes, decisions and communications.

Cross-navigation must preserve:

- Current context.
- Authorization.
- Source and freshness.
- Back path.
- Case or correlation identifier.

## 2.9 Breadcrumb strategy

### Investor application

Use lightweight breadcrumbs only in:

- Reports and tax-year hierarchies.
- Scheme → transaction intent → order review contexts.
- Document → review → outcome contexts.
- Support case histories.

Do not use breadcrumbs as the primary navigation for routine mobile tasks.

### Internal application

Use persistent breadcrumbs for:

- Customer → case → task.
- Scheme → policy version.
- Order → payment → reconciliation.
- Customer → document → review.
- Rule set → version → affected decisions.

### Why breadcrumbs

- Internal users traverse deep entity relationships and need orientation.
- Investors need clear context in high-consequence tasks but do not need a large path hierarchy for every action.

## 2.10 Navigation architecture by platform

| Platform | Primary model | Best suited for |
|---|---|---|
| Mobile | Bottom navigation plus contextual account menu | Alerts, monitoring, routine actions, approvals and service |
| Responsive web | Persistent top navigation plus secondary domain navigation | Reports, tax work, comparison and document review |
| Internal web | Side navigation, queue workspace, entity breadcrumbs | Operations, compliance, finance, support and audit |
| Email/WhatsApp | Deep link into authenticated context | Status, reminders and specialist handoffs |
| Support tooling | Search-first case workspace | Diagnosis, recovery and customer communication |

# SECTION 3: Domain Model

## 3.1 Entity catalogue

| Entity | Description | Relationships | Ownership | Dependencies |
|---|---|---|---|---|
| Investor | Primary individual customer | Has profiles, accounts, orders, holdings, documents, cases | Identity service | KYC, PAN, consent |
| Joint Holder | Co-owner or authorized holder | Linked to account, folio, order permissions | Relationship service | KYC, mandate and legal rules |
| Nominee | Person nominated for applicable holdings or accounts | Linked to folio or account | Relationship service | Identity and nominee rules |
| Guardian | Authorized guardian for minor nominee where applicable | Linked to nominee | Relationship service | Legal and document rules |
| Household | Grouping for family continuity | Contains investors and permissioned relationships | Relationship service | Consent and privacy |
| User Profile | Current and historical customer attributes | Belongs to investor | Identity service | Tax residency and KYC |
| Tax Residency | Country and tax-residency status with effective dates | Belongs to investor | Compliance profile | FATCA/CRS and country rules |
| Bank | Financial institution | Has accounts and payment routes | Reference data | Bank verification |
| Bank Account | NRE/NRO account used for funding or payout | Belongs to investor; linked to folio and order | Account service | Bank verification, payment |
| Folio | AMC/RTA ownership record | Contains holdings and transactions | Portfolio service | CAMS, KFintech, AMC |
| Portfolio | Investor’s consolidated view | Contains folios, holdings and reports | Portfolio service | RTA and execution data |
| Holding | Position in a scheme | Belongs to folio; produces transactions and tax events | Portfolio service | RTA/NAV data |
| Unit Lot | Cost and acquisition grouping | Belongs to holding; used for gains | Portfolio service | Tax and transaction data |
| Transaction | Financial event affecting a holding | Linked to order, payment and holding | Transaction ledger | Execution and RTA |
| Order | Customer instruction to buy, sell or change holding | Has payment, execution, state and outcomes | Order service | Eligibility and execution |
| Order Leg | Purchase or redemption leg of a switch/STP | Belongs to order | Order service | Tax and execution |
| Payment | Money movement attempt or confirmation | Linked to order and bank account | Payment ledger | Gateway and bank |
| Refund | Return of funds after failed or rejected payment/order | Linked to payment and order | Finance service | Gateway/bank |
| Mandate | Recurring debit authorization | Linked to SIP and bank account | Mandate service | NACH/UPI/bank |
| SIP | Recurring investment instruction | References scheme, mandate, order instances | SIP service | Calendar, mandate and account |
| Scheme | Mutual fund investment product | Belongs to AMC; has plan, option and restrictions | Product master | AMC, execution and RTA |
| AMC | Asset management company | Owns schemes and source disclosures | Product master | Vendor feeds |
| Plan | Regular/direct variant of scheme | Belongs to scheme | Product master | ARN and distribution rules |
| Option | Growth/IDCW behavior | Belongs to plan or scheme | Product master | AMC rules |
| Eligibility Policy | Rule for country, account, scheme or transaction | Produces eligibility decisions | Policy service | Compliance, tax and AMC |
| Rule Version | Effective version of a policy or calculation | Belongs to rule set | Policy governance | Approval and audit |
| KYC Review | Identity and evidence decision | Belongs to investor and documents | Compliance/KYC Ops | KYC vendor and CKYC |
| AML Screening | Sanctions, PEP and adverse-media result | Belongs to investor or case | Compliance | Screening provider |
| EDD Case | Enhanced review for elevated risk | Linked to investor, screening and documents | Compliance | Legal and operations |
| Document | Evidence artifact | Belongs to investor/case and has versions | Document service | Storage, OCR and retention |
| Document Version | Specific upload or issued version | Belongs to document | Document service | Validity and audit |
| FATCA/CRS Declaration | Tax self-certification | Belongs to investor and tax residency | Compliance profile | Tax identifiers |
| TRC | Tax residency certificate | Belongs to investor and DTAA case | Tax/Compliance | Tax authority evidence |
| Form 10F | Treaty declaration form | Belongs to DTAA case | Tax/Compliance | Tax rules and review |
| DTAA Case | Review and application of treaty evidence | Linked to investor, documents and redemption context | Tax/Compliance | AMC/RTA feasibility |
| Tax Event | Tax-relevant financial event | Linked to transaction, holding and report | Tax service | Rule version and source data |
| TDS Record | Tax deducted at source record | Linked to transaction and report | Finance/Tax | AMC/RTA and tax data |
| Capital Gain | Gain/loss calculation | Linked to unit lot, transaction and tax year | Tax service | Cost basis and rules |
| Repatriation Ledger | FY movement and threshold context | Linked to bank, redemption and forms | Finance service | Payout, tax and forms |
| Report | Generated financial or compliance evidence | References source records and calculation version | Reporting service | Portfolio, tax and RTA |
| Consent | Permission for data, communication or handoff | Belongs to investor and scope | Consent service | Privacy rules |
| Notification | Message triggered by event or schedule | Linked to investor, case or order | Notification service | Channel provider and consent |
| Support Case | Customer issue or request | Has tasks, messages, SLA and resolution | Case service | CRM/helpdesk |
| Task | Unit of work assigned to a person/team | Belongs to case or workflow | Operations service | Queue and SLA |
| SLA | Target response/resolution commitment | Linked to case, state or vendor | Service management | Calendar and severity |
| Specialist Handoff | Consent-based RM/CA engagement | Links customer, case, specialist and scope | CRM/Partner service | Consent and service terms |
| Audit Event | Immutable record of action or decision | Linked to any entity | Audit service | Retention and access policy |
| Analytics Event | Measurement record | Linked to actor/session/correlation | Analytics service | Privacy and schema |
| Incident | Service or technology event | Links affected capability, vendors and cases | Incident management | Monitoring and communication |
| Vendor | External service provider | Supports integrations and contracts | Vendor management | SLA, DPA and fallback |

## 3.2 Relationship rules

1. An Investor may have multiple tax residencies, but each must have effective dates and evidence.
2. A Bank Account must have an explicit account type and ownership status before funding.
3. A Folio must retain its NRE/NRO and repatriability relationship where applicable.
4. An Order cannot be considered valid without an approved investor, account, scheme and eligibility context.
5. A Payment may have multiple attempts but must have one reconciled business outcome.
6. A Transaction must be traceable to an execution source and, where relevant, a payment and order.
7. A Tax Event must retain the rule and data versions used for calculation.
8. A Report must identify its source freshness and calculation version.
9. Consent must be scoped, revocable and time-bounded where appropriate.
10. Human decisions must identify actor, authority, reason and evidence.
11. Rule changes must create new versions rather than overwrite historical decisions.
12. Every case must be traceable to an originating event, customer question or operational exception.

## 3.3 Entity relationship map

Investor

→ has Profile  
→ has Tax Residency  
→ owns Bank Account  
→ has Joint Holder relationships  
→ has Nominee relationships  
→ submits Order  
→ owns Portfolio  
→ uploads Document  
→ has Consent  
→ creates Support Case

Order

→ references Investor  
→ references Bank Account  
→ references Scheme  
→ passes Eligibility Policy  
→ creates Payment  
→ creates Execution Submission  
→ creates Transaction  
→ updates Holding  
→ creates Tax Event  
→ creates Notification  
→ creates Audit Event

Portfolio

→ contains Folio  
→ contains Holding  
→ contains Transaction  
→ produces Report  
→ contributes to Tax Event  
→ contributes to Repatriation Ledger

DTAA Case

→ belongs to Investor  
→ contains TRC  
→ contains Form 10F  
→ uses Eligibility Policy  
→ produces Approval or Rejection  
→ affects Tax Event  
→ creates Notification  
→ creates Audit Event

Support Case

→ references Investor and originating entity  
→ contains Task  
→ has SLA  
→ may create Specialist Handoff  
→ creates Notification  
→ creates Audit Event

# SECTION 4: Permission Matrix

## 4.1 Permission legend

- **V:** View
- **C:** Create
- **E:** Edit
- **A:** Approve or reject within role authority
- **D:** Delete or request deletion where legally permitted
- **X:** Export
- **—:** No access
- **R:** Restricted view only; use alongside V where access is partial

Delete must not mean erasing regulated history. For financial, KYC, tax, audit and regulatory entities, deletion means permitted deletion request, archival or redaction workflow only.

## 4.2 Role definitions

- **Investor:** Primary account holder.
- **Joint Holder:** Co-holder with permissions defined by mandate and consent.
- **Nominee:** Beneficiary or nominated party; no current investment control unless legally authorized.
- **RM:** Relationship manager with assigned-client and assisted-service access.
- **Support:** Customer-support agent.
- **Operations:** Processing, reconciliation and master-data operator.
- **Compliance:** KYC, AML, policy, EDD and regulatory reviewer.
- **Finance:** Payment, refund, TDS, commission and financial-reconciliation user.
- **Tax Consultant:** Consent-based specialist with limited customer and tax context.
- **Admin:** Platform administrator with technical/configuration access, not automatic business approval authority.

## 4.3 Permission matrix by module

Each cell lists the allowed operations using the legend above.

| Module | Investor | Joint Holder | Nominee | RM | Support | Operations | Compliance | Finance | Tax Consultant | Admin |
|---|---|---|---|---|---|---|---|---|---|---|
| Identity and access | V/C/E | V/E own | — | R | R | R | R | R | — | V/C/E/A/D/X |
| Profile and tax residency | V/C/E | V/E own | — | R | R | V/E assisted | V/A | R | V with consent | V/C/E/A/D/X |
| Bank accounts | V/C/E | V/E by mandate | — | R | R | V/C/E | V/A restricted | V/A | — | V/C/E/A/D/X |
| KYC and documents | V/C/E/X own | V/C/E/X own | V/C/E own | R/C with consent | R | V/C/E | V/C/E/A/X | R | V/X with consent | V/C/E/A/D/X |
| AML and EDD | — | — | — | R status only | R safe status | R/C evidence | V/C/E/A/X | R | — | V/C/E/A/D/X |
| Scheme and eligibility | V | V | — | V/C assisted | V | V/C/E/X | V/C/E/A/X | V | V with consent | V/C/E/A/D/X |
| Orders | V/C/E own | V/C/E by mandate | — | V/C assisted, no approval | V/R | V/C/E/A within authority | V/R/A restricted | V/R | V/R with consent | V/C/E/A/D/X |
| Payments and refunds | V/C own | V by mandate | — | R | R | V/C/E | R | V/C/E/A/X | — | V/C/E/A/D/X |
| SIP and mandates | V/C/E own | V/C/E by mandate | — | V/C assisted | V/R | V/C/E/A | V/R | V/R | — | V/C/E/A/D/X |
| Portfolio and holdings | V/X own | V/X by mandate | V limited after legal trigger | V with consent | R | V/C/E correction | V/R | V/X | V/X with consent | V/C/E/A/D/X |
| Tax and reports | V/C/X own | V/X by mandate | V limited where authorized | V/C assisted | V/R | V/C/E correction | V/C/E/A/X | V/C/E/X | V/C/E/X with consent | V/C/E/A/D/X |
| DTAA | V/C/E/X own | V/C/E/X by mandate | — | V/C with consent | R | V/C/E | V/C/E/A/X | R | V/C/E/A/X with consent | V/C/E/A/D/X |
| Repatriation | V/C/X own | V/C/X by mandate | V limited after legal trigger | V/C assisted | R | V/C/E | V/R/A | V/C/E/A/X | V/C/E/X with consent | V/C/E/A/D/X |
| Family and nominees | V/C/E own | V/C/E by mandate | V limited | V with consent | R | V/C/E | V/C/E/A | R | — | V/C/E/A/D/X |
| Support cases | V/C own | V/C own | V/C where authorized | V/C/E assigned | V/C/E/A | V/C/E assigned | V/R/A compliance cases | V/R financial cases | V/C/E with consent | V/C/E/A/D/X |
| RM/CA handoff | V/C consent | V/C consent | — | V/C/E assigned | R | R | V/A consent boundary | R | V/C/E assigned | V/C/E/A/D/X |
| Operations queues | — | — | — | R assigned | V/C/E assigned | V/C/E/A/X | V/R/A | V/R/A finance queue | — | V/C/E/A/D/X |
| Scheme/policy masters | — | — | — | — | — | V/C/E | V/C/E/A | R | R tax fields | V/C/E/A/D/X |
| Finance and reconciliation | — | — | — | R | R | V/C/E | R | V/C/E/A/X | R tax data | V/C/E/A/D/X |
| Audit and compliance records | V limited own | V limited own | V limited | R assigned | R case | V/C evidence | V/C/E/A/X | V/C/E/A/X finance | V/X consented | V/C/E/A/D/X |
| Analytics and service health | — | — | — | R aggregate | R aggregate | V aggregate | V aggregate | V aggregate | — | V/C/E/A/D/X |
| Administration | — | — | — | — | — | R | R | R | — | V/C/E/A/D/X |

## 4.4 Permission rules

1. View access is not enough to expose raw PII; fields must be masked by role.
2. Export access is more sensitive than view access and requires purpose, logging and watermarking where appropriate.
3. Approval requires role authority, segregation of duties and maker-checker where applicable.
4. RM access is limited to assigned customers and consented assisted actions.
5. Tax consultant access expires with the engagement or consent.
6. Nominee access does not imply current portfolio control.
7. Admin cannot approve business, compliance or financial decisions merely because they can configure systems.
8. Support can see safe status and context but not sensitive AML reasons or unrestricted documents.
9. Finance can reconcile money but cannot alter KYC or eligibility decisions.
10. Compliance can override policy only with reason, evidence and audit.

# SECTION 5: State Matrix

## 5.1 Common states

| State | Meaning | Allowed action | Transition rule |
|---|---|---|---|
| Loading | Request accepted locally, result not known | Wait or leave safely | Must resolve, timeout or become Pending |
| Empty | No data exists or no result matches | Create, search or learn | Do not imply failure |
| Success | Requested read or action returned expected result | Continue or review | Must identify source and freshness |
| Failure | Request failed and no safe outcome confirmed | Retry, contact or recover | Do not imply money moved or state changed |
| Pending | External or human result awaited within SLA | View status, withdraw where allowed | Becomes completed, failed or escalated |
| Retry | Safe repeat is available | Retry with duplicate protection | Only after idempotency or new authorization |
| Offline | Network or service unavailable locally | View cached safe data or retry later | Must not allow unsafe money action |
| Restricted | Action unavailable under policy or permissions | Read reason and alternatives | Changes only through policy, evidence or authorization |
| Expired | Prior approval, document, mandate or link is no longer valid | Renew or re-verify | Moves to Verification or Approved |
| Suspended | Activity paused due to risk, incident or review | View safe explanation and contact | Moves to Approved, Rejected or Escalated |
| Escalated | Human or specialist owns the next decision | View case and SLA | Moves to Approved, Rejected, Suspended or Completed |
| Completed | Required outcome confirmed | View evidence and future obligations | May be corrected or reopened through controlled process |

## 5.2 Module state matrix

| Module | Loading | Empty | Success | Failure | Pending | Retry | Offline | Restricted | Expired | Suspended | Escalated | Completed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Registration | Requesting OTP | No account | Account created | OTP/identity error | Verification callback | Resend | Cannot create | Country unsupported | Link expired | Security hold | Support review | Registration complete |
| Profile | Fetching profile | Profile incomplete | Current profile | Save error | External validation | Retry save | Cached safe view | Field restricted | Document expiry | Profile locked | Compliance review | Profile verified |
| KYC | Checking evidence | Not started | KYC approved | Evidence/vendor error | Human/vendor review | Re-upload/retry | No submission | Country/product restriction | Re-KYC required | AML/security hold | Compliance/EDD | KYC complete |
| Bank account | Verifying | No account | Bank verified | Bank mismatch | Gateway/bank callback | Re-verify | No funding action | Bank unsupported | Mandate/account expired | Account hold | Finance/Operations | Bank active |
| Eligibility | Evaluating policy | No eligible result | Eligible result | Policy/data error | Review required | Re-evaluate after master update | Cached only if safe | Restricted | Rule no longer valid | Customer suspended | Compliance review | Decision recorded |
| Scheme | Loading catalogue | No eligible schemes | Current scheme data | Feed unavailable | Data refresh | Refresh | Cached labelled data | Not eligible | NFO/subscription expired | Scheme suspended | Operations review | Product record current |
| Order | Creating | No orders | Valid order state | Submission/reconciliation error | Execution/RTA wait | Safe replay | No new order | Not allowed | Order/cut-off expired | Account/order hold | Operations incident | Settled outcome |
| Payment | Initiating | No payment | Reconciled payment | Gateway/bank failure | Authorization/refund wait | Safe retry | No payment | Account mismatch | Mandate expired | Security hold | Finance review | Payment reconciled |
| SIP | Creating mandate | No SIP | SIP active | Mandate/debit error | Bank approval/debit | Re-register/retry | No mandate action | Scheme/account restricted | Mandate/document expired | SIP paused | Operations review | SIP completed/cancelled |
| Portfolio | Fetching sources | No holdings | Fresh holdings | RTA/reconciliation error | Feed refresh | Re-fetch | Last-known labelled data | Holding visibility restricted | Report period expired | Data source suspended | Operations review | Portfolio snapshot recorded |
| Tax/report | Calculating | No report for period | Report generated | Calculation/source error | Generation/review | Recalculate | Last report only | Country/report restriction | Report link expired | Tax record hold | Tax review | Report issued |
| DTAA | Validating documents | Not submitted | Approved status | Document/rule failure | Tax/AMC/RTA review | Correct and resubmit | No submission | Country not eligible | TRC/Form 10F expired | Benefit suspended | Tax review | Treaty state recorded |
| Repatriation | Calculating | No activity | Ledger/estimate available | Data/form error | Bank/finance confirmation | Reconcile/retry | No new instruction | Threshold/form restriction | FY or document expired | Payout hold | Finance/tax review | Payout/ledger complete |
| Documents | Uploading | No documents | Valid document | Upload/quality error | Review | Re-upload | No upload | Role restricted | Document expired | Access suspended | Compliance review | Document accepted |
| Family/access | Loading relationships | No household | Permissioned relationships | Authorization error | Invitation/consent wait | Resend/revoke | No access change | Role not allowed | Invitation expired | Relationship suspended | Legal/support review | Access recorded |
| Support case | Creating | No cases | Case visible | Creation/notification error | Assigned work | Recontact | Offline draft only | Case data restricted | Link expired | Case hold | Specialist/team review | Resolution recorded |
| Notifications | Preparing | No notifications | Delivered | Bounce/provider error | Delivery confirmation | Alternate channel | In-app record only | Channel not consented | Link/template expired | Channel suspended | CRM review | Delivery recorded |
| Audit/export | Querying | No matching events | Evidence returned | Query/export error | Large export review | Retry | No export | Role restricted | Link expired | Export suspended | Compliance review | Export logged |

## 5.3 State transition rules

1. A user-visible success state requires authoritative confirmation for that domain.
2. A timeout never becomes success by inference.
3. Retry is only available when duplicate side effects are prevented.
4. Offline mode never allows unconfirmed money movement or compliance approval.
5. Restricted and Suspended are different: restricted is policy/permission-based; suspended is an active hold.
6. Expired documents or consents must not silently change unrelated capabilities.
7. Escalated cases must have a named owner and next-update time.
8. Completed financial states are immutable from the customer perspective; corrections create a correction event.
9. Every state transition records actor, source, timestamp, correlation ID, prior state, new state and reason.
10. State names must be shared by investor, support, operations and audit systems.

# SECTION 6: UX Principles

## 6.1 Navigation principles

1. Organize by investor responsibility, not internal department.
2. Keep country, tax residency and account context persistent.
3. Make Help and recovery available from every high-consequence state.
4. Do not use notification badges as a replacement for hierarchy.
5. Use contextual navigation to reveal relevant detail without expanding the primary hierarchy.
6. Search respects eligibility, authorization and data freshness.
7. Deep links preserve state but never bypass required checks.
8. Internal navigation starts with queues and cases, not feature menus.
9. Use one concept name across navigation, content, support and audit.
10. Navigation changes require evidence; do not add a permanent destination for every new feature.

## 6.2 Information hierarchy principles

1. Put eligibility, account type, tax impact and timing before irreversible commitment.
2. Put current state and next action before historical detail.
3. Put source, freshness and confidence beside the data they qualify.
4. Separate customer action from education and evidence without disconnecting them.
5. Present routine decisions simply, but do not hide consequential complexity.
6. Make unresolved, estimated and final values visibly different.
7. Use the same hierarchy across product, email, support and specialist handoff.
8. Preserve financial context when moving from holding to transaction to tax report.

## 6.3 Accessibility principles

1. Target WCAG 2.1 AA for web and mobile surfaces.
2. Do not communicate financial, tax or state meaning by colour alone.
3. Use readable numbers, currency, dates, time zones and percentages.
4. Support zoom, keyboard, screen readers and touch accessibility.
5. Make error messages associated with the relevant field or state.
6. Provide alternatives to video, biometric or live-agent steps where legally and operationally allowed.
7. Make document requirements and expiry dates perceivable without relying on visual badges.
8. Use plain language for NRE/NRO, TDS, DTAA and repatriation while retaining legal precision.
9. Test reports and exported evidence with assistive technology.
10. Do not use time-limited interactions without recovery or extension.

## 6.4 Trust principles

1. Explain every restriction.
2. Identify the source, date and owner of rule-sensitive information.
3. Label external data freshness.
4. Show what the platform knows, estimates and cannot determine.
5. Do not claim tax savings without approved evidence and a clear assumption boundary.
6. Make regular-plan economics and assisted-service boundaries explicit.
7. Preserve a truthful timeline for money movement.
8. Make human ownership visible when automation cannot resolve the case.
9. Give customers portable evidence useful to a CA or family member.
10. Treat privacy, access and consent as part of trust, not settings detail.

## 6.5 Content principles

1. Use one canonical term for each financial and compliance concept.
2. Write for the customer’s decision, not the institution’s process.
3. State the action, reason, impact, next step and expected timing.
4. Separate estimated, reviewed, approved and final.
5. Include effective dates and tax-year context.
6. Avoid absolute phrases such as guaranteed, tax-free or real-time unless legally and technically true.
7. Make professional advice boundaries explicit.
8. Write messages that can be forwarded to a spouse, CA or support agent without losing context.
9. Version regulated content and retire outdated guidance.
10. Use country-aware examples only after country eligibility and legal review.

## 6.6 Error-handling principles

1. Never imply that money moved when only a request was received.
2. Preserve customer input after recoverable errors.
3. Explain what failed without exposing sensitive fraud or AML details.
4. Offer the safest next action, not merely a generic retry.
5. Prevent duplicate submission.
6. Display a case or correlation identifier for consequential failures.
7. State whether the customer should wait, retry, contact support or take no action.
8. Convert prolonged pending states into owned exceptions.
9. Communicate SLA breach proactively.
10. Record customer-impact and root-cause outcomes for prevention.

## 6.7 Financial UX principles

1. Account type is a first-class financial context.
2. Use transaction, holding, folio and tax relationships consistently.
3. Show relevant total, net, tax, cost and timing values together.
4. Never hide fees, plan type or distribution relationship.
5. Treat cut-off and settlement as part of the decision.
6. Distinguish market risk from process/compliance risk.
7. Do not use performance framing to distract from tax or liquidity consequences.
8. Support desktop-quality reporting and export.
9. Make family and specialist sharing permissioned and auditable.
10. Design for correction without rewriting the financial history.

# SECTION 7: Information Architecture Review

## 7.1 Complex areas

### Country, tax residency and account context

These concepts affect eligibility, tax, communication and repatriation, but they are not interchangeable. The architecture must model them as separate entities with effective dates.

**Risk:** A single country field drives incorrect tax or product behavior.

### Portfolio, folio, holding and transaction

Customers think in portfolios; RTAs and AMCs often operate through folios, holdings and transactions.

**Risk:** A flattened portfolio model loses tax lots, source account, transaction traceability and reconciliation.

### Order, payment, execution and settlement

One customer action can generate multiple asynchronous events and external references.

**Risk:** A single “order status” hides payment success, execution failure, refund or partial acceptance.

### DTAA, TDS and capital gains

These domains overlap but are not the same. DTAA evidence may change treatment; TDS may be deducted operationally; capital-gains calculation may occur later.

**Risk:** Customers interpret a tax estimate as a final tax liability or believe DTAA approval guarantees AMC/RTA application.

### Joint holders, nominees and family continuity

Ownership, visibility, transaction authority and beneficiary rights differ.

**Risk:** A family view accidentally becomes shared account control or exposes data without consent.

### Human and AI decisions

The same case may pass through automation, Support, Operations, Compliance, Finance and Tax.

**Risk:** No clear authority, inconsistent answers or untraceable overrides.

## 7.2 Navigation risks

1. Making Portfolio the primary destination while burying Tax and Reports weakens the NRI proposition.
2. Treating Documents as a settings area hides expiring compliance work.
3. Treating Repatriation as a calculator rather than an evidence and service domain creates false simplicity.
4. Exposing internal status names directly to customers creates confusion.
5. Adding every adjacent product to primary navigation dilutes the mutual-fund core.
6. Using global search as a shortcut around eligibility or permissions creates compliance risk.
7. Using notification badges for all pending items creates urgency fatigue.
8. Deep-linking directly to actions may bypass context or create duplicate actions.
9. A single hierarchy for investor and internal users will expose too much complexity or hide needed operations.

## 7.3 Scalability concerns

### Country expansion

The architecture must support country-specific policy, tax, content, privacy, communication, bank coverage and product availability without duplicating the entire application.

### Product expansion

PMS, AIF, bonds, REITs, InvITs, GIFT City and international remittance should be modeled as future product domains, not mixed into the MF taxonomy prematurely.

### Transaction expansion

Switch, STP, SWP and NFO introduce multiple legs, schedules, tax events and state transitions. The order model must support composite instructions.

### Household expansion

Family access must support roles, scopes, expiry, revocation, delegated service and legal events without turning every investor into a shared workspace.

### Service expansion

The case model must support Support, RM, CA, Operations, Finance, Tax and Compliance without creating separate disconnected tickets.

### Data expansion

The evidence model must support source version, effective date, freshness, correction, retention and export across all domains.

### AI expansion

AI should consume governed entities and evidence, not raw unstructured application data. Every AI use case needs scope, confidence, source and human override.

## 7.4 Future expansion opportunities

1. Country policy packs with reusable legal and content configuration.
2. Portable compliance passport across products and country changes.
3. Permissioned household and continuity layer.
4. Structured CA/RM service marketplace with controlled access.
5. Multi-currency display without pretending the platform executes FX.
6. Held-away portfolio evidence and external asset aggregation.
7. Partner-bank and community distribution with consented attribution.
8. Operational data quality and vendor health intelligence.
9. Source-grounded AI explanations and internal case summarization.
10. Cross-product reporting while retaining product-specific legal boundaries.

## 7.5 Recommended improvements before UX architecture

### P0: Architecture decisions

1. Approve the investor top-level domains: Home, Invest, Portfolio, Tax, Help.
2. Approve Profile, Documents, Family and Settings as secondary account domains.
3. Approve queue-led internal navigation.
4. Define the canonical entity IDs and relationships.
5. Define the state machines and shared state vocabulary.
6. Define data ownership, source precedence and freshness.
7. Define permission scopes and field-level masking.
8. Define country and product policy versioning.

### P1: Service and technology decisions

1. Map every MVP journey into a stage-by-layer service blueprint.
2. Mark MVP, V1, V2, assisted-only and out-of-scope modules.
3. Finalize vendor and fallback architecture.
4. Define event contracts, correlation IDs, reconciliation and replay.
5. Define retention, privacy, export and deletion rules.
6. Define operational queue capacity, SLA and escalation.
7. Define support knowledge ownership and approved language.
8. Define QA coverage for state, tax, integration and accessibility.

### P2: UX architecture preparation

1. Validate terminology with NRI users, Support, Operations, Compliance and Tax.
2. Test whether customers understand the difference between Portfolio, Tax, Reports and Repatriation.
3. Validate the five-item bottom-navigation model across mobile and desktop behavior.
4. Test search tasks across scheme, report, order, document and support contexts.
5. Test permission comprehension for joint holders, nominees and CA/RM access.
6. Define content governance and regulated-copy review.
7. Create a navigation analytics plan based on successful task completion, not clicks alone.

## Final IA recommendation

The product should be architected around a single governed domain model and two navigation systems:

- **Investor:** Home, Invest, Portfolio, Tax, Help, with Profile/Documents/Family as account context.
- **Internal:** Work Queue, Customer/Case Context, KYC/AML, Orders/Reconciliation, Policy Masters, Tax/DTAA, Finance, Support/CRM, Audit/Risk and Analytics/Health.

The architecture should make cross-border context persistent, financial evidence traceable, permissions explicit, state transitions consistent and service recovery reachable. Only after those foundations are approved should detailed UX flows begin.

