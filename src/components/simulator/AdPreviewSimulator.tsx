import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Play, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Zap,
  Globe2,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdPreviewSimulator: React.FC = () => {
  // Simulator State
  const [userQuery, setUserQuery] = useState('What is the best way to generate B2B pipeline without spending $10k on cold outbound SDRs?');
  const [brandName, setBrandName] = useState('GrowthPilot AI');
  const [adHeadline, setAdHeadline] = useState('Conversational ChatGPT Ads & CRM Acceleration');
  const [adDescription, setAdDescription] = useState('Deploy intent-driven conversational ad funnels that capture buyers in mid-thread with guaranteed <90s lead routing.');
  const [displayUrl, setDisplayUrl] = useState('growthpilot.io/chatgpt-ads');
  const [callToAction, setCallToAction] = useState('Get Free Audit & Blueprint');
  const [targetMarket, setTargetMarket] = useState('United States & UK');
  
  const [copied, setCopied] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [selectedHookAngle, setSelectedHookAngle] = useState<'solution' | 'alternative' | 'diagnostic'>('solution');

  // Pre-set AI Hook Generators
  const hookTemplates = {
    solution: {
      headline: 'Automated Pipeline Engine for High-Growth B2B',
      description: 'Stop burning cash on low-intent cold emails. Capture active problem solvers with real-time conversational ads.',
      query: 'How can our B2B SaaS reduce CAC and scale lead volume this quarter?'
    },
    alternative: {
      headline: 'The High-Intent Alternative to Expensive Google Search Ads',
      description: 'Why pay $65 per click on Google when you can capture high-intent problem solvers for $3.50 CPC in ChatGPT?',
      query: 'What are the most cost-effective alternatives to Google Ads for legal and financial services?'
    },
    diagnostic: {
      headline: '18-Point ChatGPT Ads Commercial Readiness Audit',
      description: 'Find out in 3 minutes if your offer, unit economics, and CRM are ready for conversational ad auctions.',
      query: 'Is our business model suitable for advertising directly on AI platforms like ChatGPT and Gemini?'
    }
  };

  const applyHook = (type: 'solution' | 'alternative' | 'diagnostic') => {
    setSelectedHookAngle(type);
    const h = hookTemplates[type];
    setAdHeadline(h.headline);
    setAdDescription(h.description);
    setUserQuery(h.query);
  };

  const handleTestWebhook = () => {
    setWebhookStatus('testing');
    setTimeout(() => {
      setWebhookStatus('success');
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
      setTimeout(() => setWebhookStatus('idle'), 3500);
    }, 900);
  };

  const copyAdJson = () => {
    const payload = JSON.stringify({
      campaign_name: `${brandName} - ChatGPT Conversational In-Stream`,
      target_market: targetMarket,
      trigger_query: userQuery,
      sponsored_card: {
        brand: brandName,
        headline: adHeadline,
        copy: adDescription,
        url: `https://${displayUrl}`,
        cta: callToAction
      },
      bidding_strategy: 'Max Intent CPC ($3.80 target)'
    }, null, 2);

    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 mb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> LIVE INTERACTIVE CONVERSATIONAL AD SIMULATOR
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Visual Ad Preview & Hook Testing Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Preview exactly how your sponsored recommendation card will render within an active ChatGPT dialogue thread before committing ad spend.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyAdJson}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Campaign JSON' : 'Export Ad Spec'}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Hook Fast-Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-2">
          1-Click Conversational Hook Templates
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => applyHook('solution')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedHookAngle === 'solution'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-slate-900 dark:text-white'
                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">Angle 1</span>
            <strong className="text-xs block">Problem-to-Solution Hook</strong>
          </button>

          <button
            type="button"
            onClick={() => applyHook('alternative')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedHookAngle === 'alternative'
                ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500 text-slate-900 dark:text-white'
                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 block">Angle 2</span>
            <strong className="text-xs block">Search Ad Alternative Hook</strong>
          </button>

          <button
            type="button"
            onClick={() => applyHook('diagnostic')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedHookAngle === 'diagnostic'
                ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-slate-900 dark:text-white'
                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block">Angle 3</span>
            <strong className="text-xs block">Diagnostic / Lead Magnet Hook</strong>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout: Controls & Realistic Chat Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-lg space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Ad Creative & Trigger Parameters
            </h3>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Trigger User Query (Chat Context)
              </label>
              <textarea
                rows={2}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Market
                </label>
                <input
                  type="text"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Ad Headline
              </label>
              <input
                type="text"
                value={adHeadline}
                onChange={(e) => setAdHeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Ad Body Copy (Value Prop & Proof)
              </label>
              <textarea
                rows={3}
                value={adDescription}
                onChange={(e) => setAdDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Display URL
                </label>
                <input
                  type="text"
                  value={displayUrl}
                  onChange={(e) => setDisplayUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Button Call-to-Action
                </label>
                <input
                  type="text"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* GHL Webhook Simulator Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={webhookStatus === 'testing'}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
              >
                {webhookStatus === 'testing' ? (
                  <>Pinging GoHighLevel Webhook...</>
                ) : webhookStatus === 'success' ? (
                  <>
                    <Check className="w-4 h-4" /> Webhook 200 OK • Payload Dispatched!
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" /> Test Lead Webhook Dispatch
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Realistic ChatGPT Conversation Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-800 space-y-6">
            {/* ChatGPT Thread Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-200">ChatGPT 4o</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Free / Go Tier</span>
              </div>
              <span className="text-[11px] text-slate-500">{targetMarket} Session</span>
            </div>

            {/* User Question Bubble */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tr-none px-4 py-3 text-xs sm:text-sm max-w-lg leading-relaxed shadow-sm">
                {userQuery}
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                You
              </div>
            </div>

            {/* AI Assistant Answer */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="space-y-3 flex-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  To generate a consistent B2B pipeline without relying on expensive outbound SDR overhead, leading modern operators focus on three strategic pillars:
                </p>

                <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
                  <li><strong>Intent-Driven Conversational Placements:</strong> Intercepting buyers while they actively troubleshoot workflow issues.</li>
                  <li><strong>Sub-90-Second Lead Routing:</strong> Automating instant SMS/email triggers to reduce inbound pipeline drop-off.</li>
                  <li><strong>Diagnostic Lead Magnets:</strong> Offering a commercial score or assessment rather than a generic brochure.</li>
                </ol>

                {/* THE LIVE SPONSORED CARD (NATIVE IN-THREAD AD) */}
                <div className="mt-4 pt-2">
                  <div className="bg-slate-950 border-2 border-emerald-500/60 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden transition-all hover:border-emerald-400">
                    {/* Top Sponsored Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Sponsored Solution • Verified Partner
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{displayUrl}</span>
                    </div>

                    {/* Headline */}
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      {adHeadline}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {adDescription}
                    </p>

                    {/* CTA Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <span className="text-[11px] font-bold text-slate-400">
                        Provided by <strong className="text-white">{brandName}</strong>
                      </span>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {callToAction} <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic pt-1">
                  Would you like a step-by-step breakdown of how to structure the campaign bidding logic and attribution tags for this strategy?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
