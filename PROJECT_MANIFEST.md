# PROJECT MANIFEST

## STATUS
- Current Goal: Stabilize ChatGPT Ads PWA on `ads3.maistermind.com` with Teable-backed entitlements ($72 Full / $297 Course) and Stripe Payment Links → /dashboard & /course + 200-frame scroll hero
- Last Session Date: 2026-08-22
- Last Commit: `eabab24` + hero text update + 200-frame hero + scroll text update

## SYSTEM STATE
- Project Root: `F:\Mike d drive\Mike Webs\mAIstermind.com\projects\ChatGPT Ads 20aug26\chat-ads-github`
- GitHub: `dynamicmike-dashboard/ChatGPTads3` (PAT `ghp_dHH...xHLAV`), legacy `realaicasa/ChatGPT-Ads`
- Vercel: `dynamicmikes-projects/chatgptads3` → `https://chatgptads3.vercel.app/` → `https://ads3.maistermind.com/` (env: `TEABLE_PAT` Teable-managed, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET=whsec_GaCRRB8WXK0uj1wiKoLRSx8mm4T907zq`)
- Stripe: Full $72 `plink_1U72RhGe9hhLYer6J57c5rRA` (`prod_V7Gq7qdIBXGKVj` / `price_1U72RhGe9hhLYer6J57c5rRA`) → `/dashboard`; Course $297 `prod_V7H65e3VyI8T6J` → `/course`
- Teable Base: `bse34DbEKXmDzwhMCoK` / App `appYqI2X3FUCnaZnyll` — Users `tblFmM5o80dQBTifeH6`, Subs `tblqnEF06Exe6ehFDDb` (fields per contract, no password hash — Teable OAuth/OTP)
- Webhook: `we_1U72kjGe9hhLYer6lAGM41fK` ads3.maistermind `https://ads3.maistermind.com/api/stripe-webhook` (2022-11-15) listening `checkout.session.completed,expired`
- APIs: `api/stripe-webhook.ts` (global deferredPrompt fix, amount/priceId plan map), `api/check-access.ts` (`GET /api/check-access?email=`), `api/ghl-lead.ts` (Teable user upsert + GHL fire), `src/lib/teable.ts` client helper, `src/context/AuthContext.tsx`
- Build: Vite 6.4.3, `dist` output, `vercel.json` rewrites `/api/(.*)` before SPA fallback `/(.*)->/index.html`, cache-busting headers
- Routing: `App.tsx` `activeTab` synced to URL `/`, `/dashboard`, `/course`, `/dossier`, `/simulator`, `/assessment`, `/prompts`, `/bonuses` via `getInitialTab()` + `history.pushState`
- Pricing: Full $72 / Course $297 — Full modal `$72.00`, Course modal `$297.00`, i18n both languages
- **Scroll Hero:** 200-frame 1280×720 `public/hero-frames/001-200.jpg` (`src/components/hero/ScrollHeroFrames.tsx`), light scrim, no SCROLL pill, hero text "From Traditional Search, to Research to Recommendation"
- Active Modules: SalesLandingView, FullAccessDashboard, TeaserWrapper, ExecutiveDossierView, AdPreviewSimulator, AssessmentQuiz/ResultView (GHL gate + dual upsell $72/$297), CourseDashboard, PromptVaultView, BonusesView, StripeCheckoutModal (plan prop), Header (dashboard tab conditional on `paymentStatus===full`), ScrollHeroFrames

## PENDING / NEXT
- [ ] Verify Vercel Production env has `TEABLE_PAT`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` then Redeploy `chatgptads3` and test `/` → `/dashboard` (72) and `/course` (297) no longer redirect to salespage
- [ ] Provide Course priceId for `$297` to complete `PRICE_ID_TO_PLAN` map in `api/stripe-webhook.ts` (currently amountTotal 29700 fallback)
- [ ] Wire `src/context/AuthContext.tsx` into `App.tsx` provider and replace localStorage `paymentStatus` checks with `/api/check-access` results; add login/OTP UI
- [ ] Restrict Money / Test Stripe flows (payment links) end-to-end on `ads3.maistermind.com`
- [ ] Re-add salesy intro / costs/risks Outstanding list per user request (scaffolded, needs copy commit)