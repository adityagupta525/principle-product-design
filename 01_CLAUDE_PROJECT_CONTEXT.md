# Claude Project Context

**Audience:** Claude Code only  
**Purpose:** Strategic context to internalize before implementing any product work in Figma  
**Document type:** Internal product and design mindset guide  
**Scope:** How to think, not what screens to build or how to execute them

This document is not a product specification, UX flow, screen inventory, implementation sequence, or visual design brief. It establishes the mindset Claude must carry into every design-system, component, screen, and prototype decision.

## 1. Product Vision

The product aims to become the most trusted WealthTech platform for Non-Resident Indian investors managing wealth across countries, currencies, banks, tax jurisdictions, regulatory obligations, and life situations.

The central promise is not simply digital investing. It is **understandable, compliant, secure, and recoverable wealth management**.

Claude must understand that trust is earned through the quality of decisions made under uncertainty:

- When the user is not yet eligible.
- When verification is pending.
- When money has moved but the final order outcome is unclear.
- When data is delayed or incomplete.
- When a tax result is provisional.
- When a document has expired.
- When a human must intervene.

The product should help users feel informed and in control without pretending that every process is instant, simple, or certain.

## 2. Brand Philosophy

The brand should feel like a calm, capable financial partner rather than a trading arcade, a sales funnel, or an opaque institutional portal.

### Core qualities

- Calm under uncertainty.
- Precise without being intimidating.
- Premium through clarity, not decoration.
- Warm without becoming casual about money.
- Confident without overstating certainty.
- Global in capability and culturally aware in context.
- Human when the system cannot safely resolve an issue alone.

### What the brand must avoid

- Manufactured urgency.
- Promotional language that trivializes financial risk.
- Gamified behavior around returns or frequent trading.
- Decorative complexity that hides important information.
- Legal or compliance language presented without explanation.
- False reassurance when a process is pending, delayed, or unknown.
- A visual style that makes the product look like a generic banking template.

Premium means the product respects the user's attention, money, context, privacy, and intelligence.

## 3. User Psychology

Investment is a high-consequence activity performed under incomplete information. Users may be confident in one part of the journey and anxious in another. Claude must design for the psychological reality of money, not for idealized task completion.

### Common user states

- **Hope:** The user wants progress toward a better financial future.
- **Uncertainty:** The user does not know whether a process is complete or what a status means.
- **Fear of loss:** The user worries that an action, market movement, or error could damage wealth.
- **Control-seeking:** The user looks for evidence, timestamps, references, and a clear next action.
- **Cognitive overload:** The user is navigating tax, residency, bank, compliance, and investment concepts at once.
- **Regret avoidance:** The user wants to know what they are committing to before confirming.
- **Trust testing:** The user evaluates whether the platform is honest when something goes wrong.

### Design implications

- Show consequences before commitment.
- Make uncertainty explicit and bounded.
- Use stable language for recurring states.
- Separate facts, estimates, explanations, and recommendations.
- Preserve context after an error or interruption.
- Never use a confidence-building visual treatment to conceal missing evidence.

Users do not need the product to remove all uncertainty. They need it to make uncertainty legible and actionable.

## 4. NRI Investor Context

NRI investors are not one homogeneous segment. Their experience changes materially by country of residence, tax residency, account type, investment experience, portfolio complexity, family structure, digital comfort, and access to support.

Claude must treat NRI context as a structural product condition, not as a marketing label.

### Context that may affect the experience

- Country of residence and tax jurisdiction.
- NRE, NRO, or other supported account relationship.
- Repatriation and source-of-funds context.
- FATCA, CRS, AML, KYC, PEP, sanctions, and enhanced due diligence requirements.
- DTAA evidence and tax-document validity.
- Bank ownership, penny-drop verification, mandate, and payout compatibility.
- Time-zone, business-day, market-calendar, and service-window differences.
- Currency presentation and cross-border interpretation.
- Family, nominee, joint-holder, advisor, RM, and tax-consultant relationships.
- Periods of travel, device change, connectivity loss, or identity-recovery need.

### Mindset requirement

Never assume that a user who has an Indian PAN, an Indian bank account, or a completed onboarding step is automatically eligible for every investment action. Eligibility is contextual and authoritative services own the decision.

Never turn country-specific complexity into a hidden exception. Explain the user-relevant impact and safe next step without exposing sensitive screening logic.

## 5. Wealth Management Principles

### Wealth is a system, not a balance

Users need to understand holdings, performance, cash flows, taxes, liquidity, risk, documents, activity, and obligations together. Do not reduce wealth management to a single headline number.

### Time horizon matters

Performance, gains, cash flows, and tax values require a period, method, basis, and source. A number without context is not insight.

### Liquidity and access matter

The value of an investment is not the same as the amount available to invest, redeem, or transfer today. Do not imply immediate liquidity when settlement, cutoffs, restrictions, or bank timing apply.

### Wealth should be explainable

Users should be able to understand what changed, why a value moved, which source produced it, and what remains provisional.

### Advice and decision support are distinct

Personalized context, ranking, or explanation must not silently become regulated advice. The product should support informed decisions while respecting approved suitability, eligibility, and disclosure boundaries.

### Long-term confidence beats short-term conversion

The strongest product outcome is not merely completing a transaction. It is helping the user make a decision they can understand, evidence, revisit, and trust later.

## 6. Financial Trust Principles

Financial trust is built through evidence and consistency, not through reassurance alone.

### Always distinguish

- Current versus stale data.
- Known versus unknown outcome.
- Estimated versus final amount.
- Provisional versus amended report.
- Payment success versus order acceptance.
- Order acceptance versus execution.
- Execution versus settlement.
- Portfolio visibility versus investment entitlement.
- Document upload versus document approval.
- Automated status versus human review.

### Trust patterns to favor

- Stable references and timestamps.
- Source, period, currency, scope, and freshness beside financial values.
- Clear status definitions.
- Visible next steps and expected timelines when known.
- Audit-safe history and artifact lineage.
- Explicit correction and support paths.
- Consistent behavior across Home, Portfolio, Orders, Reports, and Account.

### Trust patterns to avoid

- Green success styling for an unresolved outcome.
- “Done” when a backend process is merely initiated.
- Hiding restrictions to preserve conversion.
- Requiring the user to repeat context already available to support.
- Allowing a retry when the first attempt may have created a financial side effect.
- Showing a calculated number without identifying its basis or freshness.

## 7. UX Philosophy

### Understanding before action

Every high-consequence action should first answer:

1. What am I doing?
2. Which account, product, amount, units, bank, or period is involved?
3. What are the material consequences?
4. What is known, estimated, or pending?
5. What happens next?
6. What can I do if the result is not what I expected?

### Orientation before detail

The product should establish context before presenting dense information. Users should know where they are, whose data they are viewing, which period applies, and what action is available.

### Progressive disclosure without hidden material facts

Complexity may be layered. It may not be hidden. Primary content should carry the decision-relevant truth; methodology, provenance, legal detail, and history may be progressively disclosed when they remain reachable and understandable.

### No dead ends

Every pending, failed, restricted, expired, offline, or unavailable state should explain whether the user should wait, retry safely, correct information, review a document, contact support, or take no action.

### Respectful friction

Friction is justified when it protects identity, money, privacy, regulatory compliance, or informed consent. Explain why the friction exists and avoid making users repeat information unnecessarily.

## 8. Visual Design Philosophy

Claude should make visual decisions that support comprehension, hierarchy, and emotional steadiness.

### Visual priorities

- Legibility before ornament.
- Hierarchy before density.
- Stable patterns before novelty.
- Evidence before decoration.
- Meaningful contrast before visual drama.
- Calm surfaces for complex financial information.
- Clear grouping of related facts and actions.

Visual polish should make an approved structure easier to understand. It must not change the structure, imply an unapproved priority, or make a risky action feel effortless without the corresponding safeguards.

### Premium visual behavior

Premium quality comes from rhythm, restraint, consistency, responsive composition, thoughtful empty states, and excellent details in difficult states. It does not require gradients, excessive animation, oversized hero content, or decorative charts.

## 9. Interaction Philosophy

### Make actions predictable

The same action should behave consistently across modules. Button hierarchy, validation, loading lock, confirmation, error recovery, and focus return should not change merely because a screen belongs to a different team.

### Make state changes observable

Users should understand when an action has been accepted, is processing, requires review, failed, timed out, or has an unknown outcome.

### Preserve user context

After a validation error, timeout, authentication return, upload issue, or support handoff, preserve entered values and the relevant reference wherever safe.

### Separate reversible and irreversible actions

Reversible preference changes may be direct. Financial, security, consent, destructive, or irreversible actions require appropriate review, confirmation, step-up, or audit behavior.

### Interaction should express entitlement, not fake it

If an action is restricted, the interface should not show an enabled control that fails only after submission. If policy requires a contextual explanation, show it without exposing restricted internal logic.

### Reduce unsafe repetition

Disable duplicate submissions during processing. When outcome is unknown, guide the user to wait, refresh, inspect activity, or contact support instead of blindly retrying.

## 10. Motion Philosophy

Motion should clarify change, continuity, hierarchy, and state. It should never create urgency, distract from risk, or simulate confidence.

### Use motion to

- Connect a user action to the resulting state.
- Show progress when a process is genuinely active.
- Preserve spatial context during navigation or expansion.
- Make loading and completion transitions understandable.
- Give focus and attention changes a calm, predictable rhythm.

### Do not use motion to

- Celebrate uncertain financial outcomes.
- Encourage repeated trading or impulsive action.
- Hide loading time or data quality limitations.
- Replace text status or accessibility announcements.
- Make a destructive action feel playful.

Motion must respect reduced-motion preferences, remain interruptible where appropriate, and never be required to understand a financial or compliance state.

## 11. Accessibility Philosophy

Accessibility is part of product trust. A user who cannot perceive, navigate, operate, or understand a financial state cannot make a safe decision.

Claude must think in terms of equivalent understanding, not only visual compliance.

### Required mindset

- Every visual hierarchy needs a semantic hierarchy.
- Every chart needs a text summary and data alternative.
- Every table needs meaningful headers, totals, and a usable narrow-screen behavior.
- Every status needs text, not color alone.
- Every error must identify the source and corrective action.
- Every dynamic state change must be announced appropriately.
- Every dialog or sheet needs focus management and a predictable exit.
- Every masked value needs a clear accessible label and reveal rule.
- Long legal and tax content must remain readable at zoom and with localization.
- Keyboard, screen-reader, touch, zoom, reflow, and reduced-motion users are first-class users.

Accessibility must be considered when a component is created, not added after visual implementation.

## 12. Design System Philosophy

The Design System is the product's memory. It should preserve decisions across modules and protect the user from inconsistency.

### A component is a contract

A reusable component is not merely a visual shape. It defines:

- Meaning.
- Inputs and content constraints.
- States.
- Variants.
- Interaction behavior.
- Accessibility behavior.
- Responsive behavior.
- Token and Variable dependencies.
- Engineering mapping.
- Appropriate and inappropriate use.

### System quality principles

- Reuse before extension; extension before creation.
- One semantic pattern should have one authoritative component.
- Components should expose state without hiding domain meaning.
- Tokens should express intent, not arbitrary appearance.
- Variables should support controlled change, responsive behavior, and accessibility.
- Local composition is acceptable; local duplication is not.
- A shared component should be simpler to consume than to recreate.

Claude must prefer a smaller, coherent system over a large collection of visually similar components with different behavior.

## 13. Decision Hierarchy

When deciding between alternatives, use this hierarchy:

1. Protect user safety, privacy, identity, money, and legal rights.
2. Preserve the Cross-Module Lifecycle & Entitlement Contract.
3. Preserve approved business rules, compliance behavior, and state precedence.
4. Preserve the approved UX architecture and user goals.
5. Preserve financial truth, provenance, freshness, finality, and auditability.
6. Preserve accessibility and inclusive understanding.
7. Prefer reusable Design System patterns over local invention.
8. Reduce cognitive load without hiding material information.
9. Improve engineering clarity, responsive behavior, and maintainability.
10. Apply visual refinement only after the above are satisfied.

If two valid options remain, choose the one that creates less irreversible harm, fewer user assumptions, fewer duplicated patterns, and better future scalability.

## 14. Component Reuse Philosophy

Claude should treat every new component as an architectural decision.

### Before creating

- Ask whether the component already exists.
- Ask whether an existing component can represent the need through a variant, property, slot, or extension.
- Ask whether the difference is semantic or merely visual.
- Ask whether the behavior will recur in another module or future asset class.
- Ask whether creating it would fragment navigation, state, or accessibility behavior.

### When extending

Extend when the component has the same fundamental purpose but lacks approved states, data density, responsive behavior, accessibility behavior, or domain-neutral properties.

### When creating

Create only when the component has a distinct purpose, stable reuse potential, clear ownership, complete state coverage, and no safe mapping to an existing contract.

### What not to do

- Do not create one card per screen when the content can be a governed card pattern.
- Do not create separate pending components for every module.
- Do not use a financial component for a generic status if its semantic meaning differs.
- Do not merge payment and order truth because their visual structures look similar.
- Do not create a “special” state that bypasses the lifecycle contract.

## 15. Information Density Principles

Financial products must carry complexity without making every surface feel dense.

### Density is contextual

- Orientation surfaces should be concise and action-oriented.
- Authoritative workspaces may be denser because users arrive with an information need.
- High-value decisions require enough detail to prevent regret.
- Operational investigation requires references, timestamps, events, and recovery context.
- Compliance and tax content requires precise definitions and reachable evidence.

### Density rules

- Put decision-critical information first.
- Group related information by user question, not by backend ownership.
- Use labels and context instead of relying on formatting conventions.
- Keep secondary detail available without forcing it into the first view.
- Avoid repeating the same metric across Home, Portfolio, Reports, and Orders with different definitions.
- Allow users to move from summary to authoritative detail.
- Design for long names, translated copy, large values, negative values, missing values, and unknown values.

Whitespace is not wasted space when it separates concepts and reduces financial misunderstanding.

## 16. Financial Data Presentation Principles

### Every financial value needs context

Where applicable, show or make immediately available:

- Label and definition.
- Currency.
- Period or date.
- Scope: investor, account, folio, or household.
- Source or methodology.
- Freshness or last updated time.
- Finality: estimated, provisional, final, amended, or unknown.
- Relevant action or limitation.

### Separate truth domains

- Holdings are not orders.
- Orders are not payments.
- Payments are not settlement.
- Settlement is not portfolio reflection.
- Report generation is not report finality.
- Tax estimate is not tax advice.
- Document upload is not approval.
- Activity notification is not authoritative domain state.

### Communicate performance responsibly

- Show the measurement period and method.
- Distinguish realized and unrealized values.
- Do not imply a prediction from historical return.
- Avoid framing losses as a temporary visual inconvenience.
- Make data delay visible where it affects interpretation.
- Use accessible text alongside charts.

### Communicate risk responsibly

- Explain what a risk label means in the user's context.
- Do not hide risk in a tooltip when it materially affects a decision.
- Do not use visual intensity to exaggerate or trivialize risk.
- Distinguish market risk, liquidity risk, currency risk, tax risk, eligibility risk, and operational risk where relevant.

## 17. Error Prevention Philosophy

The best error message is often a decision prevented earlier.

Claude should design components and compositions that prevent predictable mistakes through:

- Clear account, bank, product, amount, units, currency, period, and scope context.
- Eligibility checks before commitment.
- Inline validation close to the source.
- Meaningful defaults only when safe and approved.
- Explicit review before high-consequence confirmation.
- Duplicate submission prevention.
- Clear cutoff and timing information.
- Step-up authentication when required.
- Masking and ownership confirmation for sensitive information.
- Distinct payment, order, refund, and reconciliation states.

Do not make the interface “frictionless” by removing safeguards that protect the user.

## 18. Recovery Philosophy

Recovery is part of the product, not an exception to it.

### A good recovery experience answers

1. What happened?
2. What is known and unknown?
3. Did any money, order, document, consent, or security state change?
4. Is the user expected to wait, correct, retry, cancel, reconcile, or contact support?
5. What should the user avoid doing?
6. What reference or evidence can they use later?
7. When will the next update be available, if known?

### Recovery principles

- Never ask the user to repeat a safe context the system already has.
- Never recommend a retry when a duplicate side effect is possible.
- Preserve the original reference and timeline.
- Offer the least risky next action first.
- Escalate to humans with consent and scoped context.
- Make recovery status visible across relevant modules.
- Do not punish users for system failure with unnecessary re-entry.

The quality of the product is revealed most clearly when something fails.

## 19. Copywriting Tone

Copy should be clear, calm, direct, respectful, and specific.

### Tone qualities

- Plain language before institutional jargon.
- Honest uncertainty before false reassurance.
- Helpful guidance before blame.
- Specific actions before generic “Try again.”
- Respectful correction before error labeling.
- Professional warmth without conversational excess.

### Copy should distinguish

- “We received your request” from “Your request is complete.”
- “Payment was successful” from “Your order was accepted.”
- “We are checking this” from “This has been approved.”
- “We need more information” from “Your application failed.”
- “This is an estimate” from “This is final.”

### Avoid

- “Oops” for serious financial issues.
- “Instant,” “guaranteed,” or “risk-free” unless legally and factually supported.
- Blaming the user for provider, bank, market, or system failure.
- Undefined acronyms without contextual explanation.
- Copy that implies tax, investment, or legal certainty beyond approved scope.

## 20. Definition of Success

Claude succeeds when the resulting Figma product feels like one experienced product team designed it over many years, with decisions that remain coherent as the platform expands.

Success means:

- Users understand what they are seeing and what they can safely do.
- Financial information is accurate in meaning, not merely attractive in presentation.
- Uncertainty, delay, failure, and restriction are treated as first-class experiences.
- NRI-specific context is visible where it affects eligibility, tax, bank, or action.
- The Design System preserves behavior across modules.
- Components are reusable without hiding domain truth.
- Accessibility is built into understanding, not added as a compliance layer.
- The product feels calm during high-stakes decisions.
- Recovery is clear, humane, and evidence-based.
- Engineering can map the system to stable component contracts.
- Future asset classes, countries, advisors, families, and AI capabilities can extend the system without fragmentation.

The measure is not how many screens Claude creates. It is whether the product helps users make and manage financial decisions with clarity, control, and justified trust.

# How Claude Should Think Before Touching Figma

Before making any design decision, Claude should pause and ask:

1. What user question or decision does this surface support?
2. What is the authoritative source of the information shown here?
3. Which lifecycle, entitlement, compliance, security, consent, or data-freshness state applies?
4. What could the user reasonably misunderstand?
5. What must be visible now, and what may be progressively disclosed?
6. What happens when the data is delayed, missing, restricted, failed, or unknown?
7. What is the safest next action for the user?
8. Does an existing component already express this need?
9. If not, is extension stronger than creation?
10. Is the component accessible, responsive, localizable, and engineerable?
11. Does the interaction preserve user context and prevent unsafe repetition?
12. Does this decision remain coherent across Home, Portfolio, Discovery, Investment, Orders, Reports, Account, and Support?
13. Am I improving comprehension, or merely adding visual polish?
14. Am I making an assumption that belongs to Product, Engineering, Compliance, Legal, Finance/Tax, Security, or Operations?
15. If the answer is unknown, have I preserved the unknown rather than inventing certainty?

Claude should approach Figma as the visible expression of a trusted financial system. Do not begin with rectangles. Begin with meaning, authority, consequences, and the user's need for confidence.

