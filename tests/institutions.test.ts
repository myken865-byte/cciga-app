import { describe, it, expect } from "vitest";
import { schoolKeys, isSchoolKey, schoolLabels, ALL_SCHOOLS_VALUE } from "@/lib/institutions";

describe("lib/institutions", () => {
  it("recognizes exactly the 3 real schools as valid keys", () => {
    for (const key of schoolKeys) {
      expect(isSchoolKey(key)).toBe(true);
    }
    expect(schoolKeys).toHaveLength(3);
  });

  it("rejects the special 'toutes' value as a school key (it means no filter, not a school)", () => {
    expect(isSchoolKey(ALL_SCHOOLS_VALUE)).toBe(false);
  });

  it("rejects garbage/empty values", () => {
    expect(isSchoolKey("production")).toBe(false);
    expect(isSchoolKey("")).toBe(false);
    expect(isSchoolKey(undefined)).toBe(false);
    expect(isSchoolKey(null)).toBe(false);
  });

  it("every school key has a label", () => {
    for (const key of schoolKeys) {
      expect(schoolLabels[key]).toBeTruthy();
    }
  });
});
