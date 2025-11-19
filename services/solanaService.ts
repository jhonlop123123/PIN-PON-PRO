
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Declare window interface to support Solana provider
declare global {
    interface Window {
        solana?: any;
    }
}

/**
 * Connects to the Phantom Wallet or returns a Demo Wallet if not found.
 * This ensures the "Wizard of Oz" demo works on any device.
 */
export const connectWallet = async (): Promise<{ address: string } | null> => {
    try {
        const { solana } = window;

        if (solana && solana.isPhantom) {
            const response = await solana.connect();
            return { address: response.publicKey.toString() };
        }

        // --- DEMO MODE FALLBACK ---
        // If no wallet is installed, we return a mock address so the user
        // can still experience the UI flow.
        console.warn("Phantom wallet not found. Using Demo Wallet.");
        return { address: '8xDemo...Wallet' };

    } catch (error) {
        console.error("Wallet connection error:", error);
        return null;
    }
};

/**
 * Fetches the SOL balance. Returns a mock balance for the Demo Wallet.
 */
export const getWalletBalance = async (address: string): Promise<number> => {
    // If we are in Demo Mode, return a static balance + some randomization to look alive
    if (address === '8xDemo...Wallet') {
        return 12.45; 
    }

    try {
        // Connect to Devnet for real testing without real money
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL;
    } catch (e) {
        console.error("Failed to get balance:", e);
        return 0;
    }
};
