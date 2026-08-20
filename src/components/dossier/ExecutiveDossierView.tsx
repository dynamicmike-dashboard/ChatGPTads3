import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Coins, 
  ShieldAlert, 
  Layers, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Globe2, 
  Compass, 
  ArrowRight, 
  Flame, 
  Code2, 
  Check, 
  BookOpen, 
  Printer
} from 'lucide-react';

interface ExecutiveDossierViewProps {
  onStartAssessment: () => void;
  onOpenSimulator: () => void;
  onOpenCourse: () => void;
  onOpenCheckout: () => void;
}

export const ExecutiveDossierView: React.FC<ExecutiveDossierViewProps> = ({
  onStartAssessment,
  onOpenSimulator,
  onOpenCourse,
  onOpenCheckout
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'economics' | 'risks' | 'roadmap' | 'advantages'>('overview');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full pointer-events-none blur-2xl" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> EXECUTIVE STRATEGY DOSSIER & OPPORTUNITY GUIDE
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            The Blueprint for Commercial Domination in <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">ChatGPT Ads</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            A no-nonsense breakdown of why conversational advertising represents the single largest shift in media buying since Google AdWords in 2002 — who it serves, real unit economics, hidden failure modes, and how to execute flawlessly.
          </p>

          {/* Quick Jump Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'overview', label: '1. What & Who It Serves' },
              { id: 'advantages', label: '2. Unfair Strategic Benefits' },
              { id: 'economics', label: '3. Real Costs & Economics' },
              { id: 'risks', label: '4. Risks, Traps & Warnings' },
              { id: 'roadmap', label: '5. Roadmap & What’s Next' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-emerald-500 dark:text-slate-950'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: WHAT IT IS & WHO IT IS AIMED AT */}
      {activeSection === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* What is this app designed to do? */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Core Mission</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">What Is This App Designed To Do?</h2>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              This application is an end-to-end <strong>Readiness Diagnostic, Strategy Blueprint, and Launch Operations Hub</strong> for businesses and agencies seeking to capitalize on OpenAI’s newly launched conversational ads auction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">1. Diagnostic Audit</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Evaluates 6 core dimensions (Offer, Economics, Funnel, Tracking, Trust, and Follow-Up Speed) to tell you precisely whether to launch, fix, or wait.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">2. 12-Part Masterclass</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Step-by-step curriculum covering conversational intent, bid engineering, high-converting offer angles, and GHL CRM automation.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">3. 60 Battle-Tested Prompts</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dynamic variable injection for Google AI Studio, Google Stitch, Antigravity, GoHighLevel, and Teable AI to build your funnel in hours.
                </p>
              </div>
            </div>
          </div>

          {/* Who is it aimed at? */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Target Persona</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Who Is This App Aimed At?</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">B2B Founders & SaaS Executives</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">High LTV</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Companies with average contract values of $1,500+ looking to intercept prospective buyers while they are actively researching workflows, vendor comparisons, or code solutions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Marketing Agencies & Media Buyers</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">$5k/mo Retainers</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Agencies wanting to offer an exclusive "ChatGPT Ads Management & AI Lead Engine" service to high-paying clients ahead of the generic agency crowd.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Consultants, Coaches & High-Ticket B2C</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300">High Intent</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Professional service providers (legal, tax, dental implants, specialized consulting) where clients ask the AI complex problem queries.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">International Expansion Brands</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Cross-Border</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Companies based outside the US/UK (e.g. Mexico, LatAm, Europe, Asia) that want to target high-purchasing-power users in tier-1 markets without costly local infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: UNFAIR ADVANTAGES & SALES INTRO */}
      {activeSection === 'advantages' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-cyan-950/40 border border-emerald-200 dark:border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                THE 2026 CONVERSATIONAL SHIFT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Why Conversational Ads Crush Traditional Search & Social Feeds
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                When a user scrolls Instagram or TikTok, they are looking to be entertained. When a user searches Google, they are wading through 10 blue SEO links. But when a user chats with ChatGPT, they have an <strong className="text-slate-950 dark:text-white">urgent, context-specific problem they need solved right now</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mb-2">3.2x</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Higher Conversion Intent</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ads appear naturally at the end of solution threads when the buyer has already received tactical advice and is ready for the verified vendor.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono mb-2">$3.50</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Average Ground-Floor CPC</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Compare this to Google Search Ads where competitive legal, SaaS, and financial terms regularly trade between $45 and $120 per single click.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono mb-2">Zero</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Banner Blindness</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Sponsored recommendations are presented in conversational dialogue styling, completely bypassing the cognitive ad filters developed by web users.
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={onOpenSimulator}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Zap className="w-4 h-4" /> Test Interactive Ad Simulator
              </button>
              <button
                type="button"
                onClick={onStartAssessment}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Take 3-Minute Diagnostic Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: COSTS, UNIT ECONOMICS & BUDGETS */}
      {activeSection === 'economics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Financial Modeling</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Real Costs, Budgets & Unit Economics</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost Itemization */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-slate-800 pb-2">
                  Direct Line-Item Costs
                </h3>

                <div className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Ad Inventory (Bidding)</span>
                    <span className="text-[11px] text-slate-500">Pay-per-click or CPM dynamically priced</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">$3.00 – $5.50 / click</span>
                </div>

                <div className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Minimum 14-Day Pilot Budget</span>
                    <span className="text-[11px] text-slate-500">Statistically significant test sample (300+ clicks)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">$1,500 – $3,000</span>
                </div>

                <div className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">CRM & Speed-to-Lead Software</span>
                    <span className="text-[11px] text-slate-500">GoHighLevel / Zapier / Teable infrastructure</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">$97 – $297 / mo</span>
                </div>

                <div className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Tracking & Server Attribution</span>
                    <span className="text-[11px] text-slate-500">Server-side CAPI / Webhook logs</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">$0 – $50 / mo</span>
                </div>
              </div>

              {/* Economic Threshold Rule */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>The $500 LTV Golden Rule</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  If you sell a $20 impulse product, paid conversational ads will be difficult to make profitable. But if your <strong>Customer Lifetime Value (LTV) or Average Order Value is $500 to $10,000+</strong>, a $40–$70 lead cost provides 5x–12x ROAS.
                </p>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Target Cost Per Lead:</span>
                    <strong className="text-slate-900 dark:text-white">$35 – $65</strong>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Target Sales Close Rate:</span>
                    <strong className="text-slate-900 dark:text-white">12% – 20%</strong>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Breakeven Customer Value:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">&gt; $350</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: RISKS, CHALLENGES & WARNINGS */}
      {activeSection === 'risks' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Threat Intelligence</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Critical Risks, Failure Modes & Warnings</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30">
                <h3 className="font-bold text-amber-900 dark:text-amber-300 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  1. Speed-to-Lead Latency (&gt;5 Mins = Deal Dies)
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Chat users have zero patience. If they submit a lead form and you wait 4 hours to call or email them, they have already found another solution from the AI. Automated instant SMS/email within 90 seconds is mandatory.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30">
                <h3 className="font-bold text-red-900 dark:text-red-300 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  2. Aggressive Claims & Policy Violations
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  OpenAI enforces strict guidelines against deceptive income claims, unregulated health advice, and manipulative copy. Landing pages must feature transparent business info and disclaimers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  3. The "Static Brochure" Landing Page Disconnect
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  If the ad was tailored to a specific conversation, routing the user to a generic homepage causes 70%+ bounce rates. Destination pages must acknowledge the user’s exact inquiry.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  4. Attribution Blindness
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Referral headers from AI apps are often sanitized or mobile-app sandboxed. Relying solely on client-side Google Analytics will underreport results. Server-side tracking tags are required.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: ROADMAP & WHAT'S NEXT */}
      {activeSection === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Engineering Pipeline</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">What We Built & What Makes This Outstanding</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Live Ad Preview Simulator (Active in App)</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Test your ad copy live in simulated ChatGPT dialog with real-time intent triggers and follow-up prompts.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/30 flex items-start gap-3">
                <Check className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Instant Light/Dark High-Contrast Theme Engine</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Clean, eye-friendly editorial typography with zero dark-slop eye fatigue.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 flex items-start gap-3">
                <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">AI Conversational Copy Generator & Webhook Tester</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Generates 3 distinct ad angles (Problem-to-Solution, Alternative, Diagnostic) and test-pings CRM endpoints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
