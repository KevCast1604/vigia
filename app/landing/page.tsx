import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function LandingPlaceholderPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center space-y-6">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
          <Shield className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Landing Page en Construcción
          </span>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Conoce el Proyecto VIGIA
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Aquí estará la presentación institucional de VIGIA, casos de uso para comerciantes, transparencia de datos oficiales e impacto comunitario.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Radar de Seguridad</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
