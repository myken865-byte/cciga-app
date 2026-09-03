import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

const decidableStatuses = ["approuve", "rejete"];

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { leaveId, status } = (await request.json()) ?? {};
  if (!leaveId || typeof leaveId !== "string" || !decidableStatuses.includes(status)) {
    return NextResponse.json({ error: "Demande de congé et décision (approuve/rejete) sont requises." }, { status: 400 });
  }

  const leaveRequest = await prisma.employeeLeaveRequest.findUnique({ where: { id: leaveId } });
  if (!leaveRequest) {
    return NextResponse.json({ error: "Demande de congé introuvable." }, { status: 404 });
  }
  if (leaveRequest.status !== "soumis") {
    return NextResponse.json({ error: "Cette demande a déjà été traitée." }, { status: 400 });
  }

  const updated = await prisma.employeeLeaveRequest.update({
    where: { id: leaveId },
    data: { status, reviewedById: session.userId },
  });

  await writeAuditLog({
    entityType: "EmployeeLeaveRequest",
    entityId: leaveId,
    action: status === "approuve" ? "approve" : "reject",
    actorId: resolveActorId(session.userId),
    before: leaveRequest,
    after: updated,
  });

  return NextResponse.json({ ok: true });
}
