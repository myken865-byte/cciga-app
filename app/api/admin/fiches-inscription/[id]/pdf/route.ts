import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { formatEnrollmentFormReference } from "@/lib/enrollmentFormReference";
import { fillOfficialFiche } from "@/lib/pdf/officialFicheTemplate";
import {
  enrollmentFormFieldPositions as universitePos,
  enrollmentFormFamilyStatusMarks as universiteFamilyStatusMarks,
  enrollmentFormPhotoBox as universitePhotoBox,
} from "@/lib/pdf/templates/enrollmentFormTemplate";
import {
  enrollmentFormProFieldPositions as proPos,
  enrollmentFormProFamilyStatusMarks as proFamilyStatusMarks,
  enrollmentFormProPhotoBox as proPhotoBox,
} from "@/lib/pdf/templates/enrollmentFormTemplateProfessionnelle";
import { familyStatusToCheckboxKey } from "@/lib/pdf/familyStatusKey";

export const runtime = "nodejs";

async function fetchPhoto(url: string | null): Promise<{ bytes: Buffer; contentType: string } | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return { bytes: Buffer.from(await res.arrayBuffer()), contentType };
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { id } = await params;
  const form = await prisma.enrollmentForm.findUnique({
    where: { id },
    include: { program: { include: { academicFaculty: true } } },
  });
  if (!form) {
    return new Response("Fiche introuvable.", { status: 404 });
  }

  const reference = formatEnrollmentFormReference(form.id);
  const isUniversite = form.school === "universite";
  const templateFilename = isUniversite ? "universite.pdf" : "ecole-professionnelle.pdf";
  // Deux gabarits visuellement proches mais avec des coordonnées internes
  // distinctes (voir enrollmentFormTemplateProfessionnelle.ts) — jamais les
  // mêmes positions pour les deux.
  const pos = isUniversite ? universitePos : proPos;
  const familyStatusMarks = isUniversite ? universiteFamilyStatusMarks : proFamilyStatusMarks;
  const photoBox = isUniversite ? universitePhotoBox : proPhotoBox;
  const photo = await fetchPhoto(form.photoUrl);
  const registrationDateLabel = form.createdAt.toLocaleDateString("fr-FR");

  const bytes = await fillOfficialFiche({
    templateFilename,
    fields: [
      { value: reference, field: pos.ficheNumber },
      { value: registrationDateLabel, field: pos.registrationDate },
      { value: form.program?.name, field: pos.formation },
      { value: form.lastName, field: pos.lastName },
      { value: form.firstName, field: pos.firstName },
      { value: form.birthDateAndPlace, field: pos.birthDateAndPlace },
      { value: form.sex, field: pos.sex },
      { value: form.fatherName, field: pos.fatherName },
      { value: form.cin, field: pos.cin },
      { value: form.cinIssuedDate, field: pos.cinIssuedDate },
      { value: form.address, field: pos.address },
      { value: form.phone, field: pos.phone },
      { value: form.email, field: pos.email },
      { value: form.emergencyContactName, field: pos.emergencyContactName },
      { value: form.emergencyContactPhone, field: pos.emergencyContactPhone },
      { value: form.emergencyContactEmail, field: pos.emergencyContactEmail },
      { value: form.motherName, field: pos.motherName },
      { value: form.program?.name, field: pos.option },
      { value: form.inscriptionInfo, field: pos.inscriptionInfo },
      { value: form.program?.duration, field: pos.duration },
      { value: form.uniformInfo, field: pos.uniformInfo },
      { value: form.versement1, field: pos.versement1 },
      { value: form.versement2, field: pos.versement2 },
      { value: form.versement3, field: pos.versement3 },
      { value: form.program?.academicFaculty?.name, field: pos.niveauEtude },
      { value: form.declarationAccepted ? `${form.firstName} ${form.lastName}`.trim() : null, field: pos.engagementName },
    ],
    checkboxes: (() => {
      const key = familyStatusToCheckboxKey(form.familyStatus);
      return key ? [{ checked: true, mark: familyStatusMarks[key] }] : [];
    })(),
    photo: photo ? { bytes: photo.bytes, contentType: photo.contentType, box: photoBox } : null,
  });

  // Père/mère "Tél." sont deux champs séparés dans le modèle (fatherPhone
  // n'existe pas sur EnrollmentForm — le PDF officiel réutilise le même
  // "Téléphone" que le candidat pour ce parcours ; voir emergencyContactPhone
  // pour la personne à contacter). Laissé volontairement vide plutôt que d'y
  // dupliquer une donnée qui n'a pas d'équivalent réel dans ce modèle.

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
