import { prisma } from "@/lib/db";
import { hasRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";

/**
 * Mission "Portail Enseignant — Phase 2 P1" (2026-09-13), §7/§8 — qui peut
 * ajouter une observation pédagogique pour un élève donné. Extrait de
 * app/api/observations/route.ts pour être testable isolément (même
 * convention que lib/maintenanceAccess.ts / lib/psychosocialAccess.ts /
 * lib/studentConversationAccess.ts) — aucun changement de comportement.
 *
 * Trois cas, dans cet ordre : ADMIN (toujours) ; titulaire de la classe de
 * l'élève (Program.titulaireId) ; OU un enseignant qui donne RÉELLEMENT un
 * cours dans le programme de cet élève (Course.teacherId +
 * Course.programId) — jamais un enseignant sans lien démontré avec cette
 * classe précise.
 */
export async function canAddObservation(
  session: SessionPayload,
  student: { programId: string | null; program: { titulaireId: number | null } | null },
): Promise<boolean> {
  if (!student.programId || !student.program) return false;

  if (hasRole(session.roles, "ADMIN")) return true;
  if (!hasRole(session.roles, "TEACHER")) return false;

  if (student.program.titulaireId === session.userId) return true;

  const teachesInProgram = await prisma.course.findFirst({
    where: { teacherId: session.userId, programId: student.programId },
    select: { id: true },
  });
  return Boolean(teachesInProgram);
}
