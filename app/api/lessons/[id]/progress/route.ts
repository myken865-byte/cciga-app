import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";

export async function POST(
  request: Request,
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

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.programId || user.programId !== lesson.module.course.programId) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const progress = await prisma.lessonProgress.upsert({
    where: { lessonId_studentId: { lessonId: id, studentId: user.id } },
    update: {},
    create: { lessonId: id, studentId: user.id },
  });

  return NextResponse.json({ id: progress.id }, { status: 201 });
}
