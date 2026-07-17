# DS Code-Sync / Gap Backlog (design supersedes code — tracked for DS v1.6)

These are DESIGN decisions discovered while building the product screens where the current
published DS component renders differently than the intended spec. Per governance, design wins;
no local edit is made to the DS from the product side — these are logged for the DS/code teams to
reconcile in a version sprint. Screens apply the correct look now via **instance overrides**.

| # | Component | Issue (as-published) | Intended (design) | Applied in screens |
|---|---|---|---|---|
| CS-01 | **OTPInput** — `state=filled` | Filled boxes carry a full-strength bound border; digit reads loud, competing with the active box. | **Filled = quiet**: cream digit + `border/hairline` 1px. **Copper border reserved for the ACTIVE box only.** Error = brick on all boxes. | Instance override on all `box-*`: stroke → `border/hairline`, digit fill → `cream/100`. |
| CS-02 | **Alert** — intent border | Intent border stroke renders at **paint-opacity 1** over the intent color (`data/negative` etc.) — reads loud. | DS spec is **1px intent border @20% alpha** on the elevated surface. | Instance override: intent border stroke `opacity → 0.2` on every Alert instance (38 across A01–A17). |

**Promotion note:** fold CS-01/CS-02 into the DS v1.6 sprint alongside the Phase-1 Library Gaps
(**LG-01 CountrySelector**, **LG-02 Wordmark**). Phase 1's blocking exit criterion (CLAUDE.md §a)
covers the LG items; CS items are code-sync (no product-file blocker).
