import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePsychosocialSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

const VALID_STATUSES = ["ouvert", "suivi", "cloture"];

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requirePsychosocialSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant de modifier un dossier." }, { status: 400 });
  }

  const { id } = await params;
  const existing = await prisma.psychosocialCase.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });
  }
  if (existing.school !== school) {
    return NextResponse.json({ error: "Ce dossier appartient à une autre institution." }, { status: 403 });
  }

  const { body, status } = (await request.json()) ?? {};

  if (typeof status === "string") {
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    const updated = await prisma.psychosocialCase.update({
      where: { id },
      data: { status },
    });

    await writeAuditLog({
      entityType: "PsychosocialCase",
      entityId: updated.id,
      action: "status_change",
      actorId: resolveActorId(session.userId),
      before: { status: existing.status },
      after: { status: updated.status },
    });

    return NextResponse.json({ status: updated.status });
  }

  if (typeof body === "string" && body.trim()) {
    const note = await prisma.psychosocialNote.create({
      data: { caseId: id, body: body.trim(), authorId: session.userId },
    });

    await writeAuditLog({
      entityType: "PsychosocialNote",
      entityId: note.id,
      action: "create",
      actorId: resolveActorId(session.userId),
      after: { id: note.id, caseId: note.caseId },
    });

    return NextResponse.json({ id: note.id }, { status: 201 });
  }

  return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
}
