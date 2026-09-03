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
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "retakeOfCourseId" TEXT,
    CONSTRAINT "Course_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Course_retakeOfCourseId_fkey" FOREIGN KEY ("retakeOfCourseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("code", "coefficient", "createdAt", "credits", "dayOfWeek", "description", "endTime", "groupLabel", "id", "name", "programId", "retakeOfCourseId", "semesterId", "startTime", "teacherId", "updatedAt") SELECT "code", "coefficient", "createdAt", "credits", "dayOfWeek", "description", "endTime", "groupLabel", "id", "name", "programId", "retakeOfCourseId", "semesterId", "startTime", "teacherId", "updatedAt" FROM "Course";
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
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Program_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "Faculty" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Program_titulaireId_fkey" FOREIGN KEY ("titulaireId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Program" ("academicFacultyId", "admissionConditions", "authorizationDate", "authorizationDocumentRef", "authorizationRef", "certification", "createdAt", "description", "duration", "faculty", "id", "internship", "level", "name", "niveau", "passingGrade", "practicalWork", "programStatus", "programType", "rankingEnabled", "school", "skillsTargeted", "slug", "teacherModel", "titulaireId", "tuitionFee", "updatedAt") SELECT "academicFacultyId", "admissionConditions", "authorizationDate", "authorizationDocumentRef", "authorizationRef", "certification", "createdAt", "description", "duration", "faculty", "id", "internship", "level", "name", "niveau", "passingGrade", "practicalWork", "programStatus", "programType", "rankingEnabled", "school", "skillsTargeted", "slug", "teacherModel", "titulaireId", "tuitionFee", "updatedAt" FROM "Program";
DROP TABLE "Program";
ALTER TABLE "new_Program" RENAME TO "Program";
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
