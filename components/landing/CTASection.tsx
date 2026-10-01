'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, PhoneCall } from 'lucide-react';

interface CTASectionProps {
  onOpenEmergencyModal: () => void;
}

export default function CTASection({ onOpenEmergencyModal }: CTASectionProps) {
  return (
    <section className="bg-white border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 relative overflow-hidden">
          {/* Grilla sutil de fondo */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold">
              <FileText className="w-3.5 h-3.5 text-blue-300" />
              <span>Asistente de Reporte Activo en la Plataforma</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              ¿Fuiste testigo o recibiste una amenaza? Tu reporte previene a tu distrito.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              El proceso toma menos de 2 minutos. Selecciona la modalidad, el distrito y registra los detalles de forma segura y anónima para alimentar el mapa territorial.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 relative z-10">
            <Link
              href="/"
              className="bg-white hover:bg-blue-50 text-blue-900 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Generar Reporte Anónimo en la App</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>

            <button
              type="button"
              onClick={onOpenEmergencyModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl flex items-center gap-2 transition-colors shadow-md shadow-red-600/30"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Canal de Emergencia PNP (111)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
