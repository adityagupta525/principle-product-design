# FD-03 · Fund Detail (deep) — Implementation Report

**Screen:** FD-03 · Fund Detail (deep) · Kotak Gold Fund · node `405:389` · page *Fund Discovery (demo)*, FD-A section.
**Data:** all values from `src/data/funds.fixtures.ts` (`kotakGoldFund` + `KOTAK_GOLD_PEERS` + `KOTAK_GOLD_HOLDINGS`). Reference-informed by INDmoney, re-architected into Centricity's language — density reduced.

1. **Single sequenced scroll (no tabs):** Header → NRI → NAV/chart → key-facts → what-if → allocation → risk → peers → holdings → accordions → split footer.
2. **Header:** two-tone display/34 "Kotak Gold", sub-line, Hybrid·Precious-Metals chips, top-right quiet toolbar glyphs (compare/watchlist/share, no fill).
3. **NRI panel FIRST** (before performance): ✓Eligible NRE/NRO · Repatriable via NRE · USD **UNKNOWN** · Tax·DTAA **UNKNOWN** · policy source+freshness footnote.
4. **Chart:** NAV ₹56.6 / +22.42%; new dual-line (copper fund + muted off-white benchmark) on obsidian, no axis clutter; past-performance micro-line.
5. **What-if:** One-Time/SIP toggle + metal-gradient rail slider + one result card (₹50,000 → ₹91,728, illustrative disclaimer). No stacked bars.
6. **Allocation** metal bar (Gold ETF 99.85% / Cash 0.15%); **Riskometer** copper gauge → High; **Peers** quiet table, Kotak row = the screen's ONE rim-glow; **Holdings** duotone AMC logo-chip + Kotak Gold ETF 99.85%.
7. **Footer:** 56px back + ONE metal CTA "Invest now" (no second CTA). Invest sheet routes to existing Investment module (not duplicated).

Verified @375px: fixture numbers match · no clipping · exactly one rim-glow · no flat colour blocks · single metal CTA · NRI above performance. New composed assets → BACKLOG for DS promotion. PAUSED for review.
