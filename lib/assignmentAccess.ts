import { hasRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";

/**
 * Mission "Portail Enseignant — Phase 3 P2" (2026-09-13), §4/§5 — qui peut
 * modifier/supprimer un devoir : l'administration, ou l'enseignant réel du
 * cours auquel appartient ce devoir — jamais un autre enseignant, même par
 * ID direct. Extrait de app/api/assignments/[id]/route.ts pour être
 * testable isolément.
 */
export function canManageAssignment(session: SessionPayload, courseTeacherId: number | null): boolean {
  if (hasRole(session.roles, "ADMIN")) return true;
  if (!hasRole(session.roles, "TEACHER")) return false;
  return courseTeacherId !== null && courseTeacherId === session.userId;
}
