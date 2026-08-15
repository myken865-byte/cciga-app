import type { Metadata } from "next";
import Link from "next/link";
import { getSchoolBySlug, getProgramsBySchool, isPubliclyVisible } from "@/lib/content";
import SectorLogo from "@/components/SectorLogo";

export const metadata: Metadata = {
  title: "École Professionnelle",
  description: "Découvrez l'École Professionnelle du CCIGA et ses formations courtes orientées métiers.",
};

export const dynamic = "force-dynamic";

export default async function EcoleProfessionnellePage() {
  const school = getSchoolBySlug("ecole-professionnelle")!;
  const allPrograms = await getProgramsBySchool("ecole-professionnelle");
  const programs = allPrograms.filter(isPubliclyVisible);

  return (
    <div>
      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-16 lg:px-6">
          <SectorLogo sector="PROFESSIONNELLE" className="h-14 w-14 shrink-0 object-contain sm:h-24 sm:w-24" />
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-light">Nos écoles</p>
            <h1 className="mb-3 text-3xl font-bold lg:text-4xl">{school.name}</h1>
            <p className="max-w-2xl text-white/85">{school.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-semibold text-foreground">Présentation</h2>
            <p className="text-muted">{school.description}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Points forts</h2>
            <ul className="space-y-2 text-sm text-muted">
              {school.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/admission/candidater"
              className="mt-5 block rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-primary-dark hover:bg-accent-light"
            >
              Candidater à {school.name}
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Filières</h2>
          {programs.length === 0 ? (
            <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
              Aucune filière n&apos;est encore officiellement autorisée et publiée pour l&apos;École Professionnelle.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={`/programmes/${program.slug}`}
                  className="flex flex-col rounded-lg border border-border bg-surface p-5 transition hover:border-primary hover:shadow-md"
                >
                  <span className="mb-2 inline-block w-fit rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
                    {program.level}
                  </span>
                  <h3 className="mb-1 font-semibold text-foreground">{program.name}</h3>
                  <p className="mb-1 text-sm text-muted">{program.faculty}</p>
                  <p className="mb-3 text-sm text-muted">{program.description}</p>
                  <span className="mt-auto text-xs font-medium text-primary">Durée : {program.duration}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
