'use client';

import React from 'react';
import { Shield, PhoneCall, X, Search } from 'lucide-react';

interface ModalsProps {
  isHelpOpen: boolean;
  onCloseHelp: () => void;
  isQuickExitOpen: boolean;
  onCloseQuickExit: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  isHelpOpen,
  onCloseHelp,
  isQuickExitOpen,
  onCloseQuickExit
}) => {
  return (
    <>
      {/* Modal Informativo Canales Oficiales PNP */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Canales Oficiales PNP</span>
              </h3>
              <button
                onClick={onCloseHelp}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              VIGIA es una plataforma cívica de prevención comunitaria y análisis de datos. En situaciones de peligro inminente, comunícate directamente con las autoridades:
            </p>

            <div className="space-y-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-900">Central PNP Extorsiones</div>
                  <div className="text-[11px] text-slate-500">Atención especializada 24/7</div>
                </div>
                <a
                  href="tel:111"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>111</span>
                </a>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-900">Emergencias Policía Nacional</div>
                  <div className="text-[11px] text-slate-500">Respuesta rápida de patrullaje</div>
                </div>
                <a
                  href="tel:105"
                  className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>105</span>
                </a>
              </div>
            </div>

            <button
              onClick={onCloseHelp}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Pantalla Simulada de Salida Rápida (Quick Exit) */}
      {isQuickExitOpen && (
        <div className="fixed inset-0 bg-white text-slate-900 z-50 p-6 flex flex-col justify-start items-center">
          <div className="w-full max-w-md pt-12">
            <div className="text-3xl font-bold tracking-tight text-blue-600 mb-6 text-center">
              Google
            </div>
            <div className="border border-slate-300 rounded-full px-4 py-3 flex items-center gap-3 shadow-xs">
              <Search className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-600">
                precios de abarrotes por mayor lima mercado central
              </span>
            </div>
            <div className="mt-12 text-center">
              <button
                onClick={onCloseQuickExit}
                className="text-xs text-slate-400 hover:text-slate-600 underline"
              >
                (Restaurar VIGIA)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
