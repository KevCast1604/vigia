'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Database, Users, PhoneCall, ArrowRight, Check } from 'lucide-react';

interface AboutUsProps {
  onOpenEmergencyModal: () => void;
}

export default function AboutUs({ onOpenEmergencyModal }: AboutUsProps) {
  return (
    <section id="nosotros" className="scroll-mt-18 bg-white border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        
        {/* Cabecera y Presentacion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Texto Institucional */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>SOBRE NOSOTROS · INICIATIVA CIVICA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Inteligencia territorial para visibilizar y combatir la extorsion en el Peru.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              <strong>VIGIA</strong> es una plataforma civica independiente que nace ante la urgencia de frenar el avance del cobro de cupos, las extorsiones telefonicas y los prestamos ilegales gota a gota que amenazan el sustento diario de bodegueros, transportistas y familias en Lima y Callao.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Frente a la desinformacion y el temor a denunciar, VIGIA transforma registros oficiales de seguridad ciudadana en informacion geografica clara y accesible, permitiendo a la comunidad comprender la concentracion delictiva y actuar de forma coordinada con la policia.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ver Mapa Interactivo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={onOpenEmergencyModal}
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Lineas de Auxilio Policial</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Imagen Documental de Articulacion Comunitaria */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-950 shadow-xl shadow-slate-200/50 group">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/vigia_about.jpg"
                  alt="Equipo civico y vecinos organizados analizando mapas y datos de seguridad en Lima"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>

              {/* Overlay suave inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Badge superior en imagen */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Trabajo Comunitario y Territorial</span>
              </div>

              {/* Pie de foto sobre la imagen */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs sm:text-sm font-semibold leading-snug">
                  Articulacion entre datos policiales y realidad vecinal para recuperar la tranquilidad de nuestros barrios.
                </p>
                <span className="text-[11px] text-slate-300 mt-1 block">
                  Lima Metropolitana y Callao
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pilares Metodologicos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Pilar 1 */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Rigor en Datos Oficiales
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              No generamos especulaciones ni rumores. Toda la estadistica proviene del registro verificado de 49,207 denuncias de la Policia Nacional del Peru entre 2018 y 2026.
            </p>
            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-blue-600" />
              <span>Transparencia metodologica</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Defensa del Comercio Local
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Disenado especificamente para bodegas, farmacias de barrio, ferreterias, comedores y choferes que son los sectores mas expuestos a la coaccion extorsiva.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-amber-600" />
              <span>Foco en la microeconomia</span>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <PhoneCall className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Articulacion con la PNP
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Orientamos activamente al ciudadano a no ceder al pago y acudir de inmediato a los canales especializados de la Policia Nacional del Peru (Linea 111 y Central 105).
            </p>
            <div className="pt-2 text-xs font-bold text-red-700 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-red-600" />
              <span>Canalizacion de denuncia formal</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
