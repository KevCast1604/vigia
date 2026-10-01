'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  PhoneCall, 
  X
} from 'lucide-react';

import LandingNavbar from '@/components/landing/LandingNavbar';
import Hero from '@/components/landing/Hero';
import ImpactMetrics from '@/components/landing/ImpactMetrics';
import AboutUs from '@/components/landing/AboutUs';
import MissionVision from '@/components/landing/MissionVision';
import HowToUse from '@/components/landing/HowToUse';
import CommunityReports from '@/components/landing/CommunityReports';
import PrivacyLegal from '@/components/landing/PrivacyLegal';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingPage() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const handleOpenEmergency = () => {
    setIsEmergencyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Barra de Alerta Oficial PNP (Rojo y Blanco) */}
      <aside className="bg-red-600 text-white text-xs py-2 px-4 shadow-xs" aria-label="Canal oficial de emergencia">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span>
              <strong>EMERGENCIA POLICIAL INMEDIATA:</strong> Si recibes llamadas, mensajes extorsivos o amenazas contra tu vida o negocio, no negocies.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:111"
              className="bg-white text-red-700 hover:bg-red-50 font-black px-2.5 py-0.5 rounded-md text-[11px] flex items-center gap-1 transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3 h-3 text-red-600" />
              <span>Llamar al 111 (PNP 24/7)</span>
            </a>
            <span className="hidden sm:inline text-red-200">|</span>
            <span className="hidden sm:inline font-mono text-[11px] text-red-100">
              Central 105
            </span>
          </div>
        </div>
      </aside>

      {/* 2. Navegacion Principal Institucional y Responsive */}
      <LandingNavbar onOpenEmergencyModal={handleOpenEmergency} />

      {/* 3. Seccion Hero (Pantalla Completa en Desktop) */}
      <Hero onOpenEmergencyModal={handleOpenEmergency} />

      {/* 4. Seccion de Metricas de Impacto con Animacion */}
      <ImpactMetrics />

      {/* 5. Seccion Sobre Nosotros (About Us) con Imagen y Metodologia */}
      <AboutUs onOpenEmergencyModal={handleOpenEmergency} />

      {/* 6. Seccion Mision y Vision */}
      <MissionVision />

      {/* 7. Seccion Como Usar */}
      <HowToUse onOpenEmergencyModal={handleOpenEmergency} />

      {/* 8. Seccion Apoya a la Comunidad con tu Reporte (Patron VIGIA) */}
      <CommunityReports onOpenEmergencyModal={handleOpenEmergency} />

      {/* 9. Seccion de Escudo de Privacidad y Cumplimiento Legal (Ley N° 29733) */}
      <PrivacyLegal />

      {/* 10. Seccion de Preguntas Frecuentes (FAQ) */}
      <FAQ />

      {/* 11. Bloque Destacado de Llamado a la Accion (CTA Final) */}
      <CTASection onOpenEmergencyModal={handleOpenEmergency} />

      {/* 11. Modal Radix UI de Canales de Emergencia PNP */}
      <Dialog.Root open={isEmergencyModalOpen} onOpenChange={setIsEmergencyModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl max-w-md w-[92vw] z-50 space-y-4 outline-none animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <Dialog.Title className="text-base font-black text-slate-900 leading-tight">
                    Canales Oficiales de la PNP
                  </Dialog.Title>
                  <p className="text-xs text-slate-500 font-medium">
                    Atencion de extorsiones y secuestros en Lima y Callao
                  </p>
                </div>
              </div>
              <Dialog.Close className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-xs text-slate-600 font-medium leading-relaxed">
              VIGIA es una herramienta civica y comunitaria de consulta preventiva. En caso de riesgo o amenaza activa, comunicate directamente con la Policia Nacional del Peru:
            </Dialog.Description>

            <div className="space-y-2.5">
              <a
                href="tel:111"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-3.5 rounded-2xl flex items-center justify-between transition-colors shadow-md shadow-red-600/20"
              >
                <div>
                  <div className="text-sm font-black">Linea 111 (Central PNP Extorsiones)</div>
                  <div className="text-[11px] text-red-100 font-normal">Llamada gratuita y confidencial 24/7</div>
                </div>
                <PhoneCall className="w-4 h-4 text-white" />
              </a>

              <a
                href="tel:105"
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 font-bold p-3 rounded-2xl flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-bold">Central de Emergencias 105</div>
                  <div className="text-[11px] text-slate-500 font-normal">Patrullaje integrado y auxilio inmediato</div>
                </div>
                <PhoneCall className="w-4 h-4 text-slate-600" />
              </a>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
              <strong>Recomendacion PNP:</strong> No elimines mensajes, audios ni capturas de pantalla de los extorsionadores; constituyen evidencia pericial para la fiscalia.
            </div>

            <div className="pt-1 flex justify-end">
              <Dialog.Close className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors">
                Cerrar
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* 12. Footer Institucional Modular y Completo */}
      <LandingFooter onOpenEmergencyModal={handleOpenEmergency} />
    </div>
  );
}
