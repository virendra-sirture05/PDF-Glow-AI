-- DropIndex
DROP INDEX "Payment_razorpay_order_id_idx";

-- DropIndex
DROP INDEX "Payment_user_email_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription_ends_at" TIMESTAMP(3);
