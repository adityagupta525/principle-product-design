# NRI DIY Mutual Fund Platform
## Product Discovery: BRD Reverse Engineering

**Status:** Discovery baseline; not a UI or user-flow specification  
**Primary source:** NRI_BRD_v2_Final (1).docx, BRD v2.0, revised 18 May 2026  
**Supporting source:** NRI_Platform_Notes_and_Requirements (1).docx, Technology Team, May 2026  
**Audience:** Product, Business, Technology, Operations, Compliance, Legal, Finance/Tax

> **Reading convention:** Confirmed statements are attributed to the supplied documents. UNKNOWN means the source does not state or sufficiently define the information. Risks, recommendations, and questions are discovery outputs, not facts asserted by the BRD.

## 1. Executive Summary

The BRD describes an NRI-first, self-service mutual fund distribution and portfolio platform focused on digital onboarding, NRE/NRO-compliant investing, tax and DTAA transparency, repatriation assistance, portfolio reporting, operational controls, and future advisory/engagement capabilities.

The product thesis is that execution speed is not the primary differentiator. The proposed moat is compliance intelligence, tax transparency, NRI-specific context, trust, and scalable assisted-DIY support for higher-value investors.

The opportunity is coherent, but the launch definition is not settled. The BRD contains a broad Phase 1 inventory, unresolved vendor and regulatory dependencies, conflicting phase assignments, and a timeline concern in the technology notes. Detailed UX or architecture decisions should wait until stakeholders approve the launch countries, MVP, platform form factor, vendor/data-source decisions, customer-facing tax language, and AI governance.

## 2. Business Goals

- Acquire and activate NRI individual investors through a digital self-service mutual fund platform. [BRD §§1, 11.1]
- Distribute regular-plan mutual funds using an AMFI ARN and capture trail/upfront brokerage revenue. [BRD §§2.1, 8.9]
- Build trust through compliance intelligence, tax reporting, DTAA management, TDS transparency and repatriation support. [BRD §§3.3–3.7, 8.6, 8.14]
- Grow platform AUM, SIP adoption, retention and RM-attributed AUM. [BRD §14.4]
- Create qualified lead pipelines for non-MF products and tax/CA services before full execution or delivery is available. [BRD §§8.21–8.22]
- Reduce operational burden through reconciliation, exception handling, automation and proposed AI capabilities. [BRD §§8.5, 8.8, 9]
- Establish a data foundation for future personalization, fraud detection, churn prediction and AI products. [BRD §§8.20, 9.6]

**UNKNOWN:** Launch AUM target, revenue target, budget, contribution margin, customer target, country-by-country commercial plan and payback expectations.

## 3. User Goals

- Complete onboarding and KYC remotely with minimal manual entry and clear status visibility.
- Know whether a fund is eligible for the investor’s country, account type and tax situation before investing.
- Invest from the correct NRE or NRO account without cross-funding or repatriation surprises.
- Understand NAV cut-off, settlement, estimated TDS, net proceeds and tax treatment before confirming.
- Track holdings, returns, transactions, capital gains, TDS and repatriation limits in INR and a preferred local currency.
- Manage SIPs, redemptions, switches, SWP/STP, nominees, KYC changes, DTAA documents and tax reports digitally.
- Know when a human, compliance reviewer or tax professional is responsible.

**UNKNOWN:** The BRD contains no user research, interviews, usability findings, accessibility research or validated needs by country segment.

## 4. Stakeholders

| Stakeholder | Responsibility / interest | Key decisions or dependencies |
|---|---|---|
| Business / Product | Product definition, prioritization, phasing, regulatory alignment | Launch scope, vendors, business rules |
| Technology | Architecture, integrations, security, DevOps, reconciliation | Stack, integration approach, SLAs, feasibility |
| Operations / Service | Onboarding operations, exceptions, reconciliation, queues | Operations portal, staffing, TATs, fallbacks |
| Compliance | AML, KYC, FATCA/CRS, DTAA, PFIC, audit, SEBI | Country restrictions, TDS, AI controls |
| Legal | PFIC, DTAA validation, GDPR vendor agreements | US/Canada activation, DPA, legal interpretations |
| Finance / Tax | TDS, DTAA, brokerage, revenue recognition | Tax engine rules and brokerage structure |
| CAMS / KFintech | NAV, holdings, capital gains, CAS, TDS | API agreements, feeds, SLAs |
| Execution platform | Order routing and execution | Platform selection and credentials |
| Payment gateway | NRE/NRO payments, UPI, eNACH | Capability confirmation, pricing, fallback |
| KYC vendor | Video KYC, OCR, liveness, CKYCR | Vendor selection and compliance fit |
| AMCs | Scheme eligibility, country restrictions, NFO data | Reliable restriction data and update process |
| RM / Support | Acquisition, assistance, service and escalation | Role boundaries, staffing, access controls |

## 5. User Types

| User type | Source-supported characteristics | Primary needs / constraints |
|---|---|---|
| NRI individual investor | Primary user; resident outside India with PAN and NRE/NRO account | DIY investing, compliance, reporting, tax clarity |
| UAE / Middle East NRI | DTAA opportunity; high-HNI segment | DTAA evidence, repatriation, local-time context |
| UK / Europe NRI | DTAA/GDPR; UK reporting needs | Privacy, tax reporting, local compliance clarity |
| US NRI | PFIC, FATCA, FBAR, limited fund eligibility | Prominent disclosures, legal policy, restricted eligibility |
| Singapore / SE Asia NRI | DTAA opportunity; described as tech-savvy | Fast onboarding, tax clarity |
| Canada NRI | FAPI and Canadian securities-law complexity | Eligibility controls and disclosures |
| Joint account holder | Second holder with joint KYC and mandate rules | Consent, communication and authorization |
| Operations user | Orders, reconciliation, KYC, masters and exceptions | Auditability, queues, maker-checker controls |
| Compliance / Legal user | AML, EDD, sanctions, KYC, DTAA/PFIC review | Evidence, overrides and decisions |
| Finance / Tax user | TDS, DTAA, commission and reporting | Configurable rules and reconciled reports |
| Customer support agent | Reactive tickets and complaints | Case context, SLA and escalation |
| Relationship manager | Proactive assisted DIY for assigned HNI clients | Read-only portfolio, initiation without execution, EUIN |
| CA / tax specialist | Lead recipient in Phase 1; full service later | Qualified lead, consent, SLA and service status |

**UNKNOWN:** Age bands, accessibility needs, language proficiency, digital literacy, household decision-making, investor sophistication and segment sizes.

## 6. Functional Requirements

| Module | Consolidated requirements | Evidence |
|---|---|---|
| Onboarding & KYC | Registration, OTP, PAN, country/tax residency, CKYCR fast-track, video KYC, liveness, AML/sanctions/PEP/adverse media, EDD, FATCA/CRS, PFIC, eSign, document pack, re-KYC, resident conversion | BRD §§8.1, 11.2–11.3; Notes Table 16 |
| Bank / account setup | NRE/NRO/FCNR tagging, penny-drop verification, joint accounts, mandate types, nominees, risk profiling | BRD §§8.1, 8.15; Notes Table 17 |
| Scheme discovery | AMC/category listing, Growth/IDCW, NRI/country eligibility, risk-o-meter, NAV, performance, holdings, TDS/DTAA tags, NFOs | BRD §8.2; Notes Table 18 |
| MF execution | Lumpsum, SIP lifecycle, redemption, SWP, STP, switch, NFO, IDCW, account validation, cut-off/NAV handling | BRD §§8.3, 7.3; Notes Table 19 |
| Payments | Net banking, UPI, eNACH, UPI AutoPay, account-type matching, payment confirmation, refunds, mandate rejection, SIP bounce, optional AA check | BRD §8.4; Notes Tables 20–21 |
| Portfolio & reporting | Holdings, NRE/NRO views, multi-currency, XIRR, gains, drill-down, capital gains, TDS, annual statement, Form 15CA/15CB guidance, Form 67, repatriation | BRD §8.6; Notes Table 22 |
| Held-away / AA | CAS upload/import, OCR/rule parsing, manual fallback, confirmation, consented AA refresh, held-away tagging | BRD §8.7; Notes Table 23 |
| DTAA | TRC/Form 10F, review, validity, treaty application, savings display, reminders, audit trail, self-declaration generation | BRD §8.14, 3.4 |
| Operations | Order monitoring, overrides, reconciliation, exception aging, KYC/EDD queues, masters, exports, maker-checker | BRD §8.8 |
| Risk / fraud | Device trust, sessions, velocity limits, high-value redemption controls, geo anomaly, geofencing, phishing, suspicious activity | BRD §8.18 |
| Support | Tickets, statuses, callback, chat, help center, helpdesk, escalation, grievance, SCORES | BRD §8.17 |
| RM / lead capture | Assigned-client view, assisted initiation, EUIN, product interest, tax/CA interest, CRM routing and SLA tracking | BRD §§8.19, 8.21–8.22 |
| Engagement / analytics | Push, email, SMS, WhatsApp opt-in, lifecycle nudges, event schema, funnels, cohorts, attribution and A/B testing | BRD §§8.12, 8.20 |
| AI | Smart KYC, tax simulation/Q&A, recommendations, fraud/AML narratives, operations co-pilot, support agent, WhatsApp and later capabilities | BRD §9; Notes Table 35 |

## 7. Non-functional Requirements

| Area | Requirement stated in source | Discovery observation |
|---|---|---|
| Security | AES-256 at rest, TLS 1.3, PII masking, secure document storage, OTP/2FA, device management, VAPT, secure SDLC | Need threat model, control ownership, evidence and launch acceptance criteria |
| Availability | 99.9% monthly uptime | Define exclusions, vendor treatment, communications and cut-off severity |
| Performance | Payment confirmation <5s; multi-geography latency <300ms; fraud <100ms; AI latency targets | Define p95/p99 and vendor/API boundaries |
| Scalability | Horizontal scaling near NAV cut-off; 10x average concurrency load test | UNKNOWN: user volume, order volume, peak QPS and data volumes |
| Auditability | User/order/admin audit trails; maker-checker; 5-year SEBI and 7-year PMLA retention | Final legal/compliance retention matrix required |
| Accessibility | WCAG 2.1 AA | Test method, supported assistive technologies and owner are UNKNOWN |
| Platform | Cross-platform preferred, iOS 15, Android 9, web parity, offline cache, <30MB app | Web vs mobile is explicitly unresolved in Notes Table 15 |
| Resilience | RTO <4h, RPO <1h, multi-AZ, secondary region, backups, DR drills | Need service-level criticality and recovery evidence |
| Localization | English launch; Hindi and other languages later; dual time zone and multi-currency | Translation ownership, locale formatting and tax terminology are UNKNOWN |

## 8. Business Rules

| Rule area | Rule captured | Validation needed |
|---|---|---|
| NRE / NRO | NRE is repatriable; NRO has stated annual limit; no cross-account funding; account type locks folio/payment | Confirm legal and operational treatment with Compliance, banks, gateway, RTA and execution platform |
| Country eligibility | US/Canada/UK restrictions depend on AMC/scheme lists; Operations maintains scheme master | Define source of truth, update frequency, stale-data and fail-closed behavior |
| NAV cut-off | Display IST/local time; after cut-off requires next-business-day confirmation | Confirm calendar, payment-realization definition and RTA/exchange behavior |
| Switch | Redemption + purchase for tax; same account type; target must be eligible | Resolve intra-AMC vs inter-AMC conflict |
| DTAA | TRC + Form 10F review; treaty rate while valid; renewal reminders; savings display | Legal/tax sign-off by country and AMC/RTA feasibility |
| PFIC / FAPI | US/Canada disclosures and separate restrictions; US counsel is a hard dependency | Define activation policy, acknowledgement and reporting |
| Repatriation | NRO tracking against stated annual limit; Form 15CA/15CB guidance | Resolve threshold/wording conflicts and validate current law |
| Suitability | Five-question profile mapped to scheme risk; annual/event prompt | Clarify whether mismatch blocks purchase or only informs disclosure |
| RM authority | RM may initiate; investor confirms/authorizes; EUIN captured; no RM execution | Confirm legal classification and evidence requirements |
| AI decisions | Human override for money/compliance actions; model/version/confidence logging | Define approval, monitoring, incident and rollback authority |

## 9. Product Assumptions

- The launch product is a regular-plan MF distribution platform, not a direct-plan or broad multi-asset execution platform.
- NRI customers have Indian PAN and can link eligible NRE/NRO accounts.
- NSE MF is currently used/opted as the execution platform, although the BRD also frames selection as a decision.
- Digio is currently opted for KYC, although vendor selection is still discussed elsewhere.
- CAMS and KFintech are both required for meaningful RTA coverage.
- Manual fallbacks are required for AA gaps, integration outages and exceptions.
- Tax calculations and AI explanations are high-risk product behavior, not generic content.

**Assumptions requiring confirmation:** Launch countries, web/mobile form factor, joint accounts, DTAA, advanced orders, AI, lead capture, vendor contracts, regulatory interpretations, staffing and commercial targets.

## 10. Dependencies

| Dependency | Owner(s) in source | Impact if unresolved |
|---|---|---|
| AMFI ARN / EUIN | Business + Compliance | Regular-plan distribution and assisted transactions cannot launch as described |
| Execution platform/API | Business + Technology | No order routing, status, NFO or switch execution |
| CAMS + KFintech API | Business + Technology | Incomplete holdings, NAV, capital gains, CAS and TDS data |
| KYC/video KYC vendor | Product + Compliance | Onboarding, IPV and CKYCR behavior remain unresolved |
| NRE/NRO payment capability | Technology + Finance | Users cannot fund investments or register mandates |
| AMC country eligibility data | Compliance + Operations + AMCs | Restrictions may be unsafe or stale |
| TDS/DTAA sign-off | Finance + Compliance + Legal | Tax displays and redemptions carry material risk |
| US legal counsel / PFIC | Legal + Compliance | US NRI onboarding should remain gated |
| AA partner/consent model | Business + Technology + Compliance | AA-based checks, held-away and bounce prediction unavailable |
| CRM/analytics/data foundation | Product + Technology + Business | Lead routing, measurement and future AI unavailable |
| AI governance and staffing | CAIO + Technology + Compliance | High-risk AI cannot safely reach investors |
| Operations/support/RM/CA staffing | Business + Operations | Digital workflows lack service owners and escalation capacity |

## 11. Risks

| Risk | Severity | Why it matters | Response |
|---|---|---|---|
| Incorrect tax/TDS/DTAA calculation | Critical | Financial loss, complaints, regulatory exposure and trust damage | Deterministic/config-driven engine, source reconciliation, tax/legal sign-off |
| US PFIC or Canada FAPI policy is wrong | Critical | Punitive foreign tax treatment and platform liability | Gate activation until qualified counsel and Compliance approve |
| NRE/NRO cross-funding | Critical | Potential FEMA/regulatory breach | Hard validation at account, folio and payment layers; fail closed |
| Stale country restriction data | Critical | Restricted users may transact in ineligible schemes | AMC contracts, effective dates, update SLAs, safe fallback |
| Timeline/scope mismatch | High | Broad Phase 1 and AI inventory are not credible for the timeline concern | Define thin-slice MVP and decision gates |
| Payment/RTA outage near cut-off | High | Missed NAV, duplicates, unmatched orders, refunds | Idempotency, state machine, reconciliation, fallback and communications |
| KYC/IPV interpretation unresolved | High | Digital onboarding may not satisfy requirements | Compliance/vendor confirmation before design or build |
| AI hallucination, bias or PII leakage | High | Financial misinformation or privacy breach | Deterministic tools, RAG, guardrails, red-team, human override, audit |
| GDPR/DPDP/vendor data gaps | High | Cross-border processing and deletion/consent exposure | Data map, lawful basis, DPA/transfer assessment, retention controls |
| SIP mandate bounce | Medium | Retention and AUM continuity suffer | Reminders, retry policy, alternatives and consent-aware AA fallback |

## 12. Missing Requirements

- Launch countries and country-by-country eligibility matrix are UNKNOWN.
- MVP boundary, launch cohort, release acceptance criteria and closed-beta plan are UNKNOWN.
- Launch AUM, revenue, user, budget and payback targets are UNKNOWN.
- Approved legal interpretation and customer language for DTAA, PFIC/FAPI, TDS, FEMA and repatriation are UNKNOWN.
- Exact data models, API contracts, idempotency, retries, reconciliation keys and source-of-truth hierarchy are UNKNOWN.
- Authentication and account recovery beyond OTP are UNKNOWN.
- Fees, charges, minimums, limits, exit-load communication and fee presentation are incomplete.
- Consent, preference center, opt-out and communication frequency governance are incomplete.
- Accessibility test criteria, supported browsers/devices, localization rules and translation ownership are UNKNOWN.
- Support coverage, staffing, time zones and escalation ownership are incomplete.
- Data retention/deletion matrix by data type and geography is UNKNOWN.
- AI evaluation datasets, thresholds, fallbacks, approval, monitoring and incident runbooks are incomplete.
- Minor accounts are absent and require a scope decision. [Notes Table 7]
- RM vs support-agent responsibilities and staffing are unresolved. [Notes Tables 9 and 13]

## 13. Ambiguities in the BRD

| Ambiguity / conflict | Where observed | Why it matters |
|---|---|---|
| GIFT City / IFSC phase | In-scope Phase 1, out-of-scope/planned Phase 2, other tables disagree | Changes licensing, country strategy, PFIC solution and architecture |
| Advanced orders | Phase 1 scope lists SWP/STP/switch/NFO; Phase 1 core table is narrower; Phase 2 lists advanced orders | Changes MVP and testing scope |
| DTAA timing | In-scope Phase 1 but also appears in Phase 2 feature grouping | Tax value proposition and compliance engine may be launch-critical or deferred |
| AI phasing | BRD marks six AI layers Phase 1; Notes recommend only Smart KYC and pre-redemption tax simulator | Changes staffing, governance, cost and delivery risk |
| Execution platform status | NSE MF marked currently used; other sections call for selection | Integration and contract assumptions are unsettled |
| KYC vendor status | Digio currently opted; notes still frame vendor RFP as a decision | Onboarding depends on vendor capability and evidence |
| IPV meaning | Fully digital platform but in-person verification language remains | Could invalidate the intended digital onboarding model |
| Switch scope | Intra-AMC in scope; later detail allows inter-AMC | Changes eligibility, routing and tax behavior |
| Repatriation thresholds | USD 1M appears alongside different threshold wording in tax-service content | Incorrect communication can harm users |
| Tax law status | Definitive TDS matrix alongside appeals and regulatory-change caveats | Needs dated sources, owner and change control |
| Web parity | Mobile-first requirements and full web parity both appear | Changes architecture, timeline and reporting usability |

## 14. Questions for Stakeholders

1. What is the committed launch date, and is it an external commitment or internal aspiration?
2. What is the launch cohort: countries, expected investors and account types?
3. What is the smallest money-moving release: onboarding, KYC, lumpsum, SIP, redemption, portfolio, reporting, DTAA, joint accounts and advanced orders?
4. Which source of truth is approved for eligibility, NAV, holdings, capital gains and TDS?
5. Is NSE MF definitively selected, with signed API and operational SLAs?
6. Is Digio definitively selected, and how will remote IPV satisfy the requirement?
7. Which payment provider has written NRE/NRO, UPI and eNACH confirmation for target banks?
8. Will US and Canada NRIs be enabled, scheme-restricted or deferred until legal sign-off?
9. Which DTAA countries are supported at launch and what language has Legal/Tax approved?
10. What is the approved TDS/repatriation matrix, including effective dates and thresholds?
11. Is web full parity required at launch, or is responsive web a later release?
12. Are RMs staffed for launch? What AUM threshold and service SLA apply?
13. Are RM and support-agent roles distinct, or should one internal workspace serve both?
14. What support coverage is required across NRI time zones and weekends?
15. Which AI features are approved for launch versus internal decision support?
16. What is the human-review policy for AI KYC, tax, fraud, support and regulatory drafts?
17. What investor data may be sent to third-party model providers and under what retention terms?
18. Are minor accounts in or out of Phase 1?
19. What are the launch thresholds for activation, AUM, SIP, order success, support and compliance?
20. Who signs off business rules, vendor readiness, legal interpretation and release acceptance?

## 15. Features Grouped by Module

| Module | Features |
|---|---|
| Onboarding & KYC | Registration, OTP, PAN, CKYCR, video KYC, OCR, liveness, AML, EDD, FATCA/CRS, PFIC, eSign, document pack, re-KYC, resident conversion |
| Profile & account | NRE/NRO/FCNR, joint accounts, mandates, risk profile, nominees, document expiry, address/country change, DTAA documents |
| Fund discovery | Scheme listing, eligibility, country restrictions, detail pages, risk-o-meter, watchlist, NFOs |
| Order execution | Lumpsum, SIP lifecycle, redemption, SWP, STP, switch, NFO, IDCW, order lifecycle, cut-off |
| Payments & reconciliation | Net banking, UPI, eNACH, UPI AutoPay, AA balance check, refunds, three-way matching, exception aging |
| Portfolio & tax | Holdings, gains, XIRR, multi-currency, transaction history, capital gains, TDS, annual statements, Form 15CA/15CB, Form 67, repatriation |
| Held-away / AA | CAS upload/import, OCR, manual correction, consented refresh, held-away tagging |
| Goals / model portfolios | Goals, inflation-adjusted SIP, goal-linked investment, progress, shortfall, drift and rebalancing |
| Operations | Order/KYC/reconciliation/EDD queues, masters, overrides, maker-checker, exports, commission and revenue |
| Risk / fraud | Device, sessions, velocity, large-redemption review, anomaly, geofencing, phishing, suspicious activity |
| Engagement | Push, email, SMS, WhatsApp, banners, lifecycle nudges, tax season, festive campaigns, commentary |
| Support | Tickets, chat, callback, help center, helpdesk, escalation, grievance, SCORES |
| RM / other products | Assigned clients, assisted initiation, EUIN, product interest, CRM routing, tax/CA interest, SLA dashboards |
| AI | Smart KYC, tax simulator/Q&A, RAG, personalization, fraud, operations, support, WhatsApp, later RM/voice/ITR/notice features |

## 16. Feature Priority: Must / Should / Could / Won’t

> This is an initial discovery prioritization, not an approved roadmap.

| Priority | Initial feature set | Rationale / condition |
|---|---|---|
| MUST | Registration, OTP, PAN, country/tax residency, approved KYC, AML/EDD, FATCA/CRS, NRE/NRO tagging, scheme eligibility, one purchase type, payment, order status, basic portfolio, support, audit, operations/reconciliation, core security | Minimum safe money-moving product |
| MUST | Basic reporting and tax transparency using approved source data; repatriation warnings | Required for trust; exact tax logic needs sign-off |
| SHOULD | SIP, mandate lifecycle, redemption, DTAA documents, re-KYC, nominees, web reporting, notifications, held-away upload, RM/support access | High user/business value but integration-heavy |
| SHOULD | Refund tracking, maker-checker exception handling, analytics funnel, lifecycle CRM | Reduces operational risk and enables growth measurement |
| COULD | SWP, STP, switch, NFO, IDCW, goals, model portfolios, advanced calculators, CAS API, AA refresh | Expansion after core data and execution stabilize |
| COULD | Pre-redemption tax simulator, Smart KYC automation, internal AI ops/support drafts, read-only WhatsApp assistant | Only with deterministic calculation, guardrails and human review |
| WON'T: first release | PMS/AIF/unlisted/bonds execution, full CA delivery, remittance integration, GIFT City unless separately approved, resident clients, direct plans, offline transactions | Explicitly deferred/out of scope or lead-capture only |
| WON'T: first release | Voice investing, deep personalization, churn/bounce prediction, ITR/notice agents, RM Copilot, deep AI tax advisor | Deferred or dependent on data, governance and legal maturity |

## 17. Initial Product Scope

Recommended discovery scope for the first release:

- Controlled launch for a small number of approved NRI countries.
- Digital registration and approved KYC with status, exception and support handling.
- NRE/NRO segregation across profile, folio, payment, order, reporting and reconciliation.
- One reliable MF purchase journey, followed by basic portfolio and order visibility.
- Operations portal for KYC, orders, reconciliation, exceptions and master-data governance.
- Basic reporting from verified execution/RTA data.
- Security, support, consent, audit, retention and incident processes as launch features.

This is intentionally narrower than the BRD’s labelled Phase 1. It is a strategy recommendation based on source conflicts and dependencies, not a fact from the BRD.

## 18. Out-of-Scope Features

- Resident Indian journeys.
- Execution of PMS, AIF, unlisted stocks, bonds, NCDs, REITs, InvITs and other non-MF instruments.
- Full CA service delivery; Phase 1 source describes lead capture/routing.
- Offline/physical transactions and direct-plan execution.
- International remittance integration unless the phase plan changes.
- GIFT City/IFSC investments unless licensing, vendor and phase conflicts are resolved.
- Voice execution, proactive tax-notice detection, full ITR automation, deep personalization, churn and SIP-bounce prediction unless separately approved.

## 19. Technical Constraints

- Dependence on external execution, RTA, KYC, payment, messaging, CRM, analytics and AA vendors.
- NRE/NRO segregation must be enforced across every money and reporting layer.
- Country eligibility data may require manual Operations ownership with effective dates and audit history.
- Reverse feeds create eventual-consistency states; order lifecycle and reconciliation must be idempotent and observable.
- Tax/DTAA rules must be versioned, configuration-driven and approved without code releases for every change.
- AI requires PII controls, prompt/output logging decisions, guardrails, model versioning, human override and rollback.
- Multi-geography access, dual time zones, currencies, web/mobile parity, offline caching and WCAG 2.1 AA add substantial QA scope.
- Retention requirements differ across source statements; architecture needs policy-based retention and deletion.

## 20. UX Risks

- Onboarding may become long and intimidating because KYC, FATCA/CRS, bank linkage, risk profiling, nominee and eSign are all included.
- NRE/NRO, repatriability, TDS, DTAA, PFIC/FAPI and country restrictions create high cognitive load at the investment decision point.
- Manually maintained country restrictions may appear inconsistent without explanations, dates and a visible source of truth.
- Tax savings and zero-tax language can overpromise while rulings are under appeal and treatment varies by country.
- Multiple time zones, currencies and financial-year conventions create interpretation risk.
- AI explanations may appear authoritative despite being estimates; boundaries between computation, education and advice must be clear.
- Payment/RTA delays can look like failure or duplication without strong pending-state communication.
- The platform risks becoming a crowded super-app if mutual funds, tax services, other products, goals, AI and RM surfaces launch together.
- Joint accounts, nominee changes, resident conversion and re-KYC require high-consequence recovery paths.

## 21. Compliance & Regulatory Considerations

> The source documents contain regulatory assertions and legal interpretations. This document does not independently validate them. Customer-facing rules, calculations, disclosures and eligibility behavior require formal Compliance, Legal and Finance/Tax sign-off.

- Named frameworks include RBI/FEMA, PMLA, FATCA/CRS, Income Tax Act provisions, AMFI, SEBI KYC regulations, GDPR/UK GDPR and DPDP.
- KYC/AML must cover CKYCR, video KYC/IPV interpretation, identity evidence, sanctions, PEP, adverse media and EDD.
- Regular-plan distribution requires AMFI ARN; assisted transactions require EUIN where applicable.
- US activation requires PFIC policy and qualified US legal review; Canada requires FAPI and securities-law consideration.
- DTAA requires country-specific treaty interpretation, TRC/Form 10F validation, validity tracking, refund/FTC language and AMC/RTA feasibility.
- NRE/NRO segregation and repatriation tracking must be enforced and evidenced at transaction level.
- GDPR/UK GDPR requires a data map, lawful basis/consent, vendor DPAs, transfer assessment, rights handling, retention/deletion and possible DPO assessment.
- AI affecting KYC, money, fraud or compliance status must remain decision support with human override, explainability and audit records.
- SCORES, grievance handling, communication consent, marketing opt-out and complaint SLAs need named owners and evidence.

## 22. Success Metrics

| Metric group | Metric / target in BRD | Discovery note |
|---|---|---|
| Acquisition | Install-to-registration >40%; registration-to-KYC initiated >60% | Baseline, channel mix and sample size are UNKNOWN |
| Activation | KYC completion >70%; KYC-to-first-investment >50% within 30 days; first-investment-to-SIP >40% within 60 days; median first investment <7 days | Segment by country/channel; SIP depends on mandate readiness |
| Engagement | Transacting MAU >30%; active SIP >50%; 12-month SIP continuation >70%; DTAA activation >40%; WhatsApp opt-in >25% | Define denominator, eligibility and cohort windows |
| Business | AUM growth, net new SIPs, trail revenue, AUM/investor, RM vs direct AUM | Targets are UNKNOWN and must be set by Business |
| Operations | Order success >98%; same-day reconciliation; KYC approval >95% within 4 business hours; L1 >90% within 24h; uptime 99.9%; bounce <8% | Define exclusions and reporting method |
| AI hypotheses | Smart KYC 95% auto-approval/8 minutes; support 70% auto-resolution; ops reduction; bounce/churn improvements | Treat as hypotheses until datasets, baselines and evaluation plans exist |

## 23. KPIs

- North-star candidate: activated NRI AUM with compliant, retained investments. The BRD does not explicitly name a north star; this is a recommendation.
- Funnel: acquisition source, install, signup, KYC, approval, first investment, SIP activation and repeat investment.
- Trust/compliance: eligibility-block accuracy, KYC exceptions, EDD TAT, tax-estimate discrepancy, complaints per 1,000 orders, DTAA renewal, document-expiry completion.
- Transaction reliability: payment success, submission latency, acceptance, reconciliation, duplicate/mismatch rate, refund TAT and cut-off misses.
- Customer value: time to first investment, report usage, redemption complaints, SIP continuation, self-service resolution, NPS/CSAT by country.
- Business efficiency: CAC/CPI, cost per activated investor, AUM/investor, trail revenue, RM conversion, lead SLA and support cost.
- AI quality: grounded-answer rate, numerical accuracy, unsafe-answer rate, human override rate, false positives/negatives, latency, cost, drift and rollback events.

**UNKNOWN:** KPI owners, dashboards, event schema, warehouse, attribution methodology, guardrail thresholds and review cadence.

## 24. Suggested Next Steps

1. Hold a scope-and-launch workshop with Business, Product, Technology, Operations, Compliance, Legal and Finance/Tax.
2. Approve launch countries, launch form factor, launch date type, target cohort and MVP boundary.
3. Resolve the phase matrix for GIFT City, DTAA, advanced orders, joint accounts, AI, RM portal, web parity and CA services.
4. Create a regulatory decision register with owner, source, effective date, customer language, implementation rule, test case and review cadence.
5. Complete vendor readiness gates for execution, CAMS/KFintech, KYC/IPV, payments, messaging, CRM, analytics and AA.
6. Define the canonical data model and source-of-truth matrix for investor, account, folio, scheme, eligibility, order, payment, RTA, tax, document and consent data.
7. Define the operating model: queues, fallbacks, maker-checker, support coverage, EDD, reconciliation, incident response, grievance and escalation ownership.
8. Write a thin-slice PRD and acceptance-test plan for onboarding, approved KYC, account tagging, one purchase type, payment, order status, portfolio, support and auditability.
9. Treat AI as a gated workstream: start with vendor-supported OCR/liveness and deterministic tax calculation only after approval; defer generative explanations until evaluation and guardrails are proven.
10. Conduct foundational research with representative NRI users across intended launch countries, including joint holders and users with tax/reporting needs.
11. Instrument approved funnel and operational KPIs from day one with explicit definitions, owners, cohorts and review cadence.
12. Only after sign-off, proceed to detailed product flows, information architecture, interaction design, design system and engineering story decomposition.

> **Recommended approval gate:** Do not label the BRD PRD-ready until launch scope, regulatory rule register, vendor readiness, data source-of-truth matrix, operating model and success metrics have named owners and sign-off status.
