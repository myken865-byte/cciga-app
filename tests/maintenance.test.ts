import { describe, it, expect } from "vitest";
import { isValidMaintenanceTransition } from "@/lib/maintenance";

describe("lib/maintenance — isValidMaintenanceTransition", () => {
  it("allows each linear step of the workflow", () => {
    expect(isValidMaintenanceTransition("signalee", "assignee")).toBe(true);
    expect(isValidMaintenanceTransition("assignee", "en_cours")).toBe(true);
    expect(isValidMaintenanceTransition("en_cours", "terminee")).toBe(true);
    expect(isValidMaintenanceTransition("terminee", "cloturee")).toBe(true);
  });

  it("refuses skipping a step", () => {
    expect(isValidMaintenanceTransition("signalee", "en_cours")).toBe(false);
    expect(isValidMaintenanceTransition("signalee", "cloturee")).toBe(false);
  });

  it("refuses going backwards", () => {
    expect(isValidMaintenanceTransition("en_cours", "assignee")).toBe(false);
    expect(isValidMaintenanceTransition("cloturee", "en_cours")).toBe(false);
  });

  it("a closed request has no further transition", () => {
    expect(isValidMaintenanceTransition("cloturee", "cloturee")).toBe(false);
  });
});
