'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  FileText, 
  Lock, 
  PhoneCall, 
  Globe, 
  Map, 
  PanelLeftClose, 
  PanelLeftOpen 
} from 'lucide-react';
import { ViewType } from '@/lib/types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onOpenHelp: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenHelp,
  isSidebarOpen = true,
  onToggleSidebar
}) => {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 z-30">
      {/* Logotipo y Título */}
      <div className="flex items-center gap-3">
        <Link
          href="/landing"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-95 shrink-0"
          title="Ir a la presentación de VIGIA"
        >
          <Image
            src="/images/vigia-logo.jpg"
            alt="Logo VIGIA"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-contain border border-slate-200/80 bg-white shadow-xs group-hover:border-blue-300 transition-colors shrink-0"
            priority
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                VIGIA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Inteligencia Comunitaria y Escudo Antiextorsión
            </p>
          </div>
        </Link>

        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors shadow-xs ml-1"
            title={isSidebarOpen ? 'Colapsar panel lateral' : 'Expandir panel lateral'}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4 text-slate-600" />
            ) : (
              <PanelLeftOpen className="w-4 h-4 text-blue-600" />
            )}
          </button>
        )}
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

      {/* Acciones de Seguridad y Botón Visítanos */}
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

        {/* Botón Visítanos hacia la Landing Page */}
        <Link
          href="/landing"
          className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors font-semibold shadow-xs"
          title="Conoce más sobre VIGIA"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>Visítanos</span>
        </Link>
      </div>
    </header>
  );
};
