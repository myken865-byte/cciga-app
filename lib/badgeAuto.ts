import { prisma } from "@/lib/db";
import { hasRole, parseRoles } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { writeAuditLog } from "@/lib/auditLog";

/**
 * Statuts de badge : "actif" et les 3 autres existants sont gérés par
 * l'administration (BadgeManager). "a_finaliser" est réservé à ce module —
 * un badge auto-créé sans classe/filière/faculté assignée reste dans cet
 * état jusqu'à ce que l'information soit fournie, jamais inventée.
 */
export const BADGE_STATUS_A_FINALISER = "a_finaliser";

/**
 * Convention déjà en place (voir components/GenerateBadgeButton.tsx, ajouté
 * lors de la phase précédente) — réutilisée telle quelle, jamais réinventée.
 * Dérivée du matricule CCIGA ID, donc automatiquement unique et stable.
 */
export function computeAutoBadgeNumber(userId: number): string {
  return `BADGE-${formatCcigaId(userId).slice(-6)}`;
}

/**
 * Un badge est complet dès que la personne a une classe/filière/programme
 * assigné (le champ "Classe / Fonction" imprimé sur le badge). La photo et
 * l'année académique active restent optionnelles — déjà gérées par un
 * repli "À COMPLÉTER" directement sur le PDF (lib/pdf/BadgeDocument.tsx),
 * sans jamais bloquer la génération du badge lui-même.
 */
function computeStatus(programId: string | null): string {
  return programId ? "actif" : BADGE_STATUS_A_FINALISER;
}

/**
 * Point d'entrée unique et idempotent pour la génération automatique de
 * badge — appelé après chaque inscription validée (création directe d'un
 * compte élève/apprenant/étudiant, ou approbation d'une candidature), et
 * réutilisable pour la génération en masse. Ne crée jamais un second badge
 * pour la même personne (Badge.userId est unique) ; si un badge existe déjà,
 * réconcilie seulement son statut (ex. "a_finaliser" -> "actif" dès qu'une
 * classe est assignée), sans jamais changer son numéro ni son ID.
 */
export async function ensureBadgeForUser(userId: number, actorId: number | null) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { program: true } });
  if (!user) return null;
  const roles = parseRoles(user.roles);
  // Portée de cette mission : élèves/apprenants/étudiants inscrits — pas le
  // personnel, dont le badge reste une action manuelle distincte (BadgeManager).
  if (!hasRole(roles, "STUDENT")) return null;

  // Phase C3 (2026-09-08) : l'institution du badge est celle du programme de
  // l'élève (source directe et non ambiguë) — pas celle de l'admin qui
  // déclenche la génération automatique (ex. après approbation d'une
  // candidature), qui peut être sans rapport. Reste NULL si le programme
  // n'est pas encore rattaché à une école, ou si l'élève n'a pas encore de
  // programme — jamais de valeur devinée (même principe que Phase C2).
  const school = user.program?.school ?? null;

  const targetStatus = computeStatus(user.programId);
  const existing = await prisma.badge.findUnique({ where: { userId } });

  if (existing) {
    // Ne jamais rétrograder un badge déjà "perdu"/"remplacé"/"inactif" décidé
    // manuellement par l'administration — seule la bascule automatique
    // actif <-> a_finaliser est reconciliée ici. L'institution, une fois
    // connue, n'est jamais réécrite silencieusement par cette réconciliation
    // (seul un arbitrage explicite — hors périmètre C3 — la changerait).
    if (
      (existing.status === "actif" || existing.status === BADGE_STATUS_A_FINALISER) &&
      existing.status !== targetStatus
    ) {
      const updated = await prisma.badge.update({ where: { id: existing.id }, data: { status: targetStatus } });
      await writeAuditLog({
        entityType: "Badge",
        entityId: existing.id,
        action: "status_auto_reconcile",
        actorId,
        before: { status: existing.status },
        after: { status: targetStatus },
      });
      return updated;
    }
    return existing;
  }

  const badgeNumber = computeAutoBadgeNumber(userId);
  const badge = await prisma.badge.create({
    data: { userId, badgeNumber, status: targetStatus, issuedById: actorId ?? undefined, school },
  });
  await writeAuditLog({
    entityType: "Badge",
    entityId: badge.id,
    action: "auto_create",
    actorId,
    after: badge,
  });
  return badge;
}
