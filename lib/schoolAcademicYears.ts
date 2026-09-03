import { prisma } from "@/lib/db";
import type { SchoolKey } from "@/lib/institutions";

/**
 * AcademicYear reste partagée entre institutions par conception (même
 * calendrier), mais chaque Semester (période/trimestre) appartient à une
 * seule institution, fixée à sa création (`Semester.school`, voir
 * app/api/admin/semesters/route.ts). Les périodes créées avant l'ajout de ce
 * champ ont `school: null` — on les garde visibles partout plutôt que de les
 * faire disparaître silencieusement. Une année sans aucune période nulle
 * part reste visible (prête à être configurée) ; une année dont toutes les
 * périodes appartiennent à une autre école est masquée pour celle-ci.
 */
export async function getSchoolScopedAcademicYears(school: SchoolKey) {
  const academicYears = await prisma.academicYear.findMany({
    orderBy: { startDate: "desc" },
    include: { semesters: { orderBy: { order: "asc" } } },
  });

  const visible = (s: { school: string | null }) => s.school === null || s.school === school;

  return academicYears
    .filter((y) => y.semesters.length === 0 || y.semesters.some(visible))
    .map((y) => ({
      ...y,
      semesters: y.semesters.filter(visible),
    }));
}

/** Options aplaties pour un sélecteur de période (formulaire de cours), scopées à l'institution active. */
export async function getSchoolScopedSemesterOptions(school: SchoolKey) {
  const years = await getSchoolScopedAcademicYears(school);
  return years.flatMap((y) => y.semesters.map((s) => ({ id: s.id, label: `${y.label} — ${s.name}` })));
}
