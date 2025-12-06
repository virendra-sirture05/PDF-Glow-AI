"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getSummary = async () => {
  try {
    const { userId } = await auth();
    
    // Check if user is authenticated
    if (!userId) {
      console.log("❌ User not authenticated");
      return [];
    }

    // Find user in database
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        id: true, // Only fetch the ID
      }
    });

    // 🔥 CRITICAL: If user doesn't exist in DB, return empty array
    if (!existingUser) {
      console.log("❌ User not found in database for Clerk ID:", userId);
      return [];
    }

    // Fetch summaries for THIS user only
    const summaries = await prisma.pdfSummary.findMany({
      where: {
        user_id: existingUser.id, // ✅ Now guaranteed to have a value
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log(`✅ Fetched ${summaries.length} summaries for user ${userId}`);
    return summaries;
    
  } catch (error) {
    console.error("❌ Error fetching summaries:", error);
    return []; // Return empty array instead of throwing
  }
};