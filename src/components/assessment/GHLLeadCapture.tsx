import React, { useState } from 'react';
import { ShieldCheck, Mail, User, Building2, Globe, ArrowRight, Sparkles } from 'lucide-react';

interface GHLLeadCaptureProps {
  score: number;
  bucket: string;
  onCaptured: (data: { name: string; email: string; businessName: string; targetMarket: string }) => void;
  onSkip?: () => void;
  language?: 'en' | 'es';
}

export const GHLLeadCapture: React.FC<GHLLeadCaptureProps> = ({ score, bucket, onCaptured, onSkip, language = 'en' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [targetMarket, setTargetMarket] = useState('US');
  const [submitting, setSubmitting] = useState(false);

  const t = language === 'es' ? {
    title: 'Desbloquea tu Reporte Personalizado',
    subtitle: `Tu puntuación: ${score}/100 — ${bucket}. Ingresa tus datos para descargar el PDF y recibir tu plan de acción.`,
    name: 'Tu Nombre',
    email: 'Email de Trabajo',
    business: 'Empresa / Proyecto',
    market: 'Mercado Objetivo',
    submit: 'Desbloquear Mi Reporte y Descargar PDF',
    skip: 'Omitir — ver resultados directamente',
    privacy: 'Al enviar, aceptas recibir tu reporte y actualizaciones. No spam. GHL seguro.',
    ghlNote: 'Lead capturado en GoHighLevel y Teable.',
  } : {
    title: 'Unlock Your Personalized Report',
    subtitle: `Your score: ${score}/100 — ${bucket}. Enter details to download the PDF and get your action plan.`,
    name: 'Your Name',
    email: 'Work Email',
    business: 'Company / Project',
    market: 'Target Market',
    submit: 'Unlock My Report & Download PDF',
    skip: 'Skip — view results directly',
    privacy: 'By submitting you agree to receive your report and updates. No spam. Secure GHL capture.',
    ghlNote: 'Lead synced to GoHighLevel & Teable.',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = { name, email, businessName, targetMarket, score, bucket, source: 'chatgpt-ads-diagnostic', timestamp: new Date().toISOString() };
    
    // 1) Store locally for report personalization
    try { localStorage.setItem('chatgpt_ads_lead', JSON.stringify(payload)); } catch {}
    
    // 2) Optional GHL webhook — set VITE_GHL_WEBHOOK_URL / NEXT_PUBLIC_GHL_FORM_URL in Vercel env
    const ghlUrl = (import.meta as any).env?.VITE_GHL_WEBHOOK_URL || (import.meta as any).env?.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (ghlUrl) {
      try { await fetch(ghlUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch {}
    }
    // 3) Also POST to /api/ghl-lead if exists (Teable sync)
    try { await fetch('/api/ghl-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch {}

    setTimeout(() => {
      setSubmitting(false);
      onCaptured({ name, email, businessName, targetMarket });
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black">{t.title}</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1"><User className="w-3.5 h-3.5" /> {t.name}</label>
              <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Miller" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1"><Mail className="w-3.5 h-3.5" /> {t.email}</label>
              <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="alex@company.com" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1"><Building2 className="w-3.5 h-3.5" /> {t.business}</label>
              <input value={businessName} onChange={e=>setBusinessName(e.target.value)} placeholder="GrowthPilot" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1"><Globe className="w-3.5 h-3.5" /> {t.market}</label>
              <select value={targetMarket} onChange={e=>setTargetMarket(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500">
                <option>US</option><option>UK</option><option>Mexico</option><option>Brazil</option><option>EU</option><option>Global</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl text-sm font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
            {submitting ? 'Syncing...' : <><Mail className="w-4 h-4" /> {t.submit} <ArrowRight className="w-4 h-4" /></>}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t.privacy}
          </div>
          {onSkip && (
            <button type="button" onClick={onSkip} className="w-full text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline">
              {t.skip}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
