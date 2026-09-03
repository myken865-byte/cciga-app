-- AlterTable
ALTER TABLE "Payment" ADD COLUMN "provider" TEXT NOT NULL DEFAULT 'manuel';
ALTER TABLE "Payment" ADD COLUMN "providerReference" TEXT;
ALTER TABLE "Payment" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'confirme';
