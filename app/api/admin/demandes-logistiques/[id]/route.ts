import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isLogisticsRequestStatus, isValidLogisticsTransition, type LogisticsRequestStatus } from "@/lib/logisticsRequests";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { createNotification } from "@/lib/notifications";

const STAFF_ROLES = ["SUPER_ADMIN", "LOGISTICIEN"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, [...STAFF_ROLES])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.logisticsRequest.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }
  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool || (activeSchool !== "toutes" && existing.school !== activeSchool)) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  const { status } = (await request.json().catch(() => null)) ?? {};
  if (typeof status !== "string" || !isLogisticsRequestStatus(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }
  if (!isValidLogisticsTransition(existing.status as LogisticsRequestStatus, status)) {
    return NextResponse.json({ error: `Transition "${existing.status} → ${status}" non autorisée.` }, { status: 400 });
  }

  const updated = await prisma.logisticsRequest.update({ where: { id }, data: { status } });

  await writeAuditLog({
    entityType: "LogisticsRequest",
    entityId: updated.id,
    action: "status_change",
    actorId: resolveActorId(session.userId),
    before: { status: existing.status },
    after: { status: updated.status },
  });

  await createNotification(existing.requestedById, {
    type: "logistics_request_status",
    title: "Mise à jour de votre demande logistique",
    body: `Votre demande "${existing.resourceLabel}" est maintenant : ${status}.`,
  });

  return NextResponse.json({ id: updated.id, status: updated.status });
}
