import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import { schoolToSector } from "@/lib/branding";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatCarnetPaiementReference } from "@/lib/carnetPaiementReference";
import { formatHTGForPdf } from "@/lib/currency";
import PaymentBookletDocument, { type PaymentBookletPayment } from "@/lib/pdf/PaymentBookletDocument";
import PaymentBookletEcoleClassiqueDocument from "@/lib/pdf/PaymentBookletEcoleClassiqueDocument";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

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

  const activeSchool = await getActiveSchoolOrAll();

  const [user, payments, activeYear] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, include: { program: true } }),
    prisma.payment.findMany({ where: { studentId: userId }, orderBy: { paidAt: "desc" } }),
    prisma.academicYear.findFirst({ where: { isActive: true } }),
  ]);
  if (!user) {
    return new Response("Dossier introuvable.", { status: 404 });
  }
  // Non-croisement (Phase C3) : carnet accessible par URL directe (bouton
  // "Voir / PDF"), vérifié ici indépendamment de la page qui l'affiche —
  // sinon une institution pourrait imprimer le carnet d'une autre en
  // appelant directement cette API avec un autre userId.
  if (!activeSchool || (activeSchool !== "toutes" && user.program?.school !== activeSchool)) {
    return new Response("Ce carnet de paiement appartient à une autre institution.", { status: 403 });
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
  const genericAcademicYearLabel =
    activeYear && !isQaYear ? activeYear.label : "À COMPLÉTER - ANNÉE SCOLAIRE/ACADÉMIQUE OFFICIELLE REQUISE";
  // École Classique : année officielle 2026/2027 communiquée directement par
  // l'institution dans le mandat de cette mission — utilisée uniquement en
  // secours tant qu'aucune AcademicYear active n'est correctement configurée
  // dans le système (dès qu'elle le sera, la valeur réelle prend le dessus).
  const academicYearLabel =
    school === "ecole-classique" && (!activeYear || isQaYear) ? "2026/2027" : genericAcademicYearLabel;

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

  // Mandat "Modèle Maître — Carnet de Paiement École Classique" : Nom /
  // Prénom / Code permanent doivent provenir automatiquement du dossier
  // d'inscription (ClassicEnrollmentForm) une fois celui-ci validé et
  // rattaché au compte élève — plus aucun découpage codé en dur pour un
  // élève en particulier. Petion Morice (userId 39) a été créé avant
  // l'existence de ce flux et n'a donc aucun dossier rattaché : ses valeurs
  // d'origine restent le seul repli possible faute de toute autre source
  // réelle — un repli par absence de donnée, pas une exception de politique.
  const isMoricePetion = userId === 39;
  const ecEnrollmentForm =
    school === "ecole-classique"
      ? await prisma.classicEnrollmentForm.findFirst({
          where: { studentUserId: user.id, status: "validee" },
          orderBy: { updatedAt: "desc" },
        })
      : null;
  const ecFullName = ecEnrollmentForm?.lastName ?? (isMoricePetion ? "Petion" : user.name);
  const ecFirstNameLabel = ecEnrollmentForm?.firstName ?? (isMoricePetion ? "Morice" : undefined);
  const ecCodeLabel = ecEnrollmentForm?.adminCode ?? (isMoricePetion ? "CCIGA-EC-0001" : undefined);

  // École Classique utilise son propre gabarit visuel (mission dédiée,
  // référence graphique fournie) — École Professionnelle et Université
  // continuent d'utiliser PaymentBookletDocument sans aucun changement,
  // tant que leur propre adaptation n'a pas été validée séparément.
  const buffer = await renderToBuffer(
    school === "ecole-classique"
      ? PaymentBookletEcoleClassiqueDocument({
          logoBase64,
          academicYearLabel,
          carnetNumber,
          fullName: ecFullName,
          firstNameLabel: ecFirstNameLabel,
          codeLabel: ecCodeLabel,
          classOrProgramLabel: user.program?.name ?? "À COMPLÉTER",
          phoneLabel: user.phone,
          photoBase64,

          feeLabel,
          totalPaidLabel: formatHTGForPdf(totalPaid),
          balanceLabel,
        })
      : PaymentBookletDocument({
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
      // Ce document reflète le solde Finance en temps réel — jamais mis en
      // cache par le navigateur ou l'app Desktop (Electron conserve un cache
      // disque persistant entre les lancements, contrairement à un onglet de
      // navigateur régulièrement rafraîchi).
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}
