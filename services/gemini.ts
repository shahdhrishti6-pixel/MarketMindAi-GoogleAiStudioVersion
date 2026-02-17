
import { GoogleGenAI } from "@google/genai";

export const generateMarketingContent = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please ensure your environment is configured.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are MarketMind AI, a world-class digital marketing strategist and copywriter. Your goal is to provide high-quality, professional, and creative marketing output. Keep responses clean, well-formatted, and actionable.",
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with AI. Please try again later.";
  }
};
