# NRI WealthTech Platform
## AI Implementation Repository Guide

**Audience:** Claude Code and future AI implementation agents
**Repository role:** Product architecture, UX behavior, service contracts, and implementation-governance source repository
**Status:** Foundational README

## 1. What This Product Is

This repository defines a global WealthTech platform for Non-Resident Indian investors. The initial product is an NRI-first mutual-fund investment platform with digital onboarding, compliance-aware activation, fund discovery, investment execution, portfolio understanding, financial reporting, tax context, account control, security, support, and operational recovery.

The architecture is intentionally broader than mutual funds. It must support future ETFs, bonds, NPS, PMS, AIF, global investments, and insurance-linked investments without breaking identity, permissions, reporting, financial truth, or lifecycle behavior.

The product is not a generic investment catalogue. It is a trust and decision platform for cross-border investors whose country, tax residency, account type, regulatory status, bank, investment action, and financial data quality materially affect what they may see and do.

## 2. Business Vision

Build the most trusted NRI WealthTech platform for compliant, understandable, and recoverable investing.

The long-term business advantage is not only transaction speed. It is the ability to combine:

- NRI-specific eligibility and account context.
- Clear tax, DTAA, TDS, and repatriation understanding.
- Reliable portfolio, order, payment, and report truth.
- Strong security and recovery for users operating across countries and devices.
- Digital self-service with accountable human support.
- A scalable data, policy, and entitlement foundation for future wealth products.

Do not optimize for short-term conversion by hiding restrictions, overstating performance, suppressing uncertainty, or weakening compliance controls.

## 3. Target Users

Primary users are NRI individual investors with Indian identity and eligible Indian investment/bank relationships. The system must account for meaningful variation across:

- Country of residence and tax residency.
- NRE/NRO and other supported account types.
- Investment experience and risk profile.
- Portfolio size and complexity.
- Digital literacy and accessibility needs.
- Joint holders, nominees, households, and delegated access.
- RM-assisted, Support-assisted, Tax-assisted, and fully self-service behavior.

Internal and specialist users include RM, Support, Operations, Compliance, Finance, Tax Consultant, Security, Admin, and approved service partners. Their access is scoped by role, resource, purpose, consent, authority, and time window.

## 4. Product Goals

The implementation must help users:

- Establish and maintain a secure identity.
- Complete regulatory onboarding and activation with visible status.
- Discover eligible investment opportunities with understandable trade-offs.
- Submit, monitor, recover, and evidence investment instructions safely.
- Understand holdings, performance, gains, tax context, and reports.
- Manage profile, banks, nominees, security, documents, consent, communications, and support.

The implementation must help the business:

- Operate a compliant, auditable, recoverable money-moving platform.
- Reduce duplicate payments, orders, support contacts, reconciliation exceptions, and unsafe retries.
- Maintain accurate source, policy, consent, and financial-data lineage.
- Scale to additional countries, assets, advisors, households, and AI-assisted services.

## 5. Overall Architecture

The product is organized into locked customer modules supported by shared platform contracts.

### Customer modules

1. Authentication & Identity
2. Onboarding & Regulatory
3. Investment Activation
4. Home Experience
5. Portfolio Experience
6. Fund Discovery Experience
7. Investment Journey Experience
8. Orders & Activity Center
9. Reports & Tax Center
10. Account & Service Hub

### Shared platform contracts

- Cross-Module Lifecycle & Entitlement Contract
- Identity and authorization scope
- Policy and eligibility evaluation
- Financial data provenance, freshness, and reconciliation
- Order, payment, refund, mandate, and settlement truth
- Consent and communication preference management
- Document and artifact lineage
- Support case, SLA, and human ownership
- Audit and analytics event contracts
- Accessibility, localization, privacy, and security controls

### Architectural separation

Every implementation decision must distinguish:

1. **Domain state:** What happened in a business domain.
2. **Entitlement:** What this actor may view or do.
3. **Module projection:** How a module presents that state for this actor and context.

Never use a screen label, cached boolean, notification, or client-side calculation as the source of business truth.

## 6. Source-of-Truth Hierarchy

Use the following authority order when documents appear to overlap or conflict.

### Level 1: Cross-module platform truth

[NRI_Cross_Module_Lifecycle_Entitlement_Contract.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Cross_Module_Lifecycle_Entitlement_Contract.md)

This is authoritative for:

- State vocabulary and valid transitions.
- Cross-module state precedence.
- Entitlement results and conflict resolution.
- Resource scope, consent, role, policy, and authority behavior.
- Unknown outcomes, reconciliation, freshness, finality, and correction semantics.
- API/event expectations for lifecycle and entitlement.

### Level 2: Locked module contracts

Each approved module specification is authoritative for its own module-specific purpose, behavior, states, acceptance criteria, analytics, and engineering notes, provided it does not contradict Level 1.

### Level 3: Information architecture and service architecture

The Information Architecture, Service Blueprint, and End-to-End UX Flow Architecture define navigation, domain relationships, service ownership, operational handoffs, vendors, data movement, and journey composition. They must align with Level 1 and Level 2.

### Level 4: Discovery, strategy, research, and market evidence

Product Discovery, Market Intelligence, User Research, and Product Strategy explain why decisions were made and identify assumptions, opportunities, risks, and unknowns. They are evidence, not implementation authority.

### Level 5: Reviews and diagrams

Review documents identify gaps and risks. Architecture diagrams visualize approved flows. Neither may silently override a locked contract. A review recommendation becomes authoritative only when explicitly adopted into the relevant source-of-truth contract.

## 7. Documents That Must Never Be Overridden

Claude Code MUST NOT silently override:

- The Cross-Module Lifecycle & Entitlement Contract.
- Approved module state machines and valid transitions.
- Resource-scoped permission and entitlement rules.
- NRE/NRO, country, tax, compliance, AML, KYC, FATCA/CRS, DTAA, PFIC/FAPI, and repatriation constraints.
- Payment/order/settlement/refund/reconciliation distinctions.
- Portfolio and report provenance, freshness, finality, and amendment rules.
- Consent, privacy, retention, legal hold, document, and audit requirements.
- Security step-up, session, device trust, revocation, and recovery rules.
- Accessibility, masking, sensitive-data, and analytics privacy requirements.

If an implementation request conflicts with one of these, stop the implementation, identify the conflict, and request an explicit architecture decision. Do not resolve it by changing copy, hiding a state, adding a client-side bypass, or inventing a new status.

## 8. Locked Module Documents

The following are approved and immutable unless the product team creates a formally versioned successor.

- [NRI_Authentication_Identity_Wireframe_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Authentication_Identity_Wireframe_Specification.md)
- [NRI_Onboarding_Regulatory_Wireframe_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Onboarding_Regulatory_Wireframe_Specification.md)
- [NRI_Investment_Activation_Wireframe_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Investment_Activation_Wireframe_Specification.md)
- [NRI_Home_Experience_Wireframe_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Home_Experience_Wireframe_Specification.md)
- [NRI_Portfolio_Experience_Wireframe_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Portfolio_Experience_Wireframe_Specification.md)
- [NRI_Fund_Discovery_Experience_Wireframe_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Fund_Discovery_Experience_Wireframe_Specification.md)
- [NRI_Investment_Journey_Experience_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Investment_Journey_Experience_Specification.md)
- [NRI_Orders_Activity_Center_Experience_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Orders_Activity_Center_Experience_Specification.md)
- [NRI_Reports_Tax_Center_Experience_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Reports_Tax_Center_Experience_Specification.md)
- [NRI_Account_Service_Hub_Experience_Specification.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Account_Service_Hub_Experience_Specification.md)

## 9. Existing Architecture Documents

These documents provide the product’s discovery, service, information, flow, and review context.

- [NRI_Product_Discovery_Reverse_Engineering.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Discovery_Reverse_Engineering.md)
- [NRI_Market_Intelligence_Competitive_Analysis.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Market_Intelligence_Competitive_Analysis.md)
- [NRI_User_Research_Synthesis.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_User_Research_Synthesis.md)
- [NRI_Product_Strategy.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Product_Strategy.md)
- [NRI_Service_Blueprint.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Service_Blueprint.md)
- [NRI_Information_and_Navigation_Architecture.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Information_and_Navigation_Architecture.md)
- [NRI_End_to_End_UX_Flow_Architecture.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_End_to_End_UX_Flow_Architecture.md)
- [NRI_Professional_Architecture_Diagrams.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Professional_Architecture_Diagrams.md)
- [NRI_UX_Flow_Architecture_Design_Review.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Flow_Architecture_Design_Review.md)
- [NRI_UX_Scenario_and_Screen_Planning.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md)
- [NRI_UX_Scenario_and_Screen_Planning_Design_Review.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning_Design_Review.md)
- [NRI_Principal_Level_Product_Architecture_Review.md](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_Principal_Level_Product_Architecture_Review.md)

## 10. Finalized Decisions

The following decisions are already finalized for implementation planning:

- Cross-module state and entitlement truth comes from the lifecycle contract.
- State machines are domain-specific; a single global status must not replace them.
- Security, legal scope, consent, compliance, policy/eligibility, activation, account, data quality, financial state, reporting, notifications, and personalization follow the locked precedence model.
- Home is orientation; Portfolio is the authoritative financial workspace; Orders & Activity is the activity investigation center; Reports & Tax is the financial intelligence/compliance workspace; Account & Service is the operational control plane.
- Fund Discovery is decision support, not an opaque advice or ranking engine.
- Investment Journey uses shared instruction orchestration and product capability descriptors.
- Orders, payments, execution, settlement, refunds, reports, and portfolio updates remain separate truths.
- Unknown outcomes and reconciliation states are first-class and block unsafe duplicate actions.
- Reports and tax values carry scope, period, source, freshness, finality, method, and amendment lineage.
- Account/service changes use step-up, consent, impact notices, idempotency, audit, and recovery.
- Approved modules use adaptive state variants instead of creating a screen for every state.
- Future asset classes extend shared contracts rather than replacing mutual-fund behavior with incompatible assumptions.

## 11. Intentionally Unresolved Implementation Areas

The documents deliberately leave these areas for formal implementation decisions, vendor decisions, legal sign-off, or environment configuration:

- Launch countries and country-by-country product availability.
- Exact APIs, schemas, event brokers, databases, cloud services, and code stack.
- Final bank, payment, KYC, RTA, execution, tax, communication, CRM, helpdesk, and document vendors.
- Exact service-level objectives, capacity, staffing, queue thresholds, and escalation calendars.
- Exact tax, DTAA, PFIC/FAPI, TDS, FEMA, repatriation, and country-specific customer language.
- Exact risk, fraud, velocity, step-up, and high-value transaction thresholds.
- Production credentials, secrets, environment variables, and deployment configuration.
- Visual design tokens, component styling, responsive breakpoints, and Figma implementation details.
- Exact report formats, export limits, retention durations, legal-hold configuration, and data residency by geography.
- AI model selection, evaluation datasets, prompts, retrieval sources, cost limits, monitoring, rollback, and approved capability classes.

Unknowns are not permission to guess. Mark them as unresolved, create an implementation decision, and obtain the required Product, Engineering, Compliance, Legal, Finance/Tax, Security, or Operations approval.

## 12. How Claude Code Must Navigate This Repository

### Before coding

1. Read this README completely.
2. Read the Cross-Module Lifecycle & Entitlement Contract.
3. Read the relevant approved module specification and its dependencies.
4. Search for the affected entity, state, entitlement, event, component, and acceptance criteria across the repository.
5. Identify the owning source of truth before changing code or documentation.
6. Check whether the requested behavior is already represented as a state variant, entitlement result, or shared component.

### While coding

- Preserve existing user-visible states and server-authoritative transitions.
- Use stable IDs, correlation IDs, idempotency keys, policy versions, and audit metadata.
- Keep raw PII, credentials, tax IDs, payment data, KYC evidence, and provider payloads out of analytics and logs.
- Treat client validation as usability support, never as business authorization.
- Do not silently broaden permissions, add fallback success, or convert unknown to failed.
- Prefer shared domain components and contracts over module-specific duplicates.
- Keep financial values labelled with scope, source, currency, period, freshness, and finality.
- Add tests for happy, alternate, failure, recovery, restricted, suspended, offline, stale, partial, unknown, and permission paths.
- Preserve accessibility semantics, keyboard behavior, focus management, live-region behavior, and text alternatives.

### When a conflict is found

1. Stop the conflicting implementation.
2. Identify the exact source documents and states in conflict.
3. Determine which source has higher authority using the hierarchy in this README.
4. Do not patch around the conflict in the client.
5. Record the issue as an architecture decision or open question.
6. Proceed only after the authoritative contract is updated and versioned.

### When adding a new module

The new module must define:

- Purpose and ownership boundary.
- Cross-module dependencies.
- Entity and state contracts.
- Entitlements and permission scope.
- Data freshness, finality, and reconciliation behavior.
- Error, recovery, offline, restricted, suspended, and unknown outcomes.
- Audit and analytics events.
- Accessibility and localization behavior.
- Reusable components and future product capability descriptors.
- Independent Principal Product Review before screen specifications are considered approved.

### Repository hygiene

- Keep the root `00_README.md` current when authority, module status, or reading order changes.
- Keep user-facing architecture documents under `outputs/`.
- Use stable, descriptive filenames.
- Do not delete or rewrite locked documents to resolve a conflict.
- Create versioned successor documents when an approved contract must change.
- Maintain absolute repository links in documentation where the environment requires them.

## 13. Implementation Completion Definition

The product is not complete when screens render. A module is implementation-ready only when:

- Its authoritative state and entitlement inputs are defined.
- APIs and event contracts are versioned.
- All material states have deterministic projections.
- Money, tax, security, consent, and document actions are auditable.
- Unknown, partial, stale, restricted, suspended, and recovery paths are implemented.
- Support and operations have ownership and SLA behavior.
- QA has state, permission, integration, accessibility, privacy, and reconciliation fixtures.
- Reports, receipts, notifications, and deep links do not contradict source truth.
- The implementation passes the module’s acceptance criteria and the cross-module contract.

## Repository Reading Order

Claude Code MUST read the repository in this order before implementing a new module or cross-module change.

1. `00_README.md` - repository authority, product context, immutable decisions, and agent operating rules.
2. `outputs/NRI_Product_Discovery_Reverse_Engineering.md` - BRD-derived business scope, unknowns, assumptions, risks, and original requirements.
3. `outputs/NRI_Market_Intelligence_Competitive_Analysis.md` - market context, competitor patterns, gaps, and strategic opportunity context.
4. `outputs/NRI_User_Research_Synthesis.md` - user segments, personas, jobs, behavior, research methods, pain points, and research gaps.
5. `outputs/NRI_Product_Strategy.md` - product vision, priorities, MVP boundaries, roadmap logic, success criteria, and trade-offs.
6. `outputs/NRI_Principal_Level_Product_Architecture_Review.md` - cross-functional risks, contradictions, missing contracts, and approved hardening direction.
7. `outputs/NRI_Information_and_Navigation_Architecture.md` - application hierarchy, domain model, permissions, navigation, taxonomy, and state matrix.
8. `outputs/NRI_Service_Blueprint.md` - customer/frontstage/backstage/operations/technology/data/audit/analytics/SLA ownership.
9. `outputs/NRI_End_to_End_UX_Flow_Architecture.md` - end-to-end journey composition, business rules, dependencies, handoffs, and flow semantics.
10. `outputs/NRI_Professional_Architecture_Diagrams.md` - visual Mermaid representations of approved journeys and system interactions; use as a map, not as authority.
11. `outputs/NRI_UX_Flow_Architecture_Design_Review.md` - review findings and unresolved flow risks.
12. `outputs/NRI_UX_Scenario_and_Screen_Planning.md` - scenario inventory, screen planning, states, components, copy, priority, and wireframing order.
13. `outputs/NRI_UX_Scenario_and_Screen_Planning_Design_Review.md` - gaps and readiness findings for scenario/screen planning.
14. `outputs/NRI_Cross_Module_Lifecycle_Entitlement_Contract.md` - authoritative platform state machines, precedence, entitlements, conflicts, matrices, dictionary, event rules, and scalability contract.
15. `outputs/NRI_Authentication_Identity_Wireframe_Specification.md` - locked identity/authentication behavior and recovery surfaces.
16. `outputs/NRI_Onboarding_Regulatory_Wireframe_Specification.md` - locked onboarding, KYC, FATCA/CRS, tax residency, risk, bank, nominee, document, and eSign behavior.
17. `outputs/NRI_Investment_Activation_Wireframe_Specification.md` - locked activation dependency, pending, delayed, failed, and investor-ready behavior.
18. `outputs/NRI_Home_Experience_Wireframe_Specification.md` - locked lifecycle-aware Home responsibilities and projections.
19. `outputs/NRI_Portfolio_Experience_Wireframe_Specification.md` - locked authoritative portfolio, holdings, performance, transaction, and family-scope behavior.
20. `outputs/NRI_Fund_Discovery_Experience_Wireframe_Specification.md` - locked discovery, search, eligibility, compare, recommendation, saved, and watchlist behavior.
21. `outputs/NRI_Investment_Journey_Experience_Specification.md` - locked instruction, bank, mandate, payment, review, order, recovery, and future-product capability behavior.
22. `outputs/NRI_Orders_Activity_Center_Experience_Specification.md` - locked activity aggregation, timelines, payment/settlement/refund investigation, proof, downloads, and deep links.
23. `outputs/NRI_Reports_Tax_Center_Experience_Specification.md` - locked reporting, performance, gains, tax, DTAA, compliance, freshness, artifacts, sharing, and scheduling behavior.
24. `outputs/NRI_Account_Service_Hub_Experience_Specification.md` - locked account, banking, security, documents, consent, notifications, support, RM, legal, and data-request behavior.
25. **Implementation phase** - inspect the existing codebase, map code modules to the applicable contracts, implement only the approved scope, and validate against state, entitlement, accessibility, privacy, audit, analytics, and recovery requirements.

After implementation, re-run the relevant architecture review, update tests and decision records, and change this README only when the repository’s authority or approved scope changes.
