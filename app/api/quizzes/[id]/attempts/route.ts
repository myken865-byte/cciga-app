import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { createNotification } from "@/lib/notifications";
import { isAutoGradable, type QuizQuestionType } from "@/lib/lms";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !hasRole(session.roles, "STUDENT")) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { course: true, questions: true },
  });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz introuvable." }, { status: 404 });
  }

  const student = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!student || student.programId !== quiz.course.programId) {
    return NextResponse.json({ error: "Non autorisé pour ce quiz." }, { status: 403 });
  }

  const attemptsUsed = await prisma.quizAttempt.count({ where: { quizId: id, studentId: student.id } });
  if (attemptsUsed >= quiz.maxAttempts) {
    return NextResponse.json({ error: "Nombre maximal de tentatives atteint." }, { status: 400 });
  }

  const { answers } = (await request.json()) ?? {};
  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ error: "Réponses requises." }, { status: 400 });
  }

  let score = 0;
  for (const question of quiz.questions) {
    const type = question.type as QuizQuestionType;
    if (!isAutoGradable(type)) continue;
    const given = answers[question.id];
    const correct = question.correctAnswer ? JSON.parse(question.correctAnswer) : null;
    if (given !== undefined && JSON.stringify(given) === JSON.stringify(correct)) {
      score += question.points;
    }
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId: id,
      studentId: student.id,
      submittedAt: new Date(),
      score,
      answers: JSON.stringify(answers),
    },
  });

  if (quiz.course.teacherId) {
    await createNotification(quiz.course.teacherId, {
      type: "quiz_attempt_new",
      title: "Nouvelle tentative de quiz",
      body: `${quiz.course.name} : ${quiz.title} (${student.name})`,
    });
  }

  return NextResponse.json({ id: attempt.id, score }, { status: 201 });
}
