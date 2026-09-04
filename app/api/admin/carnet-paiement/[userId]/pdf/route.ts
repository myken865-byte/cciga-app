import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import { schoolToSector } from "@/lib/branding";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatCarnetPaiementReference } from "@/lib/carnetPaiementReference";
import { formatHTGForPdf } from "@/lib/currency";
import PaymentBookletDocument, { type PaymentBookletPayment } from "@/lib/pdf/PaymentBookletDocument";

export const runtime = "nodejs";

// Historique affiché sur le carnet imprimé (espace physique fixe, 4,25 x 5,5
// pouces) — au-delà, renvoi vers le dossier Finance complet plutôt que de
// débordre ou de faire apparaître une page supplémentaire non pliée
// correctement. L'historique réel n'est jamais tronqué ailleurs (Finance,
// reçus) — uniquement sur cette impression physique à espace limité.
const MAX_PAYMENT_ROWS = 8;

const INSTITUTION_LABELS: Record<string, string> = {
  "ecole-classique": "CCIGA École Classique",
  "ecole-professionnelle": "CCIGA École Professionnelle",
  universite: "CCIGA Université",
};

async function toDataUri(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { userId: userIdParam } = await params;
  const userId = Number(userIdParam);
  if (!Number.isInteger(userId)) {
    return new Response("Dossier invalide.", { status: 400 });
  }

  const [user, payments, activeYear] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, include: { program: true } }),
    prisma.payment.findMany({ where: { studentId: userId }, orderBy: { paidAt: "desc" } }),
    prisma.academicYear.findFirst({ where: { isActive: true } }),
  ]);
  if (!user) {
    return new Response("Dossier introuvable.", { status: 404 });
  }

  const school = user.program?.school ?? null;
  const institutionLabel = school ? (INSTITUTION_LABELS[school] ?? "CCIGA") : "CCIGA";
  const logoBase64 = getDocumentLogoDataUri(school ? schoolToSector(school) : null);
  const photoBase64 = await toDataUri(user.photoUrl);
  const carnetNumber = formatCarnetPaiementReference(user.id);
  const ccigaId = formatCcigaId(user.id);
  // "QA_" est la convention déjà utilisée dans ce projet pour marquer les
  // données de test (ex. "QA_Programme Test") — jamais présentée comme une
  // année officielle sur un document imprimable, même si c'est la seule
  // année active configurée actuellement.
  const isQaYear = activeYear?.label.startsWith("QA_") ?? false;
  const academicYearLabel =
    activeYear && !isQaYear ? activeYear.label : "À COMPLÉTER - ANNÉE SCOLAIRE/ACADÉMIQUE OFFICIELLE REQUISE";

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const fee = user.program?.tuitionFee ?? 0;
  const balance = fee - totalPaid;
  const feeLabel = fee > 0 ? formatHTGForPdf(fee) : "À COMPLÉTER - TARIF OFFICIEL REQUIS";
  const balanceLabel = fee > 0 ? formatHTGForPdf(Math.max(balance, 0)) : "À COMPLÉTER - TARIF OFFICIEL REQUIS";

  const paymentRows: PaymentBookletPayment[] = payments.slice(0, MAX_PAYMENT_ROWS).map((p) => ({
    dateLabel: p.paidAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" }),
    description: p.note || "Versement",
    amountLabel: formatHTGForPdf(p.amount),
  }));

  const generatedLabel = `Généré le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`;

  const buffer = await renderToBuffer(
    PaymentBookletDocument({
      logoBase64,
      institutionLabel,
      academicYearLabel,
      carnetNumber,
      ccigaId,
      fullName: user.name,
      classOrProgramLabel: user.program?.name ?? "À COMPLÉTER",
      photoBase64,

      feeLabel,
      totalPaidLabel: formatHTGForPdf(totalPaid),
      balanceLabel,
      payments: paymentRows,
      paymentsTruncated: payments.length > MAX_PAYMENT_ROWS,

      institutionDescription:
        "Centre Interdisciplinaire des Génies Agrégées — École Classique, École Professionnelle et Université réunies dans un campus numérique intégré.",
      generatedLabel,
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${carnetNumber}.pdf"`,
    },
  });
}
