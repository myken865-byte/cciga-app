import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getProgramsBySchool } from "@/lib/content";
import { formatEnrollmentFormReference } from "@/lib/enrollmentFormReference";
import { parseEnrollmentFormDocuments } from "@/lib/enrollmentFormDocuments";
import EnrollmentFormEditor from "@/components/EnrollmentFormEditor";

export const dynamic = "force-dynamic";

export default async function FicheInscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await prisma.enrollmentForm.findUnique({ where: { id } });
  if (!form) notFound();

  const programs = await getProgramsBySchool("ecole-professionnelle");

  const fiche = {
    id: form.id,
    reference: formatEnrollmentFormReference(form.id),
    status: form.status,
    programId: form.programId,
    lastName: form.lastName,
    firstName: form.firstName,
    birthDateAndPlace: form.birthDateAndPlace ?? "",
    sex: form.sex ?? "",
    fatherName: form.fatherName ?? "",
    motherName: form.motherName ?? "",
    familyStatus: form.familyStatus ?? "",
    cin: form.cin ?? "",
    cinIssuedDate: form.cinIssuedDate ?? "",
    cinIssuedPlace: form.cinIssuedPlace ?? "",
    address: form.address ?? "",
    phone: form.phone ?? "",
    email: form.email ?? "",
    photoUrl: form.photoUrl,
    emergencyContactName: form.emergencyContactName ?? "",
    emergencyContactEmail: form.emergencyContactEmail ?? "",
    emergencyContactPhone: form.emergencyContactPhone ?? "",
    documents: parseEnrollmentFormDocuments(form.documents),
    declarationAccepted: form.declarationAccepted,
    inscriptionInfo: form.inscriptionInfo ?? "",
    uniformInfo: form.uniformInfo ?? "",
    versement1: form.versement1 ?? "",
    versement2: form.versement2 ?? "",
    versement3: form.versement3 ?? "",
    studentUserId: form.studentUserId,
  };

  return (
    <EnrollmentFormEditor
      fiche={fiche}
      programs={programs.map((p) => ({ id: p.id, name: p.name, duration: p.duration }))}
    />
  );
}
