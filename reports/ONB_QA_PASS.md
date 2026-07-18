# ONB final visual QA pass — 21 frames

Programmatic audit + fixes; no new screens/states.

**Passed as-is (verified per frame):** step captions & copper segment counts match 1–7; exactly one rim glow and one metal CTA everywhere (nominee ghost is secondary, not metal); sepia wash on all 21; split footer 56px back consistent; hero tiles 56px (64px entry is the intentional brand moment); defaults carry placeholders only; review rows match upstream data; status semantics correct (green = OTP/KYC verified only; copper/neutral = saved/declared; no activation language); no clipped fixed-size text; legal stays behind "View terms".

**Fixed (5 items):** success CTAs made destination-specific — `Continue to email` (01c), `Continue to PAN` (02c), `Continue to bank` (04c), `Continue to nominee` (05c); frame `ONB-07b · ready` renamed `· filled` for strict default/filled/success naming.
