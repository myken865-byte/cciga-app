import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { slotsOverlap } from "@/lib/schedule";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const {
    programId,
    name,
    code,
    description,
    teacherId,
    dayOfWeek,
    startTime,
    endTime,
    semesterId,
    credits,
    coefficient,
    groupLabel,
  } = (await request.json()) ?? {};

  if (!programId || !name || !description) {
    return NextResponse.json({ error: "Programme, nom et description sont requis." }, { status: 400 });
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program) {
    return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
  }

  let resolvedSemesterId: string | undefined;
  if (semesterId) {
    const semester = await prisma.semester.findUnique({ where: { id: semesterId } });
    if (!semester) {
      return NextResponse.json({ error: "Semestre invalide." }, { status: 400 });
    }
    resolvedSemesterId = semester.id;
  }

  const slot = {
    dayOfWeek: dayOfWeek === undefined || dayOfWeek === null || dayOfWeek === "" ? null : Number(dayOfWeek),
    startTime: startTime || null,
    endTime: endTime || null,
  };

  let resolvedTeacherId: number | undefined;

  if (program.teacherModel === "titulaire") {
    if (!program.titulaireId) {
      return NextResponse.json(
        { error: "Assignez d'abord un titulaire à cette classe avant d'y créer un cours." },
        { status: 400 },
      );
    }
    resolvedTeacherId = program.titulaireId;
  } else if (teacherId) {
    const teacher = await prisma.user.findUnique({ where: { id: Number(teacherId) } });
    if (!teacher) {
      return NextResponse.json({ error: "Enseignant invalide." }, { status: 400 });
    }
    resolvedTeacherId = teacher.id;

    if (slot.dayOfWeek !== null && slot.startTime && slot.endTime) {
      const otherCourses = await prisma.course.findMany({
        where: { teacherId: resolvedTeacherId, dayOfWeek: slot.dayOfWeek },
      });
      const conflict = otherCourses.find((c) => slotsOverlap(slot, c));
      if (conflict) {
        return NextResponse.json(
          { error: `Cet enseignant a déjà un cours à cet horaire (${conflict.name}).` },
          { status: 400 },
        );
      }
    }
  }

  const course = await prisma.course.create({
    data: {
      programId,
      name,
      code: code || undefined,
      description,
      teacherId: resolvedTeacherId,
      dayOfWeek: slot.dayOfWeek ?? undefined,
      startTime: slot.startTime ?? undefined,
      endTime: slot.endTime ?? undefined,
      semesterId: resolvedSemesterId,
      credits: credits !== undefined && credits !== "" ? Number(credits) : undefined,
      coefficient: coefficient !== undefined && coefficient !== "" ? Number(coefficient) : undefined,
      groupLabel: groupLabel || undefined,
    },
  });

  return NextResponse.json({ id: course.id }, { status: 201 });
}
