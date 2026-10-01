/**
 * Mission "Correction des 5 blockers P0" (2026-09-13), §1 — extraction pure
 * et testable du correctif de perte de données : un PATCH partiel (ex.
 * `{status:"validee"}` seul) ne doit jamais effacer un champ absent du
 * body, il doit conserver la valeur déjà en base. Avant ce correctif,
 * app/api/admin/inscriptions-ecole-classique/[id]/route.ts défaultait
 * chaque champ absent à "" / null au lieu de retomber sur `existing.<champ>`
 * — reproduit et confirmé en direct sur DEVTEST (prénom/nom/programme
 * effacés par un PATCH de statut seul). Ces fonctions encodent la règle une
 * seule fois, réutilisée par toute route de sauvegarde partielle.
 */
export function mergeStr(body: Record<string, unknown>, key: string, current: string): string {
  const v = body[key];
  return typeof v === "string" ? v : current;
}

export function mergeNullableStr(body: Record<string, unknown>, key: string, current: string | null): string | null {
  const v = body[key];
  if (v === undefined) return current;
  if (v === null) return null;
  return typeof v === "string" && v.length > 0 ? v : null;
}

export function mergeNullableBool(body: Record<string, unknown>, key: string, current: boolean | null): boolean | null {
  const v = body[key];
  if (v === undefined) return current;
  return typeof v === "boolean" ? v : null;
}

export function mergeNullableInt(body: Record<string, unknown>, key: string, current: number | null): number | null {
  const v = body[key];
  if (v === undefined) return current;
  if (v === null) return null;
  return typeof v === "number" && Number.isInteger(v) ? v : current;
}
