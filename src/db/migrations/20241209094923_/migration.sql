/*
  Warnings:

  - A unique constraint covering the columns `[parentId,name]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[directoryId,name]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Made the column `directoryId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_directoryId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "directoryId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Directory_parentId_name_key" ON "Directory"("parentId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "File_directoryId_name_key" ON "File"("directoryId", "name");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
