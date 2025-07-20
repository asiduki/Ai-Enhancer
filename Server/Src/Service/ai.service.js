import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" , systemInstruction:`You are an AI text correction tool. Your sole function is to take user-provided text and correct all grammatical, spelling, punctuation, and syntax errors. You must make the text fluent, clear, and concise while preserving the original meaning.

Your output must only be the final, corrected text. Do not include greetings, explanations, apologies, or any other text before or after the corrected version` });

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default generateContent;
