export const requiredAdmissionDocuments = [
  "Pièce d'identité",
  "Dernier diplôme ou bulletin scolaire",
  "Photo d'identité récente",
  "Reçu des frais de dossier",
];

export interface AdmissionDocumentEntry {
  label: string;
  fileUrl: string | null;
  fileName: string | null;
}

export function computeAdmissionStatus(documents: AdmissionDocumentEntry[]): "complet" | "incomplet" {
  const provided = new Set(documents.filter((d) => d.fileUrl).map((d) => d.label));
  const allProvided = requiredAdmissionDocuments.every((doc) => provided.has(doc));
  return allProvided ? "complet" : "incomplet";
}

/**
 * `AdmissionSubmission.documents` is a JSON string, but two shapes exist in
 * the database: older rows stored `AdmissionDocumentEntry[]` objects, newer
 * rows store plain `string[]` labels. Normalize both to plain labels for
 * display so neither shape can be rendered as a raw object.
 */
/**
 * Mission "Inscription unifiée — Phase 1" (2026-09-12), §13 — contrepartie
 * de normalizeAdmissionDocumentLabels qui préserve fileUrl/fileName au lieu
 * de les jeter : nécessaire maintenant que le formulaire public peut
 * réellement téléverser un fichier (avant cette mission, fileUrl valait
 * toujours la chaîne littérale "declared", jamais une vraie URL Blob).
 * Même colonne JSON qu'avant — aucune migration.
 */
export function parseAdmissionDocumentEntries(raw: string): AdmissionDocumentEntry[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw || "[]");
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item): AdmissionDocumentEntry | null => {
      if (typeof item === "string") return { label: item, fileUrl: "declared", fileName: null };
      if (item && typeof item === "object" && typeof (item as { label?: unknown }).label === "string") {
        const entry = item as { label: string; fileUrl?: unknown; fileName?: unknown };
        return {
          label: entry.label,
          fileUrl: typeof entry.fileUrl === "string" ? entry.fileUrl : null,
          fileName: typeof entry.fileName === "string" ? entry.fileName : null,
        };
      }
      return null;
    })
    .filter((e): e is AdmissionDocumentEntry => e !== null);
}

export function normalizeAdmissionDocumentLabels(raw: string): string[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw || "[]");
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && typeof (item as { label?: unknown }).label === "string") {
        return (item as { label: string }).label;
      }
      return null;
    })
    .filter((label): label is string => !!label);
}
