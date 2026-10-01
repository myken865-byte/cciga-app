/**
 * Workflow de maintenance générique (mandat "Portail Logistique — migration
 * additive 3 tables", 2026-09-12) — une seule table `MaintenanceRequest`
 * pour équipement/salle/véhicule/autre, jamais une table par type de
 * ressource (voir lib/maintenanceAccess.ts pour la validation de la
 * ressource référencée).
 */
export const maintenanceStatuses = ["signalee", "assignee", "en_cours", "terminee", "cloturee"] as const;
export type MaintenanceStatus = (typeof maintenanceStatuses)[number];

export function isMaintenanceStatus(value: unknown): value is MaintenanceStatus {
  return typeof value === "string" && (maintenanceStatuses as readonly string[]).includes(value);
}

export const maintenanceStatusLabels: Record<MaintenanceStatus, string> = {
  signalee: "Signalée",
  assignee: "Assignée",
  en_cours: "En cours",
  terminee: "Terminée",
  cloturee: "Clôturée",
};

export const maintenanceResourceTypes = ["equipement", "salle", "vehicule", "autre"] as const;
export type MaintenanceResourceType = (typeof maintenanceResourceTypes)[number];

export function isMaintenanceResourceType(value: unknown): value is MaintenanceResourceType {
  return typeof value === "string" && (maintenanceResourceTypes as readonly string[]).includes(value);
}

export const maintenanceResourceTypeLabels: Record<MaintenanceResourceType, string> = {
  equipement: "Équipement (inventaire)",
  salle: "Salle",
  vehicule: "Véhicule",
  autre: "Autre ressource",
};

/**
 * Transitions autorisées du workflow `signalée → assignée → en_cours →
 * terminée → clôturée`. Pas de retour en arrière (une clôture est
 * définitive), pas de saut d'étape — chaque transition est linéaire et
 * strictement au cran suivant.
 */
const ALLOWED_TRANSITIONS: Record<MaintenanceStatus, MaintenanceStatus[]> = {
  signalee: ["assignee"],
  assignee: ["en_cours"],
  en_cours: ["terminee"],
  terminee: ["cloturee"],
  cloturee: [],
};

export function isValidMaintenanceTransition(from: MaintenanceStatus, to: MaintenanceStatus): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}
