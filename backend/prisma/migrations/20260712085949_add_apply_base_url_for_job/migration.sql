/*
  Warnings:

  - You are about to drop the column `applyBaseUrl` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "applyBaseUrl" TEXT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "applyBaseUrl";
