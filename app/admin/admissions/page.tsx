import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import BackToPortalsButton from "@/components/BackToPortalsButton";
import { getSchoolBySlug, getPrograms } from "@/lib/content";
import { admissionStatuses, admissionStatusLabels, isAdmissionStatus } from "@/lib/admission-status";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { ClipboardIcon } from "@/components/icons";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import AdmissionsTable from "@/components/admin/AdmissionsTable";

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
  const rows = submissions.map((s) => {
    const school = getSchoolBySlug(s.school);
    const program = programsBySlug.get(s.programSlug);
    const statusKey = isAdmissionStatus(s.status) ? s.status : ("nouveau" as const);
    return { ...s, schoolName: school?.name ?? s.school, programName: program?.name ?? s.programSlug, statusKey };
  });

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
        <AdmissionsTable
          rows={rows.map((s) => ({
            id: s.id,
            reference: s.reference,
            firstName: s.firstName,
            lastName: s.lastName,
            schoolName: s.schoolName,
            programName: s.programName,
            statusKey: s.statusKey,
            submittedAtLabel: formatDate(s.submittedAt),
          }))}
        />
      </AdminCard>
    </AdminShell>
  );
}
