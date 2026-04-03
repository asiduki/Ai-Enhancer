require("dotenv/config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const SYSTEM_INSTRUCTION = `You are an AI text correction tool. Your sole function is to take user-provided text and correct all grammatical, spelling, punctuation, and syntax errors. You must make the text fluent, clear, and concise while preserving the original meaning.

Your output must only be the final, corrected text. Do not include greetings, explanations, apologies, or any other text before or after the corrected version`;

async function generateWithGemini(prompt) {
  const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateWithOpenRouter(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user",   content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`OpenRouter error: ${err.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateContent(prompt) {
  if (process.env.GOOGLE_GEMINI_KEY) {
    try {
      console.log("Using Gemini...");
      return await generateWithGemini(prompt);
    } catch (err) {
      console.warn("Gemini failed:", err.message);
    }
  }

  if (process.env.OPENROUTER_API_KEY) {
    console.log("Falling back to OpenRouter...");
    return await generateWithOpenRouter(prompt);
  }

  throw new Error("No API keys found. Set GOOGLE_GEMINI_KEY or OPENROUTER_API_KEY in .env");
}

module.exports = generateContent;