import type { Role } from "@/lib/roles";

export const parentRequestCategories = [
  "demande_information",
  "question_eleve",
  "justification_absence",
  "justification_retard",
  "probleme_notes",
  "question_carnet",
  "demande_rdv",
  "question_paiements",
  "signalement_paiement",
  "preuve_paiement",
  "demande_document",
  "probleme_disciplinaire",
  "question_professeur",
  "maj_informations",
  "message_confidentiel",
  "autre",
] as const;

export type ParentRequestCategory = (typeof parentRequestCategories)[number];

export const parentRequestCategoryLabels: Record<ParentRequestCategory, string> = {
  demande_information: "Demande d'information",
  question_eleve: "Question concernant l'élève",
  justification_absence: "Justification d'absence",
  justification_retard: "Justification de retard",
  probleme_notes: "Problème concernant les notes",
  question_carnet: "Question concernant le carnet scolaire",
  demande_rdv: "Demande de rendez-vous",
  question_paiements: "Question concernant les paiements",
  signalement_paiement: "Signalement d'un paiement déjà effectué",
  preuve_paiement: "Transmission d'un reçu ou preuve de paiement",
  demande_document: "Demande de document scolaire",
  probleme_disciplinaire: "Problème disciplinaire",
  question_professeur: "Question concernant un professeur ou un cours",
  maj_informations: "Mise à jour d'informations concernant l'élève",
  message_confidentiel: "Message confidentiel à l'administration",
  autre: "Autre demande",
};

export const parentRequestServices = [
  "administration",
  "secretariat",
  "comptabilite",
  "direction_pedagogique",
  "autre",
] as const;

export type ParentRequestService = (typeof parentRequestServices)[number];

export const parentRequestServiceLabels: Record<ParentRequestService, string> = {
  administration: "Administration",
  secretariat: "Secrétariat",
  comptabilite: "Comptabilité / Finance",
  direction_pedagogique: "Direction pédagogique",
  autre: "Autre service",
};

/** Which real roles can see/handle a request routed to a given service. ADMIN/SUPER_ADMIN always included. */
export const parentRequestServiceRoles: Record<ParentRequestService, Role[]> = {
  administration: ["ADMIN", "SUPER_ADMIN"],
  secretariat: ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"],
  comptabilite: ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"],
  direction_pedagogique: ["ADMIN", "SUPER_ADMIN", "ACADEMIC_OFFICER"],
  autre: ["ADMIN", "SUPER_ADMIN"],
};

export const parentRequestStatuses = [
  "envoyee",
  "recue",
  "en_traitement",
  "info_requise",
  "resolue",
  "cloturee",
] as const;

export type ParentRequestStatus = (typeof parentRequestStatuses)[number];

export const parentRequestStatusLabels: Record<ParentRequestStatus, string> = {
  envoyee: "Envoyée",
  recue: "Reçue",
  en_traitement: "En traitement",
  info_requise: "Informations supplémentaires requises",
  resolue: "Résolue",
  cloturee: "Clôturée",
};

export const parentRequestStatusBadge: Record<ParentRequestStatus, string> = {
  envoyee: "badge-neutral",
  recue: "badge-info",
  en_traitement: "badge-warning",
  info_requise: "badge-warning",
  resolue: "badge-success",
  cloturee: "badge-neutral",
};

export function isParentRequestCategory(value: string): value is ParentRequestCategory {
  return (parentRequestCategories as readonly string[]).includes(value);
}

export function isParentRequestService(value: string): value is ParentRequestService {
  return (parentRequestServices as readonly string[]).includes(value);
}

export function isParentRequestStatus(value: string): value is ParentRequestStatus {
  return (parentRequestStatuses as readonly string[]).includes(value);
}
