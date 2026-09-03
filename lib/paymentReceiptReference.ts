/**
 * Référence de reçu de paiement — dérivée de l'id (cuid) déjà unique du
 * `Payment`, jamais d'un compteur séquentiel stocké. Suit exactement la même
 * convention que les fiches d'inscription (lib/enrollmentFormReference.ts,
 * lib/classicEnrollmentFormReference.ts) : préfixe distinct, 10 derniers
 * caractères de l'id en majuscules.
 */
export function formatPaymentReceiptReference(id: string): string {
  return `CCIGA-REC-${id.slice(-10).toUpperCase()}`;
}
