/**
 * Mandat "Finalisation portail Conseiller / Psychosocial" (2026-09-12).
 *
 * Le seul destinataire légitime, déductible du schéma existant (sans
 * inventer de notion d'"assignation"), est la personne qui a ouvert le
 * dossier (`PsychosocialCase.openedById`) — quand une AUTRE personne
 * (un autre conseiller ou SUPER_ADMIN) ajoute une note ou change le statut.
 * Si l'auteur de l'action est la même personne que l'ouvreur du dossier,
 * aucune notification n'est nécessaire (on ne se notifie pas soi-même).
 *
 * Le contenu de la notification (voir appels dans app/api/admin/psychosocial/
 * [id]/route.ts) reste volontairement générique — jamais le nom de
 * l'étudiant, jamais le contenu de la note, jamais le diagnostic — pour ne
 * pas faire fuiter d'information confidentielle dans un système de
 * notification généraliste (NotificationBell) partagé avec tout le reste
 * de l'application.
 */
export function caseUpdateNotificationRecipient(actorId: number, openedById: number): number | null {
  return actorId === openedById ? null : openedById;
}
