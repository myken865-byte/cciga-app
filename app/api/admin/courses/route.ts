import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
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

  let resolvedTeacherId: number | undefined;
  if (teacherId) {
    const teacher = await prisma.user.findUnique({ where: { id: Number(teacherId) } });
    if (!teacher) {
      return NextResponse.json({ error: "Enseignant invalide." }, { status: 400 });
    }
    resolvedTeacherId = teacher.id;
  }

  const course = await prisma.course.create({
    data: {
      programId,
      name,
      code: code || undefined,
      description,
      teacherId: resolvedTeacherId,
      dayOfWeek: dayOfWeek === undefined || dayOfWeek === null ? undefined : Number(dayOfWeek),
      startTime: startTime || undefined,
      endTime: endTime || undefined,
    },
  });

  return NextResponse.json({ id: course.id }, { status: 201 });
}
