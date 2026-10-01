/**
 * Demande logistique — workflow indépendant de StudentRequest/ParentRequest
 * (mandat "Portail Logistique — migration additive 3 tables", 2026-09-12).
 */
export const logisticsRequestStatuses = ["soumise", "en_traitement", "approuvee", "rejetee", "livree", "cloturee"] as const;
export type LogisticsRequestStatus = (typeof logisticsRequestStatuses)[number];

export function isLogisticsRequestStatus(value: unknown): value is LogisticsRequestStatus {
  return typeof value === "string" && (logisticsRequestStatuses as readonly string[]).includes(value);
}

export const logisticsRequestStatusLabels: Record<LogisticsRequestStatus, string> = {
  soumise: "Soumise",
  en_traitement: "En traitement",
  approuvee: "Approuvée",
  rejetee: "Rejetée",
  livree: "Livrée",
  cloturee: "Clôturée",
};

export const logisticsUrgencies = ["normale", "urgente"] as const;
export type LogisticsUrgency = (typeof logisticsUrgencies)[number];

export function isLogisticsUrgency(value: unknown): value is LogisticsUrgency {
  return typeof value === "string" && (logisticsUrgencies as readonly string[]).includes(value);
}

export const logisticsUrgencyLabels: Record<LogisticsUrgency, string> = {
  normale: "Normale",
  urgente: "Urgente",
};

/**
 * `soumise → en_traitement → approuvée/rejetée → livrée → clôturée`. Une
 * demande rejetée peut être clôturée directement (rien à livrer) ; une
 * demande approuvée doit passer par livrée avant clôture.
 */
const ALLOWED_TRANSITIONS: Record<LogisticsRequestStatus, LogisticsRequestStatus[]> = {
  soumise: ["en_traitement"],
  en_traitement: ["approuvee", "rejetee"],
  approuvee: ["livree"],
  rejetee: ["cloturee"],
  livree: ["cloturee"],
  cloturee: [],
};

export function isValidLogisticsTransition(from: LogisticsRequestStatus, to: LogisticsRequestStatus): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}
