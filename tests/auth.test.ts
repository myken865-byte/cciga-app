import { describe, it, expect, beforeAll } from "vitest";

beforeAll(() => {
  process.env.SESSION_SECRET = "test-only-secret-do-not-use-in-production";
});

describe("lib/auth — session signing", () => {
  it("round-trips a valid session payload", async () => {
    const { signSession, verifySession } = await import("@/lib/auth");
    const payload: { userId: number; email: string; name: string; roles: ("PARENT")[] } = {
      userId: 42,
      email: "test@cciga.test",
      name: "Test User",
      roles: ["PARENT"],
    };
    const token = await signSession(payload);
    const verified = await verifySession(token);
    expect(verified).toEqual(payload);
  });

  it("rejects a tampered token", async () => {
    const { signSession, verifySession } = await import("@/lib/auth");
    const token = await signSession({ userId: 1, email: "a@b.c", name: "A", roles: ["ADMIN"] });
    const tampered = token.slice(0, -4) + "abcd";
    const verified = await verifySession(tampered);
    expect(verified).toBeNull();
  });

  it("rejects a token signed with a different secret", async () => {
    const { verifySession } = await import("@/lib/auth");
    process.env.SESSION_SECRET = "a-different-secret";
    const { signSession } = await import("@/lib/auth");
    const token = await signSession({ userId: 1, email: "a@b.c", name: "A", roles: ["ADMIN"] });
    process.env.SESSION_SECRET = "test-only-secret-do-not-use-in-production";
    const verified = await verifySession(token);
    expect(verified).toBeNull();
  });

  it("rejects a payload with no roles", async () => {
    const { SignJWT } = await import("jose");
    const key = new TextEncoder().encode(process.env.SESSION_SECRET);
    const badToken = await new SignJWT({ userId: 1, email: "a@b.c", name: "A", roles: [] })
      .setProtectedHeader({ alg: "HS256" })
      .sign(key);
    const { verifySession } = await import("@/lib/auth");
    const verified = await verifySession(badToken);
    expect(verified).toBeNull();
  });

  it("strips unknown role strings from the payload", async () => {
    const { SignJWT } = await import("jose");
    const key = new TextEncoder().encode(process.env.SESSION_SECRET);
    const token = await new SignJWT({ userId: 1, email: "a@b.c", name: "A", roles: ["PARENT", "NOT_A_REAL_ROLE"] })
      .setProtectedHeader({ alg: "HS256" })
      .sign(key);
    const { verifySession } = await import("@/lib/auth");
    const verified = await verifySession(token);
    expect(verified?.roles).toEqual(["PARENT"]);
  });
});
