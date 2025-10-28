/*
  Warnings:

  - The primary key for the `Trigger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AppName` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `Authentication` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `Trigger` table. All the data in the column will be lost.
  - Added the required column `triggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Made the column `zapId` on table `Trigger` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- AlterTable
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_pkey",
DROP COLUMN "AppName",
DROP COLUMN "Authentication",
DROP COLUMN "event",
ADD COLUMN     "triggerId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "zapId" SET NOT NULL,
ADD CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trigger_id_seq";

-- DropEnum
DROP TYPE "public"."AppType";

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "Authentication" TEXT NOT NULL,
    "zapId" INTEGER,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
