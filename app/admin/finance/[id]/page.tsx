import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import RecordPaymentForm from "@/components/RecordPaymentForm";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function StudentFinancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studentId = Number(id);
  if (!Number.isInteger(studentId)) notFound();

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: { program: true },
  });
  if (!student) notFound();

  const payments = await prisma.payment.findMany({
    where: { studentId },
    orderBy: { paidAt: "desc" },
  });

  const paid = payments.reduce((sum, p) => sum + p.amount, 0);
  const fee = student.program?.tuitionFee ?? 0;
  const balance = fee - paid;

  return (
    <div>
      <BackButton fallbackHref="/admin/finance" label="Toutes les finances" />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-muted">{formatCcigaId(student.id)}</p>
          <h1 className="text-2xl font-bold text-foreground">{student.name}</h1>
          <p className="text-sm text-muted">{student.program?.name ?? "Aucun programme associé"}</p>
        </div>
        <a
          href={`/api/admin/carnet-paiement/${student.id}/pdf`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary text-xs"
        >
          Carnet de paiement — Voir / PDF
        </a>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Frais" value={formatHTG(fee)} />
            <StatCard label="Payé" value={formatHTG(paid)} />
            <StatCard
              label="Solde"
              value={formatHTG(balance)}
              tone={balance > 0 ? "text-red-600" : "text-emerald-600"}
            />
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-4 font-semibold text-foreground">Historique des paiements</h2>
            {payments.length === 0 ? (
              <p className="text-sm text-muted">Aucun paiement enregistré.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {payments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{formatHTG(p.amount)}</p>
                      {p.note && <p className="text-muted">{p.note}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted">{formatDate(p.paidAt)}</span>
                      <a
                        href={`/api/admin/finance/${student.id}/payments/${p.id}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary text-xs"
                      >
                        Voir / PDF
                      </a>
                      <a
                        href={`/api/admin/finance/${student.id}/payments/${p.id}/pdf`}
                        download
                        className="btn-secondary text-xs"
                      >
                        Imprimer
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <RecordPaymentForm studentId={student.id} />
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-lg font-bold ${tone ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}
