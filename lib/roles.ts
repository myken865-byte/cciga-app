export const roleList = ["ADMIN", "STUDENT", "PARENT", "TEACHER"] as const;

export type Role = (typeof roleList)[number];

export const roleLabels: Record<Role, string> = {
  ADMIN: "Administration",
  STUDENT: "Étudiant",
  PARENT: "Parent",
  TEACHER: "Enseignant",
};

export const rolePortalPath: Record<Role, string> = {
  ADMIN: "/admin/admissions",
  STUDENT: "/portail/etudiant",
  PARENT: "/portail/parent",
  TEACHER: "/portail/enseignant",
};

export function isRole(value: string): value is Role {
  return (roleList as readonly string[]).includes(value);
}

export function hasRole(roles: string[], role: Role): boolean {
  return roles.includes(role);
}

export function parseRoles(raw: string): Role[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isRole) : [];
  } catch {
    return [];
  }
}
