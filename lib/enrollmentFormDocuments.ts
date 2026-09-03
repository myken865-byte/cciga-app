// Pièces exigées par la fiche d'inscription papier officielle du
// Secrétariat — distinctes de requiredAdmissionDocuments (candidature en
// ligne), qui a ses propres 4 pièces sans rapport avec celle-ci.
export const requiredEnrollmentFormDocuments = [
  "Un extrait de naissance",
  "Deux photos d'identité récentes en couleur",
  "Une photocopie recto-verso de la carte d'identification nationale ou du matricule",
];

export const enrollmentFormDocumentStatuses = ["fourni", "non_fourni", "a_verifier"] as const;
export type EnrollmentFormDocumentStatus = (typeof enrollmentFormDocumentStatuses)[number];

export const enrollmentFormDocumentStatusLabels: Record<EnrollmentFormDocumentStatus, string> = {
  fourni: "Fourni",
  non_fourni: "Non fourni",
  a_verifier: "À vérifier",
};

export interface EnrollmentFormDocumentEntry {
  label: string;
  status: EnrollmentFormDocumentStatus;
  fileUrl: string | null;
  fileName: string | null;
}

export function defaultEnrollmentFormDocuments(): EnrollmentFormDocumentEntry[] {
  return requiredEnrollmentFormDocuments.map((label) => ({
    label,
    status: "non_fourni",
    fileUrl: null,
    fileName: null,
  }));
}

export function parseEnrollmentFormDocuments(json: string): EnrollmentFormDocumentEntry[] {
  try {
    const parsed = JSON.parse(json) as EnrollmentFormDocumentEntry[];
    if (!Array.isArray(parsed)) return defaultEnrollmentFormDocuments();
    // Toujours retourner exactement les pièces officielles, dans l'ordre —
    // reprend le statut/fichier déjà saisi s'il existe pour cette pièce.
    return requiredEnrollmentFormDocuments.map((label) => {
      const existing = parsed.find((d) => d.label === label);
      return existing ?? { label, status: "non_fourni", fileUrl: null, fileName: null };
    });
  } catch {
    return defaultEnrollmentFormDocuments();
  }
}

export function computeEnrollmentFormDocumentsComplete(documents: EnrollmentFormDocumentEntry[]): boolean {
  return requiredEnrollmentFormDocuments.every((label) => documents.find((d) => d.label === label)?.status === "fourni");
}
