import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { notifyProgramStudents } from "@/lib/notifications";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const { title, description, dueDate } = (await request.json()) ?? {};

  if (!title || !description) {
    return NextResponse.json({ error: "Titre et description requis." }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
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
