import type { SessionPayload } from "@/lib/auth";
import { hasAnyRole, hasRole, parseRoles, type Role } from "@/lib/roles";
import { studentConversationServiceRoles, type StudentConversationService } from "@/lib/studentConversations";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { prisma } from "@/lib/db";

const ANY_SERVICE_STAFF_ROLES: Role[] = Array.from(
  new Set(Object.values(studentConversationServiceRoles).flat()),
);

/**
 * True if the session may view/reply to this conversation — the owning
 * student, OR staff whose active institution (see lib/institutionContext.ts)
 * matches the student's own program.school — same non-croisement pattern as
 * lib/studentRequestAccess.ts / every self-service PDF route (carnet, badge,
 * fiche). "toutes" is reserved to SUPER_ADMIN. For "enseignant", only the
 * specifically assigned teacher (staffId) may access it as staff, never
 * every TEACHER account, and never bypassed by institution scope alone.
 */
export async function canAccessStudentConversation(
  session: SessionPayload,
  conversation: { studentId: number; staffId: number; service: string },
): Promise<boolean> {
  if (session.userId === conversation.studentId) return true;

  if (conversation.service === "enseignant") {
    if (hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN"])) {
      // Oversight access still respects institution scope, checked below.
    } else {
      return session.userId === conversation.staffId && hasRole(session.roles, "TEACHER");
    }
  } else {
    const staffRoles =
      studentConversationServiceRoles[conversation.service as StudentConversationService] ?? ["ADMIN", "SUPER_ADMIN"];
    if (!hasAnyRole(session.roles, staffRoles)) return false;
  }

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) return false;
  if (activeSchool === "toutes") return true;

  const student = await prisma.user.findUnique({ where: { id: conversation.studentId }, include: { program: true } });
  return student?.program?.school === activeSchool;
}

/** True if the session holds any staff role that handles at least one non-"enseignant" service (used to gate the admin list view). */
export function isAnyStudentConversationStaff(session: SessionPayload): boolean {
  return hasAnyRole(session.roles, ANY_SERVICE_STAFF_ROLES);
}

/**
 * Resolves the specific User row a new conversation is denormalized against
 * (`StudentConversation.staffId`) — for "enseignant" the caller must already
 * have validated and passed the real course teacher's id; for every other
 * service there is no single "the secretariat agent" assignment anywhere in
 * the schema (same as ParentRequest, which routes by service/role and never
 * names one specific person either), so this picks the lowest-id (oldest,
 * most stable) real account holding one of the service's allowed roles —
 * purely informational display ("conversation avec X"), never the actual
 * security gate (that's canAccessStudentConversation, role/service-based).
 */
export async function resolveConversationStaffId(
  service: StudentConversationService,
  teacherIdForCourse?: number,
): Promise<number | null> {
  if (service === "enseignant") return teacherIdForCourse ?? null;
  const roles = studentConversationServiceRoles[service];
  const candidates = await prisma.user.findMany({
    select: { id: true, roles: true },
    orderBy: { id: "asc" },
  });
  const match = candidates.find((c) => hasAnyRole(parseRoles(c.roles), roles));
  return match?.id ?? null;
}
