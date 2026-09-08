-- Phase C1 (2026-09-07) : ajout de champs institutionnels nullable uniquement.
-- Aucun backfill, aucune valeur par défaut, aucune contrainte NOT NULL.

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "Badge" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "InfirmaryVisit" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "PsychosocialCase" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "BookLoan" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "TransportAssignment" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "CanteenMenu" ADD COLUMN "school" TEXT;

-- AlterTable
ALTER TABLE "CanteenReservation" ADD COLUMN "school" TEXT;

-- CreateIndex
CREATE INDEX "Employee_school_idx" ON "Employee"("school");

-- CreateIndex
CREATE INDEX "Badge_school_idx" ON "Badge"("school");

-- CreateIndex
CREATE INDEX "Badge_school_status_idx" ON "Badge"("school", "status");

-- CreateIndex
CREATE INDEX "InfirmaryVisit_school_idx" ON "InfirmaryVisit"("school");

-- CreateIndex
CREATE INDEX "PsychosocialCase_school_idx" ON "PsychosocialCase"("school");

-- CreateIndex
CREATE INDEX "PsychosocialCase_school_status_idx" ON "PsychosocialCase"("school", "status");

-- CreateIndex
CREATE INDEX "Book_school_idx" ON "Book"("school");

-- CreateIndex
CREATE INDEX "BookLoan_school_idx" ON "BookLoan"("school");

-- CreateIndex
CREATE INDEX "Vehicle_school_idx" ON "Vehicle"("school");

-- CreateIndex
CREATE INDEX "TransportAssignment_school_idx" ON "TransportAssignment"("school");

-- CreateIndex
CREATE INDEX "CanteenMenu_school_idx" ON "CanteenMenu"("school");

-- CreateIndex
CREATE INDEX "CanteenMenu_school_date_idx" ON "CanteenMenu"("school", "date");

-- CreateIndex
CREATE INDEX "CanteenReservation_school_idx" ON "CanteenReservation"("school");
