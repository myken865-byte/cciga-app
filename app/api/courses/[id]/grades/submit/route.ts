import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const draftGrades = await prisma.grade.findMany({ where: { courseId: id, status: "brouillon" } });
  if (draftGrades.length === 0) {
    return NextResponse.json({ error: "Aucune note en brouillon à soumettre pour ce cours." }, { status: 400 });
  }

  await prisma.grade.updateMany({ where: { courseId: id, status: "brouillon" }, data: { status: "soumis" } });

  await writeAuditLog({
    entityType: "Grade",
    entityId: id,
    action: "submit",
    actorId: session.userId,
    reason: `${draftGrades.length} note(s) soumise(s) pour ${course.name}.`,
  });

  return NextResponse.json({ ok: true, count: draftGrades.length });
}
