import React from 'react';
import { ViewState } from '../types';
import { Home, TrendingUp, ShieldCheck, User } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: ViewState.APP_FEED, icon: Home, label: 'Feed' },
    { id: ViewState.APP_INVEST, icon: TrendingUp, label: 'Invest' },
    { id: ViewState.APP_SECURITY, icon: ShieldCheck, label: 'Secure' },
    { id: ViewState.APP_PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-[#020617]/90 backdrop-blur-lg border-t border-white/5 px-6 pb-2 flex items-center justify-around z-50">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-all duration-300 ${isActive ? 'text-[#14F195] -translate-y-1' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'drop-shadow-[0_0_8px_rgba(20,241,149,0.5)]' : ''} />
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            {isActive && <div className="w-1 h-1 bg-[#14F195] rounded-full absolute bottom-2 shadow-[0_0_5px_#14F195]"></div>}
          </button>
        );
      })}
    </div>
  );
};