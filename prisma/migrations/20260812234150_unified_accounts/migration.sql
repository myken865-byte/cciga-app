-- DropIndex
DROP INDEX "AdminUser_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AdminUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdmissionSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "school" TEXT NOT NULL,
    "programSlug" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "documents" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nouveau',
    "adminNote" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "studentUserId" INTEGER,
    CONSTRAINT "AdmissionSubmission_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AdmissionSubmission" ("address", "adminNote", "dob", "documents", "email", "firstName", "id", "lastName", "phone", "programSlug", "reference", "school", "status", "submittedAt", "updatedAt") SELECT "address", "adminNote", "dob", "documents", "email", "firstName", "id", "lastName", "phone", "programSlug", "reference", "school", "status", "submittedAt", "updatedAt" FROM "AdmissionSubmission";
DROP TABLE "AdmissionSubmission";
ALTER TABLE "new_AdmissionSubmission" RENAME TO "AdmissionSubmission";
CREATE UNIQUE INDEX "AdmissionSubmission_reference_key" ON "AdmissionSubmission"("reference");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
