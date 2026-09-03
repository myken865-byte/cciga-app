import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { formatPaymentReceiptReference } from "@/lib/paymentReceiptReference";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTGForPdf } from "@/lib/currency";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import { schoolToSector } from "@/lib/branding";
import ReceiptDocument from "@/lib/pdf/ReceiptDocument";

export const runtime = "nodejs";

const PROVIDER_LABELS: Record<string, string> = {
  manuel: "Manuel",
  moncash: "MonCash",
  natcash: "NatCash",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; paymentId: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { id, paymentId } = await params;
  const studentId = Number(id);
  if (!Number.isInteger(studentId)) {
    return new Response("Étudiant invalide.", { status: 400 });
  }

  const [student, payment, allPayments] = await Promise.all([
    prisma.user.findUnique({ where: { id: studentId }, include: { program: true } }),
    prisma.payment.findUnique({ where: { id: paymentId }, include: { recordedBy: true } }),
    prisma.payment.findMany({ where: { studentId } }),
  ]);
  if (!student || !payment || payment.studentId !== studentId) {
    return new Response("Reçu introuvable.", { status: 404 });
  }

  const reference = formatPaymentReceiptReference(payment.id);
  const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);
  const fee = student.program?.tuitionFee ?? 0;
  const balance = fee - totalPaid;
  // "PAYÉ"/"PARTIELLEMENT PAYÉ" dérivés du frais réellement configuré vs
  // total réellement encaissé — jamais un statut inventé. Sans frais
  // configuré, on ne peut pas conclure au solde : statut neutre.
  const statusLabel = fee <= 0 ? "PAIEMENT ENREGISTRÉ" : balance <= 0 ? "PAYÉ" : "PARTIELLEMENT PAYÉ";

  const sector = student.program ? schoolToSector(student.program.school) : null;
  const logoBase64 = getDocumentLogoDataUri(sector);
  const generatedLabel = `Généré le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`;

  const buffer = await renderToBuffer(
    ReceiptDocument({
      logoBase64,
      studentName: student.name,
      ccigaId: formatCcigaId(student.id),
      programName: student.program?.name ?? "A COMPLÉTER - INFORMATION REQUISE",
      amountLabel: formatHTGForPdf(payment.amount),
      paidAtLabel: payment.paidAt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
      note: payment.note,
      totalPaidLabel: formatHTGForPdf(totalPaid),
      balanceLabel: fee > 0 ? formatHTGForPdf(Math.max(balance, 0)) : "A COMPLÉTER - TARIF OFFICIEL REQUIS",
      reference,
      publishedLabel: generatedLabel,
      qrDataUri: null,
      statusLabel,
      providerLabel: PROVIDER_LABELS[payment.provider] ?? payment.provider,
      providerReference: payment.providerReference,
      recordedByLabel: payment.recordedBy?.name ?? null,
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
