/**
 * Couche d'adaptation pour les exports institutionnels MENFP.
 *
 * Aucun gabarit officiel du Ministère de l'Éducation Nationale et de la
 * Formation Professionnelle n'est présent dans ce projet et aucun n'est
 * inventé ici. Ce fichier expose uniquement un point d'extension stable :
 * quand l'établissement fournit le gabarit officiel (colonnes exactes,
 * ordre, libellés), il s'enregistre via `registerMenfpTemplate()` et
 * l'export devient disponible sans qu'aucune route ni aucun composant
 * n'ait besoin d'être réécrit — seul le mappage de colonnes est spécifique,
 * le moteur (`lib/excelExport.ts`) est déjà réutilisé tel quel.
 */

import type { ExportColumn } from "@/lib/excelExport";

export interface MenfpTemplate {
  id: string;
  label: string;
  columns: ExportColumn[];
  /** Construit les lignes à partir des données déjà chargées par l'appelant. */
  buildRows: (data: unknown) => Record<string, string | number | null>[];
}

const registeredTemplates = new Map<string, MenfpTemplate>();

export function registerMenfpTemplate(template: MenfpTemplate): void {
  registeredTemplates.set(template.id, template);
}

export function getMenfpTemplate(id: string): MenfpTemplate | null {
  return registeredTemplates.get(id) ?? null;
}

export function listMenfpTemplates(): MenfpTemplate[] {
  return Array.from(registeredTemplates.values());
}

/** Aucun gabarit officiel MENFP n'est enregistré tant qu'il n'est pas fourni par l'établissement. */
export const MENFP_STATUS = "À COMPLÉTER — GABARIT OFFICIEL MENFP À FOURNIR" as const;
