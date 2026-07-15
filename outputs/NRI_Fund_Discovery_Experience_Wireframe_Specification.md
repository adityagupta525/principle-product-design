# NRI WealthTech Platform
## Fund Discovery Experience

**Document type:** Product experience and wireframe specification
**Role:** Chief Product Architect, Principal Product Designer, UX Research Lead, WealthTech Domain Expert, Design System Architect, Product Strategy Lead
**Status:** Extension of the locked platform modules and Cross-Module Lifecycle & Entitlement Contract
**Scope:** Discovery, search, evaluation, comparison, saving, watchlisting, and recommendation review for supported investment products
**Constraint:** No visual UI, colours, typography, pixel measurements, or final screen styling are defined here.

## 0. Contract Alignment

This module consumes and does not redefine:

- Authentication & Identity
- Onboarding & Regulatory
- Investment Activation
- Home Experience
- Portfolio Experience
- Cross-Module Lifecycle & Entitlement Contract

Discovery MUST consume canonical `IdentityState`, `AuthenticationState`, `ComplianceState`, `ActivationState`, `InvestorEligibilityState`, `PortfolioDataState`, `ConsentState`, `DocumentState`, and entitlement results. It MUST NOT create a second eligibility, risk, portfolio, tax, or recommendation truth.

### Core product decision

Fund Discovery is a decision-support workspace, not a catalogue and not an advice engine. It helps an investor move from broad intent to a defensible shortlist while making eligibility, risk, liquidity, tax context, data freshness, and limitations visible before any investment action.

### Discovery does not do

- It does not approve KYC, activation, eligibility, or tax treatment.
- It does not guarantee returns, tax savings, liquidity, or suitability.
- It does not hide unavailable products to make the catalogue appear simpler.
- It does not permit money movement; order-entry and payment are separate modules.
- It does not use AI to create an unexplainable ranked list.
- It does not treat ratings, popularity, or past performance as a recommendation.

## 1. Discovery Philosophy

### 1.1 Decision confidence over catalogue volume

The product should help users answer: “Is this opportunity relevant, eligible, understandable, and appropriate for further consideration?” Showing more schemes is not inherently better if the user cannot distinguish a suitable choice from a merely popular one.

### 1.2 Eligibility before persuasion

Country, account type, investor status, product availability, and material restriction context must be resolved before the experience presents an action-oriented shortlist. A product may remain discoverable while being restricted from purchase, but the restriction must be explicit.

### 1.3 Explain the trade-off, not only the score

Every meaningful comparison should expose risk, cost, volatility, liquidity, tax context, portfolio overlap, and data quality. A single “best” label is insufficient for financial decision-making.

### 1.4 Progressive disclosure without hidden material facts

The first layer supports orientation. The second explains why a fund appears. The third exposes holdings, risk, performance method, fees, tax, eligibility, and source data. Progressive disclosure may reduce density, never material truth.

### 1.5 Browse independently, act responsibly

Users may explore permitted fund information while onboarding or activation is pending, consistent with the locked Activation contract. Investment actions remain gated by entitlements.

### 1.6 Calm negative information

Loss, underperformance, high concentration, low liquidity, incomplete data, restrictions, and stale values are first-class information. The product must not use positive language, badges, or ranking to soften material risk.

## 2. Business Objectives

- Increase qualified progression from discovery to a considered shortlist and eligible investment action.
- Reduce unsuitable product attempts caused by hidden country, account, risk, or operational restrictions.
- Improve confidence and reduce support contacts about eligibility, fund comparison, and performance interpretation.
- Increase adoption of SIP and long-term investing where the investor is eligible and the product is appropriate.
- Create a reusable product-discovery foundation for future asset classes without assuming mutual-fund semantics are universal.
- Build a trustworthy recommendation surface that can support assisted DIY and future advisory boundaries.
- Improve data quality feedback to Product, Operations, Compliance, and AMCs.

## 3. User Objectives

- Find funds relevant to a goal, time horizon, risk tolerance, account type, country, and tax context.
- Know before shortlisting whether a fund can be purchased from the investor’s context.
- Understand what the fund owns, how it has behaved, how risky it is, and what costs or tax considerations apply.
- Compare a small number of meaningful alternatives without losing scope or currency context.
- Save a fund or search for later without being pushed to invest immediately.
- Understand why a personalized or AI-assisted result appeared and how to correct the profile behind it.
- Know when information is estimated, delayed, incomplete, or not applicable.

## 4. Success Metrics

### User outcomes

- Percentage of users who can correctly identify eligibility, risk level, performance period, and data freshness in research.
- Shortlist completion rate with no increase in unsuitable or restricted order attempts.
- Search-to-detail comprehension and detail-to-compare usefulness.
- Reduction in support contacts about fund availability, country restrictions, and return interpretation.
- Save/watchlist return rate and decision completion rate without coercive prompts.

### Business outcomes

- Qualified discovery-to-first-investment conversion by country, risk segment, account type, and activation state.
- SIP adoption among eligible, activated users.
- AUM and repeat-investment contribution from discovery-assisted cohorts.
- Recommendation acceptance, correction, and abandonment rates.
- Restricted-result accuracy, false-allow rate, false-block rate, and policy-data freshness.

### Safety outcomes

- Unsuitable recommendation rate.
- Restricted-product attempt rate caused by discovery error.
- Material data discrepancy rate between discovery, fund detail, order confirmation, and Portfolio.
- Tax/eligibility explanation complaint rate.
- AI unsafe-answer, unsupported-claim, and human-override rates.

## 5. Decision-Making Principles

1. Start with the investor’s intent, not the platform’s inventory.
2. Separate eligibility, suitability, and popularity.
3. Show absolute values with period, currency, source, and finality.
4. Distinguish past performance from expected outcome.
5. Prefer a small explainable shortlist to a large opaque ranking.
6. Let the user compare like with like; prevent misleading comparison dimensions.
7. Make “not enough information” a safe result rather than filling uncertainty with generic recommendations.
8. Require explicit acknowledgement for material risk, country, tax, or liquidity limitations before an action handoff.
9. Preserve user control over filters, ranking, saved searches, and personalization inputs.
10. Keep discovery useful even when activation or transaction entitlement is unavailable.

## 6. Trust Principles

- Every fund record shows source, update time, applicable period, and data quality state.
- Eligibility comes from the canonical policy service, not from a client-side filter.
- Restrictions show safe reason categories and a next action without revealing sensitive compliance logic.
- Ratings and labels identify their methodology and date.
- Past performance is not framed as a forecast or guarantee.
- Return calculations identify period, method, benchmark where relevant, and whether values are current or estimated.
- Tax content distinguishes education, estimate, source-confirmed value, and professional advice.
- AI recommendations disclose inputs, rationale, exclusions, confidence limitations, and a correction path.
- A saved fund retains the version/context needed to explain why it was saved, while current eligibility is re-evaluated at action time.
- Fund detail must remain useful even when the user cannot invest immediately.

## 7. Personalization Strategy

Personalization changes relevance and explanation, not truth, permissions, or regulatory boundaries.

### Personalization tiers

1. **Contextual:** Country, account type, activation state, preferred currency, and language.
2. **Declared:** Risk profile, investment experience, goals, horizon, income need, and preferences.
3. **Observed:** Search, detail views, saves, comparisons, and dismissed recommendations, used only under approved consent and privacy policy.
4. **Portfolio-aware:** Existing holdings, overlap, concentration, cash needs, and asset allocation, using authorized and fresh portfolio data.
5. **AI-assisted:** Explanation or shortlist synthesis grounded in approved data and policy; never autonomous execution.

### Personalization guardrails

- No recommendation without required profile and consent inputs.
- No inference of sensitive traits from browsing behavior without approved legal basis.
- Country and product restrictions always override relevance.
- A user can inspect, correct, reset, or disable non-required personalization.
- Recommendations are versioned and reproducible from input snapshot, policy version, and model/version.

## 8. Search Strategy

Search supports intent discovery, not policy bypass. It searches approved product metadata and content, not restricted internal reason codes or raw customer data.

### Search modes

- Fund name, AMC, scheme code, category, keyword, goal, and common intent terms.
- Natural-language intent may be supported only when the resulting query interpretation is visible and editable.
- Search results remain eligible-filtered but may expose restricted products with a safe restriction status where disclosure is appropriate.

### Search principles

- Search terms are never treated as risk profile or tax advice.
- Exact scheme code and name matches take priority over popularity.
- Spelling correction must not silently change the product intent.
- Search history is private, deletable, and never used as a recommendation signal without consent.
- No-result states offer query correction, broadening, or support, not fabricated alternatives.

## 9. Recommendation Strategy

### Recommendation classes

- **Eligible catalogue result:** Returned from user query and policy filters.
- **Educational collection:** Curated category or concept, not individualized advice.
- **Contextual shortlist:** Based on declared user inputs and policy rules.
- **Portfolio-aware insight:** Based on authorized holdings and data quality thresholds.
- **AI-assisted explanation:** Natural-language synthesis of approved evidence.

### Recommendation requirements

Every personalized result MUST include:

- Why it was shown.
- Inputs used and their last-updated time.
- Eligibility and restriction status.
- Material risks and trade-offs.
- Data source and freshness.
- Whether the result is educational, suitability-oriented, or advice-regulated.
- How to correct the profile or remove the input.

### Recommendation exclusions

Do not recommend products solely because they are trending, top-rated, sponsored, high-margin, new, or frequently viewed. Commercial ranking influence must be disclosed and must not override suitability or eligibility.

## 10. Information Hierarchy

1. Security, account hold, activation/compliance action, or legally required notice.
2. Query context, country/account context, and eligibility boundary.
3. User intent and decision objective.
4. Fund identity and whether it can be considered or purchased.
5. Risk, liquidity, costs, tax context, and material restrictions.
6. Performance and portfolio fit with period and calculation method.
7. Comparison, save, watchlist, and next safe action.
8. Methodology, disclosures, source detail, and educational content.

## 11. Empty-State Philosophy

Every empty state explains:

- What is empty.
- Why it is empty.
- What the user can do next.
- What the user must not assume.

Empty discovery must never imply that no funds exist when the real reason is country restriction, missing profile, stale policy, offline mode, or unavailable source data.

## 12. Accessibility Strategy

- Meet the platform’s approved WCAG target and test contract.
- Provide semantic headings, labelled filters, keyboard-complete search, predictable focus, and live-region updates for results/status.
- Provide accessible alternatives for charts, risk indicators, ratings, comparison tables, and performance data.
- Announce negative returns, zero values, estimates, periods, currencies, and stale data clearly.
- Ensure long fund names, legal disclosures, translated copy, and large values reflow at zoom.
- Do not use colour, icon, position, or badge shape as the sole meaning of risk or eligibility.
- Support reduced motion and preserve filter/search state for assistive technology users.

## 13. Future Scalability

The discovery model separates shared concepts from mutual-fund-specific extensions:

- **Shared:** Instrument, issuer, eligibility, risk, liquidity, price/valuation, performance, costs, tax context, ownership, recommendation evidence, and order capability.
- **Mutual-fund extension:** AMC, scheme, plan, option, NAV, folio, RTA, IDCW, SIP, STP, SWP, and scheme-specific tax events.
- **Future products:** ETFs, bonds, PMS, AIF, global investments, NPS, and insurance-linked products use product-specific capability contracts rather than being forced into scheme cards.

## 14. Discovery State Catalogue

### Entry and personalization states

`FIRST_VISIT`, `RETURNING_USER`, `PROFILE_INCOMPLETE`, `ACTIVATION_PENDING`, `ACTIVATION_RESTRICTED`, `INVESTOR_READY`, `PERSONALIZED_READY`, `PERSONALIZATION_UNAVAILABLE`.

### Collection states

`NO_RECOMMENDATIONS`, `TRENDING_FUNDS`, `TOP_RATED`, `TAX_SAVING_COLLECTION`, `SIP_FRIENDLY_COLLECTION`, `RECENTLY_VIEWED`, `RECENTLY_INVESTED`, `SAVED_FUNDS`, `WATCHLIST`, `COMPARE_QUEUE`.

### Query states

`SEARCH_IDLE`, `SEARCHING`, `SEARCH_RESULTS`, `NO_SEARCH_RESULTS`, `FILTERED_RESULTS`, `SAVED_FILTER_RESULTS`, `SEARCH_POLICY_RESTRICTED`.

### Recommendation states

`AI_RECOMMENDATIONS`, `AI_EXPLANATION_REQUIRED`, `AI_INPUTS_STALE`, `AI_NOT_ENOUGH_INFORMATION`, `AI_UNAVAILABLE`, `HUMAN_REVIEW_RECOMMENDED`.

### Data and service states

`LOADING`, `PARTIAL`, `STALE`, `OFFLINE`, `ERROR`, `SOURCE_UNAVAILABLE`, `POLICY_STALE`, `RESTRICTED`, `COUNTRY_RESTRICTED`, `ACCOUNT_RESTRICTED`, `RISK_RESTRICTED`, `SUSPENDED`.

### State precedence inside Discovery

Security, legal scope, consent, compliance, country/policy, eligibility/risk, activation, data quality, then personalization and ranking. Discovery collection state never overrides a restriction or stale-policy state.

## 15. Experience Architecture

### Necessary screens

| ID | Screen | Responsibility |
|---|---|---|
| D01 | Discovery Home | Orient, personalize safely, and expose curated paths and current context |
| D02 | Search & Results | Search, filter, sort, save query, and browse result sets |
| D03 | Fund Details | Provide authoritative evaluation context for one fund |
| D04 | Compare Funds | Compare a small, coherent set of funds using consistent metrics |
| D05 | Saved & Watchlist | Revisit saved funds, saved filters, and watched changes |
| D06 | Recommendation Review | Explain personalized/AI-assisted shortlist rationale and let users correct inputs |

### Why six screens

- D01 handles adaptive orientation without duplicating lifecycle screens.
- D02 separates query manipulation from orientation.
- D03 is the authoritative single-product decision surface.
- D04 is a distinct cognitive task requiring stable comparison semantics.
- D05 supports continuity and reduces repeat search effort.
- D06 is separate because personalization requires additional consent, explanation, and correction behavior.

# D01 - Discovery Home

## 1. Screen Purpose

Orient the user to relevant discovery paths while exposing country, account, activation, and personalization context.

## 2. User Goal

Understand what can be explored now and choose a meaningful route without being pushed into an unsuitable product.

## 3. Business Goal

Create a trusted entry point into qualified discovery and reduce abandonment caused by unclear eligibility or activation status.

## 4. Entry Conditions

Authenticated session or approved public discovery context; country/account context may be known, unknown, pending, restricted, or stale.

## 5. Exit Conditions

Search/results, fund details, compare, saved/watchlist, recommendation review, activation, support, or safe return to Home.

## 6. Layout Structure

Top to bottom: context/status notice; search entry; primary intent/goal entry; personalized or educational collection; recently viewed/saved/watchlist where available; safe explanation for unavailable content; help and methodology access.

## 7. Component Placement

Existing: App Shell, Page Header, Search Field, Card, Button, Link, Alert/Banner, Status Badge, Loading Skeleton, Empty State, Error State, Table/List pattern.

New: Discovery Context Bar, Collection Rail, Eligibility Summary, Recommendation Explanation Preview, Discovery State Panel. These are required to express context and state without duplicating other modules.

## 8. Information Priority

Security/compliance/activation action comes first; then search and intent; then eligibility-aware collections; then history and education. Promotional content cannot appear above a material restriction or loss disclosure.

## 9. Interaction Behaviour

Tap/click opens search, intent, collection, detail, save, compare, or support. Scroll preserves collection context. Loading is skeletonized by section. Offline shows cached, timestamped content and disables actions requiring current policy. Restricted collections explain safe reason and alternative.

## 10. Screen States

Default, first visit, returning user, profile incomplete, activation pending, investor ready, no recommendations, trending, top-rated, tax-saving, SIP-friendly, recently viewed, recently invested, saved/watchlist, loading, partial, offline, error, restricted, country-restricted, suspended, and personalized-ready.

## 11. Validation Rules

Collections use current product master and policy version. Personalized content requires valid inputs and consent. Recently invested requires authorized portfolio/order data. No collection may imply suitability or eligibility without the canonical service.

## 12. Error Behaviour

Localize collection failure; preserve unaffected sections. Explain stale policy or source outage without presenting old eligibility as current. Provide retry, search, saved content, and support paths.

## 13. Success Behaviour

Transition to the chosen context with query, filter, scope, and correlation state preserved. Do not show a transient success message for a view-only action.

## 14. Motion Recommendation

Use restrained section loading and state transitions. Avoid auto-rotating recommendations, celebratory investment motion, or motion that changes ranking while the user is reading.

## 15. Accessibility

Semantic heading order; collection labels announce count and state; status updates use live regions; cards have one coherent accessible name; all content is keyboard reachable and reflows.

## 16. Analytics Events

`d01_viewed`, `discovery_context_viewed`, `discovery_search_started`, `collection_opened`, `collection_item_opened`, `personalization_explanation_opened`, `discovery_restriction_viewed`, `d01_retry_selected`, `d01_support_selected`.

## 17. Engineering Notes

Home is a read projection. It consumes lifecycle, entitlements, product master, policy, portfolio, and recommendation services. Each collection carries source, freshness, policy version, and eligibility scope.

## 18. Acceptance Criteria

- A user always knows what can be explored and what cannot.
- Restricted or stale collections never appear actionable without clear status.
- Home never calculates fund performance or eligibility independently.
- First visit and returning-user behavior are state variants, not duplicate screens.
- Every unresolved state has a search, safe return, retry, or support path.

## 19. UX Writing Guidance

Use invitational language, not urgency. Say “Explore eligible funds” only when eligibility is known; otherwise say “Explore funds and check availability.” Explain activation and profile dependencies plainly.

## 20. Design Notes

Keep the first decision small. The user should be able to start with a question, goal, or fund name rather than understand the entire catalogue.

# D02 - Search & Results

## 1. Screen Purpose

Enable precise, explainable discovery through search, filters, sorting, saved filters, and result-state handling.

## 2. User Goal

Find and narrow funds using terms and criteria they understand, while seeing restrictions and data quality before opening details.

## 3. Business Goal

Improve qualified discovery conversion and reduce irrelevant or ineligible result attempts.

## 4. Entry Conditions

From D01, deep link, recent search, saved filter, category, or notification. Query may be blank, typed, voice-transcribed if enabled, or malformed.

## 5. Exit Conditions

Fund details, compare queue, save/watchlist, updated query, saved filter, recommendation review, or support.

## 6. Layout Structure

Top to bottom: query field; recent searches and suggestions; scope/context; active filters; sort; result count and freshness; result cards/table; no-result, restricted, loading, or error panel; methodology and help.

## 7. Component Placement

Existing: Search Field, Select, Checkbox, Radio, Chip, Button, Card, Table, Loading Skeleton, Empty State, Error State, Pagination/Load More.

New: Filter Drawer/Panel, Query Suggestion Group, Result Eligibility Badge, Saved Filter Control, Result Quality Notice, Compare Selection Control.

## 8. Information Priority

Query and scope, active filters, result count/freshness, fund identity and eligibility, risk/liquidity/cost summary, then secondary metrics. The filter state must remain visible and reversible.

## 9. Interaction Behaviour

Search submits on explicit action or approved debounce; suggestions are selectable and editable. Filters can be applied, cleared individually, or reset. Sort changes do not silently change eligibility. Compare selection preserves context. Saved search requires authentication and consent where behavior is used for personalization.

## 10. Screen States

Search idle, searching, results, filtered results, saved-filter results, no results, no eligible results, restricted results, policy stale, loading, partial, offline, source error, and suspended catalogue.

## 11. Validation Rules

Filter values come from current product/policy taxonomies. Numeric ranges must be valid and use explicit units. Incompatible filters are explained, not silently discarded. Results are evaluated for the current actor/account context.

## 12. Error Behaviour

Differentiate invalid query, no match, no eligible match, stale policy, source unavailable, and network error. Preserve the query and filters for retry. Never suggest a restricted alternative as eligible.

## 13. Success Behaviour

Show result count, scope, freshness, and active filters. When a saved filter succeeds, confirm only that the filter was saved; recommendations remain separate.

## 14. Motion Recommendation

Use stable result updates and visible progress for slow filters. Avoid reordering without an announced cause. Respect reduced motion and preserve focus after results refresh.

## 15. Accessibility

Search supports keyboard submit, labelled filter controls, current filter announcements, result count updates, table alternative, focus restoration, and readable error associations.

## 16. Analytics Events

`d02_viewed`, `search_submitted`, `search_suggestion_selected`, `recent_search_opened`, `filter_opened`, `filter_applied`, `filter_removed`, `sort_changed`, `result_viewed`, `no_results_shown`, `restricted_result_viewed`, `saved_filter_created`, `compare_added`.

## 17. Engineering Notes

Search ranking, eligibility, and product master are separate services. Search responses must return query interpretation, ranking reason, source freshness, policy version, restriction category, and pagination cursor.

## 18. Acceptance Criteria

- Search cannot bypass country/account/risk restrictions.
- No-result reasons are distinct and actionable.
- Filter and sort state is reproducible from URL/deep-link state where supported.
- Saved filters do not become implicit recommendations.
- Result cards never present stale eligibility as current.

## 19. UX Writing Guidance

Use exact query language and plain filter labels. Explain “No eligible matches” differently from “No matches found.” Avoid technical ranking language unless it helps the decision.

## 20. Design Notes

The workspace should support both a quick browse and a careful research mode. Do not force every user through a questionnaire before allowing search.

# D03 - Fund Details

## 1. Screen Purpose

Provide the authoritative evaluation context for one fund before the user adds it to compare, saves it, or hands off to investment.

## 2. User Goal

Understand what the fund is, who it may suit, what it costs, how risky it is, how it has performed, and whether the user can act.

## 3. Business Goal

Increase informed conversion while reducing unsuitable orders, complaints, and eligibility surprises.

## 4. Entry Conditions

Fund ID from search, collection, compare, saved/watchlist, notification, portfolio, or deep link. User context may be authenticated, partially known, restricted, or offline.

## 5. Exit Conditions

Back to results, compare, save/watchlist, recommendation explanation, activation, investment action handoff if entitled, or support.

## 6. Layout Structure

Top to bottom: fund identity and status; eligibility/account context; objective and strategy; risk/liquidity; performance with period/method; costs and plan/option; tax/DTAA context; holdings/portfolio fit where authorized; source/freshness/methodology; actions and support.

## 7. Component Placement

Existing: Page Header, Card, Tabs/Sections, Badge, Button, Link, Alert, Table, Chart with data table, Tooltip, Disclosure.

New: Fund Identity Block, Eligibility Decision Block, Risk Disclosure Block, Performance Provenance Block, Tax Context Block, Action Entitlement Block, Source Freshness Row.

## 8. Information Priority

Fund identity and current eligibility precede performance. Risk, liquidity, costs, tax context, and data freshness precede save or action handoff. Deep detail can expand but material restriction cannot be hidden.

## 9. Interaction Behaviour

Tabs/sections preserve scroll context. Charts support period and table alternatives. Save/watchlist is idempotent. Compare adds only comparable products. Investment action requests a fresh entitlement evaluation and must not rely on a cached detail state.

## 10. Screen States

Default, loading, partial data, stale data, no performance history, restricted by country, restricted by account, restricted by risk, eligibility pending, eligible with disclosure, investor not ready, offline, source error, discontinued/merged scheme, suspended product, and success after save/compare.

## 11. Validation Rules

Fund ID, plan, option, currency, period, source, and policy version are explicit. Performance requires valid source inputs. Tax claims require approved wording and effective date. Action eligibility is checked again at handoff.

## 12. Error Behaviour

Localize missing NAV, performance, tax, or eligibility data. Do not hide the fund or substitute another product without explanation. If a source conflict exists, show safe uncertainty and support/reconciliation path.

## 13. Success Behaviour

Show current authoritative data and the exact next permitted action. Save/compare updates state consistently across D01, D02, D04, and D05.

## 14. Motion Recommendation

Use restrained section loading and chart transitions. Never animate performance as if it were a live gain. Do not auto-scroll to an action after data arrives.

## 15. Accessibility

Provide semantic sections, accessible chart table, text risk description, spoken currency/period, labelled disclosure controls, focus-safe tab changes, and visible error associations.

## 16. Analytics Events

`d03_viewed`, `fund_detail_section_opened`, `fund_performance_period_changed`, `fund_data_quality_opened`, `fund_eligibility_viewed`, `fund_saved`, `fund_unsaved`, `fund_compare_added`, `fund_action_handoff_requested`, `fund_restriction_help_opened`.

## 17. Engineering Notes

Detail data is assembled from product master, NAV/performance, eligibility, tax/policy, portfolio fit, and entitlement services. Store snapshot IDs so the handoff can show what changed if eligibility is re-evaluated.

## 18. Acceptance Criteria

- Eligibility, risk, performance, cost, tax context, and freshness are distinguishable.
- No past-performance element implies a forecast.
- Action handoff re-evaluates entitlement.
- Restricted users can understand the fund without being misled into believing they can purchase it.
- Missing or stale data is localised and labelled.

## 19. UX Writing Guidance

Use “may be available” only when the decision is genuinely pending. Use “not eligible under your current account/country context” only when the policy service returns that category. Explain estimates and tax limitations plainly.

## 20. Design Notes

This is the authoritative evaluation surface, not a marketing landing page. The strongest visual hierarchy should be reserved for truth, risk, eligibility, and next action.

# D04 - Compare Funds

## 1. Screen Purpose

Help users compare a small, coherent set of funds using consistent definitions, scope, period, and eligibility context.

## 2. User Goal

Understand meaningful differences and trade-offs without needing to remember values across multiple detail pages.

## 3. Business Goal

Support considered selection and reduce impulsive or misleading single-metric decisions.

## 4. Entry Conditions

At least two comparable fund records from D01, D02, D03, or D05. The compare queue may contain products with different eligibility states.

## 5. Exit Conditions

Fund details, save/watchlist, remove/replace comparison item, recommendation review, investment handoff for a selected eligible fund, or return to origin.

## 6. Layout Structure

Top to bottom: comparison scope and period; identity/eligibility row; risk/liquidity/cost rows; performance rows; portfolio fit/tax context where comparable; methodology and source freshness; selection and next actions.

## 7. Component Placement

Existing: Table/Data Table, Card, Button, Link, Tooltip, Badge, Alert, Expandable Section, Chart with table alternative.

New: Comparison Grid, Metric Definition Row, Difference Highlight, Comparability Warning, Compare Selection Control.

## 8. Information Priority

Scope, comparability, eligibility, risk, liquidity, cost, and performance method precede positive/negative differences. No single “winner” appears unless a policy-approved, user-defined criterion is explicitly selected.

## 9. Interaction Behaviour

Users may remove/replace items, change period where valid, expand definitions, sort by a selected metric, and open details. Comparison must preserve the user’s selected criterion and never silently rank by commercial priority. Ineligible items remain labelled.

## 10. Screen States

Valid comparison, one item, empty queue, incompatible products, partial data, stale data, loading, offline, source error, country-restricted item, account-restricted item, suspended product, and compare queue full under configured policy.

## 11. Validation Rules

Only like-for-like metrics are compared. Different plan, option, asset type, period, currency, or benchmark requires an explicit comparability warning. Missing values cannot be rendered as zero.

## 12. Error Behaviour

Explain why an item cannot be compared or why a metric is unavailable. Preserve the queue and allow removal, detail review, or retry.

## 13. Success Behaviour

The compare result is stable, reproducible, and deep-links to each source detail. A selected fund is passed to action handoff with fresh eligibility evaluation.

## 14. Motion Recommendation

Use stable row insertion/removal and preserve reading position. Avoid animated score races or moving columns after the user starts reading.

## 15. Accessibility

Use semantic table headers, row/column relationships, accessible difference descriptions, keyboard navigation, responsive reflow, and a linear reading alternative.

## 16. Analytics Events

`d04_viewed`, `compare_item_removed`, `compare_item_replaced`, `compare_metric_expanded`, `compare_period_changed`, `compare_sort_selected`, `compare_incompatibility_viewed`, `compare_action_selected`.

## 17. Engineering Notes

Comparison values must reference the same snapshot, period, currency, and calculation method. If not possible, the API returns comparability metadata and the UI renders a warning.

## 18. Acceptance Criteria

- No missing value is shown as zero.
- Incompatible dimensions are explicit.
- The user can inspect source and method for every major metric.
- Restricted funds remain distinguishable from unavailable data.
- Comparison never implies advice or guaranteed outcome.

## 19. UX Writing Guidance

Use “higher/lower than this comparison set,” not “better/worse,” unless the user chose the metric and the wording is still appropriately qualified. Explain what a metric does not measure.

## 20. Design Notes

Comparison should reduce memory load, not replace judgement. Preserve enough context that the user does not mistake a table for a recommendation.

# D05 - Saved & Watchlist

## 1. Screen Purpose

Provide continuity for saved funds, watched changes, saved filters, recent views, and recently invested products within authorized scope.

## 2. User Goal

Return to research without repeating work and understand what changed since the last visit.

## 3. Business Goal

Increase qualified repeat engagement and reduce discovery friction while avoiding notification pressure or stale assumptions.

## 4. Entry Conditions

Authenticated user with zero or more saved funds, watchlist items, saved filters, recent views, or authorized recent investments.

## 5. Exit Conditions

Fund details, search/results, compare, notification preferences, investment handoff, support, or remove/save action.

## 6. Layout Structure

Top to bottom: tabs or sections for saved funds, watchlist changes, saved filters, recent views, and recently invested; freshness and change explanation; empty/restricted items; actions and preference controls.

## 7. Component Placement

Existing: Tabs, Card, List, Badge, Button, Link, Empty State, Alert, Dialog, Toggle/Switch, Loading Skeleton.

New: Saved Item Row, Watch Change Summary, Stale Saved Context Notice, Saved Filter Summary.

## 8. Information Priority

Current eligibility and material changes first; saved identity and user notes second; performance movement and optional prompts later. The product must not turn a watchlist change into a buy recommendation.

## 9. Interaction Behaviour

Save/remove is idempotent and reversible where policy allows. Watch preferences control alerts, not eligibility. A saved item is re-evaluated when opened. Items may remain visible after becoming restricted, with safe status.

## 10. Screen States

Saved funds, watchlist, saved filters, recent views, recently invested, all empty, loading, partial, stale, offline, error, restricted, country-restricted, discontinued/merged, and suspended product.

## 11. Validation Rules

Saved objects reference stable IDs and versions. Recent-investment data requires portfolio/order permission. Watch alerts require channel consent and preference policy.

## 12. Error Behaviour

Preserve saved state locally only as a draft when server confirmation is unavailable. Mark stale items; do not claim removal or alert creation without authoritative response.

## 13. Success Behaviour

Show updated saved state and return to the originating context. Explain material changes using source and as-of time, without suggesting action.

## 14. Motion Recommendation

Use restrained add/remove feedback with undo where safe. No attention-grabbing animation for watched price/performance changes.

## 15. Accessibility

Each row exposes fund identity, state, freshness, restriction, and available action. Toggle labels include consequences. Removal and undo are announced.

## 16. Analytics Events

`d05_viewed`, `saved_item_opened`, `saved_item_removed`, `watchlist_created`, `watchlist_changed`, `watch_alert_preference_changed`, `saved_filter_opened`, `recent_view_opened`, `recent_invested_opened`, `saved_item_restricted_viewed`.

## 17. Engineering Notes

Saved state belongs to the user and scope, not to the client. Watch changes are event-derived and must include source, freshness, event type, and notification preference.

## 18. Acceptance Criteria

- Saved status is consistent across D01-D05.
- Watchlist alerts do not imply a recommendation.
- Stale, discontinued, and restricted funds remain understandable.
- Recent-invested data respects Portfolio entitlements.
- Offline actions never claim server persistence.

## 19. UX Writing Guidance

Use “saved,” “watching,” and “changed” precisely. Avoid “opportunity,” “act now,” or “don’t miss out” language for financial changes.

## 20. Design Notes

This screen is a continuity tool, not a campaign surface. The user should be able to leave research and return without losing context or agency.

# D06 - Recommendation Review

## 1. Screen Purpose

Explain a personalized or AI-assisted shortlist before the user treats it as relevant or actionable.

## 2. User Goal

Understand why funds were included or excluded, correct the inputs, and decide whether to continue researching.

## 3. Business Goal

Create qualified, explainable personalization while controlling suitability, legal, bias, hallucination, and trust risk.

## 4. Entry Conditions

Profile and/or consented portfolio context is available, the recommendation service has a current policy/model version, and the user explicitly requests personalized help or enters an approved contextual path.

## 5. Exit Conditions

Fund details, compare, edit profile, reset personalization, save shortlist, support/RM review, or safe return to generic discovery.

## 6. Layout Structure

Top to bottom: recommendation purpose and boundary; input snapshot; shortlist with rationale; exclusions and restrictions; material risks/trade-offs; source/freshness/model/policy metadata; correction/reset controls; next research actions.

## 7. Component Placement

Existing: Page Header, Card, Alert, Badge, Button, Link, Disclosure, Table, Tooltip, Loading/Error/Empty State.

New: Recommendation Rationale Block, Input Snapshot, Exclusion Explanation, AI Limitation Notice, Recommendation Confidence/Uncertainty Block, Reset Personalization Control.

## 8. Information Priority

Purpose and non-advice boundary; inputs and freshness; rationale and exclusions; eligibility and risk; source and uncertainty; then actions. A recommendation cannot appear above its limitations.

## 9. Interaction Behaviour

Users can inspect inputs, correct declared profile, remove a signal where permitted, reset personalization, open details, compare, save, or request human help. AI refresh is explicit and versioned; no automatic reranking while the user is reading.

## 10. Screen States

Personalized ready, AI recommendations, explanation required, not enough information, inputs stale, recommendation unavailable, loading, partial, offline, policy stale, restricted, human review recommended, and suspended profile.

## 11. Validation Rules

Required profile/consent, current policy, eligible product data, source freshness, model/version, and recommendation class are validated server-side. Unsupported country or stale compliance context blocks action-oriented output.

## 12. Error Behaviour

If rationale, source, eligibility, or confidence cannot be established, show “recommendation unavailable” or “more information required,” not a generic ranked list. Offer generic discovery or human support.

## 13. Success Behaviour

Show a reproducible shortlist with rationale, exclusions, risks, and correction path. A selected fund still enters D03 and then a fresh action entitlement check.

## 14. Motion Recommendation

No typing simulation, fake deliberation, or animated certainty. Use clear loading status, source retrieval state, and stable result presentation.

## 15. Accessibility

Rationale, input snapshot, limitations, and confidence are grouped semantically. Dynamic result updates are announced once. AI content has a non-AI equivalent path and can be read linearly.

## 16. Analytics Events

`d06_viewed`, `recommendation_requested`, `recommendation_inputs_viewed`, `recommendation_rationale_opened`, `recommendation_exclusion_viewed`, `recommendation_input_corrected`, `recommendation_reset`, `recommendation_unavailable`, `recommendation_fund_opened`, `recommendation_human_help_selected`.

## 17. Engineering Notes

Persist input snapshot hash, model/policy version, source IDs, confidence category, exclusions, consent basis, and human override. AI output must use approved retrieval and tool boundaries; no raw PII to unapproved providers.

## 18. Acceptance Criteria

- No personalized result appears without explanation and input visibility.
- Stale or missing inputs produce a safe non-recommendation state.
- Country, compliance, and entitlement restrictions cannot be overridden.
- Users can correct or reset relevant personalization.
- AI is never the only path to fund discovery or support.

## 19. UX Writing Guidance

Use “based on,” “may fit,” and “consider reviewing,” not “best,” “perfect,” or “will outperform.” State what the system does not know and when professional advice may be appropriate.

## 20. Design Notes

Recommendation Review must feel like an auditable explanation, not a persuasive sales pitch. The user should leave with more understanding even if they reject every suggestion.

## 16. Discovery UX Pattern Library

| Pattern | Purpose | Required behavior |
|---|---|---|
| Context Before Content | Establish country, account, activation, and profile context | Show context or state it is unknown before action-oriented results |
| Eligibility Before Action | Prevent premature investment attempts | Render canonical entitlement and fresh-check on handoff |
| Status With Meaning | Explain loading, pending, delayed, restricted, and stale states | State, meaning, owner, next action, and timestamp |
| Source and Freshness | Make data quality visible | Source, as-of time, policy version, and finality |
| Explainable Ranking | Avoid opaque discovery | Ranking reason, user-selected criterion, and commercial influence disclosure |
| Safe Empty State | Preserve momentum without misleading | Why empty, next action, and what not to assume |
| Material Disclosure Near Decision | Keep risk and tax context actionable | Do not bury restriction, loss, cost, or liquidity facts |
| Compare Like With Like | Prevent false precision | Common scope, period, currency, method, and comparability warning |
| Saved Continuity | Let users return without pressure | Save state, freshness, current eligibility, and change history |
| Human Escalation | Resolve uncertainty | Safe case reference, owner, SLA, and data shared |
| Correction and Reset | Preserve user agency | Correct profile, reset personalization, and dispute data |
| Safe Handoff | Move to orders without stale assumptions | Re-evaluate entitlement and show changed context before money movement |
| Read-Only Degradation | Keep useful access during service failures | Display safe cached/source data with explicit restrictions |

## 17. Component Inventory

Reusability score: 5 is platform-wide; 1 is discovery-specific.

| Component | Purpose | Existing or New | Variants | States | Dependencies | Reusability |
|---|---|---|---|---|---|---:|
| Discovery Context Bar | Show country, account, activation, profile, and freshness context | New | Known, unknown, restricted, stale | Loading, ready, error | Lifecycle, entitlement, policy | 4 |
| Search Field | Capture fund/product intent | Existing, extend | Name, code, natural-language | Idle, focus, searching, invalid | Search service | 5 |
| Query Suggestion Group | Offer editable term suggestions | New | Fund, AMC, category, intent | Loading, available, empty | Search index, taxonomy | 4 |
| Filter Panel | Apply structured discovery criteria | New | Basic, advanced, policy-aware | Open, applied, conflict, error | Product master, policy | 5 |
| Sort Control | Select a transparent ordering criterion | Existing, extend | Relevance, user metric, recency | Default, selected, unavailable | Ranking service | 4 |
| Result Eligibility Badge | Express eligibility without implying suitability | New | Eligible, disclosure, restricted, pending | Current, stale, unknown | Eligibility service | 5 |
| Fund Card | Summarize identity, category, risk, performance, eligibility | Existing pattern, extend | List, compact, compare, saved | Loading, current, stale, restricted | Product/NAV/policy | 5 |
| Fund Identity Block | Establish exact scheme/plan/option identity | New | MF, future instrument | Current, merged, discontinued | Product master | 5 |
| Risk Disclosure Block | Explain risk level, volatility, and limitations | New | Summary, detail, compare | Current, missing, stale | Risk metadata | 5 |
| Performance Provenance Block | Show period, method, source, and finality | New | Return, benchmark, drawdown | Current, estimated, stale, unavailable | NAV/performance | 5 |
| Tax Context Block | Explain tax/DTAA context safely | New | Educational, estimate, source-confirmed | Current, restricted, unavailable | Tax/policy/consent | 5 |
| Action Entitlement Block | Show whether next investment action is permitted | New | Allow, disclosure, pending, restricted | Current, stale, unknown | Entitlement, activation | 5 |
| Source Freshness Row | Show source and as-of timestamp | New | Product, NAV, tax, policy | Fresh, stale, partial, unavailable | Data quality | 5 |
| Comparison Grid | Align fund metrics | New | Mobile, desktop, accessible table | Loading, valid, incompatible, partial | Comparison API | 4 |
| Metric Definition Row | Explain metric meaning and limitations | New | Inline, expanded, table | Closed, open, unavailable | Content registry | 4 |
| Comparability Warning | Explain dimension mismatch | New | Currency, period, plan, asset | Visible, resolved | Product metadata | 4 |
| Save/Watch Control | Persist user research intent | Existing pattern, extend | Save, watch, saved, unavailable | Idle, saving, saved, failed, offline | User scope, consent | 5 |
| Saved Filter Control | Persist query criteria | New | Private, shared later | Draft, saved, stale, failed | Search, identity | 4 |
| Watch Change Summary | Explain a change without recommending action | New | Price, NAV, status, eligibility | New, seen, stale, unavailable | Event stream | 4 |
| Recommendation Rationale Block | Explain why result appears | New | Rule, portfolio-aware, AI-assisted | Loading, ready, stale, unavailable | Recommendation service | 5 |
| Input Snapshot | Show profile/portfolio inputs used | New | Declared, observed, portfolio | Current, stale, missing, restricted | Consent, portfolio | 5 |
| Exclusion Explanation | Show why products were excluded safely | New | Country, risk, account, policy | Visible, generic, unavailable | Eligibility policy | 5 |
| AI Limitation Notice | Define non-advice, uncertainty, and source boundary | New | Educational, shortlist, explanation | Visible, dismissed only if policy permits | AI governance | 5 |
| Reset Personalization Control | Restore generic discovery | New | Reset all, reset signal | Confirm, completed, failed | Preference/consent | 4 |
| Support Context Bundle | Carry safe discovery context to support | Existing cross-module contract | Fund, search, recommendation | Created, sent, restricted | Support, audit | 5 |
| Accessible Financial Table | Non-visual alternative for metrics/charts | New | Performance, compare, holdings | Loading, ready, partial | Data model | 5 |
| Restriction Explanation Panel | Explain safe reason and next action | Existing pattern, extend | Country, account, risk, policy | Restricted, pending, review | Entitlement/policy | 5 |
| State Projection Panel | Standardize empty/loading/error/offline | Existing pattern, extend | Full, inline, section | All platform states | Lifecycle contract | 5 |

## 18. Discovery Card Inventory

| Card | Purpose | Required fields | Future reuse |
|---|---|---|---|
| Fund Summary Card | Quick fund evaluation | Identity, category, plan/option, risk, performance period, eligibility, freshness | ETFs, bonds with extensions |
| Eligible Fund Card | Prioritize actionable eligible products | Eligibility result, account context, disclosure, next action | All investable instruments |
| Restricted Fund Card | Preserve transparency without offering false action | Product identity, restriction category, scope, alternative/support | All policy-gated products |
| Data Unavailable Card | Explain missing/stale source | Affected metric, source, as-of, retry/support | Portfolio, tax, reports |
| Trending Collection Card | Show popularity as descriptive context | Trend period, methodology, disclaimer, eligibility | Education and campaigns |
| Top Rated Collection Card | Show rating with methodology | Rating source, date, methodology, limitations | Ratings for future products |
| Tax Context Card | Explain tax-related consideration | Jurisdiction, educational/estimate status, source, date | Bonds, NPS, insurance tax contexts |
| SIP Fit Card | Explain recurring-investment attributes | Minimum, frequency, mandate dependency, risk, eligibility | Recurring product types |
| Recent View Card | Re-entry to research | Fund identity, last viewed, current status, freshness | Any product catalogue |
| Recently Invested Card | Link discovery to owned context | Holding/order identity, authorized scope, last action, freshness | Portfolio and cross-sell |
| Watch Change Card | Explain material change | Change type, old/new context, source, date, no-action disclaimer | Corporate actions |
| Compare Item Card | Compact comparison identity | Identity, selected metrics, eligibility, remove action | Cross-product comparison |
| Recommendation Card | Explain personalized inclusion | Why shown, inputs, risk, eligibility, source, limitation | Goals and model portfolios |
| AI Explanation Card | Present grounded explanation | Question, answer, source, model/version, limitation, correction | Support and tax education |
| Saved Filter Card | Return to a query | Query summary, filter version, saved time, stale warning | Searchable product domains |
| Human Help Card | Provide escalation without dead-end | Reason, owner/team, case reference, SLA, next update | All blocked workflows |

## 19. Search & Filter Strategy

### Search

Search exists because users often begin with a known fund, AMC, category, or intent rather than a questionnaire. It must return exact identity, interpretable intent, and policy-aware results.

### Sort

Sort is user-controlled and transparent. Supported criteria may include relevance, category, risk, cost, recent update, selected performance period, and user-defined goal fit where approved. “Best” is not a valid default sort.

### Filters

Filters should include only criteria with authoritative data: category, plan/option, risk, horizon/holding period, SIP availability, minimum amount, account type, country eligibility, tax context, fund age, and data freshness. A filter may reduce results but cannot create eligibility.

### Recent searches

Recent searches reduce repeated effort. They are private, deletable, device/account scoped per policy, and do not become recommendation signals without consent.

### Saved filters

Saved filters support a deliberate research workflow. They store taxonomy and policy versions, show when criteria changed, and re-evaluate current results when reopened. They do not guarantee future availability.

### AI suggestions

AI suggestions may translate natural-language intent into editable filters and explain terminology. They must show the interpreted criteria and never silently choose risk, tax, country, or account assumptions.

### Voice search

**Recommendation:** Defer voice search from MVP. Voice can be useful for accessibility and hands-busy contexts, but fund names, tax terms, account types, and sensitive financial context are error-prone. Introduce only with transcription confirmation, privacy controls, no sensitive audio retention by default, and an equivalent text path.

### Smart ranking

Smart ranking may use relevance, explicit filters, approved declared preferences, and current eligibility. It must not optimize solely for conversion, margin, popularity, or predicted susceptibility. The ranking reason and commercial influence must be inspectable.

## 20. Personalization Rules

| Input | Allowed influence | Prohibited influence | Required behavior |
|---|---|---|---|
| Risk profile | Risk-aligned education and shortlist | Override of current policy or user choice | Show profile version and refresh date |
| Portfolio | Overlap, concentration, diversification education | Personalized advice from stale/partial data | Show portfolio scope and data quality |
| Country | Eligibility, disclosures, tax context, language | Treat residence as tax residency automatically | Use effective-dated policy |
| Investment behaviour | Re-entry, saved context, content relevance | Infer sensitive traits or suitability without consent | Explain observed signal and allow reset |
| Goals | Horizon and education framing | Guarantee of goal achievement | Show assumptions and uncertainty |
| Existing holdings | Duplicate/overlap context, owned-fund navigation | Hide alternatives or pressure rebalancing | Use authorized, current portfolio data |
| Account type | NRE/NRO action eligibility and payment context | Cross-funding or account substitution | Re-evaluate at action handoff |
| Activation state | Safe explore versus action availability | Hide discovery during pending activation | Explain activation dependency |
| Tax residency | Approved educational context | Definitive tax advice without approved source | Show jurisdiction, date, and limitation |

## 21. Cross-Module Data and Dependency Contract

| Discovery need | Authoritative source | Required state/metadata |
|---|---|---|
| Fund identity and taxonomy | Product master | Version, effective date, issuer, plan/option |
| Country/account eligibility | Eligibility policy service | Decision, scope, policy version, expiry, reason category |
| Risk metadata | Product/risk master | Risk label, methodology, date, source |
| NAV/performance | Approved RTA/NAV source | Value, period, method, currency, as-of, freshness, finality |
| Tax context | Tax/policy service | Jurisdiction, rule version, educational/estimate/final status |
| User profile | Identity/compliance/profile | Risk version, country, tax residency, consent, freshness |
| Portfolio fit | Portfolio read model | Scope, completeness, overlap method, freshness, permission |
| Activation status | Activation state service | Dependency graph, readiness, restriction, SLA |
| Saved/watchlist | User preference service | Scope, timestamps, version, consent, sync state |
| Recommendation | Recommendation service | Input snapshot, rationale, model/policy version, confidence, exclusions |

No discovery API may return an action-enabled result without the current entitlement result or an explicit fresh-check requirement.

## 22. Analytics and Experimentation Contract

### Core events

`discovery_entered`, `query_submitted`, `result_returned`, `fund_detail_opened`, `eligibility_viewed`, `restriction_viewed`, `comparison_started`, `comparison_completed`, `fund_saved`, `watch_started`, `recommendation_requested`, `recommendation_accepted`, `recommendation_corrected`, `action_handoff_started`, `action_handoff_blocked`, `support_from_discovery`, `data_quality_reported`.

### Required event properties

`screen_id`, `session_id`, `correlation_id`, `actor_scope`, `country_context`, `account_type`, `activation_state`, `eligibility_category`, `policy_version`, `data_freshness_category`, `ranking_mode`, `recommendation_class`, and `experiment_version` where permitted.

### Prohibited analytics data

PAN, OTP, full bank details, raw tax IDs, raw KYC documents, raw search terms when sensitive, unrestricted support text, unapproved AI prompts, and raw device identifiers.

### Experiment rules

Experiments may change ordering, copy, or explanatory treatment only within approved policy and entitlement boundaries. No experiment may hide material risk, restriction, loss, cost, or tax information.

## 23. Independent Principal Product Review

### Missing scenarios

- User searches for a fund while country or tax residency is unresolved.
- A fund becomes restricted after it was saved or compared.
- A scheme merges, closes, changes name, or changes plan/option.
- User compares funds with different currencies, plans, periods, or risk classifications.
- NAV is stale while the user is deciding whether to start an order.
- User has no profile but wants general education.
- User has a partial or stale portfolio and asks for overlap guidance.
- User is activation-pending but wants to explore restricted products.
- User returns after a long gap and saved filters use changed taxonomy.
- User opens a notification for a watched fund while logged out or on a revoked device.
- User disputes a restriction or believes a fund is incorrectly unavailable.
- A recommendation contains no eligible fund because all candidates fail policy.
- An AI explanation conflicts with the authoritative detail page.
- User has a family/household scope but a fund is eligible for only one account.
- A supported fund is discontinued while in compare or saved state.

### Missing lifecycle states

Discovery needs explicit projections for `POLICY_STALE`, `ELIGIBILITY_RECHECK_REQUIRED`, `PRODUCT_DISCONTINUED`, `PRODUCT_MERGED`, `DATA_CORRECTED`, `RECOMMENDATION_INVALIDATED`, `SAVED_CONTEXT_STALE`, `SEARCH_INDEX_STALE`, `SOURCE_CONFLICT`, and `ACTION_ENTITLEMENT_UNKNOWN`.

These are projections of the locked contract, not new global state machines.

### Missing compliance considerations

- Country and scheme eligibility must be effective-dated and fail closed for action handoff.
- US/Canada-specific restrictions and PFIC/FAPI language require qualified legal sign-off.
- Tax-saving labels require approved jurisdictional wording and must not promise tax outcomes.
- Ratings, rankings, sponsored placement, and revenue influence require disclosure and governance.
- Personalized recommendations require a clear advice/suitability classification.
- Portfolio-aware discovery requires consent, resource-scoped permissions, and a freshness threshold.
- Saved and watchlist data requires retention, deletion, export, and notification preference rules.
- Product metadata, tax data, and eligibility decisions require audit and correction history.

### Missing trust opportunities

- “Why this appears” explanation adjacent to every personalized collection.
- Current policy and data freshness visible before action.
- A source conflict reporting path for users.
- A stable definition of “eligible,” “available,” “recommended,” and “popular.”
- A user-visible correction path for profile or portfolio data.
- Clear separation between platform distribution revenue and ranking logic.

### Missing accessibility considerations

- Voice search equivalent text confirmation and no required audio path.
- Compare tables with row/column headers and linear mobile alternative.
- Screen-reader announcements for result count, filter changes, and restriction updates.
- Accessible chart tables for returns, drawdown, and risk.
- Long fund names, disclaimers, and translated terms reflow at zoom.
- Keyboard-accessible compare selection, saved filters, and disclosure panels.

### Missing reusable components

The highest-value missing primitives are `EligibilityDecision`, `SourceFreshness`, `FinancialMetricDefinition`, `RestrictionExplanation`, `RecommendationRationale`, `InputSnapshot`, `ComparabilityWarning`, `SavedContextState`, and `ActionEntitlement`.

### Conflicting assumptions

1. **Browse versus act:** Discovery can remain open during activation, but action handoff must re-evaluate entitlements.
2. **Top-rated versus suitable:** Ratings are descriptive; they cannot become a default recommendation.
3. **Tax-saving collection:** Tax context is jurisdictional and policy-driven; the collection cannot promise savings.
4. **AI recommendations:** AI is optional assistance, not the primary catalogue or source of truth.
5. **Recently invested:** This is portfolio/order-derived and cannot be populated from click history.
6. **Country filtering:** Hiding all restricted products may improve simplicity but weakens transparency and supportability. Use safe restriction status where appropriate.
7. **Voice search:** Accessibility value exists, but privacy and transcription risk justify deferral until the text-equivalent contract is ready.

### Principal review decision

The six-screen architecture is sufficient. The materially better architecture is not more screens; it is a shared discovery data contract, explicit recommendation classes, transparent eligibility projections, and reusable provenance/restriction components. No additional MVP module is required.

## 24. High-Fidelity Readiness Gates

Before high-fidelity design or build commitment:

- Approve discovery taxonomy and country/account policy sources.
- Define the commercial ranking and sponsored-placement policy.
- Sign off tax, DTAA, PFIC/FAPI, and “tax-saving” wording by launch country.
- Define recommendation/advice classification and AI governance.
- Confirm product master, NAV, performance, and eligibility source SLAs.
- Define portfolio freshness threshold for portfolio-aware personalization.
- Approve accessible comparison and chart data contracts.
- Approve saved/watchlist retention, deletion, and notification policies.
- Validate D01-D06 with representative NRI users across country, risk, experience, and activation segments.

## 25. Architectural Decisions Made

1. Discovery uses six adaptive screens rather than one screen per collection or lifecycle state.
2. Discovery and recommendation are separate experiences with separate consent and explanation requirements.
3. Fund detail is the authoritative evaluation surface; Home and search cards are summaries.
4. Eligibility, risk, performance, tax, and portfolio fit are separate data domains.
5. Restricted products remain discoverable where safe, clearly marked as restricted rather than silently deleted.
6. All action handoffs perform a fresh entitlement evaluation.
7. Voice search is deferred from MVP.
8. AI recommendations are optional, explainable, policy-bounded, and never the only discovery path.
9. Comparison uses a common metric contract and refuses false comparability.
10. Saved and watchlist states are user-owned, scope-aware, and re-evaluated when reopened.
11. No new customer-facing module is introduced beyond Fund Discovery.

## 26. Assumptions Made

- Mutual funds are the initial supported discovery product and regular-plan context remains the launch assumption.
- Fund catalogue, NAV, performance, eligibility, tax, and portfolio data have separate authoritative sources.
- Discovery may be browsed before activation is complete, subject to locked lifecycle and entitlement rules.
- Launch countries, exact fund universe, ratings providers, tax wording, and commercial ranking policy remain UNKNOWN until stakeholder sign-off.
- Users may have multiple accounts, folios, currencies, household relationships, and changing eligibility.
- AI and portfolio-aware personalization are not automatically available to every user.
- The platform has an approved consent, audit, and data-freshness contract from the lifecycle architecture.

## 27. Risks

- Stale or incorrect country eligibility can create prohibited action attempts.
- Tax-saving or DTAA labels can create liability if wording is not country-specific and dated.
- Opaque ranking can create suitability, fairness, and commercial trust issues.
- AI-generated explanations can contradict authoritative fund or policy data.
- Partial portfolio data can produce misleading overlap or personalization.
- Product master changes can invalidate saved, compared, or recommended items.
- High information density can overwhelm novice investors and reduce comprehension.
- Hidden restrictions can increase support volume; visible restrictions can reduce conversion but improve trust.
- Voice search can expose sensitive financial intent or mis-transcribe fund names.
- Future asset-class expansion can overload a mutual-fund-specific taxonomy if shared entities are not preserved.

## 28. Open Questions

- Which countries and fund universe are supported at launch?
- Which products are safe to show to users before activation or before full tax residency is known?
- Which rating providers, benchmarks, risk methodologies, and data freshness SLAs are approved?
- Are “top rated,” “tax saving,” “trending,” and “SIP friendly” approved labels, and who owns their definitions?
- What is the legal classification of personalized shortlists: education, suitability, execution support, or advice?
- Which recommendation inputs require explicit consent, and which are necessary service data?
- Is sponsored placement allowed, and how must it be disclosed?
- What portfolio freshness threshold is safe for overlap and concentration context?
- Should restricted products be visible to every country segment or only when safe disclosure is approved?
- What is the maximum compare set under accessibility and performance constraints?
- What search and saved-filter retention period is required?
- What is the approved support path for disputed eligibility or product data?
- Which future asset class will be added first, and what shared product contract must be validated?

## 29. Recommendations for the Next Module

1. Define the next money-moving module only after D03 action handoff entitlement and order-state contracts are tested together.
2. Reuse `EligibilityDecision`, `ActionEntitlement`, `SourceFreshness`, `RestrictionExplanation`, `FinancialMetricDefinition`, and `SupportContextBundle` in the investment-order specification.
3. Create a canonical product master and policy fixture set for QA across countries, NRE/NRO accounts, risk profiles, and activation states.
4. Run moderated research on fund comparison, country restrictions, tax language, and recommendation explanations before final visual design.
5. Build a representative data-quality test set containing stale NAV, missing cost data, scheme merger, discontinued funds, restricted countries, and partial portfolio scope.
6. Keep the next module narrow: one eligible purchase type first, with explicit payment, order, reconciliation, and recovery states from the locked lifecycle contract.
