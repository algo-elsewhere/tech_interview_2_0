import { describe, it, expect, vi, beforeEach } from 'vitest'
import { trackEvent, trackCTAClick, trackFormEvent } from '../analytics'

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
      trackEvent('click_cta', { key: 'value' })

      expect(mockPlausible).toHaveBeenCalledWith('click_cta', {
        props: { key: 'value' },
      })
    })

    it('should track in development when analytics enabled', () => {
      process.env.NODE_ENV = 'development'
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true'

      trackEvent('click_cta')

      expect(mockPlausible).toHaveBeenCalledWith('click_cta', { props: undefined })
    })

    it('should handle missing window.plausible gracefully', () => {
      const originalPlausible = (window as any).plausible
      ;(window as any).plausible = undefined

      expect(() => trackEvent('click_cta')).not.toThrow()
      
      // Restore original
      ;(window as any).plausible = originalPlausible
    })
  })

  describe('trackCTAClick', () => {
    it('should track CTA click with correct parameters', () => {
      trackCTAClick({
        location: 'hero',
        action: 'sign_up',
        label: 'Get Started',
      })

      expect(mockPlausible).toHaveBeenCalledWith('click_cta', {
        props: {
          location: 'hero',
          action: 'sign_up',
          label: 'Get Started',
        },
      })
    })

    it('should handle minimal CTA data', () => {
      trackCTAClick({ 
        location: 'footer',
        action: 'click'
      })

      expect(mockPlausible).toHaveBeenCalledWith('click_cta', {
        props: {
          location: 'footer',
          action: 'click',
          label: undefined,
        },
      })
    })
  })

  describe('trackFormEvent', () => {
    it('should track form start', () => {
      trackFormEvent({
        form_type: 'contact',
        event_type: 'start'
      })

      expect(mockPlausible).toHaveBeenCalledWith('start_form', {
        props: {
          form_type: 'contact',
          error_message: undefined,
        },
      })
    })

    it('should track form success', () => {
      trackFormEvent({
        form_type: 'newsletter',
        event_type: 'success'
      })

      expect(mockPlausible).toHaveBeenCalledWith('submit_form_success', {
        props: {
          form_type: 'newsletter',
          error_message: undefined,
        },
      })
    })

    it('should track form error', () => {
      trackFormEvent({
        form_type: 'contact',
        event_type: 'error',
        error_message: 'validation_failed'
      })

      expect(mockPlausible).toHaveBeenCalledWith('submit_form_error', {
        props: {
          form_type: 'contact',
          error_message: 'validation_failed',
        },
      })
    })
  })
})