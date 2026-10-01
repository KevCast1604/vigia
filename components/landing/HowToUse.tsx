'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Layers, 
  ShieldAlert, 
  PhoneCall, 
  ArrowRight, 
  Compass, 
  Check 
} from 'lucide-react';

interface HowToUseProps {
  onOpenEmergencyModal: () => void;
}

export default function HowToUse({ onOpenEmergencyModal }: HowToUseProps) {
  const steps = [
    {
      step: '01',
      title: 'Selecciona tu Distrito',
      description: 'Navega en el mapa interactivo o utiliza el selector para ubicar cualquiera de los 50 distritos monitoreados en Lima Metropolitana y Callao.',
      icon: MapPin,
      badge: '50 Distritos',
      color: 'blue'
    },
    {
      step: '02',
      title: 'Evalua el Nivel de Incidencia',
      description: 'Examina la concentracion territorial basada en 49,207 denuncias policiales registradas por la PNP para identificar zonas criticas y tendencias.',
      icon: Layers,
      badge: 'Datos Oficiales PNP',
      color: 'blue'
    },
    {
      step: '03',
      title: 'Aplica Medidas Preventivas',
      description: 'Infórmate sobre modalidades habituales de cobro de cupos y extorsion a bodegas o transporte para reforzar la seguridad de tu negocio o vecindario.',
      icon: ShieldAlert,
      badge: 'Proteccion al Comercio',
      color: 'amber'
    },
    {
      step: '04',
      title: 'Canaliza y Denuncia',
      description: 'Si recibes amenazas, no elimines evidencias digitales y comunicate directamente con la Division de Secuestros y Extorsiones de la PNP al 111.',
      icon: PhoneCall,
      badge: 'Central 111 PNP',
      color: 'red'
    }
  ];

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>GUIA PRACTICA DE USO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Como utilizar la plataforma VIGIA
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Una guia de 4 pasos para consultar informacion territorial verificada, proteger tu actividad economica y actuar adecuadamente ante cualquier amenaza.
          </p>
        </div>

        {/* Grilla de Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            
            const badgeClasses = 
              item.color === 'red'
                ? 'bg-red-50 text-red-700 border-red-200'
                : item.color === 'amber'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-blue-50 text-blue-700 border-blue-200';

            const iconBgClasses = 
              item.color === 'red'
                ? 'bg-red-100 text-red-600'
                : item.color === 'amber'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-blue-100 text-blue-600';

            return (
              <div 
                key={item.step}
                className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                      {item.step}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClasses}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconBgClasses}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Paso {index + 1} del protocolo civico</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tarjeta de Accion Inmediata */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              ¿Quieres consultar las estadisticas y zonas criticas de tu distrito?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Accede directamente al radar interactivo o comunicate con los canales policiales de emergencia.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Abrir Radar Territorial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onOpenEmergencyModal}
              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Emergencia PNP (111)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
