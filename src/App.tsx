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
      if (path === '/course' || path.startsWith('/course/')) return 'course';
      if (path === '/dashboard') return 'dashboard';
      if (path === '/dossier') return 'dossier';
      if (path === '/simulator') return 'simulator';
      if (path === '/assessment') return 'assessment';
    }
    return 'sales';
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [courseSubTab, setCourseSubTab] = useState<CourseSubTab>('dashboard');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(false);

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
    const newPath = pathMap[activeTab];
    if (activeTab === 'course') {
      const subPathMap: Record<CourseSubTab, string> = {
        dashboard: '/course',
        prompts: '/course/prompts',
        bonuses: '/course/bonuses',
      };
      const fullPath = `/course${subPathMap[courseSubTab] || ''}`;
      if (window.location.pathname !== fullPath) {
        window.history.pushState(null, '', fullPath);
      }
    } else if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  }, [activeTab, courseSubTab]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/course' || path.startsWith('/course/')) {
        setActiveTab('course');
        if (path === '/course/prompts') setCourseSubTab('prompts');
        else if (path === '/course/bonuses') setCourseSubTab('bonuses');
        else setCourseSubTab('dashboard');
      } else {
        setActiveTab(getInitialTab());
      }
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
      />

      {/* Scroll Movie Hero — 100 frames, scrub on scroll, above rest of webpage */}
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
          />
        )}

        {/* TAB: FULL ACCESS DASHBOARD - For $72 payers (cloned sales page, no course upsell, all content unlocked) */}
        {activeTab === 'dashboard' && (
          <FullAccessDashboard
            onOpenDossier={() => setActiveTab('dossier')}
            onOpenSimulator={() => setActiveTab('simulator')}
            onOpenAssessment={() => setActiveTab('assessment')}
            onOpenPrompts={() => setActiveTab('prompts')}
            onOpenBonuses={() => setActiveTab('bonuses')}
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

        {/* TAB 4: INTERACTIVE ASSESSMENT / DIAGNOSTIC REPORT - QUIZ ONLY */}
        {activeTab === 'assessment' && (
          <AssessmentQuiz
            onComplete={handleAssessmentComplete}
            onCancel={() => {
              setIsTakingQuiz(false);
              if (!assessmentResult) setActiveTab('sales');
            }}
            language={language}
          />
        )}

        {/* TAB 5: COURSE - Parent tab with assessment result + dual upsell + sub-tabs (Dashboard, Prompts, Bonuses) */}
        {activeTab === 'course' && (
          <>
            {assessmentResult && !showTeaser('course') && (
              <AssessmentResultView
                result={assessmentResult}
                onRetake={() => { setHasLeadCaptured(false); handleRetakeAssessment(); }}
                onNavigateToCourse={() => { setActiveTab('course'); setCourseSubTab('dashboard'); }}
                onNavigateToBonuses={() => { setActiveTab('course'); setCourseSubTab('bonuses'); }}
                onOpenCheckout={() => openCheckout('full')}
                onOpenCheckoutCourse={() => { setActiveTab('course'); setCourseSubTab('dashboard'); }}
                language={language}
              />
            )}

            {assessmentResult && showTeaser('course') && (
              <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 sm:p-8 text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">12-Part Masterclass</h2>
                    <p className="text-purple-100 max-w-md mx-auto">This content is part of the $297 Masterclass. Upgrade to unlock all 12 modules.</p>
                  </div>
                  <div className="p-6 sm:p-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-6">The 12-part masterclass includes 12 modules, 60 advanced prompts, worksheets, and progress tracking.</p>
                    <button
                      onClick={() => openCheckout('course')}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M12 6v6m0 0v6m0-6h6m-6 0H6`} /></svg>
                      Upgrade to Course Access - $297
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-6xl mx-auto px-4 py-8">
              {/* Course Sub-tabs Navigation */}
              <div className="mb-6">
                <nav className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm" role="tablist">
                  <button
                    role="tab"
                    aria-selected={courseSubTab === 'dashboard'}
                    onClick={() => setCourseSubTab('dashboard')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      courseSubTab === 'dashboard'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    role="tab"
                    aria-selected={courseSubTab === 'prompts'}
                    onClick={() => setCourseSubTab('prompts')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      courseSubTab === 'prompts'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    Prompts
                  </button>
                  <button
                    role="tab"
                    aria-selected={courseSubTab === 'bonuses'}
                    onClick={() => setCourseSubTab('bonuses')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      courseSubTab === 'bonuses'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    Bonuses
                  </button>
                </nav>
              </div>

              {/* Course Sub-tab Content */}
              {courseSubTab === 'dashboard' && (
                <CourseDashboard
                  onOpenPromptVault={() => setCourseSubTab('prompts')}
                  onOpenBonuses={() => setCourseSubTab('bonuses')}
                  language={language}
                />
              )}
              {courseSubTab === 'prompts' && (
                <PromptVaultView 
                  language={language} 
                  showTeaser={false}
                  onUpgrade={() => openCheckout('course')}
                />
              )}
              {courseSubTab === 'bonuses' && (
                <BonusesView 
                  language={language} 
                  showTeaser={false}
                  onUpgrade={() => openCheckout('course')}
                />
              )}
            </div>
          );
        })()}
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
      />
    </div>
  );
}

        {/* TAB 5: COURSE - Parent tab with sub-tabs (Dashboard, Prompts, Bonuses) - Only for $297 course buyers or $72 full access */}
        {activeTab === 'course' && (() => {
          if (showTeaser('course')) {
            return (
              <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 sm:p-8 text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">12-Part Masterclass</h2>
                    <p className="text-purple-100 max-w-md mx-auto">This content is part of the $297 Masterclass. Upgrade to unlock all 12 modules.</p>
                  </div>
                  <div className="p-6 sm:p-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-6">The 12-part masterclass includes 12 modules, 60 advanced prompts, worksheets, and progress tracking.</p>
                    <button
                      onClick={() => openCheckout('course')}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M12 6v6m0 0v6m0-6h6m-6 0H6`} /></svg>
                      Upgrade to Course Access - $297
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          return (
            <div className="max-w-6xl mx-auto px-4 py-8">
              {/* Course Sub-tabs Navigation */}
              <div className="mb-6">
                <nav className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm" role="tablist">
                  <button
                    role="tab"
                    aria-selected={courseSubTab === 'dashboard'}
                    onClick={() => setCourseSubTab('dashboard')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      courseSubTab === 'dashboard'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    role="tab"
                    aria-selected={courseSubTab === 'prompts'}
                    onClick={() => setCourseSubTab('prompts')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      courseSubTab === 'prompts'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    Prompts
                  </button>
                  <button
                    role="tab"
                    aria-selected={courseSubTab === 'bonuses'}
                    onClick={() => setCourseSubTab('bonuses')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      courseSubTab === 'bonuses'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    Bonuses
                  </button>
                </nav>
              </div>

              {/* Course Sub-tab Content */}
              {courseSubTab === 'dashboard' && (
                <CourseDashboard
                  onOpenPromptVault={() => setCourseSubTab('prompts')}
                  onOpenBonuses={() => setCourseSubTab('bonuses')}
                  language={language}
                />
              )}
              {courseSubTab === 'prompts' && (
                <PromptVaultView 
                  language={language} 
                  showTeaser={false}
                  onUpgrade={() => openCheckout('course')}
                />
              )}
              {courseSubTab === 'bonuses' && (
                <BonusesView 
                  language={language} 
                  showTeaser={false}
                  onUpgrade={() => openCheckout('course')}
                />
              )}
            </div>
          );
        })()}
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
      />
    </div>
  );
}