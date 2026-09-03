/**
 * Constantes institutionnelles pures — sûres à importer depuis un composant
 * client ou serveur. La lecture du cookie (next/headers, serveur uniquement)
 * vit séparément dans lib/institutionContext.ts.
 */
export const SCHOOL_COOKIE = "cciga_active_school";

export const schoolKeys = ["ecole-classique", "ecole-professionnelle", "universite"] as const;
export type SchoolKey = (typeof schoolKeys)[number];

export function isSchoolKey(value: string | undefined | null): value is SchoolKey {
  return !!value && (schoolKeys as readonly string[]).includes(value);
}

export const schoolLabels: Record<SchoolKey, string> = {
  "ecole-classique": "École Classique",
  "ecole-professionnelle": "École Professionnelle",
  universite: "Université",
};

/**
 * Valeur de cookie spéciale — "vue globale, toutes institutions confondues".
 * Réservée au SUPER_ADMIN (voir app/admin/institution/page.tsx) : c'est un
 * choix explicite et conscient, jamais la valeur par défaut silencieuse.
 */
export const ALL_SCHOOLS_VALUE = "toutes";
