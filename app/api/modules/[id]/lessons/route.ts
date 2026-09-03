import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { isLessonContentType } from "@/lib/lms";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const lessonModule = await prisma.lessonModule.findUnique({ where: { id }, include: { course: true } });
  if (!lessonModule) {
    return NextResponse.json({ error: "Module introuvable." }, { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = lessonModule.course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const { title, order, contentType, body, fileUrl, videoUrl } = (await request.json()) ?? {};
  if (!title || !isLessonContentType(contentType)) {
    return NextResponse.json({ error: "Titre et type de contenu valides requis." }, { status: 400 });
  }
  if (contentType === "texte" && !body) {
    return NextResponse.json({ error: "Contenu texte requis." }, { status: 400 });
  }
  if (contentType === "fichier" && !fileUrl) {
    return NextResponse.json({ error: "Lien du fichier requis." }, { status: 400 });
  }
  if (contentType === "video" && !videoUrl) {
    return NextResponse.json({ error: "Lien vidéo requis." }, { status: 400 });
  }

  const lesson = await prisma.lesson.create({
    data: {
      moduleId: id,
      title,
      order: Number.isFinite(Number(order)) ? Number(order) : 1,
      contentType,
      body: contentType === "texte" ? body : undefined,
      fileUrl: contentType === "fichier" ? fileUrl : undefined,
      videoUrl: contentType === "video" ? videoUrl : undefined,
    },
  });

  return NextResponse.json({ id: lesson.id }, { status: 201 });
}
