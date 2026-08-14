import type { Metadata } from "next";
import { getPrograms, getSchools, isPubliclyVisible, usesAuthorizationWorkflow } from "@/lib/content";
import ProgramCard from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Découvrez tous les programmes offerts par le CCIGA.",
};

export const dynamic = "force-dynamic";

export default async function ProgrammesPage() {
  const schools = getSchools();
  const allPrograms = await getPrograms();
  // Université/École Professionnelle programs only appear here once officially Autorisé with a justificatif on file.
  const programs = allPrograms.filter((p) => !usesAuthorizationWorkflow(p.school) || isPubliclyVisible(p));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Formations
      </p>
      <h1 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">Nos programmes</h1>
      <p className="mb-10 max-w-2xl text-muted">
        Explorez l&apos;ensemble des programmes offerts par l&apos;École Classique,
        l&apos;École Professionnelle et l&apos;Université du CCIGA.
      </p>

      {schools.map((school) => {
        const schoolPrograms = programs.filter((p) => p.school === school.slug);
        if (schoolPrograms.length === 0) return null;
        return (
          <div key={school.slug} className="mb-14">
            <h2 className="mb-6 text-xl font-semibold text-foreground">{school.name}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schoolPrograms.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
