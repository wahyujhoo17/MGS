/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `minOrderWholesale` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceRetail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceWholesale` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `variants` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
DROP COLUMN "minOrderWholesale",
DROP COLUMN "priceRetail",
DROP COLUMN "priceWholesale",
DROP COLUMN "variants",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "taste" TEXT NOT NULL,
    "priceRetail" INTEGER NOT NULL,
    "priceWholesale" INTEGER NOT NULL,
    "minOrderWholesale" INTEGER NOT NULL DEFAULT 12,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
