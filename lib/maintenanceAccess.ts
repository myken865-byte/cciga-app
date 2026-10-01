import { prisma } from "@/lib/db";
import type { MaintenanceResourceType } from "@/lib/maintenance";
import type { SchoolKey } from "@/lib/institutions";

/**
 * Valide qu'une ressource référencée par (resourceType, resourceId) existe
 * réellement et appartient bien à l'institution active — jamais fait
 * confiance au resourceId fourni par le client (mandat "Portail Logistique",
 * 2026-09-12, §4). `resourceType: "autre"` n'a par définition aucune table à
 * vérifier ; toujours acceptée sans contrôle d'existence, mais reste scopée
 * par l'institution de la demande elle-même.
 */
export async function validateMaintenanceResource(
  resourceType: MaintenanceResourceType,
  resourceId: string,
  school: SchoolKey,
): Promise<boolean> {
  if (resourceType === "autre") return true;

  if (resourceType === "equipement") {
    const item = await prisma.inventoryItem.findUnique({ where: { id: resourceId } });
    return item?.school === school;
  }
  if (resourceType === "salle") {
    const room = await prisma.room.findUnique({ where: { id: resourceId } });
    return room?.school === school;
  }
  if (resourceType === "vehicule") {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: resourceId } });
    return vehicle?.school === school;
  }
  return false;
}
