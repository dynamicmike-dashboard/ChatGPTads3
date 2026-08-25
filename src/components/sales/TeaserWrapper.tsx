import React from 'react';
import { ActiveTab, Language } from '../../types';
import { 
  Lock, 
  Unlock, 
  BookOpen, 
  Terminal, 
  Gift, 
  Flame, 
  ShieldCheck, 
  Globe2,
  Compass,
  Zap,
  HelpCircle,
  Coins,
  Award,
  Layers,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';

interface TeaserWrapperProps {
  tab: ActiveTab | 'prompts' | 'bonuses';
  paymentStatus: 'free' | 'full' | 'course';
  onUpgrade: () => void;
  language: Language;
}

const tabTeasers: Record<ActiveTab | 'prompts' | 'bonuses', { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[];
  upgradePrice: string;
}> = {
  sales: {
    icon: <Sparkles className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />,
    title: 'ChatGPT Ads Readiness & Launch Playbook',
    description: 'Your complete roadmap to conversational advertising dominance.',
    features: [
      '7-category readiness diagnostic',
      'Market timing asymmetry analysis',
      'AI ad landscape comparison matrix',
      'Interactive ROI calculator',
    ],
    upgradePrice: 'Start Free',
  },
  dashboard: {
    icon: <Compass className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />,
    title: 'Full Access Dashboard',
    description: 'Your command center for conversational ads - all tools, no course upsells.',
    features: [
      'Executive Dossier & Strategic Guide',
      'Live ChatGPT Ad Preview Simulator',
      'Interactive Assessment & Report',
      'Master Prompt Vault & Generator',
      'Unlocked Bonus Suite (3 bonuses)',
      'Priority support & updates',
    ],
    upgradePrice: '$72 Full Access',
  },
  dossier: {
    icon: <BookOpen className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Executive Dossier & Strategic Guide',
    description: 'Deep-dive strategic analysis for decision-makers who need the full picture.',
    features: [
      'Market timing asymmetry deep-dive',
      'Competitive intelligence on all AI ad platforms',
      'Budget allocation frameworks',
      'Policy & compliance roadmap',
      'Agency arbitrage playbook',
    ],
    upgradePrice: '$72 Full Access',
  },
  simulator: {
    icon: <Terminal className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />,
    title: 'Live ChatGPT Ad Preview Simulator',
    description: 'See exactly how your ads will appear in real ChatGPT conversations.',
    features: [
      'Real-time ad preview in chat flow',
      'Sponsored answer positioning',
      'Follow-up question simulation',
      'Click-through rate estimator',
      'A/B variant testing interface',
    ],
    upgradePrice: '$72 Full Access',
  },
  assessment: {
    icon: <Flame className="w-10 h-10 text-amber-600 dark:text-amber-400" />,
    title: 'Interactive Readiness Assessment',
    description: '7-category, 100-point diagnostic - always free to take.',
    features: [
      'Offer clarity scoring',
      'Budget readiness analysis',
      'Funnel readiness check',
      'Tracking & attribution review',
      'Trust & compliance audit',
      'Follow-up speed evaluation',
      'Personalized launch blockers list',
    ],
    upgradePrice: 'Free to Take',
  },
  course: {
    icon: <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
    title: '12-Part Masterclass Dashboard',
    description: 'Step-by-step curriculum from foundations to scale.',
    features: [
      '12 modules across 4 phases',
      '60 advanced copy-paste prompts',
      'Implementation worksheets per module',
      'Progress tracking & certificates',
      'Lifetime access & updates',
    ],
    upgradePrice: '$297 Course Access',
  },
  prompts: {
    icon: <Terminal className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />,
    title: 'Master Prompt Vault & Generator',
    description: '60 battle-tested prompts + custom generator for your niche.',
    features: [
      '60 ready-to-deploy prompts',
      'Custom prompt generator',
      'Variable substitution engine',
      'Copy-to-clipboard one-click',
      'Category filtering & search',
    ],
    upgradePrice: '$72 Full Access',
  },
  bonuses: {
    icon: <Gift className="w-10 h-10 text-rose-600 dark:text-rose-400" />,
    title: 'Unlocked Bonus Suite (3 Bonuses)',
    description: 'High-value swipe files and agency kits - normally sold separately.',
    features: [
      'Bonus #1: 18-Point Readiness Scorecard ($297 value)',
      'Bonus #2: Prompt-to-Launch Swipe File ($297 value)',
      'Bonus #3: Agency Client Proposal Kit ($497 value)',
      'Total bonus value: $991 - free with full access',
    ],
    upgradePrice: '$72 Full Access',
  },
};

const tabAccessMap: Record<ActiveTab | 'prompts' | 'bonuses', { free: boolean; full: boolean; course: boolean }> = {
  sales: { free: true, full: true, course: true },
  dashboard: { free: false, full: true, course: false },
  dossier: { free: false, full: true, course: false },
  simulator: { free: false, full: true, course: false },
  assessment: { free: true, full: true, course: true },
  course: { free: false, full: false, course: true },
  prompts: { free: false, full: true, course: true },
  bonuses: { free: false, full: true, course: false },
};

export const TeaserWrapper: React.FC<TeaserWrapperProps> = ({ 
  tab, 
  paymentStatus, 
  onUpgrade, 
  language 
}) => {
  const teaser = tabTeasers[tab];
  const access = tabAccessMap[tab];
  
  // Determine what access level this tab needs
  const hasAccess = access[paymentStatus] || paymentStatus === 'full' || paymentStatus === 'course';
  
  // If user has access, this wrapper shouldn't be shown (handled by parent)
  if (hasAccess) return null;

  const t = {
    en: {
      locked: '🔒 Unlock This Feature',
      freePreview: 'Free Preview Available',
      upgradeNow: 'Upgrade Now',
      whatYouGet: 'What You Get Inside:',
      paymentRequired: 'This feature requires a paid subscription.',
      upgradeForFull: 'Upgrade to Full Access for $72',
      upgradeForCourse: 'Upgrade to Course Access for $297',
    },
    es: {
      locked: '🔒 Desbloquear Esta Función',
      freePreview: 'Vista Previa Gratis Disponible',
      upgradeNow: 'Actualizar Ahora',
      whatYouGet: 'Lo Que Obtienes Dentro:',
      paymentRequired: 'Esta función requiere una suscripción paga.',
      upgradeForFull: 'Actualizar a Acceso Completo por $72',
      upgradeForCourse: 'Actualizar a Acceso al Curso por $297',
    },
  }[language];

  const upgradeText = paymentStatus === 'course' ? t.upgradeForCourse : t.upgradeForFull;
  const upgradePrice = teaser.upgradePrice;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto mb-4">
            {teaser.icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">{teaser.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">{teaser.description}</p>
        </div>

        {/* Features Preview */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {t.whatYouGet}
          </h3>
          <ul className="space-y-3">
            {teaser.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold border border-emerald-200 dark:border-emerald-500/50">
            <Lock className="w-4 h-4" /> {t.locked}
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {t.paymentRequired} {upgradeText} to unlock.
          </p>

          <button
            onClick={onUpgrade}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Unlock className="w-5 h-5" />
            {t.upgradeNow} - {upgradePrice}
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* What they'll lose if they don't upgrade */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider font-medium">If you don't upgrade, you miss:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-500">
              {teaser.features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <X className="w-3 h-3 text-rose-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};