import { prisma } from "@/lib/db";
import { hasRole, hasAnyRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";
import { GRADE_WORKFLOW_SCHOOLS } from "@/lib/universite";

/**
 * Moteur commun de gouvernance académique (mandat "Gouvernance académique —
 * Rectorat/Décanat/Coordination", 2026-09-12). Un seul concept de scope
 * (facultyIds/programIds déjà résolus en listes concrètes) consommé de la
 * même façon par les trois portails — seule la façon de LE CALCULER diffère
 * par rôle, jamais la façon de l'utiliser en aval (lib/governance/data.ts).
 *
 * Aucune migration : réutilise exactement les relations déjà existantes
 * (Faculty.doyenId, Program.coordinatorId, Program.school) — rien n'est
 * ajouté au schéma.
 */
export interface GovernanceScope {
  facultyIds: string[];
  programIds: string[];
}

/** Recteur : toute l'Université — jamais les autres institutions, sauf droits globaux explicites déjà existants ailleurs (non applicable ici). */
export async function resolveRectoratScope(): Promise<GovernanceScope> {
  const [faculties, programs] = await Promise.all([
    prisma.faculty.findMany({ where: { school: "universite" }, select: { id: true } }),
    prisma.program.findMany({ where: { school: "universite" }, select: { id: true } }),
  ]);
  return { facultyIds: faculties.map((f) => f.id), programIds: programs.map((p) => p.id) };
}

/** Doyen : uniquement la ou les facultés dont il est `doyenId` — SUPER_ADMIN garde la vue globale déjà établie par les pages existantes. */
export async function resolveDecanatScope(session: SessionPayload): Promise<GovernanceScope> {
  const isSuperAdmin = hasRole(session.roles, "SUPER_ADMIN");
  const faculties = await prisma.faculty.findMany({
    where: { school: "universite", ...(isSuperAdmin ? {} : { doyenId: session.userId }) },
    include: { programs: { select: { id: true } } },
  });
  return {
    facultyIds: faculties.map((f) => f.id),
    programIds: faculties.flatMap((f) => f.programs.map((p) => p.id)),
  };
}

/**
 * Responsable académique (ACADEMIC_OFFICER) : périmètre déjà existant et
 * volontairement global à tous les établissements utilisant le workflow de
 * notation (`GRADE_WORKFLOW_SCHOOLS` — lib/universite.ts), pas seulement
 * l'Université. C'est la règle métier déjà en vigueur (app/portail/
 * responsable/page.tsx interrogeait déjà tous les cours de ces écoles sans
 * restriction) — on la formalise ici en `GovernanceScope` sans la restreindre
 * ni l'élargir. Mandat "Finalisation portail Responsable académique"
 * (2026-09-12) : ne PAS transformer ACADEMIC_OFFICER en un rôle scopé comme
 * DOYEN/COORDONNATEUR, ni en ADMIN.
 */
export async function resolveResponsableScope(): Promise<GovernanceScope> {
  const [faculties, programs] = await Promise.all([
    prisma.faculty.findMany({ where: { school: { in: [...GRADE_WORKFLOW_SCHOOLS] } }, select: { id: true } }),
    prisma.program.findMany({ where: { school: { in: [...GRADE_WORKFLOW_SCHOOLS] } }, select: { id: true } }),
  ]);
  return { facultyIds: faculties.map((f) => f.id), programIds: programs.map((p) => p.id) };
}

/** Coordonnateur : uniquement le ou les programmes dont il est `coordinatorId`. */
export async function resolveCoordinationScope(session: SessionPayload): Promise<GovernanceScope> {
  const isSuperAdmin = hasRole(session.roles, "SUPER_ADMIN");
  const programs = await prisma.program.findMany({
    where: { school: "universite", ...(isSuperAdmin ? {} : { coordinatorId: session.userId }) },
    select: { id: true, academicFacultyId: true },
  });
  const facultyIds = Array.from(
    new Set(programs.map((p) => p.academicFacultyId).filter((id): id is string => Boolean(id))),
  );
  return { programIds: programs.map((p) => p.id), facultyIds };
}

/**
 * Vérification de scope réutilisée par les routes API de validation de notes
 * (mandat "Gouvernance académique") : un DOYEN ne peut agir que sur un cours
 * dont le programme appartient à une faculté qu'il préside.
 */
export async function isDoyenOfFaculty(userId: number, facultyId: string | null): Promise<boolean> {
  if (!facultyId) return false;
  const faculty = await prisma.faculty.findUnique({ where: { id: facultyId } });
  return faculty?.doyenId === userId;
}

/**
 * Scope réutilisé par le workflow existant de révision/validation des notes
 * (mandat "Gouvernance académique", 2026-09-12) — jamais une deuxième
 * logique de notation, seulement une vérification supplémentaire pour les
 * rôles DOYEN/COORDONNATEUR avant de les laisser agir sur un cours donné.
 * ADMIN/SUPER_ADMIN/ACADEMIC_OFFICER gardent l'accès global déjà établi
 * (aucun changement pour eux).
 */
export async function canGovernReviewCourse(
  session: SessionPayload,
  course: { academicFacultyId: string | null; coordinatorId: number | null },
): Promise<boolean> {
  if (hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "ACADEMIC_OFFICER"])) return true;
  if (hasRole(session.roles, "DOYEN")) return isDoyenOfFaculty(session.userId, course.academicFacultyId);
  if (hasRole(session.roles, "COORDONNATEUR")) return course.coordinatorId === session.userId;
  return false;
}
