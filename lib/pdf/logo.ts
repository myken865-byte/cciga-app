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

/** The sector's CIGA logo, or the neutral CCIGA monogram when the sector is unresolved (never a wrong sector's logo). */
export function getDocumentLogoDataUri(sector: Sector | null): string {
  if (sector) {
    return readAsDataUri(path.join(process.cwd(), "public", "branding", sectorLogoFilename(sector)));
  }
  return readAsDataUri(path.join(process.cwd(), "assets", "icon.png"));
}
