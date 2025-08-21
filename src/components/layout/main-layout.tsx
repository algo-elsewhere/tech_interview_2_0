import { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      
      <Footer />
    </div>
  )
}