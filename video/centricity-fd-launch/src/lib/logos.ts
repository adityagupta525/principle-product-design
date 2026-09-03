import { staticFile } from "remotion";
import manifest from "./logo-manifest.json";

/**
 * REAL ISSUER MARKS.
 *
 * The film ships with flat colour tiles standing in for the issuer logos,
 * because the asset files cannot be fetched from here: Figma serves them from
 * www.figma.com, and this environment's network policy denies that host at the
 * gateway (the proxy logs it as `connect_rejected … policy denial`). The MCP
 * bridge itself works — specs, screenshots and metadata all come through — but
 * the bytes do not.
 *
 * So the wiring is here and waiting. Drop the PNGs into public/logos/ using the
 * slugs below, run `sh tools/logos.sh`, and every tile in the film swaps to the
 * real mark with no further code change. Anything still missing keeps its
 * colour tile, so a partial drop is fine and the film never breaks.
 */
const have = new Set<string>(manifest.have);

export const hasLogo = (slug?: string) => !!slug && have.has(slug);
export const logoSrc = (slug: string) => staticFile(`logos/${slug}.png`);
