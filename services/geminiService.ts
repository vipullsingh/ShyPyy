import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini Client
// process.env.API_KEY is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Chat with the AI Assistant (ShyPy Bot)
 * Uses gemini-3-pro-preview for complex, empathetic interactions.
 */
export const chatWithAI = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  try {
    const model = 'gemini-3-pro-preview';
    // Note: For single turn, we could use models.generateContent. 
    // For chat history, we assume the caller manages history context or we start a new chat.
    // Here we demonstrate a single turn stateless response for simplicity in this demo service,
    // but in a real app, you'd maintain the Chat session object.
    
    const response = await ai.models.generateContent({
      model,
      contents: message, // In a real chat loop, this would be the user's message appended to history
      config: {
        systemInstruction: "You are 'VibeBot', the empathetic AI companion for ShyPy. Your goal is to help users connect, offer gentle advice, and maintain a warm, supportive tone. Keep responses concise and friendly.",
      }
    });
    
    return response.text || "I'm having trouble connecting to the vibe right now. Try again?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm feeling a bit shy right now. Can we try later?";
  }
};

/**
 * Analyze the 'Vibe' of a drafted post before publishing.
 * Uses gemini-2.5-flash for speed and efficiency.
 */
export const analyzePostVibe = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the emotional "vibe" of this text in 3 words or less (e.g., "Melancholic, Hopeful, Deep"): "${content}"`,
    });
    return response.text || "Unknown Vibe";
  } catch (error) {
    return "Mysterious";
  }
};

/**
 * Generate quick reply suggestions for DMs.
 * Uses gemini-flash-lite-latest for ultra-low latency.
 */
export const getQuickReplies = async (lastMessage: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Generate 3 short, casual, and friendly reply options (max 5 words each) for this message: "${lastMessage}". Return them as a comma-separated list.`,
    });
    
    const text = response.text || "";
    return text.split(',').map(s => s.trim()).slice(0, 3);
  } catch (error) {
    return ["That's cool!", "Tell me more", "Sending vibes"];
  }
};