import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 👇 BAS YE DO LINES ADD KARO - PROBLEM SOLVE!
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ 
        isSubscribed: false, 
        planId: null,
        uploadCount: 0 
      });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        status: true,
        price_id: true,
        pdf_summaries: {
          select: { id: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ 
        isSubscribed: false, 
        planId: null,
        uploadCount: 0 
      });
    }

    const isSubscribed = user.status === "active" && user.price_id !== null;
    const uploadCount = user.pdf_summaries?.length || 0;

    return NextResponse.json({
      isSubscribed,
      planId: user.price_id,
      uploadCount,
      status: user.status
    });

  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json({ 
      isSubscribed: false, 
      planId: null,
      uploadCount: 0 
    }, { status: 500 });
  }
}