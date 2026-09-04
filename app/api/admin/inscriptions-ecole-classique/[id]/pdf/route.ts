import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import { schoolToSector } from "@/lib/branding";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";
import { parseClassicEnrollmentSiblings } from "@/lib/classicEnrollmentSiblings";
import { parseClassicEnrollmentDocuments } from "@/lib/classicEnrollmentDocuments";
import { niveauLabels, type Niveau } from "@/lib/niveaux";
import ClassicEnrollmentFormDocument from "@/lib/pdf/ClassicEnrollmentFormDocument";

export const runtime = "nodejs";

async function photoToDataUri(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
  const logoBase64 = getDocumentLogoDataUri(schoolToSector("ecole-classique"));
  const photoBase64 = await photoToDataUri(fiche.photoUrl);

  const addressLine = [fiche.addressNumber, fiche.addressStreet, fiche.addressCity, fiche.addressPostalCode, fiche.addressZone]
    .filter((part) => part && part.trim().length > 0)
    .join(", ");

  const schoolLevelLabel = fiche.schoolLevel ? (niveauLabels[fiche.schoolLevel as Niveau] ?? fiche.schoolLevel) : "";
  const boolLabel = (v: boolean | null) => (v === null ? "— À COMPLÉTER —" : v ? "Oui" : "Non");

  const buffer = await renderToBuffer(
    ClassicEnrollmentFormDocument({
      logoBase64,
      ficheNumber: reference,
      classLabel: fiche.program?.name ?? schoolLevelLabel,
      photoBase64,

      registrationDateLabel: fiche.registrationDate ?? "",
      schoolLevel: schoolLevelLabel,
      previousSchool: fiche.previousSchool ?? "",
      adminCode: fiche.adminCode ?? "",

      lastName: fiche.lastName,
      firstName: fiche.firstName,
      birthPlaceCity: fiche.birthPlaceCity ?? "",
      birthPlaceDept: fiche.birthPlaceDept ?? "",
      birthDate: fiche.birthDate ?? "",
      sex: fiche.sex ?? "",
      bloodType: fiche.bloodType ?? "",
      livesWith: fiche.livesWith ?? "",
      religion: fiche.religion ?? "",
      addressLine,

      familyStatus: fiche.familyStatus ?? "",
      fatherName: fiche.fatherName ?? "",
      fatherProfession: fiche.fatherProfession ?? "",
      fatherOccupation: fiche.fatherOccupation ?? "",
      fatherEmail: fiche.fatherEmail ?? "",
      fatherPhone: fiche.fatherPhone ?? "",
      fatherNif: fiche.fatherNif ?? "",
      fatherCin: fiche.fatherCin ?? "",

      motherName: fiche.motherName ?? "",
      motherProfession: fiche.motherProfession ?? "",
      motherOccupation: fiche.motherOccupation ?? "",
      motherEmail: fiche.motherEmail ?? "",
      motherPhone: fiche.motherPhone ?? "",
      motherNif: fiche.motherNif ?? "",
      motherCin: fiche.motherCin ?? "",

      guardianName: fiche.guardianName ?? "",
      guardianProfession: fiche.guardianProfession ?? "",
      guardianOccupation: fiche.guardianOccupation ?? "",
      guardianEmail: fiche.guardianEmail ?? "",
      guardianPhone: fiche.guardianPhone ?? "",
      guardianNif: fiche.guardianNif ?? "",
      guardianCin: fiche.guardianCin ?? "",

      vaccinesUpToDateLabel: boolLabel(fiche.vaccinesUpToDate),
      longTermMedicationLabel: boolLabel(fiche.longTermMedication),
      medicationDetails: fiche.medicationDetails ?? "",

      siblings: parseClassicEnrollmentSiblings(fiche.siblings),
      documents: parseClassicEnrollmentDocuments(fiche.documents),

      fullName: `${fiche.firstName} ${fiche.lastName}`.trim(),
      declarationAccepted: fiche.declarationAccepted,
      declarationDateLabel: fiche.declarationDate
        ? fiche.declarationDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
        : "",

      generatedLabel: `Généré le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`,
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
