import React, { useState, useEffect } from 'react';
import { ActiveTab, AssessmentResult, ModalType, ThemeMode, Language } from './types';
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
  const [activeTab, setActiveTab] = useState<ActiveTab>('sales');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(false);

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
        onOpenCheckout={() => setActiveModal('checkout')}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
        paymentStatus={paymentStatus}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1">
        {/* TAB 1: SALES LANDING PAGE - Always visible, shows teasers for free users */}
        {activeTab === 'sales' && (
          <SalesLandingView
            onStartAssessment={handleStartAssessment}
            onOpenCheckout={() => setActiveModal('checkout')}
            onOpenDossier={() => setActiveTab('dossier')}
            onOpenSimulator={() => setActiveTab('simulator')}
            language={language}
            showTeasers={paymentStatus === 'free'}
            onUpgrade={() => setActiveModal('checkout')}
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
            onOpenCheckout={() => setActiveModal('checkout')}
            language={language}
          />
        )}

        {/* TAB 2: EXECUTIVE DOSSIER & STRATEGIC GUIDE */}
        {activeTab === 'dossier' && (
          <ExecutiveDossierView
            onStartAssessment={handleStartAssessment}
            onOpenSimulator={() => setActiveTab('simulator')}
            onOpenCourse={() => setActiveTab('course')}
            onOpenCheckout={() => setActiveModal('checkout')}
            language={language}
            showTeaser={showTeaser('dossier')}
            onUpgrade={() => setActiveModal('checkout')}
          />
        )}

        {/* TAB 3: LIVE CHATGPT AD PREVIEW SIMULATOR */}
        {activeTab === 'simulator' && (
          <AdPreviewSimulator 
            language={language} 
            showTeaser={showTeaser('simulator')}
            onUpgrade={() => setActiveModal('checkout')}
          />
        )}

        {/* TAB 4: INTERACTIVE ASSESSMENT / DIAGNOSTIC REPORT - Always accessible for quiz takers */}
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
            ) : (
              <AssessmentResultView
                result={assessmentResult}
                onRetake={handleRetakeAssessment}
                onNavigateToCourse={() => setActiveTab('course')}
                onNavigateToBonuses={() => setActiveTab('bonuses')}
                onOpenCheckout={() => setActiveModal('checkout')}
                language={language}
              />
            )}
          </div>
        )}

        {/* TAB 5: 12-PART MASTERCLASS DASHBOARD - Only for $297 course buyers */}
        {activeTab === 'course' && (
          showTeaser('course') ? (
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
                    onClick={() => setActiveModal('checkout')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    Upgrade to Course Access - $297
                  </button>
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

        {/* TAB 6: MASTER PROMPT VAULT & GENERATOR */}
        {activeTab === 'prompts' && (
          <PromptVaultView 
            language={language} 
            showTeaser={showTeaser('prompts')}
            onUpgrade={() => setActiveModal('checkout')}
          />
        )}

        {/* TAB 7: UNLOCKED BONUS SUITE */}
        {activeTab === 'bonuses' && (
          <BonusesView 
            language={language} 
            showTeaser={showTeaser('bonuses')}
            onUpgrade={() => setActiveModal('checkout')}
          />
        )}
      </main>

      {/* App Footer with Modal Triggers */}
      <Footer onOpenModal={(m) => setActiveModal(m)} language={language} paymentStatus={paymentStatus} />

      {/* Stripe Checkout Modal */}
      <StripeCheckoutModal
        isOpen={activeModal === 'checkout'}
        onClose={() => setActiveModal(null)}
        onSuccess={handlePurchaseSuccess}
        language={language}
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