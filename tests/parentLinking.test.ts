import { describe, it, expect, vi } from "vitest";

const users: Record<string, unknown>[] = [];
let nextId = 100;

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(async ({ where }: { where: { id?: number; email?: string } }) => {
        if (where.email !== undefined) return users.find((u) => u.email === where.email) ?? null;
        if (where.id !== undefined) return users.find((u) => u.id === where.id) ?? null;
        return null;
      }),
      findMany: vi.fn(async ({ where }: { where: { phone?: string } }) =>
        users.filter((u) => (where.phone !== undefined ? u.phone === where.phone : true)),
      ),
      update: vi.fn(async ({ where, data }: { where: { id: number }; data: Record<string, unknown> }) => {
        const u = users.find((x) => x.id === where.id);
        if (u) Object.assign(u, data);
        return u;
      }),
      create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
        const created = { id: nextId++, parentId: null, phone: null, ...data };
        users.push(created);
        return created;
      }),
    },
  },
}));

vi.mock("@/lib/notifications", () => ({
  createNotification: vi.fn(async () => {}),
}));

const { findExistingParent, linkChildToExistingParent, autoLinkOrCreateParent } = await import("@/lib/parentLinking");

function reset() {
  users.length = 0;
  users.push(
    { id: 1, name: "Existing Parent", email: "parent@example.com", phone: "50911110000", roles: '["PARENT"]', parentId: null },
    { id: 2, name: "Other Parent A", email: "sharedphone.a@example.com", phone: "50922220000", roles: '["PARENT"]', parentId: null },
    { id: 3, name: "Other Parent B", email: "sharedphone.b@example.com", phone: "50922220000", roles: '["PARENT"]', parentId: null },
    { id: 10, name: "Child One", email: "child1@example.com", phone: null, roles: '["STUDENT"]', parentId: null },
    { id: 11, name: "Child Already Linked", email: "child2@example.com", phone: null, roles: '["STUDENT"]', parentId: 1 },
    { id: 12, name: "Not A Student", email: "teacher@example.com", phone: null, roles: '["TEACHER"]', parentId: null },
  );
}

describe("lib/parentLinking — findExistingParent", () => {
  it("finds an existing parent by exact email", async () => {
    reset();
    const result = await findExistingParent({ email: "parent@example.com" });
    expect(result.kind).toBe("single");
    if (result.kind === "single") expect(result.parent.id).toBe(1);
  });

  it("falls back to phone when email doesn't match", async () => {
    reset();
    users[0] = { ...users[0], email: "different@example.com" };
    const result = await findExistingParent({ phone: "50911110000" });
    expect(result.kind).toBe("single");
  });

  it("returns ambiguous when multiple PARENT accounts share the same phone", async () => {
    reset();
    const result = await findExistingParent({ phone: "50922220000" });
    expect(result.kind).toBe("ambiguous");
    if (result.kind === "ambiguous") expect(result.parents.length).toBe(2);
  });

  it("returns none when nothing matches", async () => {
    reset();
    const result = await findExistingParent({ email: "nobody@example.com", phone: "50900000000" });
    expect(result.kind).toBe("none");
  });

  it("never matches a non-PARENT account even with the exact same email", async () => {
    reset();
    const result = await findExistingParent({ email: "teacher@example.com" });
    expect(result.kind).toBe("none");
  });
});

describe("lib/parentLinking — linkChildToExistingParent", () => {
  it("links a real unlinked student to a real parent", async () => {
    reset();
    const result = await linkChildToExistingParent(1, 10);
    expect(result.ok).toBe(true);
    expect(users.find((u) => u.id === 10)?.parentId).toBe(1);
  });

  it("REGRESSION: never creates a duplicate link — refuses a child already linked to a parent", async () => {
    reset();
    const result = await linkChildToExistingParent(1, 11);
    expect(result.ok).toBe(false);
  });

  it("refuses a target that isn't a real STUDENT", async () => {
    reset();
    const result = await linkChildToExistingParent(1, 12);
    expect(result.ok).toBe(false);
  });

  it("refuses a target parent that isn't a real PARENT account", async () => {
    reset();
    const result = await linkChildToExistingParent(12, 10);
    expect(result.ok).toBe(false);
  });

  it("idempotent by construction: linking a second real child to the same parent never touches the first", async () => {
    reset();
    await linkChildToExistingParent(1, 10);
    const secondChild = { id: 20, name: "Child Two", email: "child20@example.com", phone: null, roles: '["STUDENT"]', parentId: null };
    users.push(secondChild);
    const result = await linkChildToExistingParent(1, 20);
    expect(result.ok).toBe(true);
    expect(users.find((u) => u.id === 10)?.parentId).toBe(1);
    expect(users.find((u) => u.id === 20)?.parentId).toBe(1);
  });
});

describe("lib/parentLinking — autoLinkOrCreateParent (Portail Parent multi-institutions, §4/§5/§20/§21)", () => {
  it("links the child to an existing PARENT account found by email — never creates a duplicate", async () => {
    reset();
    const result = await autoLinkOrCreateParent({ childId: 10, contactEmail: "parent@example.com", contactName: "Existing Parent" });
    expect(result.status).toBe("linked_existing");
    expect(users.find((u) => u.id === 10)?.parentId).toBe(1);
  });

  it("creates a new PARENT account only when no existing one matches, using the real contact name/email", async () => {
    reset();
    const result = await autoLinkOrCreateParent({ childId: 10, contactEmail: "brand.new.parent@example.com", contactName: "Brand New Parent" });
    expect(result.status).toBe("created_new");
    if (result.status === "created_new") {
      expect(typeof result.temporaryPassword).toBe("string");
      const created = users.find((u) => u.id === result.parentId);
      expect(created?.email).toBe("brand.new.parent@example.com");
      expect(created?.name).toBe("Brand New Parent");
    }
    expect(users.find((u) => u.id === 10)?.parentId).toBe(result.status === "created_new" ? result.parentId : undefined);
  });

  it("REGRESSION: never creates a second parent account when the child is already linked (idempotent replay)", async () => {
    reset();
    const before = users.length;
    const result = await autoLinkOrCreateParent({ childId: 11, contactEmail: "somebody@example.com", contactName: "Somebody" });
    expect(result.status).toBe("skipped_already_linked");
    expect(users.length).toBe(before);
  });

  it("skips silently when no contact email is available — never invents one", async () => {
    reset();
    const result = await autoLinkOrCreateParent({ childId: 10, contactEmail: null, contactName: "Someone" });
    expect(result.status).toBe("skipped_no_contact");
    expect(users.find((u) => u.id === 10)?.parentId).toBeNull();
  });

  it("never invents a contact name when creating a new parent — skips instead", async () => {
    reset();
    const result = await autoLinkOrCreateParent({ childId: 10, contactEmail: "noname@example.com", contactName: null });
    expect(result.status).toBe("skipped_no_contact");
  });

});
