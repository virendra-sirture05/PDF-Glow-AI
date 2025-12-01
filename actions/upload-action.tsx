"use server";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { getSummaryFromOpenAi } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  user_id: string;
  original_file_url: string;
  summary_text: string;
  title: string;
  file_name: string;
}

export const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload faild",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    // const pdfText = "dfjdlfkdjfjdfksjdf"
    console.log({ pdfText });

    let summary;
    try {
      summary = await getSummaryFromOpenAi(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      // call gemini
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.log(
            "Gemini API failed after openai quote exceeded",
            geminiError
          );
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    const formatedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formatedFileName,
        summary,
        original_file_url: pdfUrl, // <-- REQUIRED
        fileName, // <-- optional, par helpful
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
};

const savePdfSummary = async ({
  user_id,
  original_file_url,
  summary_text,
  title,
  file_name,
}: PdfSummaryType) => {
  try {
    const newSummary = await prisma.pdfSummary.create({
      data: {
        user_id: user_id,
        original_file_url,
        summary_text,
        title,
        file_name,
      },
    });
    console.log("fdjfjlfjdljf", newSummary);
    return newSummary;
  } catch (error) {
    console.log("Error saving PDF summary", error);
    throw error;
  }
};

export const storePdfSummaryAction = async ({
  original_file_url,
  summary_text,
  title,
  file_name,
}: Omit<PdfSummaryType, "user_id">) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not logged in");
    }
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const savedSummary = await savePdfSummary({
      user_id: existingUser?.id as string,
      original_file_url,
      summary_text,
      title,
      file_name,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save pdf summary, please try again...",
      };
    }

    revalidatePath(`/summaries/${savedSummary.id}`);
    return {
      success: true,
      message: "PDF summary saved successfully",
      data: savedSummary,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
};
