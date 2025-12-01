"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deletePdf = async ({summaryId} : {summaryId : string}) => {
    
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Check if summaryId is valid
    if (!summaryId) {
      throw new Error("Summary ID is required");
    }

    // Optional: Verify the summary belongs to the user
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Delete the summary
    await prisma.pdfSummary.delete({
      where: {
        id: summaryId,
        user_id: existingUser.id, // Extra security: ensure it's their summary
      },
    });

    // Revalidate the page to update UI
    revalidatePath("/dashboard");
    

    return { success: true };
  } catch (error) {
    console.error("Error deleting summary:", error);
    throw error;
  }
};