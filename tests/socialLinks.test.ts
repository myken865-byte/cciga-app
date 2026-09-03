import { describe, it, expect } from "vitest";
import { isSafeExternalUrl } from "@/lib/socialLinks";

describe("lib/socialLinks — isSafeExternalUrl", () => {
  it("rejects null", () => {
    expect(isSafeExternalUrl(null)).toBe(false);
  });

  it("rejects http (non-https)", () => {
    expect(isSafeExternalUrl("http://example.com")).toBe(false);
  });

  it("rejects javascript: and other dangerous schemes", () => {
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
  });

  it("rejects malformed URLs", () => {
    expect(isSafeExternalUrl("not a url")).toBe(false);
    expect(isSafeExternalUrl("")).toBe(false);
  });

  it("accepts a well-formed https URL", () => {
    expect(isSafeExternalUrl("https://facebook.com/cciga")).toBe(true);
  });
});
