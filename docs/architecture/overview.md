---
layout: default
title: System Overview
parent: Architecture
nav_order: 1
---

# System Overview
{: .no_toc }

A high-level overview of the Tech Interview 2.0 system architecture and core components.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                    │
├─────────────────────────────────────────────────────────────┤
│  App Router    │  Server Components  │  Client Components   │
│  /[locale]/    │  - Page layouts     │  - Interactive UI    │
│  - /about      │  - SEO metadata     │  - Forms             │
│  - /blog       │  - i18n routing     │  - Analytics         │
│  - /courses    │  - Static content   │  - Performance       │
│  - /contact    │                     │   monitoring         │
└─────────────────────────────────────────────────────────────┘
                               │
┌─────────────────────────────────────────────────────────────┐
│                   Content Layer (MDX)                      │
├─────────────────────────────────────────────────────────────┤
│  Blog Posts    │  Course Content     │  Static Pages        │
│  - Markdown    │  - Structured data  │  - About             │
│  - Metadata    │  - Video embeds     │  - Privacy           │
│  - Categories  │  - Code examples    │  - Terms             │
└─────────────────────────────────────────────────────────────┘
                               │
┌─────────────────────────────────────────────────────────────┐
│                Data & Configuration                        │
├─────────────────────────────────────────────────────────────┤
│  i18n Messages │  SEO Config         │  Analytics           │
│  - EN/zh-Hans  │  - Metadata         │  - Plausible         │
│  - zh-Hant     │  - Schema.org       │  - Web Vitals        │
│                │  - Sitemap          │  - Performance       │
└─────────────────────────────────────────────────────────────┘
                               │
┌─────────────────────────────────────────────────────────────┐
│                External Services                           │
├─────────────────────────────────────────────────────────────┤
│  Deployment    │  Analytics          │  Email               │
│  - Vercel      │  - Plausible.io     │  - Contact forms     │
│  - GitHub      │  - Search Console   │  - Newsletter        │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Next.js App Router

The application uses Next.js 15 with the App Router for modern React Server Components architecture:

**Key Features:**
- **Server Components**: Reduced JavaScript bundle, better performance
- **Nested Layouts**: Shared UI across routes
- **Route Groups**: Organized routing structure
- **Streaming**: Progressive page loading

**Directory Structure:**
```
src/app/
├── layout.tsx                 # Root layout (HTML structure)
├── [locale]/                  # Internationalized routes
│   ├── layout.tsx            # Locale-specific layout
│   ├── page.tsx              # Homepage
│   ├── about/page.tsx        # About page
│   ├── blog/                 # Blog section
│   ├── courses/              # Courses section
│   └── contact/              # Contact forms
```

### 2. Internationalization (i18n)

Multi-language support built with `next-intl`:

**Supported Locales:**
- `en` - English
- `zh-Hans` - Simplified Chinese
- `zh-Hant` - Traditional Chinese

**Implementation:**
- URL-based locale routing (`/en/about`, `/zh-Hans/about`)
- Server-side translation rendering
- Type-safe translation keys
- Automatic locale detection

### 3. Content Management System

MDX-based content system for blogs and courses:

**Features:**
- **Markdown + React**: Rich content with interactive components
- **Frontmatter**: Structured metadata for SEO and organization
- **Code Highlighting**: Syntax highlighting with Rehype Pretty Code
- **Image Optimization**: Automatic WebP/AVIF conversion

**Content Structure:**
```
src/content/
├── blog/
│   ├── en/
│   ├── zh-Hans/
│   └── zh-Hant/
└── courses/
    ├── algorithms/
    ├── system-design/
    └── generative-ai/
```

### 4. Component Architecture

Organized component hierarchy for maintainability:

```
src/components/
├── ui/                    # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── optimized-image.tsx
├── layout/               # Layout components
│   ├── main-layout.tsx
│   ├── header.tsx
│   └── footer.tsx
├── blog/                 # Blog-specific components
├── seo/                  # SEO components
├── forms/                # Form components
└── performance/          # Performance monitoring
```

### 5. SEO & Performance

Comprehensive SEO and performance optimization:

**SEO Features:**
- Dynamic metadata generation
- Open Graph and Twitter Cards
- Schema.org structured data
- XML sitemap generation
- Multi-language SEO

**Performance Features:**
- Image optimization with Next.js Image
- Core Web Vitals monitoring
- Bundle analysis
- Code splitting
- Service Worker caching

## Data Flow

### 1. Page Request Flow

```
User Request → Next.js Router → Locale Detection → 
Server Component → Data Fetching → HTML Generation → 
Client Hydration → Interactive UI
```

### 2. Content Rendering Flow

```
MDX File → Frontmatter Parsing → Component Resolution → 
Server Rendering → SEO Metadata → Client Hydration
```

### 3. Translation Flow

```
Locale Detection → Message Loading → Server Translation → 
Component Rendering → Client Hydration
```

## Key Technologies

### Frontend Stack
- **Next.js 15.5.0**: React framework with App Router
- **React 18**: UI library with Server Components
- **TypeScript 5**: Type safety and developer experience
- **Tailwind CSS 3**: Utility-first CSS framework

### Content & Data
- **MDX**: Markdown with React components
- **next-intl**: Internationalization framework
- **Zod**: Schema validation
- **Gray-matter**: Frontmatter parsing

### Development Tools
- **Vitest**: Fast unit testing framework
- **Playwright**: End-to-end testing
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Performance & Analytics
- **Plausible Analytics**: Privacy-focused analytics
- **Web Vitals**: Performance monitoring
- **Next.js Image**: Automatic image optimization

## Deployment Architecture

### Production Environment
- **Vercel**: Primary hosting platform
- **CDN**: Global edge network
- **Analytics**: Plausible.io integration
- **Monitoring**: Core Web Vitals tracking

### CI/CD Pipeline
```
GitHub Push → GitHub Actions → Tests → Build → Deploy → 
Performance Monitoring → SEO Validation
```

## Security Considerations

### Headers Configuration
```javascript
// Security headers in next.config.js
{
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin'
}
```

### Content Security
- Input sanitization in forms
- MDX content validation
- Image optimization security
- HTTPS enforcement

## Performance Targets

| Metric | Target | Current |
|--------|---------|---------|
| **First Contentful Paint** | < 1.5s | ✅ |
| **Largest Contentful Paint** | < 2.5s | ✅ |
| **Cumulative Layout Shift** | < 0.1 | ✅ |
| **Time to Interactive** | < 3.5s | ✅ |
| **Lighthouse Score** | > 95 | ✅ |

---

## Next Steps

1. **Explore Components**: Review the [Frontend Architecture](./frontend.html)
2. **Understand Content**: Check the [Content System](./content.html)
3. **Performance Deep Dive**: Read [Performance Strategy](./performance.html)
4. **Start Contributing**: Follow the [Developer Guide](../developer/)