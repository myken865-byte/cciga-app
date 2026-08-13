import { prisma } from "@/lib/db";
import { getSchools } from "@/lib/content";
import { parseRoles, hasRole } from "@/lib/roles";
import { admissionStatusLabels, admissionStatuses } from "@/lib/admission-status";
import { formatHTG } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const schools = getSchools();

  const [users, programs, admissionCounts, revenue, paymentSums] = await Promise.all([
    prisma.user.findMany({ include: { program: true } }),
    prisma.program.findMany(),
    prisma.admissionSubmission.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.payment.groupBy({ by: ["studentId"], _sum: { amount: true } }),
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

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Tableau de bord</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Étudiants" value={String(students.length)} />
        <StatCard label="Candidatures" value={String(totalAdmissions)} />
        <StatCard label="Programmes" value={String(programs.length)} />
        <StatCard label="Comptes CCIGA ID" value={String(users.length)} />
        <StatCard label="Revenus perçus" value={formatHTG(revenue._sum.amount ?? 0)} />
        <StatCard
          label="Solde impayé"
          value={formatHTG(outstandingBalance)}
          tone={outstandingBalance > 0 ? "text-red-600" : "text-emerald-600"}
        />
      </div>

      <div className="mb-8 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-4 font-semibold text-foreground">Candidatures par statut</h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {admissionStatuses.map((status) => (
            <div key={status} className="rounded-md bg-background p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {admissionCountByStatus.get(status) ?? 0}
              </p>
              <p className="text-xs text-muted">{admissionStatusLabels[status]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
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
              <tr key={row.school.slug} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{row.school.name}</td>
                <td className="px-4 py-3 text-muted">{row.programCount}</td>
                <td className="px-4 py-3 text-muted">{row.studentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}
