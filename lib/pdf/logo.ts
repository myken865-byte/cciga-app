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

/**
 * Mandat "Générateur de badges multi-institutions" (2026-09-17) — logo
 * officiel CCIGA Kindergarten, fourni directement par l'utilisateur après
 * qu'une recherche exhaustive (dépôt, sauvegardes, Bureau) n'a trouvé aucun
 * fichier Kindergarten distinct. Kindergarten reste un `niveau` sous
 * École Classique dans le schéma (jamais un `Sector`/`SchoolKey` séparé —
 * voir lib/branding.ts et lib/badgeInstitution.ts), donc ce logo n'est PAS
 * ajouté à `sectorLogoFile` : seuls les badges (via resolveBadgeBranding)
 * ont besoin de le distinguer visuellement d'École Classique.
 *
 * Mission "Finition visuelle" (2026-09-17) — le fichier fourni avait un fond
 * blanc opaque (contrairement aux 3 autres logos, à fond transparent), ce
 * qui produisait une boîte blanche visible sur le bandeau bleu marine du
 * badge. `cciga-kindergarten-transparent.png` est une copie générée par
 * détourage (flood-fill depuis les bords, seuil quasi-blanc) : le dessin,
 * les couleurs et la forme du logo original sont strictement inchangés,
 * seul le fond périphérique devient transparent. L'original
 * (cciga-kindergarten.png, fond blanc) reste sur disque intact, comme
 * référence, mais n'est plus utilisé par aucune route.
 */
export function getKindergartenLogoDataUri(): string {
  return readAsDataUri(path.join(process.cwd(), "assets", "branding-pdf", "cciga-kindergarten-transparent.png"));
}
