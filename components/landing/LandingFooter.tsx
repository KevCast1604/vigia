'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PhoneCall, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  Scale
} from 'lucide-react';

interface LandingFooterProps {
  onOpenEmergencyModal?: () => void;
}

export default function LandingFooter({ onOpenEmergencyModal }: LandingFooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      {/* Contenido Principal en Grilla */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Columna 1: Marca y Propósito Cívico (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/vigia-logo.jpg"
                alt="Logo VIGIA"
                width={36}
                height={36}
                className="w-9 h-9 rounded-xl object-contain border border-slate-200/80 bg-white shadow-xs group-hover:border-blue-300 transition-colors shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                    VIGIA
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  Inteligencia Territorial y Escudo Antiextorsión
                </p>
              </div>
            </Link>

            <p className="text-slate-600 font-normal leading-relaxed text-xs">
              Iniciativa cívica independiente que transforma registros oficiales de denuncias policiales y alertas ciudadanas anónimas en información territorial para proteger a comerciantes, transportistas y familias.
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <Scale className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Conforme a la Ley N° 29733 de Protección de Datos Personales.</span>
            </div>
          </div>

          {/* Columna 2: Navegación de la Plataforma (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Plataforma
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#nosotros" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Cómo Funciona VIGIA
                </a>
              </li>
              <li>
                <a href="#patron-vigia" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Patrón Comunitario VIGIA
                </a>
              </li>
              <li>
                <a href="#privacidad" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Escudo de Privacidad
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Preguntas Frecuentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Términos y Marco Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Legal y Ética
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/privacidad" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-slate-600 hover:text-blue-700 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.datosabiertos.gob.pe/dataset/denuncias-policiales/resource/64c01d53-4402-4e5a-936a-4bce5b3d1008"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                >
                  <span>Datos Abiertos PNP</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  Código Penal (Arts. 131-132)
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Auxilio PNP y Acceso al Radar (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Auxilio Inmediato y Radar
            </h4>

            {/* Tarjeta de Emergencia PNP */}
            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-700">
                  Línea Gratuita PNP 24/7
                </span>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              </div>
              <a
                href="tel:111"
                className="flex items-center gap-2 text-sm font-black text-red-700 hover:text-red-800 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Central 111 (Extorsiones)</span>
              </a>
              <div className="flex items-center justify-between text-[11px] text-red-800/80 font-medium pt-1 border-t border-red-100">
                <span>Central 105 (Emergencias)</span>
                {onOpenEmergencyModal && (
                  <button
                    type="button"
                    onClick={onOpenEmergencyModal}
                    className="font-bold underline hover:text-red-900"
                  >
                    Ver detalles
                  </button>
                )}
              </div>
            </div>

            {/* Botón de Acceso al Radar */}
            <Link
              href="/"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl shadow-sm flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-200" />
                <span>Abrir Radar Territorial</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* Franja Inferior: Copyright y Descargo de Responsabilidad */}
      <div className="border-t border-slate-200 bg-slate-50 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-[11px] text-slate-500 font-medium">
          <div>
            © 2026 VIGIA Perú · Plataforma Cívica Independiente de Inteligencia Preventiva.
          </div>
          <div className="max-w-xl text-slate-400">
            VIGIA es una herramienta ciudadana y no sustituye los canales de denuncia penal formal de la Policía Nacional del Perú o el Ministerio Público.
          </div>
        </div>
      </div>
    </footer>
  );
}
