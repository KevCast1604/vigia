'use client';

import React, { useState } from 'react';
import { ViewType, DistrictKey } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { EmergencyBanner } from '@/components/layout/EmergencyBanner';
import { MobileNav } from '@/components/layout/MobileNav';
import { Modals } from '@/components/layout/Modals';
import { RadarPanel } from '@/components/radar/RadarPanel';
import { VerifierPanel } from '@/components/verifier/VerifierPanel';
import { ReportWizardPanel } from '@/components/reports/ReportWizardPanel';
import { MapView } from '@/components/radar/MapView';

export default function VigiaHomePage() {
  const [currentView, setCurrentView] = useState<ViewType>('radar');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictKey>('sjl');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isQuickExitOpen, setIsQuickExitOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'panel' | 'map'>('panel');

  const handleDistrictSelect = (district: DistrictKey) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 antialiased font-sans">
      {/* 1. Cabecera Principal con Pestañas y Salida Rápida */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setMobileTab('panel');
        }}
        onOpenHelp={() => setIsHelpOpen(true)}
        onQuickExit={() => setIsQuickExitOpen(true)}
      />

      {/* 2. Banner Oficial de Emergencia PNP */}
      <EmergencyBanner />

      {/* 3. Área Principal: 100% Altura y 100% Ancho en Desktop */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Toggle para Móvil entre Panel y Mapa (visible solo en pantallas pequeñas) */}
        <div className="md:hidden flex border-b border-slate-200 bg-white p-1.5 justify-around text-xs shrink-0 z-20">
          <button
            onClick={() => setMobileTab('panel')}
            className={`flex-1 py-1.5 text-center font-bold rounded-lg transition-colors ${
              mobileTab === 'panel'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {currentView === 'radar' && 'Estadísticas del Distrito'}
            {currentView === 'verifier' && 'Formulario Verificador'}
            {currentView === 'report' && 'Asistente de Reporte'}
          </button>
          <button
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-1.5 text-center font-bold rounded-lg transition-colors ${
              mobileTab === 'map'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ver Mapa Territorial
          </button>
        </div>

        {/* Panel Izquierdo: Control, Verificador y Reporte (Scroll independiente) */}
        <div
          className={`w-full md:w-[480px] lg:w-[520px] h-full flex flex-col bg-white border-r border-slate-200 z-10 shadow-sm shrink-0 overflow-y-auto pb-16 md:pb-0 ${
            mobileTab === 'map' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {currentView === 'radar' && (
            <RadarPanel
              selectedDistrict={selectedDistrict}
              onDistrictChange={handleDistrictSelect}
              onSwitchView={(v) => setCurrentView(v)}
            />
          )}

          {currentView === 'verifier' && (
            <VerifierPanel
              onBack={() => setCurrentView('radar')}
              onSwitchView={(v) => setCurrentView(v)}
            />
          )}

          {currentView === 'report' && (
            <ReportWizardPanel
              onBack={() => setCurrentView('radar')}
              onFinished={() => setCurrentView('radar')}
            />
          )}
        </div>

        {/* Panel Derecho: Mapa Geoespacial Interactivo a Pantalla Completa (Full-Bleed) */}
        <div
          className={`flex-1 h-full relative bg-slate-100 overflow-hidden pb-16 md:pb-0 ${
            mobileTab === 'panel' ? 'hidden md:block' : 'block'
          }`}
        >
          <MapView
            selectedDistrict={selectedDistrict}
            onDistrictSelect={handleDistrictSelect}
          />
        </div>
      </main>

      {/* 4. Navegación Inferior para Móviles */}
      <MobileNav
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setMobileTab('panel');
        }}
      />

      {/* 5. Modales (Canales PNP y Salida Rápida) */}
      <Modals
        isHelpOpen={isHelpOpen}
        onCloseHelp={() => setIsHelpOpen(false)}
        isQuickExitOpen={isQuickExitOpen}
        onCloseQuickExit={() => setIsQuickExitOpen(false)}
      />
    </div>
  );
}
