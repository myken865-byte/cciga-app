import type { SessionPayload } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { prisma } from "@/lib/db";

const STAFF_ROLES = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT", "ACADEMIC_OFFICER", "COORDONNATEUR"] as const;

/**
 * True if the session may view/manage this internship — the owning student,
 * the assigned internal supervisor (TEACHER), or staff whose active
 * institution matches the student's program.school. Same non-croisement
 * pattern as canAccessStudentRequest — "toutes" reserved to SUPER_ADMIN.
 */
export async function canAccessInternship(
  session: SessionPayload,
  internship: { studentId: number; internalSupervisorId: number | null; programId: string },
): Promise<boolean> {
  if (session.userId === internship.studentId) return true;
  if (internship.internalSupervisorId && session.userId === internship.internalSupervisorId) return true;
  if (!hasAnyRole(session.roles, [...STAFF_ROLES])) return false;

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) return false;
  if (activeSchool === "toutes") return true;

  const program = await prisma.program.findUnique({ where: { id: internship.programId } });
  return program?.school === activeSchool;
}

/** Staff-only management check (never the student, never the assigned teacher via this path). */
export function isInternshipStaff(session: SessionPayload): boolean {
  return hasAnyRole(session.roles, [...STAFF_ROLES]);
}
