import React, { useState, useEffect } from 'react';
import { ActiveTab, AssessmentResult, ModalType, ThemeMode } from './types';
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

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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

  const handlePurchaseSuccess = (sessionId: string) => {
    setHasPurchased(true);
    try {
      localStorage.setItem('chatgpt_ads_has_purchased', 'true');
      localStorage.setItem('chatgpt_ads_session_id', sessionId);
    } catch (err) {
      console.error(err);
    }
    setActiveModal(null);
    setActiveTab('course');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-150">
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
          />
        )}

        {/* TAB 2: EXECUTIVE DOSSIER & STRATEGIC GUIDE */}
        {activeTab === 'dossier' && (
          <ExecutiveDossierView
            onStartAssessment={handleStartAssessment}
            onOpenSimulator={() => setActiveTab('simulator')}
            onOpenCourse={() => setActiveTab('course')}
            onOpenCheckout={() => setActiveModal('checkout')}
          />
        )}

        {/* TAB 3: LIVE CHATGPT AD PREVIEW SIMULATOR */}
        {activeTab === 'simulator' && (
          <AdPreviewSimulator />
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
              />
            ) : (
              <AssessmentResultView
                result={assessmentResult}
                onRetake={handleRetakeAssessment}
                onNavigateToCourse={() => setActiveTab('course')}
                onNavigateToBonuses={() => setActiveTab('bonuses')}
                onOpenCheckout={() => setActiveModal('checkout')}
              />
            )}
          </div>
        )}

        {/* TAB 5: 12-PART MASTERCLASS DASHBOARD */}
        {activeTab === 'course' && (
          <CourseDashboard
            onOpenPromptVault={() => setActiveTab('prompts')}
            onOpenBonuses={() => setActiveTab('bonuses')}
          />
        )}

        {/* TAB 6: MASTER PROMPT VAULT & GENERATOR */}
        {activeTab === 'prompts' && (
          <PromptVaultView />
        )}

        {/* TAB 7: UNLOCKED BONUS SUITE */}
        {activeTab === 'bonuses' && (
          <BonusesView />
        )}
      </main>

      {/* App Footer with Modal Triggers */}
      <Footer onOpenModal={(m) => setActiveModal(m)} />

      {/* Stripe Checkout Modal */}
      <StripeCheckoutModal
        isOpen={activeModal === 'checkout'}
        onClose={() => setActiveModal(null)}
        onSuccess={handlePurchaseSuccess}
      />

      {/* Legal, User Manual, & Install Modals */}
      <LegalAndHelpModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        deferredPrompt={deferredPrompt}
      />
    </div>
  );
}
