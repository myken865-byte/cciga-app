import Link from "next/link";
import { getPrograms, getSchools } from "@/lib/content";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { teacherModelLabels } from "@/lib/teacherModel";
import CreateProgramForm from "@/components/CreateProgramForm";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const schools = getSchools();
  const [programs, allUsers] = await Promise.all([getPrograms(), prisma.user.findMany()]);
  const schoolsBySlug = new Map(schools.map((s) => [s.slug, s]));
  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));
  const teachersById = new Map(teachers.map((t) => [t.id, t.name]));

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
        <div className="overflow-x-auto rounded-lg border border-border bg-surface lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">École</th>
                <th className="px-4 py-3 font-semibold">Programme</th>
                <th className="px-4 py-3 font-semibold">Niveau / Cycle</th>
                <th className="px-4 py-3 font-semibold">Modèle</th>
                <th className="px-4 py-3 font-semibold">Titulaire</th>
                <th className="px-4 py-3 font-semibold">Durée</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} className="border-t border-border">
                  <td className="px-4 py-3 text-muted">
                    {schoolsBySlug.get(program.school)?.name ?? program.school}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/programs/${program.id}`} className="font-medium text-primary hover:underline">
                      {program.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{program.level}</td>
                  <td className="px-4 py-3 text-muted">
                    {program.teacherModel ? teacherModelLabels[program.teacherModel].split(" (")[0] : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {program.titulaireId ? teachersById.get(program.titulaireId) ?? "—" : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">{program.duration}</td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    Aucun programme pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CreateProgramForm schools={schools} teachers={teachers} />
      </div>
    </div>
  );
}
