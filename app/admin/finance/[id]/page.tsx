import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import RecordPaymentForm from "@/components/RecordPaymentForm";
import VoidPaymentButton from "@/components/VoidPaymentButton";
import { AdminShell, AdminTitleBand, AdminCard, AdminStatTile } from "@/components/AdminPremium";
import { ClipboardIcon, WalletIcon, AlertIcon, ClockIcon } from "@/components/icons";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

const VOID_PREFIX = "VOID:";

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

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) notFound();

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: { program: true },
  });
  if (!student) notFound();
  // Non-croisement (Phase C3) : même filtre que la liste (app/admin/finance/page.tsx)
  // — un accès direct par ID à un autre dossier institutionnel, ou à un élève
  // sans programme rattaché, est refusé hors vue globale.
  if (activeSchool !== "toutes" && student.program?.school !== activeSchool) notFound();

  const payments = await prisma.payment.findMany({
    where: { studentId },
    orderBy: { paidAt: "desc" },
  });

  const paid = payments.reduce((sum, p) => sum + p.amount, 0);
  const fee = student.program?.tuitionFee ?? 0;
  const balance = fee - paid;

  const session = await getSession();
  const canVoid = !!session && hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN"]);
  const voidedOriginalIds = new Set(
    payments
      .map((p) => p.providerReference)
      .filter((ref): ref is string => !!ref?.startsWith(VOID_PREFIX))
      .map((ref) => ref.slice(VOID_PREFIX.length)),
  );

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/finance" label="Toutes les finances" />

      <AdminTitleBand
        eyebrow="CCIGA — Finances étudiantes"
        title={student.name}
        trailing={
          <a
            href={`/api/admin/carnet-paiement/${student.id}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-xs"
          >
            Carnet de paiement — Voir / PDF
          </a>
        }
      />
      <p className="mb-6 -mt-4 text-sm text-muted">
        <span className="font-mono">{formatCcigaId(student.id)}</span> · {student.program?.name ?? "Aucun programme associé"}
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            <AdminStatTile icon={ClipboardIcon} label="Frais" value={formatHTG(fee)} />
            <AdminStatTile icon={WalletIcon} label="Payé" value={formatHTG(paid)} tone="success" />
            <AdminStatTile
              icon={AlertIcon}
              label="Solde"
              value={formatHTG(balance)}
              tone={balance > 0 ? "danger" : "success"}
            />
          </div>

          <AdminCard title="Historique des paiements" icon={ClockIcon}>
            {payments.length === 0 ? (
              <p className="text-sm text-muted">Aucun paiement enregistré.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {payments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border-b border-row-divider pb-2 last:border-0">
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
                      {canVoid &&
                        p.amount > 0 &&
                        !p.providerReference?.startsWith(VOID_PREFIX) &&
                        !voidedOriginalIds.has(p.id) && (
                          <VoidPaymentButton studentId={student.id} paymentId={p.id} />
                        )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>
        </div>

        <RecordPaymentForm studentId={student.id} />
      </div>
    </AdminShell>
  );
}
