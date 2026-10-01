'use client';

import React from 'react';
import Image from 'next/image';
import { Target, Eye, Shield, CheckCircle2 } from 'lucide-react';

export default function MissionVision() {
  return (
    <section className="bg-white border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        
        {/* Encabezado de la Seccion */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>PROPOSITO Y COMPROMISO SOCIAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Mision y vision para una ciudad libre de extorsion
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Guiados por la conviccion de que la informacion veraz y la organizacion ciudadana son los pilares indispensables para enfrentar la delincuencia organizada y defender el esfuerzo diario de nuestras familias.
          </p>
        </div>

        {/* Tarjetas de Mision y Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Tarjeta: Mision (Azul) */}
          <div className="bg-slate-50 border-2 border-blue-100 rounded-3xl p-7 sm:p-9 shadow-xs flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-blue-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Nuestro Mandato Civico
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Mision
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Empoderar a comerciantes, transportistas, vecinos y gremios de Lima y Callao mediante el acceso transparente y oportuno a datos policiales georreferenciados, reduciendo la asimetria de informacion y fortaleciendo la articulacion formal con la Policia Nacional del Peru para prevenir el pago de cupos y frenar la extorsion.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Democratizar 49,207 registros policiales oficiales con total neutralidad metodologica.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Respaldar a los negocios de barrio frente a la coaccion de bandas criminales y prestamos ilegales.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Canalizar y fomentar la denuncia pericial oportuna a traves de la Linea 111 de la PNP.</span>
              </div>
            </div>
          </div>

          {/* Tarjeta: Vision (Ambar / Azul) */}
          <div className="bg-slate-50 border-2 border-amber-100 rounded-3xl p-7 sm:p-9 shadow-xs flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-amber-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/25">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Nuestro Horizonte Futuro
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Vision
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Ser la plataforma civico-tecnologica de inteligencia territorial y prevencion criminal mas confiable y utilizada del Peru, transformando datos publicos en un escudo comunitario eficaz para construir ciudades seguras, resilientes y libres de coaccion donde ningun emprendedor deba pagar para trabajar en paz.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Consolidar la cobertura analitica continua en todos los distritos urbanos del pais.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Inspirar politicas publicas de seguridad ciudadana basadas en evidencia territorial verificada.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Construir una red ciudadana informada que erradique el miedo y la cultura del pago de cupos.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Imagen Documental Panoramica de la Economia y Comunidad Real */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-950 group">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full min-h-[220px]">
            <Image
              src="/images/vigia_mission_vision.jpg"
              alt="Calle comercial activa en Lima con comerciantes y ciudadanos caminando con libertad y seguridad"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-4 left-4 sm:left-8 sm:bottom-6 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-block bg-blue-600 text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                El Compromiso VIGIA
              </div>
              <h4 className="text-sm sm:text-lg font-black leading-snug">
                Mercados, bodegas y familias trabajadoras: la razon de ser de nuestra labor civica.
              </h4>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-mono shrink-0">
              50 Distritos Monitoreados · Lima y Callao
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
