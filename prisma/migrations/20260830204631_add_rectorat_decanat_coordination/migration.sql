-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faculty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "doyenId" INTEGER,
    CONSTRAINT "Faculty_doyenId_fkey" FOREIGN KEY ("doyenId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Faculty" ("createdAt", "id", "name", "school", "updatedAt") SELECT "createdAt", "id", "name", "school", "updatedAt" FROM "Faculty";
DROP TABLE "Faculty";
ALTER TABLE "new_Faculty" RENAME TO "Faculty";
CREATE UNIQUE INDEX "Faculty_school_name_key" ON "Faculty"("school", "name");
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
    "coordinatorId" INTEGER,
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
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Program_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "Faculty" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Program_titulaireId_fkey" FOREIGN KEY ("titulaireId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Program_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Program" ("academicFacultyId", "active", "admissionConditions", "authorizationDate", "authorizationDocumentRef", "authorizationRef", "certification", "createdAt", "description", "duration", "faculty", "id", "internship", "level", "name", "niveau", "passingGrade", "practicalWork", "programStatus", "programType", "rankingEnabled", "school", "skillsTargeted", "slug", "teacherModel", "titulaireId", "tuitionFee", "updatedAt") SELECT "academicFacultyId", "active", "admissionConditions", "authorizationDate", "authorizationDocumentRef", "authorizationRef", "certification", "createdAt", "description", "duration", "faculty", "id", "internship", "level", "name", "niveau", "passingGrade", "practicalWork", "programStatus", "programType", "rankingEnabled", "school", "skillsTargeted", "slug", "teacherModel", "titulaireId", "tuitionFee", "updatedAt" FROM "Program";
DROP TABLE "Program";
ALTER TABLE "new_Program" RENAME TO "Program";
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
