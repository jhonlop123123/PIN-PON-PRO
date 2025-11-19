
import { GoogleGenAI } from "@google/genai";

// Note: In a real production app, never expose keys on the client side directly if not using an env var strictly.
// Following instructions to use process.env.API_KEY.

let ai: GoogleGenAI | null = null;

try {
    // Check if process is defined to avoid ReferenceError in browser environments
    // @ts-ignore
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
    
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    } else {
        console.warn("Gemini API Key missing or process.env not available - AI features will be disabled.");
    }
} catch (e) {
    console.error("Failed to initialize GoogleGenAI", e);
}

export const analyzeTokenPotential = async (tokenSymbol: string, currentPrice: number, trend: number): Promise<string> => {
    if (!ai) {
        return "Análisis de IA no disponible: Falta API Key o configuración de entorno.";
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

        return response.text || "Falló el análisis de generación.";
    } catch (error) {
        console.error("Gemini analysis error:", error);
        return "Congestión en la Red Neuronal. No se pudo obtener el análisis en vivo.";
    }
};
