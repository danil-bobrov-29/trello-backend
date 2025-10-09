-- DropForeignKey
ALTER TABLE "public"."cards" DROP CONSTRAINT "cards_time-block_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."cards" ADD CONSTRAINT "cards_time-block_id_fkey" FOREIGN KEY ("time-block_id") REFERENCES "public"."time-blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
