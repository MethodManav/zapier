/*
  Warnings:

  - You are about to drop the column `Authentication` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `Action` table. All the data in the column will be lost.
  - The primary key for the `Zap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Zap` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zapId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actionId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Made the column `zapId` on table `Action` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `triggerId` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Action" DROP CONSTRAINT "Action_zapId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "Authentication",
DROP COLUMN "event",
ADD COLUMN     "actionId" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "zapId" SET NOT NULL,
ALTER COLUMN "zapId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ALTER COLUMN "zapId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "triggerId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zap_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Zap_id_seq";

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_zapId_key" ON "Trigger"("zapId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
