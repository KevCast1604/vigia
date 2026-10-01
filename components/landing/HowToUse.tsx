'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Layers, 
  ShieldAlert, 
  PhoneCall, 
  ArrowRight, 
  ArrowLeft,
  Compass, 
  Check, 
  ShieldCheck,
  AlertTriangle,
  FileText,
  Search,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface HowToUseProps {
  onOpenEmergencyModal: () => void;
}

export default function HowToUse({ onOpenEmergencyModal }: HowToUseProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Ubica y Selecciona tu Distrito',
      badge: 'Paso 1 · Territorial',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: MapPin,
      summary: 'Navega en el mapa interactivo o busca en el menú desplegable para enfocar cualquiera de los 50 distritos monitoreados en Lima y Callao.',
      bulletPoints: [
        'Cobertura total en los 43 distritos de Lima Metropolitana y los 7 del Callao.',
        'Visualización de sectores representativos sin exponer locales vulnerables.',
        'Acceso directo sin necesidad de crear cuenta ni descargar aplicaciones.'
      ],
      simulationType: 'map-district'
    },
    {
      stepNumber: '02',
      title: 'Evalúa la Incidencia y Tendencia',
      badge: 'Paso 2 · Datos Oficiales',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Layers,
      summary: 'Analiza el volumen acumulado de 49,207 denuncias de extorsión (PNP 2018–2026) y revisa si la curva histórica en tu zona está en aumento.',
      bulletPoints: [
        'Registro policial oficial georreferenciado por ubigeos distritales.',
        'Curva anual comparativa para detectar si el cobro de cupos se ha disparado.',
        'Distinción nítida entre estadísticas oficiales y alertas comunitarias.'
      ],
      simulationType: 'stats-trend'
    },
    {
      stepNumber: '03',
      title: 'Aplica el Protocolo Preventivo',
      badge: 'Paso 3 · Autoprotección',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: ShieldAlert,
      summary: 'Conoce las modalidades habituales (cobro de cupos a bodegas, gota a gota, mensajes extorsivos) y activa medidas de resguardo para tu negocio.',
      bulletPoints: [
        'No borres chats, audios, fotos de armas ni números de cuenta bancaria.',
        'Evita transferir dinero de forma precipitada; el pago perpetúa la amenaza.',
        'Comprueba si otros vecinos del distrito ya reportaron una modalidad similar.'
      ],
      simulationType: 'checklist-security'
    },
    {
      stepNumber: '04',
      title: 'Canaliza tu Reporte y Denuncia PNP',
      badge: 'Paso 4 · Acción Legal',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      icon: PhoneCall,
      summary: 'Registra un reporte anónimo en VIGIA para activar el Patrón Vecinal y comunícate de inmediato con la Línea 111 de la Policía Nacional.',
      bulletPoints: [
        'Reporte anónimo en menos de 2 minutos sin datos personales ni registros.',
        'Asistencia de IA para estructurar evidencia fotográfica de los mensajes.',
        'Llamada gratuita y confidencial a la Central 111 de la PNP las 24 horas.'
      ],
      simulationType: 'emergency-call'
    }
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  return (
    <section className="bg-white border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10 lg:space-y-14">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>GUÍA INTERACTIVA DE ACCIÓN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Cómo utilizar la plataforma VIGIA
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Sigue este protocolo secuencial interactivo para consultar tu distrito, verificar incidentes y actuar con respaldo policial ante cualquier amenaza.
          </p>
        </div>

        {/* Stepper Horizontal Interactivo (Barra de Navegación de Pasos) */}
        <div className="relative">
          {/* Barra conectora de fondo */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {steps.map((item, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;
              const Icon = item.icon;

              return (
                <button
                  key={item.stepNumber}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center gap-3 focus:outline-none ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-[1.02]'
                      : isPast
                      ? 'bg-blue-50/60 border-blue-200 text-slate-800 hover:border-blue-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-black transition-colors ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : isPast
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}>
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : item.stepNumber}
                  </div>

                  <div className="min-w-0">
                    <span className={`text-[10px] font-black uppercase tracking-wider block ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}>
                      Paso {idx + 1}
                    </span>
                    <span className={`text-xs font-bold truncate block ${
                      isActive ? 'text-white' : 'text-slate-800'
                    }`}>
                      {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Escaparate Interactivo del Paso Activo (Split Card) */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Instrucciones y Guía del Paso */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {activeStep + 1} de {steps.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {current.summary}
                </p>
              </div>

              {/* Puntos Clave */}
              <div className="space-y-2.5 pt-2">
                {current.bulletPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Botones de Navegación de Pasos */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
                    title="Paso anterior"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md shadow-blue-600/20"
                  >
                    <span>{activeStep === steps.length - 1 ? 'Volver al Inicio' : 'Siguiente Paso'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Indicadores de bolitas */}
                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStep(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeStep === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Ir al paso ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Simulación Visual Contextual */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
                
                {/* Cabecera de la simulación */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-slate-800 tracking-tight">
                      Módulo en Acción
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Interactivo
                  </span>
                </div>

                {/* Simulación Paso 1: Selector Distrital */}
                {current.simulationType === 'map-district' && (
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Distrito Seleccionado</span>
                        <span className="text-blue-600 font-mono">Lima & Callao</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-blue-400 ring-2 ring-blue-500/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-100" />
                          <span className="text-xs font-black text-slate-900">Callao (Cercado)</span>
                        </div>
                        <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          Muy Alto
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
                        <span>San Juan de Lurigancho</span>
                        <span className="font-mono text-slate-500">6,182 denuncias</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
                        <span>Ventanilla (Callao)</span>
                        <span className="font-mono text-slate-500">803 denuncias</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium text-center">
                      El mapa enfoca automáticamente el distrito seleccionado con acercamiento suave.
                    </p>
                  </div>
                )}

                {/* Simulación Paso 2: Gráfico de Tendencias */}
                {current.simulationType === 'stats-trend' && (
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                          Histórico Oficial (PNP)
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">2018–2026</span>
                      </div>
                      
                      <div className="space-y-2 pt-1 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-[10px] text-slate-500">2018</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full w-[25%]" />
                          </div>
                          <span className="text-[10px] text-slate-600 w-10 text-right">2,114</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-[10px] text-slate-500">2023</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full w-[70%]" />
                          </div>
                          <span className="text-[10px] text-slate-600 w-10 text-right">8,450</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-[10px] font-bold text-red-600">2024</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full w-[95%]" />
                          </div>
                          <span className="text-[10px] font-bold text-red-600 w-10 text-right">11,200</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Datos contrastados con 49,207 denuncias de extorsión.</span>
                    </div>
                  </div>
                )}

                {/* Simulación Paso 3: Checklist Preventivo */}
                {current.simulationType === 'checklist-security' && (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Regla de Oro ante Mensajes Intimidatorios:</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                        No elimines chats ni fotos enviadas por los extorsionadores. Constituyen evidencia penal.
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Toma capturas de pantalla de chats completos.</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Apunta números de cuenta bancaria o Yape solicitados.</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Consulta si tu distrito tiene alertas en el radar.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Simulación Paso 4: Central de Emergencia */}
                {current.simulationType === 'emergency-call' && (
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-md shadow-red-600/20">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl font-black text-red-700 font-mono">
                          Línea 111 PNP
                        </div>
                        <div className="text-[11px] text-red-800 font-medium">
                          División de Secuestros y Extorsiones (DIRINCRI)
                        </div>
                      </div>
                      <p className="text-[10px] text-red-700/90 font-normal">
                        Atención gratuita las 24 horas a nivel nacional.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenEmergencyModal}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Ver Canales Oficiales PNP</span>
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Tarjeta de Acción Inmediata al Radar */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              ¿Listo para consultar las estadísticas territoriales de tu distrito?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Accede directamente al radar interactivo sin registros previos.
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
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors"
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
