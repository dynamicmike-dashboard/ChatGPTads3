import React from 'react';
import { ActiveTab, ModalType, ThemeMode } from '../../types';
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
  HelpCircle
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
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenModal,
  hasPurchased,
  onOpenCheckout,
  deferredPrompt,
  themeMode,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-md transition-colors">
      {/* Top micro announcement ticker */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700 dark:from-emerald-950 dark:via-slate-950 dark:to-indigo-950 py-1.5 px-4 text-center border-b border-emerald-500/20">
        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-white dark:text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 dark:bg-emerald-400 animate-ping"></span>
          <span><strong>2026 Live Rollout:</strong> ChatGPT Ads active in US, UK, Mexico, Brazil, Japan & South Korea</span>
          <span className="hidden sm:inline text-emerald-200 dark:text-slate-500">•</span>
          <span className="hidden sm:inline text-white dark:text-emerald-400 font-bold">Self-serve $3.00–$5.50 CPC bidding</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo Lockup */}
        <div 
          onClick={() => setActiveTab('sales')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                CHATGPT <span className="text-emerald-600 dark:text-emerald-400">ADS</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                PWA
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block -mt-0.5 hidden sm:block">
              Readiness & Launch Playbook
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('sales')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sales'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dossier')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dossier'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Executive Guide
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Ad Simulator
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'assessment'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Diagnostic
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('course')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'course'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Masterclass (12)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prompts'
                ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Prompts (60)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bonuses')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bonuses'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Gift className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> Bonuses
          </button>
        </nav>

        {/* Right Actions: Light/Dark Theme Switcher + Install PWA + Buy */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Clean Light Theme'}
          >
            {themeMode === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Install PWA Button */}
          <button
            type="button"
            onClick={() => onOpenModal('install')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title="Install as Mobile or Desktop App"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Install App</span>
          </button>

          {/* License Status / Buy License */}
          {hasPurchased ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              <Unlock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">License</span> Active
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenCheckout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enroll $197</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center justify-around bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800/80 px-2 py-1.5 overflow-x-auto gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('sales')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'sales' ? 'text-emerald-700 bg-white shadow-sm dark:text-emerald-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('dossier')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'dossier' ? 'text-emerald-700 bg-white shadow-sm dark:text-emerald-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Guide
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('simulator')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'simulator' ? 'text-cyan-700 bg-white shadow-sm dark:text-cyan-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Simulator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('assessment')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'assessment' ? 'text-emerald-700 bg-white shadow-sm dark:text-emerald-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Audit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('course')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'course' ? 'text-emerald-700 bg-white shadow-sm dark:text-emerald-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Course (12)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('prompts')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'prompts' ? 'text-cyan-700 bg-white shadow-sm dark:text-cyan-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Prompts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('bonuses')}
          className={`px-2 py-1 text-[11px] font-bold rounded-lg shrink-0 ${activeTab === 'bonuses' ? 'text-indigo-700 bg-white shadow-sm dark:text-indigo-400 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Bonuses
        </button>
      </div>
    </header>
  );
};
