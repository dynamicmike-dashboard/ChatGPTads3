# COMMANDS — ChatGPT Ads 20aug26 Task Library

Initialize every task with: `Read SYSTEM_PROTOCOL.md and PROJECT_MANIFEST.md. All operations relative to F:\Mike d drive\Mike Webs\mAIstermind.com\projects\ChatGPT Ads 20aug26\chat-ads-github.`

```md
# TASK: FIX PRICING 197→297
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Replace every $197 occurrence with $297 in src/**/*.{ts,tsx}. Verify with Select-String -Pattern 197, rebuild vite, commit, push to dynamicmike-dashboard/ChatGPTads3."
```

```md
# TASK: TEABLE ENTITLEMENTS
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Ensure api/stripe-webhook.ts uses field IDs tblFmM5o80dQBTifeH6 / tblqnEF06Exe6ehFDDb per contract. Map price_1U72RhGe9hhLYer6J57c5rRA→Full and Course price→Course. Do not invent password hashes — use Teable OAuth/OTP session layer. GET before PATCH. Push and redeploy Vercel."
```

```md
# TASK: ROUTING /DASHBOARD & /COURSE
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Fix direct navigation to /dashboard and /course (getInitialTab + history.pushState + popstate). Ensure vercel.json rewrites /api/(.*) before /(.*)->/index.html. Verify no redirect to salespage for paid users."
```

```md
# TASK: ACCESS GATING + TEASERS
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Salespage clone logic: free users see teaser per tab (upgrade $72), $72 Full sees cloned dashboard without course upsell (all tools unlocked), $297 Course sees CourseDashboard. Update SalesLandingView / FullAccessDashboard / TeaserWrapper / ExecutiveDossierView / AdPreviewSimulator / PromptVaultView / BonusesView showTeaser props. Rebuild."
```

```md
# TASK: STRIPE WEBHOOK + CHECK-ACCESS
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Maintain api/stripe-webhook.ts (Bearer TEABLE_PAT, Stripe 2022-11-15, deferredPrompt global fix) and api/check-access.ts (GET /api/check-access?email=). Client src/lib/teable.ts calls check-access only — never expose PAT. Require Vercel envs: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, TEABLE_PAT."
```

```md
# TASK: DEPLOY ADS3.MAISTERMIND.COM
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Build vite, push to dynamicmike-dashboard/ChatGPTads3, redeploy Vercel project dynamicmikes-projects/chatgptads3, verify https://ads3.maistermind.com/ and /dashboard and /course resolve, no black screen (deferredPrompt global)."
```

```md
# TASK: SALESY INTRO + COSTS/RISKS/OUTSTANDING
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Add salesy intro to FullAccessDashboard and SalesLandingView (conversational vs search/interrupt), add Costs/Risks/Warnings/Outstanding section, build Outstanding quick-wins list (toast, progress, continue-watching, print, shortcuts, dark mode audit, copy, session restore)."
```

```md
# TASK: SCROLL HERO 200-FRAME
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Ensure src/components/hero/ScrollHeroFrames.tsx uses 200 frames (001-200), 800vh container, 1280×720 originals, fetchPriority high, no SCROLL pill, light scrim, hero text 'From Traditional Search, to Research to Recommendation'. Verify public/hero-frames 001-200.jpg present."
```

```md
# TASK: GHL LEAD GATE + DUAL UPSELL
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. AssessmentResultView: GHLLeadCapture gate (name/email/business/market) → personalized report + dual upsell Full $72 / Advanced Course $297. api/ghl-lead.ts upserts Teable Users (fldnCIBV...), fires GHL webhook fire-and-forget. Skip option resets gate. Retake resets gate."
```

```md
# TASK: PRICING & PAYMENT MODAL
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. StripeCheckoutModal: Full $72 / Course $297 modal prices dynamic via plan prop. Header enroll $72. i18n enroll/enrollMasterclass $72, unlockCourse $297. Header shows License Active / Course Active / Enroll $72 based on paymentStatus."
```

```md
# TASK: REDEPLOY ADS3.MAISTERMIND.COM
"Initialize from SYSTEM_PROTOCOL.md. Read PROJECT_MANIFEST.md. Build vite, push to dynamicmike-dashboard/ChatGPTads3, redeploy Vercel project dynamicmikes-projects/chatgptads3, verify https://ads3.maistermind.com/ and /dashboard (72) and /course (297) resolve, no black screen (deferredPrompt global)."
```