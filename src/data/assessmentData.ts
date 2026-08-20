import { AssessmentQuestion, AssessmentResult, ReadinessCategory, CategoryScore } from '../types';

export const CATEGORY_METADATA: Record<ReadinessCategory, { name: string; maxPoints: number; description: string }> = {
  offer_clarity: {
    name: 'Offer Clarity & Proof',
    maxPoints: 20,
    description: 'Strength of your value proposition, customer testimonials, and friction-free direct-response angle.'
  },
  budget_readiness: {
    name: 'Budget & Economic Threshold',
    maxPoints: 15,
    description: 'Capital cushion to absorb initial $3-$5 CPC discovery bidding and 30-day algorithmic learning phases.'
  },
  funnel_readiness: {
    name: 'Funnel & Landing Experience',
    maxPoints: 20,
    description: 'Mobile-first conversion speed, chat-to-page message congruence, and friction-free lead capture flow.'
  },
  tracking_readiness: {
    name: 'Tracking & Attribution Stack',
    maxPoints: 15,
    description: 'Server-side CAPI/CRM handoff, UTM parameter hygiene, and multi-touch lead conversion auditing.'
  },
  trust_compliance: {
    name: 'Trust, Ethics & Policy Safety',
    maxPoints: 15,
    description: 'OpenAI ad policy alignment, avoidance of sensitive/prohibited categories, and transparent labeling.'
  },
  follow_up_speed: {
    name: 'Speed-to-Lead & Sales Velocity',
    maxPoints: 15,
    description: 'Ability to contact conversational inbound inquiries in under 5 minutes before intent cools down.'
  }
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1_business_type',
    questionNumber: 1,
    category: 'offer_clarity',
    title: 'What best describes your business or client operation?',
    subtitle: 'ChatGPT conversational ads favor clear, intent-driven solutions over vague lifestyle branding.',
    tip: 'B2B services, specialized local businesses, and high-intent software convert best in chat context.',
    options: [
      {
        label: 'High-Intent Service or B2B Agency',
        description: 'Clear client deliverables, consultative sales process, client LTV > $1,500.',
        points: { offer_clarity: 4, follow_up_speed: 3 },
        isRecommended: true
      },
      {
        label: 'Ecommerce / D2C Product Brand',
        description: 'Specific problem-solving product with existing checkout metrics and SKU clarity.',
        points: { offer_clarity: 3, funnel_readiness: 4 }
      },
      {
        label: 'Regulated / High-Trust Professional (Legal, Medical, Finance)',
        description: 'High transaction value requiring strict compliance disclaimers and privacy safeguards.',
        points: { trust_compliance: 2, offer_clarity: 3 }
      },
      {
        label: 'Early-Stage Startup / Unvalidated Idea',
        description: 'Still discovering product-market fit with no historical benchmark conversion data.',
        points: { offer_clarity: 1 }
      }
    ]
  },
  {
    id: 'q2_primary_goal',
    questionNumber: 2,
    category: 'funnel_readiness',
    title: 'What is your primary commercial objective for testing this channel?',
    subtitle: 'Conversational users ask direct questions and expect immediate, tangible solutions.',
    tip: 'Direct response lead capture or direct booking yields the fastest feedback loop on conversational ad ROI.',
    options: [
      {
        label: 'Qualified Lead Capture & Booked Consultation Calls',
        description: 'Capturing name, email, phone, and project scope for high-value client pipeline.',
        points: { funnel_readiness: 4, follow_up_speed: 3 },
        isRecommended: true
      },
      {
        label: 'Direct Checkout / Product Purchase',
        description: 'Sending buyers straight to a high-converting single-product or bundle page.',
        points: { offer_clarity: 3, tracking_readiness: 3 }
      },
      {
        label: 'Top-of-Funnel Brand Awareness & Consideration',
        description: 'Educating users about a new category or brand without immediate conversion tracking.',
        points: { funnel_readiness: 1 }
      },
      {
        label: 'Exploratory / Unsure of Strategy',
        description: 'Testing curiosity clicks without a defined mathematical KPI or return target.',
        points: { funnel_readiness: 0 }
      }
    ]
  },
  {
    id: 'q3_monthly_budget',
    questionNumber: 3,
    category: 'budget_readiness',
    title: 'What monthly ad budget can you comfortably allocate for testing?',
    subtitle: 'With average auction CPCs starting around $3–$5 and CPMs between $25–$60, budget determines statistical significance.',
    tip: 'A test budget of at least $1,500 ensures sufficient click volume (300-500 clicks) to test ad copy and landing page variants.',
    options: [
      {
        label: '$2,000 to $10,000 / month',
        description: 'Ideal sweet spot: allows multiple ad angles, daily learning optimization, and statistical confidence.',
        points: { budget_readiness: 15 },
        isRecommended: true
      },
      {
        label: 'Over $10,000 / month (Scaling / Multi-Market)',
        description: 'Enterprise budget capable of rapid split-testing across US, UK, and expanding markets.',
        points: { budget_readiness: 15 }
      },
      {
        label: '$500 to $2,000 / month (Focused Pilot)',
        description: 'Sufficient for a tightly focused 14-day single-offer experiment with strict daily caps.',
        points: { budget_readiness: 9 }
      },
      {
        label: 'Under $500 / month',
        description: 'Limited click volume (~100 clicks total); risk of premature conclusion before algorithm optimizes.',
        points: { budget_readiness: 3 }
      }
    ]
  },
  {
    id: 'q4_offer_proof',
    questionNumber: 4,
    category: 'offer_clarity',
    title: 'How validated is your core offer and social proof?',
    subtitle: 'Conversational ad traffic arrives from problem-solving queries. Weak proof leads to high bounce rates.',
    tip: 'Specific case studies, video proof, and transparent pricing reduce perceived friction instantly.',
    options: [
      {
        label: 'Proven Offer with Video Testimonials & Verifiable Case Studies',
        description: 'Existing customers have generated documented ROI; offer has validated conversion rate.',
        points: { offer_clarity: 13 },
        isRecommended: true
      },
      {
        label: 'Moderate Validation (5-20 Happy Clients, Basic Reviews)',
        description: 'Solid foundation, but could benefit from sharper guarantee and tighter messaging.',
        points: { offer_clarity: 8 }
      },
      {
        label: 'Brand New Offer (No External Social Proof Yet)',
        description: 'Unproven concept; ads will be testing both market desire and message resonance simultaneously.',
        points: { offer_clarity: 3 }
      },
      {
        label: 'Unstructured Services / Custom Quote Every Time',
        description: 'No standardized package, creating confusion for users who click intent-driven ads.',
        points: { offer_clarity: 0 }
      }
    ]
  },
  {
    id: 'q5_landing_experience',
    questionNumber: 5,
    category: 'funnel_readiness',
    title: 'What does your landing page and conversion experience look like?',
    subtitle: 'Chat users expect sub-2-second load times and exact message congruence with their prompt query.',
    tip: 'Avoid clutter: single CTA, mobile-optimized speed, and answering the core question above the fold.',
    options: [
      {
        label: 'Dedicated Fast-Loading Landing Page (Single CTA, Sub-1.5s Speed)',
        description: 'Mobile-responsive, clear value proposition, video/proof above the fold, no navigation leaks.',
        points: { funnel_readiness: 12 },
        isRecommended: true
      },
      {
        label: 'Standard Multi-Page Website / Homepage',
        description: 'Functional, but contains distractions (menu bars, blog links, about pages) that lower conversion.',
        points: { funnel_readiness: 6 }
      },
      {
        label: 'Basic Social Link or Social Profile',
        description: 'Sending paid traffic to a Linktree or social feed with no focused conversion capture.',
        points: { funnel_readiness: 2 }
      },
      {
        label: 'No Live Landing Page Yet (Under Construction)',
        description: 'Traffic cannot be routed or captured until a dedicated web asset is deployed.',
        points: { funnel_readiness: 0 }
      }
    ]
  },
  {
    id: 'q6_tracking_attribution',
    questionNumber: 6,
    category: 'tracking_readiness',
    title: 'What is your current tracking and attribution infrastructure?',
    subtitle: 'Because ChatGPT ads are auction-based and privacy-respecting, first-party tracking is non-negotiable.',
    tip: 'Combining UTM parameters, Google Analytics 4, and direct CRM webhook capture prevents revenue blindspots.',
    options: [
      {
        label: 'Full First-Party Stack (GA4, UTM Taxonomy, CRM Webhook & Offline Conversion Tracking)',
        description: 'Every lead is tagged with source, campaign, ad angle, and tracked through to closed revenue.',
        points: { tracking_readiness: 12 },
        isRecommended: true
      },
      {
        label: 'Standard Pixel & Basic Google Analytics Only',
        description: 'Tracks page visits and form submits, but lacks deep CRM revenue attribution.',
        points: { tracking_readiness: 7 }
      },
      {
        label: 'Basic Platform Form or Generic Link Tracking',
        description: 'Can see total clicks, but cannot attribute which ad angle generated which paying customer.',
        points: { tracking_readiness: 3 }
      },
      {
        label: 'No Analytics or Tracking Configured',
        description: 'Zero visibility into cost-per-lead, conversion rate, or return on ad spend.',
        points: { tracking_readiness: 0 }
      }
    ]
  },
  {
    id: 'q7_speed_to_lead',
    questionNumber: 7,
    category: 'follow_up_speed',
    title: 'How fast does your team respond to new inbound leads?',
    subtitle: 'Conversational ad leads are in "problem-solving flow" — response speed within 5 minutes increases close rates by 391%.',
    tip: 'Automated SMS / email booking confirmations plus rapid sales outreach capitalize on immediate intent.',
    options: [
      {
        label: 'Under 5 Minutes (Automated Instant SMS/Call + Dedicated Closer)',
        description: 'Automated instant confirmation link + live rep follow-up while intent is boiling hot.',
        points: { follow_up_speed: 12 },
        isRecommended: true
      },
      {
        label: 'Same Day (Within 1 to 4 Hours)',
        description: 'Decent response velocity; acceptable for B2B consulting with high deal sizes.',
        points: { follow_up_speed: 8 }
      },
      {
        label: 'Next Business Day (24+ Hours Delay)',
        description: 'Significant intent degradation; over 60% of leads forget submitting the inquiry.',
        points: { follow_up_speed: 3 }
      },
      {
        label: 'Manual / Irregular Check (Multiple Days)',
        description: 'Leads cool off completely; high ad spend wasted on abandoned inquiries.',
        points: { follow_up_speed: 0 }
      }
    ]
  },
  {
    id: 'q8_target_geography',
    questionNumber: 8,
    category: 'trust_compliance',
    title: 'What geographic markets are you targeting with your campaigns?',
    subtitle: 'ChatGPT ads are actively live across the US, UK, Mexico, Brazil, Japan, and South Korea, with more rolling out.',
    tip: 'Your physical operating location does not restrict you from targeting eligible markets like the US or UK.',
    options: [
      {
        label: 'United States & United Kingdom (Primary Mature Rollout)',
        description: 'Highest intent volume, fully operational self-serve inventory, mature buying audience.',
        points: { trust_compliance: 5, budget_readiness: 2 },
        isRecommended: true
      },
      {
        label: 'Mexico, Brazil, Japan, or South Korea (Expanding Pilot Markets)',
        description: 'Rapidly growing inventory with lower initial auction competition and high early-mover advantage.',
        points: { trust_compliance: 5, budget_readiness: 2 }
      },
      {
        label: 'Multi-Country Global Target',
        description: 'Requires multi-currency checkout, localized ad copy, and regional compliance checks.',
        points: { trust_compliance: 3, budget_readiness: 1 }
      },
      {
        label: 'Region Not Yet In Pilot / Unsure of Geographic Focus',
        description: 'Must prepare assets and positioning now while awaiting local platform rollout.',
        points: { trust_compliance: 1 }
      }
    ]
  },
  {
    id: 'q9_regulatory_category',
    questionNumber: 9,
    category: 'trust_compliance',
    title: 'Does your product or service operate in a sensitive or regulated vertical?',
    subtitle: 'OpenAI enforces strict guardrails: ads will NOT run adjacent to sensitive contexts (weapons, hate, adult, gambling, dubious claims).',
    tip: 'Transparent, helpful, and value-first business models receive higher ad relevance ratings and lower CPMs.',
    options: [
      {
        label: 'Standard B2B, SaaS, Professional Services, Education, or Consumer Tech',
        description: 'Zero compliance restrictions; 100% aligned with OpenAI safety guidelines and trust parameters.',
        points: { trust_compliance: 8 },
        isRecommended: true
      },
      {
        label: 'Health, Wealth & Financial Advisory (With Full Licenses & Clear Disclaimers)',
        description: 'Requires transparent credentialing, clear earnings disclaimers, and non-misleading copy.',
        points: { trust_compliance: 5 }
      },
      {
        label: 'High-Risk / Regulated Niche Without Dedicated Compliance Review',
        description: 'High risk of ad rejection or account flagging due to aggressive health/income claims.',
        points: { trust_compliance: 1 }
      },
      {
        label: 'Restricted Category (Adult, Gambling, Unverified Supplements, Crypto Hype)',
        description: 'Prohibited by OpenAI advertising guidelines; channel is unsuitable for this vertical.',
        points: { trust_compliance: 0 }
      }
    ]
  },
  {
    id: 'q10_execution_model',
    questionNumber: 10,
    category: 'follow_up_speed',
    title: 'Are you executing this for your own business or packaging it as an agency/client offer?',
    subtitle: 'Agency operators can build high-ticket retainers by combining ChatGPT Ads management with conversational funnel builds.',
    tip: 'Positioning yourself as a "Conversational AI Media Buyer & Funnel Architect" creates immediate authority.',
    options: [
      {
        label: 'Agency / Consultant Offering "Conversational Ad Management" to Clients',
        description: 'Looking to package 12-part framework, launch SOPs, client proposals, and retainers.',
        points: { follow_up_speed: 3, offer_clarity: 3 },
        isRecommended: true
      },
      {
        label: 'Business Owner / In-House Marketing Team with Execution Control',
        description: 'Direct control over landing page updates, sales follow-up, and dedicated test budget.',
        points: { follow_up_speed: 3, funnel_readiness: 3 }
      },
      {
        label: 'Solo Operator / Freelancer Testing New Growth Channels',
        description: 'Managing end-to-end execution alone; requires streamlined workflows and high-yield prompts.',
        points: { follow_up_speed: 2, offer_clarity: 2 }
      },
      {
        label: 'Curious Observer / Learning for Future Implementation',
        description: 'Gathering knowledge and competitive intelligence before committing resources.',
        points: { follow_up_speed: 1 }
      }
    ]
  }
];

export function calculateAssessmentResult(answers: Record<string, number>): AssessmentResult {
  // Compute category points
  const categoryEarned: Record<ReadinessCategory, number> = {
    offer_clarity: 0,
    budget_readiness: 0,
    funnel_readiness: 0,
    tracking_readiness: 0,
    trust_compliance: 0,
    follow_up_speed: 0
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const selectedOptionIndex = answers[q.id];
    if (selectedOptionIndex !== undefined && q.options[selectedOptionIndex]) {
      const optionPoints = q.options[selectedOptionIndex].points;
      (Object.keys(optionPoints) as ReadinessCategory[]).forEach((cat) => {
        categoryEarned[cat] += optionPoints[cat] || 0;
      });
    }
  });

  // Build category score breakdown
  const categoryScores: CategoryScore[] = (Object.keys(CATEGORY_METADATA) as ReadinessCategory[]).map((cat) => {
    const meta = CATEGORY_METADATA[cat];
    const earned = Math.min(meta.maxPoints, Math.max(0, categoryEarned[cat]));
    const pct = Math.round((earned / meta.maxPoints) * 100);
    return {
      category: cat,
      name: meta.name,
      earnedPoints: earned,
      maxPoints: meta.maxPoints,
      score: pct,
      description: meta.description
    };
  });

  // Calculate total score out of 100
  const totalEarned = categoryScores.reduce((sum, c) => sum + c.earnedPoints, 0);
  const totalMax = Object.values(CATEGORY_METADATA).reduce((sum, m) => sum + m.maxPoints, 0); // 100 points
  const finalScore = Math.min(100, Math.max(0, Math.round((totalEarned / totalMax) * 100)));

  // Determine bucket
  let bucket: AssessmentResult['bucket'] = 'not_ready';
  let headline = '';
  let summary = '';

  if (finalScore >= 75) {
    bucket = 'ready_to_launch';
    headline = 'High Readiness: Positioned for Immediate Strategic Pilot';
    summary = 'Your infrastructure, commercial validation, and operating speed place you in the top 10% of advertisers. You have the structural foundation to launch conversational campaigns in the US, UK, and expanding markets with immediate competitive advantage.';
  } else if (finalScore >= 45) {
    bucket = 'ready_to_test';
    headline = 'Moderate Readiness: Ready to Test with Focused Guardrails';
    summary = 'You have a solid core offer, but 1-2 friction points (such as tracking granularity, speed-to-lead, or landing page congruence) should be fortified before increasing spend beyond a $1,500 test budget.';
  } else {
    bucket = 'not_ready';
    headline = 'Pre-Launch Phase: Strengthen Offer & Funnel Architecture First';
    summary = 'Spending capital on ChatGPT ads right now would leak revenue due to offer vagueness or missing tracking attribution. Fix the foundational elements in the 12-part playbook first to maximize ROI.';
  }

  // Dynamic recommendations based on weakest categories
  const sortedCategories = [...categoryScores].sort((a, b) => a.score - b.score);
  const recommendations: string[] = [];
  const risks: string[] = [];

  sortedCategories.slice(0, 3).forEach((weakCat) => {
    switch (weakCat.category) {
      case 'offer_clarity':
        recommendations.push('Package your solution into a single, high-certainty "Front-End Offer" with 3 tangible proof points before turning on ads.');
        risks.push('Vague offer messaging will lead to high CPC bounce rates without conversational click-through.');
        break;
      case 'budget_readiness':
        recommendations.push('Set up a capped 14-day discovery budget ($50/day) focusing solely on cost-per-click bidding rather than open impression scaling.');
        risks.push('Premature scaling without statistical significance risks burning budget during the platform learning phase.');
        break;
      case 'funnel_readiness':
        recommendations.push('Build a dedicated, distraction-free mobile landing page with sub-1.5s load speed and exact query headline matching.');
        risks.push('Sending conversational intent traffic to a cluttered corporate homepage cuts conversion rates by up to 74%.');
        break;
      case 'tracking_readiness':
        recommendations.push('Implement a multi-tier tracking taxonomy (GA4 + UTM parameters + CRM webhook) to accurately trace revenue per conversation.');
        risks.push('Attribution blindspots will make profitable ad angles appear unprofitable and obscure top-performing queries.');
        break;
      case 'trust_compliance':
        recommendations.push('Audit your ad angles against OpenAI Trust & Safety guidelines: clear sponsorship disclosure and zero misleading claims.');
        risks.push('Aggressive "get-rich" or unverified claims face immediate algorithmic suppression under OpenAI safety protocols.');
        break;
      case 'follow_up_speed':
        recommendations.push('Install an automated instant SMS/Email booking trigger to engage conversational leads in under 3 minutes.');
        risks.push('Delayed follow-up (>4 hours) causes conversational prospects to solve their query elsewhere, wasting ad spend.');
        break;
    }
  });

  // Always append top-tier execution advice
  if (recommendations.length < 4) {
    recommendations.push('Deploy 5 distinct ad angle variations (Proof-Led, Question-Led, Diagnostic, Pain-Relief, Direct Offer) to test auction efficiency.');
  }

  return {
    totalScore: finalScore,
    bucket,
    headline,
    summary,
    categoryScores,
    recommendations,
    risks,
    unlockedBonuses: true,
    timestamp: new Date().toISOString(),
    userAnswers: answers
  };
}
