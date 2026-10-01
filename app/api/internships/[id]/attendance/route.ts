import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessInternship, isInternshipStaff } from "@/lib/internshipAccess";
import { isInternshipAttendanceStatus } from "@/lib/internships";

// Enregistrement d'une présence de stage — un enregistrement par jour
// (contrainte unique @@unique([internshipId, date]) déjà en base) ; un
// conflit renvoie un message clair, jamais l'erreur Prisma brute.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !isInternshipStaff(session)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.internship.findUnique({ where: { id } });
  if (!existing || !(await canAccessInternship(session, existing))) {
    return NextResponse.json({ error: "Stage introuvable." }, { status: 404 });
  }

  const { date, status } = (await request.json().catch(() => null)) ?? {};
  const dateObj = typeof date === "string" ? new Date(date) : null;
  if (!dateObj || Number.isNaN(dateObj.getTime()) || typeof status !== "string" || !isInternshipAttendanceStatus(status)) {
    return NextResponse.json({ error: "Date ou statut de présence invalide." }, { status: 400 });
  }

  try {
    const attendance = await prisma.internshipAttendance.create({
      data: { internshipId: id, date: dateObj, status },
    });
    return NextResponse.json({ id: attendance.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Une présence existe déjà pour cette date." }, { status: 409 });
  }
}
