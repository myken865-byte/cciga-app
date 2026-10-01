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
  // Mission "Inscription unifiée — Phase 1" (2026-09-12), §14 : le schéma
  // Prisma documentait déjà cette forme complète pour `documents` (JSON
  // libre, aucune colonne dédiée) mais ce parseur les perdait silencieusement
  // à chaque relecture — corrigé ici, sans aucune migration (même colonne).
  fileUrl?: string | null;
  fileName?: string | null;
}

export function parseClassicEnrollmentDocuments(json: string): ClassicEnrollmentDocumentEntry[] {
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((d): d is { label: unknown; status: unknown; fileUrl?: unknown; fileName?: unknown } => typeof d === "object" && d !== null)
      .map((d) => ({
        label: typeof d.label === "string" ? d.label : "",
        status: (enrollmentFormDocumentStatuses as readonly string[]).includes(d.status as string)
          ? (d.status as EnrollmentFormDocumentStatus)
          : "non_fourni",
        fileUrl: typeof d.fileUrl === "string" ? d.fileUrl : null,
        fileName: typeof d.fileName === "string" ? d.fileName : null,
      }))
      .filter((d) => d.label.trim().length > 0);
  } catch {
    return [];
  }
}
