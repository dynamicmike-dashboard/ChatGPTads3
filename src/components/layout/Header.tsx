import React from 'react';
import { ActiveTab, ModalType, ThemeMode, Language, CourseSubTab } from '../../types';
import { 
  Sparkles, 
  BookOpen, 
  Terminal, 
  Gift, 
  Smartphone, 
  Flame, 
  ShieldCheck, 
  Globe2,
  Lock,
  Unlock,
  Sun,
  Moon,
  Compass,
  Zap,
  HelpCircle,
  Globe,
  Languages,
  LayoutDashboard,
  Crown,
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenModal: (modal: ModalType) => void;
  hasPurchased: boolean;
  onOpenCheckout: () => void;
  deferredPrompt?: any;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
  paymentStatus: 'free' | 'full' | 'course';
  isLocked: boolean;
  isFirstVisit: boolean;
  courseSubTab: CourseSubTab;
  setCourseSubTab: (tab: CourseSubTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenModal,
  hasPurchased,
  onOpenCheckout,
  deferredPrompt,
  themeMode,
  onToggleTheme,
  language,
  onToggleLanguage,
  paymentStatus,
  isLocked,
  isFirstVisit,
  courseSubTab,
  setCourseSubTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 backdrop-blur-md">
      {/* Top micro announcement ticker */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700 py-1.5 px-4 text-center border-b border-emerald-500/20">
        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-white">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
          <span><strong>2026 Live Rollout:</strong> ChatGPT Ads active in US, UK, Mexico, Brazil, Japan & South Korea</span>
          <span className="hidden sm:inline text-emerald-200">•</span>
          <span className="hidden sm:inline text-white font-bold">Self-serve $3.00–$5.50 CPC bidding</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo Lockup */}
        <div 
          onClick={() => setActiveTab('sales')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight">
                CHATGPT <span className="text-emerald-600">ADS</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                PWA
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block -mt-0.5 hidden sm:block">
              Readiness & Launch Playbook
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('sales')}
            disabled={isLocked}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${
              activeTab === 'sales'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}>
            Overview
          </button>

          {/* Dashboard tab - only for full access users */}
          {paymentStatus === 'full' && !isLocked && (
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3 h-3 text-emerald-600" /> Dashboard
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('dossier')}
            disabled={isLocked}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${
              activeTab === 'dossier'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}>
            <Compass className="w-3 h-3 text-emerald-600" /> Executive Guide
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            disabled={isLocked}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${
              activeTab === 'simulator'
                ? 'bg-white text-cyan-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}>
            <Zap className="w-3 h-3 text-cyan-600" /> Ad Simulator
          </button>

          {/* Diagnostic button - always clickable, glowing when locked */}
          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'assessment'
                ? 'bg-white text-emerald-700 shadow-sm ring-2 ring-emerald-500'
                : isLocked
                  ? 'bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-500/50 ring-2 ring-emerald-400 animate-pulse'
                  : 'text-slate-600 hover:text-slate-900'
            }`}>
            <Sparkles className="w-3 h-3 text-cyan-600" /> Diagnostic
          </button>

          {/* Course tab - shows sub-tabs when active */}
          {activeTab === 'course' ? (
            <div className="flex items-center gap-1">
              <button
                role="tab"
                aria-selected={courseSubTab === 'dashboard'}
                onClick={() => setCourseSubTab('dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  courseSubTab === 'dashboard'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}>
                <LayoutDashboard className="w-3 h-3 text-emerald-600" /> Dashboard
              </button>
              <button
                role="tab"
                aria-selected={courseSubTab === 'prompts'}
                onClick={() => setCourseSubTab('prompts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  courseSubTab === 'prompts'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}>
                <Terminal className="w-3 h-3 text-cyan-600" /> Prompts
              </button>
              <button
                role="tab"
                aria-selected={courseSubTab === 'bonuses'}
                onClick={() => setCourseSubTab('bonuses')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  courseSubTab === 'bonuses'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-purple-50 dark:hover:bg-purple-900/30'
              }`}>
                <Gift className="w-3 h-3 text-indigo-600" /> Bonuses
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab('course')}
              disabled={isLocked}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${
                activeTab === 'course'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}>
              <BookOpen className="w-3 h-3 text-emerald-600" /> Masterclass (12)
            </button>
          )}
        </nav>

        {/* Right Actions: Install PWA + Buy */}
        <div className="flex items-center gap-2">
          {/* Install PWA Button */}
          <button
            type="button"
            onClick={() => onOpenModal('install')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Install as Mobile or Desktop App"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-600" />
            <span>Install App</span>
          </button>

          {/* License Status / Buy License */}
          {paymentStatus === 'full' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Access</span> Active
            </div>
          ) : paymentStatus === 'course' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Course</span> Active
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenCheckout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enroll $72</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
        <div className="xl:hidden flex items-center justify-around bg-slate-50 border-t border-slate-200 px-2 py-1.5 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('sales')}
            disabled={isLocked}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'sales' ? 'text-emerald-700 bg-white shadow-sm' : 'text-slate-600'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dossier')}
            disabled={isLocked}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'dossier' ? 'text-emerald-700 bg-white shadow-sm' : 'text-slate-600'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Guide
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            disabled={isLocked}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'simulator' ? 'text-cyan-700 bg-white shadow-sm' : 'text-slate-600'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${
              activeTab === 'assessment'
                ? 'text-emerald-700 bg-white shadow-sm ring-2 ring-emerald-500'
                : isLocked
                  ? 'bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-500/50 ring-2 ring-emerald-400 animate-pulse'
                  : 'text-slate-600'
            }`}
            disabled={false}
          >
            Audit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('course')}
            disabled={isLocked}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'course' ? 'text-emerald-700 bg-white shadow-sm' : 'text-slate-600'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Course (12)
          </button>
        </div>
    </header>
  );
};