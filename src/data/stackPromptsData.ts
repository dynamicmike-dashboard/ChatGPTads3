export interface PlatformPrompt {
  id: string;
  platform: 'Google AI Studio' | 'Google Stitch' | 'Antigravity / OpenCode' | 'GoHighLevel' | 'Teable AI';
  category: string;
  title: string;
  description: string;
  promptTemplate: string;
  variables: string[];
}

export const STACK_PROMPTS: PlatformPrompt[] = [
  // Google AI Studio
  {
    id: 'studio_schema',
    platform: 'Google AI Studio',
    category: 'Scoring & Data Architecture',
    title: 'Assessment Logic & Scoring Schema Engine',
    description: 'Generates structured JSON scoring rules, category weights, and outcome thresholds.',
    variables: ['business_type', 'target_market', 'monthly_budget'],
    promptTemplate: `You are a senior conversion strategist, product architect, and structured-output generator.

<context>
Project: ChatGPT Ads Readiness & Launch Playbook
Target Audience: {business_type}
Market: {target_market}
Monthly Budget Threshold: {monthly_budget}
Goal: Diagnostic assessment with visual radar breakdown and personalized execution suggestions.
</context>

<task>
Design the complete scoring engine and return valid JSON only containing:
1. categories (6 core readiness dimensions: Offer, Budget, Funnel, Tracking, Trust/Compliance, Speed-to-Lead)
2. category_weights (totaling 100 points)
3. score_rules and threshold mappings
4. outcome_thresholds (0-39 Not Ready, 40-74 Ready to Test, 75-100 Ready to Launch)
5. recommendation_rules
6. bonus_unlock_rules
</task>

<constraints>
- Use deterministic 100-point scoring.
- Output clean, valid JSON with no markdown wrapping or preamble.
- Ensure weights reflect real commercial unit economics for conversational ads.
</constraints>`
  },
  {
    id: 'studio_copy',
    platform: 'Google AI Studio',
    category: 'Conversion Copywriting',
    title: 'Dynamic Personalized Recommendation Engine',
    description: 'Generates tailored recommendations, risk alerts, and CTA copy based on assessment inputs.',
    variables: ['business_type', 'target_market'],
    promptTemplate: `You are a conversion copywriting and diagnostic personalization engine.

<context>
The user completed a ChatGPT Ads Readiness Assessment for a {business_type} operating in {target_market}.
I will provide their score breakdown across the 6 categories.
</context>

<task>
Return a structured output with:
- executive_summary (2 sentences in authoritative, business-safe tone)
- top_3_priority_recommendations (actionable engineering/marketing steps)
- top_2_platform_risks_to_mitigate (tailored to their vertical)
- recommended_course_path (which of the 12 masterclass modules to start with)
- high_converting_cta_label
- unlocked_bonus_message
</task>

<constraints>
- Tone: consultative, premium, reassuring, no generic AI hype.
- Directly reference OpenAI trust, clear labeling, and context-exclusion guidelines.
</constraints>`
  },
  // Google Stitch
  {
    id: 'stitch_wireframe',
    platform: 'Google Stitch',
    category: 'UI/UX Design Systems',
    title: 'Interactive Assessment & Dashboard Wireframe UI',
    description: 'Prompts Google Stitch to generate modern, editorial SaaS layouts for the assessment and course.',
    variables: ['business_type', 'target_market'],
    promptTemplate: `Design a premium, high-conversion interactive landing page and web app UI for "ChatGPT Ads Readiness Assessment & Playbook".

Target User: {business_type} in {target_market}
Visual Aesthetic: Modern dark-slate SaaS (#0f172a) with emerald and cyan neon accents, generous whitespace, crisp Plus Jakarta Sans typography, and clean glassmorphic cards.

Layout Hierarchy:
1. Top Navigation Bar: Minimal logo, Live Market Ticker (US, UK, Mexico, Brazil, Japan, South Korea), "Install App" PWA button, and Tab Switcher.
2. Hero Section: Asymmetric grid with strong value proposition, urgency timer, and "Start Assessment" CTA.
3. Interactive Quiz Card: Step-by-step 1-question view with animated progress meter and category badge.
4. Diagnostic Results Panel: SVG Radar Chart with 6 axes, 0-100 Score Gauge, tailored recommendation cards, and locked/unlocked bonus badges.
5. 12-Module Masterclass Grid: Expandable lesson cards with prompt copy drawers.
6. Footer Utility Links: Terms, Privacy, Disclaimer, User Manual, and PWA Install Guide triggering full-screen accessible modals.

Generate responsive desktop and mobile views with micro-interaction states.`
  },
  {
    id: 'stitch_results',
    platform: 'Google Stitch',
    category: 'Visual Data Visualization',
    title: 'Radar Chart & Diagnostic Score Visual Spec',
    description: 'Designs the visual hierarchy for the 6-axis radar chart, gauge, and unlocked bonus state.',
    variables: ['business_type'],
    promptTemplate: `Design the Results Screen Component for the ChatGPT Ads Readiness Assessment for a {business_type}.

Key Visual Components:
- Hero Score Counter: Large 80px font displaying overall score / 100 with dynamic gradient ring.
- 6-Axis Interactive Radar Chart: Polygon showing category percentages (Offer Clarity, Budget, Funnel, Tracking, Trust, Speed-to-Lead) with benchmark overlay comparison.
- Categorized Action Plan: 3 action cards tagged by priority (Immediate, Week 1, Pre-Launch).
- Dual Bonus Unlock Pod: 2 cards with celebratory confetti visual and one-click copy/download actions.
- Course Gateway CTA: Sticky bottom banner leading into the 12-module masterclass.`
  },
  // Antigravity / OpenCode
  {
    id: 'opencode_scaffold',
    platform: 'Antigravity / OpenCode',
    category: 'Frontend Engineering',
    title: 'Full-Stack Next.js / React PWA Architecture Scaffold',
    description: 'Scaffolds clean React/TypeScript code with state management, localStorage caching, and PWA setup.',
    variables: ['business_type', 'target_market'],
    promptTemplate: `You are a principal frontend software engineer.

<context>
Build a production-grade React + TypeScript + Tailwind CSS Single Page Application / PWA for:
"ChatGPT Ads Readiness & Launch Playbook"
Targeting: {business_type} in {target_market}
</context>

<task>
Implement:
1. Complete PWA Manifest and Service Worker caching strategy for offline lesson consumption.
2. Deterministic 100-point multi-category scoring engine with SVG radar polygon math.
3. Interactive 10-question assessment flow with smooth progress state and localStorage persistence.
4. Comprehensive 12-lesson masterclass dashboard with expandable prompt drawers and 1-click clipboard copy.
5. Simulated Stripe Checkout flow with session ID verification and dashboard auto-unlock.
6. Modals for Terms, Privacy, Disclaimer, User Manual, and Install App instructions.
</task>

<constraints>
- Use zero external charting dependencies; implement clean mathematical SVG polygons.
- Write modular, readable, fully typed TypeScript code.
- Ensure 100% mobile responsiveness and sub-1s transition speed.
</constraints>`
  },
  {
    id: 'opencode_webhook',
    platform: 'Antigravity / OpenCode',
    category: 'API & Integration',
    title: 'GoHighLevel Webhook & Lead Ingestion Endpoint',
    description: 'Creates the webhook ingestion pipeline to push assessment scores, bucket tags, and custom fields to GHL.',
    variables: ['business_type', 'monthly_budget'],
    promptTemplate: `Implement the API handler and webhook integration for GoHighLevel lead capture.

Payload to transmit:
- Contact Information: Full Name, Email, Business Name
- Custom Fields: Target Market, Monthly Budget ({monthly_budget}), Readiness Score (0-100), Score Bucket (not_ready / ready_to_test / ready_to_launch)
- Category Subscores: Offer (0-20), Budget (0-15), Funnel (0-20), Tracking (0-15), Trust (0-15), Speed (0-15)
- Automated Tags: "chatgpt-ads-assessment", "bucket-{bucket}", "unlocked-bonuses"

Provide:
1. TypeScript interface for payload validation.
2. Async fetch handler with retry logic and fallback localStorage queue.
3. User feedback state (loading, success, error banner).`
  },
  // GoHighLevel
  {
    id: 'ghl_workflow',
    platform: 'GoHighLevel',
    category: 'Marketing Automation',
    title: 'Master Assessment Lead Capture & 5-Day Nurture Workflow',
    description: 'Configures GHL form mapping, custom fields, smart tags, and automated score-bucket branching.',
    variables: ['business_type', 'target_market', 'monthly_budget'],
    promptTemplate: `You are a certified GoHighLevel Solutions Architect.

<context>
Funnel: ChatGPT Ads Readiness Assessment -> 12-Part Masterclass Course -> Agency Retainer Upsell.
Target Client: {business_type} in {target_market} with monthly budget of {monthly_budget}.
</context>

<task>
Design the end-to-end GoHighLevel automation build:
1. Custom Fields Definition:
   - chatgpt_ads_score (Number)
   - chatgpt_ads_bucket (Single Select: Not Ready / Ready to Test / Ready to Launch)
   - chatgpt_ads_weakest_category (Text)
   - chatgpt_ads_target_market (Text)
2. Workflow Trigger: Form Submitted / Webhook Inbound
3. Tagging Architecture:
   - Add Tag: "Lead: ChatGPT Ads Quiz"
   - Add Tag: "Score: [chatgpt_ads_bucket]"
4. Conditional If/Else Branching:
   - Branch A (High Readiness > 75): Send instant SMS offering VIP Strategy Pilot Call.
   - Branch B (Moderate Readiness 45-74): Deliver 12-Part Playbook + Bonus Scorecard.
   - Branch C (Low Readiness < 45): Send Foundational Offer & Tracking Overhaul Guide.
5. Write the 3-Email Nurture Sequence for Branch A and Branch B.`
  },
  // Teable AI
  {
    id: 'teable_schema',
    platform: 'Teable AI',
    category: 'Database & Operations',
    title: 'Course Database Schema & Prompt Library Base',
    description: 'Builds a relational Teable/Airtable database to manage modules, prompts, client SOPs, and assets.',
    variables: ['business_type'],
    promptTemplate: `You are a relational database and course operations architect.

<context>
Design a comprehensive Teable AI base for managing the "ChatGPT Ads Readiness and Launch Playbook" course and client agency operations for a {business_type}.
</context>

<task>
Provide the exact schema definition for 5 connected tables:
1. Table: "Masterclass_Lessons" (Fields: Lesson_Number, Title, Phase, Duration_Mins, Core_Teachings, Summary, Status)
2. Table: "Advanced_Prompts" (Fields: Prompt_ID, Linked_Lesson, Purpose, Prompt_Text, Input_Variables, Category)
3. Table: "Bonus_Assets" (Fields: Asset_Name, Format, Download_URL, Access_Rule, Target_Niche)
4. Table: "Client_Ad_Accounts" (Fields: Client_Name, Monthly_Budget, Market, Campaign_Status, Blended_CPC, CPL, ROAS, Assigned_Media_Buyer)
5. Table: "Creative_Angle_Swipe" (Fields: Angle_Name, Angle_Type, Headline, Body_Copy, CTA, Best_Vertical)

Include field types, formulas, and 4 high-yield Views (e.g., "Agency Delivery Kanban", "Prompt Library by Module", "Weekly Client ROI").`
  }
];
