import { describe, it, expect } from "vitest";
import { PSYCHOSOCIAL_ACCESS_ROLES } from "@/lib/psychosocialAccess";
import { hasAnyRole } from "@/lib/roles";

describe("lib/psychosocialAccess — moindre privilège", () => {
  it("grants exactly SUPER_ADMIN and CONSEILLER, nothing broader", () => {
    expect(PSYCHOSOCIAL_ACCESS_ROLES.sort()).toEqual(["CONSEILLER", "SUPER_ADMIN"].sort());
  });

  it("CONSEILLER passes the psychosocial gate", () => {
    expect(hasAnyRole(["CONSEILLER"], PSYCHOSOCIAL_ACCESS_ROLES)).toBe(true);
  });

  it("ordinary staff roles are refused — access is not implied by ADMIN/SECRETARIAT/TEACHER", () => {
    expect(hasAnyRole(["ADMIN"], PSYCHOSOCIAL_ACCESS_ROLES)).toBe(false);
    expect(hasAnyRole(["SECRETARIAT"], PSYCHOSOCIAL_ACCESS_ROLES)).toBe(false);
    expect(hasAnyRole(["TEACHER"], PSYCHOSOCIAL_ACCESS_ROLES)).toBe(false);
    expect(hasAnyRole(["ACADEMIC_OFFICER"], PSYCHOSOCIAL_ACCESS_ROLES)).toBe(false);
  });
});
