import { describe, it, expect, vi } from "vitest";
import type { Role } from "@/lib/roles";

vi.mock("@/lib/db", () => ({
  prisma: {
    course: {
      findFirst: vi.fn(async ({ where }: { where: { teacherId: number; programId: string } }) =>
        where.teacherId === 50 && where.programId === "prog-a" ? { id: "course-1" } : null,
      ),
    },
  },
}));

const { canAddObservation } = await import("@/lib/observationAccess");

const studentInProgramA = { programId: "prog-a", program: { titulaireId: 99 } };
const studentWithNoProgram = { programId: null, program: null };

describe("lib/observationAccess — canAddObservation", () => {
  it("always allows ADMIN, regardless of any course/titulaire link", async () => {
    const admin = { userId: 1, email: "a@x.com", name: "Admin", roles: ["ADMIN"] as Role[] };
    expect(await canAddObservation(admin, studentInProgramA)).toBe(true);
  });

  it("allows the class titulaire", async () => {
    const titulaire = { userId: 99, email: "t@x.com", name: "Titulaire", roles: ["TEACHER"] as Role[] };
    expect(await canAddObservation(titulaire, studentInProgramA)).toBe(true);
  });

  it("allows a non-titulaire TEACHER who really teaches a course in this program (Phase 2 P1)", async () => {
    const subjectTeacher = { userId: 50, email: "st@x.com", name: "Subject Teacher", roles: ["TEACHER"] as Role[] };
    expect(await canAddObservation(subjectTeacher, studentInProgramA)).toBe(true);
  });

  it("refuses a TEACHER with no course in this program — never a bare role check", async () => {
    const unrelatedTeacher = { userId: 77, email: "u@x.com", name: "Unrelated Teacher", roles: ["TEACHER"] as Role[] };
    expect(await canAddObservation(unrelatedTeacher, studentInProgramA)).toBe(false);
  });

  it("refuses STUDENT and PARENT outright, even if userId happens to equal the titulaire's id — role is checked before ownership", async () => {
    const impersonator = { userId: 99, email: "s@x.com", name: "Student", roles: ["STUDENT"] as Role[] };
    expect(await canAddObservation(impersonator, studentInProgramA)).toBe(false);
    const parent = { userId: 99, email: "p@x.com", name: "Parent", roles: ["PARENT"] as Role[] };
    expect(await canAddObservation(parent, studentInProgramA)).toBe(false);
  });

  it("refuses when the student has no program at all", async () => {
    const teacher = { userId: 50, email: "st@x.com", name: "Subject Teacher", roles: ["TEACHER"] as Role[] };
    expect(await canAddObservation(teacher, studentWithNoProgram)).toBe(false);
  });
});
