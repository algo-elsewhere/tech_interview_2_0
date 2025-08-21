'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import Script from 'next/script'
import { initializeAnalytics } from '@/lib/analytics'

interface AnalyticsContextType {
  isEnabled: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  isEnabled: false
})

export const useAnalytics = () => useContext(AnalyticsContext)

interface AnalyticsProviderProps {
  children: ReactNode
  domain?: string
}

export function AnalyticsProvider({ children, domain }: AnalyticsProviderProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  const isEnabled = isProduction || analyticsEnabled

  useEffect(() => {
    if (isEnabled) {
      initializeAnalytics()
    }
  }, [isEnabled])

  return (
    <AnalyticsContext.Provider value={{ isEnabled }}>
      {/* Plausible Analytics Script */}
      {isEnabled && domain && (
        <Script
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      
      {/* Development mode indicator */}
      {!isProduction && analyticsEnabled && (
        <div 
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded text-xs font-mono z-50"
          title="Analytics tracking enabled in development"
        >
          📊 Analytics ON
        </div>
      )}
      
      {children}
    </AnalyticsContext.Provider>
  )
}