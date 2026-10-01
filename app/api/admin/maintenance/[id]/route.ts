import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isMaintenanceStatus, isValidMaintenanceTransition, type MaintenanceStatus } from "@/lib/maintenance";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { createNotification } from "@/lib/notifications";

const STAFF_ROLES = ["SUPER_ADMIN", "LOGISTICIEN"] as const;

// Transition de statut — suit strictement le workflow linéaire de
// lib/maintenance.ts (signalee → assignee → en_cours → terminee → cloturee),
// jamais de saut d'étape ni de retour en arrière.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, [...STAFF_ROLES])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.maintenanceRequest.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }
  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool || (activeSchool !== "toutes" && existing.school !== activeSchool)) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  const { status, assignedToId } = (await request.json().catch(() => null)) ?? {};
  const data: Record<string, unknown> = {};

  if (status !== undefined) {
    if (typeof status !== "string" || !isMaintenanceStatus(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    if (!isValidMaintenanceTransition(existing.status as MaintenanceStatus, status)) {
      return NextResponse.json(
        { error: `Transition "${existing.status} → ${status}" non autorisée.` },
        { status: 400 },
      );
    }
    data.status = status;
  }
  if (assignedToId !== undefined) {
    if (assignedToId === null) {
      data.assignedToId = null;
    } else {
      const n = Number(assignedToId);
      if (!Number.isInteger(n)) {
        return NextResponse.json({ error: "Assignation invalide." }, { status: 400 });
      }
      data.assignedToId = n;
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Aucune modification fournie." }, { status: 400 });
  }

  const updated = await prisma.maintenanceRequest.update({ where: { id }, data });

  await writeAuditLog({
    entityType: "MaintenanceRequest",
    entityId: updated.id,
    action: "update",
    actorId: resolveActorId(session.userId),
    before: existing,
    after: updated,
  });

  if (typeof data.status === "string" && data.status !== existing.status) {
    await createNotification(existing.reportedById, {
      type: "maintenance_request_status",
      title: "Mise à jour de votre signalement",
      body: `Votre demande de maintenance est maintenant : ${data.status}.`,
    });
  }

  return NextResponse.json({ id: updated.id, status: updated.status });
}
