-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('NEW', 'WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'NOT_INTERESTED');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "appliedAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3);
