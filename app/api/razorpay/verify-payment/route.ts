import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  console.log("\n=== VERIFY PAYMENT API START ===");
  
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
    } = body;

    console.log("1. Order ID:", razorpay_order_id);
    console.log("2. Payment ID:", razorpay_payment_id);
    console.log("3. Plan ID:", planId);

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    const isValid = razorpay_signature === expectedSign;
    console.log("4. Signature valid:", isValid);

    if (!isValid) {
      console.error("❌ Invalid signature");
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Get payment from database
    const payment = await prisma.payment.findUnique({
      where: { razorpay_order_id },
      include: { user: true },
    });

    if (!payment) {
      console.error("❌ Payment not found in database");
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    console.log("5. Payment found for user:", payment.user_email);

    // Update payment status
    await prisma.payment.update({
      where: { razorpay_order_id },
      data: {
        status: "captured",
        razorpay_payment_id,
        razorpay_signature,
      },
    });

    console.log("6. Payment status updated to: captured");

    // Update user subscription
    await prisma.user.update({
      where: { email: payment.user_email },
      data: {
        status: "active",
        price_id: planId,
      },
    });

    console.log("7. User subscription activated");
    console.log("✅ === VERIFY PAYMENT API SUCCESS ===\n");

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error: any) {
    console.error("\n❌ === VERIFY PAYMENT API ERROR ===");
    console.error("Error:", error.message);
    
    return NextResponse.json(
      { 
        error: "Payment verification failed",
        details: error.message 
      },
      { status: 500 }
    );
  }
}