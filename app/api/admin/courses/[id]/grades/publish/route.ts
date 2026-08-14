import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { createNotification } from "@/lib/notifications";

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

  const validated = await prisma.grade.findMany({ where: { courseId: id, status: "valide" } });
  if (validated.length === 0) {
    return NextResponse.json({ error: "Aucune note validée à publier pour ce cours." }, { status: 400 });
  }

  await prisma.grade.updateMany({
    where: { courseId: id, status: "valide" },
    data: { status: "publie", publishedAt: new Date() },
  });

  const uniqueStudentIds = [...new Set(validated.map((g) => g.studentId))];
  for (const studentId of uniqueStudentIds) {
    await createNotification(studentId, {
      type: "grade",
      title: "Notes publiées",
      body: `Vos notes pour ${course.name} sont maintenant disponibles.`,
    });
  }

  await writeAuditLog({
    entityType: "Grade",
    entityId: id,
    action: "publish",
    actorId: session.userId,
    reason: `${validated.length} note(s) publiée(s) pour ${course.name}.`,
  });

  return NextResponse.json({ ok: true, count: validated.length });
}
