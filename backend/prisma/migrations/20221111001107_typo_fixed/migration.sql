/*
  Warnings:

  - You are about to drop the column `phone_umber` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "phone_umber",
ADD COLUMN     "phone_number" TEXT;
