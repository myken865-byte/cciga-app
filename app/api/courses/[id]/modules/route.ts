import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";

export async function POST(
  request: Request,
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

  const { title, order } = (await request.json()) ?? {};
  if (!title) {
    return NextResponse.json({ error: "Titre du module requis." }, { status: 400 });
  }

  const module_ = await prisma.lessonModule.create({
    data: { courseId: id, title, order: Number.isFinite(Number(order)) ? Number(order) : 1 },
  });

  return NextResponse.json({ id: module_.id }, { status: 201 });
}
