import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { isAdmissionStatus } from "@/lib/admission-status";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) {
    return NextResponse.json({ error: "Choisissez une institution avant de modifier une candidature." }, { status: 400 });
  }

  const { id } = await params;
  const existing = await prisma.admissionSubmission.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
  }
  if (activeSchool !== "toutes" && existing.school !== activeSchool) {
    return NextResponse.json({ error: "Cette candidature appartient à une autre institution." }, { status: 403 });
  }

  const { status, adminNote } = (await request.json()) ?? {};

  if (!status || !isAdmissionStatus(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const submission = await prisma.admissionSubmission.update({
    where: { id },
    data: { status, adminNote: adminNote ?? undefined },
  });

  return NextResponse.json({ ok: true, submission });
}
