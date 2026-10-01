import { describe, it, expect } from "vitest";
import { isInternshipStatus, isInternshipAttendanceStatus, canStudentSubmitReport } from "@/lib/internships";

describe("lib/internships", () => {
  it("accepts real statuses and refuses unknown ones", () => {
    expect(isInternshipStatus("en_cours")).toBe(true);
    expect(isInternshipStatus("suspendu")).toBe(false);
  });

  it("accepts real attendance statuses and refuses unknown ones", () => {
    expect(isInternshipAttendanceStatus("present")).toBe(true);
    expect(isInternshipAttendanceStatus("excuse")).toBe(false);
  });

  it("a report can only be submitted while en_cours or termine, never once validated/rejected", () => {
    expect(canStudentSubmitReport("en_cours")).toBe(true);
    expect(canStudentSubmitReport("termine")).toBe(true);
    expect(canStudentSubmitReport("planifie")).toBe(false);
    expect(canStudentSubmitReport("valide")).toBe(false);
    expect(canStudentSubmitReport("rejete")).toBe(false);
  });
});
