-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "paidAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "recordedById" INTEGER,
    CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("amount", "id", "note", "paidAt", "studentId") SELECT "amount", "id", "note", "paidAt", "studentId" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
