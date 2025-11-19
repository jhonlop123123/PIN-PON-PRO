
import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { VideoChallenge, MarketDataPoint, UserWallet } from '../types';
import { analyzeTokenPotential } from '../services/geminiService';
import { ArrowUpRight, ArrowDownRight, Sparkles, Activity, Wallet, Lock, ShieldCheck, ShieldAlert, FileCode, AlertOctagon, ArrowRightLeft, Coins } from 'lucide-react';

interface InvestViewProps {
  videos: VideoChallenge[];
  marketData: MarketDataPoint[];
  isAuthenticated: boolean;
  onConnectRequest: () => void;
  wallet: UserWallet;
  onBuyPinPon: (amount: number) => boolean;
}

export const InvestView: React.FC<InvestViewProps> = ({ videos, marketData, isAuthenticated, onConnectRequest, wallet, onBuyPinPon }) => {
  const [selectedToken, setSelectedToken] = useState<VideoChallenge>(videos[0]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Swap State
  const [swapAmount, setSwapAmount] = useState<string>('');
  const [swapSuccess, setSwapSuccess] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await analyzeTokenPotential(selectedToken.tokenSymbol, selectedToken.currentPrice, selectedToken.priceChange24h);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  const executeSwap = () => {
      const amt = parseFloat(swapAmount);
      if (isNaN(amt) || amt <= 0) return;
      
      const success = onBuyPinPon(amt);
      if (success) {
          setSwapSuccess(true);
          setSwapAmount('');
          setTimeout(() => setSwapSuccess(false), 3000);
      } else {
          alert("Insufficient SOL balance!");
      }
  };

  return (
    <div className="h-full w-full bg-[#020617] flex flex-col p-6 pt-12 pb-24 overflow-y-auto no-scrollbar relative">
      
      {/* Guest Mode Overlay */}
      {!isAuthenticated && (
          <div className="absolute inset-0 z-50 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-700">
                  <Lock className="text-[#9945FF]" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Market Access Locked</h2>
              <p className="text-slate-400 mb-8 text-sm">Connect your wallet to view real-time token data and access Gemini AI investment analysis.</p>
              <button 
                onClick={onConnectRequest}
                className="flex items-center gap-2 bg-[#14F195] hover:bg-[#10C278] text-black font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(20,241,149,0.3)]"
              >
                  <Wallet size={20} />
                  Connect Wallet
              </button>
          </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
             <h1 className="text-3xl font-bold text-white mb-1">Invest</h1>
             <p className="text-slate-400 text-sm">Solana Video Markets</p>
        </div>
        <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
                <span className="text-xs font-mono text-white">{wallet.solBalance.toFixed(2)} SOL</span>
             </div>
             <div className="mt-1 flex items-center gap-2 bg-[#9945FF]/20 px-3 py-1 rounded-full border border-[#9945FF]/30">
                <Coins size={10} className="text-[#9945FF]" />
                <span className="text-xs font-mono text-[#9945FF]">{wallet.pinPonBalance.toLocaleString()} PP</span>
             </div>
        </div>
      </div>

      {/* SWAP MODULE - BUY PINPON */}
      <div className="w-full bg-gradient-to-br from-[#9945FF]/20 to-slate-900 border border-[#9945FF]/40 rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                  <ArrowRightLeft size={18} className="text-[#14F195]" />
                  Get $PINPON
              </h3>
              <span className="text-[10px] uppercase text-slate-400 tracking-widest border border-slate-700 px-2 py-0.5 rounded">Official Token</span>
          </div>

          <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/10 mb-2">
              <input 
                type="number" 
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                placeholder="0.0 SOL" 
                className="bg-transparent w-full text-white outline-none font-mono text-lg"
              />
              <span className="text-slate-400 text-xs font-bold">SOL</span>
          </div>
          
          <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-slate-800 p-1 rounded-full border border-slate-700">
                  <ArrowDownRight size={14} className="text-white" />
              </div>
          </div>

          <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/10 mt-2 mb-4 opacity-80">
              <span className="text-slate-400 text-sm font-mono">
                  {swapAmount ? (parseFloat(swapAmount) * 1000).toLocaleString() : '0'} 
              </span>
              <span className="text-[#9945FF] text-xs font-bold">$PINPON</span>
          </div>

          <button 
             onClick={executeSwap}
             disabled={!swapAmount}
             className="w-full py-3 bg-[#14F195] hover:bg-[#10C278] text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(20,241,149,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
              {swapSuccess ? 'Purchase Successful!' : 'Swap SOL to PINPON'}
          </button>
          
          <div className="mt-2 text-center text-[10px] text-slate-500">
              Rate: 1 SOL = 1,000 $PINPON • Slippage: Auto
          </div>
      </div>

      {/* Chart Card */}
      <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-6 backdrop-blur-md relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#9945FF] blur-[80px] opacity-20 rounded-full"></div>
         
         <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold">
                    {selectedToken.tokenSymbol[0]}
                </div>
                <div>
                    <h2 className="text-white font-bold">${selectedToken.tokenSymbol}</h2>
                    <span className="text-xs text-slate-400">Video Token</span>
                </div>
            </div>
            <div className={`text-right ${selectedToken.priceChange24h >= 0 ? 'text-[#14F195]' : 'text-red-500'}`}>
                <div className="text-xl font-mono font-bold">{selectedToken.currentPrice} SOL</div>
                <div className="text-xs flex items-center justify-end gap-1">
                    {selectedToken.priceChange24h >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(selectedToken.priceChange24h)}%
                </div>
            </div>
         </div>

         <div className="h-48 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14F195" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#14F195" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                        itemStyle={{ color: '#14F195' }}
                        labelStyle={{ display: 'none' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#14F195" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
            </ResponsiveContainer>
         </div>
         
         <div className="mt-4 grid grid-cols-3 gap-2">
            {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((tf, i) => (
                <button key={tf} className={`py-1 text-xs rounded border transition-colors ${i === 1 ? 'bg-[#14F195] text-black border-[#14F195] font-bold' : 'bg-transparent text-slate-500 border-slate-800 hover:border-slate-600'}`}>
                    {tf}
                </button>
            ))}
         </div>
      </div>

      {/* SECURITY / RUG CHECK MODULE */}
      <div className="w-full bg-slate-900/30 border border-slate-800 rounded-2xl p-5 mb-6">
           <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-bold flex items-center gap-2">
                   <ShieldCheck size={18} className="text-[#14F195]" />
                   Contract Safety
               </h3>
               <div className={`text-xs font-bold px-2 py-1 rounded border ${selectedToken.safetyScore > 90 ? 'bg-[#14F195]/10 border-[#14F195] text-[#14F195]' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                   SCORE: {selectedToken.safetyScore}/100
               </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
               {/* Liquidity Lock Status */}
               <div className={`p-3 rounded-xl border ${selectedToken.liquidityLocked ? 'bg-slate-900 border-slate-700' : 'bg-red-900/20 border-red-500/50'}`}>
                   <div className="flex items-center gap-2 mb-1">
                       <Lock size={14} className={selectedToken.liquidityLocked ? 'text-[#14F195]' : 'text-red-500'} />
                       <span className="text-xs text-slate-400 uppercase font-bold">Liquidity</span>
                   </div>
                   <div className="text-sm text-white font-bold">
                       {selectedToken.liquidityLocked ? 'LOCKED' : 'UNLOCKED'}
                   </div>
               </div>

               {/* Mint Authority Status */}
               <div className={`p-3 rounded-xl border ${selectedToken.mintAuthority === 'RENOUNCED' ? 'bg-slate-900 border-slate-700' : 'bg-red-900/20 border-red-500/50'}`}>
                   <div className="flex items-center gap-2 mb-1">
                       <FileCode size={14} className={selectedToken.mintAuthority === 'RENOUNCED' ? 'text-[#14F195]' : 'text-red-500'} />
                       <span className="text-xs text-slate-400 uppercase font-bold">Mint Auth</span>
                   </div>
                   <div className="text-sm text-white font-bold">
                       {selectedToken.mintAuthority}
                   </div>
               </div>
           </div>
           
           <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
               <AlertOctagon size={14} />
               <span>Creator Bond: <span className="text-white font-mono">{selectedToken.creatorBond} SOL</span> locked against fraud.</span>
           </div>
      </div>

      {/* AI Analysis Module */}
      <div className="w-full bg-gradient-to-br from-indigo-950/50 to-slate-900/50 border border-indigo-500/30 rounded-2xl p-5 mb-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-indigo-300">
                <Sparkles size={16} />
                <span className="text-xs font-bold tracking-widest uppercase">Gemini AI Analyst</span>
            </div>
            
            <div className="min-h-[60px]">
                {analyzing ? (
                     <div className="flex items-center gap-2 text-indigo-400 text-sm animate-pulse">
                        <Activity size={16} className="animate-spin" />
                        Scanning blockchain metrics...
                     </div>
                ) : aiAnalysis ? (
                    <p className="text-sm text-slate-200 leading-relaxed border-l-2 border-indigo-500 pl-3">
                        {aiAnalysis}
                    </p>
                ) : (
                    <p className="text-sm text-slate-500">
                        Unlock AI-powered risk assessment for ${selectedToken.tokenSymbol} before you ape in.
                    </p>
                )}
            </div>

            {!aiAnalysis && !analyzing && (
                 <button 
                    onClick={handleAnalyze}
                    disabled={!isAuthenticated}
                    className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generate Report
                </button>
            )}
      </div>

      {/* Trending Tokens List */}
      <h3 className="text-white font-bold mb-4 text-lg">Trending Challenges</h3>
      <div className="space-y-3">
        {videos.map((video) => (
            <div 
                key={video.id} 
                onClick={() => {
                    setSelectedToken(video);
                    setAiAnalysis(null);
                }}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedToken.id === video.id ? 'bg-slate-800 border-[#14F195]/50' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'}`}
            >
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${video.thumbnailUrl})`}}></div>
                     <div>
                        <div className="text-white font-bold text-sm">{video.title}</div>
                        <div className="text-slate-500 text-xs font-mono">${video.tokenSymbol}</div>
                     </div>
                </div>
                <div className="text-right">
                     <div className="text-white font-mono text-sm">{video.currentPrice}</div>
                     <div className={`text-xs ${video.priceChange24h >= 0 ? 'text-[#14F195]' : 'text-red-500'}`}>
                        {video.priceChange24h > 0 ? '+' : ''}{video.priceChange24h}%
                     </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
