'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  Compass, 
  Users, 
  Scale, 
  HelpCircle, 
  PhoneCall, 
  ArrowRight, 
  Menu, 
  X,
  MapPin
} from 'lucide-react';

interface LandingNavbarProps {
  onOpenEmergencyModal: () => void;
}

export default function LandingNavbar({ onOpenEmergencyModal }: LandingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Nosotros', href: '#nosotros', icon: Shield },
    { label: 'Cómo Funciona', href: '#como-funciona', icon: Compass },
    { label: 'Patrón VIGIA', href: '#patron-vigia', icon: Users },
    { label: 'Privacidad', href: '#privacidad', icon: Scale },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* 1. Logotipo Institucional VIGIA */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/vigia-logo.jpg"
              alt="Logo VIGIA"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl object-contain border border-slate-200/80 bg-white shadow-xs group-hover:border-blue-300 transition-colors shrink-0"
              priority
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  VIGIA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Monitoreo Territorial de Extorsión e Inteligencia Preventiva
              </p>
            </div>
          </Link>

          {/* 2. Navegación Desktop de Secciones (Scroll Suave a Anclas) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold text-slate-600 hover:text-blue-700 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 3. Acciones Desktop: Auxilio PNP + Abrir Radar */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenEmergencyModal}
              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>Canales PNP (111)</span>
            </button>

            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-200" />
              <span>Abrir Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4. Botones para Móviles (< sm / < lg) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenEmergencyModal}
              className="bg-red-50 text-red-700 border border-red-200 p-2 rounded-xl flex items-center justify-center transition-colors"
              title="Línea 111 PNP"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>
          </div>

          {/* Botón Hamburguesa para tablets (sm a lg) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Menú Desplegable Móvil (Drawer / Dropdown con Animación) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-3 duration-200 space-y-4">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3">
            Secciones de la Plataforma
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <Link
              href="/"
              onClick={handleNavClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-blue-200" />
              <span>Abrir Radar Territorial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEmergencyModal();
              }}
              className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Canales de Emergencia PNP (Línea 111)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
