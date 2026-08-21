import React, { useState, useEffect } from 'react';
import { ActiveTab, AssessmentResult, ModalType, ThemeMode, Language } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SalesLandingView } from './components/sales/SalesLandingView';
import { ExecutiveDossierView } from './components/dossier/ExecutiveDossierView';
import { AdPreviewSimulator } from './components/simulator/AdPreviewSimulator';
import { AssessmentQuiz } from './components/assessment/AssessmentQuiz';
import { AssessmentResultView } from './components/assessment/AssessmentResultView';
import { CourseDashboard } from './components/course/CourseDashboard';
import { PromptVaultView } from './components/course/PromptVaultView';
import { BonusesView } from './components/bonuses/BonusesView';
import { StripeCheckoutModal } from './components/checkout/StripeCheckoutModal';
import { LegalAndHelpModals } from './components/modals/LegalAndHelpModals';

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

  // Payment gate: $72 for full access, $297 for course-only
  const [paymentStatus, setPaymentStatus] = useState<'free' | 'full' | 'course'>('free');

  // Dev/Admin preview mode password (for testing)
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [previewPassword, setPreviewPassword] = useState<string>('');

  const PREVIEW_PASSWORD = 'chatgpt-ads-2026';

  // Hook into PWA beforeinstallprompt event
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

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
    setActiveTab('course');
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
        deferredPrompt={deferredPrompt}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1">
        {/* TAB 1: SALES & OVERVIEW */}
        {activeTab === 'sales' && (
          <SalesLandingView
            onStartAssessment={handleStartAssessment}
            onOpenCheckout={() => setActiveModal('checkout')}
            onOpenDossier={() => setActiveTab('dossier')}
            onOpenSimulator={() => setActiveTab('simulator')}
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
          />
        )}

        {/* TAB 3: LIVE CHATGPT AD PREVIEW SIMULATOR */}
        {activeTab === 'simulator' && (
          <AdPreviewSimulator language={language} />
        )}

        {/* TAB 4: INTERACTIVE ASSESSMENT / DIAGNOSTIC REPORT */}
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

        {/* TAB 5: 12-PART MASTERCLASS DASHBOARD */}
        {activeTab === 'course' && (
          <CourseDashboard
            onOpenPromptVault={() => setActiveTab('prompts')}
            onOpenBonuses={() => setActiveTab('bonuses')}
            language={language}
          />
        )}

        {/* TAB 6: MASTER PROMPT VAULT & GENERATOR */}
        {activeTab === 'prompts' && (
          <PromptVaultView language={language} />
        )}

        {/* TAB 7: UNLOCKED BONUS SUITE */}
        {activeTab === 'bonuses' && (
          <BonusesView language={language} />
        )}
      </main>

      {/* App Footer with Modal Triggers */}
      <Footer onOpenModal={(m) => setActiveModal(m)} language={language} />

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
        deferredPrompt={deferredPrompt}
        language={language}
      />
    </div>
  );
}