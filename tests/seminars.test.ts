import { describe, it, expect } from "vitest";
import { isSeminarStatus, seminarStatuses, seminarStatusLabels, seminarStatusBadge } from "@/lib/seminars";

describe("lib/seminars", () => {
  it("accepts real statuses and refuses unknown ones", () => {
    expect(isSeminarStatus("ouvert")).toBe(true);
    expect(isSeminarStatus("annule")).toBe(false);
  });

  it("every status has a label and a badge class (no silent gap in the UI)", () => {
    for (const s of seminarStatuses) {
      expect(seminarStatusLabels[s]).toBeTruthy();
      expect(seminarStatusBadge[s]).toBeTruthy();
    }
  });
});
