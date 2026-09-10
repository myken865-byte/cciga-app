/**
 * Feature flag pour le module Jasmine Kindergarten English Program (mandat
 * "Phase 2 — socle données + synchronisation réelle preprod", 2026-09-09).
 * Suit exactement le même schéma que lib/devBypass.ts::isDevBypassAllowed —
 * deux conditions indépendantes, ni l'une ni l'autre jamais vraies sur le
 * projet Vercel Production réel : VERCEL_ENV n'y vaut jamais "production"
 * sur ce module (déployé uniquement sur le projet preprod), et le second
 * flag est un opt-in explicite, désactivé par défaut, jamais commité dans
 * un .env versionné (.env* est ignoré par git — voir .gitignore).
 *
 * Renommé depuis ENABLE_JASMIN_OFFLINE_LAB (Phase 1) vers
 * ENABLE_JASMIN_KINDERGARTEN_MODULE (Phase 2) sur demande explicite du
 * mandat §6 — aucun environnement partagé ne définit cette variable.
 *
 * Désactivé par défaut : en l'absence de la variable d'environnement,
 * toute route protégée par ce flag renvoie 404 (voir son usage dans
 * app/(site)/laboratoire-jasmin/page.tsx et app/api/lab/jasmin-sync/route.ts).
 */
export function isJasminKindergartenModuleEnabled(): boolean {
  return process.env.VERCEL_ENV !== "production" && process.env.ENABLE_JASMIN_KINDERGARTEN_MODULE === "true";
}
