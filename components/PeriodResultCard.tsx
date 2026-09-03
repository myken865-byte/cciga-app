import type { ReactNode } from "react";

export interface PeriodCourseRow {
  courseId: string;
  courseName: string;
  weight: number;
  finalGrade: number | null;
  retake?: boolean;
}

const decisionBadgeClass: Record<"reussi" | "echec" | "indetermine", string> = {
  reussi: "badge-success",
  echec: "badge-danger",
  indetermine: "badge-neutral",
};

export default function PeriodResultCard({
  periodLabel,
  weightLabel,
  courseResults,
  average,
  decisionLabel,
  decisionTone,
  rank,
  rankingEnabled,
  pdfHref,
  extra,
}: {
  periodLabel: string;
  weightLabel: "Crédits" | "Coefficient";
  courseResults: PeriodCourseRow[];
  average: number | null;
  decisionLabel: string;
  decisionTone: "reussi" | "echec" | "indetermine";
  rank: number | null;
  rankingEnabled: boolean;
  pdfHref?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-foreground">{periodLabel}</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="badge badge-info">
            Moyenne {average !== null ? `${average.toFixed(1)}/100` : "—"}
          </span>
          <span className={`badge ${decisionBadgeClass[decisionTone]}`}>{decisionLabel}</span>
          {rankingEnabled && rank !== null && <span className="badge badge-neutral">Rang {rank}</span>}
        </div>
      </div>

      <div className="overflow-x-auto card">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-muted">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Cours</th>
              <th className="px-3 py-2.5 font-semibold">{weightLabel}</th>
              <th className="px-3 py-2.5 font-semibold">Note finale</th>
            </tr>
          </thead>
          <tbody>
            {courseResults.map((c) => (
              <tr key={c.courseId} className="border-t border-border">
                <td className="px-3 py-2.5 text-foreground">
                  {c.courseName}
                  {c.retake && <span className="ml-1.5 badge badge-warning">reprise</span>}
                </td>
                <td className="px-3 py-2.5 text-muted">{c.weight}</td>
                <td className="px-3 py-2.5 font-semibold text-foreground">
                  {c.finalGrade !== null ? `${c.finalGrade.toFixed(1)}/100` : "En attente"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {extra}

      {pdfHref && (
        <a href={pdfHref} target="_blank" rel="noreferrer" className="btn-secondary mt-4 text-sm">
          Télécharger le PDF
        </a>
      )}
    </div>
  );
}
