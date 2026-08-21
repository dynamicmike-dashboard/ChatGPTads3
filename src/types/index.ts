export type ActiveTab = 'sales' | 'dashboard' | 'dossier' | 'simulator' | 'assessment' | 'course' | 'prompts' | 'bonuses';
export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'es';

export type ReadinessCategory = 
  | 'offer_clarity'
  | 'budget_readiness'
  | 'funnel_readiness'
  | 'tracking_readiness'
  | 'trust_compliance'
  | 'follow_up_speed';

export interface CategoryScore {
  category: ReadinessCategory;
  name: string;
  score: number; // 0 to 100%
  earnedPoints: number;
  maxPoints: number;
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  category: ReadinessCategory;
  questionNumber: number;
  title: string;
  subtitle: string;
  tip?: string;
  options: {
    label: string;
    description: string;
    points: { [key in ReadinessCategory]?: number };
    isRecommended?: boolean;
  }[];
}

export interface AssessmentResult {
  totalScore: number;
  bucket: 'not_ready' | 'ready_to_test' | 'ready_to_launch';
  headline: string;
  summary: string;
  categoryScores: CategoryScore[];
  recommendations: string[];
  risks: string[];
  unlockedBonuses: boolean;
  timestamp: string;
  userAnswers: Record<string, number>;
}

export interface LessonPrompt {
  id: number;
  title: string;
  purpose: string;
  promptText: string;
  exampleVariables?: string[];
}

export interface CourseLesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  phase: 'Foundations' | 'Economics & Risk' | 'Strategy & Funnel' | 'Launch & Scale';
  duration: string;
  summary: string;
  coreTeaching: string[];
  deepDive: {
    benefits: string[];
    costs: string[];
    risks: string[];
    limitations: string[];
    potential: string[];
    whatToPrepare: string[];
  };
  worksheetIdea: {
    title: string;
    steps: string[];
  };
  implementationChecklist: string[];
  advancedPrompts: LessonPrompt[];
}

export interface LeadCaptureData {
  name: string;
  email: string;
  businessName: string;
  targetMarket: string;
  monthlyBudget: string;
  score: number;
  bucket: string;
}

export type ModalType = 'terms' | 'privacy' | 'disclaimer' | 'manual' | 'install' | 'support' | 'checkout' | null;
