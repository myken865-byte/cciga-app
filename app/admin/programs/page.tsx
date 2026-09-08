import { redirect } from "next/navigation";
import Link from "next/link";
import { getPrograms, getProgramsBySchool, getSchools, getFaculties } from "@/lib/content";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isUserInSchoolScope } from "@/lib/institutionScope";
import CreateProgramForm from "@/components/CreateProgramForm";
import ProgramsTable from "@/components/ProgramsTable";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import { AlertIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  // Mandat "Mise en état opérationnel" (2026-09-06) : séparation stricte par
  // institution active. proxy.ts gate déjà l'accès si aucun contexte n'est
  // choisi — ce redirect défensif ne devrait normalement jamais se déclencher.
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool === null) redirect("/admin/institution");
  const scopeSchool = activeSchool !== "toutes" ? activeSchool : null;

  const schools = getSchools();
  const [programs, allUsers, faculties] = await Promise.all([
    scopeSchool ? getProgramsBySchool(scopeSchool) : getPrograms(),
    prisma.user.findMany({
      include: { coursesTaught: { include: { program: true } }, titulaireOf: true, coordinatedPrograms: true },
    }),
    getFaculties("universite"),
  ]);
  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .filter((u) => !scopeSchool || isUserInSchoolScope(u, scopeSchool))
    .map((u) => ({ id: u.id, name: u.name }));
  const teachersById = new Map(teachers.map((t) => [t.id, t.name]));
  const facultiesById = new Map(faculties.map((f) => [f.id, f.name]));

  const missingTitulaire = programs.filter(
    (p) => p.teacherModel === "titulaire" && !p.titulaireId,
  );

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Offre de formation" title="Programmes" />

      {missingTitulaire.length > 0 && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="flex items-center gap-1.5 font-semibold">
            <AlertIcon className="h-4 w-4" /> Classes sans titulaire assigné :
          </p>
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
    </AdminShell>
  );
}
