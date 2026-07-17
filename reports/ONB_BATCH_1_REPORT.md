# ONB Batch 1 — ONB-01 Mobile OTP + ONB-02 PAN & KYC (new file "testing", DS v1.5 linked)

- File `uYsWb51fbZLwZoZnkmuPmi` pages: `06_Onboarding` (6 frames), `_staging` (LG-03).
- ONB-01a/b/c: mobile default → OTP filled (resend timer) → rich verified panel; floating keypad staged as **LG-03** instance.
- ONB-02a/b/c: PAN default → filled + inline `Checking KYC Registry` (StatusChip processing, CTA loading) → **KYC found** panel (name/DOB/PAN/address, CVL KRA source line).
- DS instances only: Button, IconButton (56 split-footer back, radius-lg), TextInput, OTPInput, ProgressStepper (7-rail overridden per step), StatusChip, Icon; styles `caption/10-datalabel`, `body/16-semibold`, `title/20-tabular`, `glass/blur`.
- All fills/spacing/radius/type token-bound (Semantic/Primitives/Typography); numerals Tabular; two-tone display/34 headlines; one metal CTA per screen.
- LG-03 FloatingKeypad staged at DS quality on `_staging`, tagged PROMOTE TO DS (already in BACKLOG).
- Deferred: ONB-02X KYC-not-found handoff + return state (allowed 2 screens) → next batch candidate with ONB-03/04.
- Known issue: Figma screenshot API serves stale tiles for full frames; document data + node-level renders verified correct.
- Awaiting review before Batch 2 (ONB-03 Residency + FATCA, ONB-04 Bank NRE/NRO + IFSC).
