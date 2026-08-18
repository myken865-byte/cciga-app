import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !hasRole(session.roles, "STUDENT")) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { module: { include: { course: true } } },
  });
  if (!lesson) {
    return NextResponse.json({ error: "Leçon introuvable." }, { status: 404 });
  }

  const student = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!student || student.programId !== lesson.module.course.programId) {
    return NextResponse.json({ error: "Non autorisé pour cette leçon." }, { status: 403 });
  }

  await prisma.lessonProgress.upsert({
    where: { lessonId_studentId: { lessonId: id, studentId: session.userId } },
    update: {},
    create: { lessonId: id, studentId: session.userId },
  });

  return NextResponse.json({ ok: true });
}
