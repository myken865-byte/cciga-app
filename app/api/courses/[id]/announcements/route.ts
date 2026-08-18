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

  const { title, body } = (await request.json()) ?? {};
  if (!title || !body) {
    return NextResponse.json({ error: "Titre et contenu requis." }, { status: 400 });
  }

  const announcement = await prisma.courseAnnouncement.create({
    data: {
      courseId: id,
      authorId: session.userId,
      title,
      body,
    },
  });

  await notifyProgramStudents(course.programId, {
    type: "announcement_new",
    title: "Nouvelle annonce de cours",
    body: `${course.name} : ${title}`,
  });

  return NextResponse.json({ id: announcement.id }, { status: 201 });
}
