# Centricity — Fixed Deposits Launch Film · Timing Sheet

**Master:** 1920×1080 · 30fps · **2592 frames · 86.4s**
Scene durations live in `src/Launch.tsx` (`SCENE_FRAMES`). Crossfades are 18f (600ms)
and overlap the adjoining scenes, so the total is the sum minus 6 × 18.

| # | Scene | Dur | In → Out (master frames) | Beat |
|---|-------|-----|--------------------------|------|
| 1 | Cold open | 8.0s / 240f | 0 → 240 | Statement only. No logo. 0.5s of black first. |
| 2 | Reveal | 10.0s / 300f | 222 → 522 | Wordmark fades in and sits still. Feature named. |
| 3 | Feature I — Book | 17.0s / 510f | 504 → 1014 | Device left, copy right. Tenure ladder. |
| 4 | Feature II — Compare | 17.0s / 510f | 996 → 1506 | Mirrored. Cross-bank rate table. |
| 5 | Feature III — Earn | 16.0s / 480f | 1488 → 1968 | Amber count-up. The proof beat. |
| 6 | Trust | 12.0s / 360f | 1950 → 2310 | AUM · SEBI · reach. No glow. |
| 7 | CTA | 10.0s / 300f | 2292 → 2592 | Wordmark, one line, one accent, blackout. |

## Within-scene choreography (scene-local frames)

**Cold open** — 0–15 black · 15 headline word-stagger begins (6f/word) · 96–132 hairline
rule draws to 220px · 200 exit.

**Reveal** — 20–50 wordmark fade (1000ms, fade only; brand marks never scale) · 90–120
"Fixed Deposits" in Playfair · 140 kicker line-wipe · 258 exit.

**Feature I / II** — 24 device entrance begins (33f, scale 0.92→1, rise 48px) · 57 float
loop starts (±10px, 4s sine) · 40 screen content staggers in · 66 eyebrow · 78 headline ·
126 sub-line wipe · 468 copy exits, device holds ~1.4s alone (the breathe rule).

**Feature III** — 36 eyebrow · 48 label wipe · 54 amber glow · 72–114 rate count-up
(1400ms ease-out-quart) then **holds 10.6s** · 186/210 the two stats · 258 footnote ·
432 exit.

**Trust** — 24 headline · 96 stat row · 312 exit.

**CTA** — 12–42 wordmark · 72 line · 114 button · 258–288 blackout to void.

## Social cut

`LaunchStory` (1080×1920) and `LaunchSquare` (1080×1080) run the four centre-stacked
scenes — cold open 6s, reveal 8s, Feature III 14s, CTA 8s = **1026 frames / 34.2s**.
Features I and II are side-by-side compositions and are dropped rather than crushed
into a vertical crop.

## Render

```bash
npm run studio          # live preview
npm run render          # master   → out/launch.mp4
npm run render:story    # 9:16     → out/story.mp4
npm run render:square   # 1:1      → out/square.mp4
npx remotion still src/index.ts Launch out/qc/f1900.png --frame=1900   # QC still
```
