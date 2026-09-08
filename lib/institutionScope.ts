import { hasRole, parseRoles } from "@/lib/roles";
import type { SchoolKey } from "@/lib/institutions";

/**
 * Mandat "Mise en état opérationnel" (2026-09-06) : prédicat partagé pour
 * cloisonner les listes d'utilisateurs par institution active, réutilisé par
 * programs/finance/users/recherche plutôt que dupliqué page par page.
 *
 * Seuls STUDENT et TEACHER ont un lien institutionnel exploitable dans le
 * schéma actuel (via Program). Tous les autres rôles (ADMIN, SUPER_ADMIN,
 * SECRETARIAT, PARENT, ACADEMIC_OFFICER, CONSEILLER, RECTEUR, DOYEN,
 * COORDONNATEUR, LOGISTICIEN) n'ont aucun champ d'établissement dans le
 * schéma actuel — les exclure ferait disparaître ces comptes de toutes les
 * vues scopées ; ils restent donc toujours "dans le périmètre". Corriger ça
 * pour les rôles qui le méritent (ex. Employé) appartient à la Phase C.
 */
type ScopableUser = {
  roles: string;
  program?: { school: string } | null;
  coursesTaught?: { program?: { school: string } | null }[];
  titulaireOf?: { school: string }[];
  coordinatedPrograms?: { school: string }[];
};

export function isUserInSchoolScope(user: ScopableUser, school: SchoolKey): boolean {
  const roles = parseRoles(user.roles);
  if (hasRole(roles, "STUDENT")) {
    return user.program?.school === school;
  }
  if (hasRole(roles, "TEACHER")) {
    return (
      (user.coursesTaught ?? []).some((c) => c.program?.school === school) ||
      (user.titulaireOf ?? []).some((p) => p.school === school) ||
      (user.coordinatedPrograms ?? []).some((p) => p.school === school)
    );
  }
  return true;
}
