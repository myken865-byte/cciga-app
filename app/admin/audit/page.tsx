import { prisma } from "@/lib/db";
import { requireSuperAdminSession } from "@/lib/auth";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

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
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Identifiant</th>
                <th className="px-4 py-3 font-semibold">Action</th>
                <th className="px-4 py-3 font-semibold">Par</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-row-divider">
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{formatDateTime(log.createdAt)}</td>
                  <td className="px-4 py-3 text-foreground">{log.entityType}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{log.entityId}</td>
                  <td className="px-4 py-3 text-muted">{log.action}</td>
                  <td className="px-4 py-3 text-muted">{log.actor?.name ?? "—"}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    Aucune action enregistrée pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </AdminShell>
  );
}
