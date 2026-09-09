import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { getActiveSchoolOrAll, schoolLabels, type SchoolKey } from "@/lib/institutionContext";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { WalletIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import FinanceTable from "@/components/admin/FinanceTable";

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
        <FinanceTable
          students={students.map((s) => ({
            id: s.id,
            name: s.name,
            paid: s.paid,
            fee: s.fee,
            balance: s.balance,
            program: s.program ? { name: s.program.name, school: s.program.school } : null,
            schoolLabel: s.program ? schoolLabels[s.program.school as SchoolKey] ?? s.program.school : null,
          }))}
        />
      </AdminCard>
    </AdminShell>
  );
}
