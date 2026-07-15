# NRI Home Experience
## Product Leadership and Low-Fidelity Wireframe Specification

**Role:** Product Leadership Team  
**Status:** Extension of Authentication & Identity v1.0, Onboarding & Regulatory v1.0, and Investment Activation v1.0  
**Scope:** Home Experience only. This is the first authenticated experience after login and is not the Portfolio Dashboard.  
**Constraint:** This is a behavioral and structural specification, not a visual design. It excludes colour, typography, pixel measurements, and visual wireframes.

## 0. Product Decision Summary

### Decision

Build one stable Home Experience shell with lifecycle-aware state variants rather than separate home products for each user type.

### Why this decision is strongest

- It preserves a predictable place to orient after login.
- It lets the product respond differently to first login, activation, readiness, portfolio maturity, dormancy, and wealth without fragmenting navigation.
- It keeps critical status and financial information above promotional content.
- It allows new lifecycle states to be introduced through configuration and policy rather than new top-level screens.
- It keeps the Home Experience distinct from Portfolio, which remains the authoritative investment-performance workspace.

### What Home is responsible for

- Orient the user to their current lifecycle state.
- Present the most important next decision or action.
- Surface trustworthy financial and operational context.
- Provide safe entry points to activation, investment discovery, portfolio, tax, support, and account areas.
- Explain incomplete, pending, delayed, restricted, offline, and suspended states without dead ends.

### What Home is not responsible for

- It does not complete KYC, tax declarations, bank verification, exchange creation, or eSign.
- It does not replace the Portfolio Dashboard.
- It does not calculate authoritative portfolio performance independently.
- It does not turn personalization into financial advice.
- It does not hide critical losses, pending actions, restrictions, or compliance statuses behind promotional content.

---

# 1. Home Experience Philosophy

## Why this module exists

After authentication, the user needs orientation before action. A user may be newly registered, still activating, ready to invest, already invested, inactive, or operating with a high-complexity portfolio. A static dashboard treats these users as if they have the same intent and context. Home exists to answer four questions immediately:

1. Where am I in my financial journey?
2. What requires my attention now?
3. What can I safely do next?
4. Where can I inspect the authoritative detail?

## Business problems solved

- Reduces onboarding and activation abandonment by making progress and ownership visible.
- Converts activation-ready users without pushing unsuitable actions.
- Creates a trusted re-entry point for returning investors.
- Improves discovery of portfolio, tax, support, and document capabilities.
- Reduces support volume caused by unclear pending/error states.
- Creates a configurable surface for lifecycle communication without hard-coding campaigns into the core product.

## User problems solved

- “I logged in, but I do not know what to do next.”
- “I do not know whether I can invest yet.”
- “I cannot tell whether a pending process is normal or delayed.”
- “I need a quick view of my financial position without opening a full portfolio workspace.”
- “I do not want the product to hide bad news or push me into a decision.”
- “I need different guidance as my wealth, experience, and activity change.”

## Success metrics

- Reduction in time from first login to next meaningful action.
- Increase in completion of approved onboarding/activation actions.
- Increase in qualified first investment entry after investor readiness.
- Reduction in duplicate support contacts for status questions.
- Increase in returning-user comprehension of activation and portfolio state in research testing.
- No increase in unsuitable or restricted transaction attempts caused by Home content.

## UX principles

- **Orient before persuading:** State and context precede calls to action.
- **One primary decision:** Above the fold should have one dominant next action, not a menu of competing priorities.
- **Authoritative detail exists elsewhere:** Home summarizes; Portfolio, Activation, Tax, and Support provide depth.
- **State is explicit:** Pending, delayed, failed, approved, restricted, suspended, and offline are named consistently.
- **No false urgency:** Use urgency only when a real deadline or user-impacting action exists.
- **Progressive disclosure:** Show the minimum needed now and allow deeper inspection.
- **Safe defaults:** Personalization changes relevance, not regulatory or permission boundaries.

## Trust principles

- Critical financial facts are never hidden below promotional content.
- Every status has a source, last-updated time, and next action when available.
- Pending is never styled or written as success.
- Delayed is never silently presented as normal pending.
- Personalization never overrides a restriction or makes a recommendation appear guaranteed.
- Financial summaries link to authoritative detail and explain when data is stale.
- Human help is visible when the system cannot resolve the user’s uncertainty.

## Information hierarchy

1. Security, account hold, or legally required notice.
2. Lifecycle status and required action.
3. Critical financial status: portfolio value, loss, cash/pending transactions, or stale-data warning where applicable.
4. Primary next decision.
5. Supporting education and contextual explanation.
6. Secondary navigation, services, and optional discovery.

## Progressive disclosure strategy

- Above the fold: lifecycle state, one primary action, and the minimum critical financial/status context.
- First expansion: reason, dependency status, last updated, and next step.
- Deep link: authoritative Activation, Portfolio, Tax, Document, or Support surface.
- Never use collapsed content to hide a critical restriction, material loss, pending financial action, or compliance request.

## Empty-state philosophy

An empty state must answer:

- What is empty?
- Why is it empty?
- What can the user do next?
- What should they not assume?

Empty states should be directional, not decorative. They must provide one clear next action or a safe explanation that no action is currently required.

## Financial confidence principles

- Show whether values are current, delayed, estimated, or unavailable.
- Avoid false precision where a value is pending reconciliation.
- Distinguish invested value, available cash, pending orders, and projected value.
- Do not show returns without a period, basis, or link to detail.
- Do not use positive language to mask a negative financial outcome.
- Let users inspect the underlying portfolio or transaction detail.

## Behavioral design principles

- Use contextual prompts instead of generic notifications.
- Reduce decision load to one meaningful next action.
- Preserve user agency through clear secondary paths.
- Use reminders for unfinished required work, not for arbitrary engagement targets.
- Avoid dark patterns, countdowns, forced discovery, and repeated prompts after dismissal.
- Make progress visible when it reduces uncertainty; do not gamify regulatory completion.

## Engagement principles

- Engagement is a consequence of usefulness and trust, not a substitute for them.
- Educational content is relevant to lifecycle, geography, experience, and permissions.
- Re-entry should quickly restore the user’s context.
- Dormant users receive orientation and relevant recovery actions before marketing.

## Personalization strategy

Personalization changes content order, explanation depth, and recommended next action. It must not alter regulatory requirements, permission boundaries, authoritative financial facts, or suitability rules.

## Accessibility principles

- Home uses a predictable reading order regardless of state.
- Status, urgency, freshness, and restriction are textually available and not colour-dependent.
- Dynamic modules announce changes without stealing focus.
- Cards and rows have meaningful accessible names and destination descriptions.
- Personalization does not remove access to core navigation or account controls.
- Motion is optional, restrained, and never required to understand a state.

---

# 2. Home State Model

## Primary lifecycle states

| State | Home priority | Primary action |
|---|---|---|
| First Login | Orient, explain lifecycle, start next required step | Continue onboarding |
| Onboarding Incomplete | Resume the exact incomplete checkpoint | Resume onboarding |
| Activation Pending | Explain dependencies and waiting state | View activation status |
| Activation Delayed | Explain delay, ownership, and escalation | Refresh/contact support |
| Investor Ready | Confirm readiness and enable safe investment entry | Start investing |
| No Investments | Explain first-investment path without pressure | Explore investments |
| Existing Investor | Summarize current financial position and next relevant action | View portfolio or act on priority |
| Small Portfolio | Build confidence and show essential portfolio context | View portfolio / continue plan |
| Large Portfolio | Prioritize risk, cash, concentration, tax, and operational actions | Review priority insight |
| High Net Worth | Provide high-signal oversight and human/advisory access | Review wealth overview / RM |
| Dormant Investor | Reorient, surface changes, and reduce re-entry friction | Review account/portfolio |

## Operational and data states

- Market open.
- Market closed.
- Holiday/non-trading day.
- Portfolio data current.
- Portfolio data delayed.
- Portfolio data unavailable.
- Pending transaction or reconciliation.
- Payment/bank action pending.
- Tax/document action due.
- Notification/action required.
- User has unread critical notice.
- User has an assigned RM.
- User has no assigned RM.
- Multiple households/family context available.
- User has a restricted product/account context.
- User/account suspended.
- Offline.
- Partial backend outage.
- Session expired.

## State precedence

1. Security, suspension, and legally required notices.
2. Action-required compliance/regulatory state.
3. Activation pending/delayed/failed state.
4. Material financial risk or transaction state.
5. Investor-ready/no-portfolio/existing-investor lifecycle state.
6. Dormancy and personalization.
7. Educational or promotional content.

This precedence prevents marketing or generic recommendations from obscuring a higher-risk or higher-importance state.

---

# 3. Home Architecture

## Stable shell

- Authenticated header with account/security/help access.
- Home title/context and last-updated metadata where relevant.
- Primary lifecycle/status block.
- Primary action region.
- Financial snapshot region when data exists.
- Contextual modules.
- Secondary services and support.
- Stable bottom navigation: Home, Invest, Portfolio, Tax, Help, with account/settings in the established account area.

## Adaptive content slots

- `critical_notice`
- `lifecycle_status`
- `primary_action`
- `financial_snapshot`
- `activation_dependencies`
- `portfolio_insight`
- `cash_and_pending_activity`
- `tax_or_document_action`
- `education`
- `support_or_rm`
- `exploration`

Slots are configured by server state and policy. The shell and navigation remain stable.

## Screen strategy

Use six wireframe screen specifications with state variants:

1. H01 Home – First Login and Onboarding Incomplete.
2. H02 Home – Activation Pending, Delayed, or Failed.
3. H03 Home – Investor Ready and No Investments.
4. H04 Home – Existing Investor.
5. H05 Home – Dormant or Returning Inactive Investor.
6. H06 Home – High Net Worth / Complex Investor.

Market open, market closed, offline, partial data, restricted, suspended, and error are state variants within these screens unless the information hierarchy genuinely changes. This avoids unnecessary screen proliferation.

---

# H01 – Home: First Login and Onboarding Incomplete

## 1. Screen Purpose
Orient a newly authenticated user, explain the current onboarding state, and provide the single most important next step without presenting investment content prematurely.

## 2. User Goal
Understand where they are, what remains, and how to continue or safely exit.

## 3. Business Goal
Increase completion of onboarding, reduce confusion after registration, and prevent premature investment attempts.

## 4. Entry Conditions

- First authenticated session, or onboarding case is incomplete.
- Authentication is valid; onboarding status is available or being resolved.

## 5. Exit Conditions

- Primary action opens the exact onboarding checkpoint.
- Support/help opens established support surfaces.
- User can access account/security and logout through stable navigation.

## 6. Layout Structure

Top to bottom:

1. Authenticated Header with account, help, and security access.
2. Lifecycle Status Block welcoming the user and naming onboarding state.
3. Onboarding progress summary with completed, current, and remaining checkpoints.
4. Primary action: Continue onboarding.
5. Preparation/explanation Card stating what is needed next.
6. Secondary action: Save and exit/Explore permitted information if policy allows.
7. Support entry point.
8. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Page Header, Card, Step Indicator, Progress Indicator, Button, Link, Alert/Banner, Badge/Status Chip.
- New: Reuse Onboarding Context Panel and Policy Status Block from Onboarding v1.0. No Home-specific new component is required beyond the adaptive lifecycle slot.

## 8. Information Priority

1. Onboarding incomplete status.
2. Exact next action.
3. Progress and preparation.
4. Support and stable navigation.

## 9. Interaction Behaviour

- **Tap:** Continue onboarding, open progress detail, help, account, logout.
- **Scroll:** Progress/explanation may scroll; primary action remains discoverable.
- **Keyboard:** All navigation and actions accessible.
- **Validation:** Home reads server-authoritative onboarding status and checkpoint.
- **Loading:** Show lifecycle skeleton while status resolves; prevent stale action routing.
- **Disabled:** Continue disabled if checkpoint or case cannot be resolved.
- **Retry:** Refresh onboarding state idempotently.
- **Timeout:** Show last known safe state and support path.

## 10. All Screen States

- **Default:** First login or incomplete onboarding with clear continuation.
- **Loading:** Onboarding status loading.
- **Empty:** No onboarding case found; offer safe start/support path, never show investor-ready.
- **Success:** Correct checkpoint opened.
- **Error:** Status unavailable; preserve navigation and support.
- **Offline:** Cached progress shown as stale; continuation requiring server state disabled.
- **Restricted:** Onboarding cannot continue under current policy.
- **Suspended:** Onboarding held by compliance/security; show status/support, not a retry loop.

## 11. Validation Rules

- Home cannot infer onboarding state from local storage alone.
- Continue routes to the server-defined incomplete checkpoint.
- First-login content must not override a critical regulatory notice.

## 12. Error Behaviour

Explain whether the issue is missing case, service unavailable, restricted, or held. Provide one safe next action.

## 13. Success Behaviour

Open the correct onboarding checkpoint and preserve resume context.

## 14. Motion Recommendation

Use restrained welcome/progress reveal. Do not use celebratory completion motion while onboarding is incomplete.

## 15. Accessibility

- Lifecycle status and progress are announced.
- Primary action has a specific accessible name such as “Continue onboarding.”
- Dynamic status changes do not steal focus.

## 16. Analytics Events

`h01_viewed`, `first_login_home_viewed`, `onboarding_resume_selected`, `onboarding_progress_opened`, `home_support_selected`, `home_stale_status_shown`.

## 17. Engineering Notes

- Use the existing onboarding case/state service and deep-link contract.
- Do not duplicate onboarding business rules in Home.
- Cache only non-sensitive display state with freshness metadata.

## 18. Acceptance Criteria

- User knows what to do next within the first view.
- Home never implies investor readiness.
- Continue opens the exact incomplete checkpoint.
- Offline, restricted, suspended, and missing-case states have safe paths.

## 19. UX Writing Guidance

Be welcoming but task-oriented. Explain why onboarding is required and what the user can expect next.

## 20. Design Notes

First login should feel guided, not promotional. Do not show a portfolio-like dashboard before there is a portfolio.

---

# H02 – Home: Activation Pending, Delayed, or Failed

## 1. Screen Purpose
Make post-onboarding activation status visible and actionable while keeping pending, delayed, failed, and approved outcomes distinct.

## 2. User Goal
Know what activation dependency is active, why it is pending/delayed/failed, whether action is required, and where to get help.

## 3. Business Goal
Reduce duplicate activation attempts and support contacts while maintaining engagement through safe exploration.

## 4. Entry Conditions

- Onboarding is complete or activation has started.
- Activation state is pending, delayed, failed, or has a dependency requiring user action.

## 5. Exit Conditions

- Status detail opens C01-C08/C11 as appropriate.
- Explore opens C10.
- Investor-ready transition opens C09.
- Support opens C12.

## 6. Layout Structure

Top to bottom:

1. Header with refresh/help.
2. Activation Status Block as the dominant Home module.
3. Activation Dependency Map showing KYC, exchange, bank, and other blocking states.
4. Activation ETA/SLA Summary with last updated and next update when authoritative.
5. Primary action: Complete required action, refresh, or view activation status.
6. Explore While We Activate entry only if permitted.
7. Secondary financial/contextual content that cannot imply transaction access.
8. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Card, Badge/Status Chip, Timeline, Button, Link, Alert/Banner, Loading Skeleton, Error State.
- New: Reuse Activation Status Block, Activation Dependency Map, Activation ETA/SLA Summary, and Explore Guardrail Panel from Activation v1.0.

## 8. Information Priority

1. Activation state and required action.
2. Dependency status and reason.
3. Last update/next step.
4. Safe exploration and support.

## 9. Interaction Behaviour

- **Tap:** Open status/dependency, refresh, required action, explore, support.
- **Scroll:** Activation detail may scroll; critical status remains discoverable.
- **Keyboard:** Status rows and actions accessible.
- **Validation:** Home consumes activation state; it does not calculate it.
- **Loading:** Status refresh visible; prevent duplicate case/action creation.
- **Disabled:** Restricted actions disabled with explanation.
- **Retry:** Refresh/backoff; no duplicate activation.
- **Timeout:** Show last-known state and stale label.

## 10. All Screen States

- **Default:** Pending/delayed/failed activation state visible.
- **Loading:** Activation state loading.
- **Empty:** No activation record; route to C01 safely.
- **Success:** Required activation action accepted or readiness achieved.
- **Error:** Activation service unavailable/conflicting.
- **Offline:** Cached state read-only and stale.
- **Restricted:** Activation/action restricted.
- **Suspended:** Activation held; support/owner path visible.

## 11. Validation Rules

- Pending, delayed, failed, and approved are server-defined.
- No Home action can create a duplicate activation request.
- Explore permissions respect activation state.

## 12. Error Behaviour

Use the same activation failure taxonomy and route to C06/C08/C11/C12 as applicable.

## 13. Success Behaviour

Confirm only the dependency/action transition; route to C09 only after investor-ready entitlement.

## 14. Motion Recommendation

Use restrained state transitions. Do not use progress animation to disguise delay.

## 15. Accessibility

- Overall and dependency status are announced separately.
- Required action and next update are accessible.

## 16. Analytics Events

`h02_viewed`, `activation_status_opened`, `activation_dependency_opened`, `activation_refresh_selected`, `activation_required_action_selected`, `activation_explore_selected`, `activation_delayed_viewed`, `activation_failed_viewed`, `activation_support_selected`.

## 17. Engineering Notes

- Reuse the activation orchestration service and state definitions.
- Home must not maintain a second activation state machine.

## 18. Acceptance Criteria

- User can tell pending from delayed, failed, and approved.
- Every backend state has a visible next action or owner.
- Home never enables investing before activation entitlement.

## 19. UX Writing Guidance

Use clear operational language and state whether the user must act, wait, refresh, or contact support.

## 20. Design Notes

Activation status is the primary content when unresolved. Promotional or discovery content must never outrank it.

---

# H03 – Home: Investor Ready and No Investments

## 1. Screen Purpose
Confirm investor readiness and guide a newly ready user toward informed first-investment exploration without turning Home into an order flow.

## 2. User Goal
Know that investing is enabled, understand the safest next step, and begin learning or exploring without pressure.

## 3. Business Goal
Convert readiness into qualified first-investment engagement while protecting suitability, trust, and long-term retention.

## 4. Entry Conditions

- C09 investor-ready entitlement is authoritative.
- No settled investment holdings exist, or the user has not yet made a first investment.

## 5. Exit Conditions

- Explore/invest action opens the established investment module.
- Portfolio opens the empty portfolio state.
- Help/RM opens support or advisory context.

## 6. Layout Structure

Top to bottom:

1. Header and readiness context.
2. Investor-ready Status Block with exact entitlement language.
3. First-investment guidance block explaining available paths without advice.
4. Primary action: Explore investments.
5. Secondary actions: Learn, speak to RM/support, view documents/tax context.
6. Empty portfolio summary stating no investments yet.
7. Relevant market/open-state or service notice.
8. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Card, Badge/Status Chip, Button, Link, Empty State, Alert/Banner.
- New: None required. Reuse C09 readiness status and Portfolio empty-state pattern.

## 8. Information Priority

1. Investor-ready status.
2. No-investment context.
3. Safe first-investment next step.
4. Learning and support.

## 9. Interaction Behaviour

- **Tap:** Explore, learn, portfolio, RM/support, documents/tax.
- **Scroll:** Guidance may scroll; primary action remains discoverable.
- **Keyboard:** All actions accessible.
- **Validation:** Entitlement and destination permissions server-side.
- **Loading:** Readiness/destination status loading.
- **Disabled:** Explore disabled if readiness is stale or suspended.
- **Retry:** Refresh readiness/destination.
- **Timeout:** Show last-known readiness but do not start an investment action.

## 10. All Screen States

- **Default:** Ready with no investments.
- **Loading:** Readiness/empty portfolio loading.
- **Empty:** No holdings; show directed first-investment path.
- **Success:** Investor-ready entitlement confirmed.
- **Error:** Entitlement/portfolio service error.
- **Offline:** Cached readiness/empty state with action restrictions.
- **Restricted:** Ready but a specific product/action is restricted.
- **Suspended:** Readiness revoked/held; route to activation/support.

## 11. Validation Rules

- No product recommendation is generated solely from readiness.
- Investment actions inherit suitability and product permissions.
- Empty portfolio must not be represented as a failed account.

## 12. Error Behaviour

Explain whether readiness, portfolio, or content is unavailable and provide a safe retry/support path.

## 13. Success Behaviour

Confirm readiness and make exploration available without implying a preferred investment.

## 14. Motion Recommendation

Use restrained transition from activation to ready. Avoid celebratory or urgency-led motion around financial decisions.

## 15. Accessibility

- Readiness, empty state, and available actions are announced.
- No-investment status is text-based and clear.

## 16. Analytics Events

`h03_viewed`, `investor_ready_home_shown`, `first_investment_explore_selected`, `first_investment_learn_selected`, `empty_portfolio_opened`, `rm_support_selected`, `readiness_restricted_shown`.

## 17. Engineering Notes

- Use entitlement and holdings services; do not infer no-investment state from missing portfolio data.
- First-investment content must respect suitability, geography, and product availability.

## 18. Acceptance Criteria

- User knows they are ready but has no investments yet.
- The primary action is informed exploration, not forced transaction.
- No-investment empty state has a clear next step and no false alarm.

## 19. UX Writing Guidance

Be encouraging without pressure. Explain “ready to invest” separately from “recommended to invest.”

## 20. Design Notes

This state is a high-value trust moment. The product should make the first decision feel understandable, not urgent.

---

# H04 – Home: Existing Investor

## 1. Screen Purpose
Provide an adaptive orientation layer for an active investor, summarizing financial position and the most relevant next action while leaving detailed analysis to Portfolio and Tax.

## 2. User Goal
Quickly understand current position, material changes, pending actions, and where to inspect detail.

## 3. Business Goal
Increase informed engagement, improve portfolio/tax/support discovery, and surface relevant actions without creating a second portfolio dashboard.

## 4. Entry Conditions

- Investor-ready user has settled holdings or investment activity.
- Portfolio, transaction, and account services provide current or stale data metadata.

## 5. Exit Conditions

- Portfolio snapshot opens Portfolio.
- Tax/document action opens Tax or Documents.
- Pending transaction/bank/support action opens its authoritative module.
- Investment discovery opens Invest.

## 6. Layout Structure

Top to bottom:

1. Header with account/help/notifications.
2. Critical notice area for restrictions, pending actions, or material account events.
3. Financial Snapshot summarizing total value, day/period context, and data freshness.
4. Primary insight/action block: selected by materiality, not campaign priority.
5. Pending activity/cash/tax/document action module when relevant.
6. Portfolio, Invest, Tax, and support entry points.
7. Educational/contextual content only after action-critical content.
8. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Card, Badge/Status Chip, Button, Link, Alert/Banner, Loading Skeleton, Error State, Secure Link/Share.
- New: None required initially. Financial Snapshot and priority insight should reuse Portfolio components where available, with Home-specific summary constraints.

## 8. Information Priority

1. Critical account/financial notice.
2. Current financial snapshot and freshness.
3. Material insight or action.
4. Pending cash/transactions/tax.
5. Secondary discovery/education.

## 9. Interaction Behaviour

- **Tap:** Open Portfolio detail, transaction, tax, invest, support, or account.
- **Scroll:** Modules scroll vertically; critical notice remains in reading order.
- **Keyboard:** Cards/actions have descriptive destinations.
- **Validation:** Financial values and insights come from authoritative services.
- **Loading:** Use region-level skeletons; do not hide all content behind one global spinner.
- **Disabled:** Action disabled with reason if permission/status restricts it.
- **Retry:** Retry affected region without resetting unrelated content.
- **Timeout:** Mark data stale and preserve safe navigation.

## 10. All Screen States

- **Default:** Existing investor summary with current data.
- **Loading:** One or more financial regions loading.
- **Empty:** Specific module has no data; show contextual empty state.
- **Success:** Snapshot and priority action available.
- **Error:** Region-level failure with retry and authoritative-module link.
- **Offline:** Cached financial data marked stale; transaction actions disabled.
- **Restricted:** Product/account/action restrictions visible with explanation.
- **Suspended:** Account hold notice outranks content; action/support path shown.

## 11. Validation Rules

- Home never calculates authoritative returns, value, tax, or holdings independently.
- Every financial snapshot has period/freshness context.
- Insights are explainable and link to source detail.

## 12. Error Behaviour

Use region-level errors. A failed portfolio snapshot must not make the entire Home blank or imply loss.

## 13. Success Behaviour

Show an accurate summary and route to the authoritative module for decisions.

## 14. Motion Recommendation

Use restrained data refresh and state transitions. Avoid animated numbers that obscure value changes or suggest performance.

## 15. Accessibility

- Financial values include labels, units, period, and freshness.
- Charts/summaries have text alternatives through links to detail.
- Dynamic data updates are announced appropriately, not continuously.

## 16. Analytics Events

`h04_viewed`, `financial_snapshot_loaded`, `financial_snapshot_stale`, `home_priority_insight_opened`, `portfolio_opened`, `tax_opened`, `pending_activity_opened`, `invest_opened`, `home_region_retry_selected`.

## 17. Engineering Notes

- Use Portfolio/Tax/Transaction services as sources of truth.
- Home composition should support partial response and independent region caching.
- Insight selection requires a documented materiality/ranking service or rule set.

## 18. Acceptance Criteria

- Home is a summary/orientation layer, not a duplicate Portfolio Dashboard.
- Critical financial information is visible before education/promotional content.
- Stale and partial data are explicit.
- No financial action is enabled from unverified or stale state.

## 19. UX Writing Guidance

Use factual, period-specific labels. Explain “what changed” without predicting what will happen next.

## 20. Design Notes

The experienced investor needs signal density, not more modules. Prioritize materiality and reduce repeated navigation.

---

# H05 – Home: Dormant or Returning Inactive Investor

## 1. Screen Purpose
Reorient an inactive or returning investor to current account, portfolio, activation, and support context before encouraging any new action.

## 2. User Goal
Understand what changed since last visit, whether the account is still active, and what should be reviewed first.

## 3. Business Goal
Recover legitimate engagement, reduce surprise caused by stale information, and prevent unsuitable or uninformed re-entry.

## 4. Entry Conditions

- User has prior investment activity but has not engaged for the server-defined dormancy window.
- Account, portfolio, tax, or activation state may have changed since last activity.

## 5. Exit Conditions

- Review portfolio opens Portfolio.
- Required account/activation/tax action opens the authoritative module.
- Support/RM opens C12 or established support.

## 6. Layout Structure

Top to bottom:

1. Header with last-login/security notice if relevant.
2. Returning-user context block stating what needs attention.
3. Material changes summary: portfolio, account, tax, bank, or activation, only where authoritative.
4. Primary action: Review account/portfolio.
5. Secondary action: Complete required update, contact RM/support.
6. Financial snapshot with freshness.
7. Educational content only after review actions.
8. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Page Header, Card, Badge/Status Chip, Timeline, Button, Link, Alert/Banner, Loading Skeleton, Error State.
- New: None required. Reuse financial snapshot, activation status, and human ownership patterns.

## 8. Information Priority

1. Security/account changes.
2. Material financial/regulatory changes.
3. Review action.
4. Education/re-engagement.

## 9. Interaction Behaviour

- **Tap:** Review portfolio/account, complete required action, support/RM, dismiss non-critical education.
- **Scroll:** Changes summary and financial detail may scroll.
- **Keyboard:** All actions accessible.
- **Validation:** Dormancy and change summaries server-authoritative.
- **Loading:** Load current status and change summary independently.
- **Disabled:** Actions disabled if account state is suspended/restricted.
- **Retry:** Retry affected region.
- **Timeout:** Show last-known data as stale and route to source module.

## 10. All Screen States

- **Default:** Returning-user summary with material changes.
- **Loading:** Account/portfolio/change summary loading.
- **Empty:** No material change detected; show normal investor orientation.
- **Success:** Current context loaded and review action available.
- **Error:** Change summary unavailable; provide source-module links.
- **Offline:** Cached context marked stale; actions requiring server validation disabled.
- **Restricted:** Account/product restriction visible above re-engagement content.
- **Suspended:** Suspension notice and support path outrank all other content.

## 11. Validation Rules

- Dormancy thresholds are server-defined.
- Material changes must be based on authoritative event/history data.
- Do not infer inactivity from a single missing session event.

## 12. Error Behaviour

State whether the issue is current-data unavailable or an account restriction. Never use a re-engagement CTA to conceal a status problem.

## 13. Success Behaviour

Restore the user’s current context and guide them to review before new investment action.

## 14. Motion Recommendation

Use restrained re-entry/status feedback. Avoid urgency or scarcity motion for dormant users.

## 15. Accessibility

- Change summaries use semantic headings and clear time context.
- Critical account notices are announced before optional content.

## 16. Analytics Events

`h05_viewed`, `returning_user_context_loaded`, `material_change_opened`, `dormant_portfolio_reviewed`, `dormant_required_action_selected`, `dormant_support_selected`, `dormant_education_opened`.

## 17. Engineering Notes

- Use server-defined dormancy and event summaries.
- Account changes, security events, and material portfolio changes require appropriate notification and audit integration.

## 18. Acceptance Criteria

- Returning users see what changed before being prompted to invest.
- Dormancy does not imply account failure.
- Restrictions/suspensions outrank re-engagement content.

## 19. UX Writing Guidance

Use “Welcome back” only alongside useful current context. Avoid implying that the user is behind or needs to catch up.

## 20. Design Notes

Re-entry should restore confidence first. Conversion is secondary to helping the user understand the current state.

---

# H06 – Home: High Net Worth / Complex Investor

## 1. Screen Purpose
Provide a high-signal orientation layer for users with substantial, multi-account, family, tax, or advisory complexity without creating a separate product shell.

## 2. User Goal
See material wealth, risk, liquidity, tax, household, and service signals quickly and access the right detail or human support.

## 3. Business Goal
Serve high-value users with appropriate information density, improve retention and RM effectiveness, and reduce operational friction across complex holdings.

## 4. Entry Conditions

- Server-defined wealth/complexity segment or multi-account context is available.
- User has permission to view the relevant household/account scope.

## 5. Exit Conditions

- Wealth overview opens Portfolio/household detail.
- Tax/liquidity/risk action opens the authoritative module.
- RM/support opens assigned human ownership.

## 6. Layout Structure

Top to bottom:

1. Header with account/household selector and RM/help access where permitted.
2. Critical notice/security/compliance region.
3. Wealth Snapshot summarizing selected scope, freshness, and data coverage.
4. Priority oversight block: liquidity, concentration, risk, tax, pending operations, or service issue based on materiality.
5. Household/account scope and switch context.
6. RM/support and document/tax entry points.
7. Educational/discovery content only after oversight content.
8. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Page Header, Select, Card, Badge/Status Chip, Button, Link, Alert/Banner, Loading Skeleton, Error State, Audit Metadata Block.
- New: None required initially. Wealth Snapshot and scope selector should reuse Portfolio/Family components where approved.

## 8. Information Priority

1. Critical risk/security/service notices.
2. Selected wealth scope and freshness.
3. Material oversight insight.
4. Tax/liquidity/RM actions.

## 9. Interaction Behaviour

- **Tap:** Switch scope, open detail, tax/liquidity/risk, RM/support, documents.
- **Scroll:** Oversight modules scroll; scope context remains clear.
- **Keyboard:** Scope selector and all actions accessible.
- **Validation:** Scope permissions and values server-authoritative.
- **Loading:** Region-level skeletons; do not show mixed-scope data.
- **Disabled:** Scope/action disabled when permission or data coverage unresolved.
- **Retry:** Retry affected region.
- **Timeout:** Preserve scope but mark data stale and route to authoritative detail.

## 10. All Screen States

- **Default:** Complex-investor Home with selected scope and oversight priorities.
- **Loading:** Scope/wealth/insight data loading.
- **Empty:** Selected scope has no data; explain scope and offer account switch/support.
- **Success:** Snapshot and priority oversight available.
- **Error:** Region-level failure with retry/detail path.
- **Offline:** Cached values marked stale; transactions and scope-sensitive actions disabled.
- **Restricted:** Household/account scope or insight restricted.
- **Suspended:** Account/security hold outranks wealth content.

## 11. Validation Rules

- Do not mix household and personal values without explicit scope.
- Every summary has scope, period, coverage, and freshness.
- Personalization must not infer advice or suitability.

## 12. Error Behaviour

Identify missing data scope, permission restriction, stale data, or service failure. Never fill gaps with estimates without explicit labeling.

## 13. Success Behaviour

Show a trustworthy high-level oversight summary and route to authoritative detail/RM support.

## 14. Motion Recommendation

Use restrained scope and data-refresh feedback. Avoid animated wealth counters that could trivialize material financial changes.

## 15. Accessibility

- Scope, currency, period, coverage, and freshness are read in accessible labels.
- Dense information is grouped under semantic headings.
- Charts/visual summaries have textual alternatives.

## 16. Analytics Events

`h06_viewed`, `wealth_scope_opened`, `wealth_scope_changed`, `wealth_snapshot_loaded`, `wealth_priority_insight_opened`, `tax_liquidity_opened`, `rm_opened`, `wealth_data_stale`, `wealth_scope_restricted`.

## 17. Engineering Notes

- Segment thresholds, household permissions, aggregation model, currency conversion, and data coverage are UNKNOWN.
- Home must not aggregate across accounts unless the Portfolio/Family service returns an authoritative aggregate.
- Scope changes must invalidate dependent cached modules.

## 18. Acceptance Criteria

- User always knows which scope the summary represents.
- Material risk/liquidity/tax/service information outranks discovery content.
- No mixed-scope or stale value is presented as current.

## 19. UX Writing Guidance

Use precise scope and period language. Avoid status language that implies advice or guaranteed action.

## 20. Design Notes

HNW personalization is primarily about signal quality, scope clarity, and service access, not adding more cards.

---

# A. Trust Signals

Trust signals that belong on Home:

- Last updated timestamp for financial and operational data.
- Explicit current state: onboarding, activation, investor-ready, restricted, delayed, or suspended.
- Source/deep-link to authoritative detail.
- Case/reference ID for activation or support processes.
- Dependency-level status rather than one opaque aggregate.
- Clear distinction between current value, pending value, estimated value, and unavailable value.
- Scope labels for personal, joint, family, or household views.
- Visible RM/support ownership when authoritative.
- Security/session notice when relevant.
- Plain-language explanation for why an action is unavailable.
- No unexplained prefilled or personalized recommendation.

Trust signals that must not be used:

- Fake urgency or countdowns.
- Unverifiable “best for you” labels.
- Hidden fees, risk, tax, or loss information.
- Decorative success states for pending regulatory work.
- Social proof used to pressure a financial decision.

---

# B. Reusable UX Patterns

| Pattern | Purpose | Reuse rule |
|---|---|---|
| Lifecycle Status Block | States where the user is in the journey | Reuse across onboarding, activation, Home, and support |
| Dependency Status Row | Shows status, reason, action, and next step | Use for activation, onboarding, and operational dependencies |
| Financial Snapshot | Quick summary with scope, period, freshness, and detail link | Reuse Portfolio summary; never duplicate calculations |
| Priority Action Block | One primary next decision with reason | Must be server/policy-driven and dismissible when non-critical |
| Freshness Metadata | Communicates current, delayed, stale, or unavailable data | Required for financial and operational summaries |
| Guardrail Panel | Explains what is unavailable and why | Use while activating, restricted, offline, or suspended |
| Empty State | Explains what is empty, why, and next action | Must be contextual, actionable, and non-alarming |
| Scope Selector | Switches personal/family/account context | Must confirm permission and prevent mixed-scope data |
| Human Ownership Block | Shows assigned team/channel and next update | Use only when ownership is authoritative |
| Region-Level Error | Keeps Home useful during partial backend failures | Retry affected region without blanking the whole Home |
| Critical Notice | Ensures security/regulatory/material financial notice outranks content | Never dismiss permanently when legally required |

---

# C. Empty-State Strategy

| Empty state | User should see | User should learn | User should do next |
|---|---|---|---|
| First login | Onboarding status and one continuation action | Registration is not activation or readiness | Continue onboarding |
| Onboarding incomplete | Exact incomplete checkpoint and progress | What remains and why | Resume onboarding |
| Activation pending | Dependency map and last update | Waiting is a real process, not a failed account | View status or wait safely |
| Activation delayed | Delay reason/owner/next update | Delayed is different from normal pending | Refresh or contact support |
| No investments | No holdings context and safe first-investment path | Ready does not mean a recommendation | Explore or learn |
| No portfolio data | Why data is unavailable | No data does not equal zero value | Retry/open Portfolio/support |
| No pending activity | Explicit “nothing requires attention” state | Account is not missing data | Continue normal navigation |
| Dormant with no material changes | Returning orientation | No urgent issue was detected | Review or explore normally |
| HNW scope empty | Selected scope and permission explanation | Scope may contain no data or be unavailable | Switch scope or contact support |
| Offline | Last known data and stale timestamp | Actions cannot be confirmed offline | Reconnect and retry |
| Restricted | Reason category and permitted alternative | Restriction is policy-driven | Review details or contact support |
| Suspended | Hold status, owner, and safe route | Repeated retries will not bypass the hold | Contact support/RM |

Empty states must not use generic illustrations, vague “nothing here” language, or a promotional CTA unrelated to the empty condition.

---

# D. Personalization Strategy

## Investor profile

- First-time users receive orientation, definitions, and a single next step.
- Experienced users receive more concise summaries and faster access to Portfolio/Invest.
- Users with complex family/account structures receive scope clarity and service access.

## Portfolio size

- No portfolio: education and first-investment exploration.
- Small portfolio: essential value, contribution, diversification, and confidence-building context.
- Large portfolio: materiality-ranked risk, liquidity, concentration, tax, and pending-operation signals.

## Risk profile

- Risk profile may change explanation depth and suitability reminders.
- It must not create a new recommendation engine on Home.
- Risk restrictions or review states always outrank engagement content.

## Geography

- Country, account type, tax residency, currency, and market calendar affect copy, data, and permissions.
- Geography must not be inferred from device location alone.
- Localized regulatory content is policy-controlled and versioned.

## Activation state

- Incomplete onboarding: continuation dominates.
- Pending/delayed activation: status and ownership dominate.
- Investor ready: safe investment entry becomes available.
- Failed/restricted/suspended: recovery/support dominates.

## User behavior

- Returning inactive users receive reorientation before promotion.
- High activity users receive pending/cash/transaction insights before education.
- Repeatedly dismissed content should reduce repetition, but critical notices cannot be suppressed.
- Personalization decisions must be explainable through event/rule metadata for QA and support.

## Personalization guardrails

- Never personalize away critical financial, regulatory, or security facts.
- Never use behavioral data to infer suitability or tax status.
- Never use wealth segment to suppress basic explanations or support.
- Users can access stable navigation regardless of segment.

---

# E. Home Prioritization Matrix

| Content | Above fold | Below fold | Reason |
|---|---|---|---|
| Security/suspension/legal notice | Always when applicable | No | Highest user and compliance impact |
| Required onboarding/activation action | Yes | No | Prevents dead ends and abandonment |
| Pending/delayed/failed status | Yes | No | Reduces uncertainty and duplicate action |
| Investor-ready state | Yes when newly achieved | Summary thereafter | Important lifecycle transition |
| Critical financial loss/risk/cash issue | Yes when material | Detail below | Users must not miss material facts |
| Financial snapshot | Yes for existing investors | Detail below | Fast orientation, not full analysis |
| No-investment empty state | Yes for ready/no-investment users | Detail below | Guides first meaningful action |
| Portfolio insight | Yes for active investors if material | Detail below | Materiality over volume |
| Tax/document action | Yes when due or blocking | Detail below otherwise | Prevents compliance surprise |
| Exploration/education | Below fold unless it is the current safe next action | Yes | Engagement follows clarity |
| Promotional content | Below all critical/action content | Yes, limited | Avoids pressure and distraction |

Above-fold rules:

- One primary action only.
- Maximum of one dominant lifecycle/status block and one critical financial block.
- Never place promotional content above an unresolved regulatory, activation, security, or material financial state.
- Market open/closed is contextual metadata unless it changes the safe next action.

---

# F. Future Scalability

The Home architecture intentionally supports:

- New activation dependencies without adding a new Home screen.
- Additional account types and family/household scopes.
- Multi-currency financial snapshots with explicit scope and freshness.
- New tax/document obligations through action slots.
- RM/advisory and support ownership without changing navigation.
- Market-calendar and trading-session states.
- Partial backend availability through region-level loading/error behavior.
- Explainable rule-based personalization before any AI layer.
- Future AI assistance only as an optional explanation/retrieval layer, never as an authority for compliance, tax, suitability, or financial facts.

## Scalability constraints

- Do not let the number of adaptive cards grow without an explicit priority/ranking model.
- Do not allow each backend team to create an independent Home status language.
- Do not aggregate financial data in the client.
- Do not create segment-specific shells that diverge from the approved navigation architecture.
- Do not use personalization to hide required information.

---

# Module-Level Handoff Rules

## Cross-module consistency

- Home consumes Authentication, Onboarding, Activation, Portfolio, Tax, Support, and account state; it does not duplicate their business rules.
- C01-C12 remain the authoritative activation surfaces.
- B01-B20 remain the authoritative onboarding/regulatory surfaces.
- Portfolio remains the authoritative source for holdings, valuation, performance, and transaction detail.
- Home summaries must deep-link to the authoritative source and preserve scope/context.
- Pending, delayed, failed, approved, restricted, suspended, offline, and stale states use the same language across modules.

## Required QA coverage

- Every lifecycle state and precedence combination.
- First login, returning login, session refresh, deep links, back navigation, logout, and account switching.
- Partial backend failures where one Home region loads and another fails.
- Stale financial data, market closed, holiday, offline, reconciliation, and delayed provider data.
- Permission changes, suspension, restriction, HNW scope changes, family/account switching, and RM assignment changes.
- Screen-reader reading order, dynamic updates, keyboard navigation, reduced motion, and text alternatives for financial summaries.
- Analytics validation for personalization decisions, state precedence, freshness, and PII redaction.

## Required product/engineering decisions before high-fidelity design

- Exact lifecycle segmentation thresholds: UNKNOWN.
- Financial snapshot data source and freshness SLA: UNKNOWN.
- Materiality/ranking rules for priority insights: UNKNOWN.
- Investor-ready entitlement and regression contract: UNKNOWN.
- Dormancy threshold and re-entry rules: UNKNOWN.
- HNW/household scope permissions and aggregation: UNKNOWN.
- Personalization rule ownership, experimentation guardrails, and auditability: UNKNOWN.

## Wireframe Readiness Checklist

- [x] Home is explicitly separated from the Portfolio Dashboard.
- [x] The Home shell remains stable while lifecycle content adapts.
- [x] First login, onboarding incomplete, activation pending/delayed/failed, investor ready, no investments, existing investor, dormant, HNW, offline, error, restricted, and suspended states are covered.
- [x] Critical status and financial information outrank engagement content.
- [x] Empty-state strategy explains what the user sees, learns, and does next.
- [x] Personalization changes relevance, not permissions or regulatory truth.
- [x] Six screen specifications use the locked 20-section structure.
- [x] Future expansion is configuration- and component-ready without creating unnecessary screens.
- [ ] Segmentation thresholds, source SLAs, financial materiality rules, and scope permissions remain to be confirmed.

**Handoff decision:** Ready for low-fidelity wireframe implementation. High-fidelity design and implementation sign-off remain conditional on resolving the explicit data, segmentation, materiality, permission, and operational unknowns above.
