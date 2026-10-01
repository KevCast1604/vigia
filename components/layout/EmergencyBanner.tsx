'use client';

import React from 'react';
import { Phone, AlertCircle } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  return (
    <aside aria-label="Línea de emergencia oficial" className="bg-amber-50/90 border-b border-amber-200 px-4 sm:px-6 py-2 flex items-center justify-between text-xs shrink-0 z-20">
      <div className="flex items-center gap-2 text-amber-900 font-medium">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 hidden sm:inline" />
        <span className="truncate">
          ¿Riesgo vital inminente o amenazas armadas? Denuncia oficial directa a la <strong>Línea 111 de la Policía Nacional</strong>
        </span>
      </div>
      <a
        href="tel:111"
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0 ml-2"
      >
        <Phone className="w-3 h-3" />
        <span>Llamar 111</span>
      </a>
    </aside>
  );
};
