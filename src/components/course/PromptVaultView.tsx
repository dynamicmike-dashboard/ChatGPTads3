import React, { useState } from 'react';
import { STACK_PROMPTS, PlatformPrompt } from '../../data/stackPromptsData';
import { Terminal, Copy, Check, Sparkles, Filter, Code, Database, Layout, Layers, Bot, Lock, Unlock, Terminal as TerminalIcon } from 'lucide-react';

interface PromptVaultViewProps {
  language?: 'en' | 'es';
  showTeaser?: boolean;
  onUpgrade?: () => void;
}

export const PromptVaultView: React.FC<PromptVaultViewProps> = ({
  language = 'en',
  showTeaser = false,
  onUpgrade
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Variables for dynamic substitution
  const [businessType, setBusinessType] = useState('B2B Growth Agency');
  const [targetMarket, setTargetMarket] = useState('US, UK & Mexico');
  const [monthlyBudget, setMonthlyBudget] = useState('$3,500 / month');

  const platforms = ['All', 'Google AI Studio', 'Google Stitch', 'Antigravity / OpenCode', 'GoHighLevel', 'Teable AI'];

  const filteredPrompts = STACK_PROMPTS.filter(p => 
    selectedPlatform === 'All' || p.platform === selectedPlatform
  );

  const getPlatformIcon = (platform: PlatformPrompt['platform']) => {
    switch (platform) {
      case 'Google AI Studio': return <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Google Stitch': return <Layout className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'Antigravity / OpenCode': return <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'GoHighLevel': return <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Teable AI': return <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  const handleCopyPrompt = (prompt: PlatformPrompt) => {
    let text = prompt.promptTemplate;
    text = text.replace(/{business_type}/g, businessType);
    text = text.replace(/{target_market}/g, targetMarket);
    text = text.replace(/{monthly_budget}/g, monthlyBudget);

    navigator.clipboard.writeText(text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (showTeaser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 sm:p-8 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-8 h-8 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Master Prompt Vault & Generator</h2>
            <p className="text-cyan-100 max-w-md mx-auto">60 battle-tested system prompts + custom generator for every AI platform.</p>
          </div>
          <div className="p-6 sm:p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6">Unlock 60 battle-tested system prompts + custom generator for Google AI Studio, Stitch, Antigravity, GoHighLevel & Teable AI.</p>
            <button
              onClick={() => onUpgrade?.()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2z"/></svg>
              Upgrade to Full Access - $72
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 mb-3">
              <Terminal className="w-3.5 h-3.5" /> SYSTEM-LEVEL MASTER PROMPTS
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              AI Stack & Platform Generator Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Engineered prompt templates tailored for Google AI Studio, Google Stitch, Antigravity/OpenCode, GoHighLevel, and Teable AI.
            </p>
          </div>
        </div>
      </div>

      {/* Global Variable Inserter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200">Global Variable Customizer</h3>
          <span className="text-[11px] text-slate-500 hidden sm:inline">(Instantly injected into all platform templates)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{"{business_type}"}</label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{"{target_market}"}</label>
            <input
              type="text"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{"{monthly_budget}"}</label>
            <input
              type="text"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {platforms.map(p => (
          <button
            key={p}
            type="button"
            onClick={() => setSelectedPlatform(p)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedPlatform === p
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Prompts Cards Feed */}
      <div className="space-y-6">
        {filteredPrompts.map(prompt => {
          const isCopied = copiedId === prompt.id;
          let displayPrompt = prompt.promptTemplate
            .replace(/{business_type}/g, businessType)
            .replace(/{target_market}/g, targetMarket)
            .replace(/{monthly_budget}/g, monthlyBudget);

          return (
            <div key={prompt.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {getPlatformIcon(prompt.platform)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-700 dark:text-cyan-400 block">
                      {prompt.platform} • {prompt.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {prompt.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPrompt(prompt)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? 'Copied Prompt' : 'Copy Prompt'}
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {displayPrompt}
              </div>

              {/* Recommended Outputs / Tips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                <span className="font-bold text-slate-700 dark:text-slate-400">Target Tool:</span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {prompt.platform}
                </span>
                <span className="text-slate-400">•</span>
                <span>Optimized for fast variable replacement</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
