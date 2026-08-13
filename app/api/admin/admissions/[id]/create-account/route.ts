import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";
import { formatCcigaId } from "@/lib/cciga-id";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const submission = await prisma.admissionSubmission.findUnique({ where: { id } });
  if (!submission) {
    return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
  }
  if (submission.status !== "admis") {
    return NextResponse.json(
      { error: "Le dossier doit être au statut « Admis » pour créer le compte." },
      { status: 400 },
    );
  }
  if (submission.studentUserId) {
    return NextResponse.json({ error: "Un compte est déjà associé à ce dossier." }, { status: 409 });
  }

  const program = await prisma.program.findUnique({ where: { slug: submission.programSlug } });

  const existing = await prisma.user.findUnique({ where: { email: submission.email } });
  if (existing) {
    await prisma.admissionSubmission.update({
      where: { id },
      data: { studentUserId: existing.id },
    });
    if (program && !existing.programId) {
      await prisma.user.update({ where: { id: existing.id }, data: { programId: program.id } });
    }
    await createNotification(existing.id, {
      type: "welcome",
      title: "Candidature admise",
      body: `Votre dossier a été admis et lié à votre compte CCIGA ID ${formatCcigaId(existing.id)}.`,
    });
    return NextResponse.json({ id: existing.id, existed: true });
  }

  const temporaryPassword = randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  const user = await prisma.user.create({
    data: {
      name: `${submission.firstName} ${submission.lastName}`,
      email: submission.email,
      passwordHash,
      roles: JSON.stringify(["STUDENT"]),
      programId: program?.id,
    },
  });

  await prisma.admissionSubmission.update({
    where: { id },
    data: { studentUserId: user.id },
  });

  await createNotification(user.id, {
    type: "welcome",
    title: "Bienvenue sur CCIGA",
    body: `Votre dossier a été admis. Votre compte CCIGA ID ${formatCcigaId(user.id)} est actif.`,
  });

  return NextResponse.json({ id: user.id, temporaryPassword }, { status: 201 });
}
