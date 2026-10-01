import { describe, it, expect } from "vitest";
import { isValidLogisticsTransition } from "@/lib/logisticsRequests";

describe("lib/logisticsRequests — isValidLogisticsTransition", () => {
  it("allows the main path: soumise -> en_traitement -> approuvee -> livree -> cloturee", () => {
    expect(isValidLogisticsTransition("soumise", "en_traitement")).toBe(true);
    expect(isValidLogisticsTransition("en_traitement", "approuvee")).toBe(true);
    expect(isValidLogisticsTransition("approuvee", "livree")).toBe(true);
    expect(isValidLogisticsTransition("livree", "cloturee")).toBe(true);
  });

  it("allows rejecting from en_traitement, then closing directly", () => {
    expect(isValidLogisticsTransition("en_traitement", "rejetee")).toBe(true);
    expect(isValidLogisticsTransition("rejetee", "cloturee")).toBe(true);
  });

  it("refuses skipping straight to approved/delivered", () => {
    expect(isValidLogisticsTransition("soumise", "approuvee")).toBe(false);
    expect(isValidLogisticsTransition("soumise", "livree")).toBe(false);
  });

  it("refuses acting on a closed or rejected-then-closed request", () => {
    expect(isValidLogisticsTransition("cloturee", "en_traitement")).toBe(false);
    expect(isValidLogisticsTransition("rejetee", "approuvee")).toBe(false);
  });
});
