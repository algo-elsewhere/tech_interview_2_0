import { describe, it, expect, vi, beforeEach } from 'vitest'
import { trackEvent, trackPageView, trackCTA, trackForm } from '../analytics'

// Mock window.plausible
const mockPlausible = vi.fn()

Object.defineProperty(window, 'plausible', {
  value: mockPlausible,
  writable: true,
})

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset environment variables
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true'
    process.env.NODE_ENV = 'production'
  })

  describe('trackEvent', () => {
    it('should call plausible with correct parameters', () => {
      trackEvent('test_event', { key: 'value' })

      expect(mockPlausible).toHaveBeenCalledWith('test_event', {
        props: { key: 'value' },
      })
    })

    it('should not track in development when analytics disabled', () => {
      process.env.NODE_ENV = 'development'
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false'

      trackEvent('test_event')

      expect(mockPlausible).not.toHaveBeenCalled()
    })

    it('should track in development when analytics enabled', () => {
      process.env.NODE_ENV = 'development'
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true'

      trackEvent('test_event')

      expect(mockPlausible).toHaveBeenCalledWith('test_event', { props: {} })
    })

    it('should handle missing window.plausible gracefully', () => {
      delete (window as any).plausible

      expect(() => trackEvent('test_event')).not.toThrow()
    })
  })

  describe('trackPageView', () => {
    it('should track page view with correct parameters', () => {
      trackPageView('/en/blog/test', 'en', 'blog')

      expect(mockPlausible).toHaveBeenCalledWith('pageview', {
        props: {
          path: '/en/blog/test',
          locale: 'en',
          section: 'blog',
        },
      })
    })

    it('should handle optional parameters', () => {
      trackPageView('/en')

      expect(mockPlausible).toHaveBeenCalledWith('pageview', {
        props: {
          path: '/en',
          locale: undefined,
          section: undefined,
        },
      })
    })
  })

  describe('trackCTA', () => {
    it('should track CTA click with correct parameters', () => {
      const cta = {
        location: 'hero',
        action: 'get_started',
        label: 'Get Started Button',
      }

      trackCTA(cta)

      expect(mockPlausible).toHaveBeenCalledWith('cta_click', {
        props: {
          location: 'hero',
          action: 'get_started',
          label: 'Get Started Button',
        },
      })
    })

    it('should handle minimal CTA data', () => {
      trackCTA({ location: 'footer' })

      expect(mockPlausible).toHaveBeenCalledWith('cta_click', {
        props: {
          location: 'footer',
          action: undefined,
          label: undefined,
        },
      })
    })
  })

  describe('trackForm', () => {
    it('should track form start', () => {
      trackForm('start', 'contact')

      expect(mockPlausible).toHaveBeenCalledWith('form_start', {
        props: {
          form_type: 'contact',
        },
      })
    })

    it('should track form success with additional data', () => {
      trackForm('success', 'newsletter', { source: 'footer' })

      expect(mockPlausible).toHaveBeenCalledWith('form_success', {
        props: {
          form_type: 'newsletter',
          source: 'footer',
        },
      })
    })

    it('should track form error', () => {
      trackForm('error', 'contact', { error: 'validation_failed' })

      expect(mockPlausible).toHaveBeenCalledWith('form_error', {
        props: {
          form_type: 'contact',
          error: 'validation_failed',
        },
      })
    })
  })

  describe('analytics configuration', () => {
    it('should respect analytics domain configuration', () => {
      process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN = 'example.com'
      
      trackEvent('test')

      expect(mockPlausible).toHaveBeenCalled()
    })

    it('should work without analytics domain in development', () => {
      process.env.NODE_ENV = 'development'
      delete process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN

      trackEvent('test')

      // Should still track in development
      expect(mockPlausible).toHaveBeenCalled()
    })
  })
})