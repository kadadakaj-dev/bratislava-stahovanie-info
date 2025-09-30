import { Post } from "../types";
import { Translations } from "../App";
// Refactored to use server proxy endpoint instead of direct SDK in bundle.
// Streaming simulation: accumulate result after fetch for now (could extend with real streaming via server-sent events).
let chatStarted = false;

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
    chatStarted = true; // System prompt stored locally; sent with each request minimally.
    sessionStorage.setItem('viandmo_system_prompt', buildSystemPrompt(t));
};

export const sendChatMessage = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
        if (!chatStarted) {
            throw new Error('Chat not initialized');
        }
        try {
            const systemInstruction = sessionStorage.getItem('viandmo_system_prompt') || '';
            const res = await fetch('/api/ai-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: `${systemInstruction}\nUser: ${message}\nAssistant:`, model: 'gemini-2.5-flash' })
            });
            if (!res.ok) throw new Error('Proxy request failed');
            const data = await res.json();
            async function* gen() { yield data.text as string; }
            return gen();
        } catch (e) {
            console.error(e);
            throw new Error('Failed to get a response from the AI assistant.');
        }
};


export const summarizePost = async (post: Post): Promise<string> => {
    const prompt = `Prosím, poskytni stručné, pútavé a ľahko zrozumiteľné zhrnutie nasledujúceho blogového príspevku v slovenčine. Zhrnutie by malo mať približne 3-4 vety.

    **Názov blogového príspevku:** ${post.title}
    
    **Obsah:**
    ${post.content.replace(/<[^>]*>?/gm, '')} // Strip HTML tags for the prompt
    
    **Zhrnutie:**`;

        try {
            const res = await fetch('/api/ai-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, model: 'gemini-2.5-flash', config: { maxOutputTokens: 150 } })
            });
            if (!res.ok) throw new Error('Proxy summarize failed');
            const data = await res.json();
            return (data.text || '').trim();
        } catch (error) {
            console.error('Error summarizing post:', error);
            return "Sorry, I couldn't generate a summary at this moment. Please try again later.";
        }
};