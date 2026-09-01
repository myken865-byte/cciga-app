import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramById, getSchools, getFaculties } from "@/lib/content";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseRoles, hasRole, hasAnyRole, type Role } from "@/lib/roles";
import EditProgramForm from "@/components/EditProgramForm";
import AppreciationForm from "@/components/AppreciationForm";

export const dynamic = "force-dynamic";

const SECRETARIAT_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"];

export default async function AdminProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [program, allUsers, courses, faculties, session] = await Promise.all([
    getProgramById(id),
    prisma.user.findMany(),
    prisma.course.findMany({ where: { programId: id }, include: { teacher: true } }),
    getFaculties("universite"),
    getSession(),
  ]);
  if (!program) notFound();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");
  const canManageAppreciations = hasAnyRole(session?.roles ?? [], SECRETARIAT_LEVEL);
  const isEcoleClassique = program.school === "ecole-classique";

  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));

  let appreciationSection: {
    students: { id: number; name: string }[];
    semesterOptions: { id: string; label: string }[];
    appreciationsByStudent: Map<number, { semesterId: string; appreciation: string | null; conduct: string | null }[]>;
  } | null = null;

  if (isEcoleClassique && canManageAppreciations) {
    const [students, semesters, appreciations] = await Promise.all([
      prisma.user.findMany({ where: { programId: id }, orderBy: { name: "asc" } }),
      prisma.semester.findMany({ include: { academicYear: true }, orderBy: { order: "asc" } }),
      prisma.studentAppreciation.findMany({ where: { programId: id } }),
    ]);
    const appreciationsByStudent = new Map<
      number,
      { semesterId: string; appreciation: string | null; conduct: string | null }[]
    >();
    for (const a of appreciations) {
      const list = appreciationsByStudent.get(a.studentId) ?? [];
      list.push({ semesterId: a.semesterId, appreciation: a.appreciation, conduct: a.conduct });
      appreciationsByStudent.set(a.studentId, list);
    }
    appreciationSection = {
      students: students.map((s) => ({ id: s.id, name: s.name })),
      semesterOptions: semesters.map((s) => ({ id: s.id, label: `${s.academicYear.label} — ${s.name}` })),
      appreciationsByStudent,
    };
  }

  return (
    <div>
      <Link href="/admin/programs" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les programmes
      </Link>
      <div className="mx-auto max-w-xl space-y-6">
        <EditProgramForm
          program={program}
          schools={getSchools()}
          teachers={teachers}
          faculties={faculties}
          isSuperAdmin={isSuperAdmin}
        />

        {program.teacherModel && (
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold text-foreground">Cours de cette classe</h2>
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucun cours créé pour cette classe pour le moment.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {courses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted">{c.teacher?.name ?? "Non assigné"}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {appreciationSection && (
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-1 font-semibold text-foreground">Appréciation &amp; conduite des élèves</h2>
            <p className="mb-4 text-sm text-muted">
              Visible pour l&apos;Administration/Secrétariat sur toutes les classes École Classique —
              utile en particulier pour les classes sans titulaire unique (modèle « par matière »),
              où aucun enseignant n&apos;est seul responsable de l&apos;appréciation générale.
              Intégré automatiquement au bulletin PDF de chaque élève.
            </p>
            {appreciationSection.students.length === 0 ? (
              <p className="text-sm text-muted">Aucun élève inscrit dans cette classe pour le moment.</p>
            ) : appreciationSection.semesterOptions.length === 0 ? (
              <p className="text-sm text-muted">
                Aucune période académique n&apos;est encore configurée pour l&apos;École Classique.
                Créez-en une depuis « École Classique » dans le menu d&apos;administration.
              </p>
            ) : (
              <div className="space-y-4">
                {appreciationSection.students.map((s) => (
                  <div key={s.id} className="rounded-md border border-border p-3">
                    <p className="mb-2 text-sm font-medium text-foreground">{s.name}</p>
                    <AppreciationForm
                      studentId={s.id}
                      semesters={appreciationSection!.semesterOptions}
                      existing={appreciationSection!.appreciationsByStudent.get(s.id) ?? []}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
