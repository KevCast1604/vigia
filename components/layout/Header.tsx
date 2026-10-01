'use client';

import React from 'react';
import { Shield, Search, FileText, Lock, PhoneCall, EyeOff, Map } from 'lucide-react';
import { ViewType } from '@/lib/types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onOpenHelp: () => void;
  onQuickExit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenHelp,
  onQuickExit
}) => {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 z-30">
      {/* Logotipo y Título */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
              VIGIA
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
              Lima Metropolitana
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
            Inteligencia Comunitaria y Escudo Antiextorsión
          </p>
        </div>
      </div>

      {/* Pestañas de Navegación en Desktop (Sin Emojis, con Lucide Icons) */}
      <nav className="hidden md:flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
        <button
          onClick={() => onViewChange('radar')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            currentView === 'radar'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Radar Territorial</span>
        </button>

        <button
          onClick={() => onViewChange('verifier')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            currentView === 'verifier'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Verificador</span>
        </button>

        <button
          onClick={() => onViewChange('report')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            currentView === 'report'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Reportar Incidente</span>
        </button>
      </nav>

      {/* Acciones de Seguridad y Salida Rápida */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Anónimo · Sin Registro</span>
        </div>

        <button
          onClick={onOpenHelp}
          className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors font-semibold shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Canales</span> PNP
        </button>

        <button
          onClick={onQuickExit}
          className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 sm:px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors font-semibold shadow-xs"
          title="Oculta la pantalla de inmediato"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Salida Rápida</span>
        </button>
      </div>
    </header>
  );
};
