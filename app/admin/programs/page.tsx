import Link from "next/link";
import { getPrograms, getSchools } from "@/lib/content";
import CreateProgramForm from "@/components/CreateProgramForm";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const schools = getSchools();
  const programs = await getPrograms();
  const schoolsBySlug = new Map(schools.map((s) => [s.slug, s]));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Programmes</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">École</th>
                <th className="px-4 py-3 font-semibold">Programme</th>
                <th className="px-4 py-3 font-semibold">Niveau / Cycle</th>
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
                  <td className="px-4 py-3 text-muted">{program.duration}</td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    Aucun programme pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CreateProgramForm schools={schools} />
      </div>
    </div>
  );
}
