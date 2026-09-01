import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { computePeriodReadiness } from "@/lib/documents";
import GenerateDocumentsPanel from "@/components/GenerateDocumentsPanel";
import { GenerateOneButton, RegenerateButton } from "@/components/BulletinRowActions";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BulletinsPeriodPage({
  params,
}: {
  params: Promise<{ yearId: string; programId: string; semesterId: string }>;
}) {
  const { yearId, programId, semesterId } = await params;
  const [year, program, semester] = await Promise.all([
    prisma.academicYear.findUnique({ where: { id: yearId } }),
    prisma.program.findUnique({ where: { id: programId } }),
    prisma.semester.findUnique({ where: { id: semesterId } }),
  ]);
  if (!year || !program || program.school !== "ecole-classique" || !semester || semester.academicYearId !== yearId) {
    notFound();
  }

  const readiness = await computePeriodReadiness(programId, semesterId);
  const documents = await prisma.academicDocument.findMany({
    where: { programId, semesterId, type: "bulletin_periode", supersededBy: null },
  });
  const documentByStudent = new Map(documents.map((d) => [d.studentId, d]));

  const rows = readiness
    .map((r) => ({ ...r, document: documentByStudent.get(r.studentId) ?? null }))
    .sort((a, b) => a.studentName.localeCompare(b.studentName));

  const stats = {
    total: rows.length,
    notesCompletes: rows.filter((r) => r.missing.length === 0 && !r.hasUnpublishedGrades).length,
    notesIncompletes: rows.filter((r) => r.missing.length > 0 || r.hasUnpublishedGrades).length,
    pretsAGenerer: rows.filter((r) => r.ready && !r.hasDocument).length,
    generes: rows.filter((r) => r.hasDocument).length,
    enAttente: rows.filter((r) => !r.ready && !r.hasDocument).length,
  };

  return (
    <div>
      <Link
        href={`/admin/ecole-classique/bulletins/${yearId}/${programId}`}
        className="mb-4 inline-block text-sm text-primary hover:underline"
      >
        ← {program.name}
      </Link>
      <h1 className="mb-1 text-2xl font-bold text-foreground">
        Bulletins — {program.name} — {semester.name}
      </h1>
      <p className="mb-6 text-sm text-muted">{year.label}</p>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="stat-tile">
          <p className="section-label mb-1">Élèves</p>
          <p className="text-xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="stat-tile">
          <p className="section-label mb-1">Notes complètes</p>
          <p className="text-xl font-bold text-emerald-600">{stats.notesCompletes}</p>
        </div>
        <div className="stat-tile">
          <p className="section-label mb-1">Notes incomplètes</p>
          <p className="text-xl font-bold text-amber-600">{stats.notesIncompletes}</p>
        </div>
        <div className="stat-tile">
          <p className="section-label mb-1">Prêts à générer</p>
          <p className="text-xl font-bold text-primary">{stats.pretsAGenerer}</p>
        </div>
        <div className="stat-tile">
          <p className="section-label mb-1">Générés</p>
          <p className="text-xl font-bold text-emerald-600">{stats.generes}</p>
        </div>
        <div className="stat-tile">
          <p className="section-label mb-1">En attente</p>
          <p className="text-xl font-bold text-muted">{stats.enAttente}</p>
        </div>
      </div>
      <p className="mb-6 text-xs text-muted">
        Bulletins imprimés : suivi non disponible dans l&apos;architecture actuelle (aucun statut « imprimé » n&apos;est
        enregistré) — À COMPLÉTER si ce suivi devient nécessaire.
      </p>

      <div className="mb-6">
        <GenerateDocumentsPanel programId={programId} semesterId={semesterId} readyCount={stats.pretsAGenerer} />
      </div>

      <div className="overflow-x-auto card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Élève</th>
              <th className="px-4 py-3 font-semibold">Matricule</th>
              <th className="px-4 py-3 font-semibold">Statut notes</th>
              <th className="px-4 py-3 font-semibold">Statut bulletin</th>
              <th className="px-4 py-3 font-semibold">Généré le</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.studentId} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">
                  <Link href={`/admin/users/${r.studentId}`} className="hover:underline">
                    {r.studentName}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted">{formatCcigaId(r.studentId)}</td>
                <td className="px-4 py-3">
                  {r.missing.length === 0 && !r.hasUnpublishedGrades ? (
                    <span className="badge badge-success">Complètes</span>
                  ) : (
                    <span className="badge badge-warning" title={r.missing.map((m) => m.categoryName).join(", ")}>
                      Incomplètes{r.missing.length > 0 ? ` (${r.missing.length})` : ""}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {r.document ? (
                    <span className="badge badge-success">Généré{r.document.version > 1 ? ` (v${r.document.version})` : ""}</span>
                  ) : r.ready ? (
                    <span className="badge badge-info">Prêt à générer</span>
                  ) : (
                    <span className="badge badge-neutral">En attente — notes manquantes</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{r.document ? formatDate(r.document.generatedAt) : "—"}</td>
                <td className="px-4 py-3">
                  {r.document ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={`/api/documents/${r.document.id}/pdf`} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary hover:underline">
                        Voir / PDF
                      </a>
                      <a href={`/api/documents/${r.document.id}/pdf`} download className="text-xs text-muted hover:underline">
                        Imprimer
                      </a>
                      <RegenerateButton documentId={r.document.id} />
                    </div>
                  ) : r.ready ? (
                    <GenerateOneButton studentId={r.studentId} programId={programId} semesterId={semesterId} />
                  ) : (
                    <span className="text-xs text-muted">
                      {r.missing.length > 0
                        ? `Manque : ${[...new Set(r.missing.map((m) => m.categoryName))].join(", ")}`
                        : "Notes non publiées"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Aucun élève inscrit dans cette classe.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
