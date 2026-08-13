import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { isAdmissionStatus } from "@/lib/admission-status";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
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
