import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import BadgeManager from "@/components/BadgeManager";

export const dynamic = "force-dynamic";

export default async function AdminBadgesPage() {
  const [badges, users] = await Promise.all([
    prisma.badge.findMany({
      include: { user: { select: { id: true, name: true, photoUrl: true } } },
      orderBy: { issuedAt: "desc" },
    }),
    prisma.user.findMany({ select: { id: true, name: true, roles: true } }),
  ]);

  const badgedUserIds = new Set(badges.map((b) => b.userId));
  // Portée de ce module (voir lib/badgeAuto.ts) : élèves/apprenants/étudiants
  // inscrits sans badge existant — le badge du personnel reste hors périmètre.
  const candidates = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT") && !badgedUserIds.has(u.id))
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Badges</h1>
      <BadgeManager
        badges={badges.map((b) => ({
          id: b.id,
          badgeNumber: b.badgeNumber,
          status: b.status,
          user: b.user,
        }))}
        candidates={candidates}
      />
    </div>
  );
}
