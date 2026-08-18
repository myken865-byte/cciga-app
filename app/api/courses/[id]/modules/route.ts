import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";

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

  let requestBody: Record<string, unknown>;
  try {
    requestBody = ((await request.json()) as Record<string, unknown>) ?? {};
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }
  const { title, order } = requestBody;
  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Titre requis." }, { status: 400 });
  }

  const parsedOrder = Number(order);

  const lessonModule = await prisma.lessonModule.create({
    data: {
      courseId: id,
      title: title.trim(),
      order: Number.isFinite(parsedOrder) && parsedOrder > 0 ? parsedOrder : 1,
    },
  });

  return NextResponse.json({ id: lessonModule.id }, { status: 201 });
}
