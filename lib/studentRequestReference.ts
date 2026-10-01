/**
 * Référence lisible dérivée de l'id déjà unique de la demande — même
 * principe que lib/document-reference.ts (jamais un second compteur
 * stocké).
 */
export function formatStudentRequestReference(id: string): string {
  return `CCIGA-DA-${id.slice(-10).toUpperCase()}`;
}
