-- CreateTable
CREATE TABLE "EnrollmentForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school" TEXT NOT NULL DEFAULT 'ecole-professionnelle',
    "programId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'brouillon',
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "birthDateAndPlace" TEXT,
    "sex" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "familyStatus" TEXT,
    "cin" TEXT,
    "cinIssuedDate" TEXT,
    "cinIssuedPlace" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "photoUrl" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactEmail" TEXT,
    "emergencyContactPhone" TEXT,
    "documents" TEXT NOT NULL DEFAULT '[]',
    "declarationAccepted" BOOLEAN NOT NULL DEFAULT false,
    "declarationDate" DATETIME,
    "inscriptionInfo" TEXT,
    "uniformInfo" TEXT,
    "versement1" TEXT,
    "versement2" TEXT,
    "versement3" TEXT,
    "studentUserId" INTEGER,
    "admissionSubmissionId" TEXT,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EnrollmentForm_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentForm_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentForm_admissionSubmissionId_fkey" FOREIGN KEY ("admissionSubmissionId") REFERENCES "AdmissionSubmission" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentForm_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EnrollmentForm_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "EnrollmentForm_programId_idx" ON "EnrollmentForm"("programId");

-- CreateIndex
CREATE INDEX "EnrollmentForm_school_status_idx" ON "EnrollmentForm"("school", "status");
