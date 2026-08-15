-- CreateTable
CREATE TABLE "AcademicDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "programId" TEXT NOT NULL,
    "semesterId" TEXT,
    "academicYearId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'publie',
    "version" INTEGER NOT NULL DEFAULT 1,
    "documentGroupKey" TEXT NOT NULL,
    "previousVersionId" TEXT,
    "snapshotData" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generatedById" INTEGER,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AcademicDocument_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AcademicDocument_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AcademicDocument_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AcademicDocument_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AcademicDocument_previousVersionId_fkey" FOREIGN KEY ("previousVersionId") REFERENCES "AcademicDocument" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AcademicDocument_generatedById_fkey" FOREIGN KEY ("generatedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentAppreciation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "programId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "appreciation" TEXT,
    "conduct" TEXT,
    "enteredById" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentAppreciation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentAppreciation_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentAppreciation_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentAppreciation_enteredById_fkey" FOREIGN KEY ("enteredById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "programId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT NOT NULL,
    "teacherId" INTEGER,
    "dayOfWeek" INTEGER,
    "startTime" TEXT,
    "endTime" TEXT,
    "semesterId" TEXT,
    "credits" INTEGER,
    "coefficient" REAL,
    "groupLabel" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "retakeOfCourseId" TEXT,
    CONSTRAINT "Course_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Course_retakeOfCourseId_fkey" FOREIGN KEY ("retakeOfCourseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("code", "coefficient", "createdAt", "credits", "dayOfWeek", "description", "endTime", "groupLabel", "id", "name", "programId", "semesterId", "startTime", "teacherId", "updatedAt") SELECT "code", "coefficient", "createdAt", "credits", "dayOfWeek", "description", "endTime", "groupLabel", "id", "name", "programId", "semesterId", "startTime", "teacherId", "updatedAt" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE TABLE "new_Program" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "academicFacultyId" TEXT,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "niveau" TEXT,
    "teacherModel" TEXT,
    "titulaireId" INTEGER,
    "programType" TEXT,
    "programStatus" TEXT,
    "authorizationRef" TEXT,
    "authorizationDate" DATETIME,
    "authorizationDocumentRef" TEXT,
    "passingGrade" INTEGER,
    "rankingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "skillsTargeted" TEXT,
    "practicalWork" TEXT,
    "internship" TEXT,
    "certification" TEXT,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "admissionConditions" TEXT NOT NULL,
    "tuitionFee" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Program_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "Faculty" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Program_titulaireId_fkey" FOREIGN KEY ("titulaireId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Program" ("academicFacultyId", "admissionConditions", "authorizationDate", "authorizationDocumentRef", "authorizationRef", "certification", "createdAt", "description", "duration", "faculty", "id", "internship", "level", "name", "niveau", "passingGrade", "practicalWork", "programStatus", "programType", "school", "skillsTargeted", "slug", "teacherModel", "titulaireId", "tuitionFee", "updatedAt") SELECT "academicFacultyId", "admissionConditions", "authorizationDate", "authorizationDocumentRef", "authorizationRef", "certification", "createdAt", "description", "duration", "faculty", "id", "internship", "level", "name", "niveau", "passingGrade", "practicalWork", "programStatus", "programType", "school", "skillsTargeted", "slug", "teacherModel", "titulaireId", "tuitionFee", "updatedAt" FROM "Program";
DROP TABLE "Program";
ALTER TABLE "new_Program" RENAME TO "Program";
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AcademicDocument_previousVersionId_key" ON "AcademicDocument"("previousVersionId");

-- CreateIndex
CREATE INDEX "AcademicDocument_documentGroupKey_idx" ON "AcademicDocument"("documentGroupKey");

-- CreateIndex
CREATE INDEX "AcademicDocument_studentId_programId_idx" ON "AcademicDocument"("studentId", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAppreciation_studentId_semesterId_key" ON "StudentAppreciation"("studentId", "semesterId");
