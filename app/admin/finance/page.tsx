import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage({
  searchParams,
}: {
  searchParams: Promise<{ impayes?: string }>;
}) {
  const { impayes } = await searchParams;
  const onlyUnpaid = impayes === "1";

  const [users, paymentSums] = await Promise.all([
    prisma.user.findMany({ include: { program: true }, orderBy: { id: "asc" } }),
    prisma.payment.groupBy({ by: ["studentId"], _sum: { amount: true } }),
  ]);
  const paidByStudent = new Map(paymentSums.map((p) => [p.studentId, p._sum.amount ?? 0]));

  let students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => {
      const paid = paidByStudent.get(u.id) ?? 0;
      const fee = u.program?.tuitionFee ?? 0;
      return { ...u, paid, fee, balance: fee - paid };
    });

  if (onlyUnpaid) {
    students = students.filter((s) => s.balance > 0);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Finances étudiantes</h1>
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
