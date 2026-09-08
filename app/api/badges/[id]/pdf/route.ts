import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { generateVerificationQrDataUri } from "@/lib/qr";
import { schoolToSector, sectorLabel } from "@/lib/branding";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import { BADGE_STATUS_A_FINALISER } from "@/lib/badgeAuto";
import BadgeDocument from "@/lib/pdf/BadgeDocument";
import { getActiveSchool } from "@/lib/institutionContext";

export const runtime = "nodejs";

const statusLabel: Record<string, string> = {
  actif: "Actif",
  perdu: "Signalé perdu",
  remplace: "Remplacé",
  inactif: "Inactif",
  [BADGE_STATUS_A_FINALISER]: "À finaliser",
};

async function toDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

// Chemin hors /api/admin/** (voir app/admin/badges/[id]/print/page.tsx, qui
// charge ce PDF dans un <iframe>) : non couvert par la liste de préfixes de
// proxy.ts, donc la vérification de session est faite ici, comme le fait déjà
// app/api/admin/fiches-inscription/[id]/pdf/route.ts pour son propre accès.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { id } = await params;
  const activeSchool = await getActiveSchool();
  const badge = await prisma.badge.findUnique({
    where: { id },
    include: { user: { include: { program: true } } },
  });
  if (!badge) {
    return new Response("Badge introuvable.", { status: 404 });
  }
  // Non-croisement (Phase C3) : ce PDF est accessible par URL directe
  // (iframe), donc vérifié ici indépendamment de la page qui l'affiche.
  if (!activeSchool || badge.school !== activeSchool) {
    return new Response("Ce badge appartient à une autre institution.", { status: 403 });
  }

  const activeYear = await prisma.academicYear.findFirst({ where: { isActive: true }, select: { label: true } });
  const sector = badge.user.program ? schoolToSector(badge.user.program.school) : null;
  const photoBase64 = badge.user.photoUrl ? await toDataUri(badge.user.photoUrl) : null;
  const origin = new URL(request.url).origin;
  const qrDataUri = await generateVerificationQrDataUri(`${origin}/verify-badge/${badge.id}`);

  const buffer = await renderToBuffer(
    BadgeDocument({
      logoBase64: getDocumentLogoDataUri(sector),
      orgName: "CCIGA",
      badgeTypeLabel: sector ? `Badge — ${sectorLabel[sector]}` : "Badge CCIGA",
      photoBase64,
      fullName: badge.user.name,
      matricule: formatCcigaId(badge.user.id),
      // "Classe / Fonction" (voir lib/pdf/BadgeDocument.tsx) : jamais inventé,
      // repli explicite si aucun programme n'est encore assigné.
      classOrFunction: badge.user.program?.name ?? "À COMPLÉTER",
      yearLabel: activeYear?.label ?? "À COMPLÉTER",
      badgeNumber: badge.badgeNumber,
      issuedLabel: badge.issuedAt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
      statusLabel: statusLabel[badge.status] ?? badge.status,
      qrDataUri,
      contactEmail: "contact@cciga.edu",
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="badge-${badge.badgeNumber}.pdf"`,
    },
  });
}
