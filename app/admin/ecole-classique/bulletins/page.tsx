import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSchoolScopedAcademicYears } from "@/lib/schoolAcademicYears";
import { formatCcigaId } from "@/lib/cciga-id";
import SectorLogo from "@/components/SectorLogo";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = { publie: "Publié" };

export default async function BulletinsCenterPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const years = await getSchoolScopedAcademicYears("ecole-classique");

  // Recherche directe (nom/matricule) — traverse tous les bulletins École
  // Classique sans passer par la navigation année -> classe -> période.
  let searchResults: {
    id: string;
    studentName: string;
    ccigaId: string;
    programName: string;
    periodLabel: string;
    generatedAt: Date;
  }[] = [];
  if (query) {
    const idMatch = /^\d+$/.test(query) ? Number(query) : /^cciga-id-(\d+)$/i.exec(query)?.[1];
    const docs = await prisma.academicDocument.findMany({
      where: {
        type: "bulletin_periode",
        program: { school: "ecole-classique" },
        supersededBy: null,
        student: idMatch
          ? { id: Number(idMatch) }
          : { name: { contains: query } },
      },
      include: { student: true, program: true, semester: { include: { academicYear: true } } },
      orderBy: { generatedAt: "desc" },
      take: 50,
    });
    searchResults = docs.map((d) => ({
      id: d.id,
      studentName: d.student.name,
      ccigaId: formatCcigaId(d.student.id),
      programName: d.program.name,
      periodLabel: d.semester ? `${d.semester.academicYear.label} — ${d.semester.name}` : "—",
      generatedAt: d.generatedAt,
    }));
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <SectorLogo sector="CLASSIQUE" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold text-foreground">Centre des Bulletins — École Classique</h1>
      </div>

      <form method="get" className="mb-8 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Rechercher un élève par nom ou matricule (ex. CCIGA-ID-000026)…"
          className="input flex-1"
        />
        <button type="submit" className="btn-primary">
          Rechercher
        </button>
        {query && (
          <Link href="/admin/ecole-classique/bulletins" className="btn-secondary">
            Effacer
          </Link>
        )}
      </form>

      {query ? (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Élève</th>
                <th className="px-4 py-3 font-semibold">Matricule</th>
                <th className="px-4 py-3 font-semibold">Classe</th>
                <th className="px-4 py-3 font-semibold">Période</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{r.studentName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{r.ccigaId}</td>
                  <td className="px-4 py-3 text-muted">{r.programName}</td>
                  <td className="px-4 py-3 text-muted">{r.periodLabel}</td>
                  <td className="px-4 py-3">
                    <span className="badge badge-success">{statusLabels.publie}</span>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`/api/documents/${r.id}/pdf`} className="text-primary hover:underline">
                      PDF →
                    </a>
                  </td>
                </tr>
              ))}
              {searchResults.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    Aucun bulletin ne correspond à cette recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <h2 className="mb-3 font-semibold text-foreground">Choisir une année scolaire</h2>
          {years.length === 0 ? (
            <div className="empty-state">
              Aucune année académique configurée. Créez-en une depuis « Structure — École Classique ».
            </div>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {years.map((y) => (
                <li key={y.id}>
                  <Link
                    href={`/admin/ecole-classique/bulletins/${y.id}`}
                    className="card card-interactive flex items-center justify-between p-4 text-sm"
                  >
                    <span className="font-semibold text-foreground">
                      {y.label} {y.isActive && <span className="ml-1 text-xs text-emerald-600">(active)</span>}
                    </span>
                    <span className="text-muted">{y.semesters.length} période(s) →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
