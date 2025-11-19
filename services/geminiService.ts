
import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// We provide a fallback string to prevent the 'new GoogleGenAI' constructor from throwing immediately
// if the environment variable is undefined during initialization (common in browser runtime).
const apiKey = process.env.API_KEY || "dummy_key_for_init";

let ai: GoogleGenAI | null = null;
try {
    ai = new GoogleGenAI({ apiKey });
} catch (error) {
    console.error("Gemini AI client initialization failed:", error);
}

export const analyzeTokenPotential = async (tokenSymbol: string, currentPrice: number, trend: number): Promise<string> => {
    if (!ai || apiKey === "dummy_key_for_init") {
        return "Análisis de IA no disponible (Falta API Key).";
    }

    try {
        const prompt = `
        Actúa como un analista experto en criptomonedas (Crypto Degen) para el ecosistema Solana en Latinoamérica.
        Analiza el potencial de un token social llamado $${tokenSymbol}.
        Precio Actual: ${currentPrice} SOL.
        Tendencia 24h: ${trend > 0 ? '+' : ''}${trend}%.
        
        Dame una evaluación de riesgo futurista, corta y contundente (máximo 3 frases) en ESPAÑOL.
        Usa jerga crypto latina apropiada (To the moon, HODL, Bearish, Bullish, Gema, Estafa).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "No se pudo generar el análisis.";
    } catch (error) {
        console.error("Gemini analysis error:", error);
        return "Error en la red neuronal. Intenta más tarde.";
    }
};
