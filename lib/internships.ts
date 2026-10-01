export const internshipStatuses = ["planifie", "en_cours", "termine", "valide", "rejete"] as const;
export type InternshipStatus = (typeof internshipStatuses)[number];

export const internshipStatusLabels: Record<InternshipStatus, string> = {
  planifie: "Planifié",
  en_cours: "En cours",
  termine: "Terminé",
  valide: "Validé",
  rejete: "Rejeté",
};

export const internshipStatusBadge: Record<InternshipStatus, string> = {
  planifie: "badge-neutral",
  en_cours: "badge-info",
  termine: "badge-warning",
  valide: "badge-success",
  rejete: "badge-danger",
};

export function isInternshipStatus(value: string): value is InternshipStatus {
  return (internshipStatuses as readonly string[]).includes(value);
}

export const internshipAttendanceStatuses = ["present", "absent", "retard"] as const;
export type InternshipAttendanceStatus = (typeof internshipAttendanceStatuses)[number];

export const internshipAttendanceStatusLabels: Record<InternshipAttendanceStatus, string> = {
  present: "Présent",
  absent: "Absent",
  retard: "Retard",
};

export function isInternshipAttendanceStatus(value: string): value is InternshipAttendanceStatus {
  return (internshipAttendanceStatuses as readonly string[]).includes(value);
}

// L'étudiant ne peut déposer son rapport que tant que le stage n'a pas déjà
// été validé/rejeté (décision finale) — cohérent avec le workflow §4 du mandat.
export function canStudentSubmitReport(status: string): boolean {
  return status === "en_cours" || status === "termine";
}
