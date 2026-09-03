import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { studentId, category, observations, contactedGuardian } = (await request.json()) ?? {};
  const studentIdNum = Number(studentId);
  if (!Number.isInteger(studentIdNum) || typeof category !== "string" || !category.trim()) {
    return NextResponse.json({ error: "Élève et catégorie sont requis." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: studentIdNum } });
  if (!student) {
    return NextResponse.json({ error: "Élève introuvable." }, { status: 400 });
  }

  const visit = await prisma.infirmaryVisit.create({
    data: {
      studentId: studentIdNum,
      category: category.trim(),
      observations: typeof observations === "string" && observations.trim() ? observations.trim() : null,
      contactedGuardian: Boolean(contactedGuardian),
      recordedById: session.userId,
    },
  });

  await writeAuditLog({
    entityType: "InfirmaryVisit",
    entityId: visit.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: { id: visit.id, studentId: visit.studentId, category: visit.category, contactedGuardian: visit.contactedGuardian },
  });

  return NextResponse.json({ id: visit.id }, { status: 201 });
}
