import React, { useState, useEffect } from 'react';
import { COURSE_LESSONS } from '../../data/courseData';
import { CourseLesson, LessonPrompt } from '../../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Filter, 
  ShieldAlert, 
  TrendingUp, 
  Coins, 
  Wrench, 
  Layers, 
  Share2,
  Bookmark,
  Terminal,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseDashboardProps {
  onOpenPromptVault: () => void;
  onOpenBonuses: () => void;
}

export const CourseDashboard: React.FC<CourseDashboardProps> = ({ onOpenPromptVault, onOpenBonuses }) => {
  const [activeLessonId, setActiveLessonId] = useState<number>(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('chatgpt_ads_completed_lessons') || '[]');
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  
  // Custom variable state for instant prompt customization in the lessons!
  const [customBusinessType, setCustomBusinessType] = useState('B2B SaaS / Agency');
  const [customMarket, setCustomMarket] = useState('US & UK');
  const [customBudget, setCustomBudget] = useState('$3,000 / mo');

  useEffect(() => {
    try {
      localStorage.setItem('chatgpt_ads_completed_lessons', JSON.stringify(completedLessons));
    } catch (err) {
      console.error(err);
    }
  }, [completedLessons]);

  const currentLesson: CourseLesson = COURSE_LESSONS.find(l => l.id === activeLessonId) || COURSE_LESSONS[0];

  const toggleLessonComplete = (id: number) => {
    setCompletedLessons(prev => {
      const isCompleted = prev.includes(id);
      const updated = isCompleted ? prev.filter(x => x !== id) : [...prev, id];
      if (!isCompleted) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
      return updated;
    });
  };

  const filteredLessons = COURSE_LESSONS.filter(l => {
    const matchesPhase = selectedPhase === 'All' || l.phase === selectedPhase;
    const matchesSearch = searchQuery === '' || 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.advancedPrompts.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.promptText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPhase && matchesSearch;
  });

  const progressPercent = Math.round((completedLessons.length / COURSE_LESSONS.length) * 100);

  const handleCopyPrompt = (prompt: LessonPrompt) => {
    let text = prompt.promptText;
    text = text.replace(/{business_type}/g, customBusinessType);
    text = text.replace(/{target_market}/g, customMarket);
    text = text.replace(/{monthly_budget}/g, customBudget);

    navigator.clipboard.writeText(text);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Header Overview Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" /> 12-PART STRATEGIC MASTERCLASS
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ChatGPT Ads Readiness & Launch Curriculum
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Master conversational intent bidding, unit economics, landing page alignment, and GoHighLevel instant lead triggers across international markets.
            </p>
          </div>

          {/* Overall Progress Gauge */}
          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-5 shrink-0 shadow-sm">
            <div className="text-right">
              <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Course Completion</span>
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {completedLessons.length} <span className="text-xs text-slate-500">/ {COURSE_LESSONS.length}</span>
              </span>
            </div>
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 flex items-center justify-center font-mono font-black text-emerald-700 dark:text-emerald-400 text-sm shadow-sm">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Global Prompt Variable Customizer Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Dynamic Prompt Variable Injector (Auto-populates in all 60 prompts):
            </span>
            <span className="text-[10px] text-slate-500">Variables auto-substitute upon 1-click copy</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{"{business_type}"}</label>
              <input 
                type="text" 
                value={customBusinessType} 
                onChange={(e) => setCustomBusinessType(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{"{target_market}"}</label>
              <input 
                type="text" 
                value={customMarket} 
                onChange={(e) => setCustomMarket(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{"{monthly_budget}"}</label>
              <input 
                type="text" 
                value={customBudget} 
                onChange={(e) => setCustomBudget(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column View: Lesson List Sidebar + Active Lesson Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Lesson Directory & Filters (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Phase Pills */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules & prompts..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['All', 'Foundations', 'Economics & Risk', 'Strategy & Funnel', 'Launch & Scale'].map(phase => (
                <button
                  key={phase}
                  type="button"
                  onClick={() => setSelectedPhase(phase)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedPhase === phase
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Scrollable List */}
          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredLessons.map(lesson => {
              const isActive = lesson.id === activeLessonId;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {/* Completion Circle Check */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLessonComplete(lesson.id);
                    }}
                    className="pt-0.5 shrink-0 hover:scale-110 transition-transform"
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-700 dark:text-cyan-400">
                        {lesson.phase} • {lesson.duration}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        #{lesson.id}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold truncate ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-300'}`}>
                      {lesson.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Active Lesson Reader & Execution Hub (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
            {/* Lesson Title Header */}
            <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                  Module {currentLesson.id} • {currentLesson.phase} • {currentLesson.duration}
                </span>

                <button
                  type="button"
                  onClick={() => toggleLessonComplete(currentLesson.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    completedLessons.includes(currentLesson.id)
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {completedLessons.includes(currentLesson.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" /> Mark as Completed
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {currentLesson.title}
              </h2>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                {currentLesson.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentLesson.summary}
              </p>
            </div>

            {/* Core Teaching Breakdown */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Core Strategic Principles
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {currentLesson.coreTeaching.map((teach, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      {i + 1}
                    </span>
                    <span>{teach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep-Dive Grid: Benefits, Costs, Risks, Potential */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Benefits */}
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Key Advantages
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {currentLesson.deepDive.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unit Economics & Costs */}
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" /> Cost & Resource Demands
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {currentLesson.deepDive.costs.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks & Limitations */}
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Risks & Limitations
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {currentLesson.deepDive.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Prepare */}
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" /> What to Prepare
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {currentLesson.deepDive.whatToPrepare.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Implementation Worksheet Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-slate-900 border border-emerald-200 dark:border-emerald-500/30 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Action Worksheet: {currentLesson.worksheetIdea.title}
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {currentLesson.worksheetIdea.steps.map((st, i) => (
                  <li key={i} className="leading-relaxed">{st}</li>
                ))}
              </ol>
            </div>

            {/* 5 Advanced Copyable AI Prompts */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 5 Module Execution Prompts
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Use in Google AI Studio, Google Stitch, Antigravity, GHL, or Teable AI
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentLesson.advancedPrompts.map(prompt => {
                  const isCopied = copiedPromptId === prompt.id;
                  let displayPrompt = prompt.promptText
                    .replace(/{business_type}/g, customBusinessType)
                    .replace(/{target_market}/g, customMarket)
                    .replace(/{monthly_budget}/g, customBudget);

                  return (
                    <div key={prompt.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                            {prompt.id}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {prompt.title}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyPrompt(prompt)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {isCopied ? 'Copied' : 'Copy Prompt'}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        <strong>Purpose:</strong> {prompt.purpose}
                      </p>

                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {displayPrompt}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Next/Prev Module Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                disabled={activeLessonId <= 1}
                onClick={() => setActiveLessonId(prev => Math.max(1, prev - 1))}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  activeLessonId <= 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous Module
              </button>

              <button
                type="button"
                disabled={activeLessonId >= COURSE_LESSONS.length}
                onClick={() => setActiveLessonId(prev => Math.min(COURSE_LESSONS.length, prev + 1))}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
                  activeLessonId >= COURSE_LESSONS.length ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                Next Module <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
