import { cookies } from "next/headers";
import { SCHOOL_COOKIE, isSchoolKey, ALL_SCHOOLS_VALUE, type SchoolKey } from "@/lib/institutions";

export { SCHOOL_COOKIE, schoolKeys, isSchoolKey, schoolLabels, ALL_SCHOOLS_VALUE } from "@/lib/institutions";
export type { SchoolKey } from "@/lib/institutions";

/** Lecture côté serveur (Server Component / route API) du contexte institutionnel actif. */
export async function getActiveSchool(): Promise<SchoolKey | null> {
  const store = await cookies();
  const value = store.get(SCHOOL_COOKIE)?.value;
  return isSchoolKey(value) ? value : null;
}

export type ActiveSchoolScope = SchoolKey | "toutes" | null;

/**
 * Comme getActiveSchool(), mais distingue explicitement "toutes" (vue globale
 * consciente, réservée SUPER_ADMIN — voir app/api/admin/institution/route.ts
 * qui refuse déjà cette valeur à quiconque d'autre) de null (aucun choix
 * encore fait). Nécessaire partout où l'on doit autoriser la vue globale sans
 * la confondre avec "pas de contexte" (mandat "Mise en état opérationnel").
 */
export async function getActiveSchoolOrAll(): Promise<ActiveSchoolScope> {
  const store = await cookies();
  const value = store.get(SCHOOL_COOKIE)?.value;
  if (value === ALL_SCHOOLS_VALUE) return ALL_SCHOOLS_VALUE;
  return isSchoolKey(value) ? value : null;
}

/** true dès qu'un choix explicite a été fait (une école précise OU "toutes"). */
export async function hasChosenInstitution(): Promise<boolean> {
  const store = await cookies();
  return !!store.get(SCHOOL_COOKIE)?.value;
}
