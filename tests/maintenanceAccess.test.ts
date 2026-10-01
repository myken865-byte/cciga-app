import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  prisma: {
    inventoryItem: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: string } }) =>
        id === "item-a" ? { id: "item-a", school: "ecole-classique" } : id === "item-b" ? { id: "item-b", school: "universite" } : null,
      ),
    },
    room: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: string } }) =>
        id === "room-a" ? { id: "room-a", school: "ecole-classique" } : null,
      ),
    },
    vehicle: {
      findUnique: vi.fn(async ({ where: { id } }: { where: { id: string } }) =>
        id === "vehicle-a" ? { id: "vehicle-a", school: "ecole-classique" } : null,
      ),
    },
  },
}));

const { validateMaintenanceResource } = await import("@/lib/maintenanceAccess");

describe("lib/maintenanceAccess — validateMaintenanceResource", () => {
  it("accepts a real resource that belongs to the active institution", async () => {
    expect(await validateMaintenanceResource("equipement", "item-a", "ecole-classique")).toBe(true);
    expect(await validateMaintenanceResource("salle", "room-a", "ecole-classique")).toBe(true);
    expect(await validateMaintenanceResource("vehicule", "vehicle-a", "ecole-classique")).toBe(true);
  });

  it("refuses a resource that belongs to a different institution", async () => {
    expect(await validateMaintenanceResource("equipement", "item-b", "ecole-classique")).toBe(false);
  });

  it("refuses a resourceId that does not exist at all (never trusts the client)", async () => {
    expect(await validateMaintenanceResource("equipement", "does-not-exist", "ecole-classique")).toBe(false);
    expect(await validateMaintenanceResource("salle", "does-not-exist", "ecole-classique")).toBe(false);
    expect(await validateMaintenanceResource("vehicule", "does-not-exist", "ecole-classique")).toBe(false);
  });

  it("'autre' is always accepted without an existence check", async () => {
    expect(await validateMaintenanceResource("autre", "anything", "ecole-classique")).toBe(true);
  });
});
