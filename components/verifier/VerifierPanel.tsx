'use client';

import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, AlertTriangle, Key } from 'lucide-react';
import { VerificationResultData, ViewType } from '@/lib/types';

interface VerifierPanelProps {
  onBack: () => void;
  onSwitchView: (view: ViewType) => void;
}

export const VerifierPanel: React.FC<VerifierPanelProps> = ({ onBack, onSwitchView }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<VerificationResultData | null>(null);

  const handleSearch = (term?: string) => {
    const input = (term !== undefined ? term : query).trim();
    if (!input) return;

    if (input.includes('999') || input.includes('987')) {
      setResult({
        identifier: input,
        maskedIdentifier: '+51 999 *** 456',
        hmac: '7b4e82f1...9ac3',
        hasMatches: true,
        associatedReportsCount: 3,
        frequentModality: 'Extorsión / Cobro de cupo',
        firstReportDaysAgo: 14,
        lastReportDaysAgo: 2,
        lastReportDistrict: 'San Juan de Lurigancho'
      });
    } else {
      setResult({
        identifier: input,
        maskedIdentifier: input,
        hmac: 'a12f55c8...10e9',
        hasMatches: false,
        associatedReportsCount: 0
      });
    }
  };

  const handleQuickTest = (num: string) => {
    setQuery(num);
    handleSearch(num);
  };

  return (
    <div className="space-y-4 flex flex-col flex-1 p-4 sm:p-5">
      {/* Cabecera del Verificador */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 transition-colors"
          title="Volver al Radar"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            Verificador de Identificadores
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Búsqueda protegida mediante HMAC-SHA256
          </p>
        </div>
      </div>

      {/* Input de Búsqueda */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
        <label htmlFor="verifier-input" className="text-xs font-bold text-slate-700 block">
          Ingresa número celular, cuenta bancaria o CCI:
        </label>
        <div className="relative">
          <input
            id="verifier-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ej: 999 123 456 o 191-..."
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-mono shadow-xs"
          />
          <button
            onClick={() => handleSearch()}
            className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            Consultar
          </button>
        </div>

        {/* Ejemplos de prueba rápida */}
        <div className="flex flex-wrap gap-2 pt-0.5">
          <button
            onClick={() => handleQuickTest('999123456')}
            className="text-[11px] bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-2.5 py-1 rounded-md shadow-xs font-medium transition-colors"
          >
            Ejemplo con reportes
          </button>
          <button
            onClick={() => handleQuickTest('988000111')}
            className="text-[11px] bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-2.5 py-1 rounded-md shadow-xs font-medium transition-colors"
          >
            Ejemplo sin reportes
          </button>
        </div>
      </div>

      {/* Resultado de la Verificación */}
      {result && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {result.hasMatches ? (
            <div className="bg-amber-50/80 border border-amber-300 p-4 rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Patrón Comunitario Detectado
                </span>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                  <Key className="w-3 h-3" />
                  HMAC: {result.hmac}
                </span>
              </div>

              <div className="text-lg font-mono font-bold text-slate-900">
                {result.maskedIdentifier}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-[10px] font-semibold">
                    Reportes asociados:
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    {result.associatedReportsCount} independientes
                  </div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-[10px] font-semibold">
                    Modalidad descrita:
                  </div>
                  <div className="font-bold text-amber-700 truncate">
                    {result.frequentModality}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-2 font-medium">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Primer reporte:</span>
                  <span>hace {result.firstReportDaysAgo} días</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Último reporte:</span>
                  <span>hace {result.lastReportDaysAgo} días ({result.lastReportDistrict})</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                Sin Reportes Comunitarios Previos
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Este identificador no figura en la base comunitaria actual. Si recibiste un mensaje intimidatorio de este contacto, puedes registrarlo anónimamente.
              </p>
              <button
                onClick={() => onSwitchView('report')}
                className="mt-2 text-xs text-blue-700 font-bold hover:underline"
              >
                Crear reporte anónimo →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Aviso Ético y Legal */}
      <div className="text-[11px] text-slate-600 bg-blue-50/70 p-3 rounded-xl border border-blue-200 leading-relaxed font-medium mt-auto">
        <strong className="text-blue-900">Aviso de Neutralidad:</strong> Los resultados reflejan reportes de usuarios y no constituyen una determinación legal de culpabilidad penal ni acusación comprobada.
      </div>
    </div>
  );
};
