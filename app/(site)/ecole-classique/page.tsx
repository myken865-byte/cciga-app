import type { Metadata } from "next";
import Link from "next/link";
import { getSchoolBySlug, niveauList, niveauLabels } from "@/lib/content";

export const metadata: Metadata = {
  title: "École Classique",
  description: "Découvrez l'École Classique du CCIGA, de la maternelle au secondaire.",
};

export const dynamic = "force-dynamic";

const niveauTaglines: Record<string, string> = {
  prescolaire: "Petite Section, Moyenne Section, Grande Section",
  primaire: "1re AF à 9e AF",
  secondaire: "NS1, NS2, NS3, NS4",
};

export default function EcoleClassiquePage() {
  const school = getSchoolBySlug("ecole-classique")!;

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

        <div className="mt-14">
          <h2 className="mb-2 text-xl font-semibold text-foreground">Trois niveaux</h2>
          <p className="mb-6 text-sm text-muted">
            L&apos;École Classique accompagne l&apos;élève de la maternelle jusqu&apos;à la fin du
            secondaire, à travers trois cycles distincts.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {niveauList.map((niveau) => (
              <Link
                key={niveau}
                href={`/ecole-classique/${niveau}`}
                className="flex flex-col rounded-lg border border-border bg-surface p-6 transition hover:border-primary hover:shadow-md"
              >
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  {niveauLabels[niveau]}
                </h3>
                <p className="mb-3 text-sm text-muted">{niveauTaglines[niveau]}</p>
                <span className="mt-auto text-sm font-medium text-primary">
                  Voir les classes →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
