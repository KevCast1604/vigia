'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ShieldCheck, MapPin, Layers, PanelLeftOpen } from 'lucide-react';
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
  selectedDistrict: DistrictKey;
  onDistrictSelect: (district: DistrictKey) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const MapView: React.FC<MapViewProps> = ({
  selectedDistrict,
  onDistrictSelect,
  isSidebarOpen = true,
  onToggleSidebar
}) => {
  const currentDistrict: DistrictStats = LIMA_DISTRICTS[selectedDistrict] || LIMA_DISTRICTS.sjl;

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
          <span>Extorsión · Lima Metropolitana</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          Zonas Agregadas
        </span>
      </div>

      {/* Leyenda de Calor en la Esquina Superior Derecha */}
      <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur border border-slate-200 p-2.5 rounded-xl shadow-xs text-[10px] space-y-1.5 font-medium text-slate-600 hidden sm:block">
        <div className="font-bold text-slate-900 text-[11px] mb-1">
          Nivel de Incidencia
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>Muy Alto (&gt; 1,200)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span>Alto (800 - 1,200)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Medio (600 - 800)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Moderado (&lt; 600)</span>
        </div>
      </div>

      {/* Tarjeta Flotante Inferior Izquierda: Distrito Activo y Privacidad */}
      <div className="absolute bottom-6 left-4 z-[400] bg-white/95 backdrop-blur border border-slate-200 p-3 rounded-xl shadow-md max-w-xs text-xs space-y-1">
        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500 font-medium">Distrito:</span>
          <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold truncate">
            {currentDistrict.name}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Sector: <strong className="text-slate-700">{currentDistrict.sectorName}</strong></span>
        </div>
        <div className="text-[10px] text-emerald-700 font-medium pt-1 flex items-center gap-1 border-t border-slate-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Privacidad protegida: sin direcciones ni ubicaciones exactas.</span>
        </div>
      </div>
    </div>
  );
};
