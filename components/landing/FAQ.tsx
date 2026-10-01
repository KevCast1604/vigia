'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  PhoneCall, 
  Lock,
  Database,
  Bot,
  AlertTriangle
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'que-es-vigia',
    question: '¿Qué es VIGIA y cuál es su objetivo principal?',
    answer: 'VIGIA es una plataforma cívica e independiente de inteligencia comunitaria y prevención territorial frente a delitos como la extorsión, cobro de cupos y préstamos extorsivos gota a gota en Lima Metropolitana y el Callao. Su objetivo es visibilizar datos oficiales, conectar alertas ciudadanas anónimas y canalizar el auxilio formal hacia la Policía Nacional del Perú (PNP).',
    category: 'General',
    icon: HelpCircle
  },
  {
    id: 'reemplaza-denuncia',
    question: '¿VIGIA reemplaza una denuncia policial o proceso judicial?',
    answer: 'No. VIGIA es una herramienta informativa, preventiva y de articulación vecinal. La plataforma no determina culpabilidad legal ni reemplaza a las autoridades competentes. Si te encuentras bajo una amenaza activa o extorsión en curso, debes comunicarte de inmediato con los canales oficiales del Estado: la Línea 111 de la PNP (atención 24/7) o la Central 105.',
    category: 'Legal y Seguridad',
    icon: ShieldCheck
  },
  {
    id: 'fuente-datos',
    question: '¿De dónde provienen los datos estadísticos que se muestran en el radar?',
    answer: 'Los datos históricos del radar territorial provienen del dataset oficial de denuncias policiales registrado por la Policía Nacional del Perú (PNP). La base consolidada abarca desde enero de 2018 hasta julio de 2026, comprendiendo un total de 49,207 denuncias de extorsión georreferenciadas a nivel de los 50 distritos de Lima Metropolitana y el Callao.',
    category: 'Datos Oficiales',
    icon: Database
  },
  {
    id: 'privacidad-anonimato',
    question: '¿Es realmente anónimo registrar un reporte en la plataforma?',
    answer: 'Sí, el anonimato es total. No solicitamos registro de usuario, nombres, DNI, teléfono ni correo electrónico. Asimismo, jamás publicamos direcciones exactas ni puntos puntuales sobre la ubicación de locales o domicilios; los datos se agregan exclusivamente a nivel de distrito y sector para salvaguardar la privacidad e integridad de las víctimas, en estricto cumplimiento con la Ley N° 29733.',
    category: 'Privacidad',
    icon: Lock
  },
  {
    id: 'patron-vigia',
    question: '¿Qué es el "Patrón VIGIA" y cómo funciona?',
    answer: 'Un reporte ciudadano individual nunca se publica como un hecho comprobado ni como una acusación. Cuando se reciben reportes independientes en una misma zona que describen modalidades afines (por ejemplo, cobros con montos similares o modalidades idénticas de coacción), el sistema consolida un "Patrón VIGIA" para advertir preventivamente a otros comerciantes y transportistas del sector.',
    category: 'Comunidad',
    icon: AlertTriangle
  },
  {
    id: 'inteligencia-artificial',
    question: '¿Cómo interviene la Inteligencia Artificial al subir evidencia?',
    answer: 'La Inteligencia Artificial se utiliza únicamente para asistir en la extracción observable y estructuración de información contenida en capturas de pantalla de mensajes intimidatorios (por ejemplo: identificar números telefónicos, cuentas bancarias mencionadas o montos solicitados). Esto evita que la víctima deba llenar extensos formularios durante una situación de crisis. La IA no califica culpabilidad ni emite juicios de valor.',
    category: 'Tecnología e IA',
    icon: Bot
  },
  {
    id: 'protocolo-amenaza',
    question: '¿Qué debo hacer si recibo un mensaje extorsivo en este momento?',
    answer: 'Recomendamos 4 pasos inmediatos: 1) Mantén la calma y no realices transferencias de dinero de manera precipitada. 2) No borres las conversaciones, audios, fotos ni capturas de pantalla, ya que constituyen evidencia pericial válida ante la fiscalía. 3) Comunícate directamente a la Línea 111 de la PNP para recibir orientación especializada. 4) Registra tu reporte anónimo en VIGIA para proteger a los vecinos de tu distrito.',
    category: 'Protocolo de Emergencia',
    icon: PhoneCall
  },
  {
    id: 'costo-plataforma',
    question: '¿El uso de VIGIA tiene algún costo?',
    answer: 'No. VIGIA es una iniciativa ciudadana 100% gratuita y de acceso público para cualquier comerciante, emprendedor, transportista o ciudadano que necesite consultar el nivel de riesgo de su zona o reportar un incidente de forma protegida.',
    category: 'General',
    icon: HelpCircle
  }
];

interface FAQProps {
  onOpenEmergencyModal?: () => void;
}

export default function FAQ({ onOpenEmergencyModal }: FAQProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'que-es-vigia': true,
    'reemplaza-denuncia': true
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Encabezado */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>RESPUESTAS CLARAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Preguntas Frecuentes
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Resolvemos las principales consultas sobre el funcionamiento de la plataforma, el tratamiento de los datos oficiales y los mecanismos de protección de la privacidad.
          </p>
        </div>

        {/* Lista de Acordeones */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openItems[item.id];
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl transition-all duration-200 shadow-2xs overflow-hidden ${
                  isOpen ? 'border-blue-300 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-blue-50 text-blue-700' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
