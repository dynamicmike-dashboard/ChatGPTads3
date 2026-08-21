import React, { useState } from 'react';
import { Language } from '../../types';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  Clock, 
  Flame, 
  Lock, 
  Star, 
  HelpCircle, 
  TrendingUp, 
  Coins, 
  Layers, 
  Award,
  ChevronDown,
  ChevronUp,
  Compass,
  Zap as ZapIcon,
  BookOpen,
  Terminal,
  Gift,
  Flame as FlameIcon,
  ShieldCheck as ShieldCheckIcon,
  Globe2 as GlobeIcon,
  Lock as LockIcon,
  Unlock,
  Target,
  Users,
  BarChart2,
  Cpu,
  Bell,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  Check,
  AlertCircle,
  ArrowRight as ArrowRightIcon,
  ExternalLink,
} from 'lucide-react';
import { COURSE_LESSONS } from '../../data/courseData';

interface FullAccessDashboardProps {
  onOpenDossier: () => void;
  onOpenSimulator: () => void;
  onOpenAssessment: () => void;
  onOpenPrompts: () => void;
  onOpenBonuses: () => void;
  onOpenCheckout: () => void;
  language: Language;
}

export const FullAccessDashboard: React.FC<FullAccessDashboardProps> = ({
  onOpenDossier,
  onOpenSimulator,
  onOpenAssessment,
  onOpenPrompts,
  onOpenBonuses,
  onOpenCheckout,
  language
}) => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    en: {
      welcomeBack: 'Welcome Back to Your Command Center',
      subtitle: 'Full Access active. All tools unlocked. Course sold separately.',
      quickActions: 'Quick Actions',
      dossier: 'Executive Dossier',
      simulator: 'Ad Simulator',
      assessment: 'Readiness Assessment',
      prompts: 'Prompt Vault',
      bonuses: 'Bonus Suite',
      course: 'Masterclass (Sold Separately)',
      upgradeCourse: 'Upgrade to Course',
      whatYouHave: 'What You Have Access To',
      allFeatures: 'All Features Unlocked',
      support: 'Priority Support',
      updates: 'Lifetime Updates',
      status: 'Status: Full Access Active',
    },
    es: {
      welcomeBack: 'Bienvenido a Tu Centro de Mando',
      subtitle: 'Acceso Completo activo. Todas las herramientas desbloqueadas. Curso vendido por separado.',
      quickActions: 'Acciones Rápidas',
      dossier: 'Dossier Ejecutivo',
      simulator: 'Simulador de Anuncios',
      assessment: 'Evaluación de Preparación',
      prompts: 'Bóveda de Prompts',
      bonuses: 'Suite de Bonos',
      course: 'Masterclass (Vendido Separadamente)',
      upgradeCourse: 'Actualizar al Curso',
      whatYouHave: 'Lo Que Tienes Acceso',
      allFeatures: 'Todas las Funciones Desbloqueadas',
      support: 'Soporte Prioritario',
      updates: 'Actualizaciones de Por Vida',
      status: 'Estado: Acceso Completo Activo',
    },
  }[language];

  const features = [
    { 
      icon: <BookOpen className="w-5 h-5" />, 
      title: { en: 'Executive Dossier', es: 'Dossier Ejecutivo' }[language],
      desc: { en: 'Strategic guide & market intelligence', es: 'Guía estratégica e inteligencia de mercado' }[language],
      action: onOpenDossier,
    },
    { 
      icon: <Terminal className="w-5 h-5" />, 
      title: { en: 'Ad Preview Simulator', es: 'Simulador de Anuncios' }[language],
      desc: { en: 'Real-time ChatGPT ad preview', es: 'Vista previa en tiempo real de anuncios en ChatGPT' }[language],
      action: onOpenSimulator,
    },
    { 
      icon: <FlameIcon className="w-5 h-5" />, 
      title: { en: 'Readiness Assessment', es: 'Evaluación de Preparación' }[language],
      desc: { en: '7-category diagnostic with report', es: 'Diagnóstico de 7 categorías con reporte' }[language],
      action: onOpenAssessment,
    },
    { 
      icon: <Terminal className="w-5 h-5" />, 
      title: { en: 'Prompt Vault', es: 'Bóveda de Prompts' }[language],
      desc: { en: '60 advanced prompts + generator', es: '60 prompts avanzados + generador' }[language],
      action: onOpenPrompts,
    },
    { 
      icon: <Gift className="w-5 h-5" />, 
      title: { en: 'Bonus Suite (3)', es: 'Suite de Bonos (3)' }[language],
      desc: { en: '$991 value - scorecard, swipe file, agency kit', es: 'Valor $991 - scorecard, swipe file, kit de agencia' }[language],
      action: onOpenBonuses,
    },
    { 
      icon: <BookOpen className="w-5 h-5" />, 
      title: { en: '12-Part Masterclass', es: 'Masterclass de 12 Partes' }[language],
      desc: { en: 'Separate purchase - $297', es: 'Compra separada - $297' }[language],
      action: () => window.open('#', '_self'),
    },
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Status Bar */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-2xl p-3 sm:p-4 text-center shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4" /> {t.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white/20 text-white/90 font-semibold border border-white/30">{t.allFeatures}</span>
            <span className="flex items-center gap-1.5 text-white/90">
              <Star className="w-4 h-4 text-amber-300" /> {t.support} • {t.updates}
            </span>
          </div>
        </div>
      </div>

      {/* Welcome Hero */}
      <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
          <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t.welcomeBack}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          {t.welcomeBack}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={feature.action}
              className="group p-5 sm:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 hover:-translate-y-1 cursor-pointer text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors">
                {feature.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                  {t.quickActions}
                </span>
                <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* What You Have Access To */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Unlock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> {t.whatYouHave}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.allFeatures} — no course upsells, no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen className="w-6 h-6" />, title: { en: 'Executive Dossier', es: 'Dossier Ejecutivo' }[language], desc: { en: 'Full strategic guide & market intel', es: 'Guía estratégica completa e inteligencia de mercado' }[language], status: '✅ Active' },
              { icon: <Terminal className="w-6 h-6" />, title: { en: 'Ad Preview Simulator', es: 'Simulador de Anuncios' }[language], desc: { en: 'Real-time ChatGPT ad preview', es: 'Vista previa real de anuncios en ChatGPT' }[language], status: '✅ Active' },
              { icon: <FlameIcon className="w-6 h-6" />, title: { en: 'Readiness Assessment', es: 'Evaluación de Preparación' }[language], desc: { en: '7-category diagnostic + report', es: 'Diagnóstico de 7 categorías + reporte' }[language], status: '✅ Active' },
              { icon: <Terminal className="w-6 h-6" />, title: { en: 'Master Prompt Vault', es: 'Bóveda Maestra de Prompts' }[language], desc: { en: '60 prompts + custom generator', es: '60 prompts + generador personalizado' }[language], status: '✅ Active' },
              { icon: <Gift className="w-6 h-6" />, title: { en: 'Bonus Suite (3)', es: 'Suite de Bonos (3)' }[language], desc: { en: '$991 value - scorecard, swipe file, agency kit', es: 'Valor $991 - scorecard, swipe file, kit de agencia' }[language], status: '✅ Active' },
              { icon: <Lock className="w-6 h-6" />, title: { en: '12-Part Masterclass', es: 'Masterclass de 12 Partes' }[language], desc: { en: 'Separate purchase - $297', es: 'Compra separada - $297' }[language], status: '🔒 Sold Separately' },
            ].map((item, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Course Upsell */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-slate-50 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-slate-900 border border-purple-200 dark:border-purple-500/30 rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40 mb-3">
                <BookOpen className="w-3.5 h-3.5" /> {t.upgradeCourse}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t.course}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-xl mx-auto">
                {language === 'en' 
                  ? 'Add the 12-part masterclass curriculum, 60 advanced prompts, implementation worksheets, and progress tracking to your toolkit.'
                  : 'Añade el currículo de masterclass de 12 partes, 60 prompts avanzados, hojas de implementación y seguimiento de progreso a tu kit de herramientas.'
                }
              </p>
              <button
                onClick={onOpenCheckout}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" /> {t.upgradeCourse} - $297
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats / Activity */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> {language === 'en' ? 'Quick Stats' : 'Estadísticas Rápidas'}
            </h2>
            <span className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">
              ✅ Full Access
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: { en: 'Assessment Score', es: 'Puntaje Evaluación' }, value: '--', icon: <Target className="w-5 h-5" />, color: 'emerald' },
              { label: { en: 'Modules Complete', es: 'Módulos Completados' }, value: '0/12', icon: <BookOpen className="w-5 h-5" />, color: 'blue' },
              { label: { en: 'Prompts Used', es: 'Prompts Usados' }, value: '0', icon: <Terminal className="w-5 h-5" />, color: 'cyan' },
              { label: { en: 'Bonuses Claimed', es: 'Bonos Reclamados' }, value: '0/3', icon: <Gift className="w-5 h-5" />, color: 'rose' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-500/10 text-${stat.color}-700 dark:text-${stat.color}-400 flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.label[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};