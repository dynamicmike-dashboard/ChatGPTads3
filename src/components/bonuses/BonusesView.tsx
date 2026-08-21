import React, { useState } from 'react';
import { BONUSES, BonusItem } from '../../data/bonusData';
import { Gift, CheckCircle2, Copy, Check, Printer, Sparkles, FileText, ChevronRight, Lock, Unlock, Gift as GiftIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BonusesViewProps {
  language?: 'en' | 'es';
  showTeaser?: boolean;
  onUpgrade?: () => void;
}

export const BonusesView: React.FC<BonusesViewProps> = ({
  language = 'en',
  showTeaser = false,
  onUpgrade
}) => {
  const [activeBonusId, setActiveBonusId] = useState<string>(BONUSES[0].id);
  const [copiedSectionIdx, setCopiedSectionIdx] = useState<number | null>(null);
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>({});

  const activeBonus = BONUSES.find(b => b.id === activeBonusId) || BONUSES[0];

  const handleToggleAudit = (key: string) => {
    setCheckedAuditItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopySection = (sectionIndex: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSectionIdx(sectionIndex);
    setTimeout(() => setCopiedSectionIdx(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (showTeaser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 sm:p-8 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <GiftIcon className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Unlocked Bonus Suite</h2>
            <p className="text-rose-100 max-w-md mx-auto">3 high-value bonuses: 18-Point Scorecard, Prompt-to-Launch Swipe File, Agency Proposal Kit.</p>
          </div>
          <div className="p-6 sm:p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6">Unlock all 3 bonuses worth $991: 18-Point Readiness Scorecard, Prompt-to-Launch Swipe File, and Agency Client Proposal & Retainer Kit.</p>
            <button
              onClick={() => onUpgrade?.()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2v6a2 2 0 002 2z"/></svg>
              Upgrade to Full Access - $72
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 mb-3">
              <Gift className="w-3.5 h-3.5" /> UNLOCKED BONUS ASSETS SUITE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Implementation & Agency Swipe Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Field-tested assets: 18-point client audit sheets, high-converting conversational ad swipes, and agency 3-tier retainer proposals.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Bonus Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BONUSES.map((bonus) => {
          const isSelected = bonus.id === activeBonusId;
          return (
            <button
              key={bonus.id}
              type="button"
              onClick={() => setActiveBonusId(bonus.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50 dark:bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                  : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                {bonus.badge}
              </span>
              <h3 className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                {bonus.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Bonus Detail Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            {activeBonus.badge}
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 mb-2">
            {activeBonus.title}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold mb-3">
            {activeBonus.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {activeBonus.description}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {activeBonus.contentSections.map((sec, idx) => {
            const isCopied = copiedSectionIdx === idx;
            const fullText = [
              sec.heading,
              ...sec.items,
              sec.codeBlock || ''
            ].filter(Boolean).join('\n\n');

            return (
              <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {sec.heading}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleCopySection(idx, fullText)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? 'Copied Section' : 'Copy Section'}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {sec.items.map((paragraph, pIdx) => {
                    const auditKey = `${activeBonus.id}-${idx}-${pIdx}`;
                    const isChecked = !!checkedAuditItems[auditKey];

                    return (
                      <div 
                        key={pIdx} 
                        onClick={() => handleToggleAudit(auditKey)}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/60 cursor-pointer transition-colors"
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs sm:text-sm leading-relaxed ${
                          isChecked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {paragraph}
                        </span>
                      </div>
                    );
                  })}

                  {sec.codeBlock && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap border border-slate-800">
                      {sec.codeBlock}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
