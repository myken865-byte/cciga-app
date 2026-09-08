import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import BadgeManager from "@/components/BadgeManager";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

// Phase C3 (2026-09-08) : cloisonnement réel — un badge appartient à une
// institution (Badge.school, Phase C1/C2). Les 5 badges restés AMBIGU
// (school = NULL, Phase C2) n'apparaissent dans aucune vue institutionnelle :
// invisibles ici, non perdus (toujours en base), à arbitrer séparément.
export default async function AdminBadgesPage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Contrôle d'accès" title="Badges" />
        <div className="empty-state">
          Les badges sont propres à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [badges, users] = await Promise.all([
    prisma.badge.findMany({
      where: { school: activeSchool },
      include: { user: { select: { id: true, name: true, photoUrl: true } } },
      orderBy: { issuedAt: "desc" },
    }),
    prisma.user.findMany({
      select: { id: true, name: true, roles: true, program: { select: { school: true } } },
    }),
  ]);

  const badgedUserIds = new Set(badges.map((b) => b.userId));
  // Portée de ce module (voir lib/badgeAuto.ts) : élèves/apprenants/étudiants
  // inscrits sans badge existant — le badge du personnel reste hors périmètre.
  // Candidats limités à l'institution active (Phase C3) : un élève dont le
  // programme n'est pas encore rattaché à cette école n'apparaît pas ici.
  const candidates = users
    .filter(
      (u) =>
        hasRole(parseRoles(u.roles), "STUDENT") &&
        !badgedUserIds.has(u.id) &&
        u.program?.school === activeSchool,
    )
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Contrôle d'accès" title={`Badges — ${schoolLabels[activeSchool]}`} />
      <BadgeManager
        badges={badges.map((b) => ({
          id: b.id,
          badgeNumber: b.badgeNumber,
          status: b.status,
          user: b.user,
        }))}
        candidates={candidates}
      />
    </AdminShell>
  );
}
