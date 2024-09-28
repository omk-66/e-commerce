/*
  Warnings:

  - The primary key for the `EmailVerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `EmailVerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "EmailVerificationToken" DROP CONSTRAINT "EmailVerificationToken_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "TwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "passwordResetTokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordResetTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "twoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "twoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwordResetTokens_email_key" ON "passwordResetTokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "twoFactorToken_email_key" ON "twoFactorToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_email_key" ON "EmailVerificationToken"("email");
