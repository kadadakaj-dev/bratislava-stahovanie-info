import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { Post } from "../types";
import { Translations } from "../App";

// The API key is sourced from the environment variable `process.env.API_KEY`.
// This is a hard requirement and is assumed to be configured in the execution environment.
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error("API_KEY environment variable not set. AI features will not work.");
}
// Initialize the GoogleGenAI client. The apiKey is mandatory.
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

let chat: Chat | null = null;

const buildSystemPrompt = (t: Translations): string => {
    return `
      Si priateľský a nápomocný AI asistent pre firmu VI&MO. Tvojou úlohou je odpovedať na otázky zákazníkov o službách firmy.
      Hovor výhradne po slovensky, pokiaľ ťa používateľ nepožiada o komunikáciu v inom jazyku.
      Odpovedaj stručne, jasne a profesionálne. Vždy sa snaž byť nápomocný.
      Keď je to vhodné, odkáž používateľa na konkrétne sekcie webu ('Služby', 'Cenník', 'Referencie') alebo ho povzbuď, aby vyplnil kontaktný formulár.
      
      Tu sú kľúčové informácie o firme VI&MO, ktoré musíš použiť pri odpovediach:

      **Názov firmy:** VI and MO s. r. o.
      **Web:** viandmo.com
      **Kontakt na sťahovanie:** Miroslav Danihel, +421 911 275 755, info@viandmo.com
      **Kontakt na upratovanie:** +421 918 895 730

      **Hlavné Služby:**
      1.  **Sťahovanie bytov:** Kompletný servis pre garsónky až 4-izbové byty. Zahrnuté: demontáž/montáž nábytku, spoľahlivá logistika v BA, poistenie.
      2.  **Sťahovanie firiem:** Efektívny presun kancelárií, skladov s minimálnym výpadkom. Odborná manipulácia s IT. Možnosť sťahovania cez víkend/noc.
      3.  **Vypratávanie:** Vypratávanie bytov, pivníc, garáží. Ekologická likvidácia odpadu.
      4.  **Autodoprava:** Rýchla doprava nábytku a tovaru v BA aj mimo.
      5.  **Balenie:** Profesionálne baliace služby, dodanie materiálu.

      **Základný Cenník:**
      - **Sťahovanie bytov (orientačné ceny):**
        - Garsónka: od 65 €
        - 1-izbový byt: od 70 €
        - 2-izbový byt: od 140 €
        - 3-izbový byt: od 240 €
        - Rodinný dom: na vyžiadanie (cenová ponuka)
      - **Pracovníci:**
        - 1 pracovník + šofér: 40 €/hod
        - 2 pracovníci: od 50 €/hod
      - **Doprava:**
        - V rámci Bratislavy: do 30 €
        - Mimo mesta: 0,80 €/km
      - **Minimálny výjazd:** 70 €

      **Dôležité Pokyny:**
      - NIKDY si nevymýšaj ceny ani služby, ktoré nie sú uvedené.
      - Ak nevieš odpoveď, povedz: "Na túto otázku nemám presné informácie, ale odporúčam kontaktovať pána Danihela na čísle +421 911 275 755, ktorý vám rád pomôže."
      - Buď pozitívny a povzbudzuj používateľov, aby využili služby firmy.
    `;
};


export const startChat = (t: Translations) => {
    if (!apiKey) {
        console.error("Cannot start chat, API key is missing.");
        return;
    }
    const systemInstruction = buildSystemPrompt(t);
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction,
        },
    });
    console.log("Chat started with system prompt.");
};

export const sendChatMessage = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
    if (!chat) {
        throw new Error("Chat is not initialized. Call startChat first.");
    }
    if (!apiKey) {
        throw new Error("API key is not configured.");
    }

    try {
        const responseStream = await chat.sendMessageStream({ message });
        
        async function* streamGenerator(): AsyncGenerator<string, void, unknown> {
            for await (const chunk of responseStream) {
                yield chunk.text;
            }
        }
        
        return streamGenerator();

    } catch (error) {
        console.error("Error sending chat message:", error);
        throw new Error("Failed to get a response from the AI assistant.");
    }
};


export const summarizePost = async (post: Post): Promise<string> => {
    if (!apiKey) {
         return "The AI summarization feature is currently unavailable because the API key is not configured.";
    }

    const prompt = `Prosím, poskytni stručné, pútavé a ľahko zrozumiteľné zhrnutie nasledujúceho blogového príspevku v slovenčine. Zhrnutie by malo mať približne 3-4 vety.

    **Názov blogového príspevku:** ${post.title}
    
    **Obsah:**
    ${post.content.replace(/<[^>]*>?/gm, '')} // Strip HTML tags for the prompt
    
    **Zhrnutie:**`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.5,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 150,
                // FIX: Added thinkingConfig as it's required when maxOutputTokens is set for gemini-2.5-flash to avoid empty responses.
                thinkingConfig: { thinkingBudget: 50 },
            }
        });
        
        return response.text.trim();
    } catch (error) {
        console.error("Error summarizing post:", error);
        return "Sorry, I couldn't generate a summary at this moment. Please try again later.";
    }
};
