/*
  Warnings:

  - Made the column `timeComplexity` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portions` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "timeComplexity" SET NOT NULL,
ALTER COLUMN "portions" SET NOT NULL;
