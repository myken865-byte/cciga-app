import { prisma } from "@/lib/db";
import { parseAdmissionDocumentEntries, type AdmissionDocumentEntry } from "@/lib/admission-documents";
import type { ClassicEnrollmentDocumentEntry } from "@/lib/classicEnrollmentDocuments";

/**
 * Mission "Portail Secrétariat — Phase P1" (2026-09-13), objectif A —
 * continuité automatique des documents/photo entre candidature en ligne
 * (AdmissionSubmission) et fiche d'inscription. Réutilise exactement les
 * champs déjà existants (AdmissionSubmission.documents,
 * ClassicEnrollmentForm.documents/photoUrl, EnrollmentForm.photoUrl) —
 * aucune migration, aucun fichier dupliqué : seule la référence (fileUrl)
 * déjà stockée par le candidat est reportée telle quelle.
 *
 * "Photo d'identité récente" est la seule pièce de requiredAdmissionDocuments
 * (lib/admission-documents.ts) qui a un équivalent structurel direct côté
 * fiche (un champ `photoUrl` dédié, sur les deux modèles de fiche) — jamais
 * inventé, ce libellé existe déjà tel quel dans lib/admission-documents.ts.
 */
export const ADMISSION_PHOTO_LABEL = "Photo d'identité récente";

/** Une pièce n'est "réelle" que si son fileUrl est une vraie référence de fichier — jamais `null` ni le littéral historique "declared" (case cochée sans fichier). */
function isRealFileUrl(fileUrl: string | null): fileUrl is string {
  return typeof fileUrl === "string" && fileUrl.length > 0 && fileUrl !== "declared";
}

export function extractAdmissionDocumentEntry(
  documents: AdmissionDocumentEntry[],
  label: string,
): AdmissionDocumentEntry | null {
  const entry = documents.find((d) => d.label === label);
  return entry && isRealFileUrl(entry.fileUrl) ? entry : null;
}

/**
 * Reporte les pièces de la candidature dans la fiche École Classique — un
 * modèle qui n'a, par construction, aucune liste officielle figée de pièces
 * (lib/classicEnrollmentDocuments.ts : "librement éditable par le
 * secrétariat"), contrairement à EnrollmentForm dont les 3 libellés officiels
 * (lib/enrollmentFormDocuments.ts) ne correspondent à aucun des 4 libellés de
 * la candidature — aucune correspondance n'est donc devinée pour ce second
 * modèle (voir le commentaire de app/api/admin/admissions/[id]/convert/route.ts).
 * La pièce "Photo d'identité récente" est exclue ici : elle a son propre
 * champ dédié `photoUrl`, jamais dupliquée aussi dans la liste de documents.
 */
export function propagateAdmissionDocumentsToClassicFiche(
  documents: AdmissionDocumentEntry[],
): ClassicEnrollmentDocumentEntry[] {
  return documents
    .filter((d) => d.label !== ADMISSION_PHOTO_LABEL)
    .map((d) => ({
      label: d.label,
      status: isRealFileUrl(d.fileUrl) ? "fourni" : "non_fourni",
      fileUrl: isRealFileUrl(d.fileUrl) ? d.fileUrl : null,
      fileName: d.fileName,
    }));
}

/**
 * Règle de priorité photo (§6) au moment de la création/liaison du compte :
 * 1. photo déjà présente sur la fiche (la plus récente, saisie par le
 *    Secrétariat ou déjà reportée depuis la candidature à la conversion) ;
 * 2. sinon, celle de la candidature d'origine si la fiche y est reliée
 *    (admissionSubmissionId) et qu'aucune n'a encore été reportée.
 * Ne retourne jamais une valeur si aucune des deux sources n'a de fichier
 * réel — jamais de placeholder inventé ici (géré à l'affichage).
 */
export async function resolveBestAvailablePhotoUrl(
  fichePhotoUrl: string | null,
  admissionSubmissionId: string | null,
): Promise<string | null> {
  if (fichePhotoUrl) return fichePhotoUrl;
  if (!admissionSubmissionId) return null;
  const submission = await prisma.admissionSubmission.findUnique({
    where: { id: admissionSubmissionId },
    select: { documents: true },
  });
  if (!submission) return null;
  const entry = extractAdmissionDocumentEntry(parseAdmissionDocumentEntries(submission.documents), ADMISSION_PHOTO_LABEL);
  return entry?.fileUrl ?? null;
}
