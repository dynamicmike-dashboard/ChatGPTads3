import React, { useState, useEffect } from 'react';
import { ActiveTab, AssessmentResult, ModalType, ThemeMode, Language, CourseSubTab } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SalesLandingView } from './components/sales/SalesLandingView';
import { FullAccessDashboard } from './components/sales/FullAccessDashboard';
import { ExecutiveDossierView } from './components/dossier/ExecutiveDossierView';
import { AdPreviewSimulator } from './components/simulator/AdPreviewSimulator';
import { AssessmentQuiz } from './components/assessment/AssessmentQuiz';
import { AssessmentResultView } from './components/assessment/AssessmentResultView';
import { CourseDashboard } from './components/course/CourseDashboard';
import { PromptVaultView } from './components/course/PromptVaultView';
import { BonusesView } from './components/bonuses/BonusesView';
import { StripeCheckoutModal } from './components/checkout/StripeCheckoutModal';
import { LegalAndHelpModals } from './components/modals/LegalAndHelpModals';
import { GHLLeadCapture } from './components/assessment/GHLLeadCapture';
import { ScrollHeroFrames } from './components/hero/ScrollHeroFrames';
import { COURSE_LESSONS } from './data/courseData';
import { Sparkles, BookOpen, ArrowRight, ShieldCheck, Zap, Star, Gift, ChevronDown, ChevronUp } from 'lucide-react';

// deferredPrompt MUST be a global variable for Service Worker access
// React state is scoped to the component and causes "deferredPrompt is not defined" errors
// when Service Worker code tries to access it globally.
let deferredPrompt: any = null;

// Hook into PWA beforeinstallprompt event - use global variable, NOT React state
window.addEventListener('beforeinstallprompt', (e: any) => {
  e.preventDefault();
  deferredPrompt = e;
});

export default function App() {
  // Initialize activeTab from URL path on first render
  const getInitialTab = (): ActiveTab => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/course' || path === '/prompts' || path === '/bonuses') return 'course';
      if (path === '/dashboard') return 'dashboard';
      if (path === '/dossier') return 'dossier';
      if (path === '/simulator') return 'simulator';
      if (path === '/assessment') return 'assessment';
    }
    return 'sales';
  };

  const getInitialCourseSubTab = (): CourseSubTab => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/prompts') return 'prompts';
      if (path === '/bonuses') return 'bonuses';
    }
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [courseSubTab, setCourseSubTab] = useState<CourseSubTab>(getInitialCourseSubTab);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(false);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(1);

  // Sync URL with activeTab changes
  useEffect(() => {
    const pathMap: Record<ActiveTab, string> = {
      sales: '/',
      dashboard: '/dashboard',
      dossier: '/dossier',
      simulator: '/simulator',
      assessment: '/assessment',
      course: '/course',
    };
    let newPath = pathMap[activeTab];
    if (activeTab === 'course') {
      if (courseSubTab === 'prompts') newPath = '/prompts';
      if (courseSubTab === 'bonuses') newPath = '/bonuses';
    }
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  }, [activeTab, courseSubTab]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
      setCourseSubTab(getInitialCourseSubTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Theme Mode: Default to clean high-contrast 'light' mode
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('chatgpt_ads_theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chatgpt_ads_theme', themeMode);
    } catch (e) {
      console.error(e);
    }
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Language: Default to English
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('chatgpt_ads_language');
      return (saved === 'en' || saved === 'es') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chatgpt_ads_language', language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(() => {
    try {
      const saved = localStorage.getItem('chatgpt_ads_assessment_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [hasPurchased, setHasPurchased] = useState<boolean>(() => {
    try {
      return localStorage.getItem('chatgpt_ads_has_purchased') === 'true';
    } catch {
      return false;
    }
  });

  const [hasLeadCaptured, setHasLeadCaptured] = useState<boolean>(() => {
    try { return !!localStorage.getItem('chatgpt_ads_lead'); } catch { return false; }
  });
  
  // First-visit gate: lock everything except diagnostic until GHL capture
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    try { return !localStorage.getItem('chatgpt_ads_visited'); } catch { return true; }
  });
  
  // Lock state: true = only diagnostic accessible, false = full access
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    try {
      const visited = localStorage.getItem('chatgpt_ads_visited');
      const lead = localStorage.getItem('chatgpt_ads_lead');
      return !visited || !lead;
    } catch { return true; }
  });
  
  const [checkoutPlan, setCheckoutPlan] = useState<'full' | 'course'>('full');
  
  // Payment gate: 'free' | 'full' ($72) | 'course' ($297)
  const [paymentStatus, setPaymentStatus] = useState<'free' | 'full' | 'course'>('free');

  const openCheckout = (plan: 'full' | 'course') => {
    setCheckoutPlan(plan);
    setActiveModal('checkout');
  };

  // Dev/Admin preview mode password (for testing)
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [previewPassword, setPreviewPassword] = useState<string>('');

  const PREVIEW_PASSWORD = 'chatgpt-ads-2026';

  // Check for preview mode
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chatgpt_ads_preview_mode');
      if (saved === 'true') setIsPreviewMode(true);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('chatgpt_ads_preview_mode', isPreviewMode.toString());
    } catch (e) {}
  }, [isPreviewMode]);

  // Save assessment result
  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setIsTakingQuiz(false);
    setActiveTab('assessment');
    // Mark as visited on completion
    if (isFirstVisit) {
      localStorage.setItem('chatgpt_ads_visited', 'true');
      setIsFirstVisit(false);
    }
    try {
      localStorage.setItem('chatgpt_ads_assessment_result', JSON.stringify(result));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetakeAssessment = () => {
    setIsTakingQuiz(true);
    setActiveTab('assessment');
  };

  const handleStartAssessment = () => {
    setIsTakingQuiz(true);
    setActiveTab('assessment');
    // Mark as visited on first assessment start
    if (isFirstVisit) {
      localStorage.setItem('chatgpt_ads_visited', 'true');
      setIsFirstVisit(false);
      setIsLocked(true);
    }
  };

  const handlePurchaseSuccess = (sessionId: string, plan: 'full' | 'course') => {
    setHasPurchased(true);
    setPaymentStatus(plan);
    try {
      localStorage.setItem('chatgpt_ads_has_purchased', 'true');
      localStorage.setItem('chatgpt_ads_payment_status', plan);
      localStorage.setItem('chatgpt_ads_session_id', sessionId);
    } catch (err) {
      console.error(err);
    }
    setActiveModal(null);
    // Redirect based on plan
    if (plan === 'full') {
      setActiveTab('dashboard'); // Full Access Dashboard for $72
    } else {
      setActiveTab('course'); // Course Dashboard for $297
    }
  };

  // Helper: check if user can access a tab's FULL content
  const canAccessContent = (tab: ActiveTab): boolean => {
    if (isPreviewMode) return true;
    if (isLocked) return tab === 'assessment'; // Only assessment when locked
    if (paymentStatus === 'full') {
      // Full access ($72): all tabs except course (separate product)
      return tab !== 'course';
    }
    if (paymentStatus === 'course') {
      // Course access ($297): course, prompts, assessment
      return ['course', 'prompts', 'assessment'].includes(tab);
    }
    // Free users: only assessment content accessible (for taking quiz)
    return tab === 'assessment';
  };

  // For free users: show teaser instead of content
  const showTeaser = (tab: ActiveTab): boolean => {
    if (isPreviewMode) return false;
    if (isLocked) return tab !== 'assessment'; // Show teaser for everything except assessment when locked
    if (paymentStatus === 'full' && tab !== 'course') return false;
    if (paymentStatus === 'course' && ['course', 'prompts', 'assessment'].includes(tab)) return false;
    // Free users always see teaser except for assessment (they can take it)
    return tab !== 'assessment';
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-150 ${themeMode === 'dark' ? 'dark' : ''}`}>
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenModal={(m) => setActiveModal(m)}
        hasPurchased={hasPurchased}
        onOpenCheckout={() => openCheckout('full')}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
        paymentStatus={paymentStatus}
        isLocked={isLocked}
        isFirstVisit={isFirstVisit}
        courseSubTab={courseSubTab}
        setCourseSubTab={setCourseSubTab}
        canAccessContent={canAccessContent}
      />

      {/* Scroll Movie Hero — 50 frames, scrub on scroll, above rest of webpage */}
      <ScrollHeroFrames />

      {/* Main App Content View Switcher */}
      <main className="flex-1">
        {/* TAB 1: SALES LANDING PAGE - Always visible, shows teasers for free users */}
        {activeTab === 'sales' && (
          <SalesLandingView
            onStartAssessment={handleStartAssessment}
            onOpenCheckout={() => openCheckout('course')}
            onOpenDossier={() => setActiveTab('dossier')}
            onOpenSimulator={() => setActiveTab('simulator')}
            language={language}
            showTeasers={paymentStatus === 'free'}
            onUpgrade={() => openCheckout('full')}
            paymentStatus={paymentStatus}
            assessmentResult={assessmentResult}
            onAssessmentComplete={handleAssessmentComplete}
          />
        )}

        {/* TAB: FULL ACCESS DASHBOARD - For $72 payers (cloned sales page, no course upsell, all content unlocked) */}
        {activeTab === 'dashboard' && (
          <FullAccessDashboard
            onOpenDossier={() => setActiveTab('dossier')}
            onOpenSimulator={() => setActiveTab('simulator')}
            onOpenAssessment={() => setActiveTab('assessment')}
            onOpenPrompts={() => { setActiveTab('course'); setCourseSubTab('prompts'); }}
            onOpenBonuses={() => { setActiveTab('course'); setCourseSubTab('bonuses'); }}
            onOpenCheckout={() => openCheckout('course')}
            language={language}
          />
        )}

        {/* TAB 2: EXECUTIVE DOSSIER & STRATEGIC GUIDE */}
        {activeTab === 'dossier' && (
          <ExecutiveDossierView
            onStartAssessment={handleStartAssessment}
            onOpenSimulator={() => setActiveTab('simulator')}
            onOpenCourse={() => setActiveTab('course')}
            onOpenCheckout={() => openCheckout('full')}
            language={language}
            showTeaser={showTeaser('dossier')}
            onUpgrade={() => openCheckout('full')}
          />
        )}

        {/* TAB 3: LIVE CHATGPT AD PREVIEW SIMULATOR */}
        {activeTab === 'simulator' && (
          <AdPreviewSimulator 
            language={language} 
            showTeaser={showTeaser('simulator')}
            onUpgrade={() => openCheckout('full')}
          />
        )}

        {/* TAB 4: INTERACTIVE ASSESSMENT / DIAGNOSTIC REPORT - GHL gate then personalized report with download + dual upsell */}
        {activeTab === 'assessment' && (
          <div>
            {isTakingQuiz || !assessmentResult ? (
              <AssessmentQuiz
                onComplete={handleAssessmentComplete}
                onCancel={() => {
                  setIsTakingQuiz(false);
                  if (!assessmentResult) setActiveTab('sales');
                }}
                language={language}
              />
            ) : !hasLeadCaptured ? (
              <GHLLeadCapture
                score={assessmentResult.totalScore}
                bucket={assessmentResult.bucket}
                language={language}
                onCaptured={(data) => {
                  try { localStorage.setItem('chatgpt_ads_lead', JSON.stringify({ ...data, score: assessmentResult.totalScore, bucket: assessmentResult.bucket })); } catch {}
                  fetch('/api/ghl-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, score: assessmentResult.totalScore, bucket: assessmentResult.bucket }) }).catch(()=>{});
                  setHasLeadCaptured(true);
                  // Unlock the app after lead capture
                  localStorage.setItem('chatgpt_ads_visited', 'true');
                  setIsLocked(false);
                }}
                onSkip={() => {
                  setHasLeadCaptured(true);
                  localStorage.setItem('chatgpt_ads_visited', 'true');
                  setIsLocked(false);
                }}
              />
            ) : (
              <AssessmentResultView
                result={assessmentResult}
                onRetake={() => { setHasLeadCaptured(false); handleRetakeAssessment(); }}
                onNavigateToCourse={() => setActiveTab('course')}
                onNavigateToBonuses={() => setActiveTab('bonuses')}
                onOpenCheckout={() => openCheckout('full')}
                onOpenCheckoutCourse={() => openCheckout('course')}
                language={language}
              />
            )}
          </div>
        )}

        {/* TAB 5: 12-PART MASTERCLASS DASHBOARD - Only for $297 course buyers */}
        {activeTab === 'course' && (
          showTeaser('course') ? (
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
              {/* Header Teaser Card */}
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center text-white relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <BookOpen className="w-8 h-8 text-purple-200" />
                </div>
                <h2 className="text-3xl font-black mb-2">12-Part ChatGPT Ads Masterclass</h2>
                <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                  Gain lifetime access to the comprehensive strategic masterclass. Unlock all 12 modules, 60 advanced prompts, progress trackers, and bonuses.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => openCheckout('course')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-black bg-white hover:bg-slate-50 text-indigo-900 shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    Upgrade to Course Access - $297
                  </button>
                </div>
              </div>

              {/* Complete 12-Module Masterclass Syllabus */}
              <div className="space-y-6">
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
              <div>
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
                        Bonus #1 ($297 Value)
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

              {/* Final Bottom Checkout Conversion Card */}
              <div>
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
                    <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono">$297</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">One-Time Payment</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openCheckout('course')}
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
          ) : (
            <CourseDashboard
              onOpenPromptVault={() => setActiveTab('prompts')}
              onOpenBonuses={() => setActiveTab('bonuses')}
              language={language}
            />
          )
        )}

      </main>

      {/* App Footer with Modal Triggers */}
      <Footer onOpenModal={(m) => setActiveModal(m)} language={language} paymentStatus={paymentStatus} />

      {/* Stripe Checkout Modal - $72 Full vs $297 Course */}
      <StripeCheckoutModal
        isOpen={activeModal === 'checkout'}
        onClose={() => setActiveModal(null)}
        onSuccess={handlePurchaseSuccess}
        language={language}
        plan={checkoutPlan}
      />

      {/* Legal, User Manual, & Install Modals */}
      <LegalAndHelpModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        language={language}
        onOpenCheckout={() => openCheckout('full')}
      />
    </div>
  );
}