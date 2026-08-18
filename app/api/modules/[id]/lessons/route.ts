import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { isLessonContentType } from "@/lib/lms";
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
  const lessonModule = await prisma.lessonModule.findUnique({ where: { id }, include: { course: true } });
  if (!lessonModule) {
    return NextResponse.json({ error: "Module introuvable." }, { status: 404 });
  }

  const isAdmin = hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN"]);
  const isCourseTeacher = lessonModule.course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  let requestBody: Record<string, unknown>;
  try {
    requestBody = ((await request.json()) as Record<string, unknown>) ?? {};
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }
  const { title, order, contentType, body, fileUrl, videoUrl } = requestBody;
  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Titre requis." }, { status: 400 });
  }
  if (!isLessonContentType(contentType)) {
    return NextResponse.json({ error: "Type de contenu invalide." }, { status: 400 });
  }
  if (contentType === "texte" && (!body || typeof body !== "string" || !body.trim())) {
    return NextResponse.json({ error: "Le contenu texte est requis pour ce type de leçon." }, { status: 400 });
  }
  if (contentType === "fichier" && (!fileUrl || typeof fileUrl !== "string" || !fileUrl.trim())) {
    return NextResponse.json({ error: "Un lien de fichier est requis pour ce type de leçon." }, { status: 400 });
  }
  if (contentType === "video" && (!videoUrl || typeof videoUrl !== "string" || !videoUrl.trim())) {
    return NextResponse.json({ error: "Un lien vidéo est requis pour ce type de leçon." }, { status: 400 });
  }

  const parsedOrder = Number(order);

  const lesson = await prisma.lesson.create({
    data: {
      moduleId: id,
      title: title.trim(),
      order: Number.isFinite(parsedOrder) && parsedOrder > 0 ? parsedOrder : 1,
      contentType,
      body: typeof body === "string" && body.trim() ? body.trim() : null,
      fileUrl: typeof fileUrl === "string" && fileUrl.trim() ? fileUrl.trim() : null,
      videoUrl: typeof videoUrl === "string" && videoUrl.trim() ? videoUrl.trim() : null,
    },
  });

  await notifyProgramStudents(lessonModule.course.programId, {
    type: "lesson_new",
    title: "Nouvelle leçon disponible",
    body: `${lessonModule.course.name} : ${lesson.title}`,
  });

  return NextResponse.json({ id: lesson.id }, { status: 201 });
}
