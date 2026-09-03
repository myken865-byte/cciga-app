/**
 * Numéro de fiche affiché, dérivé de l'id déjà unique de la fiche — même
 * convention que formatEnrollmentFormReference (École Professionnelle),
 * jamais horodaté, jamais stocké séparément. Préfixe FEC pour rester
 * strictement distinct de la fiche École Professionnelle (FI).
 */
export function formatClassicEnrollmentFormReference(id: string): string {
  return `CCIGA-FEC-${id.slice(-10).toUpperCase()}`;
}
