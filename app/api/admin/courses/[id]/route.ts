import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { slotsOverlap } from "@/lib/schedule";

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
    retakeOfCourseId,
  } = (await request.json()) ?? {};

  if (!programId || !name || !description) {
    return NextResponse.json({ error: "Programme, nom et description sont requis." }, { status: 400 });
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program) {
    return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
  }

  let resolvedSemesterId: string | null = null;
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

  let resolvedRetakeOfCourseId: string | null = null;
  if (retakeOfCourseId) {
    const retakeOf = await prisma.course.findUnique({ where: { id: retakeOfCourseId } });
    if (!retakeOf || retakeOf.programId !== programId || retakeOf.id === id) {
      return NextResponse.json({ error: "Cours d'origine invalide pour la reprise." }, { status: 400 });
    }
    resolvedRetakeOfCourseId = retakeOf.id;
  }

  let resolvedTeacherId: number | null = null;

  if (program.teacherModel === "titulaire") {
    if (!program.titulaireId) {
      return NextResponse.json(
        { error: "Assignez d'abord un titulaire à cette classe avant d'y modifier un cours." },
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
        where: { teacherId: resolvedTeacherId, dayOfWeek: slot.dayOfWeek, id: { not: id } },
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

  await prisma.course.update({
    where: { id },
    data: {
      programId,
      name,
      code: code || null,
      description,
      teacherId: resolvedTeacherId,
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime,
      endTime: slot.endTime,
      semesterId: resolvedSemesterId,
      credits: credits !== undefined && credits !== "" ? Number(credits) : null,
      coefficient: coefficient !== undefined && coefficient !== "" ? Number(coefficient) : null,
      groupLabel: groupLabel || null,
      retakeOfCourseId: resolvedRetakeOfCourseId,
    },
  });

  return NextResponse.json({ ok: true });
}
