/*
  Warnings:

  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Made the column `timeComplexity` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portions` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "timeComplexity" SET NOT NULL,
ALTER COLUMN "portions" SET NOT NULL;
