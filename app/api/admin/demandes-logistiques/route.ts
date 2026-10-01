import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchool } from "@/lib/institutionContext";
import { isLogisticsUrgency } from "@/lib/logisticsRequests";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { notifyRoles } from "@/lib/notifications";

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

  const { resourceLabel, quantity, urgency } = (await request.json().catch(() => null)) ?? {};

  if (typeof resourceLabel !== "string" || !resourceLabel.trim() || resourceLabel.trim().length > 200) {
    return NextResponse.json({ error: "Description de la ressource requise." }, { status: 400 });
  }
  const urgencyValue = typeof urgency === "string" && isLogisticsUrgency(urgency) ? urgency : "normale";
  let quantityNum: number | undefined;
  if (quantity !== undefined && quantity !== null && quantity !== "") {
    const n = Number(quantity);
    if (!Number.isInteger(n) || n < 1) {
      return NextResponse.json({ error: "Quantité invalide." }, { status: 400 });
    }
    quantityNum = n;
  }

  const created = await prisma.logisticsRequest.create({
    data: {
      requestedById: session.userId,
      resourceLabel: resourceLabel.trim(),
      quantity: quantityNum,
      urgency: urgencyValue,
      school: activeSchool,
    },
  });

  await writeAuditLog({
    entityType: "LogisticsRequest",
    entityId: created.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: { id: created.id, resourceLabel: resourceLabel.trim() },
  });

  await notifyRoles([...STAFF_ROLES], {
    type: "logistics_request_created",
    title: "Nouvelle demande logistique",
    body: resourceLabel.trim(),
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
