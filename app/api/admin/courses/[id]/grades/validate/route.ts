import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const submitted = await prisma.grade.findMany({ where: { courseId: id, status: "soumis" } });
  if (submitted.length === 0) {
    return NextResponse.json({ error: "Aucune note soumise à valider pour ce cours." }, { status: 400 });
  }

  await prisma.grade.updateMany({
    where: { courseId: id, status: "soumis" },
    data: { status: "valide", validatedById: session.userId },
  });

  await writeAuditLog({
    entityType: "Grade",
    entityId: id,
    action: "validate",
    actorId: session.userId,
    reason: `${submitted.length} note(s) validée(s) pour ${course.name}.`,
  });

  return NextResponse.json({ ok: true, count: submitted.length });
}
