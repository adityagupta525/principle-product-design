# NRI DIY Mutual Fund Platform
## Product Strategy

**Role:** Chief Product Officer  
**Status:** Strategy recommendation for stakeholder alignment before PRD and detailed UX  
**Scope:** Product definition, outcomes, prioritization, MVP, roadmap, architecture and decision governance  
**Constraint:** No screens or UX flows are defined in this document

## Strategy Integrity

This strategy is derived from:

- [Product Discovery: BRD Reverse Engineering](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md)
- [Market Intelligence and Competitive Analysis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Market_Intelligence_Competitive_Analysis.md)
- [User Research Synthesis](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_User_Research_Synthesis.md)
- The supplied BRD and technology notes

Market size, behavior, conversion, willingness to pay, legal interpretations and AI performance are not validated product facts unless explicitly cited in the source materials. The strategy therefore distinguishes:

- **Evidence:** stated in the BRD, prior research artifacts or cited market evidence.
- **Hypothesis:** plausible but requiring research or pilot validation.
- **Gate:** a decision that must be resolved before investment in the dependent scope.

# 1. Product Vision

**Make India wealth easier for non-resident Indians to understand, invest in, manage and move responsibly across borders and life changes.**

The product should not be defined as another mutual fund catalogue. Its defensible ambition is an NRI wealth operating layer that combines compliant execution with understandable tax, account, document, repatriation and continuity context.

**Reasoning:** Generic fund discovery and low-cost execution are already well served. The BRD and research synthesis repeatedly identify cross-border uncertainty, fragmented evidence and exception handling as the more differentiated problem.

# 2. Product Mission

**Help an eligible NRI take the next correct wealth action with confidence, evidence and a recoverable path when external systems or rules create uncertainty.**

This mission has three non-negotiables:

1. **Correctness before conversion:** Do not optimize for an order that should not be placed.
2. **Context before commitment:** Show relevant account, country, tax and timing implications before money movement.
3. **Recovery as a product capability:** Pending, rejected and exceptional states are first-class outcomes, not support afterthoughts.

# 3. Product Principles

1. **Start with the NRI condition, not the fund catalogue.** Country, tax residency, account type and eligibility shape the product decision.
2. **Separate information, computation, guidance and advice.** The product must not blur deterministic facts with regulated advice.
3. **Make external dependencies visible.** Banks, RTAs, exchanges, KYC vendors and AMC masters determine many outcomes.
4. **Prefer fewer trustworthy capabilities over broad feature parity.** Feature volume cannot compensate for a failed payment or wrong tax expectation.
5. **Build auditable defaults.** Every rule, calculation, recommendation and override needs source, date, owner and history.
6. **Serve self-directed users without pretending every situation is self-service.** Human escalation is a designed capability, not a failure.
7. **Design for continuity.** A portfolio must survive country change, document expiry, family handoff and changing tax context.
8. **Use AI only where evidence, confidence and human override are available.**
9. **Optimize for retained compliant value, not installs or raw transaction count.**
10. **Do not hide commercial reality.** Regular-plan economics and RM involvement must be explained plainly.

# 4. Product Narrative

An NRI can invest in India, but the decision is rarely only “which fund?” It may also involve NRE or NRO source, country eligibility, tax residency, TDS, DTAA evidence, cut-off timing, repatriation, family permissions and documents that expire while the investor is abroad. Existing products usually solve one part well and leave the investor to assemble the rest across a bank, AMC, RTA, CA, spreadsheet and messaging thread.

This product exists to reduce that fragmentation. It should tell an investor what applies to their situation, what the platform knows, what it cannot determine, what will happen next, and who owns the exception. The investment transaction remains important, but it is the execution layer inside a larger trust proposition.

**Strategic narrative:** “India wealth, made understandable across borders.”

**Narrative test:** If a feature does not reduce a costly uncertainty, improve compliant execution, create continuity or strengthen evidence, it is probably not core to the product wedge.

# 5. North Star Metric

## Recommended North Star Metric

**Monthly Compliant Value Completion (MCVC): the number of eligible, successfully completed user wealth actions in a month that remain compliance-valid and exception-free through the defined settlement or review window.**

Qualifying actions may include:

- First eligible MF investment successfully allotted.
- SIP activated and first debit successfully completed.
- Redemption completed with correct tax/account treatment and payout status.
- DTAA document review completed and applied where legally approved.
- Repatriation-related report or action completed with required evidence.
- KYC or re-KYC completed without unresolved exception after the quality window.

Do not count an action merely because an order was submitted. The action should pass a defined post-event quality check.

**Why this metric:** It balances user value, compliant execution, business value and operational quality. A pure AUM metric could reward unsuitable acquisition; a pure activation metric could reward failed or later-corrected transactions.

## North Star Guardrails

- Order success and allotment accuracy.
- Eligibility-block accuracy.
- Tax/DTAA correction rate.
- Customer complaint rate.
- Exception aging.
- SIP bounce and cancellation.
- Support contacts per completed action.

# 6. Business KPIs

| KPI | Definition | Strategic use |
|---|---|---|
| Net new NRI AUM | New eligible AUM less withdrawals, segmented by country and source | Growth and quality |
| AUM per activated investor | AUM divided by investors completing a qualifying action | Value depth |
| MCVC growth | Qualifying completed actions per month | North Star progress |
| First-action conversion | Eligible approved users completing a first qualifying action | Activation |
| SIP quality rate | SIPs with first debit and defined continuation period | Retention, not vanity activation |
| Trail revenue per active investor | Revenue adjusted for plan type and service cost | Monetization viability |
| Contribution margin | Gross revenue less servicing, vendor and exception cost | Unit economics |
| Cost per activated investor | Acquisition and onboarding cost per qualifying investor | Channel efficiency |
| RM/CA-assisted conversion | Assisted leads converting to quality actions | Assisted model value |
| Support cost per completed action | Support and operations cost divided by MCVC | Scalability |
| Country cohort retention | Active qualifying investors by country over time | Segment quality |
| Compliance loss rate | Financial or operational loss linked to incorrect eligibility, tax or process | Risk economics |

**Challenge to the BRD:** AUM, revenue and installs alone are insufficient. The platform may grow AUM while increasing tax disputes, support burden or regulatory exposure.

# 7. User KPIs

| KPI | Definition |
|---|---|
| Eligibility comprehension | Percentage of users who correctly understand why an action is allowed, restricted or pending |
| Time to confident action | Time from intent to a user-confirmed, evidence-supported decision |
| KYC completion and recovery | Completion rate plus recovery rate after first failure |
| KYC exception aging | Time from failure to resolution by country and failure reason |
| Payment/order success | Submitted actions reaching correct external confirmation |
| State comprehension | User understanding of pending, rejected, allotted and settled states |
| Tax preview usefulness | User-rated usefulness and post-action discrepancy rate |
| Report task success | Users obtaining the report needed for self, CA or filing purpose |
| DTAA renewal completion | Eligible users renewing before expiry where applicable |
| SIP continuation | Active after 3, 6 and 12 months, with bounce reason |
| Self-service resolution | Issues resolved without repeat contact or unsafe automated answer |
| Trust and confidence | Repeated survey score tied to a specific task, not generic satisfaction |
| Accessibility success | Task success across assistive technology, zoom, keyboard and device cohorts |

# 8. Success Metrics

## Product-market success

- At least one launch segment demonstrates repeat use and credible switching evidence.
- Users choose the product for cross-border certainty, not only promotional returns.
- Qualifying actions grow without a proportional increase in exceptions or support cost.

## User success

- Users can determine eligibility before funding intent.
- Users understand the relevant account, tax and timing implications before confirming.
- Users can recover from KYC, payment, RTA and document exceptions without restarting.
- Users can produce evidence that a CA or family member can understand.

## Business success

- Positive contribution margin by launch segment after vendor and service costs.
- Regular-plan economics are accepted by a defined segment because service value is visible.
- AUM and SIP cohorts retain beyond the initial investment event.

## Risk success

- No material regulatory breach attributable to product design or unsupported AI output.
- Every money-affecting automated decision has an audit trail and manual override.
- Regulatory and legal sign-off exists for each country and product scope before launch.

# 9. Opportunity Solution Tree

## Desired outcome

**Increase retained, compliant NRI wealth by reducing costly uncertainty across eligibility, execution, tax, repatriation and continuity.**

| Problem | Opportunity | Candidate product capability | Evidence / reasoning | Priority |
|---|---|---|---|---|
| Users cannot determine whether a fund is valid for their country | Make eligibility understandable before commitment | Country and product eligibility service with reason, source, date and effective period | BRD requires dynamic country restriction enforcement; research ranks this critical | P0 |
| Tax is discovered after redemption | Make tax impact visible before action | Deterministic estimate with standard/treaty assumptions and estimate-versus-final boundary | BRD explicitly requires pre-redemption TDS display | P0 |
| NRE/NRO and repatriation context is fragmented | Connect account source to future movement of money | Account tagging, repatriation ledger and evidence status | BRD and research identify this as the strongest wedge | P0 |
| KYC and document failures cause abandonment | Make compliance portable and recoverable | CKYC-aware KYC, document lifecycle, failure reason and owned escalation | BRD has multiple KYC paths and operational SLA risk | P0 |
| External status is opaque | Make the transaction state truthful and actionable | Event timeline from order, payment, RTA and bank sources | Research identifies waiting as a trust drop | P0 |
| Regular-plan value is unclear | Make service economics explicit | Plan/fee explanation, role boundaries and service promise | Competitors own direct-plan cost narrative; BRD requires regular plans | P0 |
| Reports require manual assembly | Produce evidence-ready reporting | Capital gains, TDS, transaction, portfolio and repatriation exports | BRD has reporting requirements; tax moment is a high-value need | P0 |
| Family continuity is weak | Support safe shared responsibility | Permissioned household roles, nominee readiness and continuity evidence | BRD includes joint/nominee/death claims but not as a core model | P1 |
| Country changes break context | Preserve the investor record across change | Country-change and resident-conversion state management | BRD explicitly identifies these effects | P1 |
| Specialists repeat intake | Create structured, consented handoff | RM/CA brief with source data, missing evidence and action owner | Research identifies handoff fragmentation | P1 |
| Generic engagement is ignored | Trigger only on meaningful obligations and events | Document expiry, SIP, tax and country-change reminders | Relevance is more defensible than content volume | P1 |
| AI may create unsafe confidence | Make AI bounded and inspectable | Retrieval-grounded explanations, confidence thresholds and escalation | BRD proposes broad AI; compliance requires narrower governance | P1 |

# 10. Feature Inventory

| Module | Core capabilities | Strategic role |
|---|---|---|
| Identity and access | Registration, OTP, consent, 2FA, session/device controls | Secure entry |
| NRI profile | Country, tax residency, PAN, overseas/Indian address, NRE/NRO status | Context foundation |
| KYC and AML | CKYC fetch, document upload, video KYC, IPV, FATCA/CRS, PEP/sanctions, EDD | Eligibility and compliance |
| Bank and account | NRE/NRO account capture, tagging, validation, mandate relationship | Money movement correctness |
| Scheme intelligence | NRI eligibility, country restrictions, riskometer, NAV, costs, performance, tax context | Decision quality |
| MF execution | Lumpsum, SIP, redemption, switch, NFO, order status | Core transaction |
| Payments and mandates | Net banking, supported NRI UPI/eNACH, confirmation and failure handling | Execution dependency |
| Portfolio | Holdings, NRE/NRO split, returns, transaction history, source/provenance | Ongoing value |
| Tax and reports | Capital gains, TDS, transaction, annual statement, tax-ready export | High-value retention |
| DTAA | TRC/Form 10F intake, review, validity, approved application status | Differentiating compliance |
| Repatriation | FY tracking, NRO threshold context, evidence and CA guidance | Differentiating continuity |
| Family continuity | Joint holders, nominees, permissions, death-claim readiness | Household retention |
| Service and support | Status, knowledge, human escalation, context-preserving handoff | Trust recovery |
| RM/CA workspace | Lead routing, assisted context, consent, EUIN and service tracking | Assisted segment |
| Operations control plane | Scheme master, country rules, queues, reconciliation, maker-checker, SLAs | Product reliability |
| Finance and audit | Revenue, TDS, payouts, audit and regulatory exports | Business control |
| Engagement | Alerts, reminders, channel preferences, India visit/timezone context | Timely value |
| AI intelligence | Document extraction, explanation, anomaly support, operations copilot | Later leverage, not initial wedge |
| Adjacent products | Interest capture for PMS/AIF/bonds/tax services | Monetization discovery, not core execution |

**Scope challenge:** The BRD treats the feature inventory as one Phase 1 surface. Product strategy should treat it as multiple products with different risk profiles and ownership.

# 11. Feature Prioritization

## Prioritization method

No exact reach, confidence, effort or legal readiness data exists. The following RICE scores are directional hypotheses for relative sequencing, not business-case approvals.

**RICE = Reach × Impact × Confidence ÷ Effort.**  
Reach is quarterly eligible users affected; impact is 0.25 low, 0.5 medium, 1 high, 2 massive; confidence is 0.5 to 1.0; effort is person-months. Validate each input during discovery and architecture spikes.

| Feature | Reach | Impact | Confidence | Effort | Directional RICE | Decision |
|---|---:|---:|---:|---:|---:|---|
| Country eligibility service | 1,000 | 2.0 | 0.8 | 4 | 400 | MVP |
| KYC/AML and recovery | 1,000 | 2.0 | 0.8 | 8 | 200 | MVP |
| Core lumpsum execution | 800 | 2.0 | 0.9 | 6 | 240 | MVP |
| Portfolio and order state | 800 | 1.5 | 0.9 | 5 | 216 | MVP |
| Tax-ready reports | 700 | 1.5 | 0.8 | 6 | 140 | MVP |
| SIP and mandate | 650 | 1.5 | 0.8 | 7 | 111 | MVP/V1 gate |
| TDS preview | 500 | 2.0 | 0.7 | 5 | 140 | MVP |
| DTAA lifecycle | 350 | 2.0 | 0.6 | 8 | 53 | V1 pilot |
| Repatriation ledger | 350 | 2.0 | 0.7 | 6 | 82 | V1 |
| Exception control plane | 1,000 | 2.0 | 0.8 | 8 | 200 | MVP foundation |
| Joint/household continuity | 250 | 1.0 | 0.6 | 8 | 19 | V2 |
| Scheme aggregation | 600 | 1.0 | 0.8 | 8 | 60 | V1 |
| NFO module | 250 | 0.5 | 0.8 | 4 | 25 | V2 |
| AI support agent | 1,000 | 1.0 | 0.5 | 10 | 50 | V2 gated |
| AI tax advisor | 500 | 2.0 | 0.3 | 12 | 25 | Not MVP |

### RICE interpretation

- High RICE does not override legal or dependency gates.
- Exception control, eligibility and KYC score well because they affect many downstream actions.
- AI features score lower because confidence, liability and evaluation are unresolved.
- Joint households may be strategically valuable despite lower immediate RICE; validate retention and acquisition value before committing.

## Kano classification

| Kano category | Capabilities | Strategic meaning |
|---|---|---|
| Basic / must not fail | Eligibility, KYC, account tagging, secure access, correct order status, audit, reports, support recovery | Absence creates distrust or regulatory risk |
| Performance | Speed, fewer documents, better reporting, payment success, accurate tax previews, SIP reliability | Better performance increases satisfaction and retention |
| Delighter | Repatriation planner, continuity passport, context-preserving CA handoff, meaningful country-change support | Differentiates after foundations work |
| Indifferent / defer | Gamification, broad content feed, decorative personalization, social investing | Does not address the core job |
| Reverse-risk | Unbounded AI recommendations, aggressive nudges, unsupported tax savings claims | May reduce trust or create harm |

## MoSCoW

### Must

Country eligibility and scheme restriction enforcement; secure NRI onboarding; CKYC/KYC/AML/FATCA/CRS; NRE/NRO tagging; core lumpsum; reliable order state; basic SIP if mandate dependency is proven; portfolio; tax/TDS reports; exception ownership; audit and maker-checker; regular-plan disclosure; legal sign-off.

### Should

DTAA document lifecycle; repatriation ledger; re-KYC; redemption tax preview; joint holder support; report export improvements; operational reconciliation; structured RM/CA handoff; meaningful reminders.

### Could

NFO; STP/SWP; portfolio aggregation; multi-currency views; India visit mode; household view; CA marketplace; bounded AI support; advanced goal planning.

### Won’t for initial launch

PMS/AIF/unlisted/bond execution; international remittance; direct plans; GIFT City execution; generic AI investing advice; social features; full tax filing; universal global tax engine.

## Value versus effort

| Quadrant | Features |
|---|---|
| High value / lower effort | Source-linked eligibility explanation, order timeline, regular-plan disclosure, basic report exports, document expiry reminders |
| High value / high effort | KYC and AML, RTA/payment integrations, tax engine, DTAA workflow, exception control plane |
| Lower value / lower effort | World clock, basic currency display, content preferences |
| Lower value / high effort | International remittance, universal tax engine, broad adjacent-product execution, unbounded AI |

## Risk versus impact

| High impact / high risk | Decision |
|---|---|
| US/Canada onboarding | Separate legal and product gate; do not include in general launch |
| DTAA “tax saved” calculations | Show only approved, evidence-backed estimates with explicit uncertainty |
| AI affecting money or compliance | Human-reviewed decision support only until validated |
| Repatriation recommendations | Guidance and evidence, not automated tax/legal advice |
| Real-time external status | Use event freshness and source labels; do not promise universal real time |

# 12. MVP Definition

## MVP objective

Prove that a defined, legally approved NRI segment can complete a compliant first MF investment and understand its ongoing status without needing to reconstruct the process across multiple channels.

## Recommended MVP segment

**UAE/GCC and selected Singapore NRIs, primarily individual holders, with approved NRE/NRO accounts, regular-plan MF execution, moderate tax complexity and English-language service.**

**Why:** High strategic fit, strong India connection, manageable relative to US/Canada, and direct alignment with the BRD’s NRE/NRO, DTAA and repatriation thesis. Singapore and UAE eligibility still require legal confirmation per product and current treaty interpretation.

## MVP capabilities

1. Secure registration, country and tax residency capture.
2. NRI profile and NRE/NRO account tagging.
3. Approved KYC/CKYC/video KYC/AML/FATCA/CRS path with recovery.
4. Eligibility service using versioned country and scheme rules.
5. Scheme discovery limited to approved regular-plan MF universe.
6. Lumpsum purchase with supported payment route.
7. Basic SIP only if mandate provider and bank coverage meet launch threshold.
8. Truthful order, payment, allotment and exception status.
9. Basic holdings and transaction view.
10. TDS/capital-gains/transaction reporting baseline.
11. Support escalation with full context and ownership.
12. Operations console for rules, reconciliation, queue, audit and maker-checker.
13. Commercial disclosure for regular-plan distribution and assisted service.

## Explicit MVP exclusions

US/Canada general availability; direct plans; full DTAA automation; NFO; SWP/STP; GIFT City; international remittance; full family workspace; AI advice; universal tax filing; execution of non-MF products.

## MVP validation gates

- Legal and compliance sign-off for selected countries, funds and tax language.
- RTA, execution, payment, KYC and communication vendors contracted and tested.
- Exception owner and SLA defined for every money-affecting state.
- Pilot cohort completes qualifying actions without material unresolved exceptions.
- Evidence of repeat intent or retention, not only first-order interest.

# 13. Version Planning

## MVP: Prove compliant execution and trust

Focus: selected countries, individual users, core KYC, eligibility, lumpsum, basic SIP where viable, portfolio, reports, support and operational controls.

**Exit condition:** Qualifying actions are reliable enough that the team can investigate product-market fit instead of spending all capacity on preventable operational failures.

## V1: Prove the NRI differentiation

Focus: DTAA document lifecycle, tax preview, repatriation ledger, stronger tax-ready reports, re-KYC, country-specific reminders, structured RM/CA handoff, selected joint-holder capability.

**Exit condition:** Users and partners can articulate a reason to choose the product over a bank, broker or generic investment app.

## V2: Extend continuity and service

Focus: household permissions, country change, resident conversion, held-away portfolio evidence, broader transaction types, NFO, deeper reporting, CA service intake, bounded support AI.

**Exit condition:** Retention and service economics justify broader household and specialist workflows.

## V3: Scale the platform

Focus: additional approved countries, selected US/Canada use cases only after legal readiness, multi-currency context, partner distribution, advanced operations intelligence, stronger data portability and ecosystem integrations.

**Exit condition:** Country expansion does not reduce quality or create unsupported rule variation.

## Future vision

A trusted, permissioned NRI wealth operating layer that maintains a portable compliance and evidence context across investments, tax events, family continuity and country changes, with humans and AI working inside clear boundaries.

# 14. Product Roadmap

| Time horizon | Product outcome | Major work | Gate |
|---|---|---|---|
| 0–2 months | Strategy and risk foundation | Segment decision, legal review, vendor selection, rule inventory, service blueprint, data model, measurable event taxonomy | No build without country/product/legal scope |
| 2–5 months | Internal operational foundation | Integrations, KYC, eligibility, audit, reconciliation, status model, support ownership, controlled pilot tooling | End-to-end sandbox and failure rehearsal |
| 5–7 months | MVP pilot | Selected-country individual onboarding, approved MF purchase, portfolio, reports and support | MCVC and risk guardrails |
| 7–10 months | V1 differentiation | DTAA lifecycle, TDS preview, repatriation ledger, re-KYC, specialist handoff | Legal validation and user value evidence |
| 10–15 months | V2 continuity | Household roles, country change, broader transaction types, aggregation, bounded AI | Retention and service economics |
| 15–24 months | V3 scale | Country expansion, partner channels, operational intelligence, selected complex-market pilots | Country-specific compliance and quality |

**Roadmap principle:** Dependencies and evidence gates determine sequence, not the number of features that can be listed in a quarter.

# 15. User Value Mapping

| User job | Pain today | Product value | Proof of value |
|---|---|---|---|
| Know whether I can invest | Conflicting generic information | Country-aware answer with reason and source | Comprehension and reduced late blocks |
| Invest from the right account | NRE/NRO ambiguity | Account-linked validation | Fewer mismatches and support contacts |
| Know what happens after action | Fragmented status | Unified event state and owner | Fewer repeat contacts |
| Understand tax impact | Tax discovered later | Pre-action estimate and evidence | Lower surprise and correction rate |
| Prepare for repatriation | Manual threshold tracking | FY ledger and evidence status | Report completion and task success |
| Keep documents current | Repeated urgent requests | Lifecycle reminders and re-KYC recovery | On-time renewal and lower abandonment |
| Manage family continuity | Single-user ownership | Permissioned roles and nominee readiness | Continuity task completion |
| Get help without repetition | Context lost across channels | Structured handoff | Resolution time and repeat-contact reduction |

# 16. Business Value Mapping

| Product investment | Business value | Required proof |
|---|---|---|
| Eligibility/rules service | Fewer failed orders, compliance confidence, scalable country expansion | Rule accuracy and exception cost |
| KYC recovery | Higher activation, lower manual cost | Completion and review effort |
| Reports/tax context | Retention, CA/RM leverage, trust | Repeat use and report task success |
| Regular-plan transparency | Better commercial quality, lower dispute risk | Conversion and cancellation by disclosure |
| Repatriation/DTAA | Differentiated acquisition and higher AUM depth | Segment switching and task completion |
| Operations control plane | Lower support and reconciliation cost | Exception aging and cost per action |
| Specialist handoff | Lead revenue and higher-value service | Qualified conversion and service margin |
| AI operations | Potential cost reduction | Precision, override rate, harm incidents |

# 17. Engineering Complexity Mapping

| Capability | Complexity | Main drivers | Strategy |
|---|---|---|---|
| Identity/profile | Medium | PII, consent, country/tax model | Build foundation early |
| KYC/AML | High | Vendors, legal, document and review states | Pilot with one approved stack |
| Eligibility rules | High | AMC/product masters, effective dates, country variance | Versioned policy service |
| Execution | High | Exchange/execution vendor, cut-off, idempotency | Integrate before feature breadth |
| RTA portfolio | High | CAMS/KFintech feeds, reconciliation and freshness | Source-of-truth contract |
| Payments/mandates | High | Bank coverage, asynchronous callbacks, failure recovery | Launch only with measured bank coverage |
| Tax reports | High | Data lineage, rates, FY logic, corrections | Deterministic computation and audit |
| DTAA | High | Document review, AMC/RTA application, legal change | V1 gated pilot |
| Repatriation | Medium/high | NRO ledger, limits, CA evidence, cross-year rules | V1 guidance, not autonomous recommendation |
| Household roles | High | Authorization, privacy, claims and edge cases | V2 after individual model stabilizes |
| Support timeline | Medium/high | Event normalization across systems | MVP because it protects trust |
| AI | Very high | Data quality, evaluation, PII, guardrails, liability | Start with non-authoritative assistive use |

# 18. UX Complexity Mapping

| Area | Complexity | Why |
|---|---|---|
| Eligibility explanation | High | Rules vary and need plain-language rationale |
| KYC recovery | High | Multiple failure causes and emotional exposure |
| Account/tax context | High | Must be visible without overwhelming routine users |
| Order state | Medium/high | Asynchronous external systems and precise language |
| Tax/reporting | High | Dense information, desktop needs and professional use |
| DTAA | Very high | Evidence, validity, uncertainty and regulated language |
| Repatriation | High | Financial consequence and cross-year context |
| Household permissions | Very high | Privacy, authority and exceptional life events |
| AI explanations | High | Confidence, source, correction and escalation |
| Content/localization | Medium/high | Country, timezone, date, currency and legal terminology |

**UX strategy:** Solve comprehension and recovery before adding discovery richness. The hardest experiences are not the most decorative; they are the moments where a wrong interpretation creates money or compliance harm.

# 19. AI Readiness Mapping

| AI opportunity | Data readiness | Risk | Readiness | Recommendation |
|---|---|---|---|---|
| OCR/document extraction | Medium | Medium | Pilot | Human review and confidence thresholds |
| Document classification | Medium | Medium/high | Pilot | Assist operations, never silently reject |
| FAQ retrieval | Medium | Medium | Pilot | Source-linked answers and fallback |
| Order-status explanation | High if APIs are reliable | Medium | V1 | Tool-based, deterministic status source |
| Support summarization | Medium/high | Medium | V1 | Agent assist before customer-facing automation |
| Reconciliation classification | Medium | High | V1/V2 | Rule-based baseline plus human approval |
| SIP bounce prediction | Unknown | Medium/high | V2 | Need consented balance history and measured precision |
| Tax explanation | Medium | High | V1 assistive | Retrieved sources and deterministic numbers |
| Fund recommendation | Low/unknown | Very high | Defer | Not needed for product wedge |
| Autonomous money action | Low | Extreme | Do not pursue | Human-confirmed, rule-bound actions only |

**Challenge to the BRD:** “AI-first architecture” is not a product strategy. The correct strategy is “evidence-first, AI-where-safe.” AI should reduce internal friction or explain known facts before it is allowed near advice or money decisions.

# 20. Compliance Readiness Mapping

| Capability | Readiness question | Gate |
|---|---|---|
| Country launch | Which country, fund and AMC combinations are legally approved? | Legal matrix signed |
| US/Canada | PFIC/FAPI and fund availability reviewed by qualified counsel? | Separate go/no-go |
| DTAA | Treaty interpretation, ruling status and document application approved? | Tax/legal sign-off |
| KYC/AML | Vendor, CKYCR, video KYC, sanctions, PEP and EDD process validated? | Compliance acceptance |
| Data privacy | DPDP, GDPR/UK GDPR, retention, portability, erasure and vendors mapped? | DPO/legal review |
| Regular plans | ARN, EUIN, disclosures and assisted boundaries defined? | Distribution compliance |
| Tax computation | Rates, surcharge, cess, FY rules, source and effective dates versioned? | Tax owner sign-off |
| Repatriation | NRO limit, forms and CA handoff language validated? | FEMA/tax review |
| Audit | User, admin, AI and rule changes reconstructable? | Control testing |
| Complaints | Support and regulatory escalation route defined? | Operations/compliance rehearsal |

# 21. Product Risks

| Risk | Likelihood | Impact | Mitigation / owner |
|---|---|---|---|
| Incorrect tax or treaty interpretation | Medium | Extreme | Tax/legal owner, source versioning, conservative copy, no unsupported savings claims |
| US/Canada product restriction breach | Medium | Extreme | Legal gate, country/product allowlist, separate launch |
| External vendor outage or stale feed | High | High | Freshness labels, fallbacks, reconciliation and incident playbook |
| Payment/order mismatch | Medium | Extreme | Idempotency, event ledger, maker-checker and exception owner |
| Regular-plan value rejected | Medium | High | Transparent economics and segmented service proposition |
| Scope overload delays reliable launch | High | High | MVP exclusions, dependency gates, outcome-based roadmap |
| AI hallucination or PII exposure | Medium | Extreme | Retrieval, redaction, guardrails, human review, evaluation |
| Low repeat use after first investment | Medium | High | Reports, documents, tax and continuity value |
| Support burden exceeds unit economics | Medium | High | Self-service status plus tiered human support; measure cost per action |
| Household permissions create privacy harm | Medium | High | Explicit authorization model, least privilege and V2 gate |
| Rules change faster than product updates | High | High | Versioned policy service, effective dates and change governance |
| Accessibility or localization exclusion | Medium | Medium/high | WCAG 2.1 AA, device research, clear dates/currencies/timezones |

# 22. Product Tradeoffs

| Tradeoff | Recommended choice | Why |
|---|---|---|
| Breadth versus reliability | Narrow country/product launch | A failed core action damages trust more than a missing feature |
| DIY purity versus human help | DIY default with explicit escalation | Complex NRI cases cannot be safely forced into self-service |
| Speed versus compliance review | Honest asynchronous progress | False immediacy creates repeat contacts and risk |
| Regular-plan revenue versus fee transparency | Transparent service value | Hidden economics undermine trust and invite comparison loss |
| Mobile-first versus reporting quality | Cross-device from day one; desktop-quality reports | Research hypothesis says action may be mobile while tax work is desktop |
| AI automation versus control | Assistive AI before authoritative AI | Evidence and liability are insufficient for autonomous decisions |
| US/Canada growth versus legal readiness | Defer general availability | High value does not compensate for unresolved PFIC/FAPI exposure |
| Feature parity versus differentiation | Build eligibility, tax, repatriation and continuity depth | Commodity investment features are already available elsewhere |
| Universal rules versus country specialization | Versioned country/product policies | Cross-border truth is not one global rule |
| Acquisition volume versus investor quality | Optimize qualifying activation and retention | AUM without compliant retention can be negative value |

# 23. Decision Log

| Decision | Status | Rationale | Revisit trigger |
|---|---|---|---|
| Position product around cross-border certainty, not fund breadth | Recommended | Strongest evidence-backed differentiation | Research shows another dominant unmet job |
| Launch selected UAE/GCC and Singapore cohorts before US/Canada | Recommended | Better risk-adjusted validation path | Legal counsel approves narrower US/Canada use case |
| Make MCVC the North Star | Recommended | Balances value, quality and business outcomes | Leadership chooses a different guardrail-based outcome |
| Exclude direct plans initially | BRD constraint / strategic acceptance | ARN-based regular distribution is the stated model | Business model changes and compliance approves |
| Treat DTAA as evidence-and-review capability, not guaranteed savings | Required challenge | Treaty, ruling and document validity can change | Tax/legal signs off precise country claims |
| Defer autonomous AI advice | Required challenge | High risk and low evidence | Validated model, governance and liability framework |
| Build operations control plane in MVP | Recommended | External dependency failures are part of user experience | Vendors provide reliable shared state and recovery |
| Treat reports as a core retention feature | Recommended | Tax and CA use cases create recurring value | Research disproves report-driven return behavior |
| Joint household capability is V2 | Recommended | High authorization complexity; validate demand first | Acquisition or retention depends on household access |
| No general international remittance in initial product | BRD constraint / strategic acceptance | Separate regulated and technical problem | Phase 3 readiness and partner strategy |

# 24. Success Criteria

The product strategy is successful when:

- Leadership agrees on the launch segment and explicit non-goals.
- Legal, compliance and tax owners approve a country/product rule matrix.
- Engineering can name a source of truth for every material status and calculation.
- Operations can own every exception with an SLA and audit trail.
- Research validates a high-frequency, high-severity problem that the wedge solves.
- The pilot demonstrates MCVC, not merely registration or submitted orders.
- Commercial economics remain viable after vendor, support and compliance cost.
- Users can explain why they trust the product and what it cannot do.

# 25. Failure Criteria

The product should be considered strategically failing if:

- It launches broad countries without country-specific legal readiness.
- Users receive a tax or eligibility answer that cannot be reconstructed later.
- The platform counts submitted orders despite failed settlement or unresolved mismatch.
- AI creates unsupported confidence in tax, eligibility, suitability or investment choice.
- The core experience is indistinguishable from a generic MF distributor except for branding.
- Regular-plan economics are obscured or users feel misled about advice and execution.
- Support and operations become the hidden product because the system cannot explain state.
- AUM grows while complaints, exceptions, corrections or repeat contacts grow faster.
- The team keeps adding features while core execution quality remains below guardrails.

# 26. Product Design Principles

These are product-level design requirements, not screen specifications:

1. **Context before commitment:** Relevant country, account, tax and timing context must precede consequential confirmation.
2. **Explain the reason, not just the result:** A block, estimate, delay or approval must have a source and understandable rationale.
3. **Make the system state honest:** Use pending, received, submitted, allotted, rejected and settled precisely.
4. **Keep recovery local:** The user should not need to restart the entire product when one dependency fails.
5. **Show uncertainty without alarmism:** Distinguish estimate, rule, review and professional advice.
6. **Respect professional handoff:** Preserve context, consent and evidence when a CA, RM or support agent joins.
7. **Protect attention:** Notifications should be tied to an obligation, risk, deadline or meaningful opportunity.
8. **Make data portable:** Reports and evidence must be useful outside the platform.
9. **Design for shared responsibility:** Family and specialist roles require explicit permission and visibility.
10. **Never use dark patterns to compensate for regular-plan economics or uncertain value.**

# 27. Product Architecture Recommendation

## Recommended architecture

Use a modular, event-driven platform with a policy and evidence layer at the center.

### Domain services

- Identity, consent and access.
- NRI profile and tax residency.
- KYC/AML/EDD.
- Bank/account and mandate.
- Scheme master and eligibility policy.
- Order and payment orchestration.
- Portfolio/RTA ingestion.
- Tax and report computation.
- DTAA and document lifecycle.
- Repatriation ledger.
- Household authorization.
- Service/exception management.
- Notifications and communication preferences.
- RM/CA partner workspace.
- Audit, finance and regulatory reporting.

### Cross-cutting layers

1. **Versioned policy layer:** Country, scheme, account, tax and effective-date rules.
2. **Evidence layer:** Source document, data origin, timestamp, confidence, reviewer and lineage.
3. **Event ledger:** Immutable state transitions for money, KYC, documents and admin actions.
4. **Workflow/orchestration layer:** Asynchronous external dependencies, retries, idempotency and SLA timers.
5. **Human control layer:** Queues, maker-checker, overrides, escalation and reason capture.
6. **Analytics layer:** Event taxonomy, funnel metrics, quality metrics and audit-safe experimentation.
7. **AI gateway:** Retrieval, redaction, model routing, confidence, guardrails, logging and kill switch.

## Architecture choices

- Prefer a modular monolith or carefully bounded services for MVP over premature microservices.
- Use an immutable event history plus read models for user and operations views.
- Treat CAMS, KFintech, execution platforms, payment gateways and KYC vendors as external systems with freshness and failure contracts.
- Keep tax calculations deterministic and independently testable.
- Store model and policy versions with every decision.
- Make idempotency and reconciliation first-class for all money movement.
- Separate customer-facing product data from raw vendor payloads while retaining lineage.

**Reasoning:** The highest risk is not a lack of service decomposition. It is inconsistent truth across systems. Architecture should make state, evidence, policy and recovery reliable before optimizing scale.

# 28. Recommended Information Architecture Strategy

Organize the product around the investor’s ongoing responsibilities, not internal teams or financial product categories.

## Recommended information domains

1. **Home / attention:** What needs action, what changed and what is safe to ignore.
2. **Invest:** Eligible opportunities and decision context.
3. **Portfolio:** Holdings, performance, NRE/NRO source and transaction history.
4. **Tax and reports:** TDS, capital gains, DTAA status, annual reports and exportable evidence.
5. **Repatriation:** FY movement, NRO context, documentation and specialist guidance.
6. **Documents and profile:** KYC, tax residency, passport/visa, consent and expiry.
7. **Family and access:** Joint holders, nominees, permissions and continuity.
8. **Help and service:** Knowledge, status, support, escalation and specialist handoff.

## IA rules

- Keep routine actions separate from high-consequence planning without hiding either.
- Use one canonical meaning for NRE, NRO, repatriable, non-repatriable, pending, approved and estimated.
- Cross-link related context rather than duplicating inconsistent calculations.
- Make country and tax residency a persistent context, not a one-time onboarding field.
- Treat documents and reports as reusable evidence objects, not downloadable leftovers.
- Provide role-appropriate views for investor, family member, RM, CA, support, operations and compliance.

**Challenge to the BRD:** A “dashboard” that combines every product, alert, report and AI insight will create information overload. The IA should be responsibility-led and progressive, not feature-led.

# 29. Recommended Navigation Strategy

## Investor navigation

Use a stable top-level structure based on five recurring jobs:

- **Home:** attention, pending work, important status and next actions.
- **Invest:** browse and transact only within eligibility-aware context.
- **Portfolio:** understand holdings, performance, source account and transactions.
- **Tax / Reports:** complete evidence and reporting tasks.
- **Profile / Help:** manage identity, documents, family permissions and service.

Repatriation may begin as a sub-domain of Portfolio or Tax, but should become a first-class destination if research shows it drives repeated use and differentiated acquisition.

## Internal navigation

Operations, compliance, finance, support and RM/CA workspaces should be queue- and exception-led:

- Work queues by risk, SLA and dependency.
- Case timeline and source evidence.
- Rules/master data with effective date and change history.
- Maker-checker actions and audit.
- Customer context with least-privilege access.

## Navigation principles

- Use one persistent context model for country, tax residency and account type.
- Never place a high-risk action behind a generic “more” label without its consequence.
- Preserve location and task state through asynchronous waits and handoffs.
- Keep support discoverable from every consequential state.
- Measure navigation success through task completion and comprehension, not click depth.

# 30. Final Product Blueprint

## Product definition

**An NRI-first, regular-plan mutual fund platform that combines compliant MF execution with country-aware eligibility, NRE/NRO correctness, tax-ready evidence, recoverable operations and cross-border continuity.**

## Primary customer

Selected, legally approved NRI individuals in UAE/GCC and Singapore who want to invest in India, are digitally capable, and have moderate complexity that can be supported safely through a self-service plus escalation model.

## Core promise

**Know what applies. Act correctly. See what happened. Keep your India wealth ready for what changes next.**

## Product wedge

Cross-border certainty and continuity, not fund catalogue breadth.

## MVP proof

A qualifying NRI can complete an eligible first investment and understand its account, status, report and exception path without reconstructing the experience across bank, AMC, RTA, CA and support channels.

## Strategic moat

1. Versioned country/product/compliance policy.
2. Evidence-backed tax and repatriation context.
3. Reliable event and exception history.
4. Cross-channel human handoff with preserved context.
5. Longitudinal continuity across documents, family and country change.

## What the product is not

- Not a universal global tax adviser.
- Not a direct-plan price leader.
- Not a remittance provider in the initial versions.
- Not an autonomous AI investment adviser.
- Not a marketplace that executes every adjacent wealth product at launch.
- Not a generic resident investing app with NRI labels.

## CPO recommendation

Approve the strategy only with a gated investment thesis:

1. Validate the UAE/GCC and Singapore wedge with real NRI and internal-operations research.
2. Secure country/product/legal sign-off and vendor commitments.
3. Build the operational truth layer alongside customer capabilities.
4. Launch a narrow MVP and measure MCVC plus guardrails.
5. Earn V1 differentiation through tax, DTAA, repatriation and continuity evidence.
6. Expand countries and AI only when quality, compliance and economics support the expansion.

The product should win by making fewer costly cross-border mistakes, not by offering the longest feature list.

