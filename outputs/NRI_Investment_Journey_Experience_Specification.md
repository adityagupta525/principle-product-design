# NRI WealthTech Platform
## Investment Journey Experience

**Document type:** Product experience, service, and wireframe specification
**Role:** Founding Product Leadership Team
**Status:** Extension of locked Authentication, Onboarding, Activation, Home, Portfolio, Fund Discovery, and Cross-Module Lifecycle & Entitlement Contract
**Scope:** Investment intent through order acceptance, rejection, cancellation, settlement, recovery, or controlled escalation
**Constraint:** No visual UI, colours, typography, pixel measurements, or final screen styling are defined here.

## 0. Contract Alignment

This module consumes the locked Cross-Module Lifecycle & Entitlement Contract. It MUST NOT redefine identity, compliance, activation, portfolio truth, eligibility, consent, document, session, device, notification, or support state machines.

### Investment module owns

- Investment instruction creation and editing before submission.
- Product/action-specific validation.
- Account and bank selection context.
- Payment and mandate orchestration.
- Order review and investor confirmation.
- Order status projection and user recovery.
- Safe handoff to Portfolio, Reports, Notifications, Support, Operations, and Tax.

### Investment module does not own

- KYC or investor identity approval.
- Country or scheme eligibility policy.
- Portfolio valuation or holdings truth.
- Bank ownership truth.
- Payment provider settlement truth.
- Exchange/RTA settlement truth.
- Tax law or final tax liability.
- Final compliance decisions.

## 1. Investment Philosophy

Investment is a high-consequence decision under uncertainty. The experience must reduce preventable errors, make money movement explicit, preserve user agency, and never manufacture certainty when a payment gateway, exchange, RTA, bank, or compliance reviewer has not confirmed an outcome.

### Core decision

Use one shared investment orchestration model with instruction variants:

- `PURCHASE_LUMPSUM`
- `PURCHASE_ADDITIONAL`
- `PURCHASE_SIP`
- `REDEMPTION`
- `SWITCH`
- `STP`
- `SWP`
- Future product-specific instructions for ETFs, bonds, NPS, PMS, AIF, global investments, and insurance-linked products.

The shared stages are:

`INTENT -> SETUP -> ACCOUNT -> PAYMENT_OR_MANDATE -> REVIEW -> CONFIRMATION -> PROCESSING -> OUTCOME -> PORTFOLIO_RECONCILIATION`.

The stage names do not replace the locked Order, Payment, Mandate, Eligibility, or Portfolio state machines. They are the customer journey projection across them.

## 2. Money Movement Principles

1. Show exactly what money leaves, from which account, for which instruction, and under whose ownership.
2. Show whether an amount is an estimate, authorization, payment confirmation, execution amount, refund, or final settlement.
3. Never allow a user to repeat a money action while the outcome is unknown.
4. Use idempotency keys for every create, submit, retry, cancel, refund, and mandate action.
5. Keep payment, order, execution, settlement, refund, and portfolio events separate but correlated.
6. NRE/NRO account type must be explicit at setup, payment, order, folio, payout, and reporting boundaries.
7. A payment success is not an order success. An order acceptance is not a settled holding.
8. A failed payment does not automatically mean an order was never created.
9. A refund initiated does not mean a refund completed.
10. Every external callback is asynchronous, authenticated, replayable, and reconciled.
11. No client-side amount or eligibility calculation is authoritative.
12. Amount, currency, unit precision, cutoff, NAV, fees, taxes, and limits must use server-provided effective-dated rules.

## 3. User Psychology During Investment

Users may experience urgency, fear of loss, fear of making a tax mistake, anxiety about money leaving an account, confusion between payment and investment, and uncertainty when a status is pending. The experience should:

- reduce avoidable choices at each stage;
- restate the consequence before confirmation;
- make safe waiting a valid action;
- use neutral language after loss, rejection, or failure;
- avoid countdown pressure unless a real market cutoff exists;
- show what can still change and what is final;
- preserve a complete status timeline;
- provide a human path when system uncertainty exceeds user tolerance.

## 4. Business Objectives

- Increase successful, compliant first and repeat investments.
- Reduce duplicate orders, duplicate payments, unmatched callbacks, and support contacts.
- Improve SIP and mandate completion without coercive nudging.
- Reduce failed orders caused by incorrect account, cutoff, eligibility, or amount context.
- Improve operational reconciliation and recovery time.
- Create a product-agnostic investment orchestration layer for future instruments.
- Preserve trust and reduce complaints from unclear pending, rejected, refunded, or reversed outcomes.

## 5. Success Metrics

### Customer outcomes

- Intent-to-confirm completion by instruction type.
- Confirmation-to-authoritative outcome rate.
- Median time to complete a valid purchase without unnecessary retries.
- Successful recovery rate for failed payments and unknown order outcomes.
- Percentage of users who correctly understand source account, amount, cutoff, status, and next step in research.
- Reduction in support contacts asking whether money was debited, order created, or refund completed.

### Operational outcomes

- Duplicate-order and duplicate-payment rate.
- Payment-to-order match rate.
- Order-to-execution match rate.
- Execution-to-portfolio reconciliation rate.
- Refund aging and unresolved unknown-outcome aging.
- Manual intervention rate by failure category.
- SLA breach rate by vendor, country, bank, and instruction type.

### Safety outcomes

- Restricted order attempt rate caused by discovery or journey defects.
- Wrong-account or cross-funding prevention rate.
- Suitability/risk mismatch rate.
- Chargeback, fraud, and suspicious-velocity rate.
- Incorrect tax/fee/cutoff disclosure complaint rate.
- Accessibility task completion for confirmation and recovery.

## 6. Trust Principles

- The user sees a stable order reference as soon as an instruction is created.
- The user sees the exact state of payment, order, execution, settlement, refund, and portfolio update separately.
- Every pending state states what is waiting, who owns the next step, and when the next update is expected.
- No status language implies success before the owning system confirms it.
- The final review is a meaningful pause, not a decorative confirmation.
- Material risk, liquidity, tax, fee, cutoff, and account-type information appears before confirmation.
- User-facing errors explain what the user can do without exposing internal provider payloads.
- A user can download or revisit a receipt only when the underlying artifact is authoritative.
- Support handoff carries safe context and never requires the user to repeat the entire story.

## 7. Financial Risk Communication

Every investment confirmation MUST make visible or directly accessible:

- product and plan/option identity;
- action type;
- source account and account type;
- amount and currency;
- expected payment, execution, settlement, or payout timing;
- cutoff and holiday context where relevant;
- applicable fees, loads, taxes, or deductions;
- risk level and material liquidity constraints;
- eligibility and suitability status;
- tax/DTAA status as estimate or approved context;
- what can change after confirmation;
- cancellation limitations;
- next expected state.

Past performance is not a forecast. Estimated tax or proceeds are not final. Redemption proceeds can change with NAV, deductions, tax treatment, and settlement timing.

## 8. Regulatory Principles

1. Only an eligible, authorized, compliant actor may submit a regulated investment instruction.
2. Investor confirmation and consent are distinct from RM preparation or assisted initiation.
3. NRE/NRO and repatriability rules are enforced at account, folio, payment, order, and payout layers.
4. Risk profile and suitability policy are re-evaluated when required by product or event.
5. FATCA, CRS, tax residency, DTAA, PFIC/FAPI, AML, sanctions, PEP, EDD, and document validity are consumed from canonical services.
6. Product eligibility must be current at order confirmation, not only at discovery.
7. All confirmations, disclosures, consents, overrides, and human decisions are auditable.
8. The customer must not be led to believe that a tax estimate is professional advice or final tax liability.
9. Regulatory rejection and technical failure use different states and messages.
10. Support, RM, Operations, Finance, Tax, and Compliance cannot silently override the owning service.

## 9. Error Prevention Principles

- Default to the correct verified account but require explicit confirmation.
- Display masked account details with account type and ownership.
- Validate amount, currency, cutoff, minimum, maximum, frequency, and date before payment.
- Prevent cross-account funding and incompatible switch legs.
- Recheck eligibility after any material setup change.
- Prevent duplicate submit through UI state and server idempotency.
- Disable cancellation when the order is already accepted or settlement has begun, while explaining why.
- Require confirmation for high-value, new-device, changed-bank, and unusual-velocity actions under risk policy.
- Never convert a timeout into a failure message if an external side effect may have happened.

## 10. Recovery Strategy

Recovery follows a universal pattern:

1. Preserve the instruction and correlation ID.
2. Determine whether a side effect may have occurred.
3. Stop duplicate money movement.
4. Show the last authoritative state and uncertainty.
5. Offer only safe actions: refresh, wait, cancel if allowed, correct, retry with a new idempotent attempt, or contact support.
6. Notify through approved channels without exposing sensitive values.
7. Reconcile payment, order, execution, refund, and portfolio records.
8. Close only with authoritative outcome and audit evidence.

## 11. Accessibility Strategy

- Use semantic stages and headings for the journey.
- Announce payment, order, and recovery state changes once through accessible live regions.
- Keep focus predictable after validation, payment return, timeout, and error.
- Use text equivalents for risk, fees, timelines, and order status.
- Make all confirmation and retry controls keyboard accessible with explicit consequences.
- Ensure numeric values expose currency, sign, decimal precision, and whether they are estimates.
- Support zoom, reflow, localization, long fund names, and translated regulatory copy.
- Do not use colour or motion as the sole indicator of success, failure, or risk.
- Respect reduced motion and do not auto-submit after an external payment return.

## 12. Future Scalability

The orchestration layer separates common workflow concepts from product-specific execution:

### Shared concepts

Instruction, instrument, account, source/destination, amount, units, price/valuation, schedule, eligibility, risk, payment, mandate, consent, authorization, order, execution, settlement, cancellation, refund, receipt, tax event, portfolio impact, and support case.

### Product-specific extensions

- Mutual funds: NAV, folio, RTA, SIP, STP, SWP, IDCW, switch legs.
- ETFs: exchange order book, limit/market order, bid/ask, brokerage, settlement cycle.
- Bonds: face value, coupon, maturity, accrued interest, availability, yield.
- NPS: contribution, PRAN, allocation, lock-in, withdrawal rules.
- PMS/AIF: accredited eligibility, drawdown, capital calls, lock-in, reporting.
- Global investments: market, FX, local custody, foreign tax, settlement, time zone.
- Insurance-linked investments: policy, premium, illustration, surrender, protection boundary.

The UI and API should consume capability descriptors rather than assume every instrument supports the same setup, payment, cancellation, or settlement behavior.

## 13. Investment Journey States

### Journey projection states

`INTENT_STARTED`, `SETUP_IN_PROGRESS`, `ACCOUNT_REQUIRED`, `PAYMENT_REQUIRED`, `MANDATE_REQUIRED`, `REVIEW_REQUIRED`, `CONFIRMATION_REQUIRED`, `PROCESSING`, `PENDING`, `PARTIALLY_COMPLETED`, `ACCEPTED`, `SETTLED`, `REJECTED`, `FAILED`, `EXPIRED`, `CANCEL_REQUESTED`, `CANCELLED`, `UNKNOWN_OUTCOME`, `REFUND_PENDING`, `REFUNDED`, `RECONCILIATION_REQUIRED`, `SUSPENDED`, `RECOVERY_REQUIRED`, `COMPLETED`.

### State precedence

The locked platform precedence applies. Security, authority, consent, compliance, policy/eligibility, activation, account, data quality, payment/order truth, reports, notifications, and personalization govern the journey in that order.

## 14. Journey Architecture

| ID | Screen | Responsibility |
|---|---|---|
| I01 | Investment Intent | Establish instruction type, product, ownership, and high-level context |
| I02 | Instruction Setup | Configure lumpsum, additional purchase, redemption, switch, STP, or SWP inputs |
| I03 | Recurring Instruction Setup | Configure SIP or recurring schedule and mandate requirements |
| I04 | Bank Selection | Choose and validate the source or destination bank account |
| I05 | Mandate Setup | Create, verify, or recover recurring debit authorization |
| I06 | Payment Authorization | Complete one-time payment or return from provider safely |
| I07 | Order Review & Confirmation | Present final terms, risks, consent, and explicit confirmation |
| I08 | Order Status | Show authoritative order/payment/execution/settlement state |
| I09 | Investment Receipt | Show confirmed outcome and links to Portfolio, Reports, and evidence |
| I10 | Investment Recovery | Resolve payment, order, refund, reconciliation, cancellation, and support exceptions |

### Why this is the minimum architecture

Instruction Setup and Recurring Instruction Setup are different cognitive and backend tasks. Bank, mandate, payment, review, status, receipt, and recovery are shared cross-product capabilities. Switch, STP, SWP, redemption, lumpsum, additional purchase, and future products remain variants inside the shared orchestration model.

## 15. Journey Definitions

### 15.1 Lumpsum investment

- **Happy path:** Fund details -> I01 purchase intent -> I02 amount/account setup -> I04 bank selection if required -> I06 payment authorization -> I07 review/confirm -> I08 processing -> I09 receipt after authoritative outcome.
- **Alternate paths:** Existing verified bank; payment by supported net banking/UPI; cutoff crossed with next-business-day terms; assisted RM initiation with investor confirmation.
- **Error paths:** Ineligible fund, invalid amount, account mismatch, payment failure, gateway timeout, duplicate attempt, cutoff restriction, exchange/RTA rejection.
- **Recovery paths:** Correct amount/account, retry safe payment, wait for unknown outcome, refund tracking, support/operations reconciliation.
- **Compliance paths:** Current eligibility, risk/suitability, NRE/NRO, FATCA/CRS/DTAA/PFIC/FAPI where relevant, step-up for high-value or risky activity.
- **Entitlement checks:** Investor scope, active session/device, compliance, eligibility, activation, account, payment, order confirmation.
- **Backend dependencies:** Product master, eligibility, risk, activation, bank, payment gateway, execution platform, RTA, notification, audit, reconciliation.
- **Fraud prevention:** Velocity, device risk, account ownership, beneficiary/source consistency, unusual amount, geo anomaly, duplicate fingerprint, step-up.
- **User anxiety points:** Money debited but no order, unclear cutoff, wrong account, tax uncertainty, pending status.

### 15.2 SIP investment

- **Happy path:** I01 purchase SIP -> I03 amount/frequency/date -> I04 bank -> I05 mandate -> I07 review/confirm -> mandate pending/approved -> first order -> I08 status -> I09 receipt/active SIP.
- **Alternate paths:** Existing mandate; future start date; first installment separate from recurring mandate; assisted initiation; mandate approval after user leaves.
- **Error paths:** Unsupported frequency/date, mandate rejection, bank mismatch, insufficient mandate limit, scheme closed, first debit failure, duplicate SIP.
- **Recovery paths:** Re-register mandate, change bank, change date/frequency, retry first debit safely, pause or cancel where policy allows, support.
- **Compliance paths:** Suitability, account type, mandate authorization, consent, recurring-payment disclosure, country/product eligibility.
- **Entitlement checks:** Active investor, eligible scheme, account/mandate, recurring permission, step-up as required.
- **Backend dependencies:** SIP service, mandate provider, bank, payment gateway, execution/RTA, calendar, notification, audit.
- **Fraud prevention:** New-device step-up, mandate amount/limit checks, velocity, beneficiary and account ownership validation.
- **User anxiety points:** Will money be debited automatically, what happens if it fails, can it be stopped, and when will the first investment appear.

### 15.3 Additional purchase

- **Happy path:** Existing holding or discovery -> I01 additional purchase -> I02 amount/account -> payment -> review -> order status -> receipt.
- **Alternate paths:** Reuse verified fund/account context; portfolio-originated purchase; switch from a recurring instruction where policy allows.
- **Error paths:** Holding/account mismatch, scheme closed, amount minimum, current eligibility failure, payment/order duplicate.
- **Recovery paths:** Refresh portfolio context, select eligible folio/account, correct amount, reconcile unknown payment.
- **Compliance paths:** Re-evaluate current investor and scheme eligibility; do not assume past ownership equals current purchase eligibility.
- **Entitlement checks:** Account ownership, eligibility, activation, payment, current risk policy.
- **Backend dependencies:** Portfolio, product master, eligibility, bank, payment, order, RTA, audit.
- **Fraud prevention:** Existing-folio ownership, high-frequency repeats, device and amount risk.
- **User anxiety points:** Whether the new purchase joins the right folio and whether existing holdings are affected.

### 15.4 Switch

- **Happy path:** Select source holding -> I01 switch -> I02 source/target/units or amount -> validate same-account and target eligibility -> review two legs -> confirm -> linked order status -> receipt/portfolio update.
- **Alternate paths:** Partial switch; target in same AMC or approved inter-AMC path; tax preview available; user saves draft before confirmation.
- **Error paths:** Target ineligible, source units unavailable, lock-in/exit load, cutoff mismatch, source/target account mismatch, one leg rejected.
- **Recovery paths:** Change target, reduce amount, cancel before acceptance where allowed, reconcile partial legs, support/operations review.
- **Compliance paths:** Source ownership, target eligibility, tax consequences, suitability, account type, consent, policy version.
- **Entitlement checks:** Redemption plus purchase entitlement independently; switch requires both legs to be permitted.
- **Backend dependencies:** Portfolio/units, eligibility, tax, order legs, payment/settlement if applicable, RTA/execution, reconciliation.
- **Fraud prevention:** Unusual transfer velocity, high-value switch, new device, target concentration, suspicious source/destination combination.
- **User anxiety points:** Whether money leaves the platform, tax impact, partial completion, and which fund is held if one leg fails.

### 15.5 STP

- **Happy path:** Select source and target -> configure amount/frequency/start/end -> validate source balance and target eligibility -> review schedule and legs -> confirm -> schedule active -> recurring order status.
- **Alternate paths:** Flexible end date; fixed number of transfers; existing mandate/account; pause/resume where supported.
- **Error paths:** Target becomes ineligible, source balance insufficient, schedule date invalid, source scheme closed, one transfer rejected.
- **Recovery paths:** Modify schedule, change target, pause, cancel future legs, reconcile completed and remaining legs.
- **Compliance paths:** Source/target account type, suitability, current eligibility on each leg, tax treatment, disclosure of multiple future transactions.
- **Entitlement checks:** Schedule creation plus future-leg entitlement policy; not every future leg is guaranteed eligible.
- **Backend dependencies:** Schedule service, portfolio, eligibility, order legs, calendar, RTA/execution, notifications.
- **Fraud prevention:** Repeated high-value transfers, target concentration, changed account, schedule tampering.
- **User anxiety points:** What happens if future eligibility or balance changes and whether prior legs can be reversed.

### 15.6 SWP

- **Happy path:** Select holding -> configure withdrawal amount/frequency/start/end -> validate units, tax estimate, payout bank -> review -> confirm -> scheduled redemptions -> payout/status.
- **Alternate paths:** Fixed amount, fixed units, percentage where supported; temporary pause; change payout bank after re-verification.
- **Error paths:** Insufficient units, bank expired, tax data unavailable, payout restriction, schedule date/cutoff issue, account hold.
- **Recovery paths:** Reduce amount, change frequency/end date, re-verify bank, pause/cancel future legs, tax/support review.
- **Compliance paths:** Redemption entitlement, ownership, tax/DTAA, repatriation ledger, account type, high-value step-up.
- **Entitlement checks:** Current redemption entitlement plus future-schedule policy; each payout remains subject to account and compliance state.
- **Backend dependencies:** Portfolio, tax, repatriation, bank, schedule, order, payout, RTA, notifications.
- **Fraud prevention:** Large or unusual payout, bank change, velocity, device, destination account, account takeover indicators.
- **User anxiety points:** Exact payout amount, tax deduction, duration of income, and what happens when holdings run out.

### 15.7 Redemption

- **Happy path:** Select holding -> I01 redemption -> I02 amount/units/payout bank -> tax/proceeds estimate -> review -> step-up -> confirm -> I08 processing -> I09 settlement/payout receipt.
- **Alternate paths:** Partial redemption, full redemption, alternate verified payout bank, future business-day settlement.
- **Error paths:** Insufficient units, lock-in, bank mismatch, repatriation limit, compliance hold, stale tax, payout failure, cutoff change.
- **Recovery paths:** Correct amount/bank, wait for tax/reconciliation, cancel if policy allows, track refund/payout, support/finance escalation.
- **Compliance paths:** Ownership, redemption restrictions, TDS/DTAA, Form 15CA/15CB guidance, NRO repatriation ledger, AML/high-value review.
- **Entitlement checks:** Redemption permission, account/payout permission, step-up, legal hold, tax/document validity.
- **Backend dependencies:** Portfolio/units, tax, bank, repatriation, order, RTA, payout, finance, audit.
- **Fraud prevention:** New payout bank, high-value, velocity, device, geo, unusual timing, account takeover.
- **User anxiety points:** Net proceeds, payout timing, taxes, whether units are sold immediately, and whether cancellation remains possible.

### 15.8 Cancel order

- **Happy path:** I08 order detail -> cancel request -> eligibility check for cancellation window -> confirm -> I08 cancel pending -> cancelled confirmation or final execution outcome.
- **Alternate paths:** Cancel one leg of a composite instruction; cancel future SIP/STP/SWP schedule while preserving completed orders.
- **Error paths:** Order already accepted, settlement begun, cancel callback timeout, partial execution, cancellation rejected.
- **Recovery paths:** Reconcile final order outcome, explain no-cancel condition, create support case, track refund where applicable.
- **Compliance paths:** Authorization, step-up, order ownership, policy and execution status.
- **Entitlement checks:** Order owner, active session, cancellation allowed for current state, risk step-up.
- **Backend dependencies:** Order service, execution platform, payment/refund, RTA, reconciliation, notification.
- **Fraud prevention:** Step-up, device/session, repeated cancellations, suspicious activity.
- **User anxiety points:** Whether cancellation succeeded and whether money will return.

### 15.9 Failed payment recovery

- **Happy path:** Payment failure identified -> I10 reason/category -> safe retry or alternate method -> payment confirmation -> linked order state.
- **Alternate paths:** Gateway fallback, alternate verified bank, delayed bank confirmation, order created but payment failed.
- **Error paths:** Gateway timeout, duplicate payment, bank debit without callback, refund pending, payment success/order pending.
- **Recovery paths:** Reconcile before retry, wait, alternate method, refund tracking, finance/support case.
- **Compliance paths:** Account type, source ownership, payment authorization, limits, AML/fraud rules.
- **Entitlement checks:** Active session/device, payment capability, order still valid, retry permission, no duplicate side effect.
- **Backend dependencies:** Payment ledger, gateway, bank, order, refund, reconciliation, notification.
- **Fraud prevention:** Velocity, duplicate reference, device risk, mismatched payer, amount anomaly.
- **User anxiety points:** Fear of double debit and uncertainty over whether the order exists.

### 15.10 Mandate setup and payment retry

- **Happy path:** I05 create mandate -> provider authorization -> mandate approved -> SIP/order proceeds.
- **Alternate paths:** Existing mandate, bank change, mandate limit increase, fallback provider.
- **Error paths:** Provider rejection, expired OTP, bank outage, mandate pending, duplicate mandate.
- **Recovery paths:** Resume authorization, retry idempotently, select another bank, contact support.
- **Compliance paths:** Explicit recurring consent, account ownership, mandate limits, communication evidence.
- **Entitlement checks:** Bank verified, recurring action allowed, account active, step-up if required.
- **Backend dependencies:** Mandate provider, bank, payment gateway, SIP service, audit, notifications.
- **Fraud prevention:** Device trust, beneficiary, amount limit, velocity, SIM/geo risk.
- **User anxiety points:** Automatic debit control, cancellation, debit timing, and failed installment behavior.

## 16. Standard Journey Handoff Contract

Every journey handoff MUST pass:

`instruction_id`, `actor_scope`, `account_id`, `folio_id_if_known`, `instrument_id`, `action_type`, `amount_or_units`, `currency`, `schedule_if_any`, `eligibility_snapshot`, `consent_snapshot`, `risk_snapshot`, `policy_version`, `idempotency_key`, `correlation_id`, `return_context`, and `allowed_next_actions`.

The receiving module MUST revalidate any state that may have changed. A handoff snapshot is context, not authorization.

# I01 - Investment Intent

## 1. Screen Purpose

Establish the intended investment action, instrument, ownership scope, and starting context before collecting money-moving inputs.

## 2. User Goal

Confirm that the user is starting the right type of investment or withdrawal for the right product and account context.

## 3. Business Goal

Prevent invalid journey entry, reduce downstream correction, and establish a traceable instruction type.

## 4. Entry Conditions

From Fund Discovery, Portfolio, Home, an existing holding, SIP schedule, notification, RM-assisted initiation, or a deep link. Product and actor scope may be partially known.

## 5. Exit Conditions

Valid intent proceeds to I02 or I03. Missing activation, eligibility, ownership, or profile requirements route to the authoritative module or safe support state.

## 6. Layout Structure

Top to bottom: product/instrument identity; action selector; account/ownership context; current eligibility and activation status; high-level risk/liquidity/tax notice; next-step explanation; primary continue; safe return/help.

## 7. Component Placement

Existing: Page Header, Card, Radio/Segmented Control, Badge, Alert, Button, Link, Loading, Error.

New: Instruction Type Selector, Investment Context Summary, Entitlement Preview, Product Capability Summary.

## 8. Information Priority

Exact product, action, ownership/account scope, and current ability to continue precede amount or payment. Do not display a generic “Invest” action if the actual action is redemption, switch, STP, or SWP.

## 9. Interaction Behaviour

Selecting an action updates required inputs and re-evaluates capability. Back preserves safe context. Continue triggers server validation and idempotent instruction creation. Duplicate intent opens the existing instruction rather than creating a new one.

## 10. Screen States

Default, loading, product unavailable, eligibility pending, restricted, activation pending, account required, investor suspended, offline, error, duplicate instruction found, and success to setup.

## 11. Validation Rules

Action must be supported for the instrument, account scope, actor, and current product capability. Switch/STP/SWP require source and target or schedule information. Redemption requires owned holding.

## 12. Error Behaviour

Distinguish unsupported action, restricted product, missing activation, missing holding, stale policy, duplicate instruction, and technical failure. Preserve context and provide the authoritative next step.

## 13. Success Behaviour

Create one provisional instruction with correlation and idempotency keys. Confirm only that setup started, not that money moved or order succeeded.

## 14. Motion Recommendation

Use stable action selection and status transitions. Avoid automatic movement to payment before the user understands the selected action.

## 15. Accessibility

Action choices have semantic labels and consequences. Eligibility and restriction status are announced. Focus moves to the first actionable setup field after successful transition.

## 16. Analytics Events

`i01_viewed`, `instruction_type_selected`, `instruction_context_validated`, `instruction_duplicate_found`, `instruction_setup_started`, `instruction_blocked`, `instruction_support_selected`.

## 17. Engineering Notes

Consumes Discovery, Portfolio, Eligibility, Activation, Account, Instrument Capability, Consent, and Entitlement services. Instruction creation is idempotent.

## 18. Acceptance Criteria

- Action type and product identity are unmistakable.
- No money movement begins on this screen.
- Unsupported or restricted actions have safe recovery paths.
- Existing draft/instruction is resumed rather than duplicated.

## 19. UX Writing Guidance

Name the action precisely: “Start a SIP,” “Redeem units,” “Switch from this fund,” or “Set up a scheduled transfer.” Avoid generic “Continue investing” language.

## 20. Design Notes

This screen should reduce the chance of starting the wrong workflow. It is a context checkpoint, not a sales prompt.

# I02 - Instruction Setup

## 1. Screen Purpose

Collect and validate one-time or scheduled instruction details for lumpsum, additional purchase, redemption, switch, STP, and SWP variants.

## 2. User Goal

Specify amount, units, source/target, schedule, and payout details accurately.

## 3. Business Goal

Create a complete, policy-valid instruction before payment, mandate, or final review.

## 4. Entry Conditions

I01 created/resumed an instruction; required product, account, holding, and capability context is available.

## 5. Exit Conditions

Valid one-time instructions proceed to I04 or I06. Recurring instructions proceed to I03/I05. Invalid or restricted entries remain correctable or route to support/review.

## 6. Layout Structure

Top to bottom: product/source/target identity; action-specific amount or units; account/folio; schedule or payout; estimated fees/tax/proceeds where approved; risk/liquidity/cutoff disclosure; validation summary; continue/save/exit.

## 7. Component Placement

Existing: Text Field, Currency/Number Field, Select, Date Picker, Radio, Card, Alert, Button, Link, Progress, Loading.

New: Instruction Builder, Account/Folio Selector, Source-Target Leg Editor, Schedule Summary, Estimated Outcome Block, Validation Summary.

## 8. Information Priority

Product/action and source/destination first; amount/units and timing second; estimated consequences third; secondary education last.

## 9. Interaction Behaviour

Amount and units remain synchronized only through server rules. Source and target legs cannot be silently swapped. Date/frequency changes revalidate cutoff and schedule. Save creates a draft, not a submitted order. Continue runs authoritative validation.

## 10. Screen States

Default, draft, loading, validation error, eligibility changed, account mismatch, insufficient units, cutoff missed, stale tax/valuation, restricted, offline draft, suspended, and valid setup.

## 11. Validation Rules

Minimum/maximum, precision, available units, lock-in, account type, target eligibility, schedule calendar, payout bank, currency, tax context, and product capability are server-authoritative.

## 12. Error Behaviour

Use field-level errors for correctable input and blocking decision panels for policy/eligibility. Never replace an unavailable estimate with zero. Preserve valid inputs after failure.

## 13. Success Behaviour

Save the validated instruction version and proceed to the correct account, mandate, payment, or review stage. No execution claim is made.

## 14. Motion Recommendation

Use restrained inline validation and leg insertion. Keep focus in the edited field and avoid reflow that hides the validation summary.

## 15. Accessibility

All numeric fields expose currency/unit and precision. Conditional fields are announced. Errors associate with fields and provide correction instructions.

## 16. Analytics Events

`i02_viewed`, `instruction_field_started`, `instruction_field_completed`, `instruction_validation_failed`, `instruction_leg_added`, `instruction_leg_removed`, `instruction_draft_saved`, `instruction_validated`.

## 17. Engineering Notes

Store instruction version, input hash, policy version, source data snapshot, and estimated-result metadata. Do not calculate tax or eligibility authoritatively on the client.

## 18. Acceptance Criteria

- Each instruction variant shows only relevant fields.
- Source/target/account context is explicit.
- Invalid and unavailable estimates are distinct.
- Draft save is resumable and idempotent.
- Valid setup cannot bypass required account, mandate, or review steps.

## 19. UX Writing Guidance

Use “estimated,” “subject to final NAV,” and “may change” where appropriate. Explain why a field is required rather than blaming the user for an error.

## 20. Design Notes

Use one builder with variant sections. Do not create separate screen architectures for each instruction type.

# I03 - Recurring Instruction Setup

## 1. Screen Purpose

Configure SIP, STP, or SWP schedules and make future debit, transfer, payout, and eligibility conditions explicit.

## 2. User Goal

Understand recurring amount, timing, duration, source/target, mandate, and what happens if a future installment cannot proceed.

## 3. Business Goal

Increase valid recurring instructions and reduce mandate failures, accidental overcommitment, and future-state confusion.

## 4. Entry Conditions

I01 or I02 identifies a recurring instruction and required product/account capability.

## 5. Exit Conditions

Valid recurring setup proceeds to I04 and I05, or to existing mandate selection and review. Schedule draft may be saved.

## 6. Layout Structure

Top to bottom: recurring action; amount/units; frequency/date; start/end or number of occurrences; source/target; mandate limit; future eligibility and failure behavior; estimated schedule; continue/save.

## 7. Component Placement

Existing: Number Field, Select, Date Picker, Radio, Calendar, Card, Alert, Button, Link, Timeline.

New: Recurrence Builder, Schedule Preview, Future-Leg Conditions Block, Mandate Limit Summary.

## 8. Information Priority

Amount, frequency, duration, source/destination, and mandate limit are primary. Future eligibility, insufficient balance, tax, and cancellation rules are adjacent to the schedule.

## 9. Interaction Behaviour

Changing frequency recalculates occurrences and mandate requirement. Schedule preview uses server calendar. Pause/cancel behavior is explicit. A future leg is not guaranteed to execute merely because the schedule is active.

## 10. Screen States

Default, existing mandate, mandate required, schedule conflict, invalid date, insufficient limit, product restriction, policy stale, loading, offline draft, error, pending, suspended, and valid schedule.

## 11. Validation Rules

Frequency, dates, limits, occurrence count, source units/balance, target eligibility, market holidays, and account type use canonical policy/calendar services.

## 12. Error Behaviour

Explain the exact schedule field or policy condition. Do not silently shift dates or amounts. If a future condition cannot be guaranteed, show the condition and recovery path.

## 13. Success Behaviour

Persist a schedule draft or submit for mandate/review. Confirm schedule creation only after the schedule service returns an authoritative ID.

## 14. Motion Recommendation

Use a stable schedule preview update; do not animate future debits as completed transactions.

## 15. Accessibility

Schedule previews must be readable as a linear list/table. Date and frequency controls have labels, current value, and timezone.

## 16. Analytics Events

`i03_viewed`, `recurrence_amount_set`, `recurrence_frequency_set`, `recurrence_date_set`, `recurrence_schedule_previewed`, `recurrence_validation_failed`, `recurrence_draft_saved`, `recurrence_submitted`.

## 17. Engineering Notes

Schedule service owns occurrence generation. Future legs re-evaluate eligibility, account, compliance, balance, and mandate state. Store timezone and calendar version.

## 18. Acceptance Criteria

- Future debit/transfer behavior is explicit.
- Schedule preview is not represented as completed investment.
- Mandate limit and failure behavior are visible.
- Date changes are policy/calendar-driven and never silent.

## 19. UX Writing Guidance

Use “scheduled,” “expected,” and “subject to future checks.” Avoid “guaranteed monthly investment” language.

## 20. Design Notes

Recurring investment is a commitment and should feel deliberate without adding unnecessary friction.

# I04 - Bank Selection

## 1. Screen Purpose

Select the verified bank account for funding or payout and enforce account ownership, NRE/NRO, repatriability, and action compatibility.

## 2. User Goal

Know exactly which account will fund or receive money and verify that it is permitted for the instruction.

## 3. Business Goal

Prevent cross-funding, wrong-bank payout, payment failures, and regulatory breaches.

## 4. Entry Conditions

Instruction requires funding or payout and bank service returns permitted accounts or an add-bank path.

## 5. Exit Conditions

Verified compatible bank selected -> payment/mandate/review. Missing or failed bank -> add/verify, recovery, or support.

## 6. Layout Structure

Top to bottom: funding/payout explanation; eligible bank list; masked account and account type; repatriability/compatibility; add/verify bank; restriction/help; continue.

## 7. Component Placement

Existing: Card, Radio, Masked Field, Badge, Button, Link, Alert, Loading, Empty, Error.

New: Bank Compatibility Row, Funding/Payout Context Block, Bank Verification Status, Account-Type Warning.

## 8. Information Priority

Direction of money, bank identity, account type, ownership, and compatibility precede payment method selection.

## 9. Interaction Behaviour

Selecting a bank triggers compatibility evaluation. Add-bank requires step-up and follows approved bank management. A selected bank cannot be changed after irreversible payment without explicit recovery behavior.

## 10. Screen States

Verified bank available, no bank, verification pending, verification failed, unsupported bank, NRE/NRO mismatch, expired bank, restricted, loading, offline read-only, error, suspended.

## 11. Validation Rules

Ownership, account type, currency, repatriability, folio/order compatibility, bank status, and action direction are server-authoritative.

## 12. Error Behaviour

Distinguish no verified bank, unsupported bank, mismatch, outage, and security hold. Never show a bank as eligible based only on client-entered details.

## 13. Success Behaviour

Persist selected bank reference and compatibility result for the current instruction version. Do not treat selection as payment authorization.

## 14. Motion Recommendation

Use stable selection feedback and explicit revalidation. Do not animate a bank into verified status before the bank service confirms it.

## 15. Accessibility

Bank rows expose name, masked account, type, ownership, eligibility, and action. Radio selection and status are semantic and not colour-only.

## 16. Analytics Events

`i04_viewed`, `bank_selected`, `bank_compatibility_checked`, `bank_add_started`, `bank_verification_required`, `bank_restricted`, `bank_selection_completed`.

## 17. Engineering Notes

Bank service owns verification and compatibility. Store bank reference, account type, ownership result, freshness, policy version, and instruction correlation. Do not log raw account numbers.

## 18. Acceptance Criteria

- Funding and payout direction is unmistakable.
- Incompatible NRE/NRO or ownership combinations cannot continue.
- Bank selection does not imply payment success.
- Add/verify/recovery paths are available without a dead end.

## 19. UX Writing Guidance

Use “fund from” and “receive payout in” rather than ambiguous “link account.” Explain repatriability without offering legal advice.

## 20. Design Notes

The bank is a financial control, not a profile preference. Treat selection as a high-trust checkpoint.

# I05 - Mandate Setup

## 1. Screen Purpose

Create, authorize, verify, recover, or select a recurring debit mandate for SIP and other supported recurring instructions.

## 2. User Goal

Understand what recurring authority is being granted, for how much, until when, and how it can be stopped.

## 3. Business Goal

Increase valid mandate activation and reduce failed debits, duplicate mandates, and unowned payment authority.

## 4. Entry Conditions

Recurring instruction requires a new mandate, existing mandate is unavailable/expired, or user chooses an eligible existing mandate.

## 5. Exit Conditions

Mandate submitted/pending/approved/rejected, selected existing mandate, or recovery/support.

## 6. Layout Structure

Top to bottom: recurring instruction summary; bank/account; mandate amount/limit/frequency/duration; consent and authorization explanation; provider handoff; status/recovery; continue/return.

## 7. Component Placement

Existing: Card, Masked Field, Badge, Checkbox, Button, Link, Alert, Loading, Timeline.

New: Mandate Summary, Recurring Authority Disclosure, Provider Return Status, Mandate Recovery Panel.

## 8. Information Priority

Authority granted, bank, amount/limit, timing, duration, cancellation, and failure behavior precede provider details.

## 9. Interaction Behaviour

Provider handoff uses a correlation ID and return context. Back/close during provider flow creates pending/unknown status, not cancellation. Duplicate mandate attempts attach to the existing record.

## 10. Screen States

Ready, provider handoff, pending, approved, rejected, expired, duplicate, bank mismatch, timeout/unknown, offline, restricted, suspended, recovery required.

## 11. Validation Rules

Bank verified, mandate limit sufficient, recurring amount/frequency valid, consent present, provider capability available, and instruction correlation valid.

## 12. Error Behaviour

Separate provider rejection, user cancellation, callback timeout, bank outage, duplicate, and policy restriction. Never tell the user a mandate is active without server confirmation.

## 13. Success Behaviour

Show mandate ID/status and link it to the recurring instruction. Approval means debit authority is active, not that an investment installment has settled.

## 14. Motion Recommendation

Use progress for provider handoff and stable return. No success animation before server confirmation.

## 15. Accessibility

Authorization content is keyboard accessible, read in logical order, and summarized after provider return. Status changes are announced once.

## 16. Analytics Events

`i05_viewed`, `mandate_summary_viewed`, `mandate_authorization_started`, `mandate_provider_returned`, `mandate_pending`, `mandate_approved`, `mandate_rejected`, `mandate_recovery_started`.

## 17. Engineering Notes

Mandate provider callbacks are asynchronous and idempotent. Store consent version, provider reference, limits, dates, bank reference, and audit evidence.

## 18. Acceptance Criteria

- User knows the authority being granted.
- Pending and approved mandate states are distinct.
- Provider return timeout cannot duplicate the mandate.
- Cancellation/recovery path is explicit.

## 19. UX Writing Guidance

Use “authorize recurring debits” and state the maximum/limit. Do not use “set and forget” or imply guaranteed investment execution.

## 20. Design Notes

Mandate trust depends on precision. Keep the amount, limit, bank, and stop behavior near the confirmation action.

# I06 - Payment Authorization

## 1. Screen Purpose

Authorize a one-time payment or safely return from a payment provider without confusing payment state with order state.

## 2. User Goal

Know the amount, source account, provider, and current payment outcome, and avoid duplicate payment.

## 3. Business Goal

Maximize reconciled payments and prevent duplicate debits, unmatched orders, and unsafe retries.

## 4. Entry Conditions

Instruction is valid, bank/payment capability is approved, and payment request has an idempotency key.

## 5. Exit Conditions

Payment confirmed, failed, pending, timeout/unknown, cancelled by user, refund pending, or support/reconciliation.

## 6. Layout Structure

Top to bottom: instruction and amount; source bank/account; payment method/provider; authorization explanation; security/support notice; provider return/status; safe recovery action.

## 7. Component Placement

Existing: Payment Summary Card, Bank Card, Button, Alert, Loading, Error, Timeline, Link.

New: Payment Authorization Block, Duplicate Payment Guard, Provider Return State.

## 8. Information Priority

Amount and source account first; payment purpose and provider second; status and next action third. Security and duplicate-risk guidance sits before retry.

## 9. Interaction Behaviour

Provider handoff is explicit. Return handling queries the payment ledger. Closing the provider does not mark failed. Retry is disabled until duplicate/outcome risk is resolved.

## 10. Screen States

Ready, provider loading, awaiting authorization, success, failed, gateway timeout, bank debit unknown, duplicate detected, offline, payment pending, order pending, refund pending, restricted, suspended.

## 11. Validation Rules

Payment amount, currency, source account, account type, instruction version, provider capability, expiry, and idempotency are authoritative.

## 12. Error Behaviour

Show payment failure separately from order failure. If money may have moved, show unknown/reconciliation and do not offer immediate retry.

## 13. Success Behaviour

Confirm payment only from the payment ledger. Route to I08 for order status; do not say the investment is complete.

## 14. Motion Recommendation

Use restrained provider loading and return-state feedback. Avoid automatic transitions that could cause duplicate confirmation.

## 15. Accessibility

Amount, account, provider, and current state are announced. Focus after return is controlled, and retry consequence is explicit.

## 16. Analytics Events

`i06_viewed`, `payment_authorization_started`, `payment_provider_opened`, `payment_provider_returned`, `payment_confirmed`, `payment_failed`, `payment_timeout`, `payment_unknown_outcome`, `payment_retry_blocked`.

## 17. Engineering Notes

Payment provider callbacks must be authenticated, idempotent, replayable, and reconciled. Never use the client return URL as payment truth.

## 18. Acceptance Criteria

- Payment and order state are distinct.
- Unknown outcome blocks unsafe duplicate retry.
- Amount/source/account are clear before provider handoff.
- Refund and reconciliation paths exist.

## 19. UX Writing Guidance

Say “payment status is being confirmed” when uncertain. Never say “payment failed” when a debit may have occurred.

## 20. Design Notes

The most important outcome is not a fast transition; it is an unambiguous money state.

# I07 - Order Review & Confirmation

## 1. Screen Purpose

Provide the final, authoritative review before submitting a money-affecting instruction.

## 2. User Goal

Verify product, action, amount, account, timing, tax/fees, risks, and consequences before confirming.

## 3. Business Goal

Reduce preventable errors, complaints, cancellations, and unsuitable transactions while capturing required confirmation evidence.

## 4. Entry Conditions

Instruction, account, bank/mandate/payment context, eligibility, compliance, risk, policy, and required disclosures are valid and fresh enough.

## 5. Exit Conditions

Confirmed instruction -> payment/mandate/order processing. Edit -> setup. Blocked/review -> authoritative state or support.

## 6. Layout Structure

Top to bottom: action/product; source/destination/account; amount/units/frequency; expected timing/cutoff; fees/tax/proceeds estimate; risk/liquidity; eligibility; cancellation limits; consent/acknowledgement; confirm/edit/help.

## 7. Component Placement

Existing: Card, Summary, Alert, Checkbox, Button, Link, Disclosure, Badge, Timeline.

New: Order Review Card, Risk Acknowledgement Card, Account Confirmation Block, Finality/Change Notice, Confirmation Evidence Block.

## 8. Information Priority

Money source/destination and product/action first; material financial/regulatory facts second; timing and changeability third; education last.

## 9. Interaction Behaviour

Confirm requires required acknowledgement and fresh entitlement check. Edit returns to the relevant setup section. Double-submit is prevented. High-risk actions require step-up. Review snapshot is immutable after confirmation.

## 10. Screen States

Ready, loading revalidation, changed since review, missing consent, restricted, risk step-up, payment required, mandate required, offline, error, suspended, confirmed, duplicate instruction found.

## 11. Validation Rules

All fields match instruction version and current policy. Fees/tax/proceeds are labelled by finality. Required declarations and risk acknowledgement use approved content versions.

## 12. Error Behaviour

If any material value changes, show what changed and require review again. Do not preserve a stale confirm action. Explain blocked entitlements without exposing internal signals.

## 13. Success Behaviour

Record confirmation actor, timestamp, consent, disclosure versions, policy version, device/session, correlation, and instruction snapshot. Route to the correct payment/mandate/order state.

## 14. Motion Recommendation

Use a deliberate confirmation transition and clear status update. Avoid celebratory motion before authoritative order outcome.

## 15. Accessibility

Review content is linear and scannable. Required acknowledgement, change notices, and confirmation result are announced and focus-managed.

## 16. Analytics Events

`i07_viewed`, `order_review_section_opened`, `order_review_edit_selected`, `risk_acknowledgement_viewed`, `order_confirm_started`, `order_confirm_blocked`, `order_confirmed`, `order_review_changed`.

## 17. Engineering Notes

Review snapshot and confirmation evidence are immutable. API must reject stale instruction versions and require a new review after material changes.

## 18. Acceptance Criteria

- User can identify source account, action, amount, and expected outcome.
- Material risk, cost, tax, and cancellation terms are not hidden.
- Stale review cannot submit.
- Confirmation evidence is auditable.

## 19. UX Writing Guidance

Use a direct confirmation verb that names the consequence. Avoid “Done” or “Continue” for money-affecting confirmation.

## 20. Design Notes

This is the final cognitive checkpoint. It must be calm, complete, and free from promotional distraction.

# I08 - Order Status

## 1. Screen Purpose

Show the authoritative, evolving status of payment, order, execution, settlement, refund, cancellation, and portfolio update.

## 2. User Goal

Know what happened, what is still pending, whether money moved, and what action is safe next.

## 3. Business Goal

Reduce duplicate actions and support demand while increasing trust in asynchronous processing.

## 4. Entry Conditions

Confirmed instruction, payment callback, order deep link, notification, Portfolio activity, or recovery case.

## 5. Exit Conditions

I09 receipt after final outcome, I10 recovery for exception, Portfolio/Reports for settled data, or safe wait/refresh.

## 6. Layout Structure

Top to bottom: current state and last updated; order/payment/execution identifiers; amount and account; stage timeline; expected next step/SLA; action availability; portfolio/report link; support.

## 7. Component Placement

Existing: Page Header, Badge, Timeline, Card, Alert, Button, Link, Loading, Error, Table.

New: Order Status Tracker, Payment Status Card, Execution Leg Row, Next-Step/SLA Block, Outcome Certainty Block.

## 8. Information Priority

Current state and money certainty first; what is pending and who owns it second; timeline and action availability third; technical details last.

## 9. Interaction Behaviour

Refresh queries authoritative state and is rate-limited. Cancel appears only if permitted. Retry appears only when safe. Composite orders expose leg states. Back/deep link preserves the same order scope.

## 10. Screen States

Processing, payment pending, order pending, accepted, partially executed, settled, rejected, expired, cancelled, reversed, unknown outcome, refund pending/completed, reconciliation required, delayed, offline, source unavailable, suspended.

## 11. Validation Rules

Status comes from order/payment/execution/settlement services. Timeline events must be ordered and source-labelled. Customer-safe reason categories are controlled.

## 12. Error Behaviour

Distinguish stale status from service error and unknown outcome. Never show a generic failure if a side effect may have occurred. Open I10 when action is required.

## 13. Success Behaviour

Final outcome links to I09, Portfolio, Reports, refund, or cancellation evidence. “Settled” requires settlement source confirmation, not only exchange acceptance.

## 14. Motion Recommendation

Use restrained timeline updates and announce only new material events. Do not auto-refresh so aggressively that status appears unstable.

## 15. Accessibility

Timeline is also represented as a linear list. Current state, uncertainty, timestamps, and next action are announced. Refresh retains focus.

## 16. Analytics Events

`i08_viewed`, `order_status_refreshed`, `order_status_changed`, `order_cancel_requested`, `order_retry_selected`, `order_reconciliation_opened`, `order_support_selected`, `order_receipt_opened`.

## 17. Engineering Notes

Status projection consumes event-sourced domain records. Late callbacks and corrections update the timeline with lineage. Cache status with freshness; never cache as current after suspension/revocation.

## 18. Acceptance Criteria

- Payment, order, execution, settlement, refund, and portfolio states are distinct.
- Unknown outcomes prevent duplicate action.
- Composite legs are understandable.
- Every pending/delayed state has owner/SLA or safe explanation.

## 19. UX Writing Guidance

Use “we are confirming” for unknown outcomes and “accepted by [stage]” only when that stage is authoritative. Avoid “successful” for a merely submitted order.

## 20. Design Notes

Status is a product surface, not a technical log. Show only details that help the user understand or recover.

# I09 - Investment Receipt

## 1. Screen Purpose

Provide durable evidence of a confirmed order, settlement, refund, cancellation, or completed mandate outcome.

## 2. User Goal

Know the final confirmed result, reference, amount/units, timing, and where it appears in Portfolio or Reports.

## 3. Business Goal

Create trustworthy evidence, reduce repeat support, and connect the transaction to authoritative records.

## 4. Entry Conditions

Owning services confirm a final outcome appropriate to the receipt type.

## 5. Exit Conditions

Portfolio, Reports, transaction detail, support, notification preferences, or return to discovery.

## 6. Layout Structure

Top to bottom: final outcome; receipt/reference; product/action; amount/units/account; confirmed dates/source; tax/fee/refund context; portfolio/report link; download/share/support.

## 7. Component Placement

Existing: Card, Badge, Button, Link, Table, Secure Download, Alert.

New: Success Receipt, Finality Badge, Portfolio Impact Card, Evidence Metadata Block.

## 8. Information Priority

Finality and reference first; product/action and financial result second; source/date and downstream impact third.

## 9. Interaction Behaviour

Download/export requires entitlement and audit. Portfolio link opens current data with freshness. If settlement is final but Portfolio update is delayed, show both states.

## 10. Screen States

Order accepted receipt, settled receipt, cancellation receipt, refund completed, mandate approved, provisional receipt, amended receipt, link expired, restricted download, offline cached artifact, error.

## 11. Validation Rules

Receipt type must match authoritative outcome and finality. Amount/units/currency and references come from ledger/source records.

## 12. Error Behaviour

Do not generate a final receipt for pending/unknown outcomes. If document generation fails, preserve the underlying result and offer retry/support.

## 13. Success Behaviour

Receipt is versioned, hashed, auditable, and linked to source transaction/order. Amended outcomes preserve lineage.

## 14. Motion Recommendation

Use restrained confirmation feedback. The evidence itself is the trust signal; avoid celebratory animation for redemption or loss-related outcomes.

## 15. Accessibility

Receipt content is a semantic document/table with accessible download, clear headings, meaningful filenames, and readable status text.

## 16. Analytics Events

`i09_viewed`, `receipt_downloaded`, `receipt_shared`, `portfolio_impact_opened`, `report_link_opened`, `receipt_support_selected`, `receipt_amended_viewed`.

## 17. Engineering Notes

Receipt artifact generation uses immutable source snapshot and versioned template. Secure links expire independently from the underlying receipt.

## 18. Acceptance Criteria

- Receipt exists only for an appropriate authoritative outcome.
- Finality and source are clear.
- Portfolio/report delays are not hidden.
- Download and share are permissioned and audited.

## 19. UX Writing Guidance

Use “confirmed,” “settled,” “refunded,” or “cancelled” precisely. Do not call an accepted order “invested” until settlement/portfolio rules allow it.

## 20. Design Notes

This screen is evidence, not celebration. It should be printable, reviewable, and understandable months later.

# I10 - Investment Recovery

## 1. Screen Purpose

Provide one safe recovery surface for payment failures, unknown outcomes, rejected/expired/cancelled orders, refund delays, reconciliation issues, mandate failures, and support escalation.

## 2. User Goal

Understand whether money or an order may exist, avoid duplicate action, and know the safest next step.

## 3. Business Goal

Reduce financial loss, duplicate processing, manual contacts, and unresolved operational exceptions.

## 4. Entry Conditions

I08 or notification identifies a recoverable exception, or a user opens a support-linked investment case.

## 5. Exit Conditions

Safe retry, corrected setup, wait/pending status, refund tracking, cancellation result, I09 receipt, or Support/Operations/Finance/Compliance case.

## 6. Layout Structure

Top to bottom: exception summary; known versus unknown facts; money/order certainty; timeline; safe actions; prohibited action warning; owner/SLA; support/case reference; related receipt/report.

## 7. Component Placement

Existing: Alert, Card, Timeline, Badge, Button, Link, Error/Loading, Dialog.

New: Recovery Decision Panel, Duplicate-Risk Warning, Reconciliation Status Card, Human Ownership Block, Refund Status Card, Safe Retry Action.

## 8. Information Priority

Whether money may have moved first; current safe state second; exact next action and prohibited duplicate action third; technical detail last.

## 9. Interaction Behaviour

Refresh, retry, cancel, alternate payment, re-verify bank, track refund, open support, and return to order are conditionally enabled by server entitlement. Safe retry creates a new idempotency key only after the prior attempt is resolved as non-side-effecting.

## 10. Screen States

Payment failed, gateway timeout, duplicate payment suspected, order created/payment failed, payment success/order pending, order rejected, order expired, cutoff missed, duplicate order, cancelled, partial order, refund pending, refund completed, reconciliation required, delayed, restricted, suspended, offline.

## 11. Validation Rules

Recovery action must match current domain states, attempt version, ownership, policy, and idempotency conditions. No retry is offered for unknown side effects without reconciliation clearance.

## 12. Error Behaviour

If recovery service is unavailable, preserve the last authoritative state, suppress duplicate actions, and provide a durable support path. Never replace uncertainty with failure.

## 13. Success Behaviour

Show the resulting domain state and next owner. A recovery action succeeds only after its own authoritative acknowledgement.

## 14. Motion Recommendation

Use clear, restrained progress for reconciliation and refund tracking. Avoid automatic repeated retries or countdown pressure.

## 15. Accessibility

Recovery state, uncertainty, prohibited action, owner, SLA, and next action are announced. Dialog consequences are explicit and focus-managed.

## 16. Analytics Events

`i10_viewed`, `recovery_state_viewed`, `safe_retry_requested`, `retry_blocked_duplicate_risk`, `refund_status_viewed`, `reconciliation_started`, `recovery_support_selected`, `recovery_completed`.

## 17. Engineering Notes

Recovery consumes order, payment, refund, bank, mandate, reconciliation, support, and entitlement services. It must never mutate upstream state without the owning API and audit event.

## 18. Acceptance Criteria

- All known payment/order/recovery states have a safe path.
- Duplicate risk is explicit and blocks unsafe retries.
- Refund and reconciliation are separately trackable.
- Human ownership and SLA appear when automated recovery cannot resolve the issue.
- No failure state becomes a dead end.

## 19. UX Writing Guidance

Use factual language: “We are confirming whether your payment was received.” Avoid blame, false reassurance, or technical gateway codes.

## 20. Design Notes

Recovery is part of the core investment experience, not a support afterthought. It should be designed with the same priority as the happy path.

## 17. Investment Component Inventory

Reusability score: 5 is platform-wide; 1 is instruction-specific.

| Component | Purpose | Existing or New | Dependencies | Variants | States | Reusability |
|---|---|---|---|---|---|---:|
| Instruction Type Selector | Choose purchase, redemption, switch, or schedule action | New | Instrument capability, entitlement | One-time, recurring, transfer | Available, restricted, unsupported | 5 |
| Investment Context Summary | Show product, action, owner, account, and source | New | Identity, account, portfolio | Purchase, redemption, transfer | Loading, valid, stale, blocked | 5 |
| Instrument Identity Block | Exact product/plan/option identity | Discovery extension | Product master | MF, ETF, bond, future | Current, merged, discontinued | 5 |
| Instruction Builder | Collect action-specific terms | New | Product capability, policy | Purchase, redemption, switch, schedule | Draft, validating, valid, invalid | 5 |
| Source-Target Leg Editor | Configure composite orders | New | Portfolio, eligibility, order | Switch, STP, transfer | Empty, partial, valid, conflict | 5 |
| Account/Folio Selector | Select legal ownership and account context | New | Account, folio, permission | NRE, NRO, household | Loading, selected, mismatch, expired | 5 |
| Bank Compatibility Row | Express funding/payout compatibility | New | Bank, policy, account | Funding, payout, mandate | Verified, pending, failed, restricted | 5 |
| Amount/Units Field | Capture monetary or unit instruction | Existing, extend | Product rules, currency | Amount, units, percentage | Empty, invalid, valid, stale | 5 |
| Schedule Builder | Configure recurring dates and frequency | New | Calendar, schedule policy | SIP, STP, SWP | Draft, conflict, valid, pending | 5 |
| Schedule Preview | Explain future occurrences | New | Calendar, instruction | Installments, transfers, payouts | Estimated, valid, unavailable | 5 |
| Mandate Summary | Explain recurring debit authority | New | Bank, mandate, consent | New, existing, expired | Pending, approved, rejected, expired | 5 |
| Recurring Authority Disclosure | Explain limits and cancellation | New | Consent, policy | SIP, recurring debit | Presented, accepted, declined | 5 |
| Payment Summary Card | Show payment amount/source/status | Existing, extend | Payment ledger, bank | One-time, installment | Ready, pending, failed, unknown | 5 |
| Payment Authorization Block | Explain provider handoff and return | New | Payment gateway | Net banking, UPI, fallback | Ready, handoff, returned, unknown | 5 |
| Duplicate Payment Guard | Prevent unsafe repeat payment | New | Payment/reconciliation | Retry, timeout, callback gap | Clear, blocked, resolved | 5 |
| Risk Acknowledgement Card | Capture material risk understanding | Existing pattern, extend | Risk/product policy | Purchase, redemption, schedule | Required, accepted, stale | 5 |
| Order Review Card | Final instruction review | New | All snapshots, entitlement | One-time, recurring, composite | Ready, changed, blocked, confirmed | 5 |
| Finality/Change Notice | Explain what can change after confirmation | New | Price, cutoff, settlement | Purchase, redemption, schedule | Visible, updated | 4 |
| Order Status Tracker | Show payment/order/execution/settlement | New | Order event stream | One order, composite | Pending, accepted, partial, settled, failed | 5 |
| Execution Leg Row | Show each leg status | New | Order legs, execution | Switch, STP, SWP | Pending, complete, failed, reversed | 5 |
| Outcome Certainty Block | State known/unknown side effect | New | Payment/order/reconciliation | Confirmed, unknown, reconciled | Known, uncertain, resolved | 5 |
| Transaction Timeline | Provide auditable customer timeline | Existing, extend | Audit-safe event projection | Order, payment, refund, mandate | Current, corrected, delayed | 5 |
| Portfolio Impact Card | Link confirmed outcome to holdings | New | Portfolio read model | Purchase, redemption, switch | Pending, updated, stale | 5 |
| Success Receipt | Provide durable evidence | New | Report/document service | Order, refund, mandate, cancellation | Provisional, final, amended | 5 |
| Recovery Decision Panel | Offer safe next actions | New | Entitlement, reconciliation | Payment, order, refund, mandate | Retry, wait, support, blocked | 5 |
| Refund Status Card | Track refund lifecycle | New | Finance/refund ledger | Payment, order | Pending, sent, completed, unknown | 5 |
| Reconciliation Status Card | Explain source matching | New | Reconciliation service | Payment/order/portfolio | Required, in progress, complete | 5 |
| Human Ownership Block | Show team, case, and SLA | Existing cross-module pattern | Support/operations/SLA | Support, Finance, Compliance | Assigned, escalated, waiting | 5 |
| Safe Retry Action | Gate idempotent retry | New | Attempt ledger, entitlement | Payment, mandate, API | Allowed, blocked, processing, complete | 5 |
| Provider Return State | Handle external redirect safely | New | Provider callback | Payment, mandate, eSign | Waiting, returned, timeout | 5 |
| Consent Evidence Block | Show confirmation scope/version | Existing, extend | Consent/audit | Payment, mandate, order | Required, accepted, expired | 5 |
| Capability Descriptor | Describe supported product actions | New | Product capability service | MF, ETF, bond, future | Supported, conditional, unsupported | 5 |

## 18. Money Movement Component Library

| Component | Purpose | Required information |
|---|---|---|
| Investment Summary Card | Summarize instruction before payment | Product, action, amount/units, account, timing, eligibility |
| Order Review Card | Final review before confirmation | Full terms, fees/tax, risk, cutoff, cancellation, consent |
| Mandate Card | Explain recurring debit authority | Bank, limit, frequency, start/end, authorization, cancellation |
| Bank Card | Identify source/destination bank safely | Masked account, type, ownership, repatriability, compatibility |
| Payment Status Card | Explain payment state | Amount, provider, payment reference, state, certainty, next action |
| Risk Acknowledgement Card | Capture material risk acknowledgement | Risk, liquidity, loss possibility, suitability/disclosure version |
| Transaction Timeline | Explain asynchronous events | Stage, time, source, state, correction/late callback marker |
| Order Status Tracker | Separate payment/order/execution/settlement | Stage statuses, current owner, SLA, available actions |
| Portfolio Impact Card | Explain when holdings/report update | Expected impact, current Portfolio state, freshness, source |
| Success Receipt | Durable confirmation evidence | Final outcome, reference, amount/units, source, date, download |
| Recovery Status Card | Explain failure/uncertainty | Known facts, possible side effect, retry rule, reconciliation owner |
| Refund Status Card | Track money returning | Original payment, refund reference, amount, state, bank timing |
| Cutoff Notice | Explain timing and NAV/order impact | Current time, cutoff, holiday/calendar source, consequence |
| Tax Estimate Card | Show provisional deduction/proceeds | Inputs, estimate label, rule version, finality, disclaimer |
| Eligibility Decision Card | Explain action availability | Scope, result, reason category, policy version, expiry, next step |
| Account Compatibility Card | Prevent NRE/NRO mismatch | Source/destination, account type, action compatibility, restriction |
| Duplicate Risk Notice | Stop unsafe repeat action | Prior attempt, possible side effect, reconciliation instruction |
| Human Escalation Card | Make manual ownership visible | Case ID, team, SLA, next update, shared context |

## 19. Cross-Product Capability Contract

Future products must declare capability metadata rather than inherit unsupported mutual-fund behavior:

| Capability | Required descriptor |
|---|---|
| Purchase | Amount/units/price model, minimum, maximum, currency, cutoff |
| Recurring | Frequency, mandate, schedule, pause/cancel, future eligibility |
| Redemption | Ownership, liquidity, settlement, payout, lock-in, fees |
| Transfer/switch | Source/target, composite legs, tax, settlement, partial completion |
| Payment | Supported rails, currency, account types, authorization, refunds |
| Risk | Risk taxonomy, methodology, suitability boundary, disclosures |
| Tax | Jurisdiction, estimate/final status, source, effective date |
| Settlement | Venue, cycle, callback, reconciliation, correction |
| Reporting | Receipt, statement, tax report, artifact finality |
| Support | Owner, SLA, escalation, human review |

## 20. Investment Analytics Contract

### Core events

`investment_intent_started`, `instruction_created`, `instruction_saved`, `instruction_validated`, `bank_selected`, `mandate_started`, `mandate_approved`, `payment_started`, `payment_confirmed`, `payment_failed`, `payment_unknown_outcome`, `review_opened`, `confirmation_submitted`, `order_created`, `order_accepted`, `order_rejected`, `order_expired`, `order_cancelled`, `order_partial`, `order_settled`, `refund_started`, `refund_completed`, `reconciliation_required`, `receipt_viewed`, `recovery_started`, `support_handoff`.

### Required properties

`screen_id`, `instruction_id_hash`, `order_id_hash`, `correlation_id`, `action_type`, `instrument_type`, `account_type`, `country_context`, `activation_state`, `eligibility_category`, `payment_method_category`, `order_state`, `policy_version`, `data_freshness_category`, and `attempt_number`.

### Prohibited data

PAN, full bank/account details, OTP, payment credentials, raw provider payloads, full support conversation, tax IDs, KYC evidence, and raw device identifiers.

## 21. Independent Principal Product Review

### Missing scenarios

- User changes bank after review but before payment.
- User returns from payment provider on another device or after session expiry.
- Payment succeeds but the user closes the app before order creation.
- Payment is debited twice with one order reference.
- Order is accepted after cancellation request.
- One switch leg settles and the other rejects.
- An STP/SWP future leg becomes ineligible after the schedule is active.
- A SIP mandate is active but the first debit fails.
- A redemption is blocked by a lien, legal claim, death hold, or repatriation limit.
- Portfolio update is delayed after order settlement.
- User has insufficient units after a pending redemption or concurrent order.
- User receives a notification claiming completion while the authoritative ledger remains pending.
- User is offline at confirmation or returns from an external provider.
- An RM prepares an order but investor consent expires before confirmation.
- A country or policy change invalidates a queued order.
- A provider sends duplicate, late, or contradictory callbacks.

### Missing lifecycle states

Add these as projections of the locked state machines where required:

`REVIEW_STALE`, `PAYMENT_AUTHORIZATION_REQUIRED`, `PAYMENT_UNKNOWN_OUTCOME`, `ORDER_CREATED_PAYMENT_FAILED`, `PAYMENT_SUCCESS_ORDER_PENDING`, `CANCEL_RACE`, `PARTIAL_LEG_OUTCOME`, `REFUND_UNKNOWN_OUTCOME`, `MANDATE_REAUTH_REQUIRED`, `FUTURE_LEG_RESTRICTED`, `PORTFOLIO_UPDATE_DELAYED`, and `RECEIPT_AMENDED`.

### Missing compliance considerations

- Re-evaluate country, account, risk, tax, and product eligibility immediately before confirmation.
- Require approved language for exit load, TDS, DTAA, repatriation, PFIC/FAPI, and estimated proceeds.
- High-value redemptions and changed payout banks require policy-driven step-up and review.
- RM-assisted journeys require investor authorization and EUIN/assisted-service evidence where applicable.
- Composite orders require separate leg-level audit and tax treatment.
- Recurring mandates require explicit consent, limit, frequency, duration, provider evidence, and cancellation behavior.
- Future recurring legs cannot be promised as eligible or executable without re-evaluation.

### Missing trust opportunities

- A single “money certainty” label: confirmed, pending, unknown, reconciled, or refunded.
- Side-by-side distinction between payment status and order status.
- “What changed since review” before re-confirmation.
- Explicit “do not retry yet” guidance when duplicate risk exists.
- Durable receipt and evidence links with artifact finality.
- Visible ownership for Finance/Operations/Support when automation cannot resolve an issue.

### Missing accessibility considerations

- Linear reading order for order review and transaction timelines.
- Explicit pronunciation of currency, units, negative values, and estimates.
- Accessible provider-return status and focus management.
- Screen-reader-friendly composite-order leg tables.
- Error summaries that link to fields without losing context.

### Missing reusable components

The most valuable cross-module primitives are `MoneyCertainty`, `AccountCompatibility`, `OrderReview`, `SafeRetry`, `ProviderReturn`, `OutcomeTimeline`, `FinalityNotice`, `PortfolioImpact`, and `RecoveryDecision`.

### Conflicting assumptions

1. **Payment equals order:** rejected; separate ledgers and status projections are required.
2. **Order accepted equals invested:** rejected; settlement and Portfolio update remain distinct.
3. **Cancel always works:** rejected; cancellation is state-dependent and race-prone.
4. **One workflow per product:** rejected; use capability descriptors and instruction variants.
5. **Future SIP/STP/SWP legs are guaranteed:** rejected; every leg re-evaluates eligibility and account state.
6. **Retry is always helpful:** rejected; retry can create duplicate money movement.
7. **Receipt equals finality:** rejected; receipt type must disclose whether it is provisional, final, amended, or refunded.

### Principal review decision

The strongest architecture is a shared instruction orchestration layer with product-specific capability descriptors, immutable ledgers, entitlement checks at every irreversible boundary, and one recovery surface. Additional product-specific screens would increase inconsistency without improving safety.

## 22. High-Fidelity Readiness Gates

Before high-fidelity design or engineering commitment:

- Approve the instruction capability schema for mutual funds and future products.
- Freeze payment, order, execution, settlement, refund, and reconciliation source ownership.
- Define all NRE/NRO, account, repatriation, tax, cutoff, and bank compatibility rules.
- Test the 15 failure and recovery scenarios with sandbox providers.
- Confirm customer language for pending, unknown, rejected, refund, partial, and cancellation-race states.
- Define support/Finance/Operations/Security ownership and SLAs.
- Validate accessibility of amount, review, provider return, status, receipt, and recovery patterns.
- Complete fraud/risk thresholds and step-up policy for high-value and changed-bank actions.
- Run research with NRI users on money certainty, review comprehension, and recovery trust.

## 23. Architectural Decisions Made

1. Use one shared investment orchestration layer with action and product variants.
2. Keep I01-I10 as the minimum screen architecture; do not create separate screens for every instruction type.
3. Separate payment, order, execution, settlement, refund, and Portfolio states.
4. Treat unknown outcomes as first-class states that block unsafe duplicate actions.
5. Re-evaluate entitlement at intent, setup, review, confirmation, retry, cancellation, and future recurring-leg boundaries.
6. Use a shared recovery screen for money, order, mandate, refund, and reconciliation exceptions.
7. Treat receipts as versioned evidence with explicit finality.
8. Support future asset classes through capability descriptors and product-specific extensions.
9. Preserve NRE/NRO and repatriability context through the entire journey.
10. Do not let AI, ranking, RM assistance, or client state override the locked lifecycle contract.

## 24. Assumptions Made

- Mutual-fund purchase, SIP, redemption, and basic switch are initial execution priorities.
- Payment and execution providers expose authenticated, idempotent, replayable callbacks or can be reconciled through polling/files.
- The platform can distinguish account, folio, payment, order, transaction, and portfolio scopes.
- Existing lifecycle and entitlement services are available to the investment module.
- Product-specific legal, tax, bank, cutoff, and payment rules remain UNKNOWN until signed off.
- Advanced future products will not reuse unsupported mutual-fund semantics.

## 25. Risks

- Duplicate debit or order from unsafe retry.
- Incorrect NRE/NRO or payout account routing.
- Gateway/provider callback gaps causing unknown outcomes.
- Partial switch/STP/SWP legs creating inconsistent holdings or tax events.
- Incorrect tax, TDS, DTAA, or repatriation communication.
- User interprets accepted order as settled investment.
- Cancellation race creates false cancellation confidence.
- Mandate approval is mistaken for successful first installment.
- Stale eligibility or account state permits a prohibited order.
- Provider outage near cutoff creates financial and support exposure.
- Future product expansion creates incompatible capability assumptions.

## 26. Open Questions

- Which purchase type is the first money-moving MVP?
- Which payment rails and banks are supported for each launch country and account type?
- Is redemption payout to NRO/NRE supported symmetrically, and how is repatriation tracked?
- Which switch paths are supported: intra-AMC only, or inter-AMC?
- Which SIP/STP/SWP pause, modify, cancel, and future-leg behaviors are contractually supported?
- What are exact cutoff, holiday, settlement, and callback SLAs by provider?
- What amount/velocity triggers step-up, manual review, or transaction hold?
- What is the approved refund communication and bank reconciliation timeline?
- Which external provider can support idempotent payment and mandate recovery?
- How should partial execution and partial refund be represented in reports and Portfolio?
- Which tax estimates can be shown before confirmation, and what finality language is approved?
- What RM actions are allowed, and what evidence is required for investor authorization?
- What is the operational owner for each unresolved status and provider outage?
- Which future asset class should validate the capability descriptor first?

## 27. Recommendations for the Next Module

1. Define the first Purchase Execution module around one instrument type, one payment rail, one account type path, and complete recovery coverage.
2. Build a sandbox test matrix for payment success/order pending, payment timeout, duplicate payment, order rejection, refund pending, cancellation race, and reconciliation.
3. Reuse the locked `Order`, `Payment`, `Refund`, `Eligibility`, `Consent`, `Account`, `Portfolio Data`, and `Support Case` state machines.
4. Create a canonical order/event fixture library for QA, analytics, support, and Figma state annotations.
5. Validate I07 and I08 with NRI users before visual design; these are the highest trust-risk surfaces.
6. Do not expand into SWP, STP, AIF, PMS, global investments, or insurance-linked workflows until the shared orchestration and recovery contracts are proven.
