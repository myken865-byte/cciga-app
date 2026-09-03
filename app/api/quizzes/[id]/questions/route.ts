import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { isQuizQuestionType } from "@/lib/lms";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({ where: { id }, include: { course: true } });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz introuvable." }, { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = quiz.course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const { type, prompt, options, correctAnswer, points, order } = (await request.json()) ?? {};
  if (!prompt || !isQuizQuestionType(type)) {
    return NextResponse.json({ error: "Question et type valides requis." }, { status: 400 });
  }
  if (type === "qcm" && (!Array.isArray(options) || options.length === 0)) {
    return NextResponse.json({ error: "Au moins une option requise pour un QCM." }, { status: 400 });
  }
  if ((type === "qcm" || type === "vrai_faux") && !correctAnswer) {
    return NextResponse.json({ error: "Réponse correcte requise." }, { status: 400 });
  }

  const question = await prisma.quizQuestion.create({
    data: {
      quizId: id,
      type,
      prompt,
      options: type === "qcm" ? JSON.stringify(options) : undefined,
      correctAnswer: type === "reponse_courte" ? undefined : String(correctAnswer),
      points: Number.isFinite(Number(points)) && Number(points) > 0 ? Number(points) : 1,
      order: Number.isFinite(Number(order)) ? Number(order) : 1,
    },
  });

  return NextResponse.json({ id: question.id }, { status: 201 });
}
