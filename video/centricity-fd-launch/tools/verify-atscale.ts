/**
 * Deterministic check for atScale()'s perceptual-scale mapping.
 *
 * Imports the REAL perceptualScale() from ../src/lib/motion so this exercises the
 * shipped code path, then asserts it matches Remotion's signed-area formula
 *   s(p) = signedSqrt( area(from) + p·(area(to) − area(from)) ),  area(s)=sign(s)·s²
 * at p = 0, 0.25, 0.5, 0.75, 1 for the film's real from→to pairs.
 *
 *   run:  npx tsx tools/verify-atscale.ts
 */
import { perceptualScale } from "../src/lib/motion";

const area = (s: number) => (s === 0 ? 0 : Math.sign(s) * s * s);
const expected = (p: number, from: number, to: number) => {
  const a = area(from) + p * (area(to) - area(from));
  return a === 0 ? 0 : Math.sign(a) * Math.sqrt(Math.abs(a));
};

const PS = [0, 0.25, 0.5, 0.75, 1];
const PAIRS: [number, number][] = [
  [0.82, 1.0], // Compare rate lift (A)
  [0.62, 1.0], // Land/Chat send bubble (A)
  [0.9, 1.1],  // representative grow
];

let fails = 0;
for (const [from, to] of PAIRS) {
  const row: string[] = [];
  for (const p of PS) {
    const got = perceptualScale(p, from, to);
    const exp = expected(p, from, to);
    const ok = Math.abs(got - exp) < 1e-12;
    if (!ok) fails++;
    row.push(`p=${p}: ${got.toFixed(6)}${ok ? "" : ` !=${exp.toFixed(6)}`}`);
  }
  // endpoints must be exact; midpoint must sit ABOVE the linear mid (convex-up
  // ease of a grow) — the whole point of perceptual over linear scale.
  const endsExact =
    Math.abs(perceptualScale(0, from, to) - from) < 1e-12 &&
    Math.abs(perceptualScale(1, from, to) - to) < 1e-12;
  const mid = perceptualScale(0.5, from, to);
  const linMid = (from + to) / 2;
  const aboveLinear = mid > linMid;
  if (!endsExact || !aboveLinear) fails++;
  console.log(`${from} -> ${to}`);
  console.log("  " + row.join("   "));
  console.log(
    `  endpoints exact: ${endsExact}   mid ${mid.toFixed(6)} > linear ${linMid.toFixed(6)}: ${aboveLinear}`
  );
}
// monotonic strictly increasing across a fine p-grid (no dips/overshoot)
let mono = true;
for (const [from, to] of PAIRS) {
  let prev = -Infinity;
  for (let i = 0; i <= 100; i++) {
    const v = perceptualScale(i / 100, from, to);
    if (v < prev - 1e-12) mono = false;
    prev = v;
  }
}
console.log(`\nmonotonic non-decreasing: ${mono}`);
console.log(fails === 0 && mono ? "\nPASS" : "\nFAIL");
process.exit(fails === 0 && mono ? 0 : 1);
