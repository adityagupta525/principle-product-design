# ONB Batch 3 — ONB-06 Nominee (skippable) · ONB-07 Review & eSign

- Six frames, happy-flow only, cloned from the approved system; no new `_staging` gaps.
- **ONB-06**: default ("Who should receive this?", users-three hero tile + glow, name / dropdown-led relationship / allocation, **ghost "Do it later"** — never forced) → filled (Arjun Sharma · Brother · 100% Tabular) → success (copper "Nominee saved" panel, "Change it anytime in Account", CTA "Continue to review").
- **ONB-07**: default ("Review before eSign" — 6-section review panel carrying the screen's one glow: Mobile/Email/PAN & KYC/Residency/Bank/Nominee, per-row copper **Edit**, legal behind "View terms" link) → ready (chips: **Verified green only for Mobile + PAN & KYC**; Saved/Declared neutral; Edit kept) → success ("Ready for eSign" / "Profile prepared" panel, caption "Nothing is live yet — eSign activates investing", CTA "Start eSign").
- Compliance guardrails honored: no "account active"/"invest now" claims; declared/recorded stay neutral; nominee never blocks review.
- DS reuse only: Button (primary + ghost), TextInput (incl. caret-down dropdown-led), StatusChip, ProgressStepper (6/7, 7/7 token-bound), Icon glyphs (users-three), text/effect styles.
- Hardening logged to BACKLOG (not drawn): multi-nominee split, guardian fields, eSign provider handoff/declined/expired, re-verify after edit.
- Full onboarding strip now runs Step 1 → 7 (21 frames) as one coherent system.
