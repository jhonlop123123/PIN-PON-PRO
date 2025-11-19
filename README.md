
# PinPon - Solana SocialFi Video App
### Architected by Jonathan L.

## 🚀 Project Vision
PinPon is a futuristic, secure blockchain-based social application designed for video challenges tokenized on the Solana network. It combines the viral engagement of short-form video (TikTok style) with the financial incentives of SocialFi and the security of a crypto wallet.

## 🛠 Tech Stack
This prototype is built using a modern frontend stack ready for conversion to Mobile Native (via Capacitor/Expo).

- **Core:** React 18 + TypeScript
- **Styling:** Tailwind CSS (Futuristic/Neon aesthetic)
- **State Management:** React Hooks
- **Blockchain Integration:** `@solana/web3.js`
- **AI Integration:** Google Gemini API (for Investment Analysis & Content Verification)
- **Icons:** Lucide React
- **Charts:** Recharts

## ⚡ QUICK START: HOW TO DEPLOY (Get it Online)

**Step 1: Get a Live URL (Free)**
Don't keep this code on your laptop. Deploy it to Vercel to show investors/partners.
1. Create an account at [Vercel.com](https://vercel.com).
2. Install CLI: `npm i -g vercel`
3. Run command: `vercel`
4. Share the generated URL (e.g., `https://pinpon.vercel.app`).

**Step 2: Find a Co-Founder (Technical Partner)**
If you don't have budget, find a partner who codes for equity.
- **Y Combinator Co-Founder Match:** [ycombinator.com/cofounder-matching](https://www.ycombinator.com/cofounder-matching)
- Create a profile -> Select "I am a Designer/Product person" -> Look for "Solana/React Engineer".

**Step 3: Get Funding (Grants)**
Upload this prototype to crypto-specific platforms.
- **DoraHacks:** [dorahacks.io](https://dorahacks.io/) (Look for Solana Hackathons).
- **Solana Colosseum:** [colosseum.org](https://www.colosseum.org/).

## 📂 Architecture Overview

### 1. Frontend Layer (Current State)
- **`App.tsx`**: Main controller handling Authentication State (Guest vs Wallet) and View Routing.
- **`views/`**: 
  - `FeedView`: The core video scrolling experience with custom overlays for "Invest" and "AI Prompts".
  - `InvestView`: Real-time charting and simulated Swap Interface ($SOL <-> $PINPON).
  - `SecurityView`: Dashboard showing biometric status and simulated audit logs.
- **`services/solanaService.ts`**: Logic for connecting to Phantom Wallet and querying the Solana Cluster.

### 2. Planned Backend Layer (Needs Implementation)
To move this to Production (Mainnet), the following is required:
- **Smart Contract (Rust/Anchor):** 
  - Needs a Program to handle the `$PINPON` token minting.
  - Needs a "Bonding Curve" contract for individual video tokens.
- **Database (Supabase/Firebase):** To store video URLs and User Profiles off-chain.
- **Storage (Arweave/IPFS):** For decentralized video storage.

## 📦 Setup Instructions for Developers

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Local Server:**
   ```bash
   npm run dev
   ```

3. **Build for Mobile (Capacitor):**
   ```bash
   npm run build
   npx cap sync
   npx cap open ios  # For Xcode
   npx cap open android # For Android Studio
   ```

## 🔐 Security Features (Implemented in UI)
- **Biometric Simulator:** `BiometricScanner.tsx` provides a UI flow for FaceID/TouchID.
- **Anti-Rug Checks:** The `InvestView` displays Mock Data regarding Liquidity Locks and Mint Authority. This needs to be connected to real on-chain data.

## 🎨 Design Guidelines
- **Theme:** Cyberpunk / High-Tech / Solana
- **Primary Colors:** Neon Green (`#14F195`), Solana Purple (`#9945FF`), Slate Black (`#020617`).
- **Font:** Inter (UI) + Space Mono (Data/Numbers).

---
*This codebase is the intellectual property of Jonathan L.*
