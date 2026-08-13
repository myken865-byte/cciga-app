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
  const { title, body } = (await request.json()) ?? {};

  if (!title || !body) {
    return NextResponse.json({ error: "Titre et contenu requis." }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const material = await prisma.courseMaterial.create({
    data: { courseId: id, title, body },
  });

  await notifyProgramStudents(course.programId, {
    type: "material_new",
    title: "Nouveau contenu de cours",
    body: `${course.name} : ${title}`,
  });

  return NextResponse.json({ id: material.id }, { status: 201 });
}
