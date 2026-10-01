/**
 * État physique d'une ressource logistique (mandat "Portail Logistique —
 * migration additive 3 tables", 2026-09-12). Vocabulaire déjà établi par
 * `InventoryItem.condition` — réutilisé tel quel par `Room.condition` plutôt
 * que redéfini une deuxième fois.
 */
export const conditions = ["bon", "moyen", "mauvais", "hors_service"] as const;
export type ResourceCondition = (typeof conditions)[number];

export function isResourceCondition(value: unknown): value is ResourceCondition {
  return typeof value === "string" && (conditions as readonly string[]).includes(value);
}

export const conditionLabels: Record<ResourceCondition, { label: string; badge: string }> = {
  bon: { label: "Bon", badge: "badge-success" },
  moyen: { label: "Moyen", badge: "badge-warning" },
  mauvais: { label: "Mauvais", badge: "badge-danger" },
  hors_service: { label: "Hors service", badge: "badge-neutral" },
};
