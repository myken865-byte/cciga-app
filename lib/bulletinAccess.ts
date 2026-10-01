import { prisma } from "@/lib/db";
import { hasRole, hasAnyRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";
import { isDoyenOfFaculty } from "@/lib/governance/scope";

/**
 * Who may view a given student's bulletin/relevé/document: the student
 * themself, a linked parent, the student's titulaire, an academic officer
 * (reviews results school-wide), or an admin. viewerCanSeeAll additionally
 * grants rank visibility and bypasses grade-publication confidentiality.
 */
export async function resolveBulletinAccess(
  session: SessionPayload | null,
  requestedId: number,
): Promise<{ targetId: number | null; viewerCanSeeAll: boolean }> {
  if (!session) return { targetId: null, viewerCanSeeAll: false };

  // hasRole is exact-membership, so checking "ADMIN" alone would incorrectly
  // reject a SUPER_ADMIN-only account (the two are distinct role strings).
  if (hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "ACADEMIC_OFFICER"])) {
    return { targetId: requestedId || null, viewerCanSeeAll: true };
  }
  if (requestedId === session.userId) {
    return { targetId: requestedId, viewerCanSeeAll: false };
  }
  if (hasRole(session.roles, "PARENT")) {
    const child = await prisma.user.findFirst({ where: { id: requestedId, parentId: session.userId } });
    return { targetId: child ? requestedId : null, viewerCanSeeAll: false };
  }
  if (hasRole(session.roles, "TEACHER")) {
    const student = await prisma.user.findUnique({ where: { id: requestedId }, include: { program: true } });
    if (student?.program?.titulaireId === session.userId) {
      return { targetId: requestedId, viewerCanSeeAll: true };
    }
  }
  // Mandat "Gouvernance académique — Rectorat/Décanat/Coordination"
  // (2026-09-12) : consultation du dossier académique (bulletin/relevé)
  // strictement bornée au scope de gouvernance de chacun — jamais un accès
  // global déguisé. Recteur = toute l'Université ; Doyen = sa/ses facultés
  // (via Faculty.doyenId) ; Coordonnateur = son/ses programmes (via
  // Program.coordinatorId) — mêmes relations que lib/governance/scope.ts,
  // jamais une deuxième logique de scope.
  if (hasAnyRole(session.roles, ["RECTEUR", "DOYEN", "COORDONNATEUR"])) {
    const student = await prisma.user.findUnique({ where: { id: requestedId }, include: { program: true } });
    if (!student?.program || student.program.school !== "universite") {
      return { targetId: null, viewerCanSeeAll: false };
    }
    if (hasRole(session.roles, "RECTEUR")) {
      return { targetId: requestedId, viewerCanSeeAll: true };
    }
    if (hasRole(session.roles, "DOYEN")) {
      const isDoyen = await isDoyenOfFaculty(session.userId, student.program.academicFacultyId);
      return isDoyen ? { targetId: requestedId, viewerCanSeeAll: true } : { targetId: null, viewerCanSeeAll: false };
    }
    if (student.program.coordinatorId === session.userId) {
      return { targetId: requestedId, viewerCanSeeAll: true };
    }
  }
  return { targetId: null, viewerCanSeeAll: false };
}
