/*
  Warnings:

  - Added the required column `location` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "size" BYTEA NOT NULL;
