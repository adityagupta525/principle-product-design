# Component Requirement Matrix

**Audience:** Claude Code only  
**Purpose:** Authoritative implementation matrix for reusable components across the approved product architecture.  
**Status:** Implementation source of truth  
**Scope:** Shared design-system primitives, composites, financial components, compliance/security components, support components, and report/document components required across all approved modules.

## Operating Rules

1. This document does not redesign or reinterpret any approved UX specification.
2. The Cross-Module Lifecycle & Entitlement Contract remains authoritative for state, permission, entitlement, security, consent, and compliance behavior.
3. The target module specification remains authoritative for module-specific composition and behavior.
4. `Reuse Existing?` is based on component references in the approved specifications, not on an inspected Figma library. Claude must audit the connected Figma file before implementation.
5. If Figma contains an equivalent component, Claude must reuse it even when this matrix says `PARTIAL`; the implementation action may be updated to `Extend Existing` only after evidence is recorded.
6. No reusable component may remain local-only at module completion.
7. Every component must use Variables, semantic Tokens, Auto Layout, accessible states, and responsive behavior unless the component is intentionally non-layout decoration.
8. Product states are not visual variants alone. Pending, unknown, restricted, suspended, failed, delayed, expired, reconciled, and completed states must preserve their domain meaning.

## Module Abbreviations

| Code | Module |
|---|---|
| AUTH | Authentication & Identity |
| ONB | Onboarding & Regulatory |
| ACT | Investment Activation |
| HOME | Home Experience |
| PORT | Portfolio Experience |
| DISC | Fund Discovery Experience |
| INV | Investment Journey Experience |
| ORD | Orders & Activity Center |
| REP | Reports & Tax Center |
| ACC | Account & Service Hub |
| LIFECYCLE | Cross-Module Lifecycle & Entitlement Contract |

## Matrix Conventions

- **Reuse Existing?** `YES` means the approved specifications explicitly reference a reusable primitive. `PARTIAL` means a similar primitive exists in the specifications but needs library/Figma audit or extension. `NO` means a new shared composite is required.
- **Estimated Reuse Frequency:** `Very High`, `High`, `Medium`, or `Low`; this is a relative implementation planning signal, not a product KPI.
- **Engineering Complexity / Design Complexity:** `S`, `M`, `L`, or `XL`.
- **Variant count:** Estimate only named component variants; domain states remain state properties and must not be collapsed into styling.

## 1. Foundation Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F01 | App Shell | Own global frame, safe areas, navigation slots, lifecycle projection, and module handoff. | Foundation | All | YES | Reuse and audit | Critical | mobile, desktop, authenticated, restricted | loading, offline, restricted, suspended | lifecycle, entitlement, session, navigation | spacing, breakpoints, visibility, safe-area | surface, content, focus, restricted | landmark regions, skip link, focus order, screen-reader title | reflow shell, preserve navigation access | route entry, deep-link return, session expiry | L | M | Very High |
| F02 | Page Header | Establish page identity, context, back/action slots, and status context. | Foundation | All | YES | Reuse and extend | Critical | title-only, back, contextual, action | loading, error, restricted | navigation, scope, entitlement | spacing, height, visibility | surface, content, border, focus | heading hierarchy, labelled actions | wrap long titles and actions | back/deep-link transitions | M | S | Very High |
| F03 | Section Header | Label and orient a content section with optional helper text/action. | Foundation | All | PARTIAL | Extend existing | High | title, title+description, action | default, loading | content, localization | spacing, visibility | content, muted-content, focus | heading level, action label | stack on narrow widths | expand/open section action | S | S | Very High |
| F04 | Layout Container | Provide consistent max width, page padding, and content alignment. | Layout | All | PARTIAL | Create shared primitive if absent | Critical | full, constrained, split | default | App Shell, breakpoints | spacing, max-width, gutters | surface, background | logical reading order | responsive gutters, one-column collapse | none | S | S | Very High |
| F05 | Stack / Inline Layout | Standardize vertical and horizontal Auto Layout composition. | Layout | All | PARTIAL | Create shared primitive if absent | Critical | vertical, horizontal, wrap, space-between | default, disabled-content | Variables | spacing, alignment, wrapping | none | DOM/order equivalent, no layout-only meaning | wrap and collapse rules | none | S | S | Very High |
| F06 | Divider | Separate related content without creating unnecessary hierarchy. | Foundation | All | YES | Reuse and token-bind | High | horizontal, vertical, inset | default, hidden | Layout Container | visibility, inset | border, surface | decorative or labelled correctly | hide/reflow where redundant | none | S | S | Very High |
| F07 | Button | Execute primary, secondary, tertiary, destructive, and recovery actions. | Foundation | All | YES | Reuse and extend states | Critical | primary, secondary, tertiary, destructive, link-like, icon | default, hover, focus, pressed, disabled, loading, success, error | entitlement, validation, API state | size, icon visibility, loading visibility | action, focus, disabled, destructive | name, role, focus ring, target size | full-width/fit, wrapping, stacking | click, loading lock, success/error feedback | M | M | Very High |
| F08 | Link | Provide semantic cross-module navigation and inline help actions. | Foundation | All | YES | Reuse and extend | Critical | inline, standalone, external, destructive | default, hover, focus, visited, disabled | routing, entitlement | visibility, underline | action, focus, muted-content | semantic link, descriptive accessible name | wrap and preserve target size | deep-link navigation, external handoff | S | S | Very High |

## 2. Navigation Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| N01 | Bottom Navigation | Provide stable primary module navigation on mobile. | Navigation | HOME, PORT, DISC, ORD, REP, ACC | YES | Reuse and bind entitlement | Critical | 4-5 destinations, notification badge, restricted item | active, inactive, loading, restricted, hidden | navigation, entitlement, notifications | selected state, badge visibility, safe-area | surface, action, focus, notification | selected announcement, labelled regions, target size | mobile only, safe-area aware | route change, deep-link selection | M | M | Very High |
| N02 | Side / Drawer Navigation | Provide expanded navigation, account scope, help, and legal access. | Navigation | All | YES | Reuse and extend | High | collapsed, expanded, account section, support section | open, closed, loading, restricted | navigation, entitlement, session | width, overlay, visibility | surface, overlay, focus | modal focus trap when overlay, escape/close | desktop persistent, mobile overlay | open/close, route selection | M | M | High |
| N03 | Breadcrumb | Preserve hierarchy in deep report, detail, and support contexts. | Navigation | PORT, DISC, INV, ORD, REP, ACC | PARTIAL | Extend existing or create shared | Medium | 2-level, 3-level, truncated | default, loading, restricted | routing, scope, entitlement | max items, visibility | content, focus | nav landmark, current page semantics | collapse to back/context on mobile | segment navigation | S | S | Medium |
| N04 | Tabs | Switch between sibling views without changing module context. | Navigation | PORT, DISC, ORD, REP, ACC | YES | Reuse and extend | Critical | underline, pill, scrollable, icon+label | active, inactive, disabled, loading, restricted | routing, entitlement | selected, scroll, visibility | action, surface, focus, disabled | tablist/tabpanel semantics, arrow navigation | scrollable and overflow-safe | tab change with focus management | M | M | Very High |
| N05 | Segmented Control | Switch bounded display modes such as chart/table or realized/unrealized. | Navigation | PORT, REP, DISC, ORD | PARTIAL | Extend existing | High | 2-way, 3-way, icon+label | selected, disabled, loading | view state, data state | selected, visibility | surface, action, focus | radio semantics, labelled group | compress and wrap safely | mode switch preserving context | S | S | High |
| N06 | Global Search Trigger | Open product-wide search without changing current context. | Navigation | All authenticated modules | YES | Reuse and extend | High | compact, expanded, command-like | idle, active, unavailable | search, entitlement, session | visibility, width, focus | surface, content, focus | labelled control, keyboard shortcut equivalent | compact on mobile | opens search, preserves return route | M | S | High |
| N07 | Back / Close Navigation | Return safely from nested context or dismiss a transient surface. | Navigation | All | YES | Reuse | Critical | back, close, cancel | default, disabled, loading | routing, dirty-state guard | visibility | content, focus | named control, predictable focus return | fixed target size | back, close, discard confirmation | S | S | Very High |
| N08 | Quick Action Launcher | Expose safe, permission-aware actions from Home and detail contexts. | Navigation | HOME, PORT, DISC, ORD, REP, ACC | PARTIAL | Extend existing action pattern | High | single action, action group, contextual | available, disabled, restricted, loading | entitlement, policy, lifecycle | visibility, priority | action, restricted, focus | action names include consequence | collapse to sheet/menu | opens approved flow only | M | M | High |

## 3. Form Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FR01 | Text Input | Capture non-sensitive text with labels, help, and validation. | Form | AUTH, ONB, INV, ACC, ORD, REP, SUPPORT | YES | Reuse and extend | Critical | default, multiline, search, read-only, masked | empty, focused, filled, invalid, disabled, loading, restricted | validation, localization, autofill | height, label visibility, helper visibility | surface, border, focus, error, disabled | label association, error description, autocomplete | full width, multiline growth | focus, validation, keyboard submit | M | M | Very High |
| FR02 | OTP Input | Capture one-time verification code securely. | Form | AUTH, ONB, ACC | YES | Reuse and extend | Critical | 4/6 digit, auto-submit, paste | empty, partial, invalid, expired, locked, loading, success | identity, device, rate limit | cell count, focus, timer visibility | focus, error, disabled, success | grouped input semantics, paste, announcements | full width, large target | auto-advance, resend timer, retry | M | M | High |
| FR03 | Password / PIN Input | Capture password/PIN with reveal and security hints. | Form | AUTH, ACC, INV, ORD | YES | Reuse and extend | High | password, PIN, confirmation | empty, weak, mismatch, invalid, locked, loading | identity, risk policy | reveal state, strength visibility | border, focus, error, warning | no password announcement, reveal labelled | full width | reveal, validation, step-up | M | M | High |
| FR04 | Masked Sensitive Input | Capture or display PAN, account, tax, or identity data with masking. | Form / Security | AUTH, ONB, ACC, REP | PARTIAL | Extend existing masked input | Critical | PAN, account, tax ID, read-only | empty, partial, verified, invalid, restricted | identity, document, entitlement | mask pattern, visibility | content, focus, restricted, error | masking announced, no sensitive analytics | preserve readable mask on narrow widths | reveal requires step-up where applicable | M | M | High |
| FR05 | Select / Combobox | Choose from searchable or bounded values. | Form | ONB, INV, ACC, REP, DISC | YES | Reuse and extend | Critical | select, autocomplete, multi-select | empty, open, selected, invalid, disabled, loading, no-results | taxonomy, eligibility, search | menu height, selection, visibility | surface, focus, error, disabled | combobox/listbox semantics, keyboard navigation | full-width menu, viewport-aware | selection, clear, no-results recovery | M | M | Very High |
| FR06 | Country Selector | Capture country of residence, tax jurisdiction, or eligibility context. | Form / Compliance | ONB, ACC, REP, DISC | PARTIAL | Extend Select / Combobox | Critical | country, country+flag optional, restricted | empty, selected, loading, invalid, restricted | country policy, tax, eligibility | result count, visibility | content, warning, restricted, focus | country names, not flag-only | searchable, long names wrap | selection triggers policy refresh | M | M | High |
| FR07 | Currency / Amount Input | Capture money amounts with currency and locale rules. | Form / Financial | INV, ORD, ACC | NO | Create new composite | Critical | amount, currency+amount, range | empty, focused, invalid, below-min, above-max, loading, restricted | product capability, account, eligibility, currency | locale, precision, min/max, currency | surface, focus, error, warning, financial | currency spoken, numeric keyboard, error association | locale-aware formatting and overflow handling | parse/format without value loss | L | M | Very High |
| FR08 | Date / Financial Year Selector | Choose order dates, recurring dates, reporting periods, or tax years. | Form | ONB, INV, ORD, REP, ACC | YES | Reuse and extend | Critical | date, range, financial year, frequency date | empty, selected, invalid, unavailable, loading | calendar, policy, report availability | min/max, locale, calendar mode | surface, focus, error, disabled | date format announced, keyboard calendar | mobile picker, desktop popover | selection updates dependent data | M | M | High |
| FR09 | Radio Group | Capture mutually exclusive regulatory, account, risk, and action choices. | Form | ONB, INV, ACC | YES | Reuse and extend | Critical | vertical, horizontal, card choice | unselected, selected, invalid, disabled, loading | validation, policy | selected, layout | action, focus, error, disabled | group label, option descriptions | stack on mobile | selection may reveal fields | S | M | Very High |
| FR10 | Checkbox | Capture independent selections and acknowledgements. | Form | ONB, INV, ACC, REP | YES | Reuse and extend | Critical | single, group, indeterminate | unchecked, checked, invalid, disabled, loading | consent, validation | selected, indeterminate | action, focus, error, disabled | label and state announced | wrap labels | check enables action | S | S | Very High |
| FR11 | Switch / Toggle | Change reversible preferences such as notifications or biometric use. | Form | AUTH, ACC, REP | YES | Reuse and extend | High | preference, secure action, disabled | on, off, loading, restricted, error | preference, security, entitlement | selected, loading, visibility | action, focus, disabled, warning | explicit on/off label, no color-only state | full target area | optimistic update only when contract allows | S | S | High |
| FR12 | Consent / Legal Acknowledgement | Capture explicit, versioned legal or financial consent. | Form / Compliance | ONB, INV, REP, ACC | NO | Create new controlled composite | Critical | checkbox+version, disclosure+confirm, step-up consent | required, accepted, withdrawn, expired, blocked | consent, policy, audit, document | disclosure, expanded, selected | legal, action, warning, focus | full text accessible, version/date exposed | readable long-form reflow | accept, reject, withdraw, audit confirmation | L | L | High |
| FR13 | File Upload | Submit KYC, tax, bank, or compliance evidence with constraints. | Form / Compliance | ONB, REP, ACC | YES | Reuse and extend Upload | Critical | single, multiple, replacement, camera/import | idle, selecting, uploading, scanning, rejected, approved, retry | document, scan, consent, policy | progress, file count, size, visibility | surface, progress, error, success, warning | input label, file status, keyboard alternative | responsive dropzone to button | upload progress, retry, replace | L | M | High |
| FR14 | Bank Account Input | Capture bank identity and account ownership context safely. | Form / Financial | ONB, INV, ACC | PARTIAL | Extend form composite | Critical | NRE, NRO, payout, mandate | empty, validating, mismatch, verified, unsupported, restricted | bank, penny-drop, account, policy | masking, field visibility, validation | content, focus, error, restricted | do not expose full account, clear ownership labels | stack fields, preserve bank search | verification submission and recovery | L | M | High |
| FR15 | PAN Input | Capture PAN with format and verification behavior. | Form / Compliance | AUTH, ONB, ACC | PARTIAL | Extend masked input | Critical | registration, correction, read-only | empty, invalid, duplicate, verifying, verified, restricted | identity, PAN verification, KYC | mask, case, validation | focus, error, success, restricted | label, format help, no sensitive analytics | full width | verify and status transition | M | M | High |

## 4. Card Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CA01 | Base Card | Provide a consistent grouping surface for content and actions. | Card | All | YES | Reuse and token-bind | Critical | flat, bordered, interactive, compact | default, hover, focus, disabled, loading | tokens, layout | padding, radius, elevation | surface, border, focus | region semantics only when needed | fill/stack, no fixed content height | interactive card only when action is clear | S | S | Very High |
| CA02 | Empty State Card | Explain no data or no eligible content and give the next safe action. | Card / Feedback | All | YES | Reuse and extend | Critical | no portfolio, no results, no documents, no activity | default, restricted, unavailable, action-required | domain state, entitlement | illustration visibility, action visibility | surface, content, muted, action, restricted | heading, explanation, action name | stack, long-copy support | CTA to approved next step | M | M | Very High |
| CA03 | Error State Card | Localize recoverable service or data errors without hiding available content. | Card / Feedback | All | YES | Reuse and extend | Critical | service error, data error, permission error | error, retrying, resolved, escalated | API, entitlement, support | retry visibility, error details | error, warning, action, focus | error announced, recovery target | full width, content wraps | retry, support handoff, preserve context | M | M | Very High |
| CA04 | Loading Skeleton Card | Preserve hierarchy while data is loading. | Card / Feedback | All | YES | Reuse and extend | High | metric, list, chart, detail | loading, timed-out, partial | API, freshness | width, row count, visibility | surface, muted | reduced-motion alternative, no fake values | responsive skeleton rows | resolves to content/error/empty | S | S | Very High |
| CA05 | Status Summary Card | Summarize lifecycle, verification, readiness, or operational status. | Card / Data Display | AUTH, ONB, ACT, HOME, ORD, REP, ACC | PARTIAL | Extend Status Panel | Critical | lifecycle, readiness, attention, compliance | pending, approved, failed, delayed, restricted, suspended, expired, completed | lifecycle, entitlement, policy | status visibility, progress, action | pending, success, error, warning, restricted, unknown | status text not color-only, heading/order | stack metadata and actions | opens authoritative detail | M | M | Very High |
| CA06 | Action / Task Card | Present one prioritized action with consequence and safe recovery. | Card | HOME, ACT, DISC, INV, ORD, REP, ACC | PARTIAL | Create reusable composite | High | primary task, recovery task, review task | available, blocked, expired, completed, loading | entitlement, task service, lifecycle | priority, visibility, deadline | action, warning, restricted, success | action-first reading order | full width, action stacks | opens approved flow with context | M | M | High |
| CA07 | Product / Fund Card | Summarize discoverable instrument facts, suitability signals, and restrictions. | Card / Financial | DISC, HOME, INV | NO | Create new | Critical | fund, future asset, restricted, saved, compare | eligible, restricted, discontinued, stale, loading | product master, eligibility, risk, freshness | card density, metric visibility | surface, risk, restricted, unknown, action | semantic grouping and textual risk summary | adapt columns to stack | save, compare, detail, invest if entitled | L | M | High |
| CA08 | Holding Card | Summarize holding value, performance, freshness, and action context. | Card / Financial | HOME, PORT, REP | NO | Create new | Critical | holding, aggregate, stale, restricted | current, stale, unknown, restricted, suspended | portfolio, valuation, entitlement | metric visibility, scope | financial-positive, financial-negative, unknown, restricted | values include labels/period/freshness | stack metrics, prevent clipping | opens holding detail | L | M | High |
| CA09 | Report Card | Summarize report purpose, period, status, finality, and available actions. | Card / Reports | HOME, REP, ORD, ACC | PARTIAL | Extend existing Report Readiness Card | Critical | readiness, generated, provisional, final, expired | ready, pending, failed, stale, restricted, expired | report, artifact, entitlement, freshness | action visibility, metadata | content, pending, warning, error, restricted | purpose and status announced | stack metadata/actions | open, generate, download | M | M | High |
| CA10 | Support Case Card | Show owner, SLA, case state, next action, and safe context. | Card / Support | HOME, ORD, REP, ACC | NO | Create new | High | case, complaint, escalation, callback | open, pending, waiting-user, escalated, resolved, closed | support, SLA, consent, audit | priority, status, action | support, warning, error, success | case ID and status accessible | wrap long issue titles | open case, reply, escalate | M | M | Medium |

## 5. Data Display Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DD01 | Data List / Row | Display repeatable entities with identity, status, metadata, and actions. | Data Display | All | YES | Reuse and extend | Critical | compact, detailed, selectable, actionable | loading, empty, disabled, restricted | data source, entitlement | row density, action visibility | surface, border, focus, restricted | list semantics, row action labels | stack secondary metadata | select/open/action | M | M | Very High |
| DD02 | Data Table | Display financial, tax, transaction, or comparison data with sorting and totals. | Data Display | PORT, DISC, ORD, REP, ACC | YES | Reuse and extend | Critical | responsive table, comparison, financial, audit | loading, empty, partial, stale, error, restricted | data API, pagination, entitlement | column visibility, density, sticky | surface, border, content, focus, unknown | headers, captions, row/column scope, mobile alternative | horizontal scroll or card transformation | sort, expand, export, row detail | L | L | High |
| DD03 | Key-Value List | Present authoritative metadata and details without visual ambiguity. | Data Display | AUTH, ONB, ACT, INV, ORD, REP, ACC | PARTIAL | Create shared primitive | Critical | two-column, stacked, editable, masked | default, loading, restricted, incomplete | domain API, masking, entitlement | label width, visibility | content, muted, restricted, warning | label/value association, reading order | stack at narrow widths | expand/edit/reveal with permission | S | S | Very High |
| DD04 | Status Badge / Chip | Expose short status, classification, eligibility, or finality. | Data Display | All | YES | Reuse and extend semantic states | Critical | status, category, eligibility, finality, count | pending, approved, failed, delayed, unknown, restricted, expired, completed | lifecycle, policy, entitlement | size, icon visibility | status, warning, error, success, unknown, restricted | status text required, not color-only | wrap, no truncation of critical state | none or opens detail | S | S | Very High |
| DD05 | Tooltip / Info Popover | Explain metric definitions, tax terms, risk, source, or restrictions. | Data Display | ONB, DISC, PORT, REP, ACC | YES | Reuse and extend | High | tooltip, click popover, methodology | closed, open, loading | content, localization | max-width, placement | surface, focus, content | keyboard/touch alternative, no hover-only info | viewport-aware, long text | open/close, focus return | M | M | High |
| DD06 | Disclosure / Expandable Section | Support progressive disclosure of methodology, terms, history, or recovery details. | Data Display | All | YES | Reuse and extend | Critical | single, accordion, nested | collapsed, expanded, disabled, loading | content, analytics | selected, visibility | surface, focus, content | button semantics and expanded state | full-width, preserve order | expand/collapse, scroll focus | S | S | Very High |
| DD07 | Pagination / Load More | Navigate large lists and tables safely. | Data Display | DISC, ORD, REP, ACC | PARTIAL | Extend existing pagination | High | numbered, cursor/load-more, infinite-disabled | idle, loading, end, error | API cursor, query state | visibility, page size | content, focus, error | announce results and position | preserve context and focus | fetch next, retry | M | S | High |
| DD08 | Sort Control | Change deterministic order without altering scope or permissions. | Data Display | DISC, ORD, REP, PORT | YES | Reuse and extend | High | menu, column header, select | default, selected, loading, unavailable | query API, taxonomy | selection, visibility | surface, action, focus | current sort announced | compact menu, accessible overflow | query update, preserve filters | S | S | High |
| DD09 | Filter Bar | Show active filters, clear actions, and result context. | Data Display | DISC, ORD, REP, PORT | YES | Reuse and extend | Critical | inline, removable chips, compact | no filters, applied, loading, incompatible, restricted | query, eligibility, entitlement | chip visibility, count | surface, action, warning, focus | labelled group, clear labels | horizontal scroll or wrap | open filter sheet, clear, apply | M | M | Very High |
| DD10 | Filter Sheet | Apply multi-dimensional filters without losing query context. | Data Display | DISC, ORD, REP, PORT | YES | Reuse and extend | High | single-select, multi-select, range, saved | open, applying, invalid, no-results | taxonomy, eligibility, search | sheet height, selection, draft state | surface, focus, warning, error | dialog/sheet semantics and focus trap | full-screen mobile, popover desktop | apply, cancel, reset | M | M | High |

## 6. Financial Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FI01 | Financial Metric | Display a value with label, period, currency, source, and freshness. | Financial | HOME, PORT, DISC, ORD, REP | NO | Create new | Critical | value, percentage, count, estimate | current, stale, estimated, unknown, restricted, loading | financial data, freshness, entitlement | precision, visibility, currency | financial-positive, financial-negative, unknown, restricted, muted | label/value reading, text equivalent | fit value and wrap label | open source/detail | M | M | Very High |
| FI02 | Currency Value | Format money consistently across currencies, locales, and scopes. | Financial | ONB, ACT, HOME, PORT, INV, ORD, REP, ACC | NO | Create shared primitive | Critical | INR, foreign currency, multi-currency, masked | known, unavailable, stale, restricted | locale, currency, permission | precision, locale, symbol visibility | content, unknown, restricted | currency and decimals spoken, no symbol-only meaning | prevent clipping, wrap code | none | M | M | Very High |
| FI03 | Gain / Loss Value | Communicate realized/unrealized gain/loss with period and basis. | Financial | HOME, PORT, REP | NO | Create new | Critical | absolute, percentage, realized, unrealized | positive, negative, zero, provisional, final, unknown | portfolio, tax, methodology | sign, precision, period | financial-positive, financial-negative, unknown, provisional | sign and text label, not color-only | stack value and basis | opens explanation/detail | M | M | High |
| FI04 | Performance Summary | Explain returns using selected method, period, benchmark/context, and freshness. | Financial | HOME, PORT, REP, DISC | NO | Create new composite | Critical | point-in-time, time-weighted, money-weighted, benchmark | current, stale, estimated, incomplete, unknown | valuation, methodology, freshness | period, chart/table visibility | financial-positive, financial-negative, unknown, warning | method and period in accessible summary | chart collapses to table/summary | period/method change | L | L | High |
| FI05 | Allocation Breakdown | Show allocation by asset, fund, geography, currency, or account. | Financial | PORT, HOME, REP | NO | Create new composite | High | donut+table, bar+table, list | current, partial, stale, unknown, restricted | portfolio, taxonomy, entitlements | segment visibility, chart mode | surface, content, unknown, restricted | chart data table, text summary, no color-only | chart to table on narrow width | segment selection/detail | L | L | Medium |
| FI06 | Holding Allocation Row | Show holding name, weight, value, performance, and freshness. | Financial | PORT, REP | NO | Create new | Critical | holding, asset class, currency, restricted | current, stale, unknown, restricted | holdings, valuation, entitlement | columns, visibility | financial, unknown, restricted, border | row headers and values associated | stack secondary metrics | open holding detail | M | M | High |
| FI07 | Holdings Table | Authoritative holdings workspace with filters, totals, and actions. | Financial | PORT, REP | NO | Create new composite | Critical | investor, household, multi-asset | loading, empty, current, stale, partial, restricted, error | portfolio, entitlement, freshness | columns, scope, density | financial, unknown, restricted, focus | semantic table, mobile linear alternative | horizontal scroll/card mode | sort/filter/export/detail | XL | L | High |
| FI08 | Portfolio Scope Selector | Switch investor, account, folio, or household view within entitlement. | Financial | PORT, HOME, REP, ACC | PARTIAL | Extend Select with scope contract | Critical | investor, account, household, advisor | selected, loading, unavailable, restricted | entitlement, family permission, portfolio | selection, visibility | surface, focus, restricted | current scope announced | searchable sheet on mobile | scope change refreshes projections | L | M | High |
| FI09 | Amount / Units Summary | Summarize order or holding quantity with unit/value basis. | Financial | INV, ORD, PORT | NO | Create new composite | Critical | amount, units, percentage, mixed | entered, validated, provisional, confirmed, unknown | order, product, account | precision, currency, units | content, warning, error, unknown | units/currency labels explicit | stack amount and units | updates from input and backend validation | M | M | High |
| FI10 | Order Summary | Present order identity, action type, fund/product, amount, account, and status. | Financial | INV, ORD, HOME | NO | Create new composite | Critical | purchase, redemption, switch, SIP, STP, SWP | draft, submitted, pending, accepted, rejected, failed, expired, unknown, completed | order, product, payment, entitlement | action visibility, status | content, pending, error, warning, success, unknown | status and reference readable | stack metadata | opens detail, cancel if entitled | L | M | Very High |
| FI11 | Payment Summary | Separate payment initiated, debited, failed, pending, refunded, and reconciled truth. | Financial | INV, ORD, HOME, ACC | NO | Create new composite | Critical | gateway, bank, mandate, refund | initiated, pending, failed, timeout, success, unknown, refund-pending, refunded, reconciled | payment ledger, gateway, bank, reconciliation | amount, reference visibility | payment, warning, error, success, unknown | reference and amount announced, sensitive masking | wrap long references | recovery actions never duplicate side effects | XL | L | High |
| FI12 | Fees / Tax Summary | Explain fees, taxes, withholding, and estimated versus final amounts. | Financial | INV, ORD, REP, PORT | NO | Create new composite | High | fee, TDS, tax estimate, net proceeds | estimated, final, unavailable, changed, disputed | tax, order, product, policy | precision, disclosure | warning, legal, unknown, financial | explain basis and timing | stack rows | opens methodology/tax detail | L | M | High |
| FI13 | Cash Flow Summary | Show contributions, withdrawals, dividends, and net flows over a period. | Financial | PORT, REP | NO | Create new | High | period, account, household | current, partial, stale, unknown | transactions, portfolio, scope | period, currency, visibility | financial, unknown, restricted | accessible table alternative | chart-to-table | period/scope update | L | M | Medium |
| FI14 | Activity Timeline | Correlate user instruction, payment, execution, settlement, refund, report, and support events. | Financial | INV, ORD, PORT, REP | PARTIAL | Extend Timeline with correlation contract | Critical | vertical, compact, grouped, filtered | pending, completed, failed, unknown, reconciled, restricted | activity, correlation, lifecycle | grouping, visibility | content, pending, error, success, unknown | chronological semantics, status text | horizontal metadata collapse | expand event, open evidence | L | L | Very High |
| FI15 | Chart With Data Table | Communicate performance, allocation, gains, and trends with accessible alternative. | Financial | PORT, DISC, REP | PARTIAL | Extend existing chart contract | Critical | line, bar, area, allocation | loading, current, stale, partial, error, no-data | chart data, methodology, freshness | series visibility, period | surface, financial, unknown | text summary, data table, keyboard points | table fallback, no forced horizontal overflow | period/series toggle | XL | L | High |
| FI16 | Capital Gains Table | Show tax lots, realized gains, holding period, basis, and finality. | Financial / Compliance | REP, PORT | NO | Create new | Critical | realized, unrealized, short-term, long-term, lot | provisional, final, amended, partial, missing-data, restricted | tax, transactions, portfolio, policy | columns, precision, period | legal, financial, unknown, restricted | table headers/totals, tax year spoken | horizontal scroll/linear alternative | filters, export, detail | XL | L | High |
| FI17 | Tax Readiness Card | Summarize filing readiness, missing data, provisional/final reports, and next action. | Financial / Compliance | HOME, REP, ACC | NO | Create new | High | ready, action-required, provisional, unavailable | current, pending, blocked, expired, error | tax, documents, compliance, report | action visibility, period | legal, warning, error, success, unknown | readiness explained without tax advice claim | stack action and status | opens tax center | L | M | High |

## 7. Compliance Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CO01 | Eligibility / Restriction Notice | Explain whether an action or product is available, restricted, or unresolved. | Compliance | ONB, ACT, DISC, INV, ORD, REP, ACC | NO | Create new shared composite | Critical | eligible, restricted, unknown, country, risk, account | available, blocked, pending-review, expired, suspended | eligibility, country, risk, entitlement | action visibility, disclosure | restricted, warning, error, unknown | plain-language reason and next step | full-width, long-copy safe | opens authoritative reason/recovery | L | M | Very High |
| CO02 | Regulatory Status Row | Show KYC, FATCA, CRS, AML, or activation status and owner. | Compliance | ONB, ACT, HOME, REP, ACC | PARTIAL | Extend Status Row | Critical | KYC, FATCA, CRS, AML, activation | not-started, in-progress, approved, failed, expired, restricted | compliance, lifecycle, audit | progress, owner, action visibility | pending, success, error, warning, restricted | status and action readable | stack metadata | open remediation/status detail | M | M | High |
| CO03 | Consent Record Row | Show consent purpose, version, timestamp, scope, and withdrawal state. | Compliance | ONB, INV, REP, ACC | NO | Create new | Critical | required, optional, share, recurring, legal | requested, accepted, withdrawn, expired, superseded, blocked | consent, policy, audit | version, visibility | legal, warning, restricted | full purpose and version accessible | stack metadata/actions | accept/withdraw opens confirmation | L | M | High |
| CO04 | Document Row | Show document identity, version, source, status, and action. | Compliance / Documents | ONB, REP, ACC | YES | Reuse and extend | Critical | KYC, tax, bank, agreement, report | not-submitted, uploaded, reviewing, approved, rejected, expired, superseded, revoked | document, entitlement, audit | action visibility, metadata | content, pending, success, error, warning, restricted | status/action labelled, file type announced | stack secondary metadata | open, replace, download | M | M | Very High |
| CO05 | Document Validity / Expiry Row | Surface validity, expiry, replacement, and impact without alarmism. | Compliance | REP, ACC, ONB | NO | Create new | High | valid, expiring, expired, replacement, superseded | current, attention, blocked, review | document, policy, lifecycle | date visibility, action | warning, error, success, restricted | expiry date and impact explicit | wrap dates/actions | renew/replace/support | M | M | High |
| CO06 | KYC / Verification Status | Summarize external verification progress, result, failure reason class, and recovery. | Compliance | AUTH, ONB, ACT, ACC | PARTIAL | Extend Status Summary | Critical | PAN, CKYC, Aadhaar, bank, penny drop, exchange | pending, verifying, approved, failed, retry, manual-review, expired | verification vendors, compliance, support | progress, retry, owner | pending, success, error, warning, unknown | do not expose sensitive vendor rationale | stack status/action | polling, retry, human escalation | L | M | High |
| CO07 | FATCA / CRS Declaration Summary | Present declaration status and correction/review actions. | Compliance | ONB, ACC, REP | NO | Create new composite | Critical | FATCA, CRS, tax residency | incomplete, submitted, under-review, accepted, rejected, expired | tax, consent, document, policy | field visibility, status | legal, warning, error, success | questions and legal text accessible | stack declaration details | edit/resubmit with audit | L | L | Medium |
| CO08 | Tax Residency / DTAA Row | Show jurisdiction, evidence, treaty context, validity, and safe action. | Compliance | ONB, REP, ACC, DISC, INV | NO | Create new | High | tax residency, DTAA, TRC, Form 10F | missing, current, pending, expired, restricted, superseded | tax, document, policy, country | visibility, expiry | legal, warning, restricted, unknown | jurisdiction and dates explicit | stack metadata | opens evidence/context | L | L | Medium |

## 8. Security Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SE01 | Step-Up Authentication Prompt | Require additional proof for sensitive or high-risk action. | Security | AUTH, INV, ORD, ACC, REP | PARTIAL | Extend OTP/security pattern | Critical | OTP, biometric, password, recovery | required, verifying, failed, expired, locked, success | risk, session, device, identity | method visibility, timer | security, focus, error, warning | error/retry announced, no secrets exposed | mobile-friendly challenge | challenge, success, cancel, recover | L | M | High |
| SE02 | Session List Row | Show active sessions, device, location approximation, last active, and revoke action. | Security | AUTH, ACC | NO | Create new | High | current, other, suspicious | active, expired, revoked, suspicious, unknown | session, device, security | masking, action visibility | warning, error, success, unknown | sensitive location minimized, action labels | stack metadata | revoke with confirmation | L | M | Medium |
| SE03 | Trusted Device Row | Show device trust, last used, expiry, and revoke action. | Security | AUTH, ACC | NO | Create new | High | trusted, pending, expired, revoked | active, pending, expired, revoked, suspicious | device trust, session, identity | visibility, expiry | security, warning, success, error | no raw device identifiers | stack metadata | trust/revoke/recovery | L | M | Medium |
| SE04 | Security Activity Row | Show security event, time, device context, and response action. | Security | AUTH, ACC | PARTIAL | Extend Activity Row | High | login, password, device, recovery, alert | success, failed, blocked, unknown, reviewed | audit, security, session | masking, action visibility | security, warning, error, unknown | event and response accessible | stack event details | open event, report issue | M | M | Medium |
| SE05 | Masked Sensitive Data Block | Safely display identity, bank, tax, and account data with reveal policy. | Security | AUTH, ONB, INV, ORD, REP, ACC | PARTIAL | Extend Masked Input | Critical | masked, revealed, copy-disabled, step-up | hidden, revealed, expired, restricted | entitlement, step-up, audit | mask, reveal timer, copy | restricted, focus, content, warning | reveal state announced, copy policy clear | preserve masking on all widths | step-up reveal, auto-remask | M | M | High |
| SE06 | Security Alert Banner | Surface suspicious activity, compromised device, or mandatory security action. | Security / Feedback | HOME, AUTH, ACC, ALL | PARTIAL | Extend Alert | Critical | informational, warning, urgent | active, acknowledged, resolved, expired | security, notifications, support | priority, dismissibility | warning, error, security, focus | urgent alert announced and not dismiss-only | full-width and persistent as required | open recovery/security center | L | M | High |
| SE07 | Recovery Status Card | Explain recovery request state, wait period, next step, and support path. | Security | AUTH, ACC | NO | Create new | Critical | email, mobile, device, account | requested, verifying, pending, approved, rejected, expired, escalated | identity, device, support, audit | timer, action visibility | pending, success, error, warning, restricted | time and next action explicit | stack details/actions | polling, cancel where allowed, support | L | M | Medium |

## 9. Feedback Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FB01 | Alert / Banner | Communicate scoped information, warnings, restrictions, freshness, or recovery. | Feedback | All | YES | Reuse and extend semantic variants | Critical | info, warning, error, success, restriction, freshness | visible, dismissible, persistent, loading, resolved | lifecycle, freshness, entitlement | priority, dismissibility | info, warning, error, success, restricted | live region only when appropriate, clear heading | full-width, long-copy safe | dismiss, open detail, action | M | M | Very High |
| FB02 | Toast / Snackbar | Confirm low-risk transient completion without carrying critical information alone. | Feedback | All | YES | Reuse with strict usage rules | High | success, info, undo, error | queued, visible, dismissed | event, routing | duration, queue | success, info, error, focus | not sole error channel, accessible timing | full-width mobile | action/undo where safe | S | S | Very High |
| FB03 | Confirmation Dialog | Confirm destructive, irreversible, financial, consent, revoke, or discard actions. | Feedback | AUTH, ONB, INV, ORD, REP, ACC | YES | Reuse and extend | Critical | destructive, consent, revoke, discard, step-up | open, submitting, error, success, cancelled | action policy, entitlement, audit | focus trap, button visibility | surface, warning, destructive, focus | labelled dialog, focus return, explicit consequence | viewport-fit, scroll body | confirm/cancel, idempotent submit | M | M | Very High |
| FB04 | Bottom Sheet / Modal | Present contextual filters, details, help, actions, or secure confirmation. | Feedback | All | YES | Reuse and extend | High | action sheet, filter, detail, help | open, loading, error, blocked | navigation, focus, entitlement | height, overlay, visibility | surface, overlay, focus, restricted | modal semantics, escape/back handling | full-screen mobile, modal desktop | open/close, focus return | M | M | High |
| FB05 | Progress Indicator | Show determinate or indeterminate progress for onboarding, upload, generation, or recovery. | Feedback | ONB, ACT, INV, ORD, REP, ACC | YES | Reuse and extend | Critical | linear, circular, step progress, time estimate | active, delayed, paused, failed, completed | job state, lifecycle, API | progress, label, visibility | action, pending, warning, error, success | value and status announced, no animation-only meaning | text fallback, no overflow | poll, retry, completion | M | M | Very High |
| FB06 | Inline Validation | Connect field errors, warnings, and corrective guidance to the source. | Feedback | AUTH, ONB, INV, ORD, REP, ACC | YES | Reuse and extend | Critical | error, warning, success, helper | hidden, visible, loading, resolved | validation, policy | visibility, message height | error, warning, success, focus | described-by association, focus target | long messages wrap | validate on submit/blur per spec | S | S | Very High |
| FB07 | Offline / Data Delay Banner | Explain offline mode, stale data, or source delay and safe actions. | Feedback | HOME, PORT, DISC, ORD, REP, ACC | PARTIAL | Extend freshness/error banner | Critical | offline, delayed, stale, partial outage | active, retrying, resolved, restricted | network, freshness, source | retry visibility, timestamp | warning, unknown, error, info | announced without stealing focus | persistent but non-blocking | retry, view last valid data | M | M | High |
| FB08 | Retry / Recovery Action Group | Offer safe retry, wait, correct, support, or reconciliation paths. | Feedback | AUTH, ONB, ACT, INV, ORD, REP, ACC | NO | Create new composite | Critical | retry, refresh, wait, correct, support, reconcile | available, submitting, blocked, escalated, completed | lifecycle, idempotency, support, entitlement | action visibility, loading | action, warning, error, unknown, restricted | action order conveys safety; labelled consequences | stack actions | idempotent retry and support handoff | L | M | Very High |

## 10. Support Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SP01 | Support Case Timeline | Show case events, owner changes, requests, and resolutions. | Support | HOME, ORD, REP, ACC | NO | Create new composite | High | case, complaint, escalation, callback | open, waiting, escalated, resolved, closed, error | support, SLA, audit | grouping, visibility | content, support, warning, success | chronological semantics, author/action labels | stack metadata | add reply, upload, open event | L | M | Medium |
| SP02 | Support Case Status | Show case ID, priority, owner, SLA, and user action. | Support | HOME, ORD, REP, ACC | NO | Create new | High | open, pending, waiting-user, escalated, resolved | current, overdue, blocked, completed | support, SLA, entitlement | priority, timer, visibility | support, warning, error, success | status and due time text | wrap long titles | open case, escalate | M | M | Medium |
| SP03 | RM / Contact Card | Show assigned RM or support channel, scope, availability, and safe contact action. | Support | HOME, INV, REP, ACC | NO | Create new | Medium | RM, support, tax specialist, operations | available, unavailable, restricted, escalated | CRM, consent, support, entitlement | contact visibility, availability | support, restricted, focus | contact method and availability labelled | stack contact actions | call/chat/callback deep link | L | M | Medium |
| SP04 | Support Context Bundle | Carry safe correlation, status, and selected artifact context into human support. | Support | INV, ORD, REP, ACC | NO | Create new composite | Critical | order, payment, report, compliance, security | draft, consent-required, shared, expired, revoked | support, consent, audit, lifecycle | selected items, masking | security, legal, restricted, focus | explain what will be shared; no raw secrets | stack context | consent, submit, confirmation | XL | L | High |
| SP05 | Help Article Row | Present contextual help/search result with category and applicability. | Support | AUTH, ONB, INV, ORD, REP, ACC | PARTIAL | Extend List Row | Medium | article, FAQ, regulatory, troubleshooting | available, stale, restricted, unavailable | help CMS, search, country policy | relevance, visibility | content, focus, restricted | descriptive title, category, reading order | wrap titles | open article, return context | M | S | Medium |
| SP06 | Chat Composer | Send support messages with attachments and safe context. | Support | ACC, ORD, REP | NO | Create new | Medium | text, attachment, escalation | empty, typing, sending, failed, disabled, restricted | support, consent, attachment, moderation | character count, attachment visibility | surface, focus, error, restricted | labelled input, send status, attachment names | multiline growth, keyboard behavior | send/retry, attachment | L | M | Low |
| SP07 | Callback Request Form | Request a callback with preferred time, channel, and issue context. | Support | ACC, ORD, REP | NO | Create new | Medium | callback, RM meeting, complaint | empty, submitted, unavailable, expired, error | support, calendar, consent, country | time window, visibility | surface, focus, warning, error, success | time zone and consent explicit | date/time picker adapts | submit, confirmation, reschedule | L | M | Low |

## 11. Reports, Documents, and Delivery Components

| ID | Component Name | Purpose | Category | Appears In Modules | Reuse Existing? | Implementation Action | Priority | Variants Required | States Required | Dependencies | Variables Required | Tokens Required | Accessibility Requirements | Responsive Behaviour | Prototype Behaviour | Engineering Complexity | Design Complexity | Estimated Reuse Frequency |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RD01 | Document Viewer | Preview report, statement, agreement, or compliance artifact with metadata. | Reports / Documents | ONB, ORD, REP, ACC | YES | Reuse and extend | Critical | PDF, HTML, image, text, secure | loading, ready, expired, revoked, restricted, error | artifact, document, entitlement, audit | zoom, page, toolbar visibility | surface, focus, restricted, warning | semantic document structure, keyboard navigation, text alternative | reflow or horizontal document viewport | page navigation, download/share | XL | L | High |
| RD02 | Secure Download Action | Start a scoped, audited, permission-aware artifact download. | Reports / Documents | ORD, REP, ACC | YES | Reuse and extend | Critical | direct, generated, secure-link | available, generating, pending, expired, revoked, failed | artifact, download job, entitlement, consent | progress, expiry, visibility | action, pending, error, restricted | action name, file type/size, status announced | full-width action | generate, download, retry, open centre | L | M | High |
| RD03 | Download Job Row | Show generation/download state, artifact identity, expiry, and recovery. | Reports / Documents | ORD, REP, ACC | NO | Create new | High | report, receipt, bulk export, scheduled | queued, generating, ready, failed, expired, cancelled | report, artifact, job, notification | progress, expiry, action | pending, success, error, warning, restricted | status and action accessible | stack metadata/actions | L | M | High |
| RD04 | Share Report Dialog | Share a scoped, expiring report or artifact with explicit consent. | Reports / Documents | REP, ACC | NO | Create new controlled composite | High | secure link, approved recipient, tax consultant | draft, consent, active, revoked, expired, failed | consent, recipient, artifact, audit, notification | recipient, expiry, scope, visibility | legal, security, warning, error, focus | consequence, recipient, expiry, revoke path | responsive form | create/revoke audited share | XL | L | Medium |
| RD05 | Schedule Report Form | Configure periodic report generation/delivery with scope and preference controls. | Reports / Documents | REP, ACC | NO | Create new | Medium | monthly, quarterly, annual, event-based | draft, active, paused, failed, expired, revoked | report, notification, consent, scheduler | frequency, scope, visibility | legal, action, warning, error | schedule consequence and time zone explicit | stack controls | create/pause/resume/cancel | XL | L | Low |
| RD06 | Artifact Metadata / Lineage | Expose source snapshot, freshness, finality, policy version, amendment lineage, and hash where required. | Reports / Documents | ORD, REP, ACC | NO | Create new composite | Critical | source, finality, amendment, audit | current, provisional, final, amended, superseded, revoked | report, source, audit, policy | metadata visibility, expand state | content, warning, legal, unknown | readable definitions and table alternative | progressive disclosure | expand lineage, open evidence | L | L | High |
| RD07 | Report Readiness Status | Explain whether a report is ready, pending generation, partial, or blocked. | Reports / Documents | HOME, REP | PARTIAL | Extend Report Card/Progress | Critical | ready, pending, partial, blocked, unavailable | loading, current, stale, failed, restricted | report, tax, document, source | progress, action visibility | success, pending, warning, error, restricted | status and next step explicit | stack action | generate/retry/support | L | M | High |
| RD08 | Tax Finality Block | Distinguish provisional, final, amended, and unavailable tax values. | Reports / Compliance | REP, PORT | NO | Create new | Critical | provisional, final, amended, unavailable | current, stale, correction-required, restricted | tax, policy, report, audit | disclosure, visibility | legal, warning, error, success, unknown | finality and limitation announced | stack disclosure | open methodology/correction | L | M | High |
| RD09 | TDS Status Row | Show withholding amount, status, source, period, and certificate availability. | Reports / Compliance | REP, ORD | NO | Create new | High | deducted, pending, certificate-ready, disputed | current, pending, unavailable, corrected | tax, payment, artifact, source | amount, period, visibility | financial, legal, warning, unknown | amount/period/source explicit | stack metadata | open certificate/detail | L | M | Medium |

## Component Creation Priority

Priority is based on cross-module reuse, safety, state density, and dependency order. A component is not “complete” merely because its default state is drawn.

| Build Phase | Component Families | Required Outcome |
|---|---|---|
| 0. Contract setup | Lifecycle state vocabulary, entitlement properties, state names, semantic Variables, token aliases | All later components can consume authoritative states without inventing local statuses. |
| 1. Foundation | F01-F08 | Stable shell, layout, typography hooks, actions, focus behavior, and naming conventions. |
| 2. Navigation | N01-N08 | Stable module navigation, deep links, scope return, and responsive navigation. |
| 3. Forms | FR01-F15 | Validated, accessible identity, regulatory, financial, preference, and upload entry patterns. |
| 4. Feedback | FB01-F08, CA02-CA05 | Loading, empty, error, offline, pending, restricted, recovery, and confirmation behavior. |
| 5. Data display | DD01-DD10 | Lists, tables, filters, sort, disclosure, status, and provenance surfaces. |
| 6. Financial primitives | FI01-F04, FI09-F13 | Safe money formatting, value states, performance, amounts, payments, fees, and order summaries. |
| 7. Compliance and security | CO01-CO08, SE01-SE07 | Eligibility, KYC, documents, consent, tax residency, step-up, sessions, devices, and recovery. |
| 8. Financial composites | FI05-F08, FI14-F17 | Portfolio, holdings, charts, activity, gains, and tax readiness. |
| 9. Reports and delivery | RD01-RD09 | Document preview, artifact truth, download, sharing, scheduling, lineage, tax finality, and TDS. |
| 10. Support | SP01-SP07 | Human intervention, safe context sharing, case tracking, chat, and callback recovery. |
| 11. Module composition | Approved screens one module at a time | Replace local placeholders with library instances and validate cross-module states. |

## Build Order Rules

1. Build the smallest stable primitive before composing a complex component.
2. Build default, loading, empty, error, offline, restricted, suspended, pending, expired, and success states before wiring module screens.
3. Build semantic Variables and Tokens before visual variants.
4. Build and QA mobile Auto Layout before desktop adaptations when the approved screen is mobile-first.
5. Build accessible table/chart alternatives in the same increment as the visual data component.
6. Build permission and lifecycle projections into components, not as screen-specific overlays.
7. Publish a shared component only after component-level QA and naming review.
8. Replace temporary local components before module completion; report any exception as a blocker.

## Top 50 Highest-Reuse Components

Ranked by cross-module frequency, state density, safety impact, and likelihood of reuse in future asset-class expansion.

| Rank | Component ID | Component | Rationale |
|---:|---|---|---|
| 1 | F07 | Button | Primary action surface across every module and recovery path. |
| 2 | F01 | App Shell | Governs all authenticated and state-aware experiences. |
| 3 | F02 | Page Header | Required for every screen and deep-link context. |
| 4 | CA01 | Base Card | Shared grouping surface for nearly every module. |
| 5 | DD04 | Status Badge / Chip | Encodes lifecycle, eligibility, finality, and operational states. |
| 6 | FB01 | Alert / Banner | Carries restrictions, delays, freshness, and recovery messaging. |
| 7 | DD01 | Data List / Row | Reused for funds, holdings, orders, reports, documents, sessions, and support. |
| 8 | CA02 | Empty State Card | Required for safe no-data and no-eligibility behavior. |
| 9 | CA03 | Error State Card | Localized failure and recovery across modules. |
| 10 | FB03 | Confirmation Dialog | Financial, security, consent, revoke, destructive, and discard actions. |
| 11 | FR01 | Text Input | Broad form coverage. |
| 12 | FR05 | Select / Combobox | Country, funds, tax, account, scope, and filter choices. |
| 13 | FR08 | Date / Financial Year Selector | Orders, reports, tax, schedules, and history. |
| 14 | DD06 | Disclosure / Expandable Section | Progressive disclosure of methodology, legal text, details, and history. |
| 15 | FB05 | Progress Indicator | Onboarding, verification, upload, report generation, and recovery. |
| 16 | FB06 | Inline Validation | Prevents unsafe or incomplete submission. |
| 17 | F08 | Link | Cross-module navigation and contextual help. |
| 18 | N04 | Tabs | Sibling views in portfolio, reports, activity, and account. |
| 19 | DD03 | Key-Value List | Detail, identity, order, report, and account metadata. |
| 20 | DD02 | Data Table | Financial records, fund comparisons, transactions, and tax data. |
| 21 | DD09 | Filter Bar | Discovery, activity, portfolio, reports, and account records. |
| 22 | DD10 | Filter Sheet | Accessible multi-filter interaction. |
| 23 | FR09 | Radio Group | Account, risk, residency, and bounded choices. |
| 24 | FR10 | Checkbox | Consent, declarations, terms, and multi-select. |
| 25 | FR12 | Consent / Legal Acknowledgement | Compliance and high-consequence actions. |
| 26 | FR13 | File Upload | KYC, tax, bank, and replacement evidence. |
| 27 | FR02 | OTP Input | Identity and step-up verification. |
| 28 | FR04 | Masked Sensitive Input | PAN, bank, tax, and identity protection. |
| 29 | CO01 | Eligibility / Restriction Notice | Prevents hidden eligibility and compliance surprises. |
| 30 | CO04 | Document Row | Shared document identity/status/action pattern. |
| 31 | CO06 | KYC / Verification Status | Identity, onboarding, activation, and bank verification. |
| 32 | SE01 | Step-Up Authentication Prompt | Sensitive financial and security operations. |
| 33 | SE05 | Masked Sensitive Data Block | Privacy and reveal control across the product. |
| 34 | FB07 | Offline / Data Delay Banner | Preserves financial truth under stale or unavailable data. |
| 35 | FB08 | Retry / Recovery Action Group | Standardizes safe recovery without duplicate side effects. |
| 36 | FI01 | Financial Metric | Shared value/source/freshness display. |
| 37 | FI02 | Currency Value | Money formatting and multi-currency foundation. |
| 38 | FI03 | Gain / Loss Value | Core investment and tax communication. |
| 39 | FI10 | Order Summary | Investment and activity center truth. |
| 40 | FI11 | Payment Summary | Payment/order distinction and recovery. |
| 41 | FI14 | Activity Timeline | Correlated financial activity and audit-safe explanation. |
| 42 | FI15 | Chart With Data Table | Accessible performance, allocation, and comparison. |
| 43 | FI08 | Portfolio Scope Selector | Investor, account, folio, and household context. |
| 44 | RD01 | Document Viewer | Reports, statements, agreements, and compliance artifacts. |
| 45 | RD02 | Secure Download Action | Controlled and auditable evidence delivery. |
| 46 | RD06 | Artifact Metadata / Lineage | Trust, source, finality, amendment, and audit visibility. |
| 47 | CA05 | Status Summary Card | Shared lifecycle/readiness projection. |
| 48 | SP04 | Support Context Bundle | Prevents repetitive and unsafe support handoffs. |
| 49 | N07 | Back / Close Navigation | Predictable nested and transient-context return. |
| 50 | N06 | Global Search Trigger | Cross-module discovery and future expansion. |

## Design System Growth Plan

### Library primitives

The following should become foundational published library primitives because they have stable semantics, high reuse, and low domain coupling:

- F01-F08 foundation and action primitives.
- N01-N08 navigation primitives.
- FR01-F15 form primitives, excluding domain-specific business rules from the visual component.
- DD01-DD10 data display primitives.
- CA01-CA05 state and surface primitives.
- FB01-F08 feedback and recovery primitives.
- FI01-F03 financial formatting primitives.
- CO02, CO04, CO05, SE01, SE05 as state-aware shared primitives.

These primitives must expose component properties for labels, content visibility, state, loading, disabled, restricted, and action slots without encoding product-specific policy in the component.

### Composite library components

The following should become published composite components after their source contracts are stable:

- CA05-CA10 status, task, product, holding, report, and support cards.
- FI04-F17 performance, allocation, holdings, order, payment, activity, gains, and tax composites.
- CO01, CO03, CO06-CO08 compliance composites.
- SE02-SE07 security and recovery composites.
- SP01-SP07 support composites.
- RD01-RD09 reports, artifacts, secure delivery, tax finality, and TDS composites.

Composite components may combine primitives, but must not hide domain state or entitlement decisions. Inputs should be explicit projections from the owning service.

### Screen compositions

The following should remain screen-level compositions, not global primitives:

- Home adaptive slot compositions.
- Portfolio page composition and section ordering.
- Discovery recommendation collections and fund-detail composition.
- Investment Journey step compositions.
- Activity Center page composition.
- Reports dashboard composition.
- Account and Service Hub overview composition.
- Module-specific review and confirmation compositions.

Screen compositions may use library components and local layout composition. They must not create permanent local copies of reusable components.

### Library governance

- New components require evidence of failed reuse/extension attempts.
- Component names must follow the existing repository/Figma naming convention.
- Components must include variants, states, accessibility notes, responsive behavior, and engineering mapping.
- Shared components must be versioned when a change could affect locked modules.
- Deprecated components remain available until all approved module instances migrate.
- A component update that changes semantics requires review under the Conflict Resolution protocol in `10_CLAUDE_EXECUTION_OS.md`.

## Implementation Summary

| Metric | Value |
|---|---:|
| Total Components | 107 |
| Existing Components | 40 |
| Components to Extend | 27 |
| New Components | 40 |
| Expected Variant Count | 304 named variants/properties, to be validated during Figma audit |
| Expected Token Growth | 26 semantic token families plus module-specific aliases where required |
| Expected Variable Growth | 52 variables across spacing, sizing, visibility, state, responsive behavior, data display, and interaction |
| Estimated Library Expansion | 107 total reusable component sets: 40 reused, 27 extensions, and 40 new component sets, subject to Figma audit |

### Count methodology

- `Existing Components` counts components whose approved specifications explicitly name an existing design-system or shared component and can be reused without a component-level extension after Figma audit.
- `Components to Extend` counts named existing/shared components that require additional states, variants, accessibility, financial semantics, or responsive behavior.
- `New Components` counts domain composites not represented by the approved shared component references.
- The three implementation counts sum to the total matrix: `40 + 27 + 40 = 107`.
- The expected variant, token, variable, and library counts are planning estimates. Claude must update them after inspecting Figma and must record the evidence in the module Implementation Report.

## Claude Code Completion Requirements

Before implementing a screen, Claude must map each required component to one matrix ID. If no ID fits, Claude must stop and propose a matrix amendment before creating a permanent component.

Before marking a module complete, Claude must verify:

- Every matrix component used by the module is a published library component or an approved instance.
- Every temporary component has been replaced or is explicitly reported as a blocker.
- All component states required by the target specification are represented.
- Variables and semantic tokens are bound; hard-coded values are not used where a variable exists.
- Auto Layout, responsive behavior, keyboard/focus behavior, and assistive technology behavior are tested.
- Financial, compliance, security, permission, freshness, and recovery states remain semantically distinct.
- The module Implementation Report follows `10_CLAUDE_EXECUTION_OS.md`.
