import { describe, it, expect } from "vitest";
import { isStudentConversationService, studentConversationServices, studentConversationServiceRoles } from "@/lib/studentConversations";

describe("lib/studentConversations", () => {
  it("accepts real services and refuses unknown ones", () => {
    expect(isStudentConversationService("enseignant")).toBe(true);
    expect(isStudentConversationService("inexistant")).toBe(false);
  });

  it("every service maps to at least one real staff role (no dead-end routing)", () => {
    for (const s of studentConversationServices) {
      expect(studentConversationServiceRoles[s].length).toBeGreaterThan(0);
    }
  });
});
