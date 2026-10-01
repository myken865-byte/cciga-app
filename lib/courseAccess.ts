import { hasRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";

/**
 * Mission "Audit final Portail Enseignant" (2026-09-13) — dernière passe de
 * durcissement : le prédicat déjà appliqué à lib/assignmentAccess.ts,
 * lib/gradeAccess.ts et lib/observationAccess.ts (rôle TEACHER vérifié
 * AVANT la comparaison d'ID, jamais l'inverse — User.id est un
 * auto-increment global partagé par tous les rôles) était resté absent de
 * 9 routes touchant un cours (devoirs/quiz/questions/tentatives/présence/
 * modules/leçons/annonces/matériel). Un seul prédicat partagé, pas neuf
 * copies divergentes.
 */
export function canManageCourse(session: SessionPayload, courseTeacherId: number | null): boolean {
  if (hasRole(session.roles, "ADMIN")) return true;
  if (!hasRole(session.roles, "TEACHER")) return false;
  return courseTeacherId !== null && courseTeacherId === session.userId;
}
