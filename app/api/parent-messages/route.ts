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
    return NextResponse.json({ error: "Élève et message requis." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: Number(studentId) }, include: { program: true } });
  if (!student) {
    return NextResponse.json({ error: "Élève introuvable." }, { status: 400 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isTitulaire = student.program?.titulaireId === session.userId;
  const isParent = student.parentId === session.userId;
  if (!isAdmin && !isTitulaire && !isParent) {
    return NextResponse.json(
      { error: "Seul le titulaire de la classe, le parent lié ou l'administration peut envoyer un message." },
      { status: 403 },
    );
  }

  const message = await prisma.parentMessage.create({
    data: {
      studentId: student.id,
      senderId: session.userId,
      body: body.trim(),
    },
  });

  return NextResponse.json({ id: message.id }, { status: 201 });
}
