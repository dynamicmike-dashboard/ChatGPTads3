import React from 'react';
import { ModalType } from '../../types';
import { Sparkles, ShieldCheck, Smartphone, HelpCircle, FileText, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onOpenModal: (modal: ModalType) => void;
  language: Language;
  paymentStatus: 'free' | 'full' | 'course';
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, language, paymentStatus }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-black text-slate-900 tracking-tight text-sm">
                CHATGPT ADS PLAYBOOK
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              The premier decision and launch framework for intent-driven conversational advertising across US, UK, and international markets.
            </p>
          </div>

          {/* Col 2: Navigation & Core Tools */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">
              Playbook Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('manual')}
                  className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> User Manual & PWA Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('install')}
                  className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-cyan-600" /> Install Progressive Web App
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('support')}
                  className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-600" /> Strategy Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal (Opens Modals!) */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">
              Governance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  Terms of Use & License
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('disclaimer')}
                  className="hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  Advertising & Earnings Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Trust Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
              <ShieldCheck className="w-4 h-4" /> Platform Independence
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This curriculum is an independent educational asset. ChatGPT, OpenAI, Google Gemini, Claude, and Perplexity are trademarks of their respective owners.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ChatGPT Ads Readiness & Launch Playbook. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built for High-Growth Operators & Agencies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
