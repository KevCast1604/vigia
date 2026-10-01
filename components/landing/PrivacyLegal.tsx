'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Lock, 
  EyeOff, 
  FileCheck2, 
  MapPinOff, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function PrivacyLegal() {
  const guarantees = [
    {
      title: 'Anonimato Irreversible',
      subtitle: 'Privacy by Design',
      description: 'No solicitamos nombres, DNI, correos electrónicos ni teléfonos. No requerimos registro de cuentas ni almacenamos direcciones IP en los reportes.',
      icon: EyeOff,
      badge: 'Cero Identificadores'
    },
    {
      title: 'Agregación Territorial Macro',
      subtitle: 'Protección contra Represalias',
      description: 'Nunca georreferenciamos puntos exactos, fachadas ni direcciones de comercios o viviendas. Toda la información se consolida a escala distrital y sectorial.',
      icon: MapPinOff,
      badge: 'Sin Direcciones Exactas'
    },
    {
      title: 'Cero Listas Negras Públicas',
      subtitle: 'Criptografía y Hashing Ciego',
      description: 'No publicamos directorios abiertos de personas ni acusaciones nominativas, protegiendo a ciudadanos que sufren suplantación en líneas telefónicas prepago.',
      icon: Lock,
      badge: 'Blind SHA-256'
    },
    {
      title: 'Neutralidad y Presunción de Inocencia',
      subtitle: 'Cumplimiento Código Penal',
      description: 'VIGIA reporta hechos observables y patrones comunitarios. No califica culpabilidad, no imputa delitos ni reemplaza a las autoridades judiciales.',
      icon: Scale,
      badge: 'Estricta Neutralidad'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>MARCO NORMATIVO Y PROTECCIÓN DE DATOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Escudo de Privacidad y Cumplimiento Legal (Ley N° 29733)
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            La protección de las víctimas y la rigurosidad legal son el pilar fundamental de VIGIA. Nuestra arquitectura tecnológica está diseñada desde el origen para evitar la revictimización y garantizar la seguridad física y jurídica de la comunidad.
          </p>
        </div>

        {/* 4 Pilares de Garantía */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all hover:shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-base font-black text-slate-900 tracking-tight mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Protección activa</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Institucional Normativo */}
        <div className="bg-white border-2 border-blue-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h4 className="text-base font-black text-slate-900 tracking-tight">
                Alineamiento con los lineamientos de la ANPDP (Minjus)
              </h4>
              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                Ley N° 29733
              </span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              En el Perú, más del 80% de las líneas telefónicas utilizadas para extorsionar provienen de chips prepago adquiridos bajo suplantación de identidad. Publicar listas negras no oficiales expondría a ciudadanos inocentes a linchamientos y difamación (Arts. 131 y 132 del Código Penal). Por ello, VIGIA opera exclusivamente como un radar de patrones comunitarios y canalizador oficial ante la PNP.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            <span>Auditable y Seguro</span>
          </div>
        </div>

      </div>
    </section>
  );
}
