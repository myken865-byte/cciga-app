import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessStudentRequest } from "@/lib/studentRequestAccess";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { createNotification } from "@/lib/notifications";

// Ajout d'un message au fil — réutilise canAccessStudentRequest telle
// quelle (élève propriétaire OU personnel scopé par institution). Même
// schéma que app/api/parent-requests/[id]/messages/route.ts.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.studentRequest.findUnique({ where: { id } });
  if (!existing || !(await canAccessStudentRequest(session, existing))) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  const { body } = (await request.json().catch(() => null)) ?? {};
  if (typeof body !== "string" || !body.trim() || body.trim().length > 2000) {
    return NextResponse.json({ error: "Message requis." }, { status: 400 });
  }

  const message = await prisma.studentRequestMessage.create({
    data: { requestId: id, authorId: session.userId, body: body.trim() },
  });

  // Fait remonter la demande en tête de liste (tri par updatedAt) sans
  // changer le statut lui-même — même pattern que ParentRequestMessage.
  await prisma.studentRequest.update({ where: { id }, data: { status: existing.status } });

  const isStaffReply = session.userId !== existing.studentId;
  if (isStaffReply) {
    await writeAuditLog({
      entityType: "StudentRequestMessage",
      entityId: message.id,
      action: "reply",
      actorId: resolveActorId(session.userId),
      after: { id: message.id, requestId: id },
    });
    await createNotification(existing.studentId, {
      type: "student_request_reply",
      title: "Réponse à votre demande",
      body: `Vous avez reçu une réponse concernant "${existing.subject}".`,
    });
  }

  return NextResponse.json({ id: message.id }, { status: 201 });
}
