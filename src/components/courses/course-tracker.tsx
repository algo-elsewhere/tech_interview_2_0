'use client'

import { useEffect } from 'react'
import { useTracking } from '@/hooks/use-tracking'

interface CourseTrackerProps {
  slug: string
  locale: string
  category: string
  title: string
}

export function CourseTracker({ slug, locale, category, title }: CourseTrackerProps) {
  const { trackContent } = useTracking()

  useEffect(() => {
    // Track content view when component mounts
    trackContent({
      slug,
      locale,
      category,
      type: 'course',
      title,
    })
  }, [slug, locale, category, title, trackContent])

  // This component doesn't render anything
  return null
}