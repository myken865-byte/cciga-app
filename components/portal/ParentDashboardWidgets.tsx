import Link from "next/link";
import { formatHTG } from "@/lib/currency";
import type { ParentPortalTheme } from "@/lib/parentPortalTheme";

/**
 * Mission "Portail Parent — Phase finale UI/UX" (2026-09-13) — composants
 * de présentation purs, alimentés exclusivement par des données déjà
 * récupérées par la page (aucune requête ici, aucune donnée inventée).
 * Regroupés dans un seul fichier pour un moteur commun cohérent — jamais
 * quatre jeux de composants séparés par institution.
 */

export function ParentChildIdentityCard({
  name,
  photoUrl,
  ccigaId,
  programName,
  niveauLabel,
  institutionLabel,
  academicYearLabel,
}: {
  name: string;
  photoUrl: string | null;
  ccigaId: string;
  programName: string | null;
  niveauLabel: string | null;
  institutionLabel: string;
  academicYearLabel: string | null;
}) {
  return (
    <div className="card flex h-full flex-col gap-3 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Mon enfant</p>
      <div className="flex items-center gap-3">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name} className="h-16 w-16 rounded-xl border border-amber-200 object-cover" />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
            {name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-bold text-foreground">{name}</p>
          {niveauLabel && <span className="mt-0.5 inline-block rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-700">{niveauLabel}</span>}
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
        <div>
          <dt className="text-muted">Matricule</dt>
          <dd className="font-mono font-medium text-foreground">{ccigaId}</dd>
        </div>
        <div>
          <dt className="text-muted">Année académique</dt>
          <dd className="font-medium text-foreground">{academicYearLabel ?? "—"}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted">Établissement</dt>
          <dd className="font-medium text-foreground">{institutionLabel}</dd>
        </div>
        {programName && (
          <div className="col-span-2">
            <dt className="text-muted">Programme / filière</dt>
            <dd className="font-medium text-foreground">{programName}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export function ParentWelcomeCard({ theme, childName }: { theme: ParentPortalTheme; childName: string }) {
  return (
    <div className="card flex h-full flex-col justify-center gap-2 p-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Bienvenue</p>
      <h2 className="text-lg font-bold text-foreground">{theme.institutionLabel}</h2>
      <p className="text-sm text-muted">Suivez la scolarité de {childName} depuis cet espace unique.</p>
      <p className="italic text-primary">{theme.tagline}</p>
    </div>
  );
}

export function ParentFinanceSummaryCard({
  fee,
  paid,
  balance,
  financeLabel,
  studentId,
}: {
  fee: number;
  paid: number;
  balance: number;
  financeLabel: string;
  studentId: number;
}) {
  return (
    <div className="card flex h-full flex-col gap-3 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{financeLabel}</p>
      {fee > 0 ? (
        <>
          <div className={`rounded-lg px-3 py-2 text-sm font-semibold ${balance > 0 ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
            {balance > 0 ? `Solde à payer : ${formatHTG(balance)}` : "Compte à jour"}
          </div>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Montant annuel</dt>
              <dd className="font-medium text-foreground">{formatHTG(fee)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Montant payé</dt>
              <dd className="font-medium text-emerald-600">{formatHTG(paid)}</dd>
            </div>
          </dl>
        </>
      ) : (
        <p className="text-sm text-muted">Aucun frais défini pour ce programme.</p>
      )}
      <div className="mt-auto flex flex-col gap-1.5 text-sm">
        <Link href={`/portail/parent/finance?enfant=${studentId}`} className="text-primary hover:underline">
          Voir le détail des paiements →
        </Link>
        <a href={`/api/admin/carnet-paiement/${studentId}/pdf`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
          Carnet de paiement (PDF) →
        </a>
      </div>
    </div>
  );
}

export function ParentRecentDocumentsCard({
  documents,
  studentId,
}: {
  documents: { id: string; label: string; href: string }[];
  studentId: number;
}) {
  return (
    <div className="card flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Documents récents</p>
        <Link href={`/portail/parent/documents?enfant=${studentId}`} className="text-xs text-primary hover:underline">
          Voir tous
        </Link>
      </div>
      {documents.length === 0 ? (
        <p className="text-sm text-muted">Aucun document disponible pour le moment.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {documents.slice(0, 4).map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-2">
              <span className="truncate text-foreground">{d.label}</span>
              <a href={d.href} target="_blank" rel="noreferrer" className="shrink-0 text-xs text-primary hover:underline">
                Voir →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ParentGradesEvolutionCard({
  grades,
  evolutionLabel,
  emptyHint,
}: {
  grades: { id: string; label: string; score: number }[];
  evolutionLabel: string;
  emptyHint: string;
}) {
  return (
    <div className="card flex h-full flex-col gap-3 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{evolutionLabel}</p>
      {grades.length === 0 ? (
        <p className="text-sm text-muted">{emptyHint}</p>
      ) : (
        <ul className="space-y-2.5">
          {grades.slice(0, 5).map((g) => (
            <li key={g.id}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="truncate text-foreground">{g.label}</span>
                <span className="font-semibold text-primary">{g.score}/100</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, g.score))}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ParentAssignmentsPreviewCard({
  assignments,
  devoirsLabel,
  studentId,
}: {
  assignments: { id: string; title: string; courseName: string; dueDateLabel: string | null; status: "remis" | "non_remis" | "en_retard" | "note" }[];
  devoirsLabel: string;
  studentId: number;
}) {
  const statusStyle: Record<string, string> = {
    remis: "bg-blue-100 text-blue-700",
    non_remis: "bg-amber-100 text-amber-700",
    en_retard: "bg-red-100 text-red-700",
    note: "bg-emerald-100 text-emerald-700",
  };
  const statusText: Record<string, string> = {
    remis: "Remis",
    non_remis: "Non remis",
    en_retard: "En retard",
    note: "Corrigé",
  };
  return (
    <div className="card flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{devoirsLabel}</p>
        <Link href={`/portail/parent/devoirs?enfant=${studentId}`} className="text-xs text-primary hover:underline">
          Voir tous
        </Link>
      </div>
      {assignments.length === 0 ? (
        <p className="text-sm text-muted">Aucun devoir publié pour le moment.</p>
      ) : (
        <ul className="space-y-2.5 text-sm">
          {assignments.slice(0, 4).map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{a.title}</p>
                <p className="truncate text-xs text-muted">
                  {a.courseName}
                  {a.dueDateLabel ? ` · Pour le ${a.dueDateLabel}` : ""}
                </p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[a.status]}`}>{statusText[a.status]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ParentAttendanceDonutCard({
  present,
  absent,
  retard,
  presenceLabel,
}: {
  present: number;
  absent: number;
  retard: number;
  presenceLabel: string;
}) {
  const total = present + absent + retard;
  const rate = total > 0 ? Math.round((present / total) * 100) : null;
  const circumference = 2 * Math.PI * 40;
  const presentDash = total > 0 ? (present / total) * circumference : 0;

  return (
    <div className="card flex h-full flex-col items-center gap-3 p-5">
      <p className="self-start text-xs font-semibold uppercase tracking-widest text-accent">{presenceLabel}</p>
      {total === 0 ? (
        <p className="text-sm text-muted">Aucune donnée de présence enregistrée pour le moment.</p>
      ) : (
        <>
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-border, #e5e7eb)" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#059669"
                strokeWidth="10"
                strokeDasharray={`${presentDash} ${circumference - presentDash}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-foreground">{rate}%</span>
              <span className="text-[10px] text-muted">présence</span>
            </div>
          </div>
          <dl className="grid w-full grid-cols-3 gap-2 text-center text-xs">
            <div>
              <dt className="text-emerald-600">●</dt>
              <dd className="font-semibold text-foreground">{present}</dd>
              <dt className="text-muted">Présents</dt>
            </div>
            <div>
              <dt className="text-red-600">●</dt>
              <dd className="font-semibold text-foreground">{absent}</dd>
              <dt className="text-muted">Absences</dt>
            </div>
            <div>
              <dt className="text-amber-600">●</dt>
              <dd className="font-semibold text-foreground">{retard}</dd>
              <dt className="text-muted">Retards</dt>
            </div>
          </dl>
        </>
      )}
    </div>
  );
}
