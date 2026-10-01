import type { Role } from "@/lib/roles";

/**
 * Services destinataires pour la messagerie élève/étudiant (StudentConversation).
 * Aucun rôle FINANCE/SUPPORT n'existe dans lib/roles.ts — ces services sont
 * routés vers les rôles réels existants, même principe que
 * lib/parentRequests.ts `parentRequestServiceRoles` (jamais modifié).
 */
export const studentConversationServices = [
  "secretariat",
  "administration",
  "comptabilite",
  "direction_pedagogique",
  "enseignant",
  "support",
] as const;

export type StudentConversationService = (typeof studentConversationServices)[number];

export const studentConversationServiceLabels: Record<StudentConversationService, string> = {
  secretariat: "Secrétariat",
  administration: "Administration",
  comptabilite: "Comptabilité / Finance",
  direction_pedagogique: "Responsable académique",
  enseignant: "Un enseignant de mes cours",
  support: "Support",
};

/** Rôles réels autorisés à traiter une conversation routée vers ce service. "enseignant" est un cas particulier : voir lib/studentConversationAccess.ts (le seul enseignant autorisé est celui assigné, pas tout TEACHER). */
export const studentConversationServiceRoles: Record<StudentConversationService, Role[]> = {
  secretariat: ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"],
  administration: ["ADMIN", "SUPER_ADMIN"],
  comptabilite: ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"],
  direction_pedagogique: ["ADMIN", "SUPER_ADMIN", "ACADEMIC_OFFICER"],
  enseignant: ["ADMIN", "SUPER_ADMIN", "TEACHER"],
  support: ["ADMIN", "SUPER_ADMIN"],
};

export function isStudentConversationService(value: string): value is StudentConversationService {
  return (studentConversationServices as readonly string[]).includes(value);
}
