import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResult } from '../../data/assessmentData';
import { AssessmentResult } from '../../types';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentQuizProps {
  onComplete: (result: AssessmentResult) => void;
  onCancel?: () => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (selectedOption === null && answers[currentQ.id] === undefined) return;

    if (currentStep < totalQuestions - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setSelectedOption(answers[ASSESSMENT_QUESTIONS[nextStep].id] ?? null);
    } else {
      // Completed quiz! Trigger celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      const result = calculateAssessmentResult(answers);
      onComplete(result);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setSelectedOption(answers[ASSESSMENT_QUESTIONS[prevStep].id] ?? null);
    }
  };

  const isCurrentAnswered = selectedOption !== null || answers[currentQ.id] !== undefined;
  const chosenIndex = selectedOption !== null ? selectedOption : answers[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-lg transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Question {currentStep + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize">
              {currentQ.category.replace('_', ' ')}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Audit Progress: </span>
            <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{progressPercent}%</span>
          </div>
        </div>

        {/* Progress bar track */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-colors">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 leading-snug">
          {currentQ.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
          {currentQ.subtitle}
        </p>

        {/* Practical context tip */}
        {currentQ.tip && (
          <div className="mb-6 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/30 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs text-cyan-900 dark:text-cyan-200 leading-relaxed font-medium">
              <strong>Playbook Tip:</strong> {currentQ.tip}
            </p>
          </div>
        )}

        {/* Options Stack */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, idx) => {
            const isSelected = chosenIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/60'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 dark:border-emerald-400 dark:bg-emerald-400 text-white dark:text-slate-950'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                    {opt.isRecommended && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40">
                        Recommended Target
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                >
                  Exit Diagnostic
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              isCurrentAnswered
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-[1.02]'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
            }`}
          >
            {currentStep === totalQuestions - 1 ? 'Generate Commercial Scorecard' : 'Next Step'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
