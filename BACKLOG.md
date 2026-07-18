# BACKLOG — Centricity Product Screens

Deferred work. Nothing here is built on canvas until the product owner pulls it into a batch.
Per the Token Protocol, ideas for audits/passes/migrations are **logged here, never run
unprompted.**

## Hardening (all non-happy states — deferred from every screen)

Happy flows only ship now (`default` / `filled` / `success`). These states are captured here and
built in a later hardening pass, never on the demo canvas:

- **Error** — validation, service, region-level failures + retry.
- **ONB-06 Nominee** — multi-nominee allocation split, minor-nominee guardian fields.
- **ONB-07 Review & eSign** — eSign provider handoff/return, eSign declined/expired, section
  re-verification after edit.
- **Empty** — no data / no holdings / no activity / no trusted factor.
- **Offline** — cached/stale, actions disabled.
- **Suspended / Restricted** — account hold, policy blocks, step-up required.
- **Loading** — skeletons / region loading (only if a screen needs it for the happy demo).

## Library Gaps (stage at DS quality, tag PROMOTE TO DS)

- **LG-01** CountrySelector — staged (`_staging`).
- **LG-02** Wordmark — staged (`_staging`).
- **LG-03** Floating numeric keypad — staged (`_staging` of product file "testing"
  `uYsWb51fbZLwZoZnkmuPmi`, node 15:27): surface/glass + glass/blur + copper/shimmer hairline,
  radius-xl; keys surface/glass-input, 44 touch-min; digits title/20-tabular. PROMOTE TO DS.
- **LG-04** SelectionCard — staged (`_staging` of product file "testing" `uYsWb51fbZLwZoZnkmuPmi`,
  set 51:292): radius-xl surface/card, copper-gradient (copper/400→copper/200) selected border,
  copper radio dot, 40px icon-tile slot, state=default|selected. PROMOTE TO DS.
- **Portfolio compositions** used in D1 (compose from published primitives now; promote later):
  Financial Snapshot (hero value card), Allocation Summary (donut + legend), Holding Row.

## Prototype gaps

- **View terms disclosure** — ONB-07 Review "View terms" link is unwired; DS has no
  disclosure/legal-sheet component or state to open. Stage a compact legal BottomSheet (or a DS
  disclosure state) in a later batch, then wire it. Do not invent it on canvas meanwhile.

## DS code-sync (design supersedes code — for a version sprint)

- See `reports/DS_CODE_SYNC_BACKLOG.md` (CS-01 OTP filled-state quiet; CS-02 Alert border @20%).
- **font-size/40 token** — hero portfolio value is display/40; no 40 size token exists in DS
  Typography. Add `font-size/40` in a version sprint; hero value uses a raw 40 until then.
- **Holding Row → ALI trailing=value** — once the ALI value-text slot is exposed, swap composed
  holdings rows to `ActionListItem trailing=value`.
- **LineChart period labels** — chart carries its own faint period-label row; when a period
  segmented control sits below it, reconcile the duplication in the DS component.

## Deferred flows / screens

- **ONB-02X KYC-not-found** — ONE handoff screen to 3rd-party KYC app + ONE return state
  (sanctioned by scope amendment; deferred from ONB Batch 1 to respect the 3-frame cap).

- Auth A01–A17 re-skin to the North Star visual language (split footer, two-tone headline, rich
  success) — paused; do not touch unprompted.
- Batch 4 Device & Session (A18–A20), Batch 5 Account Recovery (A21–A22) — stopped; return later.
- Portfolio P02 Holdings, P03 Holding Detail, P05 Transactions — after the Overview is approved.
