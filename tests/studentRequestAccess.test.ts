import { describe, it, expect, vi } from "vitest";
import type { SessionPayload } from "@/lib/auth";

const getActiveSchoolOrAll = vi.fn();
vi.mock("@/lib/institutionContext", () => ({ getActiveSchoolOrAll: () => getActiveSchoolOrAll() }));

const isParentOfStudent = vi.fn();
vi.mock("@/lib/parentAccess", () => ({ isParentOfStudent: (...args: unknown[]) => isParentOfStudent(...args) }));

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: number } }) =>
        id === 8 ? { id: 8, program: { school: "ecole-classique" } } : null,
      ),
    },
  },
}));

const { canAccessStudentRequest, isAnyStudentRequestStaff } = await import("@/lib/studentRequestAccess");

function session(userId: number, roles: SessionPayload["roles"]): SessionPayload {
  return { userId, email: "x@y.z", name: "X", roles };
}

describe("lib/studentRequestAccess", () => {
  const request = { studentId: 8 };

  it("the owning student can always access their own request", async () => {
    isParentOfStudent.mockResolvedValue(false);
    expect(await canAccessStudentRequest(session(8, ["STUDENT"]), request)).toBe(true);
  });

  it("a different student cannot access someone else's request (jamais fuite inter-élève)", async () => {
    isParentOfStudent.mockResolvedValue(false);
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessStudentRequest(session(9, ["STUDENT"]), request)).toBe(false);
  });

  it("a linked parent can access the generated document", async () => {
    isParentOfStudent.mockResolvedValue(true);
    expect(await canAccessStudentRequest(session(5, ["PARENT"]), request)).toBe(true);
  });

  it("staff scoped to the same institution as the student can access it", async () => {
    isParentOfStudent.mockResolvedValue(false);
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessStudentRequest(session(3, ["SECRETARIAT"]), request)).toBe(true);
  });

  it("staff scoped to a different institution cannot access it, even by guessing the id", async () => {
    isParentOfStudent.mockResolvedValue(false);
    getActiveSchoolOrAll.mockResolvedValue("universite");
    expect(await canAccessStudentRequest(session(3, ["SECRETARIAT"]), request)).toBe(false);
  });

  it("no institution chosen yet (null) refuses staff access defensively", async () => {
    isParentOfStudent.mockResolvedValue(false);
    getActiveSchoolOrAll.mockResolvedValue(null);
    expect(await canAccessStudentRequest(session(3, ["SECRETARIAT"]), request)).toBe(false);
  });

  it("SUPER_ADMIN in the explicit \"toutes\" scope can access any institution's request", async () => {
    isParentOfStudent.mockResolvedValue(false);
    getActiveSchoolOrAll.mockResolvedValue("toutes");
    expect(await canAccessStudentRequest(session(1, ["SUPER_ADMIN"]), request)).toBe(true);
  });

  it("a role with no service (e.g. TEACHER) never qualifies as staff for this module", async () => {
    isParentOfStudent.mockResolvedValue(false);
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessStudentRequest(session(3, ["TEACHER"]), request)).toBe(false);
  });

  it("isAnyStudentRequestStaff recognizes ADMIN/SUPER_ADMIN/SECRETARIAT only", () => {
    expect(isAnyStudentRequestStaff(session(1, ["ADMIN"]))).toBe(true);
    expect(isAnyStudentRequestStaff(session(1, ["SECRETARIAT"]))).toBe(true);
    expect(isAnyStudentRequestStaff(session(1, ["TEACHER"]))).toBe(false);
    expect(isAnyStudentRequestStaff(session(1, ["STUDENT"]))).toBe(false);
  });
});
