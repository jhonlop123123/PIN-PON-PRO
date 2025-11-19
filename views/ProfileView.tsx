
import React from 'react';
import { Settings, Copy, LogOut, QrCode, Wallet, UserX, Code2, Coins } from 'lucide-react';
import { UserWallet } from '../types';

interface ProfileViewProps {
    isAuthenticated: boolean;
    onConnectRequest: () => void;
    wallet: UserWallet;
    onSettingsClick: () => void; // New prop
}

export const ProfileView: React.FC<ProfileViewProps> = ({ isAuthenticated, onConnectRequest, wallet, onSettingsClick }) => {
  return (
    <div className="h-full w-full bg-[#020617] p-6 pt-12 pb-24 overflow-y-auto no-scrollbar relative">
        
        {/* Guest Mode Overlay */}
        {!isAuthenticated && (
            <div className="absolute inset-0 z-50 backdrop-blur-xl bg-black/80 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-700">
                    <UserX className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Perfil Bloqueado</h2>
                <p className="text-slate-400 mb-8 text-sm">Conecta tu wallet de Solana para ver tus fondos, rango y portafolio de videos.</p>
                <button 
                  onClick={onConnectRequest}
                  className="flex items-center gap-2 bg-[#9945FF] hover:bg-[#8a3ce0] text-white font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(153,69,255,0.3)]"
                >
                    <Wallet size={20} />
                    Conectar Wallet
                </button>
            </div>
        )}

         {/* Header */}
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Perfil</h1>
            <button 
                onClick={onSettingsClick}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
            >
                <Settings size={24} />
            </button>
         </div>

         {/* Avatar Section */}
         <div className="flex flex-col items-center mb-8">
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] p-1">
                    <img 
                        src="https://picsum.photos/200/200" 
                        alt="Profile" 
                        className="w-full h-full rounded-full border-4 border-[#020617] object-cover"
                    />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#14F195] w-6 h-6 rounded-full border-4 border-[#020617] flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">Jonathan L.</h2>
            <p className="text-slate-400 text-sm">@architect • CEO</p>
         </div>

         {/* Wallet Card */}
         <div className="w-full bg-gradient-to-r from-[#9945FF] to-[#7B2CBF] rounded-2xl p-6 shadow-lg shadow-purple-900/20 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-purple-200 text-xs font-medium uppercase tracking-wider">Balance Total</p>
                    <h3 className="text-3xl font-bold text-white mt-1">
                        ${(wallet.solBalance * 145).toLocaleString('en-US', {maximumFractionDigits: 2})}
                    </h3>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <QrCode className="text-white" size={20} />
                </div>
            </div>

            <div className="bg-black/20 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                        <span className="text-[10px] text-white">S</span>
                    </div>
                    <span className="text-white/80 font-mono text-sm">{wallet.solBalance.toFixed(2)} SOL</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                    <span className="text-white/60 font-mono text-xs">{wallet.address}</span>
                    <Copy size={12} className="text-white/60" />
                </div>
            </div>
         </div>

         {/* PinPon Token Stash */}
         <div className="w-full bg-[#14F195]/10 border border-[#14F195]/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <div className="bg-[#14F195] p-2 rounded-lg">
                     <Coins className="text-black" size={24} />
                 </div>
                 <div>
                     <h4 className="text-white font-bold">Activos $PINPON</h4>
                     <p className="text-xs text-[#14F195]">Token Oficial</p>
                 </div>
             </div>
             <div className="text-right">
                 <div className="text-xl font-mono font-bold text-white">{wallet.pinPonBalance.toLocaleString()}</div>
                 <div className="text-xs text-slate-400">~{(wallet.pinPonBalance * 0.001).toFixed(2)} SOL</div>
             </div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-3 gap-4 mb-8">
            {[
                { label: 'Desafíos', val: '12' },
                { label: 'Invertido', val: '45 SOL' },
                { label: 'Rango', val: '#1' },
            ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
                    <span className="text-white font-bold text-lg">{stat.val}</span>
                    <span className="text-slate-500 text-xs">{stat.label}</span>
                </div>
            ))}
         </div>

         {/* Architect Signature */}
         <div className="mt-12 pb-4 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 mb-1">
                <Code2 size={14} className="text-[#14F195]" />
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">PinPon v1.0 Beta</span>
            </div>
            <p className="text-[10px] text-slate-500">Built by Jonathan L x Gemini Architect</p>
         </div>
    </div>
  );
};
