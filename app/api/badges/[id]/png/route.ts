import { prisma } from "@/lib/db";
import { requireBadgeManagerSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { generateVerificationQrDataUri } from "@/lib/qr";
import { resolveBadgeBranding, resolveBadgeLogoDataUri } from "@/lib/badgeInstitution";
import { BADGE_STATUS_A_FINALISER } from "@/lib/badgeAuto";
import { renderBadgePngs } from "@/lib/pdf/badgePng";
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

// Mêmes RBAC + non-croisement d'institution que app/api/badges/[id]/pdf/route.ts
// (voir ce fichier) — même source de données, seul le rendu final diffère
// (PNG haute résolution via lib/pdf/badgePng.ts au lieu du PDF react-pdf).
// ?side=recto|verso (défaut recto).
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireBadgeManagerSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { id } = await params;
  const url = new URL(request.url);
  const side = url.searchParams.get("side") === "verso" ? "verso" : "recto";

  const activeSchool = await getActiveSchool();
  const badge = await prisma.badge.findUnique({
    where: { id },
    include: { user: { include: { program: true } } },
  });
  if (!badge) {
    return new Response("Badge introuvable.", { status: 404 });
  }
  if (!activeSchool || badge.school !== activeSchool) {
    return new Response("Ce badge appartient à une autre institution.", { status: 403 });
  }

  const activeYear = await prisma.academicYear.findFirst({ where: { isActive: true }, select: { label: true } });
  const branding = resolveBadgeBranding({
    role: badge.user.roles,
    school: badge.school,
    niveau: badge.user.program?.niveau ?? null,
  });
  const photoBase64 = badge.user.photoUrl ? await toDataUri(badge.user.photoUrl) : null;
  const origin = url.origin;
  const qrDataUri = await generateVerificationQrDataUri(`${origin}/verify-badge/${badge.id}`);

  // Faculté/Programme séparés — Université uniquement, et seulement quand la
  // donnée existe réellement (Program.faculty, déjà utilisé tel quel par le
  // site public — app/(site)/universite/page.tsx) : jamais un champ inventé
  // pour les 3 autres institutions, qui n'ont pas cette notion.
  const facultyLabel = badge.school === "universite" ? (badge.user.program?.faculty ?? undefined) : undefined;

  const { recto, verso } = await renderBadgePngs({
    logoBase64: resolveBadgeLogoDataUri(branding),
    orgName: branding.orgName,
    badgeTypeLabel: `Badge — ${branding.institutionLabel}`,
    photoBase64,
    fullName: badge.user.name,
    roleLabel: branding.roleLabel,
    matricule: formatCcigaId(badge.user.id),
    classOrFunction: badge.user.program?.name ?? "À COMPLÉTER",
    facultyLabel,
    yearLabel: activeYear?.label ?? "À COMPLÉTER",
    badgeNumber: badge.badgeNumber,
    issuedLabel: badge.issuedAt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
    statusLabel: statusLabel[badge.status] ?? badge.status,
    qrDataUri,
    contactEmail: "contact@cciga.edu",
  });

  const buffer = side === "verso" ? verso : recto;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `inline; filename="badge-${badge.badgeNumber}-${side}.png"`,
    },
  });
}
