import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { notifyProgramStudents } from "@/lib/notifications";

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

  const isAdmin = hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN"]);
  const isCourseTeacher = course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  let requestBody: Record<string, unknown>;
  try {
    requestBody = ((await request.json()) as Record<string, unknown>) ?? {};
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }
  const { title, description, isGraded, maxAttempts, lessonId } = requestBody;
  if (
    typeof title !== "string" || !title ||
    (description !== undefined && typeof description !== "string") ||
    (lessonId !== undefined && typeof lessonId !== "string")
  ) {
    return NextResponse.json({ error: "Titre requis." }, { status: 400 });
  }

  if (lessonId) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });
    if (!lesson || lesson.module.courseId !== id) {
      return NextResponse.json({ error: "Leçon invalide pour ce cours." }, { status: 400 });
    }
  }

  const parsedMaxAttempts = Number(maxAttempts);

  const quiz = await prisma.quiz.create({
    data: {
      courseId: id,
      lessonId: lessonId || undefined,
      title,
      description: description || undefined,
      isGraded: Boolean(isGraded),
      maxAttempts: Number.isFinite(parsedMaxAttempts) && parsedMaxAttempts > 0 ? parsedMaxAttempts : 1,
    },
  });

  await notifyProgramStudents(course.programId, {
    type: "quiz_new",
    title: "Nouveau quiz disponible",
    body: `${course.name} : ${title}`,
  });

  return NextResponse.json({ id: quiz.id }, { status: 201 });
}
