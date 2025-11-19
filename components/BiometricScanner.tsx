import React, { useEffect, useState } from 'react';
import { Scan, Fingerprint, CheckCircle } from 'lucide-react';

interface BiometricScannerProps {
  onComplete: () => void;
}

export const BiometricScanner: React.FC<BiometricScannerProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'IDLE' | 'SCANNING' | 'VERIFIED'>('IDLE');

  useEffect(() => {
    // Auto-start scanning for effect
    const timer = setTimeout(() => {
      setStage('SCANNING');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage === 'SCANNING') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage('VERIFIED');
            setTimeout(onComplete, 1200); // Wait a bit before navigating
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [stage, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black relative overflow-hidden">
        {/* Background Matrix Effect Placeholder */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#14F195]/5 to-transparent animate-pulse pointer-events-none"></div>

        <div className="z-10 flex flex-col items-center gap-8 p-8 w-full max-w-md">
            <div className="relative">
                <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center relative transition-all duration-500 ${stage === 'VERIFIED' ? 'border-[#14F195] bg-[#14F195]/10' : 'border-slate-700 bg-slate-900'}`}>
                    {stage === 'VERIFIED' ? (
                        <CheckCircle className="w-16 h-16 text-[#14F195] animate-bounce" />
                    ) : (
                        <Fingerprint className={`w-16 h-16 text-[#9945FF] ${stage === 'SCANNING' ? 'animate-pulse' : ''}`} />
                    )}
                    
                    {/* Scanning Beam */}
                    {stage === 'SCANNING' && (
                        <div 
                            className="absolute top-0 left-0 w-full h-1 bg-[#14F195] shadow-[0_0_15px_#14F195] animate-[scan_2s_ease-in-out_infinite]"
                            style={{ animationName: 'scanVertical' }}
                        />
                    )}
                </div>
                
                {/* Rings */}
                <div className="absolute inset-0 -m-4 rounded-full border border-slate-800 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-0 -m-8 rounded-full border border-dashed border-slate-800 animate-[spin_10s_linear_infinite_reverse]"></div>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-2xl font-mono tracking-widest text-white uppercase">
                    {stage === 'IDLE' ? 'Initialize' : stage === 'SCANNING' ? 'Verifying Identity' : 'Access Granted'}
                </h2>
                <p className="text-slate-400 text-sm font-mono">
                    {stage === 'SCANNING' ? `Analyzing Biometrics... ${progress}%` : stage === 'VERIFIED' ? 'Secure Session Established' : 'Waiting for input...'}
                </p>
            </div>

            {/* Fake Hex Code waterfall */}
            <div className="font-mono text-[10px] text-[#14F195]/40 absolute bottom-10 w-full text-center h-20 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i}>{Math.random().toString(16).substring(2, 15).toUpperCase()} :: SECURE_HASH</div>
                ))}
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