import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLearnerPortalContext } from "@/lib/portal/learnerData";
import { formatHTG } from "@/lib/currency";
import ChildSwitcher from "@/components/portal/ChildSwitcher";
import PaymentsTable from "@/components/portal/PaymentsTable";
import BackButton from "@/components/BackButton";
import ParentPortalBanner from "@/components/portal/ParentPortalBanner";
import ParentNavPills from "@/components/portal/ParentNavPills";
import { getParentPortalTheme } from "@/lib/parentPortalTheme";
import type { SchoolKey } from "@/lib/institutions";

export const metadata: Metadata = { title: "Finance" };
export const dynamic = "force-dynamic";

// Mandat "Finalisation portail Parent" (2026-09-12) — réutilise exactement
// l'agrégateur du portail élève/étudiant (lib/portal/learnerData.ts), déjà
// paramétré par un userId arbitraire : aucune deuxième logique Finance, on
// se contente de l'appeler pour l'enfant sélectionné plutôt que pour la
// session courante. La vérification "cet enfant appartient bien à ce
// parent" a lieu ICI, avant l'appel — getLearnerPortalContext lui-même ne
// fait aucun contrôle d'accès (comme app/admin/dossier/[id]/page.tsx).
export default async function ParentFinancePage({
  searchParams,
}: {
  searchParams: Promise<{ enfant?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const children = await prisma.user.findMany({
    where: { parentId: session.userId },
    orderBy: { name: "asc" },
  });

  if (children.length === 0) {
    return (
      <div>
        <BackButton fallbackHref="/portail/parent" />
        <h1 className="mb-6 text-2xl font-bold text-foreground">Finance</h1>
        <p className="empty-state">Aucun enfant lié à votre compte pour le moment.</p>
      </div>
    );
  }

  const { enfant } = await searchParams;
  const requestedId = enfant ? Number(enfant) : null;
  const selected = (requestedId && children.find((c) => c.id === requestedId)) || children[0];

  const ctx = await getLearnerPortalContext(selected.id);
  if (!ctx) notFound();
  const { finance } = ctx;
  const theme = getParentPortalTheme((ctx.user.program?.school as SchoolKey | undefined) ?? null, ctx.user.program?.niveau ?? null);

  return (
    <div>
      <BackButton fallbackHref="/portail/parent" />
      <ParentPortalBanner theme={theme} childName={selected.name} />
      <ParentNavPills active="dashboard" childId={selected.id} />
      <h1 className="mb-2 text-2xl font-bold text-foreground">{theme.moduleLabels.finance}</h1>
      <p className="mb-6 text-sm text-muted">Situation financière de {selected.name}.</p>

      <ChildSwitcher kids={children.map((c) => ({ id: c.id, name: c.name }))} selectedId={selected.id} basePath="/portail/parent/finance" />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Frais prévus</p>
          <p className="mt-1 text-xl font-bold text-foreground">{formatHTG(finance.fee)}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Montant payé</p>
          <p className="mt-1 text-xl font-bold text-emerald-600">{formatHTG(finance.paid)}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Solde restant</p>
          <p className={`mt-1 text-xl font-bold ${finance.balance > 0 ? "text-red-600" : "text-emerald-600"}`}>
            {formatHTG(Math.max(finance.balance, 0))}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <a href={`/api/admin/carnet-paiement/${selected.id}/pdf`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          🧾 Carnet de paiement (PDF)
        </a>
      </div>

      <div className="card p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">Historique des paiements</h2>
        <PaymentsTable
          payments={finance.recentPayments.map((p) => ({
            id: p.id,
            dateLabel: p.paidAt.toLocaleDateString("fr-FR"),
            amountLabel: formatHTG(p.amount),
            provider: p.provider,
            providerReference: p.providerReference,
            status: p.status,
            receiptHref: `/api/admin/finance/${selected.id}/payments/${p.id}/pdf`,
          }))}
        />
      </div>
    </div>
  );
}
