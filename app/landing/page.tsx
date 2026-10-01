'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Shield, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  ArrowRight, 
  Building2, 
  X,
  Radio,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
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

      {/* 2. Navegación Principal Institucional */}
      <header className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logotipo VIGIA */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  VIGIA
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                  Lima y Callao
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Monitoreo Territorial de Extorsión e Inteligencia Preventiva
              </p>
            </div>
          </Link>

          {/* Acciones Rápidas del Navbar */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Dataset Policial PNP (2018–2026)</span>
            </div>

            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(true)}
              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span className="hidden sm:inline">Canales</span> PNP
            </button>

            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Abrir Radar Territorial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION PRINCIPAL */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60">
        {/* Grilla sutil de fondo táctico */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Mensaje Central y Llamado a la Acción */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge Táctico de Nivel Institucional */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="font-extrabold">MONITOREO TERRITORIAL CÍVICO</span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-700 font-medium">Dataset Policial PNP (2018–2026)</span>
              </div>

              {/* Titular Principal Auténtico y Directo */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.12]">
                  Protege tu negocio y comunidad frente a la{' '}
                  <span className="text-red-600 underline decoration-red-300 decoration-wavy underline-offset-6">
                    extorsión
                  </span>{' '}
                  y el cobro de cupos.
                </h1>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                  En Lima y Callao, el cobro de cupos y las amenazas a bodegas, talleres, colegios y empresas de transporte requieren información clara y oportuna. 
                  <strong> VIGIA</strong> reúne y analiza <strong>49,207 denuncias policiales registradas ante la PNP</strong> en <strong>50 distritos</strong> para identificar sectores de alta concentración delictiva y canalizar denuncias efectivas.
                </p>
              </div>

              {/* Botones de Acción (Azul y Rojo) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
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
                  onClick={() => setIsEmergencyModalOpen(true)}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-sm px-5 py-3.5 rounded-2xl flex items-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>Canal de Emergencia PNP (Línea 111)</span>
                </button>
              </div>

            </div>

            {/* Columna Derecha: Escaparate Táctico con Tabs (@radix-ui/react-tabs) e Imágenes */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-200/50">
                
                <Tabs.Root defaultValue="centro-monitoreo" className="space-y-3">
                  {/* Pestañas Radix UI: 2 pestañas limpias sin emojis */}
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

                  {/* PESTAÑA 1: Imagen del Centro de Monitoreo Territorial */}
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
                      {/* Overlay gradiente */}
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

                  {/* PESTAÑA 2: Fotografía Documental de Comercio Protegido en Lima */}
                  <Tabs.Content value="comercio" className="space-y-3 outline-none">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-950 group">
                      <Image
                        src="/images/vigia_bodega.jpg"
                        alt="Comerciante de bodega en Lima informándose sobre seguridad territorial con VIGIA"
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
                          &ldquo;Conocer el nivel de denuncias en nuestro sector nos permite prevenir y alertar a las autoridades antes de ceder a la extorsión.&rdquo;
                        </div>
                        <div className="text-[10px] text-slate-300 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-blue-400" />
                          <span>Bodegas, talleres y transporte en Lima</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
                      <span>Información territorial orientada a comerciantes</span>
                      <Link
                        href="/"
                        className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                      >
                        <span>Ver Análisis</span>
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

      {/* 4. FRANJA DE IMPACTO Y CIFRAS REALES (Azul, Blanco, Rojo) */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* KPI 1: Denuncias Oficiales PNP (Azul) */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold mb-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Denuncias Policiales Registradas</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                49,207
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                Datos oficiales de la Policía Nacional del Perú entre enero de 2018 y julio de 2026.
              </p>
            </div>

            {/* KPI 2: Cobertura Territorial (Blanco / Azul) */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-bold mb-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Cobertura Territorial</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                50 Distritos
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                Monitoreo georreferenciado en todo Lima Metropolitana y la Provincia Constitucional del Callao.
              </p>
            </div>

            {/* KPI 3: Canal de Auxilio Oficial (Rojo) */}
            <div className="bg-red-50/60 border border-red-200 p-5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-red-700 text-xs font-bold mb-1.5">
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Central Especializada Antiextorsión</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight font-mono">
                Línea 111
              </div>
              <p className="text-xs text-red-800/80 font-medium mt-1.5 leading-relaxed">
                Canal oficial y confidencial de la PNP con atención inmediata las 24 horas del día.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MODAL RADIX UI DE CANALES DE EMERGENCIA PNP */}
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
                    Atención de extorsiones y secuestros en Lima y Callao
                  </p>
                </div>
              </div>
              <Dialog.Close className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-xs text-slate-600 font-medium leading-relaxed">
              VIGIA es una herramienta cívica y comunitaria de consulta preventiva. En caso de riesgo o amenaza activa, comunícate directamente con la Policía Nacional del Perú:
            </Dialog.Description>

            <div className="space-y-2.5">
              <a
                href="tel:111"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-3.5 rounded-2xl flex items-center justify-between transition-colors shadow-md shadow-red-600/20"
              >
                <div>
                  <div className="text-sm font-black">Línea 111 (Central PNP Extorsiones)</div>
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
              <strong>Recomendación PNP:</strong> No elimines mensajes, audios ni capturas de pantalla de los extorsionadores; constituyen evidencia pericial para la fiscalía.
            </div>

            <div className="pt-1 flex justify-end">
              <Dialog.Close className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors">
                Cerrar
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* 6. Footer Mínimo del Hero */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-800">VIGIA Perú</span>
            <span>· Monitoreo Territorial e Inteligencia Preventiva</span>
          </div>
          <div>
            <span>Dataset Policial PNP (Enero 2018 – Julio 2026) · Plataforma Cívica Independiente</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
