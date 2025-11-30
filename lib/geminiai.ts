import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY!);

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    console.log("🚀 Starting Gemini summary generation...");
    console.log("📄 PDF text length:", pdfText.length);
    
    // Validate input
    if (!pdfText || pdfText.trim().length === 0) {
      throw new Error("PDF text is empty or invalid");
    }

    // Check API key
    if (!process.env.GEMINI_AI_KEY) {
      throw new Error("GEMINI_AI_KEY is not set in environment variables");
    }

    // Use gemini-1.5-flash-latest for better free tier limits
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Correct model name
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // Gemini doesn't have a separate "system" role
    // Combine system prompt with user message as a single prompt string
    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy to read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

    console.log("📤 Sending request to Gemini API...");
    
    // Generate content - pass string directly
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log("✅ Received response from Gemini");
    console.log("📝 Summary length:", text?.length || 0);
    
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return text;
  } catch (error: any) {
    console.error("❌ Gemini API error occurred:", error);
    console.error("Error details:", {
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
    });
    
    // Handle rate limiting specifically
    if (error?.status === 429 || error?.message?.includes("quota") || error?.message?.includes("RESOURCE_EXHAUSTED")) {
      console.error("⚠️ Rate limit exceeded");
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    
    throw error;
  }
};