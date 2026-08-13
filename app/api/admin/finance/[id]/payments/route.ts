import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";
import { formatHTG } from "@/lib/currency";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const studentId = Number(id);
  const { amount, note } = (await request.json()) ?? {};

  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return NextResponse.json({ error: "Montant invalide." }, { status: 400 });
  }

  const student = await prisma.user.findUnique({ where: { id: studentId } });
  if (!student) {
    return NextResponse.json({ error: "Étudiant introuvable." }, { status: 404 });
  }

  const payment = await prisma.payment.create({
    data: {
      studentId,
      amount: Math.round(parsedAmount),
      note: note || undefined,
    },
  });

  await createNotification(studentId, {
    type: "payment",
    title: "Paiement enregistré",
    body: `Un paiement de ${formatHTG(payment.amount)} a été enregistré pour votre dossier.`,
  });

  return NextResponse.json({ id: payment.id }, { status: 201 });
}
