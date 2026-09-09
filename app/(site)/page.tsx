import Link from "next/link";
import { getSchools, getNews, type NewsItem } from "@/lib/content";
import {
  BuildingIcon,
  UsersIcon,
  LaptopIcon,
  BrainIcon,
  GraduationCapIcon,
  GearIcon,
  ColumnsIcon,
  BookIcon,
  ClipboardIcon,
  DocumentIcon,
  DoorIcon,
  ChatIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const gridItems = [
  {
    icon: BuildingIcon,
    title: "Un campus",
    text: "Un environnement institutionnel moderne et structuré.",
  },
  {
    icon: UsersIcon,
    title: "Trois unités",
    text: "École Classique, École Professionnelle et Université.",
  },
  {
    icon: LaptopIcon,
    title: "Une plateforme",
    text: "Un écosystème numérique intégré : CCIGA App.",
  },
  {
    icon: BrainIcon,
    title: "Une intelligence",
    text: "L'intelligence numérique au service de l'éducation.",
  },
];

const unitIcons = { "ecole-classique": GraduationCapIcon, "ecole-professionnelle": GearIcon, universite: ColumnsIcon } as const;

const newsBuckets = [
  { key: "admission", label: "Admission", keyword: "admission" },
  { key: "programmes", label: "Programmes", keyword: "programme" },
  { key: "evenements", label: "Événements", keyword: "evenement" },
] as const;

function normalizeText(value: string) {
  return Array.from(value.normalize("NFD"))
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return code < 0x0300 || code > 0x036f;
    })
    .join("")
    .toLowerCase();
}

function findLatestByCategory(news: NewsItem[], keyword: string) {
  return news.find((item) => normalizeText(item.category).startsWith(keyword));
}

function formatNewsDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

const quickLinks = [
  { href: "/programmes", label: "Programmes variés", icon: BookIcon },
  { href: "/admission", label: "Admissions simplifiées", icon: ClipboardIcon },
  { href: "/actualites", label: "Actualités en temps réel", icon: DocumentIcon },
  { href: "/login", label: "Portails sécurisés", icon: DoorIcon },
  { href: "/admission/candidater", label: "Où s'inscrire", icon: ClipboardIcon },
  { href: "/contact", label: "Contactez-nous", icon: ChatIcon },
];

export default async function HomePage() {
  const schools = getSchools();
  const news = await getNews();

  return (
    <div>
      {/* HERO — mandat "Correction Hero Accueil" (2026-09-05) : les 4 cartes
      passent à gauche (fond dégradé bleu marine → bleu très pâle), la photo
      réelle du campus reste totalement dégagée à droite, encadrement
      extérieur premium bleu marine + jaune or autour de toute la zone. */}
      <section className="mx-auto max-w-7xl px-3 pb-6 pt-6 sm:px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-[28px] border-4 border-primary shadow-2xl">
          <div className="pointer-events-none absolute inset-[6px] rounded-[22px] border-2 border-accent/70" />

          <div className="grid lg:grid-cols-[1.08fr_1fr]">
            <div
              className="p-6 sm:p-10 lg:p-12"
              style={{ background: "linear-gradient(180deg, var(--primary-dark) 0%, var(--primary) 38%, #c3cfe0 78%, #eef1f8 100%)" }}
            >
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light">
                Centre Interdisciplinaire des Génies Agrégées
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {gridItems.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-2xl border-[7px] border-accent bg-white p-4 shadow-md sm:p-5"
                  >
                    <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-primary">{title}</h3>
                    <p className="text-xs leading-snug text-muted">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admission/candidater"
                  className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-accent-light"
                >
                  Candidater / S&apos;inscrire
                </Link>
                <Link
                  href="/programmes"
                  className="rounded-md border-2 border-primary bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-background"
                >
                  Découvrir nos programmes
                </Link>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-0">
              <img
                src="/campus/campus-hero-universite.jpg"
                alt="Bâtiment de l'Université CCIGA de Petit-Goâve"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Bandeau "WELCOME TO CCIGA" — mandat "Image d'accueil bâtiment
              Université CCIGA" (2026-09-09) : dégradé bas uniquement (~38% de
              la hauteur), jamais assez haut pour couvrir l'enseigne du
              bâtiment ni son entrée, quel que soit le recadrage object-cover
              (mobile étroit ou desktop large). */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-primary-dark/95 via-primary-dark/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-2xl font-extrabold uppercase leading-tight tracking-wide text-white [text-shadow:0_2px_10px_rgba(15,45,82,0.85)] sm:text-3xl lg:text-4xl">
                  Welcome <span className="text-accent">to</span> CCIGA
                </p>
                <div className="mt-2.5 h-1 w-16 rounded-full bg-accent sm:w-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TROIS UNITÉS — mandat "Deuxième mission Accueil" (2026-09-05) : bloc
      introductif crème à bordure or centré + trois cartes à bordure or
      individuelles, regroupées dans un grand cadre bleu marine foncé. */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto mb-10 max-w-2xl rounded-2xl border-[6px] border-accent bg-[#fdf8ec] px-6 py-6 text-center shadow-md sm:px-10 sm:py-7">
            <h2 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">
              Nos trois unités, <span className="text-accent">une même mission</span>
            </h2>
            <p className="text-sm text-muted">Former, encadrer et accompagner chaque apprenant, du préscolaire à l&apos;université.</p>
          </div>

          <div className="rounded-3xl border-[10px] border-primary-dark bg-surface p-6 shadow-lg sm:p-9">
            <div className="grid gap-6 sm:grid-cols-3">
              {schools.map((school) => {
                const Icon = unitIcons[school.slug];
                return (
                  <Link
                    key={school.slug}
                    href={`/${school.slug}`}
                    className="group flex flex-col rounded-xl border-[5px] border-accent bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition group-hover:bg-primary-light">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mb-1.5 text-lg font-bold text-foreground">{school.name}</h3>
                    <p className="mb-4 text-sm text-muted">{school.tagline}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      En savoir plus <span aria-hidden>→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS — mandat "Refonte Section Actualités" (2026-09-06) :
      hiérarchie des bordures inversée — grand cadre commun jaune or foncé,
      trois cartes intérieures à bordure bleu marine foncé, fond crème
      partagé par le conteneur et les cartes. */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="rounded-3xl border-[10px] border-accent bg-[#fdf8ec] p-6 shadow-lg sm:p-10">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">Actualités</h2>
              <p className="text-muted">Les dernières nouvelles du CCIGA.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {newsBuckets.map(({ key, label, keyword }) => {
                const item = findLatestByCategory(news, keyword);
                return (
                  <div key={key} className="flex flex-col rounded-xl border-[5px] border-primary-dark bg-[#fdf8ec] p-6 text-center shadow-sm">
                    <h3 className="mb-2 text-lg font-bold text-foreground">{label}</h3>
                    {item ? (
                      <>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">{formatNewsDate(item.date)}</p>
                        <p className="mb-4 line-clamp-3 text-sm text-muted">{item.excerpt}</p>
                        <Link
                          href={`/actualites/${item.slug}`}
                          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary"
                        >
                          Lire plus <span aria-hidden>→</span>
                        </Link>
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-muted">Aucune nouvelle actualité pour le moment.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/actualites" className="text-sm font-medium text-primary">
              Toutes les actualités →
            </Link>
          </div>
        </div>
      </section>

      {/* ACCÈS RAPIDES — mandat "Refonte Accès Rapides + CTA" (2026-09-06) : les
      six accès deviennent des composants circulaires à bordure or, regroupés
      dans un grand cadre bleu marine foncé aux angles très arrondis. */}
      <section className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="rounded-[40px] border-[10px] border-primary-dark bg-[#fdf8ec] px-6 py-10 shadow-lg sm:rounded-[48px] sm:px-10 sm:py-12">
            <div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-full border-[5px] border-accent bg-white px-3 text-center shadow-sm transition hover:-translate-y-1 hover:border-accent-light hover:shadow-md"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="text-xs font-semibold leading-tight text-foreground">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA "Prêt à rejoindre le CCIGA ?" — double encadrement bleu marine +
      jaune or autour d'un panneau intérieur crème, mandat même session. */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="rounded-[48px] border-[10px] border-primary-dark bg-primary-dark p-3 shadow-xl sm:p-4">
            <div className="rounded-[36px] border-[6px] border-accent bg-[#fdf8ec] px-8 py-12 text-center sm:px-16 sm:py-14">
              <h2 className="mb-3 text-2xl font-bold text-primary-dark lg:text-3xl">Prêt à rejoindre le CCIGA ?</h2>
              <p className="mb-8 text-muted">Commencez votre candidature en ligne dès aujourd&apos;hui.</p>
              <Link
                href="/admission/candidater"
                className="inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-accent-light"
              >
                Candidater / S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
