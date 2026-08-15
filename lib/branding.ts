/**
 * CIGA institutional logos — one PNG per secteur (École Classique, École
 * Professionnelle, Université), provided by the user and used as-is
 * (never redrawn/recolored/recropped). A page or generated document must
 * always carry the logo of the secteur its content belongs to; when the
 * secteur is ambiguous or spans multiple schools, callers fall back to the
 * neutral CCIGA identity instead of guessing.
 */
export type Sector = "CLASSIQUE" | "PROFESSIONNELLE" | "UNIVERSITE";

export const sectorList: Sector[] = ["CLASSIQUE", "PROFESSIONNELLE", "UNIVERSITE"];

const sectorLogoFile: Record<Sector, string> = {
  CLASSIQUE: "Logo_CIGA_Ecole_Classique.png",
  PROFESSIONNELLE: "Logo_CIGA_Ecole_Professionnelle.png",
  UNIVERSITE: "Logo_CIGA_Universite.png",
};

export const sectorLogoAlt: Record<Sector, string> = {
  CLASSIQUE: "Logo CIGA École Classique",
  PROFESSIONNELLE: "Logo CIGA École Professionnelle",
  UNIVERSITE: "Logo CIGA Université",
};

export const sectorLabel: Record<Sector, string> = {
  CLASSIQUE: "École Classique",
  PROFESSIONNELLE: "École Professionnelle",
  UNIVERSITE: "Université",
};

/** Public URL for a secteur's logo, served from public/branding/. */
export function sectorLogoPath(sector: Sector): string {
  return `/branding/${sectorLogoFile[sector]}`;
}

/** Filename only — used by server-side code that reads the file from disk (PDF generation). */
export function sectorLogoFilename(sector: Sector): string {
  return sectorLogoFile[sector];
}

/** Maps a Program.school value to its secteur, or null when the school is unrecognized. */
export function schoolToSector(school: string): Sector | null {
  switch (school) {
    case "ecole-classique":
      return "CLASSIQUE";
    case "ecole-professionnelle":
      return "PROFESSIONNELLE";
    case "universite":
      return "UNIVERSITE";
    default:
      return null;
  }
}
