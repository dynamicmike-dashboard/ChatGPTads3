import { CourseLesson } from '../types';

export const COURSE_LESSONS: CourseLesson[] = [
  {
    id: 1,
    slug: 'what-chatgpt-ads-are',
    title: 'Lesson 1: The Mechanics of Conversational Advertising',
    subtitle: 'Understanding Placement, Intent Anchoring & The Multi-Market Rollout',
    phase: 'Foundations',
    duration: '22 min',
    summary: 'ChatGPT Ads mark the transition from passive browsing to high-intent conversational discovery. Discover where ads appear, how they differ fundamentally from search and social feeds, and what OpenAI’s explicit guardrails mean for your campaigns.',
    coreTeaching: [
      'Conversational Placement Mechanics: Ads appear beneath answers when a natural commercial intent is detected in user queries.',
      'Answer Independence: OpenAI maintains strict algorithmic separation between AI answer generation and sponsor placements. Ads never alter factual response generation.',
      'Eligible Tiers & User Geography: Ads are served exclusively on Free and Go tiers across the US, UK, Mexico, Brazil, Japan, and South Korea, with paid tiers (Plus, Pro, Enterprise) remaining 100% ad-free.',
      'Intent vs Interruption: Unlike Facebook (interruption) or Google (keyword-triggered), ChatGPT ads target user context, problem-solving flow, and active decision-making.'
    ],
    deepDive: {
      benefits: [
        'Unmatched contextual relevance: Prospects are actively in "solve-it" mindset.',
        'High CTR on intent-matched queries due to clean, unobtrusive placement.',
        'First-mover auction advantage with lower competitive bidding density in early markets.'
      ],
      costs: [
        'Initial testing CPCs range between $3.00 and $5.50 on self-serve bidding.',
        'Requires clean, distraction-free landing pages that match conversational tone.'
      ],
      risks: [
        'Treating ChatGPT ads like pushy social popups leads to high bounce rates.',
        'Over-reliance on demographic targeting rather than context matching.'
      ],
      limitations: [
        'No direct targeting of paid tier subscribers (Plus, Pro, Enterprise).',
        'No ad display on sensitive query topics (mental health, elections, weapons).'
      ],
      potential: [
        'First direct-response advertising surface inside the largest AI interface on earth.',
        'Opportunity to dominate niche B2B, SaaS, and high-ticket service verticals before mass adoption.'
      ],
      whatToPrepare: [
        'Clear 1-sentence value proposition.',
        'Mobile-first landing page with sub-1.5s load speed.',
        'Verified business domain and Stripe/payment method for self-serve ad manager.'
      ]
    },
    worksheetIdea: {
      title: 'Contextual Intent Mapping Matrix',
      steps: [
        'Identify 5 natural prompts a prospective customer asks ChatGPT before buying your service.',
        'Draft the exact solution sentence that should appear below the AI response.',
        'Validate that your offer does not touch restricted policy categories.'
      ]
    },
    implementationChecklist: [
      'Audit your primary offer for conversational context fit.',
      'Confirm your target audience includes active free/Go tier conversational users.',
      'Set up OpenAI Ads Manager account prerequisites.',
      'Document your baseline competitor ad presence.'
    ],
    advancedPrompts: [
      {
        id: 101,
        title: 'Plain-English Stakeholder Explainer',
        purpose: 'Explain ChatGPT ads to a CEO, client, or business partner using intuitive real-world analogies.',
        promptText: 'You are an executive digital marketing strategist. Explain ChatGPT ads to a traditional business owner in plain English without tech jargon. Use an analogy comparing ChatGPT ads to Google Search ads, Meta feed ads, and having a helpful specialist at a store counter. Highlight why intent in a chat context is uniquely valuable for {business_type}.',
        exampleVariables: ['business_type']
      },
      {
        id: 102,
        title: 'Channel Comparison Matrix (Search vs Social vs Chat)',
        purpose: 'Compare unit economics, user psychology, and conversion benchmarks across ad channels.',
        promptText: 'Analyze the strategic differences between ChatGPT ads, Google Search Ads, and Meta Feed Ads for a {business_type} targeting {target_market}. Create a structured table comparing: User Intent State, Ad Trigger Mechanism, Creative Asset Required, Expected CPC/CPM dynamics, Conversion Friction, and Best-Fit Offers.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 103,
        title: 'Top 3 Business Model Beneficiary Audit',
        purpose: 'Identify which specific services or product lines inside your business will benefit most.',
        promptText: 'Based on the following business profile: {business_type} with typical customer value of {monthly_budget}, identify the top 3 specific offers or service lines that will benefit most from conversational ad placements in ChatGPT. Explain the exact query moments when the ad should trigger.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 104,
        title: '60-Second Client Pitch & Positioning Script',
        purpose: 'Pitch ChatGPT ad management or pilot testing to a prospect in under 60 seconds.',
        promptText: 'Write a persuasive 60-second video or phone pitch script for an agency pitching a ChatGPT Ads Pilot Test to a {business_type} in {target_market}. Focus on early-mover advantage, clean placement, and why testing with a controlled $1,500 budget is a calculated strategic move right now.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 105,
        title: 'Misconception Buster & Objection Shield',
        purpose: 'Preemptively dismantle the top 5 misconceptions business owners have about AI ads.',
        promptText: 'List the top 5 misconceptions business owners and marketing directors have about ChatGPT ads (e.g., "does AI write bad ads?", "are users annoyed?", "is data sold to advertisers?"). Provide authoritative, OpenAI policy-backed answers for each that demonstrate complete platform fluency.',
        exampleVariables: []
      }
    ]
  },
  {
    id: 2,
    slug: 'commercial-upside-full-funnel',
    title: 'Lesson 2: Commercial Intent & Full-Funnel Architecture',
    subtitle: 'Capturing Prospects at the Exact Moment of Solution Discovery',
    phase: 'Foundations',
    duration: '25 min',
    summary: 'When a user asks ChatGPT "How do I fix X?" or "What is the best tool for Y?", they are further down the decision funnel than a casual social scroller. Learn how to map conversational queries to commercial pipelines.',
    coreTeaching: [
      'The Decision-Velocity Principle: Chat users are looking for actionable answers right now, collapsing the traditional 7-touch marketing cycle into 1-2 touches.',
      'Full-Funnel Mapping: Top-of-Funnel (educational prompts), Mid-Funnel (comparison/evaluation prompts), Bottom-of-Funnel (tool selection & pricing prompts).',
      'The Direct Response Rule: Every conversational ad must present a friction-free, unambiguous solution that seamlessly completes the user’s thought process.',
      'Message Congruence: The landing page headline must mirror the core promise of the ad snippet to maintain cognitive momentum.'
    ],
    deepDive: {
      benefits: [
        'Higher conversion velocity from click to booked lead.',
        'High buyer intent reduces tyre-kicker inquiries.',
        'Ability to capture prospects while they are in active problem-solving mode.'
      ],
      costs: [
        'Requires precise copywriting that answers the query without looking spammy.',
        'Higher expectation for immediate landing page clarity.'
      ],
      risks: [
        'Using generic corporate slogans that ignore the user’s specific problem.',
        'Sending high-intent traffic to complicated multi-step homepages.'
      ],
      limitations: [
        'Ad copy character limits require radical brevity and punchy value.',
        'Cannot use aggressive "countdown timer" hype in ad previews.'
      ],
      potential: [
        'Build the highest-converting lead source in your entire marketing stack.',
        'Capture enterprise and high-LTV clients during internal tool research.'
      ],
      whatToPrepare: [
        'List of 10 customer pain points framed as direct ChatGPT questions.',
        'One-line solution statement for each pain point.',
        'Frictionless front-end lead magnet or direct consultation booking link.'
      ]
    },
    worksheetIdea: {
      title: 'Conversational Query-to-Offer Map',
      steps: [
        'Map 3 user question tiers: Informational ("What is..."), Comparative ("Best alternative to..."), Transactional ("How to hire...").',
        'Assign a dedicated landing page hook for each tier.',
        'Validate lead capture form fields (Name + Email + 1 Qualifying Question).'
      ]
    },
    implementationChecklist: [
      'Draft 3 message congruence headlines for your landing page.',
      'Eliminate top navigation bars on campaign landing pages to prevent leaks.',
      'Set up instant SMS notification when a chat lead opts in.'
    ],
    advancedPrompts: [
      {
        id: 201,
        title: 'Stage-of-Funnel Suitability Diagnostic',
        purpose: 'Determine whether ChatGPT ads should drive top-of-funnel leads or bottom-of-funnel checkout.',
        promptText: 'Analyze whether ChatGPT ads are best suited for Top-of-Funnel (awareness), Middle-of-Funnel (consideration), or Bottom-of-Funnel (direct conversion) for a {business_type} with a target market of {target_market}. Provide a specific funnel diagram and recommend the exact offer type for each stage.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 202,
        title: 'Skeptical Executive Value Proposition',
        purpose: 'Create a compelling ROI-focused value proposition for skeptical financial decision-makers.',
        promptText: 'Draft a 3-paragraph executive memo explaining why testing ChatGPT ads now represents an asymmetric upside for {business_type}. Contrast the diminishing returns of saturated Meta/Google auctions with the early-liquidity phase of OpenAI inventory.',
        exampleVariables: ['business_type']
      },
      {
        id: 203,
        title: 'Query-to-Revenue Conversion Flowchart',
        purpose: 'Map out the exact step-by-step path from ChatGPT prompt to closed customer.',
        promptText: 'Create a step-by-step user journey from the moment a user types a prompt into ChatGPT looking for help with {business_type}, sees our sponsored solution, clicks to our landing page, fills out the form, and is closed by our sales team. Detail the timing, emotion, and action at each step.',
        exampleVariables: ['business_type']
      },
      {
        id: 204,
        title: '12-Month Industry Impact Forecaster',
        purpose: 'Predict how conversational ads will reshape customer acquisition in your vertical.',
        promptText: 'Predict how the rollout of conversational ads in ChatGPT, Gemini, and search will transform customer acquisition in the {business_type} sector over the next 12 to 24 months. Identify the 3 biggest winners and 3 biggest losers in this transition.',
        exampleVariables: ['business_type']
      },
      {
        id: 205,
        title: 'Channel Disqualification & Red Flag Checklist',
        purpose: 'Identify specific scenarios where a business should NOT run ChatGPT ads.',
        promptText: 'List 7 specific scenarios where a {business_type} should deliberately NOT run ChatGPT ads right now (e.g., sub-$20 product margin, zero landing page, lack of sales team). Provide a scorecard to diagnose readiness.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 3,
    slug: 'who-should-use-chatgpt-ads',
    title: 'Lesson 3: Suitability Rubric & Niche Qualification',
    subtitle: 'Scoring Your Business Model for Conversational Ad Success',
    phase: 'Foundations',
    duration: '20 min',
    summary: 'Not every business model is built for conversational ads. Master the 6-factor suitability matrix to determine if your unit economics, offer margin, and industry vertical will produce profitable returns.',
    coreTeaching: [
      'The Unit Economic Hurdle: Because initial CPCs are $3–$5, businesses with Customer Lifetime Value (LTV) > $500 or average order value > $150 have massive structural advantage.',
      'High-Fit Verticals: B2B professional services, SaaS software, specialized agency services, high-end ecommerce, certification/education programs, and consultative home services.',
      'Low-Fit Verticals: Low-margin impulse commodities ($10 trinkets), broad viral entertainment, and restricted policy niches.',
      'The Agency Arbitrage: How marketing agencies can white-label ChatGPT Ads pilots for local and national clients.'
    ],
    deepDive: {
      benefits: [
        'Eliminate wasted spend on offers with unviable unit economics.',
        'Pinpoint the exact high-margin tier to promote first.',
        'Qualify agency prospects rapidly with objective criteria.'
      ],
      costs: [
        'Time required to audit customer LTV and margin thresholds.'
      ],
      risks: [
        'Running ads on low-margin products where CAC exceeds initial gross profit.',
        'Misjudging the length of the sales cycle.'
      ],
      limitations: [
        'Impulse checkout products with zero brand equity struggle on conversational click-through.'
      ],
      potential: [
        'Command $3,000–$7,500/month agency management retainers by packaging ChatGPT Ads setup + landing page optimization.',
        'Scale high-ticket B2B service acquisition.'
      ],
      whatToPrepare: [
        'Historical Average Order Value (AOV) and Customer LTV calculations.',
        'Current customer acquisition cost (CAC) benchmarks from existing channels.',
        'Client-fit qualification criteria sheet.'
      ]
    },
    worksheetIdea: {
      title: '10-Point Business Fit Scorecard',
      steps: [
        'Score LTV (> $1,000 = 10 pts, $300-$999 = 6 pts, < $100 = 1 pt).',
        'Score Offer Clarity (Dedicated Solution = 10 pts, Broad catalog = 3 pts).',
        'Calculate your break-even conversion rate based on a $4.00 CPC estimate.'
      ]
    },
    implementationChecklist: [
      'Identify your single highest-margin service package.',
      'Calculate minimum lead-to-close ratio required at $40 CPL.',
      'Draft your qualification criteria for client onboarding.'
    ],
    advancedPrompts: [
      {
        id: 301,
        title: '10-Point Channel Fit Scoring Engine',
        purpose: 'Generate an objective suitability score (1-10) with detailed justification.',
        promptText: 'You are an elite growth consultant. Score the following business from 1 to 10 for ChatGPT Ads suitability: Business Model: {business_type}, Target Market: {target_market}, Typical Deal Size / Budget: {monthly_budget}. Break down your score across 5 pillars: 1. Conversational Query Demand, 2. Unit Economic Margin, 3. Solution Specificity, 4. Policy Compliance, 5. Sales Cycle Velocity.',
        exampleVariables: ['business_type', 'target_market', 'monthly_budget']
      },
      {
        id: 302,
        title: 'Client-Fit Matrix for Agency Pitching',
        purpose: 'Segment a client list into Green (Pitch Now), Yellow (Fix First), and Red (Avoid) tiers.',
        promptText: 'Create a client-fit qualification matrix for a marketing agency looking to sell ChatGPT Ads management to {business_type} clients. Define explicit criteria for: Tier 1 (Ideal High-Ticket Fit), Tier 2 (Requires Landing Page Overhaul First), Tier 3 (Disqualified / Poor Unit Economics). Include discovery questions for each tier.',
        exampleVariables: ['business_type']
      },
      {
        id: 303,
        title: 'Conversational Offer Matchmaker',
        purpose: 'Transform a generic service menu into an intent-matched front-end conversational offer.',
        promptText: 'Given the following service offerings for a {business_type}: create 3 specialized "Front-End Conversational Entry Offers" specifically engineered to capture chat users seeking immediate help. Each offer must have a compelling hook, low friction barrier, and clear next step.',
        exampleVariables: ['business_type']
      },
      {
        id: 304,
        title: 'Red-Flag Diagnostic & Risk Auditor',
        purpose: 'Identify hidden operational risks that could cause an ad pilot to fail.',
        promptText: 'Audit the operational readiness of a {business_type} preparing to spend {monthly_budget} on ChatGPT ads. Identify 5 hidden friction points in their sales or delivery process that could cause the campaign to fail despite generating high-quality clicks.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 305,
        title: 'Conversational Angle Rewrite Engine',
        purpose: 'Rewrite existing Google/Meta ad copy into natural conversational problem-solving copy.',
        promptText: 'Take standard direct-response ad copy for a {business_type} and rewrite it into 3 distinct "Conversational Solution Angles" for ChatGPT Ads. Ensure the tone is helpful, authoritative, transparent, and completely free of spammy hype.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 4,
    slug: 'costs-pricing-and-budgeting',
    title: 'Lesson 4: Economics, Bidding Models & Test Budgets',
    subtitle: 'CPC vs CPM Mechanics, Auction Math & ROI Modeling',
    phase: 'Economics & Risk',
    duration: '28 min',
    summary: 'ChatGPT Ads use self-serve auction bidding with no fixed mandatory minimum spend. Learn how cost-per-click (CPC) and cost-per-mille (CPM) pricing works, how to construct a 14-day test budget, and how to model break-even acquisition costs.',
    coreTeaching: [
      'The Auction Paradigm: Advertisers bid on user contextual intent using dynamic CPC (expected $3.00–$5.50) or CPM ($25.00–$60.00) depending on campaign objective.',
      'No Arbitrary Gated Minimums: Unlike early closed beta phases that required $50k+ enterprise commitments, open self-serve allows testing with flexible daily budgets ($30–$100/day).',
      'The 300-Click Statistical Rule: A proper test requires at least 300 to 500 paid clicks to evaluate landing page conversion rate (CVR) and ad angle resonance.',
      'Reverse Funnel Math: Target CPL = (Target CAC × Close Rate). Max Allowed CPC = (Target CPL × Landing Page CVR).'
    ],
    deepDive: {
      benefits: [
        'Control daily budget pacing with hard spend limits.',
        'Direct CPC billing ensures you only pay when high-intent prospects take action.',
        'Transparent unit economics make ROI forecasting straightforward.'
      ],
      costs: [
        'Higher starting CPCs than broad Meta display traffic, offset by significantly higher conversion intent.',
        'Learning budget required during the initial 7–14 days of algorithmic calibration.'
      ],
      risks: [
        'Setting daily budgets too low ($5/day), which starves the delivery algorithm of learning signals.',
        'Prematurely killing ad angles before reaching statistical significance.'
      ],
      limitations: [
        'Auction volatility during peak holiday or commercial seasons.',
        'No guaranteed impression volume without competitive bidding.'
      ],
      potential: [
        'Secure lower blended CAC across your entire marketing ecosystem.',
        'Acquire high-ticket clients at 3x–5x ROAS with optimized sales follow-up.'
      ],
      whatToPrepare: [
        'Allocated testing capital ($1,000–$3,000 for a 30-day pilot).',
        'Target Cost Per Lead (CPL) and Customer Acquisition Cost (CAC) thresholds.',
        'Calculated Customer Lifetime Value (LTV) sheet.'
      ]
    },
    worksheetIdea: {
      title: 'Conversational Ad Unit Economics Calculator',
      steps: [
        'Input: Average Deal Size ($), Gross Margin (%), Estimated Sales Close Rate (%).',
        'Calculate Break-Even CPL = (Deal Size × Gross Margin × Close Rate).',
        'Calculate Max Allowed CPC at 5%, 8%, and 12% landing page conversion rates.'
      ]
    },
    implementationChecklist: [
      'Establish a strict 14-day testing budget cap.',
      'Configure automated billing threshold alerts in Ads Manager.',
      'Document your minimum acceptable ROAS for client reporting.'
    ],
    advancedPrompts: [
      {
        id: 401,
        title: '3-Tier Test Budget Architecture',
        purpose: 'Create Conservative, Balanced, and Aggressive 30-day budget allocations.',
        promptText: 'Build a comprehensive 30-day ad budget allocation for a {business_type} with a total test spend of {monthly_budget}. Break down daily spend, expected click volume at $3.50-$4.50 CPC, target landing page visitors, estimated lead volume at 8% CVR, and expected closed deals across Conservative, Standard, and Aggressive scenarios.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 402,
        title: 'Break-Even CPC & CPL Reverse Engineer',
        purpose: 'Calculate exact break-even metrics based on product margins and close rates.',
        promptText: 'Perform a unit-economic break-even analysis for a {business_type} selling a core package priced at {monthly_budget} with a 70% gross margin and a 20% sales close rate on qualified booked leads. Calculate the Maximum Allowable CPL and Maximum Allowable CPC at 5%, 8%, and 12% landing page conversion rates.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 403,
        title: 'Client-Facing Cost Uncertainty Memo',
        purpose: 'Explain early testing CPC dynamics and algorithmic calibration to clients.',
        promptText: 'Write a professional, reassuring 1-page memo for an agency client in the {business_type} vertical explaining how auction-based CPC bidding works on ChatGPT Ads. Address why initial days are a "learning phase" and how statistical significance protects their capital long term.',
        exampleVariables: ['business_type']
      },
      {
        id: 404,
        title: 'Interactive ROI Scenario Simulator',
        purpose: 'Model high, mid, and low return scenarios for executive stakeholders.',
        promptText: 'Create an ROI projection table for {business_type} testing ChatGPT ads in {target_market} with a monthly ad spend of {monthly_budget}. Show 3 distinct scenarios: Worst Case (High CPC, Low CVR), Base Case (Expected Norms), Best Case (Optimized CVR). Include expected Revenue, Net Profit, and ROAS for each.',
        exampleVariables: ['business_type', 'target_market', 'monthly_budget']
      },
      {
        id: 405,
        title: 'Bidding Strategy Decision Matrix (CPC vs CPM)',
        purpose: 'Determine the exact moments to switch between CPC bidding and CPM scaling.',
        promptText: 'Outline a precise decision rule for when a {business_type} should use Cost-Per-Click (CPC) bidding versus Cost-Per-Mille (CPM) impression bidding on ChatGPT Ads. Detail the exact CTR and CVR benchmarks that justify switching biddings models.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 5,
    slug: 'risks-limitations-and-guardrails',
    title: 'Lesson 5: Risk Mitigation & Platform Limitations',
    subtitle: 'Navigating Channel Dependency, Attribution Gaps & Algorithmic Volatility',
    phase: 'Economics & Risk',
    duration: '24 min',
    summary: 'Every new advertising platform carries structural risks. Learn how to insulate your business against single-channel dependency, privacy tracking gaps, attribution delays, and auction fluctuations.',
    coreTeaching: [
      'Platform Risk & Diversification: ChatGPT Ads should be a high-yield amplifier, never the sole lifeblood of your customer acquisition pipeline.',
      'Attribution Realities: Because OpenAI does not share private user conversational logs with advertisers, tracking relies on clean first-party UTM parameters and server-side CRM webhooks.',
      'Brand Safety Protections: How OpenAI’s contextual exclusion prevents your brand from showing next to controversial, medical, or political queries.',
      'The "Ad Blindness" Evolution: How conversational ads will evolve from novel snippets to standard inventory, and how to stay ahead of creative fatigue.'
    ],
    deepDive: {
      benefits: [
        'Protect brand equity by operating with clean, transparent positioning.',
        'Avoid account suspensions or ad disapproval delays.',
        'Build resilient multi-channel attribution infrastructure.'
      ],
      costs: [
        'Setting up first-party tracking and CRM webhooks requires technical diligence.'
      ],
      risks: [
        'Assuming privacy policies allow retargeting individual chat user histories (they do not).',
        'Over-investing before proving unit economics.'
      ],
      limitations: [
        'No direct pixel tracking inside the AI chat interface itself; measurement starts upon landing page click.',
        'Audience targeting is context-based, not deep third-party demographic profiling.'
      ],
      potential: [
        'Establish an unassailable organic and paid position while competitors hesitate.',
        'Build a gold-standard first-party lead database.'
      ],
      whatToPrepare: [
        'Privacy Policy and Cookie Consent compliance page on your website.',
        'First-party data collection framework.',
        'Multi-channel fallback plan (Google Search + Meta retargeting).'
      ]
    },
    worksheetIdea: {
      title: 'Ad Platform Risk Audit & Contingency Plan',
      steps: [
        'Audit your landing page for GDPR / CCPA / UK-DPA compliance.',
        'Verify UTM parameter structure across all campaign links.',
        'Establish hard stop-loss criteria (e.g., pause ad group if CPL > 150% of target after $300 spend).'
      ]
    },
    implementationChecklist: [
      'Set up daily automated spend notifications.',
      'Audit your landing page privacy and terms links in the footer.',
      'Document client-facing risk disclosure.'
    ],
    advancedPrompts: [
      {
        id: 501,
        title: 'Conversational Ad Risk Audit & Threat Matrix',
        purpose: 'Identify the top 7 operational and financial risks of advertising inside AI conversations.',
        promptText: 'Analyze the top 7 potential risks and failure modes for a {business_type} deploying ad spend on ChatGPT Ads in {target_market}. Categorize them into Platform Risk, Financial Risk, Attribution Risk, and Brand Reputation Risk. Provide a concrete mitigation tactic for each.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 502,
        title: 'First-Party Tracking & Attribution Blueprint',
        purpose: 'Design a tracking system that functions flawlessly despite privacy restrictions.',
        promptText: 'Create a technical attribution and tracking architecture for a {business_type} running ChatGPT Ads. Detail how to combine UTM tagging (utm_source=chatgpt, utm_medium=cpc, utm_campaign, utm_content=ad_angle), Google Analytics 4 custom dimensions, and CRM webhook capture to track every dollar of closed revenue.',
        exampleVariables: ['business_type']
      },
      {
        id: 503,
        title: 'Client Proposal "What Can Go Wrong" Section',
        purpose: 'Write an honest, high-trust risk disclosure for enterprise client proposals.',
        promptText: 'Draft the "Risks, Guardrails, and Mitigation Protocols" section for an agency proposal pitching ChatGPT Ads management to a {business_type}. Maintain a consultative, senior tone that builds immense trust through transparent risk management.',
        exampleVariables: ['business_type']
      },
      {
        id: 504,
        title: 'Stop-Loss & Campaign Kill-Switch Framework',
        purpose: 'Establish objective mathematical decision rules for killing underperforming ads.',
        promptText: 'Define an exact "Kill, Tweak, or Scale" decision flowchart for a {business_type} spending {monthly_budget} on ChatGPT Ads. Specify the exact statistical thresholds (Spend vs Impressions vs Clicks vs Form Submissions) required at Day 3, Day 7, and Day 14.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 505,
        title: 'Brand Safety & Context Exclusion Audit',
        purpose: 'Ensure ad copy never appears adjacent to inappropriate conversational topics.',
        promptText: 'Review the brand messaging and service offerings for {business_type}. Identify any ambiguous terminology that could trigger unwanted contextual matching or OpenAI policy reviews, and provide sanitized, high-converting copy alternatives.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 6,
    slug: 'privacy-trust-and-policy-compliance',
    title: 'Lesson 6: Privacy, User Trust & Policy Guardrails',
    subtitle: 'Building Ethical, Transparent & High-Converting Conversational Placements',
    phase: 'Economics & Risk',
    duration: '22 min',
    summary: 'OpenAI’s advertising architecture is built on user trust: clearly labeled placements, no sale of conversation data to third parties, and automatic exclusion of sensitive topics. Learn how to write ads that users welcome rather than resent.',
    coreTeaching: [
      'The Trust Imperative: AI users treat the chat interface as an intimate thinking space. Intrusive, deceitful, or clickbait ads will suffer algorithmic penalties and user dismissal.',
      'Mandatory Sponsorship Disclosure: Every ad is clearly marked as "Sponsored" or "Promoted" by OpenAI. Emphasize clarity and genuine utility.',
      'Prohibited Categories: Strict prohibitions on weapons, adult products, political campaigning, unverified financial schemes, and deceptive claims.',
      'Privacy Preservation: Understanding that advertisers receive zero personal user chat logs—targeting is strictly contextual and aggregate.'
    ],
    deepDive: {
      benefits: [
        'Higher brand prestige by advertising in a clean, uncluttered AI environment.',
        'High consumer trust in approved sponsor placements.',
        'Sustainable long-term presence immune to policy crackdowns.'
      ],
      costs: [
        'Strict copywriting compliance review required before submission.'
      ],
      risks: [
        'Attempting to disguise ads as organic AI responses (strictly banned and flagged).',
        'Making unverifiable income or health claims.'
      ],
      limitations: [
        'No direct demographic micro-targeting based on user chat history.'
      ],
      potential: [
        'Position your brand as the recognized authority in your vertical.',
        'Earn long-term brand equity while spammy competitors get banned.'
      ],
      whatToPrepare: [
        'Documented claims verification file (proof of customer results, certifications).',
        'Clean, transparent company contact info on all landing pages.',
        'Ad policy compliance checklist.'
      ]
    },
    worksheetIdea: {
      title: 'Policy Compliance & Trust Audit',
      steps: [
        'Check ad copy against OpenAI Restricted Context Guidelines.',
        'Ensure landing page displays legal business entity, privacy policy, and terms.',
        'Verify that all claims have documented customer evidence.'
      ]
    },
    implementationChecklist: [
      'Verify that all ad angles include clear value without exaggerated hype.',
      'Ensure cookie banner and privacy policy are active on the destination URL.',
      'Complete business identity verification in Ads Manager.'
    ],
    advancedPrompts: [
      {
        id: 601,
        title: 'OpenAI Ad Policy Compliance Reviewer',
        purpose: 'Audit ad concept copy against OpenAI Trust & Safety guidelines.',
        promptText: 'You are a senior ad policy compliance auditor. Review the following proposed ad concept for a {business_type}: "{business_type} - {target_market}". Audit it for: 1. Clarity of sponsorship, 2. Authenticity of claims, 3. Sensitive category avoidance, 4. User respect and non-intrusiveness. Provide a compliance score (1-100) and rewrites.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 602,
        title: 'Trust-First Messaging Framework',
        purpose: 'Transform aggressive direct-response claims into credible, trust-building copy.',
        promptText: 'Rewrite 3 high-converting ad angles for {business_type} using a "Trust-First Conversational Framework". Replace aggressive urgency and hype with transparent expertise, documented proof, and helpful problem resolution that respects the user experience.',
        exampleVariables: ['business_type']
      },
      {
        id: 603,
        title: 'Sensitive Category Navigation Guide',
        purpose: 'Safely advertise in adjacent professional verticals (financial, legal, wellness).',
        promptText: 'Provide a comprehensive compliance guide for advertising a professional {business_type} inside ChatGPT. Detail how to position offers that touch financial decisions, legal guidance, or business operations while remaining 100% compliant with advertising regulations and OpenAI policies.',
        exampleVariables: ['business_type']
      },
      {
        id: 604,
        title: 'Agency Ethical Use Policy & Charter',
        purpose: 'Create an agency ethics charter to reassure clients and stakeholders.',
        promptText: 'Draft a formal "Ethical AI Advertising Charter" for a digital agency offering ChatGPT Ads management. Highlight consumer privacy protections, zero use of deceptive copy, strict adherence to platform safety policies, and transparent client reporting.',
        exampleVariables: []
      },
      {
        id: 605,
        title: 'Landing Page Trust & Transparency Checklist',
        purpose: 'Audit destination pages for conversion trust elements that satisfy compliance.',
        promptText: 'Generate a 12-point landing page trust and compliance checklist for {business_type}. Include mandatory legal disclaimers, clear refund/cancellation policies, contact information visibility, and testimonial substantiation guidelines.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 7,
    slug: 'offer-readiness-and-proof-assets',
    title: 'Lesson 7: Offer Architecture & Proof Engineering',
    subtitle: 'Structuring High-Certainty Front-End Offers for Chat Traffic',
    phase: 'Strategy & Funnel',
    duration: '26 min',
    summary: 'The offer does 80% of the heavy lifting in paid advertising. Learn how to transform complex, multi-tiered services into a crisp, high-certainty "Front-End Offer" backed by undeniable social proof.',
    coreTeaching: [
      'The Front-End Offer Mandate: Conversational users are in task-completion mode. A vague "Contact Us For a Quote" will fail. A specific "Free 15-Minute Audit + Implementation Roadmap" will win.',
      'The Proof Hierarchy: Video case study > Quantified metric case study > Text testimonial > Generic star rating.',
      'Risk Reversal Architecture: How to structure performance guarantees, no-risk audits, or conditional deliverables that remove buyer hesitation instantly.',
      'Value Stack Framing: Bundling complementary resources (templates, checklists, audits) into the primary consultation offer.'
    ],
    deepDive: {
      benefits: [
        'Massively increase landing page click-to-lead conversion rate (target > 12%).',
        'Shorten sales cycle by establishing authority before the first call.',
        'Command premium pricing through structured positioning.'
      ],
      costs: [
        'Time required to package proof assets and case studies.'
      ],
      risks: [
        'Over-promising deliverables that strain operational capacity.',
        'Offering a lead magnet that attracts low-quality non-buyers.'
      ],
      limitations: [
        'Proof must be authentic and verifiable—fake reviews destroy credibility.'
      ],
      potential: [
        'Build a scalable front-end client acquisition machine.',
        'Position your business as the category benchmark.'
      ],
      whatToPrepare: [
        '3 customer success stories with specific metrics (e.g., "Increased pipeline by $140k in 60 days").',
        '1 high-value downloadable asset or audit framework.',
        'Clear risk reversal / guarantee statement.'
      ]
    },
    worksheetIdea: {
      title: 'Irresistible Front-End Offer Blueprint',
      steps: [
        'Name your offer: [Specific Outcome] + [Time Horizon] + [Without Pain].',
        'List the 3 components of the offer stack (Audit + Custom Roadmap + Tool Access).',
        'Attach 1 tangible client proof story to each component.'
      ]
    },
    implementationChecklist: [
      'Finalize your front-end offer title and subtitle.',
      'Gather and format 3 customer case study snippets.',
      'Embed video proof or verified testimonials directly on the landing page.'
    ],
    advancedPrompts: [
      {
        id: 701,
        title: 'Front-End Offer Simplifier & Sharpening Engine',
        purpose: 'Transform a complex, rambling service description into a punchy front-end offer.',
        promptText: 'Take the following service offerings for a {business_type}: package them into 3 distinct, irresistible "Front-End Conversational Entry Offers" for prospects in {target_market}. For each offer, provide: 1. Irresistible Name, 2. The Core Deliverable, 3. The Time-to-Value, 4. The Risk Reversal Guarantee, 5. Why a ChatGPT user clicking an ad will convert immediately.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 702,
        title: '3-Tier Social Proof Asset Builder',
        purpose: 'Extract and format the strongest undeniable proof points from your business history.',
        promptText: 'You are a conversion rate copywriter. Help a {business_type} identify and articulate their top 3 proof assets for a conversational ad landing page. Format each into: 1. The Headline Metric, 2. The Before/After Transformation, 3. The 2-Sentence Social Proof Quote that eliminates buyer skepticism.',
        exampleVariables: ['business_type']
      },
      {
        id: 703,
        title: 'Message Hierarchy & Value Stack Structurer',
        purpose: 'Structure the visual and cognitive hierarchy of your offer above the fold.',
        promptText: 'Design the exact message hierarchy for a {business_type} landing page capturing ChatGPT ad traffic. Detail what appears in: 1. Eyebrow Tag, 2. Main Headline, 3. Subheadline, 4. 3 Bulleted Value Props, 5. CTA Button Copy, 6. Micro-Proof Badge.',
        exampleVariables: ['business_type']
      },
      {
        id: 704,
        title: 'Risk Reversal & Guarantee Formulator',
        purpose: 'Craft an authoritative, business-safe risk reversal guarantee.',
        promptText: 'Draft 3 distinct risk-reversal guarantee options for a high-ticket {business_type} with typical client budget of {monthly_budget}. Option 1: Performance-Based, Option 2: Value-Satisfaction, Option 3: Conditional Action Guarantee. Ensure all are legally sound and operationally viable.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 705,
        title: 'Pre-Launch Asset Readiness Audit',
        purpose: 'Run a thorough pre-flight inventory of all creative and operational assets.',
        promptText: 'Generate an exhaustive pre-launch asset inventory checklist for a {business_type} planning to spend {monthly_budget} on ads. Include Creative Assets, Copywriting Assets, Social Proof Assets, Legal Assets, and Operational Sales Assets.',
        exampleVariables: ['business_type', 'monthly_budget']
      }
    ]
  },
  {
    id: 8,
    slug: 'funnel-architecture-and-tracking',
    title: 'Lesson 8: High-Converting Funnel & Tracking Infrastructure',
    subtitle: 'Building Frictionless Mobile Pages, Lead Capture & CRM Handoff',
    phase: 'Strategy & Funnel',
    duration: '30 min',
    summary: 'A world-class ad is completely wasted if the landing page is slow, confusing, or unmeasured. Learn how to architect a sub-1.5s conversion funnel with automated CRM handoff and end-to-end attribution.',
    coreTeaching: [
      'The 1-Screen Rule for Mobile Chat Traffic: Over 70% of ChatGPT users will click from mobile devices. The core value, proof, and lead capture form must be accessible in 1-2 thumb scrolls.',
      'Speed as a Conversion Multiplier: Every 100ms reduction in page load speed increases mobile conversions by 8.4%. Optimize images, remove heavy external scripts, and host on fast edge networks.',
      'Automated Lead Ingestion: Submitting the form must immediately trigger an automated CRM webhook (GoHighLevel, HubSpot, Zapier) that alerts sales reps in real time.',
      'UTM Hygiene & Parameter Forwarding: Ensure UTM parameters (source, campaign, ad_id) pass from URL query strings into hidden form fields and straight into your CRM.'
    ],
    deepDive: {
      benefits: [
        'Zero lead leakage through broken tracking or delayed notifications.',
        'High conversion rates (10%–18% on warm conversational traffic).',
        'Complete clarity on which specific ad variations generate paying revenue.'
      ],
      costs: [
        'Initial setup of landing page builder and CRM automation workflows.'
      ],
      risks: [
        'Form submit button failure on mobile browsers.',
        'Losing attribution data when users navigate between subdomains.'
      ],
      limitations: [
        'Third-party cookie restrictions make first-party server-side tracking essential.'
      ],
      potential: [
        'Create a turnkey, automated sales engine that runs 24/7.',
        'Scale client funnels reliably across multiple international markets.'
      ],
      whatToPrepare: [
        'Domain with SSL certificate.',
        'Landing page platform (Next.js, Webflow, GoHighLevel, WordPress).',
        'CRM webhook endpoint for instant lead routing.'
      ]
    },
    worksheetIdea: {
      title: 'Funnel Leak Audit & Speed Test',
      steps: [
        'Run Google PageSpeed Insights on mobile (Target: Performance score > 90).',
        'Test form submission on iPhone Safari and Android Chrome.',
        'Verify that CRM receives full contact payload + UTM tags within 10 seconds.'
      ]
    },
    implementationChecklist: [
      'Build dedicated mobile landing page with zero global navigation distractions.',
      'Add hidden fields for utm_source, utm_campaign, utm_content to your form.',
      'Configure automated SMS / email notification to your sales team on submission.'
    ],
    advancedPrompts: [
      {
        id: 801,
        title: 'End-to-End Funnel Architecture Checklist',
        purpose: 'Create a comprehensive technical and UX checklist for the entire funnel.',
        promptText: 'You are a lead generation systems architect. Build an exhaustive end-to-end funnel deployment checklist for a {business_type} targeting {target_market}. Cover: 1. Landing Page Architecture, 2. Form Field Optimization, 3. Thank-You Page Value, 4. Automated CRM Webhook Routing, 5. Instant SMS/Email Handoff.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 802,
        title: 'Landing Page Friction & Conversion Leak Audit',
        purpose: 'Audit a proposed landing page wireframe for conversion-killing leaks.',
        promptText: 'Audit the conversion architecture of a landing page for {business_type}. Identify 8 common conversion leaks (e.g., external links, slow video embeds, too many form fields, weak mobile buttons) and provide the exact high-converting fix for each.',
        exampleVariables: ['business_type']
      },
      {
        id: 803,
        title: 'Multi-Tier Attribution & Analytics Blueprint',
        purpose: 'Map out the complete data tracking flow from ad click to Stripe payment.',
        promptText: 'Draft a technical tracking plan for {business_type} spending {monthly_budget}. Detail how to track: 1. Ad Click (UTM taxonomy), 2. Page View (GA4 custom event), 3. Form Submit (CAPI + Webhook), 4. Discovery Call Booked (Calendly/GHL integration), 5. Closed Won Revenue (Stripe to CRM sync).',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 804,
        title: 'Minimum Viable Analytics & Tool Stack',
        purpose: 'Define the leanest, most effective tracking stack for rapid launch.',
        promptText: 'Provide a lean, modern analytics and tech stack recommendation for a {business_type} launching ChatGPT Ads in under 48 hours. Compare tools (e.g., GHL vs Webflow + Zapier + GA4) and specify the exact configuration needed for zero data loss.',
        exampleVariables: ['business_type']
      },
      {
        id: 805,
        title: 'Lead-to-Sales CRM Automation Workflow',
        purpose: 'Design the automated follow-up workflow triggered immediately upon opt-in.',
        promptText: 'Create a 5-step automated workflow triggered immediately when a prospect submits a lead form from a ChatGPT ad for {business_type}. Specify the exact copy and timing for: Step 1 (Instant SMS within 60s), Step 2 (Confirmation Email), Step 3 (Sales Rep Push Notification), Step 4 (Calendar Booking Reminder), Step 5 (Unresponsive Lead Follow-Up).',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 9,
    slug: 'creative-strategy-and-ad-angles',
    title: 'Lesson 9: Conversational Creative Strategy & Ad Angles',
    subtitle: 'Crafting Intent-Matched Headlines, Body Copy & High-Yield CTAs',
    phase: 'Strategy & Funnel',
    duration: '27 min',
    summary: 'Conversational ad copy requires an entirely different psychology than traditional feed ads. Master the 5 proven conversational angles that capture user attention respectfully and drive click-through.',
    coreTeaching: [
      'The 5 Core Conversational Angles: 1. Question-Led ("Looking for X?"), 2. Direct Solution ("The proven framework for Y"), 3. Proof-Led ("How [Company] achieved Z"), 4. Diagnostic ("Audit your current system"), 5. Comparison ("Why traditional approaches fail").',
      'The Brevity Imperative: You have 1-2 short sentences to demonstrate immediate relevance. Cut all buzzwords and fluff.',
      'CTA Psychology in Chat: Use low-friction, intent-completing CTAs such as "Get the Checklist", "Run Free Audit", "View Live Case Study", rather than aggressive "Buy Now".',
      'Contextual Dynamic Angle Matching: Matching ad variants to user intent clusters (B2B research vs technical implementation vs pricing inquiries).'
    ],
    deepDive: {
      benefits: [
        'Generate high CTR (> 2.5%) on conversational queries.',
        'Pre-qualify buyers before they click, saving ad spend on irrelevant traffic.',
        'Stand out from generic corporate banner copy.'
      ],
      costs: [
        'Time required to brainstorm and test multiple creative angles.'
      ],
      risks: [
        'Using overly clever puns or vague slogans that fail to communicate the offer.',
        'Copy fatigue over 60+ days without angle rotation.'
      ],
      limitations: [
        'Character limits require extreme conciseness.',
        'No animated video or flashy GIF formats in text chat placement.'
      ],
      potential: [
        'Discover the single winning hook that scales your business to 6-figure monthly revenue.',
        'Create a permanent library of high-performing marketing angles.'
      ],
      whatToPrepare: [
        '5 distinct ad copy variations written across the 5 core angles.',
        '3 CTA button copy options.',
        'Headline variation testing matrix.'
      ]
    },
    worksheetIdea: {
      title: '5-Angle Creative Swipe Matrix',
      steps: [
        'Write 1 Question-Led ad variation.',
        'Write 1 Proof-Led ad variation.',
        'Write 1 Diagnostic ad variation.',
        'Pair each with a dedicated headline and CTA.'
      ]
    },
    implementationChecklist: [
      'Draft 5 distinct ad snippets for your primary campaign.',
      'Check all snippets for conciseness (< 120 characters per sentence).',
      'Upload copy variants into Ads Manager for A/B rotation.'
    ],
    advancedPrompts: [
      {
        id: 901,
        title: '5 Core Conversational Angle Generator',
        purpose: 'Generate 5 distinct, high-converting ad angles tailored to your business.',
        promptText: 'You are a master direct-response copywriter. Generate 5 distinct ChatGPT Ad copy angles for a {business_type} targeting {target_market}. Provide: 1. The Question-Led Angle, 2. The Direct-Solution Angle, 3. The Proof-Led Metric Angle, 4. The Diagnostic Audit Angle, 5. The Comparison Angle. For each, write: Headline (max 40 chars), Body Snippet (max 120 chars), and CTA Button.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 902,
        title: 'Conversational Tone Polisher & De-Spammifier',
        purpose: 'Rewrite aggressive sales copy into clean, consultative, helpful language.',
        promptText: 'Take the following promotional ad copy for a {business_type}: rewrite it into 3 clean, highly conversational, helpful variations suitable for ChatGPT’s clean user interface. Eliminate all hype, cheesy buzzwords, and all-caps urgency while increasing emotional resonance.',
        exampleVariables: ['business_type']
      },
      {
        id: 903,
        title: 'Buyer Intent Headline Variations Matrix',
        purpose: 'Create 9 headline variations segmented by buyer sophistication level.',
        promptText: 'Generate 9 headline variations for {business_type} segmented by Eugene Schwartz’s awareness levels: 3 headlines for Problem-Aware prospects, 3 headlines for Solution-Aware prospects, and 3 headlines for Product-Aware prospects. Ensure each headline fits within ChatGPT ad character constraints.',
        exampleVariables: ['business_type']
      },
      {
        id: 904,
        title: 'Low-Friction Conversational CTA Formulator',
        purpose: 'Create compelling call-to-action options that match conversational flow.',
        promptText: 'Brainstorm 8 low-friction, high-converting Call-To-Action (CTA) phrases for a {business_type} with a target monthly budget of {monthly_budget}. Compare traditional CTAs ("Contact Us", "Submit") with conversational CTAs ("Get Free Audit", "See Case Study", "Compare Solutions") and explain the psychological trigger of each.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 905,
        title: 'Proof-Based Social Validation Angle Builder',
        purpose: 'Transform a customer case study into a high-CTR sponsored snippet.',
        promptText: 'Extract the single most compelling metric from a {business_type} customer case study and build 3 "Proof-Based Ad Snippets" around it. Include the specific metric, the timeframe, and the exact benefit for a new prospect.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 10,
    slug: 'launch-planning-and-campaign-setup',
    title: 'Lesson 10: Launch Blueprint & Campaign Execution',
    subtitle: 'Structuring Your First 14-Day Pilot, Budget Pacing & Decision Rules',
    phase: 'Launch & Scale',
    duration: '28 min',
    summary: 'Eliminate guesswork on launch day. Follow a step-by-step 14-day launch blueprint covering campaign account structure, audience context selection, daily pacing, and unambiguous Keep/Kill/Scale decision rules.',
    coreTeaching: [
      'The 14-Day Pilot Structure: Days 1–3 (Algorithmic calibration and CTR evaluation), Days 4–7 (Initial conversion data and CVR baseline), Days 8–14 (Angle pruning and budget concentration).',
      'Campaign Hierarchy: 1 Objective Campaign → 3 Ad Groups (Segmented by context/intent themes) → 2–3 Creative Variations per Ad Group.',
      'Daily Budget Pacing: Start with modest daily caps ($40–$75/day per ad group) to avoid budget burnout during the initial learning phase.',
      'The Statistical Decision Rule: Never pause an ad variation before it receives at least 100 clicks unless CTR is catastrophic (< 0.5%).'
    ],
    deepDive: {
      benefits: [
        'Structured, anxiety-free launch process.',
        'Protects ad capital from runaway wasteful spending.',
        'Produces actionable data within 7–10 days.'
      ],
      costs: [
        'Requires disciplined adherence to test rules without premature tweaking.'
      ],
      risks: [
        'Making constant daily changes that reset the ad delivery algorithm.',
        'Spreading budget across too many ad groups simultaneously.'
      ],
      limitations: [
        'Early days may have higher CPCs before platform relevance scores stabilize.'
      ],
      potential: [
        'Identify your primary customer acquisition campaign within 2 weeks.',
        'Lay the operational foundation for 5-figure monthly scaling.'
      ],
      whatToPrepare: [
        'Campaign name taxonomy and UTM conventions.',
        'Funded payment method in Ads Manager.',
        'Testing timeline and KPI scorecard.'
      ]
    },
    worksheetIdea: {
      title: '14-Day Launch & Optimization Schedule',
      steps: [
        'Day 1: Deploy Campaign with 3 Ad Groups and 6 total creative assets.',
        'Day 4: Check delivery pacing, CTR (> 1.8% target), and bounce rate.',
        'Day 7: Pause the lowest-performing creative in each ad group.',
        'Day 14: Review CPL and closed-deal pipeline; scale winning group by 30%.'
      ]
    },
    implementationChecklist: [
      'Create campaign in OpenAI Ads Manager with clear naming convention.',
      'Confirm landing page tracking pixel / webhook fires properly in test mode.',
      'Set daily spend limit alert on your credit card / bank account.'
    ],
    advancedPrompts: [
      {
        id: 1001,
        title: '14-Day Step-by-Step Launch Blueprint',
        purpose: 'Create an exact daily action plan for the first 14 days of a live campaign.',
        promptText: 'Build a rigorous, day-by-day 14-day launch plan for a {business_type} deploying {monthly_budget} on ChatGPT Ads in {target_market}. Detail the exact actions, metrics to inspect, and decisions to make on Day 1, Day 3, Day 5, Day 7, Day 10, and Day 14.',
        exampleVariables: ['business_type', 'monthly_budget', 'target_market']
      },
      {
        id: 1002,
        title: 'Account & Ad Group Architecture Schema',
        purpose: 'Design the ideal campaign structure for multi-angle testing.',
        promptText: 'Design the complete campaign hierarchy schema for {business_type}. Detail: Campaign Name, Campaign Objective, 3 Distinct Ad Groups (Context/Intent cluster definitions), and 2 Creative Assets per group with naming conventions and UTM parameter strings.',
        exampleVariables: ['business_type']
      },
      {
        id: 1003,
        title: 'Keep, Kill, or Scale Decision Logic Tree',
        purpose: 'Create unambiguous mathematical rules for managing live ads.',
        promptText: 'Write a definitive "Keep, Kill, or Scale" decision flowchart for a marketing team managing ChatGPT ads for {business_type}. Use specific KPI benchmarks (CTR, CPC, Landing Page CVR, Cost Per Lead) at 50 clicks, 100 clicks, and 250 clicks to dictate exact operational commands.',
        exampleVariables: ['business_type']
      },
      {
        id: 1004,
        title: 'Initial 3-Variable Split-Testing Protocol',
        purpose: 'Prioritize which 3 variables to test first to find winning combinations fast.',
        promptText: 'Identify the top 3 highest-leverage variables to test first in a new ChatGPT Ads campaign for {business_type} (e.g., Headline Angle vs Destination Offer vs CTA text). Outline the exact test protocol to isolate variables and achieve statistical significance without wasting budget.',
        exampleVariables: ['business_type']
      },
      {
        id: 1005,
        title: 'Client Launch Day Checklist & SOP',
        purpose: 'Provide a flawless pre-flight checklist for agency account managers.',
        promptText: 'Draft a 15-point "Launch Day Pre-Flight SOP" for an agency deploying ChatGPT Ads on behalf of a {business_type} client. Include technical verifications, client communication templates, and QA testing steps.',
        exampleVariables: ['business_type']
      }
    ]
  },
  {
    id: 11,
    slug: 'measurement-diagnostics-and-optimization',
    title: 'Lesson 11: Performance Diagnostics & Optimization',
    subtitle: 'Interpreting Metrics, Isolating Bottlenecks & Improving Unit Economics',
    phase: 'Launch & Scale',
    duration: '26 min',
    summary: 'When a campaign isn’t hitting target ROI, is it an ad problem, a landing page problem, or an offer problem? Learn the step-by-step diagnostic framework to isolate and fix performance bottlenecks.',
    coreTeaching: [
      'The 4-Stage Diagnostic Waterfall: 1. Low CTR (< 1.2%) = Ad hook / relevance failure. 2. High CTR + Low CVR (< 5%) = Landing page message mismatch or slow speed. 3. High CVR + Low Close Rate = Lead qualification or follow-up speed failure. 4. High Close Rate + Low Profit = Unit economic pricing failure.',
      'Separating Creative Fatigue from Market Saturation: When and how to refresh copy angles without blowing up existing campaign learning.',
      'Weekly Reporting Cadence: What metrics matter to stakeholders (Impressions → Clicks → Leads → Opportunities → Pipeline Revenue).',
      'Bid Optimization: How to adjust CPC bids by 10%–15% increments to find the efficiency sweet spot.'
    ],
    deepDive: {
      benefits: [
        'Rapidly turn underperforming campaigns into profitable profit centers.',
        'Accurately identify whether to fix copy, landing page, or sales follow-up.',
        'Deliver authoritative, clear reporting to executive stakeholders.'
      ],
      costs: [
        'Weekly routine time required for data extraction and analysis.'
      ],
      risks: [
        'Changing multiple variables simultaneously, making it impossible to identify what caused the improvement or decline.',
        'Over-optimizing on micro-metrics instead of pipeline revenue.'
      ],
      limitations: [
        'Statistical validity requires minimum sample sizes (> 50 leads).'
      ],
      potential: [
        'Double your return on ad spend (ROAS) through systematic landing page and bid optimization.',
        'Build a predictable client acquisition engine.'
      ],
      whatToPrepare: [
        'Weekly performance reporting spreadsheet or dashboard.',
        'Documented baseline metrics (CTR, CPC, CVR, CPL, CAC).',
        'Diagnostic troubleshooting tree.'
      ]
    },
    worksheetIdea: {
      title: 'Weekly Campaign Optimization Audit',
      steps: [
        'Calculate blended CTR, CPC, CVR, and CPL for the past 7 days.',
        'Identify the single lowest-performing metric in the 4-stage waterfall.',
        'Deploy 1 specific test to address that bottleneck over the next 7 days.'
      ]
    },
    implementationChecklist: [
      'Set up weekly diagnostic review recurring calendar block.',
      'Archive ad variations with CTR below 1.0% after 150 clicks.',
      'Implement landing page headline split test for top-traffic ad group.'
    ],
    advancedPrompts: [
      {
        id: 1101,
        title: 'Campaign Underperformance Diagnostic Engine',
        purpose: 'Diagnose the exact root cause of poor performance from raw campaign data.',
        promptText: 'You are a master performance marketing diagnostic specialist. Analyze the following campaign scenario for a {business_type}: Ad Spend: {monthly_budget}, Average CPC: $4.20, Ad CTR: 2.4%, Landing Page CVR: 2.1%, Lead-to-Call Rate: 15%, Closed Deal Rate: 10%. Diagnose where the primary bottleneck is, explain why it is happening, and provide 3 immediate high-impact fixes.',
        exampleVariables: ['business_type', 'monthly_budget']
      },
      {
        id: 1102,
        title: 'Low CTR / Low CVR / High CPL Optimization Playbook',
        purpose: 'Create targeted tactical playbooks for each specific failure symptom.',
        promptText: 'Create a 3-part tactical troubleshooting playbook for a {business_type} running ChatGPT Ads: Playbook A: "How to fix Low CTR (< 1.2%)", Playbook B: "How to fix Low Landing Page CVR (< 6%)", Playbook C: "How to fix High Cost Per Lead with Low Show-Up Rate". Give 5 actionable tactics per playbook.',
        exampleVariables: ['business_type']
      },
      {
        id: 1103,
        title: 'Executive Weekly Performance Report Template',
        purpose: 'Write a concise, high-impact weekly summary for clients and leaders.',
        promptText: 'Draft a clean, professional Weekly Executive Performance Summary template for an agency reporting on ChatGPT Ads to a {business_type} client. Include: 1. Executive Summary, 2. Topline Metrics Table (Spend, Clicks, Leads, CPL, Pipeline Value), 3. Key Learnings & Test Results, 4. Actions Planned for Next Week.',
        exampleVariables: ['business_type']
      },
      {
        id: 1104,
        title: 'First-30-Days KPI Hierarchy & Milestone Map',
        purpose: 'Guide stakeholders on what numbers matter most in Month 1 vs Month 2.',
        promptText: 'Explain the metric hierarchy for a {business_type} launching ChatGPT Ads. Detail which metrics are "Leading Indicators" (Week 1–2: CTR, CPC, Bounce Rate) versus "Lagging Commercial Indicators" (Week 3–4: SQLs, Deal Velocity, CAC, ROAS). Teach stakeholders how to avoid panic during early leading indicator testing.',
        exampleVariables: ['business_type']
      },
      {
        id: 1105,
        title: 'Raw Data to Actionable Recommendations Engine',
        purpose: 'Transform messy ad data into clear, prioritized engineering tasks.',
        promptText: 'Take a set of typical multi-market campaign metrics for {business_type} in {target_market} and translate them into a prioritized list of 5 concrete engineering and marketing actions for the next sprint. Rank by expected ROI impact.',
        exampleVariables: ['business_type', 'target_market']
      }
    ]
  },
  {
    id: 12,
    slug: 'scaling-client-delivery-and-agency-systems',
    title: 'Lesson 12: Agency Packaging, Retainers & Scaling Systems',
    subtitle: 'Productizing ChatGPT Ads as a High-Ticket Client Service',
    phase: 'Launch & Scale',
    duration: '32 min',
    summary: 'Turn your mastery of conversational advertising into a profitable commercial asset. Discover how to package ChatGPT Ads management as a $3,000–$7,500/month recurring service, structure client proposals, and scale delivery.',
    coreTeaching: [
      'Packaging the Offer: Do not sell "ChatGPT ads." Sell "Conversational Intent Pipeline Architecture" — bundling ad management, high-speed landing page build, and CRM follow-up automation.',
      '3-Tier Agency Pricing Model: Tier 1 (Pilot Launch: $3,500 setup + 15% ad spend), Tier 2 (Growth Retainer: $5,000/mo + funnel optimization), Tier 3 (Full-Stack Pipeline: $7,500/mo + dedicated SDR follow-up).',
      'Client Onboarding SOP: How to collect client assets, setup Ads Manager access, and deploy landing pages in under 7 business days.',
      'Scaling Operations: Standard operating procedures (SOPs), prompt templates, and dashboard automation for managing multiple accounts efficiently.'
    ],
    deepDive: {
      benefits: [
        'Command high recurring retainers with minimal competition.',
        'Provide clients with a high-margin, innovative growth channel.',
        'Build a scalable, systematized agency or consulting business.'
      ],
      costs: [
        'Time required to build onboarding SOPs and client reporting dashboards.'
      ],
      risks: [
        'Taking on clients with broken offers or zero sales follow-up who blame ad performance.',
        'Over-promising instant miracles on early platform testing.'
      ],
      limitations: [
        'Requires clear scope boundaries to prevent endless custom client requests.'
      ],
      potential: [
        'Build a $30k–$80k/month recurring revenue agency serving high-value B2B and service niches.',
        'Establish yourself as the premier conversational marketing authority.'
      ],
      whatToPrepare: [
        'Client proposal and Statement of Work (SOW) template.',
        'Standard Onboarding Questionnaire.',
        '3-Tier Pricing and Scope Matrix.'
      ]
    },
    worksheetIdea: {
      title: 'Agency Productized Service Architecture',
      steps: [
        'Define your Core Deliverables for Tier 1, Tier 2, and Tier 3 retainers.',
        'Draft your 7-day client onboarding checklist.',
        'Set up a master proposal template in Google Docs or PandaDoc.'
      ]
    },
    implementationChecklist: [
      'Finalize your 3-tier agency pricing sheet.',
      'Reach out to 5 past or existing clients to offer an exclusive "Early-Access ChatGPT Ads Pilot".',
      'Publish your first conversational ads case study or diagnostic audit.'
    ],
    advancedPrompts: [
      {
        id: 1201,
        title: 'Productized Agency Offer & SOW Creator',
        purpose: 'Structure an irresistible $3,500–$6,000/month productized client service.',
        promptText: 'You are an elite agency growth consultant. Create a complete Productized Service Offer for an agency selling ChatGPT Ads Management to {business_type} clients. Detail: 1. Service Name, 2. The Big Promise, 3. The 30-Day Setup Deliverables, 4. Ongoing Monthly Deliverables, 5. Performance Metrics, 6. Exact Pricing Structure.',
        exampleVariables: ['business_type']
      },
      {
        id: 1202,
        title: '3-Tier Retainer & Upsell Pricing Architecture',
        purpose: 'Design a 3-tier pricing model that maximizes client average contract value.',
        promptText: 'Design a 3-tier pricing model for managing conversational ad campaigns for {business_type}: Tier 1 (Launch & Validate: $3,000/mo), Tier 2 (Scale & Optimize: $5,000/mo), Tier 3 (Full-Funnel Dominance: $8,000/mo). For each tier, define: Target Client, What is Included, What is Excluded, and Margin Target.',
        exampleVariables: ['business_type']
      },
      {
        id: 1203,
        title: '7-Day Client Onboarding SOP & Checklist',
        purpose: 'Create a seamless onboarding experience that wows new high-ticket clients.',
        promptText: 'Build an exhaustive 7-day client onboarding standard operating procedure (SOP) for an agency onboarding a new {business_type} client for ChatGPT Ads. Detail: Day 1 (Kickoff & Access), Day 2 (Offer & Proof Intake), Day 3 (Copy & Creative Draft), Day 4 (Landing Page QA), Day 5 (Tracking & CRM Integration), Day 6 (Client Approval), Day 7 (Live Launch).',
        exampleVariables: ['business_type']
      },
      {
        id: 1204,
        title: 'High-Converting Client Proposal Script & Pitch Deck',
        purpose: 'Write an authoritative proposal pitch that closes clients on discovery calls.',
        promptText: 'Write a persuasive, consultative closing script for an agency pitching a ChatGPT Ads Pilot to a {business_type} in {target_market}. Overcome the 3 biggest objections: 1. "Isn’t this too new?", 2. "Why not just do Google Search?", 3. "What if it doesn’t work?". Focus on strategic advantage and risk-controlled testing.',
        exampleVariables: ['business_type', 'target_market']
      },
      {
        id: 1205,
        title: 'Agency Operations & Scaling Playbook',
        purpose: 'Turn the 12-course methodology into an internal agency delivery engine.',
        promptText: 'Create a comprehensive agency operational blueprint to manage 15+ concurrent ChatGPT ad accounts with a lean 3-person team. Define the roles (Strategist, Copywriter/Media Buyer, Tech/Tracking Specialist), weekly meeting agendas, QA checklists, and client reporting rhythms.',
        exampleVariables: []
      }
    ]
  }
];
