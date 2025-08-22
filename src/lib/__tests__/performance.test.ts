import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  createIntersectionObserver,
  sendWebVitals,
  preloadResource,
  prefetchResource,
  isInViewport,
  debounce,
  throttle,
  dynamicImport,
} from '../performance'

// Mock window.plausible
const mockPlausible = vi.fn()
Object.defineProperty(window, 'plausible', {
  value: mockPlausible,
  writable: true,
})

// Mock document methods
const mockAppendChild = vi.fn()
Object.defineProperty(document, 'head', {
  value: { appendChild: mockAppendChild },
  writable: true,
})

Object.defineProperty(document, 'createElement', {
  value: vi.fn().mockReturnValue({
    rel: '',
    href: '',
    as: '',
    type: '',
  }),
  writable: true,
})

describe('Performance Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createIntersectionObserver', () => {
    it('should create intersection observer with default options', () => {
      const mockObserver = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }

      global.IntersectionObserver = vi.fn().mockImplementation(() => mockObserver)

      const callback = vi.fn()
      const observer = createIntersectionObserver(callback)

      expect(global.IntersectionObserver).toHaveBeenCalledWith(callback, {
        rootMargin: '50px',
        threshold: 0.1,
      })
      expect(observer).toBe(mockObserver)
    })

    it('should create intersection observer with custom options', () => {
      global.IntersectionObserver = vi.fn().mockImplementation(() => ({}))

      const callback = vi.fn()
      const options = { rootMargin: '100px', threshold: 0.5 }
      
      createIntersectionObserver(callback, options)

      expect(global.IntersectionObserver).toHaveBeenCalledWith(callback, {
        rootMargin: '100px',
        threshold: 0.5,
      })
    })

    it('should return null when IntersectionObserver is not supported', () => {
      delete (global as any).IntersectionObserver

      const callback = vi.fn()
      const observer = createIntersectionObserver(callback)

      expect(observer).toBeNull()
    })
  })

  describe('sendWebVitals', () => {
    it('should send web vitals to analytics', () => {
      const metric = {
        id: 'test-id',
        name: 'LCP',
        value: 1500,
        delta: 100,
        rating: 'good' as const,
      }

      sendWebVitals(metric)

      expect(mockPlausible).toHaveBeenCalledWith('Web Vitals', {
        props: {
          metric_name: 'LCP',
          metric_value: 1500,
          metric_rating: 'good',
          metric_id: 'test-id',
        },
      })
    })

    it('should handle missing plausible gracefully', () => {
      delete (window as any).plausible

      const metric = {
        id: 'test-id',
        name: 'LCP',
        value: 1500,
        delta: 100,
        rating: 'good' as const,
      }

      expect(() => sendWebVitals(metric)).not.toThrow()
    })
  })

  describe('preloadResource', () => {
    it('should create and append preload link', () => {
      const mockLink = {
        rel: '',
        href: '',
        as: '',
        type: '',
      }

      vi.mocked(document.createElement).mockReturnValue(mockLink as any)

      preloadResource('/test.css', 'style', 'text/css')

      expect(document.createElement).toHaveBeenCalledWith('link')
      expect(mockLink.rel).toBe('preload')
      expect(mockLink.href).toBe('/test.css')
      expect(mockLink.as).toBe('style')
      expect(mockLink.type).toBe('text/css')
      expect(mockAppendChild).toHaveBeenCalledWith(mockLink)
    })

    it('should handle preload without type', () => {
      const mockLink = { rel: '', href: '', as: '', type: '' }
      vi.mocked(document.createElement).mockReturnValue(mockLink as any)

      preloadResource('/test.jpg', 'image')

      expect(mockLink.type).toBe('')
    })
  })

  describe('prefetchResource', () => {
    it('should create and append prefetch link', () => {
      const mockLink = { rel: '', href: '' }
      vi.mocked(document.createElement).mockReturnValue(mockLink as any)

      prefetchResource('/next-page')

      expect(mockLink.rel).toBe('prefetch')
      expect(mockLink.href).toBe('/next-page')
      expect(mockAppendChild).toHaveBeenCalledWith(mockLink)
    })
  })

  describe('isInViewport', () => {
    it('should return true for element in viewport', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({
          top: 100,
          left: 100,
          bottom: 200,
          right: 200,
        }),
      }

      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true })

      const result = isInViewport(mockElement as any)

      expect(result).toBe(true)
    })

    it('should return false for element outside viewport', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({
          top: -100,
          left: -100,
          bottom: -50,
          right: -50,
        }),
      }

      const result = isInViewport(mockElement as any)

      expect(result).toBe(false)
    })
  })

  describe('debounce', () => {
    it('should debounce function calls', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn('arg1')
      debouncedFn('arg2')
      debouncedFn('arg3')

      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('arg3')
    })

    it('should reset debounce timer on new calls', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      vi.advanceTimersByTime(50)
      debouncedFn()
      vi.advanceTimersByTime(50)

      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(50)

      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('should throttle function calls', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)

      throttledFn('arg1')
      throttledFn('arg2')
      throttledFn('arg3')

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('arg1')

      vi.advanceTimersByTime(100)

      throttledFn('arg4')

      expect(fn).toHaveBeenCalledTimes(2)
      expect(fn).toHaveBeenCalledWith('arg4')
    })
  })

  describe('dynamicImport', () => {
    it('should resolve with imported module', async () => {
      const mockModule = { default: 'test' }
      const importFn = vi.fn().mockResolvedValue(mockModule)

      const result = await dynamicImport(importFn)

      expect(result).toBe(mockModule)
      expect(importFn).toHaveBeenCalled()
    })

    it('should return fallback on import error', async () => {
      const importFn = vi.fn().mockRejectedValue(new Error('Import failed'))
      const fallback = { default: 'fallback' }

      const result = await dynamicImport(importFn, fallback)

      expect(result).toBe(fallback)
    })

    it('should throw error when no fallback provided', async () => {
      const importFn = vi.fn().mockRejectedValue(new Error('Import failed'))

      await expect(dynamicImport(importFn)).rejects.toThrow('Dynamic import failed')
    })
  })
})