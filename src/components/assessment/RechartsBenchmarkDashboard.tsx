import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
  AreaChart,
  Area,
  Line,
  ComposedChart,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { AssessmentResult, CategoryScore } from '../../types';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Coins, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface RechartsBenchmarkDashboardProps {
  result: AssessmentResult;
}

// Industry vertical benchmark baselines (based on ChatGPT Ad pilot campaign datasets)
export const INDUSTRY_BENCHMARKS = {
  b2b_saas: {
    name: 'B2B SaaS & Tech',
    avgScore: 68,
    top10Score: 88,
    avgCpc: '$4.20',
    targetCpa: '$42',
    weights: {
      offer_clarity: 75,
      budget_readiness: 70,
      funnel_readiness: 80,
      tracking_readiness: 85,
      trust_compliance: 65,
      follow_up_speed: 60
    }
  },
  agency_services: {
    name: 'Agencies & Consulting',
    avgScore: 62,
    top10Score: 85,
    avgCpc: '$3.60',
    targetCpa: '$38',
    weights: {
      offer_clarity: 80,
      budget_readiness: 60,
      funnel_readiness: 65,
      tracking_readiness: 55,
      trust_compliance: 70,
      follow_up_speed: 80
    }
  },
  ecommerce_dtc: {
    name: 'E-Commerce & DTC Brands',
    avgScore: 58,
    top10Score: 82,
    avgCpc: '$2.80',
    targetCpa: '$24',
    weights: {
      offer_clarity: 70,
      budget_readiness: 75,
      funnel_readiness: 85,
      tracking_readiness: 75,
      trust_compliance: 50,
      follow_up_speed: 40
    }
  },
  legal_finance: {
    name: 'Legal & Financial Services',
    avgScore: 71,
    top10Score: 92,
    avgCpc: '$6.50',
    targetCpa: '$85',
    weights: {
      offer_clarity: 65,
      budget_readiness: 85,
      funnel_readiness: 70,
      tracking_readiness: 80,
      trust_compliance: 95,
      follow_up_speed: 70
    }
  },
  local_health: {
    name: 'Healthcare & High-Trust Local',
    avgScore: 55,
    top10Score: 80,
    avgCpc: '$3.90',
    targetCpa: '$45',
    weights: {
      offer_clarity: 75,
      budget_readiness: 50,
      funnel_readiness: 60,
      tracking_readiness: 50,
      trust_compliance: 90,
      follow_up_speed: 75
    }
  }
};

type IndustryKey = keyof typeof INDUSTRY_BENCHMARKS;

// Dimension meaning, evaluation criteria, and auction relevance dictionary
export const DIMENSION_DETAILS: Record<string, {
  name: string;
  shortName: string;
  icon: string;
  meaning: string;
  auctionRelevance: string;
  recommendedStandard: string;
  auditChecklist: string[];
  actionAdvice: {
    below: string;
    above: string;
  };
}> = {
  offer_clarity: {
    name: 'Offer & High-Intent Alignment',
    shortName: 'Offer Alignment',
    icon: 'Target',
    meaning: 'Measures how directly your offer answers a specific, acute problem being actively solved in a ChatGPT conversation.',
    auctionRelevance: 'Conversational ad matching is semantic and solution-driven. Vague offers get ignored; precision problem-solvers yield 3.2x higher click-throughs.',
    recommendedStandard: '75%+ (Clear hook, quantified outcome, frictionless entry point)',
    auditChecklist: [
      'Pinpoints exact conversational user query (e.g., "Fix GoHighLevel webhook errors")',
      'Delivers immediate perceived value (checklist, audit, template, instant calculator)',
      'Clear high-ticket monetization path behind initial lead capture'
    ],
    actionAdvice: {
      below: 'Sharpen your headline to answer the exact question users type into ChatGPT, rather than generic company positioning.',
      above: 'Strong conversational resonance. Scale campaign variations targeting adjacent prompt intent clusters.'
    }
  },
  budget_readiness: {
    name: 'Budget & Pilot Capital',
    shortName: 'Budget Capital',
    icon: 'Coins',
    meaning: 'Evaluates your capital readiness to sustain a disciplined 14–30 day testing phase ($1,500–$3,000+) across $3.00–$5.50 CPC auctions.',
    auctionRelevance: 'OpenAI ad algorithms need 300–500 clicks to train intent matching. Stopping with under $1,000 spend leads to false-negative conclusions.',
    recommendedStandard: '70%+ ($1,500 min dedicated pilot budget; $50–$100/day pacing)',
    auditChecklist: [
      'Minimum $1,500 discretionary testing budget without cash-flow anxiety',
      'Realistic expectation of 14-day calibration phase before scaling',
      'Customer LTV > $500 to support $35–$65 target lead acquisition costs'
    ],
    actionAdvice: {
      below: 'Pool at least $1,500 testing budget before launching to ensure statistical validity of your campaign data.',
      above: 'Capital readiness is optimal. Implement disciplined daily pacing caps ($75–$150/day) during calibration.'
    }
  },
  funnel_readiness: {
    name: 'Conversational LP & Funnel',
    shortName: 'Funnel & LP',
    icon: 'Layers',
    meaning: 'Assesses whether your landing page continues the fluid, 1-on-1 dialogue from the AI chat rather than dumping traffic onto a generic homepage.',
    auctionRelevance: 'Traffic arriving from AI conversations expects immediate resolution. Conversational microsites convert at 12–18% vs 2.5% on standard homepages.',
    recommendedStandard: '80%+ (Sub-2s load, query continuity, single clear CTA, minimal form fields)',
    auditChecklist: [
      'Landing page headline mirrors the exact conversational ad hook',
      'Frictionless 2-step qualifying form or interactive diagnostic',
      'Instant value delivery immediately upon form submission'
    ],
    actionAdvice: {
      below: 'Replace standard generic homepage links with dedicated conversational landing pages matching the prompt context.',
      above: 'Funnel setup is battle-ready. Implement A/B tests on lead magnet delivery formats (interactive quiz vs PDF checklist).'
    }
  },
  tracking_readiness: {
    name: 'Server-Side Tracking & CAPI',
    shortName: 'Tracking & CAPI',
    icon: 'BarChart3',
    meaning: 'Verifies server-side event logging (CAPI), webhook infrastructure, and offline conversion tracking back to your CRM.',
    auctionRelevance: 'In-app mobile webviews frequently block third-party cookies. Server-to-server postbacks ensure 100% attribution and protect against budget waste.',
    recommendedStandard: '80%+ (First-party webhooks, UTM passthrough, CRM lifecycle stage sync)',
    auditChecklist: [
      'Server-to-server webhook connection (Zapier, Make, or native API)',
      'UTM parameter capture into CRM contact custom fields',
      'Closed-deal revenue feedback loop to optimize bidding towards high LTV'
    ],
    actionAdvice: {
      below: 'Deploy server-side webhook endpoints to capture leads and log attribution independent of browser cookies.',
      above: 'Tracking architecture is elite. Enable offline deal value synchronization to feed high-intent conversion signals.'
    }
  },
  trust_compliance: {
    name: 'Trust, Proof & Compliance',
    shortName: 'Trust & Proof',
    icon: 'ShieldCheck',
    meaning: 'Audits compliance with OpenAI commercial advertising policies, verifiable client proof, transparent pricing, and policy disclaimers.',
    auctionRelevance: 'Ad safety scanners aggressively penalize aggressive claims, get-rich-quick themes, or undisclosed affiliations. High trust lowers CPC bidding costs.',
    recommendedStandard: '70%+ (Privacy policy, physical address, verified credentials, honest disclosures)',
    auditChecklist: [
      'Full compliance with OpenAI Sponsored Content Policies',
      'Real client proof, third-party ratings, or credential accreditations',
      'Clear, transparent terms of service and privacy links in footer'
    ],
    actionAdvice: {
      below: 'Audit copy for aggressive marketing claims; add required privacy policies, contact info, and verifiable case studies.',
      above: 'Compliance posture is strong. Feature verified badges and client logos prominently in the sponsored dialogue card.'
    }
  },
  follow_up_speed: {
    name: 'Speed-to-Lead Automation',
    shortName: 'Follow-up Speed',
    icon: 'Zap',
    meaning: 'Measures your automated response pipeline velocity (instant SMS, AI voice callback, or automated calendar booking within 90 seconds).',
    auctionRelevance: 'Users in ChatGPT are actively solving problems in real-time. Inbound lead qualification drops by 391% if contact is delayed beyond 5 minutes.',
    recommendedStandard: '75%+ (Automated SMS + instant calendar self-scheduling under 90s)',
    auditChecklist: [
      'Automated 2-way SMS/email triggered within 60 seconds of submission',
      'Embedded calendar booking link on the immediate "Thank You" page',
      'Automated SMS appointment reminder workflow with confirmation triggers'
    ],
    actionAdvice: {
      below: 'Configure automated SMS response workflows to contact every lead within 90 seconds of form submission.',
      above: 'Speed-to-lead is top-tier. Add multi-channel reminders (SMS + WhatsApp + Calendar invite) to maximize show rates.'
    }
  }
};

export const RechartsBenchmarkDashboard: React.FC<RechartsBenchmarkDashboardProps> = ({ result }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>('b2b_saas');
  const [chartView, setChartView] = useState<'overview' | 'comparison' | 'projections' | 'breakdown'>('overview');
  const [includeTopPerformers, setIncludeTopPerformers] = useState(true);
  const [activeHoverDimension, setActiveHoverDimension] = useState<string | null>(null);

  const activeBenchmark = INDUSTRY_BENCHMARKS[selectedIndustry];

  // 1. Radar data preparation
  const radarData = useMemo(() => {
    return result.categoryScores.map((cat) => {
      const industryTarget = activeBenchmark.weights[cat.category] || 65;
      const top10Target = Math.min(100, Math.round(industryTarget * 1.25));
      const details = DIMENSION_DETAILS[cat.category] || {
        name: cat.name,
        shortName: cat.name,
        icon: 'Target',
        meaning: cat.description,
        auctionRelevance: 'Crucial for conversational auction optimization.',
        recommendedStandard: '75%+',
        auditChecklist: [],
        actionAdvice: { below: 'Improve readiness in this dimension.', above: 'Maintain optimal standards.' }
      };

      return {
        categoryKey: cat.category,
        dimension: details.shortName,
        fullName: details.name,
        userScore: cat.score,
        earnedPoints: cat.earnedPoints,
        maxPoints: cat.maxPoints,
        industryAvg: industryTarget,
        top10Benchmark: top10Target,
        meaning: details.meaning,
        auctionRelevance: details.auctionRelevance,
        recommendedStandard: details.recommendedStandard,
        auditChecklist: details.auditChecklist,
        actionAdvice: cat.score >= industryTarget ? details.actionAdvice.above : details.actionAdvice.below,
        fullMark: 100
      };
    });
  }, [result.categoryScores, activeBenchmark]);

  // 2. Bar gap analysis data preparation
  const barGapData = useMemo(() => {
    return result.categoryScores.map((cat) => {
      const industryTarget = activeBenchmark.weights[cat.category] || 65;
      const delta = cat.score - industryTarget;
      const details = DIMENSION_DETAILS[cat.category];
      const shortName = details ? details.shortName : cat.name;

      return {
        name: shortName,
        category: cat.category,
        fullName: details ? details.name : cat.name,
        userScore: cat.score,
        industryBenchmark: industryTarget,
        top10Target: Math.min(100, Math.round(industryTarget * 1.25)),
        delta,
        meaning: details?.meaning || cat.description,
        auctionRelevance: details?.auctionRelevance || '',
        actionAdvice: cat.score >= industryTarget ? details?.actionAdvice.above : details?.actionAdvice.below,
        status: delta >= 10 ? 'Ahead of Market' : delta >= -5 ? 'Competitive' : 'Requires Optimization'
      };
    });
  }, [result.categoryScores, activeBenchmark]);

  // 3. Projections Curve: CAC vs Conversion Rate vs Spend Scale
  const projectionData = useMemo(() => {
    const scoreFactor = Math.max(0.4, result.totalScore / 100);
    const benchmarkFactor = activeBenchmark.avgScore / 100;

    const budgetTiers = [
      { spend: '$500', spendNum: 500 },
      { spend: '$1,000', spendNum: 1000 },
      { spend: '$2,500', spendNum: 2500 },
      { spend: '$5,000', spendNum: 5000 },
      { spend: '$10,000', spendNum: 10000 },
      { spend: '$20,000', spendNum: 20000 }
    ];

    return budgetTiers.map((tier) => {
      const baseClicks = tier.spendNum / 4.0; // $4 CPC
      const userConvRate = Number((2.5 * scoreFactor).toFixed(1));
      const benchmarkConvRate = Number((2.5 * benchmarkFactor).toFixed(1));
      
      const userLeads = Math.round(baseClicks * (userConvRate / 100));
      const benchmarkLeads = Math.round(baseClicks * (benchmarkConvRate / 100));
      
      const userCpl = userLeads > 0 ? Math.round(tier.spendNum / userLeads) : 150;
      const benchmarkCpl = benchmarkLeads > 0 ? Math.round(tier.spendNum / benchmarkLeads) : 120;

      return {
        spend: tier.spend,
        userLeads,
        benchmarkLeads,
        userCpl,
        benchmarkCpl,
        userConvRate,
        benchmarkConvRate
      };
    });
  }, [result.totalScore, activeBenchmark]);

  // Selected or active hover dimension for the detail spotlight box
  const currentDimensionDetail = useMemo(() => {
    const key = activeHoverDimension || 'offer_clarity';
    return DIMENSION_DETAILS[key] || DIMENSION_DETAILS.offer_clarity;
  }, [activeHoverDimension]);

  const currentCategoryScore = useMemo(() => {
    const key = activeHoverDimension || 'offer_clarity';
    return result.categoryScores.find(c => c.category === key) || result.categoryScores[0];
  }, [activeHoverDimension, result.categoryScores]);

  // Enhanced Descriptive Tooltip for Recharts Radar
  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isAdvantage = data.userScore >= data.industryAvg;
      const delta = data.userScore - data.industryAvg;

      return (
        <div className="bg-slate-900/98 text-white p-4 rounded-2xl border border-slate-700 shadow-2xl text-xs space-y-3 backdrop-blur-xl max-w-xs sm:max-w-sm pointer-events-none animate-fadeIn">
          {/* Header */}
          <div className="border-b border-slate-800 pb-2 flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                ASSESSMENT DIMENSION
              </span>
              <h4 className="font-bold text-white text-sm leading-tight">
                {data.fullName}
              </h4>
            </div>
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap ${
              isAdvantage ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {isAdvantage ? `+${delta}% vs Median` : `${delta}% Gap`}
            </span>
          </div>

          {/* Dimension Meaning / Evaluation Definition */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              📖 What This Dimension Evaluates:
            </span>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              {data.meaning}
            </p>
          </div>

          {/* Auction Relevance */}
          <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block flex items-center gap-1">
              <Zap className="w-3 h-3" /> Conversational Auction Impact:
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {data.auctionRelevance}
            </p>
          </div>

          {/* Score Comparison Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-[11px]">
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-1.5 text-center">
              <span className="text-[9px] text-emerald-400 block uppercase font-mono">You</span>
              <span className="font-mono font-bold text-emerald-300 text-xs">{data.userScore}%</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-1.5 text-center">
              <span className="text-[9px] text-cyan-400 block uppercase font-mono">Sector Median</span>
              <span className="font-mono font-bold text-cyan-300 text-xs">{data.industryAvg}%</span>
            </div>
            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-1.5 text-center">
              <span className="text-[9px] text-indigo-400 block uppercase font-mono">Top 10% Decile</span>
              <span className="font-mono font-bold text-indigo-300 text-xs">{data.top10Benchmark}%</span>
            </div>
          </div>

          {/* Prescribed Action Tip */}
          <div className="pt-1 text-[10px] text-slate-300 flex items-start gap-1.5 border-t border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong className="text-white">Prescribed Action:</strong> {data.actionAdvice}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Bar Gap
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-white text-sm border-b border-slate-800 pb-1">{data.name}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-emerald-400 font-semibold">Your Score:</span>
            <span className="font-mono font-bold text-white">{data.userScore}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-cyan-400 font-semibold">Industry Median:</span>
            <span className="font-mono font-bold text-white">{data.industryBenchmark}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-indigo-400 font-semibold">Top 10% Benchmark:</span>
            <span className="font-mono font-bold text-white">{data.top10Target}%</span>
          </div>
          <div className="pt-1.5 border-t border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Readiness Gap:</span>
            <span className={`font-mono font-bold ${data.delta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {data.delta >= 0 ? `+${data.delta}% Advantage` : `${data.delta}% Gap`}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Projections
  const CustomProjectionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl border border-slate-700 shadow-xl text-xs space-y-2 backdrop-blur-md">
          <p className="font-bold text-emerald-400 text-sm border-b border-slate-800 pb-1">Monthly Test Budget: {label}</p>
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Your Projected Qualified Leads:</span>
              <span className="font-mono font-bold text-emerald-400">{data.userLeads} leads/mo</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Your Projected Cost per Lead (CPL):</span>
              <span className="font-mono font-bold text-emerald-400">${data.userCpl}</span>
            </div>
          </div>
          <div className="space-y-1 pt-1.5 border-t border-slate-800 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Industry Median Leads:</span>
              <span className="font-mono text-cyan-300">{data.benchmarkLeads} leads</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Industry Median CPL:</span>
              <span className="font-mono text-cyan-300">${data.benchmarkCpl}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Top Header & Industry Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> RECHARTS BENCHMARK ENGINE
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Ads Readiness vs. Industry Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Compare your 6-dimension commercial profile against aggregated conversational ad performance cohorts.
          </p>
        </div>

        {/* Industry Sector Dropdown Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Compare Sector:
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value as IndustryKey)}
            className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm"
          >
            {Object.entries(INDUSTRY_BENCHMARKS).map(([key, data]) => (
              <option key={key} value={key}>
                {data.name} (Median: {data.avgScore}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation View Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setChartView('overview')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              chartView === 'overview'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" /> 6-D Radar Matrix
          </button>

          <button
            type="button"
            onClick={() => setChartView('comparison')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              chartView === 'comparison'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Gap Analysis (Bars)
          </button>

          <button
            type="button"
            onClick={() => setChartView('projections')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              chartView === 'projections'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Projected Pipeline & CAC
          </button>
        </div>

        {/* Benchmark Toggle Pill */}
        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeTopPerformers}
            onChange={(e) => setIncludeTopPerformers(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <span className="font-medium">Show Top 10% High-Performance Decile</span>
        </label>
      </div>

      {/* KPI Metric Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Your Overall Score</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">{result.totalScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-0.5">
            {result.totalScore >= activeBenchmark.avgScore ? `+${result.totalScore - activeBenchmark.avgScore}% above sector avg` : `${result.totalScore - activeBenchmark.avgScore}% below sector avg`}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">{activeBenchmark.name} Median</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">{activeBenchmark.avgScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Est. CPC: {activeBenchmark.avgCpc}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Top 10% Decile Target</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">{activeBenchmark.top10Score}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">
            Optimal Launch Threshold
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Target Lead CPA</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">{activeBenchmark.targetCpa}</span>
            <span className="text-xs text-slate-400">per lead</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Sub-90s follow-up standard
          </span>
        </div>
      </div>

      {/* Main Chart Rendering Area */}
      <div className="pt-2">
        {/* VIEW 1: RECHARTS RADAR CHART */}
        {chartView === 'overview' && (
          <div className="space-y-6">
            {/* Top Hover Guidance Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>Interactive Dimension Tooltips:</strong> Hover over any vertex or axis on the radar chart (or click dimension pills below) to inspect exact evaluation criteria & auction impact.
                </span>
              </div>
            </div>

            {/* Radar Chart Container */}
            <div className="h-[400px] sm:h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="dimension" 
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#94a3b8', fontSize: 9 }}
                  />
                  
                  {/* Industry Average Radar */}
                  <Radar
                    name={`${activeBenchmark.name} Median`}
                    dataKey="industryAvg"
                    stroke="#0891b2"
                    fill="#0891b2"
                    fillOpacity={0.18}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />

                  {/* Top 10% Decile Radar */}
                  {includeTopPerformers && (
                    <Radar
                      name="Top 10% Performance Target"
                      dataKey="top10Benchmark"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.12}
                      strokeWidth={1.5}
                      strokeDasharray="6 3"
                    />
                  )}

                  {/* User Score Radar */}
                  <Radar
                    name="Your Assessed Score"
                    dataKey="userScore"
                    stroke="#059669"
                    fill="#059669"
                    fillOpacity={0.45}
                    strokeWidth={3}
                  />

                  <Tooltip content={<CustomRadarTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: 12, fontSize: 12, fontWeight: 600 }} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Interactive Dimension Meaning Spotlight Bar */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Explore Dimension Definitions & Audit Criteria:
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Click any dimension to reveal audit depth
                </span>
              </div>

              {/* Dimension Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {Object.entries(DIMENSION_DETAILS).map(([key, details]) => {
                  const isSelected = (activeHoverDimension || 'offer_clarity') === key;
                  const catScore = result.categoryScores.find(c => c.category === key);
                  const score = catScore ? catScore.score : 0;
                  const isPassing = score >= (activeBenchmark.weights[key as keyof typeof activeBenchmark.weights] || 65);

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveHoverDimension(key)}
                      onMouseEnter={() => setActiveHoverDimension(key)}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                          : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block truncate">
                        {details.shortName}
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
                          {score}%
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isPassing ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Dimension Explainer Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3.5 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                      DIMENSION DEEP DIVE
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {currentDimensionDetail.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Your Assessed Score</span>
                      <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                        {currentCategoryScore.score}% ({currentCategoryScore.earnedPoints}/{currentCategoryScore.maxPoints} pts)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Sector Target</span>
                      <span className="font-mono font-bold text-sm text-cyan-600 dark:text-cyan-400">
                        {activeBenchmark.weights[currentCategoryScore.category] || 65}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <strong className="text-slate-900 dark:text-white font-bold block flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      What This Dimension Evaluates:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentDimensionDetail.meaning}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-slate-900 dark:text-white font-bold block flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      Why It Matters for ChatGPT Ads:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentDimensionDetail.auctionRelevance}
                    </p>
                  </div>
                </div>

                {/* Audit Checklist & Prescribed Action */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-1.5">
                    <strong className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wider">
                      Optimal Launch Criteria:
                    </strong>
                    <ul className="space-y-1">
                      {currentDimensionDetail.auditChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                      RECOMMENDED ACTION STEP:
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentCategoryScore.score >= (activeBenchmark.weights[currentCategoryScore.category] || 65)
                        ? currentDimensionDetail.actionAdvice.above
                        : currentDimensionDetail.actionAdvice.below}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Interpretation Note */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Interpretation:</strong> The solid green polygon displays your capability across all 6 axes. When your score perimeter exceeds the dotted cyan baseline ({activeBenchmark.avgScore}%), you have an asymmetric arbitrage advantage over competitors entering the ChatGPT conversational ad auctions.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RECHARTS GROUPED BAR GAP ANALYSIS */}
        {chartView === 'comparison' && (
          <div className="space-y-4">
            <div className="h-[380px] sm:h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barGapData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    unit="%"
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12, fontWeight: 600 }} />
                  <ReferenceLine y={75} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Launch Target (75%)', fill: '#059669', fontSize: 10, position: 'right' }} />

                  <Bar 
                    name="Your Score" 
                    dataKey="userScore" 
                    fill="#059669" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <Bar 
                    name={`${activeBenchmark.name} Median`} 
                    dataKey="industryBenchmark" 
                    fill="#0891b2" 
                    radius={[6, 6, 0, 0]} 
                  />
                  {includeTopPerformers && (
                    <Bar 
                      name="Top 10% Benchmark" 
                      dataKey="top10Target" 
                      fill="#818cf8" 
                      radius={[6, 6, 0, 0]} 
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gap Analysis Summary Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {barGapData.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.name}</span>
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg ${
                      item.delta >= 0 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
                    }`}>
                      {item.delta >= 0 ? `+${item.delta}%` : `${item.delta}%`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>You: <strong className="text-slate-800 dark:text-slate-200">{item.userScore}%</strong></span>
                    <span>Median: <strong className="text-slate-800 dark:text-slate-200">{item.industryBenchmark}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: RECHARTS COMPOSED CHART (PROJECTED PIPELINE & CPL) */}
        {chartView === 'projections' && (
          <div className="space-y-4">
            <div className="h-[380px] sm:h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={projectionData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="spend" 
                    tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#059669', fontSize: 10 }}
                    label={{ value: 'Qualified Leads / Mo', angle: -90, position: 'insideLeft', fill: '#059669', fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#0891b2', fontSize: 10 }}
                    unit="$"
                    label={{ value: 'Estimated Cost Per Lead ($)', angle: 90, position: 'insideRight', fill: '#0891b2', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomProjectionTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12, fontWeight: 600 }} />

                  {/* Area for user leads */}
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="userLeads"
                    name="Your Projected Leads (Volume)"
                    fill="#10b981"
                    fillOpacity={0.25}
                    stroke="#059669"
                    strokeWidth={2.5}
                  />

                  {/* Line for Industry Median leads */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="benchmarkLeads"
                    name="Sector Average Lead Volume"
                    stroke="#0891b2"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />

                  {/* Line for User CPL */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="userCpl"
                    name="Your Projected CPL ($)"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
              <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Unit Economics Projection:</strong> At your assessed readiness score of <strong>{result.totalScore}/100</strong>, a $2,500 monthly pilot is projected to yield <strong>{projectionData[2].userLeads} qualified sales conversations</strong> at approximately <strong>${projectionData[2].userCpl} per conversation</strong>, compared to the {activeBenchmark.name} average of ${projectionData[2].benchmarkCpl}.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
