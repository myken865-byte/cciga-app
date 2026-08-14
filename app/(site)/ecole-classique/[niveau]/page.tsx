import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramsByNiveau, niveauLabels, niveauList, type Niveau } from "@/lib/content";
import ProgramCard from "@/components/ProgramCard";

function isNiveau(value: string): value is Niveau {
  return (niveauList as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niveau: string }>;
}): Promise<Metadata> {
  const { niveau } = await params;
  if (!isNiveau(niveau)) return {};
  return {
    title: `École Classique — ${niveauLabels[niveau]}`,
    description: `Classes du niveau ${niveauLabels[niveau]} à l'École Classique du CCIGA.`,
  };
}

export const dynamic = "force-dynamic";

export default async function EcoleClassiqueNiveauPage({
  params,
}: {
  params: Promise<{ niveau: string }>;
}) {
  const { niveau } = await params;
  if (!isNiveau(niveau)) notFound();

  const classes = await getProgramsByNiveau(niveau);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <Link href="/ecole-classique" className="mb-4 inline-block text-sm text-primary hover:underline">
        ← École Classique
      </Link>
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        École Classique
      </p>
      <h1 className="mb-8 text-3xl font-bold text-foreground lg:text-4xl">
        {niveauLabels[niveau]}
      </h1>

      {classes.length === 0 ? (
        <p className="text-muted">Aucune classe disponible pour ce niveau pour le moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
