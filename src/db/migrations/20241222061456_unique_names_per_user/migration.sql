/*
  Warnings:

  - A unique constraint covering the columns `[userId,parentId,name]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Directory_parentId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Directory_userId_parentId_name_key" ON "Directory"("userId", "parentId", "name");
