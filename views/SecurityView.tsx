
import React from 'react';
import { Shield, Lock, CheckCircle, AlertTriangle, Smartphone, Globe, Key, Wallet } from 'lucide-react';

interface SecurityViewProps {
    isAuthenticated: boolean;
    onConnectRequest: () => void;
}

export const SecurityView: React.FC<SecurityViewProps> = ({ isAuthenticated, onConnectRequest }) => {
  return (
    <div className="h-full w-full bg-[#020617] p-6 pt-12 pb-24 overflow-y-auto no-scrollbar relative">
        
        {/* Guest Mode Overlay */}
        {!isAuthenticated && (
            <div className="absolute inset-0 z-50 backdrop-blur-xl bg-black/70 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-700">
                    <Shield className="text-[#14F195]" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Panel de Seguridad</h2>
                <p className="text-slate-400 mb-8 text-sm">Esta área contiene registros de auditoría y conexiones sensibles. Se requiere verificación.</p>
                <button 
                  onClick={onConnectRequest}
                  className="flex items-center gap-2 bg-[#14F195] hover:bg-[#10C278] text-black font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(20,241,149,0.3)]"
                >
                    <Wallet size={20} />
                    Verificar Identidad
                </button>
            </div>
        )}

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Seguridad</h1>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#14F195]/10 border border-[#14F195]/30">
                <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse"></div>
                <span className="text-[#14F195] text-xs font-mono font-bold uppercase">Sistema Óptimo</span>
            </div>
        </div>

        {/* Shield Visual */}
        <div className="flex justify-center mb-10 relative">
            <div className="absolute inset-0 bg-[#14F195] blur-[100px] opacity-10 rounded-full"></div>
            <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                 <Shield size={120} className="text-slate-800 absolute" strokeWidth={1} />
                 <Shield size={120} className="text-[#14F195] absolute drop-shadow-[0_0_15px_#14F195]" strokeWidth={0.5} fill="rgba(20,241,149,0.05)" />
                 <Lock size={40} className="text-white z-20" />
                 
                 {/* Orbiting dots */}
                 <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                    <div className="w-2 h-2 bg-[#14F195] rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#14F195]"></div>
                 </div>
                 <div className="absolute w-3/4 h-3/4 rounded-full border border-dashed border-slate-700 animate-[spin_15s_linear_infinite_reverse]"></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Key size={16} />
                    <span className="text-xs font-bold uppercase">Wallet</span>
                </div>
                <div className="text-white font-mono font-bold text-lg">Phantom</div>
                <div className="text-[#14F195] text-xs mt-1 flex items-center gap-1">
                    <CheckCircle size={10} /> Conectado
                </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Globe size={16} />
                    <span className="text-xs font-bold uppercase">Red</span>
                </div>
                <div className="text-white font-mono font-bold text-lg">Solana Main</div>
                <div className="text-[#14F195] text-xs mt-1 flex items-center gap-1">
                    <CheckCircle size={10} /> Encriptado
                </div>
            </div>
        </div>

        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider text-slate-500">Registro de Auditoría</h3>
        
        <div className="space-y-4">
            {[
                { icon: Smartphone, label: 'Login Biométrico', time: 'Ahora mismo', status: 'success', desc: 'Face ID verificado' },
                { icon: Key, label: 'Firma de Wallet', time: 'Hace 10 min', status: 'success', desc: 'Transacción aprobada' },
                { icon: Globe, label: 'Cambio de IP', time: 'Hace 2 horas', status: 'warning', desc: 'Nueva ubicación detectada' },
            ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className={`p-2 rounded-lg ${item.status === 'success' ? 'bg-[#14F195]/10 text-[#14F195]' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium text-sm">{item.label}</h4>
                            <span className="text-xs text-slate-500 font-mono">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-8 p-4 rounded-xl bg-[#9945FF]/10 border border-[#9945FF]/30 flex items-center gap-4">
            <AlertTriangle className="text-[#9945FF]" size={24} />
            <div>
                <h4 className="text-white font-bold text-sm">Protección Avanzada</h4>
                <p className="text-[#9945FF] text-xs">Zero-Knowledge Proofs habilitadas para máxima privacidad.</p>
            </div>
        </div>
    </div>
  );
};
