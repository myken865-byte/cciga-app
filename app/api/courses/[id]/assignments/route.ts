import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
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

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const { title, description, dueDate } = (await request.json()) ?? {};
  if (!title || !description) {
    return NextResponse.json({ error: "Titre et description requis." }, { status: 400 });
  }

  const assignment = await prisma.assignment.create({
    data: {
      courseId: id,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    },
  });

  await notifyProgramStudents(course.programId, {
    type: "assignment_new",
    title: "Nouveau devoir",
    body: `${course.name} : ${title}`,
  });

  return NextResponse.json({ id: assignment.id }, { status: 201 });
}
