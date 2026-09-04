import { staticFile } from "remotion";
import manifest from "./logo-manifest.json";

/**
 * REAL ISSUER + BRAND MARKS.
 *
 * The film ships with flat colour tiles and typeset wordmarks standing in for
 * the real marks, because the asset files cannot be fetched from here. Figma
 * serves issuer logos from www.figma.com, and blostem.com serves the Blostem
 * mark; this environment's network policy denies both at the gateway (the
 * proxy logs each as `connect_rejected … 403 to CONNECT`). The MCP bridge
 * itself works — specs, screenshots and metadata all come through — but the
 * bytes do not, and no retry or alternate URL gets around a policy denial.
 *
 * So the wiring is here and waiting. Drop the files into public/logos/ using
 * the slugs in that folder's README, run `sh tools/logos.sh`, and every tile
 * and wordmark in the film swaps to the real mark with no further code change.
 * Anything still missing keeps its placeholder, so a partial drop is fine and
 * the film never breaks.
 *
 * SVG and PNG are both accepted — the manifest records the actual filename per
 * slug rather than assuming an extension, because the marks arrive in whatever
 * format their owner publishes (Blostem's is an SVG).
 */
const files: Record<string, string> = manifest.have;

export const hasLogo = (slug?: string) => !!slug && slug in files;
export const logoSrc = (slug: string) => staticFile(`logos/${files[slug]}`);
