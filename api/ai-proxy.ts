// Simple edge-friendly style handler (Vercel / Netlify compatible) to proxy Gemini calls.
// NOTE: This is a minimal illustrative endpoint. In real production add auth / rate limiting.
import { GoogleGenAI } from '@google/genai';

export const config = { runtime: 'edge' } as const;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing API key on server.' }), { status: 500 });
    }
    const { prompt, model = 'gemini-2.5-flash', config } = await req.json();
    const genAI = new GoogleGenAI({ apiKey });
    const resp = await genAI.models.generateContent({ model, contents: prompt, config });
    return new Response(JSON.stringify({ text: resp.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 500 });
  }
}
