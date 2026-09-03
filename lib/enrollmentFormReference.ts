/**
 * Numéro de fiche affiché, dérivé de l'id déjà unique de la fiche — même
 * convention que formatDocumentReference/computeAutoBadgeNumber, jamais
 * horodaté, jamais stocké séparément. Le numéro existe dès que la fiche est
 * enregistrée (persistée en base), même à l'état brouillon.
 */
export function formatEnrollmentFormReference(id: string): string {
  return `CCIGA-FI-${id.slice(-10).toUpperCase()}`;
}
