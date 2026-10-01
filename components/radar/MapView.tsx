'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ShieldCheck, MapPin, Layers, PanelLeftOpen, X } from 'lucide-react';
import { DistrictKey, DistrictStats } from '@/lib/types';
import { LIMA_DISTRICTS } from '@/lib/districts-data';

// Import dinámico de Leaflet sin SSR para evitar errores de window
const LeafletMap = dynamic(
  () => import('./LeafletMapInner').then((mod) => mod.LeafletMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-2">
        <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium">Cargando radar territorial...</span>
      </div>
    )
  }
);

interface MapViewProps {
  selectedDistrict: DistrictKey | null;
  onDistrictSelect: (district: DistrictKey | null) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const RISK_LABELS: Record<DistrictStats['riskLevel'], { label: string; badge: string; dot: string }> = {
  'very-high': { label: 'Muy Alto', badge: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  high: { label: 'Alto', badge: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  medium: { label: 'Medio', badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  moderate: { label: 'Moderado', badge: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' }
};

export const MapView: React.FC<MapViewProps> = ({
  selectedDistrict,
  onDistrictSelect,
  isSidebarOpen = true,
  onToggleSidebar
}) => {
  const currentDistrict: DistrictStats | null = selectedDistrict ? (LIMA_DISTRICTS[selectedDistrict] || null) : null;

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Mapa Leaflet interactivo a pantalla completa */}
      <LeafletMap
        selectedDistrict={selectedDistrict}
        onDistrictSelect={onDistrictSelect}
      />

      {/* Botón Flotante para expandir el panel si está colapsado */}
      {!isSidebarOpen && onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex absolute top-4 left-4 z-[450] bg-white/95 backdrop-blur border border-slate-200 px-3 py-1.5 rounded-xl shadow-md items-center gap-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-xs"
          title="Mostrar panel lateral"
        >
          <PanelLeftOpen className="w-4 h-4 text-blue-600" />
          <span>Mostrar Panel</span>
        </button>
      )}

      {/* Badge Flotante: Capa Activa */}
      <div
        className={`absolute top-4 ${
          !isSidebarOpen ? 'left-4 sm:left-40' : 'left-4'
        } z-[400] bg-white/95 backdrop-blur border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-2 transition-all duration-300`}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Extorsión · Lima y Callao</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          Zonas Agregadas
        </span>
      </div>

      {/* Leyenda de Calor en la Esquina Superior Derecha: Nivel de Incidencia */}
      <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 sm:p-4 rounded-2xl shadow-md min-w-[210px] sm:min-w-[230px] hidden sm:block">
        <div className="font-bold text-slate-900 text-xs sm:text-sm mb-2.5 tracking-tight flex items-center justify-between border-b border-slate-100 pb-1.5">
          <span>Nivel de Incidencia</span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Casos</span>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <div
            className={`flex items-center justify-between gap-3 text-xs sm:text-sm px-2 py-1 -mx-2 rounded-lg transition-all ${
              currentDistrict?.riskLevel === 'very-high'
                ? 'bg-red-50/90 ring-1 ring-red-200 font-bold'
                : 'text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 shrink-0 ring-2 ring-red-100 shadow-xs" />
              <span className="font-semibold text-slate-800">Muy Alto</span>
              {currentDistrict?.riskLevel === 'very-high' && (
                <span className="text-[9px] font-black text-red-700 bg-red-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Distrito Actual
                </span>
              )}
            </div>
            <span className="text-slate-500 font-mono text-xs">(&gt; 2,000)</span>
          </div>

          <div
            className={`flex items-center justify-between gap-3 text-xs sm:text-sm px-2 py-1 -mx-2 rounded-lg transition-all ${
              currentDistrict?.riskLevel === 'high'
                ? 'bg-orange-50/90 ring-1 ring-orange-200 font-bold'
                : 'text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-orange-500 shrink-0 ring-2 ring-orange-100 shadow-xs" />
              <span className="font-semibold text-slate-800">Alto</span>
              {currentDistrict?.riskLevel === 'high' && (
                <span className="text-[9px] font-black text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Distrito Actual
                </span>
              )}
            </div>
            <span className="text-slate-500 font-mono text-xs">(1,000 - 2,000)</span>
          </div>

          <div
            className={`flex items-center justify-between gap-3 text-xs sm:text-sm px-2 py-1 -mx-2 rounded-lg transition-all ${
              currentDistrict?.riskLevel === 'medium'
                ? 'bg-amber-50/90 ring-1 ring-amber-200 font-bold'
                : 'text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shrink-0 ring-2 ring-amber-100 shadow-xs" />
              <span className="font-semibold text-slate-800">Medio</span>
              {currentDistrict?.riskLevel === 'medium' && (
                <span className="text-[9px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Distrito Actual
                </span>
              )}
            </div>
            <span className="text-slate-500 font-mono text-xs">(500 - 1,000)</span>
          </div>

          <div
            className={`flex items-center justify-between gap-3 text-xs sm:text-sm px-2 py-1 -mx-2 rounded-lg transition-all ${
              currentDistrict?.riskLevel === 'moderate'
                ? 'bg-blue-50/90 ring-1 ring-blue-200 font-bold'
                : 'text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shrink-0 ring-2 ring-blue-100 shadow-xs" />
              <span className="font-semibold text-slate-800">Moderado</span>
              {currentDistrict?.riskLevel === 'moderate' && (
                <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Distrito Actual
                </span>
              )}
            </div>
            <span className="text-slate-500 font-mono text-xs">(&lt; 500)</span>
          </div>
        </div>
      </div>

      {/* Tarjeta Flotante Inferior Izquierda: Distrito Activo o Vista General */}
      {currentDistrict ? (
        <div className="absolute bottom-6 left-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-xl max-w-sm w-76 sm:w-80 space-y-2.5">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                Distrito Seleccionado
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-bold text-[10px] border ${
                  RISK_LABELS[currentDistrict.riskLevel].badge
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    RISK_LABELS[currentDistrict.riskLevel].dot
                  }`}
                />
                Nivel {RISK_LABELS[currentDistrict.riskLevel].label}
              </span>
              {/* Botón para Deseleccionar */}
              <button
                type="button"
                onClick={() => onDistrictSelect(null)}
                className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
                title="Deseleccionar distrito (Ver toda Lima)"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">{currentDistrict.name}</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Sector representativo: <strong className="text-slate-700">{currentDistrict.sectorName}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
              <span className="text-[10px] font-bold text-slate-400 block">Denuncias PNP</span>
              <span className="text-sm font-black text-slate-900">{currentDistrict.officialComplaints.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 block font-medium">Oficiales</span>
            </div>
            <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-2 text-center">
              <span className="text-[10px] font-bold text-amber-700 block">Alertas VIGIA</span>
              <span className="text-sm font-black text-amber-700">{currentDistrict.communityPatterns}</span>
              <span className="text-[9px] text-amber-600 block font-medium">Comunitarias</span>
            </div>
          </div>

          <div className="text-[10px] text-emerald-700 font-medium pt-1 flex items-center gap-1 border-t border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Privacidad protegida: sin direcciones ni ubicaciones exactas.</span>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-6 left-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-xl max-w-sm w-76 sm:w-80 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-600">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Vista General Lima y Callao</span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {Object.keys(LIMA_DISTRICTS).length} Distritos
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Pulsa en cualquier distrito del mapa o selecciónalo en el panel para enfocar y ver sus datos específicos.
          </p>
          <div className="text-[10px] text-emerald-700 font-medium pt-1 flex items-center gap-1 border-t border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Privacidad protegida: datos agregados a nivel distrital.</span>
          </div>
        </div>
      )}
    </div>
  );
};
