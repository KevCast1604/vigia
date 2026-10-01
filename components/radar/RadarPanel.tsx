'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Users, TrendingUp, Search, PlusCircle, ChevronDown, Check, X, Layers } from 'lucide-react';
import { DistrictKey, DistrictStats, ViewType } from '@/lib/types';
import { LIMA_DISTRICTS, METRO_STATS } from '@/lib/districts-data';
import { supabase } from '@/lib/supabase/client';

interface RadarPanelProps {
  selectedDistrict: DistrictKey | null;
  onDistrictChange: (district: DistrictKey | null) => void;
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
  const currentData: DistrictStats = selectedDistrict ? (LIMA_DISTRICTS[selectedDistrict] || METRO_STATS) : METRO_STATS;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [communityCount, setCommunityCount] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Consulta en vivo del conteo real de reportes comunitarios en Supabase
  useEffect(() => {
    let isMounted = true;
    const fetchCommunityCount = async () => {
      try {
        let query = supabase.from('community_reports').select('*', { count: 'exact', head: true });
        if (selectedDistrict) {
          const distInfo = LIMA_DISTRICTS[selectedDistrict];
          if (distInfo) {
            query = query.eq('ubigeo', distInfo.ubigeo);
          }
        }
        const { count, error } = await query;
        if (!error && count !== null && isMounted) {
          setCommunityCount(count);
        }
      } catch (err) {
        console.error('Error consultando reportes comunitarios:', err);
      }
    };

    fetchCommunityCount();
    return () => {
      isMounted = false;
    };
  }, [selectedDistrict]);

  // Cerrar el dropdown al hacer clic fuera o presionar la tecla Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Filtrado reactivo de distritos por nombre, sector o cifra
  const filteredDistricts = Object.values(LIMA_DISTRICTS).filter((d) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      d.name.toLowerCase().includes(query) ||
      d.sectorName.toLowerCase().includes(query) ||
      d.officialComplaints.toString().includes(query)
    );
  });

  return (
    <div className="space-y-4 flex flex-col flex-1 p-4 sm:p-5">
      {/* Título de la sección */}
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Incidencia por Distrito
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Estadísticas oficiales de extorsión y patrones comunitarios agregados.
        </p>
      </div>

      {/* Selector de Distrito Enriquecido y Accesible */}
      <div ref={dropdownRef} className="relative bg-blue-50/40 p-3.5 rounded-2xl border border-blue-200/90 space-y-2 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-900">
              {selectedDistrict ? 'Distrito Seleccionado' : 'Vista Metropolitana'}
            </span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Intercambiable en el mapa</span>
        </div>

        {/* Botón Disparador del Dropdown */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`w-full bg-white hover:bg-slate-50/90 border text-left p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            isDropdownOpen ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-300'
          }`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
        >
          {selectedDistrict ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${RISK_LABELS[currentData.riskLevel].dot} ring-2 ring-white shadow-xs`} />
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-900 truncate flex items-center gap-1.5">
                  <span>{currentData.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${RISK_LABELS[currentData.riskLevel].badge}`}>
                    {RISK_LABELS[currentData.riskLevel].label}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  Zona: <span className="text-slate-700">{currentData.sectorName}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-900 truncate flex items-center gap-1.5">
                  <span>Vista General</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                    {Object.keys(LIMA_DISTRICTS).length} Distritos
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  Consolidado oficial metropolitano
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              {currentData.officialComplaints.toLocaleString()}
            </span>
            {selectedDistrict && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDistrictChange(null);
                }}
                className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Deseleccionar distrito (Ver toda Lima)"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </div>
        </button>

        {/* Menú Desplegable Flotante con Búsqueda y Lista Enriquecida */}
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Buscador Rápido de Distritos */}
            <div className="p-2 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar distrito o zona..."
                  autoFocus
                  className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>

            {/* Lista Scrollable de Distritos */}
            <div className="max-h-64 overflow-y-auto p-1.5 space-y-1" role="listbox">
              {/* Opción de Vista General Metropolitana (Deseleccionar) */}
              <button
                type="button"
                onClick={() => {
                  onDistrictChange(null);
                  setIsDropdownOpen(false);
                  setSearchQuery('');
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 border-b border-slate-100 ${
                  selectedDistrict === null
                    ? 'bg-blue-50 text-blue-950 font-bold border border-blue-200 shadow-2xs'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
                role="option"
                aria-selected={selectedDistrict === null}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      Vista General Metropolitana
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium truncate">
                      Todos los distritos (Consolidado)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-bold">
                    {METRO_STATS.officialComplaints.toLocaleString()}
                  </span>
                  {selectedDistrict === null && (
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  )}
                </div>
              </button>

              {filteredDistricts.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 font-medium">
                  No se encontraron distritos con &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredDistricts.map((d) => {
                  const isSelected = d.key === selectedDistrict;
                  const risk = RISK_LABELS[d.riskLevel];
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onDistrictChange(null); // deselecciona si se vuelve a presionar el mismo
                        } else {
                          onDistrictChange(d.key);
                        }
                        setIsDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-blue-50 text-blue-950 font-bold border border-blue-200 shadow-2xs'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${risk.dot}`} />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {d.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium truncate">
                            {d.sectorName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {d.officialComplaints.toLocaleString()}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${risk.badge}`}>
                          {risk.label}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Pie del Menú con Resumen */}
            <div className="px-3 py-1.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>{filteredDistricts.length} de {Object.keys(LIMA_DISTRICTS).length} distritos monitoreados</span>
              <span className="font-mono">Fuente: PNP</span>
            </div>
          </div>
        )}
      </div>

      {/* Tarjetas Comparativas (Separación Estricta: Oficial vs Comunidad) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Denuncias PNP</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Oficial
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {currentData.officialComplaints.toLocaleString()}
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            Desde enero de 2018 a julio de 2026
          </p>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Patrones VIGIA</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                Comunidad
              </span>
            </div>
            <div className="text-2xl font-black text-amber-600">
              {communityCount}
            </div>
          </div>
          {communityCount === 0 ? (
            <div className="mt-2 space-y-0.5">
              <p className="text-[10px] text-slate-400 font-medium">
                0 alertas activas en zona
              </p>
              <button
                type="button"
                onClick={() => onSwitchView('report')}
                className="text-[10px] font-bold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <span>+ Crear reporte en distrito</span>
              </button>
            </div>
          ) : (
            <p className="text-[10px] text-emerald-700 font-bold mt-2">
              {communityCount} {communityCount === 1 ? 'alerta comunitaria activa' : 'alertas comunitarias activas'}
            </p>
          )}
        </div>
      </div>

      {/* Gráfico de Tendencia Histórica Oficial */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            Tendencia Histórica de Denuncias
          </span>
          <span className="text-[10px] font-mono text-slate-500">Ene 2018 – Jul 2026</span>
        </div>

        <div className="space-y-1.5 pt-1 text-[11px] font-medium text-slate-600">
          {(() => {
            const maxVal = Math.max(...currentData.yearlyTrend.map((t) => t.count), 1);
            return currentData.yearlyTrend.map((t) => {
              const pct = t.count > 0 ? Math.max(6, Math.round((t.count / maxVal) * 100)) : 0;
              const isPeakYear = t.count === maxVal && t.count > 0;
              return (
                <div key={t.year} className="flex items-center gap-2">
                  <span className={`w-8 font-mono text-[10px] ${isPeakYear ? 'font-bold text-blue-700' : 'text-slate-500'}`}>
                    {t.year}
                  </span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPeakYear ? 'bg-red-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={`font-mono text-[10px] w-12 text-right ${isPeakYear ? 'font-bold text-red-600' : 'text-slate-700'}`}>
                    {t.count.toLocaleString()}
                  </span>
                </div>
              );
            });
          })()}
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
