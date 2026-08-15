import type { ReactNode } from "react";

export interface PeriodCourseRow {
  courseId: string;
  courseName: string;
  weight: number;
  finalGrade: number | null;
  retake?: boolean;
}

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
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-foreground">{periodLabel}</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted">
            Moyenne :{" "}
            <span className="font-semibold text-primary">
              {average !== null ? average.toFixed(1) : "—"}/100
            </span>
          </span>
          <span
            className={`font-semibold ${
              decisionTone === "reussi"
                ? "text-emerald-600"
                : decisionTone === "echec"
                  ? "text-red-600"
                  : "text-muted"
            }`}
          >
            {decisionLabel}
          </span>
          {rankingEnabled && rank !== null && <span className="text-muted">Rang : {rank}</span>}
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-3 py-2 font-semibold">Cours</th>
              <th className="px-3 py-2 font-semibold">{weightLabel}</th>
              <th className="px-3 py-2 font-semibold">Note finale</th>
            </tr>
          </thead>
          <tbody>
            {courseResults.map((c) => (
              <tr key={c.courseId} className="border-t border-border">
                <td className="px-3 py-2 text-foreground">
                  {c.courseName}
                  {c.retake && <span className="ml-1 text-xs text-accent">(reprise)</span>}
                </td>
                <td className="px-3 py-2 text-muted">{c.weight}</td>
                <td className="px-3 py-2 font-semibold text-foreground">
                  {c.finalGrade !== null ? `${c.finalGrade.toFixed(1)}/100` : "En attente"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {extra}

      {pdfHref && (
        <a href={pdfHref} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-primary hover:underline">
          Télécharger le PDF →
        </a>
      )}
    </div>
  );
}
