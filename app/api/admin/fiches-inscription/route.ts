import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { resolveActorId } from "@/lib/devBypass";
import { writeAuditLog } from "@/lib/auditLog";
import { defaultEnrollmentFormDocuments } from "@/lib/enrollmentFormDocuments";

// Création d'une fiche d'inscription École Professionnelle — le strict
// minimum (nom/prénoms, requis par le modèle Prisma) est saisi ici ; le
// reste se complète ensuite dans l'éditeur complet (EnrollmentFormEditor).
export async function POST(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    lastName?: string;
    firstName?: string;
    programId?: string | null;
  };
  const lastName = (body.lastName ?? "").trim();
  const firstName = (body.firstName ?? "").trim();

  if (!lastName || !firstName) {
    return NextResponse.json({ error: "Nom et prénoms requis." }, { status: 400 });
  }

  const actorId = resolveActorId(session.userId);

  const form = await prisma.enrollmentForm.create({
    data: {
      school: "ecole-professionnelle",
      lastName,
      firstName,
      programId: body.programId || undefined,
      documents: JSON.stringify(defaultEnrollmentFormDocuments()),
      createdById: actorId ?? undefined,
      updatedById: actorId ?? undefined,
    },
  });

  await writeAuditLog({
    entityType: "EnrollmentForm",
    entityId: form.id,
    action: "create",
    actorId,
    after: form,
  });

  return NextResponse.json({ ok: true, id: form.id });
}
