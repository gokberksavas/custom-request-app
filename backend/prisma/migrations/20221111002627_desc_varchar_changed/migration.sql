/*
  Warnings:

  - You are about to alter the column `description` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);
