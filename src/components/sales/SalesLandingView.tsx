import React, { useState } from 'react';
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
  Compass
} from 'lucide-react';
import { COURSE_LESSONS } from '../../data/courseData';

interface SalesLandingViewProps {
  onStartAssessment: () => void;
  onOpenCheckout: () => void;
  onOpenDossier?: () => void;
  onOpenSimulator?: () => void;
}

export const SalesLandingView: React.FC<SalesLandingViewProps> = ({
  onStartAssessment,
  onOpenCheckout,
  onOpenDossier,
  onOpenSimulator
}) => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Simple Interactive ROI Calculator state
  const [calcBudget, setCalcBudget] = useState(2500);
  const [calcDealValue, setCalcDealValue] = useState(2000);
  const [calcCloseRate, setCalcCloseRate] = useState(15); // %

  const estimatedCPC = 4.0;
  const estimatedClicks = Math.round(calcBudget / estimatedCPC);
  const estimatedCVR = 0.09; // 9%
  const estimatedLeads = Math.round(estimatedClicks * estimatedCVR);
  const estimatedDeals = Math.max(1, Math.round(estimatedLeads * (calcCloseRate / 100)));
  const estimatedRevenue = estimatedDeals * calcDealValue;
  const estimatedROAS = ((estimatedRevenue / calcBudget) * 100).toFixed(0);

  const faqs = [
    {
      q: 'Is this course suitable for beginners or only experienced media buyers?',
      a: 'The curriculum is built with a dual-track architecture: Foundations & Strategy for business owners and founders, plus technical tracking, bidding logic, and 60 advanced prompts for seasoned media buyers and agencies.'
    },
    {
      q: 'Can I advertise in the US and UK if my business is based in Mexico, Europe, or elsewhere?',
      a: 'Yes! ChatGPT ad targeting operates based on the user’s conversational geography and intent. Having foreign accounts does not block you from buying US, UK, Mexico, or global inventory.'
    },
    {
      q: 'Are ChatGPT ads really live, and what are the current bidding prices?',
      a: 'Yes. OpenAI has launched self-serve ads on Free and Go tiers across the US, UK, Mexico, Brazil, Japan, and South Korea. Self-serve bidding ranges from $3.00 to $5.50 CPC with no mandatory $50k minimums.'
    },
    {
      q: 'What is the status of Gemini, Claude, and Perplexity for ads?',
      a: 'Anthropic keeps Claude 100% ad-free. Perplexity paused consumer ads over trust concerns. Google monetizes Gemini through Search Ads ecosystems, leaving ChatGPT as the premier dedicated conversational ad surface today.'
    },
    {
      q: 'How do I access the dashboard and bonuses after payment?',
      a: 'Stripe will instantly redirect you to the course dashboard where all 12 modules, interactive prompt generators, and bonus swipe files are unlocked immediately.'
    }
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Top Urgent Market Expansion Ticker */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 text-center shadow-md flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
            <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Active Market Rollout:
          </span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">United States</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">United Kingdom</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">Mexico</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">Brazil</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">Japan</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">South Korea</span>
          <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-bold animate-pulse">● Self-Serve Live</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
          <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> EARLY-MOVER STRATEGIC MASTERCLASS & BLUEPRINT
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          The Comprehensive Playbook for <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">ChatGPT Ads</span> Dominance
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Conversational ads are expanding rapidly across the US, UK, and global markets. Discover how to evaluate benefits, budget CPCs, avoid policy traps, and deploy high-converting funnels before the auction gets crowded.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onStartAssessment}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5" /> Start Free Readiness Diagnostic
          </button>

          <button
            type="button"
            onClick={onOpenCheckout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 shadow-md transition-all cursor-pointer"
          >
            Unlock 12-Part Masterclass ($197) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-6 pt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Instant PWA Access
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 60 Advanced Prompts Included
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 30-Day Money-Back Guarantee
          </span>
        </div>
      </div>

      {/* Why Speed is Crucial Right Now */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
              MARKET TIMING ASYMMETRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Why Speed Is Crucial Right Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              This is one of those rare moments where a trillion-dollar conversational ecosystem is opening its first ad inventory. The businesses that master this first enjoy 3 structural advantages:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">1. Lowest Auction Competition</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Early auctions have lower bidder density. You can capture high-intent problem-solving queries for $3–$4 CPC before mass agency adoption pushes bids to $12+.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">2. Captivated In-Flow Attention</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Chat users are actively troubleshooting or buying. Sponsored solutions positioned directly beneath relevant AI answers convert at 2x–3x standard banner rates.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">3. High-Ticket Agency Arbitrage</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Package conversational ad management for clients. Command $3,500–$7,500/month recurring retainers as the go-to AI media buying specialist.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Industry Ad Landscape Matrix */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> The 2026 AI Assistant Ad Landscape
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Objective comparison of current ad availability and policies across the major LLM platforms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300">
                  <th className="py-3 px-4 font-bold">Platform</th>
                  <th className="py-3 px-4 font-bold">Ad Status</th>
                  <th className="py-3 px-4 font-bold">Bidding Model</th>
                  <th className="py-3 px-4 font-bold">Eligible Markets</th>
                  <th className="py-3 px-4 font-bold">Strategic Playbook</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                <tr className="bg-emerald-50/50 dark:bg-emerald-950/10">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ChatGPT
                  </td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-semibold">Live / Expanding</td>
                  <td className="py-3 px-4 font-mono text-slate-800 dark:text-slate-300">$3.00–$5.50 CPC / CPM</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">US, UK, Mexico, Brazil, JP, KR</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-200">Direct media buy & high-intent lead gen</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Google Gemini
                  </td>
                  <td className="py-3 px-4 text-cyan-700 dark:text-cyan-400">Search Ecosystem Integration</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">Google Ads Auction</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Global Google surfaces</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Monetized via Google Search Ads</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> Anthropic Claude
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Strictly Ad-Free Policy</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">None</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">N/A</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Brand-safe pure thinking assistant</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Perplexity
                  </td>
                  <td className="py-3 px-4 text-amber-700 dark:text-amber-400">Paused Consumer Ads</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">N/A</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">N/A</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Trust-first search answer engine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400 uppercase">Unit Economics Simulator</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Estimate Your ChatGPT Ads Return
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Based on empirical self-serve CPC benchmarks ($4.00 avg) and conversational intent conversion rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  <span>Monthly Test Budget:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono">${calcBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={calcBudget}
                  onChange={(e) => setCalcBudget(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  <span>Customer LTV / Deal Size:</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-mono">${calcDealValue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={calcDealValue}
                  onChange={(e) => setCalcDealValue(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  <span>Sales Close Rate on Inbound Leads:</span>
                  <span className="text-indigo-700 dark:text-indigo-400 font-mono">{calcCloseRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={calcCloseRate}
                  onChange={(e) => setCalcCloseRate(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Projected Outputs */}
            <div className="bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 border border-emerald-200 dark:border-emerald-500/40 rounded-2xl p-6 text-center space-y-4">
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-white dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Estimated Clicks</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{estimatedClicks}</span>
                </div>
                <div className="bg-white dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Qualified Leads (9% CVR)</span>
                  <span className="text-lg font-bold text-cyan-700 dark:text-cyan-400 font-mono">{estimatedLeads}</span>
                </div>
                <div className="bg-white dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Closed Deals</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-mono">{estimatedDeals}</span>
                </div>
                <div className="bg-white dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Projected ROAS</span>
                  <span className="text-lg font-bold text-indigo-700 dark:text-indigo-400 font-mono">{estimatedROAS}%</span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Projected Gross Revenue:</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  ${estimatedRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete 12-Module Masterclass Syllabus */}
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-400 uppercase">Curriculum Breakdown</span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            What You Get Inside the 12 Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Every module includes in-depth analysis, checklists, worksheets, and 5 advanced copyable prompts.
          </p>
        </div>

        <div className="space-y-3">
          {COURSE_LESSONS.map((lesson) => {
            const isExpanded = expandedLesson === lesson.id;
            return (
              <div 
                key={lesson.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      {lesson.id}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-700 dark:text-cyan-400 block">
                        {lesson.phase} • {lesson.duration}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {lesson.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-slate-500">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 space-y-3">
                    <p className="leading-relaxed">{lesson.summary}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-200">Includes 5 Advanced Prompts:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                          {lesson.advancedPrompts.map(p => (
                            <li key={p.id} className="truncate">{p.title}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-200">Action Worksheet:</strong>
                        <p className="mt-1">{lesson.worksheetIdea.title}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2 Unannounced Bonuses Section */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 dark:from-purple-950/60 dark:via-slate-900 dark:to-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> FAST-ACTION UNANNOUNCED BONUSES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Included Free When You Enroll Today
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase block mb-1">
                Bonus #1 ($197 Value)
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">18-Point ChatGPT Ads Readiness Scorecard</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The exact diagnostic spreadsheet and rubric to audit any offer or client campaign in 15 minutes.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase block mb-1">
                Bonus #2 ($297 Value)
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Prompt-to-Launch Swipe File & Hooks</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Curated plug-and-play conversational ad snippets, sales objection handlers, and landing page headlines.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase block mb-1">
                Bonus #3 ($497 Value)
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Agency Client Proposal & Retainer Kit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                3-Tier Pricing Model, Statement of Work (SOW) templates, and 7-day client onboarding SOP.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Frequently Asked Questions
          </h2>
        </div>

        {faqs.map((faq, idx) => {
          const isOpen = expandedFaq === idx;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setExpandedFaq(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-slate-500">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Bottom Checkout Conversion Card */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> SECURE LIFETIME ACCESS TODAY
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
            Claim Your Asymmetric Advantage in Conversational Ads
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base max-w-xl mx-auto mb-6">
            Get instant access to the complete 12-module PWA masterclass, 60 advanced prompts, GHL automations, and all 3 unlocked bonus suites.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-slate-400 line-through text-lg font-mono">$497</span>
            <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono">$197</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">One-Time Payment</span>
          </div>

          <button
            type="button"
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl text-base sm:text-lg font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            Enroll Now & Unlock Course Dashboard <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 256-Bit Encrypted Stripe Checkout
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Instant Dashboard Redirect
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" /> Lifetime Updates Included
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
