import { describe, it, expect } from "vitest";
import { resolveParentPortalVariant, getParentPortalTheme } from "@/lib/parentPortalTheme";

describe("lib/parentPortalTheme — resolveParentPortalVariant", () => {
  it("maps ecole-classique + prescolaire to kindergarten (no 4th institution invented)", () => {
    expect(resolveParentPortalVariant("ecole-classique", "prescolaire")).toBe("kindergarten");
  });

  it("maps ecole-classique + primaire/secondaire to ecole-classique, not kindergarten", () => {
    expect(resolveParentPortalVariant("ecole-classique", "primaire")).toBe("ecole-classique");
    expect(resolveParentPortalVariant("ecole-classique", "secondaire")).toBe("ecole-classique");
  });

  it("maps ecole-professionnelle regardless of niveau", () => {
    expect(resolveParentPortalVariant("ecole-professionnelle", null)).toBe("ecole-professionnelle");
  });

  it("maps universite regardless of niveau", () => {
    expect(resolveParentPortalVariant("universite", null)).toBe("universite");
  });

  it("defaults to ecole-classique when no program/school is known (never invents a variant)", () => {
    expect(resolveParentPortalVariant(null, null)).toBe("ecole-classique");
  });
});

describe("lib/parentPortalTheme — getParentPortalTheme", () => {
  it("returns a distinct institutionLabel for each of the 4 real variants", () => {
    const labels = new Set(
      [
        getParentPortalTheme("ecole-classique", "prescolaire"),
        getParentPortalTheme("ecole-classique", "secondaire"),
        getParentPortalTheme("ecole-professionnelle", null),
        getParentPortalTheme("universite", null),
      ].map((t) => t.institutionLabel),
    );
    expect(labels.size).toBe(4);
  });
});
