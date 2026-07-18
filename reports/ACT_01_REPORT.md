# Batch 4A — ACT-01 Activation / eSign Status (page 07_Activation)

- Three frames, happy-flow only, inheriting the onboarding visual language; DS v1.5 instances/tokens only, no local styles.
- **ACT-01a default** ("One eSign to activate"): pencil hero tile, quiet `ACTIVATION · FINAL STEP` datalabel (no step-of-7 rail — activation is post-onboarding), Activation Dependency panel with independent rows — **KYC Verified (green fact)**, Bank Saved (neutral), eSign Required (copper/processing) — CTA "Start eSign".
- **ACT-01b handoff** ("Complete eSign securely"): one in-progress frame only (no third-party provider flow); "We'll bring you back to Centricity once it's done", eSign row → In progress, CTA "Continue eSign".
- **ACT-01c success** ("Investing access activated"): seal-check hero, all three deps done (eSign → Signed green), split footer → metal "Go to home" + ghost "Explore funds". Investing called active **only here**, after eSign.
- Compliance guardrails honored: no active/investable claims in default or in-progress; green only on genuine verified facts (KYC, signed); dependency states never collapsed into one bar.
- Fixed during build: removed a duplicate rim glow (kept the status panel as the single glow); restored the metal CTA to 56px in the vertical success footer.
- Natural entry: ONB-07c "Start eSign" → ACT-01a (not wired this batch — prototype wiring is a separate pass).
- HOME not built; 08_Home not created; no KYC-not-found; no error/offline/hardening states.
