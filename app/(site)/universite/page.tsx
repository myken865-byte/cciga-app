import type { Metadata } from "next";
import Link from "next/link";
import { getSchoolBySlug, getProgramsBySchool, isPubliclyVisible, programTypeLabels, type Program } from "@/lib/content";
import SectorLogo from "@/components/SectorLogo";

export const metadata: Metadata = {
  title: "Université",
  description: "Découvrez l'Université du CCIGA et ses programmes de licence et de diplôme.",
};

export const dynamic = "force-dynamic";

function groupByFaculty(programs: Program[]): Map<string, Program[]> {
  const map = new Map<string, Program[]>();
  for (const p of programs) {
    const list = map.get(p.faculty) ?? [];
    list.push(p);
    map.set(p.faculty, list);
  }
  return map;
}

export default async function UniversitePage() {
  const school = getSchoolBySlug("universite")!;
  const allPrograms = await getProgramsBySchool("universite");
  const programs = allPrograms.filter(isPubliclyVisible);
  const licences = groupByFaculty(programs.filter((p) => p.programType === "licence"));
  const diplomes = groupByFaculty(programs.filter((p) => p.programType === "diplome"));
  const autres = groupByFaculty(programs.filter((p) => p.programType !== "licence" && p.programType !== "diplome"));

  return (
    <div>
      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-16 lg:px-6">
          <SectorLogo sector="UNIVERSITE" className="h-14 w-14 shrink-0 object-contain sm:h-24 sm:w-24" />
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

        <ProgramTypeSection title="Programmes de licence" groups={licences} />
        <ProgramTypeSection title="Programmes de diplôme" groups={diplomes} />
        <ProgramTypeSection title="Autres programmes" groups={autres} />

        {programs.length === 0 && (
          <p className="mt-14 rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
            Aucun programme n&apos;est disponible pour le moment.
          </p>
        )}
      </section>
    </div>
  );
}

function ProgramTypeSection({ title, groups }: { title: string; groups: Map<string, Program[]> }) {
  if (groups.size === 0) return null;

  return (
    <div className="mt-14">
      <h2 className="mb-6 text-xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-8">
        {Array.from(groups.entries()).map(([faculty, facultyPrograms]) => (
          <div key={faculty} className="rounded-lg border border-border bg-surface p-6">
            <h3 className="mb-4 font-semibold text-foreground">{faculty}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {facultyPrograms.map((p) => (
                <div key={p.id} className="flex flex-col rounded-md border border-border bg-background p-4">
                  <Link href={`/programmes/${p.slug}`} className="group">
                    <span className="mb-2 inline-block w-fit rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
                      {p.programType ? programTypeLabels[p.programType] : p.level}
                    </span>
                    <span className="block font-medium text-foreground group-hover:text-primary">{p.name}</span>
                  </Link>
                  {p.description && <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>}
                  {p.admissionConditions.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-muted">
                      {p.admissionConditions.slice(0, 2).map((c) => (
                        <li key={c} className="flex gap-1.5">
                          <span className="text-accent">✓</span>
                          <span className="line-clamp-1">{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-primary">Durée : {p.duration}</span>
                    <Link
                      href="/admission/candidater"
                      className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-primary-dark hover:bg-accent-light"
                    >
                      Candidater
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
