import { describe, it, expect } from "vitest";
import {
  isParentRequestCategory,
  isParentRequestService,
  isParentRequestStatus,
  parentRequestCategories,
  parentRequestServices,
  parentRequestStatuses,
} from "@/lib/parentRequests";

describe("lib/parentRequests — input validation guards", () => {
  it("accepts every declared category/service/status", () => {
    for (const c of parentRequestCategories) expect(isParentRequestCategory(c)).toBe(true);
    for (const s of parentRequestServices) expect(isParentRequestService(s)).toBe(true);
    for (const s of parentRequestStatuses) expect(isParentRequestStatus(s)).toBe(true);
  });

  it("rejects arbitrary strings (API input safety)", () => {
    expect(isParentRequestCategory("<script>alert(1)</script>")).toBe(false);
    expect(isParentRequestService("finance_department_that_does_not_exist")).toBe(false);
    expect(isParentRequestStatus("hacked")).toBe(false);
  });
});
