# Tech Interview Consultant Website

A bilingual (EN / zh-Hans / zh-Hant) site for algorithms, system design, and GenAI interview preparation. Optimized for fast content publishing and lead capture.

---

## Features (MVP)
- Content library (MDX): articles, videos, tutorials
- Course / service overview with clear CTAs
- Contact / registration form (lead capture)
- Internationalization: English, Simplified Chinese, Traditional Chinese
- Basic SEO and Analytics (events: view_content, click_cta, submit_form_success)

---

## Tech Stack
- Framework: Next.js (App Router), React, TypeScript
- UI: Tailwind CSS (+ shadcn/ui), @tailwindcss/typography
- Content: MDX (+ Contentlayer)
- i18n: next-intl
- Analytics: GA4 or Plausible
- Deploy: Vercel
- Optional: Sentry (errors), Resend/Formspree (email), Algolia/Typesense (search later)

---

## Getting Started

### 1. Prerequisites
- Node.js 20+
- npm 10+ (or pnpm/yarn)
- Git

### 2. Install
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```
Open http://localhost:3000

### 4. Typecheck / Lint / Test
```bash
npm run typecheck
npm run lint
npm run test
```

---

## Environment Variables
Create a file named `.env.local` and add values as needed, for example:

```
# Analytics Configuration (Plausible)
NEXT_PUBLIC_ANALYTICS_DOMAIN=yourdomain.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Email Configuration
RESEND_API_KEY=your_api_key_here
```

Never commit `.env.local`. Store production secrets in Vercel environment variables.

### Analytics Setup
This project uses Plausible Analytics for privacy-friendly tracking. To enable analytics:

1. Set `NEXT_PUBLIC_ANALYTICS_DOMAIN` to your website domain
2. Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` to enable tracking in development
3. In production, analytics are enabled automatically when domain is configured

---

## Project Structure (example)
```
.
├─ app/                      # Next.js routes (App Router)
│  ├─ (en)/ ...              # localized routes
│  ├─ (zh-Hans)/ ...
│  └─ (zh-Hant)/ ...
├─ components/               # UI components
├─ content/                  # MDX posts and courses
│  ├─ posts/
│  └─ courses/
├─ lib/                      # utilities (i18n, analytics, seo)
├─ public/                   # static assets
├─ styles/                   # globals.css, tailwind.css
├─ tests/                    # unit/integration tests
└─ .github/
   ├─ workflows/ci.yml
   └─ pull_request_template.md
```

---

## Analytics Events
- view_content (slug, locale, category)
- click_cta (location: hero / right-rail / footer)
- start_form / submit_form_success
- language_switch
- subscribe_newsletter (if enabled)

---

## QA Checklist (MVP)
- Lighthouse (mobile) >= 90 on Performance, SEO, Accessibility, Best Practices
- Keyboard navigation and visible focus states
- SEO metadata + sitemap + valid schema.org
- Forms: validation + success state; spam protection

---

## Deployment
- Connect GitHub repo to Vercel
- Every PR gets a Preview URL
- Merges to `main` auto-deploy to Production

---

## Contributing (solo-friendly)
- Branch from `main`: feat/..., fix/..., chore/...
- Open a PR; fill the template; ensure CI passes
- Merge via squash after review (self-review acceptable)

---

## License
MIT

