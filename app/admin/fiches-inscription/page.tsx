import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatEnrollmentFormReference } from "@/lib/enrollmentFormReference";
import { normalizeEnrollmentSearchQuery } from "@/lib/enrollmentReferenceSearch";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import {
  enrollmentFormStatuses,
  enrollmentFormStatusLabels,
  enrollmentFormStatusStyles,
  isEnrollmentFormStatus,
} from "@/lib/enrollmentFormStatus";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function FichesInscriptionListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const filter = status && isEnrollmentFormStatus(status) ? status : undefined;
  const search = (q ?? "").trim();
  const searchNorm = search ? normalizeEnrollmentSearchQuery(search).toUpperCase() : "";

  // Modèle partagé École Professionnelle / Université (voir AdminNav.tsx :
  // ce lien n'apparaît que dans l'un de ces deux contextes) — isolation
  // stricte par institution active, jamais un mélange des deux.
  const activeSchool = await getActiveSchool();
  if (activeSchool !== "ecole-professionnelle" && activeSchool !== "universite") {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Supervision institutionnelle" title="Fiches d'inscription" />
        <div className="empty-state">
          Choisissez École Professionnelle ou Université pour accéder à ses fiches d&apos;inscription.
        </div>
      </AdminShell>
    );
  }

  const forms = await prisma.enrollmentForm.findMany({
    where: { school: activeSchool, status: filter },
    include: { program: true },
    orderBy: { createdAt: "desc" },
  });

  const filtered = searchNorm
    ? forms.filter((f) => {
        const reference = formatEnrollmentFormReference(f.id);
        return (
          f.lastName.toUpperCase().includes(searchNorm) ||
          f.firstName.toUpperCase().includes(searchNorm) ||
          f.id.toUpperCase().includes(searchNorm) ||
          reference.toUpperCase().includes(searchNorm)
        );
      })
    : forms;

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — Supervision institutionnelle"
        title={`Fiches d'inscription — ${schoolLabels[activeSchool]}`}
        trailing={
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/80">{filtered.length} fiche(s)</span>
            <Link href="/admin/fiches-inscription/nouvelle" className="btn-primary text-sm">
              Nouvelle fiche
            </Link>
          </div>
        }
      />

      <form className="mb-6 flex flex-wrap items-center gap-2" action="/admin/fiches-inscription">
        {filter && <input type="hidden" name="status" value={filter} />}
        <input
          type="text"
          name="q"
          defaultValue={search}
          placeholder="Rechercher par nom ou n° de fiche…"
          className="input max-w-xs"
        />
        <button type="submit" className="btn-secondary text-sm">
          Rechercher
        </button>
        {search && (
          <Link
            href={filter ? `/admin/fiches-inscription?status=${filter}` : "/admin/fiches-inscription"}
            className="text-xs text-muted hover:underline"
          >
            Effacer la recherche
          </Link>
        )}
      </form>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={search ? `/admin/fiches-inscription?q=${encodeURIComponent(search)}` : "/admin/fiches-inscription"}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            !filter ? "bg-primary text-white" : "border border-border bg-surface text-muted"
          }`}
        >
          Toutes
        </Link>
        {enrollmentFormStatuses.map((s) => (
          <Link
            key={s}
            href={`/admin/fiches-inscription?status=${s}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === s ? "bg-primary text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            {enrollmentFormStatusLabels[s]}
          </Link>
        ))}
      </div>

      <AdminCard icon={ClipboardIcon} title="Fiches enregistrées">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">N° de fiche</th>
              <th className="px-4 py-3 font-semibold">Candidat</th>
              <th className="px-4 py-3 font-semibold">Formation</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => {
              const statusKey = isEnrollmentFormStatus(f.status) ? f.status : "brouillon";
              return (
                <tr key={f.id} className="border-t border-row-divider">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/fiches-inscription/${f.id}`}
                      className="font-mono font-medium text-primary hover:underline"
                    >
                      {formatEnrollmentFormReference(f.id)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {f.lastName} {f.firstName}
                  </td>
                  <td className="px-4 py-3 text-muted">{f.program?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${enrollmentFormStatusStyles[statusKey]}`}
                    >
                      {enrollmentFormStatusLabels[statusKey]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(f.updatedAt)}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Aucune fiche pour ce filtre.
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
