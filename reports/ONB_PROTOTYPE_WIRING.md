# ONB prototype wiring — happy flow (21 frames, 06_Onboarding)

Reactions only; zero visual edits. Flow start: **Onboarding · happy flow @ ONB-01a**.
Transition: Smart Animate, ease-out, 300ms.

## Forward (20 click + 1 auto = 21)
- 01a→01b, 01b→01c, 01c→02a, 02a→02b, 02b→02c, 02c→03a
- 03a→03b, **03b→03c (auto, 1.2s timeout after KYC check)**, 03c→04a
- 04a→04b, 04b→04c, 04c→05a, 05a→05b, 05b→05c, 05c→06a
- 06a→06b, 06b→06c, 06c→07a, 07a→07b, 07b→07c
- Skip paths (ghost "Do it later"): 06a→07a, 06b→07a

## Back (20)
Each frame's 56px footer IconButton → previous logical frame. ONB-01a is the entry (no back).

## Review Edit links (12 = 6 rows × 07a + 07b)
mobile→01a, email→02a, pan-kyc→03a, residency→04b, bank→05b, nominee→06b.

## Notes
- Total links: **54** (21 forward incl. 1 auto-advance + 20 back + 12 edit + 1 counted within forward). Click-listed = 53; the 03b auto-advance is a frame-level AFTER_TIMEOUT reaction (verified separately).
- "View terms" disclosure NOT wired — no existing disclosure/sheet-with-legal component/state exists; logged to BACKLOG rather than inventing one.
- No new frames/states created.
