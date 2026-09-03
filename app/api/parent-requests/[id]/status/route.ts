import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { parentRequestServiceRoles, isParentRequestStatus, type ParentRequestService } from "@/lib/parentRequests";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

// Changement de statut — réservé au personnel du service concerné (jamais au
// parent, contrairement à canAccessParentRequest qui autorise aussi le
// parent propriétaire en lecture/réponse). Voir
// components/ParentRequestThread.tsx `changeStatus`.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.parentRequest.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  const staffRoles = parentRequestServiceRoles[existing.service as ParentRequestService] ?? ["ADMIN", "SUPER_ADMIN"];
  if (!hasAnyRole(session.roles, staffRoles)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const { status } = (await request.json().catch(() => null)) ?? {};
  if (typeof status !== "string" || !isParentRequestStatus(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const updated = await prisma.parentRequest.update({ where: { id }, data: { status } });

  await writeAuditLog({
    entityType: "ParentRequest",
    entityId: updated.id,
    action: "status_change",
    actorId: resolveActorId(session.userId),
    before: { status: existing.status },
    after: { status: updated.status },
  });

  return NextResponse.json({ status: updated.status });
}
