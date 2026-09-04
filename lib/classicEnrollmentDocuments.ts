// Pièces d'inscription — École Classique. Contrairement à
// lib/enrollmentFormDocuments.ts (École Professionnelle), aucune liste
// officielle de pièces exigées n'est confirmée pour l'École Classique : la
// liste reste donc librement éditable par le secrétariat (aucune pièce
// inventée), avec les mêmes statuts fourni/non_fourni/à_vérifier.
import { enrollmentFormDocumentStatuses, type EnrollmentFormDocumentStatus } from "@/lib/enrollmentFormDocuments";

export { enrollmentFormDocumentStatuses, enrollmentFormDocumentStatusLabels } from "@/lib/enrollmentFormDocuments";
export type { EnrollmentFormDocumentStatus } from "@/lib/enrollmentFormDocuments";

export interface ClassicEnrollmentDocumentEntry {
  label: string;
  status: EnrollmentFormDocumentStatus;
}

export function parseClassicEnrollmentDocuments(json: string): ClassicEnrollmentDocumentEntry[] {
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((d): d is { label: unknown; status: unknown } => typeof d === "object" && d !== null)
      .map((d) => ({
        label: typeof d.label === "string" ? d.label : "",
        status: (enrollmentFormDocumentStatuses as readonly string[]).includes(d.status as string)
          ? (d.status as EnrollmentFormDocumentStatus)
          : "non_fourni",
      }))
      .filter((d) => d.label.trim().length > 0);
  } catch {
    return [];
  }
}
