import type { Metadata } from "next";
import { getPrograms, getSchools, isPubliclyVisible, isTestProgram, usesAuthorizationWorkflow } from "@/lib/content";
import ProgramInstitutionalCard from "@/components/ProgramInstitutionalCard";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Découvrez tous les programmes offerts par le CCIGA.",
};

export const dynamic = "force-dynamic";

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
        return (
          <div key={school.slug} className="mb-14 rounded-[32px] border-[3px] border-accent bg-[#fdf8ec] p-6 shadow-sm sm:p-8">
            <div className="mb-8 w-full rounded-2xl border-[3px] border-accent bg-white px-6 py-4 text-center shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-wide text-primary-dark">{school.name}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schoolPrograms.map((program) => (
                <ProgramInstitutionalCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
