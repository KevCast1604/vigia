'use client';

import React, { useEffect } from 'react';
import { Shield, PhoneCall, X } from 'lucide-react';

interface ModalsProps {
  isHelpOpen: boolean;
  onCloseHelp: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ isHelpOpen, onCloseHelp }) => {
  // Manejo de la tecla Escape para cerrar el modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isHelpOpen) onCloseHelp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHelpOpen, onCloseHelp]);

  if (!isHelpOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onCloseHelp();
      }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 transition-opacity duration-200"
    >
      <div className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl p-5 space-y-4 shadow-2xl relative">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Canales Oficiales PNP</span>
          </h3>
          <button
            onClick={onCloseHelp}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200 transition-colors"
            title="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          VIGIA es una plataforma cívica de prevención comunitaria y análisis de datos. En situaciones de peligro inminente, comunícate directamente con las autoridades:
        </p>

        <div className="space-y-2">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-slate-900">Central PNP Extorsiones</div>
              <div className="text-[11px] text-slate-500 font-medium">Atención especializada 24/7</div>
            </div>
            <a
              href="tel:111"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>111</span>
            </a>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-slate-900">Emergencias Policía Nacional</div>
              <div className="text-[11px] text-slate-500 font-medium">Respuesta rápida de patrullaje</div>
            </div>
            <a
              href="tel:105"
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>105</span>
            </a>
          </div>
        </div>

        <button
          onClick={onCloseHelp}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-colors"
        >
          Entendido, volver a VIGIA
        </button>
      </div>
    </div>
  );
};
