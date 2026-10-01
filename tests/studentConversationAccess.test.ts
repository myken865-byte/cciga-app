import { describe, it, expect, vi } from "vitest";
import type { SessionPayload } from "@/lib/auth";

const getActiveSchoolOrAll = vi.fn();
vi.mock("@/lib/institutionContext", () => ({ getActiveSchoolOrAll: () => getActiveSchoolOrAll() }));

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: number } }) =>
        id === 8 ? { id: 8, program: { school: "ecole-classique" } } : null,
      ),
      findMany: vi.fn(async () => []),
    },
  },
}));

const { canAccessStudentConversation, isAnyStudentConversationStaff } = await import("@/lib/studentConversationAccess");

function session(userId: number, roles: SessionPayload["roles"]): SessionPayload {
  return { userId, email: "x@y.z", name: "X", roles };
}

describe("lib/studentConversationAccess", () => {
  const conv = { studentId: 8, staffId: 50, service: "secretariat" };
  const teacherConv = { studentId: 8, staffId: 50, service: "enseignant" };

  it("the owning student can always access their own conversation", async () => {
    expect(await canAccessStudentConversation(session(8, ["STUDENT"]), conv)).toBe(true);
  });

  it("a different student cannot read someone else's conversation", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessStudentConversation(session(9, ["STUDENT"]), conv)).toBe(false);
  });

  it("staff for the routed service, same institution, can access it", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessStudentConversation(session(3, ["SECRETARIAT"]), conv)).toBe(true);
  });

  it("staff for a different institution cannot access it", async () => {
    getActiveSchoolOrAll.mockResolvedValue("universite");
    expect(await canAccessStudentConversation(session(3, ["SECRETARIAT"]), conv)).toBe(false);
  });

  it("for service=\"enseignant\", only the specifically assigned teacher may access it as staff", async () => {
    expect(await canAccessStudentConversation(session(50, ["TEACHER"]), teacherConv)).toBe(true);
    expect(await canAccessStudentConversation(session(99, ["TEACHER"]), teacherConv)).toBe(false);
  });

  it("a TEACHER who is not the assigned staffId is refused even with the right role", async () => {
    expect(await canAccessStudentConversation(session(51, ["TEACHER"]), teacherConv)).toBe(false);
  });

  it("ADMIN/SUPER_ADMIN keep oversight on \"enseignant\" conversations, scoped by institution", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessStudentConversation(session(1, ["ADMIN"]), teacherConv)).toBe(true);
  });

  it("isAnyStudentConversationStaff recognizes every role that handles at least one service", () => {
    expect(isAnyStudentConversationStaff(session(1, ["SECRETARIAT"]))).toBe(true);
    expect(isAnyStudentConversationStaff(session(1, ["ACADEMIC_OFFICER"]))).toBe(true);
    expect(isAnyStudentConversationStaff(session(1, ["TEACHER"]))).toBe(true);
    expect(isAnyStudentConversationStaff(session(1, ["STUDENT"]))).toBe(false);
  });
});
