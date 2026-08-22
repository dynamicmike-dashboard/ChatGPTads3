import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (sessionId: string, plan?: 'full' | 'course') => void;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('999');
  const [email, setEmail] = useState('operator@growthscale.com');
  const [nameOnCard, setNameOnCard] = useState('Alex Miller');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const fakeSessionId = `cs_test_${Math.random().toString(36).substring(2, 12)}`;
      
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });

      onSuccess(fakeSessionId);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-900 dark:text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stripe Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            S
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
              Stripe Secure 256-Bit Checkout
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              ChatGPT Ads Readiness & Launch Playbook
            </h3>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">Full Masterclass Lifetime License</span>
              <span className="text-xs text-slate-500">12 Modules + 60 Prompts + 3 Unlocked Bonuses</span>
            </div>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">$297.00</span>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5 mt-2.5 flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Total Due Today</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">$297.00 USD</span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address for Course Access</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Card Information</label>
            <div className="relative">
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono pl-10"
              />
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Expires (MM/YY)</label>
              <input
                type="text"
                required
                value={cardExp}
                onChange={(e) => setCardExp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">CVC Code</label>
              <input
                type="text"
                required
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Cardholder Name</label>
            <input
              type="text"
              required
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl text-sm font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            {isProcessing ? (
              <>Processing Encrypted Payment via Stripe...</>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Pay $297 & Instant Redirect to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 256-Bit SSL Encrypted
          </span>
          <span>•</span>
          <span>Instant Lifetime Access</span>
        </div>
      </div>
    </div>
  );
};
