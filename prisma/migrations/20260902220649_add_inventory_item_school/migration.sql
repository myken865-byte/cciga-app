-- Corrigé (mandat "Phase C1 / InventoryItem nullable", 2026-09-08) : cette
-- migration n'avait jamais été appliquée sur preprod (1 ligne réelle
-- existante y aurait violé la contrainte NOT NULL sans valeur par défaut).
-- `school` passe nullable, même principe que les 10 champs Phase C1 —
-- aucune attribution automatique, aucun backfill.
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school" TEXT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "identifier" TEXT,
    "location" TEXT,
    "condition" TEXT NOT NULL DEFAULT 'bon',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "assignedToId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InventoryItem_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_InventoryItem" ("assignedToId", "category", "condition", "createdAt", "id", "identifier", "location", "name", "quantity", "updatedAt") SELECT "assignedToId", "category", "condition", "createdAt", "id", "identifier", "location", "name", "quantity", "updatedAt" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
CREATE UNIQUE INDEX "InventoryItem_identifier_key" ON "InventoryItem"("identifier");
CREATE INDEX "InventoryItem_school_idx" ON "InventoryItem"("school");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
