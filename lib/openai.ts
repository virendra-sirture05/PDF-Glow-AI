import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const getSummaryFromOpenAi = async(pdfText: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
            role :"user",
            content : `Transform this document into an engaging, easy to read summary with contextually relavant emojis and proper markdown formatting:\n\n${pdfText}`
        }
      ],
      temperature : 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error : any) {
    if(error?.status === 429){
        throw new Error("RATE_LIMIT_EXCEEDED")
    }
    throw error;
  }
};
