import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant de réserver." }, { status: 400 });
  }

  const { id: menuId } = await params;
  const { studentId } = (await request.json()) ?? {};

  const parsedStudentId = Number(studentId);
  if (!Number.isInteger(parsedStudentId)) {
    return NextResponse.json({ error: "Élève requis." }, { status: 400 });
  }

  const menu = await prisma.canteenMenu.findUnique({ where: { id: menuId } });
  if (!menu) {
    return NextResponse.json({ error: "Menu introuvable." }, { status: 404 });
  }
  // Non-croisement (Phase C3) : un menu non attribué (AMBIGU) ou d'une autre
  // institution ne peut pas recevoir de réservation depuis ce contexte.
  if (menu.school !== school) {
    return NextResponse.json({ error: "Ce menu appartient à une autre institution." }, { status: 403 });
  }

  const student = await prisma.user.findUnique({ where: { id: parsedStudentId } });
  if (!student) {
    return NextResponse.json({ error: "Élève introuvable." }, { status: 404 });
  }

  const existing = await prisma.canteenReservation.findFirst({
    where: { menuId, studentId: parsedStudentId, status: { not: "annule" } },
  });
  if (existing) {
    return NextResponse.json({ error: "Cet élève a déjà une réservation pour ce menu." }, { status: 400 });
  }

  // CanteenReservation.school est une copie dénormalisée de CanteenMenu.school.
  const reservation = await prisma.canteenReservation.create({
    data: { menuId, studentId: parsedStudentId, school: menu.school },
  });

  await writeAuditLog({
    entityType: "CanteenReservation",
    entityId: reservation.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: reservation,
  });

  return NextResponse.json({ id: reservation.id }, { status: 201 });
}
