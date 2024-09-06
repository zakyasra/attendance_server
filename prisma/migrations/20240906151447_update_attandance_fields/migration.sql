-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "check_in" DROP NOT NULL,
ALTER COLUMN "check_out" DROP NOT NULL,
ALTER COLUMN "is_delete" SET DEFAULT false;
