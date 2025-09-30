import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// This service simulates a backend proxy.
// In a real production app, the API key would be stored securely on a server,
// and this client-side code would call an endpoint on that server.
// For this project, we isolate the API key here to abstract it from the rest of the app.
// Preferred variable name: GEMINI_API_KEY (backwards compatible with legacy API_KEY)
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!apiKey) {
    console.error("GEMINI_API_KEY / API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

/**
 * Simulates a backend call to generate content (e.g., for summarization).
 * @param prompt The text prompt for the AI model.
 * @param config The generation configuration.
 * @returns A promise that resolves to the API response.
 */
export const callGeminiSummarize = async (prompt: string, config: any): Promise<GenerateContentResponse> => {
    if (!apiKey) {
        throw new Error("API key is not configured.");
    }
    return await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: config
    });
};

/**
 * Simulates a backend call to create a new chat instance.
 * @param config The chat configuration, including system prompt.
 * @returns The chat instance.
 */
export const createChatInstance = (config: any): Chat => {
    if (!apiKey) {
        throw new Error("API key is not configured.");
    }
    return ai.chats.create(config);
};
