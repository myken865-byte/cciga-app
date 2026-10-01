/**
 * Demande administrative initiée par l'élève/étudiant lui-même (StudentRequest) —
 * distincte de ParentRequest (jamais détournée, jamais modifiée). Mêmes
 * conventions de forme (catégories/statuts en union de chaînes + labels +
 * type guards) que lib/parentRequests.ts.
 */
export const studentRequestCategories = [
  "attestation",
  "releve",
  "certificat",
  "duplicata_badge",
  "correction_info",
  "document_administratif",
  "reclamation_academique",
  "autre",
] as const;

export type StudentRequestCategory = (typeof studentRequestCategories)[number];

export const studentRequestCategoryLabels: Record<StudentRequestCategory, string> = {
  attestation: "Attestation",
  releve: "Relevé de notes",
  certificat: "Certificat",
  duplicata_badge: "Duplicata de badge",
  correction_info: "Correction d'informations personnelles",
  document_administratif: "Autre document administratif",
  reclamation_academique: "Réclamation académique",
  autre: "Autre demande",
};

export const studentRequestStatuses = ["soumise", "en_traitement", "validee", "rejetee", "disponible"] as const;

export type StudentRequestStatus = (typeof studentRequestStatuses)[number];

export const studentRequestStatusLabels: Record<StudentRequestStatus, string> = {
  soumise: "Soumise",
  en_traitement: "En traitement",
  validee: "Validée",
  rejetee: "Rejetée",
  disponible: "Disponible",
};

export const studentRequestStatusBadge: Record<StudentRequestStatus, string> = {
  soumise: "badge-neutral",
  en_traitement: "badge-warning",
  validee: "badge-success",
  rejetee: "badge-danger",
  disponible: "badge-success",
};

export function isStudentRequestCategory(value: string): value is StudentRequestCategory {
  return (studentRequestCategories as readonly string[]).includes(value);
}

export function isStudentRequestStatus(value: string): value is StudentRequestStatus {
  return (studentRequestStatuses as readonly string[]).includes(value);
}

/**
 * Catégories pour lesquelles le personnel peut générer automatiquement un
 * PDF (lib/pdf/StudentAttestationDocument.tsx) au lieu de devoir joindre un
 * fichier externe — un contenu générique et vérifiable (identité, programme,
 * année académique), jamais une donnée inventée. Les autres catégories
 * (relevé, duplicata badge, correction info, réclamation, autre) restent
 * "joindre un document" uniquement, faute de contenu générique fiable.
 */
export const studentRequestGeneratableCategories = ["attestation", "certificat", "document_administratif"] as const;

export function isStudentRequestGeneratable(category: string): boolean {
  return (studentRequestGeneratableCategories as readonly string[]).includes(category);
}

export const studentRequestDocumentTitles: Record<(typeof studentRequestGeneratableCategories)[number], string> = {
  attestation: "Attestation d'inscription",
  certificat: "Certificat administratif",
  document_administratif: "Document administratif",
};
