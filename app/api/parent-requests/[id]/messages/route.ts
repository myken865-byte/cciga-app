import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessParentRequest } from "@/lib/parentRequestAccess";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

// Ajout d'un message au fil — accessible au parent propriétaire de la
// demande ET à l'agent assigné/du service concerné (voir
// lib/parentRequestAccess.ts `canAccessParentRequest`, réutilisée telle
// quelle). Voir components/ParentRequestThread.tsx `sendReply`.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.parentRequest.findUnique({ where: { id } });
  if (!existing || !canAccessParentRequest(session, existing)) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  const { body } = (await request.json().catch(() => null)) ?? {};
  if (typeof body !== "string" || !body.trim()) {
    return NextResponse.json({ error: "Message requis." }, { status: 400 });
  }

  const message = await prisma.parentRequestMessage.create({
    data: { requestId: id, authorId: session.userId, body: body.trim() },
  });

  // Fait remonter la demande en tête de liste (tri par updatedAt) sans
  // changer le statut lui-même.
  await prisma.parentRequest.update({ where: { id }, data: { status: existing.status } });

  const isStaffReply = session.userId !== existing.parentId;
  if (isStaffReply) {
    await writeAuditLog({
      entityType: "ParentRequestMessage",
      entityId: message.id,
      action: "reply",
      actorId: resolveActorId(session.userId),
      after: { id: message.id, requestId: id },
    });
  }

  return NextResponse.json({ id: message.id }, { status: 201 });
}
