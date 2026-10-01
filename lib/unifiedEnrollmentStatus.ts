import type { AdmissionStatus } from "@/lib/admission-status";
import type { EnrollmentFormStatus } from "@/lib/enrollmentFormStatus";

/**
 * Mission "Inscription unifiée — Phase 1" (2026-09-12) : couche de mapping
 * fonctionnel UNIQUEMENT — les colonnes natives (`AdmissionSubmission.status`,
 * `EnrollmentForm.status`, `ClassicEnrollmentForm.status`) ne changent pas et
 * restent la seule source de vérité écrite en base. Ce statut unifié n'existe
 * qu'en mémoire, calculé à la volée pour l'affichage Secrétariat — jamais
 * stocké, jamais une colonne, donc aucune migration.
 */
export const unifiedEnrollmentStatuses = [
  "nouveau",
  "incomplet",
  "a_verifier",
  "valide",
  "rejete",
  "archive",
] as const;

export type UnifiedEnrollmentStatus = (typeof unifiedEnrollmentStatuses)[number];

export const unifiedEnrollmentStatusLabels: Record<UnifiedEnrollmentStatus, string> = {
  nouveau: "Nouveau",
  incomplet: "Incomplet",
  a_verifier: "À vérifier",
  valide: "Validé",
  rejete: "Rejeté",
  archive: "Archivé",
};

export const unifiedEnrollmentStatusStyles: Record<UnifiedEnrollmentStatus, string> = {
  nouveau: "bg-primary/10 text-primary",
  incomplet: "bg-amber-100 text-amber-700",
  a_verifier: "bg-blue-100 text-blue-700",
  valide: "bg-emerald-600 text-white",
  rejete: "bg-red-100 text-red-700",
  archive: "bg-amber-100 text-amber-800",
};

/** AdmissionSubmission n'a pas d'équivalent natif à "a_verifier"/"archive" — jamais deviné, "complet" vaut "à vérifier" par le Secrétariat. */
export function mapAdmissionStatusToUnified(status: AdmissionStatus): UnifiedEnrollmentStatus {
  switch (status) {
    case "nouveau":
      return "nouveau";
    case "incomplet":
      return "incomplet";
    case "complet":
      return "a_verifier";
    case "admis":
      return "valide";
    case "rejete":
      return "rejete";
  }
}

/** EnrollmentForm/ClassicEnrollmentForm partagent déjà ce vocabulaire — mapping direct, aucune perte. */
export function mapEnrollmentFormStatusToUnified(status: EnrollmentFormStatus): UnifiedEnrollmentStatus {
  switch (status) {
    case "brouillon":
      return "nouveau";
    case "incomplet":
      return "incomplet";
    case "a_verifier":
      return "a_verifier";
    case "validee":
      return "valide";
    case "archivee":
      return "archive";
  }
}
