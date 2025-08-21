import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import { Link } from '@/i18n/routing'
import { ArrowRight, Shield, Clock } from 'lucide-react'

export function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            {t('ready')}
          </h2>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-primary-foreground/90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="group bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/courses">
                {t('primary')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">
                {t('secondary')}
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">
                {t('guarantee')}
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">
                Start learning in 2 minutes
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
            <div className="flex items-center gap-2">
              <span className="text-sm">
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>
    </section>
  )
}