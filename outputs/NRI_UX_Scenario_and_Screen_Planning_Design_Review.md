# NRI DIY Mutual Fund Platform
## UX Scenario and Screen Planning Design Review

**Review body:** Principal Product Designer, UX Lead, Product Manager, Staff Engineer and QA Lead  
**Artifact reviewed:** [UX Scenario and Screen Planning Document](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md)

# Overall Decision

## Overall Readiness Score: 68 / 100

The document is a strong planning inventory with broad scenario coverage, a 55-screen catalog, component planning, copy patterns, priorities and wireframing order. It is not yet fully ready for wireframe production because several high-risk screens combine multiple responsibilities and the screen-level state, permission, validation and recovery definitions are not yet sufficiently granular.

## Can This Move to Wireframe Planning?

**NO.**

It can move to a short **screen-planning refinement sprint**, then to wireframe planning after the P0 findings are resolved.

# P0 Findings

## P0-1: Screen inventory is incomplete for high-consequence and recovery states

The inventory includes primary product screens but treats several critical recovery surfaces as generic states or shared panels. Payment failure, payment/order mismatch, refund status, payout failure, report correction, document rejection, consent propagation failure and security recovery need explicit screen or route-level planning.

**Evidence:** B06/B07, C05, D02/D03 and E04/E07 are broad containers rather than complete recovery surfaces ([NRI_UX_Scenario_and_Screen_Planning.md:128](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:128), [NRI_UX_Scenario_and_Screen_Planning.md:147](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:147)).

**Missing planning items:**

- Payment pending, payment failed and payment/order mismatch.
- Refund pending, refund completed and refund exception.
- Order rejection and duplicate-order prevention.
- Report generation failed, report corrected and shared report invalidated.
- KYC rejection/retry and EDD pending.
- DTAA evidence rejected and AMC/RTA application pending.
- Security lockout and account-recovery state.

**Reason:** These states carry higher user, financial and compliance risk than the happy path and must be planned as first-class wireframe targets.

## P0-2: Screen-level state coverage is incomplete

The scenario matrix includes Empty, Loading, Error, Offline, Restricted, Suspended and Success, but the screen behavior matrices only provide columns for validation, business rules, error, empty, success and loading ([NRI_UX_Scenario_and_Screen_Planning.md:290](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:290)).

**Missing at screen level:**

- Offline behavior.
- Restricted behavior.
- Suspended behavior.
- Pending behavior.
- Retry behavior.
- Escalated behavior.
- Expired behavior.
- Partial data/stale source behavior.
- Cancelled, refunded, corrected and reopened states.

**Reason:** Wireframes will otherwise be produced only for loading, error and success, forcing teams to invent the highest-risk states later.

## P0-3: The screen inventory references undefined IDs

A07 references A30 as an entry point, but no A30 screen exists ([NRI_UX_Scenario_and_Screen_Planning.md:114](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:114)).

The component planning also references A30 for the KYC Evidence Checklist ([NRI_UX_Scenario_and_Screen_Planning.md:260](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:260)).

**Required fix:** Resolve whether A30 is:

- A missing screen.
- A typo for A07.
- A reusable document-review surface.
- A future screen intentionally omitted.

**Reason:** Broken IDs make cross-referencing, Figma page naming, analytics mapping and engineering tickets unreliable.

## P0-4: Identity recovery and security settings are not sufficiently inventoried

Login includes recovery, but there is no explicit screen for lost mobile/email access, device management, session revocation, suspicious activity or account recovery verification. Logout is planned, but secure recovery is not a complete screen family.

**Missing screens:**

- Account recovery start.
- Ownership verification.
- Recovery pending/review.
- Security and devices.
- Active sessions.
- Revoke device/session confirmation.
- Security incident status.

**Reason:** An NRI may be abroad, lose access to a roaming number or use multiple devices. This is a core trust and support path, not a secondary settings detail.

## P0-5: Bank onboarding is over-compressed

A12 “Bank Account List” includes add account, verification and account selection, while A13 is verification status. There is no explicit Add Bank Account, bank redirect/return, account ownership evidence, or verification-failure planning surface.

**Required screens or explicit route variants:**

- Add bank account.
- Select account type.
- Bank authentication/redirect return.
- Ownership verification result.
- Bank mismatch recovery.
- Supported-bank fallback.

**Reason:** NRE/NRO selection and payment compatibility are central compliance and transaction gates; they should not depend on a single list screen plus generic status.

## P0-6: Compliance and tax screens lack decision-specific evidence planning

A10 combines FATCA and CRS, C08 combines DTAA status/documents, C06 combines capital gains, and C07 combines the tax package. These domains have different evidence, legal wording, expiry, permissions and review outcomes.

**Required separation for planning:**

- FATCA declaration and FATCA review outcome.
- CRS declaration and CRS correction outcome.
- DTAA evidence submission, review status and application status.
- Capital-gains calculation inputs and result.
- TDS report.
- Tax package completeness and correction status.
- Professional/CA handoff permission.

**Reason:** Combining them is acceptable at navigation level, but not at wireframe planning level. Each has different regulatory checkpoints and failure semantics.

## P0-7: Permission planning is not screen-specific enough

The inventory lists broad permissions such as “view own,” “RM assist,” “role-based view/export” and “by consent,” but does not define field-level masking, consent expiry, joint-holder conflicts or export behavior per screen ([NRI_UX_Scenario_and_Screen_Planning.md:108](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:108)).

**Missing permission decisions:**

- Which fields a Joint Holder can view or change.
- Whether a Nominee can access any current data.
- What RM can see before and after consent.
- What Tax Consultant can export.
- What Support can see for AML, tax and documents.
- Which Admin actions require maker-checker.
- Whether report sharing is view-only, downloadable or revocable.
- What happens when consent is revoked during an active case.

**Reason:** Wireframes that omit permission boundaries can accidentally become security requirements.

## P0-8: Transaction state and screen planning do not distinguish request, authorization, execution and settlement

B05, B06 and B07 are present, but the planning document does not create distinct screen-level planning for:

- Order draft.
- Authorization pending.
- Payment success but order unknown.
- Order accepted but allotment pending.
- Allotment partial.
- Refund pending.
- Settlement complete.

**Reason:** “Payment Authorization and Status” is too broad for a money-moving system. These states require different user instructions and recovery actions.

## P0-9: Validation and business rules are too generic for implementation

The behavior matrices contain one-line validations and rules, but they do not define the actual rule sets needed for wireframes and acceptance criteria ([NRI_UX_Scenario_and_Screen_Planning.md:299](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:299)).

**Missing rule detail:**

- Required versus conditionally required fields.
- Field dependencies and order.
- Validation timing.
- Server versus client validation.
- Error persistence after retry.
- Exact NRE/NRO compatibility rules.
- Tax-year and effective-date behavior.
- Cut-off timezone and holiday logic.
- Minimum/maximum investment and redemption constraints.
- Mandate date and cancellation rules.
- Report completeness criteria.

**Reason:** Generic validation copy is not enough to determine screen behavior.

# P1 Findings

## P1-1: Email and mobile verification are combined into one screen

The feature matrix treats Email Verification and Mobile Verification separately, but the screen inventory combines both in A02 ([NRI_UX_Scenario_and_Screen_Planning.md:109](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:109)).

**Recommendation:** Define whether A02 is one reusable verification framework with channel variants or separate screen IDs A02E and A02M.

**Reason:** Email links and OTPs have different loading, expiry, resend, recovery, accessibility and security behavior.

## P1-2: No explicit Account Recovery screen family

Recovery appears as an exit point from A02/A03, but not as a screen inventory item.

**Recommendation:** Add recovery start, choose verified channel, identity proof, review pending and recovery completed states.

## P1-3: No explicit Legal, Privacy and Consent Center

Consent appears inside verification, FATCA/CRS, settings, reports and RM Connect, but there is no reusable legal/consent destination or consent history screen.

**Missing planning items:**

- Consent summary.
- Consent detail and version.
- Consent history.
- Revoke consent.
- Data-sharing request.
- Privacy/data export request.

**Reason:** Consent is a cross-product entity and requires a user-visible audit trail.

## P1-4: No explicit Search Results or Article Detail screen

D01 is “Help Center and Search,” while B02 includes search/filter behavior. There is no screen-level distinction for search results, no-results, article detail or outdated-content state.

**Reason:** Search needs separate loading, no-result, restricted-result and content-expired planning.

## P1-5: No explicit Report Viewer, Secure Share or Download Status screen

C05 is report request/status and C06/C07 are report types. The actual report viewer, download preparation, secure link, invalidated share and export failure are not separate planning targets.

**Reason:** Reports are high-value evidence objects with permission, retention, accessibility and correction behavior.

## P1-6: No explicit TDS report screen

Capital gains and tax packages are included, but TDS has distinct source, ownership, correction and report semantics.

**Recommendation:** Add a TDS Report screen or explicitly document TDS as a first-class mode of C07.

## P1-7: No explicit Add/Edit/Review Schedule screens for SIP

B08 and B09 combine setup and management. There is no explicit planning for mandate selection, bank redirect return, mandate pending, first debit pending, pause effective date, cancellation confirmation or failed debit recovery.

**Reason:** SIP is recurring money movement and has more states than one setup form.

## P1-8: Family and nominee architecture is incomplete

A15 and C14 cover continuity, but no explicit invitation, acceptance, permission review, revoke-access or nominee-claim readiness screens exist.

**Missing planning items:**

- Joint-holder invitation.
- Invitation acceptance.
- Permission review.
- Access revoke.
- Nominee/guardian review.
- Death-claim or continuity readiness status.

## P1-9: Internal administration screens are incomplete

The internal inventory includes queue, review, reconciliation, policy, tax, finance, support, audit and analytics, but omits:

- Staff login and step-up.
- Role and permission administration.
- Vendor health/configuration.
- Notification-template management.
- Content and legal-copy management.
- Incident detail and post-incident review.
- Data-quality exception management.

**Reason:** Internal screens determine whether the frontstage promises can actually be operated.

## P1-10: Missing explicit component variants

The component list names new components, but does not define variants for:

- Pending versus overdue.
- Restricted versus suspended.
- Estimated versus final.
- Customer-visible versus internal-safe.
- Investor versus Joint Holder.
- Mobile versus desktop report.
- Stale versus unavailable.

**Reason:** Components without state variants will lead to inconsistent local solutions.

## P1-11: UX copy inventory does not cover every screen

The copy inventory contains global patterns and reusable messages, but not screen-specific copy for all 55 screens ([NRI_UX_Scenario_and_Screen_Planning.md:374](/Users/ashishgupta/Documents/Codex/2026-07-14/you-are-my-principal-product-design/outputs/NRI_UX_Scenario_and_Screen_Planning.md:374)).

**Missing copy categories:**

- Field labels and examples.
- Screen-specific empty-state titles.
- Screen-specific restricted and suspended language.
- Pending SLA language.
- Permission-denied language by role.
- Report completeness language.
- Reconciliation and refund language.
- CA/RM consent language.
- Internal review and approval language.

## P1-12: Accessibility is not screen-level acceptance criteria

The document plans reusable components but does not assign accessibility requirements to individual screens.

**Missing criteria:**

- Focus order.
- Error announcement.
- Screen-reader state announcement.
- Keyboard behavior.
- Touch target requirements.
- Zoom behavior.
- Table/report alternative.
- Video/IPV alternative.
- Accessible document upload.

## P1-13: Loading and offline behavior lack measurable thresholds

Screens mention loading, polling or safe cached data but do not define when loading becomes pending, stale, failed or escalated.

**Recommendation:** Add per dependency:

- Initial loading threshold.
- Retry threshold.
- Stale threshold.
- SLA threshold.
- User notification threshold.

## P1-14: Analytics coverage is not mapped screen-by-screen

The planning document includes analytics in the source architecture but does not list events per screen, event properties, conversion denominator, state dwell time or error taxonomy.

**Missing instrumentation:**

- Screen viewed.
- Entry source.
- State shown.
- Permission outcome.
- Validation failure reason.
- CTA intent.
- Abandonment point.
- Recovery outcome.
- Support handoff.
- Accessibility success/failure.

## P1-15: First-time and returning-user planning is not connected to screen variants

The scenario matrix identifies first-time and returning experiences, but the screen inventory does not mark which screens have onboarding, saved context, resumed draft, prior-history or repeat-action variants.

**Reason:** This will produce duplicate screens or inconsistent entry behavior during wireframing.

# P2 Findings

## P2-1: No explicit educational content surfaces

Fund, NRE/NRO, tax, DTAA, risk and repatriation education are mostly planned as helper text, tooltips or Help content. Selected high-anxiety topics may benefit from reusable education detail surfaces.

## P2-2: No saved comparison or saved report request state

The architecture mentions saved comparison and report reuse, but does not inventory saved items, expiry or deletion behavior.

## P2-3: No communication preference preview

Settings can change preferences, but there is no preview of which alerts remain mandatory versus optional.

## P2-4: No explicit accessibility settings or language surface

English is launch scope, but language expansion, text scaling, reduced motion and assistive preferences are not screen-planned.

## P2-5: No explicit incident status screen

Banners are planned, but a service incident detail/status surface would reduce support load during broad outages.

## P2-6: No explicit data freshness detail surface

Freshness indicators are planned as components, but customers may need a source-status detail for portfolio, reports, tax and orders.

# Cross-Functional Review

## Principal Product Designer

The document is comprehensive in breadth but too compressed in high-consequence areas. A screen such as B06 or C07 currently represents multiple mental models, states and permissions. Wireframing these as single screens risks producing dense, overloaded experiences.

**Recommendation:** Split planning by user intent and state before exploring layout. Keep reusable components, but do not use reuse as a reason to collapse distinct decisions into one screen.

## UX Lead

The screen IDs, priorities and wireframing phases are useful. However, the feature scenario matrix and screen behavior matrix are not fully traceable: a feature can have seven states while its screen behavior row only addresses four.

**Recommendation:** Create a traceability matrix:

Feature → Flow → Screen ID → State → Component → Copy ID → Analytics event → Permission → Acceptance criterion.

## Product Manager

P0 includes a large set of XL screens and advanced tax/reporting surfaces. This may still be too broad for an MVP even though STP/SWP are deferred.

**Recommendation:** Confirm P0 as an executable release slice, not only a design priority. Define which reports, countries, payment routes, transaction types and roles are truly launch-ready.

## Staff Engineer

The inventory needs explicit screens for asynchronous state and reconciliation. Generic “status” screens will not be sufficient for distributed payment, execution, RTA, tax and consent systems.

**Recommendation:** Model each major screen against a backend state contract and event correlation ID. Do not allow wireframes to invent state labels independently.

## QA Lead

The behavior matrix is not test-ready because it does not include every state, validation branch, permission combination or screen-level acceptance condition.

**Recommendation:** Add a screen acceptance matrix with:

- Given state.
- Role.
- Data condition.
- Dependency condition.
- Expected visible state.
- Allowed action.
- Error/recovery outcome.

## Overall Board Assessment

The document is a good master planning foundation, but its strongest value is as a catalog. It still needs a traceability and state refinement pass before designers begin detailed wireframes.

# Recommended P0 Fix List

1. Resolve the undefined A30 reference.
2. Add screen-level Pending, Offline, Restricted, Suspended, Retry, Escalated and Expired definitions.
3. Add identity recovery and security/device-management screens.
4. Split bank setup from bank verification and NRE/NRO context.
5. Split or explicitly variant FATCA, CRS, DTAA, TDS and tax-report surfaces.
6. Add payment/order/refund/reconciliation recovery screens.
7. Add report viewer, secure share and export-failure screens.
8. Add consent center, consent history and privacy/data-request screens.
9. Add family invitation/acceptance/revoke-access screens.
10. Add screen-specific permission and field-masking rules.
11. Add screen-specific copy, validation and business-rule requirements.
12. Add screen-level analytics and accessibility acceptance criteria.
13. Produce the feature-to-screen-to-state traceability matrix.
14. Confirm the executable MVP scope before Figma page creation.

# Final Answers

## Overall Readiness Score

**68 / 100**

## Can This Move to Wireframe Planning?

**NO.**

The document can move to a focused planning refinement sprint. Wireframing should begin only after the P0 fixes are resolved, especially state coverage, recovery screens, permission precision, compliance evidence planning, A30 traceability and executable MVP scope.

