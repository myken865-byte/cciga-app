import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

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
  const photoUrl = typeof body.photoUrl === "string" && body.photoUrl.length > 0 ? body.photoUrl : null;

  const updated = await prisma.classicEnrollmentForm.update({ where: { id }, data: { photoUrl } });

  await writeAuditLog({
    entityType: "ClassicEnrollmentForm",
    entityId: id,
    action: "photo_update",
    actorId: resolveActorId(session.userId),
    before: { photoUrl: existing.photoUrl },
    after: { photoUrl: updated.photoUrl },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.classicEnrollmentForm.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  await prisma.classicEnrollmentForm.update({ where: { id }, data: { photoUrl: null } });

  await writeAuditLog({
    entityType: "ClassicEnrollmentForm",
    entityId: id,
    action: "photo_remove",
    actorId: resolveActorId(session.userId),
    before: { photoUrl: existing.photoUrl },
    after: { photoUrl: null },
  });

  return NextResponse.json({ ok: true });
}
