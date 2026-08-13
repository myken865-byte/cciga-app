import Link from "next/link";
import type { School } from "@/lib/content";
import { getProgramsBySchool } from "@/lib/content";
import ProgramCard from "@/components/ProgramCard";

export default async function SchoolPage({ school }: { school: School }) {
  const programs = await getProgramsBySchool(school.slug);

  return (
    <div>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-light">
            Nos écoles
          </p>
          <h1 className="mb-3 text-3xl font-bold lg:text-4xl">{school.name}</h1>
          <p className="max-w-2xl text-white/85">{school.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-semibold text-foreground">Présentation</h2>
            <p className="text-muted">{school.description}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Points forts
            </h2>
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

        {programs.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Programmes disponibles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
