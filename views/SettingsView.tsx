
import React, { useState } from 'react';
import { ArrowLeft, Shield, Bell, Eye, Globe, LogOut, Smartphone, ChevronRight, Lock, EyeOff, Share2, Copy } from 'lucide-react';

interface SettingsViewProps {
    onBack: () => void;
    onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onLogout }) => {
    const [notifications, setNotifications] = useState(true);
    const [biometrics, setBiometrics] = useState(true);
    const [hideBalance, setHideBalance] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        // This copies the current URL (which will be the Vercel URL when deployed)
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full w-full bg-[#020617] flex flex-col relative animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 pt-12 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md z-20 sticky top-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-white transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-white">Configuración</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24 no-scrollbar">
                
                {/* Growth Section - NEW */}
                <div className="bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/10 rounded-2xl p-1 shadow-lg">
                    <div className="bg-slate-900/90 rounded-xl p-4 text-center">
                        <h3 className="text-white font-bold mb-2">Share Prototype</h3>
                        <p className="text-slate-400 text-xs mb-4">Send this app to potential investors or partners.</p>
                        <button 
                            onClick={handleShare}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                        >
                            {copied ? <Copy size={18} /> : <Share2 size={18} />}
                            {copied ? 'Link Copied!' : 'Copy App Link'}
                        </button>
                    </div>
                </div>

                {/* Security Section */}
                <section>
                    <h3 className="text-[#14F195] text-xs font-bold uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
                        <Shield size={12} />
                        Seguridad y Privacidad
                    </h3>
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                         <div className="p-4 flex items-center justify-between border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#9945FF]/10 rounded-lg text-[#9945FF]"><Smartphone size={18} /></div>
                                <div>
                                    <span className="text-white font-medium block text-sm">Face ID / Biometría</span>
                                    <span className="text-slate-500 text-[10px]">Usar para aprobar transacciones</span>
                                </div>
                            </div>
                            <Toggle checked={biometrics} onChange={setBiometrics} />
                         </div>
                         
                         <div className="p-4 flex items-center justify-between border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    {hideBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                                <div>
                                    <span className="text-white font-medium block text-sm">Modo Privacidad</span>
                                    <span className="text-slate-500 text-[10px]">Ocultar saldos en público</span>
                                </div>
                            </div>
                            <Toggle checked={hideBalance} onChange={setHideBalance} />
                         </div>

                         <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><Lock size={18} /></div>
                                <div>
                                    <span className="text-white font-medium block text-sm">Llaves Privadas</span>
                                    <span className="text-slate-500 text-[10px]">Exportar o Ver Frase Semilla</span>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-slate-600" />
                         </button>
                    </div>
                </section>

                {/* App Preferences */}
                <section>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 px-1">Preferencias</h3>
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                         <div className="p-4 flex items-center justify-between border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Bell size={18} /></div>
                                <span className="text-white font-medium text-sm">Notificaciones Push</span>
                            </div>
                            <Toggle checked={notifications} onChange={setNotifications} />
                         </div>
                         <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors text-left border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400"><Globe size={18} /></div>
                                <span className="text-white font-medium text-sm">Idioma / Language</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 text-xs">Español</span>
                                <ChevronRight size={16} className="text-slate-600" />
                            </div>
                         </button>
                    </div>
                </section>

                {/* Danger Zone */}
                <div className="pt-4">
                    <button 
                        onClick={onLogout}
                        className="w-full bg-red-500/10 border border-red-500/30 text-red-500 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all active:scale-95"
                    >
                        <LogOut size={20} />
                        Desconectar Wallet
                    </button>
                </div>

                <div className="text-center pt-4 pb-8">
                    <div className="inline-flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        <div className="w-1.5 h-1.5 bg-[#14F195] rounded-full animate-pulse"></div>
                        <span className="text-slate-500 text-[10px] font-mono">PinPon v1.2.4 (Build 8920)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Toggle: React.FC<{checked: boolean, onChange: (v: boolean) => void}> = ({checked, onChange}) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${checked ? 'bg-[#14F195]' : 'bg-slate-700'}`}
    >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </button>
);
