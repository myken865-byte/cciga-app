import { describe, it, expect } from "vitest";
import type { Role } from "@/lib/roles";
import { canManageCourse } from "@/lib/courseAccess";

describe("lib/courseAccess — canManageCourse", () => {
  it("allows ADMIN regardless of who owns the course", () => {
    const admin = { userId: 1, email: "a@x.com", name: "Admin", roles: ["ADMIN"] as Role[] };
    expect(canManageCourse(admin, 999)).toBe(true);
  });

  it("allows the real course teacher", () => {
    const teacher = { userId: 50, email: "t@x.com", name: "Teacher", roles: ["TEACHER"] as Role[] };
    expect(canManageCourse(teacher, 50)).toBe(true);
  });

  it("refuses a different teacher, even with the TEACHER role — ownership is checked, not just role", () => {
    const otherTeacher = { userId: 51, email: "o@x.com", name: "Other Teacher", roles: ["TEACHER"] as Role[] };
    expect(canManageCourse(otherTeacher, 50)).toBe(false);
  });

  it("refuses when the course has no assigned teacher at all", () => {
    const teacher = { userId: 50, email: "t@x.com", name: "Teacher", roles: ["TEACHER"] as Role[] };
    expect(canManageCourse(teacher, null)).toBe(false);
  });

  it("refuses STUDENT/PARENT outright, even if userId happens to equal courseTeacherId — role is checked before ownership", () => {
    const student = { userId: 50, email: "s@x.com", name: "Student", roles: ["STUDENT"] as Role[] };
    expect(canManageCourse(student, 50)).toBe(false);
    const parent = { userId: 50, email: "p@x.com", name: "Parent", roles: ["PARENT"] as Role[] };
    expect(canManageCourse(parent, 50)).toBe(false);
  });
});
