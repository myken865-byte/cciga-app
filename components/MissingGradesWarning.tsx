import type { MissingGrade } from "@/lib/gradeCompleteness";

export default function MissingGradesWarning({ missing }: { missing: MissingGrade[] }) {
  if (missing.length === 0) return null;

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm">
      <p className="mb-2 font-semibold text-amber-800">
        Notes manquantes ({missing.length}) — le document restera « Incomplet » tant qu&apos;elles ne sont pas
        saisies
      </p>
      <ul className="max-h-40 space-y-1 overflow-y-auto text-amber-800">
        {missing.map((m) => (
          <li key={`${m.studentId}-${m.categoryId}`}>
            {m.studentName} — {m.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
