import type { SchoolKey } from "@/lib/institutions";

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13) — un seul moteur
 * de portail, un thème dynamique résolu à partir de l'institution ET du
 * niveau réels de l'enfant sélectionné. Jamais une 4e institution : le
 * schéma n'en connaît que 3 (lib/institutions.ts:
 * "ecole-classique" | "ecole-professionnelle" | "universite") — confirmé de
 * nouveau ici. "CCIGA Kindergarten" correspond au niveau "prescolaire" déjà
 * existant au sein de l'École Classique (lib/niveaux.ts : "prescolaire" =
 * "Kindergarten / Préscolaire", label déjà établi avant cette mission,
 * jamais inventé). Aucune migration : ce fichier ne fait que choisir un
 * habillage visuel, jamais une nouvelle valeur de school.
 */
export type ParentPortalVariant = "kindergarten" | "ecole-classique" | "ecole-professionnelle" | "universite";

export interface ParentPortalTheme {
  variant: ParentPortalVariant;
  institutionLabel: string;
  tagline: string;
  /** Libellés de module adaptés par institution (§16) — jamais une donnée, seulement un intitulé. */
  moduleLabels: {
    devoirs: string;
    presence: string;
    finance: string;
    evolution: string;
  };
}

export function resolveParentPortalVariant(school: SchoolKey | null | undefined, niveau: string | null | undefined): ParentPortalVariant {
  if (school === "ecole-classique" && niveau === "prescolaire") return "kindergarten";
  if (school === "ecole-professionnelle") return "ecole-professionnelle";
  if (school === "universite") return "universite";
  return "ecole-classique";
}

const THEMES: Record<ParentPortalVariant, ParentPortalTheme> = {
  kindergarten: {
    variant: "kindergarten",
    institutionLabel: "CCIGA Kindergarten",
    tagline: "Plus qu'une école, une grande famille !",
    moduleLabels: {
      devoirs: "Activités",
      presence: "Présence",
      finance: "Frais de scolarité",
      evolution: "Évolution et développement",
    },
  },
  "ecole-classique": {
    variant: "ecole-classique",
    institutionLabel: "CCIGA École Classique",
    tagline: "Un parcours solide pour un grand avenir !",
    moduleLabels: {
      devoirs: "Devoirs",
      presence: "Présence",
      finance: "Frais de scolarité",
      evolution: "Évolution académique",
    },
  },
  "ecole-professionnelle": {
    variant: "ecole-professionnelle",
    institutionLabel: "CCIGA École Professionnelle",
    tagline: "Des compétences aujourd'hui, un avenir meilleur demain !",
    moduleLabels: {
      devoirs: "Travaux & stages",
      presence: "Présence",
      finance: "Frais de scolarité",
      evolution: "Évolution académique",
    },
  },
  universite: {
    variant: "universite",
    institutionLabel: "CCIGA Université",
    tagline: "Accompagner aujourd'hui, construire les grands leaders de demain !",
    moduleLabels: {
      devoirs: "Devoirs & travaux",
      presence: "Présence",
      finance: "Frais de scolarité",
      evolution: "Parcours académique",
    },
  },
};

export function getParentPortalTheme(school: SchoolKey | null | undefined, niveau: string | null | undefined): ParentPortalTheme {
  return THEMES[resolveParentPortalVariant(school, niveau)];
}
