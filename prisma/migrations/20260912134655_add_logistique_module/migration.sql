
-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "building" TEXT,
    "capacity" INTEGER,
    "condition" TEXT NOT NULL DEFAULT 'bon',
    "school" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'signalee',
    "reportedById" INTEGER NOT NULL,
    "assignedToId" INTEGER,
    "school" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MaintenanceRequest_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceRequest_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogisticsRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestedById" INTEGER NOT NULL,
    "resourceLabel" TEXT NOT NULL,
    "quantity" INTEGER,
    "urgency" TEXT NOT NULL DEFAULT 'normale',
    "status" TEXT NOT NULL DEFAULT 'soumise',
    "school" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LogisticsRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Room_school_idx" ON "Room"("school");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_status_idx" ON "MaintenanceRequest"("status");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_resourceType_resourceId_idx" ON "MaintenanceRequest"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_school_idx" ON "MaintenanceRequest"("school");

-- CreateIndex
CREATE INDEX "LogisticsRequest_status_idx" ON "LogisticsRequest"("status");

-- CreateIndex
CREATE INDEX "LogisticsRequest_school_idx" ON "LogisticsRequest"("school");

