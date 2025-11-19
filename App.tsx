
import React, { useState, useEffect } from 'react';
import { ViewState, VideoChallenge, MarketDataPoint, UserWallet } from './types';
import { Navigation } from './components/Navigation';
import { BiometricScanner } from './components/BiometricScanner';
import { FeedView } from './views/FeedView';
import { InvestView } from './views/InvestView';
import { SecurityView } from './views/SecurityView';
import { ProfileView } from './views/ProfileView';
import { Wallet, ArrowRight, Eye, Bot, Zap, ShieldCheck } from 'lucide-react';
import { connectWallet, getWalletBalance } from './services/solanaService';

// --- Mock Data with Real Video Assets & AI Prompts ---
const MOCK_VIDEOS: VideoChallenge[] = [
  {
    id: '1',
    title: 'Cyber City Run',
    creator: 'neon_drifter',
    tokenSymbol: 'NEON',
    currentPrice: 1.45,
    priceChange24h: 12.4,
    likes: 24.5,
    shares: 1200,
    videoUrl: 'https://videos.pexels.com/video-files/3121459/3121459-hd_720_1280_25fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/3121459/pexels-photo-3121459.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: '#14F195',
    aiPrompt: 'Cyberpunk city street level, night rain, neon lights reflecting on wet pavement, volumetric fog, 8k resolution, unreal engine 5 render style --ar 9:16 --v 6.0',
    aiModel: 'Sora v1.2',
    seed: '84729104',
    isVerified: true,
    verificationProvider: 'OpenAI C2PA Ledger',
    creatorBond: 500,
    liquidityLocked: true,
    mintAuthority: 'RENOUNCED',
    safetyScore: 98
  },
  {
    id: '2',
    title: 'Neural Plexus',
    creator: 'data_god',
    tokenSymbol: 'BRAIN',
    currentPrice: 0.89,
    priceChange24h: -2.1,
    likes: 8.2,
    shares: 340,
    videoUrl: 'https://videos.pexels.com/video-files/2516159/2516159-hd_720_1280_24fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/2516159/pexels-photo-2516159.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: '#9945FF',
    aiPrompt: 'Abstract data visualization, neural nodes connecting, glowing blue and purple optical fibers, deep depth of field, macro photography style --stylize 250',
    aiModel: 'Runway Gen-3',
    seed: '11029384',
    isVerified: true,
    verificationProvider: 'Runway Provenance Chain',
    creatorBond: 250,
    liquidityLocked: true,
    mintAuthority: 'RENOUNCED',
    safetyScore: 95
  },
  {
    id: '3',
    title: 'Cyborg Fashion',
    creator: 'meta_human',
    tokenSymbol: 'MECH',
    currentPrice: 3.20,
    priceChange24h: 45.8,
    likes: 89.1,
    shares: 5600,
    videoUrl: 'https://videos.pexels.com/video-files/6981411/6981411-hd_720_1280_25fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/6981411/pexels-photo-6981411.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: '#00C2FF',
    aiPrompt: 'Futuristic humanoid robot, white glossy finish, working on holographic interface, clean sterile lab environment, cinematic lighting, 85mm lens',
    aiModel: 'Midjourney Video',
    seed: '99283741',
    isVerified: true,
    verificationProvider: 'Midjourney Hash Auth',
    creatorBond: 1000,
    liquidityLocked: true,
    mintAuthority: 'RENOUNCED',
    safetyScore: 99
  },
  {
    id: '4',
    title: 'Astro Glitch',
    creator: 'star_boy',
    tokenSymbol: 'ASTRO',
    currentPrice: 0.45,
    priceChange24h: 5.6,
    likes: 12.1,
    shares: 400,
    videoUrl: 'https://videos.pexels.com/video-files/3121462/3121462-hd_720_1280_25fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/3121462/pexels-photo-3121462.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: '#F1C40F',
    aiPrompt: 'Astronaut floating in zero gravity, datamosh glitch effect, vhs aesthetic, synthwave colors, retro futuristic --niji 5',
    aiModel: 'Pika Labs',
    seed: '33445566',
    isVerified: true,
    verificationProvider: 'Pika Auth Node',
    creatorBond: 150,
    liquidityLocked: true,
    mintAuthority: 'RENOUNCED',
    safetyScore: 88
  }
];

const MOCK_MARKET_DATA: MarketDataPoint[] = Array.from({ length: 20 }, (_, i) => ({
  time: `10:${i < 10 ? '0' + i : i}`,
  value: 1 + Math.random() * 0.5 + (i * 0.05)
}));

// --- Components ---

const LandingScreen: React.FC<{ onConnect: () => void; onGuest: () => void; isLoading: boolean }> = ({ onConnect, onGuest, isLoading }) => {
  return (
    <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Background Video with Image Fallback */}
       <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3121459/pexels-photo-3121459.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            alt="Background"
          />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 blur-sm mix-blend-screen"
            src="https://videos.pexels.com/video-files/3121459/3121459-hd_720_1280_25fps.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#020617] z-10"></div>
       </div>
       
       {/* Tech Overlay Elements */}
       <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#14F195_100%)] opacity-10 animate-[spin_10s_linear_infinite] pointer-events-none z-0"></div>
       
       <div className="z-10 flex flex-col items-center w-full max-w-sm animate-in fade-in zoom-in duration-1000">
          <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195] p-1 shadow-[0_0_40px_rgba(153,69,255,0.4)] relative group">
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center relative overflow-hidden">
                <Bot size={40} className="text-white z-10 relative" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            <div className="absolute -top-2 -right-2 bg-[#14F195] text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce flex items-center gap-1">
                <ShieldCheck size={8} />
                SECURE
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight text-center drop-shadow-lg">PinPon</h1>
          <p className="text-slate-300 text-center mb-8 text-sm max-w-[280px] font-medium drop-shadow-md">
            The <span className="text-[#14F195] font-bold">Anti-Rug</span> Social Economy.
            <br/>
            <span className="text-xs opacity-80 text-slate-400">Verified AI Content • Locked Liquidity</span>
          </p>

          <div className="w-full space-y-4">
            <button 
                onClick={onConnect}
                disabled={isLoading}
                className="group relative flex items-center justify-center gap-3 bg-[#AB9FF2] hover:bg-[#9945FF] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 w-full overflow-hidden shadow-[0_0_20px_rgba(153,69,255,0.3)] disabled:opacity-70 disabled:cursor-wait"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Wallet size={24} className="relative z-10" />
                <span className="relative z-10">{isLoading ? 'Connecting...' : 'Connect Phantom'}</span>
                <ArrowRight size={20} className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </button>

            <button 
                onClick={onGuest}
                disabled={isLoading}
                className="group flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 text-slate-300 font-medium py-4 px-8 rounded-xl transition-all duration-300 w-full border border-white/10 backdrop-blur-md"
            >
                <Eye size={20} />
                <span>Explore as Guest</span>
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 opacity-70">
             <div className="h-1 w-1 bg-[#14F195] rounded-full shadow-[0_0_5px_#14F195]"></div>
             <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                Security Protocol: Active
             </p>
             <div className="h-1 w-1 bg-[#14F195] rounded-full shadow-[0_0_5px_#14F195]"></div>
          </div>

          <div className="absolute bottom-6 text-[9px] text-slate-500 font-mono uppercase tracking-widest">
              ARCHITECTED BY JONATHAN L x GEMINI
          </div>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [returnView, setReturnView] = useState<ViewState>(ViewState.APP_FEED);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Wallet State with LocalStorage Persistence
  const [wallet, setWallet] = useState<UserWallet>(() => {
    try {
        const saved = localStorage.getItem('pinpon_wallet');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Failed to load wallet state", e);
    }
    return {
        address: '',
        solBalance: 0,
        pinPonBalance: 0,
        isConnected: false
    };
  });

  // Save wallet to localStorage whenever it changes
  useEffect(() => {
      localStorage.setItem('pinpon_wallet', JSON.stringify(wallet));
  }, [wallet]);

  // Check if already authenticated on load
  useEffect(() => {
      if (wallet.isConnected) {
          setIsAuthenticated(true);
          setView(ViewState.APP_FEED);
      }
  }, []); // Run once

  // 1. Connect to Phantom (REAL or DEMO)
  const handleConnectWallet = async (targetView: ViewState = ViewState.APP_FEED) => {
    setIsConnecting(true);
    setReturnView(targetView);

    // Attempt real connection logic (with fallback)
    const walletData = await connectWallet();
    
    if (walletData) {
        // Connection successful
        let currentBalance = 12.45; // Default demo balance
        try {
            const balance = await getWalletBalance(walletData.address);
            if (balance > 0) currentBalance = balance;
        } catch (e) {
            console.log("Using fallback balance");
        }

        setWallet(prev => ({
            ...prev,
            address: walletData.address,
            solBalance: currentBalance,
            isConnected: true
        }));
        
        setIsConnecting(false);
        setView(ViewState.BIOMETRIC); // Proceed to biometric scan after wallet auth
    } else {
        // Failed to connect
        setIsConnecting(false);
        alert("Could not connect to Wallet. Please try again.");
    }
  };

  // 2. Guest Entry
  const handleGuestEntry = () => {
    setIsAuthenticated(false);
    setView(ViewState.APP_FEED);
  };

  // 3. Biometric Success
  const handleBiometricComplete = () => {
    setIsAuthenticated(true);
    setView(returnView);
  };

  // 4. Trigger Auth from inner views
  const triggerAuth = () => {
      handleConnectWallet(view); 
  };

  // 5. Swap Logic (Simulation for UI with State Persistence)
  const handleBuyPinPon = (amountSol: number) => {
      if (wallet.solBalance >= amountSol) {
          const rate = 1000; // 1 SOL = 1000 PINPON
          setWallet(prev => ({
              ...prev,
              solBalance: prev.solBalance - amountSol,
              pinPonBalance: prev.pinPonBalance + (amountSol * rate)
          }));
          return true; 
      }
      return false;
  };

  // View Rendering Logic
  const renderContent = () => {
    switch (view) {
      case ViewState.LANDING:
        return <LandingScreen onConnect={() => handleConnectWallet(ViewState.APP_FEED)} onGuest={handleGuestEntry} isLoading={isConnecting} />;
      case ViewState.BIOMETRIC:
        return <BiometricScanner onComplete={handleBiometricComplete} />;
      case ViewState.APP_FEED:
        return <FeedView videos={MOCK_VIDEOS} isAuthenticated={isAuthenticated} onConnectRequest={triggerAuth} />;
      case ViewState.APP_INVEST:
        return <InvestView 
            videos={MOCK_VIDEOS} 
            marketData={MOCK_MARKET_DATA} 
            isAuthenticated={isAuthenticated} 
            onConnectRequest={triggerAuth}
            wallet={wallet}
            onBuyPinPon={handleBuyPinPon}
        />;
      case ViewState.APP_SECURITY:
        return <SecurityView isAuthenticated={isAuthenticated} onConnectRequest={triggerAuth} />;
      case ViewState.APP_PROFILE:
        return <ProfileView isAuthenticated={isAuthenticated} onConnectRequest={triggerAuth} wallet={wallet} />;
      default:
        return <div className="text-white">View Not Found</div>;
    }
  };

  const showNav = view !== ViewState.LANDING && view !== ViewState.BIOMETRIC;

  return (
    <div className="w-full h-screen bg-[#020617] text-white overflow-hidden font-sans">
      {renderContent()}
      {showNav && <Navigation currentView={view} onChangeView={setView} />}
    </div>
  );
};

export default App;
