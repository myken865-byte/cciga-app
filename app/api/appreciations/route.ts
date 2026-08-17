import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole, hasAnyRole } from "@/lib/roles";
import { writeAuditLog } from "@/lib/auditLog";

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

  // Three clear tiers: ADMIN/SUPER_ADMIN/SECRETARIAT can enter or override
  // any student's appreciation; a TEACHER can only do so for their own
  // titulaire class. hasRole is an exact-membership check, so this must be
  // hasAnyRole — a SUPER_ADMIN-only account (no separate "ADMIN" role) was
  // previously and incorrectly rejected here.
  const isAdminLevel = hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"]);
  const isTitulaire = hasRole(session.roles, "TEACHER") && student.program.titulaireId === session.userId;
  if (!isAdminLevel && !isTitulaire) {
    return NextResponse.json({ error: "Non autorisé pour cet élève." }, { status: 403 });
  }

  const semester = await prisma.semester.findUnique({ where: { id: semesterId } });
  if (!semester) {
    return NextResponse.json({ error: "Période invalide." }, { status: 400 });
  }

  const before = await prisma.studentAppreciation.findUnique({
    where: { studentId_semesterId: { studentId: student.id, semesterId } },
  });

  const after = await prisma.studentAppreciation.upsert({
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

  await writeAuditLog({
    entityType: "StudentAppreciation",
    entityId: after.id,
    action: before ? "update" : "create",
    actorId: session.userId,
    before: before ?? undefined,
    after,
  });

  return NextResponse.json({ ok: true });
}
