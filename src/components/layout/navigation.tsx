'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const navigationItems = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/blog' },
  { key: 'courses', href: '/courses' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const

interface NavigationProps {
  className?: string
  onLinkClick?: () => void
}

export function Navigation({ className, onLinkClick }: NavigationProps) {
  const t = useTranslations('navigation')
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== '/' && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive 
                ? 'text-primary' 
                : 'text-muted-foreground'
            )}
            onClick={onLinkClick}
          >
            {t(item.key)}
          </Link>
        )
      })}
    </nav>
  )
}