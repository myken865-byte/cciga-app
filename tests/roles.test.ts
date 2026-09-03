import { describe, it, expect } from "vitest";
import { isRole, hasRole, hasAnyRole, parseRoles, roleList, privilegedRoles } from "@/lib/roles";

describe("lib/roles", () => {
  it("isRole accepts only real roles", () => {
    expect(isRole("ADMIN")).toBe(true);
    expect(isRole("HACKER")).toBe(false);
    expect(isRole("")).toBe(false);
  });

  it("hasRole checks exact membership", () => {
    expect(hasRole(["PARENT", "TEACHER"], "PARENT")).toBe(true);
    expect(hasRole(["PARENT"], "ADMIN")).toBe(false);
  });

  it("hasAnyRole is true if any allowed role matches", () => {
    expect(hasAnyRole(["SECRETARIAT"], ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"])).toBe(true);
    expect(hasAnyRole(["STUDENT"], ["ADMIN", "SUPER_ADMIN"])).toBe(false);
    expect(hasAnyRole([], ["ADMIN"])).toBe(false);
  });

  it("parseRoles filters out invalid entries from stored JSON", () => {
    expect(parseRoles('["ADMIN", "NOT_REAL", "PARENT"]')).toEqual(["ADMIN", "PARENT"]);
    expect(parseRoles("not json")).toEqual([]);
    expect(parseRoles('{"not":"an array"}')).toEqual([]);
  });

  it("every role in roleList round-trips through isRole", () => {
    for (const r of roleList) {
      expect(isRole(r)).toBe(true);
    }
  });

  it("CONSEILLER is a real role and only SUPER_ADMIN may assign it (privilege gate)", () => {
    expect(isRole("CONSEILLER")).toBe(true);
    expect(privilegedRoles.includes("CONSEILLER")).toBe(true);
  });
});
