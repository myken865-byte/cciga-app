import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

/**
 * POST — prêter un exemplaire : [id] est l'id du livre (bookId).
 * PATCH — marquer un prêt comme retourné : [id] est l'id du prêt (loanId),
 * conformément à LibraryManager.tsx (markReturned appelle
 * /api/admin/bibliotheque/${loanId}/loan).
 */
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
    return NextResponse.json({ error: "Choisissez une institution avant de prêter un ouvrage." }, { status: 400 });
  }

  const { id: bookId } = await params;
  const { borrowerId, dueDate } = (await request.json()) ?? {};

  const parsedBorrowerId = Number(borrowerId);
  if (!Number.isInteger(parsedBorrowerId)) {
    return NextResponse.json({ error: "Emprunteur requis." }, { status: 400 });
  }
  if (!dueDate || typeof dueDate !== "string") {
    return NextResponse.json({ error: "Date d'échéance requise." }, { status: 400 });
  }
  const parsedDueDate = new Date(dueDate);
  if (Number.isNaN(parsedDueDate.getTime())) {
    return NextResponse.json({ error: "Date d'échéance invalide." }, { status: 400 });
  }

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { loans: { where: { returnedAt: null } } },
  });
  if (!book) {
    return NextResponse.json({ error: "Ouvrage introuvable." }, { status: 404 });
  }
  // Non-croisement (Phase C3) : un ouvrage non attribué (AMBIGU) ou d'une
  // autre institution ne peut pas être prêté depuis ce contexte.
  if (book.school !== school) {
    return NextResponse.json({ error: "Cet ouvrage appartient à une autre institution." }, { status: 403 });
  }
  if (book.loans.length >= book.totalCopies) {
    return NextResponse.json({ error: "Aucun exemplaire disponible." }, { status: 400 });
  }

  const borrower = await prisma.user.findUnique({ where: { id: parsedBorrowerId } });
  if (!borrower) {
    return NextResponse.json({ error: "Emprunteur introuvable." }, { status: 404 });
  }

  // BookLoan.school est une copie dénormalisée de Book.school (voir
  // prisma/schema.prisma) — jamais déduite de l'emprunteur.
  const loan = await prisma.bookLoan.create({
    data: {
      bookId,
      borrowerId: parsedBorrowerId,
      dueDate: parsedDueDate,
      recordedById: resolveActorId(session.userId),
      school: book.school,
    },
  });

  await writeAuditLog({
    entityType: "BookLoan",
    entityId: loan.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: loan,
  });

  return NextResponse.json({ id: loan.id }, { status: 201 });
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant de marquer un retour." }, { status: 400 });
  }

  const { id: loanId } = await params;

  const loan = await prisma.bookLoan.findUnique({ where: { id: loanId } });
  if (!loan) {
    return NextResponse.json({ error: "Prêt introuvable." }, { status: 404 });
  }
  if (loan.school !== school) {
    return NextResponse.json({ error: "Ce prêt appartient à une autre institution." }, { status: 403 });
  }
  if (loan.returnedAt) {
    return NextResponse.json({ ok: true });
  }

  const updated = await prisma.bookLoan.update({
    where: { id: loanId },
    data: { returnedAt: new Date() },
  });

  await writeAuditLog({
    entityType: "BookLoan",
    entityId: loanId,
    action: "return",
    actorId: resolveActorId(session.userId),
    before: { returnedAt: null },
    after: { returnedAt: updated.returnedAt },
  });

  return NextResponse.json({ ok: true });
}
