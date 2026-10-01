import type { SessionPayload } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

const STAFF_ROLES = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT", "ACADEMIC_OFFICER", "COORDONNATEUR"] as const;

/** True if staff may manage this seminar — active institution must match Seminar.school, "toutes" reserved to SUPER_ADMIN. */
export async function canManageSeminar(session: SessionPayload, seminar: { school: string }): Promise<boolean> {
  if (!hasAnyRole(session.roles, [...STAFF_ROLES])) return false;
  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) return false;
  if (activeSchool === "toutes") return true;
  return seminar.school === activeSchool;
}

export function isSeminarStaff(session: SessionPayload): boolean {
  return hasAnyRole(session.roles, [...STAFF_ROLES]);
}
