# NRI Portfolio Experience
## Product Architecture and Low-Fidelity Wireframe Specification

**Role:** Chief Product Architect and Principal Product Designer  
**Status:** Extension of Authentication & Identity v1.0, Onboarding & Regulatory v1.0, Investment Activation v1.0, and Home Experience  
**Scope:** Portfolio Experience only. Portfolio is the authoritative financial workspace and is not Home.  
**Constraint:** This is a behavioral and structural specification, not a visual design. It excludes colour, typography, pixel measurements, and visual wireframes.

## 0. Product Architecture Decision

### Decision

Build Portfolio as a source-linked financial command center with six core screen types:

1. P01 Portfolio Overview.
2. P02 Holdings & Allocation.
3. P03 Holding Detail.
4. P04 Performance & Returns.
5. P05 Transactions & Activity.
6. P06 Family/Household Portfolio Scope.

Portfolio states such as no holdings, single investment, diversified, multi-asset, HNI, market closed, delayed, offline, and suspended are variants of these screens rather than separate products.

### Why this architecture is strongest

- It separates orientation from analysis: Home tells users what matters now; Portfolio lets users understand their money in depth.
- It creates one authoritative source for holdings, valuation, performance, allocation, transactions, and scope.
- It avoids duplicating calculations across Home and Portfolio.
- It supports future assets, family scopes, tax overlays, corporate actions, advisors, and AI explanation through expandable data domains.
- It preserves a stable navigation model while allowing progressive disclosure by user complexity.

### What Portfolio answers

- How much money do I have?
- Where is it invested?
- How is it performing over a chosen period and basis?
- What changed recently?
- What requires attention?
- What can I safely do next?

### What Portfolio does not do

- It does not perform onboarding, KYC, activation, tax declaration, or eSign.
- It does not replace fund discovery or order-entry flows.
- It does not provide unqualified investment or tax advice.
- It does not make a financial value authoritative merely because it is displayed.

### Shared behavior contract

- Every asynchronous action has explicit loading, timeout, retry, failure, and completion behavior.
- Sensitive values are masked by default. Account numbers, bank details, tax identifiers, and raw personal data are never sent to analytics.
- Every portfolio read, export, scope change, holding action, transaction view, and user decision is auditable where required.
- All retry actions are idempotent and do not create duplicate orders, exports, support cases, or data requests.
- Financial data is always labeled with scope, valuation time, source, currency, period, and freshness where relevant.
- Offline behavior must not imply that a value or transaction is current.
- Home may summarize Portfolio; Portfolio is the authority for financial detail.
- Pending, settled, failed, reversed, unknown, stale, and unavailable financial states must remain distinct.

---

# 1. Portfolio Philosophy

## Wealth understanding over wealth theatre

Portfolio is not a gallery of performance numbers. It is a decision-support workspace that makes ownership, movement, uncertainty, risk, and next actions understandable. The product must be calm when data is good, explicit when data is incomplete, and honest when performance is negative.

## Business objectives

- Increase user comprehension and confidence in portfolio data.
- Reduce support questions about value, performance, transactions, and scope.
- Increase informed use of Portfolio, Tax, and investment actions without creating unsuitable activity.
- Improve retention by making the product useful between transactions.
- Establish a scalable financial data model that supports new assets and geographies.
- Reduce reconciliation, stale-data, and mixed-scope errors.

## User objectives

- See total wealth and invested value accurately.
- Understand allocation across funds, asset classes, currencies, accounts, and family scope.
- Understand returns by period and calculation basis.
- Identify meaningful changes and pending activity.
- Inspect the underlying holding or transaction when a summary raises a question.
- Know when the data is delayed, estimated, partial, or unavailable.
- Take a safe next action or understand that no action is required.

## Success metrics

- Successful comprehension of value, performance period, and freshness in usability research.
- Reduced “what is my value/return/status?” support contacts.
- Increased repeat Portfolio usage without corresponding increase in unsuitable transactions.
- Increased drill-down from summary to authoritative holding/transaction detail.
- Reduced mismatch reports between Portfolio, statements, and support records.
- Reduced time to identify an unresolved pending/reconciliation item.
- Improved accessibility task completion for screen-reader and keyboard users.

## Wealth psychology principles

- People anchor on a single total; expose scope and period beside every total.
- People overweight recent movement; provide context without minimizing current loss.
- People confuse contribution with return; separate invested capital, contributions, withdrawals, and gains.
- People interpret precision as certainty; label estimates, delays, and unresolved values.
- People avoid complex portfolios when detail is unstructured; use progressive disclosure and stable categories.
- People may take action to relieve anxiety; make “no action required” a legitimate outcome.

## Information hierarchy

1. Scope, currency, valuation time, and freshness.
2. Total value and material account/transaction notice.
3. Performance with period and calculation basis.
4. Allocation and concentration.
5. Holdings and underlying detail.
6. Transactions, cash, tax, documents, and corporate actions.
7. Explanations, education, and optional insights.

## Trust framework

- Every number has provenance: source, timestamp, scope, period, and status.
- Every summary has a path to its underlying holdings or transactions.
- Every chart has a text alternative and a data table/detail path.
- User-visible calculations are defined in plain language.
- Errors are localized to the affected data region.
- The product does not hide negative performance, missing data, fees, or pending activity.
- Exported statements and records are treated as authoritative artifacts where applicable.

## Financial decision framework

Portfolio content should help the user move through this sequence:

1. **Orient:** What scope and period am I viewing?
2. **Verify:** Is the data current and complete?
3. **Understand:** What is owned, how is it performing, and what changed?
4. **Assess:** Is there a material risk, concentration, liquidity, tax, or operational issue?
5. **Choose:** Is an action needed now, or is monitoring enough?
6. **Inspect:** Open the authoritative detail before acting.

## Progressive disclosure strategy

- Overview: total value, current performance context, freshness, top material insight, and primary destination.
- Mid-level: allocation, holdings summary, pending activity, and prioritized changes.
- Deep level: holding detail, transaction ledger, performance methodology, tax basis, corporate actions, and exports.
- Never collapse away a material loss, restriction, pending transaction, data-quality issue, or unresolved reconciliation state.

## Empty portfolio philosophy

An empty Portfolio is not an error. It is a truthful state that should explain whether the user is activated but has no holdings, whether data is still loading, or whether a portfolio has not yet been created. It must provide a safe next action and never imply that the user’s account is broken.

## Risk communication principles

- Describe risk exposure, not certainty about future outcomes.
- Use absolute and relative exposure with scope and denominator.
- Surface concentration and liquidity signals when materially relevant.
- Avoid red/green-only semantics and emotional language.
- Explain methodology and link to detail.
- Risk insights must not become unregulated advice.

## Performance communication principles

- Always state period: today, since inception, selected dates, or another defined basis.
- Distinguish absolute return, percentage return, contributions, withdrawals, and distributions.
- Label calculation methodology and whether values are time-weighted, money-weighted, or another basis.
- Include fees/taxes only when the calculation basis supports them.
- Show negative performance plainly and provide context, not reassurance theatre.
- Do not animate performance numbers in a way that obscures the underlying value.

## Accessibility principles

- Every financial value has an accessible label with currency, amount, scope, period, and freshness.
- Charts have a text summary, data table, or equivalent detail path.
- Sorting/filtering state is announced and reversible.
- Dynamic updates do not steal focus.
- Users can navigate the entire Portfolio without relying on hover, colour, gestures, or motion.
- Complex information is grouped under semantic headings with predictable reading order.

## Personalization strategy

Personalization changes default scope, information density, and priority ordering. It must not alter authoritative values, permissions, suitability rules, tax facts, or critical disclosures.

## Data freshness strategy

Every financial region must support:

- Current/updated.
- Delayed with last update.
- Partial coverage.
- Pending reconciliation.
- Unavailable.
- Offline cached state.

The product must never show a stale value without labeling it as stale.

---

# 2. Portfolio State Model

## Portfolio composition states

- No portfolio.
- Single investment.
- Small portfolio.
- Diversified portfolio.
- Multi-asset portfolio.
- Family/household portfolio.
- HNI/complex portfolio.
- Portfolio with cash only.
- Portfolio with pending holdings.
- Portfolio with closed/redeemed holdings in history but no current holdings.

## Market and data states

- Market open.
- Market closed.
- Holiday/non-trading day.
- Data current.
- Data delayed.
- Data partially available.
- Data pending reconciliation.
- Data unavailable.
- Offline.
- Historical-only data.

## Operational and account states

- Pending order or settlement.
- Failed/rejected/reversed transaction.
- Corporate action pending.
- Tax basis incomplete.
- Statement/report unavailable.
- Account restricted.
- Account suspended.
- Scope permission changed.
- Currency conversion unavailable.
- Service degradation.

## State precedence

1. Security, suspension, legally required notice, and account restriction.
2. Material financial data integrity or reconciliation issue.
3. Pending/failed/reversed transaction or corporate action.
4. Material loss, concentration, liquidity, or tax attention item.
5. Data freshness and market status.
6. Portfolio composition state.
7. Education and optional insights.

Market closed does not outrank a material financial or security notice. No portfolio does not outrank a required account restriction. A delayed value cannot be represented as current merely because the market is open.

---

# 3. Portfolio Screen Strategy

## P01 Portfolio Overview

Authoritative command center for total value, performance context, material attention items, allocation summary, and navigation to detail.

## P02 Holdings & Allocation

Authoritative view of what is owned and how it is distributed by holding, asset class, account, currency, or family scope.

## P03 Holding Detail

Authoritative view of one holding’s value, units, cost, performance, transactions, tax context, and permitted actions.

## P04 Performance & Returns

Authoritative view of performance by period and methodology, with contribution/withdrawal context and explanation.

## P05 Transactions & Activity

Authoritative ledger of orders, settlements, dividends/distributions, transfers, fees, corporate actions, and pending/reversed states.

## P06 Family/Household Portfolio Scope

Scope-controlled portfolio view for users with family/household or multiple-account permission. It is a scope variant, not a separate portfolio product.

---

# P01 – Portfolio Overview

## 1. Screen Purpose
Provide the authoritative high-level view of the user’s wealth, performance context, material changes, and most important next action.

## 2. User Goal
Know how much money is held, how it is performing, what changed, and whether anything requires attention.

## 3. Business Goal
Make Portfolio the trusted destination for financial understanding, reduce ambiguity, and route users to the right action/detail without duplicating Home.

## 4. Entry Conditions

- Authenticated investor with a permitted portfolio scope.
- Portfolio data may be current, delayed, partial, historical-only, or unavailable.

## 5. Exit Conditions

- Holdings opens P02.
- Performance opens P04.
- A holding opens P03.
- Activity opens P05.
- Family scope opens P06 when permitted.
- Invest/Tax/Support use established modules.

## 6. Layout Structure

Top to bottom:

1. Header with scope selector, date/freshness access, help, and account access.
2. Critical notice region for restrictions, suspension, reconciliation, or required action.
3. Portfolio scope and currency context.
4. Total value summary with valuation time and freshness.
5. Performance summary with selected period and methodology link.
6. Primary attention block: material change, pending activity, concentration, liquidity, tax, or no-action-required state.
7. Allocation summary with link to P02.
8. Top holdings/changes summary with links to P03/P05.
9. Secondary services: Tax, documents, support, and permitted action entry points.
10. Stable bottom navigation.

## 7. Component Placement

- Existing: App Shell, Page Header, Select, Card, Badge/Status Chip, Alert/Banner, Button, Link, Loading Skeleton, Error State, Table/Data Table where appropriate.
- New: Financial Snapshot, Freshness Metadata, Priority Attention Block, Allocation Summary. These are reusable portfolio components because Home must not become a second financial authority.

## 8. Information Priority

1. Scope/freshness and critical notices.
2. Total value.
3. Performance period/basis.
4. Material attention item.
5. Allocation and holdings summary.
6. Secondary services.

## 9. Interaction Behaviour

- **Tap:** Change scope, open freshness detail, choose period, open holdings/performance/activity/holding, open attention action.
- **Scroll:** Overview scrolls vertically; critical notice remains first in reading order.
- **Keyboard:** Scope selector, period controls, cards, and links are fully navigable.
- **Validation:** Values, scope, permissions, period, and freshness come from authoritative services.
- **Loading:** Region-level loading; preserve available content while other regions load.
- **Disabled:** Actions disabled when data is stale, permission is missing, or action is not permitted.
- **Retry:** Retry only the failed region.
- **Timeout:** Mark affected data unknown/stale and link to source/support.

## 10. Screen States

- **Default:** Portfolio summary with current/known data.
- **Loading:** One or more regions loading.
- **Empty:** No holdings; use the applicable no-portfolio state and next action.
- **Success:** Summary, performance, and attention information available.
- **Error:** Region-level or page-level data failure with retry.
- **Offline:** Cached values marked stale; transaction actions disabled.
- **Restricted:** Portfolio or scope access limited; show reason and support.
- **Suspended:** Account hold notice outranks all content and routes to support.

## 11. Validation Rules

- Home summaries cannot be the calculation source for Portfolio.
- Total value must include scope, currency, valuation time, and freshness.
- Performance must include period and methodology.
- A material attention item cannot be hidden by personalization or dismissal.

## 12. Error Behaviour

Use region-level errors and retain navigation. A failed performance region must not blank holdings or imply no value.

## 13. Success Behaviour

Show authoritative summary and clear drill-down paths. A successful load does not imply that no attention is required.

## 14. Motion Recommendation

Use restrained region loading and refresh transitions. Do not animate financial values in a way that creates false confidence.

## 15. Accessibility

- Financial Snapshot exposes currency, scope, period, freshness, and status in accessible text.
- Charts/summaries link to data tables or detailed views.
- Critical notices are announced before optional content.

## 16. Analytics Events

`p01_viewed`, `portfolio_scope_opened`, `portfolio_scope_changed`, `portfolio_snapshot_loaded`, `portfolio_snapshot_stale`, `portfolio_attention_opened`, `portfolio_holdings_opened`, `portfolio_performance_opened`, `portfolio_activity_opened`, `portfolio_region_retry_selected`, `portfolio_support_selected`.

## 17. Engineering Notes

- Portfolio overview must consume authoritative valuation/performance/allocation services.
- Use independent region APIs or composable responses to support partial availability.
- Every summary must include source/freshness metadata.

## 18. Acceptance Criteria

- User can answer value, performance, change, and attention questions from the first view.
- Portfolio is not a duplicate Home.
- Scope and freshness are visible.
- Critical notices and financial integrity states outrank optional content.
- No stale or unavailable value is presented as current.

## 19. UX Writing Guidance

Use factual, period-specific language. Label values as current, delayed, estimated, partial, or unavailable where applicable.

## 20. Design Notes

P01 is the portfolio command center. Its job is comprehension and routing, not displaying every available metric at once.

---

# P02 – Holdings & Allocation

## 1. Screen Purpose
Show what the user owns and how wealth is distributed across holdings, asset classes, accounts, currencies, and permitted scopes.

## 2. User Goal
Understand where money is invested, identify concentration or gaps, and inspect the relevant holding.

## 3. Business Goal
Increase transparency, reduce support questions, and provide a stable foundation for portfolio decisions and future analysis.

## 4. Entry Conditions

- P01 or direct Portfolio navigation.
- Holdings service returns current, delayed, pending, or unavailable data.

## 5. Exit Conditions

- Holding opens P03.
- Allocation dimension changes update the same authoritative dataset.
- Performance opens P04; activity opens P05; scope opens P06.

## 6. Layout Structure

Top to bottom:

1. Header with scope, currency, freshness, and filter access.
2. Holdings/allocation summary with current value and count.
3. Dimension control: holdings, asset class, account, currency, or permitted view.
4. Allocation summary with text/data-table alternative.
5. Holdings list/table with value, weight, performance context, and status.
6. Material concentration/pending/reconciliation notice.
7. Filter/sort controls and clear state.
8. Footer/support entry point.

## 7. Component Placement

- Existing: Page Header, Select/Segmented Control, Table/Data Table, Card, Badge/Status Chip, Search/Filter Controls, Alert/Banner, Loading Skeleton, Error State.
- New: Allocation Summary and Holding Row. These are reusable because holdings must remain consistent across overview, family, and detail contexts.

## 8. Information Priority

1. Scope/freshness.
2. Distribution summary.
3. Holding-level ownership/value/status.
4. Material concentration/pending issues.
5. Filters and secondary actions.

## 9. Interaction Behaviour

- **Tap:** Change dimension, filter, sort, open holding, inspect allocation detail, change scope.
- **Scroll:** List/table scrolls; header retains context.
- **Keyboard:** Table headers, sorting, filters, and rows accessible.
- **Validation:** Scope, filters, and values validated server-side where required.
- **Loading:** Summary and rows may load independently.
- **Disabled:** Unsupported dimensions/filters disabled with explanation.
- **Retry:** Retry affected dataset/region.
- **Timeout:** Preserve last-known list with stale label.

## 10. Screen States

- **Default:** Holdings and allocation available.
- **Loading:** Summary/list loading.
- **Empty:** No holdings in selected scope/dimension; contextual empty state.
- **Success:** Holdings and allocation loaded.
- **Error:** Dataset/aggregation error with retry.
- **Offline:** Cached list read-only and stale.
- **Restricted:** Scope/holding access restricted.
- **Suspended:** Account hold blocks data/actions.

## 11. Validation Rules

- Allocation percentages use a defined denominator and scope.
- Totals reconcile or visibly indicate pending reconciliation.
- A holding’s value and weight include valuation time.
- Filters do not silently change the selected scope.

## 12. Error Behaviour

Distinguish no holdings, no data for filter, stale data, reconciliation issue, and service failure.

## 13. Success Behaviour

Open P03 for holding-level decisions and preserve selected scope/dimension.

## 14. Motion Recommendation

Use restrained filter/sort updates. Do not animate allocation shifts in ways that imply live precision when data is delayed.

## 15. Accessibility

- Table has semantic headers, row labels, and sort announcements.
- Allocation has text/data-table alternative.
- Filter state is announced and clearable.

## 16. Analytics Events

`p02_viewed`, `allocation_dimension_changed`, `holding_opened`, `holdings_filter_applied`, `holdings_sort_changed`, `allocation_detail_opened`, `holdings_stale_shown`, `holdings_empty_shown`, `holdings_retry_selected`.

## 17. Engineering Notes

- Holdings and allocation calculations must come from an authoritative service.
- Asset-class taxonomy and global-asset support must be extensible.
- Reconciliation status must be available at summary and row levels.

## 18. Acceptance Criteria

- User can answer where money is invested.
- Scope, denominator, currency, and freshness are clear.
- Allocation and holdings reconcile or explain why they do not.
- No filter creates false totals.

## 19. UX Writing Guidance

Use ownership and allocation terms consistently. Explain “weight” and “value” when needed.

## 20. Design Notes

P02 is the transparency workspace. It should favor inspectability over decoration and density over unnecessary visual flourish.

---

# P03 – Holding Detail

## 1. Screen Purpose
Provide authoritative detail for one holding, including ownership, value, cost, performance, activity, tax context, status, and permitted next actions.

## 2. User Goal
Understand one investment deeply and decide whether further inspection or action is required.

## 3. Business Goal
Reduce ambiguity at the point of decision and route actions to approved investment, transaction, tax, or support workflows.

## 4. Entry Conditions

- User selects a holding from P01/P02 or opens a permitted deep link.
- Holding ID, scope, and authorization are valid.

## 5. Exit Conditions

- Back returns to the same P01/P02 scope/filter.
- Transactions open P05 filtered to the holding.
- Performance opens P04 filtered to the holding.
- Tax/documents/support use established modules.
- Permitted invest/redeem/switch action opens the appropriate workflow outside this specification.

## 6. Layout Structure

Top to bottom:

1. Header with back, scope, freshness, and help.
2. Holding identity and status.
3. Value/units/cost summary with valuation time and currency.
4. Performance summary with period/methodology.
5. Attention block for pending, restricted, corporate action, tax, or reconciliation state.
6. Allocation/context section.
7. Activity/transactions preview.
8. Permitted actions with clear consequences.
9. Deep links to tax/documents/support.

## 7. Component Placement

- Existing: Page Header, Card, Badge/Status Chip, Button, Link, Alert/Banner, Timeline, Loading Skeleton, Error State.
- New: Holding Summary and Holding Attention Block. They are required to keep value, status, and permitted actions distinct.

## 8. Information Priority

1. Holding identity, scope, status, and freshness.
2. Value, cost, units, and performance.
3. Material attention item.
4. Activity, tax, and permitted actions.

## 9. Interaction Behaviour

- **Tap:** Expand performance basis, open transactions/tax, choose action, change scope, support.
- **Scroll:** Detail scrolls; holding identity/context remains clear.
- **Keyboard:** Tabs/sections/actions accessible.
- **Validation:** Holding authorization, action permission, and data freshness server-side.
- **Loading:** Region-level detail loading.
- **Disabled:** Actions disabled for stale, restricted, pending, or suspended state with explanation.
- **Retry:** Retry affected region.
- **Timeout:** Mark detail unknown/stale and prevent action execution.

## 10. Screen States

- **Default:** Holding detail current.
- **Loading:** Holding/detail region loading.
- **Empty:** Holding no longer exists/current position is zero; show history path and source reference.
- **Success:** Detail loaded.
- **Error:** Holding/detail service error.
- **Offline:** Cached detail marked stale and actions disabled.
- **Restricted:** Holding or action restricted.
- **Suspended:** Account/holding action held.

## 11. Validation Rules

- Holding detail uses a stable holding ID and selected scope.
- Value, units, cost, and return basis must be consistent and labeled.
- Actions require current permission and freshness checks.

## 12. Error Behaviour

Use region-level errors and preserve holding identity when possible. Do not show zero when the value is unavailable.

## 13. Success Behaviour

Show authoritative detail and route actions only after permission/freshness validation.

## 14. Motion Recommendation

Use restrained section expansion and data refresh. Avoid animated gains/losses.

## 15. Accessibility

- Holding name, value, units, currency, period, and status have a coherent accessible reading order.
- Performance detail has text/data-table alternative.
- Action consequences are available before activation.

## 16. Analytics Events

`p03_viewed`, `holding_detail_loaded`, `holding_performance_opened`, `holding_activity_opened`, `holding_tax_opened`, `holding_action_selected`, `holding_restricted_shown`, `holding_stale_shown`, `holding_region_retry_selected`.

## 17. Engineering Notes

- Holding ID, scope, valuation source, and permissions must travel through deep links.
- Actions must hand off to authoritative investment/order workflows without duplicating holding state.
- Tax basis may be incomplete or delayed and must be labeled.

## 18. Acceptance Criteria

- User can understand the selected holding without mixing scope or period.
- Unavailable data is not represented as zero.
- Actions are permission- and freshness-checked.

## 19. UX Writing Guidance

Use precise holding and performance language. Separate “value changed” from “return generated.”

## 20. Design Notes

P03 is where trust is tested at the individual-investment level. Detail must be inspectable before action.

---

# P04 – Performance & Returns

## 1. Screen Purpose
Explain portfolio performance by selected period and calculation basis, including contributions, withdrawals, distributions, and data limitations.

## 2. User Goal
Understand how wealth changed, how much came from market movement versus cash activity, and what the number means.

## 3. Business Goal
Reduce performance misunderstanding, build trust in calculations, and prevent decisions based on ambiguous or misleading return figures.

## 4. Entry Conditions

- User opens performance from P01/P02/P03 or directly from Portfolio.
- Performance service supports selected scope, period, currency, and methodology.

## 5. Exit Conditions

- Back returns to the originating portfolio context.
- Holdings/activity/tax links open authoritative detail.
- Methodology/help opens explanatory content.

## 6. Layout Structure

Top to bottom:

1. Header with scope, period, currency, freshness, and help.
2. Performance summary stating return value, percentage, period, and methodology.
3. Period selector with custom-date constraints where supported.
4. Performance breakdown separating contributions, withdrawals, distributions, fees/taxes where available, and market movement.
5. Chart/data-table alternative with selected period and status.
6. Material explanation or attention block for unusual movement, delayed data, or incomplete basis.
7. Links to holdings, transactions, and tax.

## 7. Component Placement

- Existing: Page Header, Select/Segmented Control, Card, Table/Data Table, Alert/Banner, Tooltip, Loading Skeleton, Error State, Button, Link.
- New: Performance Summary and Performance Breakdown. These are required to prevent a single return number from hiding cash-flow or methodology context.

## 8. Information Priority

1. Period, scope, currency, freshness, and methodology.
2. Return summary.
3. Explanation of drivers.
4. Detail data and links.

## 9. Interaction Behaviour

- **Tap:** Change period, change scope/currency where permitted, expand methodology, open breakdown/detail.
- **Scroll:** Performance content scrolls; period and scope context remain identifiable.
- **Keyboard:** Period controls, tables, and chart alternatives accessible.
- **Validation:** Period, scope, methodology, and data completeness server-authoritative.
- **Loading:** Summary and breakdown may load independently.
- **Disabled:** Unsupported periods/methodologies disabled with explanation.
- **Retry:** Retry failed calculation region.
- **Timeout:** Mark result unknown/stale and preserve prior selected period.

## 10. Screen States

- **Default:** Performance available with period/methodology.
- **Loading:** Calculation/loading.
- **Empty:** No performance basis, no holdings, or insufficient history; explain why.
- **Success:** Return and breakdown available.
- **Error:** Calculation/service error.
- **Offline:** Cached result marked stale; period changes disabled.
- **Restricted:** Performance or scope restricted.
- **Suspended:** Account hold limits detail/actions.

## 11. Validation Rules

- Return always includes period, basis, currency, scope, and freshness.
- Contributions/withdrawals are not presented as investment return.
- Methodology labels are policy/product-defined and consistent across Portfolio, statements, and reports.
- Custom periods cannot exceed available history.

## 12. Error Behaviour

Distinguish insufficient history, incomplete cash-flow data, delayed valuation, calculation error, and unavailable service.

## 13. Success Behaviour

Show the calculation and breakdown with an explanation path. Do not convert performance into a prediction or recommendation.

## 14. Motion Recommendation

Use restrained period transitions. Avoid animated performance counters or chart motion that obscures negative values.

## 15. Accessibility

- Charts have a complete text/data-table alternative.
- Period and methodology changes are announced.
- Return values include sign, currency, period, and basis in accessible labels.

## 16. Analytics Events

`p04_viewed`, `performance_period_changed`, `performance_scope_changed`, `performance_methodology_opened`, `performance_breakdown_opened`, `performance_data_table_opened`, `performance_stale_shown`, `performance_insufficient_history_shown`, `performance_retry_selected`.

## 17. Engineering Notes

- Performance methodology, cash-flow model, currency conversion, and data source are UNKNOWN.
- Calculation service must expose completeness/freshness metadata and reconcile with statements.
- Do not calculate final returns in the client.

## 18. Acceptance Criteria

- User can distinguish market return from contributions/withdrawals.
- Period, scope, basis, currency, and freshness are always available.
- Negative and incomplete performance is clearly represented.
- Chart users have an accessible data alternative.

## 19. UX Writing Guidance

Define calculation terms in plain language and avoid “you earned” when contributions or withdrawals affect the result.

## 20. Design Notes

Performance is a comprehension problem. The right answer is a transparent breakdown, not a more dramatic chart.

---

# P05 – Transactions & Activity

## 1. Screen Purpose
Provide the authoritative activity ledger for orders, settlements, contributions, withdrawals, distributions, fees, transfers, corporate actions, and reversals.

## 2. User Goal
Understand what happened, when, for which holding/account, current status, and what action is required.

## 3. Business Goal
Reduce reconciliation/support load, improve transaction confidence, and provide the factual basis for portfolio and tax understanding.

## 4. Entry Conditions

- User opens activity from Portfolio, Home, a holding, notification, or support deep link.
- Activity service supports selected scope and filters.

## 5. Exit Conditions

- Transaction detail opens authoritative transaction record.
- Holding opens P03.
- Pending/failed/reversed item opens relevant recovery/support.
- Export opens approved report/export workflow.

## 6. Layout Structure

Top to bottom:

1. Header with scope, date/filter, search, export, and help.
2. Critical pending/reconciliation notice.
3. Filter controls: date, type, holding, account, status, currency.
4. Activity ledger/list with date, description, amount, holding, status, and reference.
5. Empty/loading/error state for the selected filters.
6. Pagination or incremental loading.
7. Export/report/support links.

## 7. Component Placement

- Existing: Page Header, Search/Filter Controls, Table/Data Table, Badge/Status Chip, Pagination, Loading Skeleton, Error State, Empty State, Button, Link, Alert/Banner.
- New: Activity Status Row and Reconciliation Notice. These are required to distinguish pending, settled, failed, reversed, and unknown financial events.

## 8. Information Priority

1. Pending/reconciliation/failed notices.
2. Current filter scope and freshness.
3. Activity rows and status.
4. Export/support.

## 9. Interaction Behaviour

- **Tap:** Filter/search, open transaction, clear filters, export, holding/support.
- **Scroll:** Ledger scrolls; filter context remains recoverable.
- **Keyboard:** Table, filter, pagination, and search accessible.
- **Validation:** Filter values, date range, scope, and export permissions server-side.
- **Loading:** Filtered data and export progress shown.
- **Disabled:** Export/action disabled for unavailable data or permission.
- **Retry:** Retry affected request without changing filters.
- **Timeout:** Preserve filter state and show last successful refresh time.

## 10. Screen States

- **Default:** Activity available.
- **Loading:** Ledger/filter/export loading.
- **Empty:** No activity in selected scope/filter; explain distinction between no activity and unavailable data.
- **Success:** Rows and statuses loaded.
- **Error:** Ledger/filter/export failure.
- **Offline:** Cached activity marked stale and read-only.
- **Restricted:** Scope/transaction detail/export restricted.
- **Suspended:** Account hold notice and support route.

## 11. Validation Rules

- Transaction status is authoritative and must distinguish pending, settled, failed, rejected, cancelled, reversed, refunded, and unknown.
- Amount includes currency, date, and status.
- Filters do not silently change scope or date range.
- Export includes the same selected scope/filter and a freshness/reference record.

## 12. Error Behaviour

Use filter-level or row-level errors where possible. A missing transaction must not be shown as a zero-value transaction.

## 13. Success Behaviour

Open the authoritative transaction record and preserve context on return.

## 14. Motion Recommendation

Use restrained row refresh and pagination feedback. Do not animate money movement as entertainment.

## 15. Accessibility

- Data table has headers, row relationships, status, amount, date, and reference labels.
- Filter changes are announced.
- Empty/error states are associated with the result region.

## 16. Analytics Events

`p05_viewed`, `activity_filter_applied`, `activity_search_used`, `activity_transaction_opened`, `activity_pending_opened`, `activity_reconciliation_opened`, `activity_export_started`, `activity_export_completed`, `activity_export_failed`, `activity_empty_shown`, `activity_retry_selected`.

## 17. Engineering Notes

- Ledger source, settlement model, corporate-action events, and export service are UNKNOWN.
- Use immutable references and reconciliation status.
- Pagination/incremental loading must not reorder transactions unexpectedly.

## 18. Acceptance Criteria

- User can answer what changed and what status it has.
- Pending/failed/reversed/unknown are distinct.
- Filters, scope, dates, and export remain consistent.
- Activity is usable under partial failure and offline conditions.

## 19. UX Writing Guidance

Use factual event language and clear status terms. Do not call a pending order “invested” until settlement rules support that state.

## 20. Design Notes

P05 is the audit trail users can understand. Traceability is more important than visual compactness.

---

# P06 – Family/Household Portfolio Scope

## 1. Screen Purpose
Allow authorized users to view a family, household, joint, or multi-account portfolio scope without mixing data or permissions.

## 2. User Goal
Understand which account/scope is selected, see aggregated or individual values accurately, and move to the right detail.

## 3. Business Goal
Support complex NRI wealth structures, improve HNI/RM workflows, and prevent privacy, permission, and aggregation errors.

## 4. Entry Conditions

- User has explicit permission for multiple accounts/household scope.
- Portfolio aggregation service returns scope, coverage, currency, and freshness.

## 5. Exit Conditions

- Scope selection returns to P01/P02/P04/P05 with selected scope preserved.
- Individual account/holding opens the authoritative detail.
- Unauthorized scope routes to support.

## 6. Layout Structure

Top to bottom:

1. Header with scope selector and permission/help access.
2. Scope explanation showing personal, joint, family, or household context.
3. Aggregated financial snapshot with coverage/currency/freshness.
4. Account/household breakdown.
5. Material attention items by scope.
6. Primary CTA: Open selected scope in Portfolio.
7. Secondary actions: Change scope, RM/support, tax/documents.
8. Footer with privacy and permission disclosures.

## 7. Component Placement

- Existing: Page Header, Select, Card, Table/Data Table, Badge/Status Chip, Button, Link, Alert/Banner, Loading Skeleton, Error State.
- New: Scope Context Block and Coverage Metadata. These are required to prevent mixed-scope aggregation and make partial household data visible.

## 8. Information Priority

1. Selected scope and permission.
2. Coverage, currency, freshness.
3. Aggregate and account-level values.
4. Attention/support actions.

## 9. Interaction Behaviour

- **Tap:** Change scope, open account, holding, tax/support, return to Portfolio.
- **Scroll:** Breakdown may scroll while scope context remains visible in reading order.
- **Keyboard:** Scope selector and tables accessible.
- **Validation:** Permission and aggregation server-side.
- **Loading:** Scope and aggregation loading; prevent mixed-data rendering.
- **Disabled:** Scope/action disabled if permission or data coverage unresolved.
- **Retry:** Retry aggregation/coverage region.
- **Timeout:** Preserve selected scope but mark data stale/unknown.

## 10. Screen States

- **Default:** Authorized scope and data available.
- **Loading:** Scope/aggregation loading.
- **Empty:** Scope exists but has no holdings; use scoped empty state.
- **Success:** Scope summary and breakdown loaded.
- **Error:** Aggregation/permission/service error.
- **Offline:** Cached scope marked stale; changing scope/actions disabled.
- **Restricted:** Scope not permitted or partially hidden.
- **Suspended:** One or more accounts held; explain coverage and support route.

## 11. Validation Rules

- Every value is tagged with scope, account coverage, currency, and freshness.
- Aggregates are authoritative; client cannot sum independently.
- Scope changes invalidate dependent filters and deep links.

## 12. Error Behaviour

Distinguish permission denial, partial coverage, stale data, no holdings, and service failure. Never combine incomplete accounts into a seemingly complete total.

## 13. Success Behaviour

Open the selected scope with visible context preserved.

## 14. Motion Recommendation

Use restrained scope-change feedback. Do not animate totals across scopes without labeling the transition.

## 15. Accessibility

- Scope, coverage, currency, and account names are accessible labels.
- Scope change is announced before values update.
- Tables expose row scope and status.

## 16. Analytics Events

`p06_viewed`, `portfolio_scope_opened`, `portfolio_scope_changed`, `portfolio_scope_restricted`, `portfolio_scope_empty`, `portfolio_coverage_opened`, `family_account_opened`, `family_support_selected`.

## 17. Engineering Notes

- Permission model, household aggregation, currency conversion, and account coverage are UNKNOWN.
- Never cache data across scopes without explicit scope keys.
- Household data requires access audit and appropriate privacy controls.

## 18. Acceptance Criteria

- User always knows the selected scope and coverage.
- No mixed-scope total is displayed.
- Permission, partial coverage, offline, and suspension states are explicit.

## 19. UX Writing Guidance

Use exact scope names and explain who is included. Avoid “family wealth” when the view is incomplete or permission-limited.

## 20. Design Notes

Family scope is a data-governance problem before it is a layout problem. Scope clarity must be the first design decision.

---

# A. Portfolio Trust Signals

- Scope, account coverage, currency, valuation time, period, and freshness beside every material summary.
- Source/detail links from every summary number.
- Methodology disclosure for performance and allocation.
- Reconciliation and pending status visible, not hidden behind refresh.
- Explicit distinction between invested value, cash, pending settlement, and projected value.
- Negative performance shown plainly with context.
- Export/reference access for records that require authoritative documentation.
- Permission and family-scope indicators.
- Clear ownership/status for support or RM issues.
- “No action required” as a valid, visible state.
- Stable, text-based status labels independent of colour.

Avoid:

- Unexplained precision.
- Animated numbers that obscure movement.
- Generic green success for positive returns without period/methodology.
- Hidden fees, tax basis, or pending activity.
- Mixed-scope aggregation.
- “Best” or “recommended” labels without approved suitability logic.

---

# B. Portfolio UX Patterns

| Pattern | Purpose | Reuse rule |
|---|---|---|
| Financial Snapshot | Communicates value with scope, currency, period, freshness | Reuse in Home and Portfolio; Portfolio owns detail |
| Performance Summary | Separates return, period, methodology, and freshness | Use across overview, holding, and performance screens |
| Allocation Summary | Shows distribution with denominator and detail path | Must reconcile to holdings |
| Holding Row | Shows value, weight, status, and detail destination | Reuse across holdings, overview, and family scope |
| Freshness Metadata | Makes current/delayed/stale/partial state visible | Required for every financial region |
| Attention Block | Prioritizes material risk, pending, tax, or reconciliation issue | Must be rule/materiality driven |
| Scope Context Block | Prevents personal/family/account mixing | Required whenever scope can change |
| Activity Status Row | Makes pending/settled/failed/reversed/unknown explicit | Reuse in activity and holding detail |
| Reconciliation Notice | Explains unresolved data differences | Never hide a material reconciliation issue |
| Empty State | Explains empty, unavailable, or zero state | Must state what not to assume |
| Data Table Alternative | Provides accessible and inspectable data | Required for charts/complex summaries |

---

# C. Financial Card Inventory

| Card | Purpose | Required metadata | Primary destination |
|---|---|---|---|
| Total Value Card | Summarize portfolio value | Scope, currency, valuation time, freshness | P02/P06 |
| Performance Card | Summarize return | Period, basis, methodology, freshness | P04 |
| Allocation Card | Summarize distribution | Dimension, denominator, scope, freshness | P02 |
| Top Holdings Card | Surface largest/material holdings | Value, weight, period, status | P03 |
| Attention Card | Surface material issue | Reason, severity category, next action, timestamp | Relevant detail |
| Pending Activity Card | Surface unsettled or unresolved events | Status, date, amount, reference | P05 |
| Cash/Liquidity Card | Show available/pending cash context | Currency, availability, freshness | P05/Invest |
| Tax Context Card | Surface tax basis/report action | Tax period, status, source | Tax |
| Scope Summary Card | Explain family/account context | Included accounts, coverage, currency | P06 |
| Empty Portfolio Card | Explain no current holdings | Reason, readiness/data state, next action | Invest/Activation |
| Data Quality Card | Explain stale/partial/reconciliation state | Affected region, last known update, next step | Relevant detail/support |

---

# D. Portfolio Component Inventory

| Component | Purpose | Dependencies | Variants | States | Existing/New | Reusability |
|---|---|---|---|---|---|---|
| Financial Snapshot | Value/wealth summary | Valuation service, scope, currency | Personal, family, account, cash | Loading, current, delayed, partial, stale, unavailable | New portfolio component | 5/5 |
| Performance Summary | Return summary | Performance service, period, methodology | Overview, holding, full performance | Loading, positive, negative, insufficient history, stale, error | New | 5/5 |
| Performance Breakdown | Explains return drivers | Cash-flow/performance service | Compact, detailed | Current, incomplete, pending reconciliation, error | New | 4/5 |
| Allocation Summary | Distribution by dimension | Holdings/aggregation service | Asset class, holding, currency, account | Current, delayed, partial, empty, error | New | 5/5 |
| Holding Row | Ownership/value/status summary | Holdings service | Compact, table, family scope | Current, pending, restricted, stale, unavailable | New | 5/5 |
| Holding Summary | Detail header and identity | Holding service | Standard, restricted, closed | Loading, current, pending, closed, error | New | 4/5 |
| Attention Block | Material issue and action | Rules/materiality service | Risk, pending, tax, reconciliation, restriction | Active, acknowledged, resolved, unavailable | New | 5/5 |
| Freshness Metadata | Data recency/provenance | Source metadata | Current, delayed, stale, partial, unknown | Visible, expanded | New | 5/5 |
| Scope Context Block | Prevents scope confusion | Permission/aggregation service | Personal, joint, family, household | Selected, loading, restricted, partial | New | 5/5 |
| Activity Status Row | Transaction state | Ledger/settlement service | Pending, settled, failed, reversed, unknown | All ledger states | New | 5/5 |
| Reconciliation Notice | Explains unresolved difference | Reconciliation service | Portfolio, bank, exchange, statement | Pending, resolved, escalated | New | 4/5 |
| Empty Portfolio State | Contextual no-holdings explanation | Holdings/activation service | Not activated, ready/no holdings, data missing | Empty, loading, restricted, error | Existing pattern extended | 5/5 |
| Data Table Alternative | Accessible/detail representation | Same source as chart/card | Allocation, performance, activity | Loading, empty, error, stale | Existing system pattern | 5/5 |
| Portfolio Filter Bar | Filter/scope/time controls | Query/filter service | Holdings, activity, performance | Default, applied, invalid, loading | Existing controls extended | 4/5 |
| Portfolio Status Timeline | Shows operational progression | Activation/transaction service | Activation, settlement, corporate action | Pending, delayed, completed, failed | Existing Timeline extended | 4/5 |
| Corporate Action Row | Future event representation | Corporate-action service | Dividend, split, merger, election | Announced, action required, pending, completed | New future-ready | 4/5 |
| AI Explanation Slot | Optional plain-language explanation | Approved insight service | Performance, allocation, activity | Available, unavailable, disclaimer | Future/New | 3/5 |

## Component rules

- Components must receive scope, period, currency, freshness, and status as explicit data, not hidden context.
- Components must support content reflow and text alternatives.
- Financial components must not own calculations.
- New components require design-system documentation, analytics schema, accessibility behavior, and error states before high-fidelity use.

---

# E. Portfolio Information Priority Matrix

| Region | Above the fold | Mid section | Deep content | Justification |
|---|---|---|---|---|
| Scope/freshness | Always | Expanded metadata | Source details | Prevents incorrect interpretation |
| Critical notice | Always when applicable | Full explanation | Audit/support | Highest impact |
| Total value | Yes | Value breakdown | Holdings/account detail | Answers “how much” quickly |
| Performance | Yes summary | Breakdown | P04 methodology/detail | Answers “how performing” responsibly |
| Attention | Yes when material | Resolution detail | Source workflow | Answers “what requires attention” |
| Allocation | Summary | Full allocation | Holding/account/currency dimensions | Answers “where invested” |
| Holdings | Top/material rows | Full list | P03 detail | Supports inspectability |
| Activity | Pending/recent preview | Full ledger | Transaction detail/export | Answers “what changed” |
| Tax/documents | Due/blocking action | Context | Tax/report detail | Avoids compliance surprise |
| Education | Only when next safe step | Relevant modules | Full content | Prevents cognitive overload |

### Above-the-fold rules

- Show scope, total value, freshness, period, and material notice before optional content.
- Show one primary action based on materiality or no action when nothing requires attention.
- Do not show every metric above the fold.

### Mid-section rules

- Explain the drivers of value/performance and the distribution of holdings.
- Show pending activity, tax/document actions, and material concentration.

### Deep-content rules

- Provide methodology, raw holdings, transaction ledger, scope/account detail, tax basis, and exports.
- Deep content must be reachable from every summary that could create a question.

### Expandable rules

- Expand methodology, freshness, calculation definitions, and non-critical education.
- Do not collapse away a material loss, restriction, pending financial action, or reconciliation issue.

---

# F. Empty State Strategy

| State | User should understand | User should do | User should never assume |
|---|---|---|---|
| No portfolio after activation | Account is ready but no holdings exist | Explore investments or learn | Account is broken |
| No portfolio before activation | Investing is not enabled yet | Continue activation | They can transact |
| Single investment | Portfolio is valid but concentrated | Inspect holding and learn allocation | Diversification is already achieved |
| No data due to delay | Data has not refreshed | Wait/refresh/view last update | Value is zero |
| No filtered holdings | Filter returned no rows | Clear/change filters | Holdings were deleted |
| No activity in period | No activity matches the period | Change period or continue | The account has no history |
| Family scope empty | Selected scope has no current holdings or coverage | Switch scope/contact support | Household total is zero across all accounts |
| Offline | Data is last known, not current | Reconnect and retry | A transaction can be safely started |
| Restricted | Policy/permission limits view/action | Review reason/support | Repeated taps will unlock it |
| Suspended | Account/action is held | Contact owner/support | Portfolio data or action is normal |

---

# G. Future Scalability

## Additional asset classes

Use extensible asset, holding, valuation, event, and taxonomy entities. New assets must provide value, cost, performance, liquidity, tax, status, and detail contracts rather than bespoke cards.

## Global investments

Support multiple currencies, market calendars, time zones, settlement conventions, withholding/tax context, and source freshness. Currency conversion must be explicit and versioned.

## Multiple advisors

Represent advisor/RM ownership as a permissioned service relationship, not hard-coded content. Home/Portfolio can show the correct owner without changing the portfolio data model.

## Family portfolios

Use scope-aware aggregation with explicit account coverage and permissions. Never create a family total by client-side addition.

## AI insights

Introduce AI only as an explanation/retrieval layer over authoritative data. AI must cite source, period, scope, freshness, and methodology; it must not invent values, provide unapproved advice, or override suitability/compliance rules.

## Tax overlays

Add tax basis, capital gains, withholding, and report status as linked domains. Keep tax calculations authoritative and separate from the visual portfolio summary.

## Corporate actions

Add event rows and attention blocks for dividends, splits, mergers, elections, and other actions. Preserve action deadline, eligibility, status, and source.

## International expansion

Separate jurisdiction, currency, market, tax, regulatory, and account-type policy services from the Portfolio UI. Localize content without changing the core financial entity model.

## Scalability constraints

- Do not let card count grow without a materiality/ranking model.
- Do not duplicate financial calculations in Home, Portfolio, or AI surfaces.
- Do not mix scopes, currencies, periods, or sources without explicit labels.
- Do not create separate portfolio shells for each segment.
- Do not allow future modules to bypass the common freshness, error, accessibility, and audit contracts.

---

# Module-Level Handoff Rules

## Cross-module consistency

- Home summarizes Portfolio; Portfolio owns financial detail.
- Activation readiness is consumed from the approved Activation module and is not recalculated in Portfolio.
- Tax, documents, investment, support, and account workflows remain authoritative in their own modules.
- Portfolio deep links preserve scope, holding, period, filter, and return context.
- Pending, failed, delayed, stale, restricted, suspended, and unknown language is consistent across Home, Activation, Portfolio, and Support.

## Required QA coverage

- No portfolio, single holding, diversified, multi-asset, family, HNI, market open/closed, delayed, offline, loading, empty, error, restricted, suspended, pending, reversed, and reconciliation states.
- Scope changes, currency changes, period changes, filters, sorting, deep links, exports, and return navigation.
- Negative performance, contributions/withdrawals, fees/tax basis, cash, pending orders, corporate actions, and stale data.
- Partial backend failures and region-level recovery.
- Screen-reader, keyboard, reduced-motion, chart alternative, table navigation, and dynamic status announcements.
- No client-side calculation drift between Home and Portfolio.

## Required decisions before high-fidelity design

- Valuation/performance methodologies and data sources: UNKNOWN.
- Freshness SLAs and reconciliation rules: UNKNOWN.
- Materiality/risk/concentration ranking: UNKNOWN.
- Household permissions and aggregation: UNKNOWN.
- Global currency/market/tax model: UNKNOWN.
- Export and statement authority: UNKNOWN.

## Wireframe Readiness Checklist

- [x] Portfolio is explicitly separated from Home.
- [x] Portfolio is defined as the authoritative financial workspace.
- [x] Value, performance, allocation, holdings, activity, and attention questions are covered.
- [x] Portfolio state precedence is defined.
- [x] Six screen specifications use the approved 20-section structure.
- [x] Trust, freshness, risk, performance, empty-state, accessibility, and scope principles are specified.
- [x] Component and financial card inventories are included.
- [x] Future asset, family, advisor, AI, tax, corporate-action, and international expansion are addressed.
- [ ] Methodology, freshness SLAs, aggregation permissions, and materiality rules remain to be confirmed.

**Handoff decision:** Ready for low-fidelity wireframe implementation. High-fidelity design and implementation sign-off remain conditional on resolving the explicit data, methodology, permission, and operational unknowns above.
