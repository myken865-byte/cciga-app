import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { createNotification } from "@/lib/notifications";

// Inscription de l'élève connecté à un séminaire de sa propre institution.
// La contrainte unique @@unique([seminarId, studentId]) protège déjà le
// doublon en base — un conflit renvoie un message clair, jamais l'erreur
// Prisma brute (mandat §4).
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["STUDENT"])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const [seminar, student] = await Promise.all([
    prisma.seminar.findUnique({ where: { id } }),
    prisma.user.findUnique({ where: { id: session.userId }, include: { program: true } }),
  ]);
  if (!seminar) {
    return NextResponse.json({ error: "Séminaire introuvable." }, { status: 404 });
  }
  if (!student?.program || student.program.school !== seminar.school) {
    return NextResponse.json({ error: "Ce séminaire n'est pas ouvert à votre institution." }, { status: 403 });
  }
  if (!seminar.registrationOpen || seminar.status === "clos" || seminar.status === "termine") {
    return NextResponse.json({ error: "Les inscriptions à ce séminaire sont fermées." }, { status: 400 });
  }

  try {
    const registration = await prisma.seminarRegistration.create({
      data: { seminarId: id, studentId: session.userId },
    });
    if (seminar.createdById) {
      await createNotification(seminar.createdById, {
        type: "seminar_registration",
        title: "Nouvelle inscription",
        body: `${student!.name} s'est inscrit(e) au séminaire "${seminar.title}".`,
      });
    }
    return NextResponse.json({ id: registration.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Vous êtes déjà inscrit à ce séminaire." }, { status: 409 });
  }
}

// Annulation de l'inscription — tant que le séminaire n'a pas déjà eu lieu.
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["STUDENT"])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const seminar = await prisma.seminar.findUnique({ where: { id } });
  if (!seminar) {
    return NextResponse.json({ error: "Séminaire introuvable." }, { status: 404 });
  }
  if (seminar.status === "termine") {
    return NextResponse.json({ error: "Ce séminaire est déjà terminé." }, { status: 400 });
  }

  await prisma.seminarRegistration.deleteMany({ where: { seminarId: id, studentId: session.userId } });
  return NextResponse.json({ ok: true });
}
