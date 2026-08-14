import Link from "next/link";
import { getPrograms, getSchools, getFaculties } from "@/lib/content";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import CreateProgramForm from "@/components/CreateProgramForm";
import ProgramsTable from "@/components/ProgramsTable";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const schools = getSchools();
  const [programs, allUsers, faculties] = await Promise.all([
    getPrograms(),
    prisma.user.findMany(),
    getFaculties("universite"),
  ]);
  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));
  const teachersById = new Map(teachers.map((t) => [t.id, t.name]));
  const facultiesById = new Map(faculties.map((f) => [f.id, f.name]));

  const missingTitulaire = programs.filter(
    (p) => p.teacherModel === "titulaire" && !p.titulaireId,
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Programmes</h1>

      {missingTitulaire.length > 0 && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-semibold">Classes sans titulaire assigné :</p>
          <ul className="mt-1 list-inside list-disc">
            {missingTitulaire.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/programs/${p.id}`} className="underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProgramsTable
            programs={programs}
            schools={schools}
            teachersById={teachersById}
            facultiesById={facultiesById}
          />
        </div>

        <CreateProgramForm schools={schools} teachers={teachers} faculties={faculties} />
      </div>
    </div>
  );
}
