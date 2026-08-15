import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { studentId, semesterId, appreciation, conduct } = (await request.json()) ?? {};
  if (!studentId || !semesterId) {
    return NextResponse.json({ error: "Étudiant et période requis." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: Number(studentId) }, include: { program: true } });
  if (!student || !student.program) {
    return NextResponse.json({ error: "Étudiant invalide." }, { status: 400 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isTitulaire = student.program.titulaireId === session.userId;
  if (!isAdmin && !isTitulaire) {
    return NextResponse.json({ error: "Non autorisé pour cet élève." }, { status: 403 });
  }

  const semester = await prisma.semester.findUnique({ where: { id: semesterId } });
  if (!semester) {
    return NextResponse.json({ error: "Période invalide." }, { status: 400 });
  }

  await prisma.studentAppreciation.upsert({
    where: { studentId_semesterId: { studentId: student.id, semesterId } },
    update: {
      appreciation: typeof appreciation === "string" ? appreciation.trim() || null : null,
      conduct: typeof conduct === "string" ? conduct.trim() || null : null,
      enteredById: session.userId,
    },
    create: {
      studentId: student.id,
      programId: student.program.id,
      semesterId,
      appreciation: typeof appreciation === "string" ? appreciation.trim() || null : null,
      conduct: typeof conduct === "string" ? conduct.trim() || null : null,
      enteredById: session.userId,
    },
  });

  return NextResponse.json({ ok: true });
}
