import { cookies } from "next/headers";
import { SCHOOL_COOKIE, isSchoolKey, type SchoolKey } from "@/lib/institutions";

export { SCHOOL_COOKIE, schoolKeys, isSchoolKey, schoolLabels, ALL_SCHOOLS_VALUE } from "@/lib/institutions";
export type { SchoolKey } from "@/lib/institutions";

/** Lecture côté serveur (Server Component / route API) du contexte institutionnel actif. */
export async function getActiveSchool(): Promise<SchoolKey | null> {
  const store = await cookies();
  const value = store.get(SCHOOL_COOKIE)?.value;
  return isSchoolKey(value) ? value : null;
}

/** true dès qu'un choix explicite a été fait (une école précise OU "toutes"). */
export async function hasChosenInstitution(): Promise<boolean> {
  const store = await cookies();
  return !!store.get(SCHOOL_COOKIE)?.value;
}
