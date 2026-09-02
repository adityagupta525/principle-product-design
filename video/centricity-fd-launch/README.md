# Centricity — Fixed Deposits Launch Film

Render-ready [Remotion](https://remotion.dev) project for the FD feature launch.
Brand system: **Obsidian Intelligence** (`brands/centricity.json`).

```bash
npm install
npm run studio    # live preview at localhost:3000
npm run render    # out/launch.mp4 — 1920×1080, 30fps, 86.4s
```

## What is where

```
src/copy.ts             ← EVERY word in the film. Nothing is hard-coded in a scene.
src/screens/FdScreens.tsx ← the in-app FD screens (the Figma swap-in point)
brands/centricity.json  ← colour + font tokens, read by src/lib/tokens.ts
src/lib/motion.ts       ← the motion law as code (easings, entrances, count-up)
src/lib/atoms.tsx       ← Glow, Vignette, PhoneFrame, Headline, WipeLine, Badge
src/scenes/*.tsx        ← one file per beat of the keynote arc
src/Launch.tsx          ← the timing sheet, as the composition
docs/TIMING_SHEET.md    ← the timing sheet, as a document
public/fonts/           ← self-hosted Inter / Playfair / JetBrains Mono woff2
```

**Constants-first**: copy and timings are named constants at the top of the files above.
Changing a headline or a scene length never means touching animation logic.

## Two things are still placeholders

1. **Copy** — `src/copy.ts` is written to the brand voice but is *not* the PM's approved
   content. Swap the strings; no scene changes.
2. **Screens** — `src/screens/FdScreens.tsx` reconstructs the FD screens from the
   Obsidian tokens so the film renders end to end with zero external assets. When the
   Figma FD designs arrive, export each screen at 3× into `public/screens/` and replace
   the component body:

   ```tsx
   <Img src={staticFile("screens/fd-book.png")} style={{ width: "100%" }} />
   // or, for a screen recording:
   <OffthreadVideo src={staticFile("recordings/fd-book.mp4")} startFrom={90}
     style={{ width: "100%", height: "100%", objectFit: "cover" }} />
   ```

   Nothing outside that file changes — the scenes only ever mount `<FdBookScreen />`
   and `<FdCompareScreen />` inside `<PhoneFrame>`.

> ⚠️ **The rates and maturity figures on screen are illustrative.** 7.25% p.a., ₹5,00,000 →
> ₹6,16,800, and the five bank rows are structural stand-ins. They must be replaced with
> compliance-approved numbers, each carrying its "as on \<date\>" qualifier, before this
> film goes anywhere near a viewer.

## Borrowed patterns (cited, per the studio standard)

1. **Fey-style data glow** — a single oversized figure on void black with a soft radial
   bloom behind it, carrying the whole scene. Fey drives this with teal; the Obsidian
   colour law reserves accent for data, so Feature III uses amber `#C49A3C` instead.
   ([Fey](https://www.landing.love/sites/fey/))
2. **Stripe-style left-device layout, sub-90s** — device anchored to one side, copy in the
   opposite column, one idea per beat, the whole film under ninety seconds. Features I and
   II mirror the composition so the cut has somewhere to go.
   ([Stripe launch motion](https://mypromovideos.com/video-inspirations/video/payments-updates-innovations-motion-graphics-explainer-stripe/))
3. **Apple keynote silence** — 0.5s of true black before the first word, a 2s hold after
   every entrance completes, and a count-up that holds ten seconds past its landing.
   Encoded as the "breathe" rule in `docs/TIMING_SHEET.md`.

## Rules the code enforces

- Every animation derives from `useCurrentFrame()`. No CSS transitions, no `setTimeout`.
- `interpolate()` is always clamped on both ends (`src/lib/motion.ts`).
- No `spring()` on the brand layer — brand marks fade, they never bounce.
- Amber is numbers only. Pure white is never used; platinum `#C8D0DC` stands in.
- One accent per scene.
- Fonts are self-hosted, so renders are offline and deterministic.
