-- CreateEnum
CREATE TYPE "public"."TimeBlockColor" AS ENUM ('BLUE', 'GREEN', 'RED', 'YELLOW', 'PURPLE', 'PINK', 'ORANGE', 'GRAY');

-- AlterTable
ALTER TABLE "public"."time-blocks" ADD COLUMN     "color" "public"."TimeBlockColor" NOT NULL DEFAULT 'RED',
ADD COLUMN     "description" TEXT;
