-- CreateTable
CREATE TABLE "Internship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "programId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hostOrganization" TEXT NOT NULL,
    "hostAddress" TEXT,
    "hostSupervisorName" TEXT,
    "hostSupervisorContact" TEXT,
    "internalSupervisorId" INTEGER,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'planifie',
    "conventionUrl" TEXT,
    "conventionName" TEXT,
    "reportUrl" TEXT,
    "reportName" TEXT,
    "evaluationScore" REAL,
    "evaluationComment" TEXT,
    "evaluatedById" INTEGER,
    "academicYearId" TEXT,
    "createdById" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Internship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Internship_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Internship_internalSupervisorId_fkey" FOREIGN KEY ("internalSupervisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Internship_evaluatedById_fkey" FOREIGN KEY ("evaluatedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Internship_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Internship_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InternshipAttendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "internshipId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InternshipAttendance_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seminar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "theme" TEXT,
    "speaker" TEXT,
    "location" TEXT,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME,
    "school" TEXT NOT NULL,
    "registrationOpen" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'planifie',
    "materialsUrl" TEXT,
    "materialsName" TEXT,
    "academicYearId" TEXT,
    "createdById" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Seminar_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Seminar_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeminarRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seminarId" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "certificateUrl" TEXT,
    "certificateName" TEXT,
    CONSTRAINT "SeminarRegistration_seminarId_fkey" FOREIGN KEY ("seminarId") REFERENCES "Seminar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeminarRegistration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Internship_studentId_idx" ON "Internship"("studentId");

-- CreateIndex
CREATE INDEX "Internship_programId_idx" ON "Internship"("programId");

-- CreateIndex
CREATE INDEX "Internship_status_idx" ON "Internship"("status");

-- CreateIndex
CREATE INDEX "InternshipAttendance_internshipId_idx" ON "InternshipAttendance"("internshipId");

-- CreateIndex
CREATE UNIQUE INDEX "InternshipAttendance_internshipId_date_key" ON "InternshipAttendance"("internshipId", "date");

-- CreateIndex
CREATE INDEX "Seminar_school_idx" ON "Seminar"("school");

-- CreateIndex
CREATE INDEX "Seminar_status_idx" ON "Seminar"("status");

-- CreateIndex
CREATE INDEX "SeminarRegistration_studentId_idx" ON "SeminarRegistration"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "SeminarRegistration_seminarId_studentId_key" ON "SeminarRegistration"("seminarId", "studentId");

