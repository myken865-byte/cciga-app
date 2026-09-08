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
