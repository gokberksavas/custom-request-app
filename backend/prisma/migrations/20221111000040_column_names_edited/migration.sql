/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Order` table. All the data in the column will be lost.
  - Made the column `description` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "surname",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "phone_umber" TEXT,
ALTER COLUMN "description" SET NOT NULL;
