import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { ensureBadgeForUser } from "@/lib/badgeAuto";
import { isEnrollmentFormStatus } from "@/lib/enrollmentFormStatus";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function nullableStr(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}
function nullableBool(v: unknown): boolean | null {
  return typeof v === "boolean" ? v : null;
}
function nullableInt(v: unknown): number | null {
  return typeof v === "number" && Number.isInteger(v) ? v : null;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.classicEnrollmentForm.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) ?? {};
  const status = isEnrollmentFormStatus(body.status) ? body.status : existing.status;
  const actorId = resolveActorId(session.userId);
  const declarationAccepted = body.declarationAccepted === true;

  const updated = await prisma.classicEnrollmentForm.update({
    where: { id },
    data: {
      status,
      programId: nullableStr(body.programId),
      registrationDate: nullableStr(body.registrationDate),
      schoolLevel: nullableStr(body.schoolLevel),
      previousSchool: nullableStr(body.previousSchool),
      adminCode: nullableStr(body.adminCode),
      academicYearId: nullableStr(body.academicYearId),

      lastName: str(body.lastName),
      firstName: str(body.firstName),
      birthPlaceCity: nullableStr(body.birthPlaceCity),
      birthPlaceDept: nullableStr(body.birthPlaceDept),
      birthDate: nullableStr(body.birthDate),
      sex: nullableStr(body.sex),
      bloodType: nullableStr(body.bloodType),
      livesWith: nullableStr(body.livesWith),
      religion: nullableStr(body.religion),
      addressNumber: nullableStr(body.addressNumber),
      addressStreet: nullableStr(body.addressStreet),
      addressCity: nullableStr(body.addressCity),
      addressPostalCode: nullableStr(body.addressPostalCode),
      addressZone: nullableStr(body.addressZone),
      photoUrl: nullableStr(body.photoUrl),

      familyStatus: nullableStr(body.familyStatus),
      fatherName: nullableStr(body.fatherName),
      fatherProfession: nullableStr(body.fatherProfession),
      fatherOccupation: nullableStr(body.fatherOccupation),
      fatherEmail: nullableStr(body.fatherEmail),
      fatherPhone: nullableStr(body.fatherPhone),
      fatherNif: nullableStr(body.fatherNif),
      fatherCin: nullableStr(body.fatherCin),

      motherName: nullableStr(body.motherName),
      motherProfession: nullableStr(body.motherProfession),
      motherOccupation: nullableStr(body.motherOccupation),
      motherEmail: nullableStr(body.motherEmail),
      motherPhone: nullableStr(body.motherPhone),
      motherNif: nullableStr(body.motherNif),
      motherCin: nullableStr(body.motherCin),

      guardianName: nullableStr(body.guardianName),
      guardianProfession: nullableStr(body.guardianProfession),
      guardianOccupation: nullableStr(body.guardianOccupation),
      guardianEmail: nullableStr(body.guardianEmail),
      guardianPhone: nullableStr(body.guardianPhone),
      guardianNif: nullableStr(body.guardianNif),
      guardianCin: nullableStr(body.guardianCin),

      vaccinesUpToDate: nullableBool(body.vaccinesUpToDate),
      longTermMedication: nullableBool(body.longTermMedication),
      medicationDetails: nullableStr(body.medicationDetails),

      siblings: typeof body.siblings === "string" ? body.siblings : "[]",

      declarationAccepted,
      declarationDate: declarationAccepted ? (existing.declarationDate ?? new Date()) : null,
      studentUserId: nullableInt(body.studentUserId),

      updatedById: actorId,
    },
  });

  // Numéro unique + identifiant + badge automatique (règle permanente du
  // projet) — dès que la fiche passe "validee" et est rattachée à un compte
  // élève, on s'assure que le badge existe (ou que son statut est réconcilié),
  // exactement comme pour les autres workflows d'inscription.
  if (updated.status === "validee" && updated.studentUserId) {
    await ensureBadgeForUser(updated.studentUserId, actorId);
  }

  await writeAuditLog({
    entityType: "ClassicEnrollmentForm",
    entityId: id,
    action: existing.status !== updated.status ? "status_change" : "update",
    actorId,
    before: existing,
    after: updated,
  });

  return NextResponse.json({ ok: true });
}
