
import React, { useRef, useState, useEffect } from 'react';
import { VideoChallenge } from '../types';
import { Heart, MessageCircle, Share2, Zap, Lock, Volume2, VolumeX, Pause, Terminal, Copy, Sparkles, Activity, Loader2, ShieldCheck, ShieldAlert, Banknote } from 'lucide-react';

interface FeedViewProps {
  videos: VideoChallenge[];
  isAuthenticated: boolean;
  onConnectRequest: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ videos, isAuthenticated, onConnectRequest }) => {
  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black relative">
      {/* Live Ticker Overlay - Adds Financial Urgency */}
      <div className="fixed top-20 left-0 z-30 w-full pointer-events-none pl-4">
          <div className="flex flex-col gap-2">
              <LiveTicker />
          </div>
      </div>

      {videos.map((video) => (
        <VideoCard 
            key={video.id} 
            video={video} 
            isAuthenticated={isAuthenticated} 
            onConnectRequest={onConnectRequest} 
        />
      ))}
    </div>
  );
};

// Component to simulate live trades happening on the chain
const LiveTicker = () => {
    const [trade, setTrade] = useState<{text: string, type: 'buy' | 'sell'} | null>(null);

    useEffect(() => {
        const names = ['Juan.Sol', 'Sofia_NFT', 'CarlosX', 'CryptoKing', 'Ape...22', 'Maria_Dev'];
        const actions = ['compró', 'invirtió en', 'acumuló', 'apósto por'];
        const tokens = ['$NEON', '$BRAIN', '$MECH', '$ASTRO'];

        const interval = setInterval(() => {
            const name = names[Math.floor(Math.random() * names.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            const token = tokens[Math.floor(Math.random() * tokens.length)];
            const amount = Math.floor(Math.random() * 1000) + 100;
            
            setTrade({
                text: `${name} ${action} ${amount} ${token}`,
                type: 'buy'
            });

            // Clear after animation
            setTimeout(() => setTrade(null), 3000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (!trade) return null;

    return (
        <div className="animate-in slide-in-from-left duration-500 fade-in">
            <div className="bg-black/60 backdrop-blur-md border border-[#14F195]/30 px-3 py-1.5 rounded-full inline-flex items-center gap-2 shadow-[0_0_10px_rgba(20,241,149,0.2)]">
                <Activity size={12} className="text-[#14F195] animate-pulse" />
                <span className="text-[10px] font-mono text-[#14F195] font-bold uppercase tracking-wider">
                    {trade.text}
                </span>
            </div>
        </div>
    );
};

interface VideoCardProps {
    video: VideoChallenge;
    isAuthenticated: boolean;
    onConnectRequest: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isAuthenticated, onConnectRequest }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showPrompt, setShowPrompt] = useState(false);
    const [remixing, setRemixing] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);

    // Simulates the "Rendering" effect when video starts
    const [rendering, setRendering] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setRendering(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleRemix = (e: React.MouseEvent) => {
        e.stopPropagation();
        setRemixing(true);
        // Simulate remix copy action
        setTimeout(() => setRemixing(false), 1000);
    };

    return (
        <div className="h-full w-full snap-start relative bg-slate-900 flex items-center justify-center overflow-hidden border-b border-slate-800 group">
          
          {/* Loading Spinner / Placeholder */}
          {!videoLoaded && (
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
                   <img src={video.thumbnailUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                   <Loader2 size={40} className="text-[#14F195] animate-spin relative z-10" />
              </div>
          )}

          {/* AI Rendering Overlay Effect */}
          {rendering && videoLoaded && (
              <div className="absolute inset-0 z-30 pointer-events-none bg-black/20 flex flex-col items-center justify-center">
                   <div className="w-full h-1 bg-[#14F195]/50 absolute top-0 animate-[scanVertical_1.5s_ease-in-out_infinite]"></div>
                   <div className="font-mono text-[10px] text-[#14F195] bg-black/50 px-2 py-1 rounded border border-[#14F195]/30">
                       VERIFICANDO PRUEBA DE GENERACIÓN...
                   </div>
              </div>
          )}

          {/* Real Video Element with POSTER */}
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            loop
            muted={isMuted}
            autoPlay
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onClick={togglePlay}
          />
          
          {/* Gradient Overlay - Darker at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none"></div>

          {/* Play/Pause Indicator (fades out) */}
          {!isPlaying && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                 <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                    <Pause className="text-white" size={40} fill="white" />
                 </div>
             </div>
          )}

          {/* Controls: Mute & Terminal */}
          <div className="absolute top-24 right-4 z-30 flex flex-col gap-4">
            <button 
                onClick={toggleMute}
                className="bg-black/30 p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/50 transition-colors"
            >
                {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-[#14F195]" />}
            </button>

            <button 
                onClick={(e) => { e.stopPropagation(); setShowPrompt(!showPrompt); }}
                className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${showPrompt ? 'bg-[#9945FF] border-[#9945FF] text-white shadow-[0_0_15px_#9945FF]' : 'bg-black/30 border-white/10 text-white hover:bg-black/50'}`}
            >
                <Terminal size={20} />
            </button>
          </div>

          {/* Verification Badge (Clickable) */}
          <button 
             onClick={(e) => { e.stopPropagation(); setShowSecurity(!showSecurity); }}
             className="absolute top-24 left-4 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-[#14F195]/30 px-2 py-1.5 rounded-full hover:bg-black/60 transition-colors"
          >
              {video.isVerified ? <ShieldCheck size={14} className="text-[#14F195]" /> : <ShieldAlert size={14} className="text-red-500" />}
              <span className="text-[10px] font-bold text-white tracking-wide">
                  {video.isVerified ? 'VERIFICADO' : 'NO VERIFICADO'}
              </span>
          </button>

          {/* Security Popup */}
          {showSecurity && (
               <div className="absolute top-36 left-4 w-64 bg-slate-900/95 border border-slate-700 rounded-xl p-3 z-40 backdrop-blur-xl shadow-xl animate-in fade-in slide-in-from-left-4 duration-200">
                   <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white uppercase">Prueba de Generación</span>
                        <button onClick={(e) => {e.stopPropagation(); setShowSecurity(false);}} className="text-slate-500 hover:text-white">x</button>
                   </div>
                   <div className="space-y-2">
                        <div className="flex items-start gap-2">
                             <div className="p-1 bg-[#14F195]/10 rounded">
                                <ShieldCheck size={12} className="text-[#14F195]" />
                             </div>
                             <div>
                                <div className="text-[10px] text-slate-400 uppercase">Proveedor</div>
                                <div className="text-xs text-white font-mono">{video.verificationProvider}</div>
                             </div>
                        </div>
                        <div className="flex items-start gap-2">
                             <div className="p-1 bg-[#9945FF]/10 rounded">
                                <Banknote size={12} className="text-[#9945FF]" />
                             </div>
                             <div>
                                <div className="text-[10px] text-slate-400 uppercase">Fianza del Creador</div>
                                <div className="text-xs text-white font-mono">{video.creatorBond} SOL (Bloqueado)</div>
                                <div className="text-[9px] text-green-400 mt-0.5">Penalización activa x fraude</div>
                             </div>
                        </div>
                   </div>
               </div>
          )}


          {/* AI Prompt Terminal Overlay */}
          {showPrompt && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-md bg-black/90 border border-[#9945FF]/50 rounded-xl p-4 z-40 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-[#9945FF]" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Datos Gen AI</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setShowPrompt(false); }} className="text-slate-500 hover:text-white text-xs">CERRAR</button>
                </div>
                
                <div className="space-y-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Prompt</label>
                        <p className="text-xs font-mono text-[#14F195] leading-relaxed bg-slate-900/50 p-2 rounded border border-slate-800">
                            {video.aiPrompt}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Modelo</label>
                            <div className="text-xs text-white font-mono bg-slate-900/50 p-1 px-2 rounded border border-slate-800">{video.aiModel}</div>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Semilla</label>
                            <div className="text-xs text-white font-mono bg-slate-900/50 p-1 px-2 rounded border border-slate-800">{video.seed}</div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleRemix}
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-[#9945FF]/20 hover:bg-[#9945FF]/40 border border-[#9945FF]/50 text-[#9945FF] py-2 rounded-lg transition-colors"
                    >
                        {remixing ? (
                            <span className="text-xs font-bold animate-pulse">¡COPIADO AL PORTAPAPELES!</span>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span className="text-xs font-bold">REMEZCLAR PROMPT</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-x-0 bottom-24 px-5 z-10 pointer-events-none">
            <div className="flex justify-between items-end">
                <div className="flex-1 space-y-3 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-[#9945FF]/20 border border-[#9945FF]/50 rounded text-[10px] text-[#9945FF] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                            ${video.tokenSymbol}
                        </div>
                        <span className={`text-xs font-mono ${video.priceChange24h >= 0 ? 'text-[#14F195]' : 'text-red-500'}`}>
                           {video.priceChange24h > 0 ? '+' : ''}{video.priceChange24h}%
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-[10px] text-blue-400 font-mono font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                            <Sparkles size={8} /> IA GEN
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{video.title}</h3>
                    <p className="text-slate-300 text-sm font-medium flex items-center gap-1">
                        @{video.creator}
                        {video.isVerified && (
                            <ShieldCheck size={12} className="text-[#14F195]" />
                        )}
                        <span className="text-[10px] text-slate-500 bg-slate-800 px-1 rounded">Lv. 42 Creator</span>
                    </p>
                    
                    <button 
                        onClick={() => isAuthenticated ? console.log('Invest Flow') : onConnectRequest()}
                        className={`mt-4 flex items-center gap-2 font-bold py-3 px-6 rounded-full transition-all shadow-lg ${
                            isAuthenticated 
                            ? 'bg-[#14F195] hover:bg-[#10C278] text-black shadow-[0_0_15px_rgba(20,241,149,0.4)] cursor-pointer' 
                            : 'bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white border border-slate-600 cursor-pointer'
                        }`}
                    >
                        {isAuthenticated ? (
                            <>
                                <Zap size={18} fill="black" />
                                <span>Invertir {video.currentPrice} SOL</span>
                            </>
                        ) : (
                            <>
                                <Lock size={16} />
                                <span>Conectar para Invertir</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Sidebar Actions */}
                <div className="flex flex-col gap-6 items-center pointer-events-auto">
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors active:scale-95">
                            <Heart size={24} className="text-white" />
                        </button>
                        <span className="text-xs font-mono text-white">{video.likes}k</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors active:scale-95">
                            <MessageCircle size={24} className="text-white" />
                        </button>
                        <span className="text-xs font-mono text-white">402</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                         <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors active:scale-95">
                            <Share2 size={24} className="text-white" />
                        </button>
                        <span className="text-xs font-mono text-white">{video.shares}</span>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Top Header */}
          <div className="absolute top-0 left-0 w-full p-4 pt-6 flex justify-center z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex gap-6 text-sm font-bold text-white/50 pointer-events-auto">
                    <span className="hover:text-white cursor-pointer transition-colors">Siguiendo</span>
                    <span className="text-white relative cursor-pointer">
                        Para Ti
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#14F195] rounded-full shadow-[0_0_5px_#14F195]"></div>
                    </span>
                </div>
          </div>
          
          <style>{`
            @keyframes scanVertical {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
          `}</style>

        </div>
    );
};
