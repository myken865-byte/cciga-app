import type { SessionPayload } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { prisma } from "@/lib/db";
import { isParentOfStudent } from "@/lib/parentAccess";

const STAFF_ROLES = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"] as const;

/**
 * True if the session may view/reply to this request — the owning student,
 * OR staff whose active institution (see lib/institutionContext.ts) matches
 * the student's own program.school. Same non-croisement pattern already
 * used by every self-service PDF route (carnet, badge, fiche) — "toutes" is
 * reserved to SUPER_ADMIN by app/api/admin/institution/route.ts, so reading
 * it back here is trustworthy.
 */
export async function canAccessStudentRequest(
  session: SessionPayload,
  request: { studentId: number },
): Promise<boolean> {
  if (session.userId === request.studentId) return true;
  // Mandat "Finalisation portail Parent" (2026-09-12) : un parent réellement
  // lié à l'élève peut consulter le document généré (attestation/certificat),
  // même pattern que resolveBulletinAccess.
  if (await isParentOfStudent(session, request.studentId)) return true;
  if (!hasAnyRole(session.roles, [...STAFF_ROLES])) return false;

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) return false;
  if (activeSchool === "toutes") return true;

  const student = await prisma.user.findUnique({
    where: { id: request.studentId },
    include: { program: true },
  });
  return student?.program?.school === activeSchool;
}

export function isAnyStudentRequestStaff(session: SessionPayload): boolean {
  return hasAnyRole(session.roles, [...STAFF_ROLES]);
}
