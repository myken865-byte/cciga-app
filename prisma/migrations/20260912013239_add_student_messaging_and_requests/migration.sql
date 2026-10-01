-- CreateTable
CREATE TABLE "StudentConversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "courseId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentConversation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentConversation_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentConversation_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentConversationMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "readByStudent" BOOLEAN NOT NULL DEFAULT false,
    "readByStaff" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentConversationMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "StudentConversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentConversationMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'soumise',
    "attachmentUrl" TEXT,
    "attachmentName" TEXT,
    "documentUrl" TEXT,
    "documentName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentRequestMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentRequestMessage_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "StudentRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentRequestMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "StudentConversation_studentId_idx" ON "StudentConversation"("studentId");

-- CreateIndex
CREATE INDEX "StudentConversation_staffId_idx" ON "StudentConversation"("staffId");

-- CreateIndex
CREATE INDEX "StudentConversationMessage_conversationId_idx" ON "StudentConversationMessage"("conversationId");

-- CreateIndex
CREATE INDEX "StudentRequest_studentId_idx" ON "StudentRequest"("studentId");

-- CreateIndex
CREATE INDEX "StudentRequest_status_idx" ON "StudentRequest"("status");

-- CreateIndex
CREATE INDEX "StudentRequestMessage_requestId_idx" ON "StudentRequestMessage"("requestId");

