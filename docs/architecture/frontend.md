---
layout: default
title: Frontend Architecture
parent: Architecture
nav_order: 2
---

# Frontend Architecture
{: .no_toc }

Deep dive into the frontend architecture, component structure, and state management patterns.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## App Router Structure

### Layout Hierarchy

The application uses a nested layout structure for optimal code reuse and performance:

```
app/
├── layout.tsx                    # Root layout (HTML, global providers)
└── [locale]/
    ├── layout.tsx               # Locale-specific layout (navigation, footer)
    ├── page.tsx                 # Homepage
    ├── about/
    │   └── page.tsx             # About page
    ├── blog/
    │   ├── page.tsx             # Blog listing
    │   └── [slug]/
    │       └── page.tsx         # Individual blog post
    ├── courses/
    │   ├── page.tsx             # Courses overview
    │   └── [category]/
    │       └── page.tsx         # Course category
    └── contact/
        └── page.tsx             # Contact forms
```

### Root Layout (`app/layout.tsx`)

Provides global HTML structure and core providers:

```typescript
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AnalyticsProvider domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}>
      <WebVitalsMonitor />
      {children}
    </AnalyticsProvider>
  )
}
```

**Responsibilities:**
- Analytics provider setup
- Performance monitoring initialization
- Global error boundaries
- Service worker registration

### Locale Layout (`app/[locale]/layout.tsx`)

Handles internationalization and common UI structure:

```typescript
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const messages = await getMessages()
  
  return (
    <html lang={locale}>
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>
            {children}
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

**Responsibilities:**
- HTML structure (`<html>`, `<body>`)
- Language attribute configuration
- Translation provider setup
- SEO structured data
- Main layout rendering

## Component Architecture

### Component Categories

#### 1. UI Components (`src/components/ui/`)

Base design system components:

```typescript
// Button component with variants
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// Card component for content containers
interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

// Optimized image with loading states
interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  onLoadComplete?: () => void
}
```

#### 2. Layout Components (`src/components/layout/`)

Structural components for page organization:

```typescript
// Main layout wrapper
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Header with navigation
export function Header() {
  const t = useTranslations('navigation')
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
      <nav>
        <LanguageSwitcher />
        <NavigationMenu />
      </nav>
    </header>
  )
}
```

#### 3. Feature Components

Domain-specific components organized by feature:

```
src/components/
├── blog/
│   ├── blog-card.tsx           # Blog post preview
│   ├── blog-content.tsx        # MDX content renderer
│   └── blog-navigation.tsx     # Category/tag navigation
├── courses/
│   ├── course-card.tsx         # Course preview
│   ├── course-progress.tsx     # Progress tracking
│   └── course-video.tsx        # Video player
├── forms/
│   ├── contact-form.tsx        # Contact form
│   ├── newsletter-form.tsx     # Email subscription
│   └── form-validation.tsx     # Shared validation
└── seo/
    ├── structured-data.tsx     # Schema.org markup
    └── meta-tags.tsx           # Dynamic meta tags
```

### Component Patterns

#### 1. Server vs Client Components

**Server Components** (default):
- Used for static content rendering
- Database queries and data fetching
- SEO metadata generation
- Translation rendering

```typescript
// Server Component - no 'use client' directive
export default async function BlogPage() {
  const posts = await getBlogPosts() // Server-side data fetching
  const t = await getTranslations('blog')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
```

**Client Components**:
- Interactive elements (forms, buttons)
- State management
- Event handlers
- Browser APIs

```typescript
'use client'

export function ContactForm() {
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: FormEvent) => {
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

#### 2. Composition Patterns

**Compound Components**:
```typescript
// Course structure with compound pattern
<Course>
  <Course.Header title="Algorithm Fundamentals" />
  <Course.Content>
    <Course.Video src="/videos/intro.mp4" />
    <Course.Transcript>...</Course.Transcript>
  </Course.Content>
  <Course.Progress completed={3} total={10} />
</Course>
```

**Render Props**:
```typescript
// Reusable data fetching component
<DataFetcher url="/api/courses">
  {({ data, loading, error }) => (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}
      {data && <CourseList courses={data} />}
    </div>
  )}
</DataFetcher>
```

## State Management

### 1. Server State

Handled by Next.js App Router and React Server Components:

```typescript
// Server-side data fetching
async function getBlogPosts(locale: string) {
  const posts = await readdir(`./src/content/blog/${locale}`)
  return posts.map(post => ({
    slug: post.replace('.mdx', ''),
    ...frontmatter
  }))
}

// Automatic caching and revalidation
export const revalidate = 3600 // 1 hour
```

### 2. Client State

#### Local Component State
```typescript
'use client'

export function SearchForm() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Local state management
}
```

#### Global Client State (when needed)
```typescript
// Context for global client state
export const AppContext = createContext({
  theme: 'light',
  user: null,
  preferences: {}
})

// Custom hooks for state access
export function useTheme() {
  const { theme, setTheme } = useContext(AppContext)
  return { theme, setTheme }
}
```

### 3. Form State

Using React Hook Form for complex forms:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
})

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  })
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  )
}
```

## Styling Architecture

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

### CSS Custom Properties

```css
/* globals.css */
:root {
  --primary: 219 78% 63%;
  --secondary: 142 76% 47%;
  --accent: 38 92% 50%;
  --muted: 220 14% 96%;
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
}

[data-theme="dark"] {
  --primary: 219 78% 63%;
  --secondary: 142 76% 47%;
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
}
```

### Component Styling Patterns

#### 1. Utility Classes
```typescript
// Preferred approach for most components
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
  Click me
</button>
```

#### 2. CSS Modules (when needed)
```typescript
// For complex component-specific styles
import styles from './component.module.css'

<div className={styles.complexLayout}>
  <div className={styles.sidebar} />
  <div className={styles.content} />
</div>
```

#### 3. Dynamic Classes
```typescript
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'lg'
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors',
        {
          'bg-primary text-white': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'px-3 py-1 text-sm': size === 'sm',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
}
```

## Performance Optimization

### 1. Code Splitting

```typescript
// Dynamic imports for large components
const VideoPlayer = dynamic(() => import('./video-player'), {
  loading: () => <VideoSkeleton />,
  ssr: false
})

// Route-based code splitting (automatic with App Router)
// Each page component is automatically split
```

### 2. Image Optimization

```typescript
// OptimizedImage component
export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}
```

### 3. Bundle Analysis

```javascript
// next.config.js
const nextConfig = {
  ...(process.env.ANALYZE === 'true' && {
    experimental: {
      bundleAnalyzer: {
        enabled: true,
      },
    },
  }),
}
```

## Error Handling

### 1. Error Boundaries

```typescript
// Global error boundary
export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        console.error('Global error:', error, errorInfo)
        // Send to error reporting service
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

### 2. Page-level Error Handling

```typescript
// app/[locale]/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  )
}
```

---

## Best Practices

### 1. Component Design
- Keep components small and focused
- Use TypeScript for all props interfaces
- Implement proper loading and error states
- Follow accessibility guidelines

### 2. Performance
- Use Server Components by default
- Add 'use client' only when necessary
- Implement proper image optimization
- Monitor Core Web Vitals

### 3. Maintainability
- Consistent naming conventions
- Proper component organization
- Comprehensive prop interfaces
- Documented component APIs

---

## Next Steps

- **Content System**: Learn about [Content Architecture](./content.html)
- **Performance**: Dive into [Performance Strategy](./performance.html)
- **Development**: Start with the [Developer Guide](../developer/)