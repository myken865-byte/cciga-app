import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findMany: vi.fn(async () => [
        { id: 1, name: "Jean Baptiste", email: "jean.baptiste@example.com", phone: "50912345", dob: null, roles: '["STUDENT"]' },
      ]),
    },
    admissionSubmission: {
      findMany: vi.fn(async () => [
        { id: "a1", firstName: "Marie", lastName: "Joseph", email: "marie.joseph@example.com", phone: "50999999", dob: "2010-01-01", reference: "CCIGA-X1", status: "nouveau" },
      ]),
    },
    enrollmentForm: {
      findMany: vi.fn(async () => []),
    },
    classicEnrollmentForm: {
      findMany: vi.fn(async () => []),
    },
  },
}));

const { checkEnrollmentDuplicates } = await import("@/lib/enrollmentDuplicateCheck");

describe("lib/enrollmentDuplicateCheck — checkEnrollmentDuplicates", () => {
  it("classifies an exact email match as MATCH_FORT", async () => {
    const result = await checkEnrollmentDuplicates({ email: "jean.baptiste@example.com", firstName: "Jean", lastName: "Baptiste" });
    expect(result.strongMatches.some((m) => m.kind === "user")).toBe(true);
  });

  it("classifies an exact name+dob match on an admission as MATCH_FORT", async () => {
    const result = await checkEnrollmentDuplicates({ firstName: "Marie", lastName: "Joseph", dob: "2010-01-01" });
    expect(result.strongMatches.some((m) => m.kind === "admission")).toBe(true);
  });

  it("never classifies a name-only match (no email/phone/dob corroboration) as MATCH_FORT — only MATCH_POSSIBLE", async () => {
    const result = await checkEnrollmentDuplicates({ firstName: "Marie", lastName: "Joseph" });
    expect(result.strongMatches.some((m) => m.kind === "admission")).toBe(false);
    expect(result.possibleMatches.some((m) => m.kind === "admission")).toBe(true);
  });

  it("returns no matches at all when no identifiable field is provided", async () => {
    const result = await checkEnrollmentDuplicates({});
    expect(result.strongMatches).toHaveLength(0);
    expect(result.possibleMatches).toHaveLength(0);
  });
});
