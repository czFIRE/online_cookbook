/*
  Warnings:

  - You are about to drop the column `userId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `StarRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "StarRating" DROP CONSTRAINT "StarRating_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "StarRating" DROP CONSTRAINT "StarRating_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "userId";

-- DropTable
DROP TABLE "StarRating";

-- DropTable
DROP TABLE "User";
