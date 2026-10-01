import { describe, it, expect } from "vitest";
import {
  isStudentRequestCategory,
  isStudentRequestStatus,
  isStudentRequestGeneratable,
} from "@/lib/studentRequests";

describe("lib/studentRequests", () => {
  it("accepts real categories and refuses unknown ones", () => {
    expect(isStudentRequestCategory("attestation")).toBe(true);
    expect(isStudentRequestCategory("inexistant")).toBe(false);
  });

  it("accepts real statuses and refuses unknown ones", () => {
    expect(isStudentRequestStatus("soumise")).toBe(true);
    expect(isStudentRequestStatus("archivee")).toBe(false);
  });

  it("only the three document categories are auto-generatable", () => {
    expect(isStudentRequestGeneratable("attestation")).toBe(true);
    expect(isStudentRequestGeneratable("certificat")).toBe(true);
    expect(isStudentRequestGeneratable("document_administratif")).toBe(true);
    expect(isStudentRequestGeneratable("releve")).toBe(false);
    expect(isStudentRequestGeneratable("duplicata_badge")).toBe(false);
  });
});
