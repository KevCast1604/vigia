'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  MapPin, 
  PhoneCall, 
  ArrowRight, 
  Building2, 
  Radio, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

interface HeroProps {
  onOpenEmergencyModal: () => void;
}

export default function Hero({ onOpenEmergencyModal }: HeroProps) {
  return (
    <section className="relative overflow-hidden w-full lg:min-h-[calc(100vh-102px)] lg:flex lg:flex-col lg:justify-center py-10 lg:py-0 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60">
      {/* Grilla sutil de fondo tactico */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje Central y Acciones */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badge Tactico Institucional */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-extrabold">MONITOREO TERRITORIAL CIVICO</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-medium">Dataset Policial PNP (2018–2026)</span>
            </div>

            {/* Titular Principal */}
            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Protege tu negocio y comunidad frente a la{' '}
                <span className="text-red-600 underline decoration-red-300 decoration-wavy underline-offset-6">
                  extorsion
                </span>{' '}
                y el cobro de cupos.
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                En Lima y Callao, el cobro de cupos y las amenazas a bodegas, talleres, colegios y empresas de transporte requieren informacion clara y oportuna. 
                <strong> VIGIA</strong> reune y analiza <strong>49,207 denuncias policiales registradas ante la PNP</strong> en <strong>50 distritos</strong> para identificar sectores de alta concentracion delictiva y canalizar denuncias efectivas.
              </p>
            </div>

            {/* Botones de Accion (Azul y Rojo) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/25 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MapPin className="w-4 h-4 text-blue-200" />
                <span>Explorar Radar Territorial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={onOpenEmergencyModal}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-sm px-5 py-3.5 rounded-2xl flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Canal de Emergencia PNP (Linea 111)</span>
              </button>
            </div>

          </div>

          {/* Columna Derecha: Escaparate con Tabs Radix UI e Imagenes */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-200/50">
              
              <Tabs.Root defaultValue="centro-monitoreo" className="space-y-3">
                {/* Pestanas Radix UI: 2 opciones sin emojis */}
                <Tabs.List className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl gap-1 text-xs font-bold text-slate-600">
                  <Tabs.Trigger
                    value="centro-monitoreo"
                    className="py-2.5 px-3 rounded-xl transition-all data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs text-center truncate flex items-center justify-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>Radar Territorial</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="comercio"
                    className="py-2.5 px-3 rounded-xl transition-all data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs text-center truncate flex items-center justify-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Comercio Protegido</span>
                  </Tabs.Trigger>
                </Tabs.List>

                {/* Pestana 1: Centro de Monitoreo */}
                <Tabs.Content value="centro-monitoreo" className="space-y-3 outline-none">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-950 group">
                    <Image
                      src="/images/vigia_hero.jpg"
                      alt="Centro de monitoreo e inteligencia territorial de VIGIA en Lima"
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
                    
                    {/* Badge flotante en imagen */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>Radar Territorial Lima y Callao</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl text-slate-800 flex items-center justify-between shadow-lg">
                      <div>
                        <div className="text-xs font-black text-slate-900">50 Distritos Monitoreados</div>
                        <div className="text-[10px] text-slate-500 font-medium">Lima Metropolitana y Callao al 100%</div>
                      </div>
                      <span className="font-mono text-xs font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                        Ene 2018 - Jul 2026
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-200/80 flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>Explora los niveles de incidencia por distrito</span>
                    <Link
                      href="/"
                      className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Abrir Mapa</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Tabs.Content>

                {/* Pestana 2: Comercio Protegido */}
                <Tabs.Content value="comercio" className="space-y-3 outline-none">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-950 group">
                    <Image
                      src="/images/vigia_bodega.jpg"
                      alt="Comerciante de bodega en Lima informandose sobre seguridad territorial con VIGIA"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                      Comercio y Emprendedores
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <div className="text-xs font-bold leading-snug">
                        &ldquo;Conocer el nivel de denuncias en nuestro sector nos permite prevenir y alertar a las autoridades antes de ceder a la extorsion.&rdquo;
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                        <span>Bodegas, talleres y transporte en Lima</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>Informacion territorial orientada a comerciantes</span>
                    <Link
                      href="/"
                      className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Ver Analisis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Tabs.Content>
              </Tabs.Root>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
