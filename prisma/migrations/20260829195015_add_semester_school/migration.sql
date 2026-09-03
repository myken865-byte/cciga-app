-- AlterTable
ALTER TABLE "Semester" ADD COLUMN "school" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Badge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "badgeNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'actif',
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedById" INTEGER,
    CONSTRAINT "Badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Badge_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Badge" ("badgeNumber", "id", "issuedAt", "issuedById", "status", "userId") SELECT "badgeNumber", "id", "issuedAt", "issuedById", "status", "userId" FROM "Badge";
DROP TABLE "Badge";
ALTER TABLE "new_Badge" RENAME TO "Badge";
CREATE UNIQUE INDEX "Badge_userId_key" ON "Badge"("userId");
CREATE UNIQUE INDEX "Badge_badgeNumber_key" ON "Badge"("badgeNumber");
CREATE TABLE "new_BookLoan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "borrowerId" INTEGER NOT NULL,
    "borrowedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME NOT NULL,
    "returnedAt" DATETIME,
    "recordedById" INTEGER,
    CONSTRAINT "BookLoan_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookLoan_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookLoan_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_BookLoan" ("bookId", "borrowedAt", "borrowerId", "dueDate", "id", "recordedById", "returnedAt") SELECT "bookId", "borrowedAt", "borrowerId", "dueDate", "id", "recordedById", "returnedAt" FROM "BookLoan";
DROP TABLE "BookLoan";
ALTER TABLE "new_BookLoan" RENAME TO "BookLoan";
CREATE INDEX "BookLoan_bookId_idx" ON "BookLoan"("bookId");
CREATE INDEX "BookLoan_borrowerId_idx" ON "BookLoan"("borrowerId");
CREATE TABLE "new_EmployeeLeaveRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'soumis',
    "reviewedById" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmployeeLeaveRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EmployeeLeaveRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeLeaveRequest" ("createdAt", "employeeId", "endDate", "id", "reason", "reviewedById", "startDate", "status", "type") SELECT "createdAt", "employeeId", "endDate", "id", "reason", "reviewedById", "startDate", "status", "type" FROM "EmployeeLeaveRequest";
DROP TABLE "EmployeeLeaveRequest";
ALTER TABLE "new_EmployeeLeaveRequest" RENAME TO "EmployeeLeaveRequest";
CREATE INDEX "EmployeeLeaveRequest_employeeId_idx" ON "EmployeeLeaveRequest"("employeeId");
CREATE TABLE "new_EnrollmentSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academicYearId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "studentCount" INTEGER NOT NULL,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capturedById" INTEGER,
    CONSTRAINT "EnrollmentSnapshot_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentSnapshot_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentSnapshot_capturedById_fkey" FOREIGN KEY ("capturedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EnrollmentSnapshot" ("academicYearId", "capturedAt", "capturedById", "id", "programId", "studentCount") SELECT "academicYearId", "capturedAt", "capturedById", "id", "programId", "studentCount" FROM "EnrollmentSnapshot";
DROP TABLE "EnrollmentSnapshot";
ALTER TABLE "new_EnrollmentSnapshot" RENAME TO "EnrollmentSnapshot";
CREATE UNIQUE INDEX "EnrollmentSnapshot_academicYearId_programId_key" ON "EnrollmentSnapshot"("academicYearId", "programId");
CREATE TABLE "new_InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
