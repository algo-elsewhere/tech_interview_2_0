'use client'

import { useCallback } from 'react'
import { useAnalytics } from '@/components/analytics/analytics-provider'
import { 
  trackEvent, 
  trackContentView, 
  trackCTAClick, 
  trackFormEvent, 
  trackLanguageSwitch,
  trackContentFilter,
  AnalyticsEventName 
} from '@/lib/analytics'

/**
 * Hook for tracking analytics events with context awareness
 */
export function useTracking() {
  const { isEnabled } = useAnalytics()

  const track = useCallback((event: AnalyticsEventName, props?: Record<string, any>) => {
    if (isEnabled) {
      trackEvent(event, props)
    }
  }, [isEnabled])

  const trackContent = useCallback((params: {
    slug: string
    locale: string
    category: string
    type: 'blog' | 'course'
    title?: string
  }) => {
    if (isEnabled) {
      trackContentView(params)
    }
  }, [isEnabled])

  const trackCTA = useCallback((params: {
    location: 'hero' | 'right-rail' | 'footer' | 'course-card' | 'blog-card' | 'contact'
    action: string
    label?: string
  }) => {
    if (isEnabled) {
      trackCTAClick(params)
    }
  }, [isEnabled])

  const trackForm = useCallback((params: {
    form_type: 'contact' | 'newsletter' | 'course_enrollment'
    event_type: 'start' | 'success' | 'error'
    error_message?: string
  }) => {
    if (isEnabled) {
      trackFormEvent(params)
    }
  }, [isEnabled])

  const trackLanguage = useCallback((params: {
    from_locale: string
    to_locale: string
    page_path: string
  }) => {
    if (isEnabled) {
      trackLanguageSwitch(params)
    }
  }, [isEnabled])

  const trackFilter = useCallback((params: {
    content_type: 'blog' | 'course'
    filter_type: 'category' | 'level' | 'search'
    filter_value: string
    results_count: number
  }) => {
    if (isEnabled) {
      trackContentFilter(params)
    }
  }, [isEnabled])

  return {
    track,
    trackContent,
    trackCTA,
    trackForm,
    trackLanguage,
    trackFilter,
    isEnabled,
  }
}