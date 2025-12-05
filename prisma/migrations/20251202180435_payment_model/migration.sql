/*
  Warnings:

  - You are about to drop the column `price_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_payment_id` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[razorpay_order_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpay_payment_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plan_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpay_order_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_stripe_payment_id_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "price_id",
DROP COLUMN "stripe_payment_id",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "plan_id" TEXT NOT NULL,
ADD COLUMN     "razorpay_order_id" TEXT NOT NULL,
ADD COLUMN     "razorpay_payment_id" TEXT,
ADD COLUMN     "razorpay_signature" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorpay_order_id_key" ON "Payment"("razorpay_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorpay_payment_id_key" ON "Payment"("razorpay_payment_id");

-- CreateIndex
CREATE INDEX "Payment_user_email_idx" ON "Payment"("user_email");

-- CreateIndex
CREATE INDEX "Payment_razorpay_order_id_idx" ON "Payment"("razorpay_order_id");
