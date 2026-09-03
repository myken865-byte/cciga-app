-- CreateTable
CREATE TABLE "EnrollmentSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academicYearId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "studentCount" INTEGER NOT NULL,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capturedById" INTEGER,
    CONSTRAINT "EnrollmentSnapshot_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentSnapshot_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentSnapshot_capturedById_fkey" FOREIGN KEY ("capturedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "EnrollmentSnapshot_academicYearId_programId_key" ON "EnrollmentSnapshot"("academicYearId", "programId");
