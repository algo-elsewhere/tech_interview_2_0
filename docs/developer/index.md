---
layout: default
title: Developer Guide
nav_order: 3
has_children: true
permalink: /developer/
---

# Developer Guide
{: .no_toc }

Complete guide for developers to start, develop, test, and deploy the Tech Interview 2.0 application.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Quick Start

Get up and running in under 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/tech_interview_2_0.git
cd tech_interview_2_0

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

The application will be available at `http://localhost:3000` with hot reload enabled.

## Development Workflow

### 1. **[Installation](./installation.html)** 
Set up your development environment with all required dependencies.

### 2. **[Development](./development.html)**
Learn the development workflow, file structure, and coding patterns.

### 3. **[Testing](./testing.html)**
Run unit tests, integration tests, and end-to-end tests.

### 4. **[Building](./building.html)**
Build the application for production and analyze bundle size.

### 5. **[Deployment](./deployment.html)**
Deploy to various platforms including Vercel, Netlify, and custom servers.

## Development Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | ≥18.17.0 | JavaScript runtime |
| **npm** | ≥9.0.0 | Package manager |
| **Next.js** | 15.5.0 | React framework |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Styling |
| **Vitest** | Latest | Unit testing |
| **Playwright** | Latest | E2E testing |

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## Project Structure

```
tech_interview_2_0/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   └── [locale]/          # Internationalized routes
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── blog/             # Blog components
│   │   └── forms/            # Form components
│   ├── lib/                   # Utility functions
│   │   ├── seo.ts            # SEO utilities
│   │   ├── analytics.ts      # Analytics setup
│   │   └── utils.ts          # General utilities
│   ├── content/              # MDX content
│   │   └── blog/             # Blog posts
│   └── messages/             # i18n translations
│       ├── en.json           # English
│       ├── zh-Hans.json      # Simplified Chinese
│       └── zh-Hant.json      # Traditional Chinese
├── tests/                     # Test files
│   ├── __tests__/            # Unit tests
│   ├── e2e/                  # E2E tests
│   └── fixtures/             # Test data
├── docs/                      # Documentation
├── public/                    # Static assets
└── config files              # Various configuration files
```

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the project root:

```bash
# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_DOMAIN=your-domain.com

# Contact form (optional)
CONTACT_EMAIL=your-email@domain.com

# Development
NODE_ENV=development
```

### Optional Environment Variables

```bash
# For production deployments
NEXT_PUBLIC_SITE_URL=https://your-site.com
NEXT_PUBLIC_ANALYTICS_SITE_ID=your-plausible-site-id

# For advanced features
OPENAI_API_KEY=your-openai-key
SENDGRID_API_KEY=your-sendgrid-key
```

## Development Guidelines

### 1. Code Style
- **TypeScript**: All new code must be TypeScript
- **ESLint**: Follow the configured linting rules
- **Prettier**: Code formatting is automated
- **Components**: Use functional components with hooks

### 2. File Naming
- **Components**: PascalCase (`BlogCard.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Pages**: lowercase with hyphens (`about.tsx`)
- **Types**: PascalCase with `.types.ts` suffix

### 3. Import Organization
```typescript
// 1. React and Next.js imports
import { useState } from 'react'
import Image from 'next/image'

// 2. Third-party library imports
import { useTranslations } from 'next-intl'

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui'
import { formatDate } from '@/lib/utils'

// 4. Relative imports
import './styles.css'
```

### 4. Component Structure
```typescript
// Component props interface
interface ComponentProps {
  title: string
  optional?: boolean
}

// Main component function
export function Component({ title, optional = false }: ComponentProps) {
  // Hooks at the top
  const [state, setState] = useState('')
  const t = useTranslations()
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  }
  
  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}

// Default export
export default Component
```

## Git Workflow

### Branch Naming
- **Feature**: `feature/add-course-system`
- **Bug Fix**: `fix/contact-form-validation`
- **Documentation**: `docs/update-readme`
- **Refactor**: `refactor/optimize-seo-utils`

### Commit Messages
Follow conventional commit format:

```
type(scope): description

feat(blog): add MDX support for blog posts
fix(forms): resolve contact form validation
docs(readme): update installation instructions
test(seo): add unit tests for metadata generation
```

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Run full test suite locally
4. Create PR with descriptive title and description
5. Ensure CI passes
6. Request code review
7. Address feedback and merge

## Debugging

### Development Tools
- **React Developer Tools**: Browser extension for React debugging
- **Next.js DevTools**: Built-in development features
- **TypeScript**: Compile-time error checking
- **ESLint**: Real-time code quality feedback

### Common Issues

#### 1. Hydration Mismatches
```typescript
// Problem: Server/client rendering differences
// Solution: Use suppressHydrationWarning or useEffect

const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])

if (!mounted) return null // Prevent hydration mismatch
```

#### 2. Import Errors
```typescript
// Problem: Module not found
// Solution: Check tsconfig.json paths and file extensions

// Correct imports
import { Button } from '@/components/ui/button'  // .tsx extension inferred
import type { User } from '@/types'              // Type-only import
```

#### 3. Translation Missing
```typescript
// Problem: Translation key not found
// Solution: Check messages files and key paths

const t = useTranslations('blog')  // Namespace
const title = t('post.title')      // Key path: blog.post.title
```

## Performance Monitoring

### Development Metrics
- **Bundle Analyzer**: `npm run analyze`
- **Lighthouse**: Built into Chrome DevTools
- **Web Vitals**: Automatic monitoring in development

### Production Monitoring
- **Plausible Analytics**: User behavior tracking
- **Core Web Vitals**: Performance metrics
- **Error Tracking**: Console errors and exceptions

---

## Getting Help

### Internal Resources
- **[Architecture Guide](../architecture/)**: Understand the system design
- **[Content Manager Guide](../content-manager/)**: Learn content management
- **Code Examples**: Check existing components for patterns

### External Resources
- **[Next.js Documentation](https://nextjs.org/docs)**
- **[React Documentation](https://react.dev)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**

### Community
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Code Reviews**: Get feedback on your contributions

---

## Next Steps

1. **Start with [Installation](./installation.html)** to set up your environment
2. **Follow the [Development Guide](./development.html)** to learn the workflow
3. **Read the [Testing Guide](./testing.html)** to ensure code quality
4. **Review [Deployment Options](./deployment.html)** when ready to publish