// Le numéro de fiche affiché (CCIGA-FI-xxxxxxxxxx / CCIGA-FEC-xxxxxxxxxx) est
// dérivé de l'id, jamais stocké séparément (voir enrollmentFormReference.ts /
// classicEnrollmentFormReference.ts) — donc "recherchable dans le
// Secrétariat" (règle permanente item 1) signifie : si le Secrétariat colle
// le numéro affiché tel quel (préfixe compris) dans la recherche, celle-ci
// doit quand même trouver la fiche. On retire le préfixe connu avant de
// chercher une correspondance sur l'id lui-même.
const KNOWN_REFERENCE_PREFIXES = ["CCIGA-FEC-", "CCIGA-FI-"];

export function normalizeEnrollmentSearchQuery(query: string): string {
  const upper = query.trim().toUpperCase();
  const prefix = KNOWN_REFERENCE_PREFIXES.find((p) => upper.startsWith(p));
  return prefix ? query.trim().slice(prefix.length) : query.trim();
}
