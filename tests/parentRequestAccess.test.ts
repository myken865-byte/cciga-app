import { describe, it, expect } from "vitest";
import { canAccessParentRequest, isAnyParentRequestStaff } from "@/lib/parentRequestAccess";
import type { SessionPayload } from "@/lib/auth";

function session(userId: number, roles: SessionPayload["roles"]): SessionPayload {
  return { userId, email: "x@y.z", name: "X", roles };
}

describe("lib/parentRequestAccess", () => {
  const request = { parentId: 8, service: "secretariat" };

  it("the parent who owns the request can always access it", () => {
    expect(canAccessParentRequest(session(8, ["PARENT"]), request)).toBe(true);
  });

  it("a different parent cannot access someone else's request", () => {
    expect(canAccessParentRequest(session(9, ["PARENT"]), request)).toBe(false);
  });

  it("staff for the routed service can access it", () => {
    expect(canAccessParentRequest(session(3, ["SECRETARIAT"]), request)).toBe(true);
    expect(canAccessParentRequest(session(3, ["ADMIN"]), request)).toBe(true);
  });

  it("staff NOT assigned to the routed service cannot access it", () => {
    expect(canAccessParentRequest(session(9, ["TEACHER"]), request)).toBe(false);
    expect(canAccessParentRequest(session(9, ["ACADEMIC_OFFICER"]), { parentId: 8, service: "administration" })).toBe(
      false,
    );
  });

  it("isAnyParentRequestStaff recognizes every role that handles at least one service", () => {
    expect(isAnyParentRequestStaff(session(1, ["ADMIN"]))).toBe(true);
    expect(isAnyParentRequestStaff(session(1, ["SECRETARIAT"]))).toBe(true);
    expect(isAnyParentRequestStaff(session(1, ["ACADEMIC_OFFICER"]))).toBe(true);
    expect(isAnyParentRequestStaff(session(1, ["STUDENT"]))).toBe(false);
    expect(isAnyParentRequestStaff(session(1, ["PARENT"]))).toBe(false);
  });
});
