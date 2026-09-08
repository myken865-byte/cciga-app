import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

const decidableStatuses = ["approuve", "rejete"];

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant de traiter une demande de congé." }, { status: 400 });
  }

  const { leaveId, status } = (await request.json()) ?? {};
  if (!leaveId || typeof leaveId !== "string" || !decidableStatuses.includes(status)) {
    return NextResponse.json({ error: "Demande de congé et décision (approuve/rejete) sont requises." }, { status: 400 });
  }

  const leaveRequest = await prisma.employeeLeaveRequest.findUnique({
    where: { id: leaveId },
    include: { employee: true },
  });
  if (!leaveRequest) {
    return NextResponse.json({ error: "Demande de congé introuvable." }, { status: 404 });
  }
  if (leaveRequest.employee.school !== school) {
    return NextResponse.json({ error: "Cette demande appartient à une autre institution." }, { status: 403 });
  }
  if (leaveRequest.status !== "soumis") {
    return NextResponse.json({ error: "Cette demande a déjà été traitée." }, { status: 400 });
  }

  const updated = await prisma.employeeLeaveRequest.update({
    where: { id: leaveId },
    data: { status, reviewedById: resolveActorId(session.userId) },
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
