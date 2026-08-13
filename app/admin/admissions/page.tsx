import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSchoolBySlug, getPrograms } from "@/lib/content";
import {
  admissionStatuses,
  admissionStatusLabels,
  admissionStatusStyles,
  isAdmissionStatus,
} from "@/lib/admission-status";

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
  const { status } = await searchParams;
  const filter = status && isAdmissionStatus(status) ? status : undefined;

  const [submissions, programs] = await Promise.all([
    prisma.admissionSubmission.findMany({
      where: filter ? { status: filter } : undefined,
      orderBy: { submittedAt: "desc" },
    }),
    getPrograms(),
  ]);
  const programsBySlug = new Map(programs.map((p) => [p.slug, p]));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Candidatures</h1>
          <p className="text-sm text-muted">{submissions.length} dossier(s)</p>
        </div>
      </div>

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

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
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
                <tr key={s.id} className="border-t border-border">
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
    </div>
  );
}
