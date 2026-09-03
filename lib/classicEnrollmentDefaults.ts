import { prisma } from "@/lib/db";

/**
 * Valeurs par défaut proposées (jamais imposées) à la création d'une
 * nouvelle fiche — date d'inscription du jour et année scolaire active,
 * toutes deux modifiables ensuite par le Secrétariat (items 2 et 11).
 */
export async function defaultClassicEnrollmentFormData() {
  const activeYear = await prisma.academicYear.findFirst({ where: { isActive: true }, select: { id: true } });
  return {
    registrationDate: new Date().toISOString().slice(0, 10),
    academicYearId: activeYear?.id,
  };
}
