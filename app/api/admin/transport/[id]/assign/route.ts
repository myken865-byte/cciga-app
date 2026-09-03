import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id: vehicleId } = await params;
  const { studentId } = (await request.json()) ?? {};

  const parsedStudentId = Number(studentId);
  if (!Number.isInteger(parsedStudentId)) {
    return NextResponse.json({ error: "Élève requis." }, { status: 400 });
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    include: { assignments: true },
  });
  if (!vehicle) {
    return NextResponse.json({ error: "Véhicule introuvable." }, { status: 404 });
  }
  if (vehicle.capacity && vehicle.assignments.length >= vehicle.capacity) {
    return NextResponse.json({ error: "Capacité maximale atteinte." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: parsedStudentId } });
  if (!student) {
    return NextResponse.json({ error: "Élève introuvable." }, { status: 404 });
  }

  const existing = await prisma.transportAssignment.findFirst({
    where: { vehicleId, studentId: parsedStudentId },
  });
  if (existing) {
    return NextResponse.json({ error: "Cet élève est déjà affecté à ce véhicule." }, { status: 400 });
  }

  const assignment = await prisma.transportAssignment.create({
    data: { vehicleId, studentId: parsedStudentId },
  });

  await writeAuditLog({
    entityType: "TransportAssignment",
    entityId: assignment.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: assignment,
  });

  return NextResponse.json({ id: assignment.id }, { status: 201 });
}
