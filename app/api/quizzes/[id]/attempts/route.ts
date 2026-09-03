import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
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

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.programId || user.programId !== quiz.course.programId) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const attemptsUsed = await prisma.quizAttempt.count({ where: { quizId: id, studentId: user.id } });
  if (attemptsUsed >= quiz.maxAttempts) {
    return NextResponse.json({ error: "Nombre maximal de tentatives atteint." }, { status: 400 });
  }

  const { answers } = (await request.json()) ?? {};
  const answerMap: Record<string, string> = answers && typeof answers === "object" ? answers : {};

  let score = 0;
  for (const q of quiz.questions) {
    const type = q.type as QuizQuestionType;
    if (!isAutoGradable(type)) continue;
    const given = answerMap[q.id];
    if (given !== undefined && q.correctAnswer !== null && given === q.correctAnswer) {
      score += q.points;
    }
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId: id,
      studentId: user.id,
      submittedAt: new Date(),
      score,
      answers: JSON.stringify(answerMap),
    },
  });

  return NextResponse.json({ id: attempt.id, score: attempt.score }, { status: 201 });
}
