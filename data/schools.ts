export type SchoolSlug = "ecole-classique" | "ecole-professionnelle" | "universite";

export interface School {
  slug: SchoolSlug;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export const schools: School[] = [
  {
    slug: "ecole-classique",
    name: "École Classique",
    tagline: "Un parcours fondamental solide, de la maternelle au secondaire",
    description:
      "L'École Classique du CCIGA offre un cursus académique structuré, axé sur les fondamentaux, la rigueur et l'accompagnement personnalisé des élèves, de la maternelle jusqu'à la fin du secondaire.",
    highlights: [
      "Encadrement pédagogique personnalisé",
      "Préparation aux examens officiels",
      "Activités parascolaires et vie associative",
      "Suivi régulier des parents via le portail dédié",
    ],
  },
  {
    slug: "ecole-professionnelle",
    name: "École Professionnelle",
    tagline: "Des compétences pratiques directement connectées au marché du travail",
    description:
      "L'École Professionnelle du CCIGA forme des techniciens et professionnels qualifiés à travers des programmes courts, orientés vers la pratique et les besoins concrets des entreprises et institutions.",
    highlights: [
      "Formations courtes et intensives",
      "Stages et projets pratiques",
      "Certificats reconnus par le secteur",
      "Partenariats avec des entreprises locales",
    ],
  },
  {
    slug: "universite",
    name: "Université",
    tagline: "Des programmes de licence et de spécialisation de niveau supérieur",
    description:
      "L'Université du CCIGA propose des programmes de premier cycle et de spécialisation dans plusieurs facultés, avec un corps professoral engagé et une approche pédagogique moderne.",
    highlights: [
      "Facultés multidisciplinaires",
      "Corps professoral qualifié",
      "Recherche et projets appliqués",
      "Vie étudiante active",
    ],
  },
];

export function getSchools(): School[] {
  return schools;
}

export function getSchoolBySlug(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug);
}
