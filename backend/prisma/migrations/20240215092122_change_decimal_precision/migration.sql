/*
  Warnings:

  - You are about to alter the column `total` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `deposit` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "deposit" SET DATA TYPE DECIMAL(10,2);
