'use client';

import React from 'react';
import { ShieldCheck, Users, TrendingUp, Search, PlusCircle } from 'lucide-react';
import { DistrictKey, DistrictStats, ViewType } from '@/lib/types';
import { LIMA_DISTRICTS } from '@/lib/districts-data';

interface RadarPanelProps {
  selectedDistrict: DistrictKey;
  onDistrictChange: (district: DistrictKey) => void;
  onSwitchView: (view: ViewType) => void;
}

const RISK_LABELS: Record<DistrictStats['riskLevel'], { label: string; badge: string; dot: string }> = {
  'very-high': { label: 'Muy Alto', badge: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  high: { label: 'Alto', badge: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  medium: { label: 'Medio', badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  moderate: { label: 'Moderado', badge: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' }
};

export const RadarPanel: React.FC<RadarPanelProps> = ({
  selectedDistrict,
  onDistrictChange,
  onSwitchView
}) => {
  const currentData: DistrictStats = LIMA_DISTRICTS[selectedDistrict] || LIMA_DISTRICTS.sjl;

  return (
    <div className="space-y-4 flex flex-col flex-1 p-4 sm:p-5">
      {/* Título de la sección */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          Dataset Policial PNP (2018 - 2026)
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2 tracking-tight">
          Incidencia por Distrito
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Estadísticas oficiales de extorsión y patrones comunitarios agregados.
        </p>
      </div>

      {/* Selector de Distrito */}
      <div className="bg-blue-50/30 p-3.5 rounded-2xl border border-blue-200/80 space-y-2 shadow-xs">
        <label htmlFor="district-select" className="text-xs font-bold text-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-900">
              Distrito Seleccionado:
            </span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Intercambiable en el mapa</span>
        </label>
        <select
          id="district-select"
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value as DistrictKey)}
          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-xs cursor-pointer"
        >
          {Object.values(LIMA_DISTRICTS).map((d) => (
            <option key={d.key} value={d.key}>
              {d.name} ({d.officialComplaints.toLocaleString()} denuncias)
            </option>
          ))}
        </select>
        <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium pt-0.5">
          <span>Zona: <strong className="text-slate-800">{currentData.sectorName}</strong></span>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[10px] border shrink-0 ${
              RISK_LABELS[currentData.riskLevel].badge
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                RISK_LABELS[currentData.riskLevel].dot
              }`}
            />
            Nivel {RISK_LABELS[currentData.riskLevel].label}
          </span>
        </div>
      </div>

      {/* Tarjetas Comparativas (Separación Estricta: Oficial vs Comunidad) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Denuncias PNP</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {currentData.officialComplaints.toLocaleString()}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            Acumulado oficial (PNP)
          </p>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-1">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Patrones VIGIA</span>
            </div>
            <div className="text-2xl font-black text-amber-600">
              {currentData.communityPatterns}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            Alertas comunitarias
          </p>
        </div>
      </div>

      {/* Gráfico de Tendencia Histórica Oficial */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            Tendencia Histórica de Denuncias
          </span>
          <span className="text-[10px] font-mono text-slate-400">Oficial</span>
        </div>

        <div className="space-y-1.5 pt-1 text-[11px] font-medium text-slate-600">
          {currentData.yearlyTrend.map((t) => {
            const maxVal = currentData.yearlyTrend[currentData.yearlyTrend.length - 1].count;
            const pct = Math.max(15, Math.round((t.count / maxVal) * 100));
            return (
              <div key={t.year} className="flex items-center gap-2">
                <span className="w-8 font-mono text-[10px]">{t.year}</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-slate-700 w-10 text-right">
                  {t.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botones de Acción Inmediata (Zona del Pulgar) */}
      <div className="pt-2 space-y-2 mt-auto">
        <button
          onClick={() => onSwitchView('verifier')}
          className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-xl border border-slate-300 flex items-center justify-between transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-xs">Verificar Número o Cuenta</span>
          </div>
          <span className="text-slate-400 text-sm">→</span>
        </button>

        <button
          onClick={() => onSwitchView('report')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-xs">Reportar Incidente Anónimamente</span>
        </button>
      </div>
    </div>
  );
};
