'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, X } from 'lucide-react'

export function PrivacyNotice() {
  const t = useTranslations('privacy')
  const [isVisible, setIsVisible] = useState(true)

  // Don't show privacy notice for Plausible as it's cookieless
  // This component is kept for future use if needed
  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm">
      <Card className="border-2 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-1">
                {t('title')}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {t('description')}
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => setIsVisible(false)}
                  className="text-xs h-7"
                >
                  {t('accept')}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-xs h-7"
                >
                  {t('learn')}
                </Button>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}