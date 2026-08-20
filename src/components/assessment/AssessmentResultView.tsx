import React, { useState } from 'react';
import { AssessmentResult } from '../../types';
import { RechartsBenchmarkDashboard } from './RechartsBenchmarkDashboard';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Send, 
  RotateCcw, 
  Flame, 
  Gift, 
  Lock, 
  Unlock, 
  BarChart3, 
  FileText,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentResultViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onNavigateToCourse: () => void;
  onNavigateToBonuses: () => void;
  onOpenCheckout: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  result,
  onRetake,
  onNavigateToCourse,
  onNavigateToBonuses,
  onOpenCheckout
}) => {
  const [copiedReport, setCopiedReport] = useState(false);
  
  // GHL Lead capture form state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadBusiness, setLeadBusiness] = useState('');
  const [leadMarket, setLeadMarket] = useState('US / UK');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const getBucketColor = () => {
    if (result.bucket === 'ready_to_launch') {
      return {
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
        ring: 'text-emerald-600 dark:text-emerald-400 stroke-emerald-500',
        bg: 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-500/30',
        title: 'text-emerald-800 dark:text-emerald-300'
      };
    }
    if (result.bucket === 'ready_to_test') {
      return {
        badge: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30',
        ring: 'text-cyan-600 dark:text-cyan-400 stroke-cyan-500',
        bg: 'bg-white dark:bg-slate-900 border-cyan-300 dark:border-cyan-500/30',
        title: 'text-cyan-800 dark:text-cyan-300'
      };
    }
    return {
      badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30',
      ring: 'text-amber-600 dark:text-amber-400 stroke-amber-500',
      bg: 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-500/30',
      title: 'text-amber-800 dark:text-amber-300'
    };
  };

  const colors = getBucketColor();

  const handleCopyReport = () => {
    const reportText = `=== CHATGPT ADS READINESS REPORT ===
Overall Score: ${result.totalScore}/100
Status: ${result.headline}
Generated: ${new Date(result.timestamp).toLocaleDateString()}

Category Breakdown:
${result.categoryScores.map(c => `- ${c.name}: ${c.score}% (${c.earnedPoints}/${c.maxPoints} pts)`).join('\n')}

Top Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Top Risks to Mitigate:
${result.risks.map((r, i) => `• ${r}`).join('\n')}
====================================`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;

    setIsSubmittingLead(true);
    setTimeout(() => {
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Top Banner with Score Gauge */}
      <div className={`rounded-3xl p-6 sm:p-10 border shadow-xl ${colors.bg}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Summary */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border shadow-sm ${colors.badge}">
              <Sparkles className="w-3.5 h-3.5" /> OFFICIAL COMMERCIAL AUDIT RESULT
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {result.headline}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {result.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={onRetake}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic
              </button>

              <button
                type="button"
                onClick={handleCopyReport}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedReport ? 'Copied Summary' : 'Copy Text Summary'}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Right Circular Gauge */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center shadow-lg relative">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
                Readiness
              </span>
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white my-0.5">
                {result.totalScore}
              </span>
              <span className="text-xs text-slate-500 font-medium">Out of 100</span>

              {/* Outer decorative ring */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-500/20"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${result.totalScore}%, 0 ${result.totalScore}%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Recharts Benchmark & Readiness Matrix Dashboard */}
      <RechartsBenchmarkDashboard result={result} />

      {/* Strategic Prescriptions & Vulnerabilities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Prescribed Action Steps (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Prioritized Action Steps (To Reach 85%+ Benchmark)
            </h3>
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
              {result.recommendations.length} Steps
            </span>
          </div>

          <div className="space-y-3.5">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-sm">
                  {i + 1}
                </span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Risks & Identified Vulnerabilities (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Critical Vulnerabilities
            </h3>
            <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-500/30">
              High Priority
            </span>
          </div>

          <div className="space-y-3">
            {result.risks.map((risk, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-500/20 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                <span>{risk}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-300">Auction Safeguard:</strong> Addressing these vulnerabilities prior to campaign scale prevents ad spend attrition and ensures maximum conversational match rate.
          </div>
        </div>
      </div>

      {/* Unlocked Bonuses & Course Next Step Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 border border-emerald-200 dark:border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40">
              <Gift className="w-3.5 h-3.5" /> FREE FAST-ACTION BONUSES UNLOCKED
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Ready to Implement Your Custom Action Plan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Unlock the 12-module masterclass, 60 battle-tested copy prompts, and client retainer kit to launch your high-converting conversational ad funnel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateToBonuses}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              View Unlocked Bonuses
            </button>
            <button
              type="button"
              onClick={onOpenCheckout}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Enroll in Full Masterclass ($197) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* GoHighLevel / Webhook Lead Capture Form */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center space-y-2 mb-6">
          <span className="text-[10px] font-mono font-bold uppercase text-cyan-700 dark:text-cyan-400">
            Automated Pipeline Integration
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Email Me My Full Audit & Action Plan
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Sends an instant branded summary with custom tags to your email and CRM.
          </p>
        </div>

        {leadSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Audit Report Dispatched!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Check your inbox at <strong className="text-slate-900 dark:text-white">{leadEmail}</strong> for your PDF breakdown and checklist.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Alex Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Company / Project</label>
                <input
                  type="text"
                  value={leadBusiness}
                  onChange={(e) => setLeadBusiness(e.target.value)}
                  placeholder="e.g. SaaS Flow Inc"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Market</label>
                <select
                  value={leadMarket}
                  onChange={(e) => setLeadMarket(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="US / UK">United States & UK</option>
                  <option value="Mexico / LatAm">Mexico & Latin America</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Japan / South Korea">Japan & South Korea</option>
                  <option value="Global / Cross-Border">Global / Multi-Region</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingLead}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmittingLead ? 'Sending Report...' : 'Send Detailed Audit PDF & Next Steps'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
