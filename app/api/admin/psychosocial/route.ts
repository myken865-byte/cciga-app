import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requirePsychosocialSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

export async function POST(request: Request) {
  const session = await requirePsychosocialSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant d'ouvrir un dossier." }, { status: 400 });
  }

  const { studentId, note } = (await request.json()) ?? {};
  const studentIdNum = Number(studentId);
  if (!Number.isInteger(studentIdNum) || typeof note !== "string" || !note.trim()) {
    return NextResponse.json({ error: "Élève et observation initiale sont requis." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: studentIdNum }, include: { program: true } });
  if (!student) {
    return NextResponse.json({ error: "Élève introuvable." }, { status: 400 });
  }
  if (student.program && student.program.school !== school) {
    return NextResponse.json({ error: "Cet élève appartient à une autre institution." }, { status: 403 });
  }

  const psychosocialCase = await prisma.psychosocialCase.create({
    data: {
      studentId: studentIdNum,
      openedById: session.userId,
      notes: { create: { body: note.trim(), authorId: session.userId } },
      school,
    },
  });

  await writeAuditLog({
    entityType: "PsychosocialCase",
    entityId: psychosocialCase.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: { id: psychosocialCase.id, studentId: psychosocialCase.studentId, status: psychosocialCase.status },
  });

  return NextResponse.json({ id: psychosocialCase.id }, { status: 201 });
}
