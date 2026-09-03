export const roleList = [
  "SUPER_ADMIN",
  "ADMIN",
  "SECRETARIAT",
  "STUDENT",
  "PARENT",
  "TEACHER",
  "ACADEMIC_OFFICER",
  "CONSEILLER",
  "RECTEUR",
  "DOYEN",
  "COORDONNATEUR",
  "LOGISTICIEN",
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
  CONSEILLER: "Conseiller / Psychologue",
  RECTEUR: "Recteur (Rectorat)",
  DOYEN: "Doyen (Décanat)",
  COORDONNATEUR: "Coordonnateur (Coordination)",
  LOGISTICIEN: "Logisticien (Logistique)",
};

export const rolePortalPath: Record<Role, string> = {
  SUPER_ADMIN: "/admin/admissions",
  ADMIN: "/admin/admissions",
  SECRETARIAT: "/admin/admissions",
  STUDENT: "/portail/etudiant",
  PARENT: "/portail/parent",
  TEACHER: "/portail/enseignant",
  ACADEMIC_OFFICER: "/portail/responsable",
  CONSEILLER: "/admin/psychosocial",
  RECTEUR: "/portail/rectorat",
  DOYEN: "/portail/decanat",
  COORDONNATEUR: "/portail/coordination",
  LOGISTICIEN: "/portail/logistique",
};

/**
 * Roles allowed to create/edit accounts holding a privileged (staff) role —
 * see requireSuperAdminSession. CONSEILLER is included: it grants access to
 * confidential psychosocial records, so only SUPER_ADMIN may assign it —
 * least-privilege applies to who can GRANT the role, not just what it can do.
 * RECTEUR/DOYEN/COORDONNATEUR are university governance roles with broad
 * read access across their scope — same reasoning applies. LOGISTICIEN can
 * span all three institutions' material/inventory data — same reasoning.
 */
export const privilegedRoles: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "SECRETARIAT",
  "CONSEILLER",
  "RECTEUR",
  "DOYEN",
  "COORDONNATEUR",
  "LOGISTICIEN",
];

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
