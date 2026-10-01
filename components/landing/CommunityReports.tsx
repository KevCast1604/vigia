'use client';

import React from 'react';
import { 
  Users, 
  Lock, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  Coins, 
  Store 
} from 'lucide-react';

interface CommunityReportsProps {
  onOpenEmergencyModal?: () => void;
}

export default function CommunityReports({ onOpenEmergencyModal: _onOpenEmergencyModal }: CommunityReportsProps) {
  const modalities = [
    {
      title: 'Cobro de Cupos a Negocios',
      subtitle: 'Comercio y Transporte',
      description: 'Exigencias de pagos diarios, semanales o mensuales a bodegas, talleres, colegios o choferes bajo amenaza de atentado.',
      icon: Store,
      color: 'blue'
    },
    {
      title: 'Prestamos Gota a Gota',
      subtitle: 'Usura y Coaccion',
      description: 'Cobros diarios abusivos con metodos violentos y amenazas patrimoniales contra familias y pequenos comerciantes.',
      icon: Coins,
      color: 'amber'
    },
    {
      title: 'Amenazas por Mensajeria',
      subtitle: 'WhatsApp y Llamadas',
      description: 'Envio de videos intimidatorios, imagenes de armas, granadas o falsos comandantes exigiendo transferencias bancarias.',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <section id="patron-vigia" className="scroll-mt-18 bg-white border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>INTELIGENCIA COLECTIVA Y CIUDADANA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Apoya a tu comunidad con tu reporte para el Patron VIGIA
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Tu reporte anonimo permite identificar modalidades delictivas recurrentes y construir el Patron VIGIA: un escudo preventivo para advertir a otros comerciantes y vecinos antes de que paguen o sean intimidados.
          </p>
        </div>

        {/* Explicacion del Patron VIGIA en 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: Anonimato */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Anonimato y Cero Exposicion
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                No solicitamos tu nombre, documento de identidad ni ubicacion exacta. El sistema esta disenado para proteger la integridad del denunciante en todo momento.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1.5 border-t border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Privacidad garantizada</span>
            </div>
          </div>

          {/* Tarjeta 2: Que es el Patron VIGIA */}
          <div className="bg-amber-50/40 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Construccion del Patron VIGIA
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Al reportar montos exigidos, frecuencia de cobro y sector, se detectan focos criminales activos en distritos de Lima y Callao, evitando que la extorsion opere en silencio.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-amber-800 flex items-center gap-1.5 border-t border-amber-200/80">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Correlacion territorial</span>
            </div>
          </div>

          {/* Tarjeta 3: Canalizacion PNP */}
          <div className="bg-red-50/40 border-2 border-red-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 hover:border-red-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Evidencia para Denuncia Policial
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Te brindamos pautas claras para preservar capturas de pantalla, audios y cuentas bancarias, facilitando que puedas acudir formalmente a la Linea 111 de la PNP.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-red-700 flex items-center gap-1.5 border-t border-red-200/80">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Articulacion con la ley</span>
            </div>
          </div>

        </div>

        {/* Modalidades que puedes reportar */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Modalidades contempladas en el asistente
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Puedes alertar sobre cualquiera de estas tipologias de extorsion e intimidacion:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modalities.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
