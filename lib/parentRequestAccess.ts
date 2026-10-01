import type { SessionPayload } from "@/lib/auth";
import { hasAnyRole, type Role } from "@/lib/roles";
import { parentRequestServiceRoles, type ParentRequestService } from "@/lib/parentRequests";
import type { ActiveSchoolScope } from "@/lib/institutionContext";

/** Every real role that handles at least one service — used to gate the admin list view. */
const ANY_SERVICE_STAFF_ROLES: Role[] = Array.from(
  new Set(Object.values(parentRequestServiceRoles).flat()),
);

/**
 * True if the session may view/reply to a request routed to this service, as parent-of-record or as staff.
 *
 * `staffScope` (mandat "Correction des fuites institutionnelles", 2026-09-12) : le
 * routage par `service` est fonctionnel, pas institutionnel — un guichet
 * Secrétariat reste propre à une institution. Passé par les points d'entrée
 * admin (page détail, statut, réponse) pour empêcher un agent scopé sur une
 * école d'agir sur la demande d'un élève d'une autre école, même en devinant
 * l'id. Omis (undefined) pour le parent propriétaire lui-même — inutile, il
 * sort déjà avant ce contrôle — et pour les tests existants qui ne couvrent
 * pas l'institution. `"toutes"` (SUPER_ADMIN uniquement) autorise tout.
 */
export function canAccessParentRequest(
  session: SessionPayload,
  request: { parentId: number; service: string; student?: { program?: { school: string } | null } | null },
  staffScope?: ActiveSchoolScope,
): boolean {
  if (session.userId === request.parentId) return true;
  const staffRoles = parentRequestServiceRoles[request.service as ParentRequestService] ?? ["ADMIN", "SUPER_ADMIN"];
  if (!hasAnyRole(session.roles, staffRoles)) return false;
  if (staffScope === undefined || staffScope === "toutes") return true;
  if (staffScope === null) return false;
  return request.student?.program?.school === staffScope;
}

/** True if the session holds any staff role that handles at least one service. */
export function isAnyParentRequestStaff(session: SessionPayload): boolean {
  return hasAnyRole(session.roles, ANY_SERVICE_STAFF_ROLES);
}
