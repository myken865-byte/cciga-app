import { prisma } from "@/lib/db";
import CreateFacultyForm from "@/components/CreateFacultyForm";
import CreateAcademicYearForm from "@/components/CreateAcademicYearForm";
import CreateSemesterForm from "@/components/CreateSemesterForm";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminUniversitePage() {
  const [faculties, academicYears, auditLogs] = await Promise.all([
    prisma.faculty.findMany({ where: { school: "universite" }, orderBy: { name: "asc" } }),
    prisma.academicYear.findMany({
      orderBy: { startDate: "desc" },
      include: { semesters: { orderBy: { order: "asc" } } },
    }),
    prisma.auditLog.findMany({
      where: { entityType: { in: ["Program", "Grade"] } },
      include: { actor: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Structure académique — Université</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Facultés / domaines</h2>
          {faculties.length === 0 ? (
            <p className="text-sm text-muted">Aucune faculté pour le moment.</p>
          ) : (
            <ul className="space-y-1 rounded-lg border border-border bg-surface p-3 text-sm">
              {faculties.map((f) => (
                <li key={f.id} className="text-foreground">
                  {f.name}
                </li>
              ))}
            </ul>
          )}
          <CreateFacultyForm />
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Années académiques &amp; semestres</h2>
          {academicYears.length === 0 ? (
            <p className="text-sm text-muted">Aucune année académique pour le moment.</p>
          ) : (
            <div className="space-y-2">
              {academicYears.map((y) => (
                <div key={y.id} className="rounded-lg border border-border bg-surface p-3 text-sm">
                  <p className="font-medium text-foreground">
                    {y.label} {y.isActive && <span className="text-xs text-emerald-600">(active)</span>}
                  </p>
                  <ul className="mt-1 text-muted">
                    {y.semesters.map((s) => (
                      <li key={s.id}>{s.name}</li>
                    ))}
                    {y.semesters.length === 0 && <li>Aucun semestre.</li>}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <CreateAcademicYearForm />
          <CreateSemesterForm academicYears={academicYears.map((y) => ({ id: y.id, label: y.label }))} />
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Journal d&apos;audit (50 dernières entrées)</h2>
          <div className="max-h-[600px] overflow-y-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-xs">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Date</th>
                  <th className="px-3 py-2 font-semibold">Type</th>
                  <th className="px-3 py-2 font-semibold">Action</th>
                  <th className="px-3 py-2 font-semibold">Par</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-t border-border">
                    <td className="px-3 py-2 text-muted">{formatDateTime(log.createdAt)}</td>
                    <td className="px-3 py-2 text-foreground">{log.entityType}</td>
                    <td className="px-3 py-2 text-muted">{log.action}</td>
                    <td className="px-3 py-2 text-muted">{log.actor?.name ?? "—"}</td>
                  </tr>
                ))}
                {auditLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-6 text-center text-muted">
                      Aucune entrée pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
