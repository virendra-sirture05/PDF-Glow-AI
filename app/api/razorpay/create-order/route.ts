import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("\n=== API CALLED ===");
  
  try {
    const body = await req.json();
    const { planId } = body;
    
    console.log("Plan ID:", planId); 

    // Check env vars
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Env vars missing!");
      return NextResponse.json({
        error: "Config missing",
        hasKeyId: !!keyId,
        hasSecret: !!keySecret,
      }, { status: 500 });
    }

    console.log("Key ID:", keyId.substring(0, 10) + "...");

    // Import Razorpay
    const Razorpay = require("razorpay");
    
    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Plan amounts
    const amounts: any = {
      basic: 900,
      pro: 1999,
    };

    const amount = amounts[planId] || 900;

    // Create order
    const order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ Order created:", order.id);

    const { userId } = await auth();

    if (!userId) {
      console.error("❌ User not authenticated");
      return NextResponse.json(
        { error: "Please login to continue" },
        { status: 401 }
      );
    }

    const loggedInUser = await prisma.user.findUnique({
      where : {
        clerkUserId : userId
      }
    })

    const payment = await prisma.payment.create({
      data: {
        amount: amount,
        currency: "INR",
        status: "created",
        razorpay_order_id: order.id,
        plan_id: planId,
        user_email: loggedInUser?.email as string,
      },
    });


    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
    });

  } catch (error : any) {
    console.error("\n❌ ERROR:", error.message);
    console.error("Stack:", error.stack);
    
    return NextResponse.json({
      error: error.message,
      hint: "Check server logs",
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "API route is accessible",
    method: "Use POST to create order",
  });
}