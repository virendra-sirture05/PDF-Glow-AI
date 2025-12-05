"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserSubscription() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { 
        isSubscribed: false, 
        planId: null,
        uploadCount: 0 
      };
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        status: true,
        price_id: true,
        subscription_ends_at: true,
        pdf_summaries: {
          select: { id: true }
        }
      }
    });

    if (!user) {
      return { 
        isSubscribed: false, 
        planId: null,
        uploadCount: 0 
      };
    }

    // Check if subscription has expired
    const now = new Date();
    const hasExpired = user.subscription_ends_at && user.subscription_ends_at < now;

    // If expired, auto-deactivate
    if (hasExpired && user.status === "active") {
      await prisma.user.update({
        where: { clerkUserId: userId },
        data: { 
          status: "inactive",
          price_id: null 
        }
      });
      
      return { 
        isSubscribed: false, 
        planId: null,
        uploadCount: user.pdf_summaries?.length || 0 
      };
    }

    const isSubscribed = user.status === "active" && user.price_id !== null && !hasExpired;
    const uploadCount = user.pdf_summaries?.length || 0;

    return {
      isSubscribed,
      planId: user.price_id,
      uploadCount,
      status: user.status,
      expiresAt: user.subscription_ends_at
    };

  } catch (error) {
    console.error("Error fetching subscription:", error);
    return { 
      isSubscribed: false, 
      planId: null,
      uploadCount: 0 
    };
  }
}