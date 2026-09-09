import type { Metadata } from "next";
import { getPrograms, getSchools, isPubliclyVisible, isTestProgram, usesAuthorizationWorkflow, type Program } from "@/lib/content";
import ProgramInstitutionalCard from "@/components/ProgramInstitutionalCard";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Découvrez tous les programmes offerts par le CCIGA.",
};

export const dynamic = "force-dynamic";

// Mandat "Corriger classification PRIMAIRE / FONDAMENTALE / SECONDAIRE"
// (2026-09-09) : regroupement d'affichage uniquement — n'écrit ni ne lit
// aucun nouveau champ en base, program.niveau/level restent inchangés.
type EcoleClassiqueGroup = "jasmin" | "primaire" | "fondamentale" | "secondaire" | "autre";

const ecoleClassiqueGroupOrder: EcoleClassiqueGroup[] = ["jasmin", "primaire", "fondamentale", "secondaire", "autre"];

const ecoleClassiqueGroupLabels: Record<EcoleClassiqueGroup, string> = {
  jasmin: "Jasmin Kindergarten",
  primaire: "Primaire",
  fondamentale: "Fondamentale",
  secondaire: "Secondaire",
  autre: "Autres classes",
};

function classifyEcoleClassiqueGroup(program: Program): EcoleClassiqueGroup {
  if (program.niveau === "prescolaire") return "jasmin";
  if (program.niveau === "secondaire") return "secondaire";
  if (program.niveau === "primaire") {
    const match = program.name.match(/^(\d+)(?:re|e)\s*AF$/i);
    if (match && Number(match[1]) >= 7) return "fondamentale";
    return "primaire";
  }
  const level = program.level.toLowerCase();
  if (level.includes("secondaire")) return "secondaire";
  if (level.includes("fondamentale")) return "fondamentale";
  if (level.includes("primaire")) return "primaire";
  if (level.includes("préscolaire") || level.includes("prescolaire")) return "jasmin";
  return "autre";
}

function groupEcoleClassiquePrograms(programs: Program[]) {
  const groups = new Map<EcoleClassiqueGroup, Program[]>();
  for (const program of programs) {
    const group = classifyEcoleClassiqueGroup(program);
    const existing = groups.get(group);
    if (existing) existing.push(program);
    else groups.set(group, [program]);
  }
  return ecoleClassiqueGroupOrder
    .map((group) => ({ group, items: groups.get(group) ?? [] }))
    .filter(({ items }) => items.length > 0);
}

export default async function ProgrammesPage() {
  const schools = getSchools();
  const allPrograms = await getPrograms();
  // Université/École Professionnelle programs only appear here once officially Autorisé with a justificatif on file.
  const visiblePrograms = allPrograms.filter((p) => !usesAuthorizationWorkflow(p.school) || isPubliclyVisible(p));
  const programs = visiblePrograms.filter((p) => p.active && !isTestProgram(p));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      {/* Mandat "Refonte Page Nos Programmes" (2026-09-06) : titre seul, dans
      un grand encadrement bleu marine à bordure or ; phrase explicative
      supprimée sans remplacement. */}
      <div className="mx-auto mb-14 max-w-2xl rounded-[32px] border-[6px] border-accent bg-primary-dark px-8 py-10 text-center shadow-lg">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-white lg:text-4xl">Nos programmes</h1>
      </div>

      {schools.map((school) => {
        const schoolPrograms = programs.filter((p) => p.school === school.slug);
        if (schoolPrograms.length === 0) return null;
        const isEcoleClassique = school.slug === "ecole-classique";
        return (
          <div key={school.slug} className="mb-14 rounded-[32px] border-[3px] border-accent bg-[#fdf8ec] p-6 shadow-sm sm:p-8">
            <div className="mb-8 w-full rounded-2xl border-[3px] border-accent bg-white px-6 py-4 text-center shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-wide text-primary-dark">{school.name}</h2>
            </div>

            {isEcoleClassique ? (
              <div className="space-y-10">
                {groupEcoleClassiquePrograms(schoolPrograms).map(({ group, items }) => (
                  <div key={group}>
                    <h3 className="mb-4 text-2xl font-extrabold uppercase tracking-wide text-primary-dark sm:text-3xl">
                      {ecoleClassiqueGroupLabels[group]}
                    </h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((program) => (
                        <ProgramInstitutionalCard key={program.slug} program={program} showLevelBadge={false} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {schoolPrograms.map((program) => (
                  <ProgramInstitutionalCard key={program.slug} program={program} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
