export const requiredAdmissionDocuments = [
  "Pièce d'identité",
  "Dernier diplôme ou bulletin scolaire",
  "Photo d'identité récente",
  "Reçu des frais de dossier",
];

export function computeAdmissionStatus(documents: string[]): "complet" | "incomplet" {
  const provided = new Set(documents);
  const allProvided = requiredAdmissionDocuments.every((doc) => provided.has(doc));
  return allProvided ? "complet" : "incomplet";
}
