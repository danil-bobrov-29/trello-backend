-- DropForeignKey
ALTER TABLE "public"."time-blocks" DROP CONSTRAINT "time-blocks_dashboard_id_fkey";

-- AlterTable
ALTER TABLE "public"."dashboards" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "public"."time-blocks" ADD CONSTRAINT "time-blocks_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "public"."dashboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
