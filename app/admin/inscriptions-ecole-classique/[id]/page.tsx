import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getProgramsBySchool } from "@/lib/content";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";
import { parseClassicEnrollmentSiblings } from "@/lib/classicEnrollmentSiblings";
import { parseClassicEnrollmentDocuments } from "@/lib/classicEnrollmentDocuments";
import ClassicEnrollmentFormEditor from "@/components/ClassicEnrollmentFormEditor";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";

export const dynamic = "force-dynamic";

export default async function InscriptionEcoleClassiqueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [fiche, programs, academicYears] = await Promise.all([
    prisma.classicEnrollmentForm.findUnique({ where: { id } }),
    getProgramsBySchool("ecole-classique"),
    prisma.academicYear.findMany({ orderBy: { startDate: "desc" } }),
  ]);

  if (!fiche) notFound();

  return (
    <AdminShell>
      <AdminTitleBand
        eyebrow="CCIGA — École Classique"
        title={`Fiche d'inscription — ${fiche.firstName} ${fiche.lastName}`}
      />
      <ClassicEnrollmentFormEditor
      fiche={{
        id: fiche.id,
        reference: formatClassicEnrollmentFormReference(fiche.id),
        status: fiche.status,
        programId: fiche.programId,

        registrationDate: fiche.registrationDate ?? "",
        schoolLevel: fiche.schoolLevel ?? "",
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
        addressNumber: fiche.addressNumber ?? "",
        addressStreet: fiche.addressStreet ?? "",
        addressCity: fiche.addressCity ?? "",
        addressPostalCode: fiche.addressPostalCode ?? "",
        addressZone: fiche.addressZone ?? "",
        photoUrl: fiche.photoUrl,

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

        vaccinesUpToDate: fiche.vaccinesUpToDate,
        longTermMedication: fiche.longTermMedication,
        medicationDetails: fiche.medicationDetails ?? "",

        siblings: parseClassicEnrollmentSiblings(fiche.siblings),
        documents: parseClassicEnrollmentDocuments(fiche.documents),

        declarationAccepted: fiche.declarationAccepted,
        studentUserId: fiche.studentUserId,

        academicYearId: fiche.academicYearId,
      }}
      programs={programs.map((p) => ({ id: p.id, name: p.name, niveau: p.niveau }))}
      academicYears={academicYears.map((y) => ({ id: y.id, label: y.label, isActive: y.isActive }))}
    />
    </AdminShell>
  );
}
