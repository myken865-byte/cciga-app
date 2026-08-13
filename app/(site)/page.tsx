import Link from "next/link";
import { getSchools, getPrograms, getNews } from "@/lib/content";
import ProgramCard from "@/components/ProgramCard";
import NewsCard from "@/components/NewsCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const schools = getSchools();
  const programs = (await getPrograms()).slice(0, 3);
  const news = (await getNews()).slice(0, 3);

  return (
    <div>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6 lg:py-28">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-light">
            Centre Interdisciplinaire des Génies Agrégées
          </p>
          <h1 className="mb-5 max-w-2xl text-4xl font-bold leading-tight lg:text-5xl">
            Un campus. Trois entités. Une plateforme. Une intelligence.
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/85">
            École Classique, École Professionnelle et Université réunies au sein
            d&apos;un même campus numérique, tourné vers l&apos;excellence
            académique et l&apos;innovation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admission/candidater"
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-light"
            >
              Candidater / S&apos;inscrire
            </Link>
            <Link
              href="/programmes"
              className="rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Découvrir nos programmes
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Nos écoles</h2>
        <p className="mb-8 text-muted">
          Trois entités complémentaires, un seul campus numérique intégré.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {schools.map((school) => (
            <Link
              key={school.slug}
              href={`/${school.slug}`}
              className="rounded-lg border border-border bg-surface p-6 transition hover:border-primary hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-primary">{school.name}</h3>
              <p className="mb-3 text-sm text-muted">{school.tagline}</p>
              <span className="text-sm font-medium text-accent">En savoir plus →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Programmes en vedette</h2>
              <p className="text-muted">Un aperçu de nos formations disponibles.</p>
            </div>
            <Link href="/programmes" className="hidden text-sm font-medium text-primary sm:block">
              Voir tous les programmes →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Actualités</h2>
            <p className="text-muted">Les dernières nouvelles du CCIGA.</p>
          </div>
          <Link href="/actualites" className="hidden text-sm font-medium text-primary sm:block">
            Toutes les actualités →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center lg:px-6">
          <h2 className="mb-3 text-2xl font-bold">Prêt à rejoindre le CCIGA ?</h2>
          <p className="mb-6 text-white/80">
            Commencez votre candidature en ligne dès aujourd&apos;hui.
          </p>
          <Link
            href="/admission/candidater"
            className="inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-light"
          >
            Candidater / S&apos;inscrire
          </Link>
        </div>
      </section>
    </div>
  );
}
