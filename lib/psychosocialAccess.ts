import type { Role } from "@/lib/roles";

/**
 * Source unique de vérité pour l'accès au suivi psychosocial.
 *
 * Décision produit prise (2026-08-27) : le rôle CONSEILLER/PSYCHOLOGUE est
 * activé, à moindre privilège — il n'apparaît QUE dans ce tableau. Il n'est
 * ajouté à aucune autre liste d'accès admin/finance/académique du projet, et
 * ne peut être attribué que par SUPER_ADMIN (voir `privilegedRoles` dans
 * lib/roles.ts). SUPER_ADMIN reste présent pour la supervision.
 */
export const PSYCHOSOCIAL_ACCESS_ROLES: Role[] = ["SUPER_ADMIN", "CONSEILLER"];
