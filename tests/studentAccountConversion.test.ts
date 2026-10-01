import { describe, it, expect, vi } from "vitest";

const updateMock = vi.fn(async () => ({}));
const createMock = vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({ id: 99, ...data }));
let findUniqueResult: { id: number; programId: string | null; photoUrl: string | null } | null = null;

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(async () => findUniqueResult),
      create: createMock,
      update: updateMock,
    },
  },
}));

vi.mock("@/lib/notifications", () => ({
  createNotification: vi.fn(async () => {}),
}));

const { resolveOrCreateStudentAccount } = await import("@/lib/studentAccountConversion");

describe("lib/studentAccountConversion — resolveOrCreateStudentAccount photo/idempotence (Phase P1, objectif A)", () => {
  it("sets photoUrl on a newly created account when provided", async () => {
    findUniqueResult = null;
    createMock.mockClear();
    const result = await resolveOrCreateStudentAccount({
      firstName: "QA",
      lastName: "Test",
      email: "qa.new@example.com",
      photoUrl: "https://blob.test/photo.jpg",
    });
    expect(result.created).toBe(true);
    expect(createMock).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ photoUrl: "https://blob.test/photo.jpg" }) }));
  });

  it("REGRESSION: never overwrites an existing account's photo with a new one (§6 — never replace a newer photo with an older one)", async () => {
    findUniqueResult = { id: 5, programId: null, photoUrl: "https://blob.test/already-set.jpg" };
    updateMock.mockClear();
    const result = await resolveOrCreateStudentAccount({
      firstName: "QA",
      lastName: "Test",
      email: "qa.existing@example.com",
      photoUrl: "https://blob.test/candidature-photo.jpg",
    });
    expect(result.created).toBe(false);
    expect(result.userId).toBe(5);
    // No update call should touch photoUrl since the account already has one.
    const photoUrlWasSet = updateMock.mock.calls.some(
      (call) => (call as unknown as [{ data: Record<string, unknown> }])[0].data.photoUrl !== undefined,
    );
    expect(photoUrlWasSet).toBe(false);
  });

  it("fills in a missing photo on an existing account (idempotent — safe to call again)", async () => {
    findUniqueResult = { id: 6, programId: null, photoUrl: null };
    updateMock.mockClear();
    await resolveOrCreateStudentAccount({
      firstName: "QA",
      lastName: "Test",
      email: "qa.nophoto@example.com",
      photoUrl: "https://blob.test/candidature-photo.jpg",
    });
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ photoUrl: "https://blob.test/candidature-photo.jpg" }) }),
    );
  });

  it("idempotent: reusing an existing account never creates a second one", async () => {
    findUniqueResult = { id: 7, programId: "prog-1", photoUrl: "https://blob.test/x.jpg" };
    createMock.mockClear();
    const result = await resolveOrCreateStudentAccount({ firstName: "QA", lastName: "Test", email: "qa.reuse@example.com" });
    expect(result.created).toBe(false);
    expect(result.userId).toBe(7);
    expect(createMock).not.toHaveBeenCalled();
  });
});
