import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { defaultClassicEnrollmentFormData } from "@/lib/classicEnrollmentDefaults";

export async function POST(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) ?? {};
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  if (!lastName || !firstName) {
    return NextResponse.json({ error: "Le nom et le prénom sont requis." }, { status: 400 });
  }

  const defaults = await defaultClassicEnrollmentFormData();
  const actorId = resolveActorId(session.userId);

  const fiche = await prisma.classicEnrollmentForm.create({
    data: {
      lastName,
      firstName,
      registrationDate: defaults.registrationDate,
      academicYearId: defaults.academicYearId,
      createdById: actorId,
      updatedById: actorId,
    },
  });

  await writeAuditLog({
    entityType: "ClassicEnrollmentForm",
    entityId: fiche.id,
    action: "create",
    actorId,
    after: fiche,
  });

  return NextResponse.json({ id: fiche.id }, { status: 201 });
}
