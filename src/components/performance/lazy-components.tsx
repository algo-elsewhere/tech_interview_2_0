'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Loading component for lazy-loaded components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
)

// Lazy load newsletter section (below the fold)
export const LazyNewsletterSection = dynamic(
  () => import('@/components/home/newsletter-section').then(mod => ({ default: mod.NewsletterSection })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // Not critical for initial render
  }
)

// Lazy load CTA section (below the fold)
export const LazyCTASection = dynamic(
  () => import('@/components/home/cta-section').then(mod => ({ default: mod.CTASection })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
)

// Lazy load blog filters (interactive component)
export const LazyBlogFilters = dynamic(
  () => import('@/components/blog/blog-filters').then(mod => ({ default: mod.BlogFilters })),
  {
    loading: () => <div className="h-12 bg-muted animate-pulse rounded" />,
    ssr: false,
  }
)

// Lazy load course filters (interactive component)
export const LazyCourseFilters = dynamic(
  () => import('@/components/courses/course-filters').then(mod => ({ default: mod.CourseFilters })),
  {
    loading: () => <div className="h-12 bg-muted animate-pulse rounded" />,
    ssr: false,
  }
)

// Lazy load contact form (below the fold)
export const LazyContactForm = dynamic(
  () => import('@/components/contact/contact-form').then(mod => ({ default: mod.ContactForm })),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded" />
        <div className="h-10 bg-muted animate-pulse rounded" />
        <div className="h-24 bg-muted animate-pulse rounded" />
        <div className="h-10 bg-primary/20 animate-pulse rounded" />
      </div>
    ),
    ssr: false,
  }
)

// Generic lazy wrapper for any component
export function createLazyComponent<T extends ComponentType>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    loading?: () => React.ReactElement
    ssr?: boolean
  }
) {
  return dynamic(importFn, {
    loading: options?.loading || LoadingSpinner,
    ssr: options?.ssr ?? true,
  })
}

// Intersection Observer based lazy loading
export function LazyOnVisible({ 
  children, 
  rootMargin: _rootMargin = '100px',
  threshold: _threshold = 0.1,
  fallback = <LoadingSpinner />
}: {
  children: React.ReactNode
  rootMargin?: string
  threshold?: number
  fallback?: React.ReactNode
}) {
  const LazyComponent = dynamic(
    () => Promise.resolve({ default: () => <>{children}</> }),
    {
      loading: () => <>{fallback}</>,
      ssr: false,
    }
  )

  return <LazyComponent />
}