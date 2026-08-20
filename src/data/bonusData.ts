export interface BonusItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  contentSections: {
    heading: string;
    items: string[];
    codeBlock?: string;
  }[];
}

export const BONUSES: BonusItem[] = [
  {
    id: 'bonus-1-scorecard',
    badge: 'UNLOCKED SPEED BONUS #1',
    title: 'ChatGPT Ads Readiness Scorecard & Audit Sheet',
    subtitle: 'The Exact 18-Point Diagnostic Checklist Used by Enterprise AI Media Buyers',
    description: 'Use this reusable audit sheet internally with your team or during client discovery calls to determine commercial viability before spending a single dollar on ad auctions.',
    contentSections: [
      {
        heading: 'Pillar 1: Commercial Offer & Proof Verification',
        items: [
          'Front-End Clarity: Can a first-time prospect understand the exact deliverable and outcome within 5 seconds?',
          'Quantified Proof: Does the landing page feature at least 2 customer case studies with specific financial or operational metrics?',
          'Unit Margin Viability: Does the customer lifetime value (LTV) exceed $500, or is the single transaction margin > $150?',
          'Risk Reversal: Is there an unambiguous satisfaction, performance, or conditional guarantee in place?'
        ]
      },
      {
        heading: 'Pillar 2: Technical Tracking & First-Party Attribution',
        items: [
          'UTM Parameter Taxonomy: Are utm_source, utm_medium, utm_campaign, utm_content, and utm_term appended to all links?',
          'Server-Side Webhooks: Are lead form submissions piped directly to your CRM (GoHighLevel/HubSpot) within 5 seconds?',
          'Custom Dimension Tagging: Does GA4 record custom events for Form_View, Form_Submit, and Booked_Call?',
          'Offline Conversion Handoff: Is closed revenue recorded back against original ad UTM parameters?'
        ]
      },
      {
        heading: 'Pillar 3: Conversion Speed & Speed-to-Lead Operations',
        items: [
          'Mobile Load Velocity: Does the destination page achieve a Google PageSpeed mobile score of 85+ (load time < 1.8s)?',
          'Single CTA Architecture: Is the page free of top navigation links, external social widgets, and distracting footer loops?',
          'Instant SMS Trigger: Are leads contacted via automated SMS and calendar link within 180 seconds of submission?',
          'Dedicated Sales Availability: Is there a live closer available to handle inbound calls during campaign operating hours?'
        ]
      },
      {
        heading: 'Pillar 4: Policy & Brand Safety Verification',
        items: [
          'OpenAI Compliance Audit: Has copy been reviewed to ensure zero claims around sensitive or prohibited categories?',
          'Legal Entity Disclosure: Are business name, physical address, terms of service, and privacy policy links present in footer?',
          'No Clickbait Guarantee: Does the ad snippet honestly reflect what the user receives upon clicking?'
        ]
      }
    ]
  },
  {
    id: 'bonus-2-swipe-file',
    badge: 'UNLOCKED SPEED BONUS #2',
    title: 'Prompt-to-Launch Swipe File & Creative Angle Vault',
    subtitle: 'High-Converting Headlines, Conversational Snippets, Objection Busters & Landing Page Formulas',
    description: 'Plug-and-play copywriting frameworks engineered specifically for conversational intent in ChatGPT, Gemini, and search surfaces.',
    contentSections: [
      {
        heading: 'Top 5 Plug-and-Play Conversational Ad Snippet Templates',
        items: [
          'The Diagnostic Hook: "Need to audit your [X]? Get our free 18-point diagnostic scorecard used by 450+ [Niche] teams. Instant analysis in under 3 minutes."',
          'The Direct Solution Hook: "Struggling with [Problem]? [Product Name] automates [Core Task] so your team saves 12 hours/week. See live demo."',
          'The Proof-Led Hook: "How [Client Name] scaled [Metric] by [Percentage] in [Timeframe] without [Major Pain Point]. Read the full case study."',
          'The Comparison Hook: "Tired of [Outdated Solution]? Discover why 1,200+ leaders switched to [Product Name]. Compare features and pricing."',
          'The Direct Consultation Hook: "Looking for a certified [Specialist] in [Market]? Book a 15-minute roadmap session with senior specialists today."'
        ]
      },
      {
        heading: 'High-Converting Landing Page Headline Formulas',
        items: [
          'Formula 1: The Fast-Path: "The [Adjective] Way to [Desired Result] in [Timeframe] (Without [Biggest Frustration])."',
          'Formula 2: The Direct Solution: "We Help [Target Audience] Achieve [Specific Outcome] Using Our Proven [Methodology Name]."',
          'Formula 3: The Proof Anchor: "How [Target Audience] are [Action] to Generate [Specific Metric] Every Single Month."'
        ]
      },
      {
        heading: 'Top 4 Chat Lead Objection Handlers (Sales Team Playbook)',
        items: [
          'Objection: "I was just asking ChatGPT a question, I didn\'t expect a call." -> Response: "Totally understand! When someone asks about [Topic], they usually need the exact implementation checklist rather than theory. Did you get the PDF we just texted you?"',
          'Objection: "Is this expensive?" -> Response: "Our clients typically see a 3x-5x return within the first 60 days. Let\'s look at your current numbers to see if this makes economic sense for you first."',
          'Objection: "Can you just email me the price?" -> Response: "Because every [Niche] setup requires custom scoping, we provide a 1-page transparent price matrix during our 15-minute diagnostic. What time works best tomorrow?"'
        ]
      }
    ]
  },
  {
    id: 'bonus-3-agency-kit',
    badge: 'EXCLUSIVE AGENCY BONUS #3',
    title: 'Agency Client Proposal & Retainer Pitch Kit',
    subtitle: '3-Tier Retainer Pricing, SOW Templates, and Client Onboarding SOP',
    description: 'Everything you need to package ChatGPT Ads Management as a $3,000 to $7,500/month recurring service for business clients.',
    contentSections: [
      {
        heading: 'The 3-Tier Retainer Pricing Architecture',
        items: [
          'Tier 1: Early-Adopter Pilot ($3,500 Setup + $1,500/mo management): Includes 1 Campaign, 3 Ad Groups, 1 Dedicated Landing Page, and Weekly Reporting.',
          'Tier 2: Growth Accelerator ($5,000/mo + 10% Ad Spend): Includes Multi-Angle Testing, Landing Page A/B Testing, CRM Automation, and Bi-Weekly Strategy Calls.',
          'Tier 3: Enterprise Market Domination ($7,500/mo + 15% Ad Spend): Includes Multi-Market Rollout (US + UK + Mexico), Full-Funnel Retargeting, and Dedicated Account Director.'
        ]
      },
      {
        heading: 'The 7-Day Client Launch SOP',
        items: [
          'Day 1: Access & Discovery Call (Intake client offer, credentials, and past campaign benchmarks).',
          'Day 2: Angle Architecture & Copywriting (Draft 5 core conversational ad snippets).',
          'Day 3: Landing Page Deployment (Build sub-1.5s mobile landing page with tracking UTMs).',
          'Day 4: Tracking & CRM Webhook QA (Simulate lead flow into GoHighLevel / client CRM).',
          'Day 5: Client Pre-Flight Review (Client signs off on ad copy and budget limits).',
          'Day 6: Campaign Activation (Launch ad groups with $50/day test caps).',
          'Day 7: First 24-Hour Review (Verify impression delivery, CTR benchmarks, and spend pacing).'
        ]
      }
    ]
  }
];
