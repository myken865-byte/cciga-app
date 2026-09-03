import { describe, it, expect, beforeEach } from "vitest";
import { manualProvider, monCashProvider, natCashProvider, getPaymentProvider, listPaymentProviders } from "@/lib/payments/provider";

describe("lib/payments/provider — abstraction fournisseur", () => {
  beforeEach(() => {
    delete process.env.MONCASH_CLIENT_ID;
    delete process.env.MONCASH_CLIENT_SECRET;
    delete process.env.NATCASH_CLIENT_ID;
    delete process.env.NATCASH_CLIENT_SECRET;
  });

  it("manualProvider is always configured and confirms immediately", async () => {
    expect(manualProvider.isConfigured()).toBe(true);
    const result = await manualProvider.initiateTransaction({ amountHTG: 100, studentId: 1, reference: "x" });
    expect(result).toEqual({ status: "confirme", providerReference: null });
  });

  it("MonCash/NatCash are not configured without env credentials", () => {
    expect(monCashProvider.isConfigured()).toBe(false);
    expect(natCashProvider.isConfigured()).toBe(false);
  });

  it("MonCash/NatCash refuse to run without credentials — never simulate a fake success", async () => {
    await expect(monCashProvider.initiateTransaction({ amountHTG: 100, studentId: 1, reference: "x" })).rejects.toThrow(
      /À COMPLÉTER.*MONCASH/,
    );
    await expect(natCashProvider.initiateTransaction({ amountHTG: 100, studentId: 1, reference: "x" })).rejects.toThrow(
      /À COMPLÉTER.*NATCASH/,
    );
  });

  it("MonCash becomes configured once env credentials are present", () => {
    process.env.MONCASH_CLIENT_ID = "test";
    process.env.MONCASH_CLIENT_SECRET = "test";
    expect(monCashProvider.isConfigured()).toBe(true);
  });

  it("getPaymentProvider resolves the right provider by key", () => {
    expect(getPaymentProvider("manuel")).toBe(manualProvider);
    expect(getPaymentProvider("moncash")).toBe(monCashProvider);
    expect(getPaymentProvider("natcash")).toBe(natCashProvider);
  });

  it("listPaymentProviders returns all 3 providers", () => {
    expect(listPaymentProviders()).toHaveLength(3);
  });
});
