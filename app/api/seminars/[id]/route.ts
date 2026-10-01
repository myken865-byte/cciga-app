import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canManageSeminar } from "@/lib/seminarAccess";
import { isSeminarStatus } from "@/lib/seminars";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

// Modification d'un séminaire — statut, ouverture des inscriptions, support
// matériel. Réservé au personnel scopé sur l'institution du séminaire.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.seminar.findUnique({ where: { id } });
  if (!existing || !(await canManageSeminar(session, existing))) {
    return NextResponse.json({ error: "Séminaire introuvable." }, { status: 404 });
  }

  const { status, registrationOpen, materialsUrl, materialsName } = (await request.json().catch(() => null)) ?? {};
  const data: Record<string, unknown> = {};

  if (status !== undefined) {
    if (typeof status !== "string" || !isSeminarStatus(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    data.status = status;
  }
  if (registrationOpen !== undefined) {
    if (typeof registrationOpen !== "boolean") {
      return NextResponse.json({ error: "Valeur d'inscription invalide." }, { status: 400 });
    }
    data.registrationOpen = registrationOpen;
  }
  if (materialsUrl !== undefined) data.materialsUrl = typeof materialsUrl === "string" ? materialsUrl : null;
  if (materialsName !== undefined) data.materialsName = typeof materialsName === "string" ? materialsName : null;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Aucune modification fournie." }, { status: 400 });
  }

  const updated = await prisma.seminar.update({ where: { id }, data });

  await writeAuditLog({
    entityType: "Seminar",
    entityId: updated.id,
    action: "update",
    actorId: resolveActorId(session.userId),
    before: existing,
    after: updated,
  });

  return NextResponse.json({ id: updated.id });
}
