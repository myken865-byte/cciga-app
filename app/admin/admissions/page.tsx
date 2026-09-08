import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import BackToPortalsButton from "@/components/BackToPortalsButton";
import { getSchoolBySlug, getPrograms } from "@/lib/content";
import {
  admissionStatuses,
  admissionStatusLabels,
  admissionStatusStyles,
  isAdmissionStatus,
} from "@/lib/admission-status";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { ClipboardIcon } from "@/components/icons";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

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

export default async function AdmissionsListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  // Phase C3 (2026-09-08) : "SUPERVISION INSTITUTIONNELLE" reste un module de
  // supervision — la vue globale ("toutes") reste disponible (réservée
  // SUPER_ADMIN, école déjà affichée par ligne, cf. colonne "École /
  // Programme"), mais une institution spécifique ne voit plus que ses
  // propres candidatures (même principe que Finance).
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool === null) redirect("/admin/institution");
  const scopeSchool = activeSchool !== "toutes" ? activeSchool : null;

  const { status } = await searchParams;
  const filter = status && isAdmissionStatus(status) ? status : undefined;

  const [submissions, programs] = await Promise.all([
    prisma.admissionSubmission.findMany({
      where: {
        ...(filter ? { status: filter } : {}),
        ...(scopeSchool ? { school: scopeSchool } : {}),
      },
      orderBy: { submittedAt: "desc" },
    }),
    getPrograms(),
  ]);
  const programsBySlug = new Map(programs.map((p) => [p.slug, p]));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <BackToPortalsButton className="mb-4" />
      <AdminTitleBand
        eyebrow="CCIGA — Supervision institutionnelle"
        title="Candidatures"
        trailing={<span className="text-sm text-white/80">{submissions.length} dossier(s)</span>}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/admin/admissions"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            !filter ? "bg-primary text-white" : "bg-surface text-muted border border-border"
          }`}
        >
          Tous
        </Link>
        {admissionStatuses.map((s) => (
          <Link
            key={s}
            href={`/admin/admissions?status=${s}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === s ? "bg-primary text-white" : "bg-surface text-muted border border-border"
            }`}
          >
            {admissionStatusLabels[s]}
          </Link>
        ))}
      </div>

      <AdminCard icon={ClipboardIcon} title="Dossiers de candidature">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Référence</th>
              <th className="px-4 py-3 font-semibold">Candidat</th>
              <th className="px-4 py-3 font-semibold">École / Programme</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Soumis le</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => {
              const school = getSchoolBySlug(s.school);
              const program = programsBySlug.get(s.programSlug);
              const statusKey = isAdmissionStatus(s.status) ? s.status : "nouveau";
              return (
                <tr key={s.id} className="border-t border-row-divider">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/admissions/${s.id}`}
                      className="font-mono font-medium text-primary hover:underline"
                    >
                      {s.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {school?.name ?? s.school} — {program?.name ?? s.programSlug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${admissionStatusStyles[statusKey]}`}
                    >
                      {admissionStatusLabels[statusKey]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(s.submittedAt)}</td>
                </tr>
              );
            })}
            {submissions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Aucune candidature pour ce filtre.
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
