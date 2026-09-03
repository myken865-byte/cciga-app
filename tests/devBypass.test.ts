import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("lib/devBypass — Production isolation (security-critical)", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("is disabled when VERCEL_ENV is production, regardless of the flag", async () => {
    process.env.VERCEL_ENV = "production";
    process.env.ENABLE_DEV_AUTH_BYPASS = "true";
    const { isDevBypassAllowed } = await import("@/lib/devBypass");
    expect(isDevBypassAllowed()).toBe(false);
  });

  it("is disabled when the flag is absent, even outside production", async () => {
    process.env.VERCEL_ENV = "preview";
    delete process.env.ENABLE_DEV_AUTH_BYPASS;
    const { isDevBypassAllowed } = await import("@/lib/devBypass");
    expect(isDevBypassAllowed()).toBe(false);
  });

  it("is disabled when the flag has any value other than the literal string 'true'", async () => {
    process.env.VERCEL_ENV = "preview";
    process.env.ENABLE_DEV_AUTH_BYPASS = "1";
    const { isDevBypassAllowed } = await import("@/lib/devBypass");
    expect(isDevBypassAllowed()).toBe(false);
  });

  it("is enabled only when both conditions hold (Preview + explicit flag)", async () => {
    process.env.VERCEL_ENV = "preview";
    process.env.ENABLE_DEV_AUTH_BYPASS = "true";
    const { isDevBypassAllowed } = await import("@/lib/devBypass");
    expect(isDevBypassAllowed()).toBe(true);
  });

  describe("buildDevBypassSession", () => {
    beforeEach(() => {
      process.env.VERCEL_ENV = "preview";
      process.env.ENABLE_DEV_AUTH_BYPASS = "true";
    });

    it("returns null when bypass is not allowed, even with a valid role cookie", async () => {
      process.env.VERCEL_ENV = "production";
      const { buildDevBypassSession } = await import("@/lib/devBypass");
      expect(buildDevBypassSession("ADMIN")).toBeNull();
    });

    it("returns null for a missing or invalid role", async () => {
      const { buildDevBypassSession } = await import("@/lib/devBypass");
      expect(buildDevBypassSession(undefined)).toBeNull();
      expect(buildDevBypassSession("")).toBeNull();
      expect(buildDevBypassSession("NOT_A_ROLE")).toBeNull();
    });

    it("returns a sentinel session (userId -1) for a valid role, never a real userId", async () => {
      const { buildDevBypassSession } = await import("@/lib/devBypass");
      const session = buildDevBypassSession("PARENT");
      expect(session).not.toBeNull();
      expect(session?.userId).toBe(-1);
      expect(session?.roles).toEqual(["PARENT"]);
    });
  });
});
