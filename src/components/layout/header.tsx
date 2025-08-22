'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { Link } from '@/i18n/routing'
import { LanguageSwitcher } from './language-switcher'
import { Navigation } from './navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('navigation')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm relative">
              <span className="relative">
                TI
                <sup className="absolute top-0 -right-1 text-[0.4rem] font-bold">2</sup>
              </span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              Tech Interview 2.0
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Navigation className="hidden md:flex" />
          </div>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t('close') : t('menu')}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container py-4">
            <Navigation 
              className="flex flex-col space-y-3" 
              onLinkClick={() => setIsMenuOpen(false)} 
            />
          </div>
        </div>
      )}
    </header>
  )
}