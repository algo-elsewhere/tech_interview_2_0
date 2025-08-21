'use client'

import { useEffect } from 'react'
import { useTracking } from '@/hooks/use-tracking'

interface BlogPostTrackerProps {
  slug: string
  locale: string
  category: string
  title: string
}

export function BlogPostTracker({ slug, locale, category, title }: BlogPostTrackerProps) {
  const { trackContent } = useTracking()

  useEffect(() => {
    // Track content view when component mounts
    trackContent({
      slug,
      locale,
      category,
      type: 'blog',
      title,
    })
  }, [slug, locale, category, title, trackContent])

  // This component doesn't render anything
  return null
}