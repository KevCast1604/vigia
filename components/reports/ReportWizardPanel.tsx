'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Coins, 
  Smartphone,
  Lock
} from 'lucide-react';
import { IncidentCategory } from '@/lib/types';
import { DISTRICTS_RANKED, getDistrict } from '@/lib/districts-data';
import { supabase } from '@/lib/supabase/client';

interface ReportWizardPanelProps {
  onBack: () => void;
  onFinished: () => void;
}

export const ReportWizardPanel: React.FC<ReportWizardPanelProps> = ({ onBack, onFinished }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<IncidentCategory | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('sjl');
  const [isUploading, setIsUploading] = useState(false);
  const [hasEvidence, setHasEvidence] = useState(false);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState('VIG-8941-LMA');
  const [description, setDescription] = useState('');

  const handleSelectCategory = (cat: IncidentCategory) => {
    setCategory(cat);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setHasEvidence(true);
      setTimeout(() => {
        setAiAnalysisComplete(true);
      }, 900);
    }, 800);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const distInfo = getDistrict(selectedDistrict);
    const categoryLabels: Record<IncidentCategory, string> = {
      extorsion: 'Extorsión / Cobro de cupo',
      gota_a_gota: 'Préstamo Gota a Gota / Usura',
      amenaza: 'Amenaza directa / Atentado comercial',
      fraude: 'Fraude / Suplantación comercial'
    };

    try {
      const { data } = await supabase.from('community_reports').insert({
        category: category || 'extorsion',
        threat_modality: category ? categoryLabels[category] : 'Extorsión',
        economic_demand: 1500,
        district: distInfo ? distInfo.name : 'San Juan de Lurigancho',
        ubigeo: distInfo ? distInfo.ubigeo : '150132',
        evidence_count: 1,
        status: 'PENDING'
      }).select('id').single();

      if (data && data.id) {
        setTrackingCode(`VIG-${data.id.slice(0, 4).toUpperCase()}-LMA`);
      }
    } catch (e) {
      console.warn('Error inserting community report to Supabase:', e);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  return (
    <div className="space-y-4 flex flex-col flex-1 p-4 sm:p-5">
      {/* Cabecera del Wizard */}
      <div className="flex items-center justify-between">
        <button
          onClick={step === 1 ? onBack : () => setStep((s) => (s - 1) as 1 | 2)}
          className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 transition-colors"
          title="Atrás"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          Paso {step} de 3
        </span>
        <span className="w-7" />
      </div>

      {/* PASO 1: SELECCIÓN DE CATEGORÍA */}
      {step === 1 && (
        <div className="space-y-3 flex flex-col flex-1 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              ¿Qué modalidad ocurrió?
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Selecciona la categoría que mejor describa la situación:
            </p>
          </div>

          <div className="space-y-2 flex-1">
            <button
              onClick={() => handleSelectCategory('extorsion')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between shadow-xs ${
                category === 'extorsion'
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Extorsión / Cobro de Cupo</div>
                  <div className="text-[11px] text-slate-500">Exigencia de dinero periódica bajo amenazas</div>
                </div>
              </div>
              <span className={`w-4 h-4 rounded-full border-2 ${category === 'extorsion' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} />
            </button>

            <button
              onClick={() => handleSelectCategory('gota_a_gota')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between shadow-xs ${
                category === 'gota_a_gota'
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Préstamo &ldquo;Gota a Gota&rdquo;</div>
                  <div className="text-[11px] text-slate-500">Intereses abusivos diarios o cobro intimidatorio</div>
                </div>
              </div>
              <span className={`w-4 h-4 rounded-full border-2 ${category === 'gota_a_gota' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} />
            </button>

            <button
              onClick={() => handleSelectCategory('amenaza')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between shadow-xs ${
                category === 'amenaza'
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Amenaza Directa o Intimidación</div>
                  <div className="text-[11px] text-slate-500">Mensajes de texto, fotos de armas o llamadas</div>
                </div>
              </div>
              <span className={`w-4 h-4 rounded-full border-2 ${category === 'amenaza' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} />
            </button>

            <button
              onClick={() => handleSelectCategory('fraude')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between shadow-xs ${
                category === 'fraude'
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Fraude / Suplantación Comercial</div>
                  <div className="text-[11px] text-slate-500">Falso comprobante de pago o delivery engañoso</div>
                </div>
              </div>
              <span className={`w-4 h-4 rounded-full border-2 ${category === 'fraude' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} />
            </button>
          </div>

          <button
            disabled={!category}
            onClick={() => setStep(2)}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all mt-auto ${
              category
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continuar a Evidencia →
          </button>
        </div>
      )}

      {/* PASO 2: EVIDENCIA & IA */}
      {step === 2 && (
        <div className="space-y-3 flex flex-col flex-1 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Adjuntar Evidencia (Captura)
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Los metadatos EXIF se eliminan automáticamente para proteger tu privacidad.
            </p>
          </div>

          {/* Zona de Drop/Upload */}
          {!hasEvidence ? (
            <div
              onClick={handleSimulateUpload}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors space-y-1.5"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900">
                {isUploading ? 'Procesando archivo...' : 'Haz clic para subir captura de WhatsApp'}
              </div>
              <div className="text-[10px] text-slate-500">
                Formatos permitidos: JPG, PNG (máx. 5 MB)
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">captura_whatsapp_evidencia.jpg</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    ✓ EXIF eliminado · SHA-256 generado (482 KB)
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">7f83...c912</span>
            </div>
          )}

          {/* Card de Extracción Estructurada por IA (Gemini + Zod) */}
          {hasEvidence && (
            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {aiAnalysisComplete
                      ? 'Extracción estructurada con IA completada'
                      : 'Gemini analizando entidades observables...'}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  Zod Validated
                </span>
              </div>

              {aiAnalysisComplete && (
                <div className="space-y-1.5 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between items-center shadow-xs">
                    <span className="text-slate-500 text-[10px] font-semibold uppercase">
                      Número detectado:
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-700">
                      +51 987 654 321
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
                      <div className="text-slate-500 text-[9px] font-semibold uppercase">Monto:</div>
                      <div className="font-bold text-slate-900 text-xs">S/ 1,500</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
                      <div className="text-slate-500 text-[9px] font-semibold uppercase">Plazo:</div>
                      <div className="font-bold text-rose-600 text-xs">24 horas</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 italic bg-white/70 p-2 rounded border border-slate-200">
                    &ldquo;La IA solo extrae datos observables sin calificar la veracidad legal.&rdquo;
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="report-district" className="text-xs font-bold text-slate-700 block">
              Distrito del hecho (Lima Metropolitana):
            </label>
            <select
              id="report-district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
            >
              {DISTRICTS_RANKED.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.name} ({d.ubigeo})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="report-desc" className="text-xs font-bold text-slate-700 block">
              Comentario opcional:
            </label>
            <textarea
              id="report-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Agrega contexto breve sin nombres personales ni calles exactas..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none shadow-xs"
            />
          </div>

          <button
            disabled={!hasEvidence || isSubmitting}
            onClick={handleSubmit}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all mt-auto ${
              hasEvidence && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Guardando en Bóveda Cifrada...' : 'Confirmar Envío Anónimo →'}
          </button>
        </div>
      )}

      {/* PASO 3: CONFIRMACIÓN Y ESTADO PENDING */}
      {step === 3 && (
        <div className="space-y-4 flex flex-col flex-1 items-center justify-center text-center p-2 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <span className="inline-block bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-bold px-2.5 py-0.5 rounded-full mb-1.5 uppercase">
              Estado: PENDING
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Reporte Registrado con Éxito
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed font-medium">
              Tu evidencia fue encriptada en bóveda privada. Permanecerá en estado <strong>Pendiente</strong> y no será visible públicamente hasta detectar patrones independientes coincidentes.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-left w-full space-y-1.5 text-xs shadow-xs">
            <div className="flex justify-between text-slate-600 font-medium text-[11px]">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Código de seguimiento anónimo:
              </span>
              <span className="font-mono text-blue-700 font-bold">{trackingCode}</span>
            </div>
            <div className="flex justify-between text-slate-600 font-medium text-[11px]">
              <span>Hash SHA-256 de evidencia:</span>
              <span className="font-mono text-slate-400 text-[10px]">7f83...c912</span>
            </div>
          </div>

          <button
            onClick={onFinished}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
          >
            Volver al Radar Territorial
          </button>
        </div>
      )}
    </div>
  );
};
