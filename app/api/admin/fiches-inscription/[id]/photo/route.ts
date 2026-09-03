import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { resolveActorId } from "@/lib/devBypass";
import { writeAuditLog } from "@/lib/auditLog";

// Route dédiée à la photo — distincte de la sauvegarde générale [id]/route.ts
// pour que l'import de photo (immédiat, dès le choix du fichier) ne dépende
// jamais d'un clic sur "Enregistrer", et pour ne jamais écraser la photo par
// une sauvegarde générale concurrente qui n'aurait pas cette information.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.enrollmentForm.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as { photoUrl?: string };
  if (!body.photoUrl || typeof body.photoUrl !== "string") {
    return NextResponse.json({ error: "photoUrl requis." }, { status: 400 });
  }

  const actorId = resolveActorId(session.userId);
  const updated = await prisma.enrollmentForm.update({
    where: { id },
    data: { photoUrl: body.photoUrl, updatedById: actorId ?? undefined },
  });

  await writeAuditLog({
    entityType: "EnrollmentForm",
    entityId: id,
    action: "photo_update",
    actorId,
    before: { photoUrl: existing.photoUrl },
    after: { photoUrl: updated.photoUrl },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.enrollmentForm.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const actorId = resolveActorId(session.userId);
  await prisma.enrollmentForm.update({
    where: { id },
    data: { photoUrl: null, updatedById: actorId ?? undefined },
  });

  await writeAuditLog({
    entityType: "EnrollmentForm",
    entityId: id,
    action: "photo_remove",
    actorId,
    before: { photoUrl: existing.photoUrl },
    after: { photoUrl: null },
  });

  return NextResponse.json({ ok: true });
}
