import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import type { SchoolKey } from "@/lib/institutions";

/**
 * User n'a pas de champ école pour les enseignants (programId est réservé
 * aux élèves) — un enseignant est rattaché à une institution s'il y enseigne
 * déjà un cours ou en est titulaire (même règle que la logique de scope du
 * centre de commandement). Un enseignant qui n'est encore rattaché à AUCUNE
 * institution reste visible partout, sinon il serait impossible de lui
 * assigner son tout premier cours ; un enseignant déjà actif ailleurs, lui,
 * disparaît du sélecteur d'une autre institution.
 */
export async function getSchoolScopedTeachers(school: SchoolKey) {
  const [users, courses, programs] = await Promise.all([
    prisma.user.findMany({ select: { id: true, name: true, roles: true } }),
    prisma.course.findMany({ select: { teacherId: true, program: { select: { school: true } } } }),
    prisma.program.findMany({ select: { titulaireId: true, school: true } }),
  ]);

  const schoolsOfTeacher = new Map<number, Set<string>>();
  const track = (id: number | null, teacherSchool: string) => {
    if (!id) return;
    if (!schoolsOfTeacher.has(id)) schoolsOfTeacher.set(id, new Set());
    schoolsOfTeacher.get(id)!.add(teacherSchool);
  };
  for (const c of courses) track(c.teacherId, c.program.school);
  for (const p of programs) track(p.titulaireId, p.school);

  return users
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .filter((u) => {
      const schools = schoolsOfTeacher.get(u.id);
      return !schools || schools.size === 0 || schools.has(school);
    })
    .map((u) => ({ id: u.id, name: u.name }));
}
