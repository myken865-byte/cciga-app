import { describe, it, expect, vi } from "vitest";
import type { SessionPayload } from "@/lib/auth";

vi.mock("@/lib/db", () => ({
  prisma: {
    faculty: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: string } }) => {
        if (id === "faculty-a") return { id: "faculty-a", doyenId: 10 };
        if (id === "faculty-b") return { id: "faculty-b", doyenId: 99 };
        return null;
      }),
    },
  },
}));

const { canGovernReviewCourse, isDoyenOfFaculty } = await import("@/lib/governance/scope");

function session(userId: number, roles: SessionPayload["roles"]): SessionPayload {
  return { userId, email: "x@y.z", name: "X", roles };
}

describe("lib/governance/scope — canGovernReviewCourse", () => {
  it("ADMIN/SUPER_ADMIN/ACADEMIC_OFFICER always pass, regardless of the course's faculty/program", () => {
    return Promise.all([
      canGovernReviewCourse(session(1, ["ADMIN"]), { academicFacultyId: "faculty-b", coordinatorId: 999 }),
      canGovernReviewCourse(session(1, ["SUPER_ADMIN"]), { academicFacultyId: null, coordinatorId: null }),
      canGovernReviewCourse(session(1, ["ACADEMIC_OFFICER"]), { academicFacultyId: "faculty-b", coordinatorId: 999 }),
    ]).then(([a, b, c]) => {
      expect(a).toBe(true);
      expect(b).toBe(true);
      expect(c).toBe(true);
    });
  });

  it("DOYEN passes only for a course whose program belongs to a faculty they preside", async () => {
    expect(await canGovernReviewCourse(session(10, ["DOYEN"]), { academicFacultyId: "faculty-a", coordinatorId: null })).toBe(true);
    expect(await canGovernReviewCourse(session(10, ["DOYEN"]), { academicFacultyId: "faculty-b", coordinatorId: null })).toBe(false);
  });

  it("COORDONNATEUR passes only for a course whose program they coordinate", async () => {
    expect(await canGovernReviewCourse(session(7, ["COORDONNATEUR"]), { academicFacultyId: null, coordinatorId: 7 })).toBe(true);
    expect(await canGovernReviewCourse(session(7, ["COORDONNATEUR"]), { academicFacultyId: null, coordinatorId: 8 })).toBe(false);
  });

  it("an unrelated role is refused", async () => {
    expect(await canGovernReviewCourse(session(1, ["TEACHER"]), { academicFacultyId: "faculty-a", coordinatorId: null })).toBe(false);
  });
});

describe("lib/governance/scope — isDoyenOfFaculty", () => {
  it("true only for the faculty's own doyenId", async () => {
    expect(await isDoyenOfFaculty(10, "faculty-a")).toBe(true);
    expect(await isDoyenOfFaculty(99, "faculty-a")).toBe(false);
    expect(await isDoyenOfFaculty(10, null)).toBe(false);
  });
});
