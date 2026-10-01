import { describe, it, expect } from "vitest";
import { admissionStatuses } from "@/lib/admission-status";
import { enrollmentFormStatuses } from "@/lib/enrollmentFormStatus";
import {
  unifiedEnrollmentStatuses,
  mapAdmissionStatusToUnified,
  mapEnrollmentFormStatusToUnified,
} from "@/lib/unifiedEnrollmentStatus";

describe("lib/unifiedEnrollmentStatus", () => {
  it("maps every AdmissionSubmission status to a valid unified status, without loss", () => {
    for (const status of admissionStatuses) {
      const mapped = mapAdmissionStatusToUnified(status);
      expect(unifiedEnrollmentStatuses).toContain(mapped);
    }
  });

  it("maps every EnrollmentForm/ClassicEnrollmentForm status to a valid unified status", () => {
    for (const status of enrollmentFormStatuses) {
      const mapped = mapEnrollmentFormStatusToUnified(status);
      expect(unifiedEnrollmentStatuses).toContain(mapped);
    }
  });

  it("never maps a rejected admission to 'valide', and never maps a validated form to 'rejete'", () => {
    expect(mapAdmissionStatusToUnified("rejete")).not.toBe("valide");
    expect(mapAdmissionStatusToUnified("admis")).toBe("valide");
    expect(mapEnrollmentFormStatusToUnified("validee")).toBe("valide");
    expect(mapEnrollmentFormStatusToUnified("archivee")).not.toBe("valide");
  });

  it("the two enums do not silently collide on an incompatible outcome (archivee has no admission equivalent)", () => {
    // EnrollmentForm/ClassicEnrollmentForm can be "archivee" -> unified "archive";
    // AdmissionSubmission has no native equivalent to "archivee" and must never
    // be silently mapped to it.
    for (const status of admissionStatuses) {
      expect(mapAdmissionStatusToUnified(status)).not.toBe("archive");
    }
  });
});
