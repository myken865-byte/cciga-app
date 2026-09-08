import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import { getActiveSchoolOrAll, schoolLabels, type SchoolKey } from "@/lib/institutionContext";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { WalletIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage({
  searchParams,
}: {
  searchParams: Promise<{ impayes?: string }>;
}) {
  // Mandat "Mise en état opérationnel" (2026-09-06) : séparation stricte par
  // institution active — les finances ne mélangent plus les trois écoles.
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool === null) redirect("/admin/institution");
  const scopeSchool = activeSchool !== "toutes" ? activeSchool : null;

  const { impayes } = await searchParams;
  const onlyUnpaid = impayes === "1";

  const [users, paymentSums] = await Promise.all([
    prisma.user.findMany({
      where: scopeSchool ? { program: { school: scopeSchool } } : undefined,
      include: { program: true },
      orderBy: { id: "desc" },
    }),
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
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — Finances étudiantes"
        title="Finances étudiantes"
        trailing={
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
        }
      />

      <AdminCard title="Étudiants" icon={WalletIcon}>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">CCIGA ID</th>
              <th className="px-4 py-3 font-semibold">Étudiant</th>
              <th className="px-4 py-3 font-semibold">École</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Frais</th>
              <th className="px-4 py-3 font-semibold">Payé</th>
              <th className="px-4 py-3 font-semibold">Solde</th>
              <th className="px-4 py-3 font-semibold">Carnet</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-row-divider">
                <td className="px-4 py-3 font-mono text-primary">
                  <Link href={`/admin/finance/${s.id}`} className="hover:underline">
                    {formatCcigaId(s.id)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-muted">
                  {s.program ? schoolLabels[s.program.school as SchoolKey] ?? s.program.school : "—"}
                </td>
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
                <td className="px-4 py-3">
                  <a
                    href={`/api/admin/carnet-paiement/${s.id}/pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs"
                  >
                    Voir / PDF
                  </a>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted">
                  Aucun étudiant pour ce filtre.
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
