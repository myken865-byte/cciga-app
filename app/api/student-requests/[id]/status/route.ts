import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAnyStudentRequestStaff, canAccessStudentRequest } from "@/lib/studentRequestAccess";
import { isStudentRequestStatus } from "@/lib/studentRequests";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { createNotification } from "@/lib/notifications";

// Changement de statut — réservé au personnel (jamais l'élève), scopé par
// institution via canAccessStudentRequest. Même schéma que
// app/api/parent-requests/[id]/status/route.ts.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !isAnyStudentRequestStaff(session)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.studentRequest.findUnique({ where: { id } });
  if (!existing || !(await canAccessStudentRequest(session, existing))) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  const { status } = (await request.json().catch(() => null)) ?? {};
  if (typeof status !== "string" || !isStudentRequestStatus(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const updated = await prisma.studentRequest.update({ where: { id }, data: { status } });

  await writeAuditLog({
    entityType: "StudentRequest",
    entityId: updated.id,
    action: "status_change",
    actorId: resolveActorId(session.userId),
    before: { status: existing.status },
    after: { status: updated.status },
  });

  await createNotification(existing.studentId, {
    type: "student_request_status",
    title: "Mise à jour de votre demande",
    body: `Votre demande "${existing.subject}" est maintenant : ${status}.`,
  });

  return NextResponse.json({ status: updated.status });
}
