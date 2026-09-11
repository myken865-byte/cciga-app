import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";
import { parseClassicEnrollmentSiblings } from "@/lib/classicEnrollmentSiblings";
import { niveauLabels, type Niveau } from "@/lib/niveaux";
import { fillOfficialFiche } from "@/lib/pdf/officialFicheTemplate";
import {
  classicFicheFieldPositions as pos,
  classicFicheSexMarks,
  classicFicheLivesWithMarks,
  classicFicheFamilyStatusMarks,
  classicFicheVaccinesMarks,
  classicFicheMedicationMarks,
  classicFicheSiblingRows,
  classicFichePhotoBox,
} from "@/lib/pdf/templates/classicEnrollmentFormTemplate";
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
  const fiche = await prisma.classicEnrollmentForm.findUnique({ where: { id }, include: { program: true } });
  if (!fiche) {
    return new Response("Fiche introuvable.", { status: 404 });
  }

  const reference = formatClassicEnrollmentFormReference(fiche.id);
  const photo = await fetchPhoto(fiche.photoUrl);
  const schoolLevelLabel = fiche.schoolLevel ? (niveauLabels[fiche.schoolLevel as Niveau] ?? fiche.schoolLevel) : "";
  const registrationDateLabel = fiche.registrationDate ?? "";
  const siblings = parseClassicEnrollmentSiblings(fiche.siblings).slice(0, 6);

  const checkboxes: Array<{ checked: boolean; mark: (typeof classicFicheSexMarks)[string] }> = [];
  if (fiche.sex === "Masculin") checkboxes.push({ checked: true, mark: classicFicheSexMarks.masculin });
  else if (fiche.sex === "Féminin") checkboxes.push({ checked: true, mark: classicFicheSexMarks.feminin });
  else if (fiche.sex) checkboxes.push({ checked: true, mark: classicFicheSexMarks.autre });

  if (fiche.livesWith && classicFicheLivesWithMarks[fiche.livesWith]) {
    checkboxes.push({ checked: true, mark: classicFicheLivesWithMarks[fiche.livesWith] });
  }

  const familyStatusKey = familyStatusToCheckboxKey(fiche.familyStatus);
  if (familyStatusKey) checkboxes.push({ checked: true, mark: classicFicheFamilyStatusMarks[familyStatusKey] });

  if (fiche.vaccinesUpToDate !== null) {
    checkboxes.push({ checked: true, mark: fiche.vaccinesUpToDate ? classicFicheVaccinesMarks.oui : classicFicheVaccinesMarks.non });
  }
  if (fiche.longTermMedication !== null) {
    checkboxes.push({
      checked: true,
      mark: fiche.longTermMedication ? classicFicheMedicationMarks.oui : classicFicheMedicationMarks.non,
    });
  }

  const bytes = await fillOfficialFiche({
    templateFilename: "ecole-classique.pdf",
    fields: [
      { value: reference, field: pos.ficheNumber },
      { value: registrationDateLabel, field: pos.registrationDateTop },
      { value: registrationDateLabel, field: pos.registrationDate },
      { value: schoolLevelLabel, field: pos.schoolLevel },
      { value: fiche.program?.name, field: pos.className },
      { value: fiche.previousSchool, field: pos.previousSchool },
      { value: fiche.adminCode, field: pos.adminCode },

      { value: fiche.lastName, field: pos.lastName },
      { value: fiche.firstName, field: pos.firstName },
      { value: fiche.birthPlaceCity, field: pos.birthPlaceCity },
      { value: fiche.birthDate, field: pos.birthDate },
      { value: fiche.birthPlaceDept, field: pos.birthPlaceDept },
      { value: fiche.bloodType, field: pos.bloodType },
      { value: fiche.religion, field: pos.religion },
      { value: fiche.addressNumber, field: pos.addressNumber },
      { value: fiche.addressStreet, field: pos.addressStreet },
      { value: fiche.addressCity, field: pos.addressCity },
      { value: fiche.addressPostalCode, field: pos.addressPostalCode },
      { value: fiche.addressZone, field: pos.addressZone },

      { value: fiche.fatherName, field: pos.fatherName },
      { value: fiche.fatherProfession, field: pos.fatherProfession },
      { value: fiche.fatherOccupation, field: pos.fatherOccupation },
      { value: fiche.fatherEmail, field: pos.fatherEmail },
      { value: fiche.fatherPhone, field: pos.fatherPhone },
      { value: fiche.fatherNif, field: pos.fatherNif },
      { value: fiche.fatherCin, field: pos.fatherCin },

      { value: fiche.motherName, field: pos.motherName },
      { value: fiche.motherProfession, field: pos.motherProfession },
      { value: fiche.motherOccupation, field: pos.motherOccupation },
      { value: fiche.motherEmail, field: pos.motherEmail },
      { value: fiche.motherPhone, field: pos.motherPhone },
      { value: fiche.motherNif, field: pos.motherNif },
      { value: fiche.motherCin, field: pos.motherCin },

      { value: fiche.medicationDetails, field: pos.medicationDetails },
      { value: fiche.declarationAccepted ? registrationDateLabel : null, field: pos.engagementDate },

      ...siblings.map((s, i) => [
        { value: s.firstName || null, field: classicFicheSiblingRows[i].prenom },
        { value: s.birthDate || null, field: classicFicheSiblingRows[i].annee },
        { value: s.school || null, field: classicFicheSiblingRows[i].ecole },
      ]).flat(),
    ],
    checkboxes,
    photo: photo ? { bytes: photo.bytes, contentType: photo.contentType, box: classicFichePhotoBox } : null,
  });

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
