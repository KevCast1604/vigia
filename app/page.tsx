'use client';

import React, { useState } from 'react';
import { PanelLeftClose } from 'lucide-react';
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
  const [mobileTab, setMobileTab] = useState<'panel' | 'map'>('panel');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleDistrictSelect = (district: DistrictKey) => {
    setSelectedDistrict(district);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 antialiased font-sans">
      {/* 1. Cabecera Principal con Pestañas, Toggle de Sidebar y Visítanos */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setMobileTab('panel');
          setIsSidebarOpen(true);
        }}
        onOpenHelp={() => setIsHelpOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
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

        {/* Panel Izquierdo: Control, Verificador y Reporte (Colapsable / Expandible) */}
        <div
          className={`h-full flex flex-col bg-white border-r border-slate-200 z-10 shadow-sm shrink-0 overflow-y-auto pb-16 md:pb-0 transition-all duration-300 ease-in-out ${
            mobileTab === 'map' ? 'hidden md:flex' : 'flex'
          } ${
            isSidebarOpen
              ? 'w-full md:w-[480px] lg:w-[520px] opacity-100'
              : 'w-0 opacity-0 pointer-events-none md:border-r-0 overflow-hidden'
          }`}
        >
          {/* Barra superior de control del panel para colapsar en Desktop */}
          <div className="hidden md:flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50/60">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {currentView === 'radar' && 'Panel del Radar Territorial'}
              {currentView === 'verifier' && 'Verificador Criptográfico'}
              {currentView === 'report' && 'Reporte Comunitario Anónimo'}
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Colapsar panel lateral"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

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
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
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

      {/* 5. Modal Canales Oficiales PNP */}
      <Modals
        isHelpOpen={isHelpOpen}
        onCloseHelp={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
