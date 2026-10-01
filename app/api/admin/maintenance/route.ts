import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchool } from "@/lib/institutionContext";
import { isMaintenanceResourceType } from "@/lib/maintenance";
import { validateMaintenanceResource } from "@/lib/maintenanceAccess";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { notifyRoles } from "@/lib/notifications";

// Même garde que /portail/logistique (proxy.ts) — SUPER_ADMIN/LOGISTICIEN
// uniquement, pas d'élargissement de rôle hors de cette mission.
const STAFF_ROLES = ["SUPER_ADMIN", "LOGISTICIEN"] as const;

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, [...STAFF_ROLES])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const activeSchool = await getActiveSchool();
  if (!activeSchool) {
    return NextResponse.json({ error: "Choisissez une institution avant de créer une demande." }, { status: 400 });
  }

  const { resourceType, resourceId, description } = (await request.json().catch(() => null)) ?? {};

  if (
    typeof resourceType !== "string" ||
    !isMaintenanceResourceType(resourceType) ||
    typeof resourceId !== "string" ||
    !resourceId.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    description.trim().length > 2000
  ) {
    return NextResponse.json({ error: "Champs requis manquants ou invalides." }, { status: 400 });
  }

  // La ressource référencée doit réellement exister et appartenir à
  // l'institution active — jamais fait confiance au resourceId du client.
  const validResource = await validateMaintenanceResource(resourceType, resourceId.trim(), activeSchool);
  if (!validResource) {
    return NextResponse.json({ error: "Ressource introuvable pour cette institution." }, { status: 400 });
  }

  const created = await prisma.maintenanceRequest.create({
    data: {
      resourceType,
      resourceId: resourceId.trim(),
      description: description.trim(),
      reportedById: session.userId,
      school: activeSchool,
    },
  });

  await writeAuditLog({
    entityType: "MaintenanceRequest",
    entityId: created.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: { id: created.id, resourceType, resourceId: resourceId.trim() },
  });

  await notifyRoles([...STAFF_ROLES], {
    type: "maintenance_request_created",
    title: "Nouvelle demande de maintenance",
    body: description.trim(),
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
