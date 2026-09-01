import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import { schoolToSector } from "@/lib/branding";
import ReceiptDocument from "@/lib/pdf/ReceiptDocument";

export const runtime = "nodejs";

/** react-pdf's built-in Helvetica has no glyph for the narrow no-break space (U+202F) toLocaleString("fr-FR") uses as a thousands separator — normalize to a regular space so amounts don't render with a stray "/". */
function pdfSafeHTG(amount: number): string {
  const nbsp = String.fromCharCode(0x00a0);
  const narrowNbsp = String.fromCharCode(0x202f);
  return formatHTG(amount).split(nbsp).join(" ").split(narrowNbsp).join(" ");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; paymentId: string }> },
) {
  const session = await requireSecretariatSession();
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
    prisma.payment.findUnique({ where: { id: paymentId } }),
    prisma.payment.findMany({ where: { studentId }, orderBy: { paidAt: "asc" } }),
  ]);

  if (!student || !payment || payment.studentId !== studentId) {
    return new Response("Paiement introuvable.", { status: 404 });
  }

  const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);
  const fee = student.program?.tuitionFee ?? 0;
  const balance = fee - totalPaid;

  const paidAtLabel = payment.paidAt.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const reference = `CCIGA-REC-${payment.id.slice(-10).toUpperCase()}`;
  const logoBase64 = getDocumentLogoDataUri(student.program ? schoolToSector(student.program.school) : null);

  const buffer = await renderToBuffer(
    ReceiptDocument({
      logoBase64,
      studentName: student.name,
      ccigaId: formatCcigaId(student.id),
      programName: student.program?.name ?? "Aucun programme associé",
      amountLabel: pdfSafeHTG(payment.amount),
      paidAtLabel,
      note: payment.note,
      totalPaidLabel: pdfSafeHTG(totalPaid),
      balanceLabel: pdfSafeHTG(balance),
      reference,
      publishedLabel: `Émis le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`,
      qrDataUri: null,
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
