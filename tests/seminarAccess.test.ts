import { describe, it, expect, vi } from "vitest";
import type { SessionPayload } from "@/lib/auth";

const getActiveSchoolOrAll = vi.fn();
vi.mock("@/lib/institutionContext", () => ({ getActiveSchoolOrAll: () => getActiveSchoolOrAll() }));

const { canManageSeminar, isSeminarStaff } = await import("@/lib/seminarAccess");

function session(userId: number, roles: SessionPayload["roles"]): SessionPayload {
  return { userId, email: "x@y.z", name: "X", roles };
}

describe("lib/seminarAccess", () => {
  const seminar = { school: "ecole-classique" };

  it("staff scoped to the seminar's own institution can manage it", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canManageSeminar(session(3, ["SECRETARIAT"]), seminar)).toBe(true);
  });

  it("staff scoped to a different institution cannot manage it (isolation A != B)", async () => {
    getActiveSchoolOrAll.mockResolvedValue("universite");
    expect(await canManageSeminar(session(3, ["SECRETARIAT"]), seminar)).toBe(false);
  });

  it("a STUDENT is never staff, regardless of institution", async () => {
    getActiveSchoolOrAll.mockResolvedValue("ecole-classique");
    expect(await canManageSeminar(session(8, ["STUDENT"]), seminar)).toBe(false);
  });

  it("no institution chosen yet (null) refuses access defensively", async () => {
    getActiveSchoolOrAll.mockResolvedValue(null);
    expect(await canManageSeminar(session(3, ["SECRETARIAT"]), seminar)).toBe(false);
  });

  it("SUPER_ADMIN in the explicit \"toutes\" scope can manage any institution's seminar", async () => {
    getActiveSchoolOrAll.mockResolvedValue("toutes");
    expect(await canManageSeminar(session(1, ["SUPER_ADMIN"]), seminar)).toBe(true);
  });

  it("isSeminarStaff recognizes the real staff roles only", () => {
    expect(isSeminarStaff(session(1, ["COORDONNATEUR"]))).toBe(true);
    expect(isSeminarStaff(session(1, ["STUDENT"]))).toBe(false);
  });
});
