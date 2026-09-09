import { prisma } from "@/lib/db";
import { requireSuperAdminSession } from "@/lib/auth";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import AuditLogTable from "@/components/admin/AuditLogTable";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

// Mandat "Audit global boutons de retour" : "Journal d'audit" est dans le
// menu Administration depuis longtemps (components/AdminNav.tsx), mais
// app/admin/audit/ n'a jamais eu de page.tsx — route orpheline, même
// symptôme que /admin/recherche. Vue globale (toutes institutions/entités)
// du même AuditLog déjà utilisé partout dans l'app (writeAuditLog) — les
// vues par institution (ex. Structure académique — Université) montrent
// déjà un sous-ensemble filtré ; celle-ci est la vue d'ensemble réservée au
// Super Administrateur.
const MAX_ENTRIES = 200;

export default async function AdminAuditPage() {
  const session = await requireSuperAdminSession();
  if (!session) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Administration" title="Journal d'audit" />
        <AdminCard>
          <p className="text-sm text-muted">Accès réservé au Super Administrateur.</p>
        </AdminCard>
      </AdminShell>
    );
  }

  const logs = await prisma.auditLog.findMany({
    include: { actor: true },
    orderBy: { createdAt: "desc" },
    take: MAX_ENTRIES,
  });

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Administration" title="Journal d'audit" />

      <AdminCard title={`Dernières actions (${logs.length}${logs.length === MAX_ENTRIES ? "+" : ""})`} icon={ClipboardIcon}>
        <AuditLogTable
          logs={logs.map((log) => ({
            id: log.id,
            createdAt: formatDateTime(log.createdAt),
            entityType: log.entityType,
            entityId: log.entityId,
            action: log.action,
            actorName: log.actor?.name ?? null,
          }))}
        />
      </AdminCard>
    </AdminShell>
  );
}
