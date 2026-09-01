import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import { getSchools } from "@/lib/content";

export const dynamic = "force-dynamic";

function startOfMonth(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" });
}

export default async function AdminFinancePage({
  searchParams,
}: {
  searchParams: Promise<{ impayes?: string }>;
}) {
  const { impayes } = await searchParams;
  const onlyUnpaid = impayes === "1";
  const schools = getSchools();

  const [users, payments, recentPayments] = await Promise.all([
    prisma.user.findMany({ include: { program: true }, orderBy: { id: "asc" } }),
    prisma.payment.findMany(),
    prisma.payment.findMany({
      orderBy: { paidAt: "desc" },
      take: 10,
      include: { student: true, recordedBy: true },
    }),
  ]);
  const paidByStudent = new Map<number, number>();
  for (const p of payments) {
    paidByStudent.set(p.studentId, (paidByStudent.get(p.studentId) ?? 0) + p.amount);
  }

  let students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => {
      const paid = paidByStudent.get(u.id) ?? 0;
      const fee = u.program?.tuitionFee ?? 0;
      return { ...u, paid, fee, balance: fee - paid };
    });

  const totalExpected = students.reduce((sum, s) => sum + s.fee, 0);
  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstandingBalance = students.reduce((sum, s) => sum + Math.max(s.balance, 0), 0);
  const recoveryRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : null;
  const overdueCount = students.filter((s) => s.balance > 0).length;
  const monthStart = startOfMonth();
  const collectedThisMonth = payments
    .filter((p) => p.paidAt >= monthStart)
    .reduce((sum, p) => sum + p.amount, 0);

  const schoolBreakdown = schools.map((school) => {
    const schoolStudents = students.filter((s) => s.program?.school === school.slug);
    const expected = schoolStudents.reduce((sum, s) => sum + s.fee, 0);
    const collected = schoolStudents.reduce((sum, s) => sum + s.paid, 0);
    return {
      school,
      studentCount: schoolStudents.length,
      expected,
      collected,
      balance: Math.max(expected - collected, 0),
    };
  });

  if (onlyUnpaid) {
    students = students.filter((s) => s.balance > 0);
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Tableau de bord Finances</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total encaissé" value={formatHTG(totalCollected)} />
        <StatCard label="Total attendu" value={formatHTG(totalExpected)} />
        <StatCard
          label="Solde impayé"
          value={formatHTG(outstandingBalance)}
          tone={outstandingBalance > 0 ? "text-red-600" : "text-emerald-600"}
        />
        <StatCard
          label="Taux de recouvrement"
          value={recoveryRate === null ? "—" : `${recoveryRate}%`}
        />
        <StatCard label="Encaissé ce mois-ci" value={formatHTG(collectedThisMonth)} />
        <StatCard
          label="Étudiants en retard"
          value={String(overdueCount)}
          tone={overdueCount > 0 ? "text-red-600" : "text-emerald-600"}
        />
      </div>

      <div className="mb-8 overflow-x-auto rounded-lg border border-border bg-surface">
        <h2 className="border-b border-border px-4 py-3 font-semibold text-foreground">
          Répartition par école
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">École</th>
              <th className="px-4 py-3 font-semibold">Étudiants</th>
              <th className="px-4 py-3 font-semibold">Attendu</th>
              <th className="px-4 py-3 font-semibold">Encaissé</th>
              <th className="px-4 py-3 font-semibold">Solde impayé</th>
            </tr>
          </thead>
          <tbody>
            {schoolBreakdown.map((row) => (
              <tr key={row.school.slug} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{row.school.name}</td>
                <td className="px-4 py-3 text-muted">{row.studentCount}</td>
                <td className="px-4 py-3 text-muted">{formatHTG(row.expected)}</td>
                <td className="px-4 py-3 text-muted">{formatHTG(row.collected)}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    row.balance > 0 ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  {formatHTG(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8 overflow-x-auto rounded-lg border border-border bg-surface">
        <h2 className="border-b border-border px-4 py-3 font-semibold text-foreground">
          Paiements récents
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Étudiant</th>
              <th className="px-4 py-3 font-semibold">Montant</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Enregistré par</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">
                  <Link href={`/admin/finance/${p.studentId}`} className="text-primary hover:underline">
                    {p.student.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{formatHTG(p.amount)}</td>
                <td className="px-4 py-3 text-muted">{formatDate(p.paidAt)}</td>
                <td className="px-4 py-3 text-muted">{p.recordedBy?.name ?? "—"}</td>
              </tr>
            ))}
            {recentPayments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  Aucun paiement enregistré pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Suivi par étudiant</h2>
        <div className="flex gap-2 text-xs font-semibold">
          <Link
            href="/admin/finance"
            className={`rounded-full px-3 py-1.5 ${
              !onlyUnpaid ? "bg-primary text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            Tous
          </Link>
          <Link
            href="/admin/finance?impayes=1"
            className={`rounded-full px-3 py-1.5 ${
              onlyUnpaid ? "bg-primary text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            Solde impayé
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">CCIGA ID</th>
              <th className="px-4 py-3 font-semibold">Étudiant</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Frais</th>
              <th className="px-4 py-3 font-semibold">Payé</th>
              <th className="px-4 py-3 font-semibold">Solde</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-primary">
                  <Link href={`/admin/finance/${s.id}`} className="hover:underline">
                    {formatCcigaId(s.id)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-muted">{s.program?.name ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{formatHTG(s.fee)}</td>
                <td className="px-4 py-3 text-muted">{formatHTG(s.paid)}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    s.balance > 0 ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  {formatHTG(s.balance)}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Aucun étudiant pour ce filtre.
                </td>
              </tr>
            )}
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
