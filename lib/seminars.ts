export const seminarStatuses = ["planifie", "ouvert", "clos", "termine"] as const;
export type SeminarStatus = (typeof seminarStatuses)[number];

export const seminarStatusLabels: Record<SeminarStatus, string> = {
  planifie: "Planifié",
  ouvert: "Ouvert",
  clos: "Clos",
  termine: "Terminé",
};

export const seminarStatusBadge: Record<SeminarStatus, string> = {
  planifie: "badge-neutral",
  ouvert: "badge-success",
  clos: "badge-warning",
  termine: "badge-info",
};

export function isSeminarStatus(value: string): value is SeminarStatus {
  return (seminarStatuses as readonly string[]).includes(value);
}
