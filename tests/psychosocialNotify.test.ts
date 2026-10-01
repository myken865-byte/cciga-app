import { describe, it, expect } from "vitest";
import { caseUpdateNotificationRecipient } from "@/lib/psychosocialNotify";

describe("lib/psychosocialNotify", () => {
  it("notifies the case opener when someone else updates the case", () => {
    expect(caseUpdateNotificationRecipient(7, 3)).toBe(3);
  });

  it("does not notify when the opener updates their own case", () => {
    expect(caseUpdateNotificationRecipient(3, 3)).toBeNull();
  });
});
