---
layout: default
title: Architecture
nav_order: 2
has_children: true
permalink: /architecture/
---

# Architecture Guide
{: .no_toc }

This section provides a comprehensive overview of the Tech Interview 2.0 system architecture, designed to help developers quickly understand the codebase and contribute effectively.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Quick Start for Contributors

To contribute effectively to this project, you should understand:

1. **[System Overview](./overview.html)** - High-level architecture and technology stack
2. **[Frontend Architecture](./frontend.html)** - Next.js App Router, components, and state management
3. **[Content System](./content.html)** - MDX-based blog and internationalization
4. **[Performance Strategy](./performance.html)** - Optimization techniques and monitoring
5. **[SEO Architecture](./seo.html)** - Metadata generation and structured data

## Architecture Principles

### 1. Modern Web Standards
- **Next.js 15 App Router**: Latest React Server Components architecture
- **TypeScript**: Full type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework for consistent styling

### 2. Performance First
- **Server-Side Rendering**: Optimal initial page load performance
- **Image Optimization**: Automatic WebP/AVIF conversion and responsive images
- **Bundle Optimization**: Code splitting and tree shaking
- **Core Web Vitals**: Continuous monitoring of performance metrics

### 3. Internationalization
- **Multi-language Support**: English, Simplified Chinese, Traditional Chinese
- **Localized Routing**: `/en/`, `/zh-Hans/`, `/zh-Hant/` routes
- **Type-safe Translations**: Compile-time validation of translation keys

### 4. Content Management
- **MDX Integration**: Markdown with React components for rich content
- **File-based CMS**: Git-based content workflow
- **Static Generation**: Pre-rendered pages for optimal performance

### 5. Developer Experience
- **Type Safety**: End-to-end TypeScript coverage
- **Testing**: Comprehensive unit, integration, and E2E tests
- **Code Quality**: ESLint, Prettier, and automated CI/CD

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15, React 18, TypeScript | User interface and routing |
| **Styling** | Tailwind CSS, CSS Modules | Component styling and themes |
| **Content** | MDX, next-intl | Blog posts and internationalization |
| **Testing** | Vitest, React Testing Library, Playwright | Quality assurance |
| **Analytics** | Plausible Analytics | Privacy-focused usage tracking |
| **Performance** | Web Vitals API | Performance monitoring |
| **Deployment** | Vercel, GitHub Actions | CI/CD and hosting |

## Key Design Decisions

### Why Next.js App Router?
- **Server Components**: Reduced JavaScript bundle size
- **Streaming**: Progressive page loading
- **Built-in Performance**: Automatic optimizations

### Why MDX for Content?
- **Developer-Friendly**: Markdown syntax with React components
- **Version Control**: Git-based content management
- **Type Safety**: Validated content structure

### Why Multi-language from Day One?
- **Global Audience**: Technical interview market is international
- **SEO Benefits**: Localized content for better search rankings
- **Maintainability**: Centralized translation management

---

## Getting Started

1. **Read the [System Overview](./overview.html)** to understand the high-level architecture
2. **Review [Frontend Architecture](./frontend.html)** to understand component structure
3. **Check the [Developer Guide](../developer/)** for setup instructions
4. **Look at existing code** in similar areas to understand patterns

## Quick Code Exploration

```bash
# Key directories to explore
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and configurations
├── messages/           # Internationalization files
└── content/            # MDX blog posts and content

# Start with these files
src/app/layout.tsx                    # Root layout
src/app/[locale]/layout.tsx          # Locale-specific layout
src/components/layout/main-layout.tsx # Main application layout
src/lib/seo.ts                       # SEO utilities
```

## Need Help?

- **Code Questions**: Check the [Developer Guide](../developer/)
- **Content Management**: See the [Content Manager Guide](../content-manager/)
- **Deployment Issues**: Review [Deployment Guide](../developer/deployment.html)