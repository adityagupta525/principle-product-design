# NRI DIY Mutual Fund Platform
## User Research Synthesis

**Role:** Principal UX Research Lead  
**Status:** Evidence-led hypothesis synthesis; primary research not yet conducted  
**Scope:** User segmentation, personas, jobs, journey, pain points, research plan, metrics, opportunity tree and principles  
**Constraint:** No UX flows or UI designs

## Research Integrity Note

This document does not fabricate user interviews, survey results, usability findings or analytics. The current evidence base is the supplied BRD and technology notes, the Product Discovery reverse-engineering report, the Market Intelligence and Competitive Analysis report, and the public industry/competitor evidence cited in that report.

Therefore:

- Persona details are **research hypotheses**, not validated user facts.
- “Current journey” is reconstructed from requirements, market evidence and operational dependencies.
- Frequency and prevalence are not yet known.
- Recommendations are framed as hypotheses to validate.
- Primary research should be completed before committing to detailed interaction design.

# Section 1: User Segmentation

## Segmentation dimensions

| Dimension | Working segments | Why it matters |
|---|---|---|
| Country / region | UAE/GCC; UK/Europe; USA; Canada; Singapore/SE Asia; Australia; returning to India; other approved countries | Country changes fund eligibility, tax treatment, privacy, documentation, communication time and service model |
| Wealth | Emerging: under ₹25L investable; Mass affluent: ₹25L–₹1Cr; Affluent: ₹1Cr–₹5Cr; HNI: ₹5Cr+; household wealth unknown | Wealth affects service expectations, human assistance, product breadth, fee tolerance and urgency |
| Investment experience | Beginner; occasional investor; disciplined SIP investor; experienced allocator; professional/entrepreneurial investor | Experience affects education needs, control preference, tolerance for complexity and trust requirements |
| Age | 18–29; 30–44; 45–59; 60+ | Age is a proxy for life stage, family responsibilities, retirement goals, digital habits and risk concerns; it must not be treated as deterministic |
| Occupation | Salaried professional; entrepreneur/business owner; student/early career; retired; homemaker/family finance manager; cross-border professional | Occupation affects cash-flow timing, liquidity needs, available time and documentation |
| Digital literacy | App-native; digitally capable but finance-anxious; desktop/report-oriented; assisted/digitally reluctant | Determines onboarding support, explanation depth, device preference and human escalation |
| Tax complexity | Low: one residence and simple Indian MF income; Medium: multiple accounts or Indian income; High: dual residency/property/foreign income; Very high: US/Canada/PFIC/FAPI/complex structures | Tax complexity may be more predictive of friction than wealth alone |
| Investment behaviour | Goal-led; SIP disciplined; opportunistic lumpsum; tax-aware/redemption-led; family-led; advice-seeking; portfolio neglector; cross-border diversifier | Behaviour identifies moments of intent and likely product value |

## Priority research segments

| Segment | Hypothesis | Priority |
|---|---|---|
| UAE/GCC mass affluent or HNI, digitally capable | Strong India connection and high potential value; needs DTAA, repatriation and trust | P0 |
| UK/Singapore digitally capable professional | Comfortable with self-service but wants tax/reporting confidence | P0 |
| US/Canada NRI | High regulatory complexity and possible fund restrictions; needs specialist support | P0 research, legally gated launch |
| Returning NRI / country changer | Existing portfolio continuity and resident-conversion problems are underserved | P1 |
| Joint NRI household | Financial decisions and authorization are shared; family continuity matters | P1 |
| Beginner NRI investor | High anxiety and limited mental model of Indian MF/NRE/NRO rules | P1 |
| Experienced NRI investor | Wants control, low friction, transparent data and sophisticated reporting | P1 |
| Internal operations/compliance user | Product success depends on handling exceptions reliably | P0 |

**Segmentation recommendation:** Do not launch with one “NRI persona.” Prioritize by country × tax complexity × investment intent, then layer wealth and experience. A US beginner and a UAE HNI have materially different eligibility, documentation, tax and service needs.

# Section 2: Primary Personas

These are provisional personas and should be treated as recruitment hypotheses.

## Persona A: The Confident Gulf Builder

**Profile:** UAE/GCC professional or business owner; mass affluent to HNI; digitally capable; invests in India for family, retirement and wealth continuity.

**Goals:** Grow India-linked wealth; invest regularly; understand DTAA/TDS/repatriation before acting; maintain family and nominee arrangements.

**Motivations:** India connection; control without administration; confidence money can be moved; tax-aware decisions.

**Pain points:** Unclear eligibility and tax treatment; fragmented reports; NRE/NRO/repatriation risk; resident-centric apps.

**Frustrations:** Repeated documents; waiting for email/callbacks; generic content; “contact your bank/CA” with no next step.

**Needs:** Country-aware rules; pre-action tax and repatriation context; high-quality reports; human escalation; transparent regular-plan value.

**Behavior:** Periodic lumpsums around bonuses, remittances or India visits; multiple accounts; spouse/family involvement; may tolerate fees if errors are prevented.

**Mental models:** “India wealth is a responsibility I need organized.” “Tax is part of the transaction.” “Banks move money; platforms should make decisions understandable.”

**Digital habits:** Mobile for alerts/actions; desktop for reports/tax; WhatsApp/email for service; expects asynchronous progress.

**Financial behaviour:** SIP plus large periodic investments; may own property, deposits, MF and insurance; may need repatriation later.

**Risk appetite:** Moderate to high investment risk; very low compliance uncertainty tolerance.

**Technology comfort:** High for standard apps; moderate for complex finance forms.

**Provisional quote:** “I do not need another fund list. I need to know that the decision is valid for my situation.”

**Success criteria:** Acts without external clarification for routine decisions; understands net outcome before redemption; keeps documents current; trusts exception handling.

**Failure criteria:** Block without explanation; TDS/repatriation surprise; no country-specific answer; context lost during handoff.

**Reasoning:** The BRD’s strongest differentiators—DTAA, NRE/NRO, repatriation, dual time zones and HNI RM support—map directly to this segment. Validate whether tax savings or operational certainty is the stronger trigger.

## Persona B: The Digitally Fluent Global Professional

**Profile:** UK/Singapore/Europe-based salaried professional; emerging to mass affluent; digitally confident; expects self-service.

**Goals:** Start/maintain SIPs; track India wealth alongside global finances; get tax-ready reports; avoid unnecessary calls.

**Motivations:** Retirement/children/home/return goals; convenience; transparency; guidance without selling.

**Pain points:** India FY versus residence-country reporting; weak cross-currency context; uncertain tax responsibility; apps that are too basic or sales-driven.

**Frustrations:** Repeated logins/statements; generic risk labels; hard-to-export information; late country restrictions.

**Needs:** Portfolio aggregation; country checklist; exportable reports; notification control; evidence-backed explanations.

**Behavior:** Researches and compares first; prefers recurring SIPs; may switch over onboarding/reporting; shares with spouse or CA.

**Mental models:** “Digital services should be modern.” “If the platform has my data, it should help me understand it.” “I want guidance, not selling.”

**Digital habits:** Mobile monitoring; desktop reporting; searchable help; downloadable data.

**Financial behaviour:** Regular SIP, occasional rebalance, moderate diversification, long horizon.

**Risk appetite:** Moderate market risk; low process risk.

**Technology comfort:** High.

**Provisional quote:** “Give me the answer and the evidence, then let me decide.”

**Success criteria:** Completes onboarding, sets SIP, downloads useful reports and returns for tax activity.

**Failure criteria:** Cannot determine eligibility, export data or get clear tax guidance.

**Reasoning:** Competitors satisfy generic digital convenience; the switching hypothesis is cross-border context and evidence-backed reporting.

## Persona C: The High-Complexity NRI

**Profile:** US/Canada resident, higher income or complex Indian assets; understands rules are difficult; may own property, NRO income or multiple investments.

**Goals:** Know whether investment is legally and tax-wise appropriate; avoid PFIC/FAPI/FATCA/TDS/reporting mistakes; get qualified help quickly; preserve options.

**Motivations:** Risk avoidance; asset preservation; family/tax responsibility; defensible documentation.

**Pain points:** Restricted product access; conflicting tax advice; foreign reporting; lack of trusted specialist support.

**Frustrations:** Generic “NRI eligible” labels; late rejection; disclaimers that shift all responsibility; no data-sharing clarity.

**Needs:** Early eligibility decision; explicit legal boundary; source-linked education; CA/legal escalation; evidence pack.

**Behavior:** Researches extensively; asks a CA before action; prefers fewer defensible actions; may transact less often but at higher value.

**Mental models:** “The cost of being wrong is higher than the cost of waiting.” “A platform must prove it understands my jurisdiction.”

**Digital habits:** Uses digital tools but prefers specialist confirmation for high-stakes decisions.

**Financial behaviour:** Larger, less frequent transactions; complex tax events.

**Risk appetite:** Market risk may be moderate/high; compliance risk tolerance is very low.

**Technology comfort:** High, but good UX does not equal safe advice.

**Provisional quote:** “Do not tell me I can invest until you can explain the consequences.”

**Success criteria:** Correct screening, clear limitations, evidence and specialist help.

**Failure criteria:** Incorrect eligibility, unsupported tax claim or missing audit trail.

**Reasoning:** The BRD explicitly identifies US/Canada as highest complexity and requires legal gating. This segment may be valuable but is not an easy launch segment.

## Persona D: The Family Continuity Manager

**Profile:** 40–60, often a parent or household financial coordinator; may be in GCC, UK or Singapore; manages India assets for spouse, children or parents.

**Goals:** Organize family holdings; keep nominees/joint details current; plan education/retirement/property needs; ensure access if something happens.

**Motivations:** Responsibility, continuity, family security, reduced administration.

**Pain points:** Fragmented ownership; nominee ambiguity; no household view; difficult death claims or resident conversion.

**Frustrations:** Single-user assumptions; repeated documentation; unclear permissions; opaque service status.

**Needs:** Permissioned family view; joint authorization; nominee readiness; document vault; service history and handoff.

**Behavior:** Fewer but higher-consequence decisions; coordinates spouse, parents and CA.

**Mental models:** “My portfolio is part of the family system, not just my dashboard.”

**Digital habits:** Mobile alerts; desktop/email for documents; values saved context.

**Financial behaviour:** Goal-linked SIPs, property/income redemption and conservative family allocation.

**Risk appetite:** Moderate or conservative.

**Technology comfort:** Moderate to high; prioritizes clarity over novelty.

**Provisional quote:** “If something happens to me, my family should not have to reconstruct everything.”

**Success criteria:** Current family data, clear responsibilities and recoverable service.

**Failure criteria:** No permission model, nominee readiness or next-step owner.

**Reasoning:** The BRD includes joint accounts, nominees, minor guardians and death claims, but not as the organizing model. Validate whether continuity drives acquisition or mainly retention.

## Primary prioritization

| Persona | Acquisition value | Pain intensity | Product fit | Recommendation |
|---|---:|---:|---:|---|
| Confident Gulf Builder | High | High | Very high | P0 |
| Digitally Fluent Global Professional | High | Medium/high | High | P0 |
| High-Complexity NRI | High value, lower volume | Very high | High but legally complex | P0 research; gated launch |
| Family Continuity Manager | Medium/high | High | High | P1 |

# Section 3: Secondary Personas

## Family Members

**Goals:** Shared visibility, clear permissions, continuity and nominee readiness.  
**Pain points:** No access, unclear authority, duplicate documents and privacy concerns.  
**JTBD hypothesis:** “When family finances depend on one account holder, help us coordinate without exposing more information than each person needs.”  
**Research focus:** Decision rights, privacy boundaries, joint-holder behavior, nominee awareness and crisis scenarios.

## Relationship Managers

**Goals:** Acquire, advise within permitted boundaries, prepare calls, see client context and close qualified leads.  
**Pain points:** Fragmented CRM, stale data, unclear authority, poor context and manual follow-up.  
**JTBD hypothesis:** “When a high-value client needs help, give me a complete brief and a safe way to initiate—not execute—an action.”  
**Research focus:** AUM threshold, staffing, role boundary, EUIN evidence and escalation.

## Compliance Team

**Goals:** Correct decisions, fewer false positives, evidence, risk monitoring and policy enforcement.  
**Pain points:** Incomplete documents, poor lineage, manual country rules, AI opacity and unclear ownership.  
**JTBD hypothesis:** “When a case is ambiguous, give me evidence, rule context, confidence and a controlled override path.”  
**Research focus:** Review queues, decision criteria, audit, false-positive costs and acceptable automation.

## Operations Team

**Goals:** Process orders, reconcile payment/RTA data, resolve exceptions and maintain masters.  
**Pain points:** Late feeds, manual corrections, unclear ownership, duplicate work, stale eligibility and cut-off pressure.  
**JTBD hypothesis:** “When a transaction breaks across systems, help me identify the break, act safely and prove resolution.”  
**Research focus:** Exception taxonomy, reconciliation keys, handoffs, SLAs and peak windows.

## Support Team

**Goals:** Resolve issues quickly and route high-risk cases correctly.  
**Pain points:** No single context, unclear status, repeated authentication, weak knowledge and dependencies.  
**JTBD hypothesis:** “When a customer asks what happened, give me the timeline, correct explanation and next responsible owner.”  
**Research focus:** Contact reasons, repeat contacts, escalation quality, time zones and knowledge gaps.

## Finance Team

**Goals:** Reconcile commissions, TDS reports, revenue and partner payouts.  
**Pain points:** Data mismatch, manual exports, uncertain source and changing rates.  
**JTBD hypothesis:** “When financial data changes, help me reconcile it with traceability and effective dates.”  
**Research focus:** Reports, dimensions, approval workflow and audit evidence.

## Tax Consultants

**Goals:** Receive a structured brief, verify facts, advise within scope and complete services efficiently.  
**Pain points:** Incomplete documents, unstructured context, unclear consent, repeated intake and unrealistic expectations.  
**JTBD hypothesis:** “When an NRI asks for help, give me verified context and documents so I can focus on judgment.”  
**Research focus:** Required data, acceptable automation, engagement, consent, fees and liability boundaries.

# Section 4: Jobs To Be Done

## Primary personas

| Persona | Functional jobs | Emotional jobs | Social jobs |
|---|---|---|---|
| Gulf Builder | Invest, monitor, redeem, understand DTAA, repatriate, maintain documents | Feel in control and protected from mistakes | Be a responsible family wealth steward |
| Global Professional | Research, compare, SIP, track, export reports, update KYC | Feel efficient and financially competent | Demonstrate disciplined long-term planning |
| High-Complexity NRI | Verify eligibility, assess tax, document decisions, get specialist help | Reduce fear of hidden liability | Be defensible to family, CA, employer or regulator |
| Family Continuity Manager | Coordinate assets, nominees, permissions, goals and claims | Feel prepared and responsible | Protect family stability and options |

## Secondary personas

| Persona | Functional jobs | Emotional jobs | Social jobs |
|---|---|---|---|
| Family member | View permitted information, authorize, update nominee/identity | Feel included and secure | Share financial responsibility |
| RM | Prepare, initiate, record, escalate and follow up | Feel effective and compliant | Build a trusted relationship |
| Compliance | Review, approve, reject, evidence and monitor | Feel confident in decisions | Protect institution and investor |
| Operations | Match, reconcile, correct, configure and report | Feel in control under pressure | Be reliable to customers and business |
| Support | Diagnose, explain, resolve and escalate | Feel capable and supported | Restore customer trust |
| Finance | Reconcile, calculate, export and audit | Feel data is reliable | Protect financial integrity |
| Tax consultant | Intake, validate, calculate, file and communicate | Feel prepared and professionally protected | Deliver credible specialist value |

## JTBD research prompts

- Tell me about the last time you invested, redeemed or needed a report.
- What did you need to know before acting?
- Where did you get that information?
- What could have gone wrong?
- Who else was involved?
- What did you do when the process did not behave as expected?
- What would make you trust a platform enough to move money?

# Section 5: Customer Journey

## Current journey reconstructed from evidence

| Stage | Current behavior hypothesis | Pain | Emotion | Trust |
|---|---|---|---|---|
| Need arises | NRI decides to invest, redeem, update documents or file taxes | Trigger disconnected from platform | Intent + uncertainty | Low/neutral |
| Research | Searches web, bank, broker, CA or community | Generic/conflicting information | Cognitive load | Fragile |
| Eligibility/KYC | Completes platform/bank/AMC documentation | Repetition, restrictions, offline steps | Frustration/anxiety | Conditional |
| Funding | Selects NRE/NRO route/payment | Bank compatibility and mandate uncertainty | Caution | High stakes |
| Order | Invests/SIPs/redeems | Cut-off, NAV, TDS and repatriation may be unclear | Hope/fear | Momentary |
| Waiting | Waits for payment, RTA, units, refund or KYC | Fragmented status | Impatience | Declines if opaque |
| Portfolio | Checks returns and reports | Tax/residence context separated from performance | Monitoring | Moderate |
| Tax/repatriation | Assembles reports, contacts CA | Manual reconciliation and unclear responsibility | Overwhelm | Low |
| Change event | Moves country, passport expires, becomes resident or needs family access | Continuity is not standardized | Stress | Vulnerable |

## Ideal journey hypothesis

The user understands eligibility, chooses an action, sees financial and compliance consequences before committing, observes truthful system state afterward, and can recover through a named human owner when the platform cannot complete the job.

## Future journey hypothesis

The product becomes a longitudinal NRI operating layer that:

1. Maintains a trusted compliance passport.
2. Keeps an evidence-backed portfolio/document graph.
3. Surfaces upcoming obligations without over-claiming.
4. Explains decisions before action.
5. Coordinates family, CA, RM, bank and operations handoffs.
6. Preserves continuity across country and life-stage changes.

## Pain mapping

- **Highest:** KYC exceptions, country eligibility, tax uncertainty, NRE/NRO errors, delayed or failed transactions.
- **High:** Report assembly, document expiry, country change, family permissions and specialist handoff.
- **Medium:** Discovery, comparison, calculators and generic engagement.
- **Low:** Decorative personalization and novelty features.

## Emotion mapping

| Stage | Likely emotion | Research question |
|---|---|---|
| Research | Curious but uncertain | What creates initial confidence? |
| KYC | Exposed and anxious | Which document or question feels risky? |
| Funding | Cautious | What proof is needed before payment? |
| Confirmation | Relief or fear | Which information is essential? |
| Waiting | Impatient | What status detail reduces repeat contacts? |
| Tax | Overwhelmed | What does “tax-ready” mean? |
| Change event | Stressed | Who coordinates the change? |

## Trust mapping

**Trust increases through:** clear eligibility reason; regulated entity/custody clarity; accurate status/timestamps; source-linked tax explanation; consistent account/folio treatment; human ownership; evidence shareable with a CA.

**Trust decreases through:** unsupported tax-saving claims; silent status changes; repeated documents; contradictory information; hidden regular-plan economics; AI confidence without sources.

# Section 6: Pain Point Analysis

Ranking reflects potential severity and product leverage, not measured prevalence.

## Critical

| Pain point | User impact | Why critical |
|---|---|---|
| Wrong or unclear country eligibility | Ineligible transaction or late rejection | Compliance and financial risk |
| NRE/NRO or repatriation mistake | Regulatory breach or inability to move money | Direct money/trust impact |
| Incorrect TDS/DTAA explanation | Financial loss and legal exposure | High-consequence decision |
| KYC/IPV failure with no recovery | Onboarding abandonment | Blocks access |
| Payment/order/RTA mismatch | Duplicate, missing or delayed investment | Money movement and support surge |

## High

- Repeated or unclear documents.
- Unclear pending order states.
- Missing tax-ready reports.
- Country change and resident conversion.
- Joint account and nominee continuity.
- Poor specialist handoff.
- Hidden regular-plan fee/value exchange.
- Inconsistent rules across platform, AMC, bank and CA.

## Medium

- Weak fund comparison context.
- Limited goal planning.
- Generic notifications.
- Incomplete external portfolio aggregation.
- Lack of multi-currency views.
- High form effort for non-critical tasks.

## Low

- Personalization aesthetics.
- Gamification.
- Social leaderboards.
- Voice interaction before reliability.
- Broad content volume.

**Research score:** Priority = Severity × Frequency × Confidence × Strategic leverage. Do not prioritize a loud anecdote over a frequent failure without checking contact rate, abandonment, transaction loss and operational cost.

# Section 7: Behavior Analysis

## Decision making

Hypothesis:

1. Users start with a life or money event, not a fund category.
2. They seek reassurance from people or trusted brands before a high-stakes action.
3. They compare returns, tax, liquidity, eligibility and trust—not returns alone.
4. They postpone when uncertainty is higher than perceived opportunity.
5. They accept human help when the consequence of error is high.

**Research needed:** Reconstruct real recent decisions rather than asking only what users say they would do.

## Investment triggers

- Salary/bonus or remittance availability.
- India visit.
- Tax season.
- Property sale or Indian income event.
- Education, retirement or family milestone.
- Market correction or NFO interest.
- Country move or tax-residency change.
- Advice from family, CA, bank or RM.

## Trust signals

- Known regulated brand or partner.
- Explicit NRE/NRO treatment.
- Source/date for tax or eligibility.
- Clear pending state.
- Human specialist with credentials.
- Secure document handling and consent.
- No pressure to buy.
- Transparent fees and plan type.

## Drop-off reasons

- Unclear eligibility.
- Late document requirements.
- Repeated data entry.
- Unsupported bank/payment method.
- KYC/video failure or no appointment.
- Unsafe legal language.
- No confidence in tax outcome.
- Time-zone mismatch for support.
- Need to ask spouse/CA first.

## Adoption barriers

- Existing bank relationship.
- Fear of moving money to a new provider.
- Perceived regular-plan cost.
- Portfolio already spread across AMCs.
- No immediate investment need.
- US/Canada complexity.
- Lack of proof the product is better than a bank or broker.

# Section 8: Qualitative Research

## Interview plan

**Objectives**

- Validate whether NRI tax/compliance pain drives switching.
- Understand actual investing, redemption, KYC and tax behavior.
- Identify trust thresholds and human-help expectations.
- Discover differences by country, wealth, experience and tax complexity.
- Understand internal exception workflows and service economics.

| Group | Suggested sample | Method |
|---|---:|---|
| UAE/GCC investors | 6–8 | Remote interview + artifact walkthrough |
| UK/Singapore/Europe | 6–8 | Remote interview + report review |
| US/Canada | 6–8 | Remote interview; no product availability promise |
| Returning NRIs | 4–6 | Transition interview |
| Joint/family decision makers | 4–6 households | Paired interview |
| Beginners | 4–6 | Task-based conversation |
| Experienced/HNI | 4–6 | Portfolio/tax decision interview |
| RM/support | 5–7 | Contextual inquiry |
| Operations/compliance/finance | 8–12 | Workflow observation |
| Tax consultants | 4–6 | Artifact and handoff interview |

**Recruitment controls:** Include active investors, recent non-investors and abandoners; recruit by country and tax complexity; capture bank/CA/spreadsheet/WhatsApp usage; never request identifiable account numbers or documents.

## Interview script

1. Where do you live and how do India-related financial decisions fit into your life?
2. What responsibilities do you manage in India?
3. Who else is involved?
4. Tell me about the last time you invested, redeemed or reviewed an Indian MF.
5. What triggered it?
6. Walk me through what you did, in order.
7. What information did you need?
8. Where did you get it?
9. What slowed or worried you?
10. What happened after you submitted the action?
11. When do you think about tax: before, during or after?
12. What do TDS, DTAA and repatriation mean in practice?
13. Tell me about the last time you needed a tax report or CA.
14. What makes a tax explanation trustworthy?
15. What would make you refuse to rely on an app?
16. Which brands or people do you trust with India wealth, and why?
17. What must a new platform prove before you move money?
18. What would make you switch?
19. What would make you stay even if another platform were cheaper?
20. What changes might affect your India investments over the next three years?
21. What happens if you change country, become resident again or need family access?
22. What should automate, and what should always require a person?

## Observation guide

Observe what participants open first, how they describe account/tax status, where they pause, what they save or forward, how they compare funds, words used for NRE/NRO/TDS/DTAA/repatriation, error recovery and who they consult. Do not infer preference from speed alone; slow action may indicate prudent verification.

## Diary study

**Duration:** 21–30 days  
**Sample:** 12–16 across priority segments

Daily prompts:

- What India-related money task occurred?
- What triggered it?
- What information did you seek?
- Who did you ask?
- What did you postpone?
- What created confidence or uncertainty?
- Did you receive an alert, statement, tax or document reminder?
- What did you do with it?

Use redacted screenshots, emails, statements, notes and calendar reminders; no sensitive identifiers.

## Contextual inquiry

Observe KYC exception review, PEP/EDD review, payment/RTA reconciliation, scheme eligibility updates, DTAA document review, support escalation and RM/CA handoff. Capture system switching, manual spreadsheets, duplicate entry, decision evidence, workarounds, wait states and risk points.

# Section 9: Quantitative Research

## Survey

**Target:** 300–500 respondents across launch-country hypotheses, with quotas by country, tax complexity, wealth and experience.

Measure:

1. Country, years abroad, tax residency and NRE/NRO ownership.
2. Current platforms and investment products.
3. Investment frequency and recent triggers.
4. KYC, payment, redemption, TDS, DTAA and repatriation experience.
5. Confidence by task.
6. Trust in banks, brokers, CAs, apps and AI.
7. Willingness to pay or accept regular-plan cost for service.
8. Importance of reports, tax context, family access, human help and country-change support.
9. Switching likelihood and dissatisfaction.
10. The last difficult experience in the respondent’s own words.

Avoid leading with the proposed solution, rating unfamiliar features as if adopted, treating stated interest as adoption or collecting sensitive financial data unnecessarily.

## Analytics plan

Instrument identity/country state, onboarding progress, KYC path and failure, bank/account tagging, eligibility checks/blocks, payment/order states, report use, DTAA documents, support contacts, escalations, consents and document renewal.

## KPIs

**User outcomes:** time to first investment; KYC completion; exception resolution; order success; report usefulness; tax/DTAA completion; SIP activation/continuation; self-service resolution; confidence/trust score.

**Business:** cost per activated investor; AUM by country/cohort; AUM per investor; net new SIPs; regular-plan revenue; RM/CA lead conversion; support cost.

**Risk:** eligibility-block accuracy; tax estimate discrepancy; NRE/NRO mismatch attempts; duplicate orders; KYC false positives/negatives; reconciliation aging; complaints per 1,000 transactions.

## Event tracking

| Area | Events |
|---|---|
| Acquisition | landing_view, referral_source, signup_start, signup_complete |
| Eligibility | country_selected, tax_residency_added, eligibility_check, eligibility_blocked, eligibility_explained |
| KYC | kyc_start, kyc_path_selected, document_uploaded, kyc_failed, kyc_resubmitted, kyc_approved |
| Account | bank_added, account_type_selected, joint_holder_invited, nominee_added |
| Investment | fund_viewed, comparison_started, order_started, order_reviewed, cut_off_acknowledged, payment_started, payment_success, order_submitted, units_allotted |
| SIP | sip_started, mandate_started, mandate_approved, sip_debit_success, sip_debit_failed, sip_paused, sip_cancelled |
| Tax | report_opened, report_downloaded, dtaa_started, trc_submitted, form_10f_submitted, tax_estimate_viewed, repatriation_started |
| Service | help_opened, ticket_created, callback_requested, human_escalation, issue_resolved, repeat_contact |
| Trust | source_opened, explanation_opened, consent_viewed, consent_revoked, disclaimer_acknowledged |

## Funnels

1. Acquisition → registration → KYC → approval → first investment.
2. KYC approval → discovery → order → payment → allotment.
3. SIP intent → mandate → activation → first debit → continuation.
4. Redemption intent → tax preview → confirmation → payout → report.
5. DTAA eligibility → document submission → approval → treaty application → renewal.
6. Support contact → response → resolution → repeat contact.
7. Lead capture → assignment → contact → conversion → service completion.

# Section 10: Opportunity Solution Tree

## Desired outcome

**Increase compliant, retained NRI AUM by making India wealth decisions understandable, executable and recoverable.**

| Problem | Opportunity | Potential solution direction | Evidence / reasoning | Priority |
|---|---|---|---|---|
| NRI cannot tell what is eligible | Make eligibility explainable before payment intent | Country/product rules engine with reason, date and source | BRD and competitor evidence show restrictions are common; explanation is underdeveloped | P0 |
| Tax impact is discovered late | Make after-tax outcome visible before action | Deterministic tax preview with estimate/finality boundary | BRD prioritizes pre-redemption TDS; global leaders make tax ongoing | P0 |
| Repatriation is disconnected | Connect portfolio to repatriable outcome | Repatriation ledger and scenario tool | BRD identifies repatriation as differentiator; competitors rarely lead with it | P0 |
| KYC/documents repeat | Make identity portable and current | Compliance passport and document lifecycle | BRD includes CKYCR/re-KYC; market is fragmented | P0 |
| Exceptions destroy trust | Give every failure an owner | Exception timeline, SLA and human escalation | Operations dependencies are major BRD risks | P0 |
| Regular-plan economics are unclear | Show service value transparently | Fee/value explanation and service guarantee | Direct-plan competitors own cost narrative | P0 |
| NRI wealth is scattered | Create a verified portfolio/source graph | CAS/held-away import with provenance | Competitors aggregate, but NRI tax context is weak | P1 |
| Family continuity is weak | Support shared responsibility safely | Household roles, nominee readiness and handoff | BRD includes joint/nominee needs but not as organizing model | P1 |
| Country changes break continuity | Preserve wealth context | Country-change and resident-conversion management | BRD identifies country-change KYC/tax effects | P1 |
| Specialists lose context | Make handoff structured and consented | CA/RM/support brief with source data | BRD includes lead routing; validate willingness and liability | P1 |
| Generic nudges are ignored | Trigger on meaningful NRI events | Compliance/tax/calendar engagement | Generic nudges are easy to copy; context is more defensible | P1 |
| AI could mislead | Make AI bounded and auditable | Source-grounded explanation with confidence/escalation | High compliance risk; deterministic computation must be authoritative | P1 |

# Section 11: Design Principles

## UX principles

1. Context before action: show eligibility, account, tax and timing before money movement.
2. Explain every restriction: a block without a reason is a trust failure.
3. Design for recovery: every failed or pending state needs an owner and next step.
4. Progress must be truthful: never imply completion before external confirmation.
5. Separate routine from consequential: automate routine tasks and elevate ambiguous actions.
6. Respect the desktop tax moment: mobile may be best for action; desktop may be essential for reports.
7. Make family and specialist roles explicit: permission is safer than informal sharing.
8. Do not use feature abundance as a substitute for clarity.

## Content principles

1. Plain language before legal terminology.
2. Distinguish estimate, source deduction and final liability.
3. State country and effective date for rules.
4. Explain what the user, platform and partner each own.
5. Do not promise zero tax, guaranteed saving or instant outcomes without approved evidence.
6. Put limitations next to the claim they qualify.
7. Use examples cautiously; examples must not look like personal advice.
8. Write for forwarding to a spouse, CA or support agent.

## Accessibility principles

1. Meet WCAG 2.1 AA.
2. Do not encode compliance meaning through color alone.
3. Use readable numbers, dates, currencies and tax terms.
4. Support keyboard, screen reader and zoom on reporting surfaces.
5. Make time zones and deadlines textually explicit.
6. Make document and error requirements perceivable and actionable.
7. Provide accessible alternatives to video, biometric and live-agent steps where allowed.

## Trust principles

1. Show source, date and owner for important rules.
2. Preserve action history and rationale.
3. Make human review visible; never imply review that did not happen.
4. Explain custody, regulation, data sharing and retention.
5. Treat uncertainty as information.
6. Make regular-plan fees and service value transparent.
7. Never use AI authority to compensate for missing evidence.

## Behavioral design principles

1. Use reminders for obligations, not engagement quotas.
2. Prefer timely relevance over high frequency.
3. Let users defer, snooze or delegate tasks.
4. Reduce cognitive load without hiding choices.
5. Show the cost of inaction only when supported by evidence.
6. Keep recommendations explainable and overridable.
7. Make SIP commitment easy to pause and recover.
8. Do not gamify wealth or tax decisions into harmful risk-taking.

# Section 12: Research Summary

## Biggest insights

1. **NRI is a system condition, not a demographic label.** Country, tax residency, bank type, documents, eligibility and family context change the service.
2. **The competitor is fragmentation.** Users may combine broker, bank, AMC, RTA, CA, spreadsheet, email and WhatsApp.
3. **Execution is table stakes.** Competitors already offer low-cost investing, SIPs, broad discovery and portfolio tracking.
4. **Trust is the switching wedge.** Users may accept regular-plan economics if the platform reduces high-cost uncertainty.
5. **Tax is a product moment, not a report.** The highest-value tax interaction may be before redemption, country change or repatriation.
6. **Human support remains strategic.** Global leaders combine automation with advisor access; complex NRIs are unlikely to accept unbounded AI.
7. **Internal teams are part of the customer experience.** Reconciliation, stale masters and weak escalation become customer distrust.
8. **The BRD over-indexes on breadth.** Research must test which hard moments drive switching before adding a super-app layer.

## Top risks

- Personas currently reflect BRD hypotheses rather than observed users.
- Tax/compliance pain may be important but too infrequent to drive acquisition.
- Established banks may win on trust despite inferior UX.
- Regular-plan economics may lose against direct-plan competitors.
- US/Canada may be the most differentiated but least viable launch segment.
- AI ambition may create liability before data and governance exist.
- Household behavior may invalidate single-user assumptions.

## Top opportunities

- Explainable country/product eligibility.
- Pre-action tax and repatriation context.
- Compliance passport and document continuity.
- After-tax, after-repatriation reporting.
- Human escalation with structured context.
- Family and country-change continuity.
- Operations intelligence and transparent exception handling.
- Consent-based NRI data asset.

## Design implications

- Start detailed design with high-consequence moments, not the home dashboard.
- Research mental models of NRE/NRO, TDS, DTAA, repatriation and eligibility before choosing labels.
- Service blueprinting and internal workflow research are prerequisites.
- Content and trust are core product work.
- The product must gracefully support “not available,” “not verified” and “specialist review.”

## Research gaps

- No primary interviews.
- No observed onboarding or redemption behavior.
- No validated segment sizes.
- No abandonment or support analytics.
- No willingness-to-pay or regular-plan value research.
- No trust benchmark against bank/broker/CA alternatives.
- No internal workflow observation.
- No evidence of user understanding of DTAA/PFIC/FAPI/repatriation.
- No accessibility or localization research.

## Next research needed

### P0: Before detailed UX

1. Country × tax-complexity interviews.
2. Recent transaction reconstruction.
3. Internal KYC, reconciliation, support and compliance contextual inquiry.
4. Trust and switching research against bank, broker and CA alternatives.
5. Legal/compliance language review using representative cases.

### P1: Before MVP scope lock

1. Diary study around tax, documents, SIPs and India-related events.
2. Survey for segment sizing.
3. Family/joint-holder research.
4. Desktop versus mobile reporting research.
5. Concept testing of the NRI operating-layer proposition without designing screens.

### P2: After first product evidence

1. Funnel and failure analysis.
2. Support-contact and exception taxonomy.
3. Trust and comprehension measurement.
4. Cohort retention and SIP continuation.
5. AI explanation quality, escalation and harm evaluation.

## Research decision rule

Do not move from discovery to detailed UX design until the team can answer:

- Which NRI country segments launch first?
- What is the highest-frequency, highest-severity problem?
- What evidence shows that problem drives switching or retention?
- Which internal team owns each exception?
- What can be automated safely?
- What must be human-reviewed?
- What claim can the product make truthfully?

**Final research conclusion:** The highest-potential opportunity is not helping NRIs find more funds. It is helping them make fewer costly cross-border mistakes while keeping India wealth understandable, compliant and transferable across life changes.
