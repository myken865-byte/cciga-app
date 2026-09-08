import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { resolveActorId } from "@/lib/devBypass";
import { writeAuditLog } from "@/lib/auditLog";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

const VOID_PREFIX = "VOID:";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; paymentId: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) {
    return NextResponse.json({ error: "Choisissez une institution avant d'annuler un paiement." }, { status: 400 });
  }

  const { id, paymentId } = await params;
  const studentId = Number(id);

  const original = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { student: { include: { program: true } } },
  });
  if (!original || original.studentId !== studentId) {
    return NextResponse.json({ error: "Paiement introuvable." }, { status: 404 });
  }
  if (activeSchool !== "toutes" && original.student.program?.school !== activeSchool) {
    return NextResponse.json({ error: "Ce paiement appartient à une autre institution." }, { status: 403 });
  }
  if (original.amount <= 0 || original.providerReference?.startsWith(VOID_PREFIX)) {
    return NextResponse.json(
      { error: "Ce paiement ne peut pas être annulé (déjà une contrepassation, ou montant non positif)." },
      { status: 400 },
    );
  }
  const alreadyVoided = await prisma.payment.findFirst({
    where: { providerReference: `${VOID_PREFIX}${original.id}` },
  });
  if (alreadyVoided) {
    return NextResponse.json({ error: "Ce paiement a déjà été annulé." }, { status: 409 });
  }

  const { reason } = (await request.json().catch(() => null)) ?? {};

  const reversal = await prisma.payment.create({
    data: {
      studentId: original.studentId,
      amount: -original.amount,
      note: `ANNULATION — contrepassation du paiement ${original.id}${original.note ? ` (${original.note})` : ""}${reason ? ` — ${reason}` : ""}`,
      providerReference: `${VOID_PREFIX}${original.id}`,
      recordedById: resolveActorId(session.userId),
    },
  });

  await writeAuditLog({
    entityType: "Payment",
    entityId: original.id,
    action: "void",
    actorId: resolveActorId(session.userId),
    before: original,
    after: reversal,
    reason: reason ?? undefined,
  });

  return NextResponse.json({ ok: true, reversalId: reversal.id }, { status: 201 });
}
