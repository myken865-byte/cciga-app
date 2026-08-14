import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramBySlug, getProgramsBySchool, getSchoolBySlug, isPubliclyVisible } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  return { title: program.name, description: program.description };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();
  // Université programs are never publicly reachable until Autorisé with a justificatif on file.
  if (program.school === "universite" && !isPubliclyVisible(program)) notFound();

  const school = getSchoolBySlug(program.school);
  const related = (await getProgramsBySchool(program.school)).filter(
    (p) => p.slug !== program.slug && (p.school !== "universite" || isPubliclyVisible(p)),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <div className="mb-6 text-sm text-muted">
        <Link href="/programmes" className="hover:text-primary">Programmes</Link>
        {" / "}
        {school && (
          <>
            <Link href={`/${school.slug}`} className="hover:text-primary">{school.name}</Link>
            {" / "}
          </>
        )}
        <span>{program.name}</span>
      </div>

      <span className="mb-3 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-primary-dark">
        {program.level}
      </span>
      <h1 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">{program.name}</h1>
      <p className="mb-8 text-muted">{program.faculty}</p>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-xl font-semibold text-foreground">Description</h2>
          <p className="mb-8 text-muted">{program.description}</p>

          <h2 className="mb-3 text-xl font-semibold text-foreground">Conditions d&apos;admission</h2>
          <ul className="space-y-2 text-muted">
            {program.admissionConditions.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-accent">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted">Durée</dt>
              <dd className="font-semibold text-foreground">{program.duration}</dd>
            </div>
            <div>
              <dt className="text-muted">Niveau</dt>
              <dd className="font-semibold text-foreground">{program.level}</dd>
            </div>
            {school && (
              <div>
                <dt className="text-muted">École</dt>
                <dd className="font-semibold text-foreground">{school.name}</dd>
              </div>
            )}
          </dl>
          <Link
            href="/admission/candidater"
            className="mt-5 block rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-primary-dark hover:bg-accent-light"
          >
            Candidater à ce programme
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Autres programmes de {school?.name}
          </h2>
          <ul className="flex flex-wrap gap-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="rounded-md border border-border bg-surface px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
