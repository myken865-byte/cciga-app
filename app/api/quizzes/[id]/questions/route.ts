import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
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

  const isAdmin = hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN"]);
  const isCourseTeacher = quiz.course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  let requestBody: Record<string, unknown>;
  try {
    requestBody = ((await request.json()) as Record<string, unknown>) ?? {};
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }
  const { type, prompt, options, correctAnswer, points, order } = requestBody;
  if (typeof prompt !== "string" || !prompt || !isQuizQuestionType(type)) {
    return NextResponse.json({ error: "Question et type valide requis." }, { status: 400 });
  }
  if (type === "qcm" && (!Array.isArray(options) || options.length < 2)) {
    return NextResponse.json({ error: "Au moins 2 options requises pour un choix multiple." }, { status: 400 });
  }
  if ((type === "qcm" || type === "vrai_faux") && !correctAnswer) {
    return NextResponse.json({ error: "Réponse correcte requise pour ce type de question." }, { status: 400 });
  }

  const parsedPoints = Number(points);
  const parsedOrder = Number(order);

  const question = await prisma.quizQuestion.create({
    data: {
      quizId: id,
      type,
      prompt,
      options: type === "qcm" ? JSON.stringify(options) : undefined,
      correctAnswer: type === "reponse_courte" ? undefined : JSON.stringify(correctAnswer),
      points: Number.isFinite(parsedPoints) && parsedPoints > 0 ? parsedPoints : 1,
      order: Number.isFinite(parsedOrder) && parsedOrder > 0 ? parsedOrder : 1,
    },
  });

  return NextResponse.json({ id: question.id }, { status: 201 });
}
