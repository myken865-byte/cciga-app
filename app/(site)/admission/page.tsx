import type { Metadata } from "next";
import Link from "next/link";
import { getSchools, getPrograms, isPubliclyVisible, isTestProgram, usesAuthorizationWorkflow } from "@/lib/content";
import { formatHTG } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Admission",
  description: "Conditions d'admission, frais et calendrier du CCIGA.",
};

export const dynamic = "force-dynamic";

const calendar = [
  { step: "Ouverture des inscriptions", date: "1er août 2026" },
  { step: "Date limite de soumission des dossiers", date: "31 août 2026" },
  { step: "Résultats d'admission", date: "5 septembre 2026" },
  { step: "Rentrée académique", date: "8 septembre 2026" },
];

export default async function AdmissionPage() {
  const schools = getSchools();
  const allPrograms = await getPrograms();
  // Université/École Professionnelle programs only appear here once officially Autorisé with a justificatif on file.
  const visiblePrograms = allPrograms
    .filter((p) => !usesAuthorizationWorkflow(p.school) || isPubliclyVisible(p))
    .filter((p) => !isTestProgram(p));

  return (
    <div>
      {/* Mandat "Refonte Page Admission / Rejoindre le CCIGA" (2026-09-06) :
      bande unique Rejoindre le CCIGA | Candidature, double bordure
      marron + or, fond crème. Phrase explicative supprimée sans remplacement. */}
      <section className="mx-auto max-w-6xl px-4 pt-14 lg:px-6">
        <div className="rounded-[32px] border-[8px] border-[#4b3221] p-1.5 shadow-lg">
          <div className="rounded-[24px] border-[4px] border-accent bg-[#fdf8ec]">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 text-center sm:p-10 lg:border-r-[3px] lg:border-accent/50">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Admission</p>
                <h1 className="text-3xl font-bold text-primary-dark lg:text-4xl">Rejoindre le CCIGA</h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">Candidature</p>
                <Link
                  href="/admission/candidater"
                  className="inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-accent-light"
                >
                  Candidater / S&apos;inscrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Conditions générales</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {schools.map((school) => (
            <div key={school.slug} className="rounded-2xl border-[3px] border-accent bg-[#fdf8ec] p-6 text-center shadow-sm">
              <h3 className="mb-2 font-semibold text-primary-dark">{school.name}</h3>
              <p className="text-sm text-muted">
                Consultez la page de chaque programme pour connaître les conditions
                spécifiques d&apos;admission.
              </p>
              <Link
                href={`/${school.slug}`}
                className="mt-3 inline-block text-sm font-medium text-primary"
              >
                Voir {school.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Frais</h2>
        <div className="space-y-8">
          {schools.map((school) => {
            const schoolPrograms = visiblePrograms.filter((p) => p.school === school.slug);
            if (schoolPrograms.length === 0) return null;
            return (
              <div key={school.slug} className="rounded-[28px] border-[6px] border-primary-dark p-1.5 shadow-sm">
                <div className="rounded-[20px] border-[3px] border-accent bg-[#fdf8ec] p-6 sm:p-8">
                  <h3 className="mb-4 text-center text-lg font-bold uppercase tracking-wide text-primary-dark">
                    Frais — {school.name}
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-border bg-white">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-background text-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Programme</th>
                          <th className="px-4 py-3 font-semibold">Frais de scolarité</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schoolPrograms.map((program) => (
                          <tr key={program.slug} className="border-t border-row-divider">
                            <td className="px-4 py-3 font-medium text-foreground">{program.name}</td>
                            <td className="px-4 py-3 text-muted">{formatHTG(program.tuitionFee)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Montants pour l&apos;ensemble du programme, susceptibles d&apos;être ajustés.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="mx-auto mb-8 max-w-md rounded-2xl border-[3px] border-accent bg-[#fdf8ec] px-6 py-4 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-primary-dark">Calendrier</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {calendar.map((item, i) => (
            <div key={item.step} className="rounded-2xl border-[3px] border-accent bg-[#fdf8ec] p-6 shadow-sm">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-sm font-semibold text-white">
                {i + 1}
              </span>
              <p className="font-medium text-foreground">{item.step}</p>
              <p className="text-sm text-muted">{item.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
