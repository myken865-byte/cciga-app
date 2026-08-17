export const roleList = [
  "SUPER_ADMIN",
  "ADMIN",
  "SECRETARIAT",
  "STUDENT",
  "PARENT",
  "TEACHER",
  "ACADEMIC_OFFICER",
] as const;

export type Role = (typeof roleList)[number];

export const roleLabels: Record<Role, string> = {
  SUPER_ADMIN: "Super Administrateur",
  ADMIN: "Administration",
  SECRETARIAT: "Secrétariat",
  STUDENT: "Étudiant",
  PARENT: "Parent",
  TEACHER: "Enseignant",
  ACADEMIC_OFFICER: "Responsable académique",
};

export const rolePortalPath: Record<Role, string> = {
  SUPER_ADMIN: "/admin/admissions",
  ADMIN: "/admin/admissions",
  SECRETARIAT: "/admin/admissions",
  STUDENT: "/portail/etudiant",
  PARENT: "/portail/parent",
  TEACHER: "/portail/enseignant",
  ACADEMIC_OFFICER: "/portail/responsable",
};

/** Roles allowed to create/edit accounts holding a privileged (staff) role — see requireSuperAdminSession. */
export const privilegedRoles: Role[] = ["SUPER_ADMIN", "ADMIN", "SECRETARIAT"];

export function isRole(value: string): value is Role {
  return (roleList as readonly string[]).includes(value);
}

export function hasRole(roles: string[], role: Role): boolean {
  return roles.includes(role);
}

export function hasAnyRole(roles: string[], allowed: Role[]): boolean {
  return allowed.some((r) => roles.includes(r));
}

export function parseRoles(raw: string): Role[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isRole) : [];
  } catch {
    return [];
  }
}
