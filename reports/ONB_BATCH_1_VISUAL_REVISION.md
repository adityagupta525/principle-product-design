# ONB Batch 1 — visual craft revision (same 6 frames, no new states)

- Brand layer: `C E N T R I C I T Y` wordmark + copper ₹ hero tile (glow-copper) on ONB-01a; ID-card tile on ONB-02a/b; soft sepia ambient wash (copper/600 ≤5%) on every frame.
- Stepper de-teched: caption → `caption/10-datalabel` uppercase in text/meta ("STEP 1 OF 7 · MOBILE").
- One rim glow per screen via DS `elevation/glow-copper`: hero tile (01a/02a/02b), OTP row (01b), verified panel (01c/02c). One metal CTA unchanged.
- Success panels → trust-unlocked: 56px tinted check tile (status/verified 16%), title 20/Bold, `Verified` StatusChip, copper/shimmer border, cleaner rows.
- ONB-02 gains a glass trust card (`surface/glass` + `glass/blur`): "Your PAN goes only to the KYC Registry — we fetch, you confirm."
- Copy warmed: "Grow your money back home · Namaste!", "Check your messages", "One ID — we fetch your KYC. No uploads, no typing.", "All fetched, nothing typed — one look and onward."
- All new values token/style-bound; DS instances preserved; zero local styles; zero added states.
- Note: `setBoundVariableForPaint` drops paint opacity — tint opacities re-applied post-binding (QA'd).
