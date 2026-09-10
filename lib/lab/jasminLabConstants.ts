/**
 * Identifiant fictif réservé pour le prototype Jasmine Kindergarten (Phase 2,
 * 2026-09-09) — même principe que DEV_BYPASS_USER_ID dans lib/devBypass.ts :
 * une valeur sentinelle qui ne correspond à AUCUNE ligne réelle de la table
 * User. Utilisé uniquement quand le feature flag est actif, pour permettre
 * de tester le mécanisme de synchronisation sans jamais créer ni référencer
 * de compte d'enfant réel — voir app/api/lab/jasmin-sync/route.ts.
 */
export const JASMIN_DEMO_STUDENT_ID = -101;
