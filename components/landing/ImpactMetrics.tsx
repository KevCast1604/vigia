'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, MapPin, PhoneCall } from 'lucide-react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatNumber?: boolean;
}

function AnimatedCounter({ 
  target, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  formatNumber = true 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const currentVal = Math.round(easedProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, target, duration]);

  const displayValue = formatNumber ? count.toLocaleString('en-US') : count;

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  return (
    <section className="bg-white border-b border-slate-200 py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Indicadores Reales de Seguridad
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Magnitud de la extorsion en cifras oficiales
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Datos estructurados a partir del registro policial oficial de la PNP en la capital y el primer puerto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* KPI 1: Denuncias Oficiales PNP (Azul) */}
          <div className="bg-slate-50 border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-xs transition-all hover:border-blue-300 hover:shadow-md group">
            <div className="flex items-center gap-2.5 text-blue-700 text-xs font-bold mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>Denuncias Policiales Registradas</span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-mono py-1">
              <AnimatedCounter target={49207} duration={2200} />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
              Total historico oficial procesado entre enero de 2018 y julio de 2026 en dependencias policiales.
            </p>
          </div>

          {/* KPI 2: Cobertura Territorial (Blanco / Azul) */}
          <div className="bg-slate-50 border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-xs transition-all hover:border-blue-300 hover:shadow-md group">
            <div className="flex items-center gap-2.5 text-slate-700 text-xs font-bold mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span>Cobertura Territorial</span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-mono py-1">
              <AnimatedCounter target={50} duration={1800} suffix=" Distritos" />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
              Monitoreo y analisis espacial en todo Lima Metropolitana y la Provincia Constitucional del Callao.
            </p>
          </div>

          {/* KPI 3: Canal de Auxilio Oficial (Rojo) */}
          <div className="bg-red-50/70 border border-red-200 p-6 sm:p-7 rounded-3xl shadow-xs transition-all hover:border-red-300 hover:shadow-md group">
            <div className="flex items-center gap-2.5 text-red-700 text-xs font-bold mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span>Central Especializada Antiextorsion</span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 tracking-tight font-mono py-1">
              <AnimatedCounter target={111} duration={1400} prefix="Linea " formatNumber={false} />
            </div>
            <p className="text-xs text-red-800/80 font-medium mt-2 leading-relaxed">
              Atencion telefonica gratuita y confidencial de la Division de Secuestros y Extorsiones PNP (24/7).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
