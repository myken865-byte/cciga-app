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

  const { title, description, isGraded, maxAttempts } = (await request.json()) ?? {};
  if (!title) {
    return NextResponse.json({ error: "Titre du quiz requis." }, { status: 400 });
  }

  const quiz = await prisma.quiz.create({
    data: {
      courseId: id,
      title,
      description: description || undefined,
      isGraded: Boolean(isGraded),
      maxAttempts: Number.isFinite(Number(maxAttempts)) && Number(maxAttempts) > 0 ? Number(maxAttempts) : 1,
    },
  });

  return NextResponse.json({ id: quiz.id }, { status: 201 });
}
