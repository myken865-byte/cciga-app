/**
 * Mission "Finalisation portail Parent" (2026-09-12) — historique de
 * paiements en lecture seule, alimenté par lib/portal/learnerData.ts
 * (finance.recentPayments). Chaque reçu passe par la route PDF sécurisée
 * existante (jamais un lien direct vers un stockage brut).
 */
const statusLabel: Record<string, string> = {
  paye: "Payé",
  en_attente: "En attente",
  echoue: "Échoué",
  rembourse: "Remboursé",
};

export default function PaymentsTable({
  payments,
}: {
  payments: {
    id: string;
    dateLabel: string;
    amountLabel: string;
    provider: string;
    providerReference: string | null;
    status: string;
    receiptHref: string;
  }[];
}) {
  if (payments.length === 0) {
    return <p className="empty-state">Aucun paiement enregistré pour le moment.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-row-divider text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Montant</th>
            <th className="px-3 py-2">Méthode</th>
            <th className="px-3 py-2">Statut</th>
            <th className="px-3 py-2">Reçu</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b border-row-divider last:border-0">
              <td className="px-3 py-2 text-muted">{p.dateLabel}</td>
              <td className="px-3 py-2 font-medium text-foreground">{p.amountLabel}</td>
              <td className="px-3 py-2 text-muted">
                {p.provider}
                {p.providerReference ? ` · ${p.providerReference}` : ""}
              </td>
              <td className="px-3 py-2">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  {statusLabel[p.status] ?? p.status}
                </span>
              </td>
              <td className="px-3 py-2">
                <a href={p.receiptHref} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Voir le reçu →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
