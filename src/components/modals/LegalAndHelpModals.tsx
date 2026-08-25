import React, { useState } from 'react';
import { ModalType } from '../../types';
import { X, ShieldCheck, FileText, Smartphone, Laptop, Apple, HelpCircle, Mail, Download, Check, Sparkles, BookOpen } from 'lucide-react';

interface LegalAndHelpModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  deferredPrompt?: any;
  onOpenCheckout?: () => void;
  language?: 'en' | 'es';
}

export const LegalAndHelpModals: React.FC<LegalAndHelpModalsProps> = ({
  activeModal,
  onClose,
  deferredPrompt,
  onOpenCheckout
}) => {
  const [installSuccess, setInstallSuccess] = useState(false);
  const [supportMessageSent, setSupportMessageSent] = useState(false);

  if (!activeModal || activeModal === 'checkout') return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
      }
    } else {
      setInstallSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[88vh] overflow-y-auto text-slate-900 dark:text-white">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. TERMS MODAL */}
        {activeModal === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Terms of Use</h3>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
              <p>
                <strong>1. Permitted License:</strong> By purchasing or accessing this course and Progressive Web App, you are granted a non-exclusive, non-transferable license to use all lesson materials, prompt libraries, spreadsheets, and bonus swipe files for your own direct business operations or internal client campaigns.
              </p>
              <p>
                <strong>2. Intellectual Property & Redistribution:</strong> You may not resell, white-label as a standalone course, publicly republish, or distribute the raw curriculum, code, or prompt repositories without express prior written authorization.
              </p>
              <p>
                <strong>3. Platform Updates & Revisions:</strong> Because OpenAI, Google, Anthropic, and Perplexity update ad policies dynamically, course content is maintained with periodic revisions. Access is guaranteed for the operational lifetime of the platform.
              </p>
              <p>
                <strong>4. Refund Policy:</strong> We offer a 30-day satisfaction guarantee. If the 12-part masterclass does not deliver tangible clarity for your conversational advertising strategy, contact support for a prompt refund.
              </p>
            </div>
          </div>
        )}

        {/* 2. PRIVACY MODAL */}
        {activeModal === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Privacy & Data Governance</h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
              <p>
                <strong>1. Data Collection:</strong> We collect only the information you voluntarily submit (such as email, business type, and diagnostic questionnaire answers) to generate your custom readiness report and deliver course materials.
              </p>
              <p>
                <strong>2. Third-Party Integrations:</strong> Payments are processed securely via Stripe. We never store or transmit raw credit card numbers. Automated report deliveries may utilize GoHighLevel webhooks with encrypted transit.
              </p>
              <p>
                <strong>3. No Sale of Information:</strong> We do not sell, rent, or trade your personal or business data to third-party data brokers.
              </p>
              <p>
                <strong>4. Right to Deletion:</strong> You may request full deletion of your contact records at any time by contacting our data protection officer via the support modal.
              </p>
            </div>
          </div>
        )}

        {/* 3. DISCLAIMER MODAL */}
        {activeModal === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Advertising & Results Disclaimer</h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
              <p>
                <strong>1. Educational Material:</strong> This playbook and software provide strategic frameworks, technical examples, and diagnostic tools. We do not guarantee specific monetary return on ad spend (ROAS) or customer acquisition outcomes, as results depend upon individual execution, offer quality, market demand, and ad platform auction dynamics.
              </p>
              <p>
                <strong>2. Independent Publication:</strong> This product is independently created for commercial media buyers and business owners. It is not endorsed, sponsored, or directly affiliated with OpenAI, Google LLC, Anthropic PBC, or Perplexity Inc.
              </p>
              <p>
                <strong>3. Ad Platform Policy Compliance:</strong> You remain solely responsible for ensuring your advertising campaigns comply with OpenAI’s usage policies, trade compliance rules, FTC guidelines, and local jurisdiction advertising laws.
              </p>
            </div>
          </div>
        )}

        {/* 4. USER MANUAL MODAL */}
        {activeModal === 'manual' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">User Manual & PWA Guide</h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step 1: Take the Diagnostic Audit</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Start with the 18-point readiness questionnaire to benchmark your offer, budget, funnel, tracking, trust, and speed-to-lead capabilities against high-performing campaigns.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step 2: Study the 12 Curriculum Modules</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Work through the 4 phases (Foundations, Economics & Risk, Strategy & Funnel, Launch & Scale). Set your global prompt variables to auto-populate in all 60 module prompts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step 3: Deploy Bonus Swipes & Retainer Kit</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Use the 18-point checklist and client proposal templates in the Bonuses section to quote client projects or execute in-house.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. INSTALL PWA MODAL */}
        {activeModal === 'install' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Install Progressive Web App (PWA)</h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <p className="leading-relaxed">
                This playbook is built as an offline-capable, standalone Progressive Web App. You can install it directly on iOS, Android, macOS, or Windows for instant 1-tap home-screen access.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                    <Apple className="w-4 h-4 text-slate-700 dark:text-slate-300" /> iOS / Safari Instructions
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>Tap the <strong>Share</strong> icon in Safari.</li>
                    <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                    <li>Tap <strong>Add</strong> in the top-right corner.</li>
                  </ol>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                    <Laptop className="w-4 h-4 text-slate-700 dark:text-slate-300" /> Chrome / Edge / Android
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>Click the install icon in the URL address bar or menu.</li>
                    <li>Select <strong>Install App</strong>.</li>
                    <li>Launch instantly in full-screen window.</li>
                  </ol>
                </div>
              </div>

              {deferredPrompt && (
                <button
                  type="button"
                  onClick={handleNativeInstall}
                  className="w-full py-3 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Install Application to Device
                </button>
              )}

              {installSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> App ready for offline and home-screen access!
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. SUPPORT & CONSULTATION MODAL */}
        {activeModal === 'support' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Strategy Support & Consultation</h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <p className="leading-relaxed">
                Need bespoke assistance structuring your conversational ad offer, setting up server-side attribution, or training your agency team? Send an inquiry below.
              </p>

              {supportMessageSent ? (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 text-center space-y-2">
                  <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Consultation Request Received</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Our lead media strategist will review your query and reply within 1 business day.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSupportMessageSent(true);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="operator@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Consultation Query / Campaign Scope</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your business model, target geography (e.g. US, UK, Mexico), and monthly test budget..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all cursor-pointer"
                  >
                    Submit Strategy Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 7. EXECUTIVE GUIDE TEASER MODAL */}
        {activeModal === 'guide_teaser' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">PREMIUM RESOURCE</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Executive Guide & Strategic Dossier</h3>
              </div>
            </div>

            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
              <p>
                Unlock the complete, unredacted executive strategist playbook designed for media buyers, founders, and marketing directors.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Strategic Arbitrage</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Frameworks to sell conversational ad setup and management to clients for $3,500/mo+ retainers.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Platform Intelligence</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Deep comparative analysis between OpenAI, Claude, Gemini, and Perplexity ad monetization policies.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-center space-y-3">
                <p className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  Get instant access to the Strategic Guide, 60 Advanced Prompts, Ad Simulator, and all 3 Bonus Suites today.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCheckout?.();
                  }}
                  className="w-full py-3 sm:py-3.5 px-6 rounded-xl text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Enroll for $72 - Get Full Masterclass Access
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. AD SIMULATOR TEASER MODAL */}
        {activeModal === 'simulator_teaser' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-wider block">INTERACTIVE UTILITY</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">ChatGPT Ad Preview Simulator</h3>
              </div>
            </div>

            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
              <p>
                Prototype, preview, and optimize your conversational ads in real-time before pushing budgets live.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">In-Feed Visual Mockups</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">See exactly how your sponsored answers will look integrated into organic conversational threads.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">CTR & Intent Estimator</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Input target terms and estimate interaction yields based on initial live bidding benchmarks.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/30 text-center space-y-3">
                <p className="text-xs font-bold text-cyan-900 dark:text-cyan-200">
                  Get instant access to the Ad Simulator, 60 Advanced Prompts, Strategic Guide, and all 3 Bonus Suites today.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCheckout?.();
                  }}
                  className="w-full py-3 sm:py-3.5 px-6 rounded-xl text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Enroll for $72 - Get Full Masterclass Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
