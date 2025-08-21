// Analytics configuration and event tracking

export interface AnalyticsEvent {
  name: string
  props?: Record<string, string | number | boolean>
}

// Defined analytics events based on project requirements
export const ANALYTICS_EVENTS = {
  // Content viewing events
  VIEW_CONTENT: 'view_content',
  VIEW_BLOG_POST: 'view_blog_post',
  VIEW_COURSE: 'view_course',
  
  // CTA interaction events  
  CLICK_CTA: 'click_cta',
  CLICK_HERO_CTA: 'click_hero_cta',
  CLICK_COURSE_ENROLL: 'click_course_enroll',
  CLICK_CONTACT_CTA: 'click_contact_cta',
  
  // Form interaction events
  START_FORM: 'start_form',
  SUBMIT_FORM_SUCCESS: 'submit_form_success',
  SUBMIT_FORM_ERROR: 'submit_form_error',
  
  // Newsletter events
  SUBSCRIBE_NEWSLETTER: 'subscribe_newsletter',
  NEWSLETTER_SUCCESS: 'newsletter_success',
  
  // Navigation events
  LANGUAGE_SWITCH: 'language_switch',
  
  // Search and filtering events
  SEARCH_CONTENT: 'search_content',
  FILTER_CONTENT: 'filter_content',
} as const

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]

// Plausible analytics interface
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void
  }
}

/**
 * Track an analytics event with Plausible
 */
export function trackEvent(event: AnalyticsEventName, props?: Record<string, any>) {
  try {
    // Only track in production or when explicitly enabled
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
      console.log('📊 Analytics Event:', event, props)
      return
    }

    // Track with Plausible if available
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(event, { props })
    }
  } catch (error) {
    console.warn('Analytics tracking error:', error)
  }
}

/**
 * Track content view with metadata
 */
export function trackContentView(params: {
  slug: string
  locale: string
  category: string
  type: 'blog' | 'course'
  title?: string
}) {
  trackEvent(ANALYTICS_EVENTS.VIEW_CONTENT, {
    slug: params.slug,
    locale: params.locale,
    category: params.category,
    content_type: params.type,
    title: params.title,
  })
  
  // Also track specific content type
  if (params.type === 'blog') {
    trackEvent(ANALYTICS_EVENTS.VIEW_BLOG_POST, {
      slug: params.slug,
      category: params.category,
    })
  } else if (params.type === 'course') {
    trackEvent(ANALYTICS_EVENTS.VIEW_COURSE, {
      slug: params.slug,
      category: params.category,
    })
  }
}

/**
 * Track CTA clicks with location context
 */
export function trackCTAClick(params: {
  location: 'hero' | 'right-rail' | 'footer' | 'course-card' | 'blog-card' | 'contact'
  action: string
  label?: string
}) {
  trackEvent(ANALYTICS_EVENTS.CLICK_CTA, {
    location: params.location,
    action: params.action,
    label: params.label,
  })
}

/**
 * Track form interactions
 */
export function trackFormEvent(params: {
  form_type: 'contact' | 'newsletter' | 'course_enrollment'
  event_type: 'start' | 'success' | 'error'
  error_message?: string
}) {
  const eventName = params.event_type === 'start' 
    ? ANALYTICS_EVENTS.START_FORM
    : params.event_type === 'success'
    ? ANALYTICS_EVENTS.SUBMIT_FORM_SUCCESS  
    : ANALYTICS_EVENTS.SUBMIT_FORM_ERROR

  trackEvent(eventName, {
    form_type: params.form_type,
    error_message: params.error_message,
  })
}

/**
 * Track language switching
 */
export function trackLanguageSwitch(params: {
  from_locale: string
  to_locale: string
  page_path: string
}) {
  trackEvent(ANALYTICS_EVENTS.LANGUAGE_SWITCH, {
    from_locale: params.from_locale,
    to_locale: params.to_locale,
    page_path: params.page_path,
  })
}

/**
 * Track search and filtering
 */
export function trackContentFilter(params: {
  content_type: 'blog' | 'course'
  filter_type: 'category' | 'level' | 'search'
  filter_value: string
  results_count: number
}) {
  trackEvent(ANALYTICS_EVENTS.FILTER_CONTENT, {
    content_type: params.content_type,
    filter_type: params.filter_type,
    filter_value: params.filter_value,
    results_count: params.results_count,
  })
}

/**
 * Initialize analytics tracking
 */
export function initializeAnalytics() {
  // Analytics will be initialized via the Plausible script tag
  // This function can be used for any additional setup if needed
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics initialized (development mode)')
  }
}