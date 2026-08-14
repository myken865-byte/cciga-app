import type { Metadata } from "next";
import { getPrograms, isPubliclyVisible, usesAuthorizationWorkflow } from "@/lib/content";
import CandidatureForm from "./CandidatureForm";

export const metadata: Metadata = {
  title: "Candidater",
  description: "Soumettez votre candidature en ligne au CCIGA.",
};

export const dynamic = "force-dynamic";

export default async function CandidaterPage() {
  const allPrograms = await getPrograms();
  // Université/École Professionnelle programs only appear here once officially Autorisé with a justificatif on file.
  const programs = allPrograms.filter((p) => !usesAuthorizationWorkflow(p.school) || isPubliclyVisible(p));
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Candidature en ligne
      </p>
      <h1 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
        Candidater / S&apos;inscrire
      </h1>
      <p className="mb-10 text-muted">
        Suivez les étapes ci-dessous pour soumettre votre dossier de candidature au CCIGA.
      </p>
      <CandidatureForm programs={programs} />
    </div>
  );
}
