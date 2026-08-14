import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { createNotification } from "@/lib/notifications";
import { usesAuthorizationWorkflow } from "@/lib/universite";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id }, include: { program: true } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const { studentId, assignmentId, evaluationCategoryId, score, comment } = (await request.json()) ?? {};

  const parsedScore = Number(score);
  if (!studentId || !Number.isFinite(parsedScore) || parsedScore < 0 || parsedScore > 100) {
    return NextResponse.json({ error: "Étudiant et note (entre 0 et 100) requis." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: Number(studentId) } });
  if (!student || student.programId !== course.programId) {
    return NextResponse.json({ error: "Étudiant invalide pour ce cours." }, { status: 400 });
  }

  const usesWorkflow = usesAuthorizationWorkflow(course.program.school);

  let resolvedCategoryId: string | undefined;
  if (usesWorkflow) {
    if (!evaluationCategoryId) {
      return NextResponse.json(
        { error: "Une catégorie d'évaluation est requise pour ce cours." },
        { status: 400 },
      );
    }
    const category = await prisma.evaluationCategory.findUnique({ where: { id: evaluationCategoryId } });
    if (!category || category.courseId !== id) {
      return NextResponse.json({ error: "Catégorie d'évaluation invalide pour ce cours." }, { status: 400 });
    }
    resolvedCategoryId = category.id;

    const existingForCategory = await prisma.grade.findFirst({
      where: { studentId: student.id, evaluationCategoryId: resolvedCategoryId },
    });
    if (existingForCategory) {
      return NextResponse.json(
        { error: "Une note existe déjà pour cet étudiant dans cette catégorie d'évaluation." },
        { status: 400 },
      );
    }
  }

  const grade = await prisma.grade.create({
    data: {
      studentId: student.id,
      courseId: id,
      assignmentId: usesWorkflow ? undefined : assignmentId || undefined,
      evaluationCategoryId: resolvedCategoryId,
      score: parsedScore,
      comment: comment || undefined,
      status: usesWorkflow ? "brouillon" : undefined,
      enteredById: session.userId,
    },
  });

  if (!usesWorkflow) {
    await createNotification(student.id, {
      type: "grade",
      title: "Nouvelle note publiée",
      body: `${course.name} : ${grade.score}/100`,
    });
  }

  return NextResponse.json({ id: grade.id }, { status: 201 });
}
