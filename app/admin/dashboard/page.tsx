import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSchools } from "@/lib/content";
import { parseRoles, hasRole } from "@/lib/roles";
import { admissionStatusLabels, admissionStatuses } from "@/lib/admission-status";
import { formatHTG } from "@/lib/currency";
import { niveauList, niveauLabels } from "@/lib/niveaux";
import { UsersIcon, BookIcon, ClipboardIcon, WalletIcon, AlertIcon, DocumentIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import { getActiveSchoolOrAll, schoolLabels, type SchoolKey } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

// Phase C3 (2026-09-08) : ce tableau de bord était le point d'entrée par
// défaut (app/admin/page.tsx, InstitutionPicker) et agrégeait pourtant
// TOUJOURS les trois institutions, quelle que soit celle choisie — une vraie
// fuite pour ADMIN (SUPER_ADMIN seul garde la vue globale via "toutes").
export default async function AdminDashboardPage() {
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool === null) redirect("/admin/institution");
  const scopeSchool: SchoolKey | null = activeSchool !== "toutes" ? activeSchool : null;
  const schools = getSchools().filter((s) => !scopeSchool || s.slug === scopeSchool);

  const [users, programs, admissionCounts, revenue, paymentSums] = await Promise.all([
    prisma.user.findMany({ where: scopeSchool ? { program: { school: scopeSchool } } : undefined, include: { program: true } }),
    prisma.program.findMany({ where: scopeSchool ? { school: scopeSchool } : undefined }),
    prisma.admissionSubmission.groupBy({
      by: ["status"],
      _count: { _all: true },
      where: scopeSchool ? { school: scopeSchool } : undefined,
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: scopeSchool ? { student: { program: { school: scopeSchool } } } : undefined,
    }),
    prisma.payment.groupBy({
      by: ["studentId"],
      _sum: { amount: true },
      where: scopeSchool ? { student: { program: { school: scopeSchool } } } : undefined,
    }),
  ]);

  const students = users.filter((u) => hasRole(parseRoles(u.roles), "STUDENT"));
  const paidByStudent = new Map(paymentSums.map((p) => [p.studentId, p._sum.amount ?? 0]));
  const outstandingBalance = students.reduce((sum, s) => {
    const fee = s.program?.tuitionFee ?? 0;
    const paid = paidByStudent.get(s.id) ?? 0;
    return sum + Math.max(fee - paid, 0);
  }, 0);

  const admissionCountByStatus = new Map(admissionCounts.map((c) => [c.status, c._count._all]));
  const totalAdmissions = admissionCounts.reduce((sum, c) => sum + c._count._all, 0);

  const schoolBreakdown = schools.map((school) => ({
    school,
    programCount: programs.filter((p) => p.school === school.slug).length,
    studentCount: students.filter((s) => s.program?.school === school.slug).length,
  }));

  // "École Classique — Répartition par niveau" reste hors périmètre pour une
  // institution active différente (Phase C3 — non-croisement).
  const showNiveauBreakdown = !scopeSchool || scopeSchool === "ecole-classique";
  const niveauBreakdown = niveauList.map((niveau) => ({
    niveau,
    classCount: programs.filter((p) => p.school === "ecole-classique" && p.niveau === niveau).length,
    studentCount: students.filter((s) => s.program?.school === "ecole-classique" && s.program?.niveau === niveau)
      .length,
  }));

  return (
    <div className="cc-shell">
      <BackButton fallbackHref="/admin/centre-de-commandement" label="Centre de commandement" />
      {/* Bandeau-titre premium — même identité visuelle que le Centre de
      commandement (mandat "Design premium", étendu à cet écran). */}
      <div className="cc-title-band mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-light">
          CCIGA — Statistiques globales
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Tableau de bord{scopeSchool ? ` — ${schoolLabels[scopeSchool]}` : " — Toutes institutions"}
        </h1>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UsersIcon} label="Étudiants" value={String(students.length)} />
        <StatCard icon={ClipboardIcon} label="Candidatures" value={String(totalAdmissions)} />
        <StatCard icon={BookIcon} label="Programmes" value={String(programs.length)} />
        <StatCard icon={DocumentIcon} label="Comptes CCIGA ID" value={String(users.length)} />
        <StatCard icon={WalletIcon} label="Revenus perçus" value={formatHTG(revenue._sum.amount ?? 0)} tone="success" />
        <StatCard
          icon={AlertIcon}
          label="Solde impayé"
          value={formatHTG(outstandingBalance)}
          tone={outstandingBalance > 0 ? "danger" : "success"}
        />
      </div>

      <div className="cc-card mb-6 p-5 sm:p-6">
        <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4 text-primary" /> Candidatures par statut
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {admissionStatuses.map((status) => (
            <div key={status} className="cc-tile p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{admissionCountByStatus.get(status) ?? 0}</p>
              <p className="text-xs text-muted">{admissionStatusLabels[status]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cc-card mb-6 overflow-hidden p-5 sm:p-6">
        <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
          <BookIcon className="h-4 w-4 text-primary" /> Répartition par école
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">École</th>
                <th className="px-4 py-3 font-semibold">Programmes</th>
                <th className="px-4 py-3 font-semibold">Étudiants inscrits</th>
              </tr>
            </thead>
            <tbody>
              {schoolBreakdown.map((row) => (
                <tr key={row.school.slug} className="border-t border-row-divider">
                  <td className="px-4 py-3 font-medium text-foreground">{row.school.name}</td>
                  <td className="px-4 py-3 text-muted">{row.programCount}</td>
                  <td className="px-4 py-3 text-muted">{row.studentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNiveauBreakdown && (
        <div className="cc-card overflow-hidden p-5 sm:p-6">
          <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4 text-primary" /> École Classique — Répartition par niveau
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Niveau</th>
                  <th className="px-4 py-3 font-semibold">Classes</th>
                  <th className="px-4 py-3 font-semibold">Étudiants inscrits</th>
                </tr>
              </thead>
              <tbody>
                {niveauBreakdown.map((row) => (
                  <tr key={row.niveau} className="border-t border-row-divider">
                    <td className="px-4 py-3 font-medium text-foreground">{niveauLabels[row.niveau]}</td>
                    <td className="px-4 py-3 text-muted">{row.classCount}</td>
                    <td className="px-4 py-3 text-muted">{row.studentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const toneColors: Record<string, string> = {
  success: "var(--success)",
  danger: "var(--danger)",
};
const toneText: Record<string, string> = {
  success: "text-success",
  danger: "text-danger",
};

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: (props: { className?: string }) => React.ReactElement;
  label: string;
  value: string;
  tone?: "success" | "danger";
}) {
  return (
    <div className="cc-tile p-3">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="cc-tile-icon"
          style={tone ? { background: `color-mix(in srgb, ${toneColors[tone]} 14%, transparent)`, color: toneColors[tone] } : undefined}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="section-label">{label}</span>
      </div>
      <p className={`text-xl font-bold ${tone ? toneText[tone] : "text-foreground"}`}>{value}</p>
    </div>
  );
}
