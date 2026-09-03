-- CreateTable
CREATE TABLE "ParentRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'envoyee',
    "attachmentUrl" TEXT,
    "attachmentName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ParentRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ParentRequest_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ParentRequestMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ParentRequestMessage_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "ParentRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ParentRequestMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ParentRequest_parentId_idx" ON "ParentRequest"("parentId");

-- CreateIndex
CREATE INDEX "ParentRequest_studentId_idx" ON "ParentRequest"("studentId");

-- CreateIndex
CREATE INDEX "ParentRequest_service_idx" ON "ParentRequest"("service");

-- CreateIndex
CREATE INDEX "ParentRequest_status_idx" ON "ParentRequest"("status");

-- CreateIndex
CREATE INDEX "ParentRequestMessage_requestId_idx" ON "ParentRequestMessage"("requestId");
