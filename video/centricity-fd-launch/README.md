# Centricity FD — GFF Launch Film

Render-ready [Remotion](https://remotion.dev) project for the Fixed Deposits launch creative.

```bash
npm install
npm run studio    # live preview at localhost:3000
npm run render    # out/launch.mp4 — 1920×1080, 30fps, 45.4s
```

## The brief this was built to

**Audience: the partner (MFD/distributor), not the end investor.** The PM's beat sheet says
"your client's chat" and "client selected" — every caption is written to the person who
*sells* the FD, not the person who buys it.

Five beats, from the sheet: Compare → Calculate → Share → Book → end card
(Centricity × Blostem, "Fixed Deposits, reimagined").

## Where the design came from

- **Motion grammar** — the reference reel supplied by the product owner (credited
  @vanshika.motion): mid-size kinetic captions with exactly one accent word, floating
  rounded-square tiles, product panels that rise under soft shadows, rows that blur so one
  row can hold focus, and fast 1–2s beats. Ported in `src/lib/atoms.tsx`.
- **Palette, type and layout** — read from the Figma file itself (Centricity FD — Partner
  App, node 196-7021) over the Figma MCP bridge, down to layer level: `--accent-primary`
  `#B69377`, `--cen-family-brand` Montserrat, text `#212121`, headings `#2B1E19`, tenure
  `#7A828A`, rates `#12B76A`, row rule `#F1ECE4`, tab bar `#6B4B41` active / `#7D736C` idle.
  The Compare screen is laid out at the frame's own coordinates (header 24–80, filter band
  80–152, section title 168, column strip 204, list 231, rows 72 + 8 gap, "View more" 703).
  Captured in `brands/centricity.json`.
- **Screen content** — real issuers, rates, tenures, names and labels lifted from the
  FINAL DESIGN board, so the film shows what the product shows.

Note on palette: the earlier cut of this project used a dark "Obsidian" system from the
launch-studio skill. That system belongs to the NRI consumer app, not this partner app —
reading the Figma file showed the FD product is light, warm and `#B69377`-accented. The
film follows the real product.

## What is where

```
src/copy.ts                 ← EVERY word in the film, plus the issuer rows
src/screens/AppScreens.tsx  ← the five app screens (the Figma swap-in point)
brands/centricity.json      ← tokens read from the Figma file
src/lib/atoms.tsx           ← Ground, TileField, AccentCaption, Panel, Stage, BrandMark
src/lib/motion.ts           ← the motion law as code
src/scenes/*.tsx            ← one file per beat
src/Launch.tsx              ← the timing sheet, as the composition
docs/TIMING_SHEET.md        ← the timing sheet, as a document
public/fonts/               ← self-hosted Urbanist + Montserrat woff2
```

**Constants-first**: copy, timings and tokens are named constants. Changing a caption or a
beat length never means touching animation logic.

## Known gaps — what still needs you

1. **Issuer logos are flat colour tiles — the one thing still missing.** The Figma MCP
   bridge is connected and serves metadata, screenshots and layer specs, but the asset
   *files* it returns are URLs on `www.figma.com`, and this session's network egress policy
   denies that host (403). So the six bank marks cannot be fetched here. Drop the real PNGs
   into `public/logos/` and swap `<LogoTile>` for `<Img>` in `src/screens/AppScreens.tsx` —
   the tile colours are already the brands' own, so it is a one-line change per row.
   The tab-bar and utility icons (SquareHalf, Calculator, FileArrowDown, ShoppingBag,
   chevron, sliders, caret) were redrawn as inline SVG to the same Phosphor silhouettes for
   the same reason.
2. **Screens are rebuilt in code, not exported.** Compare is laid out at the Figma frame's
   exact coordinates and type values; the other four match layout, copy and colour but are
   a rebuild. If you want pixel-exact everywhere, export each screen at 3× and replace the
   component bodies with `<Img src={staticFile(...)} />`; the scenes mount these five
   components and nothing else.
3. **Rates need compliance sign-off.** Every rate on screen is carried over from the Figma
   mockups (7.50%, 8.25%, 7.80%…). Before release each needs an approved value and its
   "as on ⟨date⟩" qualifier.
4. **No vertical cut yet.** 9:16 and 1:1 compositions were removed rather than shipped
   broken: the Share beat is a two-panel side-by-side composition that does not survive a
   vertical crop. A vertical version needs that beat re-staged (card travelling top-to-bottom
   between two stacked panels), not a rescale. Say the word and I'll build it.
5. **Second typeface.** Urbanist is primary, per your call; Montserrat is the file's own
   `--cen-family-brand` and carries the lockup and the shareable card. If the design uses a
   third face anywhere, tell me and I'll add it.

## Rules the code enforces

- Every animation derives from `useCurrentFrame()`. No CSS transitions, no `setTimeout`.
- `interpolate()` is clamped on both ends (`src/lib/motion.ts`).
- No `spring()` on the brand layer — brand marks fade, they never bounce.
- Green is money and nothing else; `#B69377` is brand chrome and never a rate.
- Captions live in a reserved band and never overlap the phone's own UI.
- Fonts are self-hosted, so renders are offline and deterministic.
