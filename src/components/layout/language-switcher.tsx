'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { ChevronDown, Globe } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh-Hans', name: 'Simplified Chinese', nativeName: '简体中文' },
  { code: 'zh-Hant', name: 'Traditional Chinese', nativeName: '繁體中文' },
] as const

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('language')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const currentLanguage = languages.find(lang => lang.code === locale)

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false)
    
    // Navigate to the same path but with the new locale
    router.push(pathname, { locale: newLocale })
    router.refresh()
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1"
        aria-label={t('switch')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline text-sm">
          {currentLanguage?.nativeName}
        </span>
        <ChevronDown 
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  locale === language.code && "bg-accent text-accent-foreground"
                )}
                role="menuitem"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {language.nativeName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {language.name}
                  </span>
                </div>
                
                {locale === language.code && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}