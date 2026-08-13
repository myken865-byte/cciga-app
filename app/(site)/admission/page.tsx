import type { Metadata } from "next";
import Link from "next/link";
import { getSchools, getPrograms } from "@/lib/content";
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
  const programs = await getPrograms();

  return (
    <div>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-light">
            Admission
          </p>
          <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
            Rejoindre le CCIGA
          </h1>
          <p className="mb-8 max-w-2xl text-white/85">
            Découvrez les conditions d&apos;admission, les frais et le calendrier,
            puis lancez votre candidature en ligne en quelques étapes.
          </p>
          <Link
            href="/admission/candidater"
            className="inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-light"
          >
            Candidater / S&apos;inscrire
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Conditions générales</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {schools.map((school) => (
            <div key={school.slug} className="rounded-lg border border-border bg-surface p-6">
              <h3 className="mb-2 font-semibold text-primary">{school.name}</h3>
              <p className="text-sm text-muted">
                Consultez la page de chaque programme pour connaître les conditions
                spécifiques d&apos;admission.
              </p>
              <Link
                href={`/${school.slug}`}
                className="mt-3 inline-block text-sm font-medium text-accent"
              >
                Voir {school.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Frais</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">École</th>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Frais de scolarité</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.slug} className="border-t border-border">
                    <td className="px-4 py-3 text-muted">
                      {schools.find((s) => s.slug === program.school)?.name ?? program.school}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{program.name}</td>
                    <td className="px-4 py-3 text-muted">{formatHTG(program.tuitionFee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted">
            Montants pour l&apos;ensemble du programme, susceptibles d&apos;être ajustés.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Calendrier</h2>
        <ol className="space-y-4">
          {calendar.map((item, i) => (
            <li key={item.step} className="flex gap-4 rounded-lg border border-border bg-surface p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-foreground">{item.step}</p>
                <p className="text-sm text-muted">{item.date}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
