"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getSummary = async () => {
  try {
    const { userId } = await auth();
    
    // Check if user is authenticated
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingUser = await prisma.user.findUnique({
        where : {
            clerkUserId : userId,
        }
    })

    const summaries = await prisma.pdfSummary.findMany({
      where: {
        user_id: existingUser?.id, // userId from Clerk auth
      },
      orderBy: {
        created_at: "desc", // Latest summaries first
      },
    });
    console.log(summaries);
    return summaries;
  } catch (error) {
    console.error("Error fetching summaries:", error);
    throw error;
  }
};