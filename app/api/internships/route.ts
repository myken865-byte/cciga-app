import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isInternshipStaff } from "@/lib/internshipAccess";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { createNotification } from "@/lib/notifications";

// Création d'un stage par le personnel — jamais par l'étudiant lui-même
// (mandat §3 : "créer un stage" est une fonction ADMIN/COORDINATION).
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !isInternshipStaff(session)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const {
    studentId,
    programId,
    title,
    hostOrganization,
    hostAddress,
    hostSupervisorName,
    hostSupervisorContact,
    internalSupervisorId,
    startDate,
    endDate,
  } = (await request.json().catch(() => null)) ?? {};

  const studentIdNum = Number(studentId);
  const startDateObj = typeof startDate === "string" ? new Date(startDate) : null;
  const endDateObj = typeof endDate === "string" && endDate ? new Date(endDate) : null;

  if (
    !Number.isInteger(studentIdNum) ||
    typeof programId !== "string" ||
    !programId ||
    typeof title !== "string" ||
    !title.trim() ||
    typeof hostOrganization !== "string" ||
    !hostOrganization.trim() ||
    !startDateObj ||
    Number.isNaN(startDateObj.getTime()) ||
    (endDateObj && Number.isNaN(endDateObj.getTime()))
  ) {
    return NextResponse.json({ error: "Champs requis manquants ou invalides." }, { status: 400 });
  }

  // Jamais faire confiance à l'institution du client : l'élève et le
  // programme doivent appartenir à l'institution active de l'agent.
  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) {
    return NextResponse.json({ error: "Choisissez une institution avant de créer un stage." }, { status: 400 });
  }
  const [student, program] = await Promise.all([
    prisma.user.findUnique({ where: { id: studentIdNum }, include: { program: true } }),
    prisma.program.findUnique({ where: { id: programId } }),
  ]);
  if (!student || !program || student.programId !== program.id) {
    return NextResponse.json({ error: "Élève ou programme introuvable." }, { status: 400 });
  }
  if (activeSchool !== "toutes" && program.school !== activeSchool) {
    return NextResponse.json({ error: "Ce programme n'appartient pas à l'institution active." }, { status: 403 });
  }

  let internalSupervisorIdNum: number | undefined;
  if (internalSupervisorId !== undefined && internalSupervisorId !== null && internalSupervisorId !== "") {
    const n = Number(internalSupervisorId);
    if (!Number.isInteger(n)) {
      return NextResponse.json({ error: "Superviseur interne invalide." }, { status: 400 });
    }
    internalSupervisorIdNum = n;
  }

  const activeYear = await prisma.academicYear.findFirst({ where: { isActive: true } });

  const created = await prisma.internship.create({
    data: {
      studentId: studentIdNum,
      programId,
      title: title.trim(),
      hostOrganization: hostOrganization.trim(),
      hostAddress: typeof hostAddress === "string" && hostAddress.trim() ? hostAddress.trim() : undefined,
      hostSupervisorName:
        typeof hostSupervisorName === "string" && hostSupervisorName.trim() ? hostSupervisorName.trim() : undefined,
      hostSupervisorContact:
        typeof hostSupervisorContact === "string" && hostSupervisorContact.trim()
          ? hostSupervisorContact.trim()
          : undefined,
      internalSupervisorId: internalSupervisorIdNum,
      startDate: startDateObj,
      endDate: endDateObj ?? undefined,
      academicYearId: activeYear?.id,
      createdById: resolveActorId(session.userId) ?? undefined,
    },
  });

  await writeAuditLog({
    entityType: "Internship",
    entityId: created.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: { id: created.id, studentId: studentIdNum, title: title.trim() },
  });

  await createNotification(studentIdNum, {
    type: "internship_assigned",
    title: "Nouveau stage",
    body: `Un stage "${title.trim()}" (${hostOrganization.trim()}) vous a été assigné.`,
  });
  if (internalSupervisorIdNum) {
    await createNotification(internalSupervisorIdNum, {
      type: "internship_supervisor_assigned",
      title: "Supervision de stage",
      body: `Vous êtes désigné superviseur interne du stage "${title.trim()}" de ${student.name}.`,
    });
  }

  return NextResponse.json({ id: created.id }, { status: 201 });
}
