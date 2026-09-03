import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { parseRoles, hasRole } from "@/lib/roles";

/**
 * Capture explicite et manuelle de l'effectif actuel (par programme actif)
 * pour l'année académique active — voir le commentaire du modèle
 * EnrollmentSnapshot dans prisma/schema.prisma : jamais de donnée
 * rétroactive inventée, une capture met à jour SA PROPRE ligne
 * (académie, programme), sans toucher aux années précédentes.
 */
export async function POST() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const [activeYear, programs, students] = await Promise.all([
    prisma.academicYear.findFirst({ where: { isActive: true } }),
    prisma.program.findMany({ where: { active: true } }),
    prisma.user.findMany({ where: { programId: { not: null } }, select: { programId: true, roles: true } }),
  ]);

  if (!activeYear) {
    return NextResponse.json(
      { error: "Aucune année académique active. Configurez-en une avant de capturer les effectifs." },
      { status: 400 },
    );
  }

  const studentCountByProgram = new Map<string, number>();
  for (const student of students) {
    if (!student.programId || !hasRole(parseRoles(student.roles), "STUDENT")) continue;
    studentCountByProgram.set(student.programId, (studentCountByProgram.get(student.programId) ?? 0) + 1);
  }

  let programsCaptured = 0;
  for (const program of programs) {
    const studentCount = studentCountByProgram.get(program.id) ?? 0;
    await prisma.enrollmentSnapshot.upsert({
      where: { academicYearId_programId: { academicYearId: activeYear.id, programId: program.id } },
      create: {
        academicYearId: activeYear.id,
        programId: program.id,
        studentCount,
        capturedById: session.userId,
      },
      update: {
        studentCount,
        capturedById: session.userId,
        capturedAt: new Date(),
      },
    });
    programsCaptured += 1;
  }

  await writeAuditLog({
    entityType: "EnrollmentSnapshot",
    entityId: activeYear.id,
    action: "capture",
    actorId: resolveActorId(session.userId),
    after: { academicYear: activeYear.label, programsCaptured },
  });

  return NextResponse.json({ academicYear: activeYear.label, programsCaptured });
}
