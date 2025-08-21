'use client'

import { useEffect } from 'react'
import { sendWebVitals } from '@/lib/performance'

export function WebVitalsMonitor() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid affecting the main bundle
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Core Web Vitals
      onCLS((metric) => {
        sendWebVitals({
          id: metric.id,
          name: 'CLS',
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        })
      })

      onINP((metric) => {
        sendWebVitals({
          id: metric.id,
          name: 'INP',
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        })
      })

      onLCP((metric) => {
        sendWebVitals({
          id: metric.id,
          name: 'LCP',
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        })
      })

      // Additional metrics
      onFCP((metric) => {
        sendWebVitals({
          id: metric.id,
          name: 'FCP',
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        })
      })

      onTTFB((metric) => {
        sendWebVitals({
          id: metric.id,
          name: 'TTFB',
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        })
      })
    }).catch(() => {
      // Silently fail if web-vitals can't be loaded
      console.debug('Web Vitals monitoring failed to load')
    })
  }, [])

  return null // This component doesn't render anything
}

export default WebVitalsMonitor