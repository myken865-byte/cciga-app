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
