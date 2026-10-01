import { schoolToSector, sectorLabel, type Sector } from "@/lib/branding";
import { parseRoles, hasRole, roleLabels, type Role } from "@/lib/roles";
import { getDocumentLogoDataUri, getKindergartenLogoDataUri } from "@/lib/pdf/logo";

/**
 * Mandat "Générateur de badges multi-institutions" (2026-09-17) — résout le
 * secteur/logo, le nom d'organisme affiché et le libellé de statut d'un
 * badge à partir des données réelles (Program.school + Program.niveau +
 * rôle de l'utilisateur), jamais deviné au cas par cas dans chaque route.
 *
 * Kindergarten/Préscolaire n'est PAS une 4e institution distincte dans le
 * schéma (lib/institutions.ts ne connaît que 3 SchoolKey ; le préscolaire
 * est un `niveau` au sein de l'École Classique — même principe déjà
 * appliqué par lib/parentPortalTheme.ts pour le portail Parent) : ceci reste
 * inchangé, aucune institution Prisma n'est ajoutée. Le logo Kindergarten
 * EST néanmoins visuellement distinct de celui d'École Classique — fourni
 * directement par l'utilisateur (voir lib/pdf/logo.ts::getKindergartenLogoDataUri)
 * après qu'une recherche exhaustive n'a trouvé aucun fichier Kindergarten
 * préexistant. `isKindergarten` est exposé ici pour que chaque appelant
 * (route PDF, route PNG) sache quand appeler ce logo dédié plutôt que
 * `getDocumentLogoDataUri(sector)`.
 */
export interface BadgeBranding {
  sector: Sector | null;
  isKindergarten: boolean;
  orgName: string;
  institutionLabel: string;
  roleLabel: string;
}

export function resolveBadgeBranding(params: {
  role: string;
  school: string | null | undefined;
  niveau: string | null | undefined;
}): BadgeBranding {
  const sector = params.school ? schoolToSector(params.school) : null;
  const isKindergarten = params.school === "ecole-classique" && params.niveau === "prescolaire";

  const institutionLabel = isKindergarten ? "Kindergarten" : sector ? sectorLabel[sector] : null;
  const orgName = institutionLabel ? `CCIGA ${institutionLabel}` : "CCIGA";

  const roles: Role[] = parseRoles(params.role);
  let roleLabel = "À COMPLÉTER";
  if (hasRole(roles, "STUDENT")) {
    // "Élève" pour le scolaire (École Classique, dont Kindergarten), "Étudiant"
    // pour le supérieur/professionnel — même distinction que le français
    // courant utilisé sur les fiches d'inscription elles-mêmes.
    roleLabel = sector === "PROFESSIONNELLE" || sector === "UNIVERSITE" ? "Étudiant" : "Élève";
  } else if (hasRole(roles, "TEACHER")) {
    roleLabel = "Enseignant";
  } else if (roles.length > 0) {
    roleLabel = roleLabels[roles[0]] ?? "Personnel";
  }

  return { sector, isKindergarten, orgName, institutionLabel: institutionLabel ?? "CCIGA", roleLabel };
}

/**
 * "resolveBadgeLogoByInstitution" (nommée ainsi dans le mandat) — point
 * d'entrée UNIQUE pour choisir le logo d'un badge, appelé identiquement par
 * la route PDF et la route PNG plutôt que de dupliquer ce branchement dans
 * chacune.
 */
export function resolveBadgeLogoDataUri(branding: BadgeBranding): string {
  return branding.isKindergarten ? getKindergartenLogoDataUri() : getDocumentLogoDataUri(branding.sector);
}
