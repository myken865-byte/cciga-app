import { hasRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";

/**
 * Mission "Clarification définitive du workflow Évaluations/Notes/Bulletins"
 * (2026-09-13) — qui peut créer/modifier/soumettre les notes d'un cours :
 * l'administration, ou l'enseignant réel de ce cours — jamais un autre
 * enseignant, ni un étudiant/parent dont l'ID numérique coïnciderait avec
 * celui d'un enseignant (User.id est un auto-increment global partagé par
 * tous les rôles). Avant cette extraction, ce contrôle était dupliqué
 * inline (isAdmin || course.teacherId === session.userId) dans 3 routes,
 * sans jamais vérifier le rôle TEACHER avant la comparaison d'ID — même
 * classe de faille déjà corrigée pour lib/observationAccess.ts et
 * lib/assignmentAccess.ts.
 */
export function canManageCourseGrades(session: SessionPayload, courseTeacherId: number | null): boolean {
  if (hasRole(session.roles, "ADMIN")) return true;
  if (!hasRole(session.roles, "TEACHER")) return false;
  return courseTeacherId !== null && courseTeacherId === session.userId;
}
