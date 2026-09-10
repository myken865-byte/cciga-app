-- CreateTable
CREATE TABLE "LearningUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "programId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'brouillon',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LearningUnit_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "config" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Activity_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "LearningUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MediaAsset_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "LearningUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OfflinePackageManifest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'brouillon',
    "minCompatibility" TEXT NOT NULL,
    "totalSizeBytes" INTEGER NOT NULL,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OfflinePackageManifest_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "LearningUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActivityAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotencyKey" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "unitId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "contentVersion" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "clientLocalDate" DATETIME NOT NULL,
    "receivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ActivityAttempt_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "LearningUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActivityAttempt_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChildProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "unitId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ChildProgress_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "LearningUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChildProgress_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningUnit_slug_key" ON "LearningUnit"("slug");

-- CreateIndex
CREATE INDEX "LearningUnit_programId_idx" ON "LearningUnit"("programId");

-- CreateIndex
CREATE INDEX "LearningUnit_programId_status_idx" ON "LearningUnit"("programId", "status");

-- CreateIndex
CREATE INDEX "Activity_unitId_idx" ON "Activity"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_unitId_slug_key" ON "Activity"("unitId", "slug");

-- CreateIndex
CREATE INDEX "MediaAsset_unitId_idx" ON "MediaAsset"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_unitId_path_key" ON "MediaAsset"("unitId", "path");

-- CreateIndex
CREATE INDEX "OfflinePackageManifest_unitId_idx" ON "OfflinePackageManifest"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "OfflinePackageManifest_unitId_version_key" ON "OfflinePackageManifest"("unitId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityAttempt_idempotencyKey_key" ON "ActivityAttempt"("idempotencyKey");

-- CreateIndex
CREATE INDEX "ActivityAttempt_studentId_unitId_idx" ON "ActivityAttempt"("studentId", "unitId");

-- CreateIndex
CREATE INDEX "ActivityAttempt_activityId_idx" ON "ActivityAttempt"("activityId");

-- CreateIndex
CREATE INDEX "ChildProgress_studentId_unitId_idx" ON "ChildProgress"("studentId", "unitId");

-- CreateIndex
CREATE UNIQUE INDEX "ChildProgress_studentId_activityId_key" ON "ChildProgress"("studentId", "activityId");
