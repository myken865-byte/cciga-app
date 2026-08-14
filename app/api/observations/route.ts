import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { studentId, body } = (await request.json()) ?? {};
  if (!studentId || !body || typeof body !== "string" || !body.trim()) {
    return NextResponse.json({ error: "Élève et observation requis." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: Number(studentId) }, include: { program: true } });
  if (!student || !student.programId || !student.program) {
    return NextResponse.json({ error: "Élève invalide ou sans classe." }, { status: 400 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isTitulaire = student.program.titulaireId === session.userId;
  if (!isAdmin && !isTitulaire) {
    return NextResponse.json(
      { error: "Seul le titulaire de la classe (ou l'administration) peut ajouter une observation." },
      { status: 403 },
    );
  }

  const observation = await prisma.observation.create({
    data: {
      studentId: student.id,
      authorId: session.userId,
      programId: student.programId,
      body: body.trim(),
    },
  });

  return NextResponse.json({ id: observation.id }, { status: 201 });
}
