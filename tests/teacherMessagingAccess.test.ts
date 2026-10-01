import { describe, it, expect } from "vitest";
import { studentConversationServiceRoles } from "@/lib/studentConversations";
import { hasAnyRole } from "@/lib/roles";

/**
 * Mission "Portail Enseignant — Phase 1 P0" (2026-09-13), §4/§12 — verrou de
 * non-régression RBAC pour le lien Messagerie ajouté au portail enseignant :
 * le service "enseignant" ne doit jamais s'élargir au-delà de
 * ADMIN/SUPER_ADMIN/TEACHER (l'isolation par conversation — staffId — est
 * testée en direct sur DEVTEST, pas mockable ici sans base de données).
 */
describe("lib/studentConversations — service 'enseignant', moindre privilège", () => {
  it("grants exactly ADMIN, SUPER_ADMIN, TEACHER — nothing broader", () => {
    expect(studentConversationServiceRoles.enseignant.sort()).toEqual(["ADMIN", "SUPER_ADMIN", "TEACHER"].sort());
  });

  it("TEACHER passes the 'enseignant' service gate", () => {
    expect(hasAnyRole(["TEACHER"], studentConversationServiceRoles.enseignant)).toBe(true);
  });

  it("STUDENT and PARENT are refused the 'enseignant' service — access is not implied", () => {
    expect(hasAnyRole(["STUDENT"], studentConversationServiceRoles.enseignant)).toBe(false);
    expect(hasAnyRole(["PARENT"], studentConversationServiceRoles.enseignant)).toBe(false);
  });

  it("SECRETARIAT/ACADEMIC_OFFICER are refused the 'enseignant' service (routed to their own services instead)", () => {
    expect(hasAnyRole(["SECRETARIAT"], studentConversationServiceRoles.enseignant)).toBe(false);
    expect(hasAnyRole(["ACADEMIC_OFFICER"], studentConversationServiceRoles.enseignant)).toBe(false);
  });
});
