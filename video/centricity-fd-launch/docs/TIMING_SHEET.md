# Centricity FD — GFF Launch Film · Timing Sheet

**Master:** 1920×1080 · 30fps · **1362 frames · 45.4s**
Scene durations live in `src/Launch.tsx` (`SCENE_FRAMES`). Crossfades are 12f (400ms)
and overlap the adjoining scenes, so the total is the sum minus 4 × 12.

| # | Beat | Dur | In → Out | Caption | On screen |
|---|------|-----|----------|---------|-----------|
| 1 | Compare | 11.0s / 330f | 0 → 330 | Six issuers, **one screen.** | Tile field + hook, then Compare: rows populate, best rate holds focus while the rest blur back |
| 2 | Calculate | 9.0s / 270f | 318 → 588 | Exact returns, **instantly.** | ₹5,00,000 types in; six maturity figures resolve |
| 3 | Share | 10.0s / 300f | 576 → 876 | Your brand, in your **client's chat.** | Card lifts from Image preview, arcs across, lands as a WhatsApp attachment |
| 4 | Book | 10.0s / 300f | 864 → 1164 | Booked in **under 3 minutes.** | Select client → Invest now → three ticks → FD Booked → My FDs |
| 5 | End card | 7.0s / 210f | 1152 → 1362 | Fixed Deposits, **reimagined.** | The film's one dark frame. Centricity × Blostem |

## Within-beat choreography (scene-local frames)

**Compare** — 8/22/36 hook lines stagger in · 60–76 they leave · 96 panel rises ·
124 rows populate (7f apart) · 244 blur-pull to the best rate · 252 caption · 318 exit.

**Calculate** — 6 panel · 34 amount types (2f per character) · ~56 list resolves (6f apart) ·
132 caption · 244 exit.

**Share** — 4 left panel (Download comparison) · 14 right panel (chat) · 26 card assembles in
three strips · **108 card lifts** · 108–156 arcs across, scaling 1 → 0.66 · **156 lands**, handing
off to the chat's own attachment · 168 message follows · 176 caption · 272 exit.

**Book** — 6 panel · 72 Invest now pressed · 80/92/104 progress ticks · 150 FD Booked ·
164 stats · 182 the new FD row · 192 the existing book beneath it · 186 caption.

**End card** — 10–40 lockup fades in (brand marks never scale) · 46 rule draws · 58 co-brand ·
92 line · 120 festival line · 176–204 blackout.

## The content rules this sheet follows

One caption per beat, five words or fewer, exactly one accent word — the only coloured
word on screen. The UI does the explaining; the caption names the benefit the screen just
proved. Captions sit in a reserved 168px band (`Stage` in `src/lib/atoms.tsx`) so they never
collide with the phone's own tab bar.

## Render

```bash
npm run studio          # live preview
npm run render          # master → out/launch.mp4
npm run render:story    # 9:16   → out/story.mp4    (see caveat in README)
npm run render:square   # 1:1    → out/square.mp4
npx remotion still src/index.ts Launch out/qc/f780.png --frame=780
```
