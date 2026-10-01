'use client';

import React from 'react';
import { Map, Search, FileText } from 'lucide-react';
import { ViewType } from '@/lib/types';

interface MobileNavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 px-6 py-2 flex justify-around items-center z-30 shadow-lg">
      <button
        onClick={() => onViewChange('radar')}
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          currentView === 'radar' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Map className="w-5 h-5" />
        <span className="text-[10px]">Radar</span>
      </button>

      <button
        onClick={() => onViewChange('verifier')}
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          currentView === 'verifier' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">Verificar</span>
      </button>

      <button
        onClick={() => onViewChange('report')}
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          currentView === 'report' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <FileText className="w-5 h-5" />
        <span className="text-[10px]">Reportar</span>
      </button>
    </nav>
  );
};
