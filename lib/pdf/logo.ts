import { readFileSync } from "fs";
import path from "path";
import { sectorLogoFilename, type Sector } from "@/lib/branding";

const cache = new Map<string, string>();

function readAsDataUri(absolutePath: string): string {
  const cached = cache.get(absolutePath);
  if (cached) return cached;
  const buffer = readFileSync(absolutePath);
  const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
  cache.set(absolutePath, dataUri);
  return dataUri;
}

/**
 * The sector's official CIGA logo, or the official "Logo 4 — CCIGA Général"
 * when the sector is unresolved — never a wrong sector's logo, never an ad
 * hoc icon. Reads from assets/branding-pdf/ — 400px copies of the exact same
 * public/branding/ source files, resized only (never redrawn/recolored),
 * since every PDF renders the logo at 16–40pt: embedding the full-resolution
 * web asset would needlessly multiply every generated PDF's size.
 */
export function getDocumentLogoDataUri(sector: Sector | null): string {
  const filename = sector ? sectorLogoFilename(sector) : "Logo_CCIGA_General.png";
  return readAsDataUri(path.join(process.cwd(), "assets", "branding-pdf", filename));
}
