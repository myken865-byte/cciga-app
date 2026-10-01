import { describe, it, expect } from "vitest";
import { ADMISSION_PHOTO_LABEL, extractAdmissionDocumentEntry, propagateAdmissionDocumentsToClassicFiche } from "@/lib/enrollmentContinuity";
import type { AdmissionDocumentEntry } from "@/lib/admission-documents";

const documents: AdmissionDocumentEntry[] = [
  { label: "Pièce d'identité", fileUrl: "https://blob.test/id.pdf", fileName: "id.pdf" },
  { label: "Dernier diplôme ou bulletin scolaire", fileUrl: null, fileName: null },
  { label: ADMISSION_PHOTO_LABEL, fileUrl: "https://blob.test/photo.jpg", fileName: "photo.jpg" },
  { label: "Reçu des frais de dossier", fileUrl: "declared", fileName: null },
];

describe("lib/enrollmentContinuity — extractAdmissionDocumentEntry", () => {
  it("returns the entry when it has a real file", () => {
    const entry = extractAdmissionDocumentEntry(documents, ADMISSION_PHOTO_LABEL);
    expect(entry?.fileUrl).toBe("https://blob.test/photo.jpg");
  });

  it("returns null when the label is missing", () => {
    expect(extractAdmissionDocumentEntry(documents, "Inconnu")).toBeNull();
  });

  it("returns null when fileUrl is null (never provided)", () => {
    expect(extractAdmissionDocumentEntry(documents, "Dernier diplôme ou bulletin scolaire")).toBeNull();
  });

  it("returns null for the historical 'declared' sentinel (checked but never uploaded)", () => {
    expect(extractAdmissionDocumentEntry(documents, "Reçu des frais de dossier")).toBeNull();
  });
});

describe("lib/enrollmentContinuity — propagateAdmissionDocumentsToClassicFiche", () => {
  it("excludes the photo entry — it has its own dedicated photoUrl field", () => {
    const result = propagateAdmissionDocumentsToClassicFiche(documents);
    expect(result.find((d) => d.label === ADMISSION_PHOTO_LABEL)).toBeUndefined();
  });

  it("marks a real file as fourni and carries the fileUrl/fileName over unchanged (no duplication)", () => {
    const result = propagateAdmissionDocumentsToClassicFiche(documents);
    const id = result.find((d) => d.label === "Pièce d'identité");
    expect(id).toEqual({ label: "Pièce d'identité", status: "fourni", fileUrl: "https://blob.test/id.pdf", fileName: "id.pdf" });
  });

  it("marks a missing file as non_fourni, never inventing a fileUrl", () => {
    const result = propagateAdmissionDocumentsToClassicFiche(documents);
    const diploma = result.find((d) => d.label === "Dernier diplôme ou bulletin scolaire");
    expect(diploma?.status).toBe("non_fourni");
    expect(diploma?.fileUrl).toBeNull();
  });

  it("treats the 'declared' sentinel the same as not provided", () => {
    const result = propagateAdmissionDocumentsToClassicFiche(documents);
    const receipt = result.find((d) => d.label === "Reçu des frais de dossier");
    expect(receipt?.status).toBe("non_fourni");
    expect(receipt?.fileUrl).toBeNull();
  });

  it("carries over exactly the 3 non-photo labels, no invented categories", () => {
    const result = propagateAdmissionDocumentsToClassicFiche(documents);
    expect(result.map((d) => d.label).sort()).toEqual(
      ["Pièce d'identité", "Dernier diplôme ou bulletin scolaire", "Reçu des frais de dossier"].sort(),
    );
  });
});
