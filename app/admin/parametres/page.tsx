import { requireSuperAdminSession } from "@/lib/auth";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

// Mandat "Audit global boutons de retour" : "Paramètres" est dans le menu
// Administration depuis longtemps (components/AdminNav.tsx), mais
// app/admin/parametres/ n'a jamais eu de page.tsx — route orpheline, même
// symptôme que /admin/recherche et /admin/audit. Aucun réglage global
// concret n'a été spécifié à ce jour (contrairement au journal d'audit, qui
// s'appuyait sur AuditLog déjà en place) : plutôt que d'inventer des
// options non demandées, cette page suit la même convention honnête que
// "Modules complémentaires" (AdminCommandCenter) — la route existe et
// s'affiche correctement, chaque réglage annoncé reste marqué "À
// COMPLÉTER" tant qu'il n'est pas explicitement spécifié et construit.
export default async function AdminParametresPage() {
  const session = await requireSuperAdminSession();
  if (!session) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Administration" title="Paramètres" />
        <AdminCard>
          <p className="text-sm text-muted">Accès réservé au Super Administrateur.</p>
        </AdminCard>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Administration" title="Paramètres" />

      <AdminCard title="Réglages globaux" icon={ClipboardIcon}>
        <p className="mb-4 text-sm text-muted">
          Cette section est réservée aux réglages globaux de CCIGA App. Aucun réglage n&apos;a encore été
          spécifié — rien n&apos;est donc inventé ici tant qu&apos;une demande précise n&apos;a pas été validée.
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between gap-2">
            <span className="text-foreground">Coordonnées et informations institutionnelles</span>
            <span className="badge badge-neutral border border-border">À COMPLÉTER</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="text-foreground">Rôles et permissions avancées</span>
            <span className="badge badge-neutral border border-border">À COMPLÉTER</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="text-foreground">Préférences de notifications</span>
            <span className="badge badge-neutral border border-border">À COMPLÉTER</span>
          </li>
        </ul>
      </AdminCard>
    </AdminShell>
  );
}
