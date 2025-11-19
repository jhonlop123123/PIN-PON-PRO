
export enum ViewState {
  LANDING = 'LANDING',
  BIOMETRIC = 'BIOMETRIC',
  APP_FEED = 'APP_FEED',
  APP_INVEST = 'APP_INVEST',
  APP_SECURITY = 'APP_SECURITY',
  APP_PROFILE = 'APP_PROFILE',
  APP_SETTINGS = 'APP_SETTINGS', // Added
}

export interface VideoChallenge {
  id: string;
  title: string;
  creator: string;
  tokenSymbol: string;
  currentPrice: number;
  priceChange24h: number;
  likes: number;
  shares: number;
  videoUrl: string; 
  thumbnailUrl: string;
  color: string;
  // AI Specific Data
  aiPrompt: string;
  aiModel: string;
  seed: string;
  // Security & Economics (Anti-Rug)
  isVerified: boolean; // C2PA Verification
  verificationProvider: string; // e.g., "OpenAI Ledger", "Solana Content Auth"
  creatorBond: number; // Amount of SOL staked by creator (Skin in the game)
  liquidityLocked: boolean; // Is the liquidity pool locked?
  mintAuthority: 'RENOUNCED' | 'ACTIVE'; // Renounced means creator can't print more tokens
  safetyScore: number; // 0-100
}

export interface MarketDataPoint {
  time: string;
  value: number;
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL' | 'STAKE';
  amount: number;
  token: string;
  date: string;
  status: 'COMPLETED' | 'PENDING';
}

export interface SecurityMetric {
  label: string;
  status: 'SECURE' | 'WARNING' | 'DANGER';
  details: string;
}

export interface UserWallet {
    address: string;
    solBalance: number;
    pinPonBalance: number; // The App's Native Token
    isConnected: boolean;
}
