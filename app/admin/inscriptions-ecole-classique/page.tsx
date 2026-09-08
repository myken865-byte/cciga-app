import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";
import {
  enrollmentFormStatuses,
  enrollmentFormStatusLabels,
  enrollmentFormStatusStyles,
  isEnrollmentFormStatus,
} from "@/lib/enrollmentFormStatus";
import { niveauLabels, type Niveau } from "@/lib/niveaux";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" });
}

export default async function InscriptionsEcoleClassiquePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  // Mandat "Mise en état opérationnel" (2026-09-06) : ClassicEnrollmentForm
  // n'a pas de champ school — c'est un modèle exclusivement École Classique
  // par construction du schéma. Le risque n'est donc pas un mélange entre
  // écoles (impossible ici) mais une fuite de contexte : cette liste ne doit
  // apparaître que lorsque l'École Classique (ou la vue globale "toutes",
  // réservée SUPER_ADMIN) est le contexte actif — comme partout ailleurs.
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool !== "ecole-classique" && activeSchool !== "toutes") {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — École Classique" title="Fiches d'inscription — École Classique" />
        <AdminCard>
          <p className="text-sm text-muted">
            Sélectionnez l&apos;institution École Classique pour accéder à ces fiches.
          </p>
        </AdminCard>
      </AdminShell>
    );
  }

  const { status, q } = await searchParams;
  const statusFilter = status && isEnrollmentFormStatus(status) ? status : null;
  const qTrim = q?.trim() ?? "";
  // Recherche par référence (item 1) : la référence affichée est dérivée de
  // l'id (voir lib/classicEnrollmentFormReference.ts), jamais stockée
  // séparément — on retrouve donc la fiche en cherchant les caractères
  // alphanumériques saisis à l'intérieur de l'id lui-même.
  const cleanedRef = qTrim.toLowerCase().replace(/[^a-z0-9]/g, "");

  const forms = await prisma.classicEnrollmentForm.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(qTrim
        ? {
            OR: [
              { lastName: { contains: qTrim } },
              { firstName: { contains: qTrim } },
              ...(cleanedRef.length >= 4 ? [{ id: { contains: cleanedRef } }] : []),
            ],
          }
        : {}),
    },
    include: { program: true },
    orderBy: { updatedAt: "desc" },
    take: 200,
  });

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — École Classique"
        title="Fiches d'inscription — École Classique"
        trailing={
          <div className="flex gap-2">
            <Link href="/admin/inscriptions-ecole-classique/eleves" className="btn-secondary text-sm">
              Élèves inscrits
            </Link>
            <Link href="/admin/inscriptions-ecole-classique/nouvelle" className="btn-primary text-sm">
              + Nouvelle fiche
            </Link>
          </div>
        }
      />

      <form method="get" className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          name="q"
          defaultValue={qTrim}
          placeholder="Rechercher par nom ou référence…"
          className="input max-w-xs"
        />
        <select name="status" defaultValue={statusFilter ?? ""} className="input max-w-xs">
          <option value="">Tous les statuts</option>
          {enrollmentFormStatuses.map((s) => (
            <option key={s} value={s}>
              {enrollmentFormStatusLabels[s]}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-secondary text-sm">
          Filtrer
        </button>
      </form>

      <AdminCard icon={ClipboardIcon} title="Fiches enregistrées">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Référence</th>
              <th className="px-4 py-3 font-semibold">Nom</th>
              <th className="px-4 py-3 font-semibold">Prénom</th>
              <th className="px-4 py-3 font-semibold">Classe</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Mise à jour</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {forms.map((f) => {
              const statusKey = isEnrollmentFormStatus(f.status) ? f.status : "brouillon";
              const classLabel =
                f.program?.name ?? (f.schoolLevel ? (niveauLabels[f.schoolLevel as Niveau] ?? f.schoolLevel) : "—");
              return (
                <tr key={f.id} className="border-t border-row-divider">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{formatClassicEnrollmentFormReference(f.id)}</td>
                  <td className="px-4 py-3 text-foreground">{f.lastName || "—"}</td>
                  <td className="px-4 py-3 text-foreground">{f.firstName || "—"}</td>
                  <td className="px-4 py-3 text-muted">{classLabel}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${enrollmentFormStatusStyles[statusKey]}`}>
                      {enrollmentFormStatusLabels[statusKey]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(f.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/inscriptions-ecole-classique/${f.id}`} className="text-primary hover:underline">
                      Ouvrir →
                    </Link>
                  </td>
                </tr>
              );
            })}
            {forms.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  Aucune fiche pour le moment.
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
