import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const { programId, name, code, description, teacherId, dayOfWeek, startTime, endTime } =
    (await request.json()) ?? {};

  if (!programId || !name || !description) {
    return NextResponse.json({ error: "Programme, nom et description sont requis." }, { status: 400 });
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program) {
    return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
  }

  let resolvedTeacherId: number | null = null;
  if (teacherId) {
    const teacher = await prisma.user.findUnique({ where: { id: Number(teacherId) } });
    if (!teacher) {
      return NextResponse.json({ error: "Enseignant invalide." }, { status: 400 });
    }
    resolvedTeacherId = teacher.id;
  }

  await prisma.course.update({
    where: { id },
    data: {
      programId,
      name,
      code: code || null,
      description,
      teacherId: resolvedTeacherId,
      dayOfWeek: dayOfWeek === undefined || dayOfWeek === null || dayOfWeek === "" ? null : Number(dayOfWeek),
      startTime: startTime || null,
      endTime: endTime || null,
    },
  });

  return NextResponse.json({ ok: true });
}
