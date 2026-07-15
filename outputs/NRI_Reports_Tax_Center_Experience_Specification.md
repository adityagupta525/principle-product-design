# NRI WealthTech Platform
## Reports & Tax Center Experience

**Document type:** Product experience and implementation specification
**Role:** Founding Product Leadership Team
**Status:** Extension of locked Authentication, Onboarding, Activation, Home, Portfolio, Fund Discovery, Investment Journey, Orders & Activity Center, and Cross-Module Lifecycle & Entitlement Contract
**Scope:** Financial intelligence, performance reporting, investment history, gains, tax context, DTAA evidence, compliance documents, secure delivery, and report readiness
**Constraint:** No visual UI, colours, typography, pixel measurements, or final screen styling are defined here.

## 0. Contract Alignment

This module consumes and does not redefine the locked state machines for identity, consent, compliance, eligibility, portfolio data, orders, payments, documents, reports, notifications, support, and entitlements.

### Reports & Tax Center owns

- Report discovery and report-specific context.
- Performance, holdings, transaction, gains, and tax report projections.
- Tax readiness and missing-data visibility.
- DTAA document status and compliance document navigation.
- Report detail, finality, source, version, and amendment explanation.
- Secure delivery preferences and report scheduling orchestration.

### Reports & Tax Center does not own

- Portfolio, order, payment, tax law, DTAA legal interpretation, compliance approval, document validity, or download artifact truth.
- Final tax liability or professional tax advice.
- Corrections to financial records without the owning service.
- Permission decisions; it consumes resource-scoped entitlements.

### Reuse decisions

- O04 Download Centre remains the shared artifact-management destination.
- O02 Activity Detail remains the authoritative transaction/order timeline.
- P01-P05 Portfolio screens remain the authoritative holdings/performance workspace; Reports provides period-based, exportable, and filing-oriented projections.
- R-series screens provide report and tax intelligence without creating duplicate financial truth.

## 1. Product Definition

Reports & Tax Center is the user’s financial intelligence and compliance workspace. It helps users understand performance and history, verify financial data, prepare tax information, manage DTAA evidence, and securely share authoritative reports.

It must answer:

1. What did I own and when?
2. What changed in my investments?
3. What are my realized and unrealized gains?
4. What information is final, provisional, estimated, stale, or missing?
5. What tax or compliance action requires attention?
6. Which report or document should I download or share?

## 2. Minimum Screen Architecture

| ID | Screen | Responsibility |
|---|---|---|
| R01 | Reports Dashboard | Orient users to financial insight, tax readiness, report status, and attention items |
| R02 | Report Explorer | Browse holdings, transactions, statements, reports, search, filters, and period/scope context |
| R03 | Gains & Tax Center | Review realized/unrealized gains, capital gains, TDS, tax estimates, and filing preparation context |
| R04 | DTAA & Compliance Workspace | Manage DTAA evidence, tax residency context, compliance documents, validity, and review status |
| R05 | Report Detail & Delivery | View a report, inspect provenance/finality, download/share/schedule, and open artifact history |

Download management uses the approved O04 Download Centre. R05 deep-links to O04 for generation history and secure artifact retrieval instead of duplicating it.

### Why five screens

- R01 is the orientation and attention surface.
- R02 supports structured financial history and report discovery.
- R03 is a specialized gains/tax decision workspace with different data and language risk.
- R04 handles evidence and compliance obligations rather than calculations.
- R05 makes each report understandable and deliverable.

## 3. Reporting Philosophy

Reports are not decorative PDFs. They are explainable financial records with scope, period, source, calculation method, finality, and amendment lineage.

The experience should reduce uncertainty, not hide it. A report with missing cost basis, partial RTA data, provisional TDS, or stale NAV must say so clearly and identify the next safe action.

## 4. Financial Truth Principles

1. Portfolio, transaction, tax, order, payment, and report data are related but not identical.
2. Every value identifies source, as-of time, scope, currency, method, and finality.
3. Realized gains require settled transactions and cost-basis rules; unrealized gains require current valuation and cost basis.
4. Contributions, withdrawals, income, tax, fees, and market movement must not be collapsed into one return number.
5. A report is final only when its required sources and calculation rules are final.
6. Corrections create amendments and lineage; they do not erase prior reports or activity.
7. Missing data is not zero. Estimated data is not final. Stale data is not current.
8. A statement can be authoritative for its period while current portfolio values remain delayed.
9. Currency conversion is a calculation with source/date, not a cosmetic display choice.
10. Users can trace a report summary to holdings, transactions, and source evidence.

## 5. Data Freshness Strategy

### Freshness dimensions

- Source as-of time.
- Ingestion time.
- Calculation time.
- Policy/rule version.
- Reconciliation state.
- Finality state.
- Report generation time.

### Freshness categories

`FRESH`, `RECENT`, `STALE`, `PARTIAL`, `ESTIMATED`, `SOURCE_UNAVAILABLE`, `RECONCILIATION_REQUIRED`, `CORRECTED`, `AMENDED`, `UNKNOWN`.

### Rules

- Each domain defines its own freshness threshold.
- A report cannot silently inherit freshness from an unrelated source.
- Data delay is shown beside the affected metric, not only in a global banner.
- Historical final reports remain valid even when current data is delayed.
- A stale input may generate a provisional report only when policy permits and the report labels its limitations.

## 6. Performance Communication Principles

- Every return has a period and calculation method.
- Separate contributions, withdrawals, dividends/IDCW, fees, taxes, and market movement.
- Use XIRR/time-weighted returns only where input data is complete and method is defined.
- Label benchmark and comparison basis.
- Negative performance is shown plainly without positive framing.
- Do not imply that past performance predicts future returns.
- Realized gain is not the same as cash received or tax liability.
- Unrealized gain changes with valuation source and date.

## 7. Tax Communication Principles

- Clearly distinguish education, estimate, source-confirmed record, provisional report, and final report.
- Use country and tax-residency context, not country of residence alone.
- State whether TDS is deducted, estimated, source-reported, or under correction.
- DTAA eligibility, treaty application, and tax savings are not guarantees.
- PFIC/FAPI, FATCA/CRS, Form 10F, TRC, Form 15CA/15CB, and Form 67 language requires approved legal/tax content.
- Do not produce tax advice from generic AI language.
- Identify when a qualified tax professional is recommended.
- Show the relevant financial year, tax year, currency, and rule version.

## 8. Investor Trust Principles

- Report title, scope, period, source, finality, and last updated time are visible before download.
- Users can verify the report against Portfolio and Orders & Activity.
- Missing inputs are listed with ownership and recovery path.
- A corrected report explains what changed and why.
- Sharing is explicit, scoped, expiring, and revocable where supported.
- Compliance documents are visible as requirements and statuses, not unexplained red badges.
- Tax readiness never implies tax filing completion.

## 9. Information Hierarchy

1. Security, legal hold, compliance, or tax action required.
2. Data quality and financial certainty.
3. Period, scope, currency, and report context.
4. Financial insight: value, performance, gains, transactions, TDS.
5. Missing information and readiness blockers.
6. Report/document action and proof.
7. Methodology, education, and optional explanations.

## 10. Regulatory & Compliance Principles

1. Financial and tax records are resource-scoped and permissioned.
2. Tax residency and country context are separate, effective-dated entities.
3. Report calculations store input snapshot, source, rule version, calculation version, and reviewer where applicable.
4. DTAA evidence and compliance documents have validity, expiry, review, and supersession states.
5. Export/share requires stronger entitlement than view.
6. Privacy, consent, cross-border processing, retention, legal hold, deletion, and audit rules apply to every report and artifact.
7. Tax and compliance language must be approved for launch countries and dated.
8. Customer-facing report status must not disclose sensitive AML, sanctions, fraud, or reviewer rationale.
9. Report generation and download events are audited.
10. The platform must not claim filing, treaty application, or tax savings without authoritative confirmation.

## 11. Accessibility Strategy

- Reports use semantic headings, tables, captions, and text alternatives.
- Charts have accessible data tables and summaries.
- Gains, losses, zero, estimates, and currencies are announced with meaning.
- Filters and financial-year selectors are keyboard accessible and preserve focus.
- Document viewers and PDFs have accessible structure and meaningful metadata.
- Legal/tax content is readable at zoom and supports long translated strings.
- Dynamic data delay, amendment, and report-ready updates are announced once.
- Sharing, download, revoke, and scheduled-report controls expose consequences.

## 12. Future Scalability

The reporting model separates common reporting concepts from product-specific extensions.

### Shared reporting concepts

Scope, period, instrument, position, transaction, valuation, cash flow, gain/loss, tax event, withholding, document, evidence, policy, source, finality, amendment, delivery, and consent.

### Product-specific extensions

- Mutual funds: folio, NAV, units, IDCW, SIP, capital gains, RTA, TDS.
- ETFs: exchange fills, bid/ask, brokerage, settlement, corporate actions.
- Bonds: coupon, accrued interest, maturity, yield, issuer events.
- PMS/AIF: capital calls, drawdowns, lock-in, manager valuation, investor eligibility.
- Global investments: local tax, FX, custody, market, foreign reporting, time zone.
- NPS: PRAN, allocation, lock-in, CRA statements, withdrawal conditions.
- Insurance-linked products: premium, policy value, surrender, claims, protection and policy documents.

New products MUST declare reporting, tax, proof, freshness, permissions, and amendment capabilities before they appear in the shared center.

## 13. Report and Tax States

### Report states

`NOT_REQUESTED`, `REQUESTED`, `QUEUED`, `GENERATING`, `READY_PROVISIONAL`, `READY_FINAL`, `SOURCE_REVIEW`, `STALE`, `PARTIAL`, `FAILED`, `EXPIRED`, `RESTRICTED`, `AMENDED`, `REVOKED`.

### Tax states

`NOT_STARTED`, `DATA_COLLECTING`, `DATA_INCOMPLETE`, `ESTIMATE_AVAILABLE`, `SOURCE_CONFIRMED`, `PROVISIONAL`, `FINAL`, `AMENDED`, `REVIEW_REQUIRED`, `COUNTRY_RESTRICTED`, `PROFESSIONAL_REVIEW_RECOMMENDED`, `EXPIRED`.

### Compliance document states

`NOT_SUBMITTED`, `UPLOADED`, `UNDER_REVIEW`, `APPROVED`, `APPROVED_WITH_RESTRICTIONS`, `MORE_INFORMATION_REQUIRED`, `REJECTED`, `EXPIRED`, `REPLACEMENT_REQUIRED`, `SUPERSEDED`, `REVOKED`.

## 14. Cross-Module Authority Rules

- Portfolio owns current holdings and performance workspace truth.
- Orders & Activity owns activity correlation and lifecycle investigation.
- Reports owns report projection, calculation context, artifact metadata, and tax-readiness projection.
- Tax service owns tax calculations, rules, source data, and finality.
- Compliance owns DTAA and regulatory review decisions.
- Document service owns evidence versions, validity, retention, and scan/review state.
- Download Centre owns artifact jobs, secure links, delivery history, and download audit.
- Notification service owns delivery, not report or tax state.

# R01 - Reports Dashboard

## 1. Screen Purpose

Orient the user to financial intelligence, report readiness, tax attention, compliance documents, and available report actions.

## 2. User Goal

Know what is ready, what is delayed or incomplete, what requires attention, and which report to open next.

## 3. Business Goal

Increase report usage, tax readiness, self-service resolution, and trust in financial records.

## 4. Entry Conditions

Authenticated session from navigation, Home, Portfolio, Orders & Activity, notification, or deep link. Scope may be investor, account, folio, or household.

## 5. Exit Conditions

Report Explorer, Gains & Tax Center, DTAA & Compliance, Report Detail, O04 Download Centre, Portfolio, Orders & Activity, or Support.

## 6. Layout Structure

Top to bottom: scope and period context; data freshness/attention banner; report readiness summary; performance/gains snapshot; tax readiness cards; DTAA/document attention; recent reports/downloads; report categories and help.

## 7. Information Hierarchy

Compliance/tax action and data-quality blockers first; then scope/period; then financial insight; then ready reports and downloads; then education.

## 8. Components

Existing: App Shell, Page Header, Card, Badge, Alert, Button, Link, Loading, Empty, Error, Progress, Status Panel.

New: Report Readiness Card, Tax Readiness Card, Data Freshness Summary, Compliance Attention Card, Report Category Card, Period/Scope Context Bar.

## 9. Screen States

First visit, returning user, no investments, reports ready, reports generating, tax incomplete, DTAA action required, portfolio stale, partial data, offline, source unavailable, restricted scope, suspended account, and error.

## 10. Validation

Dashboard cards must use current scope, period, entitlement, report, tax, document, and freshness metadata. Summary values must link to authoritative detail and cannot be independently calculated.

## 11. Error Handling

Localize failed cards. Distinguish no data, no report, incomplete data, stale source, restricted access, generation pending, and service error. Preserve available insight and provide detail/support paths.

## 12. Recovery Behaviour

Refresh affected source, complete missing profile/document, open tax/compliance detail, generate report, view last valid artifact, or contact support. No action required is a valid result.

## 13. Accessibility

Card headings expose status and next action. Summary values include scope, period, currency, and freshness. Dynamic readiness changes are announced once.

## 14. Analytics

`r01_viewed`, `report_category_opened`, `tax_readiness_opened`, `compliance_attention_opened`, `dashboard_freshness_opened`, `dashboard_report_requested`, `dashboard_support_selected`.

## 15. Engineering Notes

R01 is a projection over Portfolio, Tax, Compliance, Document, Report, Artifact, and Entitlement services. Each card returns source, freshness, finality, policy version, and allowed actions.

## 16. Acceptance Criteria

- User can identify ready, incomplete, stale, pending, and restricted reporting states.
- Dashboard never hides material tax/compliance action below promotional content.
- Scope and period are clear before numbers are read.
- Every summary links to authoritative detail.

# R02 - Report Explorer

## 1. Screen Purpose

Provide structured browsing, search, filters, sorting, period selection, and entry to holdings, transactions, statements, and generated reports.

## 2. User Goal

Find the correct financial record for a chosen period, scope, account, fund, transaction type, or report purpose.

## 3. Business Goal

Reduce report discovery friction and support requests while increasing accurate use of financial records.

## 4. Entry Conditions

From R01, Portfolio, Orders & Activity, notification, or direct navigation. Query may be blank or deep-linked with report type, period, account, or activity reference.

## 5. Exit Conditions

R03 gains/tax, R04 compliance documents, R05 report detail, O04 downloads, Portfolio, Orders & Activity, or Support.

## 6. Layout Structure

Top to bottom: report type selector; scope and financial-year/period selector; search; filters; sort; report/result list; freshness/finality metadata; empty/error state; download/detail actions.

## 7. Information Hierarchy

Report purpose, scope, period, and data state first; report identity and status second; source/finality and actions third.

## 8. Components

Existing: Tabs, Search, Filter, Sort, Date/Year Selector, List/Table, Badge, Button, Link, Empty, Error, Loading.

New: Report Type Selector, Financial Year Selector, Report Status Row, Source/Freshness Row, Report Purpose Label, Scope Filter.

## 9. Screen States

Holdings report, transaction report, statement list, report ready, generating, provisional, final, amended, no reports, no matching records, partial period, stale, offline, source unavailable, restricted, expired, and failed generation.

## 10. Validation

Report type, period, scope, currency, account, and filters must be compatible. Date/time uses explicit timezone. Search respects resource permissions and does not reveal restricted records.

## 11. Error Handling

Differentiate no records, no eligible report, incomplete source, generation failure, stale data, expired artifact, and restricted scope. Preserve query/filter state.

## 12. Recovery Behaviour

Clear incompatible filters, choose another period, retry generation, open last valid report, narrow scope, use O04, or open support.

## 13. Accessibility

Filter controls expose applied values and clear actions. Report lists are semantic tables/lists with status, period, scope, and action labels. Result updates preserve focus.

## 14. Analytics

`r02_viewed`, `report_type_selected`, `report_period_selected`, `report_scope_selected`, `report_search_submitted`, `report_filter_applied`, `report_sort_changed`, `report_opened`, `report_generation_started`, `report_empty_viewed`.

## 15. Engineering Notes

Explorer query API must return report type, scope, period, status, finality, source snapshot, policy version, artifact ID, and action entitlements. It must support cursor pagination and deterministic filters.

## 16. Acceptance Criteria

- Users can find holdings, transactions, statements, gains, and tax reports.
- Provisional, final, amended, stale, and unavailable records are distinct.
- Search and filters cannot bypass permission or retention rules.
- Deep links preserve period, scope, and report context.

# R03 - Gains & Tax Center

## 1. Screen Purpose

Explain realized/unrealized gains, capital gains, TDS, tax estimates, tax readiness, and filing preparation context without presenting tax advice as fact.

## 2. User Goal

Understand what gains occurred, what is still unrealized, what tax information is available, what is missing, and what requires professional review.

## 3. Business Goal

Increase tax-report usage and trust while reducing incorrect assumptions, tax disputes, and manual support.

## 4. Entry Conditions

Authenticated user with authorized portfolio/transaction/tax scope; selected financial year/period and country/tax residency context may be incomplete or pending.

## 5. Exit Conditions

R02 report explorer, R05 detail, R04 DTAA/compliance, Portfolio, Orders & Activity, secure download, tax consultant/support, or return to R01.

## 6. Layout Structure

Top to bottom: country/tax-year/scope context; data completeness and finality; realized gains; unrealized gains; capital-gains breakdown; TDS/withholding; DTAA/tax residency context; missing data/readiness; report and professional-help actions.

## 7. Information Hierarchy

Tax year, jurisdiction, finality, and data completeness first; realized/unrealized distinction second; gains/TDS details third; missing data and next action fourth.

## 8. Components

Existing: Tabs, Cards, Table, Chart with data table, Badge, Alert, Button, Link, Tooltip, Loading, Empty, Error.

New: Realized/Unrealized Split, Capital Gains Table, Tax Finality Block, TDS Status Row, Missing Tax Data Panel, Professional Review Notice, Tax Calculation Provenance.

## 9. Screen States

Final tax data, estimate available, provisional, incomplete cost basis, missing transactions, realized only, unrealized only, no taxable activity, tax residency incomplete, DTAA pending, country restricted, source delayed, stale, amended, offline, error, and professional review recommended.

## 10. Validation

Tax year, jurisdiction, tax residency, currency, cost basis, transaction settlement, TDS source, DTAA rule, and policy version are validated. Estimated values cannot be labelled final. Missing cost basis cannot be treated as zero.

## 11. Error Handling

Explain whether the issue is missing source data, calculation failure, policy restriction, tax residency gap, or amendment. Preserve last valid report and show affected metrics only.

## 12. Recovery Behaviour

Refresh sources, upload/correct evidence, complete tax residency/DTAA, download provisional report, request amendment review, or contact qualified tax support. Do not ask the user to manually alter a final record.

## 13. Accessibility

Tables expose row/column headers and totals. Gains/losses, estimates, tax year, currency, and finality are spoken clearly. Charts have text summaries. Tax disclaimers are reachable before action.

## 14. Analytics

`r03_viewed`, `tax_year_selected`, `tax_scope_selected`, `realized_gains_opened`, `unrealized_gains_opened`, `capital_gains_drilldown_opened`, `tds_opened`, `tax_data_gap_viewed`, `tax_provenance_opened`, `tax_professional_help_selected`.

## 15. Engineering Notes

Tax service owns calculations and rule versions. R03 consumes input snapshot, source freshness, cost-basis completeness, TDS records, DTAA state, jurisdiction, tax year, and finality. All derived values are reproducible.

## 16. Acceptance Criteria

- Realized and unrealized gains are unmistakably distinct.
- Estimate, provisional, source-confirmed, final, amended, and unavailable states are explicit.
- Tax year and jurisdiction are visible beside all tax values.
- Missing data explains impact and recovery.
- No content implies tax advice or guaranteed savings.

# R04 - DTAA & Compliance Workspace

## 1. Screen Purpose

Show tax residency, DTAA evidence, compliance documents, validity, review status, expiry, and required actions.

## 2. User Goal

Know which documents and declarations are current, what is under review, what is expiring, and how it affects reporting or tax treatment.

## 3. Business Goal

Improve evidence completeness, reduce expired-document incidents, and provide auditable regulatory-service visibility.

## 4. Entry Conditions

Authenticated user with permitted compliance/document scope; country and tax-residency context may be current, incomplete, or under review.

## 5. Exit Conditions

Document upload/replacement, R03 tax context, R05 document detail, Support/Compliance case, or return to R01.

## 6. Layout Structure

Top to bottom: country/tax residency context; status summary; DTAA evidence rows; FATCA/CRS/document rows where in scope; validity/expiry; review/replacement actions; audit-safe history; disclosures and support.

## 7. Information Hierarchy

Required action and expiry first; document/declaration identity and status second; impact on tax/reporting third; history and methodology last.

## 8. Components

Existing: Card, Status Badge, Timeline, Document Row, Upload, Alert, Button, Link, Loading, Empty, Error.

New: Tax Residency Context, DTAA Evidence Row, Document Validity Row, Expiry Notice, Review Ownership Block, Compliance Impact Notice.

## 9. Screen States

Not started, current/approved, under review, more information required, rejected, expired, replacement required, superseded, restricted, country unavailable, suspended, offline read-only, and service error.

## 10. Validation

Document type, jurisdiction, issuer, validity, scope, version, consent, and required declarations are server-authoritative. Do not infer DTAA applicability from residence alone.

## 11. Error Handling

Separate upload failure, document quality failure, review delay, legal restriction, expired evidence, and service outage. Do not expose sensitive reviewer or screening rationale.

## 12. Recovery Behaviour

Upload replacement, correct metadata, respond to more-information request, renew evidence, open Compliance/Support case, or view historical approved evidence.

## 13. Accessibility

Document rows include status, expiry, required action, and impact as text. Upload and replacement controls are keyboard accessible. Legal content is readable at zoom and uses semantic headings.

## 14. Analytics

`r04_viewed`, `tax_residency_context_opened`, `dtaa_document_opened`, `compliance_document_opened`, `document_expiry_viewed`, `document_replacement_started`, `document_upload_completed`, `compliance_review_contacted`.

## 15. Engineering Notes

Document service owns versions, scan/review state, expiry, retention, legal hold, and lineage. Compliance owns treaty/review decisions. R04 displays safe projections and does not approve evidence.

## 16. Acceptance Criteria

- Users know which document/declaration is required, current, pending, expired, or rejected.
- Tax residency and DTAA are not conflated.
- Expiry and replacement paths are explicit.
- Sensitive review reasons remain protected.
- All document actions are consented and audited.

# R05 - Report Detail & Delivery

## 1. Screen Purpose

Provide a report’s contents, scope, period, source, finality, calculation context, version lineage, sharing, scheduling, and handoff to O04 Download Centre.

## 2. User Goal

Verify that a report is the right artifact, understand its limitations, and retrieve or share it securely.

## 3. Business Goal

Increase report confidence, reduce wrong-document sharing, and centralize secure delivery controls.

## 4. Entry Conditions

Report or document from R01-R04, O01-O04, Portfolio, Orders & Activity, notification, or a secure link. User must have current scope access.

## 5. Exit Conditions

O04 download history/job, secure download/share, schedule setup, R02/R03 detail, Portfolio, or Support.

## 6. Layout Structure

Top to bottom: report identity and purpose; scope/period/currency; current status/finality; content preview or web report; source/freshness/calculation metadata; amendment lineage; download/share/schedule; retention/expiry; support.

## 7. Information Hierarchy

Correct artifact and finality first; scope/period and limitations second; financial values and methodology third; delivery actions fourth.

## 8. Components

Existing: Document Viewer, Card, Badge, Table, Button, Link, Alert, Secure Download, Dialog.

New: Report Finality Block, Calculation Provenance, Amendment Lineage, Secure Share Panel, Scheduled Report Control, Artifact Status Link.

## 9. Screen States

Provisional, final, generating, ready, amended, stale, partial, expired link, revoked artifact, restricted share, schedule active, schedule paused, schedule failed, offline cached view, and source unavailable.

## 10. Validation

Report type, period, scope, finality, artifact hash, source snapshot, sharing recipient, consent, expiry, schedule frequency, and notification preference are validated. Share cannot exceed current entitlement.

## 11. Error Handling

Separate content/source error, artifact generation error, link expiry, share restriction, schedule failure, and permission change. Preserve the underlying report status.

## 12. Recovery Behaviour

Regenerate, use web preview, request new secure link, update sharing consent, pause/resume schedule, open O04, or contact Support.

## 13. Accessibility

Report preview has semantic structure and table alternative. Share/schedule dialogs are labelled with consequences. Expiry, finality, and amendment updates are announced.

## 14. Analytics

`r05_viewed`, `report_preview_opened`, `report_provenance_opened`, `report_amendment_opened`, `report_download_selected`, `report_share_started`, `report_share_completed`, `report_schedule_created`, `report_schedule_paused`, `report_schedule_failed`, `report_support_selected`.

## 15. Engineering Notes

R05 consumes Report, Artifact, Consent, Notification Preference, Entitlement, Audit, and O04 Download Centre services. Sharing uses expiring scoped links or approved recipients; scheduled jobs are idempotent and version-aware.

## 16. Acceptance Criteria

- Correct report, scope, period, source, finality, and limitations are visible.
- Provisional and final reports are distinguishable.
- Amended lineage is preserved.
- Share and schedule actions are consented, scoped, revocable where supported, and audited.
- Download management is delegated to O04 without duplicating artifact history.

## 15. Reports UX Pattern Library

| Pattern | Purpose | Required behavior |
|---|---|---|
| Context Before Number | Prevent scope/period confusion | Show scope, period, currency, and freshness before financial value |
| Finality Before Download | Prevent provisional report misuse | Display provisional/final/amended state before delivery action |
| Truth With Provenance | Make calculations defensible | Source, snapshot, method, rule, and calculation version |
| Insight to Evidence | Allow verification | Every summary links to holdings, transactions, source records, or report detail |
| Readiness Before Filing | Make missing data visible | List completeness, gaps, owners, impact, and next action |
| Tax Language Boundary | Avoid implied advice | Education, estimate, source-confirmed, final, and professional review labels |
| Data Delay Localisation | Avoid broad uncertainty | Label only affected metric/report/source and preserve unaffected truth |
| Amendment Lineage | Preserve historical trust | Original, changed, reason, effective date, latest artifact |
| Scope-Safe Sharing | Protect financial privacy | Recipient/scope, expiry, consent, revocation, audit |
| Scheduled Delivery Control | Make recurring delivery deliberate | Frequency, report version, scope, channel, pause/cancel, failure state |
| Correction Path | Support disputes | Report discrepancy, source, case ID, owner, expected update |
| Professional Handoff | Escalate tax complexity | Consent, context shared, specialist scope, SLA, data boundary |

## 16. Reporting Component Inventory

Reusability score: 5 is platform-wide; 1 is Reports-specific.

| Component | Purpose | Existing or New | Dependencies | Variants | States | Reusability |
|---|---|---|---|---|---|---:|
| Scope and Period Bar | Establish account/folio/household and period | Existing pattern, extend | Permissions, calendar | Financial year, date range, account | Loading, selected, restricted | 5 |
| Report Readiness Card | Summarize report availability | New | Report, source, tax | Holdings, capital gains, statement | Ready, pending, partial, blocked | 5 |
| Financial Insight Card | Show value/performance/gain summary | Existing, extend | Portfolio, tax | Performance, realized, unrealized | Current, stale, estimated | 5 |
| Data Freshness Indicator | Show source quality | New | Data quality | Fresh, recent, stale, partial | Current, warning, unavailable | 5 |
| Finality Badge | Distinguish provisional/final/amended | New | Report service | Provisional, final, amended | Current, expired, revoked | 5 |
| Report Type Selector | Navigate holdings/transactions/statements/tax | New | Report taxonomy | Holdings, transaction, capital gains, tax | Selected, unavailable | 5 |
| Financial Year Selector | Choose tax/reporting period | Existing, extend | Calendar, policy | FY, tax year, custom range | Current, closed, unavailable | 5 |
| Report Status Row | Summarize report job/artifact | New | Artifact/report | Queued, generating, ready, failed | All report states | 5 |
| Provenance Block | Explain source/calculation | New | Source snapshot, rule | Performance, tax, report | Visible, partial, restricted | 5 |
| Realized/Unrealized Split | Separate gain concepts | New | Tax, portfolio | Value, gain, tax | Current, estimated, missing | 5 |
| Capital Gains Table | Explain lot/transaction basis | New | Tax, transaction | Short/long, lot, asset | Final, provisional, partial | 5 |
| TDS Status Row | Explain withholding | New | Tax/finance | Deducted, reported, estimated, corrected | Current, pending, amended | 5 |
| Tax Data Gap Panel | Show missing inputs and impact | New | Data quality, tax | Cost basis, transaction, residency | Open, resolving, resolved | 5 |
| Tax Boundary Notice | Define tax advice limitation | New | Legal/tax content | Education, estimate, professional review | Visible, acknowledged | 5 |
| DTAA Evidence Row | Show treaty document state | New | Document/compliance | TRC, Form 10F, declaration | Current, pending, expired, rejected | 5 |
| Document Validity Row | Show evidence lifecycle | Existing, extend | Document service | Compliance, tax, statement | Valid, expiring, expired, superseded | 5 |
| Compliance Impact Notice | Explain report/tax effect | New | Compliance policy | Action required, restricted, no impact | Visible, pending, resolved | 5 |
| Report Preview | Read report before download | Existing, extend | Artifact/report | Table, PDF, web | Generating, ready, corrupted | 5 |
| Calculation Detail | Show inputs/method/rule | New | Tax/performance | XIRR, gain, TDS, FX | Available, restricted, stale | 4 |
| Amendment Lineage | Show report correction history | New | Artifact/report audit | Original, amended, superseded | Current, archived | 5 |
| Secure Share Panel | Configure recipient and expiry | New | Consent, entitlement, notification | Link, recipient, specialist | Draft, active, revoked, expired | 5 |
| Scheduled Report Control | Configure recurring delivery | New | Schedule, report, notification | Email, in-app, specialist | Active, paused, failed, expired | 5 |
| Download Job Link | Delegate to O04 | Existing cross-module | Artifact service | Report, statement, receipt | Queued, ready, failed, expired | 5 |
| Report Dispute Action | Start correction case | New | Support, audit, originating source | Data, tax, document | Available, submitted, resolved | 5 |
| Professional Handoff | Consent-based tax specialist access | Existing pattern, extend | Consent, CRM, support | Tax consultant, CA, RM | Offered, accepted, expired | 5 |

## 17. Report Card Inventory

| Card | Purpose | Required fields | Future reuse |
|---|---|---|---|
| Portfolio Performance Card | Summarize value and return | Scope, period, method, value, return, freshness | All assets |
| Holdings Report Card | Identify ownership snapshot | Scope, date, holdings count, source, finality | ETFs, bonds, PMS |
| Transaction Report Card | Show investment history | Period, transaction count, source, status | All transaction types |
| Capital Gains Card | Summarize realized gains | Tax year, jurisdiction, realized gains, basis completeness, finality | All taxable assets |
| Unrealized Gains Card | Explain current valuation movement | Valuation date, cost basis, current value, estimate/freshness | Tradable assets |
| TDS/Withholding Card | Show deducted/reported tax | Tax year, amount, source, status, correction | Global withholding |
| Statement Card | Access period statement | Statement type, period, issuer/source, finality | Custody/issuer statements |
| Tax Readiness Card | Identify filing readiness | Completeness, missing data, action, professional review | Future tax domains |
| DTAA Evidence Card | Show treaty evidence status | Jurisdiction, TRC/Form 10F, validity, review, impact | Global treaty evidence |
| Compliance Document Card | Monitor regulatory documents | Type, expiry, status, owner, next action | KYC, AML, investor records |
| Report Generation Card | Show asynchronous report job | Type, scope, period, state, ETA/SLA, retry | Any artifact |
| Amended Report Card | Explain corrected output | Original version, amendment reason, effective date, latest link | Tax/corporate actions |
| Scheduled Report Card | Manage recurring delivery | Report, scope, frequency, channel, next send, state | All recurring statements |
| Shared Report Card | Track secure sharing | Recipient/scope, created, expiry, revoked state | Specialists/family |

## 18. Tax Communication Framework

### Tax information classes

| Class | Meaning | Allowed language | Required controls |
|---|---|---|---|
| Educational | General concept or definition | Explain, does not determine | Source/date, non-advice boundary |
| Estimate | Derived from incomplete/current inputs | Estimated, may change | Inputs, rule version, finality |
| Source-confirmed | Reported by issuer/RTA/finance source | Source reports | Source, period, timestamp |
| Provisional | Calculation complete but not final | Provisional, pending confirmation | Review/finality explanation |
| Final | Final under product/tax service policy | Final for stated scope/period | Rule, source, audit, amendment path |
| Professional review recommended | Complexity or uncertainty exceeds safe self-service | Consider qualified advice | Consent-based handoff |

### Tax message requirements

- State jurisdiction and tax year.
- State whether value is INR/native/converted and the FX source/date.
- State whether TDS is deducted, reported, estimated, or corrected.
- State whether DTAA evidence is submitted, approved, expired, or under review.
- State what the product does not determine.
- Identify missing inputs and their impact.
- Link to source/report/provenance where permitted.

### Prohibited tax language

- Guaranteed tax savings.
- Guaranteed treaty rate.
- “Tax-free” without approved, scoped legal basis.
- “Filed,” “accepted,” or “approved by tax authority” without authoritative evidence.
- Treating a platform estimate as a tax return or professional opinion.

## 19. Report Download & Sharing Strategy

### Download

- R05 creates or opens a report artifact request.
- O04 manages job state, secure link, retry, expiry, history, and audit.
- Downloads include report type, scope, period, finality, version, and source snapshot metadata.
- Large reports are asynchronous and rate-limited.
- Downloaded files remain subject to retention, legal hold, and privacy policy.

### Sharing

- Sharing requires explicit scope and recipient/channel selection.
- Default expiry is policy-configured and visible.
- Recipient identity and consent are verified where required.
- Shared links are scoped, expiring, revocable where supported, and never expose broader household data.
- Tax consultant/RM/CA sharing records purpose, data scope, consent version, and access end time.
- Share delivery failure does not change report state.
- Shared artifact access and revocation are audited.

### Scheduled reports

- User selects report, scope, period rule, frequency, channel, and recipient.
- Each generated report uses current source and policy versions and may be provisional.
- Schedule failure is visible and recoverable.
- Consent withdrawal or scope change pauses or invalidates the schedule according to policy.
- Scheduled reports never silently include newly added household or account scope.

## 20. Data Freshness Indicators

| Indicator | Meaning | User-safe treatment |
|---|---|---|
| Fresh | Within domain threshold | Show current as-of time |
| Recent | Slightly older but within accepted tolerance | Show timestamp and no alarmist language |
| Stale | Outside threshold | Mark affected values, refresh/support path |
| Partial | Some sources/records missing | List affected scope and do not show zero |
| Estimated | Derived without final input | Show estimate, inputs, and what can change |
| Source unavailable | Required provider unavailable | Preserve last valid result with warning |
| Reconciliation required | Sources disagree or callback missing | Block final claim; show owner/case |
| Corrected | Value changed by authoritative correction | Show correction and effective time |
| Amended | Report/artifact replaced | Link latest and preserve prior lineage |
| Unknown | Freshness cannot be safely determined | Avoid current/final language |

## 21. Audit & Compliance Visibility Rules

### Customer-visible

- Report type, period, scope, source category, as-of time, finality, calculation status, amendment notice, document validity, and safe next action.

### Role-restricted

- Raw provider payloads, AML/sanctions reasons, internal reviewer notes, fraud scores, source credentials, and sensitive legal case details.

### Audit-required events

- View, scope switch, search/export, report generation, report download/share, schedule creation/change, share revocation, document upload/replacement, tax calculation version, DTAA review, correction/amendment, support handoff, and permission denial.

### Retention principles

Financial, tax, compliance, and audit records follow approved legal retention and legal-hold policy. User deletion requests create a privacy case and cannot erase regulated history outside the approved policy.

## 22. Analytics Contract

### Events

`r01_viewed`, `r02_viewed`, `r03_viewed`, `r04_viewed`, `r05_viewed`, `report_requested`, `report_ready`, `report_finality_viewed`, `report_freshness_viewed`, `report_downloaded`, `report_shared`, `report_schedule_created`, `tax_readiness_viewed`, `tax_data_gap_opened`, `capital_gains_viewed`, `tds_viewed`, `dtaa_evidence_viewed`, `document_expiry_viewed`, `report_disputed`, `professional_review_selected`.

### Required properties

`screen_id`, `report_type`, `scope_category`, `period_category`, `country_context`, `tax_residency_category`, `finality_state`, `freshness_state`, `policy_version`, `data_quality_category`, `entitlement_result`, and `artifact_state`.

### Prohibited data

PAN, tax IDs, bank data, raw account numbers, document content, raw support text, unapproved tax inputs, raw household identities, and raw AI prompts.

## 23. Independent Principal Product Review

### Missing reports

- Annual consolidated statement with scope and ownership.
- Cash-flow/contribution versus market-movement report.
- Dividend/IDCW and income report.
- Fees, charges, exit load, and tax-withholding report.
- Corporate-action and cost-basis adjustment report.
- Repatriation and payout evidence report.
- Source reconciliation/discrepancy report for user disputes.
- Amended-report history and superseded-artifact view.

### Missing tax scenarios

- Missing or corrected cost basis.
- Partial-year residency or tax-residency change.
- Multiple tax residencies and conflicting self-certification.
- DTAA evidence submitted after withholding.
- TDS correction after report issuance.
- Tax year changes across local and Indian calendars.
- Currency conversion and FX gain treatment.
- Partial redemption across tax lots.
- Scheme merger/bonus/corporate-action tax basis.
- Foreign reporting/PFIC/FAPI uncertainty.
- Resident conversion and historical NRI data.
- Tax consultant handoff with restricted scope.

### Missing compliance requirements

- Re-KYC or FATCA/CRS refresh triggered by account/report access.
- Country restriction on report display or export.
- Legal/death claim hold on activity and documents.
- Consent withdrawal affecting scheduled/shared reports.
- Cross-border data transfer and recipient country control.
- Document retention/legal hold versus deletion request.
- Audit access to source, rule, reviewer, and amendment lineage.

### Missing accessibility considerations

- Full accessible alternatives for performance/gains charts.
- Semantic tables for large capital-gains and transaction reports.
- Accessible PDF and exported spreadsheet requirements.
- Screen-reader handling of positive/negative/zero/estimated values.
- Focus and live-region behavior for report generation, amendment, and data delay.
- Long tax/legal copy and non-Latin number/date formatting.

### Missing reusable components

`FinancialYearContext`, `FinalityNotice`, `TaxDataGap`, `ReportProvenance`, `AmendmentLineage`, `ShareScope`, `ScheduleScope`, `FXContext`, `CostBasisCompleteness`, `ProfessionalReviewHandoff`, and `DiscrepancyCaseLauncher` should be shared primitives.

### Missing data quality indicators

- Cost-basis completeness.
- Transaction-source coverage.
- RTA/execution reconciliation status.
- FX source/date.
- Tax-rule effective date.
- TDS source confirmation.
- DTAA evidence validity.
- Report calculation version.
- Amendment reason and impact.

### Missing audit requirements

- Exact scope, filters, period, and currency used for an export.
- Input snapshot and calculation version for every tax/gain value.
- Report preview access and sharing recipient/scope.
- Schedule version and source data used for each generated report.
- Permission denial and redaction decisions.

### Principal review decision

The five-screen architecture is sufficient. The important improvement is to treat Reports & Tax Center as a truth-and-readiness layer, not a download catalogue. O04 remains the shared delivery system, Portfolio remains the live holdings authority, Orders & Activity remains the event authority, and Tax/Compliance/Document services retain their domain ownership.

## 24. Implementation Readiness Gates

Before high-fidelity design and engineering commitment:

- Approve report taxonomy, ownership, and report finality definitions.
- Freeze source hierarchy and freshness thresholds for holdings, transactions, NAV, cost basis, TDS, tax, DTAA, and FX.
- Sign off country-specific tax/DTAA/PFIC/FAPI language.
- Define report amendment, correction, retention, legal hold, and deletion behavior.
- Confirm accessible chart, table, PDF, spreadsheet, and document requirements.
- Test report values against Portfolio and Orders & Activity for matched periods/scopes.
- Validate scheduled/share reports across consent withdrawal, scope change, expiry, and country restrictions.
- Build fixtures for missing cost basis, partial RTA data, TDS correction, DTAA expiry, tax-year boundary, FX delay, and amended reports.

## 25. Architectural Decisions

1. Use five screens: Reports Dashboard, Report Explorer, Gains & Tax Center, DTAA & Compliance Workspace, and Report Detail & Delivery.
2. Reuse O04 Download Centre for artifact jobs, secure links, history, expiry, and audit.
3. Keep Portfolio and Orders & Activity as authoritative source workspaces; Reports provides period-based and filing-oriented projections.
4. Treat report finality, data freshness, source provenance, and amendment lineage as first-class data.
5. Separate realized gains, unrealized gains, cash flow, tax withholding, and final tax reporting.
6. Make tax communication jurisdictional, versioned, and explicit about estimates and professional review.
7. Make sharing and scheduling scoped, consented, expiring, revocable where supported, and audited.
8. Support future asset classes through shared reporting concepts and product-specific extensions.
9. Do not create separate screens for every report type, document, tax state, or download state.
10. Never use a generated report or notification to override financial, tax, compliance, or portfolio truth.

## 26. Assumptions

- Portfolio, Orders & Activity, Tax, Compliance, Document, Report, Artifact, Notification, and Entitlement services are available as authoritative dependencies.
- Reports may be provisional, final, stale, partial, or amended.
- Users may have multiple accounts, folios, currencies, household scopes, and tax residencies.
- Tax and DTAA rules are country-specific and remain UNKNOWN until formal sign-off.
- Download and sharing permissions are stronger than view permissions.
- O04 Download Centre remains the shared delivery and artifact management module.
- Future asset classes will provide reporting and tax capability descriptors.

## 27. Risks

- Incorrect or stale tax data can cause financial loss, filing errors, and regulatory exposure.
- Users may treat estimates as final or platform reports as professional tax advice.
- Incomplete cost basis or transaction data can materially distort gains.
- DTAA/PFIC/FAPI language may be wrong for a country or user circumstance.
- Report values may conflict with Portfolio or Statements if source snapshots are not aligned.
- Shared or scheduled reports can expose sensitive household or tax data.
- Large reports and exports can create performance, privacy, and retention risk.
- Amended reports may be missed if notification and artifact lineage are weak.
- Future product types may overload mutual-fund terminology and calculations.

## 28. Open Questions

- Which reports are legally required and which are convenience reports at launch?
- What is the source hierarchy for holdings, transactions, cost basis, TDS, tax, DTAA, FX, and statements?
- Which report values are provisional, source-confirmed, or final, and who owns finality?
- What financial years and tax years must be supported across launch countries?
- Which tax forms and guidance are in scope: Form 10F, TRC, Form 15CA/15CB, Form 67, and foreign reporting?
- What is the approved wording for tax saving, DTAA savings, PFIC/FAPI, and professional review?
- What are cost-basis and transaction-data completeness thresholds for gains reports?
- Can users share reports with household members, RMs, CAs, or tax consultants, and for how long?
- What report schedules, channels, rate limits, and expiry policies are required?
- What are accessibility requirements for PDF, spreadsheet, CSV, and web reports?
- How are corrected TDS, amended capital gains, and superseded reports communicated?
- What happens to scheduled reports after consent withdrawal, country change, or account closure?

## 29. Recommendations for the Next Module

1. Define the first Reports implementation around Holdings, Transactions, Capital Gains, TDS, and annual statements using one approved country/tax policy set.
2. Build a reconciled test fixture library covering Portfolio, Orders & Activity, RTA, tax, DTAA, TDS, FX, cost basis, and amended reports.
3. Reuse `ReportProvenance`, `FinalityNotice`, `DataFreshnessIndicator`, `TaxDataGap`, `AmendmentLineage`, `SecureShare`, and `SupportContextBundle` across the next module.
4. Run tax-comprehension research with NRIs across UAE/Middle East, UK/Europe, US/Canada, and Singapore/SE Asia before high-fidelity design.
5. Validate R03 and R05 with Finance, Tax, Compliance, Support, and QA using estimate, provisional, final, amended, stale, and missing-data scenarios.
6. Do not add advanced tax automation, AI tax advice, or global reporting until source authority, legal language, finality, and correction workflows are proven.
