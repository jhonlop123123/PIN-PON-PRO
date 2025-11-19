import { GoogleGenAI } from "@google/genai";

// Note: In a real production app, never expose keys on the client side directly if not using an env var strictly.
// Following instructions to use process.env.API_KEY.

let ai: GoogleGenAI | null = null;

try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (e) {
    console.error("Failed to initialize GoogleGenAI", e);
}

export const analyzeTokenPotential = async (tokenSymbol: string, currentPrice: number, trend: number): Promise<string> => {
    if (!ai) {
        return "AI Analysis Unavailable: API Key missing.";
    }

    try {
        const prompt = `
        Act as a high-stakes crypto analyst for the Solana ecosystem.
        Analyze the potential of a social token called $${tokenSymbol}.
        Current Price: ${currentPrice} SOL.
        24h Trend: ${trend > 0 ? '+' : ''}${trend}%.
        
        Provide a short, punchy, futuristic risk assessment (max 3 sentences).
        Use crypto slang appropriately (WAGMI, Moon, Bearish, Bullish).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Analysis failed to generate.";
    } catch (error) {
        console.error("Gemini analysis error:", error);
        return "AI Network Congestion. Unable to retrieve live analysis.";
    }
};