import { describe, it, expect, vi } from "vitest";
import type { SessionPayload } from "@/lib/auth";

const getActiveSchoolOrAll = vi.fn();
vi.mock("@/lib/institutionContext", () => ({ getActiveSchoolOrAll: () => getActiveSchoolOrAll() }));

vi.mock("@/lib/db", () => ({
  prisma: {
    program: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: string } }) =>
        id === "prog-a" ? { id: "prog-a", school: "ecole-classique" } : null,
      ),
    },
  },
}));

const { canAccessInternship, isInternshipStaff } = await import("@/lib/internshipAccess");

function session(userId: number, roles: SessionPayload["roles"]): SessionPayload {
  return { userId, email: "x@y.z", name: "X", roles };
}

describe("lib/internshipAccess", () => {
  const internship = { studentId: 8, internalSupervisorId: 50, programId: "prog-a" };

  it("the owning student can access their own internship", async () => {
    expect(await canAccessInternship(session(8, ["STUDENT"]), internship)).toBe(true);
  });

  it("the assigned internal supervisor can access it regardless of institution", async () => {
    expect(await canAccessInternship(session(50, ["TEACHER"]), internship)).toBe(true);
  });

  it("a different teacher (not the assigned supervisor) cannot access it", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessInternship(session(51, ["TEACHER"]), internship)).toBe(false);
  });

  it("staff scoped to the same institution as the program can access it", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canAccessInternship(session(3, ["SECRETARIAT"]), internship)).toBe(true);
  });

  it("staff scoped to a different institution cannot access it", async () => {
    getActiveSchoolOrAll.mockResolvedValue("universite");
    expect(await canAccessInternship(session(3, ["SECRETARIAT"]), internship)).toBe(false);
  });

  it("isInternshipStaff recognizes the real staff roles only", () => {
    expect(isInternshipStaff(session(1, ["COORDONNATEUR"]))).toBe(true);
    expect(isInternshipStaff(session(1, ["TEACHER"]))).toBe(false);
    expect(isInternshipStaff(session(1, ["STUDENT"]))).toBe(false);
  });
});
